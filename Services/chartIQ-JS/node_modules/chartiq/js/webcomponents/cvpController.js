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
 * <h4>&lt;cq-cvp-controller&gt;</h4>
 *
 * The CVP Controller web component is used to supplement the [cq-drawing-settings]{@link WebComponents.DrawingSettings} component.
 * It displays additional settings options specific to the Average Line and Regression Line drawing tool.
 *
 * The additional information is to activate a line at +/- X standard deviations away from the center line.
 * There is a line color and line style selection available as well.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | enable    | True if this instance is active. |
 * | color     | Current line color in hex format, or "auto" to select color from theme. |
 * | width     | Line width in pixels. |
 * | pattern   | Line pattern: "solid", "dotted" or "dashed". |
 *
 * In addition, the following attributes are also supported:
 * | attribute     | description |
 * | :------------ | :---------- |
 * | cq-cvp-header | A numerical index relating to the number of standard deviations to this instance applies. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select" |
 * | action | "click" |
 * | name | _property_ |
 * | value | _value_ |
 *
 * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Markup for CVP Controller</caption>
 *	<cq-cvp-controller cq-section cq-cvp-header="1"></cq-cvp-controller>
 *
 * @alias WebComponents.CVPController
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class CVPController extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["enable", "color", "pattern", "width"];
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;

		Object.defineProperty(this, "_scope", {
			configurable: true,
			enumerable: false,
			value: this.getAttribute("cq-cvp-header") || "",
			writable: false
		});

		if (this.children.length === 0) {
			this.addDefaultMarkup();
			const heading = this.querySelector(".ciq-heading");
			if (heading) {
				heading.innerHTML = this._scope;
			}
		}

		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, CVPController);
		this.constructor = CVPController;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.CVPController
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (newValue === oldValue) return;
		this[name] = newValue;
		const action = this.activator ? "click" : null;
		delete this.activator;

		switch (name) {
			case "enable":
				this.toggleActive(null, newValue === "true");
				break;
			case "color":
				this.setColor(newValue);
				break;
			case "width":
				this.setStyle(null, newValue, null);
				break;
			case "pattern":
				this.setStyle(null, null, newValue);
				break;
		}

		if (!this.context) return;

		if (!this.syncing) {
			this.emitCustomEvent({
				action,
				effect: "select",
				detail: { name, value: newValue }
			});
		}
	}

	/**
	 * Emits a change event.
	 *
	 * @param {string} eventName Event type
	 * @param {Object} value key/value pairs to pass in event detail.  Represents what changed and the value it changed to.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	emit(eventName, value) {
		if (this.toolbar) {
			this.toolbar.emit();
		} else {
			this.dispatchEvent(
				new CustomEvent(eventName, {
					bubbles: true,
					cancelable: true,
					detail: value
				})
			);
		}
	}

	/**
	 * Gets the current drawing color and updates display in palette.
	 *
	 * @param {Object} activator
	 * @param {HTMLElement} activator.node Element that triggered this function.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	getColor(activator) {
		const node = activator.node || this.querySelector("cq-line-color");
		const { color } = this;

		const specialColorStyles = ["color-auto", "color-transparent"];
		specialColorStyles.forEach((style) => node.classList.remove(style));
		if (specialColorStyles.includes("color-" + color)) {
			node.removeAttribute("style");
			node.classList.add("color-" + color);
		} else {
			node.style.background = color;
			const bgColor = CIQ.getBackgroundColor(this.parentNode);
			if (!color || Math.abs(CIQ.hsl(bgColor)[2] - CIQ.hsl(color)[2]) < 0.2) {
				const border = CIQ.chooseForegroundColor(bgColor);
				node.style.border = "solid " + border + " 1px";
			} else {
				node.style.border = "";
			}
		}

		const label = node.querySelector("[label]");
		if (label) label.innerText = color;
	}

	/**
	 * Enables colorPicker and provides callback to `setColor`, depending on `mode` value.
	 *
	 * @param {Object} activator
	 * @param {HTMLElement} activator.node Element that triggered this function.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	pickColor(activator) {
		const colorPicker = this.uiManager.getColorPicker(this);
		const overrides = activator.node.getAttribute("cq-overrides");

		if (!colorPicker)
			return console.error(
				"CVPController.prototype.pickColor: no <cq-color-picker> available"
			);
		if (overrides) activator.overrides = overrides.split(",");

		colorPicker.callback = (color) => {
			this.activator = activator;
			this.setColor(color);
		};

		activator.context = this.context;
		colorPicker.display(activator);
	}

	/**
	 * Sets the default line color.
	 *
	 * @param {string} color A Valid css color value.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	setColor(color) {
		if (!this.context) return;
		this.color = color;
		this.context.stx.currentVectorParameters["color" + this._scope] = color;
		this.getColor({
			node: this.querySelector("cq-line-color")
		});
		this.emit();
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	setContext(context) {
		this.setStyle();
		if (this.toolbar) this.toolbar.dirty(false);
	}

	/**
	 * Set drawing line style.
	 *
	 * @param {Object} [activator]
	 * @param {HTMLElement} [activator.node] Element that triggered this function.
	 * @param {string} [width="1"] Line width
	 * @param {string} [pattern="dotted"] Line pattern
	 *
	 * @tsmember WebComponents.CVPController
	 */
	setStyle(activator, width = "1", pattern = "dotted") {
		if (width === null) width = this.width;
		if (pattern === null) pattern = this.pattern;

		width = width || "1";
		pattern = pattern || "dotted";

		this.activator = activator;
		this.width = parseInt(width, 10).toString();
		this.context.stx.currentVectorParameters["lineWidth" + this._scope] =
			this.width;
		this.activator = activator; // set this again since it's reset when we set the width
		this.pattern = pattern;
		this.context.stx.currentVectorParameters["pattern" + this._scope] = pattern;

		const selection = this.querySelector(
			"*[cq-cvp-line-style], .menu-clickable .icon"
		);

		if (this.lineStyleClassName) {
			selection.classList.remove(this.lineStyleClassName);
		}

		if (pattern && pattern !== "none") {
			this.lineStyleClassName = "ciq-" + pattern + "-" + this.width;
			selection.classList.add(this.lineStyleClassName);
		} else {
			this.lineStyleClassName = null;
		}

		this.emit("change", {
			lineWidth: width,
			pattern
		});
	}

	/**
	 * Update the component state with configuration. May be a drawing instance or
	 * currentVectorParameters.
	 *
	 * @param {Object} config drawing instance or currentVectorParameters
	 *
	 * @tsmember WebComponents.CVPController
	 */
	sync(config) {
		this.syncing = true;
		const active = config["active" + this._scope] || false;
		const color = config["color" + this._scope];
		const width = config["width" + this._scope];
		const pattern = config["pattern" + this._scope];

		const className = "ciq-active";
		const checkbox = this.querySelector(".ciq-checkbox");

		if (active) {
			checkbox.classList.add(className);
		} else {
			checkbox.classList.remove(className);
		}

		this.enable = active.toString();
		this.context.stx.currentVectorParameters["active" + this._scope] = active;
		checkbox.setAttribute("aria-checked", this.enable);
		this.color = color || "auto";
		this.context.stx.currentVectorParameters["color" + this._scope] =
			this.color;
		this.getColor({});
		this.setStyle(null, width, pattern);
		this.syncing = false;
	}

	/**
	 * Toggle active state of component instance.
	 *
	 * @param {Object} activator
	 * @param {HTMLElement} activator.node Element that triggered this function.
	 * @param {boolean} [forceValue=null] If set, will force the toggle to that value.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	toggleActive(activator, forceValue = null) {
		if (!this.context) return;
		this.activator = activator;
		let active = true;
		if (forceValue !== null) {
			active = forceValue;
		} else if (this.enable === "true") {
			active = false;
		}
		this.enable = active.toString();
		this.context.stx.currentVectorParameters["active" + this._scope] = active;
		const node = this.querySelector(".ciq-checkbox");
		const className = "ciq-active";
		node.classList[active ? "add" : "remove"](className);
		node.setAttribute("aria-checked", this.enable);

		this.emit("change", {
			active: this.enable
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.CVPController
 */
CVPController.markup = `
		<div cq-section>
			<span role="checkbox" stxtap="toggleActive())" class="ciq-checkbox" aria-checked="false">
				<div class="ciq-heading"></div>
				<span></span>
			</span>
		</div>
		<cq-line-color cq-section cq-overrides="auto" class="ciq-color" stxbind="getColor()" stxtap="pickColor()" role="button">
			<span class="icon" aria-hidden="true"></span>
			<span class="ciq-screen-reader">Line Color</span>
			<span class="ciq-screen-reader" label></span>
		</cq-line-color>
		<cq-line-style cq-section>
			<cq-menu class="ciq-select ciq-cvp-line-style" reader="Line Style" config="cvplinestyle" icon="ciq-solid-1"></cq-menu>
		</cq-line-style>
	`;

CIQ.UI.addComponentDefinition("cq-cvp-controller", CVPController);
