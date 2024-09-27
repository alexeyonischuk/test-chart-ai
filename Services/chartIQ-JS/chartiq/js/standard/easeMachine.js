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


import { CIQ as _CIQ } from "../../js/chartiq.js";


let __js_standard_easeMachine_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * A simple device to make ease functions easy to use. Requests a cubic function that takes the
 * form `function (t, b, c, d)`, where:
 * - t = current time
 * - b = starting value
 * - c = change in value
 * - d = duration
 *
 * @param {function|string} fc The cubic function or the function name of a static method.
 * @param {number} ms Milliseconds to perform the function.
 * @param {(Object.<string, number>|number)} [startValues] Name/value pairs of starting values, or
 * 		a single value.
 * @param {(Object.<string, number>|number)} [endValues] Name/value pairs of ending values, or a
 * 		single value.
 *
 * @name  CIQ.EaseMachine
 * @constructor
 * @example
 * let e = new CIQ.EaseMachine("easeInOutCubic", 200);
 * e.run(function(v){console.log(v)}, 100, 110);
 * @since 8.6.0 Allow the static function name to be passed instead of the function itself.
 */
CIQ.EaseMachine = function (fc, ms, startValues, endValues) {
	if (typeof fc === "string") this.fc = CIQ.EaseMachine[fc];
	else this.fc = fc;

	this.ms = ms;
	if (startValues || startValues === 0) {
		this.reset(startValues, endValues);
	}
};

/**
 * Resets the ease machine with a new set of values.
 *
 * @param {(Object.<string, number>|number)} startValues Name/value pairs of starting values, or a
 * 		single value. If null, the `endValues` become the `startValues` (allowing for resetting or
 * 		reversing of direction).
 * @param {(Object.<string, number>|number)} endValues Name/value pairs of ending values, or a
 * 		single value.
 *
 * @memberof CIQ.EaseMachine
 */
CIQ.EaseMachine.prototype.reset = function (startValues, endValues) {
	if (!startValues && startValues !== 0) startValues = this.currentValues;
	this.hasCompleted = false;
	this.running = false;
	this.okayToRun = true;
	this.useNameValuePairs = typeof endValues == "object";
	this.startTime = Date.now();
	if (this.useNameValuePairs) {
		this.startValues = startValues;
		this.endValues = endValues;
	} else {
		this.startValues = { default: startValues };
		this.endValues = { default: endValues };
	}
	this.changeValues = {};
	this.currentValues = {};
	for (var n in this.startValues) {
		this.changeValues[n] = this.endValues[n] - this.startValues[n];
	}
};

/**
 * Returns the next set of values or individual value.
 *
 * @return {(Object.<string, number>|number)} Name/value pairs of current values, or the current
 * 		value.
 *
 * @memberof CIQ.EaseMachine
 * @private
 */
CIQ.EaseMachine.prototype.next = function () {
	var now = Date.now();
	if (now >= this.startTime + this.ms) {
		now = this.startTime + this.ms;
		this.hasCompleted = true;
		this.running = false;
	}
	this.currentValues = {};
	for (var n in this.changeValues) {
		this.currentValues[n] = this.fc(
			now - this.startTime,
			this.startValues[n],
			this.changeValues[n],
			this.ms
		);
	}
	if (!this.useNameValuePairs) return this.currentValues["default"];
	return this.currentValues;
};

/**
 * This will be false while the ease machine is completing
 * @type {boolean}
 * @memberof CIQ.EaseMachine
 */
CIQ.EaseMachine.prototype.hasCompleted = true;

/**
 * Runs the ease machine in a loop until completion by calling `next()` from within a
 * `requestAnimationFrame`.
 *
 * @param {function} fc Function callback which receives the results of
 * 		{@link CIQ.EaseMachine#next}.
 * @param {(Object.<string, number>|number)} [startValues] Name/value pairs of starting values, or
 * 		a single value.
 * @param {(Object.<string, number>|number)} [endValues] Name/value pairs of ending values, or a
 * 		single value.
 * @param {boolean} [delayFirstRun=false] Normally, the first pass of the run happens immediately.
 * 		Pass true if you want to wait for the next animation frame before beginning.
 * @param {object} [ownerWindow] The window where the parent chart is loaded.
 *		This resolves the known MDN issue where the requestAnimationFrame callback is never called when the parent window is hidden (background page).
 *
 * @memberof CIQ.EaseMachine
 *
 * @since 8.9.1 Added `ownerWindow` parameter.
 */
CIQ.EaseMachine.prototype.run = function (
	fc,
	startValues,
	endValues,
	delayFirstRun,
	ownerWindow
) {
	if (!ownerWindow) ownerWindow = window;
	if (this.afid) ownerWindow.cancelAnimationFrame(this.afid);
	if (startValues || startValues === 0) {
		this.reset(startValues, endValues);
	} else if (endValues || endValues === 0) {
		this.reset(this.currentValues, endValues);
	}
	var self = this;
	function go() {
		self.afid = null;
		if (!self.okayToRun) return;
		var result = self.next();
		fc(result);
		if (self.hasCompleted) return;
		self.afid = ownerWindow.requestAnimationFrame(go);
	}
	this.running = true;
	if (delayFirstRun) this.afid = ownerWindow.requestAnimationFrame(go);
	else go();
};

/**
 * Stops the ease machine from running mid-animation. Returns the current state.
 *
 * @param {object} [ownerWindow] The window where the parent chart is loaded.
 *		This resolves the known MDN issue where the requestAnimationFrame callback is never called when the parent window is hidden (background page).
 *
 * @return {Object.<string, number>} Name/value pairs of current values, or the current value.
 *
 * @memberof CIQ.EaseMachine
 *
 * @since 8.9.1 Added `ownerWindow` parameter.
 */
CIQ.EaseMachine.prototype.stop = function (ownerWindow) {
	if (!ownerWindow) ownerWindow = window;
	if (this.afid) ownerWindow.cancelAnimationFrame(this.afid);
	this.afid = null;
	this.okayToRun = false;
	this.hasCompleted = true;
	this.running = false;
	if (typeof this.useNameValuePairs == "undefined") return {};
	if (!this.useNameValuePairs) return this.currentValues["default"];
	return this.currentValues;
};

/**
 * Quadratic easing out - decelerating to zero velocity (https://gizma.com/easing/).
 *
 * @param {number} t Current time (t should move from zero to d).
 * @param {number} b Starting value.
 * @param {number} c Change in value (b + c = ending value ).
 * @param {number} d Duration.
 *
 * @memberof CIQ.EaseMachine
 * @since 8.6.0
 */
CIQ.EaseMachine.easeInOutQuad = function (t, b, c, d) {
	t /= d / 2;
	if (t < 1) return (c / 2) * t * t + b;
	t--;
	return (-c / 2) * (t * (t - 2) - 1) + b;
};

/**
 * Cubic easing in/out - acceleration until halfway, then deceleration (https://gizma.com/easing/).
 *
 * @param {number} t Current time (t should move from zero to d).
 * @param {number} b Starting value.
 * @param {number} c Change in value (b + c = ending value ).
 * @param {number} d Duration.
 *
 * @memberof CIQ.EaseMachine
 * @since 8.6.0
 */
CIQ.EaseMachine.easeInOutCubic = function (t, b, c, d) {
	t /= d / 2;
	if (t < 1) return (c / 2) * t * t * t + b;
	t -= 2;
	return (c / 2) * (t * t * t + 2) + b;
};

/**
 * Cubic easing out - decelerating to zero velocity (https://gizma.com/easing/).
 *
 * @param {number} t Current time (t should move from zero to d).
 * @param {number} b Starting value.
 * @param {number} c Change in value (b + c = ending value ).
 * @param {number} d Duration.
 *
 * @memberof CIQ.EaseMachine
 * @since 8.6.0
 */
CIQ.EaseMachine.easeOutCubic = function (t, b, c, d) {
	t /= d;
	t--;
	return c * (t * t * t + 1) + b;
};

if (CIQ.ChartEngine.prototype.animations.zoom.isStub)
	CIQ.ChartEngine.prototype.animations.zoom = new CIQ.EaseMachine(
		"easeOutCubic",
		400
	);

};
__js_standard_easeMachine_(typeof window !== "undefined" ? window : global);
