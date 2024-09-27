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

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Menu web component `<cq-menu>`.
 *
 * Add attribute `cq-focus` to provide a query selector path to the element to focus when the
 * menu is opened.
 *
 * The node is contextually aware of its surroundings. Handles opening and closing
 * {@link WebComponents.cq-menu-dropdown}.
 *
 * @namespace WebComponents.cq-menu
 *
 * @example
 * <cq-menu class="ciq-menu stx-markers collapse">
 * 	   <span>Events</span>
 * 	   <cq-menu-dropdown>
 * 		   <cq-item class="square">Simple Square <span class="ciq-radio"><span></span></span>
 * 		   </cq-item>
 * 		   <cq-item class="circle">Simple Circle <span class="ciq-radio"><span></span></span>
 * 		   </cq-item>
 * 		   <cq-item class="callouts">Callouts <span class="ciq-radio"><span></span></span>
 * 		   </cq-item>
 * 		   <cq-item class="abstract">Abstract <span class="ciq-radio"><span></span></span>
 * 		   </cq-item>
 * 		   <cq-item class="none">None <span class="ciq-radio ciq-active"><span></span></span>
 * 		   </cq-item>
 * 	   </cq-menu-dropdown>
 * </cq-menu>
 */
class Menu extends HTMLElement {
	constructor() {
		super();
		this.activeClassName = "stxMenuActive";
		this.active = false;
		this.adjustLiftPosition = this.adjustLiftPosition.bind(this);
	}

	/**
	 * READ ONLY. The value of the `cq-focus` attribute.
	 *
	 * @alias focusElement
	 * @memberof WebComponents.cq-menu
	 * @type String
	 * @since 7.5.0
	 */
	get focusElement() {
		return this.getAttribute("cq-focus");
	}

	connectedCallback() {
		if (this.attached) return;
		this.uiManager = CIQ.UI.getUIManager(this);

		this.attached = true;

		if (this.hasAttribute("readonly")) return;
		var self = this;
		function handleTap(e) {
			self.tap(e);
		}
		function handleCaptureTap(e) {
			self.captureTap(e);
		}
		this.addEventListener("stxtap", handleCaptureTap, true);
		CIQ.UI.stxtap(this, handleTap);

		window.addEventListener("resize", this.adjustLiftPosition);
	}

	adoptedCallback() {
		CIQ.UI.flattenInheritance(this, Menu);
	}

	disconnectedCallback() {
		window.removeEventListener("resize", this.adjustLiftPosition);
	}

	/**
	 * Captures a tap event *before* it descends down to what it is clicked on. The key thing this does is determine
	 * whether the thing clicked on was inside of a "cq-no-close" section. We do this on the way down, because the act
	 * of clicking on something may release it from the dom, making it impossible to figure out on propagation.
	 * @param {object} e Element
	 * @private
	 */
	captureTap(e) {
		var domChain = Array.from(CIQ.climbUpDomTree(e.target));
		// Determine if the tapped element, or any of its parents have a cq-no-close attribute
		this.noClose = domChain.filter(function (el) {
			var attr = el.getAttribute("cq-no-close");
			return attr !== null && attr !== false;
		}).length;

		// Determine if the tapped element was inside of something untappable, like a cq-heading or cq-separator
		if (!this.noClose) {
			this.noClose = domChain.filter(function (el) {
				return el.matches("cq-separator,cq-heading");
			}).length;
		}
	}

	close() {
		this.uiManager.closeMenu(this);
	}

	findLifts() {
		return [...this.querySelectorAll("*[cq-lift]")].filter((lift) => {
			// only valid if the closest cq-menu or cq-dialog parent is the menu itself
			// otherwise the lift is in a nested menu
			return lift.closest("cq-menu,cq-dialog") == this;
		});
	}

	hide() {
		if (!this.active) return;
		this.unlift();
		this.classList.remove(this.activeClassName);
		this.active = false;
		// blur any input boxes that are inside the menu we're closing, to get rid of soft keyboard
		this.querySelectorAll("input").forEach(function (i) {
			if (i == i.ownerDocument.activeElement) i.blur();
		});
		// Disable keyboardNavigation controls in the dropdown
		const dropdown = this.querySelector("cq-menu-dropdown");
		if (dropdown) {
			dropdown.disablekeyboardNavigation();
			// Remove focus from any selected menu item
			CIQ.UI.BaseComponent.prototype.removeFocused(
				dropdown.querySelectorAll("[cq-focused]")
			);
		}
		if (this.ownerDocument.body.keystrokeHub) {
			let { tabActiveModals } = this.ownerDocument.body.keystrokeHub;
			if (tabActiveModals[0])
				this.ownerDocument.body.keystrokeHub.setKeyControlElement(
					tabActiveModals[0]
				);
		}

		// Close the lookup component
		const lookup = this.querySelector("cq-lookup");
		if (lookup) lookup.close();
	}

	lift() {
		const context = CIQ.UI.getMyContext(this);
		const lifts = (this.lifts = this.findLifts());
		lifts.forEach((lift) => {
			// The lifted menu will no longer inherit the active theme class. Attach it directly to the element.
			if (context && context.config && context.config.themes) {
				let themes = Object.keys(context.config.themes.builtInThemes);
				// First remove any existing theme classes on the dialog
				lift.classList.remove(...themes);
				let activeTheme = themes.find(
					(r) => context.topNode.classList.contains(r) === true
				);
				// Add the active theme class to the dialog
				if (activeTheme) lift.classList.add(activeTheme);
			}

			const scrollElement = lift.closest("cq-scroll");
			if (scrollElement) {
				scrollElement.addEventListener("scroll", this.adjustLiftPosition);
			}

			this.uiManager.lift(lift);
			lift.remember.scrollParent = scrollElement;
		});
	}

	adjustLiftPosition() {
		if (!this.lifts) return;
		this.lifts.forEach((lift) => {
			const { parentNode } = lift.remember;
			const rect = parentNode.getBoundingClientRect();
			const PARENT_BORDER_WIDTH = 1;

			lift.style.top = rect.bottom - PARENT_BORDER_WIDTH + "px";
			lift.style.left = rect.left + "px";
		});
	}

	onKeyboardDeselection() {
		this.close();
	}

	open(params) {
		var stack = this.uiManager.activeMenuStack;
		for (var i = 0; i < stack.length; i++) {
			if (stack[i] === this) return;
		}
		this.uiManager.openMenu(this, params);
	}

	restoreLift(element) {
		if (!element) return;
		const { remember } = element;
		const scrollElement = remember.scrollParent;
		if (scrollElement)
			scrollElement.removeEventListener("scroll", this.adjustLiftPosition);
		element.doNotDisconnect = true;
		element.remove();
		delete element.doNotDisconnect;
		Object.assign(element.style, remember.css);
		remember.parentNode.appendChild(element);
	}

	show(params) {
		if (this.active) return;
		this.active = true;
		this.classList.add(this.activeClassName);
		this.lift();
		// For good measure, call resize on any nested scrollables to give them
		// a chance to change their height and scrollbars
		this.querySelectorAll("cq-scroll, cq-menu-dropdown").forEach(function (s) {
			if (s.resize && !s.hasAttribute("cq-no-scroll")) s.resize();
		});
		// Pass keyboard navigation over to the dropdown if it exists
		if (this.keyboardNavigation) {
			const dropdown = this.querySelector("cq-menu-dropdown");
			if (dropdown)
				this.keyboardNavigation.setKeyControlElement(dropdown, true);
		}
	}

	tap(e) {
		e.stopPropagation();
		// Store cancelBubble state for subsequent phases in event bubble
		e._cancelBubble = e.cancelBubble;
		var uiManager = this.uiManager;
		if (this.active) {
			// tapping on the menu if it is open will close it
			if (!this.noClose) uiManager.closeMenu(this);
		} else {
			// if we've clicked on the label for the menu, then open the menu

			// If the tap came from within this menu's cq-menu-dropdown then this is probably an accidental
			// "re-open", which occurs when a click on a menu item causes an action that closes the menu, tricking
			// it into thinking it should re-open
			var insideDropdown = e.target.closest("cq-menu-dropdown");
			if (insideDropdown) return;

			var child = false;
			var parents = CIQ.climbUpDomTree(this.parentElement, "cq-menu");
			for (var i = 0; i < parents.length; i++) {
				if (parents[i].active) child = true;
			}
			if (!child) uiManager.closeMenu(null, "CQ-MENU, CQ-COLOR-PICKER"); // close all menus or color pickers, unless we're the child of an active menu (cascading)

			this.open();

			if (this.focusElement && !CIQ.isMobile) {
				let el = this.querySelector(this.focusElement);
				if (!el && this.lifts && this.lifts.length)
					el = this.lifts[0].querySelector(this.focusElement);
				if (el) el.focus();
			}
		}
	}

	unlift() {
		const { lifts } = this;
		if (!lifts) return;
		lifts.forEach((lift) => this.restoreLift(lift));
		this.lifts = null;
	}
}

CIQ.UI.addComponentDefinition("cq-menu", Menu);
