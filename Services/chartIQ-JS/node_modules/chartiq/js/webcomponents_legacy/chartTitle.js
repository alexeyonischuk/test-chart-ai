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
import "../../js/webcomponents_legacy/clickable.js";
import "../../js/webcomponents_legacy/menu.js";
import "../../js/webcomponents_legacy/menuContainer.js";
import "../../js/webcomponents/scroll/menuDropdown.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */





var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Chart Title web component `<cq-chart-title>`.
 *
 * Note, if the `cq-marker` is added to the element, and it is placed within the
 * chartArea, the element will sit above the chart bars.
 *
 * `<cq-symbol></cq-symbol>` will display `chart.symbol`.<br>
 * `<cq-symbol-description></cq-symbol-description>` will display the `chart.symbolDisplay`. See {@link CIQ.ChartEngine.Chart#symbolDisplay} for details on how to set this value.
 *
 * Set attribute `cq-browser-tab` to true to get the stock symbol and latest price to update in the browser tab.
 *
 * Set member `previousClose` to the prior day's closing price in order to calculate and display change.
 * If `previousClose` is not set, then `iqPrevClose` from the `dataSet` will be the default.<br>
 * Remember data is loaded asynchronously.
 * Be sure to reset this value once your initial data has been loaded by using the {@link CIQ.ChartEngine.loadChart} callback function.
 * ```
 * stx.loadChart(symbol, parameters, function(){
 *      document.querySelector("cq-chart-title").previousClose = yesterdays-closing-price;
 * }
 * ```
 *
 * The `cq-animate` attribute in the `cq-current-price` element can be used to change the price color to red or green based on the previous value.
 * Setting the attribute to "fade" will introduce a transition effect on the price which, while attractive, uses considerable CPU when there are rapid updates.
 * @namespace WebComponents.cq-chart-title
 * @example
 * <cq-chart-title>
 * 	<cq-symbol></cq-symbol>
 * 	<cq-chart-price>
 * 		<cq-current-price cq-animate></cq-current-price>
 * 		<cq-change>
 * 			<div class="ico"></div> <cq-todays-change></cq-todays-change> (<cq-todays-change-pct></cq-todays-change-pct>)
 * 		</cq-change>
 * 	</cq-chart-price>
 * </cq-chart-title>
 *
 * @example
 * //You can set a more descriptive name by using http://documentation.chartiq.com/CIQ.ChartEngine.Chart.html#symbolDisplay
 * // and then enabling that on the tile.
 *
 * //In your HTML file look for:
 * <cq-symbol></cq-symbol>
 * //and replace it with :
 * <cq-symbol-description></cq-symbol-description>
 *
 * //In your quote feed add the following line:
 * params.stx.chart.symbolDisplay=response.fullName;
 *
 * //Like so:
 * quotefeed.fetchInitialData=function (symbol, suggestedStartDate, suggestedEndDate, params, cb) {
 *  var queryUrl = this.url; // using filter:true for after hours
 *
 *  CIQ.postAjax(queryUrl, null, function(status, response){
 *   // process the HTTP response from the datafeed
 *   if(status==200){ // if successful response from datafeed
 *    params.stx.chart.symbolDisplay=response.fullName; // specify response name
 *    var newQuotes = quotefeed.formatChartData(response);
 *    cb({quotes:newQuotes, moreAvailable:true, attribution:{source:"simulator", exchange:"RANDOM"}}); // return the fetched data; init moreAvailable to enable pagination
 *   } else { // else error response from datafeed
 *    cb({error:(response?response:status)});	// specify error in callback
 *   }
 *  });
 * };
 *
 * @since
 * - 06-15-16
 * - 4.0.0 Browser tab now updates with stock symbol and latest price using `cq-browser-tab` attribute.
 * - 6.3.0 Negative close values are "N/A" change percentage.
 * - 6.3.0 Child tag `<cq-todays-change-pct>` is now optional.
 * - 8.8.0 Add `cq-activate-symbol-search-on-click` attribute.
 */

class ChartTitle extends CIQ.UI.ModalTag {
	get displayExchange() {
		return this.getAttribute("display-exchange");
	}

	constructor() {
		super();
		/**
		 * Keep this value up to date in order to calculate change from yesterday's close.
		 * @type {Float}
		 * @alias previousClose
		 * @memberof WebComponents.cq-chart-title
		 */
		this.previousClose = null;
	}

	/**
	 * Begins the Title helper. This observes the chart and updates the title elements as necessary.
	 * @alias begin
	 * @memberof WebComponents.cq-chart-title
	 */
	begin() {
		const self = this;

		this.addInjection("append", "createDataSet", function () {
			self.update();
		});
		this.update();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ChartTitle);
		this.constructor = ChartTitle;
	}

	disconnectedCallback() {
		if (this.context) {
			CIQ.UI.unobserveProperty(
				"symbolObject",
				this.context.stx.chart,
				this.listener
			);
		}
		super.disconnectedCallback();
	}

	initialize(params) {
		this.params = params ? params : {};
		if (typeof this.params.autoStart == "undefined")
			this.params.autoStart = true;
		this.marker = null;

		if (this.params.autoStart) this.begin();
	}

	setContext(context) {
		if (this.listener) return;

		var self = this,
			stx = this.context.stx;

		let { markup } = this.constructor;
		if (!this.hasAttribute("cq-activate-symbol-search-on-click")) {
			markup = markup
				.replace(
					'<cq-clickable role="button" cq-selector="cq-lookup-dialog" cq-method="open">',
					""
				)
				.replace("</cq-clickable>", "");
		}
		this.addDefaultMarkup(this, markup);

		this.symbolDiv = this.querySelector("cq-symbol");
		this.symbolDescriptionDiv = this.querySelector("cq-symbol-description");
		this.currentPriceDiv = this.querySelector("cq-current-price");
		this.todaysChangeDiv = this.querySelector("cq-todays-change");
		this.todaysChangePctDiv = this.querySelector("cq-todays-change-pct");
		this.chartPriceDiv = this.querySelector("cq-chart-price");
		this.changeDiv = this.querySelector("cq-change");
		this.exchangeDiv = this.querySelector(".exchange");

		this.listener = function (obj) {
			const { exchangeDiv } = self;

			self.mostRecentClose = stx.mostRecentClose("iqPrevClose");

			if (exchangeDiv) {
				const {
					value: { exchDisp }
				} = obj;
				if (self.displayExchange && exchDisp) {
					exchangeDiv.innerText = `Exchange: ${exchDisp}`;
				} else if (obj.value.static) {
					exchangeDiv.innerText = "STATIC";
				} else {
					exchangeDiv.innerText = "";
				}
			}
		};
		CIQ.UI.observeProperty("symbolObject", stx.chart, this.listener);

		this.initialize();
	}

	/**
	 * Updates the values in the node
	 * @alias update
	 * @memberof WebComponents.cq-chart-title
	 */
	update() {
		const { stx } = this.context;
		const {
			chart: { symbol, symbolDisplay },
			internationalizer
		} = stx;

		const {
			symbolDiv,
			symbolDescriptionDiv,
			exchangeDiv,
			currentPriceDiv,
			changeDiv,
			chartPriceDiv,
			todaysChangeDiv,
			todaysChangePctDiv
		} = this;
		var doUpdateBrowserTab =
			["false", "0", null].indexOf(this.getAttribute("cq-browser-tab")) == -1;
		var wrapper = this.closest("cq-context-wrapper");
		var isActiveChart =
			!wrapper || (wrapper && wrapper.classList.contains("active"));
		if (!isActiveChart) doUpdateBrowserTab = false;
		const doUpdatePrice = chartPriceDiv && currentPriceDiv;
		let priceChanged = false;
		let symbolChanged = false;

		let show = !symbol ? "remove" : "add";
		this.classList[show]("stx-show");

		if (symbolDiv.innerText !== symbol) {
			symbolDiv.innerText = symbol;
			symbolChanged = true;
		}

		if (
			symbolDescriptionDiv &&
			symbolDescriptionDiv.innerText !== (symbolDisplay || symbol)
		)
			symbolDescriptionDiv.innerText = symbolDisplay || symbol;

		if (stx.isHistoricalModeSet) {
			if (currentPriceDiv.innerText !== "") currentPriceDiv.innerText = "";
			changeDiv.style.display = "none";
			// only change the display so that you don't wreck the line spacing and parens
			return;
		}

		let todaysChange = "",
			todaysChangePct = 0,
			todaysChangeDisplay = "";
		const currentQuote = stx.getFirstLastDataRecord(
			stx.chart.dataSet,
			"Close",
			true
		);
		let currentPrice = "";
		let textPrice = "";
		if (currentQuote) currentPrice = currentQuote.Close;
		if (doUpdatePrice) {
			if (currentPrice !== "")
				textPrice = stx.formatYAxisPrice(
					currentPrice,
					stx.chart.panel,
					stx.chart.decimalPlaces
				);
			let oldPrice = parseFloat(currentPriceDiv.innerText);
			if (currentPriceDiv.innerText !== textPrice) {
				currentPriceDiv.innerText = textPrice;
				priceChanged = true;
				var attr = this.currentPriceDiv.getAttribute("cq-animate");
				if (typeof attr != "undefined") {
					CIQ.UI.animatePrice(
						currentPriceDiv,
						currentPrice,
						oldPrice,
						attr == "fade"
					);
				}
			}
		}

		if (
			(doUpdatePrice || doUpdateBrowserTab) &&
			symbol &&
			(symbolChanged || priceChanged)
		) {
			let previousClose = this.previousClose;

			// Default to iqPrevClose if the developer hasn't set this.previousClose
			if (!previousClose && previousClose !== 0)
				previousClose = currentQuote && currentQuote.iqPrevClose;

			if (!previousClose && previousClose !== 0)
				previousClose = this.mostRecentClose;

			if (changeDiv && (currentPrice || currentPrice === 0)) {
				todaysChange = CIQ.fixPrice(currentPrice - previousClose);
				todaysChangePct = (todaysChange / previousClose) * 100;
				if (previousClose <= 0 || currentPrice < 0) {
					todaysChangeDisplay = "N/A";
				} else if (internationalizer) {
					todaysChangeDisplay = internationalizer.percent2.format(
						todaysChangePct / 100
					);
				} else {
					todaysChangeDisplay = todaysChangePct.toFixed(2) + "%";
				}
				changeDiv.style.display = "";
			} else if (changeDiv) {
				changeDiv.style.display = "none";
			}

			const todaysChangeAbs = Math.abs(todaysChange);
			const txtChange = stx.formatYAxisPrice(
				todaysChangeAbs,
				stx.chart.panel,
				stx.chart.decimalPlaces
			);
			if (todaysChangeAbs) {
				if (todaysChangeDiv.innerText !== txtChange)
					todaysChangeDiv.innerText = txtChange;
			}
			if (todaysChangePctDiv) {
				const visualPctChange = "(" + todaysChangeDisplay + ")";
				if (todaysChangePctDiv.innerText !== visualPctChange)
					todaysChangePctDiv.innerText = visualPctChange;
			}
			if (todaysChangeDisplay !== "" && todaysChange < 0) {
				chartPriceDiv.classList.add("stx-down");
			} else {
				chartPriceDiv.classList.remove("stx-down");
			}
			if (todaysChangeDisplay !== "" && todaysChange > 0) {
				chartPriceDiv.classList.add("stx-up");
			} else {
				chartPriceDiv.classList.remove("stx-up");
			}

			currentPrice = currentPrice !== undefined ? currentPrice : "";
			todaysChange = todaysChange !== undefined ? todaysChange : "";

			// These strange characters create some spacing so that the title appears
			// correctly in a browser tab
			this.title =
				symbol + " \u200b \u200b " + textPrice + " \u200b \u200b \u200b ";
			if (todaysChange > 0) {
				this.title += "\u25b2 " + txtChange;
			} else if (todaysChange < 0) {
				this.title += "\u25bc " + txtChange;
			}
			if (doUpdateBrowserTab) {
				this.ownerDocument.title = this.title;
			}
		}
	}
}

ChartTitle.markup = `
		<cq-clickable role="button" cq-selector="cq-lookup-dialog" cq-method="open" title="Symbol Search">
			<cq-symbol class="hide-outline"></cq-symbol>
		</cq-clickable>
		<cq-menu class="ciq-menu ciq-period" title="Interval Selector">
			<span><cq-clickable stxbind="Layout.periodicity">1D</cq-clickable></span>
			<cq-menu-dropdown cq-lift>
				<cq-menu-container cq-name="menuPeriodicity"></cq-menu-container>
			</cq-menu-dropdown>
		</cq-menu>
		<cq-chart-price>
			<cq-current-price cq-animate></cq-current-price>
			<cq-change>
				<div class="ico"></div>
				<cq-todays-change></cq-todays-change>
				<cq-todays-change-pct></cq-todays-change-pct>
			</cq-change>
		</cq-chart-price>
		<div class="exchange"></div>
	`;
CIQ.UI.addComponentDefinition("cq-chart-title", ChartTitle);
