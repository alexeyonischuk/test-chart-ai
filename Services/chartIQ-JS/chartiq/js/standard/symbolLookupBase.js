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
import "../../js/standard/quoteFeed.js";


let __js_standard_symbolLookupBase_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.ChartEngine.Driver) {
	console.error(
		"symbolLookupBase feature requires first activating quoteFeed feature."
	);
} else {
	/**
	 * Base class that drives the chart symbol lookup functionality.
	 *
	 * Provides back-end search functionality for the [cq-lookup]{@link WebComponents.Lookup}
	 * web component.
	 *
	 * You should derive your own lookup driver that interacts with your data feed (see the
	 * example below; also see the "Data Integration" section of the
	 * <a href="tutorial-Web%20Component%20Interface.html" target="_blank">Web Component Interface</a>
	 * tutorial).
	 *
	 * @param {string[]} exchanges Array of financial exchange names. The lookup driver searches
	 * 		the exchanges for symbols that match the text entered in the
	 * 		[cq-lookup]{@link WebComponents.Lookup} web component's input field.
	 * 		<p>**Note:** This parameter is overridden by the `cq-exchanges` attribute of
	 * 		[cq-lookup]{@link WebComponents.Lookup}.
	 *
	 * @constructor
	 * @name CIQ.ChartEngine.Driver.Lookup
	 * @since 6.0.0
	 *
	 * @see CIQ.UI.Context#setLookupDriver
	 * @see WebComponents.Lookup#setDriver
	 * @see CIQ.UI.Chart#initLookup
	 *
	 * @example <caption>Custom Implementation (See also the example in the
	 * 		[acceptText]{@link CIQ.ChartEngine.Driver.Lookup#acceptText} method.)</caption>
	 * CIQ.ChartEngine.Driver.Lookup.ChartIQ = function(exchanges) {
	 *     this.exchanges = exchanges;
	 *     if (!this.exchanges) this.exchanges = ["XNYS","XASE","XNAS","XASX","IND_CBOM","INDXASE","INDXNAS","IND_DJI","ARCX","INDARCX","forex"];
	 *     this.url = "https://symbols.chartiq.com/chiq.symbolserver.SymbolLookup.service";
	 *     this.requestCounter = 0;  // Invalidate old requests.
	 * };
	 *
	 * // Inherit all of the base lookup driver's properties.
	 * CIQ.inheritsFrom(CIQ.ChartEngine.Driver.Lookup.ChartIQ, CIQ.ChartEngine.Driver.Lookup);
	 */
	CIQ.ChartEngine.Driver.Lookup = function (exchanges) {};

	/**
	 * Accepts text entered by the user, searches financial exchanges for symbols that match the
	 * text, and returns an array of objects containing data that describes the matched symbols.
	 *
	 * You must implement this abstract method to fetch results from the exchanges you support and
	 * return the results by calling `cb(results_array)`. (See the example implementation below.)
	 *
	 * Elements in the results array should be in the following format:
	 * ```
	 * {
	 *     display: ["symbol ID", "symbol description", "exchange"],
	 *     data: {
	 *         symbol: "symbol ID",
	 *         name: "symbol description",
	 *         exchDis: "exchange"
	 *     }
	 * }
	 * ```
	 * (See the example results array below.)
	 *
	 * @param {string} text The text entered in the lookup component's input field.
	 * @param {string} [filter] Text indicating security type for the lookup server to filter.
	 * @param {number} maxResults Maximum number of results to return from the server.
	 * @param {function} cb Callback function to call when the search has returned results. The
	 * 		results are passed to the callback function in an array (see the examples below).
	 *
	 * @abstract
	 * @memberof CIQ.ChartEngine.Driver.Lookup
	 * @since 6.0.0
	 *
	 * @example <caption>Method Implementation (See also the example in
	 * 		{@link CIQ.ChartEngine.Driver.Lookup}.)</caption>
	 * CIQ.ChartEngine.Driver.Lookup.ChartIQ.prototype.acceptText = function(text, filter, maxResults, cb) {
	 *     if (filter == "FX") filter = "FOREX";
	 *     if (isNaN(parseInt(maxResults, 10))) maxResults = 100;
	 *     const url = this.url + "?t=" + encodeURIComponent(text) + "&m="+maxResults+"&x=[";
	 *     if (this.exchanges){
	 *         url += this.exchanges.join(",");
	 *     }
	 *     url += "]";
	 *     if (filter && filter.toUpperCase()! = "ALL") {
	 *         url += "&e=" + filter;
	 *     }
	 *
	 *     let counter = ++this.requestCounter;
	 *     const self = this;
	 *     function handleResponse(status, response){
	 *         if (counter < self.requestCounter) return;
	 *         if (status != 200) return;
	 *         try {
	 *             response = JSON.parse(response);
	 *             let symbols = response.payload.symbols;
	 *
	 *             let results = [];
	 *             for (let i = 0; i < symbols.length; i++) {
	 *                 let fields = symbols[i].split('|');
	 *                 let item = {
	 *                     symbol: fields[0],
	 *                     name: fields[1],
	 *                     exchDisp: fields[2]
	 *                 };
	 *                 results.push({
	 *                     display:[item.symbol, item.name, item.exchDisp],
	 *                     data:item
	 *                 });
	 *             }
	 *             cb(results);
	 *         } catch(e) {}
	 *     }
	 *     CIQ.postAjax({url: url, cb: handleResponse});
	 * };
	 *
	 * @example <caption>Sample Results Array</caption>
	 * [
	 *     { "display": ["A", "Agilent Technologies Inc", "NYSE"], "data": { "symbol": "A", "name": "Agilent Technologies Inc", "exchDisp": "NYSE" } },
	 *     { "display": ["AA", "Alcoa Corp", "NYSE"], "data": { "symbol": "AA", "name": "Alcoa Corp", "exchDisp": "NYSE" } }
	 * ];
	 */
	CIQ.ChartEngine.Driver.Lookup.prototype.acceptText = function (
		text,
		filter,
		maxResults,
		cb
	) {
		if (!this.cb) return;
	};
}

};
__js_standard_symbolLookupBase_(typeof window !== "undefined" ? window : global);
