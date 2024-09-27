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
 * Add-on that responds to the chart zoom action, changing periodicities as the number of ticks and/or candle width
 * hits a set boundary.
 *
 * Although this feature is available for all chart styles, it shows best on continuous renderings
 * such as lines and mountains vs. candles and bars. This is because some users may find the
 * changes in candle width that take place as the same range is displayed in a different
 * periodicity, inappropriate. The effect can be mitigated by increasing the number of boundaries
 * so periodicities change more often, preventing large candle width changes, and by using the
 * periodicity roll up feature instead of fetching new data from a quote feed. See examples.
 *
 * See {@link CIQ.ChartEngine#setPeriodicity} and {@link CIQ.ChartEngine#createDataSet}
 *
 * Requires *addOns.js*.
 *
 * The feature will not work without supplying at least one element within the periodicities array
 * and at least one property within the boundaries object.
 *
 * @param {object} params Configuration parameters.
 * @param {CIQ.ChartEngine} params.stx The chart object.
 * @param {array} params.periodicities Set this array with eligible periodicities in any order.
 * 		These will be the periodicities which will be used by the continuous zooming once a
 * 		boundary is hit. The periodicities are objects with `period`, `interval`, and optional
 * 		`timeUnit` properties (see {@link CIQ.ChartEngine#setPeriodicity}).
 * @param {object} params.boundaries Optional boundary cases to trigger the periodicity change.
 * 		Hitting a maximum boundary switches to the next larger periodicity; hitting a minimum
 * 		boundary switches to the next smaller periodicity.
 * @param {number} [params.boundaries.maxCandleWidth] Largest size of candle in pixels to display
 * 		before switching periodicity.
 * @param {number} [params.boundaries.minCandleWidth] Smallest size of candle in pixels to display
 * 		before switching periodicity.
 * @param {number} [params.boundaries.maxTicks] Most number of ticks to display before switching
 * 		periodicity.
 * @param {number} [params.boundaries.minTicks] Least number of ticks to display before switching
 * 		periodicity.
 *
 * @constructor
 * @name CIQ.ContinuousZoom
 * @since 7.0.0
 *
 * @example
 * new CIQ.ContinuousZoom({
 *     stx: stxx,
 *     periodicities: [
 *         { period:1, interval:"month" },
 *         { period:1, interval:"day" },
 *         { period:2, interval:30 },
 *         { period:1, interval:5 },
 *         { period:15, interval:1, timeUnit:"second" },
 *         { period:1, interval:1, timeUnit:"second" }
 *     ],
 *     boundaries: {
 *         maxCandleWidth: 100,
 *         minCandleWidth: 3,
 *         maxTicks: 500,
 *         minTicks: 10
 *     }
 * });
 *
 * @example
 * // Smother periodicity change by rolling daily into weekly and monthly.
 * // Also try reusing the same interval data and have the chart roll it instead of fetching new data.
 * stxx.dontRoll = false;
 * new CIQ.ContinuousZoom({
 *     stx: stxx,
 *     periodicities: [
 *         // Daily interval data
 *         {period:1, interval:"month"},
 *         {period:2, interval:"week"},
 *         {period:1, interval:"week"},
 *         {period:3, interval:"day"},
 *         {period:1, interval:"day"},
 *         // 30 minute interval data
 *         {period:16, interval:30},
 *         {period:8, interval:30},
 *         {period:4, interval:30},
 *         {period:2, interval:30},
 *         // one minute interval data
 *         {period:30, interval:1},
 *         {period:15, interval:1},
 *         {period:10, interval:1},
 *         {period:5, interval:1},
 *         {period:2, interval:1},
 *         {period:1, interval:1},
 *         // One second interval data
 *         {period:30,interval:1, timeUnit:"second"},
 *         {period:15,interval:1, timeUnit:"second"},
 *         {period:5, interval:1, timeUnit:"second"},
 *         {period:2, interval:1, timeUnit:"second"},
 *         {period:1, interval:1, timeUnit:"second"},
 *     ],
 *     boundaries: {
 *         maxCandleWidth: 15,
 *         minCandleWidth: 3
 *    }
 * });
 */
CIQ.ContinuousZoom =
	CIQ.ContinuousZoom ||
	function (params) {
		this.cssRequired = true;
		this.update(params);
		this.stx.continuousZoom = this;

		//Attaches SmartZoom button to HTML DOM inside .chartSize element
		this.addSmartZoomButton = function () {
			// Don't add a button if one already exists
			var smartZoomButton =
				this.stx.registerChartControl &&
				this.stx.registerChartControl(
					"stx-smart-zoom",
					"SmartZoom (Alt + 0)",
					(function (self) {
						return function (e) {
							self.smartZoomToggle(e);
							e.stopPropagation();
						};
					})(this)
				);
			if (smartZoomButton) {
				// Listen for a layout changed event and refresh the toggle state of the button
				this.stx.addEventListener("layout", function (event) {
					if (event.stx.layout.smartzoom === true) {
						smartZoomButton.classList.add("active");
					} else {
						smartZoomButton.classList.remove("active");
					}
				});
				// Piggyback off of symbolImport event to detect smartzoom set to false from layout import
				this.stx.addEventListener("symbolImport", function (event) {
					if (event.stx.layout.smartzoom === false)
						smartZoomButton.classList.remove("active");
				});
			}
		};

		//Click event handler for the Smart Zoom button. Sets smartzoom property of layout to its inverse
		this.smartZoomToggle = function (e) {
			this.smartZoomEnable(!this.stx.layout.smartzoom);
		};

		//Sets smartzoom property of layout and notifies attached ChartEngine of change
		this.smartZoomEnable = function (state) {
			this.stx.layout.smartzoom = state;
			this.stx.changeOccurred("layout");
		};

		// Add the SmartZoom button to chartControls
		this.addSmartZoomButton();
		// Enable SmartZoom by default
		this.smartZoomEnable(true);
	};

/**
 * Updates continuous zoom parameters
 * @param  {object} params Configuration parameters.  See constructor for details
 * @memberof CIQ.ContinuousZoom
 * @since 7.0.0
 * @private
 */
CIQ.ContinuousZoom.prototype.update = function (params) {
	if (!params) params = {};
	this.stx = params.stx;
	this.periodicities = params.periodicities;
	this.boundaries = params.boundaries;
};

/**
 * Potentially performs a continuous zoom after a zoom event
 * @param  {boolean} [zoomOut] True for a zoomOut operation, otherwise zoomIn
 * @memberof CIQ.ContinuousZoom
 * @since 7.0.0
 * @private
 */
CIQ.ContinuousZoom.prototype.execute = function (zoomOut) {
	// assign a weight to a periodicity setting, the higher the length, the higher the weight
	function valuate(periodicity) {
		var period = periodicity.period || periodicity.periodicity,
			interval = periodicity.interval,
			timeUnit = periodicity.timeUnit || "minute";
		if (isNaN(interval)) {
			timeUnit = interval;
			interval = 1;
		}
		switch (timeUnit) {
			case "month":
				interval *= 4.35; /* falls through */
			case "week":
				interval *= 7; /* falls through */
			case "day":
				interval *= 1440; /* falls through */
			case "minute":
				interval *= 60; /* falls through */
			case "second":
				break;
			case "millisecond":
				interval /= 1000;
				break;
			default:
				return null;
		}
		return period * interval;
	}
	if (!this.stx || !this.stx.layout.smartzoom) return;
	var periodicities = this.periodicities,
		boundaries = this.boundaries,
		stx = this.stx,
		layout = stx.layout,
		chart = stx.chart;
	if (!periodicities || !boundaries) return;

	if (
		(!zoomOut &&
			boundaries.maxCandleWidth &&
			layout.candleWidth > boundaries.maxCandleWidth) ||
		(zoomOut &&
			boundaries.minCandleWidth &&
			layout.candleWidth < boundaries.minCandleWidth) ||
		(!zoomOut && boundaries.minTicks && chart.maxTicks < boundaries.minTicks) ||
		(zoomOut && boundaries.maxTicks && chart.maxTicks > boundaries.maxTicks)
	) {
		var next = { value: zoomOut ? Number.MAX_VALUE : 0 };
		var myValue = valuate(layout);
		for (var p = 0; p < periodicities.length; p++) {
			var value = valuate(periodicities[p]);
			if (
				(value > myValue && value < next.value && zoomOut) ||
				(value < myValue && value > next.value && !zoomOut)
			) {
				next = { value: value, periodicity: periodicities[p] };
			}
		}
		var newPeriodicity = next.periodicity;
		if (newPeriodicity) {
			stx.setRange({
				dtLeft: chart.xaxis[0].DT,
				dtRight: chart.xaxis[chart.xaxis.length - 1].DT,
				dontSaveRangeToLayout: true,
				periodicity: newPeriodicity,
				padding: stx.preferences.whitespace
			});
		}
	}
};
