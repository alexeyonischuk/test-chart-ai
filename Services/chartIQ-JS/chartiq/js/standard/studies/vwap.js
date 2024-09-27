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


import { CIQ as _CIQ, timezoneJS as _timezoneJS } from "../../../js/chartiq.js";
import "../../../js/standard/studies.js";


let __js_standard_studies_vwap_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;
var timezoneJS =
	typeof _timezoneJS !== "undefined" ? _timezoneJS : _exports.timezoneJS;

if (!CIQ.Studies) {
	console.error("vwap feature requires first activating studies feature.");
} else {
	/**
	 * Calculate function for VWAP.
	 *
	 * Cumulative values are calculated on a daily basis.
	 * The start of the day is calculated based on the particular market start time.
	 * As such, you may need to review your market definitions and symbology for this study to properly work with your data as the default assumptions may not totally match.
	 * More information on setting market hours and symbology rules can be found here: {@link CIQ.Market}
	 *
	 * In our calculations, the beginning of the Forex day is 17:00 NY Time.
	 * The chart will be adjusted as needed to reflect this time in the browser time zone (or any specificaly set display zone).
	 *
	 * @param  {CIQ.ChartEngine} stx Chart object
	 * @param  {object} sd  Study Descriptor
	 * @memberof CIQ.Studies
	 * @since 7.0.0 Used for AVWAP calculation as well.
	 */
	CIQ.Studies.calculateVWAP = function (stx, sd) {
		if ((sd.parameters.state || {}).interactiveAdd) return;
		const { inputs, name, chart } = sd;
		const { market } = chart;
		const avwap = sd.type === "AVWAP";
		const quotes = chart.scrubbed;

		if (!quotes.length) return;

		if (!avwap && CIQ.ChartEngine.isDailyInterval(stx.layout.interval)) {
			sd.error = "VWAP is Intraday Only";
			return;
		}

		let field = "hlc/3";
		if (avwap) {
			field = inputs.Field;
			if (!field || field == "field") {
				field = inputs.Field = "hlc/3";
				stx.changeOccurred("layout");
			}
		}
		let marketOffset = null;
		let volume = 0;
		let volume_price = 0;
		let volume_price2 = 0;
		let hasThereBeenVolume = false;

		if (sd.startFrom > 1) {
			volume = quotes[sd.startFrom - 1]["_V " + name] || 0;
			volume_price = quotes[sd.startFrom - 1]["_VxP " + name] || 0;
			volume_price2 = quotes[sd.startFrom - 1]["_VxP2 " + name] || 0;
		}
		if (avwap) {
			const { market_tz } = market.market_def || {};
			const [, YYYY, MM, dd] =
				(inputs["Anchor Date"] || "").match(/^(\d{4})-?(\d{2})-?(\d{2})$/) ||
				[];
			const [, hh = 0, mm = 0, ss = 0] =
				(inputs["Anchor Time"] || "").match(/^(\d{2}):?(\d{2}):?(\d{2})?$/) ||
				[];

			if (![YYYY, MM, dd].every((x) => x || x === 0)) {
				sd.error = "Invalid Anchor Date";
				return;
			}

			const anchorDate = new timezoneJS.Date(
				YYYY,
				MM - 1,
				dd,
				hh,
				mm,
				ss,
				market_tz || ""
			);

			if (!sd.startFrom && anchorDate >= quotes[0].DT) {
				sd.startFrom = stx.tickFromDate(anchorDate, stx.chart, null, true);
			}

			if (inputs["Anchor Selector"]) CIQ.Studies.initAnchorHandle(stx, sd);
			else CIQ.Studies.removeAnchorHandle(stx, sd);
		}
		for (let i = sd.startFrom; i < quotes.length; i++) {
			if (!avwap) {
				if (marketOffset === null) {
					//possible new daily period
					marketOffset = CIQ.Studies.getMarketOffset({
						stx,
						localQuoteDate: quotes[i].DT,
						shiftToDateBoundary: true
					});
				}
				if (quotes[i - 1] && quotes[i - 1].DT) {
					const newDate = new Date(
						new Date(+quotes[i].DT).setMilliseconds(
							quotes[i].DT.getMilliseconds() + marketOffset
						)
					);
					const oldDate = new Date(
						new Date(+quotes[i - 1].DT).setMilliseconds(
							quotes[i - 1].DT.getMilliseconds() + marketOffset
						)
					);
					if (
						oldDate.getDate() !== newDate.getDate() &&
						stx.chart.market.isMarketDate(newDate)
					) {
						//new daily period
						marketOffset = null;
						volume = volume_price = volume_price2 = 0;
					}
				}
			}
			const price = quotes[i][field];
			let thisVolume = quotes[i].Volume;
			if (avwap && !thisVolume) thisVolume = 1;
			volume += thisVolume;
			volume_price += thisVolume * price;
			volume_price2 += thisVolume * price * price;
			if (!avwap && !volume) continue;
			quotes[i]["_V " + name] = volume;
			quotes[i]["_VxP " + name] = volume_price;
			quotes[i]["_VxP2 " + name] = volume_price2;
			const sdev = (quotes[i]["_SDVWAP " + name] = Math.sqrt(
				Math.max(0, volume_price2 / volume - Math.pow(volume_price / volume, 2))
			));
			const vwap = (quotes[i]["VWAP " + name] = volume_price / volume);
			for (let j = 1; j <= 3; j++) {
				quotes[i]["SDVWAP" + j + "+ " + name] = vwap + j * sdev;
				quotes[i]["SDVWAP" + j + "- " + name] = vwap - j * sdev;
			}
			hasThereBeenVolume = true;
		}
		for (let n in sd.outputMap) {
			if (n.indexOf("VWAP") !== 0) delete sd.outputMap[n];
		}
		for (let k = 1; k <= 3; k++) {
			if (inputs["Display " + k + " Standard Deviation (" + k + "\u03C3)"]) {
				sd.outputMap["SDVWAP" + k + "+ " + name] =
					k + " Standard Deviation (" + k + "\u03C3)";
				sd.outputMap["SDVWAP" + k + "- " + name] =
					k + " Standard Deviation (" + k + "\u03C3)";
			}
		}
		if (!avwap && !hasThereBeenVolume) {
			sd.error = "VWAP Requires Volume";
		}
	};

	/**
	 * Initializes Anchored VWAP study
	 *
	 * Specifically, sets the anchor date and time to the first dataSegment record if it's left blank
	 *
	 * If `parameters.interactiveAdd` is true, the study will be added in "interactive add" mode. This
	 * means that the study will be added, but in an incomplete state. In this case, tapping on the chart
	 * is required to complete the study. This allows the user to specify the desired anchor time.
	 *
	 * The "interactive add" mode will not be used (even if specified) if the anchor time is already
	 * specified in the study inputs.
	 *
	 * @param {CIQ.ChartEngine} stx	The chart object
	 * @param {string} type Study type
	 * @param {object} inputs Study inputs
	 * @param {object} outputs Study outputs
	 * @param {object} parameters Study parameters
	 * @param {string} panel ID of the study's panel element
	 * @return {CIQ.Studies.StudyDescriptor} Study descriptor object
	 *
	 * @memberof CIQ.Studies
	 * @private
	 * @since
	 * - 6.3.0
	 * - 8.4.0 `parameters.interactiveAdd` added.
	 */
	CIQ.Studies.initAnchoredVWAP = function (
		stx,
		type,
		inputs,
		outputs,
		parameters,
		panel
	) {
		if (!parameters.state) parameters.state = {};
		const { interactiveAdd, interactiveAddCB, state } = parameters;
		const unanchored = !(inputs["Anchor Date"] || inputs["Anchor Time"]);

		if (
			// if state specifies `interactiveAdd` and we're calling init again
			// _without_ an anchor something has gone wrong, remove study
			// also, do not allow doubling up on study adds
			unanchored &&
			(state.interactiveAdd || stx.repositioningAnchorSelector)
		) {
			return "abort";
		}

		const { dataSegment } = stx.chart;
		if (dataSegment && unanchored && !interactiveAdd) {
			for (let i = 0; i < dataSegment.length; i++) {
				if (dataSegment[i]) {
					const { DT } = dataSegment[i];
					inputs["Anchor Date"] = CIQ.dateToStr(DT, "YYYY-MM-dd");
					inputs["Anchor Time"] = CIQ.dateToStr(DT, "HH:mm:ss");
					break;
				}
			}
		}

		if (unanchored && interactiveAdd) {
			state.interactiveAdd = true;
		} else {
			delete state.interactiveAdd;
			delete parameters.interactiveAdd;
			if (interactiveAddCB) setTimeout(interactiveAddCB);
		}

		const sd = CIQ.Studies.initializeFN(
			stx,
			type,
			inputs,
			outputs,
			parameters,
			panel
		);

		if (state.interactiveAdd) {
			stx.repositioningAnchorSelector = { sd, tapToAdd: true };
			stx.dispatch("notification", "addAVWAP");
		} else {
			stx.dispatch("notification", "removeAVWAP");
		}

		return sd;
	};

	CIQ.Studies.displayVWAP = function (stx, sd, quotes) {
		if (!quotes || !quotes[0]) {
			CIQ.Studies.removeAnchoredVWAP(stx, sd);
			return;
		}
		CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);

		var displayS1 = sd.inputs["Display 1 Standard Deviation (1\u03C3)"];
		var displayS2 = sd.inputs["Display 2 Standard Deviation (2\u03C3)"];
		var displayS3 = sd.inputs["Display 3 Standard Deviation (3\u03C3)"];

		if ((displayS1 || displayS2 || displayS3) && sd.inputs.Shading) {
			var panel = stx.panels[sd.panel];
			var params = {
				opacity: sd.parameters.opacity ? sd.parameters.opacity : 0.2,
				skipTransform: panel.name != sd.chart.name,
				yAxis: sd.getYAxis(stx)
			};
			if (!sd.highlight && stx.highlightedDraggable) params.opacity *= 0.3;

			var bottomBandP = "VWAP " + sd.name,
				bottomBandN = "VWAP " + sd.name;
			if (displayS1) {
				CIQ.prepareChannelFill(
					stx,
					CIQ.extend(
						{
							panelName: sd.panel,
							topBand: "SDVWAP1+ " + sd.name,
							bottomBand: bottomBandP,
							color: CIQ.Studies.determineColor(
								sd.outputs[sd.outputMap["SDVWAP1+ " + sd.name]]
							)
						},
						params
					)
				);
				CIQ.prepareChannelFill(
					stx,
					CIQ.extend(
						{
							panelName: sd.panel,
							topBand: "SDVWAP1- " + sd.name,
							bottomBand: bottomBandN,
							color: CIQ.Studies.determineColor(
								sd.outputs[sd.outputMap["SDVWAP1- " + sd.name]]
							)
						},
						params
					)
				);
				bottomBandP = "SDVWAP1+ " + sd.name;
				bottomBandN = "SDVWAP1- " + sd.name;
			}
			if (displayS2) {
				CIQ.prepareChannelFill(
					stx,
					CIQ.extend(
						{
							panelName: sd.panel,
							topBand: "SDVWAP2+ " + sd.name,
							bottomBand: bottomBandP,
							color: CIQ.Studies.determineColor(
								sd.outputs[sd.outputMap["SDVWAP2+ " + sd.name]]
							)
						},
						params
					)
				);
				CIQ.prepareChannelFill(
					stx,
					CIQ.extend(
						{
							panelName: sd.panel,
							topBand: "SDVWAP2- " + sd.name,
							bottomBand: bottomBandN,
							color: CIQ.Studies.determineColor(
								sd.outputs[sd.outputMap["SDVWAP2- " + sd.name]]
							)
						},
						params
					)
				);
				bottomBandP = "SDVWAP2+ " + sd.name;
				bottomBandN = "SDVWAP2- " + sd.name;
			}
			if (displayS3) {
				CIQ.prepareChannelFill(
					stx,
					CIQ.extend(
						{
							panelName: sd.panel,
							topBand: "SDVWAP3+ " + sd.name,
							bottomBand: bottomBandP,
							color: CIQ.Studies.determineColor(
								sd.outputs[sd.outputMap["SDVWAP3+ " + sd.name]]
							)
						},
						params
					)
				);
				CIQ.prepareChannelFill(
					stx,
					CIQ.extend(
						{
							panelName: sd.panel,
							topBand: "SDVWAP3- " + sd.name,
							bottomBand: bottomBandN,
							color: CIQ.Studies.determineColor(
								sd.outputs[sd.outputMap["SDVWAP3- " + sd.name]]
							)
						},
						params
					)
				);
			}
		}

		if (sd.anchorHandle || (sd.parameters.state || {}).interactiveAdd) {
			CIQ.Studies.displayAnchorHandleAndLine(stx, sd, quotes);
		}
	};

	/**
	 * Removes an Anchored Volume Weighted Average Price (AVWAP) study and cleans up any
	 * 		associated components.
	 *
	 * @param  {CIQ.ChartEngine} stx Chart object
	 * @param  {object} sd  Study Descriptor
	 *
	 * @memberof CIQ.Studies
	 * @private
	 * @since 8.4.0
	 */
	CIQ.Studies.removeAnchoredVWAP = function (stx, sd) {
		stx.dispatch("notification", "removeAVWAP");
		CIQ.Studies.removeAnchorHandle(stx, sd);
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		AVWAP: {
			name: "Anchored VWAP",
			overlay: true,
			calculateFN: CIQ.Studies.calculateVWAP,
			seriesFN: CIQ.Studies.displayVWAP,
			initializeFN: CIQ.Studies.initAnchoredVWAP,
			removeFN: CIQ.Studies.removeAnchoredVWAP,
			inputs: {
				Field: "field",
				"Anchor Date": "",
				"Anchor Time": "",
				"Display 1 Standard Deviation (1\u03C3)": false,
				"Display 2 Standard Deviation (2\u03C3)": false,
				"Display 3 Standard Deviation (3\u03C3)": false,
				Shading: false,
				"Anchor Selector": true
			},
			outputs: {
				VWAP: "#FF0000",
				"1 Standard Deviation (1\u03C3)": "#e1e1e1",
				"2 Standard Deviation (2\u03C3)": "#85c99e",
				"3 Standard Deviation (3\u03C3)": "#fff69e"
			},
			parameters: {
				init: {
					opacity: 0.2,
					interactiveAdd: true
				}
			},
			attributes: {
				"Anchor Date": { placeholder: "yyyy-mm-dd" },
				"Anchor Time": { placeholder: "hh:mm:ss", step: 1 }
			}
		},
		VWAP: {
			name: "VWAP",
			overlay: true,
			calculateFN: CIQ.Studies.calculateVWAP,
			seriesFN: CIQ.Studies.displayVWAP,
			inputs: {
				"Display 1 Standard Deviation (1\u03C3)": false,
				"Display 2 Standard Deviation (2\u03C3)": false,
				"Display 3 Standard Deviation (3\u03C3)": false,
				Shading: false
			},
			outputs: {
				VWAP: "#FF0000",
				"1 Standard Deviation (1\u03C3)": "#e1e1e1",
				"2 Standard Deviation (2\u03C3)": "#85c99e",
				"3 Standard Deviation (3\u03C3)": "#fff69e"
			},
			parameters: {
				init: { opacity: 0.2 }
			}
		}
	});
}

};
__js_standard_studies_vwap_(typeof window !== "undefined" ? window : global);
