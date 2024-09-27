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
import "../../js/webcomponents/dialog/colorPicker.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;
/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-swatch&gt;</h4>
 *
 * An interactive color swatch. Relies on the existence of a {@link CIQ.UI.ColorPicker} component.
 * Interactivity can be disabled by adding cq-static attribute.
 *
 * When a color is selected, setColor(color) will get called for any parent component with that
 * method.
 * The swatch will display special states such as "auto" or "none" with distinct images.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | color     | Active swatch color |
 * | overrides | A comma-delimited list of "colors" which should be supported by the color picker when the swatch is clicked. |
 * | static    | Set to "true" to disable interactivity. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when it is clicked, and the color picker opened.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "open" |
 * | action | "click" |
 *
 * A custom event will be emitted from the component when the color is changed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "setColor", undefined |
 * | effect | "change" |
 * | action | null |
 * | value | _color value_ |
 *
 * @example
 * <cq-swatch color="red" overrides="auto" static="false"></cq-swatch>
 *
 * @alias WebComponents.Swatch
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Swatch extends CIQ.UI.BaseComponent {
	static get observedAttributes() {
		return ["color", "overrides", "static"];
	}

	constructor() {
		super();
		/**
		 * Optionally set the default color for the swatch.
		 * @type {string}
		 *
		 * @tsmember WebComponents.Swatch
		 */
		this.defaultColor = null;
		this.preventPercolate = null;
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		this.attached = true;

		this.tapListener = (e) => {
			this.launchColorPicker();
			e.stopPropagation();
		};
		this._setInteractive(this.getAttribute("static"));
		this.setAttribute("role", "button");

		if (!this.children.length) this.addDefaultMarkup();

		if (this.color) this._updateSwatchColor(this.color, true);
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Swatch);
		this.constructor = Swatch;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Swatch
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (newValue === oldValue) return;
		this[name] = newValue;
		switch (name) {
			case "color":
				this._updateSwatchColor(newValue);
				return;
			case "overrides":
				const { activeMenuStack } = CIQ.UI.getUIManager();
				if (
					activeMenuStack &&
					activeMenuStack.length &&
					activeMenuStack[activeMenuStack.length - 1].callingNode === this
				)
					this.launchColorPicker();
				return;
			case "static":
				this._setInteractive(newValue);
				return;
		}
	}

	/**
	 * Enable/disable interactivity
	 * @param {string} staticAttr Value of the "static" attribute ("true" or "false").
	 * @private
	 *
	 * @tsmember WebComponents.Swatch
	 */
	_setInteractive(staticAttr) {
		if (typeof staticAttr === "string" && staticAttr !== "false") {
			this.style.cursor = "default";
			this.removeEventListener("stxtap", this.tapListener);
		} else {
			this.style.cursor = "pointer";
			this.addEventListener("stxtap", this.tapListener);
		}
	}

	/**
	 * Update color based on "color" attribute value.
	 * @param {string} color Color value acceptable for CSS.
	 * @param {boolean} [onConnectedCallback] True if called from `connectedCallback()`.
	 * @private
	 *
	 * @tsmember WebComponents.Swatch
	 */
	_updateSwatchColor(color, onConnectedCallback) {
		if (!color) color = "transparent";

		let bgColor = this.parentNode
			? CIQ.getBackgroundColor(this.parentNode)
			: "";
		const border = CIQ.chooseForegroundColor(bgColor);
		const hslb = CIQ.hsl(bgColor);
		const isAuto = color === "auto";
		let fillColor = isAuto ? this.getDefaultColor() : color;
		if (fillColor.indexOf("rgba(") === 0) {
			// strip out the alpha component
			fillColor = (fillColor.split(",").slice(0, 3).join(",") + ")").replace(
				/rgba/,
				"rgb"
			);
		}
		const hslf = CIQ.hsl(fillColor);
		const isTransparent = CIQ.isTransparent(color);

		this.style.background = this.value = fillColor;
		if (isAuto || Math.abs(hslb[2] - hslf[2]) < 0.2 || isTransparent) {
			this.style.border = "solid " + border + " 1px";
			if (isTransparent)
				this.style.background =
					"linear-gradient(to bottom right, transparent, transparent 49%, " +
					border +
					" 50%, transparent 51%, transparent)";
		} else {
			this.style.border = "";
		}

		if (isAuto) {
			bgColor = CIQ.chooseForegroundColor(fillColor);
			this.style.background =
				"linear-gradient(to bottom right, " +
				fillColor +
				", " +
				fillColor +
				" 49%, " +
				bgColor +
				" 50%, " +
				bgColor +
				")";
		}

		if (onConnectedCallback) return;

		this.emitCustomEvent({
			action: null,
			cause: this.cause,
			effect: "change",
			detail: {
				value: color
			}
		});

		if (this.preventPercolate === true) this.preventPercolate = null;
		else CIQ.UI.containerExecute(this, "setColor", color, this);
	}

	/**
	 * Attempts to identify the default color for the associated chart. It does so by traversing
	 * up the parent stack and looking for any component that has a context. Or you can set
	 * the default color manually by setting member variable defaultColor.
	 *
	 * @return {string} color value
	 *
	 * @tsmember WebComponents.Swatch
	 */
	getDefaultColor() {
		if (this.defaultColor) return this.defaultColor;
		const context = CIQ.UI.getMyContext(this);
		if (context) return context.stx.defaultColor; // some parent with a context
		return "transparent";
	}

	/**
	 * Sets the swatch to a color provided.
	 *
	 * @param {string} color Color value acceptable for CSS.
	 * @param {boolean} percolate If true, will "percolate" up, calling `setColor` on the closest parent wiith that function.
	 * @param {boolean} isAuto True if "auto" color selected.
	 *
	 * @since 6.2.0 Colors strip out the opacity so they are the rgb representation
	 *
	 * @tsmember WebComponents.Swatch
	 */
	setColor(color, percolate, isAuto) {
		if (!this.parentNode) return;
		if (percolate === false) this.preventPercolate = true;
		this.cause = "setColor";
		const resolvedColor = isAuto ? "auto" : color;
		this.setAttribute("color", resolvedColor);
		delete this.cause;
		const label = this.querySelector("[label]");
		if (label) label.innerText = resolvedColor;
	}

	/**
	 * Opens the color picker dialog.  This component calls this function when the swatch is tapped.
	 *
	 * @tsmember WebComponents.Swatch
	 */
	launchColorPicker() {
		if (!this.attached) return;
		CIQ.UI.containerExecute(this, "launchColorPicker");
		const colorPicker = CIQ.UI.getUIManager().getColorPicker(this);
		if (colorPicker) {
			colorPicker.callback = (color) =>
				this.setColor(color, null, color === "auto");
			let overrides = this.overrides;
			if (overrides) overrides = overrides.split(",");

			setTimeout(
				() => {
					colorPicker.display({
						node: this,
						context: CIQ.UI.getMyContext(this),
						overrides
					});
					this.colorPicker = colorPicker;
					this.emitCustomEvent({ effect: "open" });
				},
				// give time for virtual keyboard to close
				CIQ.isMobile ? 250 : 0
			);
		}
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Swatch
 */
Swatch.markup = `
	<span class="ciq-screen-reader">Color Swatch</span>
	<span class="ciq-screen-reader" label></span>
`;
CIQ.UI.addComponentDefinition("cq-swatch", Swatch);
