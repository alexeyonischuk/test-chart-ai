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
 * Creates the `<cq-toggle>` web component.
 *
 * UI Helper that binds a toggle to an object member or to callback functions when toggled.
 *
 * **Attributes**
 * - `cq-member` &mdash; Object member to observe. If not provided, then callbacks are used
 *    exclusively.
 * - `cq-multichart-distribute` &mdash; Option for multichart context. Distributes object member
 * 		change to all charts.
 * - `cq-action` &mdash; Action to take. Default is "class".
 * - `cq-value` &mdash; Value for the action (i.e., class name). Default is "active".
 * - `cq-toggles` &mdash; A comma-separated list of values which are toggled through with each
 *    click. The list can include "null". Stringified booleans and "null" are converted to their
 *    primitive values. All other values are passed to the Number constructor. If the result is a
 *    number (not NaN), the number is used. Otherwise the value is left as a string.
 * - `cq-toggle-classes` &mdash; A comma-separated list of classes associated with the toggle
 *    setting. If a setting requires multiple classes, they need to be separated with spaces.
 *
 * Use [registerCallback](WebComponents.cq-toggle.html#registerCallback) to receive a callback
 * every time the toggle changes. When a callback is registered, any automatic class changes are
 * bypassed.
 *
 * @since 2015
 * @namespace WebComponents.cq-toggle
 *
 * @example
 * document.querySelector("cq-toggle").registerCallback(function(value){
 *    console.log("current value is " + value);
 *    if(value!=false) this.node.addClass("active");
 * })
 */
class Toggle extends CIQ.UI.ContextTag {
	constructor() {
		super();
		this.params = {
			member: null,
			obj: null,
			action: "class",
			value: "active",
			toggles: [],
			classes: {},
			callbacks: []
		};
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Toggle);
	}

	disconnectedCallback() {
		this.disconnectObservable();
		super.disconnectedCallback();
	}

	disconnectObservable() {
		const {
			params: { member, obj },
			listener
		} = this;
		if (member && obj && listener)
			CIQ.UI.unobserveProperty(member, obj, listener);
	}

	begin() {
		const self = this;

		if (this.params.member) {
			this.listener = function (obj) {
				self.updateFromBinding(self.params);
			};
			CIQ.UI.observeProperty(
				self.params.member,
				self.params.obj,
				this.listener
			);
		}
		if (this.tapInitialized) return;
		CIQ.UI.stxtap(this, function () {
			var toggles = self.params.toggles;
			var obj = self.params.obj;
			if (toggles.length > 1) {
				// Cycle through each field in the array with each tap
				for (var i = 0; i < toggles.length; i++) {
					var toggle = toggles[i];
					if (self.currentValue == toggle) {
						if (i < toggles.length - 1) self.set(toggles[i + 1]);
						else self.set(toggles[0]);
						break;
					}
				}
				if (i == toggles.length) {
					// default to first item in toggle
					self.set(toggles[0]);
				}
			} else {
				if (self.currentValue) {
					self.set(false);
				} else {
					self.set(true);
				}
			}
			const { stx } = this.context;
			stx.draw();
			if (obj === stx.layout) stx.changeOccurred("layout");
			if (obj === stx.preferences) stx.changeOccurred("preferences");
		});
		this.tapInitialized = true;
	}

	/**
	 * Adds a callback function to the toggle.
	 *
	 * @param {function} fc The callback function to add to the toggle. The function accepts the
	 * 		current value of the toggle as a parameter. The value of `this` within the callback
	 * 		function is the toggle component.
	 * @param {boolean} immediate A flag that indicates whether to immediately call the callback
	 * 		function after it has been registered with the toggle.
	 *
	 * @alias registerCallback
	 * @memberof WebComponents.cq-toggle
	 * @since 2015
	 */
	registerCallback(fc, immediate) {
		if (immediate !== false) immediate = true;
		this.params.callbacks.push(fc);
		if (immediate) fc.call(this, this.currentValue);
	}

	set(value) {
		if (this.isInfoToggle) return this.parentElement.set(value);

		if (this.params.member) {
			if (
				this.context &&
				this.context.topNode.getCharts &&
				this.hasAttribute("cq-multichart-distribute")
			) {
				let charts = this.context.topNode.getCharts();
				let objType = null;
				if (this.params.obj === this.context.stx.layout) objType = "layout";
				if (this.params.obj === this.context.stx.preferences)
					objType = "preferences";
				if (objType) {
					charts.forEach((chart) => {
						chart[objType][this.params.member] = value;
						if (chart !== this.context.stx) chart.changeOccurred(objType);
					});
				}
			}
			this.params.obj[this.params.member] = value;
		} else {
			this.currentValue = value;
			for (var i = 0; i < this.params.callbacks.length; i++) {
				this.params.callbacks[i].call(this, this.currentValue);
			}
		}
		this.updateClass();
	}

	setContext({ config }) {
		this.currentValue |= false; // if it were set to true before, leave it
		this.params.obj = this.context.stx.layout;
		var member = this.node.attr("cq-member");
		if (member === undefined && this.node.attr("member")) {
			member = this.node.attr("member");
			if (this.innerHTML === "") {
				this.innerHTML = `<span></span><cq-tooltip>${this.node.attr(
					"tooltip"
				)}</cq-tooltip>`;
			}
		}
		if (member == "headsUp") this.wrapInInfoToggle();
		if (config && config.channels && config.channels[member]) {
			member = config.channels[member];
		}
		if (member && member.indexOf(".") !== -1) {
			var m = member.split(".");
			this.params.obj = this.context.stx[m[0]];
			if (typeof this.params.obj === "undefined") {
				this.context.stx[m[0]] = this.params.obj = {};
			}
			member = m[1];
		}
		if (member) this.params.member = member;
		var action = this.node.attr("cq-action");
		if (action) this.params.action = action;
		var value = this.node.attr("cq-value");
		if (value) this.params.value = value;
		var toggles = this.node.attr("cq-toggles");
		if (toggles) this.params.toggles = toggles.split(",");
		// By default anything in the toggle attribute will be a string, which can cause issues when observing a member b/c "true"!==true
		// Here we are setting "true", "false", and "null" to be their native alternatives instead of strings.
		// We also check to see if we can cast the number and if it is not NaN we change it to be a number.
		// Be aware this will change an empty string to 0 but you shouldn't be setting an empty string!
		for (var i = 0; i < this.params.toggles.length; i++) {
			toggles = this.params.toggles;
			var toggle = toggles[i];
			if (toggle === "null") toggles[i] = null;
			else if (toggle === "true" || toggle === "false")
				toggles[i] = toggle === "true";
			else if (!isNaN(Number(toggle))) toggles[i] = Number(toggle);
		}
		// associate class with toggle setting
		var toggleClasses = this.node.attr("cq-toggle-classes");
		if (toggleClasses) {
			// extract an array of class settings from comma or comma-space separated class list
			var toggleClassArr = toggleClasses.split(/, |,/);

			// find classes to be cleared when new setting is applied,
			// taking in account that a setting can have more than one  space separated class assigned
			this.params.removeClasses = toggleClasses
				.split(/, | |,/)
				.filter((el) => el);

			// associate each setting with applicable class(es)
			this.params.classes = this.params.toggles.reduce(function (
				classLookup,
				setting,
				index
			) {
				classLookup[setting] = toggleClassArr[index].split(/ /);
				return classLookup;
			}, {});
		}
		// set default value if object[member] is undefined
		if (member && this.params.obj[member] === undefined) {
			const defaultValue =
				toggles && toggles.length ? toggles[toggles.length - 1] : false;
			this.params.obj[member] = defaultValue;
		}

		this.begin();
	}

	changeContext(newContext) {
		this.disconnectObservable();
		this.context = newContext;
		this.setContext(newContext);
	}

	updateFromBinding(params) {
		this.currentValue = this.isInfoToggle
			? this.parentElement.getCurrentValue(params)
			: params.obj[params.member];

		if (!this.params.callbacks.length) {
			if (this.params.action == "class") {
				if (this.currentValue) {
					this.node.addClass(this.params.value);
				} else {
					this.node.removeClass(this.params.value);
				}
			}
		} else {
			for (var i = 0; i < this.params.callbacks.length; i++) {
				this.params.callbacks[i].call(this, this.currentValue);
			}
		}
		this.updateClass();
		if (params.member == "crosshair" && this.currentValue === false)
			this.context.stx.doDisplayCrosshairs();
	}

	updateClass() {
		const { removeClasses, classes } = this.params;
		if (!removeClasses || this.currentValue === undefined) {
			return;
		}

		this.classList.remove(...removeClasses);
		if (classes[this.currentValue][0]) {
			let currentClasses = classes[this.currentValue];
			this.classList.add(...currentClasses);
		}
	}

	wrapInInfoToggle() {
		// inserts a cq-info-toggle around the headsUp cq-toggle if there is none, because it needs it to function
		if (this.closest("cq-info-toggle, cq-info-toggle-dropdown")) return;
		var infoToggle = document.createElement("cq-info-toggle");
		this.parentNode.replaceChild(infoToggle, this);
		infoToggle.appendChild(this);
	}
}

CIQ.UI.addComponentDefinition("cq-toggle", Toggle);
