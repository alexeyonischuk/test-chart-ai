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


import { CIQ } from "../../js/chartiq.js";
import "./signaliq.js";

const paintbarSelectOptions = [
	{
		optionName: "color",
		optionType: "colorPicker"
	}
];

CIQ.SignalIQ.notificationTypes.push({
	type: "paintbar",
	name: "Paintbar",
	options: paintbarSelectOptions,
	validation: (chartType) => chartType !== "kagi" && chartType !== "pandf"
});

/**
 * Namespace within CIQ.SignalIQ that represents painting a bar on an OHLC chart.
 *
 * @namespace CIQ.SignalIQ.Paintbar
 * @since 8.7.0
 */
CIQ.SignalIQ.Paintbar = function () {};
/**
 * Creates a signal as a "painted" OHLC bar.
 *
 * @param {CIQ.SignalIQ~NotificationData} data Parameters used to create paintbar.
 * @return {object} The object representing a painted bar.
 *
 * @static
 * @alias create
 * @memberof CIQ.SignalIQ.Paintbar
 * @since 8.7.0
 */
CIQ.SignalIQ.Paintbar.create = function ({
	signalData,
	markerSettings,
	isPlotSpecific,
	sd,
	stx,
	tick
}) {
	if (signalData.reveal) stx.signalIQ.toggleStudy(sd);
	if (isPlotSpecific) return;
	if (!stx.paintBars) {
		const injectionRef = stx.append(
			"drawSeries",
			CIQ.SignalIQ.Paintbar.getInjection(stx)
		);

		stx.paintBars = {
			paintedBars: new Set(),
			remove: () => {
				stx.removeInjection(injectionRef);
				delete stx.paintBars;
			}
		};
	}
	const { color } = markerSettings;
	const paintedBar = {
		uniqueKey: `${signalData.name}|${tick}|`,
		color,
		tick,
		sd,
		remove: () => {
			stx.paintBars.paintedBars.delete(paintedBar);
		}
	};

	stx.paintBars.paintedBars.add(paintedBar);
	return paintedBar;
};

CIQ.SignalIQ.Paintbar.getInjection = function (stx) {
	return function (chart) {
		const { params: parameters } = this.mainSeriesRenderer;
		if (["kagi", "pandf"].includes(parameters.type)) return;
		const { dataSegment } = chart,
			dataSegmentLength = dataSegment.length,
			firstDataElem = this.getFirstLastDataRecord(dataSegment, "tick"),
			studyOrder = Object.entries(stx.layout.studies)
				.filter(([, { signalData }]) => signalData)
				.reduce((acc, [key], i) => {
					acc[key] = i;
					return acc;
				}, {}),
			paintedBars = [...stx.paintBars.paintedBars].sort((a, b) => {
				if (a.tick === b.tick) {
					return studyOrder[b.sd.inputs.id] - studyOrder[a.sd.inputs.id];
				}
				return a.tick - b.tick;
			}),
			lastPaintedBar = paintedBars[paintedBars.length - 1],
			isBarType = ["candle", "bar"].includes(parameters.type),
			ticksByColor = {};
		if (
			firstDataElem &&
			lastPaintedBar &&
			lastPaintedBar.tick < firstDataElem.tick
		)
			return;

		let pointer = 0;
		for (let i = 0; i < dataSegmentLength; i++) {
			let dataElem = dataSegment[i],
				paintedBar = paintedBars[pointer];
			if (!paintedBar) break;
			if (!dataElem) continue;
			if (paintedBar.tick > dataSegment[dataSegmentLength - 1].tick) break;
			while (paintedBar.tick < dataElem.tick) {
				paintedBar = paintedBars[++pointer];
				if (!paintedBar) break;
			}
			if (!paintedBar) break;
			// skip disabled
			while (
				dataElem.tick === paintedBar.tick &&
				paintedBar.sd.disabled &&
				pointer < paintedBars.length - 1 &&
				dataElem.tick === paintedBars[pointer + 1].tick
			) {
				paintedBar = paintedBars[++pointer];
			}
			if (dataElem.tick === paintedBar.tick && !paintedBar.sd.disabled) {
				let { color } = paintedBar;
				pointer++;
				if (!ticksByColor[color]) ticksByColor[color] = new Set();
				ticksByColor[color].add(paintedBar.tick);
			}
		}

		this.startClip();
		if (isBarType) {
			const pixelWidth = this.mainSeriesRenderer.getPixelWidth();
			for (const color in ticksByColor) {
				if (parameters.hollow) {
					this.drawBarTypeChartInner({
						fillColor: "transparent",
						borderColor: color,
						type: parameters.type,
						condition: CIQ.ChartEngine.CANDLEUP,
						panel: chart.panel,
						field: parameters.field,
						yAxis: parameters.yAxis,
						volume: parameters.volume,
						highlight: parameters.highlight,
						tickFilter: ticksByColor[color],
						pixelWidth
					});
				}
				this.drawBarTypeChartInner({
					fillColor: color,
					borderColor: color,
					type: parameters.histogram ? "histogram" : parameters.type,
					condition: parameters.hollow ? CIQ.ChartEngine.CANDLEDOWN : null,
					panel: chart.panel,
					field: parameters.field,
					yAxis: parameters.yAxis,
					volume: parameters.volume && parameters.hollow,
					highlight: parameters.highlight,
					tickFilter: ticksByColor[color],
					pixelWidth
				});
				if (parameters.type === "candle" && ticksByColor[color].size > 0) {
					this.drawBarTypeChartInner({
						fillColor: color,
						borderColor: color,
						type: "shadow",
						condition: null,
						panel: chart.panel,
						field: parameters.field,
						yAxis: parameters.yAxis,
						volume: parameters.volume && parameters.hollow,
						highlight: parameters.highlight,
						tickFilter: ticksByColor[color],
						isDojiCandleOnly: true,
						pixelWidth
					});
				}
			}
		}
		if (!isBarType) {
			const { panel } = chart,
				{ step, style } = parameters;
			for (const color in ticksByColor) {
				const params = {
					color,
					step,
					tickFilter: ticksByColor[color]
				};
				if (["scatter"].includes(parameters.type)) {
					this.scatter(panel, params);
				} else {
					this.drawLineChart(panel, style, null, params);
				}
			}
		}
		this.endClip();
	};
};
