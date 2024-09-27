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
import "../../js/webcomponents/clickable.js";
import "../../js/webcomponents/dropdown.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-menu&gt;</h4>
 *
 * When tapped/clicked, this component will reveal or hide a dropdown menu.
 * The component is represented by either text, an icon, both, or either depending on the browser dimensions.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute   | description |
 * | :---------- | :---------- |
 * | binding       | Helper function to call which will register a listener when the menu is opened/closed.  Usually used to reflect the current menu selection as text or an icon. |
 * | config        | Key pointing to a configuration file entry which specifies the menu options. |
 * | help-id       | A key to the correct help text in CIQ.Help.Content. |
 * | icon          | Class name for image to use for the menu. |
 * | reader        | Accessibility text when focused by a screen reader. If omitted, will use value of `text` attribute. |
 * | responsive    | Set this attribute if the text displayed on this component should change to an icon when the viewport's dimensions are reduced. |
 * | state         | The current state of the menu. |
 * | text          | Displayed label for this menu. |
 * | tooltip       | Text for the tooltip which appears when hovering over the component. |
 * | lift-dropdown | Lifts dropdown to the top level of the css stacking context. |
 *
 * Do not include the `icon` or `text` attributes if you don't want any icon or text, respectively.
 *
 * In addition, the following attributes are also supported:
 * | attribute   | description |
 * | :---------- | :---------- |
 * | cq-focus    | A selector to an element within the menu for which to provide focus. |
 * | cq-no-close | Set to true to force the menu to stay open when clicking on something in it (deprecated). |
 *
 * If no markup is specified in the menu component, a default markup will be provided.
 * In order to use the default markup, the selections in the menu's dropdown must be configured in the chart configuration file and specified
 * by key in the `config` attribute.  See example.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is opened or closed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "open", "close" |
 * | action | "click" |
 *
 * `cause` and `action` are set only when the menu is opened or closed as a direct result of clicking on the component.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Menu with binding:</caption>
 * <cq-menu class="nav-dropdown ciq-period" config="period" binding="Layout.periodicity" text="Periodicity"></cq-menu>
 * @example <caption>Menu with responsive icon:</caption>
 * <cq-menu class="nav-dropdown ciq-markers alignright" config="markers" text="Events" icon="events" responsive tooltip="Events"></cq-menu>
 * @example <caption>Sample configuration of a menu:</caption>
 * // set the menu component's config attribute to "example"
 * // This is documented further in the cq-dropdown component
 * stxx.uiContext.config.menus.example = {
 * 		content: [
 *			{ type: "radio", label: "Show Dynamic Callout", setget: "Layout.HeadsUp", value: "dynamic" },
 *			{ type: "radio", label: "Show Tooltip", setget: "Layout.HeadsUp", feature: "tooltip", value: "floating" }
 * 		]
 * };
 *
 * @alias WebComponents.Menu
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Menu extends CIQ.UI.BaseComponent {
	static get observedAttributes() {
		return [
			"binding",
			"config",
			"help-id",
			"icon",
			"reader",
			"responsive",
			"state",
			"text",
			"tooltip",
			"lift-dropdown"
		];
	}

	/**
	 * READ ONLY. The value of the `cq-focus` attribute.
	 *
	 * @type {String}
	 * @since 7.5.0
	 * @tsmember WebComponents.Menu
	 * @tsdeclaration
	 * const focusElement : String
	 */
	get focusElement() {
		return this.getAttribute("cq-focus");
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
		this.activeClassName = "stxMenuActive";
		this.active = false;
		this.adjustLiftPosition = this.adjustLiftPosition.bind(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		this.uiManager = CIQ.UI.getUIManager(this);

		if (this.isShadowComponent && this.children.length) {
			while (this.children.length) {
				this.root.appendChild(this.firstChild);
			}
		}
		this.markup = this.trimInnerHTMLWhitespace();
		this.usingMarkup = !!this.markup.match(/\{\{(.{1,20}?)\}\}/g);
		this.setMarkup();
		this.setupShadow();

		if (!this.listenersAdded) {
			this.addEventListener("stxtap", (e) => this.captureTap(e), true);
			CIQ.UI.stxtap(this, (e) => this.tap(e));
			this.listenersAdded = true;
		}

		window.addEventListener("resize", this.adjustLiftPosition);
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Menu);
		this.constructor = Menu;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Menu
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		const isLifted = this.lifts;
		if (isLifted) this.unlift();
		if (name === "state") this.processStateChange();
		else if (this.usingMarkup) {
			this.setMarkup();
		} else {
			// do nothing when using predefined content
		}
		if (isLifted) this.lift();
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		window.removeEventListener("resize", this.adjustLiftPosition);
		super.disconnectedCallback();
	}

	/**
	 * Captures a tap event *before* it descends down to what it is clicked on. The key thing this does is determine
	 * whether the thing clicked on was inside of a "cq-no-close" section. We do this on the way down, because the act
	 * of clicking on something may release it from the dom, making it impossible to figure out on propagation.
	 * @param {Event} e Event
	 * @private
	 *
	 * @tsmember WebComponents.Menu
	 */
	captureTap(e) {
		const clickedMenuIcons = () => {
			const bounds = this.getBoundingClientRect();
			return (
				e.pageX >= bounds.left &&
				e.pageX <= bounds.right &&
				e.pageY >= bounds.top &&
				e.pageY <= bounds.bottom
			);
		};

		// Determine if the tapped element has menu persistence enabled
		const composedPath = e.composedPath();
		// this === composedPath[0] means that means user clicked on non-clickable portion of dropdown, if clickedMenuIcons() returns false
		this.noClose =
			(this === composedPath[0] && !clickedMenuIcons()) ||
			composedPath.some((el) => {
				const attr = el.getAttribute && el.getAttribute("cq-no-close");
				return (
					(attr !== null && attr !== undefined && attr !== "false") ||
					(el.params && el.params.menuPersist)
				);
			});

		// Old stuff
		// Determine if the tapped element was inside of something untappable, like a cq-heading or cq-separator
		if (!this.noClose) {
			this.noClose = e.composedPath().some((el) => {
				return el.matches && el.matches("cq-separator,cq-heading");
			});
		}
	}

	/**
	 * Closes the menu.  This call will be passed to the UI Manager to close any parent menus.
	 *
	 * @tsmember WebComponents.Menu
	 */
	close() {
		this.uiManager.closeMenu(this);
	}

	/**
	 * Returns the menu to its collapsed state.  This will restore any lifts as well.
	 * This is called indirectly by {@link WebComponents.Menu#close}.
	 *
	 * @tsmember WebComponents.Menu
	 */
	hide() {
		if (!this.active) return;
		this.unlift();
		this.classList.remove(this.activeClassName);
		this.setAriaPressed();
		const screenReaderButton = this.root.querySelector("[aria-expanded]");
		if (screenReaderButton) screenReaderButton.ariaExpanded = false;
		this.active = false;
		this.state = "closed";
		// blur any input boxes that are inside the menu we're closing, to get rid of soft keyboard
		this.qsa("input", this, true).forEach((i) => {
			if (i === CIQ.getActiveElement()) i.blur();
		});
		this.root.querySelectorAll("cq-lookup").forEach((s) => {
			s.classList.remove("active");
		});
		// Disable keyboardNavigation controls in the dropdown
		const dropdown = this.root.querySelector("cq-dropdown, cq-menu-dropdown");
		if (dropdown) {
			dropdown.disablekeyboardNavigation();
		}
		if (this.ownerDocument.body.keystrokeHub) {
			let { tabActiveModals } = this.ownerDocument.body.keystrokeHub;
			if (tabActiveModals[0])
				this.ownerDocument.body.keystrokeHub.setKeyControlElement(
					tabActiveModals[0]
				);
		}

		// Close the lookup component
		const lookup = this.root.querySelector("cq-lookup");
		if (lookup) lookup.close();
	}

	/**
	 * Repositions any menus which are nested within another menu or dialog so that they do not get cut off by their container's
	 * boundaries.  Lifts are menu dropdowns which have an attribute `cq-lift`.
	 *
	 * @tsmember WebComponents.Menu
	 */
	lift() {
		const findLifts = () => {
			return [...this.querySelectorAll("*[cq-lift]")].filter((lift) => {
				// only valid if the closest cq-menu or cq-dialog parent is the menu itself
				// otherwise the lift is in a nested menu
				return CIQ.climbUpDomTree(lift, "cq-menu,cq-dialog", true)[0] == this;
			});
		};
		const context = CIQ.UI.getMyContext(this);
		const lifts = (this.lifts = findLifts());
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

			const scrollElement = lift.closest("cq-scroll"); // TODO: cq-dialog has built-in scrolling?  Change element
			if (scrollElement) {
				lift.boundResize = lift.resize.bind(lift);
				scrollElement.addEventListener("scroll", this.adjustLiftPosition);
				scrollElement.addEventListener("scroll", lift.boundResize);
			}

			this.uiManager.lift(lift);
			lift.remember.scrollParent = scrollElement;
			// Focus the lifted menu
			setTimeout(() => {
				const root = lift.contentRoot || lift;
				root.tabIndex = -1;
				root.focus();
			}, 10);
			this.adjustLiftPosition();
		});
	}

	/**
	 * Computes the positioning for lifted menu dropdowns.
	 *
	 * @tsmember WebComponents.Menu
	 */
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

	/**
	 * Callback handler for when the keyboard navigation is removed from the element.
	 * This implementation closes the menu.
	 *
	 * @tsmember WebComponents.Menu
	 */
	onKeyboardDeselection() {
		this.close();
	}

	/**
	 * Opens the menu.  This call will be passed to the UI Manager to handle any overhead associated with menu opening.
	 *
	 * @param {object} params Menu configuration parameters
	 * @param {Event} params.e The event triggering the menu open.
	 *
	 * @tsmember WebComponents.Menu
	 */
	open(params) {
		this.uiManager.openMenu(this, params);
	}

	/**
	 * Opens or closes the menu if the attribute changes.
	 * @private
	 *
	 * @tsmember WebComponents.Menu
	 */
	processStateChange() {
		switch (this.state) {
			case "open":
				if (!this.active) this.open();
				break;
			case "closed":
				if (this.active) this.close();
				break;
			default:
				return;
		}
		this.emitCustomEvent({
			action: this.clicked ? "click" : null,
			effect: this.state
		});
	}

	/**
	 * Sets the content.
	 *
	 * @param {object[]} content Menu content.
	 * @param {boolean} [lift] Set to true to lift the menu dropdown.
	 *
	 * @tsmember WebComponents.Menu
	 */
	setContent(content, lift) {
		this.content = content;
		this.liftAttribute = lift;
		if (this.attached) this.setMarkup();
	}

	/**
	 * Sets the aria-pressed attribute.
	 *
	 * @param {boolean} [on] Set to true to set the aria attribute.
	 *
	 * @tsmember WebComponents.Menu
	 */
	setAriaPressed(on) {
		const ariaElem = this.root.querySelector("[aria-pressed]");
		if (ariaElem) {
			ariaElem.ariaPressed = !!on;
		}
	}

	/**
	 * Initializes the inner HTML of the component when the component is attached to the DOM without any existing inner HTML.
	 *
	 * @tsmember WebComponents.Menu
	 */
	setMarkup() {
		const { children } = this.root;
		if (!children.length || this.usingMarkup) {
			this.usingMarkup = true;
			if (children.length) {
				[...children].forEach((child) => {
					if (!["LINK", "STYLE"].includes(child.tagName)) child.remove();
				});
			}
			let markup = this.markup || this.constructor.markup;
			const names = markup.match(/\{\{(.{1,20}?)\}\}/g);
			if (names)
				names.forEach((name) => {
					const key = name.substring(2, name.length - 2);
					if (key.includes("_class")) return;
					const attr = this[key];
					if (attr == null) {
						if (key === "reader" && this.text)
							markup = markup.replace(name, this.text);
						else if (key === "icon") markup = markup.replace(name, "hidden");
						else if (key === "help-id")
							markup = markup.replace(/\{\{help_class\}\}/g, "hidden");
						else if (key === "text")
							markup = markup.replace("{{label_class}}", "hidden");
						else if (key === "tooltip")
							markup = markup.replace("{{tooltip_class}}", "hidden");
						else markup = markup.replace(name, "");
					} else {
						if (key === "help-id")
							markup = markup.replace(/\{\{help_class\}\}/g, "");
						else if (key === "text")
							markup = markup.replace("{{label_class}}", "");
						else if (key === "tooltip")
							markup = markup.replace("{{tooltip_class}}", "");
						else if (key === "responsive")
							markup = markup.replace("{{responsive}}", "responsive");
						else if (key === "lift-dropdown")
							markup = markup.replace("{{lift-dropdown}}", "cq-lift");
						markup = markup.replace(name, attr);
					}
				});
			this.addDefaultMarkup(null, markup);

			if (this.content && !this.config) {
				const dropDown = this.root.querySelector("cq-dropdown");
				if (dropDown) {
					dropDown.content = this.content;
					dropDown.noscroll = this.noscroll;
					dropDown.populate();
					if (this.liftAttribute) dropDown.setAttribute("cq-lift", "");
				}
			}

			const iconSpan = this.qsa(".menu-clickable .icon", this, true)[0];
			if (iconSpan && this.binding && this.hasAttribute("icon")) {
				iconSpan.setAttribute("ciq-menu-icon", "");
				this.classList.add("ciq-menu-icon");
			} else {
				this.classList.remove("ciq-menu-icon");
			}
		}
	}

	/**
	 * Expands the menu.
	 * This is called indirectly by {@link WebComponents.Menu#open}.
	 *
	 * @tsmember WebComponents.Menu
	 */
	show() {
		if (this.active) return;
		this.active = true;
		this.classList.add(this.activeClassName);
		this.state = "open";
		this.setAriaPressed(true);
		const screenReaderButton = this.root.querySelector("[aria-expanded]");
		if (screenReaderButton) screenReaderButton.ariaExpanded = true;
		this.lift();
		this.root.querySelectorAll("cq-lookup").forEach((s) => {
			s.classList.add("active");
		});
		// For good measure, call resize on any nested scrollables to give them
		// a chance to change their height and scrollbars
		this.root.querySelectorAll("cq-dropdown").forEach((s) => s.resize());
		// Pass keyboard navigation over to the dropdown if it exists
		if (this.ownerDocument.body.keystrokeHub) {
			const dropdown = this.root.querySelector("cq-dropdown");
			if (dropdown)
				this.ownerDocument.body.keystrokeHub.setKeyControlElement(
					dropdown,
					true
				);
		}
	}

	/**
	 * Handler for the stxtap event which is fired in non-capture mode.  This means it fires after {@link WebComponents.Menu@captureTap}.
	 * Will alternate between opening and closing the menu.
	 *
	 * @param {Event} e Event
	 *
	 * @tsmember WebComponents.Menu
	 */
	tap(e) {
		e.stopPropagation();
		const doc = this.document || document;
		if (e.ciqStamp && e.ciqStamp <= doc.lastTap) return; // stopPropagation not working on Safari with VO
		this.clicked = true;
		const { uiManager } = this;
		if (this.active) {
			// tapping on the menu if it is open will close it
			if (!this.noClose) {
				uiManager.closeMenu(this);
			}
		} else {
			// if we've clicked on the label for the menu, then open the menu

			// If the tap came from within this menu's cq-dropdown then this is probably an accidental
			// "re-open", which occurs when a click on a menu item causes an action that closes the menu, tricking
			// it into thinking it should re-open
			const insideDropdown = e
				.composedPath()
				.includes(this.root.querySelector("cq-dropdown"));
			if (insideDropdown) return;

			let child = false;
			e.composedPath()
				.filter((el) => el.matches && el.matches("cq-menu"))
				.forEach((parent) => {
					if (parent.active) child = true;
				});

			if (!child) {
				const isInDialog = CIQ.climbUpDomTree(e.target, "cq-dialog", true)[0];
				uiManager.closeMenu(
					null,
					"cq-menu,cq-color-picker" + (isInDialog ? "" : ",cq-dialog")
				); // close all menus or color pickers, unless we're the child of an active menu (cascading)
			}
			this.open({ e });

			if (this.focusElement && !CIQ.isMobile) {
				const el = this.qsa(this.focusElement, this, true)[0];
				if (el) el.focus();
				const dropdown = this.qsa("cq-dropdown", this, true)[0];
				if (dropdown) dropdown.setFocus(this.focusElement);
			}
		}
		delete this.clicked;
	}

	/**
	 * Restores any menus that were lifted using {@link WebComponents.Menu#lift}.
	 * This is usually done automatically when the menu is closed.
	 *
	 * @tsmember WebComponents.Menu
	 */
	unlift() {
		const restoreLift = (element) => {
			if (!element) return;
			const { remember } = element;
			const scrollElement = remember.scrollParent;
			if (scrollElement) {
				scrollElement.removeEventListener("scroll", this.adjustLiftPosition);
				scrollElement.removeEventListener("scroll", element.boundResize);
			}

			element.doNotDisconnect = true;
			element.remove();
			delete element.doNotDisconnect;
			Object.assign(element.style, remember.css);
			remember.parentNode.appendChild(element);
		};
		const { lifts } = this;
		if (!lifts) return;
		lifts.forEach((lift) => restoreLift(lift));
		this.lifts = null;
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * This markup contains placeholder values which the component replaces with values from its attributes.
 * Variables are represented in double curly-braces, for example: `{{text}}`.
 * The following variables are defined:
 * | variable      | source |
 * | :------------ | :----- |
 * | binding       | from attribute value |
 * | config        | from attribute value |
 * | reader        | from attribute value |
 * | icon          | from attribute value |
 * | text          | from attribute value |
 * | responsive    | from attribute value |
 * | help-id       | from attribute value |
 * | tooltip       | from attribute value |
 * | tooltip_class | "hidden" if `tooltip` attribute not specified |
 * | help_class    | "hidden" if `help-id` attribute not specified |
 * | label_class   | "hidden" if `text` attribute not specified |
 * | lift-dropdown | replaces the attribute value with a setting to lift the dropdown to the top level of the css stacking context |
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Menu
 */
Menu.markup = `
		<div class="menu-clickable {{responsive}}" aria-hidden="true">
			<cq-help class="{{help_class}}" help-id="{{help-id}}" aria-hidden="true"></cq-help>
			<span class="icon {{icon}}">
				<div cq-tooltip class="{{tooltip_class}}" aria-hidden="true">{{tooltip}}</div>
			</span>
			<span class="{{label_class}}" label stxbind="{{binding}}">{{text}}</span>
		</div>
		<div class="ciq-screen-reader">
			<button type="button" aria-haspopup="menu" aria-expanded="false" tabindex="-1">{{reader}}</button>
			<em class="help-instr {{help_class}}">(Help available, press question mark key)</em>
		</div>
		<cq-dropdown config="{{config}}" {{lift-dropdown}}></cq-dropdown>
	`;

CIQ.UI.addComponentDefinition("cq-menu", Menu);
