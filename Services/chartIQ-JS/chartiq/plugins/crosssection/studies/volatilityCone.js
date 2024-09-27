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

import "./volatility.js";

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : {}.CIQ;

if (!CIQ.Studies) {
	console.error(
		"volatilityIndex feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.calculateVolatilityCone = function (stx, sd) {
		const { periodicity, interval } = stx.layout;
		const studyName = sd.study ? sd.study.name : sd.type;
		if (!CIQ.ChartEngine.isDailyInterval(interval)) {
			sd.error = `${studyName} is not supported for intraday periodicities`;
			return;
		}
		let periods = Number(sd.inputs["Projection Bars"]);
		let totalIncrements = Number(sd.inputs["Days Per Year"]);

		if (interval == "week") totalIncrements = 52;
		if (interval == "month") totalIncrements = 12;
		periods = Math.min(periods, totalIncrements);

		const quotes = sd.chart.scrubbed;
		let field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";

		let start = quotes.length - 1;
		while (start > 0 && quotes[start][field] === undefined) {
			start--;
		}

		const startDate = quotes[start].DT;
		const currentValue = quotes[start][field];
		const implVol = quotes[start].implVol;
		const oneDay = 24 * 60 * 60 * 1000;

		const useHistoric = sd.inputs["Volatility source"] === "historical";
		if (!useHistoric && implVol === undefined) {
			sd.error = `${studyName} Study: Implied Volatility source data is not available`;
			return;
		}

		sd._graphs = [68, 95].filter(
			(value, index) => sd.inputs[`Probability ${value}% (${index + 1}σ)`]
		);

		// Add qoutes placeholders
		const futureTicks = [];
		if (!useHistoric && interval === "day" && periodicity === 1) {
			const expiryDates =
				quotes[start].expiryDates ||
				Array.from(
					new Set(
						Object.values(quotes[start].optionChain || {})
							.map(
								({ expiration }) =>
									+((expiration && expiration.value) || expiration || 0)
							)
							.filter((expiration) => expiration)
					)
				);
			sd._expiryDates = expiryDates.map((dt) => ({
				dt: new Date(dt)
			}));
		} else {
			sd._expiryDates = null;
		}

		for (let i = 0; i <= periods; i++) {
			if (quotes[i + start]) continue;
			futureTicks.push({
				[(sd.inputs["Probability 68% (1σ)"] && "Result 68% Upper " + sd.name) ||
				undefined]: 0,
				[(sd.inputs["Probability 95% (2σ)"] && "Result 95% Upper " + sd.name) ||
				undefined]: 0
			});
		}
		sd.appendFutureTicks(stx, futureTicks);
		if (useHistoric) {
			CIQ.Studies.calculateHistoricalVolatility(stx, sd);
		}
		const volatilityValue = useHistoric
			? quotes[start][`Result ${sd.name}`] / 100
			: implVol;

		for (let i = 0; i <= periods; i++) {
			const quote = quotes[i + start];
			const increments =
				totalIncrements < 365 ? i : Math.round((quote.DT - startDate) / oneDay);
			const diff =
				currentValue *
				volatilityValue *
				Math.sqrt(increments / totalIncrements);
			const { DT } = quote;

			sd._graphs.forEach(
				function (graph) {
					const { quote, diff, currentValue, sd } = this;
					const upper = currentValue + (graph < 95 ? 1 : 2) * diff;
					const lower = currentValue - (graph < 95 ? 1 : 2) * diff;
					quote[`Result ${graph}% Upper ${sd.name}`] = upper;
					quote[`Result ${graph}% Lower ${sd.name}`] = lower;

					(sd._expiryDates || []).forEach((item) => {
						if (item.dt < startDate) return;

						const diff = Math.abs(item.dt - DT);
						if (diff < oneDay) {
							item.Upper = upper;
							item.Lower = lower;
							item.DT = DT;
						}
					});
				},
				{ quote, diff, currentValue, sd }
			);
		}

		sd.outputMap = {};
		sd._graphs.forEach((graph) => {
			sd.outputMap[`Result ${graph}% Upper ${sd.name}`] = "Color";
			sd.outputMap[`Result ${graph}% Lower ${sd.name}`] = "Color";
		});
	};

	CIQ.Studies.displayVolatilityCone = function (stx, sd, quotes) {
		if (sd.error) return;
		if (!sd._graphs) return;

		const color = CIQ.Studies.determineColor(sd.outputs.Color);

		const panel = stx.panels[sd.panel];
		if (!panel || panel.hidden) return;

		const yAxis = sd.getYAxis(stx);
		const parameters = {
			topColor: color,
			bottomColor: color,
			skipTransform: panel.name != sd.chart.name,
			topAxis: yAxis,
			bottomAxis: yAxis,
			opacity: 0.3
		};
		if (!sd.highlight && stx.highlightedDraggable) parameters.opacity *= 0.3;
		sd._graphs.forEach((probability) => {
			parameters.topBand = `Result ${probability}% Upper ${sd.name}`;
			parameters.bottomBand = `Result ${probability}% Lower ${sd.name}`;
			if (sd.inputs.Fill) {
				CIQ.fillIntersecting(stx, sd.panel, parameters);
			}
			CIQ.Studies.displayIndividualSeriesAsLine(
				stx,
				sd,
				panel,
				parameters.topBand,
				quotes
			);
			CIQ.Studies.displayIndividualSeriesAsLine(
				stx,
				sd,
				panel,
				parameters.bottomBand,
				quotes
			);
		});
		if (sd._expiryDates) {
			const context = stx.chart.context;
			stx.startClip();
			context.beginPath();
			sd._expiryDates.forEach((item) => {
				if (!item.DT) return;
				const x = stx.pixelFromDate(item.DT);
				const y0 = stx.pixelFromPrice(item.Upper, panel);
				const y1 = stx.pixelFromPrice(item.Lower, panel);
				stx.plotLine({
					x0: x,
					x1: x,
					y0,
					y1,
					color,
					pattern: "dashed"
				});
				context.moveTo(x, y0);
				context.arc(x, y0, 3, 0, Math.PI * 2, false);
				context.moveTo(x, y1);
				context.arc(x, y1, 3, 0, Math.PI * 2, false);
				context.fillStyle = color;
				context.fill();
			});
			stx.endClip();
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Volatility Cone": {
			name: "Volatility Cone",
			overlay: true,
			calculateFN: CIQ.Studies.calculateVolatilityCone,
			seriesFN: CIQ.Studies.displayVolatilityCone,
			inputs: {
				"Volatility source": ["historical", "implied"],
				"Probability 68% (1σ)": true,
				"Probability 95% (2σ)": false,
				"Projection Bars": 20,
				"Days Per Year": [252, 365],
				Field: "field",
				Period: 10,
				"Standard Deviations": 1,
				Fill: true
			},
			outputs: {
				Color: "#3a627d"
			},
			panelSelect: false,
			attributes: {
				"Volatility source": {
					hidden: function () {
						return !CIQ.Studies.impliedVolatilityAvailable;
					}
				},
				Field: {
					hidden: function () {
						return this.inputs["Volatility source"] === "Implied";
					}
				},
				"Standard Deviations": {
					hidden: function () {
						return this.inputs["Volatility source"] === "Implied";
					}
				},
				yaxisDisplayValue: { hidden: true },
				panelName: { hidden: true },
				flippedEnabled: { hidden: true },
				underlayEnabled: { hidden: true }
			}
		}
	});
}
