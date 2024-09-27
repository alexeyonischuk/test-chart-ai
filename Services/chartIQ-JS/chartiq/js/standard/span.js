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


let __js_standard_span_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Used directly by {@link CIQ.ChartEngine#setRange} or indirectly by {@link CIQ.ChartEngine#loadChart}
 *
 * @typedef {Object} CIQ.ChartEngine~RangeParameters
 * @property {Date} [dtLeft] Date to set left side of the chart
 * @property {Date} [dtRight] Date to set right side of the chart
 * @property {number} [padding=0] Whitespace padding in pixels to apply to the right side of the chart after sizing for date range.
 * @property {CIQ.ChartEngine.Chart} [chart] Which chart, defaults to "chart"
 * @property {boolean} [goIntoFuture=false] set the right side of the chart to be in the future
 * @property {boolean} [goIntoPast=false] set the left side of the chart to be in the past
 * @property {CIQ.ChartEngine~PeriodicityParameters} [periodicity] Override a specific periodicity combination to use with the range
 * @property {number} [pixelPerBar] override automatic candle width calculations
 * @property {boolean} [dontSaveRangeToLayout=false] skip saving the range in the layout
 * @property {boolean} [forceLoad=false] a complete load (used by loadChart)
 */

/**
 * Sets a chart to the requested date range.
 *
 * By default, the **Minimum Width** for a bar is `1px`. As such, there may be times when the requested data will not all fit on the screen, even though it is available.
 * See {@link CIQ.ChartEngine#minimumCandleWidth} for instructions on how to override the default to allow more data to display.
 *
 * When a quotefeed is attached to the chart (ver 04-2015 and up), and not enough data is available in masterData to render the requested range, setRange will request more from the feed.
 * Also, if no periodicity (params.periodicity) is supplied in the parameters, **it may	 override the current periodicity** and automatically choose the best periodicity to use for the requested range using the {@link CIQ.ChartEngine#dynamicRangePeriodicityMap} when {@link CIQ.ChartEngine#autoPickCandleWidth} is enabled,
 * or the use of the {@link CIQ.ChartEngine#staticRangePeriodicityMap} object when {@link CIQ.ChartEngine#autoPickCandleWidth} is **NOT** enabled.
 * So depending on your UI, **you may need to use the callback to refresh the periodicity displayed on your menu**.
 *
 * Therefore, if you choose to let setRange set the periodicity, you should **not** call setPeriodicity before or after calling this method.
 *
 * **For details on how this method can affect the way daily data is rolled up, see {@link CIQ.ChartEngine#createDataSet}**
 *
 * **If the chart is in `tick` periodicity, the periodicity will be automatically selected even if one was provided because in `tick` periodicity we have no way to know how many ticks to get to fulfill the requested range.**
 *
 * If there is no quotefeed attached (or using a version prior to 04-2015), then setRange will use whatever data is available in the masterData. So you must ensure you have preloaded enough to display the requested range.
 *
 * This function must be called after loadChart() creates a dataSet.
 *
 * **Layout preservation and the range**
 * <br>The selected range will be recorded in the chart {@link CIQ.ChartEngine#layout} when it is requested through {@link CIQ.ChartEngine#loadChart}, or when you call setRange directly.
 * <br>It is then used in {@link CIQ.ChartEngine#importLayout} and {@link CIQ.ChartEngine#loadChart} to reset that range, until a new range is selected.
 *
 * @param {CIQ.ChartEngine~RangeParameters} params  Parameters for the request
 * @param {Date} [params.dtLeft] Date to set left side of chart. If no left date is specified then the right edge will be flushed, and the same interval and period will be kept causing the chart to simply scroll to the right date indicated.<BR> **Must be in the exact same time-zone as the `masterdata`.** See {@link CIQ.ChartEngine#setTimeZone} and {@link CIQ.ChartEngine#convertToDataZone} for more details. <BR> If the left date is not a valid market date/time, the next valid market period forward will be used.
 * @param {Date} [params.dtRight] Date to set right side of chart. Defaults to right now. <BR> **Must be in the exact same time-zone as the `masterdata`.** See {@link CIQ.ChartEngine#setTimeZone} and {@link CIQ.ChartEngine#convertToDataZone} for more details. <BR> If the right date is not a valid market date/time, the next valid market period backwards will be used.
 * @param {number} [params.padding] Whitespace padding in pixels to apply to right side of chart after sizing for date range. If not present then 0 will be used.
 * @param {CIQ.ChartEngine.Chart} [params.chart] Which chart, defaults to "chart"
 * @param {boolean} [params.goIntoFuture] If true then the right side of the chart will be set into the future if dtRight is greater than last tick. See {@link CIQ.ChartEngine#staticRange} if you wish to make this your default behavior.
 * @param {boolean} [params.goIntoPast] If true then the left side of the chart will be set into the past if dtLeft is less than first tick. See {@link CIQ.ChartEngine#staticRange} if you wish to make this your default behavior.
 * @param {CIQ.ChartEngine~PeriodicityParameters} [params.periodicity] Override a specific periodicity combination to use with the range. Only available if a quoteFeed is attached to the chart. Note: if the chart is in tick periodicity, the periodicity will be automatically selected even if one was provided because in tick periodicity we have no way to know how many ticks to get to fulfill the requested range. If used, all 3 elements of this object must be set.
 * @param {Number} params.periodicity.period Period as used by {@link CIQ.ChartEngine#setPeriodicity}
 * @param {string} params.periodicity.interval An interval as used by {@link CIQ.ChartEngine#setPeriodicity}
 * @param {string} params.periodicity.timeUnit A timeUnit as used by {@link CIQ.ChartEngine#setPeriodicity}
 * @param {Number} [params.pixelsPerBar] Optionally override this value so that the auto-periodicity selected chooses different sized candles.
 * @param {boolean} [params.dontSaveRangeToLayout] If true then the range won't be saved to the layout.
 * @param {boolean} [params.forceLoad] Forces a complete load (used by loadChart). Supersedes `useExistingData`.
 * @param {boolean} [params.useExistingData] Set to true to indicate existing data is sufficient.
 * @param {Function} [cb] Callback method. Will be called with the error returned by the quotefeed, if any.
 * @memberOf CIQ.ChartEngine
 * @since
 * - 04-2015 Added `params.rangePeriodicityMap` and `params.periodicity` as well as automatic integration with {@link quotefeed}.
 * - 2016-05-10 Deprecated `params.rangePeriodicityMap` in favor of new automatic algorithm.
 * - m-2016-12-01 Restored logic to reference a periodicity map. Similar to previous `params.rangePeriodicityMap`. See {@link CIQ.ChartEngine#staticRangePeriodicityMap} for details.
 * - m-2016-12-01 Modified automatic periodicity algorithm. See {@link CIQ.ChartEngine#dynamicRangePeriodicityMap} and {@link CIQ.ChartEngine#autoPickCandleWidth} for details.
 * - 4.0.0 Now uses {@link CIQ.ChartEngine#needDifferentData} to determine if new data should be fetched.
 * - 4.0.0 No longer defaulting padding to current value of `preferences.whiteSpace`.
 * - 5.1.0 Added `params.dontSaveRangeToLayout`.
 * - 5.1.0 The selected range will be recorded in the chart {@link CIQ.ChartEngine#layout} when it is requested through {@link CIQ.ChartEngine#loadChart}, or when you call setRange directly.
 * - 5.2.0 `params.forceLoad` is now an option to force loading of new data.
 * - 8.9.3 Added parameter `useExistingData`.
 * @example
 * <caption>Display all of the available data in the current chart periodicity.</caption>
 * stxx.setRange({
 *     dtLeft: stxx.chart.dataSet[0].DT,
 *     dtRight: stxx.chart.dataSet[stxx.chart.dataSet.length - 1].DT,
 *     periodicity:{period:stxx.layout.periodicity,interval:stxx.layout.interval,timeUnit:stxx.layout.timeUnit}
 * });
 */
CIQ.ChartEngine.prototype.setRange = function (params, cb) {
	if (CIQ.isEmpty(params)) {
		// Handle legacy argument list implementation
		params = {
			dtLeft: arguments[0],
			dtRight: arguments[1],
			padding: arguments[2],
			chart: arguments[3]
		};
		cb = arguments[4];
	}
	if (this.staticRange) {
		params.goIntoPast = params.goIntoFuture = true;
	}

	if (!params.chart) params.chart = this.chart;
	if (typeof params.padding == "undefined") {
		// if no whitespace sent in, maintain existing ( different than sending 0 which will set to no whitespace )
		params.padding = 0;
	}
	var dontChangePeriodicity = false;
	var chart = params.chart;
	var lt =
		typeof params.dtLeft === "string" ? new Date(params.dtLeft) : params.dtLeft; // just in case a string date is passed in
	var rt = new Date();
	if (params.dtRight)
		rt =
			typeof params.dtRight === "string"
				? new Date(params.dtRight)
				: params.dtRight;
	var iter;
	if (!lt) {
		// If no left date then we want to just flush the right edge, and keep the same interval,period
		iter = this.standardMarketIterator(rt, null, chart);
		lt = iter.previous(chart.maxTicks);
		if (!params.periodicity) dontChangePeriodicity = true;
	}
	chart.inflectionPoint = lt; //  this is where consolidation originates in either direction

	this.layout.range = { dtLeft: lt, dtRight: rt };

	var self = this;
	function showTheRange(err) {
		if (typeof err == "undefined") err = null;

		var l = 0,
			r = 0;
		var todaysDate = new Date();
		var base = params.base;
		var periodicity = params.periodicity;
		var layout = self.layout;

		if (
			params.goIntoFuture &&
			(!chart.masterData.length ||
				lt > chart.masterData[chart.masterData.length - 1].DT)
		) {
			// we're displaying entirely in the future, fill gap
			var leftmost = chart.masterData.length
				? chart.masterData.pop()
				: { DT: lt };
			var gapData = self.doCleanupGaps([leftmost, { DT: rt }], chart, {
				cleanupGaps: "gap",
				noCleanupDates: true
			});
			self.setMasterData(chart.masterData.concat(gapData), chart, {
				noCleanupDates: true
			});
			self.createDataSet(null, null, { appending: true });
		}
		var dataSet = chart.dataSet;
		var dsLength = dataSet.length;

		if (!dataSet || dsLength === 0) {
			self.draw();
			if (cb) cb(err);
			return;
		}

		var leftBar;
		// range is day and interval is day
		if (base === "day" && periodicity && periodicity.interval === "day") {
			var multiplier = params.multiplier;
			// left bar is how many days the range is, or beginning of dataset
			l = dsLength < multiplier ? 0 : dsLength - multiplier;
			r = dsLength - 1;
		}
		// if intraday range and last day in dataSet is older than current day then show previous day's data
		else if (
			base === "today" &&
			dataSet[dsLength - 1].DT.getDate() < todaysDate.getDate()
		) {
			var leftDT = new Date(dataSet[dsLength - 1].DT.getTime());
			var rightDT = leftDT.getTime(); // copy starting time
			leftBar = 0;

			for (var d = dsLength - 1; d >= 0; d--) {
				if (dataSet[d] && dataSet[d].DT.getDate() != leftDT.getDate()) {
					leftDT = new Date(+dataSet[d + 1].DT);
					leftBar = d + 1;
					break;
				}
			}
			l = leftBar;
			r = dsLength - 1;
		} else {
			if (
				params.base != "all" &&
				(lt.getTime() >= dataSet[0].DT.getTime() || params.goIntoPast)
			) {
				l = self.tickFromDate(lt, chart, null, true);
			} else {
				l = 0;
			}
			if (
				params.base != "all" &&
				(rt.getTime() <= dataSet[dsLength - 1].DT.getTime() ||
					params.goIntoFuture)
			) {
				r = self.tickFromDate(rt, chart);
				if (r > dsLength - 1) r--; // do not include tick from any end date
			} else {
				r = dsLength - 1;
			}
		}
		var ticks = r - l + 1;

		if (ticks < 1) {
			self.draw();
			if (cb) cb(err);
			return;
		}

		var padding = params.padding || 0;
		if (r < dsLength - 1) padding = 0;
		//var barsHaveWidth=self.mainSeriesRenderer && self.mainSeriesRenderer.barsHaveWidth;
		var newCandleWidth = (chart.width - padding) / ticks; //*(barsHaveWidth?1:(1-1/(2*ticks)));  // deduct 1/2 the proposed candlewidth for the micropixel offset for line type charts
		self.setCandleWidth(newCandleWidth, chart);
		chart.scroll = ticks - (r - dsLength) - 1;
		self.micropixels = 1; // this is done to allow crosshairs over first tick when candles are small
		// line-type charts go center-to-center in the data point space, so we end up with 1/2 a candle empty on the left and the right..
		//if(!barsHaveWidth) self.micropixels+=newCandleWidth/2; // line charts display to middle of candle
		for (var p in self.panels) self.calculateYAxisMargins(self.panels[p].yAxis);

		// only save the range for direct calls to setRange
		if (!params.dontSaveRangeToLayout) {
			delete params.chart; // having the chart in there causes an issue with cloning
			delete layout.setSpan; // range and setSpan are mutually exclusive
			layout.range = params; // save the range in the layout to be able to restore
			self.changeOccurred("layout");
		} else {
			// setRange called from setSpan, remove range from layout
			delete layout.range;
		}

		self.draw();
		if (!dontChangePeriodicity) {
			self.dispatch("periodicity", {
				stx: self,
				differentData: needDifferentData,
				prevPeriodicity: {
					interval: previousInterval,
					periodicity: previousPeriodicity,
					timeUnit: previousTimeUnit
				}
			});
		}
		if (cb) cb(err);
	}

	var loadMoreCount = 0; // safety valve to eliminate infinite loop
	function loadTheRange(err) {
		if (err && loadMoreCount === 0) {
			// change the periodicity, scroll and candle width back to original chart values
			// if our initial fetch from the quotedriver failed.
			chart.scroll = previousScroll;
			self.setCandleWidth(previousCandleWidth);
			self.layout.interval = previousInterval;
			self.layout.periodicity = previousPeriodicity;
			self.layout.timeUnit = previousTimeUnit;
			if (cb) cb(err);
			return;
		}
		loadMoreCount++;
		if (loadMoreCount > 10) {
			console.log(
				"CIQ.ChartEngine.setRange(): Too many loads (10) from server. Stopping. Check periodicity logic."
			);
			showTheRange();
			return;
		}
		// Removed - we should never need to fetch more data after requesting a span
		// Moreover, this created issues when setting a date only and fetching an intraday span -
		// code was being entered anyway since the masterData[0] was market open and lt was midnight.
		/*if(chart.moreAvailable && chart.masterData[0] && chart.masterData[0].DT>lt){
				self.quoteDriver.checkLoadMore(chart, true, false, function(err){
					if(!err)
						loadTheRange();
					else
						showTheRange(err); // if there was an error on a subsequent fetch, then show as much as we were able to get.
				},true);
			}else{*/
		showTheRange();
		//}
	}

	function estimateMaxTicks(rtMS, ltMS, interval, period, timeUnit, dontRoll) {
		// how many ticks do we need at the requested periodicity to fill the screen
		var ticks = 0;
		var ms = rtMS - ltMS;
		if (CIQ.ChartEngine.isDailyInterval(interval)) {
			if (interval == "month") {
				ticks = ms / CIQ.MONTH / period;
			} else if (interval == "week") {
				ticks = ms / CIQ.WEEK / period;
			} else {
				ticks = ms / CIQ.DAY / period;
			}
		} else {
			if (!isNaN(interval)) {
				if (timeUnit == "millisecond") ticks = ms / (period * interval);
				else if (timeUnit == "second")
					ticks = ms / CIQ.SECOND / (period * interval);
				else ticks = ms / CIQ.MINUTE / (period * interval);
			}
		}
		return Math.round(ticks); // rough estimation...
	}

	if (this.quoteDriver) {
		var intervalToUse, periodToUse, timeUnitToUse;
		if (dontChangePeriodicity) {
			intervalToUse = this.layout.interval;
			timeUnitToUse = this.layout.timeUnit;
			periodToUse = this.layout.periodicity;
		} else if (params.periodicity) {
			// If the caller specifies the periodicity then we use that
			var internalPeriodicity = CIQ.cleanPeriodicity(
				params.periodicity.period,
				params.periodicity.interval,
				params.periodicity.timeUnit
			);
			intervalToUse = internalPeriodicity.interval;
			timeUnitToUse = internalPeriodicity.timeUnit;
			periodToUse = internalPeriodicity.period;
		} else {
			// Set the periodicity according to the staticRangePeriodicityMap
			// This will check the milliseconds of each range and choose the proper width
			var rangeInMS = rt.getTime() - lt.getTime();
			if (!this.autoPickCandleWidth.turnOn) {
				var periodicityMap = this.staticRangePeriodicityMap;

				var entryToUse = null;
				// Cycle through the periodicity map looking for the closest fit
				for (var i = 0; i < periodicityMap.length; i++) {
					var mapEntry = periodicityMap[i];

					if (rangeInMS / mapEntry.rangeInMS < 1.001) {
						// inexact due to quote updates
						entryToUse = mapEntry;
						break;
					}
				}
				intervalToUse = entryToUse.interval;
				periodToUse = entryToUse.periodicity;
				timeUnitToUse = entryToUse.timeUnit;
			} else {
				// Calculate the best periodicity dynamically according to the intervals
				// set in dynamicRangePeriodicityMap
				var pixelsPerBar = 0;

				// use candlewidth set in the chart
				if (this.autoPickCandleWidth.candleWidth) {
					pixelsPerBar = this.autoPickCandleWidth.candleWidth;
				}
				// else choose candlewidth according to chart type
				else {
					pixelsPerBar = this.chart.barsHaveWidth ? 5 : 2;
				}

				var numBars = chart.width / pixelsPerBar;

				var possibleIntervals = this.dynamicRangePeriodicityMap;

				// default
				intervalToUse = possibleIntervals[0].interval;
				periodToUse = 1;

				var numBarsLastInterval;
				for (var j = 0; j < possibleIntervals.length; j++) {
					var numBarsThisInterval = rangeInMS / possibleIntervals[j].rangeInMS;
					if (numBarsThisInterval < numBars) {
						if (possibleIntervals[j - 1]) {
							intervalToUse = possibleIntervals[j - 1].interval;
							timeUnitToUse = possibleIntervals[j - 1].timeUnit;
							periodToUse = Math.ceil(numBarsLastInterval / numBars);
						} else {
							intervalToUse = possibleIntervals[j].interval;
							timeUnitToUse = possibleIntervals[j].timeUnit;
							periodToUse = 1;
						}
						break;
					}
					numBarsLastInterval = numBarsThisInterval;
				}
			}
		}

		// maintain the previous values just in case an error is thrown when getting new data
		var previousScroll = this.chart.scroll;
		var previousCandleWidth = this.layout.candleWidth;
		var previousInterval = this.layout.interval;
		var previousPeriodicity = this.layout.periodicity;
		var previousTimeUnit = this.layout.timeUnit;

		// to prevent multiple fetches trying to get enough ticks for the selected range;
		// maxticks,scroll and  candleWidth are used in CIQ.ChartEngine.Driver.barsToFetch and checkLoadMore() to deduce the number of ticks to fill the screen.
		// So we need to set it here to prevent us from using the pre-setRange  values which are not going to be right.
		// these are estimated, for the fetch, but will be properly recalculated by showTheRange();
		this.chart.maxTicks = estimateMaxTicks(
			rt.getTime(),
			lt.getTime(),
			intervalToUse,
			periodToUse,
			timeUnitToUse,
			this.dontRoll
		);

		// logic to determine whether we have the right interval for what is needed
		var needDifferentData = this.needDifferentData({
			period: periodToUse,
			interval: intervalToUse,
			timeUnit: timeUnitToUse
		});

		// if we need data from before what we have, fetch new data
		// Trim time if right has not been defined and is daily interval
		var compareRight =
			!params.dtRight && CIQ.ChartEngine.isDailyInterval(intervalToUse)
				? new Date(rt.toDateString())
				: rt;
		if (
			Object.keys(this.chart.endPoints).length &&
			(this.chart.endPoints.begin > lt ||
				this.chart.endPoints.end < compareRight)
		)
			needDifferentData = true;

		if (params.useExistingData) needDifferentData = false;

		if (
			!this.chart.masterData ||
			!this.chart.masterData.length ||
			needDifferentData ||
			params.forceLoad
		) {
			this.layout.interval = intervalToUse;
			this.layout.periodicity = periodToUse;
			this.layout.timeUnit = timeUnitToUse;
			if (!this.layout.timeUnit) {
				if (CIQ.ChartEngine.isDailyInterval(this.layout.interval))
					this.layout.timeUnit = null;
				else if (this.layout.interval == "second")
					this.layout.timeUnit = "second";
				// backward compatibility with heatmap
				else if (this.layout.interval != "tick")
					this.layout.timeUnit = "minute";
			}
			var qparams = {
				symbol: chart.symbol,
				symbolObject: chart.symbolObject,
				chart: chart,
				nodraw: true
			};

			if (this.layout.interval == "tick") {
				// for 'tick' periodicity we have to request a specific range instead of # of ticks,
				//since we can never be sure how many ticks will be in a particular range.
				qparams.startDate = lt;
				qparams.endDate = rt;
			}

			if (!this.displayInitialized) qparams.initializeChart = true; //This does not mean loadChart()

			var behaviorParams = {
				symbol: chart.symbol,
				symbolObject: chart.symbolObject,
				interval: this.layout.interval
			};
			if (
				(behaviorParams.interval == "month" ||
					behaviorParams.interval == "week") &&
				!this.dontRoll
			) {
				behaviorParams.interval = "day";
			}
			var minOffset =
				this.quoteDriver.getQuoteFeed(behaviorParams).behavior.bufferSize;
			iter = this.standardMarketIterator(lt, null, chart);
			qparams.startDate = new Date(iter.previous(minOffset).getTime());

			iter = this.standardMarketIterator(rt, null, chart);
			qparams.endDate = new Date(iter.next(minOffset).getTime());
			if (qparams.endDate < Date.now()) this.isHistoricalModeSet = true;

			const now = new Date(Date.now() + 60 * 1000); // add minute buffer if client clock is slightly out of synch with server
			if (qparams.endDate > now && !params.dtRight) qparams.endDate = now;

			this.clearCurrentMarketData(this.chart);
			clearTimeout(this.streamParameters.timeout);
			this.quoteDriver.newChart(qparams, loadTheRange);
		} else {
			if (
				this.layout.interval != intervalToUse ||
				this.layout.periodicity != periodToUse ||
				this.layout.timeUnit != timeUnitToUse ||
				!this.chart.dataSegment ||
				!this.chart.dataSegment[0] ||
				this.chart.dataSegment[0].DT != chart.inflectionPoint
			) {
				this.layout.interval = intervalToUse;
				this.layout.periodicity = periodToUse;
				this.layout.timeUnit = timeUnitToUse;
				this.createDataSet();
			}
			loadTheRange();
		}
	} else {
		showTheRange();
	}
};

/**
 * Used directly by {@link CIQ.ChartEngine#setSpan} or indirectly by {@link CIQ.ChartEngine#loadChart}
 *
 * @typedef {Object} CIQ.ChartEngine~SpanParameters
 * @property {string} base span to show; valid values are "minute", "day", "week", "month", "year", "all", "ytd", or "today"
 * @property {number} multiplier Number of base units to show
 * @property {boolean} [maintainPeriodicity=false] do not calculate a new periodicity
 * @property {number} [padding=0] whitespace in pixels to apply to the right side of the chart
 * @property {boolean} [forceLoad=false] force a complete load (used by loadChart)
 * @property {CIQ.ChartEngine.Chart} [chart] Which chart, defaults to "chart"
 */

/**
 * Sets the chart to display the requested time span.
 *
 * By default, the **minimum width** for a bar is `1px`. As such, there may be times when the requested data will not all fit on the screen, even though it is available.
 * See {@link CIQ.ChartEngine#minimumCandleWidth} for instructions on how to override the default to allow more data to display.
 *
 * setSpan makes use of {@link CIQ.ChartEngine#setRange} by converting the span requested into a date range.
 * All parameters in setSpan will be sent into setRange (except if 'all' is requested), so you can pre-load things like `params.periodicity` in setSpan for setRange to use.
 *
 * Example:
 * <pre>
 * stxx.setSpan({
 * 	multiplier: 5,
 * 	base: "day",
 * 	padding: 30,
 * 	// pre load a parameter for setRange
 * 	periodicity: {
 * 		period: 1,
 * 		interval: 5,
 * 		timeUnit: 'minute'
 * 	}
 * });
 * </pre>
 *
 * Just keep in mind that if passing `periodicity.period` , `periodicity.timeUnit` and `periodicity.interval` to be used in {@link CIQ.ChartEngine#setRange} , then **DO NOT** set `maintainPeriodicity`. Otherwise, the requested periodicity will be ignored.
 *
 * If a quotefeed is attached to the chart (ver 04-2015 and up), setSpan will attempt to gather more data from the feed (IF NEEDED) to fulfill the requested range AND **may override the periodicity** to provide the most optimal chart display.
 * So depending on your UI, **you may need to use the callback to refresh the periodicity displayed on your menu**.
 * Please see {@link CIQ.ChartEngine#setRange} and {@link CIQ.ChartEngine#displayAll} for complete details on how the periodicity is calculated.
 * <br>If there is no quotefeed attached (or using a version prior to 04-2015), then setStan will use whatever data is available in the masterData. So you must ensure you have preloaded enough to display the requested range.
 *
 * Calling {@link CIQ.ChartEngine#setPeriodicity} immediately after setting a span may cause all of the data to be re-fetched at a different periodicity than the one used by the requested span. Once you have set your initial periodicity for the chart, there is no need to manually change it when setting a new span unless you are using the `params.maintainPeriodicity` flag; in which case you want to call `setPeriodicity` **before** you set the span, so the setSpan call will use the pre-set periodicity.
 * <br>Setting a span to `params.multiplier:7` `params.base:'days'` or `params.multiplier:1` `params.base:'week'`, for example, is really the same thing; same span of time. If what you are trying to do is tell the chart how you want the raw data to be fetched, that is done with {@link CIQ.ChartEngine#setPeriodicity} or by letting setSpan figure it out as described above.
 * <br>Remember that by default, weekly and monthly data is calculated using daily raw ticks. If your feed returns data already rolled up in monthly or weekly ticks, you can override this behavior by setting `stxx.dontRoll` to `true` ( see {@link CIQ.ChartEngine#dontRoll}  and the {@tutorial Periodicity} tutorial)
 *
 * This function must be called **after** loadChart() completes and creates a dataSet, or together with loadChart() by setting the proper parameter values.
 * If calling separately right after loadChart(), be sure to call it in the loadChart() callback!.
 * See example in this section and {@link CIQ.ChartEngine#loadChart} for more details and compatibility with your current version.
 *
 * Be aware that {@link CIQ.ChartEngine.Chart#allowScrollPast} and {@link CIQ.ChartEngine.Chart#allowScrollFuture} must be set to true if you wish to display "white space" in cases where the range requested is larger than the available data.
 * Especially when using "today" and the base.
 *
 * **Layout preservation and the span**
 * <br>If `maintainPeriodicity` is not set, the selected span will be recorded in the chart {@link CIQ.ChartEngine#layout} when it is requested through {@link CIQ.ChartEngine#loadChart}, or when you call setSpan directly.
 * <br>It is then used in {@link CIQ.ChartEngine#importLayout} and {@link CIQ.ChartEngine#loadChart} to reset that span, until a new periodicity is selected.
 *
 * **Note:** versions prior to '2015-05-01' must use the legacy arguments : setSpan(multiplier, base, padding, char,useMarketTZ,cb), and related example in this section.
 *
 * @param {CIQ.ChartEngine~SpanParameters} params Parameter for the function
 * @param {number} params.multiplier   Number of base units to show. To show 3 weeks of data, for example, set this to 3 and `params.base` to 'week'.
 * @param {string} params.base The base span to show. "minute", "day", "week", "month", "year", "all", "ytd" or "today".
 * <br><br>Except when using "today", this base will be combined with the multiplier. Example 2 days, 4 months.
 * <br><br>**Spans are market hours sensitive**, so if you ask for 1 hour, for example, at the time the markets are close,
 * the span will find the last time the markets where open for the active symbol, and include the last market hour in the span.
 * It will also exclude days when the market is closed.
 * - If 'all' data is requested, {@link CIQ.ChartEngine#displayAll} is called first to ensure all quotefeed data for that particular instrument is loaded. Note that 'all' will display the data in `monthly` periodicity unless otherwise specified. Please note that "all" will attempt to load all of the data the quotefeed has available for that symbol. Use this span with caution.
 * - If 1 'day' is requested --on market days--the chart will start from the same time on the previous market day, which may be over a weekend. Example from 3:30 PM Friday to 3:30 PM Monday, if the market is closed Saturday and Sunday.
 * - If 1 'day' is requested --on weekends and holidays-- or if 2 or more days are requested, the chart will always start from market open of prior days.
 * - If 'today' is requested --during the market day -- the chart will display the current market day but, if {@link CIQ.ChartEngine.Chart#allowScrollFuture} is also enabled, extend the chart all the way to market close (as per market hours set in the active market definition - see {@link CIQ.Market})
 * - If 'today' is requested --before the market is open --the chart will display the previous  market day.
 * - If 'today' is requested --after the current market day closes --the chart will display the current  market day.
 * @param {boolean} [params.maintainPeriodicity] If set to true, it will maintain the current periodicity for the chart instead of trying to select the most optimal periodicity for the selected range. See {@link CIQ.ChartEngine#setRange} for details.
 * <br>**Note:** if the chart is in `tick` periodicity, the periodicity will be automatically selected even if it was requested to be maintained because in `tick` periodicity we have no way to know how many ticks to get to fulfill the requested range.
 * @param {number} [params.padding] Whitespace padding in pixels to apply to right side of chart after sizing for date range. If not set will default whitespace to 0.
 * @param {boolean} [params.forceLoad] Forces a complete load (used by loadChart). Supersedes `useExistingData`.
 * @param {boolean} [params.useExistingData] Set to true to indicate existing data is sufficient.
 * @param {CIQ.ChartEngine.Chart} [params.chart] Which chart, defaults to "chart"
 * @param {object} [params.periodicity] The granularity of the chart, comprising its period and interval.
 * @param {Function} [cb] Optional callback
 * @memberOf CIQ.ChartEngine
 * @example
 * // this displays 5 days. It can be called anywhere including buttons on the UI
 *	stxx.setSpan ({
 *		multiplier: 5,
 *		base: "day",
 *		padding: 30
 *	});
 * @example
 * // using embedded span requirements on a loadChart() call.
 * stxx.loadChart({symbol: newSymbol, other: 'stuff'}, {
 * 	span: {
 * 		base: 'day',
 * 		multiplier: 2
 * 	},
 * }, callbackFunction());
 * @example
 * // Calling setSpan in the loadChart() callback to ensure synchronicity.
 * stxx.loadChart({symbol: newSymbol, other: 'stuff'}, function() {
 * 	stxx.setSpan({
 * 		multiplier: 5,
 * 		base: "day",
 * 		padding: 30
 * 	});
 * });
 * @since
 * - 04-2015 Added "all", "today", "ytd" and automatic integration with {@link quotefeed}.
 * - 15-07-01 Changed `params.period` to `params.multiplier` for clarity.
 * - 15-07-01 Changed `params.interval` to `params.base` for clarity.
 * - 05-2016-10 Saves the set span in stxx.layout to be restored with the layout between sessions.
 * - 4.0.3 Saves all parameters of the requested span in stxx.layout to be restored with the layout between sessions. Previously only `multiplier` and `base` were saved.
 * - 5.0.0 When 1 'day' is requested data displayed will differ if current day is market day or the market is closed to ensure the span will have enough data.
 * - 8.9.0 Added params.periodicity to enable TypeScript customization.
 * - 8.9.3 Added parameter `useExistingData`.
 */
CIQ.ChartEngine.prototype.setSpan = function (params, cb) {
	var period = arguments[0];
	var interval = arguments[1];
	var padding = arguments[2];
	var chart = arguments[3];

	if (typeof params == "object") {
		period = params.period
			? params.period
			: params.multiplier
			? params.multiplier
			: 1;
		interval = params.interval
			? params.interval
			: params.base
			? params.base
			: params.span
			? params.span
			: params.period;
		padding = params.padding;
		chart = params.chart;
	} else {
		params = {
			period: period,
			interval: interval,
			padding: padding,
			chart: chart
		};
		cb = arguments[5];
	}
	// Do not force padding to 0 on setSpan
	//if(!params.padding) params.padding=0;

	if (!chart) chart = this.chart;
	var market = chart.market;

	interval = interval.toLowerCase();
	if (interval == "all") {
		params.dontSaveRangeToLayout = true;
		this.displayAll(params, cb);
		return;
	}
	var iter;
	var iterInterval = interval;
	var iterPeriod = 1;
	if (interval == "today") {
		iterInterval = "day";
	} else if (interval == "year") {
		iterInterval = "month";
		iterPeriod = 12;
	}

	var parms_copy = CIQ.shallowClone(params);

	var iter_parms = {
		begin: market.marketZoneNow(),
		interval: iterInterval,
		period: iterPeriod
	};
	var leftDT = iter_parms.begin;

	function zeroDT(dt) {
		dt.setHours(0);
		dt.setMinutes(0);
		dt.setSeconds(0);
		dt.setMilliseconds(0);
		return dt;
	}
	var isForex = CIQ.Market.Symbology.isForexSymbol(chart.symbol);
	function forexAdjust(dt, advance) {
		// The whole point of this function is to get a 1 day or today chart to start showing forex at 5pm the prior day instead of midnight,
		// without breaking the whole market class in the process.
		if (!isForex) return dt;
		var forexOffset = 7; // 7 hours from open to midnight
		if (advance) dt.setHours(dt.getHours() + forexOffset);
		// get it to the next day if it's after 5pm
		else {
			// it's assumed dt time is midnight if code gets in here
			dt.setHours(dt.getHours() - forexOffset); // start at 5pm prior trading day
			if (!market.isMarketDate(dt)) dt.setDate(dt.getDate() - 2); // For the weekend
		}
		return dt;
	}
	if (interval === "ytd") {
		leftDT = zeroDT(leftDT);
		leftDT.setMonth(0);
		leftDT.setDate(1);
	} else if (interval === "month") {
		leftDT = zeroDT(new Date());
		leftDT.setMonth(leftDT.getMonth() - period);
	} else if (interval === "year") {
		leftDT = zeroDT(new Date());
		leftDT.setFullYear(leftDT.getFullYear() - period);
	} else if (interval === "week") {
		leftDT = zeroDT(new Date());
		leftDT.setDate(leftDT.getDate() - period * 7);
	} else if (interval === "day" && period == 1 && market.isMarketDay()) {
		// Special case, 1 "day" --on market days-- will start from same time on previous market day
		// 1 day in weekends and holidays or 2 or more days will always start from market open of prior days (last else)
		var h = leftDT.getHours();
		var m = leftDT.getMinutes();
		var s = leftDT.getSeconds();
		var mm = leftDT.getMilliseconds();
		iter = market.newIterator(iter_parms);
		leftDT = iter.previous();
		leftDT.setHours(h, m, s, mm);
		leftDT = market._convertFromMarketTZ(leftDT);
	} else if (interval === "today") {
		iter_parms.begin = forexAdjust(leftDT, true);
		// forward and then back will land us on the most current valid market day
		iter = market.newIterator(iter_parms);
		if (
			market.isOpen() ||
			market.getPreviousOpen().getDate() == leftDT.getDate()
		) {
			// if market opened, go ahead a day (we'll go back a day right after)
			iter.next();
		}
		leftDT = iter.previous();
		forexAdjust(leftDT);

		parms_copy.goIntoFuture = true;
		parms_copy.dtRight = new Date(+leftDT);
		parms_copy.dtRight.setDate(leftDT.getDate() + 1);
		parms_copy.dtRight = market._convertFromMarketTZ(parms_copy.dtRight);

		if (!isForex) {
			leftDT.setHours(iter.market.zopen_hour);
			leftDT.setMinutes(iter.market.zopen_minute);
			leftDT.setSeconds(0);
		}

		leftDT = market._convertFromMarketTZ(leftDT);
	} else {
		if (interval == "day") iter_parms.begin = forexAdjust(leftDT, true);
		iter = market.newIterator(iter_parms);
		if (period == 1) period++;
		leftDT = iter.previous(period - 1);
		if (interval == "day")
			leftDT = market._convertFromMarketTZ(forexAdjust(leftDT));
	}
	parms_copy.dtLeft = leftDT;
	if (parms_copy.maintainPeriodicity) {
		parms_copy.periodicity = {};
		parms_copy.periodicity.interval = this.layout.interval;
		parms_copy.periodicity.period = this.layout.periodicity;
	}
	chart.spanLock = false; // unlock left edge
	parms_copy.dontSaveRangeToLayout = true; // don't do certain things in setRange when being called from setSpan
	var self = this;
	this.setRange(parms_copy, function (err) {
		self.layout.setSpan = params;
		self.changeOccurred("layout");

		if (interval == "today") {
			chart.spanLock = true; // lock left edge of screen, in callback after we have fetched!
		}
		if (cb) cb(err);
	});
};

//@private
// Foobarred function.  Does not handle today or all properly.  Assumes daily data.  Not called from anywhere.
CIQ.ChartEngine.prototype.getSpanCandleWidth = function (span) {
	if (!span || !span.base || !span.multiplier) return;
	var num = parseFloat(span.multiplier);
	var base = span.base;
	var now = new Date();
	var prev = new Date();
	if (base == "year") {
		prev.setFullYear(prev.getFullYear() - num);
	} else if (base == "month") {
		prev.setMonth(prev.getMonth() - num);
	} else if (base == "day") {
		prev.setDate(prev.getDate() - num);
	} else if (base == "week") {
		prev.setDate(prev.getDate() - 7 * num);
	} else if (base == "YTD") {
		prev.setMonth(0);
		prev.setDate(1);
	}
	var diff = (now.getTime() - prev.getTime()) / 1000 / 60 / 60 / 24;
	diff = (diff * 5) / 7;
	var candleWidth = this.chart.width / diff;
	return candleWidth;
};

/**
 * Sets a chart to display all data for a security.
 *
 * If no feed is attached, it will simply display all the data loaded in the present periodicity.
 * <br>If the chart is driven by a QuoteFeed and no periodicity is requested, it will default to 'monthly'.
 * It will then call QuoteDriver.loadAll() which makes multiple queries to ensure all data available from the quote feed is loaded.
 * Once all the data is loaded, the chart will be set to cover that range using {@link CIQ.ChartEngine#setRange}
 * @param {object} [params] Optional parameters in same format as {@link CIQ.ChartEngine#setSpan}.
 * @param {Function} [cb] Callback, is called when chart is displayed.
 * @since  04-2015
 * @memberOf CIQ.ChartEngine
 */
CIQ.ChartEngine.prototype.displayAll = function (params, cb) {
	var { chart, layout } = this;
	var drawings = [];
	if (params && params.chart) chart = params.chart;
	const self = this;
	function displayTheResults() {
		if (!chart.masterData || !chart.masterData.length) {
			if (cb) cb("No data to display.");
			return;
		}
		var p = CIQ.clone(params);
		p.dtLeft = chart.endPoints.begin;
		p.dtRight = chart.endPoints.end;
		// we already have the data, we just want to show it now. So make sure we maintain the periodicity so it won't fetch new one data
		p.periodicity = {};
		p.periodicity.interval = layout.interval;
		p.periodicity.period = layout.periodicity;
		p.periodicity.timeUnit = layout.timeUnit;
		self.setRange(p, function (err) {
			self.layout.setSpan = {
				base: params.base,
				multiplier: params.multiplier
			};
			self.changeOccurred("layout");
			for (var p in self.panels)
				self.calculateYAxisMargins(self.panels[p].yAxis);
			if (drawings.length && !self.drawingObjects.length)
				self.importDrawings(drawings); // drawings have been wiped out by abortDrawings
			self.draw();
			if (cb) cb(err);
		});
	}
	function loadAllTheData(err) {
		if (!err) self.quoteDriver.loadAll(chart, displayTheResults);
	}

	// Case 1: no quoteFeed so display what we have
	if (!this.quoteDriver) {
		displayTheResults();
		return;
	}

	var periodicity = params.maintainPeriodicity
		? {
				period: layout.periodicity,
				interval: layout.interval,
				timeUnit: layout.timeUnit
		  }
		: { period: 1, interval: "month", timeUnit: null };
	periodicity = params.periodicity ? params.periodicity : periodicity;

	periodicity = CIQ.cleanPeriodicity(
		periodicity.period,
		periodicity.interval,
		periodicity.timeUnit
	);

	var needDifferentData = this.needDifferentData(periodicity);

	this.layout.periodicity = periodicity.period;
	this.layout.interval = periodicity.interval;
	this.layout.timeUnit = periodicity.timeUnit;

	// Case 2: new symbol or new periodicity
	if (params.forceLoad || needDifferentData) {
		drawings = this.drawingObjects.map((drawing) => drawing.serialize());
		this.clearCurrentMarketData(this.chart);
		this.quoteDriver.newChart(
			{
				nodraw: true,
				symbol: this.chart.symbol,
				symbolObject: this.chart.symbolObject,
				chart: this.chart,
				initializeChart: true,
				fetchMaximumBars: true
			},
			loadAllTheData
		);
	} else {
		// Case 3, the right interval is set but we don't have all the data
		if (chart.moreAvailable || !chart.upToDate) {
			loadAllTheData();
		} else {
			// Case 4, the right interval is set and we have all the data
			this.createDataSet(); // Just in case the interval changed from month to day or vice versa
			displayTheResults();
		}
	}
};

/**
 * Calls the draw function, but also adjusts the chart for any existing span or range selection.
 * Useful when adding or removing a series or study whose data points don't align with the main plot
 * (For example, the main plot is delayed but the series is real time).
 *
 * @param {Object} [params] Optional params object. See {@link CIQ.ChartEngine#draw} for details.
 *
 * @memberof CIQ.ChartEngine
 * @since 8.9.3
 */
CIQ.ChartEngine.prototype.drawWithRange = function (params) {
	const { setSpan, range } = this.layout;
	if (setSpan && Object.keys(setSpan).length) {
		this.setSpan(
			Object.assign({}, setSpan, { forceLoad: false, useExistingData: true })
		);
	} else if (range && Object.keys(range).length) {
		this.setRange(
			Object.assign({}, range, { forceLoad: false, useExistingData: true })
		);
	} else this.draw(params);
};

};
__js_standard_span_(typeof window !== "undefined" ? window : global);
