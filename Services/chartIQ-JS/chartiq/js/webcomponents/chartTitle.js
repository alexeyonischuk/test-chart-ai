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
import "../../js/webcomponents/clickable.js";
import "../../js/webcomponents/menu.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-chart-title&gt;</h4>
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute         | description |
 * | :---------------- | :---------- |
 * | display-exchange  | Display the exchange available in the chart symbol object |
 * | cq-previous-close | Updates the previousClose property, see the description below |
 * | cq-browser-tab    | Enables browser tab updates with instrument symbol and latest price |
 * | cq-activate-symbol-search-on-click | Enables click on the chart title to open symbol search dialog |
 *
 * In addition, the following attribute is also supported:
 * | attribute    | description |
 * | :----------- | :---------- |
 * | cq-marker    | Set to true to allow component to be properly positioned on a chart panel. |
 *
 * Note, if the `cq-marker` attribute is added to the element, and it is placed within the
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
 * @example <caption>Reset closing price</caption>
 * stx.loadChart(symbol, parameters, function(){
 *      document.querySelector("cq-chart-title").previousClose = yesterdays-closing-price;
 * }

 *
 * The `cq-animate` attribute in the `cq-current-price` element can be used to change the price color to red or green based on the previous value.
 * Setting the attribute to "fade" will introduce a transition effect on the price which, while attractive, uses considerable CPU when there are rapid updates.
 * @example <caption>cq-animate attribute</caption>
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
 * @example <caption>More descriptive display</caption>
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
 *  const queryUrl = this.url; // using filter:true for after hours
 *
 *  CIQ.postAjax(queryUrl, null, function(status, response){
 *   // process the HTTP response from the datafeed
 *   if(status==200){ // if successful response from datafeed
 *    params.stx.chart.symbolDisplay=response.fullName; // specify response name
 *    const newQuotes = quotefeed.formatChartData(response);
 *    cb({quotes:newQuotes, moreAvailable:true, attribution:{source:"simulator", exchange:"RANDOM"}}); // return the fetched data; init moreAvailable to enable pagination
 *   } else { // else error response from datafeed
 *    cb({error:(response?response:status)});	// specify error in callback
 *   }
 *  });
 * };
 *
 * @alias WebComponents.ChartTitle
 * @extends CIQ.UI.ModalTag
 * @class
 * @protected
 * @since
 * - 06-15-16
 * - 4.0.0 Browser tab now updates with stock symbol and latest price using `cq-browser-tab` attribute.
 * - 6.3.0 Negative close values are "N/A" change percentage.
 * - 6.3.0 Child tag `<cq-todays-change-pct>` is now optional.
 * - 8.8.0 Add `cq-activate-symbol-search-on-click` attribute.
 * - 9.1.0 Observes attributes.
 */

class ChartTitle extends CIQ.UI.ModalTag {
	static get observedAttributes() {
		return [
			"display-exchange",
			"cq-previous-close",
			"cq-browser-tab",
			"cq-activate-symbol-search-on-click"
		];
	}

	constructor() {
		super();
		/**
		 * Keep this value up to date in order to calculate change from yesterday's close.
		 * @type {number}
		 *
		 * @tsmember WebComponents.ChartTitle
		 */
		this.previousClose = null;
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ChartTitle);
		this.constructor = ChartTitle;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		if (this.listeners) {
			CIQ.UI.unobserveProperty(
				"symbolObject",
				this.context.stx.chart,
				this.listeners.symbolObject
			);
			CIQ.UI.unobserveProperty(
				"language",
				this.context.stx.preferences,
				this.listeners.language
			);
		}
		super.disconnectedCallback();
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (newValue === oldValue) return;
		this[name] = newValue;
		if (name === "display-exchange") {
			this.updateExchange();
			return;
		} else if (name === "cq-browser-tab") {
			this.updateBrowserTab = !["false", "0", null].includes(newValue);
		} else if (name === "cq-previous-close") {
			this.previousClose = +newValue;
		} else if (name === "cq-activate-symbol-search-on-click") {
			this.handleSymbolSearchChange();
		}
		this.update();
	}

	/**
	 * Begins the Title helper. This observes the chart and updates the title elements as necessary.
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	begin() {
		const self = this;

		this.addInjection("append", "createDataSet", function () {
			self.update();
		});
		this.update();
	}

	/**
	 * Initializes after context set, optionally calls `begin()`.
	 * @param {object} [params]
	 * @param {boolean} [params.autoStart] Set to true to call `begin` function.
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	initialize(params) {
		this.params = params ? params : {};
		if (typeof this.params.autoStart == "undefined")
			this.params.autoStart = true;
		this.marker = null;

		if (this.params.autoStart) this.begin();
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	setContext(context) {
		if (this.listeners) return;

		const stx = context.stx;

		let { markup } = this.constructor;
		this.handleSymbolSearchChange();
		this.addDefaultMarkup(this, markup);

		this.symbolDiv = this.querySelector("cq-symbol");
		this.symbolDescriptionDiv = this.querySelector("cq-symbol-description");
		this.currentPriceDiv = this.querySelector("cq-current-price");
		this.todaysChangeDiv = this.querySelector("cq-todays-change");
		this.todaysChangePctDiv = this.querySelector("cq-todays-change-pct");
		this.chartPriceDiv = this.querySelector("cq-chart-price");
		this.changeDiv = this.querySelector("cq-change");
		this.exchangeDiv = this.querySelector(".exchange");
		this.accessibleChange = this.querySelector("[accessiblechange]");

		this.listeners = {
			language: () => setTimeout(() => this.update(true), 100),
			symbolObject: () => this.updateExchange()
		};

		CIQ.UI.observeProperty(
			"language",
			stx.preferences,
			this.listeners.language
		);
		CIQ.UI.observeProperty(
			"symbolObject",
			stx.chart,
			this.listeners.symbolObject
		);

		this.initialize();
	}

	/**
	 * Updates exchange div element based on the chart engine symbol object
	 * @private
	 *
	 * @tsmember WebComponents.ChartTitle
	 * @since 9.1.0
	 */
	updateExchange() {
		if (!this.context) return;

		const { symbolObject } = this.context.stx.chart;
		const { exchangeDiv } = this;

		if (this.displayExchange != null && symbolObject.exchDisp) {
			exchangeDiv.innerText = `Exchange: ${symbolObject.exchDisp}`;
		} else if (symbolObject.static) {
			exchangeDiv.innerText = "STATIC";
		} else {
			exchangeDiv.innerText = "";
		}
	}

	/**
	 * Updates the values in the component.
	 *
	 * @param {boolean} force Update even when no price change
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	update(force) {
		if (!this.context) return;

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
			todaysChangePctDiv,
			accessibleChange
		} = this;
		const wrapper = this.closest("cq-context-wrapper");
		const isActiveChart =
			!wrapper || (wrapper && wrapper.classList.contains("active"));

		const doUpdateBrowserTab = this.updateBrowserTab && isActiveChart;
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
			let oldPrice = parseFloat(currentPriceDiv.nativePrice);
			if (currentPriceDiv.innerText !== textPrice) {
				currentPriceDiv.innerText = textPrice;
				currentPriceDiv.nativePrice = currentPrice;
				priceChanged = true;
				const attr = this.currentPriceDiv.getAttribute("cq-animate");
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
			force ||
			((doUpdatePrice || doUpdateBrowserTab) &&
				symbol &&
				(symbolChanged || priceChanged))
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
					if (todaysChangePct > 0)
						todaysChangeDisplay = "+" + todaysChangeDisplay;
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
			const up = todaysChange > 0 ? "+" : "";
			const accessibleString = `${up}${todaysChange} (${up}${todaysChangeDisplay})`;
			if (accessibleChange.innerText !== accessibleString)
				accessibleChange.innerText = accessibleString;

			currentPrice = currentPrice !== undefined ? currentPrice : "";
			todaysChange = todaysChange !== undefined ? todaysChange : "";

			if (doUpdateBrowserTab) {
				// These strange characters create some spacing so that the title appears
				// correctly in a browser tab
				let title =
					symbol + " \u200b \u200b " + textPrice + " \u200b \u200b \u200b ";
				if (todaysChange > 0) {
					title += "\u25b2 " + txtChange;
				} else if (todaysChange < 0) {
					title += "\u25bc " + txtChange;
				}

				this.ownerDocument.title = title;
			}
		}
	}

	/**
	 * Creates a clickable area for the symbol so tapping on the symbol will open a lookup component.
	 * Whether a clickable symbol is created depends on the value of `cq-activate-symbol-search-on-click` attribute.
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	handleSymbolSearchChange() {
		const symbolSearch = !["false", "0", null].includes(
			this.getAttribute("cq-activate-symbol-search-on-click")
		);

		const clickable = this.querySelector("[selector=cq-lookup-dialog]");
		const symbol = this.querySelector("cq-symbol");
		if (!clickable) return;
		if (symbolSearch) {
			clickable.append(symbol);
		} else {
			clickable.before(symbol);
		}
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.ChartTitle
 */
ChartTitle.markup = `
		<cq-clickable role="button" selector="cq-lookup-dialog" method="open" title="Symbol Search">
			<cq-symbol class="hide-outline"></cq-symbol>
		</cq-clickable>
		<cq-menu class="ciq-period" config="period" reader="Periodicity" text binding="Layout.periodicity" title="Interval Selector" lift-dropdown></cq-menu>
		<cq-chart-price>
			<span id="pricelabel" hidden>Current Price</span>
			<div role="group" aria-labelledby="pricelabel">
				<cq-current-price role="marquee" cq-animate></cq-current-price>
			</div>
			<span>
				<span id="changelabel" hidden>Change</span>
				<div role="group" aria-labelledby="changelabel">
					<div class="ciq-screen-reader" accessiblechange role="marquee"></div>
				</div>
				<cq-change aria-hidden="true">
					<div class="ico"></div>
					<cq-todays-change></cq-todays-change>
					<cq-todays-change-pct></cq-todays-change-pct>
				</cq-change>
			</span>
		</cq-chart-price>
		<div class="exchange"></div>
	`;
CIQ.UI.addComponentDefinition("cq-chart-title", ChartTitle);
