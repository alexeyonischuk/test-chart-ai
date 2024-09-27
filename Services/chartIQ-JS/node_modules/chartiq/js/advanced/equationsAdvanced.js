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
import "../../js/standard/equations.js";


let __js_advanced_equationsAdvanced_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.computeEquationChart) {
	console.error(
		"equationsAdvanced feature requires first activating equations feature."
	);
} else {
	/**
	 * Extracts symbols from an equation.  An equation can consist of symbols and the following operators: +-/*%()
	 * PEMDAS order is followed.  Additionally, symbols can be enclosed in brackets [] to treat them as literal non-parseables.
	 * @param {string} equation The equation to parse (e.g., IBM+GE)
	 * @return  {object} Parsed equation, {equation: [formatted equation], symbols: [array of symbols found in the equation]}
	 * @memberOf CIQ
	 * @version ChartIQ Advanced Package
	 */
	CIQ.formatEquation = function (equation) {
		var eq = "";
		var syms = [];
		var thisSym = "";
		var lockSymbol = false;
		for (var j = 1; j < equation.length; j++) {
			var c = equation[j]; //.toUpperCase();  // let's not capitalize automatically
			if (c == "[" && !lockSymbol) {
				lockSymbol = true;
			} else if (c == "]" && lockSymbol) {
				lockSymbol = false;
				if (thisSym !== "") {
					syms.push(thisSym);
					eq += "[" + thisSym + "]";
				}
				thisSym = "";
			} else if (lockSymbol) {
				thisSym += c;
			} else if (
				c == "+" ||
				c == "-" ||
				c == "*" ||
				c == "/" ||
				c == ":" ||
				c == "%" ||
				c == "(" ||
				c == ")"
			) {
				if (thisSym !== "" && isNaN(thisSym)) {
					syms.push(thisSym);
					eq += "[" + thisSym + "]";
				} else {
					eq += thisSym;
				}
				if (c == ":") c = "/";
				eq += c;
				thisSym = "";
			} else if (c != " ") {
				thisSym += c;
			}
		}
		if (thisSym !== "" && isNaN(thisSym)) {
			syms.push(thisSym);
			eq += "[" + thisSym + "]";
		} else {
			eq += thisSym;
		}
		return { equation: eq, symbols: syms };
	};

	/**
	 * Extracts symbols from an equation and fetches the quotes for them.
	 * @param {object} params Parameters used for the fetch
	 * @param  {function} cb Callback function once all quotes are fetched
	 * @memberOf CIQ
	 * @version ChartIQ Advanced Package
	 */
	CIQ.fetchEquationChart = function (params, cb) {
		var formEq = CIQ.formatEquation(params.symbol);
		var syms = formEq.symbols;
		var arr = [];
		// jump through hoops with stx so that CIQ.clone doesn't choke on it
		var stx = params.stx;
		params.stx = null;
		for (var i = 0; i < syms.length; i++) {
			var newParams = CIQ.shallowClone(params);
			newParams.stx = stx;
			newParams.symbol = syms[i];
			newParams.symbolObject = { symbol: syms[i] };
			arr.push(newParams);
		}
		params.stx = stx;
		// multi fetch the symbols we need
		stx.quoteDriver.multiFetch(arr, function (results) {
			var map = {};
			params.loadMoreReplace = true;
			var attribution = { charge: 0 };
			// error on any symbol then error out. Otherwise construct map.
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				if (result.dataCallback.error) {
					cb({ error: result.dataCallback.error });
					return;
				}
				map[result.params.symbol] = result.dataCallback.quotes;
				params.loadMoreReplace =
					params.loadMoreReplace && result.params.loadMoreReplace;
				params.moreToLoad =
					params.moreToLoad || result.dataCallback.moreAvailable;
				var dataCallbackAttribution = result.dataCallback.attribution;
				if (dataCallbackAttribution) {
					if (dataCallbackAttribution.charge)
						attribution.charge += dataCallbackAttribution.charge;
					attribution.source = dataCallbackAttribution.source;
					if (attribution.exchange === undefined)
						attribution.exchange = dataCallbackAttribution.exchange;
					else if (attribution.exchange != dataCallbackAttribution.exchange)
						attribution.exchange = ""; // mixed exchanges
				}
			}
			// compute the result and then pass to the response
			if (arr.length || !(params.loadMore || params.update)) {
				try {
					var equQuotes = CIQ.computeEquationChart(formEq.equation, map);
					cb({
						quotes: equQuotes,
						moreAvailable: params.moreToLoad,
						attribution: attribution
					});
				} catch (e) {
					var error = { error: "Invalid equation: " + formEq.equation };
					if (e.name && e.name == "NoException") error.suppressAlert = true;
					cb(error);
				}
			}
		});
	};
}

};
__js_advanced_equationsAdvanced_(typeof window !== "undefined" ? window : global);
