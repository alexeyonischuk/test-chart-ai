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


let __js_standard_markers_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

// Make sure this file is only executed once
if (!CIQ.Marker) {
	CIQ.ChartEngine.helpersToRegister.push(function (stx) {
		stx.markerHelper = {
			classMap: {},
			domMarkers: [],
			visibleCanvasMarkers: [],
			highlighted: [],
			placementMap: {},
			groupMap: {},
			fieldPanelMap: {}
		};
	});

	/**
	 * Adds a marker to the internal marker mappings.
	 *
	 * @param {CIQ.Marker} marker The marker to add.
	 *
	 * @memberOf CIQ.ChartEngine
	 * @private
	 * @since 9.1.0
	 */
	CIQ.ChartEngine.prototype.addToMarkerMapping = function (marker) {
		this.removeFromHolder(marker);

		const panel = this.panels[marker.params.panelName];
		if (!panel) return;
		marker.chart = panel.chart;

		let classMap = this.markerHelper.classMap[marker.className];
		if (!classMap) classMap = this.markerHelper.classMap[marker.className] = {};
		if (!classMap[marker.params.panelName])
			classMap[marker.params.panelName] = [];
		classMap[marker.params.panelName].push(marker);
		this.markerHelper.classMap[marker.className] = classMap;

		const { label } = marker.params;
		if (!this.markers[label]) this.markers[label] = [];
		this.markers[label].push(marker);
	};

	/**
	 * Adds a marker to the chart.
	 *
	 * @param {CIQ.Marker} marker The marker to add.
	 *
	 * @memberOf CIQ.ChartEngine
	 * @private
	 * @since 7.2.0 Checks for the `prepareForHolder` method on the markers's `stxNodeCreator` and
	 * 		calls that function if present.
	 */
	CIQ.ChartEngine.prototype.addToHolder = function (marker) {
		const panel = this.panels[marker.params.panelName];
		if (!panel) return;

		let mparams = marker.params,
			node = marker.node,
			nodeCreator = marker.stxNodeCreator;
		if (nodeCreator && nodeCreator.prepareForHolder) {
			node = nodeCreator.prepareForHolder(marker);
		}
		if (mparams.chartContainer) {
			this.container.appendChild(marker.node);
		} else if (mparams.includeAxis) {
			panel.holder.appendChild(marker.node);
		} else {
			panel.subholder.appendChild(node);
		}

		marker.chart = panel.chart;
		if (nodeCreator && nodeCreator.addToHolder) nodeCreator.addToHolder(marker);
		if (nodeCreator && nodeCreator.expand) {
			if (nodeCreator.node.params.pinnable && marker.makePinnable)
				marker.makePinnable();
			CIQ.Marker.initializeScrollBehavior(nodeCreator);
			if (nodeCreator.expansionHolder) {
				CIQ.Marker.initializeScrollBehavior({
					expand: nodeCreator.expansionHolder
				});
			}
		}

		if (marker.className !== "CIQ.Marker.Group") this.updateGroupMap();
	};

	/**
	 * Gets an array of markers
	 * @private
	 * @param {string} type The type of comparison "panelName","label","field","all"
	 * @param {string} comparison The value to compare to
	 * @return {array} The marker array
	 *
	 * @since 9.1.0 Added "field" value for `type` parameter.
	 */
	CIQ.ChartEngine.prototype.getMarkerArray = function (type, comparison) {
		const arr = [];
		for (let label in this.markers) {
			for (let i = 0; i < this.markers[label].length; i++) {
				const marker = this.markers[label][i];
				if (type == "panelName") {
					if (marker.params.panelName == comparison) arr.push(marker);
				} else if (type == "label") {
					if (label == comparison) arr.push(marker);
				} else if (type == "field") {
					if (marker.params.field === comparison) arr.push(marker);
				} else if (type == "all") {
					arr.push(marker);
				}
			}
		}
		return arr;
	};

	/**
	 * Removes the marker from the chart
	 * @private
	 * @param  {CIQ.Marker} marker The marker to remove
	 * @memberOf CIQ.ChartEngine
	 */
	CIQ.ChartEngine.prototype.removeFromHolder = function (marker) {
		marker.node.remove();
		// Remove from label map
		const labels = this.markers[marker.params.label];
		if (!labels) return;
		for (let i = 0; i < labels.length; i++) {
			if (labels[i] === marker) {
				labels.splice(i, 1);
				break;
			}
		}

		// remove from class map
		const classMap = this.markerHelper.classMap[marker.className];
		if (classMap) {
			Object.entries(classMap).forEach(([panelName, markers]) => {
				const index = markers.indexOf(marker);
				if (index > -1) markers.splice(index, 1);
				if (!markers.length) delete classMap[panelName];
			});
		}

		if (marker.className !== "CIQ.Marker.Group") this.updateGroupMap();
	};

	/**
	 * Moves the markers from one panel to another
	 * Useful when renaming panels
	 * @param  {string} fromPanelName The panel to move markers from
	 * @param  {string} toPanelName The panel to move markers to
	 * @param  {CIQ.Marker[]} [arrSubset] Optional subset of markers to move to new panel
	 * @memberOf CIQ.ChartEngine
	 * @since
	 * - 2016-07-16
	 * - 9.1.0 Added parameter `arrSubset`.
	 */
	CIQ.ChartEngine.prototype.moveMarkers = function (
		fromPanelName,
		toPanelName,
		arrSubset
	) {
		const arr = arrSubset || this.getMarkerArray("panelName", fromPanelName);

		arr.forEach((marker) => {
			if (marker instanceof CIQ.Marker.Group) return;
			marker.params.panelName = toPanelName;
			if (arrSubset) {
				this.addToMarkerMapping(marker);
				if (
					!marker.stxNodeCreator ||
					!marker.stxNodeCreator.isCanvasMarker ||
					!marker.stxNodeCreator.deferAttach
				)
					this.addToHolder(marker);
			}
		});
		if (arrSubset) return;
		for (let cn in this.markerHelper.classMap) {
			const className = this.markerHelper.classMap[cn];
			const tmp = className[fromPanelName];
			if (tmp) {
				className[toPanelName] = tmp;
				delete className[fromPanelName];
			}
		}
		this.updateGroupMap();
	};

	/**
	 * Establishes the tick value for any markers that have a "date" specified. It tries to be efficient, not recalculating
	 * unless the size of the dataSet for a chart has actually changed
	 * @private
	 * @memberOf CIQ.ChartEngine
	 */
	CIQ.ChartEngine.prototype.establishMarkerTicks = function () {
		this.getMarkerArray("all").forEach((marker) => this.setMarkerTick(marker));
		this.updateGroupMap();
	};

	/**
	 * Figures out the position of a future marker but only if it is displayed on the screen.
	 * @param  {CIQ.Marker} marker The marker to check
	 * @memberOf CIQ.ChartEngine
	 */
	CIQ.ChartEngine.prototype.futureTickIfDisplayed = function (marker) {
		var chart = marker.chart;
		if (chart.dataSet.length < 1) return;
		var xaxisDT = chart.xaxis[chart.xaxis.length - 1].DT;

		xaxisDT = new Date(xaxisDT.getTime() - this.timeZoneOffset * 60000);
		if (marker.params.x > xaxisDT) return; // not displayed on screen yet

		// It should be displayed on the screen now so find the exact tick
		var futureTicksOnScreen = chart.maxTicks - chart.dataSegment.length;
		var ticksToSearch = chart.dataSet.length + futureTicksOnScreen;
		var pms, qms;
		var dt = new Date(+chart.dataSet[chart.dataSet.length - 1].DT);

		var iter = this.standardMarketIterator(dt, null, chart);

		var dms = marker.params.x.getTime();
		for (var j = chart.dataSet.length; j < ticksToSearch; j++) {
			pms = dt.getTime();
			dt = iter.next();
			qms = dt.getTime();
			// If the event lands on that day, or if the event landed between bars
			if (qms == dms) {
				marker.tick = j;
				return;
			} else if (qms > dms && pms < dms) {
				marker.tick = Math.max(j - 1, 0);
				return;
			}
		}
	};

	/**
	 * Establishes the tick value for the specified marker. We do this to avoid calculating the date every time we want
	 * to place the marker. Converting date to tick is a very expensive operation!
	 * @param {CIQ.Marker} marker The marker for which to establish the tick
	 * @private
	 * @memberOf CIQ.ChartEngine
	 */
	CIQ.ChartEngine.prototype.setMarkerTick = function (marker) {
		var chart = marker.chart || this.chart;
		if (marker.params.xPositioner == "master" && marker.params.x) {
			marker.tick = Math.floor(marker.params.x / this.layout.periodicity);
		} else if (marker.params.xPositioner == "tick" && marker.params.x) {
			marker.tick = marker.params.x;
		} else if (marker.params.xPositioner == "date" && marker.params.x) {
			var pms, qms;
			var dms = marker.params.x.getTime();
			for (var i = 0; i < chart.dataSet.length; i++) {
				var quotes = chart.dataSet[i];
				qms = quotes.DT.getTime();
				pms = qms;
				if (i > 0) pms = chart.dataSet[i - 1].DT.getTime();
				// If the event lands on that day, or if the event landed between bars
				if (qms == dms) {
					marker.tick = i;
					return;
				} else if (qms > dms && pms < dms) {
					marker.tick = Math.max(i - 1, 0);
					return;
				} else if (dms < qms) {
					marker.tick = null;
					// marker date is in distant past, shortcircuit the logic for performance.
					return;
				}
			}
			if (chart.dataSet.length < 1) return;
			var dt = new Date(+chart.dataSet[i - 1].DT);
			if (dt.getTime() < dms) marker.params.future = true;
			marker.tick = null; // reset in case we had figured it out with an earlier dataset
		}
	};

	/**
	 * Refreshes the `stxx.markerHelper.groupMap` property. Gathers references to all markers existing at the same tick value
	 * on the chart. Generates group markers to represent individual markers at the same location. Markers must have their
	 * `props.groupable` property set to `true` in order to be grouped. Presently, this feature only works for "simple" circle
	 * and square marker types.
	 *
	 * @private
	 * @memberOf CIQ.ChartEngine.prototype
	 * @since 9.2.0
	 */
	CIQ.ChartEngine.prototype.updateGroupMap = function () {
		const arr = this.getMarkerArray("all");

		const { groupMap } = this.markerHelper;

		// Clear out existing marker references. Marker tick positions can change with periodicity
		// so we rebuild the marker references each time.
		Object.values(groupMap).forEach((group) => {
			if (group.groupMarker) group.groupMarker.savedMarkers = group.markers; // Temporary storage for markers to clean up if they are removed from the group
			group.markers = [];
		});

		// Add marker pointers to the group map
		arr.forEach((marker) => {
			let { className, tick } = marker;
			let {
				yPositioner,
				xPositioner,
				panelName,
				x,
				label,
				datum,
				groupable,
				field
			} = marker.params;

			if (groupable === false) return;
			// Group markers are not part of the group map
			if (className == "CIQ.Marker.Group") return;
			// SignalIQ markers not supported until group marker UI can be worked out
			if (className == "CIQ.Marker.SignalIQ") return;

			// Grab the x value as startDate for time span events
			if (!x && datum && datum.startDate) x = datum.startDate;

			const { node } = marker.stxNodeCreator || {};
			const isTse =
				CIQ.Marker.TimeSpanEvent && marker instanceof CIQ.Marker.TimeSpanEvent;
			if (
				!node ||
				!node.params ||
				!node.params.type ||
				!this.groupableMarkerTypes.includes(node.params.type) ||
				(node.params.category == "trade" && !isTse) // Trade example not supported
			) {
				return;
			}

			// Validate that the marker has everything needed to make it part of a group
			if (
				!panelName ||
				!yPositioner ||
				!tick ||
				!x ||
				marker instanceof CIQ.Marker.Group
			)
				return;

			const lane =
				yPositioner.includes("_lane") ||
				(CIQ.Marker.TimeSpanEvent &&
					marker instanceof CIQ.Marker.TimeSpanEvent);
			const keyBase =
				yPositioner +
				"|" +
				panelName +
				(lane ? "-" + label : "") +
				(field ? "-" + field : "");
			const groupKey = keyBase + "-" + tick;

			// Set up the groupMap object if one does not exist already
			if (typeof groupMap[groupKey] == "undefined") {
				groupMap[groupKey] = {
					yPositioner,
					xPositioner,
					panelName,
					className,
					field,
					x,
					tick,
					groupKey,
					groupMarker: null,
					markers: []
				};
			}

			// Store the groupKey in the marker for quick lookup in the positioning function
			marker.groupKey = groupKey;
			// Show all markers here in case they are orphaned from a group. They will be hidden
			// again when the group is checked.
			marker.hidden = false;

			// Add a reference to the marker in the groupMap.
			groupMap[groupKey].markers.push(marker);
		});

		// Update the group markers
		for (let groupKey in groupMap) {
			let group = groupMap[groupKey];
			// Set the marker hidden state and add/remove a group marker
			if (group.markers.length > 1) {
				// Hide all markers in this group
				group.markers.forEach((marker) => (marker.hidden = true));
				if (!group.groupMarker) {
					// Add a group marker if one isn't available
					const params = {
						stx: this,
						panelName: group.panelName,
						yPositioner: group.yPositioner,
						xPositioner: group.xPositioner,
						x: group.x,
						field: group.field,
						groupKey,
						displayStem: true
					};
					group.groupMarker =
						group.className == "CIQ.Marker.TimeSpanEvent"
							? new CIQ.Marker.TimeSpanEvent.Group({
									...params,
									y: group.markers[0].params.datum.spacingModifier,
									displayStem: false
							  })
							: new CIQ.Marker.Group(params);
				} else {
					group.groupMarker.groupKey = groupKey;
				}
				const { stxNodeCreator } = group.groupMarker;
				// Store the yAxis height to size the marker expansion container
				const panel = this.panels[stxNodeCreator.panelName] || this.chart;
				stxNodeCreator.node.chartHeight = panel.yAxis.height;
				// Update the group marker if applicable
				stxNodeCreator.updateVisual();
			} else {
				if (group.groupMarker) {
					let { groupMarker } = group;
					if (groupMarker.stxNodeCreator.groupMarker) {
						groupMarker.stxNodeCreator.groupMarker.remove();
						groupMarker.stxNodeCreator.groupMarker = null;
					}
					// Remove references to the marker expansions before they are removed from the dom
					if (groupMarker.savedMarkers) {
						groupMarker.savedMarkers.forEach(
							(marker) => (marker.groupExpansionEl = null)
						);
						groupMarker.savedMarkers = null;
					}
					groupMarker.remove();
					groupMarker = null;
				}
				delete groupMap[groupKey];
			}
		}

		this.markerHelper.groupMap = groupMap;
	};

	/**
	 * <span class="injection">INJECTABLE</span>
	 * <span class="animation">Animation Loop</span>
	 *
	 * Iterates through all marker handlers, calling their corresponding custom `placementFunction` or {@link CIQ.ChartEngine#defaultMarkerPlacement} if none defined.
	 * @memberOf CIQ.ChartEngine.AdvancedInjectable#
	 * @alias positionMarkers
	 */
	CIQ.ChartEngine.prototype.positionMarkers = function () {
		var self = this,
			chart = this.chart;
		if (!self.markerHelper) return;

		function draw() {
			if (self.runPrepend("positionMarkers", arguments)) return;
			self.markerTimeout = null;
			for (var className in self.markerHelper.classMap) {
				for (var panelName in self.markerHelper.classMap[className]) {
					var arr = self.markerHelper.classMap[className][panelName];
					// Eliminate markers that are hidden. Otherwise subsequent markers
					// would be positioned above where the hidden markers would otherwise show.
					arr = arr.filter((marker) => !marker.hidden);

					var panel = self.panels[panelName];
					if (!panel) continue;
					if (arr.length) {
						var params = {
							stx: self,
							arr: arr,
							panel: panel
						};
						params.firstTick = panel.chart.dataSet.length - panel.chart.scroll;
						params.lastTick = params.firstTick + panel.chart.dataSegment.length;

						var fn = arr[0].constructor.placementFunction; // Some magic, this gets the static member "placementFunction" of the class (not the instance)
						if (fn) {
							fn(params);
						} else {
							self.defaultMarkerPlacement(params);
						}
					}
				}
			}
			self.runAppend("positionMarkers", arguments);
		}

		this.markerHelper.placementMap = {};
		this.markerHelper.fieldPanelMap = {};

		if (this.markerDelay || this.markerDelay === 0) {
			if (!this.markerTimeout)
				this.markerTimeout = setTimeout(draw, this.markerDelay);
		} else {
			draw();
		}
		var starting = this.getFirstLastDataRecord(chart.dataSegment, "tick"),
			ending = this.getFirstLastDataRecord(chart.dataSegment, "tick", true);
		if (!starting || !ending) return; // return if dataSegment is full of nulls or undefined values or maybe its just empty

		var markers = this.getMarkerArray("all");
		this.markerHelper.visibleCanvasMarkers = [];
		for (var i = 0; i < markers.length; i++) {
			var marker = markers[i],
				nodeCreator = marker.stxNodeCreator;
			if (starting.tick <= marker.tick && marker.tick <= ending.tick) {
				this.markerHelper.visibleCanvasMarkers.push(marker);
				if (nodeCreator && nodeCreator.drawMarker) {
					nodeCreator.drawMarker(marker);
				}
			} else {
				// if markers are off screen don't draw them
				marker.highlight = false;
				marker.params.box = null;
				if (
					marker.attached &&
					nodeCreator &&
					nodeCreator.expand &&
					!marker.params.pinnedPosition
				) {
					// hide the popup of any perf markers outside the dataSegment
					nodeCreator.expand.style.visibility = "hidden";
				}
			}

			// Hide/Show marker nodes based on the marker's hidden property
			if (marker.node)
				marker.node.style.visibility = marker.hidden ? "hidden" : "";
			if (
				marker.groupExpansionEl &&
				marker.stxNodeCreator &&
				marker.stxNodeCreator.expand
			)
				marker.stxNodeCreator.expand.style.visibility = marker.hidden
					? "hidden"
					: "";

			// Remove any TSE "lollipop" markers when the marker is hidden
			if (marker.chartMarker && marker.hidden) {
				marker.chartMarker.remove();
				marker.chartMarker = null;
			}
		}
	};

	/**
	 * A marker is a DOM object that is managed by the chart.
	 *
	 * Makers are placed in containers which are `div` elements whose placement and size correspond with a panel on the
	 * chart. A container exists for each panel.
	 *
	 * A marker's primary purpose is to provide additional information for a data point on the chart. As such, markers
	 * can be placed by date, tick, or bar to control their position on the x-axis, and by value (price) to control their
	 * position on the y-axis. Additional default positioning is also available, including the ability to create custom
	 * positioning logic. Once the positioning logic is established for markers, they are repositioned as needed when the
	 * user scrolls or zooms the chart.
	 *
	 * Alternatively, a marker can also be placed at an absolute position using CSS positioning, in which case the chart
	 * does not control the marker's positioning.
	 *
	 * The default placement function for any markers is {@link CIQ.ChartEngine#defaultMarkerPlacement}.
	 *
	 * See the {@tutorial Markers} tutorial for additional implementation details and information about managing
	 * performance on deployments requiring a large number of markers.
	 *
	 * @name CIQ.Marker
	 * @param {Object} params Parameters that describe the marker.
	 * @param {CIQ.ChartEngine} params.stx The chart to which the marker is attached.
	 * @param {*} params.x A valid date, tick, or bar (depending on the selected `xPositioner`) used to select a candle to
	 * 					which the marker is associated.
	 * @param {Number} [params.y] A valid value for positioning the marker on the y-axis (depending on selected `yPositioner`).
	 * 					If this value is not provided, the marker is set "above_candle" as long as a valid candle is selected
	 * 					by `params.x`.
	 * @param {HTMLElement|CIQ.Marker.Simple|CIQ.Marker.Performance} [params.node] The HTML element that contains the marker.
	 * 					This element should be detached from the DOM. If an element is not provided, an empty `div` is created.
	 * 					You can create your own or use the provided {@link CIQ.Marker.Simple} and {@link CIQ.Marker.Performance}
	 * 					node creators.
	 * @param {string} [params.panelName="chart"] The name of the panel to which the `node` is attached. Defaults to the main
	 * 					chart panel.
	 * @param {string} [params.xPositioner="date"] Determines the x-axis position of the marker.
	 * Values include:
	 * - "date" &mdash; `params.x` must be set to a JavaScript date object. This will be converted to the closest `masterData`
	 * position if the provided date does not exactly match any existing points. Be sure the same timezone as masterData is used.
	 * - "master" &mdash; `params.x` must be set to a `masterData` position.
	 * - "tick" &mdash; `params.x` must be set to a `dataSet` position.
	 * - "bar" &mdash; `params.x` must be set to a `dataSegment` position.
	 * - "none" &mdash; Use CSS positioning; `params.x` is not used.
	 * @param {Number} [params.candleOffset] Number of candlewidths to offset the marker left or right from its horizontal position.
	 * @param {string} [params.yPositioner="value"] Determines the y-axis position of the marker.
	 * Values include:
	 * - "value" &mdash; `params.y` must be set to an exact y-axis value. If `params.y` is omitted, the y-axis position defaults
	 * to "above_candle".
	 * - "above_candle" &mdash; Positions the marker right above the candle or line. If more than one marker is at the same position,
	 * the markers are aligned upwards from the first. The `params.y` value is not used.
	 * - "below_candle" &mdash; Positions the marker right below the candle or line. If more than one marker is at the same position,
	 * the markers are aligned downwards from the first. The `params.y` value is not used.
	 * - "on_candle" &mdash; Position the marker in the center of the candle or line, covering it. If more than one marker is at the
	 * same position, the markers are aligned downwards from the first. The `params.y` value is not used.
	 * - "top" &mdash; Position the marker at the top of the chart, right below the margin. If more than one marker is at the same
	 * position, the markers are aligned downwards from the first. The `params.y` value is not used.
	 * - "top_lane" &mdash; Same as "top", but each marker type (defined by label) gets its own row, or lane.
	 * - "bottom" &mdash; Position the marker at the bottom of the chart, right above the margin. If more than one marker is at the
	 * same position, the markers are aligned upwards from the first. The `params.y` value is not used.
	 * - "bottom_lane" &mdash; Same as "bottom", but each marker type (defined by label) gets its own row, or lane.
	 * - "none" &mdash; Use CSS positioning; `params.y` is not used.
	 * @param {string} [params.field] When `yPositioner` is set to position relative to a candle, this parameter determined which
	 * field in the dataSet to use for the candle.  Attach a marker to a non-primary series (e.g. a comparison or study) by setting "field" equal that comparison's or study's symbol. When not specified, uses available HLC data.
	 * @param {boolean} [params.permanent=false] The marker stays on the chart even when the chart is re-initialized by a symbol
	 * change, call to `loadChart()` or `initializeChart()`, and so forth.
	 * @param {string} [params.label="generic"] A label for the marker. Multiple markers can be assigned the same label, which
	 * allows them to be deleted simultaneously.
	 * @param {boolean} [params.includeAxis=false] If "true", then the marker can display on the x- or y-axis. Otherwise, it is cropped.
	 * at the axis edge.
	 * @param {Boolean} [params.chartContainer] If true, then the marker is placed directly in the chart container as opposed to in a
	 * container or holder node. When placing the marker directly in the chart container, the z-index setting for the marker should
	 * be set in relation to the z-index of other holders in order to place the marker above or below markers inside the holders.
	 * @param {Boolean} [params.groupable=true] When multiple groupable markers are placed at the same position, they will consolidate
	 * into a single group marker. Default setting is `true`. Set to `false` to stack markers vertically.
	 * @constructor
	 * @since
	 * - 15-07-01
	 * - 05-2016-10 Added the following `params.yPositioner` values: "value", "above_candle",
	 * 		"below_candle", "on_candle", "top", and "bottom".
	 * - 8.6.0 Added `params.xPositioner` options "tick", `params.yPositioner` options "top_lane", and "bottom_lane".
	 * - 9.1.0 Added `params.candleOffset`. Updated `params.field` to accept the symbol of a non-primary series.
	 * - 9.2.0 Added `params.groupable`
	 * @example
	 * new CIQ.Marker({
	 *     stx: stxx,
	 * 	   xPositioner: "date",
	 *     yPositioner: "value",
	 * 	   x: someDate,
	 * 	   y: somePrice,
	 * 	   field: "someSymbol", // Include if you wish to place the marker on a non-primary series.
	 * 	   label: "events",
	 * 	   node: newNode
	 * });
	 */
	CIQ.Marker =
		CIQ.Marker ||
		function (params) {
			const self =
				this instanceof CIQ.Marker ? this : Object.create(CIQ.Marker.prototype);

			const { stx } = params;
			if (!stx) {
				console.log("Marker created without specifying stx");
				return;
			}

			if (!self.className) self.className = "CIQ.Marker";

			self.params = {
				xPositioner: "date",
				yPositioner: params.y || params.y === 0 ? "value" : "above_candle",
				permanent: false,
				label: "generic",
				includeAxis: false
			};
			CIQ.extend(self.params, params);
			if (!self.params.panelName) {
				Object.defineProperty(self.params, "panelName", {
					enumerable: true,
					get: () => {
						const { field } = self.params;
						if (!field) return stx.chart.panel.name;
						let newPanel = stx.markerHelper.fieldPanelMap[field];
						if (!newPanel) {
							newPanel = (stx.getPanelByField(field) || stx.chart.panel).name;
							stx.markerHelper.fieldPanelMap[field] = newPanel;
						}
						if (newPanel !== self.params._panelName) {
							let map = stx.markerHelper.classMap[self.className];
							if (map) {
								map = map[self.params._panelName];
								if (map && map.includes(self)) {
									const { isConnected } = self.node;
									stx.addToMarkerMapping(self);
									if (isConnected || self.attached) stx.addToHolder(self);
								}
							}
							self.params._panelName = newPanel;
						}
						return newPanel;
					},
					set: (value) =>
						(stx.markerHelper.fieldPanelMap[self.params.field] = value)
				});
			}
			if (!self.params.node) {
				self.params.node = document.createElement("DIV");
			}

			// Switcheroo. If a NodeCreator is passed in, then we change the marker
			// to reference the actual DOM node and then we add stxNodeCreator to the
			// marker so that we can reference it if need be
			if (CIQ.derivedFrom(self.params.node, CIQ.Marker.NodeCreator)) {
				self.stxNodeCreator = self.params.node;
				self.node = self.stxNodeCreator.node;
			} else {
				self.node = self.params.node;
			}

			stx.setMarkerTick(self);
			stx.addToMarkerMapping(self);

			const defer = self.stxNodeCreator && self.stxNodeCreator.deferAttach;
			if (!defer) stx.addToHolder(self);

			if (self.stxNodeCreator && self.stxNodeCreator.drawMarker)
				self.stxNodeCreator.drawMarker(self);

			return self;
		};

	/**
	 * Removes the marker from the chart object
	 * @memberOf CIQ.Marker
	 * @since 15-07-01
	 */
	CIQ.Marker.prototype.remove = function () {
		this.params.stx.removeFromHolder(this);
		if (this.stxNodeCreator && this.stxNodeCreator.remove) {
			this.stxNodeCreator.remove(this);
		}
	};

	/**
	 * Called when a marker node is clicked. Checks to see whether the node has its own click
	 * function and, if it does, calls that function, passing all arguments to it.
	 *
	 * @param {object} params Configuration parameters.
	 * @param {number} params.cx The clientX coordinate of the click event.
	 * @param {number} params.cy The clientY coordinate of the click event.
	 * @param {CIQ.ChartEngine.Panel} params.panel Panel where the click took place.
	 *
	 * @memberof CIQ.Marker
	 * @since
	 * - 7.2.0
	 * - 8.0.0 Signature changed to accept the `params` object.
	 */
	CIQ.Marker.prototype.click = function (params) {
		if (this.hidden) return;
		if (typeof arguments[0] === "number") {
			params = { cx: arguments[0], cy: arguments[1], panel: arguments[3] };
		}

		let { cx, cy, panel } = params;
		if (!this.params.stx) return; // some markers don't know the engine. In that scenario do nothing.
		var node = this.params.node;
		if (node.click) node.click({ cx, cy, marker: this, panel });
	};

	/**
	 * Called when a marker node is double-clicked.
	 *
	 * Override this function with your own implementation. Return a truthy value to prevent
	 * {@link CIQ.ChartEngine#doubleClick} from dispatching the "doubleClick" event and invoking
	 * the [doubleClickEventListener]{@link CIQ.ChartEngine~doubleClickEventListener}.
	 *
	 * @param {object} params Configuration parameters.
	 * @param {number} params.cx The clientX coordinate of the double-click event.
	 * @param {number} params.cy The clientY coordinate of the double-click event.
	 * @param {CIQ.ChartEngine.Panel} params.panel Panel where the double-click took place.
	 * @return {boolean} true to indicate the double-click event has been handled; otherwise,
	 * 		false.
	 *
	 * @alias doubleClick
	 * @memberof CIQ.Marker.prototype
	 * @virtual
	 * @since 8.0.0
	 */
	CIQ.Marker.prototype.doubleClick = function ({ cx, cy, panel }) {
		return false;
	};

	/**
	 * Normally the chart will take care of positioning the marker automatically but you can
	 * force a marker to render itself by calling this method. This will cause the marker to
	 * call its placement function. You might want to do this for instance if your marker morphs
	 * or changes position outside of the animation loop.
	 */
	CIQ.Marker.prototype.render = function () {
		var arr = [this];
		var params = {
			stx: this.params.stx,
			arr: arr,
			panel: this.params.stx.panels[this.params.panelName],
			showClass: this.showClass
		};
		this.constructor.placementFunction(params);
	};

	/**
	 * Returns the CIQ.GroupMarker object representing the marker if it is placed in a group.
	 *
	 * @return {CIQ.Marker.Group} Marker representing the group
	 *
	 * @alias getMarkerGroup
	 * @memberof CIQ.Marker.prototype
	 * @since 9.2.0
	 */
	CIQ.Marker.prototype.getMarkerGroup = function () {
		if (!this.groupKey || !this.params.stx.markerHelper.groupMap) return;
		let group = this.params.stx.markerHelper.groupMap[this.groupKey];

		if (group) return group.groupMarker;
	};

	/**
	 * Enables or disables a marker's ability to be dragged to within a specified dropzone.
	 * If the marker is expandable, the draggable portion is limited to that expandable portion.
	 *
	 * This uses the HTML5 Drag and Drop API, which is not well supported on touch devices.  As a result, the markers
	 * may not be able to be dragged using touch gestures.
	 *
	 * @param {HTMLElement|boolean} [dropzone=true] The container which will receive the dragged marker when it is dropped.  Defaults to `true`,
	 * 	which will use the marker's panel for the dropzone.  Setting this parameter to false will disable dragging.
	 *
	 * @alias makeDraggable
	 * @memberof CIQ.Marker.prototype
	 * @since 9.1.0
	 */
	CIQ.Marker.prototype.makeDraggable = function (dropzone) {
		const { stx } = this.params;
		const panel = stx.panels[this.params.panelName];

		if (!dropzone && dropzone !== false) dropzone = true;
		if (dropzone === true) dropzone = panel.subholder;

		let node = this.stxNodeCreator
			? this.stxNodeCreator.expand || this.stxNodeCreator.node
			: this.node;

		// If the marker is in a group, make the group expanion draggable instead.
		if (this.groupExpansionEl) {
			node = this.groupExpansionEl.querySelector(".stx-marker-expand");
		}

		node.draggable = !!dropzone;
		node.removeEventListener("dragstart", this.dragListener);
		if (!dropzone) {
			stx.undoModal(node);
			node.style.cursor = "";
			return;
		}
		stx.makeModal(node);
		node.style.cursor = "grab";
		const dragstartListener = (e) => {
			if (e.target !== node) return;
			CIQ.Marker.beingDragged = {
				marker: this,
				offset: { x: e.offsetX, y: e.offsetY },
				node: e.target,
				dropzone
			};
			node.classList.add("being-dragged");
			stx.draw();
			e.dataTransfer.effectAllowed = "move";
		};
		const dragoverListener = (e) => {
			const { beingDragged } = CIQ.Marker;
			if (!beingDragged) return;
			const { dropzone: dz, marker, offset } = beingDragged;
			if (dz !== dropzone) {
				e.dataTransfer.dropEffect = "none";
				return;
			}
			e.preventDefault();
			const x = stx.backOutX(e.pageX - offset.x);
			const y = stx.backOutY(e.pageY - offset.y);
			const { dragOrigin } = marker;
			marker.dragOrigin = { x, y };
			if (!dragOrigin || dragOrigin.x !== x || dragOrigin.y !== y) stx.draw();
			e.dataTransfer.dropEffect = "move";
		};
		const dragendListener = (e) => {
			const { beingDragged } = CIQ.Marker;
			if (!beingDragged) return;
			const { dropzone: dz, marker, node } = beingDragged;
			if (dz !== dropzone) return;
			node.classList.remove("being-dragged");
			delete marker.dragOrigin;
			if (marker.store) marker.store();
			CIQ.Marker.beingDragged = null;

			// Move node from ciq-expansion-holder to ciq-pinned-holder
			if (node.closest(".ciq-expansion-holder")) {
				// Get the group marker
				const groupMarker = marker.getMarkerGroup();
				// Get the .ciq-pinned-holder element from the group marker
				const pinnedHolder =
					groupMarker.node.querySelector(".ciq-pinned-holder");
				// append node to the pinnedHolder
				pinnedHolder.appendChild(node.parentNode);
			}

			stx.draw();
		};
		const dropListener = (e) => {
			const { beingDragged } = CIQ.Marker;
			if (!beingDragged) return;
			const { dropzone: dz, marker, node } = beingDragged;
			if (dz !== dropzone) return;
			const groupMarker = marker.getMarkerGroup();
			const { field, xPositioner, yPositioner } = marker.params;
			const yAxis =
				marker.params.yAxis || stx.getYAxisByField(panel, field) || panel.yAxis;
			const dims = CIQ.elementDimensions(node, {
				margin: true,
				border: true,
				padding: true
			});

			const newX = stx.backOutX(e.pageX) - beingDragged.offset.x;
			const newY = stx.backOutY(e.pageY) - beingDragged.offset.y;
			const pinnedPosition = {};
			const useNodeDims = node === marker.node || !marker.node.parentElement;
			if (
				xPositioner === "none" ||
				(!xPositioner && marker.params.x === undefined)
			) {
				node.style.left = newX - stx.chart.left + "px";
			} else {
				const markerNodeDims =
					useNodeDims && !groupMarker
						? dims
						: CIQ.elementDimensions((groupMarker || marker).node, {
								margin: true,
								border: true,
								padding: true
						  });
				pinnedPosition.candleOffset =
					(newX +
						((useNodeDims ? 1 : -1) * markerNodeDims.width) / 2 -
						stx.pixelFromTick(marker.tick)) /
					stx.layout.candleWidth;
			}
			if (
				yPositioner === "none" ||
				(!yPositioner && marker.params.y === undefined)
			) {
				node.style.bottom = yAxis.height - newY - dims.height + "px";
			} else {
				pinnedPosition.y = stx.valueFromPixel(
					newY + dims.height / 2,
					panel,
					yAxis
				);
			}
			marker.params.pinnedPosition = pinnedPosition;
		};
		this.dragListener = dragstartListener;
		node.addEventListener("dragstart", dragstartListener);
		if (!dropzone.dropzoneForPinnedMarkers) {
			dropzone.addEventListener("dragover", dragoverListener);
			dropzone.addEventListener("dragend", dragendListener);
			dropzone.addEventListener("drop", dropListener);
			dropzone.dropzoneForPinnedMarkers = true;
		}
	};

	/**
	 * Removes all markers with the specified label from the chart object
	 * @param  {CIQ.ChartEngine} stx The chart object
	 * @param  {string} label The label
	 * @memberOf CIQ.Marker
	 * @since 15-07-01
	 */
	CIQ.Marker.removeByLabel = function (stx, label) {
		var arr = stx.getMarkerArray("label", label);
		for (var i = 0; i < arr.length; i++) {
			var marker = arr[i];
			stx.removeFromHolder(marker);
			if (marker.stxNodeCreator && marker.stxNodeCreator.remove) {
				marker.stxNodeCreator.remove(marker);
			}
		}
		stx.draw();
	};

	/**
	 *
	 * Content positioner for any markers using the 'stx-marker-expand' class. It takes into
	 * consideration the marker's node location within its container and determines where to
	 * place the content so it is all showing regardless if it is to the left, right, top, or bottom of the marker node.
	 * @memberOf CIQ.Marker
	 * @param {HTMLElement} node The HTML element representing the marker which has content.
	 * @param {boolean} [evenIfNotVisible] True to position the marker even if not visible. This makes any transition
	 * 					of the marker appear to be in the correct place. Note that positioning invisible markers
	 * 					will negatively affect performance.
	 * @since
	 * - 5.1.2
	 * - 8.6.0 Added `evenIfNotVisible` parameter.
	 * - 9.2.0 Modified to handle positioning of `CIQ.Marker.Group` markers
	 */
	CIQ.Marker.positionContentVerticalAndHorizontal = function (
		node,
		evenIfNotVisible
	) {
		const content_node = node.querySelector(".stx-marker-expand");
		const group_content_node = node.querySelector(".ciq-expansion-holder");

		const positionVertical = (node, markerNode) => {
			if (!markerNode.parentNode) return;
			let { offsetHeight, style } = node;
			style.bottom = style.top = ""; // reset content to bottom of node

			let computedNodeStyle = getComputedStyle(node);
			let { bottom } = computedNodeStyle;

			let bottomContentInt = parseInt(bottom, 10);
			let topPxOfContent = markerNode.offsetTop;

			// Subtract the difference between the content top and the parent height from the offsetTop
			if (!markerNode.classList.contains("callout"))
				topPxOfContent -=
					bottomContentInt + offsetHeight - markerNode.offsetHeight;

			let offsetMaxHeight = markerNode.parentNode.offsetHeight;

			if (markerNode.offsetTop <= offsetMaxHeight) {
				//node not off the bottom of the chart
				//switch content to top of node if node is off the bottom of the chart or content will not fit to the bottom of the node
				if (topPxOfContent > offsetMaxHeight - offsetHeight) {
					style.top =
						offsetMaxHeight - markerNode.offsetTop - offsetHeight + "px";
					style.bottom = "auto";
				}
			} else {
				style.top = offsetMaxHeight + "px";
			}
			if (markerNode.offsetTop + markerNode.offsetHeight >= 0) {
				//node not off the top of the chart
				//switch content to bottom of node if node is off the top of the chart or content will not fit to the top of the node
				if (topPxOfContent < 0) {
					style.top = -markerNode.offsetTop + "px";
					style.bottom = "auto";
				}
			} else {
				style.bottom = "0px";
			}
		};

		const positionHorizontal = (node, markerNode, altNode) => {
			if (!markerNode.parentNode) return;
			const nodeStyle = node.style;
			nodeStyle.left = nodeStyle.right = ""; // reset content to right of node
			if (altNode) altNode.style.left = altNode.style.right = "";

			const computedNodeStyle = getComputedStyle(node);
			let contentLeft = computedNodeStyle.left;
			let leftPxOfContent = markerNode.offsetLeft + parseInt(contentLeft, 10);
			let rightPxOfGroupContent =
				markerNode.offsetLeft - parseInt(contentLeft, 10);
			let offsetMaxWidth = markerNode.parentNode.offsetWidth;

			//switch content to left of node if node is off the left of the chart or content will not fit to the right of the node
			if (leftPxOfContent + node.offsetWidth > offsetMaxWidth) {
				nodeStyle.right = contentLeft;
				nodeStyle.left = "auto";
				if (altNode)
					altNode.style.right =
						node.offsetWidth + parseInt(contentLeft, 10) + "px";
			} else if (altNode && rightPxOfGroupContent < altNode.offsetWidth) {
				altNode.style.right = "auto";
				altNode.style.left =
					node.offsetWidth + parseInt(contentLeft, 10) + "px";
			} else if (altNode) {
				altNode.style.right = contentLeft;
			}
		};

		// Don't position if content_node is not connected.
		if (!content_node || !content_node.isConnected) return;

		// Always reset content_node to bottom of node
		content_node.style.bottom = content_node.style.top = "";

		// Either content_node or group_content_node are visible
		const contentNodeVisible =
			(node.classList.contains("highlight") &&
				content_node.style.visibility !== "hidden") ||
			(group_content_node && group_content_node.style.visibility !== "hidden");

		if (!contentNodeVisible && !evenIfNotVisible) {
			// Don't position if hidden and you don't want to position hidden markers
			return;
		}

		positionVertical(content_node, node);
		if (group_content_node) {
			// Set max height of the expansion holder to the chart height if available
			if (node.chartHeight)
				group_content_node.style.maxHeight = node.chartHeight - 10 + "px";
			// Refresh the scroller in the expansion holder
			if (group_content_node.__ps) group_content_node.__ps.update();
			positionVertical(group_content_node, node);
		}
		positionHorizontal(content_node, node, group_content_node);

		// Shrink the group menu when the panel is smaller than the 200px max height.
		const containerEl = content_node
			? content_node.closest(".stx-subholder")
			: null;
		if (
			node.classList.contains("group") &&
			containerEl &&
			containerEl.offsetHeight < 200
		) {
			content_node.style.maxHeight = containerEl.offsetHeight - 20 + "px";
		}
	};

	/**
	 * Initializes the scroll behavior of marker expands.
	 *
	 * For proper styling, the perfect scrollbar requires elements to have been mounted on the DOM
	 * prior to initialization. As a result, this function should only be called on mounted nodes.
	 *
	 * @param {HTMLElement} node The marker that contains the expand for which scroll behavior is
	 * 		initialized.
	 *
	 * @memberof CIQ.Marker
	 * @since 8.2.0
	 */
	CIQ.Marker.initializeScrollBehavior = function (node) {
		const { expand } = node;
		if (!expand || expand.scrollInitialized) return;

		if (!expand.querySelector(".marker_content")) {
			const markerContent = document.createElement("div");
			markerContent.className = "marker_content";
			[...expand.children].forEach((child) => markerContent.appendChild(child));
			expand.appendChild(markerContent);
		}

		expand.addEventListener(CIQ.wheelEvent, (e) => e.stopPropagation(), {
			passive: false
		});
		expand.addEventListener("touchmove", (e) => e.stopPropagation(), {
			passive: false
		});
		const { scrollbarStyling } = CIQ.UI || {};
		if (scrollbarStyling) {
			scrollbarStyling.refresh(expand);
		} else {
			expand.style.overflowY = "scroll";
		}
		expand.scrollInitialized = true;
	};

	/**
	 * The above_candle and below_candle y-positioner usually uses the high and low to place the marker. However, some chart renderings will draw the extent of the bar either inside or outside of
	 *  the high/low range. For those chart types, this function will return the actual high/low to be used by the marker placement function. This is only valid when {@link CIQ.Renderer#highLowBars} is true.
	 *
	 * Currently this function handles histogram and point and figure (P&F) chart types. For any other
	 *  chart type, define "markerHigh" and "markerLow" for each bar in the dataSet/dataSegment
	 * and these will be honored and returned.
	 *
	 * **Note:** This function may be used with any markerPlacement function to give the lowest and highest point of the bar.
	 *
	 * @memberOf CIQ.ChartEngine
	 * @param {object} quote The bar's data. This can come from the chart.dataSet.
	 * @param {boolean} [ignoreLayout] If true don't allow chart type to dictate high and low.
	 * @return {object} The high and low for the marker.
	 * @since
	 * - 3.0.0
	 * - 6.2.0 Will consider `Open` and `Close` if `High` and/or `Low` are missing from quote.
	 * - 8.6.0 Added param `ignoreLayout`.
	 */
	CIQ.ChartEngine.prototype.getBarBounds = function (quote, ignoreLayout) {
		var aggregation = this.layout.aggregationType;
		var bounds;
		if (!ignoreLayout && aggregation == "pandf")
			bounds = {
				high: Math.max(quote.pfOpen, quote.pfClose),
				low: Math.min(quote.pfOpen, quote.pfClose)
			};
		else bounds = { high: quote.High, low: quote.Low };
		if (quote.markerHigh) bounds.high = quote.markerHigh;
		if (quote.markerLow) bounds.low = quote.markerLow;

		var O, H, L;
		if (quote.Open === undefined) O = quote.Close;
		if (quote.High === undefined) H = Math.max(quote.Open || O, quote.Close);
		if (quote.Low === undefined) L = Math.min(quote.Open || O, quote.Close);
		if (!bounds.high && bounds.high !== 0) bounds.high = H;
		if (!bounds.low && bounds.low !== 0) bounds.low = L;
		return bounds;
	};

	/**
	 * Placement functions are responsible for positioning markers in their holder according to each marker's settings.
	 * They are called directly form the draw() function in the animation loop.
	 * Each Marker placement handler must have a corresponding `placementFunction` or this method will be used.
	 *
	 * `firstTick` and `lastTick` can be used as a hint as to whether to display a marker or not.
	 *
	 * See {@link CIQ.Marker} and {@tutorial Markers} for more details
	 * @memberOf CIQ.ChartEngine
	 * @param {object} params The parameters
	 * @param {CIQ.ChartEngine} params.stx The chart engine
	 * @param {array} params.arr The array of markers
	 * @param {object} params.panel The panel to display
	 * @param {number} params.firstTick The first tick displayed on the screen
	 * @param {number} params.lastTick The last tick displayed on the screen
	 * @since
	 * - 2015-09-01 On prior versions you must define your own default function. Example: `CIQ.ChartEngine.prototype.defaultMarkerPlacement = yourPlacementFunction;`.
	 */
	CIQ.ChartEngine.prototype.defaultMarkerPlacement = function (params) {
		var panel = params.panel;
		var chart = panel.chart;
		var stx = params.stx;
		var highLowBarMap = {};
		Object.values(stx.chart.series).forEach(function (s) {
			highLowBarMap[s.parameters.symbol] = CIQ.Renderer.produce(
				s.parameters.chartType,
				{}
			).highLowBars;
		});

		for (var i = 0; i < params.arr.length; i++) {
			var marker = params.arr[i],
				mparams = marker.params;
			if (!mparams.pinnedPosition && mparams.box) continue; // do not try to position drawn markers
			var node = marker.node;
			var expand = marker.stxNodeCreator
				? marker.stxNodeCreator.expand
				: node.querySelector(".stx-marker-expand");
			// Getting clientWidth and clientHeight is a very expensive operation
			// so we'll cache the results. Don't use this function if your markers change
			// shape or size dynamically!
			if (!marker.clientWidth) marker.clientWidth = node.clientWidth;
			if (!marker.clientHeight) marker.clientHeight = node.clientHeight;
			var quote = null;

			// X-axis positioning logic

			var xPositioner = mparams.xPositioner,
				yPositioner = mparams.yPositioner,
				pinnedPosition = mparams.pinnedPosition || {},
				expandPosition =
					(expand && mparams.pinnedPosition) || mparams.expandPosition,
				candleOffset =
					(!expand && pinnedPosition.candleOffset) || mparams.candleOffset,
				field = mparams.field,
				yAxis =
					mparams.yAxis || this.getYAxisByField(panel, field) || panel.yAxis,
				tick = marker.tick,
				dataSet = chart.dataSet,
				clientWidth = marker.clientWidth;

			var showsHighs = field ? highLowBarMap[field] : stx.chart.highLowBars;
			var plotField = chart.defaultPlotField;
			if (!plotField || showsHighs) plotField = "Close";

			if (xPositioner != "none") {
				if (xPositioner == "bar" && mparams.x) {
					if (mparams.x < chart.xaxis.length) {
						var xaxis = chart.xaxis[mparams.x];
						if (xaxis) quote = xaxis.data;
					}
					CIQ.efficientDOMUpdate(
						node.style,
						"left",
						Math.round(stx.pixelFromBar(mparams.x, chart) - clientWidth / 2) +
							1 +
							"px"
					);
				} else {
					// This is a section of code to hide markers if they are off screen, and also to figure out
					// the position of markers "just in time"
					// the tick is conditionally pre-set by CIQ.ChartEngine.prototype.setMarkerTick depending on marker.params.xPositioner
					if (!tick && tick !== 0) {
						// if tick is not defined then hide, probably in distant past
						if (mparams.future && chart.scroll < chart.maxTicks) {
							// In future
							stx.futureTickIfDisplayed(marker); // Just in time check for tick
							tick = marker.tick; //copy new tick from prior function
							if (!tick && tick !== 0) {
								node.style.left = "-1000px";
								continue;
							}
						} else {
							node.style.left = "-1000px";
							continue;
						}
					}
					if (tick < dataSet.length) quote = dataSet[tick];
					var leftpx = Math.round(
						stx.pixelFromTick(tick, chart) - chart.left - clientWidth / 2
					);
					CIQ.efficientDOMUpdate(node.style, "left", leftpx + "px");
					marker.leftpx = leftpx;
					var rightpx = leftpx + clientWidth;
					var leftBuf = 50,
						rightBuf = 50;
					if (
						expand &&
						!expand.style.visibility &&
						node.classList.contains("highlight")
					) {
						// expand node is showing, include its dimensions in left/right computations
						var rect = expand.getBoundingClientRect();
						leftpx = Math.min(leftpx, rect.left);
						rightpx = Math.max(rightpx, rect.right);
						if (expandPosition) {
							var buf =
								(expandPosition.candleOffset || 0) * this.layout.candleWidth;
							if (expandPosition.candleOffset < 0) rightBuf = -buf;
							else rightBuf = buf;
						}
					}
					if (leftpx > chart.right + rightBuf || rightpx < chart.left - leftBuf)
						continue; // off screen, no need to reposition the marker (accounting 50px for any visual effects)
				}
				if (!quote) quote = dataSet[dataSet.length - 1]; // Future ticks based off the value of the current quote
			} else if (yPositioner.indexOf("candle") > -1) {
				// candle positioning, find the quote
				var left = getComputedStyle(node).left;
				if (left) {
					var bar = stx.barFromPixel(parseInt(left, 10), chart);
					if (bar >= 0) {
						quote = chart.xaxis[bar].data;
						if (!quote) quote = dataSet[dataSet.length - 1]; // Future ticks based off the value of the current quote
					}
				}
			}
			var candleOffsets = [candleOffset, (expandPosition || {}).candleOffset];
			for (var j = 0; j < candleOffsets.length; j++) {
				var o = candleOffsets[j];
				if (o || o === 0)
					CIQ.efficientDOMUpdate(
						(j ? expand : node).style,
						"left",
						(node.isConnected
							? CIQ.stripPX(getComputedStyle(node)[j ? "width" : "left"])
							: stx.pixelFromTick(tick) - (expand || node).offsetWidth / 2) +
							o * this.layout.candleWidth +
							"px"
					);
			}
			// don't use top positioning with DOM markers
			CIQ.efficientDOMUpdate(node.style, "top", "auto");
			// Y axis positioning logic
			var y = (!expand && pinnedPosition.y) || mparams.y,
				clientHeight = marker.clientHeight,
				val;
			var bottomAdjust = 0;
			if (yPositioner != "none") {
				var lane = yPositioner.indexOf("_lane") > -1;
				var placementMap = stx.markerHelper.placementMap;
				var keyBase = yPositioner + "|" + panel.name + "|" + field;
				if (lane && placementMap[keyBase] === undefined)
					placementMap[keyBase] = 2;
				var placementKey = keyBase + "-" + (lane ? marker.params.label : tick);
				var height = mparams.chartContainer ? stx.height : yAxis.bottom;
				var bottom = 0;
				if (placementMap[placementKey] === undefined) {
					placementMap[placementKey] = lane ? placementMap[keyBase] : 0;
					if (lane) placementMap[keyBase] += clientHeight + 2;
				}
				// bottomAdjust offsets the y position
				bottomAdjust = placementMap[placementKey];
				// Increment the placement map for the next marker that might come up
				if (!lane) placementMap[placementKey] += clientHeight;

				var getPixel = stx.pixelFromPrice.bind(stx);
				var useValue = yPositioner == "value" && (y || y === 0);
				if (
					!useValue &&
					yAxis === stx.chart.yAxis &&
					quote.transform &&
					field in quote.transform
				) {
					quote = quote.transform;
					getPixel = stx.pixelFromTransformedValue.bind(stx);
				}
				if (quote && field) quote = quote[field];
				if (typeof quote === "number") {
					quote = { Close: quote };
					quote[plotField] = quote.Close;
					showsHighs = false;
				}

				if (useValue) {
					bottom =
						Math.round(height - getPixel(y, panel, yAxis) - clientHeight / 2) +
						"px";
				} else if (
					(yPositioner == "below_candle" || yPositioner == "under_candle") &&
					quote
				) {
					// under_candle deprecated
					val = quote[plotField];
					if (showsHighs)
						val = stx.getBarBounds(quote, !!field)[
							yAxis.flipped ? "high" : "low"
						];
					bottom =
						Math.round(
							height - getPixel(val, panel, yAxis) - clientHeight - bottomAdjust
						) + "px";
				} else if (yPositioner == "on_candle" && quote) {
					val = quote[plotField];
					if (showsHighs) {
						val = stx.getBarBounds(quote, !!field);
						val = (val.high + val.low) / 2;
					}
					bottom =
						Math.round(
							height -
								getPixel(val, panel, yAxis) -
								clientHeight / 2 -
								bottomAdjust
						) + "px";
				} else if (yPositioner == "top" || yPositioner == "top_lane") {
					bottom =
						Math.round(height - clientHeight - bottomAdjust - panel.top) + "px";
				} else if (yPositioner == "bottom" || yPositioner == "bottom_lane") {
					bottom = Math.round(bottomAdjust) + "px";
				} else if (quote) {
					//above_candle
					val = quote[plotField];
					if (showsHighs)
						val = stx.getBarBounds(quote, !!field)[
							yAxis.flipped ? "low" : "high"
						];
					bottom =
						(Math.round(height - getPixel(val, panel, yAxis) + bottomAdjust) ||
							0) + "px";
				}
				CIQ.efficientDOMUpdate(node.style, "bottom", bottom);

				if (expandPosition && (expandPosition.y || expandPosition.y === 0)) {
					var expandBottom =
						Math.round(
							height -
								stx.pixelFromPrice(expandPosition.y, panel, yAxis) -
								expand.clientHeight / 2 -
								(node.isConnected ? CIQ.stripPX(node.style.bottom) : 0)
						) + "px";
					CIQ.efficientDOMUpdate(expand.style, "top", "auto");
					CIQ.efficientDOMUpdate(expand.style, "bottom", expandBottom);
				} else {
					CIQ.Marker.positionContentVerticalAndHorizontal(node);
				}
			}
			if (marker.position) marker.position();
		}
	};

	/**
	 * Base class to create an empty marker node that can then be styled. Used by {@link CIQ.Marker.Simple} and {@link CIQ.Marker.Performance}.
	 *  It is strongly recommended that you extend this class if you're building your own marker class.
	 * See {@tutorial Markers} tutorials for additional implementation instructions.
	 * @name CIQ.Marker.NodeCreator
	 * @constructor
	 */
	CIQ.Marker.NodeCreator = function () {};

	CIQ.Marker.NodeCreator.toNode = function () {
		return this.node;
	};

	/**
	 * Creates simple HTML nodes that can be used with a {@link CIQ.Marker}
	 *
	 * See {@tutorial Markers} tutorials for additional implementation instructions.
	 * @name CIQ.Marker.Simple
	 * @constructor
	 * @param {Object} params Parameters to describe the marker
	 * @param {string} params.type The marker type to be drawn.
	 * <br>Available options are:
	 * - "circle"
	 * - "square"
	 * - "callout"
	 * @param {string} params.headline The headline text to pop-up when clicked.
	 * @param {string} [params.category] The category class to add to your marker.
	 * <br>Available options are:
	 * - "news"
	 * - "earningsUp"
	 * - "earningsDown"
	 * - "dividend"
	 * - "filing"
	 * - "split"
	 * @param {string} [params.story] The story to pop-up when clicked.
	 * @param {boolean} [params.pinnable] Allow marker to be "pinned". Requires **js/extras/pinnedMarkers.js,** which is part of the ChartIQ Extras Package. This flag is false by default. See {@link CIQ.Marker.prototype.makePinnable} for instructions on using this flag.
	 * @param {string} [params.id] Required when `params.pinnable` is set to `true`. A unique identifier for the marker. This allows the pinned marker position to persist over a browser refresh.
	 * @since
	 * - 9.1.0 Added `pinnable` parameter, which makes all new markers pinnable. This feature requires **js/extras/pinnedMarkers.js,** which is part of the ChartIQ Extras Package.
	 *
	 * @example
	 * 	var datum = {
	 *		type: "circle",
	 *		headline: "This is a Marker for a Split",
	 *		category: "split",
	 *		story: "This is the story of a split"
	 * };
	 *
	 * 	var mparams = {
	 * 		stx: stxx,
	 * 		label: "Sample Events",
	 * 		xPositioner: "date",
	 * 		x: aDate,
	 *		pinnable: true, //Requires ChartIQ Extras Package
	 * 		node: new CIQ.Marker.Simple(datum)
	 * 	};
	 *
	 * 	var marker = new CIQ.Marker(mparams);
	 */
	CIQ.Marker.Simple = function (params) {
		const node = (this.node = document.createElement("div"));
		node.params = params;
		node.className = "stx-marker";
		node.classList.add(params.type);
		if (params.category) node.classList.add(params.category);
		const visual = CIQ.newChild(node, "div", "stx-visual");
		CIQ.newChild(node, "div", "stx-stem");
		CIQ.ensureDefaults(node.params, {
			pinnable: this.pinnable
		});
		let expand;
		if (params.type == "callout") {
			node.params.pinnable = false;
			expand = document.createElement("div");
			expand.classList.add("stx-marker-expand");
			visual.appendChild(expand);
			const content = CIQ.newChild(expand, "div", "stx-marker-content");
			CIQ.newChild(content, "h4", null, params.headline);
			let pw = CIQ.newChild(content, "div");
			pw.classList.add("pwrap");
			CIQ.newChild(pw, "p", null, params.story);
		} else {
			expand = CIQ.newChild(node, "div", "stx-marker-expand");
			CIQ.newChild(expand, "h4", null, params.headline);
			CIQ.newChild(expand, "p", null, params.story);
			if (!node.params.pinnable)
				CIQ.safeClickTouch(expand, () => {
					this.remove({ node });
				});
		}

		CIQ.safeClickTouch(visual, () => this.click({ marker: { node } }));
		this.nodeType = "Simple";
		this.expand = expand;
	};

	CIQ.inheritsFrom(CIQ.Marker.Simple, CIQ.Marker.NodeCreator, false);

	/**
	 * Click event handler for simple markers when they are clicked.
	 * Adds or removes the marker's pop-up expansion `div` to the chart, depending on whether it has already been activated.
	 *
	 * @param {object} params Configuration parameters.
	 * @param {number} params.cx Client x-coordinate of click.
	 * @param {number} params.cy Client y-coordinate of click.
	 * @param {CIQ.Marker} params.marker Marker that was clicked.
	 * @param {CIQ.ChartEngine.Panel} params.panel Panel where the click occurred.
	 *
	 * @alias click
	 * @memberof CIQ.Marker.Simple#
	 * @since 9.1.0
	 */
	CIQ.Marker.Simple.prototype.click = function (params) {
		const { node } = params.marker;
		node.classList.toggle("highlight");
		// Delay resetting the scroll position to allow transition animations to complete
		let intervalGuard = 0;
		const i = setInterval(() => {
			CIQ.Marker.positionContentVerticalAndHorizontal(node, true);
			intervalGuard++;
			// Prevent the interval from going longer than 500ms
			if (intervalGuard > 50) clearInterval(i);
		}, 10);
		node.addEventListener("transitionend", () => {
			const scroller = node.querySelector(".ps");
			if (scroller && CIQ.UI.scrollbarStyling)
				CIQ.UI.scrollbarStyling.refresh(scroller);
			clearInterval(i);
		});
	};

	/**
	 * Hides a marker's expanded text.
	 *
	 * @param {CIQ.Marker} marker The marker to which this node belongs.
	 *
	 * @alias remove
	 * @memberof CIQ.Marker.Simple#
	 * @since 9.1.0
	 */
	CIQ.Marker.Simple.prototype.remove = function (marker) {
		marker.node.classList.remove("highlight");
	};

	/**
	 * Creates a marker group. Markers within the group are determined automatically based on positioning
	 *
	 * @param {object} params Configuration parameters.
	 * @param {CIQ.ChartEngine} params.stx The chart engine.
	 * @param {string} [params.groupKey] The shared groupKey value for markers associated with this group
	 * @param {*} params.x A valid date, tick, or bar (depending on the selected `xPositioner`) used to select a candle to
	 * 					which the marker is associated.
	 * @param {Number} [params.y] A valid value for positioning the marker on the y-axis (depending on selected `yPositioner`).
	 * 					If this value is not provided, the marker is set "above_candle" as long as a valid candle is selected
	 * 					by `params.x`.
	 * @param {HTMLElement|CIQ.Marker.Simple|CIQ.Marker.Performance} [params.node] The HTML element that contains the marker.
	 * 					This element should be detached from the DOM. If an element is not provided, an empty `div` is created.
	 * 					You can create your own or use the provided {@link CIQ.Marker.Simple} and {@link CIQ.Marker.Performance}
	 * 					node creators.
	 * @param {string} [params.panelName="chart"] The name of the panel to which the `node` is attached. Defaults to the main
	 * 					chart panel.
	 * @param {string} [params.xPositioner="date"] Determines the x-axis position of the marker.
	 * Values include:
	 * - "date" &mdash; `params.x` must be set to a JavaScript date object. This will be converted to the closest `masterData`
	 * position if the provided date does not exactly match any existing points. Be sure the same timezone as masterData is used.
	 * - "master" &mdash; `params.x` must be set to a `masterData` position.
	 * - "tick" &mdash; `params.x` must be set to a `dataSet` position.
	 * - "bar" &mdash; `params.x` must be set to a `dataSegment` position.
	 * - "none" &mdash; Use CSS positioning; `params.x` is not used.
	 * @param {string} [params.yPositioner="value"] Determines the y-axis position of the marker.
	 * Values include:
	 * - "value" &mdash; `params.y` must be set to an exact y-axis value. If `params.y` is omitted, the y-axis position defaults
	 * to "above_candle".
	 * - "above_candle" &mdash; Positions the marker right above the candle or line. If more than one marker is at the same position,
	 * the markers are aligned upwards from the first. The `params.y` value is not used.
	 * - "below_candle" &mdash; Positions the marker right below the candle or line. If more than one marker is at the same position,
	 * the markers are aligned downwards from the first. The `params.y` value is not used.
	 * - "on_candle" &mdash; Position the marker in the center of the candle or line, covering it. If more than one marker is at the
	 * same position, the markers are aligned downwards from the first. The `params.y` value is not used.
	 * - "top" &mdash; Position the marker at the top of the chart, right below the margin. If more than one marker is at the same
	 * position, the markers are aligned downwards from the first. The `params.y` value is not used.
	 * - "top_lane" &mdash; Same as "top", but each marker type (defined by label) gets its own row, or lane.
	 * - "bottom" &mdash; Position the marker at the bottom of the chart, right above the margin. If more than one marker is at the
	 * same position, the markers are aligned upwards from the first. The `params.y` value is not used.
	 * - "bottom_lane" &mdash; Same as "bottom", but each marker type (defined by label) gets its own row, or lane.
	 * - "none" &mdash; Use CSS positioning; `params.y` is not used.
	 * @param {string} [params.field] When `yPositioner` is set to position relative to a candle, this parameter determined which
	 * field in the dataSet to use for the candle.  When not specified, uses available HLC data.
	 * @param {string} [params.noInteraction] Set to `true` to disable the marker's default click handler.
	 *
	 * @name CIQ.Marker.Group
	 * @constructor
	 * @since
	 * - 9.2.0
	 * - 9.3.0 Add `noInteraction` parameter.
	 */
	CIQ.Marker.Group = function (params) {
		this.stx = params.stx;
		this.className = "CIQ.Marker.Group";
		this.groupKey = params.groupKey;

		CIQ.Marker.call(this, {
			...params,
			label: "group",
			node: this.createNode({
				stx: this.stx,
				groupMap: this.stx.markerHelper.groupMap[this.groupKey],
				type: "circle",
				category: "group",
				displayLabel: "#",
				displayCategory: false,
				displayStem: params.displayStem,
				noInteraction: params.noInteraction,
				panelName: params.panelName,
				color: "#003399"
			})
		});
	};

	CIQ.inheritsFrom(CIQ.Marker.Group, CIQ.Marker, false);

	/**
	 * Returns the CIQ.GroupMarker object representing the marker if it is placed in a group.
	 *
	 * @return {CIQ.Marker[]} Array of `CIQ.Marker` objects associated with this group
	 *
	 * @alias getMarkersInGroup
	 * @memberof CIQ.Marker.Group.prototype
	 * @since 9.2.0
	 */
	CIQ.Marker.Group.prototype.getMarkersInGroup = function () {
		const group = this.stx.markerHelper.groupMap[this.groupKey] || {};
		return group.markers || [];
	};

	/**
	 * Creates a CIQ.Marker.GroupNode object for use as the node of a group marker.
	 *
	 * @param {Object} params Parameters to describe the marker
	 *
	 * @alias createNode
	 * @memberof CIQ.Marker.Group.prototype
	 * @since 9.2.0
	 */
	CIQ.Marker.Group.prototype.createNode = function (params) {
		return new CIQ.Marker.GroupNode(params);
	};

	/**
	 * Removes the group marker from the chart object and resets
	 * the active state of all markers in group.
	 *
	 * @alias remove
	 * @memberof CIQ.Marker.Group.prototype
	 * @since 9.3.0
	 */
	CIQ.Marker.Group.prototype.remove = function () {
		this.getMarkersInGroup().forEach((marker) => {
			marker.groupExpansionEl = null;
		});
		CIQ.Marker.prototype.remove.call(this);
	};

	/**
	 * Creates an HTML marker node used by {@link CIQ.Marker.Group}
	 *
	 * @name CIQ.Marker.GroupNode
	 * @constructor
	 * @param {Object} params Parameters to describe the marker
	 * @param {Object} params.groupMap Reference to the stxx.markerHelper.groupMap property associate with marker group.
	 * @param {boolean} [params.displayStem=true] Set to false to draw the marker at a specific point and not include the stem.
	 * @param {string} params.type The marker type to be drawn.
	 * <br>Available options are:
	 * - "circle"
	 * - "square"
	 * @since
	 * - 9.2.0
	 */
	CIQ.Marker.GroupNode = function (params) {
		const node = (this.node = document.createElement("div"));
		node.params = params;
		node.className = "stx-marker";
		node.classList.add(params.type);
		node.classList.add("group");
		const visual = CIQ.newChild(node, "div", "stx-visual");
		if (params.displayStem) CIQ.newChild(node, "div", "stx-stem");

		const expand = CIQ.newChild(node, "div", "stx-marker-expand");
		const markerListEl = CIQ.newChild(expand, "ul", "ciq-marker-list");
		// Prevent mouse events from bubbling up to the chart and triggering a tooltip on the underlying series
		params.stx.makeModal(node);
		CIQ.safeClickTouch(expand, function (e) {
			node.classList.toggle("highlight");
		});

		CIQ.safeClickTouch(visual, this.handleClick.bind(this));
		this.expansionHolder = CIQ.newChild(node, "div", "ciq-expansion-holder");
		this.pinnedExpansionHolder = CIQ.newChild(node, "div", "ciq-pinned-holder");
		this.nodeType = "Group";
		this.visual = visual;
		this.expand = expand;
		this.groupMap = params.groupMap;
		this.noInteraction = params.noInteraction;
		this.stx = params.stx;
	};

	CIQ.inheritsFrom(CIQ.Marker.GroupNode, CIQ.Marker.NodeCreator, false);

	/**
	 * Toggles "highlight" state of marker
	 *
	 * @param {Event} e Marker interaction event handler
	 *
	 * @alias handleClick
	 * @memberof CIQ.Marker.GroupNode.prototype
	 * @since 9.2.0
	 */
	CIQ.Marker.GroupNode.prototype.handleClick = function (e) {
		if (this.noInteraction) return;
		const { node } = this;

		this.updateMarkerList();

		node.classList.toggle("highlight");
		CIQ.Marker.positionContentVerticalAndHorizontal(node, true);
	};

	/**
	 * Updates the marker label and color. Label represents the number of individual markers in the
	 * group. Color represents the the first color, or most frequent color, of markers in the group.
	 *
	 * @alias updateVisual
	 * @memberof CIQ.Marker.GroupNode.prototype
	 * @since 9.2.0
	 */
	CIQ.Marker.GroupNode.prototype.updateVisual = function () {
		const { markers } = this.groupMap;

		let backgroundColor = this.getGroupMarkerBackgroundColor();

		// Set the group color
		this.visual.style.backgroundColor = backgroundColor;
		this.visual.style.color = CIQ.chooseForegroundColor(backgroundColor);

		// Small size isn't used until all markers are able to follow this convention
		// JS and CSS for this feature left in for future use.
		// if (stx.layout.candleWidth < 20) this.node.classList.add("small");
		// else this.node.classList.remove("small");

		// Set the group marker count label
		this.visual.innerHTML = markers.length;

		// Update pinned marker states
		if (!this.stx.pinnedMarkers || !this.stx.pinnedMarkers.list) return;
		// Auto-expand pinned markers
		this.stx.pinnedMarkers.list.forEach((pinnedItem) => {
			const { marker } = pinnedItem;
			if (marker.groupKey !== this.groupMap.groupKey) return;
			// If the marker is recreated, e.g. due to periodicity change, the expansion will bbe removed from the DOM.
			// Clean up any references to the removed expansion.
			if (marker.groupExpansionEl && !marker.groupExpansionEl.isConnected)
				marker.groupExpansionEl = null;
			// If the marker is pinned, expand the marker.
			if (!marker.groupExpansionEl) {
				this.handleMenuClick(marker);
				this.node.classList.remove("highlight");
			}
		});
	};

	/**
	 * Returns background color choice for the group marker. Default function
	 * returns the most commonly occurring color amongst the grouped markers or,
	 * the first color if all colors occur equally. Overload to apply custom
	 * group marker color choice.
	 *
	 * @return {string} A valid css color value.
	 *
	 * @alias getGroupMarkerBackgroundColor
	 * @memberof CIQ.Marker.GroupNode.prototype
	 * @since 9.3.0
	 *
	 * @example
	 * function () {
	 *  // Default to a neutral grey.
	 *	let backgroundColor = "#828382";
	 *
	 *	// Get the color of the first marker in the group.
	 *	let firstMarker = this.groupMap.markers.sort(this.markerSortFunction)[0];
	 *	let visual = firstMarker.node.querySelector(".stx-visual");
	 *	if(visual) backgroundColor = getComputedStyle(visual).backgroundColor;
	 *
	 *	return backgroundColor;
	 * };
	 */
	CIQ.Marker.GroupNode.prototype.getGroupMarkerBackgroundColor = function () {
		const { stx, groupMap } = this;
		// Get the dominant color amongst the grouped markers to color the group marker
		let backgroundColor = "";
		let colorList = {};
		groupMap.markers.sort(this.markerSortFunction).forEach((marker) => {
			let markerStyle = {};
			const { type, category, color } = marker.stxNodeCreator.node.params;
			// Check for a performance marker color.
			// `CIQ.Marker.Performance` is not available in standard package.
			if (
				marker.stxNodeCreator instanceof
				(CIQ.Marker.Performance || function () {})
			) {
				const styleName = "stx_marker_" + type + "_" + category;
				if (!stx.styles[styleName])
					CIQ.Marker.Performance.calculateMarkerStyles(stx, marker, styleName);
				markerStyle = stx.styles[styleName];
			} else {
				let visual = marker.node.querySelector(".stx-visual");
				if (visual) markerStyle = getComputedStyle(visual);
			}
			// Use color override when applicable, otherwise use the element background color
			// and, if all else fails, use a neutral grey.
			let backgroundColor = color || markerStyle.backgroundColor || "#828382";

			colorList[backgroundColor] = ++colorList[backgroundColor] || 1;
		});

		const colorValues = Object.values(colorList);
		const max = Math.max.apply(Math, colorValues);
		for (let key in colorList) {
			if (colorList[key] === max) {
				backgroundColor = key;
				break;
			}
		}

		return backgroundColor;
	};

	/**
	 * Sort function used when sorting the grouped markers array. Default function
	 * sorts markers chronologically from newest to oldest. Overload to implement
	 * a custom sort in the grouped markers list.
	 *
	 * @param {CIQ.Marker} a The first element for comparison.
	 * @param {CIQ.Marker} b The second element for comparison.
	 *
	 * @return {number} A negative value indicates that a should come before b. A positive value indicates that a should come after b. Zero or NaN indicates that a and b are considered equal.
	 *
	 * @alias markerSortFunction
	 * @memberof CIQ.Marker.GroupNode.prototype
	 * @since 9.3.0
	 *
	 * @example
	 * function (a, b) {
	 *	if (a.params.x instanceof Date && b.params.x instanceof Date)
	 *		return b.params.x - a.params.x;
	 * }
	 */
	CIQ.Marker.GroupNode.prototype.markerSortFunction = function (a, b) {
		if (a.params.x instanceof Date && b.params.x instanceof Date)
			return b.params.x - a.params.x;
	};

	/**
	 * Updates the listing of grouped markers in the expansion. Called when a group marker is clicked.
	 *
	 * @alias updateMarkerList
	 * @memberof CIQ.Marker.GroupNode.prototype
	 * @since 9.2.0
	 */
	CIQ.Marker.GroupNode.prototype.updateMarkerList = function () {
		const { stx } = this;
		const { markers } = this.groupMap;
		const markerListEl = this.expand.querySelector(".ciq-marker-list");
		if (!markerListEl) return;
		markerListEl.innerHTML = "";

		markers.sort(this.markerSortFunction).forEach((marker) => {
			const { datum } = marker.params;
			const { headline, story, type, category, color, displayLabel } =
				marker.stxNodeCreator.node.params;
			let typeClass = type || "";
			let catClass = category || "";
			let visualContent = "";
			if (displayLabel) visualContent = stx.emojify(displayLabel);
			if (datum && datum.img) visualContent = datum.img.outerHTML;
			// Get the marker background color
			let markerStyle = {};
			// `CIQ.Marker.Performance` is not available in standard package.
			if (
				marker.stxNodeCreator instanceof
				(CIQ.Marker.Performance || function () {})
			) {
				const styleName = "stx_marker_" + type + "_" + category;
				if (!stx.styles[styleName])
					CIQ.Marker.Performance.calculateMarkerStyles(stx, marker, styleName);
				markerStyle = stx.styles[styleName];
			} else {
				let visual = marker.node.querySelector(".stx-visual");
				if (visual) markerStyle = getComputedStyle(visual);
			}
			// Use color override when applicable, otherwise use the element background color
			// and, if all else fails, use a neutral grey.
			let backgroundColor = color || markerStyle.backgroundColor || "#828382";
			// No background color for a text marker
			if (type == "text" || (datum && datum.img))
				backgroundColor = "transparent";

			let dt = this.getDateLabel(marker);
			dt += dt ? "<br>" : "";

			const markerEl = document.createElement("li");
			if (story && story.length)
				markerEl.title =
					story.length > 160 ? story.slice(0, 160) + "..." : story;
			markerEl.innerHTML = `
					<div class="stx-marker ${typeClass}">
						<div class="stx-visual" style="background-color: ${backgroundColor};">
							${visualContent}
						</div>
					</div> 
					${dt}
					<span class="ciq-headline">${headline}</span>
				`;
			// Check for marker.groupExpansionEl existing within the context. This reference can become
			// orphaned when the group node changes abruptly (e.g. periodicity change).
			if (
				marker.groupExpansionEl &&
				stx.uiContext.topNode.contains(marker.groupExpansionEl)
			) {
				markerEl.className = "active";
			} else {
				marker.groupExpansionEl = null;
			}
			marker.groupListEl = markerEl;

			CIQ.safeClickTouch(markerEl, this.handleMenuClick.bind(this, marker));

			markerListEl.appendChild(markerEl);
		});
	};

	/**
	 * Returns the display label for a grouped marker x position.  Returns an empty
	 * string if marker x parameter is not a valid date object or tick position.
	 *
	 * @param {CIQ.Marker} marker The marker within the group with x positioner to display
	 * @return {string} Formatted date string.
	 *
	 * @alias getDateLabel
	 * @memberof CIQ.Marker.GroupNode.prototype
	 * @since 9.3.0
	 */
	CIQ.Marker.GroupNode.prototype.getDateLabel = function (marker) {
		const { stx } = this;
		const { xPositioner, x } = marker.params;
		if (!x || isNaN(x)) return "";

		// Convert a merker tick value to a date
		let markerDate =
			xPositioner == "tick" ? stx.dateFromTick(x, stx.chart, true) : x;

		// Check for a valid date object and format as string
		let formattedDate =
			Object.prototype.toString.call(markerDate) === "[object Date]"
				? CIQ.dateToStr(markerDate, "YYYY/MM/dd hh:mm:ss")
				: "";
		return formattedDate;
	};

	/**
	 * Displays a marker expansion for the group marker.  If the expansion is already displayed, it is removed.
	 *
	 * @param {CIQ.Marker} marker The marker to display or hide the expansion.
	 * @param {Event} e Marker interaction event handler
	 *
	 * @alias handleMenuClick
	 * @memberof CIQ.Marker.GroupNode.prototype
	 * @since 9.3.0
	 */
	CIQ.Marker.GroupNode.prototype.handleMenuClick = function (marker, e) {
		if (marker.groupExpansionEl) {
			if (marker.dismissClickFn) {
				marker.dismissClickFn.call(marker);
			}
			marker.groupExpansionEl.remove();
			marker.groupExpansionEl = null;
			this.setExpansionHolderVisibility();
		} else {
			let content = "";
			const { expand, node } = marker.stxNodeCreator || {};
			if (expand) {
				let contentElement = expand.querySelector(".marker_content");
				content = contentElement ? contentElement.innerHTML : expand.innerHTML;
			} else if (node.params && node.params.story) {
				content = `
					<h4>${node.params.headline}</h4>
					<p>${node.params.story}</p>
				`;
			}
			if (!content) return;

			// Place pinnable markers outside of the scrolling container
			const { pinnedPosition } = marker.params;
			let expansionHolder =
				pinnedPosition && pinnedPosition.y !== undefined
					? this.pinnedExpansionHolder
					: this.expansionHolder;

			const newExpansion = CIQ.newChild(
				expansionHolder,
				"div",
				"stx-marker " + (node.params.category || "")
			);
			newExpansion.innerHTML = `
				<div class="stx-marker-expand">
				${content}
				</div>
			`;
			CIQ.safeClickTouch(newExpansion, () => {
				if (marker.dismissClickFn) {
					marker.dismissClickFn.call(marker);
				}
				newExpansion.remove();
				marker.groupExpansionEl = null;
				this.setExpansionHolderVisibility();
				this.node.classList.remove("highlight");
			});

			marker.groupExpansionEl = newExpansion;
			// Show the expansion holder
			this.setExpansionHolderVisibility();
			// Set the list item as active. groupListEl may be undefined when restoring a pinned state.
			if (marker.groupListEl) marker.groupListEl.classList.add("active");

			const isTse =
				CIQ.Marker.TimeSpanEvent && marker instanceof CIQ.Marker.TimeSpanEvent;
			if (marker.makePinnable && marker.makeDraggable && !isTse) {
				if (!marker.store) marker.makePinnable();
				marker.node.classList.add("highlight");
				// Make the marker draggable
				marker.makeDraggable();
			}

			CIQ.Marker.initializeScrollBehavior({
				expand: newExpansion.querySelector(".stx-marker-expand")
			});
		}
		if (!this.noInteraction) this.node.classList.toggle("highlight");
	};

	/**
	 * Set visibility style of the group expansion holder based on whether it is empty or not
	 *
	 * @alias setExpansionHolderVisibility
	 * @memberof CIQ.Marker.GroupNode.prototype
	 * @since 9.2.0
	 */
	CIQ.Marker.GroupNode.prototype.setExpansionHolderVisibility = function () {
		const { markers } = this.groupMap;

		// Hide the expansion holder if there are no expanded markers
		if (!markers.find((marker) => !!marker.groupExpansionEl)) {
			this.expansionHolder.style.visibility = "hidden";
		} else this.expansionHolder.style.visibility = "visible";
	};
}

};
__js_standard_markers_(typeof window !== "undefined" ? window : global);
