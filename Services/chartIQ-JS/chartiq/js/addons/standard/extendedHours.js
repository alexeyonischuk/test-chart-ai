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


/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Use this constructor to initialize filtering and visualization styles of extended hours by the use of shading and delimitation lines.
 *
 *  Extended hours can be toggled using the Ctrl+Alt+X keystroke combination (see the
 * `extendedHours` action in `hotkeyConfig.hotkeys` in *js/defaultConfiguration.js*).
 *
 * Requires *addOns.js*.
 *
 * This visualization will only work if data for the corresponding sessions is provided from your quote feed and the market definitions have the corresponding entries.
 * See {@link CIQ.Market} for details on how to define extended (non-default) hours.
 *
 * By default all extended hour sessions are disabled unless explicitly enabled using {@link CIQ.ExtendedHours.prepare} or {@link CIQ.ExtendedHours.set}.
 *
 * All possible market sessions needed to be shaded at any given time should be enabled at once with this method.
 *
 * Your fetch should load the required data based on the `params.stx.layout.extended` and `params.stx.layout.marketSessions` settings.
 *
 * Remember that when `params.filter` is set to true, this module performs a filter of already loaded masterData when {@link CIQ.ExtendedHours.set} is invoked,
 * rather than calling {@link CIQ.ChartEngine#loadChart} to reload the data from the server every time you enable or disable this feature.
 * So you must always return all requested sessions on your fetch responses if this flag is set.
 *
 * CSS info:
 * - The styles for the shading of each session is determined by the corresponding CSS class in the form of "stx_market_session."+session_name (Example: `stx_market_session.pre`)
 * - The divider line is determined by the CSS class "stx_market_session.divider".
 *
 * **Important:** This module must be initialized before {@link CIQ.ChartEngine#importLayout} or the sessions will not be able to be restored.
 *
 * Example:
 * <iframe width="800" height="500" scrolling="no" seamless="seamless" align="top"
 *         style="float:top"
 *         src="https://jsfiddle.net/chartiq/g2vvww67/embedded/result,js,html/"
 *         allowfullscreen="allowfullscreen" frameborder="1">
 * </iframe>
 *
 * @param {object} params The constructor parameters.
 * @param {CIQ.ChartEngine} [params.stx] The chart object.
 * @param {boolean} [params.filter] Setting to true performs a filter of masterData when
 * 		{@link CIQ.ExtendedHours.set} is invoked, rather than calling
 * 		{@link CIQ.ChartEngine#loadChart} to reload the data from the server.
 * @param {string} [params.menuContextClass] A CSS class name used to query the menu DOM
 * 		element that contains the UI control for the extended hours add-on. In a multi-chart
 * 		document, the add-on is available only on charts that have a menu DOM element with
 * 		the value for `menuContextClass` as a class attribute.
 *
 * @constructor
 * @name CIQ.ExtendedHours
 * @since
 * - 06-2016-02
 * - 3.0.0 Changed argument to an object to support `filter`.
 * - 3.0.0 No longer necessary to explicitly call new Chart to reload data. Instead call {@link CIQ.ExtendedHours.set} function.
 * - 5.0.0 No longer necessary to explicitly set `stx.layout.marketSessions` or `1stx.layout.extended` to manage sessions; instead call {@link CIQ.ExtendedHours.prepare} or {@link CIQ.ExtendedHours.set}.
 * - 8.0.0 Added `params.menuContextClass`.
 *
 * @example
 * // Call this only once to initialize the market sessions display manager.
 * new CIQ.ExtendedHours({stx:stxx, filter:true});
 *
 * // By default all sessions are disabled unless explicitly enabled.
 * // This forces the extended hours sessions ["pre","post"] to be enabled when the chart is initially loaded.
 * stxx.extendedHours.prepare(true);
 *
 * // Now display your chart.
 * stxx.loadChart(stxx.chart.symbol, {}, function() {});
 *
 * @example
 * // Once your chart is displayed, you can call this from any UI interface to turn on extended hours.
 * stx.extendedHours.set(true);
 *
 * // Or call this from any UI interface to turn off extended hours.
 * stx.extendedHours.set(false);
 *
 * @example
 * // CSS entries for a session divider and sessions named "pre" and "post".
 * .stx_market_session.divider {
 *     background-color: rgba(0,255,0,0.8);
 *     width: 1px;
 * }
 * .stx_market_session.pre {
 *     background-color: rgba(255,255,0,0.1);
 * }
 * .stx_market_session.post {
 *     background-color: rgba(0,0,255,0.2);
 * }
 */
CIQ.ExtendedHours =
	CIQ.ExtendedHours ||
	function (params) {
		var stx = params.stx;
		this.filter = params.filter;
		if (!stx) {
			// backwards compatibility
			stx = params;
			this.filter = false;
		}
		var styles = {};
		this.stx = stx;
		this.stx.extendedHours = this;
		this.cssRequired = true;

		stx.addEventListener("theme", function (tObject) {
			// reinitialize the session colors after a theme change
			styles = {};
			for (var sess in stx.layout.marketSessions) {
				if (!styles.session) styles.session = {};
				styles.session[sess] = stx.canvasStyle("stx_market_session " + sess);
			}
		});

		stx.addEventListener("symbolChange", function (tObject) {
			// check if extended hours exists for this security
			if (
				tObject.action == "master" &&
				stx.layout.extended &&
				!(stx.chart.market.market_def && stx.chart.market.sessions.length)
			) {
				CIQ.alert("There are no Extended Hours for this instrument.");
			}
		});

		if (CIQ.UI) {
			CIQ.UI.KeystrokeHub.addHotKeyHandler(
				"extendedHours",
				({ stx }) => {
					stx.container.ownerDocument.body.keystrokeHub.context.advertised.Layout.setExtendedHours();
				},
				stx
			);
		}

		/**
		 * Prepares the extended hours settings and classes for the session names enumerated in the arguments without actually displaying or loading the data.
		 *
		 * This method can be used to force a particular session to load by default by calling it before {@link CIQ.ChartEngine#loadChart}.
		 * Otherwise the chart will be loaded with all sessions disabled until {@link CIQ.ExtendedHours.set} is invoked.
		 *
		 * {@link CIQ.ChartEngine#importLayout} will also call this method to ensure the sessions are restored as previously saved.
		 *
		 * @param  {boolean} enable Set to turn on/off the extended-hours visualization.
		 * @param  {array} sessions The sessions to visualize when enable is true.  Any sessions previously visualized will be disabled.  If set to null, will default to ["pre","post"].
		 * @memberof CIQ.ExtendedHours#
		 * @alias prepare
		 * @since 5.0.0
		 */
		this.prepare = function (enable, sessions) {
			stx.layout.extended = enable;
			for (var sess in stx.layout.marketSessions) {
				styles.session = {};
				stx.chart.market.disableSession(sess);
			}
			stx.layout.marketSessions = {};
			if (enable) {
				if (!sessions) sessions = ["pre", "post"];
				if (sessions.length) {
					for (var s = 0; s < sessions.length; s++) {
						stx.layout.marketSessions[sessions[s]] = true;
					}
				} else {
					stx.layout.marketSessions = sessions;
				}
			}
			for (sess in stx.layout.marketSessions) {
				if (!styles.session) styles.session = {};
				styles.session[sess] = stx.canvasStyle("stx_market_session " + sess);
				stx.chart.market.disableSession(sess, true);
			}
		};

		/**
		 * gathers and renders the extended hours for the preset session names enumerated in prepare().
		 * @param  {function} cb Optional callback function to be invoked once chart is reloaded with extended hours data.
		 * @memberof CIQ.ExtendedHours#
		 * @alias complete
		 * @private
		 * @since 5.0.0
		 */
		this.complete = function (cb) {
			stx.changeOccurred("layout");
			if (!stx.chart.market.market_def) {
				// possibly a 24 hours Market. Not necessarily an error but nothing to do for ExtendedHours
				if (cb) cb();
				return;
			}
			if (this.filter) {
				stx.createDataSet();
				stx.draw();
				if (cb) cb();
			} else {
				stx.loadChart(stx.chart.symbol, cb);
			}
		};

		/**
		 * Turns on or off extended hours for the session names enumerated in the arguments.
		 * @param  {boolean} enable Set to turn on/off the extended-hours visualization.
		 * @param  {array} sessions The sessions to visualize when enable is true.  Any sessions previously visualized will be disabled.  If set to null, will default to ["pre","post"].
		 * @param  {function} cb Optional callback function to be invoked once chart is reloaded with extended hours data.
		 * @memberof CIQ.ExtendedHours#
		 * @alias set
		 */
		this.set = function (enable, sessions, cb) {
			this.prepare(enable, sessions);
			this.complete(cb);
		};

		// This injection shades the after hours portion of the chart for each yaxis.
		// Only the panel to which the yaxis belongs will get shading.
		// This means yaxes of overlays will bypass the shading block.
		this.stx.append("drawYAxis", function (panel, parameters) {
			if (!this.layout.extended) return;
			if (
				panel.yAxis != parameters.yAxis ||
				panel.shareChartXAxis === false ||
				panel.hidden
			)
				return;
			var chart = panel.chart;
			if (CIQ.ChartEngine.isDailyInterval(this.layout.interval)) return;
			styles.divider = this.canvasStyle("stx_market_session divider");
			if (styles.session) {
				var m = chart.market;
				var ranges = [];
				var range = {};
				var nextBoundary, thisSession;
				for (var i = 0; i < chart.dataSegment.length; i++) {
					var ds = chart.dataSegment[i];
					if (!ds || !ds.DT) continue;
					var c = null;
					if (m.market_def) {
						if (!nextBoundary || nextBoundary <= ds.DT) {
							thisSession = m.getSession(ds.DT);
							var filterSession =
								thisSession !== "" &&
								(!this.layout.marketSessions ||
									!this.layout.marketSessions[thisSession]);
							nextBoundary = m[filterSession ? "getNextOpen" : "getNextClose"](
								ds.DT
							);
						}
					}

					var s = styles.session[thisSession];
					if (s) c = s.backgroundColor;
					if (range.color && range.color != c) {
						ranges.push({
							start: range.start,
							end: range.end,
							color: range.color
						});
						range = {};
					}
					if (c) {
						var cw = this.layout.candleWidth;
						if (ds.candleWidth) cw = ds.candleWidth;
						range.end = this.pixelFromBar(i, chart) + cw / 2;
						if (!range.start && range.start !== 0)
							range.start = range.end - cw + 1;
						range.color = c;
					} else {
						range = {};
					}
				}
				if (range.start || range.start === 0)
					ranges.push({
						start: range.start,
						end: range.end,
						color: range.color
					});
				var noDashes = CIQ.isTransparent(styles.divider.backgroundColor);
				var dividerLineWidth = styles.divider.width.replace(/px/g, "");
				var dividerStyle = {
					y0: panel.bottom,
					y1: panel.top,
					color: styles.divider.backgroundColor,
					type: "line",
					context: chart.context,
					confineToPanel: panel,
					pattern: "dashed",
					lineWidth: dividerLineWidth,
					deferStroke: true
				};
				this.startClip(panel.name);
				chart.context.beginPath();
				if (stx.highlightedDraggable) chart.context.globalAlpha *= 0.3;
				for (i = 0; i < ranges.length; i++) {
					chart.context.fillStyle = ranges[i].color;
					if (!noDashes && ranges[i].start > chart.left)
						this.plotLine(
							CIQ.extend(
								{ x0: ranges[i].start, x1: ranges[i].start },
								dividerStyle
							)
						);
					chart.context.fillRect(
						ranges[i].start,
						panel.top,
						ranges[i].end - ranges[i].start,
						panel.bottom - panel.top
					);
					if (!noDashes && ranges[i].end < chart.right)
						this.plotLine(
							CIQ.extend({ x0: ranges[i].end, x1: ranges[i].end }, dividerStyle)
						);
				}
				chart.context.stroke();
				this.endClip();
			}
		});
	};
