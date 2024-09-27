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


import { CIQ as _CIQ } from "../../js/componentUI.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Show Range web component `<cq-show-range>`.
 *
 * @namespace WebComponents.cq-show-range
 *
 * @example
 * <cq-show-range>
 *    <div stxtap="set(1,'today');">1d</div>
 *    <div stxtap="set(5,'day',30,2,'minute');">5d</div>
 *    <div stxtap="set(1,'month',30,8,'minute');">1m</div>
 *    <div class="hide-sm" stxtap="set(3,'month');">3m</div>
 *    <div class="hide-sm" stxtap="set(6,'month');">6m</div>
 *    <div class="hide-sm" stxtap="set(1,'YTD');">YTD</div>
 *    <div stxtap="set(1,'year');">1y</div>
 *    <div class="hide-sm" stxtap="set(5,'year',1,1,'week');">5y</div>
 *    <div class="hide-sm" stxtap="set(1,'all',1,1,'month');">All</div>
 * </cq-show-range>
 */
class ShowRange extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ShowRange);
		this.constructor = ShowRange;
	}

	/**
	 * Proxies UI requests for span changes to the chart engine.
	 *
	 * Usage Examples:
	 * - `set(5,'day',30,2,'minute')` means that you want to combine two 30-minute bars into a single candle.
	 *   - So your quote feed must return one data object for every 30 minutes. A total of 2 data points per hour.
	 * - `set(5,'day',2,30,'minute')` means that you want to combine thirty 2-minute bars into a single candle.
	 *   - So your quote feed must return one data object for every 2 minutes. A total of 30 data points per hour.
	 * - `set(5,'day', 1, 60,'minute')` means that you want to combine sixty 1-minute bars into a single candle.
	 *   - So your quote feed must return one data object for every minute . A total of 60 data points per hour.
	 * - `set(5,'day', 60, 1,'minute')` means that you want to have a single 60 minute bar per period.
	 *   - So your quote feed must return one data object for every 60 minutes . A total of 1 data point per hour.
	 *
	 * @param {Object} activator Activation information
	 * @param {Number} multiplier   The period that will be passed to {@link CIQ.ChartEngine#setSpan}
	 * @param {Number} base The interval that will be passed to {@link CIQ.ChartEngine#setSpan}
	 * @param {Number} [interval] Chart interval to use (leave empty for autodetect)
	 * @param {Number} [period] Chart period to use (leave empty for autodetect)
	 * @param {Number} [timeUnit] Chart timeUnit to use (leave empty for autodetect)
	 * @alias set
	 * @memberof WebComponents.cq-show-range
	 * @since 5.1.1 timeUnit added
	 */
	set(activator, multiplier, base, interval, period, timeUnit) {
		var self = this;
		if (self.context.loader) self.context.loader.show();
		var params = {
			multiplier: multiplier,
			base: base,
			padding: 40
		};
		if (interval) {
			params.periodicity = {
				interval: interval,
				period: period ? period : 1,
				timeUnit: timeUnit
			};
		}
		self.context.stx.setSpan(params, function () {
			if (self.context.loader) self.context.loader.hide();
		});
	}

	setContext(context) {
		const menuItems = context.config && context.config.getMenu("rangeMenu");
		this.addDefaultMarkup(this, menuItems && menuItems.join(""));
	}
}

ShowRange.markup = `
		<div stxtap="set(1,'today');">1D</div>
		<div stxtap="set(5,'day',30,2,'minute');">5D</div>
		<div stxtap="set(1,'month',30,8,'minute');">1M</div>
		<div class="hide-sm" stxtap="set(3,'month');">3M</div>
		<div class="hide-sm" stxtap="set(6,'month');">6M</div>
		<div class="hide-sm" stxtap="set(1,'YTD');">YTD</div>
		<div stxtap="set(1,'year');">1Y</div>
		<div class="hide-sm" stxtap="set(5,'year',1,1,'week');">5Y</div>
		<div class="hide-sm" stxtap="set(1,'all');">All</div>
	`;
CIQ.UI.addComponentDefinition("cq-show-range", ShowRange);
