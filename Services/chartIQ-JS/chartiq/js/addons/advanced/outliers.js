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
 * Creates the outliers add-on which scales the y-axis to the main trend, hiding outlier
 * values. Markers are placed at the location of the outlier values enabling the user to
 * restore the full extent of the y-axis by selecting the markers.
 *
 *  Outliers show/hide can be toggled using the Ctrl+Alt+O keystroke combination (see the
 * `outliers` action in `hotkeyConfig.hotkeys` in *js/defaultConfiguration.js*).
 *
 * Requires *addOns.js*.
 *
 * ![Chart with hidden outliers](./img-Chart-with-Hidden-Outliers.png "Chart with hidden outliers")
 *
 * @param {object} params Configuration parameters.
 * @param {CIQ.ChartEngine} [params.stx] A reference to the chart object.
 * @param {number} [params.multiplier=3] Sets the threshold for outliers by multiplying the
 * 		normal data range. The default value hides only extreme outliers.
 * @param {array} [params.altColors] An array of hexadecimal color values used to style
 * 		outlier markers when multiple y-axes share the same panel. Markers for the first
 * 		additional y-axis are styled with the value at index 0; markers for the second
 * 		additional y-axis, the value at index 1; and so forth. If not provided, a default
 * 		array of colors is assigned.
 * @param {string} [params.menuContextClass] A CSS class name used to query the menu DOM element
 * 		that contains the UI control for the outliers add-on. In a multi-chart document, the
 * 		add-on is available only on charts that have a menu DOM element with the value for
 * 		`menuContextClass` as a class attribute.
 *
 * @constructor
 * @name CIQ.Outliers
 * @since
 * - 7.5.0
 * - 8.0.0 Added `params.altColors` and `params.menuContextClass`.
 *
 * @example
 * new CIQ.Outliers({ stx: stxx });
 */
CIQ.Outliers =
	CIQ.Outliers ||
	function (params) {
		if (!params) params = {};
		if (!params.stx) {
			console.warn("The Outliers addon requires an stx parameter");
			return;
		}
		// Set default marker colors
		if (!Array.isArray(params.altColors)) {
			params.altColors = [
				"#323390",
				"#66308f",
				"#0073ba",
				"#f4932f",
				"#0056a4",
				"#00a99c",
				"#00a553",
				"#ea1d2c",
				"#e9088c",
				"#fff126",
				"#912a8e",
				"#ee652e",
				"#00afed",
				"#8ec648"
			];
		}
		this.stx = params.stx;
		this.stx.outliers = this;
		this.cssRequired = true;

		this.multiplier = params.multiplier || 3; // Default to 3 for extreme outliers
		this.altColors = params.altColors;

		this.axisData = {};

		// Listen for a layout changed event and reset the markers
		this.stx.addEventListener("layout", function (event) {
			Object.keys(event.stx.outliers.axisData).forEach(
				function (key) {
					this.removeAllMarkers(this.axisData[key]);
					delete this.axisData[key];
				}.bind(event.stx.outliers)
			);
		});

		if (CIQ.UI) {
			CIQ.UI.KeystrokeHub.addHotKeyHandler(
				"outliers",
				({ stx }) => {
					stx.container.ownerDocument.body.keystrokeHub.context.advertised.Layout.setOutliers();
				},
				this.stx
			);
		}

		/**
		 * Checks for outlier values in `dataSet`, and adds outlier markers (data point markers
		 * and axis markers) to `axis`.
		 *
		 * @param {array} dataSet An array of objects of the form `{value: Number, quote: Object}`.
		 * 		Each object contains a value and its associated quote. The value is checked to
		 * 		determine whether it is an outlier of the data set. When checking more than one
		 * 		value for a quote (such as an OHLC quote), each value is included in a separate
		 * 		object; for example, `[{value: open, quote: quote}, {value: high, quote: quote},
		 * 		{value: low, quote: quote}, {value: close, quote: quote}...]`.
		 * @param {object} panel The panel where `dataSet` is rendered.
		 * @param {object} axis The y-axis against which `dataSet` is rendered. **Note:** Charts
		 * 		and panels can have multiple y-axes; each y-axis has its own set of outlier
		 * 		markers based on the data rendered on the axis.
		 * @return {array} A tuple consisting of the outlier minimum and maximum &mdash; or trend
		 * 		minimum and maximum, if no outliers are found &mdash; to be handled by the
		 * 		{@link CIQ.ChartEngine#determineMinMax} method. See the return value of the
		 * 		[find]{@link CIQ.Outliers#find} function for a description of outlier and trend
		 * 		minimum and maximum.
		 *
		 * @alias processDataSet
		 * @memberOf CIQ.Outliers.prototype
		 * @since 8.0.0
		 */
		this.processDataSet = function (dataSet, panel, axis) {
			if (!dataSet.length || dataSet.length <= 1) return false;

			var result = [0, 0]; // Min/Max-axis values to return

			// Create an axis reference if one does not exist
			if (!this.axisData[axis.name]) {
				var markerColor = "";
				var axisDepth = -1;
				// Check for another axis using this panel
				Object.keys(this.axisData).forEach(
					function (key) {
						if (this.axisData[key].panel.name == panel.name) {
							axisDepth++;
						}
					}.bind(this)
				);
				if (axisDepth > -1 && axisDepth < this.altColors.length)
					markerColor = this.altColors[axisDepth];

				this.axisData[axis.name] = {
					axis: axis,
					panel: panel,
					displayState: "none",
					isFlipped: false,
					originalZoom: axis.zoom,
					markerColor: markerColor,
					markers: {},
					axisMarkers: {}
				};
			}

			var currentAxis = this.axisData[axis.name];
			// Attach the min/max values to the current axis data
			Object.assign(currentAxis, this.find(dataSet));

			// Update/add necessary markers
			this.refreshMarkerArray(currentAxis);

			// Update marker display and labels
			this.refreshMarkers(currentAxis);

			// Return either trendMin or outlierMin based on the axis displayState
			if (
				(currentAxis.displayState === "low" ||
					currentAxis.displayState === "all") &&
				currentAxis.outlierMin !== null
			)
				result[0] = currentAxis.outlierMin;
			else result[0] = currentAxis.trendMin;
			// Return either trendMax or outlierMax based on the axis displayState
			if (
				(currentAxis.displayState === "high" ||
					currentAxis.displayState === "all") &&
				currentAxis.outlierMax !== null
			)
				result[1] = currentAxis.outlierMax;
			else result[1] = currentAxis.trendMax;

			return result;
		};

		/**
		 * Finds the outliers contained in `dataSet`.
		 *
		 * **Note:** This function may be overridden to provide a custom algorithm for finding
		 * outliers.
		 *
		 * @param {array} dataSet An array of objects of the form `{value: Number, quote: Object}`.
		 * 		Each object contains a value and its associated quote. The value is checked to
		 * 		determine whether it is an outlier of the data set. When checking more than one
		 * 		value for a quote (such as an OHLC quote), each value is included in a separate
		 * 		object; for example, `[{value: open, quote: quote}, {value: high, quote: quote},
		 * 		{value: low, quote: quote}, {value: close, quote: quote}...]`.
		 * @return {object} An object of the form:
		 * ```
		 * {
		 * 	// Minimum and maximum threshold values of dataSet to be considered an outlier.
		 * 	minValue: null,
		 * 	maxValue: null,
		 * 	// Mininum and maximum values of dataSet that are not considered outliers.
		 * 	// Will be the least and greatest values in dataSet if no outliers are found.
		 * 	trendMin: null,
		 * 	trendMax: null,
		 * 	// Minimum and maximum values of dataSet that are considered outliers.
		 * 	// Will remain null if no outliers are found.
		 * 	outlierMin: null,
		 * 	outlierMax: null,
		 * 	// Array of individual outlier information for marker placement, in the format {DT:DateTime, value:Number, position:String}
		 * 	// (position is either 'high' or 'low').
		 * 	activeOutliers: []
		 * }
		 * ```
		 *
		 * @alias find
		 * @memberOf CIQ.Outliers.prototype
		 * @since
		 * - 7.5.0
		 * - 8.0.0 Added return value.
		 */
		this.find = function (dataSet) {
			if (!dataSet.length || dataSet.length <= 0) return;

			var createMarkerPlaceholder = function (data, position) {
				return {
					quote: data.quote,
					DT: data.quote.DT,
					value: data.value,
					position: position
				};
			};

			// The minimum and maximum threshold values to be considered an outlier.
			var minValue = null;
			var maxValue = null;
			// min/max values of available data that are not considered outliers. Will be the least and greatest values in the available data if no outliers are found.
			var trendMin = null;
			var trendMax = null;
			// min/max values of available data that are considered outliers. Will remain null if no outlier is found.
			var outlierMin = null;
			var outlierMax = null;
			// Array of outlier information in the format
			// {DT:DateTime, value:Number, position:String}
			var activeOutliers = [];

			var dataSorted = dataSet.slice();
			dataSorted.sort(function (a, b) {
				return a.value - b.value;
			});
			var dataLength = dataSorted.length;

			// Outlier threshold values are defined as more than the interquartile range above the third quartile
			// or below the first quartile, of the sorted dataSet, multiplied by the value of the
			// stxx.outlierMultiplier property.
			var q1 = dataSorted[Math.floor(dataLength / 4)].value;
			var q3 = dataSorted[Math.floor(dataLength * (3 / 4))].value;
			var iqr = q3 - q1;

			minValue = q1 - iqr * this.multiplier;
			maxValue = q3 + iqr * this.multiplier;

			// Loop through the sorted data and find the outliers as well as the trend min/max
			for (var idx = 0; idx < dataLength; idx++) {
				// Attack the array from both ends
				var dataLow = dataSorted[idx];
				var dataHigh = dataSorted[dataLength - (idx + 1)];

				// Find and mark outliers. Existing merkers will be refreshed in setMarker.
				if (dataLow.value <= minValue)
					activeOutliers.push(createMarkerPlaceholder(dataLow, "low"));
				if (dataHigh.value >= maxValue)
					activeOutliers.push(createMarkerPlaceholder(dataHigh, "high"));

				// Find the first low value that's less than or equal to outlier threshold min
				if (outlierMin === null && dataLow.value <= minValue)
					outlierMin = dataLow.value;
				// Find the first high value that's greater than or equal to outlier threshold max
				if (outlierMax === null && dataHigh.value >= maxValue)
					outlierMax = dataHigh.value;

				// Find the first low value that's greater than the outlier threshold min
				if (trendMin === null && dataLow.value > minValue)
					trendMin = dataLow.value;
				// Find the first high value that's less than the outlier threshold max
				if (trendMax === null && dataHigh.value < maxValue)
					trendMax = dataHigh.value;

				// No need to loop through the entire array. Once the trend min/max are found we're done.
				if (trendMin !== null && trendMax !== null) break;
			}

			return {
				minValue: minValue,
				maxValue: maxValue,
				trendMin: trendMin,
				trendMax: trendMax,
				outlierMin: outlierMin,
				outlierMax: outlierMax,
				activeOutliers: activeOutliers
			};
		};

		/**
		 * Updates the freshness status of outlier markers belonging to `targetAxis`.
		 *
		 * Sets the status to fresh if the markers represent data points in the `activeOutliers`
		 * list of `targetAxis` or a marker is an axis marker for high or low outliers and high or
		 * low outliers exist. (See the return value of the [find]{@link CIQ.Outliers#find}
		 * function for a description of the `activeOutliers` list.)
		 *
		 * Adds new markers to `targetAxis` for data points in the `activeOutliers` list not
		 * already represented by a marker (see [markOutlier]{@link CIQ.Outliers#markOutlier}).
		 * Adds new axis markers if the data set rendered on `targetAxis` contains high or low
		 * outliers and the respective axis marker does not exist (see
		 * [markAxis]{@link CIQ.Outliers#markAxis}).
		 *
		 * Sets the status of all other markers belonging to `targetAxis` to stale, or unfresh
		 * (these markers are ultimately removed).
		 *
		 * @param {object} targetAxis The y-axis for which the markers are refreshed.
		 * 		**Note:** Charts and panels can have multiple y-axes, each with its own array of
		 * 		outlier markers.
		 *
		 * @alias refreshMarkerArray
		 * @memberOf CIQ.Outliers.prototype
		 * @since 8.0.0
		 */
		this.refreshMarkerArray = function (targetAxis) {
			this.deprecateMarkers(targetAxis); // If a marker isn't refreshed below, it will be deleted in the next call

			var targetMarkers = targetAxis.markers;
			targetAxis.activeOutliers.forEach(
				function (outlier) {
					var quoteTime = outlier.DT.getTime().toString();
					// Add a quote marker if there isn't one already
					if (!targetMarkers[quoteTime]) {
						targetMarkers[quoteTime] = {
							isFresh: true,
							type: "quote",
							value: outlier.value,
							marker: this.markOutlier(outlier, outlier.position, targetAxis)
						};
					}
					// Always refresh the status of the marker
					targetMarkers[quoteTime].isFresh = true;
				}.bind(this)
			);
			if (targetAxis.outlierMax !== null) {
				// Add the high axis marker if there isn't one
				if (!targetMarkers.axisHigh) {
					targetMarkers.axisHigh = {
						isFresh: true,
						type: "axis",
						value: targetAxis.outlierMax,
						marker: this.markAxis("high", targetAxis)
					};
				}
				// Always refresh the status of the marker
				targetMarkers.axisHigh.isFresh = true;
			}
			if (targetAxis.outlierMin !== null) {
				// Add the low axis marker if there isn't one
				if (!targetMarkers.axisLow) {
					targetMarkers.axisLow = {
						isFresh: true,
						type: "axis",
						value: targetAxis.outlierMin,
						marker: this.markAxis("low", targetAxis)
					};
				}
				// Always refresh the status of the marker
				targetMarkers.axisLow.isFresh = true;
			}
		};

		/**
		 * Sets the outlier display state, which determines whether to display outlier markers.
		 *
		 * @param {string} newState The intended display state; should be one of:
		 * <ul>
		 *		<li>"high" &mdash; Show high outliers; hide high outlier markers.</li>
		 *		<li>"low" &mdash; Show low outliers; hide low outlier markers.</li>
		 *		<li>"all" &mdash; Show high and low outliers; hide high and low outlier markers.</li>
		 *		<li>"none" &mdash; Hide high and low outliers; show high and low outlier markers.</li>
		 * </ul>
		 * If none of the above is provided, "none" is assumed.
		 * @param {object} targetAxis The y-axis on which the outlier state is set. **Note:** A
		 * 		chart or panel can have multiple y-axes.
		 *
		 * @alias setDisplayState
		 * @memberOf CIQ.Outliers.prototype
		 * @since
		 * - 7.5.0
		 * - 8.0.0 Added `targetAxis` parameter.
		 */
		this.setDisplayState = function (newState, targetAxis) {
			if (newState != "high" && newState != "low" && newState != "all")
				newState = "none";

			var displayState = newState;
			// Set the value of displayState to show the intended state, based on its existing state. This
			// allows the markers to toggle between states without concern for what is currently displayed.
			// For example: if the current display state is showing low outlier only, and the intent is to
			// now display high outliers as well, then the display state will change to 'all'.
			// This will toggle the high/low state off as well.
			if (targetAxis.displayState == "all" && newState == "high")
				displayState = "low";
			else if (targetAxis.displayState == "all" && newState == "low")
				displayState = "high";
			else if (targetAxis.displayState == "high" && newState == "low")
				displayState = "all";
			else if (targetAxis.displayState == "low" && newState == "high")
				displayState = "all";
			else if (targetAxis.displayState == newState) displayState = "none";

			targetAxis.displayState = displayState;
			// Reset the axis zoom state
			targetAxis.axis.zoom = targetAxis.originalZoom;

			this.refreshMarkers(targetAxis);
			this.stx.draw();
		};

		/**
		 * Removes all markers from `targetAxis` that are no longer fresh; that is, markers that
		 * do not represent data points in the current data set, or axis markers that are
		 * irrelevant because high or low outliers no longer exist. Sets the status of all
		 * remaining outlier markers to stale, or not fresh (the freshness status should
		 * subsequently be reevaluated).
		 *
		 * @param {object} targetAxis The y-axis for which the markers are deprecated. **Note:**
		 * 		A chart or panel can have multiple y-axes; each y-axis has its own outlier
		 * 		markers based on the data rendered on the axis.
		 *
		 * @alias deprecateMarkers
		 * @memberOf CIQ.Outliers.prototype
		 * @since
		 * - 7.5.0
		 * - 8.0.0 Added `targetAxis` parameter.
		 */
		this.deprecateMarkers = function (targetAxis) {
			var removeMarker = function (marker) {
				if (marker.marker && !marker.isFresh) {
					if (marker.marker.remove) marker.marker.remove();
					marker.marker = null;
				} else {
					marker.isFresh = false;
				}
			};

			// Handle the outlier markers
			Object.keys(targetAxis.markers).forEach(
				function (key) {
					removeMarker(this.markers[key]);
					// Remove the marker property if its marker has been removed
					if (!this.markers[key].marker) {
						delete this.markers[key];
					}
				}.bind(targetAxis)
			);
		};

		/**
		 * Removes all outlier markers from `targetAxis`, including data point markers and y-axis
		 * markers.
		 *
		 * @param {object} targetAxis The y-axis from which the markers are removed. **Note:**
		 * 		Charts and panels can have multiple y-axes, each with its own outlier markers.
		 *
		 * @alias removeAllMarkers
		 * @memberOf CIQ.Outliers.prototype
		 * @since
		 * - 7.5.0
		 * - 8.0.0 Added `targetAxis` parameter.
		 */
		this.removeAllMarkers = function (targetAxis) {
			Object.keys(targetAxis.markers).forEach(function (key) {
				var targetMarker = targetAxis.markers[key].marker;
				if (targetMarker) {
					if (targetMarker.remove) targetMarker.remove();
					targetMarker = null;
				}
				// Remove the marker property if its marker has been removed
				if (!targetMarker) {
					delete targetAxis.markers[key];
				}
			});
		};

		/**
		 * Shows or hides outlier markers based on the display state.
		 *
		 * See [setDisplayState]{@link CIQ.Outliers#setDisplayState}.
		 *
		 * @alias updateMarkerVisibility
		 * @memberOf CIQ.Outliers.prototype
		 * @since 7.5.0
		 */
		this.updateMarkerVisibility = function () {
			Object.keys(this.markers).forEach(
				function (key) {
					if (
						this.displayState == "all" ||
						this.markers[key].marker.node.classList.contains(this.displayState)
					)
						this.markers[key].marker.node.style.display = "none";
					else this.markers[key].marker.node.style.display = "block";
				}.bind(this)
			);
		};

		/**
		 * Updates the position of the axis outlier marker represented by `node`.
		 *
		 * @param {HTMLElement} node The axis marker to position.
		 * @param {object} targetAxis The y-axis on which the axis marker is positioned.
		 *
		 * @alias refreshAxisMarkers
		 * @memberOf CIQ.Outliers.prototype
		 * @since
		 * - 7.5.0
		 * - 8.0.0 Added `targetAxis` parameter.
		 */
		this.refreshAxisMarkers = function (node, targetAxis) {
			var isHigh = false;
			var positionClass = "low";
			if (node.classList.contains("high")) {
				isHigh = true;
				positionClass = "high";
			}
			var posTop = targetAxis.axis.top;
			// Set the low marker of reverse the value if the axis is flipped
			if (
				(!targetAxis.isFlipped && !isHigh) ||
				(targetAxis.isFlipped && isHigh)
			) {
				posTop = targetAxis.axis.bottom - 50;
			}
			// Overlap the markers in the center for nano size because it's all or nothing at that size.
			if (node.classList.contains("nano")) {
				posTop = targetAxis.axis.top + targetAxis.axis.height / 2 - 22;
			}

			var xFormLeft = Math.floor(targetAxis.axis.left).toString() + "px";
			var xFormTop = Math.floor(posTop).toString() + "px";
			// Use the vlaue property instead
			var labelPrice = isHigh ? targetAxis.outlierMax : targetAxis.outlierMin;

			// Set marker positioning relative to the y-axis
			node.style.transform = "translate(" + xFormLeft + ", " + xFormTop + ")";
			node.querySelector(".outlier-value").innerText =
				this.stx.formatYAxisPrice(labelPrice);
			// Apply .right class when axis is on the left to right position child elements
			if (xFormLeft === "0px") node.classList.add("right");
			else node.classList.remove("right");
		};

		/**
		 * Updates the display styles of all outlier markers belonging to `targetAxis`, including
		 * data point markers and axis markers. Shows the markers if outliers are hidden and the
		 * marked outliers exceed the bounds of `targetAxis`. Flips the markers if `targetAxis`
		 * has been inverted (see [flipMarkers]{@link CIQ.Outliers#flipMarkers}).
		 *
		 * @param {object} targetAxis The y-axis on which the markers are refreshed. **Note:**
		 * 		Charts and panels can have multiple y-axes, each with its own outlier markers.
		 *
		 * @alias refreshMarkers
		 * @memberOf CIQ.Outliers.prototype
		 * @since 8.0.0
		 */
		this.refreshMarkers = function (targetAxis) {
			Object.keys(targetAxis.markers).forEach(
				function (targetAxis, key) {
					var targetMarker = targetAxis.markers[key].marker;
					var targetValue = targetAxis.markers[key].value;
					var targetType = targetAxis.markers[key].type;
					// Check the marker value against the actual axis min/max. This accounts for yaxis scaling
					// in addition to the outlier display state.
					if (
						(targetValue > targetAxis.trendMax &&
							targetAxis.axis.high >= targetValue) ||
						(targetValue < targetAxis.trendMin &&
							targetAxis.axis.low <= targetValue)
					) {
						if (targetType == "quote") {
							targetMarker.node.style.display = "none";
						} else if (targetType == "axis") {
							targetMarker.node.classList.add("compress");
						}
					} else {
						if (targetType == "quote") {
							targetMarker.node.style.display = "block";
						} else if (targetType == "axis") {
							targetMarker.node.classList.remove("compress");
						}
					}

					if (targetType == "axis") {
						this.refreshAxisMarkers(targetMarker.node, targetAxis);
					}

					// Update the marker responsive style
					if (targetAxis.axis.height < 100)
						targetMarker.node.classList.add("nano");
					else targetMarker.node.classList.remove("nano");

					if (targetAxis.axis.height < 250)
						targetMarker.node.classList.add("micro");
					else targetMarker.node.classList.remove("micro");
				}.bind(this, targetAxis)
			);

			// Check for a change in the flipped state of the axis
			if (targetAxis.isFlipped !== targetAxis.axis.flipped)
				this.flipMarkers(targetAxis);
		};

		/**
		 * Places markers on the y-axis when high or low outliers exist.
		 *
		 * @param {string} position The position of the marker; either "high" or "low". If the
		 * 		position is "high", the marker is placed at the top of the axis; if "low", at the
		 * 		bottom of the axis.
		 * @param {object} targetAxis The y-axis on which the markers are placed. **Note:**
		 * 		Charts and panels can have multiple y-axes, each with its own outlier markers.
		 * @return {CIQ.Marker} The axis outlier marker, which is added to the display.
		 *
		 * @alias markAxis
		 * @memberOf CIQ.Outliers.prototype
		 * @since
		 * - 7.5.0
		 * - 8.0.0 Added `position` and `targetAxis` parameters and return value.
		 */
		this.markAxis = function (position, targetAxis) {
			// Create a marker positioned on the y-axis and return it.
			var axisMarker = document.createElement("div");
			axisMarker.classList.add("outlier-sticker", "axis", "mini", position);
			axisMarker.innerHTML =
				'<div class="expansion"><div class="pill"><div class="icon"></div></div><div class="tick"></div><span class="outlier-value"></div><div class="compression"><div class="pill"><div class="icon"></div></div></div></span>';

			this.matchYAxisStyle(axisMarker);
			this.setMarkerColor(axisMarker, targetAxis.markerColor);

			var activate = this.handleMarkerClick.bind(
				this,
				position,
				targetAxis,
				axisMarker
			);
			axisMarker.addEventListener("click", activate);
			axisMarker.addEventListener("touchend", activate);

			return new CIQ.Marker({
				stx: this.stx,
				xPositioner: "none",
				yPositioner: "none",
				label: "expand",
				permanent: true,
				chartContainer: true,
				node: axisMarker
			});
		};

		/**
		 * Adds an outlier marker to a tick (data point).
		 *
		 * @param {object} data Represents the tick that is marked as an outlier. Contains the
		 * 		outlier value and its associated quote; for example,
		 * 		`{value: Number, quote: Object}`.
		 * @param {string} position The position of the marker; either "high" or "low". If the
		 * 		position is "high", the marker is placed at the top of the chart; if "low", at the
		 * 		bottom of the chart.
		 * @param {object} targetAxis The y-axis to which the marker is added. **Note:** A chart
		 * 		or panel can have multiple y-axes; each y-axis has its own outlier markers.
		 * @return {CIQ.Marker} The outlier marker, which is added to the display.
		 *
		 * @alias markOutlier
		 * @memberOf CIQ.Outliers.prototype
		 * @since
		 * - 7.5.0
		 * - 8.0.0 Added `targetAxis` parameter.
		 */
		this.markOutlier = function (data, position, targetAxis) {
			if (!data) return;
			if (!targetAxis) targetAxis = { panel: this.stx.panels.chart };
			position = position || "high";

			// Create a marker
			var outlierMarker = document.createElement("div");
			outlierMarker.classList.add("outlier-sticker", "quote", "mini", position);
			outlierMarker.innerHTML =
				'<div class="pill"><div class="icon"></div></div><span class="outlier-value">' +
				this.stx.formatYAxisPrice(data.value, targetAxis.panel) +
				"</span>";

			this.matchYAxisStyle(outlierMarker);
			this.setMarkerColor(outlierMarker, targetAxis.markerColor);

			var activate = this.handleMarkerClick.bind(
				this,
				position,
				targetAxis,
				outlierMarker
			);
			outlierMarker.addEventListener("click", activate);
			outlierMarker.addEventListener("touchend", activate);

			return new CIQ.Marker({
				stx: this.stx,
				xPositioner: "date",
				yPositioner: position == "high" ? "top" : "bottom",
				x: data.quote.DT,
				panelName: targetAxis.panel.name,
				node: outlierMarker
			});
		};

		/**
		 * Calls [setDisplayState]{@link CIQ.Outliers#setDisplayState} in response to selecting an
		 * outlier marker.
		 *
		 * @param {string} position The position of the marker; either "high" or "low".
		 * @param {object} targetAxis The y-axis that contains the selected marker. **Note:**
		 * 		Charts and panels can have multiple y-axes; each y-axis has its own outlier
		 * 		markers.
		 * @param {HTMLElement} targetNode The selected outlier marker DOM node.
		 *
		 * @alias handleMarkerClick
		 * @memberOf CIQ.Outliers.prototype
		 * @since 8.0.0
		 */
		this.handleMarkerClick = function (position, targetAxis, targetNode) {
			if (targetNode.classList.contains("nano")) position = "all"; // not concerned about differentiation between high and low at the nano size
			this.setDisplayState(position, targetAxis);
			this.stx.draw();
		};

		/**
		 * Sets the CSS style properties of the y-axis outlier marker to match the CSS styling of
		 * the y-axis itself.
		 *
		 * @param {HTMLElement} node The y-axis marker to style.
		 *
		 * @alias matchYAxisStyle
		 * @memberOf CIQ.Outliers.prototype
		 * @since 7.5.0
		 */
		this.matchYAxisStyle = function (node) {
			// Apply styles from the yAxis
			if (this.stx.styles.stx_yaxis) {
				var styles = this.stx.styles.stx_yaxis;
				node.style.fontSize = styles.fontSize;
				node.style.fontFamily = styles.fontFamily;
				node.style.color = styles.color;
				node.style.borderColor = styles.color;
			}
		};

		/**
		 * Applies a background color to an outlier data point marker.
		 *
		 * @param {HTMLElement} node The outlier marker DOM node to which the background color is
		 * 		applied.
		 * @param {string} color The hexadecimal color value set as the node background color.
		 *
		 * @alias setMarkerColor
		 * @memberOf CIQ.Outliers.prototype
		 * @since 8.0.0
		 */
		this.setMarkerColor = function (node, color) {
			if (color == "") return;
			//Set marker color
			var markerPills = node.querySelectorAll(".pill");
			for (var markerIdx = 0; markerIdx < markerPills.length; markerIdx++) {
				markerPills[markerIdx].style.backgroundColor = color;
			}
		};

		/**
		 * Repositions outlier markers from the top of the display to the bottom (or vice versa)
		 * when the associated y-axis has been flipped (inverted).
		 *
		 * @param {object} targetAxis The y-axis that has been flipped.
		 *
		 * @alias flipMarkers
		 * @memberOf CIQ.Outliers.prototype
		 * @since 8.0.0
		 */
		this.flipMarkers = function (targetAxis) {
			targetAxis.isFlipped = targetAxis.axis.flipped;

			Object.keys(targetAxis.markers).forEach(
				function (targetAxis, key) {
					var targetMarker = targetAxis.markers[key].marker;
					var targetValue = targetAxis.markers[key].value;
					var targetType = targetAxis.markers[key].type;
					// Check for flipped state and add/remove flipped class
					if (targetAxis.isFlipped) {
						targetMarker.node.classList.add("flipped");
					} else {
						targetMarker.node.classList.remove("flipped");
					}

					// Set Y positioning of quote markers
					if (targetType == "quote") {
						if (targetValue > targetAxis.trendMax) {
							// High marker
							if (targetAxis.isFlipped)
								targetMarker.params.yPositioner = "bottom";
							else targetMarker.params.yPositioner = "top";
						} else if (targetValue < targetAxis.trendMin) {
							// Low marker
							if (targetAxis.isFlipped) targetMarker.params.yPositioner = "top";
							else targetMarker.params.yPositioner = "bottom";
						}
					}
				}.bind(this, targetAxis)
			);
		};

		var originalDetermineMinMax = this.stx.determineMinMax;
		/**
		 * Overrides the default `CIQ.ChartEngine.prototype.determineMinMax` function when the
		 * Outliers add-on is active. Injects the local {@link CIQ.Outliers#processDataSet}
		 * function as a data filter and passes the filter along to the original `determineMinMax`
		 * function (see below).
		 *
		 * @param {array} quotes The array of quotes (typically
		 * 		`CIQ.ChartEngine.chart.dataSegment`) to evaluate for minimum and maximum values.
		 * @param {array} fields A list of fields to compare.
		 * @param {boolean|array} [sum] If true, then compute maximum sum rather than the maximum
		 * 		single value across all fields. If an array, compute sum over just the fields in
		 * 		the array.
		 * @param {boolean} [bypassTransform] If true, bypass any transformations.
		 * @param {number} [length] Specifies how many elements of the quotes array to process.
		 * @param {boolean} [checkArray] If true, the type of the value used to determine the
		 * 		min/max is checked to ascertain whether it is an array; if so, the first element
		 * 		of the array is retrieved for use in the min/max determination.
		 * @param {CIQ.ChartEngine.Panel} [panel] A reference to the panel rendering the quotes.
		 * @param {CIQ.ChartEngine.YAxis} [axis] A reference to the y-axis rendered for the quotes.
		 * @param {array} [filters] Array of functions to process the min/max values before
		 * 	returning. Filter functions must return a valid min/max tuple or false.
		 * @return {function} A reference to the original
		 * 		`CIQ.ChartEngine.prototype.determineMinMax` library function.
		 *
		 * @memberof CIQ.ChartEngine
		 * @since
		 * - 7.5.0
		 * - 8.0.0 Allow the `sum` parameter to be an array of valid fields to sum over.
		 * 		Added the `panel`, `axis`, and `filters` parameters.
		 * @private
		 */
		this.stx.determineMinMax = function (
			quotes,
			fields,
			sum,
			bypassTransform,
			length,
			checkArray,
			panel,
			axis,
			filters
		) {
			if (!filters) filters = [];
			if (panel && axis && this.layout.outliers)
				filters.push(this.outliers.processDataSet.bind(this.outliers));
			return originalDetermineMinMax.call(
				this,
				quotes,
				fields,
				sum,
				bypassTransform,
				length,
				checkArray,
				panel,
				axis,
				filters
			);
		};
	};

/**
 * CIQ.Marker interface placeholder to be augmented in *standard.js* with properties.
 *
 * @tsinterface CIQ~Marker
 */
