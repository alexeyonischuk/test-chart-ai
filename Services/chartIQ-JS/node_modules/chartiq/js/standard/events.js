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


let __js_standard_events_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Adds an event series to the chart.
 * Events are managed just like series, but adding using addEvent instead of addSeries
 * will cause them to be managed properly.
 *
 * @param {string} id Event id to add
 * @param {object} params Parameters to pass through to addSeries.  See {@link CIQ.ChartEngine#addSeries} for details.
 * @param {function} [cb] Optional callback
 *
 * Note: Using addEvent will add the appropriate responseHandler to the parameters passed to addSeries.
 * There is no need for the developer to write this function and pass it to addEvent.
 *
 * @memberof CIQ.ChartEngine
 * @since 9.0.0
 */
CIQ.ChartEngine.prototype.addEvent = function (id, params, cb) {
	if (!id) return;
	const { chart } = this;
	params = params || {};

	params.isEvent = true;

	if (!params.processResults) {
		params.processResults = this.processEventResults;
	}
	if (!params.takedownResults) {
		params.takedownResults = this.takedownEventResults;
	}
	params.responseHandler = (params) => {
		return (dataCallback) => {
			const obj = chart.series[id];
			const { quotes } = dataCallback;
			if (!quotes || !quotes.length) return;
			if (!dataCallback.error) {
				obj.loading = false;
				obj.moreAvailable = dataCallback.moreAvailable;
				obj.upToDate = dataCallback.upToDate;
			}
			const endPoints = [
				dataCallback.beginDate || quotes[0].DT,
				dataCallback.endDate || quotes[quotes.length - 1].DT
			];
			if (!obj.endPoints.begin || obj.endPoints.begin > endPoints[0])
				obj.endPoints.begin = endPoints[0];
			if (!obj.endPoints.end || obj.endPoints.end < endPoints[1])
				obj.endPoints.end = endPoints[1];

			if (obj.parameters.processResults)
				obj.parameters.processResults(this, dataCallback.error, obj, quotes);
		};
	};
	this.addSeries(id, params, cb);
};

/**
 * Default handler for event data results processing. Override this to change the default behavior, which is to draw Simple markers.
 *
 * @param {CIQ.ChartEngine} stx The chart object associated with the event.
 * @param {string} error An error message, if one occurred.
 * @param {object} series The event's series object.
 * @param {array} data An array of quotes in required JSON format, if no error occurred.
 *
 * @memberof CIQ.ChartEngine
 * @since 9.0.0
 */
CIQ.ChartEngine.prototype.processEventResults = function (
	stx,
	error,
	series,
	data
) {
	if (!error && CIQ.Marker) {
		for (const record of data) {
			if (record.data) {
				record.data.type = series.id;
				CIQ.Marker({
					stx,
					label: series.id,
					x: record.DT,
					node: new CIQ.Marker.Simple(record.data)
				});
			}
		}
	}
};

/**
 * Default handler for event removal. Override this to change the default behavior, which is to remove markers.
 *
 * @param {CIQ.ChartEngine} stx The chart object associated with the event.
 * @param {string} id The event's id.
 *
 * @memberof CIQ.ChartEngine
 * @since 9.0.0
 */
CIQ.ChartEngine.prototype.takedownEventResults = function (stx, id) {
	if (CIQ.Marker) CIQ.Marker.removeByLabel(stx, id);
};

/**
 * Removes an event series from the chart.
 *
 * @param {string} id event id to remove
 *
 * @memberof CIQ.ChartEngine
 * @since 9.0.0
 */
CIQ.ChartEngine.prototype.removeEvent = function (id) {
	this.removeSeries(id);
};

/**
 * Removes all event series from the chart.
 *
 * @memberof CIQ.ChartEngine
 * @since 9.0.0
 */
CIQ.ChartEngine.prototype.removeAllEvents = function () {
	const { series } = this.chart;
	if (series) {
		for (let evt in series) {
			if (series[evt].parameters.isEvent) this.removeEvent(evt);
		}
	}
};

};
__js_standard_events_(typeof window !== "undefined" ? window : global);
