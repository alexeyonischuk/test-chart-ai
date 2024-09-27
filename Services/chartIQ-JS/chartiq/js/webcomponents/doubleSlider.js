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
 * Double range slider web component `<cq-double-slider>`.
 *
 * A double slider has a thumb (slidable control) at each end of the slider track.
 *
 * This web component is an implementation of a low/high range slider. The left thumb sets the low
 * value of the slider; the right thumb, the high value.
 *
 * The value of the slider is an object specifying the high and low values. The component includes
 * a text readout of the values.
 *
 * **Attributes**
 * - min &mdash; Minimum value of the slider
 * - max &mdash; Maximum value of the slider
 * - low &mdash; Preset value for the left thumb
 * - high &mdash; Preset value for the right thumb
 * - step &mdash; The absolute amount (positive or negative) the movement of a thumb changes a
 *   slider setting
 *
 * See the example below.
 *
 * @namespace WebComponents.cq-double-slider
 * @since 8.3.0
 *
 * @example
 * <cq-item>
 *     Strike <cq-double-slider min="0" max="100" low="20" high="80" step="1"></cq-double-slider>
 * </cq-item>
 */
class DoubleSlider extends CIQ.UI.BaseComponent {
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		this.init();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, DoubleSlider);
		this.constructor = DoubleSlider;
	}

	init() {
		this.addDefaultMarkup();
		this.textRange = this.querySelector(".ciq-double-slider-text");
		this.lowSlider = this.querySelector(
			".ciq-double-slider-range[range='low']"
		);
		this.highSlider = this.querySelector(
			".ciq-double-slider-range[range='high']"
		);
		this.backing = this.querySelector("cq-double-slider-range");
		this.name = this.getAttribute("name") || CIQ.uniqueID();
		["min", "max", "step", "low", "high"].forEach((prop) => {
			if (this.hasAttribute(prop)) this[prop] = Number(this.getAttribute(prop));
		});

		this.setBounds(this);
		const self = this;

		function slide(slider, event) {
			let value = slider.value;
			if (event) {
				const touch = event.touches[0];
				const boundingClientRect = self.highSlider.getBoundingClientRect();
				let { height, width } = getComputedStyle(self.highSlider);
				height = parseFloat(height);
				width = parseFloat(width);
				let ratio = 1;
				if (height > width) {
					const boundedOffset = Math.max(
						0,
						Math.min(height, touch.pageY - boundingClientRect.top)
					);
					ratio = boundedOffset / height;
				} else {
					const boundedOffset = Math.max(
						0,
						Math.min(width, touch.pageX - boundingClientRect.left)
					);
					ratio = boundedOffset / width;
				}
				value = self.min + ratio * (self.max - self.min);
			}
			// If we are performing an initial slide, figure out whether we are closer to high or to low
			if (!self.whichSlider) {
				self.whichSlider =
					value * 2 >
					(isNaN(self.high) ? self.max : self.high) +
						(isNaN(self.low) ? self.min : self.low) +
						1
						? self.highSlider
						: self.lowSlider;
			}
			if (self.whichSlider === self.lowSlider) {
				self.low = self.lowSlider.value = Math.min(
					typeof self.high === "undefined" ? self.max : self.high,
					value
				);
			} else if (self.whichSlider === self.highSlider) {
				self.high = self.highSlider.value = Math.max(
					typeof self.low === "undefined" ? self.min : self.low,
					value
				);
			}
			self.setValue(self);
		}

		[this.highSlider, this.lowSlider].forEach((slider) => {
			["mousedown", "pointerdown"].forEach((ev) => {
				slider.addEventListener(ev, (evt) => {
					self.whichSlider = null;
				});
			});
			slider.addEventListener("input", () => slide(slider));
			if (CIQ.touchDevice) {
				slider.addEventListener(
					"touchstart",
					(evt) => {
						self.whichSlider = null;
						self.engaged = true;
						slide(slider, evt);
					},
					{
						passive: false
					}
				);
				slider.addEventListener(
					"touchmove",
					(evt) => {
						if (self.engaged) slide(slider, evt);
					},
					{
						passive: false
					}
				);
				slider.addEventListener(
					"touchend",
					(evt) => {
						self.engaged = false;
					},
					{
						passive: false
					}
				);
			}
		});
	}

	/**
	 * Sets the min, max, and step of the slider.
	 *
	 * @param {object} bounds Contains min, max, and step values.
	 *
	 * @alias setBounds
	 * @memberof! WebComponents.cq-double-slider
	 * @since 8.3.0
	 */
	setBounds(bounds) {
		Array.from(this.querySelectorAll('input[type="range"]')).forEach((el) => {
			["min", "max", "step"].forEach((prop) => {
				if (bounds[prop] || bounds[prop] === 0) {
					el.setAttribute(prop, bounds[prop]);
					this[prop] = bounds[prop];
				}
			});
		});
		this.updateVisual();
	}

	/**
	 * Sets the high and low values of the slider.
	 *
	 * The high and low values are restricted to the range of the max and min.
	 *
	 * @param {object} [data] Contains high and low values.
	 *
	 * @alias setValue
	 * @memberof! WebComponents.cq-double-slider
	 * @since 8.3.0
	 */
	setValue(data) {
		const obj = {};
		if (data) {
			if (data.low !== undefined) {
				obj.low =
					this.min === undefined ? data.low : Math.max(this.min, data.low);
			}
			if (data.high !== undefined) {
				obj.high =
					this.max === undefined ? data.high : Math.min(this.max, data.high);
			}
		}
		if (!CIQ.equals(this.value, obj)) this.value = obj;
		this.low = obj.low;
		this.high = obj.high;
		this.updateVisual();
	}

	/**
	 * Updates the slider view based on the slider attributes.
	 *
	 * @alias updateVisual
	 * @memberof! WebComponents.cq-double-slider
	 * @since 8.3.0
	 */
	updateVisual() {
		this.setAttribute("min", this.min);
		this.setAttribute("max", this.max);
		this.setAttribute("low", this.low);
		this.setAttribute("high", this.high);
		this.setAttribute("step", this.step);

		const style = getComputedStyle(this.textRange);
		const inColor = style.color;
		const outColor = style.borderLeftColor;
		let low = this.low;
		if (isNaN(low) || low < this.min) low = this.min;
		let high = this.high;
		if (isNaN(high) || high > this.max) high = this.max;
		this.lowSlider.value = low;
		this.highSlider.value = high;

		// let input element do the rounding for us
		if (typeof low !== "undefined") low = Number(this.lowSlider.value);
		if (typeof high !== "undefined") high = Number(this.highSlider.value);

		const min = low - this.min;
		const max = high - this.min;
		this.textRange.innerHTML = low + "-" + high;
		const range = this.max - this.min;
		const stop = [(min / range) * 100, (max / range) * 100];
		this.backing.style.background = `linear-gradient(to right,
			${outColor} 0% ${stop[0]}%,
			${inColor} ${stop[0]}% ${stop[1]}%,
			${outColor} ${stop[1]}% 100%)`;
	}
}

DoubleSlider.markup = `
		<cq-double-slider-text class="ciq-double-slider-text"></cq-double-slider-text>
		<cq-double-slider-range class="ciq-double-slider-range"></cq-double-slider-range>
		<input type="range" class="ciq-double-slider-range" range="low">
		<input type="range" class="ciq-double-slider-range" range="high">
`;

CIQ.UI.addComponentDefinition("cq-double-slider", DoubleSlider);
