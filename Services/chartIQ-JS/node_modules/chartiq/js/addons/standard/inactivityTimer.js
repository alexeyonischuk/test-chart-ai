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


import { CIQ as _CIQ } from "../../../js/chartiq.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Add-On that puts the chart into "sleep mode" after a period of inactivity.
 *
 * Requires *addOns.js*.
 *
 * In sleep mode, a class "ciq-sleeping" will be added to the body.  This will dim out the chart.
 * Sleep mode is ended when interaction with the chart is detected.
 *
 * @param {object} params Configuration parameters
 * @param {CIQ.ChartEngine} [params.stx] The chart object
 * @param {number} [params.minutes] Inactivity period in _minutes_.  Set to 0 to disable the sleep mode.
 * @param {number} [params.interval] Sleeping quote update interval in _seconds_.  During sleep mode, this is used for the update loop.
 * 									Set to non-zero positive number or defaults to 60.
 * @param {function} [params.wakeCB] Optional callback function after waking
 * @param {function} [params.sleepCB] Optional callback function after sleeping
 * @constructor
 * @name  CIQ.InactivityTimer
 * @since 3.0.0
 * @example
 * 	new CIQ.InactivityTimer({stx:stxx, minutes:30, interval:15});  //30 minutes of inactivity will put chart into sleep mode, updating every 15 seconds
 *
 */
CIQ.InactivityTimer =
	CIQ.InactivityTimer ||
	function (params) {
		if (!params.minutes) return;
		if (!params.interval || params.interval < 0) params.interval = 60;
		this.stx = params.stx;
		this.timeout = params.minutes;
		this.interval = params.interval;
		this.wakeCB = params.wakeCB;
		this.sleepCB = params.sleepCB;
		this.sleepTimer = null;
		this.sleeping = false;
		this.last = new Date().getTime();
		this.wakeChart = function (isPropagated) {
			clearTimeout(this.sleepTimer);
			this.last = new Date().getTime();
			if (this.sleeping) {
				if (this.stx.quoteDriver) this.stx.quoteDriver.updateChartLoop();
				this.sleeping = false;
				this.stx.container.ownerDocument.body.classList.remove("ciq-sleeping");
				if (!isPropagated) {
					CIQ.ChartEngine.registeredContainers.forEach(function (container) {
						if (params.stx !== container.stx && container.stx.inactivityTimer)
							container.stx.inactivityTimer.wakeChart(true);
					});
				}
			}
			this.sleepTimer = setTimeout(
				this.sleepChart.bind(this),
				this.timeout * 60000
			);
			if (this.wakeCB) this.wakeCB();
		};
		this.sleepChart = function (isPropagated) {
			if (!this.sleeping) {
				if (this.stx.quoteDriver)
					this.stx.quoteDriver.updateChartLoop(this.interval);
				this.sleeping = true;
				this.stx.container.ownerDocument.body.classList.add("ciq-sleeping");
				if (!isPropagated) {
					CIQ.ChartEngine.registeredContainers.forEach(function (container) {
						if (params.stx !== container.stx && container.stx.inactivityTimer)
							container.stx.inactivityTimer.sleepChart(true);
					});
				}
			}
			if (this.sleepCB) this.sleepCB();
		};

		var self = this,
			doc = this.stx.container.ownerDocument;
		function wake() {
			self.wakeChart();
		}

		[
			"mousemove",
			"mousedown",
			"touchstart",
			"touchmove",
			"pointerdown",
			"pointermove",
			"keydown",
			"wheel"
		].forEach(function (ev) {
			doc.body.addEventListener(ev, wake, { passive: false });
			self.stx.addEventListener("destroy", function () {
				doc.body.removeEventListener(ev, wake);
				clearTimeout(self.sleepTimer);
			});
		});

		this.stx.inactivityTimer = this;

		this.wakeChart();
	};
