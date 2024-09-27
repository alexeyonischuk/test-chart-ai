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


let __js_standard_quoteFeed_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.ChartEngine) CIQ.ChartEngine = function () {};

/**
 * See tutorial [Data Integration: Quotefeeds]{@tutorial DataIntegrationQuoteFeeds} for a complete overview and
 * step by step source code for implementing a quotefeed.
 *
 * Interface for classes that implement a quotefeed. You define a quotefeed object and attach it to
 * the chart using {@link CIQ.ChartEngine#attachQuoteFeed}. Each member "fetch..." method is optional. The chart
 * will call your member method if it exists, and will skip if it does not.
 *
 * Also see {@link CIQ.ChartEngine#dontRoll} if your feed aggregates weekly and monthly bars and you do not wish the chart to roll them from daily bars.
 *
 * **Note:** Prebuilt quotefeeds are available in a dedicated GitHub repo
 * for real-data quotefeeds at [https://github.com/chartiq/quotefeeds]{@link https://github.com/chartiq/quotefeeds}.
 *
 * @name quotefeed
 * @namespace
 * @property {number} maxTicks The maximum number of ticks a quoteFeed should request at a single time. This value will be overridden if the {@link CIQ.ChartEngine.Driver} has a behavior.maximumTicks set.
 */
function quotefeed() {}

/**
 * All of your quote feed "fetch..." methods **must** call this callback function to return
 * results to the chart, even if no data is returned from your feed.
 *
 * @param {object} response Contains the results of the quote feed function that called this
 * 		callback function.
 * @param {string} [response.error] An error message, if one occurred.
 * @param {string} [response.suppressAlert] Set this to true to not display errors.
 * @param {array} [response.quotes] An array of quotes in required JSON format, if no error
 * 		occurred.
 * @param {boolean} [response.moreAvailable] Set this to false to stop pagination requests if
 * 		you know that no older data is available.
 * @param {boolean} [response.upToDate] Set this to true to stop forward pagination requests
 * 		if you know that no newer data is available.
 * @param {object} [response.attribution] This object is assigned to `stx.chart.attribution`.
 * 		Your UI can use this to display attribution messages. See example below.
 *
 * @callback quotefeed~dataCallback
 *
 * @example <caption>Returning quotes in the <code>dataCallback</code> object.</caption>
 * cb({quotes:[--array of quote elements here--]});
 *
 * @example <caption>Returning an error in the <code>dataCallback</code> object.</caption>
 * cb({error:"Your error message here"});
 *
 * @example <caption>Setting <code>attribution</code> through the <code>dataCallback</code> object.<br>
 *
 * <b>Note:</b> Using <code>dataCallback</code> to display a message requires that the attribution web component <em>not</em> be present in your template; otherwise the message will not display. For information on how to override the web component with custom attribution messages, see [https://documentation.chartiq.com/WebComponents.Attribution.html#messages.html#messages]{@link https://documentation.chartiq.com/WebComponents.Attribution.html#messages}.</caption>
 * // Set up a callback function to be called whenever fetchInitialData is called.
 *  stxx.attachQuoteFeed(yourQuoteFeed, {callback: showAttribution});
 *
 * // After every data call, the attribution function is called,
 * // and you can then use it to display any message regarding the quote feed.
 *	function showAttribution(params){
 *		var message=params.stx.chart.attribution.message;
 *		// Add your code here to display the message on your screen.
 *	}
 *
 * // In your quote feed's fetchInitialData method, set the attribution object.
 * cb({quotes:[--array of quote elements here--], attribution:{message:"Data is delayed by 15 minutes"}});
 *
 * @since 8.0.0 Added the `response.upToDate` property.
 */

/**
 * See [Data Integration : Quotefeeds]{@tutorial DataIntegrationQuoteFeeds}
 *
 * The charting engine calls this quotefeed function whenever the chart is wiped clean and created again with new data.
 * This typically occurs when {@link CIQ.ChartEngine#loadChart} is called but can also occur from other methods such as {@link CIQ.ChartEngine#setPeriodicity}
 * or {@link CIQ.ChartEngine#importLayout}.
 *
 * @param {string} symbol The ticker symbol of the data being fetched
 * @param {Date} suggestedStartDate A suggested starting date for the fetched data (based on how much can be displayed)
 * @param {Date} suggestedEndDate A suggested starting date for the fetched data (based on how much can be displayed)
 * @param {object} params						-Provides additional information on the data requested by the chart.
 * @param {Boolean}	params.series 				-If true then the request is for series/comparison data (i.e. not the the main symbol)
 * @param {CIQ.ChartEngine} params.stx 			-The chart object requesting data
 * @param {string} [params.symbolObject] 		-The symbol to fetch in object format; if a symbolObject is initialized ( see {@link CIQ.ChartEngine#loadChart}, {@link CIQ.ChartEngine#addSeries}, {@link CIQ.Comparison.add} )
 * @param {number} params.period 				-The timeframe each returned object represents. For example, if using interval "minute", a period of 30 means your feed must return ticks (objects) with dates 30 minutes apart; where each tick represents the aggregated activity for that 30 minute period. **Note that this will not always be the same as the period set in {@link CIQ.ChartEngine#setPeriodicity}, since it represents the aggregation of the raw data to be returned by the feed server, rather than the final data to be displayed.**
 * @param {string} params.interval 				-The type of data your feed will need to provide. Allowable values: "millisecond,"second","minute","day","week","month". (This is **not** how much data you want the chart to show on the screen; for that you can use {@link CIQ.ChartEngine#setRange} or {@link CIQ.ChartEngine#setSpan})
 * @param {Boolean} [params.fetchMaximumBars]	-If set to true, the chart requires as much historical data as is available from the feed (params.ticks may also be set to 20,000 to set a safety max), regardless of start date. This is needed for some chart types since they aggregate data (for example, Kagi, Renko, or linebreak). Developers implementing fetch, should override params.tick and use a smaller number if their feed can't support that much data being sent back. The engine will then make multiple smaller calls to get enough data to fill the screen.
 * @param {number} params.ticks 				-The suggested number of data points to return. This is calculated as twice the number of bars displayed on the chart. This can be used as an alternative to suggestedStartDate.
 * @param {number} [params.timeout=10000]		-This may be used to set the timeout in msec of the remote server request.
 * @param  {quotefeed~dataCallback} cb			-Call this function with the results (or error) of your data request.
 * @since 4.1.2 Added `timeout` parameter.
 * @memberOf quotefeed
 */
quotefeed.fetchInitialData = function (
	symbol,
	suggestedStartDate,
	suggestedEndDate,
	params,
	cb
) {};

/**
 * See [Data Integration : Quotefeeds]{@tutorial DataIntegrationQuoteFeeds}
 *
 * The charting engine calls this quotefeed function periodically (poll) to request updated data.
 * The polling frequency is determined by the `refreshInterval` that you provided when you called {@link CIQ.ChartEngine#attachQuoteFeed}.
 *
 * @param {string} symbol The ticker symbol of the data being fetched
 * @param {Date} startDate The starting date for the fetched data (based on how much can be displayed)
 * @param {object} params						-Provides additional information on the data requested by the chart.
 * @param {Boolean}	params.series 				-If true then the request is for series/comparison data (i.e. not the main symbol)
 * @param {CIQ.ChartEngine} params.stx 			-The chart object requesting data
 * @param {string} [params.symbolObject] 		-The symbol to fetch in object format; if a symbolObject is initialized ( see {@link CIQ.ChartEngine#loadChart}, {@link CIQ.ChartEngine#addSeries}, {@link CIQ.Comparison.add} )
 * @param {number} params.period 				-The timeframe each returned object represents. For example, if using interval "minute", a period of 30 means your feed must return ticks (objects) with dates 30 minutes apart; where each tick represents the aggregated activity for that 30 minute period. **Note that this will not always be the same as the period set in {@link CIQ.ChartEngine#setPeriodicity}, since it represents the aggregation of the raw data to be returned by the feed server, rather than the final data to be displayed.**
 * @param {string} params.interval 				-The type of data your feed will need to provide. Allowable values: "millisecond,"second","minute","day","week","month". (This is **not** how much data you want the chart to show on the screen; for that you can use {@link CIQ.ChartEngine#setRange} or {@link CIQ.ChartEngine#setSpan})
 * @param {number} [params.timeout=10000]		-This may be used to set the timeout in msec of the remote server request.
 * @param  {quotefeed~dataCallback} cb			-Call this function with the results (or error) of your data request.
 * @since 4.1.2 Added `timeout` parameter.
 * @memberOf quotefeed
 */
quotefeed.fetchUpdateData = function (symbol, startDate, params, cb) {};

/**
 * See [Data Integration : Quotefeeds]{@tutorial DataIntegrationQuoteFeeds}
 *
 * The charting engine calls this quotefeed function whenever the chart requires older data.
 * Usually this is because a user has scrolled or zoomed past the end of the data.
 *
 * **Note:** This method may be called during initial load if your fetchInitialData didn't provide enough data to fill the visible chart.*
 *
 * @param {string} symbol The ticker symbol of the data being fetched
 * @param {Date} suggestedStartDate A suggested starting data for the fetched data (based on how much can be displayed)
 * @param {Date} endDate The date of the last datum point currently available in the chart. You should return data from this point and then backward in time.
 * @param {object} params						-Provides additional information on the data requested by the chart.
 * @param {CIQ.ChartEngine} params.stx 			-The chart object requesting data
 * @param {string} [params.symbolObject] 		-The symbol to fetch in object format; if a symbolObject is initialized ( see {@link CIQ.ChartEngine#loadChart}, {@link CIQ.ChartEngine#addSeries}, {@link CIQ.Comparison.add} )
 * @param {number} params.period 				-The timeframe each returned object represents. For example, if using interval "minute", a period of 30 means your feed must return ticks (objects) with dates 30 minutes apart; where each tick represents the aggregated activity for that 30 minute period. **Note that this will not always be the same as the period set in {@link CIQ.ChartEngine#setPeriodicity}, since it represents the aggregation of the raw data to be returned by the feed server, rather than the final data to be displayed.**
 * @param {string} params.interval 				-The type of data your feed will need to provide. Allowable values: "millisecond,"second","minute","day","week","month". (This is **not** how much data you want the chart to show on the screen; for that you can use {@link CIQ.ChartEngine#setRange} or {@link CIQ.ChartEngine#setSpan})
 * @param {Boolean} [params.fetchMaximumBars]	-If set to true, the chart requires as much historical data as is available from the feed (params.ticks may also be set to 20,000 to set a safety max), regardless of start date. This is needed for some chart types since they aggregate data (for example, Kagi, Renko, or linebreak). Developers implementing fetch, should override params.tick and use a smaller number if their feed can't support that much data being sent back. The engine will then make multiple smaller calls to get enough data to fill the screen.
 * @param {number} params.ticks 				-The suggested number of data points to return. This is calculated as twice the number of bars displayed on the chart. This can be used as an alternative to suggestedStartDate.
 * @param {number} [params.timeout=10000]		-This may be used to set the timeout in msec of the remote server request.
 * @param {Boolean} [params.future]             -If set to true, the chart is scrolling in a 'forward' direction
 * @param  {quotefeed~dataCallback} cb			-Call this function with the results (or error) of your data request.
 * @since
 * - 4.1.2 Added `params.timeout`.
 * - 6.0.0 Added `params.future`.
 * @memberOf quotefeed
 */
quotefeed.fetchPaginationData = function (
	symbol,
	suggestedStartDate,
	endDate,
	params,
	cb
) {};

/**
 * See [Data Integration : Advanced]{@tutorial DataIntegrationAdvanced}
 *
 * Although not a core quotefeed function, the charting engine calls this optional function each time the chart encounters a new symbol or a particular periodicity for that symbol.
 * This could happen when a user changes periodcity, changes a symbol, adds a comparison symbol, or a new study is added that requires an underlying symbol.
 *
 * Use this along with unsubscribe() to keep track of symbols on the chart.
 * Use cases include: maintaining legends, lists of securities, or adding/removing subscriptions to streaming connections.
 *
 * If using a push stream, subscribe and then have the push streamer push updates using {@link CIQ.ChartEngine#updateChartData}.
 *
 * @param {object} params						-Provides additional information on the data requested by the chart.
 * @param {CIQ.ChartEngine} params.stx 			-The chart object requesting data
 * @param {string} params.symbol 				-The symbol being added
 * @param {string} params.symbolObject 			-The symbol being added in object form
 * @param {number} params.period 				-The timeframe each returned object represents. For example, if using interval "minute", a period of 30 means your feed must return ticks (objects) with dates 30 minutes apart; where each tick represents the aggregated activity for that 30 minute period. **Note that this will not always be the same as the period set in {@link CIQ.ChartEngine#setPeriodicity}, since it represents the aggregation of the raw data to be returned by the feed server, rather than the final data to be displayed.**
 * @param {string} params.interval 				-The type of data your feed will need to provide. Allowable values: "millisecond,"second","minute","day","week","month". (This is **not** how much data you want the chart to show on the screen; for that you can use {@link CIQ.ChartEngine#setRange} or {@link CIQ.ChartEngine#setSpan})
 * @memberOf quotefeed
 * @since 4.0.0 Changes to periodicity (period/interval) will now also cause subscribe calls.
 */
quotefeed.subscribe = function (params) {};

/**
 * See [Data Integration : Advanced]{@tutorial DataIntegrationAdvanced}
 *
 * Although not a core quotefeed function, the charting engine calls this optional function each time the chart no longer requires a symbol or a particular periodicity for that symbol.
 *
 * @param {object} params						-Provides additional information on the data requested by the chart.
 * @param {CIQ.ChartEngine} params.stx 			-The chart object requesting data
 * @param {string} params.symbol				-The symbol being removed
 * @param {string} params.symbolObject 			-The symbol being removed in object form
 * @param {number} params.period 				-The timeframe each returned object represents. For example, if using interval "minute", a period of 30 means your feed must return ticks (objects) with dates 30 minutes apart; where each tick represents the aggregated activity for that 30 minute period. **Note that this will not always be the same as the period set in {@link CIQ.ChartEngine#setPeriodicity}, since it represents the aggregation of the raw data to be returned by the feed server, rather than the final data to be displayed.**
 * @param {string} params.interval 				-The type of data your feed will need to provide. Allowable values: "millisecond,"second","minute","day","week","month". (This is **not** how much data you want the chart to show on the screen; for that you can use {@link CIQ.ChartEngine#setRange} or {@link CIQ.ChartEngine#setSpan})
 * @memberOf quotefeed
 * @since 4.0.0 Changes to periodicity (period/interval) will now also cause unsubscribe calls.
 */
quotefeed.unsubscribe = function (params) {};

/**
 * See tutorial [Data Integration : Quotefeeds]{@tutorial DataIntegrationQuoteFeeds} for a complete overview and
 * step by step source code for implementing a quotefeed
 *
 * @namespace
 * @name CIQ.QuoteFeed
 */
CIQ.QuoteFeed = CIQ.QuoteFeed || function () {};

/**
 * @private
 * @param {object} params
 * @param {function} cb Callback
 * @deprecated
 */
CIQ.QuoteFeed.prototype.fetch = function (params, cb) {
	if (!this.v2QuoteFeed) {
		console.log(
			"You must implement CIQ.QuoteFeed.[yourfeedname].prototype.fetch()"
		);
	}
};

/**
 * Whenever an error occurs the params and dataCallback from fetch will be automatically passed to this method by the quote engine.
 *
 * Use this to alert the user if desired.
 *
 * Override this with your own alerting mechanisms.
 * @param  {object} params The params originally passed into the fetch call.
 * @param {object} dataCallback The data returned to fetch
 * @memberOf quotefeed
 * @alias announceError
 * @example
 * 	quotefeed.announceError=function(params, dataCallback){
 *		if(params.startDate){
 *			// Perhaps some sort of "disconnected" message on screen
 *		}else if(params.endDate){
 *			// Perhaps something indicating the end of the chart
 *		}else{
 *			CIQ.alert("Error fetching quote:" + dataCallback.error);	// Probably a not found error?
 *		}
 *	};
 */
CIQ.QuoteFeed.prototype.announceError = function (params, dataCallback) {
	if (params.suppressErrors || dataCallback.suppressAlert) return;
	if (params.startDate) {
		// Perhaps some sort of "disconnected" message on screen
	} else if (params.endDate) {
		// Perhaps something indicating the end of the chart
	} else if (dataCallback.error) {
		CIQ.alert("Error fetching quote:" + dataCallback.error);
	} else {
		//CIQ.alert("Error fetching quote:" + params.symbol);	// Probably a not found error?
	}
};

/**
 * Fetches multiple quotes asynchronously, possibly from various data sources. This method is used to update a chart with multiple symbols
 * such as a comparison chart.
 *
 * @param {array} arr Array of stock symbols.
 * @param {Function} cb Function to callback when quotes are fetched. Passed an array of results. Each result is an object `{dataCallback, params}`.
 * @memberOf CIQ.QuoteFeed
 * @since 7.3.0 Deprecated
 * @deprecated Use `CIQ.ChartEngine.Driver.prototype.multifetch`.
 * @private
 */
CIQ.QuoteFeed.prototype.multiFetch = function (arr, cb) {
	if (arr.length === 0) cb([]);

	return arr[0].stx.driver.multiFetch(arr, cb);
};

/**
 * QuoteFeed for managing streaming data
 * @constructor
 * @private
 */
CIQ.QuoteFeed.Subscriptions = function () {
	this.subscriptions = [];
};

CIQ.inheritsFrom(CIQ.QuoteFeed.Subscriptions, CIQ.QuoteFeed);

/**
 * Used by the QuoteFeed Driver to create subscribe and unsubscribe calls as needed.
 *
 * @param {CIQ.ChartEngine} stx engine instance
 * @since 4.0.0 Changes to periodicity (period/interval) will cause subscribe/unsubscribe calls.
 * @private
 */
CIQ.QuoteFeed.Subscriptions.prototype.checkSubscriptions = function (stx) {
	var sub, need;
	var chartNeeds = stx.getSymbols({ "breakout-equations": true });
	var self = this;
	chartNeeds = chartNeeds.filter(function (sub) {
		var qf = stx.quoteDriver.getQuoteFeed(sub);
		return qf && qf.engine == self;
	});

	// reset subscription match status
	for (var s = 0; s < this.subscriptions.length; s++) {
		this.subscriptions[s].match = false;
	}

	for (var i = 0; i < chartNeeds.length; i++) {
		// Convert kernel periodicity/interval/timeUnit to feed format
		need = chartNeeds[i];
		var interval = need.interval;
		// If we're rolling our own months or weeks then we should ask for days from the quote feed
		if ((interval == "month" || interval == "week") && !stx.dontRoll) {
			interval = "day";
		}

		need.interval = interval;
		need.period = 1;
		need.match = false;

		if (!isNaN(need.interval)) {
			// normalize numeric intervals into "minute" form
			need.period = need.interval;
			need.interval = need.timeUnit;
			if (!need.interval) need.interval = "minute";
		}
		delete need.periodicity; // to avoid confusion
		delete need.timeUnit; // to avoid confusion
		delete need.setSpan; // to avoid confusion

		for (s = 0; s < this.subscriptions.length; s++) {
			sub = this.subscriptions[s];
			if (
				sub.symbol == need.symbol &&
				sub.period == need.period &&
				sub.interval == need.interval
			) {
				need.match = true;
				sub.match = true;
				break;
			} else if (sub.symbol != need.symbol) {
				if (need.reason != "period") need.reason = "symbol";
				sub.reason = "symbol";
			} else {
				need.reason = "period";
				sub.reason = "period";
			}
		}
	}
	//console.log(this.subscriptions);
	//console.log(chartNeeds);

	// unsubscribe to any symbols no longer matched, and remove them from subscriptions
	this.subscriptions = this.subscriptions.filter(function (c) {
		if (!c.match) {
			if (!c.stx) c.stx = stx;
			self.unsubscribe(c);
		}
		return c.match;
	});

	chartNeeds.forEach(function (c) {
		if (!c.match) {
			if (!c.stx) c.stx = stx;
			if (!c.reason) c.reason = "initialize";
			if (c.symbol !== stx.chart.symbol) c.series = true;
			self.subscribe(c);
			self.subscriptions.push(c);
		}
	});
};

/**
 * Calls fetchFromSource and checks for subscription updates when successful.
 *
 * @param {Object} params
 * @param {Function} cb
 * @private
 */
CIQ.QuoteFeed.Subscriptions.prototype.fetch = function (params, cb) {
	var self = this;
	this.fetchFromSource(params, function (results) {
		if (!results.error) {
			self.checkSubscriptions(params.stx);
		}
		cb(results);
	});
};

/**
 * Implement this method. Start your streaming here.
 *
 * @param {Object} params
 * @private
 */
CIQ.QuoteFeed.Subscriptions.prototype.subscribe = function (params) {
	console.log("subscribe", params);
};

/**
 * Implement this method. End your streaming here.
 *
 * @param {Object} params
 * @private
 */
CIQ.QuoteFeed.Subscriptions.prototype.unsubscribe = function (params) {
	console.log("unsubscribe", params);
};

/**
 * The charting engine will call this method whenever it needs data from your feed.
 * Override this with your implementation to fetch data from your server.
 * Uses same parameters and format as CIQ.QuoteFeed.fetch.
 * @param {object} params
 * @param {function} cb Callback
 * @memberOf CIQ.QuoteFeed.Subscriptions
 * @private
 * @deprecated
 */
CIQ.QuoteFeed.Subscriptions.prototype.fetchFromSource = function (params, cb) {
	console.log("Please provide implementation of fetchFromSource");
};

/**
 * Return true if your quote feed should make an immediate refresh after initial load. For instance if your
 * initial load is EOD and then you need to immediately load a real-time bar
 * @param  {object} params The same parameters that are passed to fetch()
 * @return {boolean}       Return true if a refresh is required immediately
 * @memberOf CIQ.QuoteFeed
 * @private
 */
CIQ.QuoteFeed.prototype.requiresImmediateRefresh = function (params) {
	return false;
};

/**
 * Attaches a quote feed to the charting engine by creating an internal quote feed driver, which
 * the chart uses to pull data from the quote feed as needed.
 *
 * Multiple quote feeds may be attached to the engine by including the `filter` parameter, which
 * enables the quote feed driver to determine whether the quote feed should be used for a
 * specified instrument. If a filter is not provided, the quote feed becomes the default quote
 * feed and is used if all other attached quote feeds (which must have filters) do not match the
 * filter criteria.
 *
 * Only one unfiltered quote feed can be attached to the chart engine. If you call this function
 * without a `filter` argument when a default, unfiltered quote feed is already attached, the existing
 * unfiltered quote feed is removed, and the object passed to `quoteFeed` is attached as the new default.
 *
 * **Note:** You must attach filtered quote feeds in order of priority. The quote feeds are
 * filtered in the order in which they are attached to the engine. The first quote feed that
 * matches the filter criteria is used. If none of the filtered quote feeds match the criteria,
 * the unfiltered default quote feed is used. The default quote feed can be attached without
 * regard to priority.
 *
 * @param {object} [quoteFeed] Your quote feed object.
 * @param {object} [behavior] Contains initialization parameters for the quote feed.
 * @param {number} [behavior.suppressErrors] If true, then no error is displayed when the quote
 * 		feed returns one. Instead, the new symbol is simply not loaded and the prior symbol
 * 		remains on the screen.
 * @param {number} [behavior.refreshInterval] If not null, then sets the frequency for fetching
 * 		updates (if null or zero then `fetchUpdateData` is not called).
 * @param {number} [behavior.forwardPaginationRetryInterval] Defaults to five seconds when set to
 * 		null. In [historical mode]{@tutorial DataIntegrationQuoteFeeds}, determines how often
 * 		(in seconds) a forward pagination attempt can be tried. Forward pagination is different
 * 		than a fetch update, in that it tries to get enough data just to fill the gap in the
 * 		visible portion of the chart rather than to request an update from the visible area to
 * 		the current candle, which depending on the visible range, could be days or months away.
 * @param {number} [behavior.bufferSize] The minimum number of undisplayed historical ticks that
 * 		will always be buffered in `masterData`. Useful to prevent temporary gaps on studies while
 * 		paginating. This forces pagination fetch requests to be triggered ahead of reaching the
 * 		edge of the chart, if the number of already loaded bars is less than the required buffer
 * 		size. This parameter can be reset at any time by manipulating
 * 		`stxx.quoteDriver.behavior.bufferSize`; it will then become active on the very next
 * 		loading check. It is used on both left and right side pagination requests.
 * @param {function} [behavior.callback] Optional callback after any fetch to enhance
 * 		functionality. It will be called with the params object used with the fetch call.
 * @param {number} [behavior.noLoadMore] If true, then the chart does not attempt to load any
 * 		more data after the initial load.
 * @param {number} [behavior.findHeadOfData] If true, then the chart attempts to load more data
 * 		(and find the most recent) if the initial load returned no data.
 * @param {boolean} [behavior.loadMoreReplace] If true, then when paginating, the driver replaces
 * 		`masterData` instead of prepending. Set this if your feed can only provide a full data
 * 		set of varying historical lengths.
 * @param {string} [behavior.adjustmentMethod] Overrides the quote feed's default dividend/split
 * 		adjustment method. The value will depend on the particular quote feed implementation.
 * @param {number} [behavior.maximumTicks=20000] Limits the maximum number of ticks to request
 * 		from a quote feed. Setting a value in the quote driver's behavior overrides an
 * 		individual quote feed's `maxTicks` value.
 * @param {boolean} [behavior.ignoreUpdateError] Indicates that an update that fails should be
 * 		treated as no data found rather than an error.
 * @param {function} [behavior.prefetchAction] Optional callback that allows you to add a custom
 * 		action before the fetch in three private `CIQ.ChartEngine.Driver` methods: `newChart`,
 * 		`updateChart`, and `checkLoadMore`. Each method sends its name as an argument to the
 * 		callback, so you can select which one(s) to run your code in.
 * @param {function} [filter] Filters the quote feed provided by the `quoteFeed` parameter. The
 * 		filter function takes an object parameter typically containing `symbolObject`, `symbol`,
 * 		and `interval` properties. The properties associate the quote feed with an instrument.
 * 		If the `filter` function returns true, the quote feed is used for the instrument.
 *
 * @memberof CIQ.ChartEngine
 * @since
 * - 2016-12-01
 * - 5.0.0 Added `behavior.bufferSize` parameter.
 * - 5.1.1 Added `behavior.maximumTicks` parameter.
 * - 6.0.0 Added `behavior.forwardPaginationRetryInterval` parameter.
 * - 6.2.3 Added `behavior.ignoreUpdateError` parameter.
 * - 7.2.0 Added `behavior.findHeadOfData` parameter.
 * - 7.3.0 Added `filter` parameter.
 * - 9.0.0 Added `behavior.prefetchAction` parameter.
 * - 9.0.0 Changed behavior when attaching an unfiltered feed if another unfiltered feed is already attached. Now, only the existing unfiltered feed is removed.
 *
 * @see Multiple Quote Feeds in the [Data Integration: Advanced]{@tutorial DataIntegrationAdvanced}
 * tutorial.
 *
 * @example <caption>Attach a quote feed and have the driver call <code>fetchUpdateData</code>
 * once per second.</caption>
 * stxx.attachQuoteFeed(
 *     yourQuotefeed,
 *     { refreshInterval:1, bufferSize:200 },
 *     function (params) {
 *         return CIQ.Market.Symbology.factory(params.symbolObject) == CIQ.Market.FOREX
 *                && params.symbol == "^USDCAD"
 *                && params.interval == "day";
 *     }
 * );
 */
CIQ.ChartEngine.prototype.attachQuoteFeed = function (
	quoteFeed,
	behavior,
	filter
) {
	if (!behavior) behavior = {};

	// Legacy QuoteFeeds
	if (
		typeof quoteFeed.fetchInitialData === "function" ||
		typeof quoteFeed.fetchUpdateData === "function" ||
		typeof quoteFeed.fetchPaginationData === "function"
	) {
		// New "duck typed" v2 quotefeed
		if (
			typeof quoteFeed.fetchPaginationData !== "function" &&
			typeof quoteFeed.fetchUpdateData !== "function"
		) {
			behavior.noLoadMore = true;
		}
		quoteFeed.v2QuoteFeed = true; // store flag in quotefeed to single new version of quotefeed
		["multiFetch", "announceError", "requiresImmediateRefresh"].forEach(
			function (prop) {
				if (!quoteFeed[prop] && quoteFeed[prop] !== false)
					quoteFeed[prop] = CIQ.QuoteFeed.prototype[prop]; // no inheritance so add function
			}
		);
		if (typeof quoteFeed.subscribe === "function") {
			// if subscription quotefeed
			quoteFeed.checkSubscriptions =
				CIQ.QuoteFeed.Subscriptions.prototype.checkSubscriptions; // no inheritance so add checkSubscriptions function
			quoteFeed.subscriptions = [];
		}
	}
	if (!behavior.maximumTicks)
		behavior.maximumTicks = quoteFeed.maxTicks ? quoteFeed.maxTicks : 20000; // Historically this is the safest limit of ticks to fetch for response time
	if (!behavior.bufferSize || behavior.bufferSize < 0) behavior.bufferSize = 0;
	behavior.bufferSize = Math.round(behavior.bufferSize);
	quoteFeed.intervalTimer = null; // This is the setInterval which can be cleared to stop the updating loop

	var filteredFeeds = [];
	if (this.quoteDriver) {
		// adding a second unfiltered quotefeed, must be trying to replace the quotefeeds, delete quoteDriver
		if (!filter && this.quoteDriver.hasUnfilteredQuoteFeed) {
			filteredFeeds = this.quoteDriver.quoteFeeds.slice(0);
			filteredFeeds.pop();
			this.detachQuoteFeed();
		} else {
			// make sure unfiltered feed remains last!
			var unfilteredFeed =
				this.quoteDriver.hasUnfilteredQuoteFeed &&
				this.quoteDriver.quoteFeeds.pop();
			this.quoteDriver.quoteFeeds.push({
				engine: quoteFeed,
				behavior: behavior,
				filter: filter
			});
			if (unfilteredFeed) this.quoteDriver.quoteFeeds.push(unfilteredFeed);
			this.quoteDriver.updateChartLoop(null, behavior, quoteFeed);
		}
	}
	if (!this.quoteDriver) {
		// do not turn into an else clause, the detachQuoteFeed() above will remove the quoteDriver
		this.quoteDriver = new CIQ.ChartEngine.Driver(
			this,
			quoteFeed,
			behavior,
			filter
		);
		for (var feed of filteredFeeds) this.quoteDriver.quoteFeeds.push(feed);
		if (!filter) {
			var qf = this.quoteDriver.quoteFeeds.shift();
			this.quoteDriver.quoteFeeds.push(qf);
			// legacy
			this.quoteDriver.quoteFeed = qf.engine;
			this.quoteDriver.behavior = qf.behavior;
		}
	}
	if (!filter) this.quoteDriver.hasUnfilteredQuoteFeed = true;
};

/**
 * Detaches a quote feed. On removal of the last quote feed, calls `quoteDriver.die()`.
 *
 * @param {object} [quoteFeed] Optional quote feed object to detach. Omit to detach all quote feeds.
 * @memberOf CIQ.ChartEngine
 * @since 7.3.0
 */
CIQ.ChartEngine.prototype.detachQuoteFeed = function (quoteFeed) {
	var qd = this.quoteDriver;
	if (!qd) return;
	for (var i = qd.quoteFeeds.length - 1; i >= 0; i--) {
		if (!quoteFeed || qd.quoteFeeds[i].engine == quoteFeed) {
			if (!qd.quoteFeeds[i].filter) qd.hasUnfilteredQuoteFeed = false;
			qd.die(qd.quoteFeeds[i]);
			qd.quoteFeeds.splice(i, 1);
		}
	}
	if (!qd.quoteFeeds.length) {
		qd = this.quoteDriver = null;
	} else if (quoteFeed == qd.quoteFeed) {
		qd.quoteFeed = qd.quoteFeeds[0].engine;
		qd.behavior = qd.quoteFeeds[0].behavior;
	}
};

/**
 * Drives the chart's relationship with the quote feed object provided to the chart.
 *
 * @param {CIQ.ChartEngine} stx A chart engine instance.
 * @param {object} quoteFeed A quote feed object.
 * @param {object} [behavior] See {@link CIQ.ChartEngine#attachQuoteFeed} for object details.
 * @property {boolean} [behavior.loadingNewChart=false] READ ONLY boolean telling when a chart is loading
 * @property {boolean} [behavior.updatingChart=false] READ ONLY boolean telling when a chart is updating
 * @param {function} [filter] See {@link CIQ.ChartEngine#attachQuoteFeed} for function details.
 * @constructor
 * @name CIQ.ChartEngine.Driver
 * @since
 * - 5.1.1 Added `maximumTicks` to `behavior` parameter.
 * - 7.3.0 Moved `intervalTimer` property into `behavior` parameter. Added `filter` parameter.
 * - 8.5.0 Moved `intervalTimer` property into quoteFeed.
 */
CIQ.ChartEngine.Driver = function (stx, quoteFeed, behavior, filter) {
	this.stx = stx;
	if (!behavior) behavior = {};
	this.quoteFeeds = [{ engine: quoteFeed, behavior: behavior, filter: filter }];
	this.id = CIQ.uniqueID(true);
	this.behavior = behavior; // legacy
	this.quoteFeed = quoteFeed; // legacy
	this.loadingNewChart = false; // This gets set to true when loading a new chart in order to prevent refreshes while waiting for data back from the server
	this.updatingChart = false; // This gets set when the chart is being refreshed
	if (!filter) this.hasUnfilteredQuoteFeed = true;
	this.updateChartLoop();
};

CIQ.ChartEngine.Driver.prototype.die = function (quoteFeed) {
	for (var qf = 0; qf < this.quoteFeeds.length; qf++) {
		if (!quoteFeed || this.quoteFeeds[qf] == quoteFeed) {
			var myQuoteFeed = this.quoteFeeds[qf];
			clearInterval(myQuoteFeed.intervalTimer);
			myQuoteFeed.intervalTimer = -1; // this means it was stopped by the die function and should not be started again in the event of an async call back from the fetch coming back after it was killed.
		}
	}
};

/**
 * Finds the quote feed entry to use for a given security. Returns null if no match.
 * The quote feed entry consists of an engine, a behavior, and a filter.
 *
 * @param {object} params Params to use to find the quote feed.
 * @return {object} Matched quote feed, or null if no match found.
 * @memberOf CIQ.ChartEngine.Driver
 * @private
 * @since 7.3.0
 */
CIQ.ChartEngine.Driver.prototype.getQuoteFeed = function (params) {
	if (!params.symbolObject) params.symbolObject = { symbol: params.symbol };
	for (var qf = 0; qf < this.quoteFeeds.length; qf++) {
		var quoteFeed = this.quoteFeeds[qf];
		if (quoteFeed.behavior.generator != params.symbolObject.generator) continue;
		if (!quoteFeed.filter || quoteFeed.filter(params)) return quoteFeed;
	}
	return null; //no match
};

/**
 * Fetches multiple quotes asynchronously, possibly from various data sources. This method is used to update a chart with multiple symbols
 * such as a comparison chart.
 *
 * @param {array} arr Array of stock symbols.
 * @param {Function} cb Function to call back when quotes are fetched. Passed an array of results. Each result is an object `{dataCallback, params}`.
 * @memberOf CIQ.ChartEngine.Driver
 * @since 7.3.0
 * @private
 */
CIQ.ChartEngine.Driver.prototype.multiFetch = function (arr, cb) {
	if (arr.length === 0) cb([]);

	var tracker = {
		counter: 0,
		finished: arr.length,
		results: []
	};

	function handleResponse(params, tracker, cb) {
		return function (dataCallback) {
			tracker.results.push({ dataCallback: dataCallback, params: params });
			tracker.counter++;
			if (tracker.counter >= tracker.finished) {
				var results = tracker.results;
				tracker.results = [];
				cb(results);
			}
		};
	}
	for (var i = 0; i < arr.length; i++) {
		var params = arr[i];
		if (params.stx.isEquationChart(params.symbol)) {
			//equation chart
			CIQ.fetchEquationChart(params, handleResponse(params, tracker, cb));
		} else {
			var myQuoteFeed = this.getQuoteFeed(params);
			if (myQuoteFeed)
				CIQ.ChartEngine.Driver.fetchData(
					CIQ.QuoteFeed.SERIES,
					myQuoteFeed.engine,
					params,
					handleResponse(params, tracker, cb)
				);
		}
	}
};

/**
 * Call this whenever the kernel knows that the symbols being used have changed
 * @private
 */
CIQ.ChartEngine.Driver.prototype.updateSubscriptions = function () {
	for (var qf = 0; qf < this.quoteFeeds.length; qf++) {
		if (this.quoteFeeds[qf].checkSubscriptions)
			this.quoteFeeds[qf].checkSubscriptions(this.stx);
	}
};

/**
 * Fetches quotes for symbols related to the chart which are not the primary symbol.
 * such as series and study symbols.
 * @param {object} params Params object used by the QuoteDriver in fetching data
 * @param  {Function} cb  Function to callback when quotes are fetched. Will be passed an array of results. Each result is an object {dataCallback, params}.
 * @param  {number} fetchType  Quotefeed constants e.g. CIQ.QuoteFeed.UPDATE, CIQ.QuoteFeed.PAGINATION, CIQ.QuoteFeed.INITIAL
 * @param {object} [behavior] behavior from which to find quotefeed to fetch quotes from.  If not provided, will iterate through all available.
 * @memberOf CIQ.ChartEngine.Driver
 * @private
 */
CIQ.ChartEngine.Driver.prototype.loadDependents = function (
	params,
	cb,
	fetchType,
	behavior
) {
	var self = this;
	if (!behavior) {
		var cnt = 0;
		var independentQf = [],
			dependentQf = [];
		var cbDependentQf = function (res) {
			if (cb && ++cnt >= self.quoteFeeds.length) cb(null);
		};
		var cbIndependentQf = function (res) {
			if (++cnt < independentQf.length) return;
			if (!dependentQf.length) cbDependentQf(res);
			dependentQf.forEach(function (qf) {
				self.loadDependents(params, cbDependentQf, fetchType, qf.behavior);
			});
		};
		self.quoteFeeds.forEach(function (qf) {
			if (qf.behavior.generator) dependentQf.push(qf);
			else independentQf.push(qf);
		});
		independentQf.forEach(function (qf) {
			self.loadDependents(params, cbIndependentQf, fetchType, qf.behavior);
		});
		return;
	}
	var field;
	var stx = params.stx;
	var chart = params.chart;
	var seriesList = chart.series;
	var series, symbolObject;

	// Create a master list of all symbols we need from our various dependencies: series and studySymbols
	var allSymbols = [],
		ranges = {};
	var isUpdate = fetchType == CIQ.QuoteFeed.UPDATE;
	var isPaginate = fetchType == CIQ.QuoteFeed.PAGINATION;
	var scratchParams = CIQ.shallowClone(params);
	for (field in seriesList) {
		series = seriesList[field];
		var sp = series.parameters;
		if (!isUpdate) {
			if (!params.future && series.moreAvailable === false) continue; // skip series that no longer have historical data.
			if (params.future && series.upToDate === true) continue; // skip series that no longer have future data.
		}
		if (series.loading) continue; // skip series that are presently loading data
		if (sp.loadData === false) continue; // skip series that do not load data
		if (isUpdate || isPaginate) {
			if (!series.endPoints || !Object.keys(series.endPoints).length) continue; // skip series which have not set range in master data yet
		}
		if (sp.data && !sp.data.useDefaultQuoteFeed) continue; // legacy
		symbolObject = sp.symbolObject;
		if (!symbolObject.symbol) continue; // skip series that are really just fields already loaded, like "High".
		if (symbolObject.generator != behavior.generator) continue;
		scratchParams.symbolObject = symbolObject;
		scratchParams.symbol = symbolObject.symbol;
		var qf = this.getQuoteFeed(scratchParams);
		if (behavior != (qf && qf.behavior)) continue; // doesn't match behavior passed in; not updating on this loop
		var isUnique = true;
		if (!isUpdate) series.loading = true;
		for (var j = 0; j < allSymbols.length; j++) {
			if (CIQ.symbolEqual(allSymbols[j], symbolObject)) isUnique = false;
		}
		if (isUnique) {
			allSymbols.push(symbolObject);
			ranges[symbolObject.symbol] = series.endPoints;
		}
	}

	var arr = [];
	for (var k = 0; k < allSymbols.length; k++) {
		symbolObject = allSymbols[k];
		var seriesParam = CIQ.shallowClone(params.originalState);
		seriesParam.symbol = symbolObject.symbol;
		seriesParam.symbolObject = symbolObject;
		if (seriesParam.update || seriesParam.future) {
			if (!seriesParam.endDate) seriesParam.endDate = params.endDate;
			seriesParam.startDate = ranges[symbolObject.symbol].end;
		} else {
			if (!seriesParam.startDate) seriesParam.startDate = params.startDate;
			// for comparisons, you must fetch enough data on the new Comparison to match the beginning of the masterData until the current tick.
			// The current tick may be newer than master data last tick, so set the end Date to right now.
			seriesParam.endDate =
				isPaginate && !params.future
					? ranges[symbolObject.symbol].begin
					: params.endDate;
			seriesParam.ticks = params.ticks;
		}
		arr.push(seriesParam);
	}
	if (!arr.length && isUpdate) {
		// we need this because in updateChart we don't create and let the dependents do it.
		var dsParams = {
			appending: params.appending || params.originalState.update
		};
		if (dsParams.appending) dsParams.appendToDate = params.startDate;
		stx.createDataSet(null, null, dsParams);
		if (!params.nodraw) stx.draw();
		if (cb) cb(null);
		return;
	}

	function MFclosure(isUpdate) {
		return function (results) {
			var earliestDate = null;
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				var error = result.dataCallback.error;
				if (!error && error !== 0) {
					var symbolObject = result.params.symbolObject;
					var dataCallback = result.dataCallback,
						quotes = dataCallback.quotes,
						moreAvailable = dataCallback.moreAvailable,
						upToDate = dataCallback.upToDate,
						beginDate = dataCallback.beginDate,
						endDate = dataCallback.endDate;
					var arr = [];
					if (stx.getSeries)
						arr = stx.getSeries({ symbolObject: symbolObject });
					var fillGaps = false;
					for (var j = 0; j < arr.length; j++) {
						series = arr[j];
						if (!isUpdate) {
							// only reset the moreAvailable/upToDate on pagination or initial fetch, never on updates.
							if (!params.future)
								series.moreAvailable =
									moreAvailable === false
										? false
										: moreAvailable ||
										  quotes.length > (result.params.endDate ? 1 : 0);
							else {
								series.upToDate =
									upToDate === true
										? true
										: upToDate ||
										  quotes.length <= (result.params.startDate ? 1 : 0);
								if (stx.isHistoricalModeSet && quotes.length < 2)
									series.mostRecentForwardAttempt = new Date();
							}
							if (!series.endPoints.begin || series.endPoints.begin > beginDate)
								series.endPoints.begin = beginDate;
							if (!series.endPoints.end || series.endPoints.end < endDate)
								series.endPoints.end = endDate;
							series.loading = false;
						}
						// Once fillGaps is set, do not unset it.
						fillGaps = series.parameters.fillGaps || fillGaps;
					}
					quotes = self.cleanup(
						stx,
						series,
						quotes,
						fetchType,
						params,
						fillGaps
					);
					stx.updateChartData(quotes, chart, {
						secondarySeries: symbolObject.symbol,
						noCreateDataSet: true,
						noCleanupDates: true,
						allowReplaceOHL: true
					});
					if (
						quotes &&
						quotes.length &&
						(!earliestDate || earliestDate > quotes[0].DT)
					)
						earliestDate = quotes[0].DT;
				}
			}
			if (results.length && earliestDate) {
				stx.createDataSet(null, null, {
					appending: params.originalState.update || params.future,
					appendToDate: earliestDate
				});
				if (!params.nodraw) stx.drawWithRange();
				if (fetchType == CIQ.QuoteFeed.INITIAL)
					self.resetRefreshInterval(behavior.refreshInterval, behavior);
			}
			if (cb) cb(null);
		};
	}

	this.multiFetch(arr, MFclosure(isUpdate));
};

/**
 * Cleans up the dates and the gaps
 * @memberOf CIQ.ChartEngine.Driver
 * @private
 * @since 5.2.0
 */
CIQ.ChartEngine.Driver.prototype.cleanup = function (
	stx,
	series,
	quotes,
	mode,
	params,
	fillGaps
) {
	stx.doCleanupDates(quotes, stx.layout.interval);
	if (
		!params.missingBarsCreated &&
		quotes &&
		quotes.length &&
		stx.cleanupGaps &&
		fillGaps !== false
	) {
		var removalMethod, field;
		var chartOrSeries = params.chart;
		if (!series) field = chartOrSeries.defaultPlotField;
		else {
			chartOrSeries = series;
			field = series.parameters.symbol || series.id;
		}
		if (mode == CIQ.QuoteFeed.PAGINATION && !params.loadMoreReplace) {
			//add bar for end date so we can close gaps
			if (
				chartOrSeries.endPoints.begin &&
				chartOrSeries.endPoints.begin > quotes[quotes.length - 1].DT
			) {
				var endingRecord = stx.getFirstLastDataRecord(
					stx.masterData,
					field,
					false
				);
				if (series) endingRecord = endingRecord[field];
				quotes.push(endingRecord);
				removalMethod = "pop";
			}
		} else if (mode == CIQ.QuoteFeed.UPDATE) {
			//add bar for begin date so we can close gaps
			if (
				chartOrSeries.endPoints.end &&
				chartOrSeries.endPoints.end < quotes[0].DT
			) {
				var beginningRecord = stx.getFirstLastDataRecord(
					stx.masterData,
					field,
					true
				);
				if (series) beginningRecord = beginningRecord[field];
				quotes.unshift(beginningRecord);
				removalMethod = "shift";
			}
		}
		quotes = stx.doCleanupGaps(quotes, params.chart, {
			cleanupGaps: fillGaps,
			noCleanupDates: true
		});
		if (removalMethod) quotes[removalMethod]();
	}
	return quotes;
};

/**
 * Updates the chart as part of the chart loop.
 *
 * @param {object} [behavior] If set, only updates records that match the behavior.
 * @memberOf CIQ.ChartEngine.Driver
 * @private
 * @since 7.3.0 Added the `behavior` parameter.
 */
CIQ.ChartEngine.Driver.prototype.updateChart = function (behavior) {
	if (this.updatingChart) return;
	if (this.loadingNewChart) return;
	var howManyToGet = Object.keys(this.stx.charts).length;
	var howManyReturned = 0;
	var stx = this.stx;

	var interval = stx.layout.interval;
	var timeUnit = stx.layout.timeUnit;

	function closure(self, params, symbol, quoteFeed) {
		if (params.behavior.prefetchAction)
			params.behavior.prefetchAction("updateChart");
		return function (dataCallback) {
			howManyReturned++;
			var chart = params.chart;
			if (
				symbol == chart.symbol &&
				interval == stx.layout.interval &&
				timeUnit == stx.layout.timeUnit &&
				!stx.isHistoricalMode()
			) {
				// Make sure user hasn't changed symbol while we were waiting on a response
				if (quoteFeed === self.getQuoteFeed(params) && !dataCallback.error) {
					var quotes = dataCallback.quotes;
					quotes = self.cleanup(
						stx,
						null,
						quotes,
						CIQ.QuoteFeed.UPDATE,
						params
					);
					stx.updateChartData(quotes, chart, {
						noCreateDataSet: true,
						noCleanupDates: true
					});
					chart.attribution = dataCallback.attribution;
				} else if (quoteFeed) {
					quoteFeed.engine.announceError(params.originalState, dataCallback);
				}
			} else {
				self.updatingChart = false;
				return;
			}
			if (howManyReturned == howManyToGet) {
				self.updatingChart = false;
			}
			if (params.behavior.callback) {
				params.behavior.callback(params);
			}
			self.loadDependents(params, null, CIQ.QuoteFeed.UPDATE, params.behavior); // createDataSet(),draw() will be handled in here
		};
	}
	for (var chartName in stx.charts) {
		var chart = stx.charts[chartName];
		if (!chart.symbol) continue;
		// Removed below line.  It's possible IPO has no quotes from loadChart but a BATS update will return data.
		//if(!chart.masterData /*|| !chart.masterData.length*/) continue;	 // sometimes there is no data but it is not an error, and we want to let the refresh try again. If don't go in here, self.updatingChart will never be set to true and we will never refresh.
		var params = this.makeParams(chart.symbol, chart.symbolObject, chart);
		var myQuoteFeed = this.getQuoteFeed(params);
		if (chart.masterData && chart.masterData.length) {
			params.startDate = chart.endPoints.end; // if there is no data, then let the fetch treat an in initial load without start or end dates.
		}
		params.update = true;
		params.originalState = CIQ.shallowClone(params);
		if (behavior && behavior != params.behavior) {
			this.loadDependents(params, null, CIQ.QuoteFeed.UPDATE, behavior); // bypassing main symbol fetch, but check series
			continue;
		}
		this.updatingChart = true;
		var closureCB = closure(this, params, chart.symbol, myQuoteFeed);
		if (stx.isEquationChart(params.symbol)) {
			//equation chart
			CIQ.fetchEquationChart(params, closureCB);
		} else if (myQuoteFeed) {
			CIQ.ChartEngine.Driver.fetchData(
				CIQ.QuoteFeed.UPDATE,
				myQuoteFeed.engine,
				params,
				closureCB
			);
		}
	}
};

CIQ.ChartEngine.Driver.prototype.updateChartLoop = function (
	newInterval,
	behavior,
	quoteFeed
) {
	if (!behavior) behavior = this.behavior;
	if (!quoteFeed) {
		this.quoteFeeds.forEach(function (qfds) {
			if (qfds.behavior === behavior) quoteFeed = qfds;
		});
		if (!quoteFeed) quoteFeed = this.quoteFeed;
	}
	if (quoteFeed.intervalTimer === -1) return; // the driver was killed. This was probably an async call from a feed response sent before it was killed.
	clearInterval(quoteFeed.intervalTimer); // stop the timer

	quoteFeed.intervalTimer = null;
	var closure = function (self, thisBehavior) {
		return function () {
			if (thisBehavior.noUpdate) return;
			self.updateChart(thisBehavior);
		};
	};
	for (var qf = 0; qf < this.quoteFeeds.length; qf++) {
		var thisBehavior = this.quoteFeeds[qf].behavior;
		if (behavior == thisBehavior && !thisBehavior.noUpdate) {
			if (!newInterval && newInterval !== 0)
				newInterval = thisBehavior.refreshInterval;
			if (newInterval)
				quoteFeed.intervalTimer = setInterval(
					closure(this, thisBehavior),
					newInterval * 1000
				);
		}
	}
};

/**
 * Convenience function to change the refresh interval that was set during {@link CIQ.ChartEngine#attachQuoteFeed}.
 *
 * @param {number} newInterval The new refresh interval in seconds.
 * @param {object} [behavior] Optional behavior whose interval to reset, if omitted, will set first quote feed only.
 * @memberOf CIQ.ChartEngine.Driver
 * @private
 * @since
 * - 07/01/2015
 * - 7.3.0 Added `behavior` parameter.
 */
CIQ.ChartEngine.Driver.prototype.resetRefreshInterval = function (
	newInterval,
	behavior
) {
	(behavior || this.behavior).refreshInterval = newInterval; // set to your new interval
	this.updateChartLoop(null, behavior); // restart the timer in the new interval
};

/**
 * Pauses updates from the quoteDriver without killing or disattaching it.
 * Takes a symbol that is stored to know when it can be resumed.
 *
 * @param {string} symbol symbol to pause on
 * @memberof CIQ.ChartEngine.Driver
 * @since 8.4.0
 */
CIQ.ChartEngine.Driver.prototype.pause = function (symbol) {
	this.paused = {
		symbol: symbol,
		interval: this.behavior.refreshInterval
	};
	this.resetRefreshInterval(0);
};

/**
 * Called by {@link CIQ.ChartEngine#loadChart} to resume updating when the symbol changes.
 * @memberof CIQ.ChartEngine.Driver
 * @since 8.4.0
 */
CIQ.ChartEngine.Driver.prototype.resume = function () {
	let { interval, symbol } = this.paused;
	if (CIQ.symbolEqual(symbol, this.stx.chart.symbol)) return;

	this.resetRefreshInterval(interval);
	this.paused = null;
};

/**
 * Loads all available data.
 *
 * @param {CIQ.ChartEngine.Chart} chart The chart to adjust. If left undefined, adjust the main symbol chart.
 * @param {function} cb The callback function. Will be called with the error returned by the quotefeed, if any.
 * @memberOf CIQ.ChartEngine.Driver
 * @private
 * @since 07/01/2015
 */
CIQ.ChartEngine.Driver.prototype.loadAll = function (chart, cb) {
	var self = this;
	var count = 0;
	function closure() {
		return function (response) {
			if (response) {
				// error
				cb(response);
			} else if (
				self.stx.currentlyImporting ||
				(!chart.moreAvailable && chart.upToDate)
				// if the chart is importing it will not get into the draw loop to trigger checks for more data,
				// in this scenario we should be importing a span of "all" so just return we've already got the data.
			) {
				// no more data
				cb(null);
			} else if (++count > 20) {
				// we'll allow up to 20 fetches
				console.warn(
					"moreAvailable and upToDate not implemented correctly in quotefeed"
				);
				cb();
			} else {
				// get some more
				chart.loadingMore = false;
				self.checkLoadMore(chart, true, true, closure(), true);
			}
		};
	}
	closure()();
};

/**
 * If the quote feed has indicated there is more data available it will create and execute a fetch() call,
 * load the data into the masterData array, and create a new dataSet. Called internally as needed to keep the chart data up to date.
 * Finally it will re-draw the chart to display the new data
 *
 * @param  {CIQ.ChartEngine.Chart} chart The chart to adjust. Otherwise adjusts the main symbol chart.
 * @param {boolean} forceLoadMore set to true to force a fetch() call.
 * @param {boolean} fetchMaximumBars	set to true to request the maximum amount of data available from the feed.
 * @param {function} cb The callback function. Will be called with the error returned by the quotefeed, if any.
 * @param {boolean} nodraw Set to true to skip over the draw() call
 * @memberOf CIQ.ChartEngine.Driver
 * @private
 */
CIQ.ChartEngine.Driver.prototype.checkLoadMore = function (
	chart,
	forceLoadMore,
	fetchMaximumBars,
	cb,
	nodraw
) {
	var stx = this.stx,
		driver = this;

	if (chart.loadingMore || this.loadingNewChart) {
		chart.initialScroll = chart.scroll;
		if (cb) cb(null);
		return;
	}

	var isHistoricalData = stx.isHistoricalMode();
	if (!isHistoricalData) stx.isHistoricalModeSet = false;

	var params = this.makeParams(chart.symbol, chart.symbolObject, chart);

	function finish(err) {
		chart.loadingMore = false;
		if (cb) cb(err);
	}

	if (stx.currentlyImporting) {
		// Don't try and do anything else until we've finished importing
		if (cb) cb(null);
		return;
	}

	var myBehavior = params.behavior;
	var quotefeed;

	var dataSet = chart.dataSet;
	function needsBackFill(which) {
		if (driver.paused) return false;
		return (
			!which.endPoints.begin ||
			dataSet.length - chart.scroll < myBehavior.bufferSize ||
			dataSet.length -
				chart.scroll -
				stx.tickFromDate(which.endPoints.begin, chart) <
				myBehavior.bufferSize
		);
	}
	function needsFrontFill(which) {
		if (driver.paused) return false;
		return (
			!which.endPoints.end ||
			chart.scroll - chart.maxTicks + 1 < myBehavior.bufferSize ||
			stx.tickFromDate(which.endPoints.end, chart, null, true) -
				dataSet.length +
				chart.scroll -
				chart.maxTicks +
				2 <
				myBehavior.bufferSize
		);
	}
	// The following var will be used to determine if it's ok to retry a forward pagination.
	// Without this delay, a chart which ends in the past (delisted) or a chart with data coming in slowly
	// will never exit historical mode, so we need to prevent repeated requests from the draw() loop.
	// So we buffer using the behavior forwardPaginationRetryInterval.
	var forwardFetchDoARetry;
	var forwardPaginationRetryIntervalMS =
		1000 * (myBehavior.forwardPaginationRetryInterval || 5);

	var seriesNeedsBackFill = false,
		seriesNeedsFrontFill = false; // see if series need loading
	if (chart.dataSet.length) {
		for (var key in chart.series) {
			var series = chart.series[key];
			if (series.loading) continue; // exclude this series
			if (series.parameters.loadData === false) continue; // exclude series loaded thru masterData
			forwardFetchDoARetry =
				!series.mostRecentForwardAttempt ||
				series.mostRecentForwardAttempt.getTime() +
					forwardPaginationRetryIntervalMS <
					Date.now();

			if (series.parameters.symbol !== chart.symbol) {
				if (series.moreAvailable !== false && needsBackFill(series))
					seriesNeedsBackFill = true;
				if (forwardFetchDoARetry && !series.upToDate && needsFrontFill(series))
					seriesNeedsFrontFill = true;
			}
		}
	}

	forwardFetchDoARetry =
		!chart.mostRecentForwardAttempt ||
		chart.mostRecentForwardAttempt.getTime() +
			forwardPaginationRetryIntervalMS <
			Date.now();
	// Now we determine which type of pagination we need
	var mainPastFetch =
		(needsBackFill(chart) || forceLoadMore) && chart.moreAvailable !== false;
	var mainForwardFetch =
		(needsFrontFill(chart) || forceLoadMore) &&
		!chart.upToDate &&
		forwardFetchDoARetry;
	var isPastPagination = mainPastFetch || seriesNeedsBackFill;
	var isForwardPagination =
		(stx.isHistoricalModeSet || !chart.upToDate) &&
		!isPastPagination &&
		(mainForwardFetch || seriesNeedsFrontFill);

	var interval = stx.layout.interval;
	var timeUnit = stx.layout.timeUnit;
	function closure(self, params) {
		if (myBehavior.prefetchAction) myBehavior.prefetchAction("checkLoadMore");
		return function (dataCallback) {
			var stx = self.stx,
				chart = params.chart;
			if (
				params.symbol == chart.symbol &&
				interval == stx.layout.interval &&
				timeUnit == stx.layout.timeUnit
			) {
				// Make sure user hasn't changed symbol while we were waiting on a response
				if (!params.loadMore) {
					params.chart.loadingMore = false;
				}
				if (quotefeed === self.getQuoteFeed(params) && !dataCallback.error) {
					if (!dataCallback.quotes) dataCallback.quotes = [];
					var quotes = dataCallback.quotes,
						masterData = chart.masterData;
					quotes = self.cleanup(
						stx,
						null,
						quotes,
						CIQ.QuoteFeed.PAGINATION,
						params
					);
					if (quotes.length && chart.masterData && chart.masterData.length) {
						// remove possible dup with master data's first record
						if (params.future) {
							// remove possible dup with master data's first record
							var firstQuote = quotes[0];
							if (
								firstQuote.DT &&
								firstQuote.DT ==
									chart.masterData[chart.masterData.length - 1].DT
							)
								masterData.pop();
						} else {
							// remove possible dup with master data's last record
							var lastQuote = quotes[quotes.length - 1];
							if (lastQuote.DT && +lastQuote.DT == +chart.masterData[0].DT)
								quotes.pop();
						}
					}

					if (!params.future) {
						// set moreAvailable before we call draw or we can create an infinite loop if the feed servers runs out of data in the middle of a draw
						// if dataCallback.moreAvailable is set to either true or false, set chart.moreAvailable to that value
						// if dataCallback.moreAvailable is not set at all (null or undefined), then set chart.moreAvailable to dataCallback.quotes.length!==0
						if (dataCallback.moreAvailable) chart.moreAvailable = true;
						else if (dataCallback.moreAvailable === false || !quotes.length)
							chart.moreAvailable = false;
						// Can't be more available if we got nothing back
						else chart.moreAvailable = true;
					} else {
						chart.maximumForwardPagination = null;
						if (dataCallback.upToDate) chart.upToDate = true;
						else if (dataCallback.upToDate === false || quotes.length > 1) {
							// Can't be up to date if we got something back
							chart.upToDate = false;
						} else if (
							!quotes.length ||
							(quotes.length === 1 &&
								+params.startDate === +dataCallback.quotes[0].DT)
						) {
							if (params.fetchMaximumBars) chart.upToDate = true;
							else chart.maximumForwardPagination = true;
						}
						if (stx.isHistoricalModeSet && quotes.length < 2)
							chart.mostRecentForwardAttempt = new Date(); // no quotes for future query, so timestamp this query
					}
					self.tickMultiplier = quotes.length ? 2 : self.tickMultiplier * 2;

					// Better to set this early, in case a draw() is called from one of the functions below and checkLoadMore is retriggered.  We need to know where we left off!
					var sdate = quotes[0] ? quotes[0].DT : params.startDate,
						edate = quotes[0] ? quotes[quotes.length - 1].DT : params.endDate;
					if (dataCallback.beginDate) sdate = dataCallback.beginDate;
					if (!chart.endPoints.begin || chart.endPoints.begin > sdate)
						chart.endPoints.begin = sdate;
					if (dataCallback.endDate) edate = dataCallback.endDate;
					if (!chart.endPoints.end || chart.endPoints.end < edate)
						chart.endPoints.end = edate;

					chart.loadingMore = false; // this has to be set before draw() so we may call another pagination from it

					if (params.loadMoreReplace) {
						stx.setMasterData(quotes, chart, { noCleanupDates: true });
					} else if (params.future) {
						stx.updateChartData(quotes, chart, {
							noCreateDataSet: true,
							noCleanupDates: true
						});
					} else {
						CIQ.addMemberToMasterdata({
							stx: stx,
							chart: chart,
							data: quotes,
							fields: ["*"],
							noCleanupDates: true
						});
					}
					var dsParams;
					if (params.future) {
						dsParams = {
							appending: true,
							appendToDate: quotes[0] && quotes[0].DT
						};
					}
					stx.createDataSet(undefined, undefined, dsParams);

					if (!nodraw) stx.draw();
					if (myBehavior.callback) {
						myBehavior.callback(params);
					}
					self.loadDependents(params, cb, CIQ.QuoteFeed.PAGINATION);
				} else {
					self.quoteFeed.announceError(params.originalState, dataCallback);
					params.chart.loadingMore = false;
					if (cb) cb(dataCallback.error);
				}
			} else {
				//console.log("orphaned loadMore",params);
				return;
			}
		};
	}
	var fetching = false;
	var findHeadOfData =
		myBehavior.findHeadOfData || (chart.masterData && chart.masterData.length);
	if (!myBehavior.noLoadMore && findHeadOfData) {
		if (
			isForwardPagination ||
			!stx.maxDataSetSize ||
			chart.dataSet.length < stx.maxDataSetSize
		) {
			if (isPastPagination || isForwardPagination) {
				chart.initialScroll = chart.scroll;
				chart.loadingMore = true;
				params = this.makeParams(chart.symbol, chart.symbolObject, chart);
				params.pagination = true;
				params.future = isForwardPagination;
				if (chart.masterData && chart.masterData.length) {
					if (isForwardPagination) params.startDate = chart.endPoints.end;
					else params.endDate = chart.endPoints.begin;
					var firstLast;
					// fallback on masterData endpoints
					if (isForwardPagination && !params.startDate) {
						firstLast = stx.getFirstLastDataRecord(
							chart.masterData,
							"DT",
							true
						);
						if (firstLast) params.startDate = firstLast.DT;
					} else if (isPastPagination && !params.endDate) {
						firstLast = stx.getFirstLastDataRecord(chart.masterData, "DT");
						if (firstLast) params.endDate = firstLast.DT;
					}
				} else {
					params.endDate = new Date();
				}
				params.originalState = CIQ.shallowClone(params);
				params.nodraw = nodraw;
				if (
					!mainPastFetch &&
					(seriesNeedsBackFill || (!mainForwardFetch && seriesNeedsFrontFill))
				) {
					this.loadingMore = true;
					this.loadDependents(params, finish, CIQ.QuoteFeed.PAGINATION);
					if (cb) cb(null);
					return;
				}
				if (
					fetchMaximumBars ||
					chart.maximumForwardPagination ||
					stx.fetchMaximumBars[stx.layout.aggregationType]
				) {
					params.fetchMaximumBars = true;
					if (
						!stx.maxMasterDataSize ||
						myBehavior.maximumTicks < stx.maxMasterDataSize
					)
						params.ticks = myBehavior.maximumTicks;
					else params.ticks = stx.maxMasterDataSize;
				}
				var closureCB = closure(this, params);
				quotefeed = driver.getQuoteFeed(params);
				if (stx.isEquationChart(params.symbol)) {
					//equation chart
					CIQ.fetchEquationChart(params, closureCB);
				} else {
					if (isForwardPagination) params.appending = true;
					if (quotefeed)
						CIQ.ChartEngine.Driver.fetchData(
							CIQ.QuoteFeed.PAGINATION,
							quotefeed.engine,
							params,
							closureCB
						);
				}
				fetching = true;
			}
		}
	}
	if (!fetching && cb) cb(null);
};

/**
 * Extends the main series further into the past. Used internally by studies that need
 * additional historical data.
 *
 * @param {object} parameters Contains function call parameters.
 * @param {object} parameters.from A date object that specifies the date from which historical
 * 		data is fetched.
 * @param {function} cb The callback function called with the error (if any) returned by the
 * 		quote feed.
 *
 * @memberOf CIQ.ChartEngine.Driver
 * @private
 * @since 8.0.0
 */
CIQ.ChartEngine.Driver.prototype.extendHistoricalData = function (
	{ from },
	cb = () => {}
) {
	const { stx } = this;
	const { chart, layout } = stx;
	const { masterData, dataSet } = chart;
	const { interval, timeUnit } = layout;
	const params = this.makeParams(chart.symbol, chart.symbolObject, chart);
	const quotefeed = this.getQuoteFeed(params);

	if (
		chart.loadingMore ||
		this.loadingNewChart ||
		stx.currentlyImporting ||
		!masterData.length ||
		!quotefeed ||
		(stx.maxDataSetSize && dataSet.length > stx.maxDataSetSize)
	) {
		return cb(null);
	}

	chart.loadingMore = true;
	params.originalState = Object.assign({}, params);
	params.startDate = from;
	params.endDate = masterData[0].DT;

	CIQ.ChartEngine.Driver.fetchData(
		CIQ.QuoteFeed.PAGINATION,
		quotefeed.engine,
		params,
		closure(this, params)
	);

	function closure(driver, params) {
		return function ({ quotes, moreAvailable, error, beginDate }) {
			if (
				params.symbol !== chart.symbol ||
				interval !== layout.interval ||
				timeUnit !== layout.timeUnit
			) {
				return; // Make sure user hasn't changed symbol while we were waiting on a response
			}

			chart.loadingMore = false;

			if (error) return cb(error);

			quotes = driver.cleanup(
				stx,
				null,
				quotes,
				CIQ.QuoteFeed.PAGINATION,
				params
			);

			if (typeof moreAvailable === "boolean") {
				chart.moreAvailable = moreAvailable;
			} else {
				chart.moreAvailable = !!quotes.length;
			}

			chart.endPoints.begin = beginDate || from;

			CIQ.addMemberToMasterdata({
				stx: stx,
				chart: chart,
				data: quotes,
				fields: ["*"],
				noCleanupDates: true
			});

			stx.createDataSet();
			stx.draw();
		};
	}
};

/**
 * Returns how many bars should be fetched, based on an algorithm estimating number of bars to fill the screen.
 * If we're rolling our own months or weeks from daily ticks it will return the number of daily ticks to fetch.
 *
 * @param  {object} params Parameters
 * @param  {object} params.stx	  The chart object
 * @return {number}		   Number of bars to fetch
 * @memberOf CIQ.ChartEngine.Driver
 * @private
 */
CIQ.ChartEngine.Driver.prototype.barsToFetch = function (params) {
	if (!CIQ.isValidNumber(this.tickMultiplier)) this.tickMultiplier = 2; // used to determine params.ticks
	var interval = this.stx.layout.interval;
	var p = params.stx.layout.periodicity;
	// Rough calculation, this will account for 24x7 securities
	// If we're rolling our own months or weeks then adjust to daily bars
	if ((interval == "month" || interval == "week") && !this.stx.dontRoll) {
		p *= interval == "week" ? 7 : 30;
	}
	var bars = params.stx.chart.maxTicks * p;
	return bars * this.tickMultiplier;
};

/**
 * Calculates the suggestedStartDate for a query to a quoteFeed. Will either do a quick estimation if fetchMaximimBars is true for effiency or use a market iterator to find the exact start date.
 * This should only be called after the correct ticks have been determined.
 * @param {object} params
 * @param {object} iterator
 * @param {number} ticks
 * @return {Date} suggestedStartDate
 * @memberof CIQ.ChartEngine.Driver
 * @private
 * @since 5.1.1
 */
CIQ.ChartEngine.Driver.determineStartDate = function (params, iterator, ticks) {
	return this.determineStartOrEndDate(params, iterator, ticks, true);
};

/**
 * Calculates either the suggestedStartDate or suggestedEndDate for a query to a quoteFeed.
 * Will use a market iterator to find the exact date.
 * When passing in a truthy boolean will calculate suggestedStartDate.
 * This should only be called after the correct ticks have been determined.
 * @param {object} params Params object used by the QuoteDriver in fetching data
 * @param {object} iterator Market iterator to used to advance and find a date
 * @param {number} ticks Ticks to fetch
 * @param {boolean} isStart Direction to check date from
 * @return {Date} determinedDate (or present day)
 * @memberof CIQ.ChartEngine.Driver
 * @private
 * @since 6.0.0
 */
CIQ.ChartEngine.Driver.determineStartOrEndDate = function (
	params,
	iterator,
	ticks,
	isStart
) {
	var determinedDate;
	if (isStart) {
		determinedDate = params.startDate || iterator.previous(ticks);
	} else {
		determinedDate = params.future ? iterator.next(ticks) : new Date();
	}
	return determinedDate;
};

CIQ.ChartEngine.Driver.prototype.makeParams = function (
	symbol,
	symbolObject,
	chart
) {
	var stx = this.stx;
	var interval = stx.layout.interval;
	var ticks = this.barsToFetch({ stx: stx });
	// If we're rolling our own months or weeks then we should ask for days from the quote feed
	if ((interval == "month" || interval == "week") && !stx.dontRoll) {
		interval = "day";
	}
	var qf = this.getQuoteFeed({
		interval: interval,
		symbol: symbol,
		symbolObject: symbolObject
	});
	var behavior = qf && qf.behavior;
	var params = CIQ.shallowClone(behavior) || {};
	params.behavior = behavior;

	var extended = false,
		sessions = [];
	if (chart.market && chart.market.getSessionNames)
		sessions = chart.market.getSessionNames();
	if (stx.extendedHours) {
		if (stx.extendedHours.filter) {
			extended = true;
		} else {
			extended = stx.layout.extended;
			// filter out unwanted sessions
			sessions = sessions.filter(function (el) {
				return el.enabled || stx.layout.marketSessions[el.name];
			});
		}
	} else {
		sessions = sessions.filter(function (el) {
			return el.enabled;
		});
	}
	for (var sess = 0; sess < sessions.length; sess++) {
		sessions[sess] = sessions[sess].name; // remove "enabled" bit
	}

	CIQ.extend(
		params,
		{
			stx: stx,
			symbol: symbol,
			symbolObject: symbolObject,
			chart: chart,
			interval: interval,
			extended: extended,
			period: 1,
			ticks: ticks,
			additionalSessions: sessions,
			quoteDriverID: this.id
		},
		true
	);

	if (!params.symbolObject) params.symbolObject = { symbol: symbol };

	if (!isNaN(params.interval)) {
		// normalize numeric intervals into "minute", "second" or "millisecond" form as required by fetch()
		params.period = parseInt(params.interval, 10); // in case it was a string, which is allowed in setPeriodicity.
		params.interval = stx.layout.timeUnit;
		if (!params.interval) params.interval = "minute";
	}
	return params;
};

CIQ.ChartEngine.Driver.prototype.newChart = function (params, cb) {
	var stx = this.stx;
	var symbol = params.symbol;
	var interval = stx.layout.interval;
	var timeUnit = stx.layout.timeUnit;
	var chart = params.chart;
	chart.moreAvailable = null;
	chart.upToDate = null;
	chart.loadingMore = false;
	chart.attribution = null;
	var qparams = this.makeParams(symbol, params.symbolObject, chart);
	CIQ.extend(qparams, params, true);
	var myQuoteFeed = this.getQuoteFeed(qparams);
	var myBehavior = qparams.behavior || {};
	// Some aggregation types potentially require a lot of data. We set the flag "fetchMaximumBars"
	// but also take a guess and say 20,000 bars should cover most situations
	if (
		stx.fetchMaximumBars[stx.layout.aggregationType] ||
		params.fetchMaximumBars
	) {
		if (
			!stx.maxMasterDataSize ||
			myBehavior.maximumTicks < stx.maxMasterDataSize
		)
			qparams.ticks = myBehavior.maximumTicks;
		else qparams.ticks = stx.maxMasterDataSize;
		qparams.fetchMaximumBars = true;
	}

	function closure(self, qparams) {
		if (myBehavior.prefetchAction) myBehavior.prefetchAction("newChart");
		return function (dataCallback) {
			var chart = qparams.chart,
				quotes = dataCallback.quotes,
				success = false;
			if (
				symbol == chart.symbol &&
				interval == stx.layout.interval &&
				timeUnit == stx.layout.timeUnit
			) {
				// Make sure user hasn't changed symbol while we were waiting on a response
				self.loadingNewChart = false; // this has to be set before home() so we may call a pagination from it
				if (myQuoteFeed === self.getQuoteFeed(qparams) && !dataCallback.error) {
					quotes = self.cleanup(
						stx,
						null,
						quotes,
						CIQ.QuoteFeed.INITIAL,
						qparams
					);
					stx.setMasterData(quotes, chart, { noCleanupDates: true });
					chart.endPoints = {};

					var sdate =
						dataCallback.beginDate ||
						(quotes[0] ? quotes[0].DT : qparams.startDate);
					chart.endPoints.begin = sdate;
					var edate =
						dataCallback.endDate ||
						(quotes[0] ? quotes[quotes.length - 1].DT : qparams.endDate);
					chart.endPoints.end = edate;

					// Note, quotes.length==0 will not set moreAvailable to false, just in case the stock is thinly traded
					// We'll rely on checkLoadMore to make the definitive decision
					if (!quotes) {
						chart.moreAvailable = false;
						chart.upToDate = true;
					} else {
						chart.moreAvailable =
							dataCallback.moreAvailable === false ? false : true;
						chart.upToDate = dataCallback.hasOwnProperty("upToDate")
							? dataCallback.upToDate
							: !stx.isHistoricalModeSet;
					}

					chart.attribution = dataCallback.attribution;
					if (params.initializeChart) stx.initializeChart();
					stx.createDataSet();
					success = true;
				} else {
					myQuoteFeed.engine.announceError(qparams.originalState, dataCallback);
				}
			} else {
				//console.log("orphaned request", qparams);
				if (cb) cb("orphaned");
				return;
			}

			// new data means that all series could potentially have historical data. So reset them all.
			for (var key in chart.series) {
				var s = chart.series[key];
				s.endPoints = {};
				s.moreAvailable = null;
				s.upToDate = null;
				if (s.parameters.takedownResults)
					s.parameters.takedownResults(stx, key);
			}

			// We've now responded to the loadChart() callback. Please note that dependents are now being loaded in parallel!
			var masterData = chart.masterData;
			if (masterData && masterData.length) {
				qparams.startDate = masterData[0].DT;
				const currentDate = new Date(),
					endDate = masterData[masterData.length - 1].DT;

				qparams.endDate =
					endDate < currentDate && !stx.isHistoricalMode()
						? currentDate
						: endDate;
			}
			if (myBehavior.callback) {
				myBehavior.callback(qparams);
			}
			self.loadDependents(
				qparams,
				function () {
					if (success && !qparams.nodraw) self.stx.home(); // by default the white space is maintained now, so no need to include the {maintainWhitespace:true} parameter
					if (cb) cb(dataCallback.error);
					self.stx.dispatch("newChart", {
						stx: self.stx,
						symbol: self.stx.chart.symbol,
						symbolObject: self.stx.chart.symbolObject,
						moreAvailable: self.stx.chart.moreAvailable,
						upToDate: self.stx.chart.upToDate,
						quoteDriver: self
					});
					self.resetRefreshInterval(myBehavior.refreshInterval, myBehavior);
				},
				CIQ.QuoteFeed.INITIAL
			);
		};
	}
	this.loadingNewChart = true;
	this.updatingChart = false;

	qparams.originalState = CIQ.shallowClone(qparams);
	var closureCB = closure(this, qparams);
	if (this.stx.isEquationChart(qparams.symbol)) {
		//equation chart
		CIQ.fetchEquationChart(qparams, closureCB);
	} else if (myQuoteFeed) {
		CIQ.ChartEngine.Driver.fetchData(
			CIQ.QuoteFeed.INITIAL,
			myQuoteFeed.engine,
			qparams,
			closureCB
		);
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// Below code supports new quotefeed architecture
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

//Quotefeed constants defining fetchData's context parameter
CIQ.QuoteFeed.INITIAL = 1;
CIQ.QuoteFeed.UPDATE = 2;
CIQ.QuoteFeed.PAGINATION = 3;
CIQ.QuoteFeed.SERIES = 4;

// ALL quotefeed-fetch calls (old and new versions) go through this function
CIQ.ChartEngine.Driver.fetchData = function (context, quoteFeed, params, cb) {
	if (!params.symbol) return cb({ quotes: [] });
	if (quoteFeed.v2QuoteFeed) {
		// if new version of quotefeed
		if (typeof quoteFeed.subscribe !== "function") {
			// if no subscribe function defined then this is a typical quotefeed
			CIQ.ChartEngine.Driver.fetchDataInContext(context, quoteFeed, params, cb);
		} else {
			// else this is a "subscription" quotefeed
			CIQ.ChartEngine.Driver.fetchDataInContext(
				context,
				quoteFeed,
				params,
				function (results) {
					if (!results.error) {
						this.checkSubscriptions(params.stx);
					}
					cb(results);
				}.bind(quoteFeed)
			);
		}
	} else {
		// old version of quotefeed
		params.stx.convertToDataZone(params.startDate);
		params.stx.convertToDataZone(params.endDate);
		quoteFeed.fetch(params, cb);
	}
};

// if not a "subscription" quotefeed, then this function is always called for new quotefeed -- here the user's quotefeed is invoked;
// functions not defined in quotefeed are skipped over
CIQ.ChartEngine.Driver.fetchDataInContext = function (
	context,
	quoteFeed,
	params,
	cb
) {
	var iterator_parms, iterator, suggestedStartDate, suggestedEndDate;
	var stx = params.stx;
	if (!stx.chart.market.newIterator) {
		console.error(
			"quoteFeed feature requires first activating market feature."
		);
		return;
	}
	// When dealing with a series, we need to look at the original params in order to figure out
	// what type of request we really need to make
	if (context === CIQ.QuoteFeed.SERIES) {
		params.series = true;
		context = CIQ.QuoteFeed.INITIAL;
		if ((params.endDate && !params.startDate) || params.future)
			context = CIQ.QuoteFeed.PAGINATION;
		else if (params.startDate && !params.endDate)
			context = CIQ.QuoteFeed.UPDATE;
	}
	var ticks = Math.min(params.ticks, params.maximumTicks);
	if (quoteFeed.maxTicks) ticks = Math.min(ticks, quoteFeed.maxTicks);
	var qfSymbol = params.symbolObject.masterSymbol || params.symbol;
	switch (context) {
		case CIQ.QuoteFeed.UPDATE:
			if (stx.isHistoricalModeSet) {
				stx.quoteDriver.updatingChart = false;
				return;
			}

			var startDate;
			if (params.startDate) {
				startDate = params.startDate;
			} else {
				startDate = new Date(); // occurs if initial fetch returned no data
				startDate.setHours(0, 0, 0, 0);
			}
			if (typeof quoteFeed.fetchUpdateData === "function") {
				quoteFeed.fetchUpdateData(
					qfSymbol,
					stx.convertToDataZone(startDate),
					params,
					cb
				);
			}

			break;
		case CIQ.QuoteFeed.INITIAL:
			//Now need to calculate suggested dates
			suggestedEndDate = params.endDate || new Date();
			iterator_parms = {
				begin: suggestedEndDate,
				interval: params.interval,
				periodicity:
					params.interval == "tick"
						? stx.chart.xAxis.futureTicksInterval
						: params.period,
				outZone: stx.dataZone
			};
			iterator = stx.chart.market.newIterator(iterator_parms);
			suggestedStartDate = CIQ.ChartEngine.Driver.determineStartDate(
				params,
				iterator,
				ticks
			);
			if (params.endDate) suggestedEndDate = params.endDate;
			if (typeof quoteFeed.fetchInitialData === "function") {
				quoteFeed.fetchInitialData(
					qfSymbol,
					suggestedStartDate,
					stx.convertToDataZone(suggestedEndDate),
					params,
					cb
				);
			}
			break;
		case CIQ.QuoteFeed.PAGINATION:
			iterator_parms = {
				begin: params.endDate || params.startDate,
				interval: params.interval,
				periodicity:
					params.interval == "tick"
						? stx.chart.xAxis.futureTicksInterval
						: params.period,
				outZone: stx.dataZone
			};
			iterator = stx.chart.market.newIterator(iterator_parms);
			var suggestedDate = CIQ.ChartEngine.Driver.determineStartOrEndDate(
				params,
				iterator,
				ticks,
				!params.future
			);

			suggestedStartDate = params.startDate || suggestedDate;
			suggestedEndDate = params.endDate || suggestedDate;
			if (!params.startDate) params.stx.convertToDataZone(suggestedEndDate);
			else params.stx.convertToDataZone(suggestedStartDate);

			if (typeof quoteFeed.fetchPaginationData === "function") {
				if (
					stx.maxMasterDataSize &&
					stx.maxMasterDataSize <= stx.masterData.length
				)
					return;
				quoteFeed.fetchPaginationData(
					qfSymbol,
					suggestedStartDate,
					suggestedEndDate,
					params,
					function (dataCallback) {
						if (suggestedEndDate >= Date.now()) stx.isHistoricalModeSet = false; // exit historical mode if we request (future) data up to present or beyond
						if (cb) cb(dataCallback);
					}
				);
			}
			break;
		default:
			console.error("Illegal fetchData constant");
	}
};

};
__js_standard_quoteFeed_(typeof window !== "undefined" ? window : global);
