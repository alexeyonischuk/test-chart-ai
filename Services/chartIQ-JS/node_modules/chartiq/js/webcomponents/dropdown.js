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
import "../../js/webcomponents/heading.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-dropdown&gt;</h4>
 *
 * This component is a container of menu options which can be scrolled though and selected.  The component is typically revealed
 * after a cq-menu component is opened.  This component is usually nested within a `cq-menu` tag.
 * The items that are listed in the dropdown are specified in a configuration.  See example below.
 * To bind the component's configuration, set its `config` attribute to an object in the {@link CIQ.UI.Context}.config.menus object.
 *
 * This component automatically allows for scrolling through its elements, when the size of the list exceeds the dropdown's dimensions.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute   | description |
 * | :---------- | :---------- |
 * | maximize    | Set to true to have the dropdown extend in height to the height of the chart container even when there are not enough items in the dropdown to fill it. |
 * | noresize    | Set to true to prevent resizing of dropdown. Otherwise, sizing is based on number of elements in the dropdown. |
 * | config      | Key pointing to a component configuration entry which specifies the content items. |
 *
 * If no markup is specified in this component, a default markup will be provided.  It is **strongly suggested** to allow the default markup
 * to be used.  In order to use the default markup, the selections in the menu must be configured in the context configuration file and specified
 * by key in the `config` attribute.  See example.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when an item in the component is toggled, selected, or edited.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect |  "toggle", "select", "edit" |
 * | action | "click" |
 * | menu | _menu element which owns this component_ |
 * | params | _properties set in configuration object for the item specified by the action_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * _**Configuration**_
 *
 * Configuration is accomplished by setting up an object within the context configuration's menus object.  Each menu dropdown is assigned a unique name which is
 * itself an object property of the menus object.  This property name is used as the value of the `config` attribute of the owning menu component.
 * Let's call the object containing the configuration `items`.  `items` will contain a property called `content` whose value is an array.
 * Each array element is an object which represents one item in the dropdown.  Let's call one of these array elements, `item`.
 * Each `item` has several properties which describe the nature of the dropdown item to display.  The following table of properties describes what they mean.
 *
 * | property    | description |
 * | :---------- | :---------- |
 * | type        | Describes what type of item to display.  Valid values are described in the table below. |
 * | label       | Text to display. |
 * | className   | Optional class name to apply to item. |
 * | active      | Set to true to manually set the active state on the item.  Note the active state is usually set with a bound value. |
 * | tap         | Name of helper function to execute when item is clicked. |
 * | setget      | Same as tap except used to bind values when `type` is `radio`, `switch`, or `checkbox`. |
 * | bind        | Name of helper function to execute when binding has changed.  This is not a common option. |
 * | options     | Name of helper function to execute when clicking the options icon, which only appears when this property is set. |
 * | iconCls     | Optional class name of an icon to display on the item. |
 * | value       | Array of arguments to pass to `tap`, `stxget`, or `bind` functions; or, name of component when `type="component"`. |
 * | feature     | Name of add-on to which this option belongs.  If the add-on is not loaded, the option will not appear. |
 * | attributes  | Object containing attributes for a `type="component"` item. |
 * | selector    | Used to specify the selector for `type="clickable"`. |
 * | method      | Used to specify the method for `type="clickable"`. |
 * | menuPersist | Normally menus close when selecting any item type besides `checkbox` or `switch`.  Setting this property to "true" will keep the menu from closing after selection. |
 * | filterFor   | A label to specify the element to filter.  The element to filter must also have its `filter-name` attribute set to this value.  If `filter-for` is omitted, will filter this element's next sibling. |
 * | filterMin   | The number of filterable records below which the filter input will not appear.  If omitted, filter input will never appear. |
 * | helpId      | A key to the correct help text in CIQ.Help.Content. |
 *
 * Valid `type`s are described here:
 * | type      | description |
 * | :-------- | :---------- |
 * | item      | Standard text which when clicked will execute `tap` or `setget` action via a helper. |
 * | switch    | Same as item except value is bound and displayed with a slider switch. |
 * | checkbox  | Same as item except value is bound and displayed with a checkbox. |
 * | radio     | Same as item except value is bound and displayed with a radio. |
 * | clickable | Embeds a `cq-clickable` which executes an action, usually opening a dialog. |
 * | heading   | Unclickable text displayed in `<h4>` tag.  May be configured to allow filtering of another element's items. |
 * | template  | Embeds markup specified with a `name` attribute equal to this component's `value` attribute. The markup to be embedded needs to be found in the document within a unique template which has the attribute `cq-dropdown-templates`. |
 * | component | Embeds a component specified by `value` with attributes specified by `attributes`.  |
 * | separator | Unclickable horizontal line, used to separate two menu sections. |
 *
 * @example <caption>Dropdown tag:</caption>
 * <cq-dropdown config="example"></cq-dropdown>
 * @example <caption>Sample configuration for the above dropdown tag:</caption>
 * stxx.uiContext.config.menus.example = {
 * 		content: [
 *			{ type: "radio", label: "Show Dynamic Callout", setget: "Layout.HeadsUp", value: "dynamic" },
 *			{ type: "radio", label: "Show Tooltip", setget: "Layout.HeadsUp", feature: "tooltip", value: "floating" }
 * 		]
 * };
 * @example <caption>Template example:</caption>
 * <!--
 * Given a configuration item as follows:
 * { type: "template", value: "my_template" }
 * -->
 * <template cq-dropdown-templates>
 * 		<div name="my_template">
 * 			<span>Custom Dropdown Item</span>
 * 		</div>
 * </template>
 *
 * @alias WebComponents.Dropdown
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 This new component supersedes `cq-menu-dropdown` component.
 */
class Dropdown extends CIQ.UI.BaseComponent {
	static get observedAttributes() {
		return ["maximize", "noresize", "config"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		this.handlesBinding = true;
		super.connectedCallback();

		if (this.isShadowComponent && this.children.length) {
			const parent = document.createElement("div");
			this.root.appendChild(parent);
			while (this.children.length) {
				parent.appendChild(this.firstChild);
			}
		} else if (!this.children.length) {
			const ul = document.createElement("ul");
			this.root.appendChild(ul);
		}

		this.contentRoot =
			this.root.querySelector(".content") || this.root.firstChild;
		this.contentRoot.classList.add("content");
		this.contentRoot.setAttribute("role", "menu");

		this.contentRoot.addEventListener("scroll", (e) =>
			this.highlightItem(e.currentTarget.querySelector("[cq-focused]"))
		);

		this.addClaim(this);
		this.setupShadow();

		this.owningMenu = CIQ.climbUpDomTree(this, "cq-menu", true)[0];
		this.fireConfigChange();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Dropdown);
		this.constructor = Dropdown;
	}

	/**
	 * Sets up the binding for the dropdown item.
	 *
	 * @param {HTMLElement} elem Dropdown item to bind.
	 * @param {string} evtType Type of event to emit when the item is clicked.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	bind(elem, evtType) {
		if (!elem) return;
		if (elem.matches("[stxtap], [stxsetget], [stxbind]")) {
			CIQ.UI.BaseComponent.scheduleForBinding(elem, this);
		}
		const manualBinding = (e) => {
			if (Date.now() - elem.lastClick < 1000) return; // click following pointerup
			elem.lastClick = Date.now();
			if (elem.matches(".radio-item[stxtap]")) {
				this.contentRoot.querySelectorAll(".radio-item").forEach((sibling) => {
					if (sibling !== elem) {
						sibling.classList.remove("ciq-active");
						sibling.ariaChecked = "false";
					}
				});
				elem.classList.add("ciq-active");
				elem.ariaChecked = "true";
			}
			this.emitCustomEvent({
				effect: evtType,
				detail: {
					menu: this.owningMenu,
					params: elem.params
				}
			});
		};
		["mouseup", "touchend", "pointerup", "click"].forEach((evt) =>
			elem.addEventListener(evt, manualBinding)
		);
	}

	/**
	 * Remove keyboard navigation when item is clicked and its owning menu is hidden.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	disablekeyboardNavigation() {
		if (this.keyboardNavigation) {
			this.keyboardNavigation.setKeyControlElement();
		}
		// Remove focus from any selected menu item
		this.removeFocused(this.root.querySelectorAll("[cq-focused]"));
	}

	/**
	 * Forces config attribute to change, even if the value of the config attribute didn't change.
	 * This is useful if the underlying object representing the configuration did change.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	fireConfigChange() {
		this.handlePropertyChange("config", this.config, "");
		this.handlePropertyChange("config", "", this.getAttribute("config"));
	}

	/**
	 * @private
	 * @deprecated I cannot find the caller?
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	focused() {
		const focused = this.qsa("[cq-focused]", this, true);
		if (focused.length) return focused[0];
		return null;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		switch (name) {
			case "config":
				if (!this.attached) break;
				const helper = CIQ.UI.BaseComponent.getHelper(this, "MenuConfig");
				if (!helper || !helper[newValue]) break;
				Object.assign(this, helper[newValue]);
				this.config = newValue;
				this.populate();
				break;
			case "maximize":
			case "noresize":
				this[name] = newValue || newValue === "true";
				break;
			default:
				break;
		}

		if (this.attached) this.resize();
	}

	/**
	 * Handler for keyboard interaction.
	 * Arrow keys move around the dropdown, while `Space` or `Enter` will select.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	keyStroke(hub, key, e) {
		if (
			!this.keyboardNavigation &&
			!this.owningMenu.matches(".stxMenuActive")
		) {
			return;
		}

		if (!CIQ.trulyVisible(this.contentRoot)) return false;
		/*if (this.keyboardNavigationWait && !this.keyboardNavigation) {
			return;
		}*/

		const items = this.qsa(
			"[keyboard-selectable]:not(.item-hidden)",
			this.contentRoot,
			true
		);

		if (!items.length) return false;
		const focused = this.findFocused(items);

		const keyFn = (k) => {
			return (
				{
					" ": { fn: "click" },
					Spacebar: { fn: "click" },
					Enter: { fn: "click" },
					ArrowDown: { fn: "scroll" },
					ArrowUp: { fn: "scroll", rev: true },
					ArrowLeft: { fn: "select", rev: true },
					ArrowRight: { fn: "select" },
					Down: { fn: "scroll" },
					Up: { fn: "scroll", rev: true },
					Left: { fn: "select", rev: true },
					Right: { fn: "select" }
				}[k] || {}
			);
		};

		switch (keyFn(key).fn) {
			case "click":
				if (!focused.length) return;
				const childItemsSelected = focused[0].querySelectorAll(
					"[keyboard-selectable-child][cq-focused]"
				);
				if (childItemsSelected.length) this.clickItem(childItemsSelected[0], e);
				else this.clickItem(focused[0], e);
				break;
			case "scroll":
				const isRev = keyFn(key).rev;
				if (!this.focusNextItem(items, isRev) && isRev) {
					this.contentRoot.scrollTop = 0;
				}
				break;
			case "select":
				if (!focused.length) return;
				const childItems = focused[0].querySelectorAll(
					"[keyboard-selectable-child]"
				);
				if (childItems.length) {
					const isRev = keyFn(key).rev;
					const next = this.focusNextItem(childItems, isRev);
					if (isRev && !next) {
						// If the beginning of the child items has been reached select the parent item instead
						this.removeFocused(childItems);
						this.focusItem(focused[0]);
					}
				}
				break;
			default:
				return false;
		}
		return true;
	}

	/**
	 * Builds a dropdown item when the `type="component"`.  Called by {@link WebComponents.Dropdown#populate}.
	 *
	 * @param {string} name Component name.
	 * @param {object} [attributes] attribute settings for the component.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	makeComponent(name, attributes) {
		const stringifyAttributes = () => {
			if (!attributes || typeof attributes !== "object") return "";
			let acc = "";
			for (const key in attributes) {
				acc += ` ${key}`;
				if (attributes[key] != null) acc += `="${attributes[key]}"`;
			}
			return acc;
		};
		return `<${name}${stringifyAttributes()}></${name}>`;
	}

	/**
	 * If using keyboard navigation, return the highlight to the tab selected element.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	onKeyboardDeselection() {
		// If we're using keyboard navigation, return the highlight to the tab selected element
		if (this.keyboardNavigation) this.keyboardNavigation.highlightPosition();
	}

	/**
	 * Creates the dropdown items by parsing the configuration object and using the default markup to create each item.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	populate() {
		const contentArr = this.content;
		const templateContainer = this.ownerDocument.querySelector(
			"template[cq-dropdown-templates]"
		);
		if (Array.isArray(contentArr)) {
			while (this.contentRoot.firstChild) this.contentRoot.firstChild.remove();
			contentArr.forEach((item) => {
				const div = document.createElement("div");
				if (item.type === "template" && templateContainer) {
					const templates = CIQ.UI.makeFromTemplate(templateContainer);
					item.content = templates.find(`[name=${item.value}]`)[0].outerHTML;
				} else if (item.type === "component") {
					item.content = this.makeComponent(item.value, item.attributes);
					item.type = "template";
				}
				div.innerHTML = this.constructor.itemTemplate(item);
				const menuItem = div.children[0];
				if (item.options) {
					const ariaCheckedObserver = new MutationObserver((mutations) => {
						mutations.forEach((mutation) => {
							menuItem.querySelector("[role=menuitemradio]").ariaChecked =
								mutation.target.ariaChecked;
						});
					});
					ariaCheckedObserver.observe(menuItem, {
						attributeFilter: ["aria-checked"]
					});
				}
				this.contentRoot.appendChild(menuItem);
				if (
					!("menuPersist" in item) &&
					["separator", "heading", "switch"].includes(item.type)
				)
					item.menuPersist = true;
				menuItem.params = item;
				this.bind(menuItem, item.type === "switch" ? "toggle" : "select");
				this.bind(menuItem.querySelector(".options"), "edit");
			});
		}
	}

	/**
	 * Resizes a dropdown when the screen is resized, or even if the configuraton is reloaded to add or remove items.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	resize() {
		/*share.js appends this class to the body.
			Do not attempt unnecessary resize of scroll
			for a chart about to become a shared image.*/
		if (this.closest(".sharing")) return;
		if (this.noresize) return;

		const { contentRoot } = this;

		const { opacity, display } = this.style;
		Object.assign(this.style, { opacity: 0, display: "block" });
		const { top } = contentRoot.getBoundingClientRect();
		const { paddingTop, paddingBottom } = getComputedStyle(contentRoot);
		const padding = CIQ.stripPX(paddingTop) + CIQ.stripPX(paddingBottom);
		Object.assign(this.style, { opacity, display });
		// defaulted to 45 to take into account 15px of padding on menus and then an extra 5px for aesthetics
		const reduceMenuHeight = this.reduceMenuHeight || 45;
		let contextHeight, contextTop;
		/*if (context && context.topNode) {
			const contextRect = context.topNode.getBoundingClientRect();
			contextHeight = contextRect.height;
			contextTop = contextRect.top;
		} else {*/
		// Fallback to the window height if context element cannot be found
		contextHeight = window.innerHeight;
		contextTop = 0;
		//}
		if (!contextHeight) return;
		let height =
			contextHeight - (top - contextTop) - reduceMenuHeight - padding;

		const holders = CIQ.climbUpDomTree(
			contentRoot,
			".stx-holder,.stx-subholder,.chartContainer",
			true
		);
		if (holders.length) {
			holders.forEach((holder) => {
				const holderBottom =
					holder.getBoundingClientRect().top +
					CIQ.elementDimensions(holder).height;
				height = Math.min(height, holderBottom - top - 5); // inside a holder we ignore reduceMenuHeight, but take off 5 pixels just for aesthetics
			});
		}

		// If there are subsequent siblings that have a fixed height then make room for them
		/*const nextAll = contentRoot.nextAll();
		for (let i = 0; i < nextAll.length; i++) {
			const sibling = nextAll[i];
			if (sibling && !CIQ.trulyVisible(sibling)) continue; // skip hidden siblings
			height -= CIQ.elementDimensions(sibling, {
				border: 1,
				padding: 1,
				margin: 1
			}).height;
		}*/
		if (this.maximize) contentRoot.style.height = height + "px";
		contentRoot.style["max-height"] = height + "px";

		const scrollImpl = this.scrollImplementation();
		if (!this.noscroll && scrollImpl) {
			contentRoot.style.overflowY = "auto";
			scrollImpl.refresh(contentRoot);
		}
		this.dispatchEvent(
			new CustomEvent("refresh", { detail: { node: contentRoot } })
		);
	}

	/**
	 * Sets the active dropdown item to a certain location.  The dropdown will scroll if necessary.
	 *
	 * @param {HTMLElement} item Element to scroll to.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	scrollToElement(item) {
		const { contentRoot } = this;
		const { top: contentTop, bottom: contentBottom } =
			contentRoot.getBoundingClientRect();
		const { top, bottom } = item.getBoundingClientRect();
		if (top > contentTop && bottom < contentBottom) return;
		if (bottom >= contentBottom) {
			contentRoot.scrollTop = Math.max(
				bottom - contentBottom + contentRoot.scrollTop,
				0
			);
		} else {
			contentRoot.scrollTop = Math.max(
				top - contentTop + contentRoot.scrollTop,
				0
			);
		}
		this.resize();
	}

	/**
	 * Gets the scroll implementation set in the UI configuration.  This is used to scroll the dropdown, if found.
	 *
	 * @return The scrolling implementation
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	scrollImplementation() {
		const context =
			CIQ.UI.shadowComponents.get(this) || this.closest("cq-context");
		if (context && context.config) return context.config.scrollbarStyling;
		return CIQ.UI.scrollbarStyling;
	}

	/**
	 * Sets the focus on a specific item in the dropdown.
	 *
	 * @param {HTMLElement} selector Element to focus.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	setFocus(selector) {
		const element = this.qsa(selector, this.contentRoot, true)[0];
		if (element) element.focus();
	}
}

/**
 * Default markup generator for an item's innerHTML.  This function is called for each item in the dropdown.
 * Based on the parameters passed in, the appropriate markup is generated.
 * This function is called by {@link WebComponents.Dropdown#populate}.
 *
 * @param {Object} params
 * @param {String} params.type Type of item, e.g. `item`, `heading`, `switch`, etc.
 * @param {Boolean} [params.active] Active state of item (applied as `.ciq-active` class)
 * @param {String} [params.className] Class name of item
 * @param {String} [params.options] Helper function to execute when the options icon is clicked
 * @param {String} [params.feature] Name of add-on which when loaded, this item will become visible
 * @param {String} [params.helpId] Name associated with help for this item
 * @param {String} [params.iconCls] Class for the icon in the item
 * @param {String} [params.label] Text for the item
 * @param {String} [params.bind] Helper function for binding
 * @param {String} [params.tap] Helper function for tapping
 * @param {String} [params.setget] Helper function for tapping and binding
 * @param {String} [params.selector] For `clickable` type, target selector
 * @param {String} [params.method] For `clickable` type, target method name on the above selector
 * @param {Array|String} [params.value] Parameter(s) to pass to the `bind`, `tap`, or `setget` functions.
 * 					If these aren't supplied, value will be stored in a `data` attribute.
 * 					The value is always available in the `data-value` attribute.
 * @param {String} [params.content] For `template` type, the HTML corresponding to the template's name
 * @param {Number} [params.filterMin] For `heading` type, the minimum number of records to allow filtering
 * @param {String} [params.filterLabel] For `heading` type, the placeholder text that appears in the filter search input
 * @param {String} [params.filterFor] For `heading` type, the element to filter should have its `filter-name` attribute set to this parameter's value.
 *
 * @return {String} Markup for a single dropdown item.
 * @static
 *
 * @tsmember WebComponents.Dropdown
 */
Dropdown.itemTemplate = ({
	type,
	active,
	className,
	options,
	feature,
	helpId,
	iconCls,
	label,
	bind,
	tap,
	setget,
	selector,
	method,
	value,
	content,
	filterMin,
	filterLabel,
	filterFor
}) => {
	const classString = `${className ? `${className} ` : ""}${
		active ? "ciq-active " : ""
	}`;
	const params =
		value && value !== 0
			? Array.isArray(value)
				? value.map((i) => (typeof i === "string" ? `'${i}'` : i)).join()
				: `'${value}'`
			: "";
	const role = options
		? "group"
		: {
				separator: "separator",
				heading: "presentation",
				template: "group",
				clickable: "presentation",
				checkbox: "menuitemcheckbox",
				switch: "menuitemcheckbox",
				radio: "menuitemradio"
		  }[type] || "menuitem";
	const subrole =
		{
			checkbox: "menuitemcheckbox",
			switch: "menuitemcheckbox",
			radio: "menuitemradio"
		}[type] || "menuitem";
	const tabbable = !["separator", "heading", "template"].includes(type);

	return `
		<li class="${classString}${type}-item item" role="${role}"
			${tabbable ? `tabindex=0` : ""}
			${
				setget
					? `stxsetget="${setget}(${params})"`
					: tap
					? `stxtap="${tap}(${params})"`
					: bind
					? `stxbind="${bind}(${params})"`
					: params && !role.indexOf("menuitem")
					? `data='${JSON.stringify(value).replace(/'/g, "'")}'`
					: ""
			}
			${feature ? `feature="${feature}"` : ""}
			${type === "radio" ? `aria-checked="${active ? "true" : "false"}"` : ""}
			${options ? `aria-labelledby="label_${label.replace(/ /g, "")}"` : ""}
			${value && (setget || tap) ? `data-value="${value}"` : ""}
			${tabbable && type !== "clickable" ? "keyboard-selectable" : ""}
		>\
			${type === "separator" ? `<hr>` : ""}\
			${type === "template" ? `${content}` : ""}\
			${
				type === "clickable"
					? `<cq-clickable class="dropdown-clickable" keyboard-selectable selector="${selector}" method="${method}">`
					: ""
			}\
			${
				type === "heading"
					? `<h4><cq-heading class="dropdown"
						${filterMin ? `filter-min="${filterMin}"` : ""}
						${filterLabel ? `filter-label="${filterLabel}"` : ""}
						${filterFor ? `filter-for="${filterFor}"` : ""}
						${label ? `text="${label}"` : ""}
						></cq-heading></h4>`
					: label
					? `<div>
						${
							iconCls
								? `<span ciq-menu-icon class="icon ${iconCls} ciq-icon-${iconCls}"></span>`
								: ""
						}\
						<span id="label_${label.replace(/ /g, "")}" label
							${options ? `role="${subrole}"` : ""}
						>${label}</span>
						${
							helpId
								? `<em class="ciq-screen-reader help-instr">(Help available, press question mark key)</em>
								<cq-help help-id="${helpId}" aria-hidden="true"></cq-help>`
								: ""
						}\
						${
							options
								? `<span class="icon options ciq-edit" keyboard-selectable-child stxtap="${options}(${params})">
								<div class="ciq-screen-reader" role="button">Set ${label} Options</div>
								</span>`
								: ""
						}\
						<span class="ciq-${type}"><span></span></span>
				      </div>`
					: ""
			}\
			${type === "clickable" ? `</cq-clickable>` : ""}\
		</li>`;
};

CIQ.UI.addComponentDefinition("cq-dropdown", Dropdown);
