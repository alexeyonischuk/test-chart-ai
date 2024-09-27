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
import "../../../js/standard/studies.js";


let __js_advanced_studies_chaikin_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error("chaikin feature requires first activating studies feature.");
} else {
	CIQ.Studies.calculateChaikinMoneyFlow = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days) {
			sd.error = true;
			return;
		}
		var sumMoneyFlow = 0,
			sumVolume = 0;
		var startQuote = quotes[sd.startFrom - 1];
		if (startQuote) {
			if (startQuote["_sumMF " + sd.name])
				sumMoneyFlow = startQuote["_sumMF " + sd.name];
			if (startQuote["_sumV " + sd.name])
				sumVolume = startQuote["_sumV " + sd.name];
		}
		for (var i = sd.startFrom; i < quotes.length; i++) {
			if (quotes[i].High == quotes[i].Low) quotes[i]["_MFV " + sd.name] = 0;
			else
				quotes[i]["_MFV " + sd.name] =
					(quotes[i].Volume *
						(2 * quotes[i].Close - quotes[i].High - quotes[i].Low)) /
					(quotes[i].High - quotes[i].Low);
			sumMoneyFlow += quotes[i]["_MFV " + sd.name];
			sumVolume += quotes[i].Volume;
			if (i > sd.days - 1) {
				sumMoneyFlow -= quotes[i - sd.days]["_MFV " + sd.name];
				sumVolume -= quotes[i - sd.days].Volume;
				if (sumVolume)
					quotes[i]["Result " + sd.name] = sumMoneyFlow / sumVolume;
			}
			quotes[i]["_sumMF " + sd.name] = sumMoneyFlow;
			quotes[i]["_sumV " + sd.name] = sumVolume;
		}
	};

	CIQ.Studies.calculateChaikinVolatility = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days) {
			sd.error = true;
			return;
		}
		var i;
		for (i = sd.startFrom; i < quotes.length; i++) {
			if (quotes[i].futureTick) break;
			quotes[i]["_High-Low " + sd.name] = quotes[i].High - quotes[i].Low;
		}
		CIQ.Studies.MA(
			sd.inputs["Moving Average Type"],
			sd.days,
			"_High-Low " + sd.name,
			0,
			"_MA",
			stx,
			sd
		);

		var roc = sd.inputs["Rate Of Change"];
		if (!roc) roc = sd.days;
		for (i = Math.max(sd.startFrom, roc); i < quotes.length; i++) {
			if (!quotes[i - roc]["_MA " + sd.name]) continue;
			if (quotes[i].futureTick) break;
			quotes[i]["Result " + sd.name] =
				100 *
				(quotes[i]["_MA " + sd.name] / quotes[i - roc]["_MA " + sd.name] - 1);
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Chaikin MF": {
			name: "Chaikin Money Flow",
			calculateFN: CIQ.Studies.calculateChaikinMoneyFlow,
			inputs: { Period: 20 }
		},
		"Chaikin Vol": {
			name: "Chaikin Volatility",
			calculateFN: CIQ.Studies.calculateChaikinVolatility,
			inputs: { Period: 14, "Rate Of Change": 2, "Moving Average Type": "ma" }
		}
	});
}

};
__js_advanced_studies_chaikin_(typeof window !== "undefined" ? window : global);
