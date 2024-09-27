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


let __js_standard_createEngine_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

class CallbackNVStore {
	get(x, f) {
		f("no storage defined");
	}

	set(x, y) {}

	remove(x) {}
}

var Storage;

/**
 * Convenience function that uses the configuration provided in `params.config` to create the
 * chart engine, attach quote feeds, initialize add-ons, add event listeners, and load the
 * chart.
 *
 * Use this function to simplify chart creation when you have a well defined configuration object.
 * A default configuration object can be obtained from *defaultConfiguration.js* (in the *js*
 * folder of your library).
 *
 * **Note:** You can also create a chart without using this function. For example, create the chart
 * engine by instantiating {@link CIQ.ChartEngine}. Attach quote feeds with
 * {@link CIQ.ChartEngine#attachQuoteFeed}. Instantiate add-ons such as {@link CIQ.Tooltip} and
 * {@link CIQ.InactivityTimer} to add them to the chart engine. Add event listeners with
 * {@link CIQ.ChartEngine#addEventListener}. Load the chart with {@link CIQ.ChartEngine#loadChart}.
 *
 * @param {object} [params] Function parameters.
 * @param {HTMLElement} [params.container] The HTML element in which the chart engine is
 * 		created.
 * @param {object} [params.config] Contains configuration specifications.
 * @param {object} [params.config.chartEngineParams] Parameters required by the
 * 		{@link CIQ.ChartEngine} constructor except for a reference to the container HTML
 * 		element, which is provided by `params.container`, for example:
 * ```
 * {
 *     layout: {
 *         "chartType": "candle",
 *         "crosshair": true,
 *         "candleWidth": 30,
 *         "periodicity": 1,
 *         "interval": 'day',
 *     },
 *     preferences: {
 *         "currentPriceLine": true,
 *         "whitespace": 100
 *     },
 *     chart: {
 *         yAxis: {
 *           position: 'left'
 *         }
 *     }
 * }
 * ```
 * @param {object} [params.config.quoteFeeds] Array of quote feed objects to attach to the chart
 * 		engine.
 * @param {object} [params.config.marketFactory] Market factory object. When not provided,
 * 		{@link CIQ.Market.Symbology.factory} is used if available.
 * @param {object} [params.config.addOns] Initialization properties for add-ons.
 * @param {string} [params.config.chartId] Identifies the chart created by the chart engine.
 * @param {function} [params.config.onChartReady] A callback function to call when the chart has
 * 		been loaded.
 * @param {object} [params.config.callbacks] Event listeners to add to the chart engine. Use this
 * 		parameter to replace the default listeners for
 * 		[layout]{@link CIQ.ChartEngine~layoutEventListener},
 * 		[symbolChange]{@link CIQ.ChartEngine~symbolChangeEventListener},
 * 		[drawing]{@link CIQ.ChartEngine~drawingEventListener},
 * 		[preferences]{@link CIQ.ChartEngine~preferencesEventListener}, and
 * 		[newChart]{@link CIQ.ChartEngine~newChartEventListener}.
 * 		**Note:** Other event listeners can be added to the chart engine using this parameter, but
 * 		the recommended approach for listeners other than the defaults is to use
 * 		{@link CIQ.ChartEngine#addEventListener}.
 * @param {function} [params.config.callbacks.layout] Event listener that replaces the default
 * 		implementation provided by [getSaveLayout]{@link CIQ.ChartEngine.getSaveLayout}.
 * @param {function} [params.config.callbacks.symbolChange] Event listener that replaces the
 * 		default implementation provided by [getSaveLayout]{@link CIQ.ChartEngine.getSaveLayout}.
 * @param {function} [params.config.callbacks.drawing] Event listener that replaces the default
 * 		implementation provided by [getSaveDrawings]{@link CIQ.ChartEngine.getSaveDrawings}.
 * @param {function} [params.config.callbacks.preferences] Event listener that replaces the
 * 		default implementation provided by
 * 		[getSavePreferences]{@link CIQ.ChartEngine.getSavePreferences}.
 * @param {function} [params.config.callbacks.newChart] Event listener that replaces the default
 * 		implementation provided by [getRetoggleEvents]{@link CIQ.ChartEngine.getRetoggleEvents}.
 * @param {object} [params.config.initialData] Initial data to show on the chart.
 * @param {boolean} [params.config.restore] True if storage is to be used.
 * @param {boolean} [params.deferLoad] If true, the chart is created but not loaded.
 * @return {CIQ.ChartEngine} A reference to a new chart engine.
 *
 * @alias create
 * @memberof CIQ.ChartEngine
 * @static
 * @since
 * - 7.5.0
 * - 8.0.0 Renamed from `CIQ.UI.Chart#createChart`. Revised parameter list from
 * 		`(container, config = {})`.
 */
CIQ.ChartEngine.create = function ({ container, config, deferLoad } = {}) {
	if (!container)
		container = document.querySelector(".chartContainer") || document.body;
	if (!config) config = {};

	const chartParams = Object.assign({ container }, config.chartEngineParams);
	const stx = new this(chartParams);

	const {
		addOns,
		chartId,
		marketFactory,
		multiChartId,
		onChartReady,
		onEngineReady,
		quoteFeeds
	} = config;

	if (quoteFeeds && stx.attachQuoteFeed) {
		quoteFeeds.forEach(({ quoteFeed, behavior, filter }) => {
			stx.attachQuoteFeed(quoteFeed, behavior, filter);
		});
	}

	if (marketFactory) {
		stx.setMarketFactory(marketFactory);
		if (CIQ.Market) {
			CIQ.Market.definitionAPIs = config.marketDefinitionAPIs;
			CIQ.Market.symbolMapping = config.marketDefinitionMapping;
			if (CIQ.Market.Symbology && CIQ.Market.Symbology.isAPIBacked) {
				CIQ.Market.Symbology.isAPIBacked.defaultAPI =
					CIQ.Market.symbolMapping[config.marketDefinitionDefaultMapping];
			}
		}
	}

	if (addOns) {
		Object.entries(addOns)
			.filter(([, params]) => !!params) // remove inactive addOns
			.forEach(([itemName, params]) => {
				if (!config.enabledAddOns[itemName]) return;
				const extensionName = params.moduleName || CIQ.capitalize(itemName);
				if (CIQ[extensionName]) {
					const { cssRequired } = new CIQ[extensionName](
						Object.assign({ stx }, params, { config })
					);
					if (cssRequired && CIQ.UI) {
						CIQ.UI.activatePluginUI(stx, extensionName);
					}
				} else if (CIQ.debug) {
					console.log(
						`${extensionName} not available for addons with params:`,
						params
					);
				}
			});
	}

	const callbacks = CIQ.ensureDefaults(config.callbacks || {}, {
		layout: this.getSaveLayout(config),
		symbolChange: this.getSaveLayout(config),
		drawing: this.getSaveDrawings(config),
		preferences: this.getSavePreferences(config),
		newChart: this.getRetoggleEvents(config)
	});

	for (let cb in callbacks) {
		if (callbacks[cb]) stx.addEventListener(cb, callbacks[cb]);
	}

	Storage = config.nameValueStore || CIQ.NameValueStore || CallbackNVStore;

	Storage = new Storage();

	if (!deferLoad) {
		if (onEngineReady) onEngineReady(stx);
		if (config.restore) {
			this.restorePreferences(stx, chartId, multiChartId);
			this.restoreLayout(
				stx,
				(err) => {
					// if import does not contain symbol load default
					if (!stx.chart.symbol && config.initialSymbol) {
						loadSymbol();
					} else {
						cbChartReady();
					}
				},
				chartId,
				config
			);
		} else {
			loadSymbol();
		}
	}

	// attach the output alias list to the corresponding study
	if (CIQ.Studies && config.studyOutputAliasList)
		CIQ.Studies.assignAliasesToStudies(config.studyOutputAliasList);

	stx.chart.canvasTitleFunc = config.getCanvasTitle;

	return stx;

	function loadSymbol() {
		stx.loadChart(
			config.initialSymbol,
			{ masterData: config.initialData },
			cbChartReady
		);
		stx.draw();
	}

	function cbChartReady() {
		if (!onChartReady) return;
		// execute configuration callback on next tick
		// as this function can be invoked synchronously, for example if there is no
		// symbol in layout and default symbol is not providing, leading to configuration
		// callback executed before call stack is cleard
		setTimeout(() => onChartReady(stx));
	}
};

/**
 * Returns a callback function that saves chart layout information. Uses an instance of
 * {@link CIQ.NameValueStore} if one is available; otherwise, saves the layout information to
 * local storage.
 *
 * **Note:** You can also serialize the chart layout using
 * {@link CIQ.ChartEngine#exportLayout}.
 *
 * @param {object} [config] Configuration parameters.
 * @param {string} [config.chartId] Identifies the layout in local storage for a specific chart.
 * @param {boolean} [config.restore] Indicates whether the layout is restorable. If false, the
 * 		returned callback function does not save the chart layout.
 * @return {function} A callback function that saves the chart layout in local storage. The
 * 		returned callback function is typically added to the chart engine as a
 * 		[layoutEventListener]{@link CIQ.ChartEngine~layoutEventListener} or
 * 		[symbolChangeEventListener]{@link CIQ.ChartEngine~symbolChangeEventListener}.
 *
 * @alias getSaveLayout
 * @memberof CIQ.ChartEngine
 * @static
 * @since
 * - 7.5.0
 * - 8.0.0 Renamed from `CIQ.UI.Chart#getSaveLayout`.
 */
CIQ.ChartEngine.getSaveLayout = function (config) {
	return function saveLayout({ stx }) {
		if (config.restore && stx.exportLayout) {
			var s = JSON.stringify(stx.exportLayout(true));
			Storage.set("myChartLayout" + (config.chartId || ""), s);
		}
	};
};

/**
 * Restores the chart layout from {@link CIQ.NameValueStore} if an instance is available;
 * otherwise, restores the layout from local storage.
 *
 * **Note:** You can also restore the chart layout using {@link CIQ.ChartEngine#importLayout} and
 * {@link CIQ.ChartEngine#importDrawings}.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine.
 * @param {function} cb A callback function to be called when restoration of the layout is
 * 		complete.
 * @param {string} id The local storage identifier for the saved chart layout. See
 * 		[getSaveLayout]{@link CIQ.ChartEngine.getSaveLayout}.
 * @param {object} [config] Chart configuration object.
 *
 * @alias restoreLayout
 * @memberof CIQ.ChartEngine
 * @static
 * @since
 * - 7.5.0
 * - 8.0.0 Renamed from `CIQ.UI.Chart#restoreLayout`.
 * - 8.7.0 Added optional `config` parameter.
 */
CIQ.ChartEngine.restoreLayout = function (stx, cb, id, config) {
	const { restoreDrawings } = this;
	if (!id) id = "";

	function closure() {
		restoreDrawings(stx, stx.chart.symbol, id);
		if (cb) cb();
	}

	Storage.get("myChartLayout" + id, function (error, datum) {
		if (error) return;

		try {
			datum = JSON.parse(datum);
		} catch (e) {}

		const doNotRestoreSymbol =
			config && config.restore && config.restore.symbol === false;
		if (datum && datum.symbols && doNotRestoreSymbol) {
			const symbolObject =
				config.initialSymbol != undefined && config.initialSymbol.symbol
					? config.initialSymbol
					: { symbol: config.initialSymbol };

			datum.symbols[0] = datum.symbols[0] || {};
			Object.assign(datum.symbols[0], {
				symbol: symbolObject.symbol,
				symbolObject
			});

			datum.symbols = datum.symbols.filter(
				({ symbol }, i) => !i || symbol !== symbolObject.symbol
			);
		}

		if (stx.importLayout)
			stx.importLayout(datum, {
				managePeriodicity: true,
				cb: closure
			});

		if (stx.crossSection) {
			stx.setCandleWidth(1); // don't preserve zoom state for cross section plugin
		}
	});
};

/**
 * Returns a callback function that saves the state of chart drawings. Uses an instance of
 * {@link CIQ.NameValueStore} if one is available; otherwise, saves the state of the drawings in
 * local storage.
 *
 * **Note:** You can also serialize the state of chart drawings using
 * {@link CIQ.ChartEngine#exportDrawings}.
 *
 * @param {object} [config] Configuration parameters.
 * @param {string} [config.chartId] Identifies the drawings in local storage for a specific chart.
 * @param {boolean} [config.restore] Indicates whether the chart drawings are restorable. If
 * 		false, the returned callback function does not save the chart drawings.
 * @return {function} A callback function that saves the state of the chart drawings. The returned
 * 		callback function is typically added to the chart engine as a
 * 		[drawingEventListener]{@link CIQ.ChartEngine~drawingEventListener}.
 *
 * @alias getSaveDrawings
 * @memberof CIQ.ChartEngine
 * @static
 * @since
 * - 7.5.0
 * - 8.0.0 Renamed from `CIQ.UI.Chart#getSaveDrawings`.
 */
CIQ.ChartEngine.getSaveDrawings = function (config) {
	return function saveDrawings({ stx, symbol }) {
		if (config.restore && stx.exportDrawings) {
			const tmp = stx.exportDrawings();
			const key = config.chartId ? config.chartId + "~" + symbol : symbol;
			const drawingsKey = `${config.chartId || ""}_drawings`;

			Storage.get(drawingsKey, (err, value) => {
				const drawings = value || {};
				if (tmp.length === 0) {
					Storage.remove(key);
					delete drawings[key];
				} else {
					Storage.set(key, JSON.stringify(tmp));
					drawings[key] = tmp.length;
				}
				Storage.set(drawingsKey, drawings);
			});
		}
	};
};

/**
 * Restores the chart drawings from {@link CIQ.NameValueStore} if an instance is available;
 * otherwise, restores the drawings from local storage.
 *
 * **Note:** You can also restore saved chart drawings using
 * {@link CIQ.ChartEngine#importDrawings}.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine.
 * @param {string} symbol The chart symbol. Used along with `id` to identify the chart drawings in
 * 		local storage.
 * @param {string} [id] The local storage identifier for the saved drawings. See
 * 		[getSaveDrawings]{@link CIQ.ChartEngine.getSaveDrawings}.
 *
 * @alias restoreDrawings
 * @memberof CIQ.ChartEngine
 * @static
 * @since
 * - 7.5.0
 * - 8.0.0 Renamed from `CIQ.UI.Chart#restoreDrawings`.
 */
CIQ.ChartEngine.restoreDrawings = function (stx, symbol, id) {
	if (!CIQ.Drawing) return;
	const recId = id ? id + "~" + symbol : symbol;
	Storage.get(recId, function (error, memory) {
		if (error) return;
		try {
			memory = JSON.parse(memory);
		} catch (e) {}
		if (memory) {
			if (stx.chart.hideDrawings) {
				stx.dispatch("notification", "drawingsHidden");
			}
			stx.importDrawings(memory);
			stx.draw();
		}
	});
};

/**
 * Returns a callback function that saves the chart preferences. Uses an instance of
 * {@link CIQ.NameValueStore} if one is available; otherwise, saves the preferences in local
 * storage.
 *
 * **Note:** You can also capture chart preferences using
 * {@link CIQ.ChartEngine#exportPreferences}.
 *
 * @param {object} [config] Configuration parameters.
 * @param {string} [config.chartId] Identifies the preferences in local storage for a specific
 * 		chart.
 * @param {boolean} [config.restore] Indicates whether the chart preferences are restorable. If
 * 		false, the returned callback function does not save the chart preferences.
 * @return {function} A callback function that saves the chart preferences. The returned callback
 * 		function is typically added to the chart engine as a
 * 		[preferencesEventListener]{@link CIQ.ChartEngine~preferencesEventListener}.
 *
 * @alias getSavePreferences
 * @memberof CIQ.ChartEngine
 * @static
 * @since
 * - 7.5.0
 * - 8.0.0 Renamed from `CIQ.UI.Chart#savePreferences`. Revised parameter list from `({ stx })`.
 * 		Now returns a function.
 */
CIQ.ChartEngine.getSavePreferences = function (config) {
	return function savePreferences({ stx }) {
		if (config.restore && stx.exportPreferences) {
			var s = JSON.stringify(stx.exportPreferences());
			Storage.set(
				"myChartPreferences" + (config.multiChartId || config.chartId || ""),
				s
			);
		}
	};
};

/**
 * Restores the chart preferences from {@link CIQ.NameValueStore} if an instance is available;
 * otherwise, restores the preferences from local storage.
 *
 * **Note:** You can also restore the chart preferences using
 * {@link CIQ.ChartEngine#importPreferences}.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine.
 * @param {string} [id] The local storage identifier for the saved chart preferences. See
 * 		[getSavePreferences]{@link CIQ.ChartEngine.getSavePreferences}.
 * @param {string} [multiChartId] The local storage identifier for multi chart
 * @alias restorePreferences
 * @memberof CIQ.ChartEngine
 * @static
 * @since
 * - 7.5.0
 * - 8.0.0 Renamed from `CIQ.UI.Chart#restorePreferences`.
 */
CIQ.ChartEngine.restorePreferences = function (stx, id, multiChartId) {
	const chartId = multiChartId || id || "";
	Storage.get("myChartPreferences" + chartId, function (error, pref) {
		if (error) return;

		try {
			pref = JSON.parse(pref);
		} catch (e) {}

		if (pref && stx.importPreferences) stx.importPreferences(pref);
	});
};

/**
 * Returns a callback function that restores the state of the chart markers.
 *
 * @param {object} [config] Configuration parameters.
 * @param {string} [config.chartId] Identifies the chart for which the state of the markers is
 * 		restored.
 * @param {string} [config.selector.markersMenuItem] A CSS selector used to obtain references to
 * 		the DOM nodes that represent the marker radio buttons in the chart user interface. The DOM
 * 		nodes can be used to invoke the radio button event listeners to turn the markers on and
 * 		off. See *js/defaultConfiguration.js* for an example of this parameter.
 * @return {function} A callback function that restores the state of the chart markers. The
 * 		returned function is typically assigned to
 * 		[newChartEventListener]{@link CIQ.ChartEngine~newChartEventListener}.
 *
 * @alias getRetoggleEvents
 * @memberof CIQ.ChartEngine
 * @static
 * @since
 * - 7.5.0
 * - 8.0.0 Renamed from `CIQ.UI.Chart#retoggleEvents`. Revised parameter list from `({ stx })`.
 * 		Now returns a function.
 */
CIQ.ChartEngine.getRetoggleEvents = function (config) {
	return function retoggleEvents({ stx }) {
		let topNode = config.chartId && document.getElementById(config.chartId);
		if (!topNode)
			topNode = (CIQ.getFn("UI.getMyContext")(stx.container) || {}).topNode;
		if (!topNode) topNode = document;
		// do not reset the span events since that will also reset their states
		const active = topNode.querySelectorAll(
			config.selector.markersMenuItem
				.split(",")
				.map((selector) => `${selector}.ciq-active:not(.span-event)`)
				.join(",")
		);
		active.forEach(function (i) {
			i.querySelector(".ciq-switch, .ciq-checkbox, .ciq-radio").dispatchEvent(
				new Event("stxtap")
			);
		});
	};
};

};
__js_standard_createEngine_(typeof window !== "undefined" ? window : global);
