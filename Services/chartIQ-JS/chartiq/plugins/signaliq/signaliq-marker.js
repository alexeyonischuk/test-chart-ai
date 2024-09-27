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
import "./highPerformanceMarkers.js";

const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(/* webpackMode: "eager" */ "./signaliq-marker.css").then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["./signaliq-marker.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.SignalIQ.stylesheets.push({
			url: new URL("./signaliq-marker.css", import.meta.url).href,
			callback: resolve
		});
	}
}).then((m) => CIQ.addInternalStylesheet(m, "signaliq-marker")); // a framework, such as Angular, may require style addition

/**
 * Specific subclass of markers for SignalIQ purposes.
 *
 * @constructor
 * @name CIQ.Marker.SignalIQ
 * @private
 * @since 8.6.0
 */
CIQ.Marker.SignalIQ = function (params) {
	if (!this.className) this.className = "CIQ.Marker.SignalIQ";
	CIQ.Marker.call(this, params);
};

CIQ.inheritsFrom(CIQ.Marker.SignalIQ, CIQ.Marker, false);

const markerSelectOptions = [
	{
		optionName: "color",
		optionType: "colorPicker"
	},
	{
		optionName: "shape",
		optionType: "dropdown",
		options: [
			["circle", "Circle"],
			["square", "Square"],
			["diamond", "Diamond"],
			["text", "Text"]
		],
		optionDefault: "circle"
	},
	{
		optionName: "label",
		optionType: "text",
		optionLabel: "Enter marker label.",
		optionDefault: "X"
	},
	{
		optionName: "size",
		optionType: "dropdown",
		options: [
			["S", "Small"],
			["M", "Medium"],
			["L", "Large"]
		],
		optionDefault: "M"
	},
	{
		optionName: "position",
		optionType: "dropdown",
		options: [
			["above_candle", "Above Line"],
			["below_candle", "Below Line"],
			["on_candle", "On Line"]
		],
		optionDefault: "above_candle"
	}
];
CIQ.SignalIQ.notificationTypes.push({
	type: "marker",
	name: "Chart Marker",
	options: markerSelectOptions
});

const emojimarkerSelectOptions = [
	{
		optionName: "color",
		optionType: "colorPicker"
	},
	{
		optionName: "label",
		optionType: "text",
		optionLabel: "Click to add Emoji.",
		optionDefault: ":smile:",
		optionPicker: "emojiPicker"
	},
	{
		optionName: "size",
		optionType: "dropdown",
		options: [
			["S", "Small"],
			["M", "Medium"],
			["L", "Large"]
		],
		optionDefault: "L"
	},
	{
		optionName: "position",
		optionType: "dropdown",
		options: [
			["above_candle", "Above Line"],
			["below_candle", "Below Line"],
			["on_candle", "On Line"]
		],
		optionDefault: "above_candle"
	}
];

CIQ.SignalIQ.notificationTypes.push({
	type: "emojimarker",
	name: "Emoji Marker",
	options: emojimarkerSelectOptions
});

/**
 * Namespace within CIQ.SignalIQ which represents an alert as a marker on the chart.
 *
 * @namespace CIQ.SignalIQ.Marker
 * @since  8.6.0
 */
CIQ.SignalIQ.Marker = {};

/**
 * Creates a signal as a marker. This is called when the `signalData.notificationType` value is "marker".
 *
 * @param {CIQ.SignalIQ~NotificationData} data Parameters used to create marker.
 * @return {CIQ.Marker.SignalIQ} A marker representing a SignalIQ alert.
 *
 * @static
 * @alias create
 * @memberof CIQ.SignalIQ.Marker
 * @since 8.6.0
 */
CIQ.SignalIQ.Marker.create = function ({
	signalData,
	markerSettings,
	conditions,
	symbol,
	field,
	isPlotSpecific,
	sd,
	stx,
	tick
}) {
	const sizeTxt = (sz) => {
		switch (sz) {
			case "L":
				return "large";
			case "M":
				return "medium";
			case "S":
			default:
				return "small";
		}
	};

	let { type, name, description, reveal, shape, size, label, position } = {
		...signalData,
		...markerSettings
	};

	const qt = stx.chart.dataSet[tick];
	let formattedDate = "";
	if (qt && qt.DT)
		formattedDate = " - " + CIQ.displayableDate(stx, stx.chart, qt.DT);

	const yPositioner = isPlotSpecific ? "on_candle" : position || "above_candle";
	let resolvedShape = shape; // chart markers
	if (!shape && !type) resolvedShape = "circle"; // markers on the study
	else if (shape === "noshape" || type !== "marker") resolvedShape = "text"; // non-chart markers (like emojis)

	const id = [name + formattedDate, field].join("|");

	const markerSignal = new CIQ.Marker.SignalIQ({
		stx,
		x: tick,
		xPositioner: "tick",
		yPositioner,
		offset: !isPlotSpecific && yPositioner.includes("candle") ? 8 : 0,
		label: "signaliq-" + name,
		panelName: isPlotSpecific ? sd.panel : undefined,
		symbol,
		field,
		avoidFlush: true,
		node: isPlotSpecific
			? new CIQ.Marker.Performance({
					type: "circle",
					category: "signal",
					size: "study",
					displayCategory: false,
					displayStem: false,
					id,
					headline: name + formattedDate,
					story:
						(stx.signalIQ.displayCondition
							? "\u000a" + conditions.join("\u000a")
							: "") + (description ? "\u000a" + description : ""),
					hide: !reveal,
					color: markerSettings.color
			  })
			: new CIQ.Marker.Performance({
					type: resolvedShape,
					category: "signal",
					size: sizeTxt(size),
					displayLabel: label,
					displayCategory: false,
					displayStem: false,
					id,
					color: shape !== "noshape" ? markerSettings.color : "transparent"
			  })
	});
	if (!isPlotSpecific)
		markerSignal.click = (function (stx, sd) {
			return function () {
				sd.signalData.toggleStudy();
				stx.findHighlights(null, true);
			};
		})(stx, sd);

	markerSignal.uniqueKey = [name, tick, field].join("|");

	return markerSignal;
};

/**
 * Namespace within CIQ.SignalIQ which represents an alert as an emoji on the chart.
 *
 * @namespace CIQ.SignalIQ.Emojimarker
 * @since 8.8.0
 */
CIQ.SignalIQ.Emojimarker = {};
CIQ.inheritsFrom(CIQ.SignalIQ.Emojimarker, CIQ.SignalIQ.Marker, false);

CIQ.SignalIQ.Emojimarker.create = CIQ.SignalIQ.Marker.create;
