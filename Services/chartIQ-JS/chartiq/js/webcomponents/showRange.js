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
import "../../js/webcomponents/heading.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-show-range&gt;</h4>
 *
 * This component is a container of options which allow selection of a chart's date range.  These ranges end at the present time, and begin at various
 * other times which can be programmed in the component's configuration (see example below).
 * To bind the component's configuration, set its `config` attribute to an object in the {@link CIQ.UI.Context}.config.groups object.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute   | description |
 * | :---------- | :---------- |
 * | config      | Key pointing to a component configuration entry which specifies the content items. |
 *
 * If no markup is specified in this component, a default markup will be provided.  In order to use the default markup, the selections in the menu
 * must be configured in the context configuration file and specified by key in the `config` attribute.  See example.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when that action is triggered on an item.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect |  "select" |
 * | action | "click" |
 * | multiplier | _multiplier_ |
 * | base | _base_ |
 * | periodicity | { inteval: _interval_, period: _period_, timeUnit: _timeUnit_ } |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * _**Configuration**_
 *
 * Configuration is accomplished by setting up an object within the context configuration's groups object.  Each configuration is assigned a unique name which is
 * itself an object property of the groups object.  This property name is used as the value of the `config` attribute of this component.
 * Let's call the object containing the configuration `items`.  `items` will contain a property called `content` whose value is an array.
 * Each array element is an object which represents one item in the group.  Let's call one of these array elements, `item`.
 * Each `item` has several properties which describe the nature of the range to display.  The following table of properties describes what they mean.
 *
 * | property    | description |
 * | :---------- | :---------- |
 * | type        | Describes what type of item to display.  Valid values are described in the table below. |
 * | label       | Text to display. |
 * | className   | Optional class name to apply to item. |
 * | tap         | Name of helper function to execute when item is clicked. |
 * | iconCls     | Optional class name of an icon to display on the item. |
 * | value       | Array of arguments to pass to `tap` function. |
 * | feature     | Name of add-on to which this option belongs.  If the add-on is not loaded, the option will not appear. |
 * | helpId      | A key to the correct help text in CIQ.Help.Content. |
 * | id          | DOM id for the item. |
 *
 * Valid `type`s are described here:
 * | type      | description |
 * | :-------- | :---------- |
 * | item      | Standard text which when clicked will execute `tap` action via a helper. |
 * | heading   | Unclickable text displayed in `<h4>` tag.  May be configured to allow filtering of another element's items. |
 * | separator | Unclickable vertical line, used to separate two menu sections. |
 *
 * @example <caption>Show Range tag:</caption>
 * <cq-show-range config="example"></cq-show-range>
 * @example <caption>Sample configuration for the above tag:</caption>
 * stxx.uiContext.config.groups.example = {
 * 		content: [
 *			{ type: "item", label: "1D", tap: "set", value: [1, "today"] },
 *			{ type: "item", label: "1M", tap: "set", value: [1, month", 30, 8, "minute"] }
 * 		]
 * };
 *
 * @alias WebComponents.ShowRange
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class ShowRange extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["config"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
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

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ShowRange);
		this.constructor = ShowRange;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.ShowRange
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		if (!this.attached) return;
		if (name === "config") {
			const helper = CIQ.UI.BaseComponent.getHelper(this, "GroupConfig");
			if (!helper || !helper[newValue]) return;
			Object.assign(this, helper[newValue]);
			this.config = newValue;
			this.populate();
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.ShowRange
	 */
	setContext(context) {
		this.handlePropertyChange("config", this.config, "");
		this.handlePropertyChange("config", "", this.getAttribute("config"));
	}

	/**
	 * Creates the group items by parsing the configuration object and using the default markup to create each item.
	 *
	 * @tsmember WebComponents.ShowRange
	 */
	populate() {
		const contentArr = this.content;
		if (contentArr instanceof Array) {
			while (this.contentRoot.firstChild) this.contentRoot.firstChild.remove();
			contentArr.forEach((item) => {
				const div = document.createElement("div");
				div.innerHTML = this.constructor.itemTemplate(item);
				const menuItem = div.children[0];
				this.contentRoot.appendChild(menuItem);
				menuItem.params = item;
				CIQ.UI.BaseComponent.scheduleForBinding(menuItem, this);
			});
		}
	}

	/**
	 * Proxies UI requests for span changes to the chart engine.
	 *
	 * Usage Examples:
	 * - `set(5,'day',30,2,'minute')` means that you want to combine two 30-minute bars into a single candle.
	 *   - So your quote feed must return one data object for every 30 minutes. A total of 2 data points per hour.
	 * - `set(5,'day',2,30,'minute')` means that you want to combine thirty 2-minute bars into a single candle.
	 *   - So your quote feed must return one data object for every 2 minutes. A total of 30 data points per hour.
	 * - `set(5,'day', 1, 60,'minute')` means that you want to combine sixty 1-minute bars into a single candle.
	 *   - So your quote feed must return one data object for every minute . A total of 60 data points per hour.
	 * - `set(5,'day', 60, 1,'minute')` means that you want to have a single 60 minute bar per period.
	 *   - So your quote feed must return one data object for every 60 minutes . A total of 1 data point per hour.
	 *
	 * @param {Object} activator Activation information
	 * @param {Number} multiplier   The period that will be passed to {@link CIQ.ChartEngine#setSpan}
	 * @param {Number} base The interval that will be passed to {@link CIQ.ChartEngine#setSpan}
	 * @param {Number} [interval] Chart interval to use (leave empty for autodetect)
	 * @param {Number} [period] Chart period to use (leave empty for autodetect)
	 * @param {Number} [timeUnit] Chart timeUnit to use (leave empty for autodetect)
	 *
	 * @tsmember WebComponents.ShowRange
	 *
	 * @since 5.1.1 timeUnit added
	 */
	set(activator, multiplier, base, interval, period, timeUnit) {
		const { context } = this;
		if (context.loader) context.loader.show();
		const params = {
			multiplier,
			base,
			padding: 40
		};
		if (interval) {
			params.periodicity = {
				interval,
				period: period || 1,
				timeUnit
			};
		}
		context.stx.setSpan(params, () => {
			if (context.loader) context.loader.hide();
			delete params.padding;
			this.emitCustomEvent({
				effect: "select",
				detail: { params }
			});
		});
	}
}

/**
 * Default markup generator for an item's innerHTML.  This function is called for each item in the dropdown.
 * Based on the parameters passed in, the appropriate markup is generated.
 * This function is called by {@link WebComponents.ShowRange#populate}.
 *
 * @param {Object} params
 * @param {String} params.type Type of item, e.g. `item`, `heading`, `separator`.
 * @param {String} [params.className] Class name of item
 * @param {String} [params.feature] Name of add-on which when loaded, this item will become visible
 * @param {String} [params.helpId] Name associated with help for this item
 * @param {String} [params.iconCls] Class for the icon in the item
 * @param {String} [params.label] Text for the item
 * @param {String} [params.tap] Helper function for tapping
 * @param {Array|String} [params.value] Parameter(s) to pass to the `tap`, function.
 * 					If these aren't supplied, value will be stored in a `data` attribute.
 * 					The value is always available in the `data-value` attribute.
 * @param {String} [params.id] DOM id atribute for the item.
 *
 * @return {String} Markup for a single item.
 *
 * @tsmember WebComponents.ShowRange
 * @static
 */
ShowRange.itemTemplate = ({
	type,
	className,
	feature,
	helpId,
	iconCls,
	label,
	tap,
	value,
	id
}) => {
	const classString = `${className ? `${className} ` : ""}`;
	const params =
		value && value !== 0
			? Array.isArray(value)
				? value.map((i) => (typeof i === "string" ? `'${i}'` : i)).join()
				: `'${value}'`
			: "";
	const role =
		{
			separator: "separator",
			heading: "presentation"
		}[type] || "menuitem";
	const tabbable = type === "item";

	return `
		<li class="${classString}${type}-item item" role="${role}"
			${
				tap
					? `stxtap="${tap}(${params})"`
					: params && !role.indexOf("menuitem")
					? `data='${JSON.stringify(value).replace(/'/g, "'")}'`
					: ""
			}
			${feature ? `feature="${feature}"` : ""}
			${value && tap ? `data-value="${value}"` : ""}
			${tabbable ? "keyboard-selectable" : ""}
		>\
			${
				label
					? type === "heading"
						? `<h4><cq-heading class="inline" text="${label}"${
								id ? ` id="${id}"` : ""
						  }></cq-heading></h4>`
						: `
							${helpId ? `<cq-help help-id="${helpId}" aria-hidden="true"></cq-help>` : ""}\
							${iconCls ? `<span class="icon ${iconCls}"></span>` : ""}\
							<span label ${id ? `id="${id}"` : ""} >${label}</span>`
					: ""
			}\
			${
				helpId
					? `<div class="ciq-screen-reader">
						<em class="help-instr">(Help available, press question mark key)</em>
					</div>`
					: ""
			}\
		</li>`;
};

CIQ.UI.addComponentDefinition("cq-show-range", ShowRange);
