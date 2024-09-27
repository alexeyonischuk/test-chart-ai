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
import "../../js/webcomponents_legacy/menu.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Dialog web component `<cq-dialog>`.
 *
 * Manages general dialog interaction such as display, hide, location, size, tap interaction, etc
 *
 * @namespace WebComponents.cq-dialog
 * @example
	<cq-dialog cq-timezone-dialog>
		<cq-timezone-dialog>
			<h4 class="title">Choose Timezone</h4>
			<cq-close></cq-close>

			<p>To set your timezone use the location button below, or scroll through the following list...</p>
			<p class="currentUserTimeZone"></p>
	    <div class="detect">
	    <div class="ciq-btn" stxtap="Layout.removeTimezone()">Use My Current Location</div>
	    </div>
	    <div class="timezoneDialogWrapper" style="max-height:360px; overflow: auto;">
		        <ul>
		          <li class="timezoneTemplate" style="display:none;cursor:pointer;"></li>
		        </ul>
	        </div>
	    <div class="instruct">(Scroll for more options)</div>
		</cq-timezone-dialog>
	</cq-dialog>
 */
class Dialog extends CIQ.UI.BaseComponent {
	constructor() {
		super();
		this.activeAttributes = {};
	}

	/**
	 * The attributes that are added to a cq-dialog when it is opened (and removed when closed).
	 * Contains "cq-active" by default.
	 * @memberof WebComponents.cq-dialog
	 * @type {Object}
	 */
	connectedCallback() {
		if (this.attached) return;
		this.isDialog = true;
		super.connectedCallback();
		var self = this;
		function handleTap(e) {
			self.tap(e);
		}
		CIQ.UI.stxtap(this, handleTap);

		var uiManager = CIQ.UI.getUIManager(this);
		uiManager.registerForResize(this);
		this.uiManager = uiManager;

		if (!this.hasAttribute("cq-no-claim")) this.addClaim(this);

		if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Dialog);
	}

	disconnectedCallback() {
		this.removeClaim(this);
		this.uiManager.unregisterForResize(this);
		super.disconnectedCallback();
	}

	/**
	 * Finds the first element in `items` that has a `cq-focused` attribute or a name attribute
	 * that matches the value of `activeElementName`. If found, that element is focused.
	 *
	 * @param {NodeList} items A list of elements that are selectable via keyboard navigation.
	 *
	 * @memberof WebComponents.cq-dialog
	 * @alias refreshFocus
	 * @since 8.7.0
	 */
	refreshFocus() {
		const items = this.getKeyboardSelectableItems();
		let focused = this.findFocused(items)[0];
		if (!focused)
			focused = Array.from(items || []).find((item) =>
				item.matches("[name=" + this.activeElementName + "]")
			);
		if (focused) this.focusItem(focused);
	}

	getKeyboardSelectableItems() {
		return this.querySelectorAll(
			"[keyboard-selectable='true'], input, .ciq-select, cq-swatch, .ciq-btn, .ciq-btn-negative, cq-scroll li, ul cq-item, .ciq-filter"
		);
	}

	keyStroke(hub, key, e) {
		if (hub.tabActiveModals[0] !== this) return;
		let { shiftKey: reverse } = e || {};

		//const nativeTabbing = this.hasAttribute("native-tabbing");

		const items = this.getKeyboardSelectableItems();
		if (key === "Tab" /* && !nativeTabbing*/) {
			const focused = this.focusNextItem(items, reverse, true);
			const scroll = this.querySelector("cq-scroll");
			if (focused && scroll) {
				// Scroll to the element that was focused
				scroll.scrollToElement(focused);
				// Let the scroll complete before aligning the highlight
				setTimeout(() => hub.highlightAlign());
			}
		} else if (key == "Enter") {
			const focused = this.findFocused(items)[0];
			if (focused) {
				this.clickItem(focused, e, this);
				if (typeof focused.click === "function") focused.click();
			}
		}
	}

	onKeyboardSelection() {
		// Need to hide the highlight on select because the study dialog contents re-render quite often
		// throwing off the highlight position (e.g. When a dropdown selection is made). Pressing the
		// tab key will re-focus the next appropriate item and helps the user re-orient themselves.
		this.keyboardNavigation.highlightHide();
	}

	onKeyboardDeselection() {
		// If we're using keyboard navigation, return the highlight to the tab selected element
		if (this.keyboardNavigation && this.keyboardNavigation !== null)
			this.keyboardNavigation.highlightAlign();
	}

	clickItem(item, e, originationElement) {
		// Pass control to the dropdown. Dropdowns within the dialog become detached from their
		// parent in the dom and cannot pass comtrol directly.
		if (item && this.keyboardNavigation) {
			const dropdown = item.querySelector("cq-menu-dropdown");
			if (dropdown) {
				dropdown.keyboardOriginationElement = originationElement;
				this.keyboardNavigation.setKeyControlElement(dropdown);
			}
		}
		super.clickItem(item, e, this);
	}

	processEsc(hub) {
		// See if we need to use Esc to clean up the dialog
		if (this.closeActiveMenu()) {
			// If there's another modal available at position 0, set it as active
			if (hub.tabActiveModals[0])
				hub.setKeyControlElement(hub.tabActiveModals[0]);
			// Returning true prevents the keyHub from processing esc.
			return true;
		}
		// If nothing was done, pass false to process esc in the keyHub
		return false;
	}

	/**
	 * Returns true if a menu was closed
	 */
	closeActiveMenu() {
		const activeMenu = this.querySelector("*.stxMenuActive");
		if (activeMenu) {
			const uiManager = CIQ.UI.getUIManager(this);
			if (uiManager) uiManager.closeMenu(activeMenu);
			return true;
		}
		return false;
	}

	/**
	 * Creates a new attribute to be activated when the dialog is open. Use
	 * this to style the dialog. This is automatically set by any component
	 * that is derived from DialogContentTag
	 * @param {string} attribute The attribute to add or remove
	 * @memberof WebComponents.cq-dialog
	 * @since  4.1.0
	 * @example
	 * <style> cq-dialog[cq-study-context]{ padding:0; } </style>
	 * <cq-dialog cq-study-context></cq-dialog>
	 */
	addActiveAttribute(attribute) {
		this.activeAttributes[attribute] = true;
	}

	center() {
		return;
	}

	close() {
		this.uiManager.closeMenu(this);
		if (this.onClose) this.onClose();
		this.parentElement.removeAttribute("cq-active");
	}

	hide() {
		if (this.node.find(":invalid").length) return;
		// Call the "hide()" function for any immediate children. This will allow nested
		// components to clean themselves up when a dialog is removed from outside of their scope.
		this.node.children().each(function () {
			if (typeof this.hide == "function") this.hide();
		});
		this.active = false;
		if (
			this.uiManager.overlay &&
			this.uiManager.overlay.hasAttribute("cq-active")
		)
			this.uiManager.overlay.removeAttribute("cq-active");
		//this.uiManager.overlay=null;
		for (var attribute in this.activeAttributes) {
			if (this.hasAttribute(attribute)) this.removeAttribute(attribute);
		}
		this.activeAttributes = {};

		// blur any input boxes that are inside the dialog we're closing, to get rid of soft keyboard
		this.node.find("input").each(function () {
			if (this == this.ownerDocument.activeElement) this.blur();
		});

		// Blur any focused elements
		this.removeFocused();
		// Remove this dialog from the active index
		const keystrokeHub = this.ownerDocument.body.keystrokeHub;
		if (keystrokeHub) keystrokeHub.removeActiveModal(this);
		this.parentElement.removeAttribute("cq-active");
		if (!this.matches("cq-color-picker"))
			this.ownerDocument.body.classList.remove("ciq-dialog-open");
	}

	launchColorPicker() {
		if (this.uiManager) this.uiManager.closeMenu(null, "CQ-MENU");
	}

	open(params) {
		this.uiManager.openMenu(this, params);
		// Capture context to be able to later notify dialog closing in channel
		const { context } = params || {};
		if (!context || !context.config) {
			this.onClose = null;
			return;
		}

		const {
			config: { channels },
			stx
		} = context;

		if (stx.translateUI) stx.translateUI(this.node[0]);

		this.onClose = () => {
			this.channelWrite(channels.dialog || "channel.dialog", {}, stx);
			this.onClose = null;
			// If Dialog content has a hide method, call it.
			if (this.firstElementChild.hide) this.firstElementChild.hide();
		};
		this.parentElement.setAttribute("cq-active", true);
		if (!this.matches("cq-color-picker"))
			this.ownerDocument.body.classList.add("ciq-dialog-open");
	}

	resize() {
		var scrollers = this.node.find("cq-scroll");
		scrollers.each(function () {
			if (this.resize) this.resize();
		});
		if (this.params && this.params.x) {
			this.stxContextMenu();
		} else {
			this.center();
		}
	}

	/**
	 * Show the dialog. Use X,Y *screen location* (pageX, pageY from an event) for where to display context menus. If the context menu cannot fit on the screen then it will be adjusted leftward and upward
	 * by enough pixels so that it shows.
	 * @param {object} [params] Parameters
	 * @param  {Boolean} [params.bypassOverlay=false] If true will not display the scrim overlay
	 * @param {Number} [params.x] X location of top left corner. Use for context menus, otherwise dialog will be centered.
	 * @param {Number} [params.y] Y location of top left corner. Use for context menus, otherwise dialog will be centered.
	 * @alias show
	 * @memberof WebComponents.cq-dialog
	 */
	show(params) {
		this.params = params;
		if (!params) params = this.params = {};
		var self = this;
		var context = params.context || CIQ.UI.getMyContext(this);
		if (!this.uiManager.overlay && !params.bypassOverlay) {
			this.uiManager.overlay = document.createElement("cq-dialog-overlay");
			if (context) context.node.append(this.uiManager.overlay);
		}
		self.active = true;
		setTimeout(function () {
			// to get the opacity transition effect
			if (self.uiManager.overlay && !params.bypassOverlay) {
				if (self.uiManager.overlay.getAttribute("cq-active") !== "true")
					self.uiManager.overlay.setAttribute("cq-active", "true");
			}
			self.activeAttributes["cq-active"] = true; // cq-active is what css uses to display the dialog
			for (var attribute in self.activeAttributes) {
				if (self.node.attr(attribute) !== "true")
					self.node.attr(attribute, "true");
			}
			self.resize();
		});

		// Add the theme class to the dialog. It exists outside of the theme context so it will not inherit the theme.
		if (context && context.config && context.config.themes) {
			let themes = Object.keys(context.config.themes.builtInThemes);
			// First remove any existing theme classes on the dialog
			this.classList.remove(...themes);
			let activeTheme = themes.find(
				(r) => context.topNode.classList.contains(r) === true
			);
			// Add the active theme class to the dialog
			if (activeTheme) this.classList.add(activeTheme);
		}

		// Set this dialog as active for tab navigation
		const keystrokeHub = this.ownerDocument.body.keystrokeHub;
		if (keystrokeHub) keystrokeHub.addActiveModal(this);
	}

	stxContextMenu() {
		var parent = this.parentElement;
		if (parent.tagName == "BODY") parent = window;
		var gSz = CIQ.guaranteedSize(parent);
		var w = gSz.width;
		var h = gSz.height;
		var outer = CIQ.elementDimensions(this, {
			padding: 1,
			border: 1
		});
		var cw = outer.width;
		var ch = outer.height;
		var left = this.params.x;
		var top = this.params.y;
		var saveAdjustedPosition = false;

		this.node.find("cq-menu.stxMenuActive").each(function () {
			if (this.querySelector(".context-menu-right")) {
				var overlapItemCount = CIQ.UI.$(this).nextAll().length + 1;

				var outerMenu = CIQ.elementDimensions(this, {
					padding: 1,
					border: 1
				});
				var outerContext = CIQ.elementDimensions(
					this.querySelector(".context-menu-right"),
					{ padding: 1, border: 1 }
				);
				cw += outer.width;
				ch += outerContext.height - outerMenu.height * overlapItemCount;
				saveAdjustedPosition = true;
			}
		});

		const leftOffset = this.params.context.topNode.getBoundingClientRect().left;
		const topOffset = this.params.context.topNode.getBoundingClientRect().top;

		if (left - leftOffset + cw > w) left = leftOffset + (w - cw);
		if (top - topOffset + ch > h) top = topOffset + (h - ch);
		if (top < 0) top = 0;
		if (saveAdjustedPosition) {
			this.params.x = left;
			this.params.y = top;
		}

		Object.assign(this.style, {
			top: `${top}px`,
			left: `${left}px`,
			"margin-top": "auto"
		});
	}

	tap(e) {
		var topMenu = this.uiManager.topMenu();
		if (topMenu === this) {
			e.stopPropagation(); // prevent a tap inside the dialog from closing itself
			return;
		}
		if (!e.currentTarget.active) {
			e.stopPropagation(); // If the dialog we tapped on is closed, then we must have closed it manually. Don't allow a body tap otherwise we'll close two dialogs!
		}
	}
}

CIQ.UI.addComponentDefinition("cq-dialog", Dialog);
