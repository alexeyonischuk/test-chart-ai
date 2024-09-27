/**!
 *	9.4.0
 *	Generation date: 2024-08-28T15:51:29.272Z
 *	Client name: codeit
 *	Package Type: Core alacarte
 *	License type: annual
 *	Build descriptor: a9931b733
 */

/***********************************************************!
 * Copyright © 2024 S&P Global All rights reserved
*************************************************************/
/*************************************! DO NOT MAKE CHANGES TO THIS LIBRARY FILE!! !*************************************
* If you wish to overwrite default functionality, create a separate file with a copy of the methods you are overwriting *
* and load that file right after the library has been loaded, but before the chart engine is instantiated.              *
* Directly modifying library files will prevent upgrades and the ability for ChartIQ to support your solution.          *
*************************************************************************************************************************/
/* eslint-disable no-extra-parens */


import { CIQ as _CIQ } from "../../js/componentUI.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-scroll&gt;</h4>
 *
 * This component creates a scrollable container, which resizes itself when the screen
 * is resized. If CIQ.UI.scrollbarStyling is initialized to a scrollbar implementation (such as
 * PerfectScrollbar), the scrollbar implementation replaces the native scrollbar.
 *
 * _**Attributes**_
 *
 * This component supports the following attributes:
 * | attribute      | description |
 * | :------------- | :---------- |
 * | cq-no-claim    | Do not apply any keystroke capturing |
 * | cq-no-maximize | Do not automatically maximize the height (but keep it showing on screen) |
 * | cq-no-resize   | Do not apply any sizing logic |
 * | cq-max-height  | Maximum height |
 *
 * _**Keyboard Control**_
 *
 * When selected with tab key navigation and activated with Return/Enter, this component has the
 * following internal controls:
 * | key              | action |
 * | :--------------- | :----- |
 * | Up/Down arrow    | Move selection between internal cq-item elements. |
 * | Left/Right arrow | Select a control within a selected element. |
 *
 * @example
 * <cq-lookup-results>
 *     <cq-lookup-filters cq-no-close>
 *         <cq-filter class="true">ALL</cq-filter>
 *         <cq-filter>STOCKS</cq-filter>
 *         <cq-filter>FX</cq-filter>
 *         <cq-filter>INDEXES</cq-filter>
 *         <cq-filter>FUNDS</cq-filter>
 *         <cq-filter>FUTURES</cq-filter>
 *     </cq-lookup-filters>
 *     <cq-scroll></cq-scroll>
 * </cq-lookup-results>
 *
 * @alias WebComponents.Scroll
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 6.1.0 Added `cq-no-claim` attribute.
 * - 8.3.0 Enabled internal keyboard navigation and selection.
 */
class Scroll extends CIQ.UI.BaseComponent {
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		if (!this.hasAttribute("cq-no-claim")) this.addClaim(this);
		if (this.hasAttribute("cq-no-scroll")) return;
		// Setting CSS in constructor will throw exception when calling document.createElement (done in plugins)
		// So set default CSS here when connected instead.
		this.style.overflowY = "auto";
		this.uiManager = CIQ.UI.getUIManager(this);
		if (this.uiManager.length) this.uiManager = this.uiManager[0];

		// prevent mousewheel event from propagating up to parents, such as when embedded
		// in a chart, e.g. comparison lookup component
		this.addEventListener(CIQ.wheelEvent, (e) => e.stopPropagation(), {
			passive: false
		});

		CIQ.UI.addResizeListener(this, () => this.resize());
		this.resize();

		this.maxHeight = this.getAttribute("cq-max-height");
		this.addEventListener("scroll", () => {
			this.uiManager.closeOpenColorPicker();
		});
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Scroll);
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		CIQ.UI.removeResizeListener(this);
		if (CIQ.UI.scrollbarStyling) CIQ.UI.scrollbarStyling.destroy(this);
		super.disconnectedCallback();
	}

	/**
	 * Returns the focused element or null. An item is focused if it has
	 * attribute cq-focused.
	 *
	 * @return {HTMLElement} The element or null
	 *
	 * @tsmember WebComponents.Scroll
	 */
	focused() {
		return this.querySelector("cq-item[cq-focused]");
	}

	/**
	 * Handler for keyboard interaction.
	 *
	 * Scroll components can handle up and down enter keystrokes.
	 * They do not register for claims directly. Another section of code must
	 * establish the claim on their behalf or proxy the keystroke.
	 *
	 * Up and Down arrows will iterate through the scrollable elements. The attribute
	 * cq-focused will be added to the currently focused tag. This can then be
	 * queried later, such as when a user hits enter.
	 *
	 * Left and Right arrows will iterate through the elements on the focused scrollable element,
	 * such as Remove and Edit buttons. Child elements must have the attribute `keyboard-selectable-child`
	 * set to "true" to be selectable with these keys.
	 *
	 * Space bar or Enter will call the selectFC callback on the element if it exists.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Scroll
	 */
	keyStroke(hub, key, e) {
		if (!this.keyboardNavigation) {
			if (this.keyboardNavigationWait || !this.matches(".stxMenuActive *"))
				return;
		}

		if (!CIQ.trulyVisible(this)) return false;

		const items = this.querySelectorAll(
			"[keyboard-selectable='true'], cq-item:not(.item-hidden), li"
		);
		if (!items.length) return false;

		if (key == " " || key == "Spacebar" || key == "Enter") {
			const focused = this.findFocused(items);
			if (!focused || !focused.length) return false;
			const childItemsSelected = focused[0].querySelectorAll(
				"[keyboard-selectable-child='true'][cq-focused]"
			);
			if (childItemsSelected.length) {
				const studyLegend = focused[0].closest("cq-study-legend");
				if (studyLegend)
					studyLegend.storeFocused(focused, childItemsSelected[0]);
				this.clickItem(childItemsSelected[0], e);
			} else this.clickItem(focused[0], e);
		} else if (key == "ArrowDown" || key == "Down") {
			this.focusNextItem(items);
		} else if (key == "ArrowUp" || key == "Up") {
			this.focusNextItem(items, true);
		} else if (key == "ArrowRight" || key == "Right") {
			const focused = this.findFocused(items);
			if (!focused || !focused.length) return false;
			const childItems = focused[0].querySelectorAll(
				"[keyboard-selectable-child='true']"
			);
			if (childItems.length) this.focusNextItem(childItems);
		} else if (key == "ArrowLeft" || key == "Left") {
			const focused = this.findFocused(items)[0];
			if (!focused) return false;
			const childItems = focused.querySelectorAll(
				"[keyboard-selectable-child='true']"
			);
			// If the end of the child items has been reached select the parent item instead
			if (childItems.length && !this.focusNextItem(childItems, true)) {
				this.removeFocused(childItems);
				this.focusItem(focused);
			}
		}
		return true;
	}

	/**
	 * Overrides [focusItem](CIQ.UI.BaseComponent.html#focusItem) in
	 * [CIQ.UI.BaseComponent]{@link CIQ.UI.BaseComponent}.
	 *
	 * Scrolls to an item and gives the item focus.
	 *
	 * @param {HTMLElement} item The element to scroll to and focus. Must be a child of this component.
	 *
	 * @tsmember WebComponents.Scroll
	 *
	 * @since 8.3.0
	 */
	focusItem(item) {
		this.scrollToElement(item);
		super.focusItem(item);
	}

	/**
	 * If we're using keyboard navigation, returns the highlight to the tab selected element.
	 *
	 * @tsmember WebComponents.Scroll
	 */
	onKeyboardDeselection() {
		// If we're using keyboard navigation, return the highlight to the tab selected element
		if (this.keyboardNavigation && this.keyboardNavigation !== null)
			this.keyboardNavigation.highlightPosition();
	}

	/**
	 * Resizes the componewnt when the screen is resized, or even if the configuraton is reloaded to add or remove items.
	 *
	 * @tsmember WebComponents.Scroll
	 */
	resize() {
		const context = this.closest("cq-context");
		if (this.closest(".sharing"))
			return; /*share.js appends this class to the body.
			Do not attempt unnecessary resize of scroll
			for a chart about to become a shared image.*/
		if (this.hasAttribute("cq-no-resize")) return;
		if (this.hasAttribute("cq-no-maximize")) this.noMaximize = true;
		const position = this.getBoundingClientRect();
		if (!position.height) return;
		// defaulted to 45 to take into account 15px of padding on menus and then an extra 5px for aesthetics
		const reduceMenuHeight = this.reduceMenuHeight || 45;
		let contextHeight, contextTop;
		if (context) {
			const { multiChartContainer } = context;
			const contextRect = (
				multiChartContainer || context
			).getBoundingClientRect();
			contextHeight = contextRect.height;
			contextTop = contextRect.top;
		} else {
			// Fallback to the window height if context element cannot be found
			contextHeight = this.ownerDocument.defaultView.innerHeight;
			contextTop = 0;
		}
		if (!contextHeight) return;
		let height = contextHeight - (position.top - contextTop) - reduceMenuHeight;
		const holders = CIQ.climbUpDomTree(
			this,
			".stx-holder,.stx-subholder,.chartContainer",
			true
		);
		if (holders.length) {
			holders.forEach((holder) => {
				const holderBottom =
					holder.getBoundingClientRect().top +
					CIQ.elementDimensions(holder).height;
				height = Math.min(height, holderBottom - position.top - 5); // inside a holder we ignore reduceMenuHeight, but take off 5 pixels just for aesthetics
			});
		}

		// If there are subsequent siblings that have a fixed height then make room for them
		const children = [...this.parentNode.children];
		const nextAll = children.slice(children.indexOf(this) + 1);
		for (let i = 0; i < nextAll.length; i++) {
			const sibling = nextAll[i];
			if (sibling && !CIQ.trulyVisible(sibling)) continue; // skip hidden siblings
			height -= CIQ.elementDimensions(sibling, {
				border: 1,
				padding: 1,
				margin: 1
			}).height;
		}
		if (this.maxHeight && this.maxHeight < height) {
			height = this.maxHeight;
		}
		if (!this.noMaximize) this.style.height = height + "px";

		// The drop-up-menu attribute indicates that this element is positioned from its bottom and can potentially flow off screen
		if (this.hasAttribute("cq-drop-up-menu")) {
			const currentBottom = +this.style.bottom.replace("px", "");
			const newBottom = Math.min(
				position.top - contextTop - reduceMenuHeight + currentBottom - 4,
				25
			);
			this.style.bottom = newBottom + "px";
		}
		this.style.maxHeight = height + "px";
		this.refresh();
	}

	/**
	 * Scrolls to an element.
	 *
	 * @param {HTMLElement} item The element to scroll to. Must be a child of this component.
	 *
	 * @tsmember WebComponents.Scroll
	 */
	scrollToElement(item) {
		const bottom = this.clientHeight,
			scrolled = this.scrollTop;
		const itemBottom = item.offsetTop + item.clientHeight;
		if (item.offsetTop > scrolled && itemBottom < bottom + scrolled) return;
		this.scrollTop = Math.max(itemBottom - bottom, 0);
		this.refresh();
	}

	/**
	 * Scroll back to top
	 *
	 * @tsmember WebComponents.Scroll
	 */
	top() {
		this.scrollTop = 0;
		this.refresh();
	}

	/**
	 * Scroll back to top (calls `top()`).
	 *
	 * @tsmember WebComponents.Scroll
	 */
	scrollToTop() {
		this.top();
	}

	/**
	 * Refreshes the scrollbar, if CIQ.UI.scrollbarStyling is enabled.
	 *
	 * @since 7.2.0
	 *
	 * @tsmember WebComponents.Scroll
	 */
	refresh() {
		if (CIQ.UI.scrollbarStyling) CIQ.UI.scrollbarStyling.refresh(this);
	}
}

CIQ.UI.addComponentDefinition("cq-scroll", Scroll);
