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


let __js_standard_theme_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Generates an object that can be used programmatically to load new themes or to create a theme dialog to manage chart themes.
 * The initial values contain the existing values in the current chart.
 * Simply have your dialog modify these values and then call the method {@link CIQ.ThemeHelper#update}
 *
 * Note that the chart has many granular customizations beyond what this theme helper produces.
 * This helper simplifies and consolidates into a manageable set.
 * For example, 'hallow candles', 'bars', and 'candles' colors are all grouped together.
 * But if you need to separate those out, just call an explicit {@link CIQ.ChartEngine#setStyle} for each CSS style right after the ThemeHelper is executed.
 *
 * For example, this will further set the color for the hollow_candle chart type:
 * ```
 * stxx.setStyle("stx_hollow_candle_down","color",'blue');
 * stxx.setStyle("stx_hollow_candle_up","color",'yellow');
 * stxx.setStyle("stx_hollow_candle_even","color",'pink');
 * stxx.draw();
 * ```
 * See {@tutorial Chart Styles and Types} for more details.
 *
 * Themes can be managed by simply adding or removing from the chart context the class name that groups the theme together.
 * And if the CSS contains an entry for that class, the chart will display the styles in the class when enabled.
 *
 * For example, assume the chart has a default theme and a second theme called 'ciq-night'.
 * Here are some examples of what CSS entries for those classes would look like:
 * ```
 * // default theme (day) styles
 * .stx_candle_shadow, .stx_bar_even {
 * 		color:#2e383b;
 *
 * }
 * .stx_candle_down, .stx_line_down {
 * 		border-left-color: #000000;
 * }
 *
 * // night theme override styles
 * .ciq-night .stx_candle_shadow, .ciq-night .stx_bar_even {
 * 		color: #ccc;
 * }
 * .ciq-night .stx_candle_down, .ciq-night .stx_line_down {
 * 		border-left-color: #e34621;
 * }
 * ```
 *
 * Then to activate a particular theme, you either remove the specific class to enable default (day):
 * ```
 * document.querySelector("cq-context").classList.remove('ciq-night');
 * // clear out the old styles to allow new ones to be cached in; and redraw.
 * stxx.styles={};stxx.draw();
 * ```
 * Or add a particular class to enable those styles:
 * ```
 * document.querySelector("cq-context").classList.add('ciq-night');
 * // clear out the old styles to allow new ones to be cached in; and redraw.
 * stxx.styles={};stxx.draw();
 * ```
 * You can use this method to set as many themes as needed. Remember that this method, requires all styles to be present in the CSS.
 * ThemeHelper, on the other hand, will programmatically set the styles internally, one at a time, regardless of pre-existng CSS classes.
 *
 * @param {object} params Parameters
 * @param {CIQ.ChartEngine} params.stx A chart object
 * @constructor
 * @name  CIQ.ThemeHelper
 * @example
 * var helper=new CIQ.ThemeHelper({stx:stx});
 * console.log(helper.settings);
 * helper.settings.chart["Grid Lines"].color="rgba(255,0,0,.5)";
 * helper.update();
 *
 * @since 6.2.0 Added support to control `Mountain.basecolor`.
 */
CIQ.ThemeHelper =
	CIQ.ThemeHelper ||
	function (params) {
		this.params = params;
		var stx = params.stx;
		var backgroundColor = "#FFFFFF";
		if (stx.chart.container) {
			backgroundColor = getComputedStyle(stx.chart.container).backgroundColor;
			if (CIQ.isTransparent(backgroundColor))
				backgroundColor = stx.containerColor;
		}
		this.settings.chart.Background.color = CIQ.hexToRgba(backgroundColor);
		this.settings.chart["Grid Lines"].color = CIQ.hexToRgba(
			stx.canvasStyle("stx_grid").color
		);
		this.settings.chart["Grid Dividers"].color = CIQ.hexToRgba(
			stx.canvasStyle("stx_grid_dark").color
		);
		this.settings.chart["Axis Text"].color = CIQ.hexToRgba(
			stx.canvasStyle("stx_xaxis").color
		);

		this.settings.chartTypes["Candle/Bar"].up.color = CIQ.hexToRgba(
			stx.canvasStyle("stx_candle_up").color
		);
		this.settings.chartTypes["Candle/Bar"].down.color = CIQ.hexToRgba(
			stx.canvasStyle("stx_candle_down").color
		);
		this.settings.chartTypes["Candle/Bar"].up.wick = CIQ.hexToRgba(
			stx.canvasStyle("stx_candle_shadow_up").color
		);
		this.settings.chartTypes["Candle/Bar"].down.wick = CIQ.hexToRgba(
			stx.canvasStyle("stx_candle_shadow_down").color
		);
		this.settings.chartTypes["Candle/Bar"].even.wick = CIQ.hexToRgba(
			stx.canvasStyle("stx_candle_shadow_even").color
		);
		this.settings.chartTypes["Candle/Bar"].up.border = CIQ.hexToRgba(
			stx.canvasStyle("stx_candle_up").borderLeftColor
		);
		this.settings.chartTypes["Candle/Bar"].down.border = CIQ.hexToRgba(
			stx.canvasStyle("stx_candle_down").borderLeftColor
		);
		if (CIQ.isTransparent(stx.canvasStyle("stx_candle_up").borderLeftColor))
			this.settings.chartTypes["Candle/Bar"].up.border = null;
		if (CIQ.isTransparent(stx.canvasStyle("stx_candle_down").borderLeftColor))
			this.settings.chartTypes["Candle/Bar"].down.border = null;

		this.settings.chartTypes.Line.color = CIQ.hexToRgba(
			stx.canvasStyle("stx_line_chart").color
		);

		this.settings.chartTypes.Mountain.color = CIQ.hexToRgba(
			stx.canvasStyle("stx_mountain_chart").backgroundColor
		);
		this.settings.chartTypes.Mountain.basecolor = CIQ.hexToRgba(
			stx.canvasStyle("stx_mountain_chart").color
		);

		if (!this.settings.chartTypes["Candle/Bar"].even.color)
			this.settings.chartTypes["Candle/Bar"].even.color =
				this.settings.chartTypes["Candle/Bar"].even.wick;
		if (!this.settings.chartTypes["Candle/Bar"].even.border)
			this.settings.chartTypes["Candle/Bar"].even.border =
				this.settings.chartTypes["Candle/Bar"].even.wick;
	};

/**
 * Current theme settings. These are the settings that are ready to be loaded, or currently loaded.
 * Modify as needed.
 * To load these settings call {@link CIQ.ThemeHelper#update}
 * @example
 * //Default settings object structure
 * 	"chart":{
		"Background":{
			"color":color1
		},
		"Grid Lines":{
			"color":color2
		},
		"Grid Dividers":{
			"color":color3
		},
		"Axis Text":{
			"color":color4
		}
	},
	"chartTypes":{
		"Candle/Bar":{ // also manages 'hollow candle', 'colored line' and 'colored baseline' chart types.
			"up":{
				"color":color5,
				"wick":color6,
				"border":color7
			},
			"down":{
				"color":color8,
				"wick":color9,
				"border":color10
			},
			"even":{		// colors used when the current close is equal to the previous close.
				"color":color11,
				"wick":color12,
				"border":color13
			}
		},
		"Line":{
			"color":color14
		},
		"Mountain":{
			"color":color15,
			"basecolor":color16
		}
	}
 * @memberof CIQ.ThemeHelper
 * @type object
 */
CIQ.ThemeHelper.prototype.settings = {
	chart: {
		Background: {
			color: null
		},
		"Grid Lines": {
			color: null
		},
		"Grid Dividers": {
			color: null
		},
		"Axis Text": {
			color: null
		}
	},
	chartTypes: {
		"Candle/Bar": {
			up: {
				color: null,
				wick: null,
				border: null
			},
			down: {
				color: null,
				wick: null,
				border: null
			},
			even: {
				color: null,
				wick: null,
				border: null
			}
		},
		Line: {
			color: null
		},
		Mountain: {
			color: null,
			basecolor: null
		}
	}
};

/**
 * Call this method to activate the chart theme with values set in {@link CIQ.ThemeHelper#settings}
 * @memberof CIQ.ThemeHelper
 * @param {CIQ.ChartEngine} [stx] Chart engine to apply the changes to.
 * @example
 * var helper=new CIQ.ThemeHelper({stx:stx});
 * console.log(helper.settings);
 * helper.settings=NewSettings;
 * helper.update();
 * @since
 * - 4.1.0 Added optional chart engine parameter.
 * - 6.2.0 Now setting base color and color of mountain chart with separate colors.
 * - 6.3.0 Colored Bar, Hollow Candle, Volume Candle charts now use `chartTypes["Candle/Bar"].even.color` for even bar color.
 */
CIQ.ThemeHelper.prototype.update = function (stx) {
	if (!stx) stx = this.params.stx;
	var classMapping = {
		stx_candle_up: {
			stx_candle_up: true,
			stx_bar_up: true,
			stx_hollow_candle_up: true,
			stx_line_up: true,
			stx_baseline_up: true
		},
		stx_candle_down: {
			stx_candle_down: true,
			stx_bar_down: true,
			stx_hollow_candle_down: true,
			stx_line_down: true,
			stx_baseline_down: true
		},
		stx_candle_even: {
			stx_candle_even: true,
			stx_bar_even: true,
			stx_hollow_candle_even: true
		},
		stx_shadow_up: { stx_candle_shadow_up: true },
		stx_shadow_down: { stx_candle_shadow_down: true },
		stx_shadow_even: { stx_candle_shadow_even: true },
		stx_line_chart: { stx_bar_chart: true, stx_line_chart: true },
		stx_grid: { stx_grid: true },
		stx_grid_dark: { stx_grid_dark: true },
		stx_xaxis: {
			stx_xaxis_dark: true,
			stx_xaxis: true,
			stx_yaxis: true,
			stx_yaxis_dark: true,
			stx_grid_border: true
		},
		stx_mountain_chart: { stx_mountain_chart: true },
		stx_market_session: { stx_market_session: true }
	};

	stx.chart.container.style.backgroundColor =
		this.settings.chart.Background.color;
	stx.defaultColor = ""; // to be set later, elsewhere

	function setStyle(style, field, value) {
		var styles = classMapping[style];
		for (var s in styles) {
			stx.setStyle(s, field, value);
		}
	}

	setStyle("stx_grid", "color", this.settings.chart["Grid Lines"].color);
	setStyle(
		"stx_grid_dark",
		"color",
		this.settings.chart["Grid Dividers"].color
	);
	setStyle("stx_xaxis", "color", this.settings.chart["Axis Text"].color);

	var candleBar = this.settings.chartTypes["Candle/Bar"];
	// backwards compatibility with pre-5.0.3 saved themes
	if (!candleBar.even) {
		candleBar.even = {
			color: null,
			wick: CIQ.hexToRgba(stx.canvasStyle("stx_candle_shadow_even").color),
			border: null
		};
	}
	setStyle("stx_candle_up", "color", candleBar.up.color);
	setStyle("stx_candle_down", "color", candleBar.down.color);
	setStyle("stx_candle_even", "color", candleBar.even.color);
	setStyle("stx_shadow_up", "color", candleBar.up.wick);
	setStyle("stx_shadow_down", "color", candleBar.down.wick);
	setStyle("stx_shadow_even", "color", candleBar.even.wick);

	// Only apply borders to candle, not the other types
	stx.setStyle("stx_candle_up", "borderLeftColor", candleBar.up.border);
	stx.setStyle("stx_candle_down", "borderLeftColor", candleBar.down.border);

	setStyle("stx_line_chart", "color", this.settings.chartTypes.Line.color);

	stx.setStyle(
		"stx_mountain_chart",
		"borderTopColor",
		CIQ.hexToRgba(this.settings.chartTypes.Mountain.color, 1)
	);
	stx.setStyle(
		"stx_mountain_chart",
		"backgroundColor",
		CIQ.hexToRgba(this.settings.chartTypes.Mountain.color, 0.5)
	);
	stx.setStyle(
		"stx_mountain_chart",
		"color",
		CIQ.hexToRgba(this.settings.chartTypes.Mountain.basecolor, 0.01)
	);
	stx.draw();
};

/**
 * Convenience method to programmatically set a theme of the chart.
 *
 * Note that you should set any css classes on the chart context before calling this method
 *
 * @param  {object} [settings] A {@link CIQ.ThemeHelper#settings} object, or null to reset to default settings
 * @example
 * document.querySelector("cq-context").classList.add("ciq-night");
 * stxx.setThemeSettings();  // reset to night theme
 * var settings=CIQ.clone(CIQ.ThemeHelper.prototype.settings);   // default night theme settings
 * settings.chart.Background.color="red";   // customize by changing background color
 * stxx.setThemeSettings(settings);  // execute custom setting
 *
 * @memberof CIQ.ChartEngine
 * @since 6.3.0
 */
CIQ.ChartEngine.prototype.setThemeSettings = function (settings) {
	const multiChartContainer = CIQ.getFromNS(
		this,
		"uiContext.topNode.multiChartContainer"
	);
	const { breakpoint } = this.chart;

	if (multiChartContainer) {
		this.styles = multiChartContainer.styles[breakpoint] || {};
		multiChartContainer.styles[breakpoint] = this.styles;
	} else {
		this.styles = {};
	}

	this.chart.container.style.backgroundColor = "";
	this.defaultColor = "";
	if (settings) {
		var helper = new CIQ.ThemeHelper({ stx: this });
		helper.settings = settings;
		helper.update();
	}
	this.updateListeners("theme");
	this.changeOccurred("theme");
	if (this.displayInitialized) {
		this.headsUpHR();
		this.clearPixelCache();
		this.updateListeners("theme"); // Not sure if this is necessary, but leaving here just in case.
		this.draw();
	}
};

};
__js_standard_theme_(typeof window !== "undefined" ? window : global);
