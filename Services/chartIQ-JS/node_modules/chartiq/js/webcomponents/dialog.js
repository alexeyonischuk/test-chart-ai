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
 * <h4>&lt;cq-dialog&gt;</h4>
 *
 * Manages general dialog interaction such as display, hide, location, size, tap interaction, etc.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute       | description |
 * | :-------------- | :---------- |
 * | cq-title        | Display text in dialog heading. |
 * | cq-description  | Optional description of dialog. |
 * | cq-close-button | Set to "false" to hide the close (X) button in uppper right corner. Note: Users can still close the dialog by clicking outside of it or pressing the Esc key. |
 *
 * Initial attribute values can be configured in the context configuration.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is opened or closed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | effect | "hide", "show" |
 * | title | heading of dialog |
 * | type | tag name of dialog being wrapped |
 *
 * @example <caption>A dialog container</caption>
 *	<cq-dialog cq-timezone-dialog>
 *		<cq-timezone-dialog>
 *		 ...
 *		</cq-timezone-dialog>
 *	</cq-dialog>
 *
 * @example <caption>Configuring the attributes</caption>
 *	stxx.uiContext.config.dialogs.timezone = {
 *		tag: "cq-timezone-dialog",
 *		attributes: {
 *			"cq-title": "Choose Timezone",
 *			description: "To set your timezone use the location button below, or scroll through the following list..."
 *		}
 *	];
 *
 * @alias WebComponents.Dialog
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Dialog extends CIQ.UI.BaseComponent {
	static get observedAttributes() {
		return ["cq-title", "cq-description", "cq-close-button"];
	}

	constructor() {
		super();
		this.activeAttributes = {};
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		this.isDialog = true;
		super.connectedCallback();

		const handleTap = (e) => this.tap(e);

		CIQ.UI.stxtap(this, handleTap);

		const uiManager = CIQ.UI.getUIManager(this);
		uiManager.registerForResize(this);
		this.uiManager = uiManager;

		if (!this.hasAttribute("cq-no-claim")) this.addClaim(this);
		if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");

		// Attach cq-close, h4 header and description if needed
		this._renderTitleElement();
		this._renderCloseButton();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Dialog);
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		this.uiManager.unregisterForResize(this);
		super.disconnectedCallback();
	}

	/**
	 * Renders the close button on the dialog, if applicable
	 *
	 * @tsmember WebComponents.Dialog
	 * @private
	 */
	_renderCloseButton() {
		const showCloseButton = this.getAttribute("cq-close-button") !== "false";
		let closeButtonEl = this.querySelector("cq-close");

		if (showCloseButton && !closeButtonEl) {
			// TODO: make this a button element once everything else works
			closeButtonEl = document.createElement("cq-close");
			closeButtonEl.setAttribute("role", "button");
			closeButtonEl.setAttribute("title", "Close");
			closeButtonEl.setAttribute("tabindex", "0");
			// Close button is appended to the end so it is read last by screen readers. Visually,
			// it appears in the upper right corner.
			this.append(closeButtonEl);
		} else if (!showCloseButton && closeButtonEl) {
			closeButtonEl.remove();
		}
	}

	/**
	 * Renders the title on the dialog, if applicable
	 *
	 * @return {HTMLElement} Element containing the title.
	 * @tsmember WebComponents.Dialog
	 * @private
	 */
	_renderTitleElement() {
		const title = this.getAttribute("cq-title") || "";
		const titleId = this.getAttribute("aria-labelledby");
		let titleEl = this.querySelector("#" + titleId);

		if (!title && titleEl) titleEl.remove();
		else if (title) {
			if (!titleEl) {
				titleEl = document.createElement("h4");
				titleEl.id = titleId;
				this.prepend(titleEl);
			}

			if (this.context)
				CIQ.makeTranslatableElement(titleEl, this.context.stx, title);
			else titleEl.innerText = title;
		}

		if (titleEl) {
			let sibling = titleEl.nextSibling;
			const hasDesc = sibling && sibling.matches("p[id]");
			const description = this.getAttribute("cq-description") || "";
			if (!description) {
				if (hasDesc) sibling.remove();
			} else {
				if (!hasDesc) {
					sibling = document.createElement("p");
					// Add the description directly after the title
					titleEl.parentElement.insertBefore(sibling, titleEl.nextSibling);
				}
				sibling.id = this.getAttribute("aria-describedby");
				if (this.context)
					CIQ.makeTranslatableElement(sibling, this.context.stx, description);
				else sibling.innerHTML = description;
			}
		}
		return titleEl;
	}

	/**
	 * Forces a title change, even if the title is the same as before.
	 * Use this method to change the title of the dialog rather than just changing the cq-title attribute;
	 *
	 * @param {string} title New title
	 *
	 * @tsmember WebComponents.Dialog
	 */
	setTitle(title) {
		this.setAttribute("cq-title", "");
		this.setAttribute("cq-title", title);
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Dialog
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (newValue === oldValue) return;
		this[name] = newValue;
		switch (name) {
			case "cq-title":
			case "cq-description":
				this._renderTitleElement();
				return;
			case "cq-close-button":
				this._renderCloseButton();
				return;
		}
	}

	/**
	 * Finds the first element in `items` that has a `cq-focused` attribute or a name attribute
	 * that matches the value of `activeElementName`. If found, that element is focused.
	 *
	 * @tsmember WebComponents.Dialog
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

	/**
	 * Returns an array of dialog elements that are keyboard selectable.
	 *
	 * @return {NodeList} An array of DOM elements
	 *
	 * @tsmember WebComponents.Dialog
	 */
	getKeyboardSelectableItems() {
		return this.querySelectorAll(
			"[keyboard-selectable='true'], [tabindex='0'], input, .ciq-select, cq-swatch, .ciq-btn, .ciq-btn-negative, cq-scroll li, ul cq-item, .ciq-filter"
		);
	}

	/**
	 * Handle the keystroke event to keyboard navigate the dialog.
	 * Tab and Enter are supported.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Dialog
	 */
	keyStroke(hub, key, e) {
		if (hub.tabActiveModals[0] !== this) return false;
		const reverse = key === "ArrowUp" || e.shiftKey;

		if (key === "ArrowUp" || key === "ArrowDown") {
			key = "Tab";
		}

		const nativeTabbing = this.hasAttribute("native-tabbing");

		const items = this.getKeyboardSelectableItems();
		if (key === "Tab" && !nativeTabbing) {
			const focused = this.focusNextItem(items, reverse, true);
			const scroll = this.querySelector("cq-scroll");
			if (focused && scroll) {
				// Scroll to the element that was focused
				scroll.scrollToElement(focused);
				// Let the scroll complete before aligning the highlight
				setTimeout(() => hub.highlightAlign());
				return true;
			}
		} else if (key == "Enter" || key === " ") {
			const focused = this.findFocused(items)[0];

			if (focused) {
				this.clickItem(focused, e, this);
				if (focused.tagName === "INPUT" && typeof focused.click === "function")
					focused.click();
				return true;
			}
		}
		return false;
	}

	/**
	 * Hides the highlight on select because the study dialog contents re-render quite often, throwing off the highlight position (e.g. When a dropdown selection is made).
	 * Called when dialog becomes keyboard navigable
	 *
	 * @tsmember WebComponents.Dialog
	 */
	onKeyboardSelection() {
		// Pressing the tab key will re-focus the next appropriate item and helps the user re-orient themselves.
		this.keyboardNavigation.highlightHide();
	}

	/**
	 * If we're using keyboard navigation, returns the highlight to the tab selected element.
	 * Called when dialog is no longer keyboard navigable.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	onKeyboardDeselection() {
		if (this.keyboardNavigation && this.keyboardNavigation !== null)
			this.keyboardNavigation.highlightAlign();
	}

	/**
	 * Click a keyboard selectable element.
	 *
	 * @param {HTMLElement} item Element to click.
	 * @param {Event} e The keystroke event.
	 * @param {HTMLElement} originationElement The keyboard active element which initiated the click.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	clickItem(item, e, originationElement) {
		// Pass control to the dropdown. Dropdowns within the dialog become detached from their
		// parent in the dom and cannot pass comtrol directly.
		if (item && this.keyboardNavigation) {
			const dropdown = item.querySelector("cq-dropdown, cq-menu-dropdown");
			if (dropdown) {
				dropdown.keyboardOriginationElement = originationElement;
				this.keyboardNavigation.setKeyControlElement(dropdown);
			}
		}
		super.clickItem(item, e, this);
	}

	/**
	 * Handle escape key press.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key.
	 * @return {boolean} returns false if nothing was done.
	 *
	 * @tsmember WebComponents.Dialog
	 */
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
	 * Close the active menu.
	 *
	 * @return {boolean} returns true if a menu was closed.
	 *
	 * @tsmember WebComponents.Dialog
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
	 * Creates a new attribute to be activated when the dialog is open. Use this to style the dialog.
	 * This is automatically set by any component that is derived from DialogContentTag.
	 *
	 * @param {string} attribute The attribute to add or remove
	 * @since  4.1.0
	 * @example
	 * <style> cq-dialog[cq-study-context]{ padding:0; } </style>
	 * <cq-dialog cq-study-context></cq-dialog>
	 *
	 * @tsmember WebComponents.Dialog
	 */
	addActiveAttribute(attribute) {
		this.activeAttributes[attribute] = true;
	}

	center() {
		return;
	}

	/**
	 * Close the dialog and make it inactive.  Calls the `onClose()` function if it is defined on this component.
	 * @param {boolean} [propagate] True if child elements should also call onClose functions
	 *
	 * @tsmember WebComponents.Dialog
	 */
	close(propagate) {
		this.uiManager.closeMenu(this);
		if (this.onClose) this.onClose(propagate);
		this.parentElement.removeAttribute("cq-active");
	}

	/**
	 * Hide the dialog.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	hide() {
		this.enableMultichartColorPickerFloat(false);
		if (!this.active || this.querySelector(":invalid")) return;
		this.active = false;
		// Call the "hide()" function for any immediate children. This will allow nested
		// components to clean themselves up when a dialog is removed from outside of their scope.
		[...this.children].forEach((child) => {
			if (typeof child.hide == "function") child.hide();
		});
		if (
			this.uiManager.overlay &&
			this.uiManager.overlay.hasAttribute("cq-active")
		)
			this.uiManager.overlay.removeAttribute("cq-active");
		//this.uiManager.overlay=null;
		for (let attribute in this.activeAttributes) {
			if (this.hasAttribute(attribute)) this.removeAttribute(attribute);
		}
		this.activeAttributes = {};

		// blur any input boxes that are inside the dialog we're closing, to get rid of soft keyboard
		[...this.querySelectorAll("input")].forEach((input) => {
			if (input == input.ownerDocument.activeElement) input.blur();
		});

		// Blur any focused elements
		this.removeFocused();
		// Remove this dialog from the active index
		const { keystrokeHub } = this.ownerDocument.body;
		if (keystrokeHub) keystrokeHub.removeActiveModal(this);
		this.parentElement.removeAttribute("cq-active");
		if (!this.matches("cq-color-picker"))
			this.ownerDocument.body.classList.remove("ciq-dialog-open");
		this.setAttribute("role", "dialog");
		this.ariaHidden = "true";

		if (
			document.activeElement.tagName !== "INPUT" &&
			document.activeElement.tagName !== "TEXTAREA"
		) {
			let { caller } = this;
			// If a caller isn't set, jump back to the beginning
			if ((!caller || !caller.focus) && this.context)
				caller = this.context.topNode.querySelector("cq-chart-instructions");

			while (caller && !CIQ.trulyVisible(caller)) caller = caller.parentElement;
			if (caller)
				setTimeout(() => {
					if (!caller.closest("[native-tabbing]")) caller.tabIndex = -1;
					caller.focus();
				}, 10);
		}

		this.emitCustomEvent({
			action: null,
			cause: "helper",
			effect: "hide",
			detail: {
				title: this["cq-title"],
				type: this.wraps
			}
		});
	}

	/**
	 * Hook for launching color picker, it needs to close menus.
	 *
	 * @tsmember WebComponents.Dialog
	 * @private
	 */
	launchColorPicker() {
		if (this.uiManager) this.uiManager.closeMenu(null, "CQ-MENU");
	}

	/**
	 * Open the dialog.
	 *
	 * @param {object} params Dialog parameters
	 * @param {HTMLElement} params.caller The HTML element that triggered this dialog to open
	 *
	 * @tsmember WebComponents.Dialog
	 */
	open(params) {
		this.uiManager.openMenu(this, params);
		// Capture context to be able to later notify dialog closing in channel
		const { context, caller } = params || {};
		this.context = context;
		if (!context || !context.config) {
			this.onClose = null;
			return;
		}

		this.caller = caller || document.activeElement;

		const {
			config: { channels },
			stx
		} = context;

		if (stx.translateUI) stx.translateUI(this);

		this.onClose = (propagate) => {
			this.channelWrite(channels.dialog || "channel.dialog", {}, stx);
			this.onClose = null;
			if (!propagate) return;
			// If Dialog content has a hide method, call it.
			[...this.children].forEach((child) => {
				if (child.hide) child.hide();
				if (child.onClose) child.onClose();
			});
		};
		this.parentElement.setAttribute("cq-active", true);
		this.ariaHidden = "false";
		if (!this.matches("cq-color-picker")) {
			this.ownerDocument.body.classList.add("ciq-dialog-open");
			// The color picker will focus itself
			setTimeout(() => {
				this.tabIndex = -1;
				this.focus();
			}, 10);
		}
		this.emitCustomEvent({
			action: null,
			cause: "helper",
			effect: "show",
			detail: {
				title: this["cq-title"],
				type: this.wraps
			}
		});

		this.enableMultichartColorPickerFloat(true);
	}

	/**
	 * Configure CSS layering to enable the color picker to float above the dialog.
	 *
	 * @param {boolean} [val=true] Setting "val" to false will restore the original style values of the element.
	 *
	 * @tsmember CIQ.UI.DialogContentTag
	 * @since 9.3.0
	 */
	enableMultichartColorPickerFloat(val) {
		const tagName = (Object.entries(this.activeAttributes).find(
			([k, v]) => k !== "cq-active" && v
		) || [])[0];
		if (!tagName) return;
		if (tagName.includes("-context")) return;

		document
			.querySelectorAll(
				"cq-context-wrapper, .ciq-multi-chart-container-wrapper"
			)
			.forEach((el) => (el.style.zIndex = val ? "inherit" : ""));
		document
			.querySelectorAll(".ciq-multi-chart-container-wrapper")
			.forEach((el) => (el.style.overflow = val ? "visible" : ""));
	}

	/**
	 * Handles dialog resizing. Resizes child `cq-scroll` elements. Centers the dialog.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	resize() {
		const scrollers = this.querySelectorAll("cq-scroll");
		[...scrollers].forEach((scroller) => {
			if (scroller.resize) scroller.resize();
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
	 *
	 * @tsmember WebComponents.Dialog
	 */
	show(params) {
		if (this.active) return;
		this.params = params;
		if (!params) params = this.params = {};
		const context = params.context || CIQ.UI.getMyContext(this);
		if (!this.uiManager.overlay && !params.bypassOverlay) {
			this.uiManager.overlay = document.createElement("cq-dialog-overlay");
			if (context) context.node.append(this.uiManager.overlay);
		}
		this.active = true;
		const timeoutFcn = () => {
			// to get the opacity transition effect
			if (this.uiManager.overlay && !params.bypassOverlay) {
				if (this.uiManager.overlay.getAttribute("cq-active") !== "true")
					this.uiManager.overlay.setAttribute("cq-active", "true");
			}
			this.activeAttributes["cq-active"] = true; // cq-active is what css uses to display the dialog
			for (let attribute in this.activeAttributes) {
				if (this.getAttribute(attribute) !== "true")
					this.setAttribute(attribute, "true");
			}
			this.resize();
		};
		setTimeout(timeoutFcn.bind(this));

		// Add the theme class to the dialog. It exists outside of the theme context so it will not inherit the theme.
		if (context && context.config && context.config.themes) {
			const themes = Object.keys(context.config.themes.builtInThemes);
			// First remove any existing theme classes on the dialog
			this.classList.remove(...themes);
			const activeTheme = themes.find(
				(r) => context.topNode.classList.contains(r) === true
			);
			// Add the active theme class to the dialog
			if (activeTheme) this.classList.add(activeTheme);
		}

		// Set this dialog as active for tab navigation
		const { keystrokeHub } = this.ownerDocument.body;
		if (keystrokeHub) keystrokeHub.addActiveModal(this);
	}

	/**
	 * Set context menu position to mouse location.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	stxContextMenu() {
		let parent = this.parentElement;
		if (parent.tagName == "BODY") parent = window;
		const gSz = CIQ.guaranteedSize(parent);
		const w = gSz.width;
		const h = gSz.height;
		const outer = CIQ.elementDimensions(this, {
			padding: 1,
			border: 1
		});
		let cw = outer.width;
		let ch = outer.height;
		let left = this.params.x;
		let top = this.params.y;
		let saveAdjustedPosition = false;

		[...this.querySelectorAll("cq-menu.stxMenuActive")].forEach(
			(activeMenu) => {
				if (activeMenu.querySelector(".context-menu-right")) {
					const siblings = [...activeMenu.parentNode.children];
					const overlapItemCount =
						siblings.length - siblings.indexOf(activeMenu);

					const outerMenu = CIQ.elementDimensions(activeMenu, {
						padding: 1,
						border: 1
					});
					const outerContext = CIQ.elementDimensions(
						activeMenu.querySelector(".context-menu-right"),
						{ padding: 1, border: 1 }
					);
					cw += outer.width;
					ch += outerContext.height - outerMenu.height * overlapItemCount;
					saveAdjustedPosition = true;
				}
			}
		);

		const insideChartContext = this.closest("cq-context");
		const leftOffset = insideChartContext
			? this.params.context.topNode.getBoundingClientRect().left
			: 0;
		const topOffset = insideChartContext
			? this.params.context.topNode.getBoundingClientRect().top
			: 0;

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

	/**
	 * Tap event handler for dialog.
	 * Prevents touch and mouse events from propagating outside of the dialog.
	 *
	 * @param {Event} e tap event
	 *
	 * @tsmember WebComponents.Dialog
	 */
	tap(e) {
		const topMenu = this.uiManager.topMenu();
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
