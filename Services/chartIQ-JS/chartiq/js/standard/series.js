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


let __js_standard_series_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Adds a series of data to the chart.
 *
 * A series can be rendered (for instance like a comparison chart) or it can be hidden (for instance to drive a study).
 *
 * If you have a quotefeed attached to your chart, then just pass the symbol as the first parameter.
 * There is no need to pass data since the chart will automatically fetch it from your quotefeed.
 * If however you are using the "push" method to feed data to your chart then you must provide the data manually by passing it as a parameter.
 *
 * Here's how you would add a hidden series for symbol "IBM" when using a quotefeed:
 * ```
 * stxx.addSeries("IBM");
 * ```
 *
 * That series will now be available for use by studies, for example, but it will not display on the chart since no rendering details have been provided.
 *
 * If you wish to *display* your series, you must specify how you wish the series to be rendered.
 * At a minimum, you will need to indicate what color should be used to display the series. Like so:
 * ```
 * stxx.addSeries("IBM", {color:"blue"});
 * ```
 *
 * Once a series is added, it will be tracked in the {@link CIQ.ChartEngine.Chart#series} object.
 *
 * To remove a series call {@link CIQ.ChartEngine#removeSeries}
 *
 * To remove all series from a chart, simply iterate through the active series object and delete them one at a time:
 * ```
 * for(var s in stxx.chart.series){
 *    var series=stxx.chart.series[s];
 *    stxx.removeSeries(series);
 * }
 * ```
 *
 * Example 1 - manually add data to a chart and a series<iframe width="100%" height="500" scrolling="no" seamless="seamless" align="top" style="float:top" src="https://jsfiddle.net/chartiq/avem0zcx/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="1"></iframe>
 *
 * The above example adds a series as an overlay, but a more common use case is to display series as comparisons.
 * Comparisons are special because they change the chart from a price chart to a percentage chart.
 * All series on the chart then begin at "zero", on the left side of the chart.
 * Set isComparison=true when adding a series to make it a comparison chart.  As long as a comparison series is on a chart, the chart will display its y-axis in percent scale
 * provided {@link CIQ.ChartEngine.Chart#forcePercentComparison} is true.
 * ```
 * stxx.addSeries("IBM", {color:"blue", isComparison:true});
 * ```
 *
 * **Complex Visualizations**
 *
 * Example 2 - use a custom renderer to display a series<iframe width="100%" height="500" scrolling="no" seamless="seamless" align="top" style="float:top" src="https://jsfiddle.net/chartiq/b6pkzrad/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="1"></iframe>
 *
 * Behind the scenes, series are displayed by [renderers]{@link CIQ.Renderer}.
 * Renderers can plot lines, mountains, bars, candles, and other types of visualizations.
+* When adding a series, you can specify which renderer to use and set parameters to control your visualization.
 * For instance, this will display a series as a bar chart on its own left axis:
 * ```
 * stxx.addSeries(
 * 		"SNE",
 * 		{
 * 			display:"Sony",
 * 			renderer:"Bars",
 * 			name:"test",
 * 			yAxis:{
 * 				position:"left",
 * 				textStyle:"#FFBE00"
 * 			}
 * 		}
 * );
 * ```
 * Which is the same as explicitly declaring a renderer and then attaching it to the series:
 * ```
 * stxx.addSeries(
 * 		"SNE",
 * 		{
 * 			display:"Sony"
 * 		},
 * 		function(){
 * 			// create the axis
 * 			var axis=new CIQ.ChartEngine.YAxis({position:"left", textStyle:"#FFBE00"});
 *
 * 			//create the renderer and attach
 * 			var renderer=stxx.setSeriesRenderer(
 * 				new CIQ.Renderer.Bars({params:{name:"test", yAxis:axis}})
 * 			);
 * 			renderer.attachSeries("SNE").ready();
 * 		}
 * );
 * ```
 * The above 2 calls do exactly the same thing, just using different syntax.
 *
 * All parameters specified in addSeries will be passed on to the selected renderer. As such, every parameter available for the selected renderer can be used here to further customize the series.<br>
 * For example, to add a step line, you would select a [Lines]{@link CIQ.Renderer.Lines} renderer, and then set its `step` attribute, right trough the addSeries API call.
 * ```
 * stxx.addSeries(
 * 		"SNE",
 * 		{
 * 			renderer:"Lines",
 * 			step:true,
 * 		}
 * );
 * ```
 *
 * **Advanced Visualizations**
 *
 * Some renderers are capable of rendering *multiple series*.
 * For instance, the [Histogram]{@link CIQ.Renderer.Histogram} can display series stacked on top of one another.
 * Use `[setSeriesRenderer()]{@link CIQ.ChartEngine#setSeriesRenderer}` in this case.
 * Here is how we would create a stacked histogram from several series:
 * ```
 * var myRenderer=stxx.setSeriesRenderer(new CIQ.Renderer.Histogram({params:{subtype:"stacked"}}));
 *
 * stxx.addSeries("^NIOALL", {},
 * 		function() {myRenderer.attachSeries("^NIOALL","#6B9CF7").ready();}
 * );
 * stxx.addSeries("^NIOAFN", {},
 * 		function() {myRenderer.attachSeries("^NIOAFN","#95B7F6").ready();}
 * );
 * stxx.addSeries("^NIOAMD", {},
 * 		function() {myRenderer.attachSeries("^NIOAMD","#B9D0F5").ready();}
 * );
 * ```
 *
 * Example 3 - advanced stacked histogram renderer<iframe width="100%" height="500" scrolling="no" seamless="seamless" align="top" style="float:top" src="https://jsfiddle.net/chartiq/rb423n71/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="1"></iframe>
 *
 * **Using a Symbol Object**
 *
 * The above examples all assumed your chart uses "tickers" (stock symbols).
 * We refer to complex (compound) symbols as "Symbol Objects" (see {@link CIQ.ChartEngine#loadChart}).
 * Here's how to set a series with a symbol object:
 * ```
 * stxx.addSeries(null, {color:"blue", symbolObject:yourSymbolObject});
 * ```
 *
 * **Setting a separate YAxis**
 *
 * By default, series are displayed without a y-axis.
 * They are either "overlayed" on the main chart, or if they are comparisons then they share the standard y-axis.
 * But a series can also take an optional y-axis which can be displayed on the left, or the right side of the chart.
 * To do this, you must specify parameters for a [YAxis]{@link CIQ.ChartEngine.YAxis} object and pass to addSeries:
 * ```
 * stxx.addSeries("IBM", {color:"blue", yAxis:{ position:"left" }});
 * ```
 *
 * **Understanding the relationship between [setSeriesRenderer()]{@link CIQ.ChartEngine#setSeriesRenderer} and [importLayout]{@link CIQ.ChartEngine#importLayout}**
 *
 * It is important to know that a renderer explicitly created using [setSeriesRenderer()]{@link CIQ.ChartEngine#setSeriesRenderer} will **not** be stored in the layout serialization.
 * If your implementation will require the complete restoration of a chart layout, you must instead use the syntax that includes all of the renderer parameters as part of this addSeries call.
 *
 *
 * @param {string} [id] The name of the series. If not passed then a unique ID will be assigned. (parameters.symbol and parameters.symbolObject will default to using id if they are not set explicitly *and* id is supplied.)
 * @param {object} [parameters] Parameters to describe the series. Any valid [attachSeries parameters]{@link CIQ.Renderer#attachSeries} and [renderer parameters]{@link CIQ.Renderer} will be passed to attached renderers.
 * @param {string} [parameters.renderer={@link CIQ.Renderer.Lines}] <span class="injection">Rendering</span> Set to the desired [renderer]{@link CIQ.Renderer} for the series.
 * - If not set, defaults to [Lines]{@link CIQ.Renderer.Lines} when `color` is set.
 * - Not needed for hidden series.
 * @param {string} [parameters.name] <span class="injection">Rendering</span> Set to specify renderer's name.  Otherwise, `id` will be used.
 * @param {string} [parameters.display=id/symbol] <span class="injection">Rendering</span> Set to the text to display on the legend. If not set, the id of the series will be used (usually symbol).  If id was not provided, will default to symbol.
 * @param {string} [parameters.symbol=id] <span class="injection">Data Loading</span> The symbol to fetch in string format. This will be sent into the fetch() function, if no data is provided.  If no symbol is provided, series will use the `id` as the symbol. If both `symbol` and `symbolObject` are set, `symbolObject` will be used.
 * @param {object} [parameters.symbolObject=id] <span class="injection">Data Loading</span> The symbol to fetch in object format. This will be sent into the fetch() function, if no data is provided. If no symbolObject is provided, series will use the `id` as the symbol. You can send anything you want in the symbol object, but you must always include at least a 'symbol' element. If both `symbol` and `symbolObject` are set, `symbolObject` will be used.
 * @param {string} [parameters.field=Close/Value] <span class="injection">Data Loading</span> Specify an alternative field to draw data from (other than the Close/Value). Must be present in your pushed data objects or returned from the quoteFeed.
 * @param {boolean} [parameters.isComparison=false] <span class="injection">Rendering</span> If set to true, shareYAxis is automatically set to true to display relative values instead of the primary symbol's price labels. {@link CIQ.ChartEngine#setComparison} is also called and set to `true`. This is only applicable when using the primary y-axis, and should only be used with internal addSeries renderers.
 * @param {boolean} [parameters.shareYAxis=false] <span class="injection">Rendering</span>
 * - Set to `true` so that the series shares the primary y-axis, renders along actual values, and prints the corresponding current price label on the y-axis.
 * - When set to `false`, the series will not be attached to a y-axis. Instead, it is superimposed on the chart; taking over its entire height, and maintaining the relative shape of the line. No current price will be displayed. Superimposing the ‘shape’ of one series over a primary chart, is useful when rendering multiple series that do not share a common value range.
 * - This setting will automatically override to true if 'isComparison' is set.
 * - This setting is only applicable when using the primary y-axis and has no effect when using a renderer that has its own axis.
 * @param {number} [parameters.marginTop=0] <span class="injection">Rendering</span> Percentage (if less than 1) or pixels (if greater than 1) from top of panel to set the top margin for the series.<BR>**Note:** this parameter is to be used on **subsequent** series rendered on the same axis. To set margins for the first series, {@link CIQ.ChartEngine.YAxis#initialMarginTop} needs to be used.<BR>**Note:** not applicable if shareYAxis is set.
 * @param {number} [parameters.marginBottom=0] <span class="injection">Rendering</span> Percentage (if less than 1) or pixels (if greater than 1) from the bottom of panel to set the bottom margin for the series.<BR>**Note:** this parameter is to be used on **subsequent** series rendered on the same axis. To set margins for the first series, {@link CIQ.ChartEngine.YAxis#initialMarginBottom} needs to be used.<BR>**Note:** not applicable if shareYAxis is set.
 * @param {number} [parameters.width=1] <span class="injection">Rendering</span> Width of line in pixels
 * @param {number} [parameters.minimum] <span class="injection">Rendering</span> Minimum value for the series. Overrides CIQ.minMax result.
 * @param {number} [parameters.maximum] <span class="injection">Rendering</span> Maximum value for the series. Overrides CIQ.minMax result.
 * @param {string} [parameters.color] <span class="injection">Rendering</span> Color used to draw the series line. Causes the line to immediately render an overlay. Only applicable for default or single-color renderers.
 * 		<p>Must be an RGB, RGBA, or three- or six&#8209;digit hexadecimal color number or <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value" target="_blank"> CSS color keyword</a>; for example, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)", "#f00", "#FF0000", or "red".
 * 		<p>See {@link CIQ.Renderer#attachSeries} for additional color options.
 * @param {string} [parameters.baseColor=parameters.color] <span class="injection">Rendering</span> Color for the base of a mountain series.
 * @param {array|string} [parameters.pattern='solid'] <span class="injection">Rendering</span> Pattern to draw line, array elements are pixels on and off, or a string e.g. "solid", "dotted", "dashed"
 * @param {boolean|string} [parameters.fillGaps] <span class="injection">Data Loading</span> If {@link CIQ.ChartEngine#cleanupGaps} is enabled to clean gaps (not 'false'), you can use this parameter to override the global setting for this series.
 * - If `fillGaps` not present
 *   - No gaps will be filled for the series.
 * - If `fillGaps` is set to 'false'
 *   - No gaps will be filled for the series.
 * - If `fillGaps` is set to 'true',
 *   - Gap filling will match {@link CIQ.ChartEngine#cleanupGaps}.
 * - If `fillGaps` is set to  'carry' or 'gap'
 *   - Will use that filling method even if `cleanupGaps` is set differently.
 * @param {object|string} [parameters.gapDisplayStyle=true] <span class="injection">Rendering</span> Defines how (or if) to **render** (style) connecting lines where there are gaps in the data (missing data points), or isolated datapoints.
 * - Applicable for line-like renderers only (lines, mountains, baselines, etc).
 * - Default:
 *   - `true` for standard series.
 *   - `false` for comparisons.
 * - Set to `true` to use the color and pattern defined by {@link CIQ.ChartEngine#setGapLines} for the chart.
 * - Set to `false` to always show gaps.
 * - Set to an actual color string or custom color-pattern object as formatted by {@link CIQ.ChartEngine#setGapLines} to define more custom properties.
 * - 'Dots' indicating isolated items will be shown unless a `transparent` color/style is specified.
 * - If not set, and the series is a comparison, the gaps will always be rendered transparent.
 * @param {string} [parameters.fillStyle] <span class="injection">Rendering</span> Fill style for mountain chart (if selected). For semi-opaque use rgba(R,G,B,.1).  If not provided a gradient is created with color and baseColor.
 * @param {boolean} [parameters.permanent=false] <span class="injection">Rendering</span> Set to `true` to activate. Makes series unremoveable by a user **when attached to the default renderer**. If explicitly linked to a renderer, see {@link CIQ.Renderer#attachSeries} for details on how to prevent an attached series from being removed by a user.
 * @param {object} [parameters.data] <span class="injection">Data Loading</span> Data source for the series.
 * If this field is omitted, the library will connect to the QuoteFeed (if available) to fetch initial data ( unless `parameters.loadData` is set to `false`), and manage pagination and updates.
 * If data is sent in this field, it will be loaded into the masterData, but series will **not** be managed by the QuoteFeed (if available) for pagination or updates.
 * Items in this array *must* be ordered from earliest to latest date.<br>
 * Accepted formats:
 * <br><br><br>**Full OHLC:**<br>
 * An array of properly formatted OHLC quote object(s). [See OHLC Data Format]{@tutorial InputDataFormat}.<br>
 * <br>----<br><br>**Price Only:**<br>
 * An array of objects, each one with the following elements:<br>
 * @param {date} [parameters.data.DT] JavaScript date object or epoch representing data point (overrides Date parameter if present)
 * @param {string} [parameters.data.Date] string date representing data point ( only used if DT parameter is not present)
 * @param {number} [parameters.data.Value] value of the data point ( As an alternative, you can send `parameters.data.Close` since your quote feed may already be returning the data using this element name)
 * @param {number} [parameters.data.Close] value of the data point ( Used as an alternative to `parameters.data.Value`)
 * @param {string|boolean} [parameters.panel] <span class="injection">Rendering</span> The panel name on which the series should display. If the panel doesn't exist, one will be created. If `true` is passed, a new panel will also be created.
 * @param {string} [parameters.action='add-series'] <span class="injection">Rendering</span> Overrides what action is sent in symbolChange events. Set to null to prevent a symbolChange event.
 * @param {boolean} [parameters.loadData=true] <span class="injection">Data Loading</span> Include and set to false if you know the initial data is already in the masterData array or will be loaded by another method. The series will be added but no data requested. Note that if you remove this series, the data points linked to it will also be removed which may create issues if required by the chart. If that is the case, you will need to manually remove from the renderer linked to it instead of the underlying series itself.
 * @param {boolean} [parameters.extendToEndOfDataSet] <span class="injection">Rendering</span> Set to true to plot any gap at the front of the chart.  Automatically done for step charts (set to false to disable) or if parameters.gapDisplayStyle are set (see {@link CIQ.ChartEngine#addSeries})
 * @param {boolean} [parameters.displayFloatingLabel=false] <span class="injection">Rendering</span> Set to false to disable the display of a y-axisfloating label for this series.
 * @param {boolean|object} [parameters.baseline] <span class="injection">Rendering</span> If a boolean value, indicates whether the series renderer draws a baseline. If an object, must be the equivalent of {@link CIQ.ChartEngine.Chart#baseline}.
 * @param {function} [parameters.responseHandler] Optional function to override the processing of data. Function accepts an object argument with `symbol`and `symbolObject` properties.  If omitted, uses a default implementation.
 * @param {boolean} [parameters.retoggle] Set to true to indicate that series should be reloaded when loading a new chart.
 * @param {function} [parameters.processResults] Optional function to perform on the returned result set. Function accepts arguments (stx, error, series, data). Called within responseHandler function.
 * @param {function} [parameters.takedownResults] Optional function to perform when removing series. Complements `processResults`. Function accepts arguments (stx, seriesId).
 * @param {boolean} [parameters.stretchGaps] Set to true to cause gaps to be represented by a horizontal line.
 * @param {boolean} [parameters.noStorage] Set to true to disable export of the series when saving layout.
 * @param {function} [cb] Callback function to be executed once the fetch returns data from the quoteFeed. It will be called with an error message if the fetch failed: `cb(err);`. Only applicable if no data is provided.
 * @return {object} The series object.
 *
 * @memberof CIQ.ChartEngine
 * @since
 * - 04-2015 If `isComparison` is true shareYAxis is automatically set to true and setComparison(true) called. createDataSet() and draw() are automatically called to immediately render the series.
 * - 15-07-01 If `color` is defined and chartStyle is not set then it is automatically set to "line".
 * - 15-07-01 Ability to use setSeriesRenderer().
 * - 15-07-01 Ability to automatically initialize using the quoteFeed.
 * - 15-07-01 `parameters.quoteFeedCallbackRefresh` no longer used. Instead if `parameters.data.useDefaultQuoteFeed` is set to `true` the series will be initialized and refreshed using the default quote feed. (Original documentation: `{boolean} [parameters.quoteFeedCallbackRefresh]` Set to true if you want the series to use the attached quote feed (if any) to stay in sync with the main symbol as new data is fetched (only available in Advanced package).)
 * - 2015-11-1 `parameters.symbolObject` is now available.
 * - 05-2016-10 `parameters.forceData` is now available.
 * - 09-2016-19 `parameters.data.DT` can also take an epoch number.
 * - 09-2016-19 `parameters.data.useDefaultQuoteFeed` no longer used. If no `parameters.data` is provided the quotefeed will be used.
 * - 3.0.8 `parameters.forceData` no longer used, now all data sent in will be forced.
 * - 3.0.8 `parameters.loadData` added.
 * - 4.0.0 Added `parameters.symbol` (string equivalent of parameters.symboObject).
 * - 4.0.0 Multiple series can now be added for the same underlying symbol. parameters.field or parameters.symbolObject can be used to accomplish this.
 * - 4.0.0 Added `parameters.baseColor`.
 * - 5.1.0 Series data now added to masterData as an object. This allows storage of more than just one data point, facilitating OHLC series!
 * - 5.1.0 addSeries will now create a renderer unless renderer, name and color parameters are all omitted.
 * - 5.1.0 Now also dispatches a "symbolChange" event when pushing data into the chart, rather than only when using a quote feed.
 * - 5.1.1 Added `parameters.extendToEndOfDataSet`.
 * - 5.1.1 `parameters.chartType`, originally used to draw "mountain" series, has been deprecated in favor of the more flexible 'renderer' parameter. It is being maintained for backwards compatibility.
 * - 5.2.0 `parameters.gaps` has been deprecated (but maintained for backwards compatibility) and replaced with `parameters.gapDisplayStyle`.
 * - 6.0.0 `parameters.fillGaps` is now a string type and can accept either "carry" or "gap".  Setting to true will use the value of stxx.cleanupGaps.
 * - 6.2.0 No longer force 'percent'/'linear', when adding/removing comparison series, respectively, unless {@link CIQ.ChartEngine.Chart#forcePercentComparison} is true. This allows for backwards compatibility with previous UI modules.
 * - 6.3.0 If a panel name is passed into the function, a new panel will be created if one doesn't already exist.
 * - 6.3.0 Added `parameters.displayFloatingLabel`.
 * - 8.1.0 Supports custom baselines. See example.
 * - 8.2.0 Added `parameters.baseline`.
 * - 8.9.2 Added `parameters.stretchGaps`.
 * - 9.0.0 Added `parameters.responseHandler`, `parameters.noStorage`, `parameters.retoggle`, `parameters.processResults`, and `parameters.takedownResults`.
 *
 * @example <caption>Add a series overlay and display it as a dashed line.</caption>
 * stxx.addSeries(
 *		"IBM",
 *		{color:"purple", pattern:[3,3]}
 * );
 *
 * @example <caption>Add a series onto the main axis and then create a moving average study that uses it.</caption>
 * // Note, this will work for any study that accepts a "Field" parameter.
 *
 *	stxx.addSeries("ge", {color:"yellow", shareYAxis:true}, function(){
 *		let inputs = {
 *	        "Period": 20,
 *	        "Field": "ge",
 *	        "Type": "ma"
 *	    };
 *	    let outputs = {
 *	        "MA": "red"
 *	    };
 *	    CIQ.Studies.addStudy(stxx, "ma", inputs, outputs);
 *	});
 *
 * @example <caption>Add series using a symbolObject which includes the data source key.</caption>
 * // This key will be sent into the fetch 'params' for use in your quoteFeed.
 * let mySymbol = {symbol:"GE", source:"realtimedb"};
 * let mySymbol2 = {symbol:"GDP", source:"fundamentaldb"};
 *
 * stxx.addSeries(null, {color:"purple", symbolObject:mySymbol});
 * stxx.addSeries(null, {color:"green", symbolObject:mySymbol2});
 *
 * @example <caption>Set a custom field.</caption>
 * // The engine is smart enough to use the series symbol, or "Close" if the symbol doesn't exist in the returned data from your quotefeed
 * // but if you want to use any other field then you'll need to specify it like this.
 * stxx.addSeries("GE", {color:"purple", field: "Open"});
 *
 * @example <caption>Add the comparison series with a color to immediately render using default renderer (as lines) and dashes for gaps fillers.</caption>
 *	stxx.addSeries(symbol1, {display:"Description 1",isComparison:true,color:"purple", gapDisplayStyle:{pattern:[3,3]},width:4,permanent:true});
 *	stxx.addSeries(symbol2, {display:"Description 2",isComparison:true,color:"pink", gapDisplayStyle:{pattern:[3,3]},width:4});
 *	stxx.addSeries(symbol3, {display:"Description 3",isComparison:true,color:"brown", gapDisplayStyle:{pattern:[3,3]},width:4});
 *
 * @example <caption>Add the series with only default parameters (no color).</caption>
 *	// The series will not display on the chart after it is added,
 *	// but the data will be available ready to be attached to a renderer.
 *	stxx.addSeries(symbol1, {display:"Description 1"});
 *	stxx.addSeries(symbol2, {display:"Description 2"});
 *	stxx.addSeries(symbol3, {display:"Description 3"});
 *
 * @example <caption>Add a series with a color to immediately render.</caption>
 * // It also calls callbackFunct after the data is returned from the fetch.
 *	function callbackFunct(field){
 *		 return function(err) {
 *			CIQ.alert(field);
 *		}
 *	}
 *
 *	stxx.addSeries(symbol1, {display:"Description",color:"brown"}, callbackFunct(symbol1));
 *
 * @example <caption>Add a stacked historam with three series usng an external renderer.</caption>
 *
 * // Note how the addSeries callback is used to ensure the data is present before the series is displayed.
 *
 * // Configure the histogram display.
 * let params={
 *	name:				"Sentiment Data",
 *	subtype:			"stacked",
 *	heightPercentage:	.7,	 // How high to go. 1 = 100%
 *	opacity:			.7,  // Alternatively can use rgba values in histMap instead
 *	widthFactor:		.8	 // to control space between bars. 1 = no space in between
 * };
 *
 * // Legend creation callback.
 * function histogramLegend(colors){
 * 	stxx.chart.legendRenderer(stxx,{legendColorMap:colors, coordinates:{x:260, y:stxx.panels["chart"].yAxis.top+30}, noBase:true});
 * }
 *
 * let histRenderer=stxx.setSeriesRenderer(new CIQ.Renderer.Histogram({params: params, callback: histogramLegend}));
 *
 * stxx.addSeries("^NIOALL", {display:"Symbol 1"}, function() {histRenderer.attachSeries("^NIOALL","#6B9CF7").ready();});
 * stxx.addSeries("^NIOAFN", {display:"Symbol 2"}, function() {histRenderer.attachSeries("^NIOAFN","#95B7F6").ready();});
 * stxx.addSeries("^NIOAMD", {display:"Symbol 3"}, function() {histRenderer.attachSeries("^NIOAMD","#B9D0F5").ready();});
 *
 * @example <caption>Add a series overlay for data that *already exists in the chart*.</caption>
 * // By setting loadData to false, the chart will assume the data exists, and not request it from the quotefeed.
 * stxx.addSeries(
 *		"Close",
 *		{color:"purple", loadData:false}
 * );
 *
 * @example <caption>Add multiple series and attach them all to the same renderer with a custom y-axis on the left.</caption>
 *	// See this example working here: https://jsfiddle.net/chartiq/b6pkzrad.
 *
 *	// Note how the addSeries callback is used to ensure the data is present before the series is displayed.
 *
 *    stxx.addSeries(
 *    "NOK",
 *    {
 *      renderer: "Lines",              // Create a line renderer
 *      type: "mountain",               // of mountain type
 *      yAxis: {                        // and give it its own y-axis
 *          position: "left",           // on the left
 *          textStyle: "#0044FF",       // with labels of color #0044FF
 *          decimalPlaces: 0,           // no decimal places on the labels
 *          maxDecimalPlaces: 0,        // and no defimal places on the last price floating label either.
 *       },
 *        name: "left_axis_renderer",   // Call the custom renderer "left_axis_renderer", so it can be referenced by other series.
 *        color: "#FFBE00",             // Set the line color to "#FFBE00"
 *        width: 4,                     // and a width of 4.
 *        display: "NOK Sample",        // Finally, use a different display name of "NOK Sample" on the tooltip.
 *      },
 *      function(){
 *       stxx.addSeries(                // Now that the first series and rederer has been set
 *          "SNE",                      // add the 2nd series using that same renderer.
 *          {
 *            name: "left_axis_renderer",
 *            color: "#FF1300",
 *            display: "Sony Sample",
 *          }
 *        );
 *      }
 *   );
 *
 * @example <caption>Add a series with a colored bar renderer using default colors.</caption>
 * stxx.addSeries("MSFT",{renderer:"Bars", colored:true});
 *
 *	@example <caption>Add a candle series for GE, and display it's Bid and Ask.</caption>
 * // Assuming Bid/Ask data is NOT part of the initial data objects and can be fetched individually using different instrument IDs.
 * stxx.addSeries('ge',{renderer:'Candles',shareYAxis:true});
 * stxx.addSeries('geBid',{display:'Ge Bid',symbol:'ge',field:'Bid',color:'yellow',renderer:'Lines',shareYAxis:true});
 * stxx.addSeries('geAsk',{display:'Ge Ask',symbol:'ge',field:'Ask',color:'blue',renderer:'Lines',shareYAxis:true});
 *
 * @example <caption>Add a series with a candle renderer using custom colors.</caption>
 * stxx.addSeries("MSFT",
 *		{
 *			renderer:"Candles",
 *			fill_color_up:"magenta",
 *			border_color_up:"purple",
 *			fill_color_down:"lightgreen",
 *			border_color_down:"green"
 *		}
 * );
 *
 * @example <caption>Add a series with Histogram renderer using default colors.</caption>
 * stxx.addSeries('ge', {renderer:"Histogram", color: 'red'});
 *
 * @example <caption>Add a series with tension to cause the lines to be curved instead of straight.</caption>
 * // The "tension" parameter is a line renderer parameter.
 * // The 'renderer:"Lines"' parameter could theoretically be omitted since it is the default renderer.
 * stxx.addSeries('GE',{renderer:"Lines", type:'mountain',color:'yellow',tension:0.3})
 *
 * @example <caption>Display an inverted chart for instrument "T" using equations as symbols</caption>
 * // Note the formatter used to change the sign of the axis values.
 * let axis2 = new CIQ.ChartEngine.YAxis(
 * 		{
 * 			position:"left",
 * 			textStyle:"#FFBE00",
 * 			priceFormatter:function(stx, panel, price, decimalPlaces){return stx.formatYAxisPrice(price, panel, decimalPlaces)*-1}
 * 		}
 * );
 *
 * stxx.addSeries("=-1*T", {display:"Test",width:4,renderer:"Lines",color:"#FFBEDD",yAxis:axis2},function(){});
 *
 * // This will display the same series in the standard scale.
 * let axis3 = new CIQ.ChartEngine.YAxis({position:"left",textStyle:"#FFBE00"});
 * stxx.addSeries("T", {display:"Test",width:4,renderer:"Lines",color:"#FFBEDD",yAxis:axis3},function(){});
 *
 * @example <caption>Add a series that will use its own custom y-axis on the left.</caption>
 * // Note that the renderer does not need to be explicitly declared;
 * // nor does the y-axis, since they will only belong to this one series.
 * // The addSeries call will take the pertinent parameters and internally
 * // create the required axis and render objects that will be associated with it.
 * stxx.addSeries("T",
 * 		{
 * 				display:"Test",
 * 				renderer:"Lines",
 * 				type:'mountain',
 * 				color:"#FFBEDD",
 * 				yAxis:{position:"left", textStyle:"#FFBE00"}
 * 		},
 * 		function(){console.log('This is a callback. All done.')}
 * );
 *
 * @example <caption>Use a renderer to display heat map data points.</caption>
 *  // Each attached series will represent a stream of colors for the heat map.
 *  // Note special data formatting, where the custom field that will be used for the stream of data points,
 *  // is an array of values -- 'Bids' in this example.
 *  let renderer = stxx.setSeriesRenderer(new CIQ.Renderer.Heatmap());
 *  stxx.addSeries(
 *   	"L2",
 * 			{ data:[
 *       		{DT:"2019-01-04",Bids:[100,100.3,100.2,101]},
 *       		{DT:"2019-01-07",Bids:[101,101.5,102,103]},
 *       		{DT:"2019-01-08",Bids:[101.2,101.5,101.7,102]},
 *        		{DT:"2019-01-09",Bids:[101.3,101.7,101.9]},
 *       		{DT:"2019-01-10",Bids:[102]}]
 *   		},
 *    	function(){
 *             renderer.attachSeries("L2", {field:"Bids",color:"#FF9300"}).ready();
 *   	}
 *  );
 *
 * @example <caption>Add a series with a default baseline.</caption>
 * stxx.addSeries("GOOG", {baseline: true, color: "purple"});
 * @example <caption>Add a series with a custom baseline.</caption>
 * stxx.addSeries("GOOG", {baseline: {defaultLevel: 105}, color: "purple"});
 */
CIQ.ChartEngine.prototype.addSeries = function (id, parameters, cb) {
	var injectionResult = this.runPrepend("addSeries", arguments);
	if (injectionResult) return injectionResult;
	var display = id ? id : null; // if id is passed then we default display to the same value (we can always override with parameters.display)
	var symbol = id;
	if (!id) id = CIQ.uniqueID();
	if (parameters && parameters.panel === true) parameters.panel = id; // panel name set to boolean true, change it
	var obj = {
		parameters: parameters ? CIQ.clone(parameters) : {},
		yValueCache: [],
		display: display,
		id: id,
		loading: parameters ? parameters.loadData !== false : true
	};
	obj.parameters.yAxis = parameters && parameters.yAxis; // revert the cloning of yaxis
	parameters = obj.parameters;
	if (parameters.symbol) symbol = parameters.symbol;
	if (parameters.isComparison) parameters.shareYAxis = true;
	if (
		parameters.yAxis &&
		!(parameters.yAxis instanceof CIQ.ChartEngine.YAxis)
	) {
		parameters.yAxis = new CIQ.ChartEngine.YAxis(parameters.yAxis); // in case it gets passed as a plain object
	}
	CIQ.ensureDefaults(parameters, {
		chartName: this.chart.name,
		symbolObject: { symbol: symbol },
		panel: this.chart.panel.name,
		fillGaps: false,
		action: "add-series"
	});
	if ("display" in parameters) obj.display = parameters.display;
	var chart = this.charts[parameters.chartName];
	var symbolObject = parameters.symbolObject;
	symbol = parameters.symbol = symbolObject.symbol;
	if (parameters.isEvent) symbolObject.isEvent = true;

	if (!obj.display) obj.display = symbol || parameters.field; // If after all this time, we still don't have a display, then resort to the reasonable alternative of using the symbol or field
	obj.endPoints = {};

	// backwards compatability for pre 4.0
	if (!parameters.gapDisplayStyle && parameters.gapDisplayStyle !== false)
		parameters.gapDisplayStyle = parameters.gaps;
	if (parameters.isComparison) {
		// if gapDisplayStyle parameters isn't defined the gaps will be rendered transparent
		if (parameters.gapDisplayStyle === undefined)
			parameters.gapDisplayStyle = "transparent";
	}

	var existsAlready = this.getSeries({
		symbolObject: symbolObject,
		chart: chart,
		includeMaster: true
	});

	// if panel doesn't exist, create a new panel
	var panelName = parameters.panel;
	if (!this.panels[panelName]) {
		var yAxis = parameters.yAxis || new CIQ.ChartEngine.YAxis();
		yAxis.name = id; // a way to check if a series "owns" a panel
		this.createPanel(id, panelName, null, null, yAxis);
		if (!this.preferences.dragging || !this.preferences.dragging.series)
			parameters.highlightable = false;
	} else {
		if (!parameters.yAxis && !parameters.shareYAxis) {
			parameters.yAxis = new CIQ.ChartEngine.YAxis({
				name: id,
				position: "none"
			});
		}
	}

	chart.series[id] = obj;
	var self = this,
		currentlyImporting = this.currentlyImporting;

	function setUpRenderer(stx, obj) {
		var renderer = parameters.renderer || "Lines";
		var name = parameters.name || id;
		if (
			parameters.yAxis &&
			!(parameters.yAxis instanceof CIQ.ChartEngine.YAxis) &&
			!currentlyImporting
		)
			parameters.yAxis.name = name;
		if (
			!parameters.renderer &&
			!parameters.name &&
			!parameters.color &&
			!parameters.chartType
		)
			return; // if no renderer, name, color, nor chartType set, assume will be set later on manual call to attachSeries.
		var r = stx.getSeriesRenderer(name);
		if (!r) {
			let params = {
				name: name,
				overChart: parameters.overChart !== false,
				useChartLegend: true
			};
			if (parameters.chartType) {
				r = CIQ.Renderer.produce(
					parameters.chartType,
					CIQ.extend(
						{
							highlightable: parameters.highlightable,
							dependentOf: parameters.dependentOf,
							panel: parameters.panel,
							yAxis: parameters.yAxis,
							baseline: parameters.baseline
						},
						params
					)
				);
			} else {
				CIQ.ensureDefaults(parameters, params);
				r = new CIQ.Renderer[renderer]({ params: parameters });
			}
			if (!r) return;
			stx.setSeriesRenderer(r);
		}
		r.attachSeries(id, parameters);
		if (parameters.loadData !== false) r.ready();

		stx.layout.symbols = stx.getSymbols({
			"include-parameters": true,
			"exclude-studies": true
		});
		stx.changeOccurred("layout");
	}

	function responseHandler(params) {
		return function (dataCallback) {
			if (!dataCallback.error) {
				var qts = dataCallback.quotes,
					fillGaps = parameters.fillGaps;
				if (!self.cleanupGaps) fillGaps = false; // disable override
				qts = self.doCleanupGaps(qts, self.chart, { cleanupGaps: fillGaps });
				self.updateChartData(qts, self.chart, {
					secondarySeries: symbol,
					noCreateDataSet: true,
					noCleanupDates: true,
					allowReplaceOHL: true
				});
				obj.loading = false;
				obj.moreAvailable = dataCallback.moreAvailable;
				obj.upToDate = dataCallback.upToDate;
				setUpRenderer(self, obj);
			}
			if (parameters.action !== null && !existsAlready.length)
				self.dispatch(currentlyImporting ? "symbolImport" : "symbolChange", {
					stx: self,
					symbol: params.symbol,
					symbolObject: params.symbolObject,
					action: parameters.action,
					id: obj.id,
					parameters: parameters
				});
			if (obj.parameters.processResults)
				obj.parameters.processResults(
					self,
					dataCallback.error,
					obj,
					dataCallback.quotes
				);
			if (cb) cb.call(self, dataCallback.error, obj);
		};
	}

	var handleResponse = parameters.responseHandler || responseHandler;

	if (
		parameters.isComparison &&
		chart.forcePercentComparison &&
		parameters.panel == chart.panel.name &&
		(!parameters.yAxis || parameters.yAxis == chart.yAxis)
	)
		this.setChartScale("percent");

	var masterData = chart.masterData;
	if (!masterData) masterData = chart.masterData = this.masterData = [];
	var masterLength = masterData.length;

	if (parameters.data && !parameters.data.useDefaultQuoteFeed /* legacy */) {
		var parms = {
			symbol: symbol,
			symbolObject: symbolObject,
			action: parameters.action
		};
		handleResponse(parms)({ quotes: parameters.data });
	} else if (existsAlready.length) {
		// This symbol is already in the series
		obj.endPoints = existsAlready[0].endPoints;
		obj.loading = existsAlready[0].loading;
		setUpRenderer(this, obj);
		if (cb) {
			setTimeout(function () {
				cb.call(self, null, obj);
			}, 0);
		}
	} else if (this.quoteDriver && parameters.loadData !== false) {
		// if we have a quote feed, go and fetch it.
		var driver = this.quoteDriver;
		var fetchParams = driver.makeParams(symbol, symbolObject, chart);
		// for comparisons, you must fetch enough data on the new Comparison to match the beginning of the masterData until the current tick.
		// The current tick may be newer than master data last tick, so set the end Date to right now.
		// If the chart is empty, then don't send any dates and allow the fetch to do an initial load
		if (masterLength) {
			fetchParams.startDate = masterData[0].DT;
			fetchParams.endDate = this.isHistoricalMode()
				? masterData[masterData.length - 1].DT
				: new Date();
		}
		if (fetchParams.stx.isEquationChart(fetchParams.symbol)) {
			//equation chart
			CIQ.fetchEquationChart(fetchParams, handleResponse(fetchParams));
		} else {
			var qf = driver.getQuoteFeed(fetchParams);
			if (qf)
				CIQ.ChartEngine.Driver.fetchData(
					4 /*CIQ.QuoteFeed.SERIES*/,
					qf.engine,
					fetchParams,
					handleResponse(fetchParams)
				);
		}
	} else {
		// It might get in here if we depend on loadDependents to initialize the series, such as from importLayout
		setUpRenderer(this, obj);
		if (parameters.action !== null && !existsAlready.length)
			self.dispatch(currentlyImporting ? "symbolImport" : "symbolChange", {
				stx: self,
				symbol: symbol,
				symbolObject: symbolObject,
				action: parameters.action,
				id: obj.id,
				parameters: parameters
			});
		if (cb) cb.call(this, null, obj);
	}

	this.changeOccurred("layout");
	this.runAppend("addSeries", arguments);

	return obj;
};

/**
 * Returns an array of series that match the given filters.
 *
 * If any series is an equation chart then the equation will be searched for the matching symbol.
 *
 * @param  {object} params Parameters
 * @param {string} [params.symbol] Filter for only series that contain this symbol
 * @param {object} [params.symbolObject] Filter for only series that contain this symbolObject
 * @param {boolean} [params.includeMaster] If true then the masterSymbol will be checked for a match too. A blank object will be returned. You should only use this if you're just using this to look for yes/no dependency on a symbol.
 * @param {CIQ.ChartEngine.Chart} [params.chart] Chart object to target
 * @return {array}        Array of series descriptors
 * @memberOf  CIQ.ChartEngine
 * @since 4.0.0
 */
CIQ.ChartEngine.prototype.getSeries = function (params) {
	var chart = params.chart ? params.chart : this.chart;
	var series = chart.series;
	var symbolObject = params.symbolObject;
	if (!symbolObject) symbolObject = { symbol: params.symbol };
	var arr = [];
	for (var id in series) {
		var sd = series[id];
		if (CIQ.symbolEqual(symbolObject, sd.parameters.symbolObject)) arr.push(sd);
	}
	if (params.includeMaster) {
		if (CIQ.symbolEqual(symbolObject, chart.symbolObject)) arr.push({});
	}
	return arr;
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Modifies an existing series. Any passed parameters [extend]{@link CIQ.extend} the existing parameters.
 *
 * @param {string|Object} descriptor Series to modify. Accepts the series object as returned by {@link CIQ.ChartEngine#addSeries} or series ID.
 * @param {Object} [parameters] The parameters to change or add.
 * @param {boolean} [noRecurseDependents] If true, the panel and y-axis changes of the modified series do not propagate to the renderers of dependent series.
 * @return  {Object} The modified series object.
 * @memberof CIQ.ChartEngine
 *
 * @example <caption>Remove a series for a particular symbol.</caption>
 * function replaceComparisonColor(stx, symbol, color){
 *     for (let series in stx.chart.series) {
 *         let seriesParams = stx.chart.series[series].parameters;
 *         if (seriesParams.isComparison && seriesParams.symbol == symbol) {
 *             stx.modifySeries(series, {color: color});
 *         }
 *     }
 *     stx.draw();
 * }
 *
 * @example <caption>Set a custom baseline on an existing series.</caption>
 * stxx.modifySeries('GOOG', { baseline: { defaultLevel: 100 } })
 *
 * @since
 * - 5.1.1
 * - 5.2.0 No longer accepts a callback function.
 * - 7.1.0 Returns the modified series.
 * - 7.3.0 Synchronizes panel and y-axis changes with dependent renderers unless the new parameter,
 * 		`noRecurseDependents`, is set to true.
 * - 8.1.0 Supports custom baselines. See example.
 * - 9.1.0 Saves to layout.
 */
CIQ.ChartEngine.prototype.modifySeries = function (
	descriptor,
	parameters,
	noRecurseDependents
) {
	if (this.runPrepend("modifySeries", arguments)) return;
	if (!parameters) return;

	var series;
	var id;
	var chart;

	if (typeof descriptor === "string") {
		chart = parameters.chartName
			? this.charts[parameters.chartName]
			: this.chart;
		id = descriptor;
		series = chart.series[id];
	} else {
		series = descriptor;
		id = series.id;
		chart = this.charts[series.parameters.chartName];
	}
	if (!series) return;

	var oldPanel = series.parameters.panel;

	CIQ.extend(series.parameters, parameters, true);
	this.getRendererFromSeries(id).modifyRenderer(parameters);
	var myParams = series.parameters;
	var myRenderer;

	if (oldPanel !== myParams.panel)
		this.moveMarkers(
			oldPanel,
			myParams.panel,
			this.getMarkerArray("field", myParams.symbol)
		);

	for (var key in chart.seriesRenderers) {
		var renderer = chart.seriesRenderers[key];
		var rParams = renderer.params;
		var seriesParams = renderer.seriesParams;
		for (var i = 0; i < seriesParams.length; ++i) {
			var originalParams = seriesParams[i];
			var sPanel = this.panels[originalParams.panel];
			var yAxisName = sPanel && sPanel.yAxis.name;
			if (originalParams.id === series.id) {
				if (myParams.panel === true)
					myParams.panel = myParams.dependentOf || myParams.name; // panel name set to boolean true, change it
				rParams.panel = myParams.panel;
				//  only set series yAxis to renderer if explicitly passed in to function args
				if (parameters.yAxis) {
					if (!(parameters.yAxis instanceof CIQ.ChartEngine.YAxis)) {
						parameters.yAxis = new CIQ.ChartEngine.YAxis(parameters.yAxis); // in case it gets passed as a plain object
					}
					rParams.yAxis = parameters.yAxis;
				}
				if (
					myParams.panel != originalParams.panel &&
					rParams.name == yAxisName
				) {
					this.electNewPanelOwner(originalParams.panel); // this should only happen once
				} else {
					var oldYAxis = this.getYAxisByName(myParams.panel, rParams.name);
					if (
						oldYAxis &&
						myParams.yAxis &&
						oldYAxis.name !== myParams.yAxis.name
					) {
						oldYAxis.name = this.electNewYAxisOwner(oldYAxis);
					}
				}
				if (!myParams.field) myParams.field = null;
				// this.registerBaselineToHelper(renderer);
				renderer.attachSeries(id, CIQ.ensureDefaults(myParams, originalParams));
				if (!myParams.field) myParams.field = myParams.subField;
				delete myParams.subField;
				if (
					myParams.isComparison &&
					chart.forcePercentComparison &&
					myParams.panel == chart.panel.name &&
					(!series.parameters.yAxis || myParams.yAxis.name == chart.yAxis.name)
				)
					this.setChartScale("percent");
				myRenderer = renderer;
				break;
			}
		}
	}

	CIQ.getFn("Drawing.updateSource")(
		this,
		myParams.symbol || id,
		null,
		myParams.panel
	);
	this.runAppend("modifySeries", arguments);

	if (noRecurseDependents !== true) {
		// make sure all dependent renderers and studies change their panels and yaxes to match
		var dependents = myRenderer.getDependents(this);
		for (var n = 0; n < dependents.length; n++) {
			if (dependents[n].seriesParams) {
				this.modifySeries(
					dependents[n].params.name,
					{ panel: myRenderer.params.panel, yAxis: series.parameters.yAxis },
					true
				);
			}
			if (dependents[n].study) {
				var dependent = dependents[n];
				dependent = CIQ.Studies.replaceStudy(
					this,
					dependent.inputs.id,
					dependent.type,
					dependent.inputs,
					dependent.outputs,
					dependent.parameters,
					null,
					dependent.study
				);
			}
		}

		// make sure all master renderers change their panels and yaxes to match
		var masterRenderer = chart.seriesRenderers[myRenderer.params.dependentOf];
		if (masterRenderer) {
			if (
				masterRenderer.params.yAxis != series.parameters.yAxis ||
				masterRenderer.params.panel != myRenderer.params.panel
			) {
				this.modifySeries(
					myRenderer.params.dependentOf,
					{ panel: myRenderer.params.panel, yAxis: series.parameters.yAxis },
					true
				);
			}
		}
	}

	this.changeOccurred("layout");
	this.draw();
	return series;
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Removes series data from masterData and unregisters the series from `chart.series` without removing it from any associated renderers.
 * Also updates the [quoteFeed subscriptions]{@link quotefeed.unsubscribe}.
 * **Not recommended to be called directly.**
 * Instead use {@link CIQ.ChartEngine#removeSeries} to remove a series from all associated renderers,
 * or {@link CIQ.Renderer#removeSeries} to remove a series from a specific renderer.
 * @param  {string|object} field The name of the series to remove -OR- the series object itself.
 * @param  {CIQ.ChartEngine.Chart} chart The chart to remove from
 * @param {object} [params] Parameters
 * @param {string} [params.action="remove-series"] Action to be dispatched with symbolChange event
 * @memberOf  CIQ.ChartEngine
 * @since
 * - 4.0.0 Now supports passing a series descriptor instead of a field.
 * - 4.0.0 Series data is now totally removed from masterData if no longer used by any other renderers.
 * - 4.0.0 Empty renderers are now removed when series are removed.
 * - 6.3.0 deleteSeries now calls {@link CIQ.ChartEngine#checkForEmptyPanel}.
 */
CIQ.ChartEngine.prototype.deleteSeries = function (field, chart, params) {
	if (this.runPrepend("deleteSeries", arguments)) return;
	params = params || {};
	const action = params.action || "remove-series";
	let toRemove;
	if (typeof field === "object") {
		toRemove = field.id;
		chart = chart || this.charts[field.parameters.chartName];
	} else {
		toRemove = field;
		chart = chart || this.chart;
	}
	const theSeries = chart.series[toRemove];
	if (!theSeries) return; // prevent js error if removing a series that doesn't exist

	const { isEvent, loadData, symbolObject } = theSeries.parameters;

	if (!this.currentlyImporting) {
		this.getMarkerArray("field", toRemove).forEach((marker) =>
			this.removeFromHolder(marker)
		);
	}

	delete chart.series[toRemove];

	this.layout.symbols = this.getSymbols({
		"include-parameters": true,
		"exclude-studies": true
	});

	// If no more dependencies, then remove the symbol from the actual masterData
	const dependencies = this.getSeries({
		symbolObject,
		includeMaster: true
	});

	if (!isEvent && loadData !== false && !dependencies.length)
		this.cleanMasterData(symbolObject, chart);

	const panel = this.panels[theSeries.parameters.panel];
	if (panel) {
		// panel can be removed before all series can be removed, make sure it still exists
		this.checkForEmptyPanel(panel);
	}

	this.createDataSet();
	this.changeOccurred("layout");
	if (!dependencies.length && !isEvent)
		this.dispatch(this.currentlyImporting ? "symbolImport" : "symbolChange", {
			stx: this,
			symbol: symbolObject.symbol,
			symbolObject,
			id: toRemove,
			action
		});
	if (this.quoteDriver) this.quoteDriver.updateSubscriptions();
	this.runAppend("deleteSeries", arguments);
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Detaches a series added using [addSeries]{@link CIQ.ChartEngine#addSeries} from **all associated renderers** in the chart,
 * removing the actual series data from masterData.
 *
 * If the series belonged to a renderer that no longer has other series attached to it, the renderer is removed as well.
 * See {@link CIQ.Renderer#removeSeries} for more details or how to remove a series from a single renderer and without ever deleting the associated renderer or data.
 *
 * To remove all series from a chart, simply iterate through the active series object and delete them one at a time:
 * ```
 * for(var s in stxx.chart.series){
 *    var series=stxx.chart.series[s];
 *    stxx.removeSeries(series);
 * }
 * ```
 * @param  {string|object} field The name of the series to remove -OR- the series object itself.
 * @param  {CIQ.ChartEngine.Chart} [chart] The chart object from which to remove the series
 * @memberof CIQ.ChartEngine
 * @since
 * - 4.0.0 Now supports passing a series descriptor instead of a field.
 * - 4.0.0 Series data is now totally removed from masterData if no longer used by any other renderers.
 * - 4.0.0 Empty renderers are now removed when series are removed.
 */
CIQ.ChartEngine.prototype.removeSeries = function (field, chart) {
	if (this.runPrepend("removeSeries", arguments)) return;

	var toRemove;
	var deleted = false;

	if (typeof field === "object") {
		toRemove = field.id;
		chart = chart || this.charts[field.parameters.chartName];
	} else {
		toRemove = field;
		chart = chart || this.chart;
	}

	if (chart.series[toRemove]) {
		var takedown = chart.series[toRemove].parameters.takedownResults;
		if (takedown) takedown(this, toRemove);
	}

	for (var r in chart.seriesRenderers) {
		var renderer = chart.seriesRenderers[r];
		var rPanel = this.panels[renderer.params.panel];
		var yAxisName = rPanel && rPanel.yAxis.name;
		for (var sp = renderer.seriesParams.length - 1; sp >= 0; sp--) {
			var series = renderer.seriesParams[sp];
			if (series.id === toRemove) {
				renderer.removeSeries(toRemove);
				if (renderer.seriesParams.length < 1) {
					this.removeSeriesRenderer(renderer);
					if (renderer.params.name == yAxisName) {
						this.electNewPanelOwner(renderer.params.panel);
					} else {
						if (!this.checkForEmptyPanel(renderer.params.panel)) {
							var rendererAxis = this.getYAxisByName(
								rPanel,
								renderer.params.name
							);
							if (rendererAxis) {
								rendererAxis.name =
									rendererAxis.studies[0] || rendererAxis.renderers[1];
							}
						}
					}
				}
				deleted = true;
			}
		}
	}

	if (!deleted)
		this.deleteSeries(toRemove, chart); // just in case the renderer didn't...
	else this.changeOccurred("layout");
	this.resetDynamicYAxis();
	this.draw();
	this.resizeChart();
	this.runAppend("removeSeries", arguments);
};

/**
 * Namespace for functionality related to comparison series.
 *
 * @namespace
 * @name CIQ.Comparison
 */
CIQ.Comparison = CIQ.Comparison || function () {}; // Create namespace

/**
 * For relative comparisons, this is the starting (baseline) point.
 *
 * Valid options are:
 * - A number to specify an absolute amount to be used as the starting value for all percentage changes.
 * - A string containing the symbol of an existing series to be used as the starting value for the comparisons (for instance "IBM"). Computations will then be based on the change from the first visible bar value for the selected symbol.
 * - An empty string will compare against the baseline value of the main series (same as in "percent" scale).
 *
 * See {@link CIQ.ChartEngine#setChartScale} for more details.
 * @type number | string
 * @memberof CIQ.Comparison
 * @since 5.1.0
 */
CIQ.Comparison.initialPrice = 100;

/**
 * Used to compute the initial price when it is supplied as a string
 * @param  {CIQ.ChartEngine.Chart} chart	The specific chart
 * @return {number}			The initial price as a number
 * @memberof CIQ.Comparison
 * @since 5.1.0
 * @private
 */
CIQ.Comparison.getInitialPrice = function (chart) {
	if (chart.initialComparisonPrice) return chart.initialComparisonPrice;
	chart.initialComparisonPrice = 100;
	var symbol = CIQ.Comparison.initialPrice;
	if (typeof symbol == "number") chart.initialComparisonPrice = symbol; // absolute amount
	if (typeof symbol == "string") {
		if (chart.series[symbol] || symbol === "") {
			var priceField = "Close";
			if (chart.defaultPlotField) {
				if (!chart.highLowBars) priceField = chart.defaultPlotField;
			}
			for (
				var i = chart.dataSet.length - chart.scroll - 1;
				i < chart.dataSet.length;
				i++
			) {
				var bar = chart.dataSet[i];
				if (bar) {
					if (bar[symbol] && bar[symbol][priceField]) {
						chart.initialComparisonPrice = bar[symbol][priceField];
						break;
					} else if (symbol === "" && bar[priceField]) {
						chart.initialComparisonPrice = bar[priceField];
						break;
					}
				}
			}
		}
	}
	return chart.initialComparisonPrice;
};

/**
 * Transform function for percent comparison charting
 * @param  {CIQ.ChartEngine} stx	  The charting object
 * @param  {CIQ.ChartEngine.Chart} chart	The specific chart
 * @param  {number} price The price to transform
 * @param  {CIQ.ChartEngine.YAxis} [yAxis] Axis where price is to be found
 * @param  {string} [field] Field whose price needs converting, otherwise the main series is converted
 * @return {number}			The transformed price (into percentage)
 * @memberof CIQ.Comparison
 * @since 8.4.0 Added `yAxis` and `field` parameters. Can now transform a series price,
 * provided the series name is set in the `field` parameter.
 */
CIQ.Comparison.priceToPercent = function (stx, chart, price, yAxis, field) {
	let baseline = stx.comparisonBaseline;
	if (baseline && field in baseline) baseline = baseline[field];
	if (baseline && typeof baseline === "object")
		baseline = baseline[chart.defaultPlotField || "Close"];
	baseline = baseline || price;
	return Math.round(((price - baseline) / baseline) * 100 * 10000) / 10000;
};

/**
 * Untransform function for percent comparison charting
 * @param  {CIQ.ChartEngine} stx	  The charting object
 * @param  {CIQ.ChartEngine.Chart} chart	The specific chart
 * @param  {number} percent The price to untransform
 * @param  {CIQ.ChartEngine.YAxis} [yAxis] Axis where price is to be found
 * @param  {string} [field] Field whose price needs converting, otherwise the main series is converted
 * @return {number}			The untransformed price
 * @memberof CIQ.Comparison
 * @since 8.4.0 Added `yAxis` and `field` parameters. Can now untransform a series price,
 * provided the series name is set in the `field` parameter.
 */
CIQ.Comparison.percentToPrice = function (stx, chart, percent, yAxis, field) {
	let baseline = stx.comparisonBaseline;
	if (baseline && field in baseline) baseline = baseline[field];
	if (baseline && typeof baseline === "object")
		baseline = baseline[chart.defaultPlotField || "Close"];
	baseline = baseline || 1;
	return baseline * (1 + percent / 100);
};

/**
 * Transform function for relative comparison charting
 * @param  {CIQ.ChartEngine} stx	  The charting object
 * @param  {CIQ.ChartEngine.Chart} chart	The specific chart
 * @param  {number} price The price to transform
 * @param  {CIQ.ChartEngine.YAxis} [yAxis] Axis where price is to be found
 * @param  {string} [field] Field whose price needs converting, otherwise the main series is converted
 * @return {number}			The transformed price (relative to {@link CIQ.Comparison.initialPrice})
 * @memberof CIQ.Comparison
 * @since
 * - 5.1.0
 * - 8.4.0 Added `yAxis` and `field` parameters. Can now transform a series price,
 * 		provided the series name is set in the `field` parameter.
 */
CIQ.Comparison.priceToRelative = function (stx, chart, price, yAxis, field) {
	let baseline = stx.comparisonBaseline,
		initialPrice = CIQ.Comparison.getInitialPrice(chart);
	if (baseline && field in baseline) baseline = baseline[field];
	if (baseline && typeof baseline === "object")
		baseline = baseline[chart.defaultPlotField || "Close"];
	return (initialPrice * price) / (baseline || price);
};

/**
 * Untransform function for relative comparison charting
 * @param  {CIQ.ChartEngine} stx	  The charting object
 * @param  {CIQ.ChartEngine.Chart} chart	The specific chart
 * @param  {number} relative The price to untransform
 * @param  {CIQ.ChartEngine.YAxis} [yAxis] Axis where price is to be found
 * @param  {string} [field] Field whose price needs converting, otherwise the main series is converted
 * @return {number}			The untransformed price
 * @memberof CIQ.Comparison
 * @since
 * - 5.1.0
 * - 8.4.0 Added `yAxis` and `field` parameters. Can now transform a series price,
 * 		provided the series name is set in the `field` parameter.
 */
CIQ.Comparison.relativeToPrice = function (stx, chart, relative, yAxis, field) {
	let baseline = stx.comparisonBaseline,
		initialPrice = CIQ.Comparison.getInitialPrice(chart);
	if (baseline && field in baseline) baseline = baseline[field];
	if (baseline && typeof baseline === "object")
		baseline = baseline[chart.defaultPlotField || "Close"];
	return ((baseline || 1) * relative) / initialPrice;
};

/**
 * Sets the transformed price in the dataSegment of any plots sharing the chart's y-axis.
 *
 * @param {CIQ.ChartEngine} stx The charting object.
 * @param {CIQ.ChartEngine.Chart} chart The chart that includes the series to be transformed.
 *
 * @memberof CIQ.Comparison
 * @private
 * @since
 * - 2014-02
 * - 7.3.0 Supports the {@link CIQ.ChartEngine#startComparisonsAtFirstVisibleBar} setting.
 * - 8.2.1 Transforms non-comparison series sharing the comparison y-axis.
 */
CIQ.Comparison.createComparisonSegmentInner = function (stx, chart) {
	// create an array of the fields that we're going to compare
	var fields = [];
	var field, panel, yAxis;
	for (field in chart.series) {
		var parameters = chart.series[field].parameters;
		if (
			(!parameters.yAxis && parameters.shareYAxis) ||
			parameters.yAxis === chart.yAxis
		) {
			fields.push(parameters.symbol);
		}
	}
	var priceFields = ["Close", "Open", "High", "Low", "iqPrevClose"];
	var highLowBars = stx.chart.highLowBars;
	if (chart.defaultPlotField && !highLowBars)
		priceFields.unshift(chart.defaultPlotField);
	var baselineField = priceFields[0];
	var s = stx.layout.studies;
	for (var n in s) {
		var sd = s[n];
		panel = stx.panels[sd.panel];
		yAxis = sd.getYAxis(stx);
		if (!panel || panel.yAxis != yAxis) continue;
		for (field in sd.outputMap) {
			// Check for input fields that match transformed series and store as an object
			if (
				chart.transformFunc &&
				yAxis == chart.panel.yAxis &&
				fields.includes(sd.inputs.Field)
			)
				priceFields.push({
					comparison: sd.inputs.Field,
					field: field
				});
			else priceFields.push(field);
		}

		for (var h = 0; h <= 2; h++)
			priceFields.push(sd.name + "_hist" + (h ? h : ""));
		if (sd.referenceOutput)
			priceFields.push(sd.referenceOutput + " " + sd.name);
	}
	for (var p in stx.plugins) {
		var plugin = stx.plugins[p];
		if (!plugin.transformOutputs) continue;
		for (field in plugin.transformOutputs) {
			priceFields.push(field);
		}
	}

	chart.initialComparisonPrice = null;
	chart.dataSegment = [];
	var firstQuote = null;

	// By default start comparison at the close of the previous bar
	var firstTick = chart.dataSet.length - chart.scroll - 1;
	// Start at first visible bar instead if flag is set
	if (stx.startComparisonsAtFirstVisibleBar) firstTick += 1;

	//if(stx.micropixels+stx.layout.candleWidth/2<0) firstTick++;  // don't baseline comparison with a bar off the left edge
	var transformsToProcess = chart.maxTicks + 3; //make sure we have transformed enough data points that we plot the y-axis intercept correctly

	for (var i = 0; i <= transformsToProcess; i++) {
		if (i == transformsToProcess) i = -1; //go back and revisit the tick before the first
		var position = firstTick + i;
		if (position < chart.dataSet.length && position >= 0) {
			var quote = chart.dataSet[position];
			var closingPrice = quote[baselineField];

			if (!firstQuote) {
				if (closingPrice === 0 || closingPrice === null) {
					if (i < 0) break;
					//if we still can't get a single tick to do this and we try to revisit, we are out, or we go into infinite loop
					else continue; // can't calculate the percentage gain/loss if the close is 0 or null.
				}
				firstQuote = CIQ.clone(quote);
			}

			// iterate through the fields calculating the percentage gain/loss
			// We store the results in the "transform" subobject of the data set
			// Note we inline the math calculation to save overhead of JS function call
			if (!quote.transform)
				quote.transform = {
					cache: {},
					DT: quote.DT,
					Date: quote.Date
				};
			if (!(firstQuote && firstQuote[baselineField]) && closingPrice)
				firstQuote = CIQ.clone(quote);
			stx.comparisonBaseline = firstQuote;

			var j, value;
			for (j = 0; j < priceFields.length; j++) {
				field = priceFields[j];
				value = quote[field];
				if (value || value === 0)
					quote.transform[field] = chart.transformFunc(stx, chart, value);
			}

			// Transform the series
			for (j = 0; j < fields.length; j++) {
				field = fields[j];
				var compSymbol = chart.series[field];
				if (i == -1 && compSymbol && compSymbol.parameters.isComparison) {
					delete quote.transform[field];
					continue;
				}
				var seriesData = quote[field];
				if (!seriesData) continue;
				for (var k = 0; k < priceFields.length; k++) {
					var priceField = priceFields[k];
					var seriesPrice = seriesData[priceField];
					var transformField = (quote.transform[field] =
						quote.transform[field] || {});
					if (typeof priceField == "object" && priceField.comparison == field) {
						priceField = priceField.field;
						seriesPrice = quote[priceField];
						transformField = quote.transform;
					}
					if (seriesPrice || seriesPrice === 0) {
						// Skip blanks
						var baseline =
							firstQuote[field] && firstQuote[field][priceFields[0]];
						if (!baseline && baseline !== 0) {
							// This takes care of a series that starts part way through the chart
							// The baseline is then computed looking back to what it would have been with a 0% change
							if (!firstQuote[field]) firstQuote[field] = {};
							firstQuote[field][priceField] = baseline =
								(seriesPrice * firstQuote[baselineField]) /
								quote[baselineField];
						}
						if (baseline !== 0) {
							var masterBaseline = firstQuote[baselineField] || 1;
							var rationalizedPrice = seriesPrice * (masterBaseline / baseline);

							transformField[priceField] = chart.transformFunc(
								stx,
								chart,
								rationalizedPrice
							);
						}
					}
				}
			}
			chart.dataSegment.push(quote);
		} else if (position < 0) {
			chart.dataSegment.push(null);
		}
		if (i < 0) break; //we revisited tick before first so we are done
	}
};

/**
 * Formats the percentage values on the comparison chart
 * @param  {CIQ.ChartEngine} stx	The chart object
 * @param  {CIQ.ChartEngine.Panel} panel The panel
 * @param  {number} price The raw percentage as a decimal
 * @return {string}		  The percentage formatted as a percent (possibly using localization if set in stx)
 * @memberof CIQ.Comparison
 */
CIQ.Comparison.priceFormat = function (stx, panel, price) {
	if (price === null || typeof price == "undefined" || isNaN(price)) return "";
	var priceTick = panel.yAxis.priceTick;
	var internationalizer = stx.internationalizer;
	if (internationalizer) {
		if (priceTick >= 5) price = internationalizer.percent.format(price / 100);
		else if (priceTick >= 0.5)
			price = internationalizer.percent1.format(price / 100);
		else if (priceTick >= 0.05)
			price = internationalizer.percent2.format(price / 100);
		else if (priceTick >= 0.005)
			price = internationalizer.percent3.format(price / 100);
		else price = internationalizer.percent4.format(price / 100);
	} else {
		var isPos = price > 0;
		if (priceTick >= 5) price = price.toFixed(0) + "%";
		else if (priceTick >= 0.5) price = price.toFixed(1) + "%";
		else if (priceTick >= 0.05) price = price.toFixed(2) + "%";
		else if (priceTick >= 0.005) price = price.toFixed(3) + "%";
		else price = price.toFixed(4) + "%";
		if (isPos) price = "+" + price;
	}
	/*
	Intl.NumberFormat should be doing this
	if (parseFloat(price) === 0 && price.charAt(0) == "-") {
		// remove minus sign from -0%, -0.0%, etc
		price = price.substring(1);
	}*/
	return price;
};

/**
 * Turns comparison charting on or off and sets the transform.
 *
 * Should not be called directly. Either use the {@link CIQ.ChartEngine#addSeries} `isComparison` parameter or use {@link CIQ.ChartEngine#setChartScale}
 *
 * @param {string|boolean} mode Type of comparison ("percent" or "relative").
 *  - Setting to true will enable "percent".
 *  - Setting to "relative" will allow the comparisons to be rendered in relation to any provided 'basis' value. For example, the previous market day close price.
 * @param {CIQ.ChartEngine.Chart} [chart] The specific chart for comparisons
 * @param {number|string} [basis] For a "relative" mode, the basis to relate to.  Can be a number or a string.  If a string, will use the first price in the datasegment for the series keyed by the string.  Sets {@link CIQ.Comparison.initialPrice}.
 * @memberof CIQ.ChartEngine
 * @since
 * - 04-2015 Signature has been revised.
 * - 5.1.0 Signature revised again, added basis.
 * - 5.1.0 `mode` now also supports "relative" to allow comparisons to be rendered in relation to any provided value.
 */
CIQ.ChartEngine.prototype.setComparison = function (mode, chart, basis) {
	if (!chart) chart = this.chart;
	if (typeof chart == "string") chart = this.charts[chart];
	if (basis || basis === "") CIQ.Comparison.initialPrice = basis;
	if (mode === true) {
		// backward compatibility, older versions uses a true/false switch because they did not support the developer setting arbitrary baseline values
		if (chart.isComparison) return; // Do nothing if it's already turned on
		mode = "percent";
	}
	this.resetDynamicYAxis();
	var yAxis = chart.panel.yAxis;
	var wasComparison = yAxis.priceFormatter == CIQ.Comparison.priceFormat; // tests if the current formatter is a comparison formatter
	// this is like testing if the previous mode was "percent"
	switch (mode) {
		case "relative":
			this.setTransform(
				chart,
				CIQ.Comparison.priceToRelative,
				CIQ.Comparison.relativeToPrice
			);
			if (wasComparison) {
				yAxis.priceFormatter = yAxis.originalPriceFormatter
					? yAxis.originalPriceFormatter.func
					: null;
				yAxis.originalPriceFormatter = null;
			}
			yAxis.whichSet = "dataSegment";
			chart.isComparison = true;
			break;
		case "percent":
			this.setTransform(
				chart,
				CIQ.Comparison.priceToPercent,
				CIQ.Comparison.percentToPrice
			);
			if (!wasComparison) {
				yAxis.originalPriceFormatter = { func: yAxis.priceFormatter };
				yAxis.priceFormatter = CIQ.Comparison.priceFormat;
			}
			yAxis.whichSet = "dataSegment";
			chart.isComparison = true;
			break;
		default:
			this.unsetTransform(chart);
			if (wasComparison) {
				yAxis.priceFormatter = yAxis.originalPriceFormatter
					? yAxis.originalPriceFormatter.func
					: null;
				yAxis.originalPriceFormatter = null;
			}
			yAxis.whichSet = "dataSet";
			chart.isComparison = false;
			break;
	}
};

/**
 * Sets the chart scale.
 * @param {string} chartScale
 *  - Available options:
 * 	 - "log"
 * 		> The logarithmic scale can be helpful when the data covers a large range of values – the logarithm reduces this to a more manageable range.
 * 	 - "linear"
 * 		> This is the standard y-axis scale; where actual prices are displayed in correlation to their position on the axis, without any conversions applied.
 * 	 - "percent"
 * 		> Calculations for the "percent" scale, used by comparisons, are based on the change between the first visible bar to the last visible bar.
 * 		> This is so you can always see relevant information regardless of period.
 * 		> Let's say you are looking at a chart showing a range for the current month. The change will be the difference from the beginning of the month to today.
 * 		> If you now zoom or change the range to just see this past week, then the change will reflect that change from the first day of the week to today.
 * 		> This is how most people prefer to see change, sine it is dynamically adjusted to the selected range. If you want to see today's change, just load today's range.
 * 		> Keep in mind that there is a difference between the change from the beginning of the day, and the change from the beginning of the trading day. So be careful to set the right range.
 * 	 - "relative"
 * 		> Very similar to 'percent' but the baseline value can be explicitly set.
 * 		> This is useful if you wish to baseline your comparisons on secondary series, or even a hard coded value ( ie: opening price for the day).
 * 		> <br>See {@link CIQ.Comparison.initialPrice} for details on how to set basis for "relative" scale.
 *
 * - Setting to "percent" or "relative" will call {@link CIQ.ChartEngine#setComparison} even if no comparisons are present; which sets `stxx.chart.isComparison=true`.
 * - To check if scale is in percentage mode use `stxx.chart.isComparison` instead of using the {@link CIQ.ChartEngine#chartScale} value.
 * - See {@link CIQ.ChartEngine.Chart#forcePercentComparison} for behavior of automatic scale setting and removal for [comparisons]{@link CIQ.ChartEngine#addSeries}.
 * @memberof CIQ.ChartEngine
 * @since
 * - 4.1.0 Added "percent".
 * - 5.1.0 Added "relative".
 */
CIQ.ChartEngine.prototype.setChartScale = function (chartScale) {
	var chart = this.chart;
	var needsTransform = {
		percent: true,
		relative: true
	};
	if (!chartScale) chartScale = "linear";
	if (needsTransform[chartScale]) {
		this.setComparison(chartScale, chart, CIQ.Comparison.initialPrice);
	} else if (needsTransform[this.layout.chartScale]) {
		this.setComparison(false, chart);
	}
	var scaleChanged = this.layout.chartScale !== chartScale;
	this.layout.chartScale = chartScale;
	if (chart.canvas) this.draw();
	if (scaleChanged) this.changeOccurred("layout");
};

};
__js_standard_series_(typeof window !== "undefined" ? window : global);
