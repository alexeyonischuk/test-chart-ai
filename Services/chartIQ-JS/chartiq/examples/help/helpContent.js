import { CIQ } from "../../js/chartiq.js";
CIQ.Help = CIQ.Help || function () {};
CIQ.Help.Message = `Dots indicate which items have help available. At any time, long-press on a feature to make the help window appear.`;
CIQ.Help.Content = {
	search_symbol_lookup: {
		title: "Symbol Search",
		content: `<p>Use the symbol lookup field to find instruments (stocks, currency exchange rates, indexes, and so forth) by entering the symbol that represents the instrument.`
	},
	add_comparison: {
		title: "Add Comparison",
		content: `<p>Comparison series are plots of instruments in addition to the main chart series.
<p>Comparisons provide a side-by-side look at different instruments.
<p>Comparison series are plotted over the same time frame, using the same periodicity as the main series, but are displayed in a different style or color.
<p>Your chart can include numerous comparisons.`
	},
	display_dropdown: {
		title: "Chart Style",
		content: `<p>Chart styles are the various ways that a chart can visually represent data; for example, as a candle, line, or mountain graph.
<p>Chart types are charts that display data that has been modified through aggregation or recalculation; for example, Heikin-Ashi, Kagi, and point and figure charts.`
	},
	chart_style_line: {
		title: "Line Chart",
		content: `<p>A line chart consists of segments that connect at the close price for each time period.
<p>The line is a single color.
<p>Any value in your data that has a null value for close will result in a gap within the line.`
	},
	chart_style_colored_line: {
		title: "Colored Line Chart",
		content: `<p>Like the line chart, the colored line is a line chart with segments of various colors.
<p>Each color indicates a price action.
<p>If the close for a period is higher than that of the previous close, the line between the periods is shaded green.
<p>If the close is lower than the previous close, the line between the periods is shaded red.
<p>If the close was equal to the previous close, the line between the periods is shaded gray.`
	},
	chart_style_bar: {
		title: "Bar Chart",
		content: `<p>Bar charts consist of vertical lines sandwiched between two shelves.
<p>One bar is created for each interval (period) on the chart.
<p>Each bar represents the OHLC (open, high, low, close) for the period.
<p>The top and bottom of the vertical line represent the high and low for the period.
<p>The left shelf is the opening price while the right shelf is the closing price.`
	},
	chart_style_colored_bar: {
		title: "Colored Bar Chart",
		content: `<p>A colored bar chart draws a bar chart with the bars colored to indicate price action.
<p>If the close for a period is higher than that of the previous close, the bar is shaded green.
<p>If the close is lower than the previous close, the bar is shaded red.
<p>If the close was equal to the previous close, the line between the periods is shaded gray.`
	},
	chart_style_candle: {
		title: "Candle Chart",
		content: `<p>Like bar charts, candle charts represent OHLC, except in the form of colored rectangles called candles.
<p>When the open is lower than the close, the candle is shaded green.
<p>When the open is higher than the close, the candle is shaded red.
<p>If the open and close are the same, a thin horizontal line segment is drawn at that price (this type of candle is called a “doji”).
<p>Each candle has a “wick” that extends above and below the candle to indicate the high and low, respectively.`
	},
	chart_style_hollow_candle: {
		title: "Hollow Candle Chart",
		content: `<p>Hollow candle charts are a special type of candle chart that displays additional information and changes the meaning of the colors.
<p>In a hollow candle chart, a green candle occurs when the closing price is higher than the prior bar’s closing price. It is red when the closing price is lower than the prior bar’s closing price.
<p>The candles are either filled or hollow based on the price action within the candle.
<p>Hollow candles are drawn when the close is higher than the open (upward intra-session price action).
<p>The candle is filled when the close is lower than the open (downward intra-session price action).
<p>If the close is the same as the open, only a gray horizontal line is drawn.`
	},
	chart_style_volume_candle: {
		title: "Volume Candle Chart",
		content: `<p>A volume candle chart is a hollow candle chart where the width of a candle varies to indicate volume.
<p>Each candle’s shading and fill follow the same conventions as those in hollow candle charts.
<p>Wide candles indicate high volume while narrow candles indicate low volume.`
	},
	chart_style_mountain: {
		title: "Mountain Chart",
		content: `<p>Mountain charts (sometimes called area charts) are line charts with a shaded section that extends to the bottom of the chart. The result is a chart which looks like a mountain.`
	},
	chart_style_baseline: {
		title: "Baseline Chart",
		content: `<p>A baseline delta chart draws a line chart that oscillates across a dotted baseline.
<p>The area above the baseline is shaded green, and the area below the baseline is shaded red.
<p>The baseline initializes to the left most closing value on the chart but can be adjusted by dragging the handle located on the right side of the chart.
<p>This chart style is meant to highlight the positive and negative distance from the set baseline.
<p>It is typically used for intraday charts where the left side (baseline) is set to the opening of the market day.`
	},
	chart_style_datapoints: {
		title: "Data Points Chart",
		content: `<p>The time series scatter chart draws a single dot at every closing value for each time period and does not connect them.`
	},
	chart_style_hlc_box: {
		title: "HLC Box Chart",
		content: `<p>HLC box charts appear as a colored box with a line showing the close.
<p>The high price is the top of the box and the low is the bottom of the box.
<p>The intent of the HLC box design is to emphasize where the close is relative to high-low range.
<p>ChartIQ offers the ability to use different colors between the high-close and the close-low.`
	},
	chart_style_colored_hlc_bar: {
		title: "Colored HLC Bar Chart",
		content: `<p>A colored HLC bar chart draws a colored bar chart that only displays the high, low, and close of each bar.
<p>A green bar occurs when the closing price is higher than the prior bar’s closing price.
<p>It is red when the closing price is lower than the prior bar’s closing price.
<p>If the close was equal to the previous close, the line between the periods is shaded gray.`
	},
	chart_style_vertex_line: {
		title: "Vertex Line Chart",
		content: `<p>A line chart consists of segments that connect at the close price for each time period.
<p>A vertex point is drawn at every data point along the line. The line is a single color.
<p>Any value in your data that has a null value for close will result in a gap within the line.`
	},
	chart_style_step: {
		title: "Step Chart",
		content: `<p>A step chart consists of data points that connect at the close price for each time period.
<p>Instead of using a line that connects points using the shortest distance, step charts use a combination of horizontal and vertical lines to make right-angled steps to connect data points.
<p>The line is a single color. Any value in your data that has a null value for close will result in a gap within the line.`
	},
	chart_style_histogram: {
		title: "Histogram Chart",
		content: `<p>A histogram chart consists of a series of colored vertical columns that extend upward to indicate the price at each time period.
<p>When the open is lower than the close, the column is shaded green.
<p>When the open is higher than the close, the column is shaded red.`
	},
	chart_type_heikin_ashi: {
		title: "Heikin-Ashi Chart",
		content: `<p>Heikin-Ashi charts are time series charts that resemble candle charts. In a normal candle chart, each candle is calculated independent of the other candles. However, in Heikin-Ashi charts, the candles appear to link together because of how their OHLC values are calculated:
<p>Open = the mean of the previous open and the previous close.
<p>High = the maximum of the current high, open, and close.
<p>Low = the minimum of the current low, open, and close.
<p>Close = the mean of the current open, close, high, and low.
<p>Upward trends are indicated by green candles with wicks on top, but almost no wick on bottom. Downward trends are indicated by red candles with wicks on the bottom and almost no wick on top. Reversal points are indicated by candles, red or green, with small bodies and wicks on top and bottom. This chart type can spot trends more clearly and easily than regular candle charts.`
	},
	chart_type_kagi: {
		title: "Kagi Chart",
		content: `<p>Kagi charts appear as vertical bars connected by small horizontal segments at right angles. Kagi charts are independent of time; they progress forward based on price action. Thick green lines, called yang bars, indicate that a price has broken out above the previous yin’s high price. Thin red bars, called yin bars, indicate that the price has fallen below the previous yang’s low. Unlike the other chart types, the colors of kagi lines do not directly communicate upward or downward trends.
<p>Bars move upward or downward depending on closing prices. A bar will shift direction when a reversal limit is reached. Reversal limits are input by the user as a fixed percentage of the price. For example, imagine you have a stock valued at $10 and you are drawing a kagi chart with a reversal of 10%. Depending on what trend was established, a cumulative $1 movement in the opposite direction will break the current trend and cause a reversal.
<p>Kagi Configuration: Kagi charts can be customized. Pressing the AUTO SELECT button of the customization dialog box sets the reversal limit to one of two defaults: if the chart is daily, a reversal of 4% is set; if the chart is intraday, a reversal of 0.4%.`
	},
	chart_type_linebreak: {
		title: "Line Break Chart",
		content: `<p>Line break charts appear as vertical bars that ascend and descend. These charts are time independent and are determined only by price action. Ascending bars are colored green and indicate upward price action. Descending bars are colored red and indicate downward price action.
<p>Line break charts are constructed by looking at the close of a bar and comparing it to a previous bar’s close; which bar it is compared to is determined by the user (see below). If the current bar’s close is higher than the one it is being compared to, a green ascending bar is drawn. If the current bar’s close is lower than the one that it is being compared to, a red descending bar is drawn. If the current close is the same, or if the price does not move enough in one direction or the other to signify a reversal, then no bar is drawn.
<p>Line Break Configuration: Line break charts default to a value of three, meaning that it compares the current bar’s close to the bar that came two periods earlier.`
	},
	chart_type_renko: {
		title: "Renko",
		content: `<p>Renko charts appear as a series of equally sized blocks stepping diagonally upward or downward.
<p>This chart type, developed by the Japanese, measures price movement independent of time.
<p>The objective is to clearly see the market’s directional movement, persistence, and magnitude.
<p>Renko charts are constructed from a series of bricks placed sequentially upward using green blocks or downward based on user-defined fluctuations in price.
<p>The user can set the Brick Size using the Set Range property. Once price moves more than the user-defined range, a new brick is added to the chart in the corresponding direction.`
	},
	chart_type_rangebars: {
		title: "Range Bars Chart",
		content: `<p>Range bar charts appear as a series of equally sized candles. A new bar is formed when the price moves outside of the defined range.
<p>Range Bar Configuration: which is configured in Set Range.`
	},
	chart_type_pandf: {
		title: "Point and Figure",
		content: `<p>Point and figure charts display an X for upward price action and an O for downward price movement.
<p>The X and O represent a specific price increment, known as the box size which is configured in properties by the user.
<p>The objective is to capture directional price trends without the impact of time.
<p>A new column is formed when price reverses a set number of boxes, that is a multiple of the box size.
<p>Point and Figure Configuration: The reversal value is configured in properties by the user.`
	},
	drawing_tools_toggle: {
		title: "Toggle: Drawing Tools",
		content: `<p>Toggles display of the drawing tools palette. Drawing tools allow you to add custom markings and annotations to the chart.`
	},
	drawing_palette_list_view: {
		title: "List View",
		content: `<p>In this mode, drawing tools will be displayed in an alphabetically sorted list by title and an option to favorite a tool. Favorite tools will be placed at the top of the list.`
	},
	drawing_palette_grid_view: {
		title: "Grid View",
		content: `<p>In this mode, drawing tools will be displayed as a grid with icons which are grouped by type of tool.`
	},
	drawing_palette_magnet: {
		title: "Magnet",
		content: `<p>The magnet tool helps lock the drawing tools onto specific values of the data series.
<p>When magnet mode is on, a blue bullet follows the data series to show the value currently selected.
<p>The drawing tools are magnetized to the series to which the mouse is closest.
<p>As you move the mouse close to another series, the drawing tools magnetize to that series.
<p>If a drawing is started on a series, the drawing tool is magnetized to the same series to finish the drawing.`
	},
	drawing_palette_clear: {
		title: "Clear",
		content: `<p>Removes all drawings from the display.`
	},
	drawing_palette_delete: {
		title: "Delete Drawings",
		content: `<p>Removes all drawings from the display.`
	},
	drawing_palette_restore: {
		title: "Restore Default Parameters",
		content: `<p>Restores all drawing settings to their default values. Tool settings can be changed using the style palette.`
	},
	drawing_palette_tool_categories: {
		title: "Filter Tool Categories",
		content: `<p>Selecting a category from the dropdown will filter the list of available drawings to those matching the category.`
	},
	drawing_palette_notool: {
		title: "No Tool",
		content: `<p>Allows the drawing palette to remain open with no tool selected. Drawings may be modified with No Tool selected.`
	},
	drawing_palette_undo: {
		title: "Undo",
		content: `<p>Undoes the last completed drawings in the sequence they were drawn.`
	},
	drawing_palette_redo: {
		title: "Redo",
		content: `<p>Replaces the completed drawings that were removed by Undo until the most recent drawing is restored.`
	},
	drawing_palette_attach: {
		title: "Dock Palette",
		content: `<p>Docks the drawing palette to the side of the chart.`
	},
	drawing_palette_detach: {
		title: "Detach Palette",
		content: `<p>Detaches the drawing palette from the side, allowing it to float over the chart.`
	},
	drawing_palette_measure: {
		title: "Measure",
		content: `<p>Enables measurements of the chart, study, or series area. Select the measure tool, then draw a line on the chart to measure an area.`
	},
	drawing_palette_rectangle: {
		title: "Drawing Tool: Rectangle",
		content: `<p>Draws a rectangle shape.`
	},
	drawing_palette_annotation: {
		title: "Drawing Tool: Annotation",
		content: `<p>Add text annotations onto the chart.`
	},
	drawing_palette_arrow: {
		title: "Drawing Tool: Arrow",
		content: `<p>Add an arrow shape onto the chart.`
	},
	drawing_palette_line: {
		title: "Drawing Tool: Line",
		content: `<p>Add a line at any angle or position across the chart.`
	},
	drawing_palette_horizontal: {
		title: "Drawing Tool: Horizontal",
		content: `<p>Places a horizontal line with its value labeled on the y-axis.`
	},
	drawing_palette_vertical: {
		title: "Drawing Tool: Vertical",
		content: `<p>Places a vertical line with its value labeled on the x-axis.`
	},
	drawing_palette_trendline: {
		title: "Drawing Tool: Trendline",
		content: `<p>Draws a line with a start and end point.`
	},
	drawing_palette_measurementline: {
		title: "Drawing Tool: Measurement Line",
		content: `<p>Highlights an area between two vertical lines and provides a callout which displays information about the area. Settings can be adjusted to display additional information in the callout.`
	},
	drawing_palette_average: {
		title: "Drawing Tool: Average Line",
		content: `<p>Draws a fixed horizontal line on the average price for the range of bars specified.`
	},
	drawing_palette_callout: {
		title: "Drawing Tool: Callout",
		content: `<p>Draws a speech bubble annotation with editable text.`
	},
	drawing_palette_channel: {
		title: "Drawing Tool: Channel",
		content: `<p>Draws two parallel trendlines separated by vertical distance.`
	},
	drawing_palette_check: {
		title: "Drawing Tool: Check",
		content: `<p>Draws a check mark shape.`
	},
	drawing_palette_continuous: {
		title: "Drawing Tool: Continuous",
		content: `<p>Draws multiple, separate, trendlines.`
	},
	drawing_palette_xcross: {
		title: "Drawing Tool: Cross",
		content: `<p>Draws an X shape.`
	},
	drawing_palette_crossline: {
		title: "Drawing Tool: Crossline",
		content: `<p>Places intersecting vertical and horizontal lines at a point, with labels on the x- and y- axes.`
	},
	drawing_palette_freeform: {
		title: "Drawing Tool: Doodle",
		content: `<p>Draws a free-form line.`
	},
	drawing_palette_elliottwave: {
		title: "Drawing Tool: Elliot Wave",
		content: `<p>Draws and labels lines according to a selected Wave Template.`
	},
	drawing_palette_ellipse: {
		title: "Drawing Tool: Ellipse",
		content: `<p>Draws an ellipse/oval shape.`
	},
	drawing_palette_fibarc: {
		title: "Drawing Tool: Fib Arc",
		content: `<p>Draws nested half-circles in fibonacci intervals with a trendline as a reference. Available fibonacci levels can be adjusted in drawing settings.`
	},
	drawing_palette_fibfan: {
		title: "Drawing Tool: Fib Fan",
		content: `<p>Draws nested fans in fibonacci intervals. Available fibonacci levels can be adjusted in drawing settings.`
	},
	drawing_palette_fibprojection: {
		title: "Drawing Tool: Fib Projection",
		content: `<p>Draws two trendlines, and projects fibonacci levels corresponding to the lines drawn. Available fibonacci levels can be adjusted in drawing settings.`
	},
	drawing_palette_retracement: {
		title: "Drawing Tool: Fib Retracement",
		content: `<p>Draws one trendline, and displays fibonacci levels corresponding to the line drawn. Available fibonacci levels can be adjusted in drawing settings.`
	},
	drawing_palette_fibtimezone: {
		title: "Drawing Tool: Fib Timezone",
		content: `<p>Draws vertical zones spaced according to fibonacci levels.`
	},
	drawing_palette_focusarrow: {
		title: "Drawing Tool: Focus",
		content: `<p>Draws two triangle/arrow shapes around a point.`
	},
	drawing_palette_gannfan: {
		title: "Drawing Tool: Gann Fan",
		content: `<p>Draws a central line and projects retracements at specific ratios to the angle of the central line.`
	},
	drawing_palette_gartley: {
		title: "Drawing Tool: Gartley",
		content: `<p>Draws a multi-segment wave structure restricted to Fibonacci ratios.`
	},
	drawing_palette_heart: {
		title: "Drawing Tool: Heart",
		content: `<p>Draws a heart shape.`
	},
	drawing_palette_pitchfork: {
		title: "Drawing Tool: Pitchfork",
		content: `<p>Draws two trendlines and projects three equidistant, parallel trendlines perpendicular to the second trendline draw.`
	},
	drawing_palette_quadrant: {
		title: "Drawing Tool: Quadrant Lines",
		content: `<p>Draws a divided box over the range of bars specified.
<p>The middle line of the box indicates the average price for the range.
<p>The top and bottom lines indicate the highest high and lowest low of the range, respectively.
<p>The remaining lines divide the box into quadrants.`
	},
	drawing_palette_ray: {
		title: "Drawing Tool: Ray",
		content: `<p>Draws a line, continuous in only one direction.`
	},
	drawing_palette_regression: {
		title: "Drawing Tool: Regression",
		content: `<p>Draws a fixed diagonal line indicating the average slope of a specified range.`
	},
	drawing_palette_speedarc: {
		title: "Drawing Tool: Speed Resistance Arc",
		content: `<p>Draws a trendline projects one-third and two-third arcs derived from the trendline.`
	},
	drawing_palette_speedline: {
		title: "Drawing Tool: Speed Resistance Line",
		content: `<p>Draws a trendline and projects one-third and two-third retracements underneath it.`
	},
	drawing_palette_star: {
		title: "Drawing Tool: Star",
		content: `<p>Draws a star shape.`
	},
	drawing_palette_timecycle: {
		title: "Drawing Tool: Time Cycle",
		content: `<p>Draws a line of a specified length, and marks the same length infinitely into the future.`
	},
	drawing_palette_tirone: {
		title: "Drawing Tool: Tirone Levels",
		content: `<p>Draws a divided box over the range of bars specified.
<p>The middle line of the box indicates the average price for the range.
<p>The top and bottom lines indicate the highest high and lowest low of the range, respectively.
<p>The middle lines divide the box into thirds.`
	},
	drawing_palette_volumeprofile: {
		title: "Drawing Tool: Volume Profile",
		content: `<p>Displays a sideways histogram indicating volume of trades at each price level over a specified range.`
	},
	default: {
		title: "Help not available.",
		content: `<p>No documentation for this topic could be found.`
	}
};
