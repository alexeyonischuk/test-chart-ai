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


let __js_advanced_studies_pring_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error("pring feature requires first activating studies feature.");
} else {
	CIQ.Studies.calculateKST = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";
		var roc = {},
			smp = {};
		roc[1] = Number(sd.inputs["Lightest Rate of Change Period"]);
		roc[2] = Number(sd.inputs["Light Rate of Change Period"]);
		roc[3] = Number(sd.inputs["Heavy Rate of Change Period"]);
		roc[4] = Number(sd.inputs["Heaviest Rate of Change Period"]);
		smp[1] = Number(sd.inputs["Lightest SMA Period"]);
		smp[2] = Number(sd.inputs["Light SMA Period"]);
		smp[3] = Number(sd.inputs["Heavy SMA Period"]);
		smp[4] = Number(sd.inputs["Heaviest SMA Period"]);
		var sp = Number(sd.inputs["Signal Period"]);
		var i, j;
		for (i = sd.startFrom; i < quotes.length; i++) {
			if (!quotes[i]) continue;
			for (j = 1; j <= 4; j++) {
				if (
					i >= roc[j] &&
					quotes[i - roc[j]] &&
					CIQ.Studies.getQuoteFieldValue(quotes[i - roc[j]], field)
				)
					quotes[i]["_ROC" + j + " " + sd.name] =
						100 *
						(CIQ.Studies.getQuoteFieldValue(quotes[i], field) /
							CIQ.Studies.getQuoteFieldValue(quotes[i - roc[j]], field) -
							1);
			}
		}
		for (j = 1; j <= 4; j++) {
			CIQ.Studies.MA(
				"simple",
				smp[j],
				"_ROC" + j + " " + sd.name,
				0,
				"_SMA" + j,
				stx,
				sd
			);
		}
		for (i = sd.startFrom; i < quotes.length; i++) {
			quotes[i]["KST " + sd.name] = null;
			for (j = 1; j <= 4; j++) {
				var val = quotes[i]["_SMA" + j + " " + sd.name];
				if (val || val === 0) quotes[i]["KST " + sd.name] += j * val;
			}
		}
		CIQ.Studies.MA("simple", sp, "KST " + sd.name, 0, "KSTSignal", stx, sd);
	};

	CIQ.Studies.calculateSpecialK = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";
		var span = sd.inputs.Interval;
		if (!span) span = "daily";
		var roc = {
			daily: [10, 15, 20, 30, 50, 65, 75, 100, 195, 265, 390, 530],
			weekly: [4, 5, 6, 8, 10, 13, 15, 20, 39, 52, 78, 104]
		};
		var map = {
			daily: [10, 10, 10, 15, 50, 65, 75, 100, 130, 130, 130, 195],
			weekly: [4, 5, 6, 8, 10, 13, 15, 20, 26, 26, 26, 39]
		};
		var i, j;
		for (i = sd.startFrom; i < quotes.length; i++) {
			if (!quotes[i]) continue;
			for (j = 0; j < roc[span].length; j++) {
				if (
					i >= roc[span][j] &&
					CIQ.Studies.getQuoteFieldValue(quotes[i - roc[span][j]], field) !==
						null
				)
					quotes[i]["_ROC" + j + " " + sd.name] =
						100 *
						(CIQ.Studies.getQuoteFieldValue(quotes[i], field) /
							CIQ.Studies.getQuoteFieldValue(quotes[i - roc[span][j]], field) -
							1);
			}
		}
		for (j = 0; j < map[span].length; j++) {
			CIQ.Studies.MA(
				span == "daily" ? "simple" : "exponential",
				map[span][j],
				"_ROC" + j + " " + sd.name,
				0,
				"_MA" + j,
				stx,
				sd
			);
		}
		for (i = sd.startFrom; i < quotes.length; i++) {
			quotes[i]["Result " + sd.name] = null;
			for (j = 0; j < map[span].length; j++) {
				var val = quotes[i]["_MA" + j + " " + sd.name];
				if (val || val === 0)
					quotes[i]["Result " + sd.name] += ((j % 4) + 1) * val;
			}
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Pring KST": {
			name: "Pring's Know Sure Thing",
			calculateFN: CIQ.Studies.calculateKST,
			inputs: {
				Field: "field",
				"Lightest Rate of Change Period": 10,
				"Lightest SMA Period": 10,
				"Light Rate of Change Period": 15,
				"Light SMA Period": 10,
				"Heavy Rate of Change Period": 20,
				"Heavy SMA Period": 10,
				"Heaviest Rate of Change Period": 30,
				"Heaviest SMA Period": 15,
				"Signal Period": 9
			},
			outputs: { KST: "#00DD00", KSTSignal: "#FF0000" }
		},
		"Pring Sp-K": {
			name: "Pring's Special K",
			calculateFN: CIQ.Studies.calculateSpecialK,
			inputs: { Field: "field", Interval: ["daily", "weekly"] }
		}
	});
}

};
__js_advanced_studies_pring_(typeof window !== "undefined" ? window : global);
