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
 * Creates an add-on that enables a series to complement another series.
 *
 * ![Plot Complementer](./img-Data-Forecasting.png)
 *
 * The complementary series is a permanent fixture of the series which it complements. It moves
 * in tandem with the series, and gets removed with the series. In all other respects, though, it
 * behaves like its own series. It shows separately in the panel legend and plots using its own
 * renderer.
 *
 * Charts can have multiple `PlotComplementer` instances. Each instance is attached to the chart
 * engine as a member of a `PlotComplementer` collection.
 *
 * Multiple `PlotComplementer` instances can be associated with a time series. To link a
 * `PlotComplementer` to a series, specify the series instrument in the `params.filter` function.
 * See `[setQuoteFeed]{@link CIQ.PlotComplementer#setQuoteFeed}`.
 *
 * **Note:** The series created by this add-on is not exported with the layout, since it is
 * created in tandem with the series it complements. Currently, this feature works only with
 * non-comparison series.
 *
 * Requires *addOns.js*.
 *
 * @param {object} params Configuration parameters.
 * @param {CIQ.ChartEngine} params.stx The chart object.
 * @param {string} [params.id] Unique key used by the add-on to identify itself. If not supplied,
 * 		a random key is chosen.
 * @param {object} [params.quoteFeed] Attaches the quote feed to the quote driver to satisfy any
 * 		quote requests for any series created by the add-on.
 * @param {object} [params.behavior] Used as the behavior for the quote feed supplied in this
 * 		parameter list.
 * @param {function} [params.filter] Used as the filter for the quote feed supplied in this
 * 		parameter list. See `[setQuoteFeed]{@link CIQ.PlotComplementer#setQuoteFeed}`.
 * @param {object} [params.decorator] Container object for the `symbol` and `display` properties.
 * 		The `decorator` provides the label (`symbol`) for the complementary series and a short
 * 		description (`display`) that is appended to the label; for example:
 * ```
 * decorator: {symbol:"_fcst", display:" Forecast"}
 * ```
 * @param {string} [params.decorator.symbol] Adds this string onto the ID when creating the
 * 		complementary series. Otherwise, a unique ID is used.
 * @param {string} [params.decorator.display] Customizes the display value of the series.
 * @param {object} [params.renderingParameters={chartType: "line", width: 1, opacity: 0.5}] A
 * 		collection of parameters that override the default rendering parameters. The
 * 		`renderingParameters` object can be set or changed at any time. The default parameters
 * 		can be restored by calling {@link CIQ.PlotComplementer#resetRenderingParameters}.
 * 		<p>Here are a few examples of rendering parameters:</p>
 * ```
 * // Assuming a PlotComplementer declared as "forecaster":
 * forecaster.renderingParameters = {chartType:"scatterplot", opacity:0.5, field:"Certainty"}
 * forecaster.renderingParameters = {chartType:"histogram", border_color:"transparent", opacity:0.3}
 * forecaster.renderingParameters = {chartType:"channel", opacity:0.5, pattern:"dotted"}
 * forecaster.renderingParameters = {chartType:"candle", opacity:0.5, color:"blue", border_color:"blue"}
 * ```
 *
 * @constructor
 * @name CIQ.PlotComplementer
 * @since 7.3.0
 *
 * @example <caption>Forecasting</caption>
 * let forecaster = new CIQ.PlotComplementer({
 *     stx:stxx,
 *     id:"forecast",
 *     quoteFeed: fcstFeed.quoteFeedForecastSimulator,
 *     behavior: {refreshInterval:60},
 *     decorator: {symbol:"_fcst", display:" Forecast"},
 *     renderingParameters: {chartType:"channel", opacity:0.5, pattern:"dotted"}
 * });
 */
CIQ.PlotComplementer =
	CIQ.PlotComplementer ||
	function (params) {
		var stx = params.stx;
		var unique = CIQ.uniqueID();
		if (!params.decorator) params.decorator = {};
		var symbolDecorator = params.decorator.symbol || "_" + unique;
		var displayDecorator = params.decorator.display || " (addl)";
		if (!stx.plotComplementers) stx.plotComplementers = [];
		stx.plotComplementers.push(this);

		this.id = params.id || unique;

		this.defaultRenderingParameters = {
			chartType: "line",
			width: 1,
			opacity: 0.5
		};

		if (params.renderingParameters)
			this.defaultRenderingParameters = params.renderingParameters;

		var self = this;
		function addSeries(stx, symbol, parameters, id) {
			function verifyQuoteFeed(stx) {
				if (!stx.quoteDriver) return;
				if (!params.quoteFeed) return;
				for (var qf = 0; qf < stx.quoteDriver.quoteFeeds.length; qf++) {
					if (stx.quoteDriver.quoteFeeds[qf].engine == params.quoteFeed) return;
				}
				return "err";
			}
			if (verifyQuoteFeed(stx) == "err") return;
			if (!id) id = symbol;
			if (stx.isEquationChart(symbol)) return;
			if (!parameters) parameters = {};
			if (parameters.isComparison) return;
			if (id && id.indexOf(symbolDecorator) == -1) {
				var fId = id + symbolDecorator,
					fSymbol = symbol + symbolDecorator;
				var masterRenderer = stx.getRendererFromSeries(id);
				var myParms = CIQ.extend(
					{
						display: symbol + displayDecorator,
						name: fId,
						symbol: fSymbol,
						symbolObject: {
							symbol: fSymbol,
							generator: self.id,
							masterSymbol: symbol
						},
						overChart: false,
						gapDisplayStyle: true,
						permanent: true,
						panel: parameters.panel,
						yAxis: parameters.yAxis,
						shareYAxis: true,
						loadData: !!self.quoteFeed,
						dependentOf: masterRenderer
							? masterRenderer.params.name
							: stx.mainSeriesRenderer.params.name
					},
					self.renderingParameters
				);
				if (!myParms.color) myParms.color = parameters.color || "auto";
				stx.addSeries(fId, myParms, function (error, obj) {
					if (error) stx.removeSeries(fId, stx.chart);
					if (stx.chart.seriesRenderers[fId]) {
						stx.chart.seriesRenderers[fId].params.display = myParms.display;
					}
				});
			}
		}

		function removeSeries(stx, id, chart) {
			if (id && id.indexOf(symbolDecorator) == -1)
				stx.removeSeries(id + symbolDecorator, chart);
		}

		function symbolChange(obj) {
			if (obj.action == "master") {
				if (!obj.prevSymbol) obj.prevSymbol = obj.symbol;
				removeSeries(obj.stx, obj.prevSymbol, obj.stx.chart);
				addSeries(obj.stx, obj.symbol);
			} else if (obj.action == "add-series") {
				removeSeries(obj.stx, obj.id, obj.stx.chart);
				addSeries(obj.stx, obj.symbol, obj.parameters, obj.id);
			} else if (obj.action == "remove-series") {
				removeSeries(obj.stx, obj.id, obj.stx.chart);
			}
		}

		stx.addEventListener("symbolChange", symbolChange);
		stx.addEventListener("symbolImport", symbolChange);

		/**
		 * Resets the `PlotComplementer` rendering values to the default settings.
		 *
		 * Default settings can be provided in the parameters passed to the `PlotComplementer` constructor. If no settings are
		 * provided to the constructor, `PlotComplementer` uses the following defaults: `{ chartType:"line", width:1, opacity:0.5 }`.
		 *
		 * The rendering parameters may be set anytime after creating `PlotComplementer`; for example, to set an ad-hoc rendering
		 * right before adding a series.
		 *
		 * @alias resetRenderingParameters
		 * @memberof CIQ.PlotComplementer.prototype
		 * @since 7.3.0
		 */
		this.resetRenderingParameters = function () {
			this.renderingParameters = this.defaultRenderingParameters;
		};

		/**
		 * Sets a quote feed for the `PlotComplementer`.
		 *
		 * Automatically called when a quote feed is provided in the constructor argument. If a
		 * quote feed or `behavior` object is not specified in `params`, this function returns
		 * without doing anything.
		 *
		 * @param {object} params Configuration parameters.
		 * @param {object} params.quoteFeed Quote feed to attach to the quote driver to satisfy
		 * 		any quote requests for any series created by the add-on. This quote feed is like
		 * 		any time series quote feed object. See the
		 * 		[Data Integration Overview]{@tutorial DataIntegrationOverview}.
		 * @param {object} params.behavior Behavior for the quote feed supplied in this parameter
		 * 		list. This object is like any `behavior` object associated with a quote feed.
		 * 		See {@link CIQ.ChartEngine#attachQuoteFeed} for more information on `behavior`
		 * 		objects.
		 * @param {function} [params.filter] Filters the quote feed supplied in this parameter
		 * 		list. The filter function takes as an argument an object typically containing
		 * 		`symbolObject`, `symbol`, and `interval` properties. The properties associate the
		 * 		`PlotComplementer` with an instrument. If the `filter` function returns true, the
		 * 		`PlotComplementer` quote feed is used for the instrument.
		 * 		<p>This `filter` function is like the `filter` in basic quote feeds.
		 * 		See {@link CIQ.ChartEngine#attachQuoteFeed} for more information on quote feed
		 * 		`filter` functions.</p>
		 * @alias setQuoteFeed
		 * @memberof CIQ.PlotComplementer.prototype
		 * @since 7.3.0
		 */
		this.setQuoteFeed = function (params) {
			if (!params.quoteFeed || !params.behavior) return;
			var behavior = CIQ.clone(params.behavior);
			behavior.generator = this.id;
			var existingFilter = params.filter;
			var filter = function (params) {
				if (existingFilter && !existingFilter(params)) return false;
				return params.symbolObject.generator == behavior.generator;
			};
			stx.attachQuoteFeed(params.quoteFeed, behavior, filter);
			this.quoteFeed = params.quoteFeed;
		};

		this.setQuoteFeed(params);
		this.resetRenderingParameters();
	};
