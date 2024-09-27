//
// Sample markers file
// This file contains functions which create sample markers.  There is a stylesheet which goes along with it as well.
// Usage: new MarkersSample(stxx);
//
import { CIQ, markers } from "../../js/standard.js";
import eventfeed from "../feeds/eventSimulator.js";
const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(
			/* webpackMode: "eager" */ "../../examples/markers/markersSample.css"
		).then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["../../examples/markers/markersSample.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(
			new URL("../../examples/markers/markersSample.css", import.meta.url).href,
			resolve
		);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, "markersSample")); // a framework, such as Angular, may require style addition
CIQ.activateImports(markers);
var MarkersSample = function (stx) {
	this.stx = stx;
	this.activeLabels = [];
	stx.attachQuoteFeed(
		eventfeed,
		{
			refreshInterval: 5,
			backgroundRefreshInterval: 60,
			bufferSize: 200
		},
		(params) => params.symbolObject.isEvent
	);
};
/**
 * The allowComparisonSeriesMarkers allows markers to be attached to a secondary series.
 * This example file will randomly select series on which to attach a marker when enabling markers.
 */
MarkersSample.allowComparisonSeriesMarkers = false;
/**
 * The specialTypes property provides a lookup of type -> method dictionary
 * that allows to extend MarketSample#showMarkers functionality with
 * additional event types not available in this file.
 * Use #registerType to populate it as it will provide additional extensibility in future
 */
MarkersSample.specialTypes = {};
/**
 * Registers new prototype method to as type handler be available in #showMarkers
 * When invoked the registered method will receive type and renderType parameters
 *
 * Example: register video event handler
 *
 *		MarkersSample.registerType('video', 'showVideoMarkers');
 *		MarkersSample.prototype.showVideoMarkers = function (type) {
 *		}
 *
 */
MarkersSample.registerType = function (type, methodName, overwrite) {
	if (this.specialTypes[type] && !overwrite) {
		console.error(
			"ERROR: failed to register event type " +
				type +
				". Event already registered"
		);
		return;
	}
	this.specialTypes[type] = methodName;
};
MarkersSample.prototype.processLabelsAndDraw = function (labels) {
	this.activeLabels = this.activeLabels.concat(labels);
	this.stx.draw();
	return labels;
};
MarkersSample.prototype.createMarkers = function (label, markerType) {
	var stx = this.stx;
	if (!stx.chart.dataSet) return;
	var self = this;
	if (stx.chart.series[label]) stx.removeEvent(label);
	stx.addEvent(label, {
		markerType: markerType || "Simple",
		retoggle: true,
		noStorage: true,
		processResults: function (stx, error, series, data) {
			if (error) return;
			var markerType = series.parameters.markerType || "Simple";
			var story =
				"Like all ChartIQ markers, the object itself is managed by the chart, so when you scroll the chart the object moves with you. It is also destroyed automatically for you when the symbol is changed.";
			// Loop through the data and create markers
			var i = 0;
			for (var record of data) {
				var datum = record.data;
				if (!datum) continue;
				datum.type = series.id;
				datum.story = story;
				// Add some additional copy to the first marker to demonstrate the scrollbar
				if (i == 0)
					datum.story +=
						" <br><br> The marker can also accommodate a large amount of text and will allow scrolling if the content does not fit in the available space. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In risus quam, suscipit eu imperdiet sed, finibus vitae neque. Aenean gravida erat vel arcu bibendum pharetra. Nullam arcu nibh, ullamcorper a quam quis, aliquam mollis ex. Nulla lacus ligula, sollicitudin ac lacinia a, tempus nec sem. Aliquam erat volutpat. Phasellus magna mauris, maximus eget imperdiet eu, tincidunt ut neque. Maecenas rutrum nisl sed laoreet placerat. Nunc semper eu diam eget pretium. Fusce est lectus, feugiat nec metus sed, auctor laoreet ligula. Fusce et felis ut quam finibus porttitor. Fusce mollis felis quis velit rutrum laoreet. Maecenas dignissim mattis facilisis. Aenean tempor fermentum dictum.";
				const fields =
					MarkersSample.allowComparisonSeriesMarkers && stx.chart.series
						? Object.values(stx.chart.series)
								.filter((s) => s.parameters.isComparison)
								.map((s) => s.parameters.symbol)
						: [];
				CIQ.Marker({
					stx: stx,
					label: series.id,
					field: fields[Math.floor(Math.random() * (fields.length + 1))],
					xPositioner: "date",
					yPositioner: "above_candle",
					x: record.DT,
					node: new CIQ.Marker[markerType](datum)
				});
				i++;
			}
			stx.draw();
		},
		takedownResults: function (stx, id) {
			self.activeLabels = self.activeLabels.filter(function (label) {
				return label != id;
			});
			CIQ.Marker.removeByLabel(stx, id);
		}
	});
	return label;
};
MarkersSample.prototype.createAbstractMarker = function (abstractType) {
	var stx = this.stx;
	var abstract = (
		document.querySelector(`cq-abstract-marker[cq-type="${abstractType}"]`) ||
		document
	).querySelector(".stx-marker.abstract");
	if (!abstract) return;
	abstract = abstract.cloneNode(true);
	Object.assign(abstract.style, {
		"z-index": 30,
		left: (0.4 * stx.chart.width).toString() + "px"
	});
	CIQ.Marker({
		stx: stx,
		xPositioner: "none",
		yPositioner: "above_candle",
		label: abstractType,
		permanent: true,
		chartContainer: true,
		node: abstract
	});
	return abstractType;
};
MarkersSample.prototype.hideMarkers = function (type) {
	var stx = this.stx;
	if (type) {
		CIQ.Marker.removeByLabel(stx, type);
		this.activeLabels = this.activeLabels.filter((label) => label != type);
		if (type !== "helicopter") stx.removeEvent(type);
	} else {
		this.activeLabels.forEach(function (label) {
			CIQ.Marker.removeByLabel(stx, label);
			if (type !== "helicopter") stx.removeEvent(label);
		});
		this.activeLabels = [];
	}
};
MarkersSample.prototype.showMarkers = function (type, renderType) {
	var specialType = MarkersSample.specialTypes[type];
	if (specialType) {
		return this.processLabelsAndDraw(this[specialType](type, renderType));
	}
	if (type === "helicopter") {
		return this.processLabelsAndDraw(this.createAbstractMarker(type));
	}
	return this.processLabelsAndDraw(this.createMarkers(type, renderType));
};
let marker = { MarkersSample };
export default marker;
