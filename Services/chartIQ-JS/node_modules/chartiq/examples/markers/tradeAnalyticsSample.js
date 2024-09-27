//
// Sample trade analytics with markers
// This file contains functions which create a sample implementation of post trade analysis using markers.  This file is meant to be used in conjunction with the markersSample.js file by extending the functionality of MarkersSample. There is a stylesheet which goes along with it as well.
// Usage: new MarkersSample(stxx);
//
import { CIQ, markers } from "../../js/standard.js";
import marker from "../../examples/markers/markersSample.js";
const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(
			/* webpackMode: "eager" */ "../../examples/markers/tradeAnalyticsSample.css"
		).then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["../../examples/markers/tradeAnalyticsSample.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(
			new URL(
				"../../examples/markers/tradeAnalyticsSample.css",
				import.meta.url
			).href,
			resolve
		);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, "tradeAnalyticsSample")); // a framework, such as Angular, may require style addition
CIQ.activateImports(markers);
const MarkersSample = marker.MarkersSample;
MarkersSample.registerType("trade", "showTradeAnalytics");
MarkersSample.prototype.showTradeAnalytics = function () {
	if (!CIQ.Marker.Performance) {
		return console.error(
			"tradeAnalyticsSample feature requires first activating highPerformanceMarkers feature."
		);
	}
	this.createTradeMarkers();
	return ["callout", "trade"];
};
MarkersSample.prototype.createTradeMarkers = function () {
	const { stx } = this;
	const { chart } = stx;
	const { dataSet, dataSegment } = chart;
	if (!(dataSet.length && dataSegment.length)) return;
	const story =
		"Like all ChartIQ markers, the object itself is managed by the chart, so when you scroll the chart the object moves with you. It is also destroyed automatically for you when the symbol is changed.";
	stx.addEvent("trade", {
		retoggle: true,
		noStorage: true,
		processResults: (stx, error, series, data) => {
			if (error) return;
			let shares = 0;
			// Loop through the data and create markers
			for (let record of data) {
				const datum = record.data;
				if (!datum) continue;
				datum.type = series.id;
				if (datum.headline === "execution") {
					CIQ.Marker({
						stx,
						label: series.id,
						xPositioner: "date",
						x: record.DT,
						node: new CIQ.Marker.Performance({
							type: "circle",
							category: "trade",
							displayCategory: false,
							headline: `Executed ${datum.size} at $${datum.value}`,
							story
						})
					});
					shares += datum.size;
					if (datum.sequence === 1) {
						const tick = stx.tickFromDate(record.DT);
						CIQ.Marker({
							stx,
							label: "trade",
							xPositioner: "date",
							x: record.DT,
							node: new CIQ.Marker.Performance({
								type: "callout",
								headline: "Begin Trade Period",
								category: "analysis",
								story: `Starting Price: ${
									tick < 0 ? "" : stx.chart.dataSet[tick].Open
								}\nFilled: 0\nExchange: ${stx.chart.market.market_def.name}`
							})
						});
					}
					if (datum.final) {
						const tick = stx.tickFromDate(record.DT);
						CIQ.Marker({
							stx,
							label: "trade",
							xPositioner: "date",
							x: record.DT,
							node: new CIQ.Marker.Performance({
								type: "callout",
								headline: "End Trade Period",
								category: "analysis",
								story: `Ending Price: ${
									tick < 0 ? "" : stx.chart.dataSet[tick].Close
								}\nFilled: ${shares}\nExchange: ${
									stx.chart.market.market_def.name
								}`
							})
						});
					}
				}
			}
			stx.draw();
		},
		takedownResults: (stx, id) => {
			this.activeLabels = this.activeLabels.filter((label) => label != id);
			CIQ.Marker.removeByLabel(stx, id);
		}
	});
};
export default marker;
