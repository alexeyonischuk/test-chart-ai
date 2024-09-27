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
import "../../js/webcomponents_legacy/dialog/colorPicker.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Swatch web component `<cq-swatch>`.
 *
 * An interactive color swatch. Relies on the existence of a {@link CIQ.UI.ColorPicker} component.
 * Interactivity can be disabled by adding cq-static attribute
 *
 * When a color is selected, setColor(color) will get called for any parent component with that
 * method.
 *
 * @namespace WebComponents.cq-swatch
 *
 * @example
 * <cq-section>
 *     <cq-placeholder>Candle Color
 *         <cq-theme-piece cq-piece="cu"><cq-swatch cq-overrides="Hollow"></cq-swatch></cq-theme-piece>
 *         <cq-theme-piece cq-piece="cd"><cq-swatch cq-overrides="Hollow"></cq-swatch></cq-theme-piece>
 *     </cq-placeholder>
 *     <cq-placeholder>Candle Wick
 *         <cq-theme-piece cq-piece="wu"><cq-swatch></cq-swatch></cq-theme-piece>
 *         <cq-theme-piece cq-piece="wd"><cq-swatch></cq-swatch></cq-theme-piece>
 *     </cq-placeholder>
 *     <cq-placeholder>Candle Border
 *         <cq-theme-piece cq-piece="bu"><cq-swatch cq-overrides="No Border"></cq-swatch></cq-theme-piece>
 *         <cq-theme-piece cq-piece="bd"><cq-swatch cq-overrides="No Border"></cq-swatch></cq-theme-piece>
 *     </cq-placeholder>
 *     <cq-separator></cq-separator>
 *     <cq-placeholder>Line/Bar Chart
 *         <cq-theme-piece cq-piece="lc"><cq-swatch></cq-swatch></cq-theme-piece>
 *     </cq-placeholder>
 *     <cq-separator></cq-separator>
 *     <cq-placeholder>Mountain Color
 *         <cq-theme-piece cq-piece="mb"><cq-swatch></cq-swatch></cq-theme-piece>
 *         <cq-theme-piece cq-piece="mc"><cq-swatch></cq-swatch></cq-theme-piece>
 *     </cq-placeholder>
 * </cq-section>
 */
class Swatch extends HTMLElement {
	constructor() {
		super();
		/**
		 * Optionally set the default color for the swatch.
		 * @type {string}
		 * @memberof WebComponents.cq-swatch
		 */
		this.defaultColor = null;
	}

	connectedCallback() {
		if (this.attached) return;
		this.attached = true;

		if (this.getAttribute("cq-static")) {
			this.style.cursor = "default";
			return;
		}
		var self = this;
		CIQ.UI.stxtap(this, function (e) {
			self.launchColorPicker();
			e.stopPropagation();
		});
	}

	adoptedCallback() {
		CIQ.UI.flattenInheritance(this, Swatch);
	}

	/**
	 * Attempts to identify the default color for the associated chart. It does so by traversing
	 * up the parent stack and looking for any component that has a context. Or you can set
	 * the default color manually by setting member variable defaultColor;
	 * @memberof WebComponents.cq-swatch
	 */
	getDefaultColor() {
		if (this.defaultColor) return this.defaultColor;
		var context = CIQ.UI.getMyContext(this);
		if (context) return context.stx.defaultColor; // some parent with a context
		return "transparent";
	}

	/**
	 * @alias setColor
	 * @memberof WebComponents.cq-swatch
	 * @since 6.2.0 Colors strip out the opacity so they are the rgb representation
	 */
	setColor(color, percolate, isAuto) {
		var bgColor = CIQ.getBackgroundColor(this.parentNode);
		var border = CIQ.chooseForegroundColor(bgColor);
		var hslb = CIQ.hsl(bgColor);
		if (color == "auto") isAuto = true;
		if (!color) color = "transparent";
		var fillColor = color;
		if (color == "auto") {
			fillColor = this.getDefaultColor();
		} else if (color.indexOf("rgba(") === 0) {
			// strip out the alpha component
			fillColor = (fillColor.split(",").slice(0, 3).join(",") + ")").replace(
				/rgba/,
				"rgb"
			);
		}
		var hslf = CIQ.hsl(fillColor);
		var isTransparent = CIQ.isTransparent(color);
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
		if (percolate !== false)
			CIQ.UI.containerExecute(this, "setColor", color, this);
	}

	/**
	 * @alias launchColorPicker
	 * @memberof WebComponents.cq-swatch
	 */
	launchColorPicker() {
		CIQ.UI.containerExecute(this, "launchColorPicker");
		var colorPicker = CIQ.UI.getUIManager().getColorPicker(this);
		if (colorPicker) {
			colorPicker.callback = (function (self) {
				return function (color) {
					self.setColor(color, null);
				};
			})(this);
			var overrides = this.getAttribute("cq-overrides");
			if (overrides) overrides = overrides.split(",");
			colorPicker.display({
				node: this,
				context: CIQ.UI.getMyContext(this),
				overrides: overrides
			});
			this.colorPicker = colorPicker;
		}
	}
}

CIQ.UI.addComponentDefinition("cq-swatch", Swatch);
