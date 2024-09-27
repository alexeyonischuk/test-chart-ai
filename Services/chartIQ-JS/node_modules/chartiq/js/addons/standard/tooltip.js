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
import "../../../js/standard/markers.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Marker) {
	console.error("tooltip addon requires first activating markers feature.");
} else {
	/**
	 * Add-on that creates a detailed tooltip as the user's mouse hovers over data points on the
	 * chart. The tooltip contains information such as the open, high, low, and close prices of
	 * stock quotes.
	 *
	 * > Starting with version 8.8.0, this tooltip uses different HTML and CSS.
	 * See [8.7.0 to 8.8.0 upgrade notes]{@tutorial Upgradelog_8.7.0-8.8.0} for details.
	 * All information and instructions on this page are based on 8.8.0 and newer.
	 *
	 * Tooltip example:
	 * <iframe width="800" height="500" scrolling="no" seamless="seamless" align="top"
	 *         style="float:top"
	 *         src="https://jsfiddle.net/chartiq/5kux6j8p/embedded/result,js,html/"
	 *         allowfullscreen="allowfullscreen" frameborder="1">
	 * </iframe>
	 *
	 * **Note:** Prior to version 8.2.0, the tooltip was directly linked to the crosshairs. The
	 * crosshairs had to be active for the tooltip to be displayed.
	 *
	 * Requires *addOns.js* and *markers.js*, or the bundle *standard.js*.
	 *
	 * There can be only one `CIQ.Tooltip` per chart.
	 *
	 * Color and layout can be customized by overriding the CSS rule-sets defined for the
	 * `.hu-tooltip` and related type selectors in *stx-chart.css*. Do not modify
	 * *stx-chart.css*; create a separate style sheet file that overrides *stx-chart.css* in the
	 * CSS cascade. See the example below.
	 *
	 * `CIQ.Tooltip` automatically creates its own HTML inside the chart container. Here is an
	 * example of the structure (there will be one field tag per displayed element):
	 * ```
	 *	<table class="hu-tooltip">
	 *		<caption>Tooltip</caption>
	 *		<tr field class="hu-tooltip-sr-only">
	 *			<th>Field</th>
	 *			<th>Value</th>
	 *		</tr>
	 *		<tr hu-tooltip-field="xxx">
	 *			<td class="hu-tooltip-name"></td>
	 *			<td class="hu-tooltip-value"></td>
	 *		</tr>
	 *	</table>
	 * ```
	 * By default, the field rows are inserted in the following order:
	 * - DT
	 * - Open
	 * - High
	 * - Low
	 * - Close
	 * - Volume
	 * - series
	 * - studies
	 *
	 * But the default layout can be changed. You can override the order of fields or change the
	 * labels by manually inserting the HTML that the tooltip would otherwise have created for
	 * that field. If no override HTML is found for a particular field, the default is used.
	 * **Note:** This HTML must be placed inside the chart container.
	 *
	 * All of the code is provided in *addOns.js* and can be fully customized by copying the
	 * source code from the library and overriding the functions with your changes. Be sure to
	 * never modify a library file, as this will hinder upgrades.
	 *
	 * For example, concatenating the field name (e.g., "Jaw") with the study name (e.g.,
	 * "Alligator" ) is the default behavior of the tooltip for displaying the value title. Feel
	 * free to override this behavior by creating your own custom version of the `renderFunction()`
	 * for the `CIQ.Tooltip`. To do this, copy the entire `CIQ.Tooltip` code (found in *addOns.js*)
	 * and make the changes to your custom version. Load your custom version instead. Specifically,
	 * look for the following code in the `renderFunction()` that pushes out the text for each
	 * study field:
	 * ```
	 *	newFieldName.classList.add("hu-tooltip-name");
	 *	newFieldName.innerHTML = stx.translateIf(fieldName);
	 *	newField.appendChild(newFieldName);
	 * ```
	 * Replace `fieldName` with anything you want to use as the field title and push that instead.
	 *
	 * Visual Reference:<br>
	 * ![hu-tooltip](hu-tooltip.png "hu-tooltip")
	 *
	 * For the parameters `ohl` and `volume`, the following values are accepted:
	 * - `true` - data is always displayed.
	 * - `false` - data is never displayed.
	 * - `null` - data is only displayed where relevant to the plots on the chart.
	 *
	 * @param {object} tooltipParams The constructor parameters.
	 * @param {CIQ.ChartEngine} [tooltipParams.stx] The chart object.
	 * @param {boolean|null} [tooltipParams.ohl] Setting for OHL data (Close is always shown).
	 * @param {boolean|null} [tooltipParams.volume] Setting for Volume.
	 * @param {boolean} [tooltipParams.series] Set to true to show value of series.
	 * @param {boolean} [tooltipParams.studies] Set to true to show value of studies.
	 * @param {boolean} [tooltipParams.signalStudies] Set to true to show value of signalling studies
	 * 		even when they are hidden.
	 * @param {boolean} [tooltipParams.showOverBarOnly] Set to true to show the tooltip only when
	 * 		the mouse is over the primary line/bars.
	 * @param {boolean} [tooltipParams.change] Set to true to show the change in daily value
	 * 		when the internal chart periodicity is a daily interval (see
	 * 		{@link CIQ.ChartEngine.isDailyInterval}).
	 * @param {boolean} [tooltipParams.interpolation] Set to true to show the estimated value when
	 * 		there is no data between bars. **Note:** A value of `null` is not considered missing
	 * 		data.
	 * @param {boolean} [tooltipParams.useDataZone] Set to true to show the date in the `dataZone`
	 * 		time zone; false, to use the `displayZone` time zone (see
	 * 		{@link CIQ.ChartEngine#setTimeZone}).
	 * @param {boolean} [tooltipParams.showBarHighlight=true] Specifies whether the bar (data
	 * 		point) the mouse is hovering over is highlighted. Applies to the floating tooltip only
	 * 		(the dynamic tooltip points to the bar). If the crosshairs are active, this parameter
	 * 		is ignored.
	 * @param {string} [tooltipParams.caption] Set to caption text for assistive technologies
	 *
	 * @constructor
	 * @name CIQ.Tooltip
	 * @since
	 * - 09-2016-19
	 * - 5.0.0 Now `tooltipParams.showOverBarOnly` is available to show tooltip only when over the
	 * 		primary line/bars.
	 * - 5.1.1 `tooltipParams.change` set to true to show the change in daily value when
	 * 		displaying a daily interval.
	 * - 6.2.5 New `tooltipParams.interpolation` flag to show estimated value for missing series
	 * 		data points.
	 * - 7.0.0 New `tooltipParams.useDataZone` flag to show the date in either the `dataZone` or
	 * 		`displayZone` date/time.
	 * - 8.2.0 Decoupled `CIQ.Tooltip` from the crosshairs and added highlighting of the data
	 * 		point (or bar) the mouse is hovering over. The new `tooltipParams.showBarHighlight`
	 * 		parameter enables or disables the highlighting.
	 * - 8.6.0 New `tooltipParams.signalStudies` flag to show the value of signaling studies
	 * 		even when they are hidden.
	 * - 8.8.0 Added `tooltipParams.caption` parameter; changed HTML elements related to tooltip.
	 * - 9.1.2 added null state for parameters `ohl` and `volume`.
	 *
	 * @example <caption>Add a tooltip to a chart:</caption>
	 * // First declare your chart engine.
	 * const stxx = new CIQ.ChartEngine({ container: document.querySelector(".chartContainer")[0] });
	 *
	 * // Then link the tooltip to that chart.
	 * // Note how we've enabled OHL, Volume, Series and Studies.
	 * new CIQ.Tooltip({ stx: stxx, ohl: true, volume: true, series: true, studies: true });
	 *
	 * @example <caption>Customize the order, layout, or text in tooltip labels:</caption>
	 * // In this example, we've rearranged the HTML to display the Close field first, then the DT.
	 * // We are also labeling the DT 'Date/Time' and the Close 'Last'.
	 * // The rest of the fields are displayed in their default order.
	 *
	 *		<!-- tooltip markup is required only if addon tooltip is used and customization is required -->
	 *		<table class="hu-tooltip">
	 *			<caption>Tooltip</caption>
	 *			<tr hu-tooltip-field class="hu-tooltip-sr-only"> <th>Field</th>                             <th>Value</th>                     </tr>
	 *			<tr hu-tooltip-field="DT">                       <td class="hu-tooltip-name">Date/Time</td> <td class="hu-tooltip-value"></td> </tr>
	 *			<tr hu-tooltip-field="Close">                    <td class="hu-tooltip-name"></td>          <td class="hu-tooltip-value"></td> </tr>
	 *		</table>
	 *
	 * @example <caption>Customize the CSS for the tooltip (see <i>stx-chart.css</i>):</caption>
	 *	.hu-tooltip {
	 *		position: absolute;
	 *		left: -50000px;
	 *		z-index: 30;
	 *		white-space: nowrap;
	 *		padding: 6px;
	 *		border: 2px solid #4ea1fe;
	 *		background-color: rgba(255,255,255,.9);
	 *		color: #000;
	 *		font-size: 14px;
	 *	}
	 *
	 *	.hu-tooltip [hu-tooltip-field]:first-of-type * {
	 *		padding-top: 5px;
	 *	}
	 *	.hu-tooltip [hu-tooltip-field]:last-of-type * {
	 *		padding-bottom: 5px;
	 *	}
	 *
	 *	.hu-tooltip .hu-tooltip-name {
	 *		text-align: left;
	 *)		padding: 0 5px;
	 *		font-weight: bold;
	 *	}
	 *	.hu-tooltip .hu-tooltip-name:after {
	 *		content:':';
	 *	}
	 *
	 *	.hu-tooltip .hu-tooltip-value {
	 *		text-align: right;
	 *		padding: 0 5px;
	 *	}
	 */
	CIQ.Tooltip =
		CIQ.Tooltip ||
		function (tooltipParams) {
			if (!CIQ.Marker) {
				console.warn(
					"CIQ.Tooltip addon requires CIQ.Marker module to be enabled."
				);
				return;
			}

			this.cssRequired = true;

			const {
				stx,
				ohl: showOhl,
				change: showChange,
				volume: showVolume,
				series: showSeries,
				studies: showStudies,
				signalStudies: showSignalStudies,
				interpolation: showInterpolation,
				showOverBarOnly,
				showBarHighlight = true,
				useDataZone,
				caption: captionText
			} = tooltipParams;
			const { container } = stx.chart;

			let node = container.querySelector(".hu-tooltip");
			if (!node) {
				node = document.createElement("table");
				node.classList.add("hu-tooltip");
				container.appendChild(node);
			}
			if (captionText) {
				let caption = node.querySelector("caption");
				if (!caption) {
					caption = document.createElement("caption");
					node.insertBefore(caption, node.firstChild);
				}
				caption.innerHTML = stx.translateIf(captionText);
			}

			let highlightEl = container.querySelector(".hu-tooltip-highlight");
			if (!highlightEl) {
				highlightEl = document.createElement("div");
				highlightEl.classList.add("hu-tooltip-highlight");
				container.appendChild(highlightEl);
			}

			CIQ.Marker.Tooltip = function (params) {
				if (!this.className) this.className = "CIQ.Marker.Tooltip";
				this.highlightEl = highlightEl;
				params.label = "tooltip";
				CIQ.Marker.call(this, params);
			};

			CIQ.inheritsFrom(CIQ.Marker.Tooltip, CIQ.Marker, false);

			CIQ.Marker.Tooltip.sameBar = function (bar1, bar2) {
				if (!bar1 || !bar2) return false;
				if (+bar1.DT != +bar2.DT) return false;
				if (bar1.Close != bar2.Close) return false;
				if (bar1.Open != bar2.Open) return false;
				if (bar1.Volume != bar2.Volume) return false;
				return true;
			};

			CIQ.Marker.Tooltip.placementFunction = function (params) {
				if (hideIfDisabled()) return;
				const TOOLTIP_BAR_OFFSET = 30;
				var stx = params.stx;
				for (var i = 0; i < params.arr.length; i++) {
					var marker = params.arr[i];
					var bar = stx.barFromPixel(stx.cx);
					var quote = stx.chart.dataSegment[bar];
					var goodBar;
					var overBar = true;
					var highPx, lowPx;

					if (quote != "undefined" && quote && quote.DT) {
						goodBar = true;
						if (quote.High) highPx = stx.pixelFromPrice(quote.High);
						if (quote.Low) lowPx = stx.pixelFromPrice(quote.Low);
						if (!stx.chart.highLowBars) {
							if (quote.Close) {
								highPx = stx.pixelFromPrice(quote.Close) - 15;
								lowPx = stx.pixelFromPrice(quote.Close) + 15;
							}
						}
						if (showOverBarOnly && !(stx.cy >= highPx && stx.cy <= lowPx))
							overBar = false;
					}

					if (
						!(
							stx.insideChart &&
							!stx.openDialog &&
							!stx.activeDrawing &&
							!stx.grabbingScreen &&
							goodBar &&
							overBar
						)
					) {
						highlightEl.style.display = "none";
						marker.node.style.left = "-50000px";
						marker.node.style.right = "auto";
						marker.node.ariaHidden = "true";
						marker.lastBar = {};
						return;
					}
					if (
						CIQ.Marker.Tooltip.sameBar(
							stx.chart.dataSegment[bar],
							marker.lastBar
						) &&
						bar != stx.chart.dataSegment.length - 1
					) {
						adjustSticky(marker);
						return;
					}

					marker.lastBar = stx.chart.dataSegment[bar];

					const candleWidth =
							marker.lastBar.candleWidth || stx.layout.candleWidth,
						tooltipWidth =
							parseInt(getComputedStyle(marker.node).width, 10) +
							candleWidth / 2 +
							TOOLTIP_BAR_OFFSET,
						chartOffset = stx.chart.panel.left,
						currentBarOffsetLeft = stx.pixelFromBar(bar),
						currentBarOffsetRight =
							container.clientWidth - currentBarOffsetLeft,
						leftSpaceAvailable = currentBarOffsetLeft - chartOffset,
						rightSpaceAvailable = currentBarOffsetRight,
						leftHasSufficientSpace = leftSpaceAvailable > tooltipWidth,
						rightHasSufficientSpace = rightSpaceAvailable > tooltipWidth;

					if (
						(rightHasSufficientSpace &&
							rightSpaceAvailable > leftSpaceAvailable) ||
						!leftHasSufficientSpace
					) {
						marker.node.style.left =
							(currentBarOffsetLeft + tooltipWidth < container.clientWidth
								? Math.round(currentBarOffsetLeft + TOOLTIP_BAR_OFFSET)
								: container.clientWidth - tooltipWidth) + "px";
						marker.node.style.right = "auto";
					} else if (leftHasSufficientSpace) {
						marker.node.style.left = "auto";
						marker.node.style.right =
							Math.round(currentBarOffsetRight + TOOLTIP_BAR_OFFSET) + "px";
					} else {
						marker.node.style.left =
							currentBarOffsetLeft - tooltipWidth / 2 + "px";
						marker.node.style.right = Math.round(currentBarOffsetRight) + "px";
					}
					marker.node.ariaHidden = "false";

					var height = parseInt(getComputedStyle(marker.node).height, 10);
					var top = Math.round(
						stx.backOutY(CIQ.ChartEngine.crosshairY) - height / 2
					);
					if (top + height > stx.height) top = stx.height - height;
					if (top < 0) top = 0;
					marker.node.style.top = top + "px";
					adjustSticky(marker);
					if (showBarHighlight && !stx.layout.crosshair) {
						const candleWidth =
							marker.lastBar.candleWidth || stx.layout.candleWidth;
						const left = stx.pixelFromBar(bar) - candleWidth / 2;
						let width = candleWidth;

						if (left + width > stx.chart.width) {
							// adjust width of last bar so it does not highlight past the edge of the chart into the y-axis
							width = stx.chart.width - left;
						}

						highlightEl.style.display = "block";
						highlightEl.style.left = left + "px";
						highlightEl.style.width = width + "px";
					} else {
						highlightEl.style.display = "none";
					}
				}
				// backwards compatibility
				// temporarily disable overXAxis, overYAxis so the crosshairs don't hide if touch device and over y-axis (this can happen
				// due to the offset which we apply)
				if (CIQ.touchDevice && stx.layout.crosshair) {
					var overXAxis = stx.overXAxis,
						overYAxis = stx.overYAxis;
					stx.overXAxis = stx.overYAxis = false;
					stx.doDisplayCrosshairs();
					stx.overXAxis = overXAxis;
					stx.overYAxis = overYAxis;
				}
			};

			function hideIfDisabled() {
				const { headsUp, crosshair } = stx.layout;
				const isFloating =
					(headsUp && headsUp.floating) || headsUp === "floating";

				const crosshairsOn =
					crosshair &&
					stx.displayCrosshairs &&
					["static", null, undefined].includes(headsUp); // backwards compatibility

				if (stx.huTooltip && !isFloating && !crosshairsOn) {
					hideTooltip();
					return true;
				}

				return false;
			}

			function hideTooltip() {
				const { huTooltip } = stx;
				const { node } = huTooltip;
				if (!node) return;
				node.style.left = "-50000px";
				node.style.right = "auto";
				node.ariaHidden = "true";

				huTooltip.lastBar = {};
				if (huTooltip.highlightEl) huTooltip.highlightEl.style.display = "none";
			}

			function renderFunction() {
				var stx = this;
				// the tooltip has not been initialized with this chart.
				if (hideIfDisabled()) return;

				var bar = stx.barFromPixel(stx.cx),
					data = stx.chart.dataSegment[bar];
				if (!data) {
					hideTooltip();
					return;
				}
				if (
					CIQ.Marker.Tooltip.sameBar(data, stx.huTooltip.lastBar) &&
					bar != stx.chart.dataSegment.length - 1
				) {
					return;
				}
				var node = stx.huTooltip.node;
				node.parentElement
					.querySelectorAll("[auto]")
					.forEach((i) => i.remove());
				node.parentElement
					.querySelectorAll(".hu-tooltip-value")
					.forEach((i) => (i.innerHTML = ""));

				var panel = stx.chart.panel;
				var yAxis = panel.yAxis;
				var dupMap = {};
				var fields = [];
				fields.push({
					member: "DT",
					display: "DT",
					panel: panel,
					yAxis: yAxis
				});
				fields.push({
					member: "Close",
					display: "Close",
					panel: panel,
					yAxis: yAxis
				});
				dupMap.DT = dupMap.Close = 1;
				if (
					showChange &&
					CIQ.ChartEngine.isDailyInterval(stx.layout.interval)
				) {
					fields.push({
						member: "Change",
						display: "Change",
						panel: panel,
						yAxis: yAxis
					});
				}
				if (showOhl !== false && (showOhl || stx.chart.highLowBars)) {
					fields.push({
						member: "Open",
						display: "Open",
						panel: panel,
						yAxis: yAxis
					});
					fields.push({
						member: "High",
						display: "High",
						panel: panel,
						yAxis: yAxis
					});
					fields.push({
						member: "Low",
						display: "Low",
						panel: panel,
						yAxis: yAxis
					});
					dupMap.Open = dupMap.High = dupMap.Low = 1;
				}
				if (
					showVolume !== false &&
					(showVolume ||
						(stx.layout.studies &&
							Object.values(stx.layout.studies)
								.filter((s) => s.libraryEntry.name)
								.some(
									(s) =>
										s.libraryEntry.name.toLowerCase().includes("volume") ||
										s.libraryEntry.name.toLowerCase().includes("vwap") ||
										s.libraryEntry.name.toLowerCase().includes("money flow") ||
										s.libraryEntry.name.toLowerCase().includes("movement")
								)))
				) {
					fields.push({
						member: "Volume",
						display: "Volume",
						panel: null,
						yAxis: null
					}); // null yAxis use raw value
					dupMap.Volume = 1;
				}
				if (showSeries) {
					var renderers = stx.chart.seriesRenderers;
					for (var renderer in renderers) {
						var rendererToDisplay = renderers[renderer];
						if (rendererToDisplay === stx.mainSeriesRenderer) continue;
						panel = stx.panels[rendererToDisplay.params.panel];
						yAxis = rendererToDisplay.params.yAxis;
						if (!yAxis && rendererToDisplay.params.shareYAxis)
							yAxis = panel.yAxis;
						for (var id = 0; id < rendererToDisplay.seriesParams.length; id++) {
							var seriesParams = rendererToDisplay.seriesParams[id];
							// if a series has a symbol and a field then it maybe a object chain
							var sKey = seriesParams.symbol;
							var subField = seriesParams.field;
							if (!sKey) sKey = subField;
							else if (subField && sKey != subField)
								sKey = CIQ.createObjectChainNames(sKey, subField)[0];
							var display =
								seriesParams.display ||
								seriesParams.symbol ||
								seriesParams.field;
							if (sKey && !dupMap[display]) {
								fields.push({
									member: sKey,
									display: display,
									panel: panel,
									yAxis: yAxis,
									isSeries: true
								});
								dupMap[display] = 1;
							}
						}
					}
				}
				if (showStudies || showSignalStudies) {
					for (var study in stx.layout.studies) {
						var sd = stx.layout.studies[study];
						if (!showSignalStudies && sd.signalData && !sd.signalData.reveal)
							continue;
						panel = stx.panels[sd.panel];
						yAxis = panel && sd.getYAxis(stx);
						for (var output in stx.layout.studies[study].outputMap) {
							if (output && !dupMap[output]) {
								var alias = sd.study.alias;
								var displayValue = output;
								var outputValue =
									stx.layout.studies[study].outputMap[displayValue];
								if (alias && alias.hasOwnProperty(outputValue)) {
									displayValue = displayValue.replace(
										outputValue,
										alias[outputValue]
									);
								} else {
									var regex = new RegExp(sd.type, "ig");
									var match = displayValue.match(regex); // find if display value has any study name duplicates
									if (match && match.length > 1) {
										var matched = 0;
										displayValue = displayValue.replace(
											regex,
											replaceFirstOfTwo(matched)
										);
									}
								}

								fields.push({
									member: output,
									display: displayValue,
									panel: panel,
									yAxis: yAxis
								});
								dupMap[output] = 1;
							}
						}
						if (!dupMap[study + "_hist"]) {
							fields.push({
								member: study + "_hist",
								display: study + "_hist",
								panel: panel,
								yAxis: yAxis
							});
							dupMap[study + "_hist"] = 1;
						}
						if (!dupMap[study + "_hist1"]) {
							fields.push({
								member: study + "_hist1",
								display: study + "_hist1",
								panel: panel,
								yAxis: yAxis
							});
							dupMap[study + "_hist1"] = 1;
						}
						if (!dupMap[study + "_hist2"]) {
							fields.push({
								member: study + "_hist2",
								display: study + "_hist2",
								panel: panel,
								yAxis: yAxis
							});
							dupMap[study + "_hist2"] = 1;
						}
					}
				}
				for (var f = 0; f < fields.length; f++) {
					var obj = fields[f];
					var name = obj.member;
					var displayName = obj.display;
					var isRecordDate = name == "DT";
					if (
						isRecordDate &&
						!useDataZone &&
						!CIQ.ChartEngine.isDailyInterval(stx.layout.interval)
					)
						name = "displayDate"; // display date is timezone adjusted
					panel = obj.panel;
					yAxis = obj.yAxis;
					var labelDecimalPlaces = null;
					if (yAxis) {
						if (!panel || panel !== panel.chart.panel) {
							// If a study panel, use yAxis settings to determine decimal places
							if (yAxis.decimalPlaces || yAxis.decimalPlaces === 0)
								labelDecimalPlaces = yAxis.decimalPlaces;
							else if (yAxis.maxDecimalPlaces || yAxis.maxDecimalPlaces === 0)
								labelDecimalPlaces = yAxis.maxDecimalPlaces;
						} else {
							// If a chart panel, then always display at least the number of decimal places as calculated by masterData (panel.chart.decimalPlaces)
							// but if we are zoomed to high granularity then expand all the way out to the y-axis significant digits (panel.yAxis.printDecimalPlaces)
							labelDecimalPlaces = Math.max(
								yAxis.printDecimalPlaces,
								panel.chart.decimalPlaces
							);
							//	... and never display more decimal places than the symbol is supposed to be quoting at
							if (yAxis.maxDecimalPlaces || yAxis.maxDecimalPlaces === 0)
								labelDecimalPlaces = Math.min(
									labelDecimalPlaces,
									yAxis.maxDecimalPlaces
								);
						}
					}
					var dsField = null;
					// account for object chains
					var tuple = CIQ.existsInObjectChain(data, name);
					if (tuple) dsField = tuple.obj[tuple.member];
					else if (name == "Change") dsField = data.Close - data.iqPrevClose;

					var fieldName = displayName.replace(/^(Result )(.*)/, "$2");

					if (
						(showInterpolation || this.cleanupGaps === "stretch") &&
						fields[f].isSeries &&
						(dsField === null || typeof dsField == "undefined")
					) {
						// do this only for additional series and not the main series
						var seriesPrice = stx.valueFromInterpolation(
							bar,
							name,
							"Close",
							panel,
							yAxis,
							this.cleanupGaps === "stretch"
						);
						if (seriesPrice === null) continue;
						dsField = seriesPrice;
					}
					if (
						(dsField || dsField === 0) &&
						(isRecordDate ||
							typeof dsField !== "object" ||
							dsField.Close ||
							dsField.Close === 0)
					) {
						var fieldValue = "";
						if (dsField.Close || dsField.Close === 0) dsField = dsField.Close;
						if (dsField.constructor == Number) {
							if (!yAxis) {
								// raw value
								fieldValue = dsField;
								var intl = stx.internationalizer;
								if (intl) {
									var l = intl.priceFormatters.length;
									var decimalPlaces = CIQ.countDecimals(fieldValue);
									if (decimalPlaces >= l) decimalPlaces = l - 1;
									fieldValue =
										intl.priceFormatters[decimalPlaces].format(fieldValue);
								}
							} else if (
								yAxis.originalPriceFormatter &&
								yAxis.originalPriceFormatter.func
							) {
								// in comparison mode with custom formatter
								fieldValue = yAxis.originalPriceFormatter.func(
									stx,
									panel,
									dsField,
									labelDecimalPlaces
								);
							} else if (
								yAxis.priceFormatter &&
								yAxis.priceFormatter != CIQ.Comparison.priceFormat
							) {
								// using custom formatter
								fieldValue = yAxis.priceFormatter(
									stx,
									panel,
									dsField,
									labelDecimalPlaces
								);
							} else {
								fieldValue = stx.formatYAxisPrice(
									dsField,
									panel,
									labelDecimalPlaces,
									yAxis
								);
							}
						} else if (dsField.constructor == Date) {
							if (
								isRecordDate &&
								stx.controls.floatDate &&
								stx.controls.floatDate.innerHTML
							) {
								if (stx.chart.xAxis.noDraw) fieldValue = "N/A";
								else
									fieldValue = CIQ.displayableDate(stx, panel.chart, dsField);
							} else {
								fieldValue = CIQ.yyyymmdd(dsField);
								if (!CIQ.ChartEngine.isDailyInterval(stx.layout.interval)) {
									fieldValue += " " + dsField.toTimeString().substring(0, 8);
								}
							}
						} else {
							fieldValue = dsField;
						}
						var dedicatedField = node.querySelector(
							'.hu-tooltip [hu-tooltip-field="' + fieldName + '"]'
						);

						if (dedicatedField) {
							dedicatedField.querySelector(".hu-tooltip-value").innerHTML =
								fieldValue;
							var fieldNameField =
								dedicatedField.querySelector(".hu-tooltip-name");
							if (fieldNameField.innerHTML === "") {
								fieldNameField.innerHTML = fieldName;
								if (stx.translateUI) stx.translateUI(fieldNameField);
							}
						} else {
							var newField = document.createElement("tr");
							newField.setAttribute("hu-tooltip-field", "");
							newField.setAttribute("auto", true);
							var newFieldName = document.createElement("td");
							newFieldName.classList.add("hu-tooltip-name");
							newFieldName.innerHTML = stx.translateIf(fieldName);
							newField.appendChild(newFieldName);
							var newFieldValue = document.createElement("td");
							newFieldValue.classList.add("hu-tooltip-value");
							newFieldValue.innerHTML = fieldValue;
							newField.appendChild(newFieldValue);
							var parent = node.querySelector("tbody") || node;
							parent.appendChild(newField);
						}
					} else {
						var naField = node.querySelector(
							'.hu-tooltip [hu-tooltip-field="' + fieldName + '"]'
						);
						if (naField) {
							var naFieldNameField = naField.querySelector(".hu-tooltip-name");
							if (naFieldNameField.innerHTML !== "")
								naField.querySelector(".hu-tooltip-value").innerHTML = "n/a";
						}
					}
				}
				stx.huTooltip.render();

				function replaceFirstOfTwo(matched) {
					return function (m) {
						return ++matched === 1 ? "" : m;
					};
				}
			}

			function adjustSticky(marker) {
				if (marker.node.style.left === "-50000px") return;
				var mSticky = stx.controls.mSticky;
				if (mSticky && mSticky.style.display !== "none") {
					var newTop =
						CIQ.stripPX(marker.node.style.top) -
						CIQ.elementDimensions(mSticky, {
							padding: true,
							border: true,
							margin: true
						}).height;

					if (newTop < 0) {
						marker.node.style.top =
							CIQ.stripPX(marker.node.style.top) - newTop + "px";
						newTop = 0;
					}
					var style = mSticky.style;
					CIQ.efficientDOMUpdate(style, "top", newTop + "px");
					CIQ.efficientDOMUpdate(style, "left", marker.node.style.left);
					CIQ.efficientDOMUpdate(style, "right", marker.node.style.right);
				}
			}

			container.addEventListener("mouseout", hideTooltip);

			stx.append("mousemoveinner", function () {
				adjustSticky(this.huTooltip);
			});

			stx.append("deleteHighlighted", function () {
				this.huTooltip.lastBar = {};
				this.headsUpHR();
			});
			stx.append("headsUpHR", renderFunction);
			stx.append("createDataSegment", renderFunction);
			stx.huTooltip = new CIQ.Marker.Tooltip({
				stx: stx,
				xPositioner: "bar",
				chartContainer: true,
				node: node
			});
		};
}
