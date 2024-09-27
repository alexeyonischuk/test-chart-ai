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


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : {}.CIQ;

if (!CIQ.Marker) {
	console.error(
		"highPerformanceMarkers feature requires first activating markers feature."
	);
} else if (!CIQ.Marker.Performance) {
	/**
	 * <span class="animation">Animation Loop</span>
	 *
	 * Iterates through all [high performance canvas]{@link CIQ.Marker.Performance} markers and draws them on the canvas.
	 *
	 * See {@tutorial Markers} tutorials for additional implementation instructions.
	 *
	 * @memberOf CIQ.ChartEngine
	 * @since
	 * - 7.1.0
	 * - 7.2.0 Scheduled for deprecation in a future release. See {@link CIQ.Marker.Performance.drawMarkers} instead.
	 */
	CIQ.ChartEngine.prototype.drawMarkers = function () {
		console.warn(
			"CIQ.ChartEngine#drawMarkers is scheduled for deprecation in a future release\n Please use CIQ.Marker.Performance.drawMarkers instead."
		);
		CIQ.Marker.Performance.drawMarkers(this);
	};

	/**
	 * Calculates the styles used in drawing [high performance canvas]{@link CIQ.Marker.Performance} markers.
	 * We use this method instead of other chart styling methods because markers expect styles to cascade down and then be calculated.
	 * Other style methods are for adding or calculating a single property.
	 * This will save styles to the engine's style object where they can be adjusted with {@link CIQ.ChartEngine#setStyle}.
	 *
	 * @memberof CIQ.ChartEngine
	 * @param {CIQ.Marker} marker The marker from which to compute the styles.
	 * @param {string} style Name to save to {@link CIQ.ChartEngine#styles}.
	 * @private
	 * @since
	 * - 7.1.0
	 * - 7.2.0 Scheduled for deprecation in a future release. See {@link CIQ.Marker.Performance.calculateMarkerStyles}.
	 */
	CIQ.ChartEngine.prototype.calculateMarkerStyles = function (marker, style) {
		console.warn(
			"CIQ.ChartEngine#calculateMarkerStyles is scheduled for deprecation in a future release\n Please use CIQ.Marker.Performance.calculateStyles instead."
		);
		CIQ.Marker.Performance.calculateMarkerStyles(this, marker, style);
	};

	/**
	 * Draws a circle for a [high performance canvas]{@link CIQ.Marker.Performance} marker.
	 *
	 * @param {CIQ.Marker} marker
	 * @param {object} style
	 * @param {object} params
	 * @private
	 * @since
	 * - 7.1.0
	 * - 7.2.0 Scheduled for deprecation in a future release. See {@link CIQ.Marker.Performance.drawCircleMarker}.
	 */
	CIQ.ChartEngine.prototype.drawCircleMarker = function (
		marker,
		style,
		params
	) {
		console.warn(
			"CIQ.ChartEngine#drawCircleMarker is scheduled for deprecation in a future release\n Please use CIQ.Marker.Performance.drawCircleMarker instead."
		);
		CIQ.Marker.Performance.drawCircleMarker(marker, style, params);
	};

	/**
	 * Draws a square for a [high performance canvas]{@link CIQ.Marker.Performance} marker.
	 *
	 * @param {CIQ.Marker} marker
	 * @param {object} style
	 * @param {object} params
	 * @private
	 * @since
	 * - 7.1.0
	 * - 7.2.0 Scheduled for deprecation in a future release. See {@link CIQ.Marker.Performance.drawSquareMarker}.
	 */
	CIQ.ChartEngine.prototype.drawSquareMarker = function (
		marker,
		style,
		params
	) {
		console.warn(
			"CIQ.ChartEngine#drawSquareMarker is scheduled for deprecation in a future release\n Please use CIQ.Marker.Performance.drawSquareMarker instead."
		);
		CIQ.Marker.Performance.drawSquareMarker(marker, style, params);
	};

	/**
	 * Draws callout (rectangular) a [high performance canvas]{@link CIQ.Marker.Performance} marker.
	 *
	 * @param {CIQ.Marker} marker
	 * @param {object} style
	 * @param {object} params
	 * @private
	 * @since
	 * - 7.1.0
	 * - 7.2.0 Scheduled for deprecation in a future release. See {@link CIQ.Marker.Performance.drawCalloutMarker}.
	 */
	CIQ.ChartEngine.prototype.drawCalloutMarker = function (
		marker,
		style,
		params
	) {
		console.warn(
			"CIQ.ChartEngine#drawCalloutMarker is scheduled for deprecation in a future release\n Please use CIQ.Marker.Performance.drawCalloutMarker instead."
		);
		CIQ.Marker.Performance.drawCalloutMarker(marker, style, params);
	};

	/**
	 * Draws a stem for a [high performance canvas]{@link CIQ.Marker.Performance} marker.
	 *
	 * @param {CIQ.Marker} marker
	 * @param {object} style
	 * @param {object} params
	 * @private
	 * @since
	 * - 7.1.0
	 * - 7.2.0 Scheduled for deprecation in a future release. See {@link CIQ.Marker.Performance.drawMarkerStem}.
	 */
	CIQ.ChartEngine.prototype.drawMarkerStem = function (marker, style, params) {
		console.warn(
			"CIQ.ChartEngine#drawMarkerStem is scheduled for deprecation in a future release\n Please use CIQ.Marker.Performance.drawMarkerStem instead."
		);
		CIQ.Marker.Performance.drawMarkerStem(marker, style, params);
	};

	/**
	 * Positions any markers that have DOM elements appended to the chart so that they follow their same canvas marker.
	 *
	 * @private
	 * @since
	 * - 7.1.0
	 * - 7.2.0 Scheduled for deprecation in a future release. See {@link CIQ.Marker.Performance.drawMarkers}.
	 */
	CIQ.ChartEngine.prototype.positionDOMMarkers = function () {
		console.warn(
			"CIQ.ChartEngine#positionDOMMarkers is scheduled for deprecation in a future release\n Please use CIQ.Marker.Performance.drawMarkers instead."
		);
		CIQ.Marker.Performance.drawMarkers(this);
	};

	/**
	 * Creates high performance canvas nodes that can be used with a {@link CIQ.Marker}.
	 *
	 * Use this class if you need to add hundreds or thousands of markers to a chart. When a
	 * marker is created, this class creates a node from the built-in template but does not attach
	 * the node to the DOM until you hover over the canvas drawing. Once you intersect the drawing,
	 * the node is appended and you can interact with it like other markers.
	 *
	 * The canvas draws the marker based on the classes that you append to the template (which
	 * come from `params.type` and `params.category`) being added to `stx-marker` class.
	 * See {@link CIQ.ChartEngine#calculateMarkerStyles} for more information.
	 *
	 * This class takes the same params as {@link CIQ.Marker.Simple} so that the appended DOM
	 * marker works the same. This means that you can reuse all of the default styles you've
	 * created for `CIQ.Marker.Simple` with `CIQ.Marker.Performance`. **Note:** If you do not pass
	 * in either a `headline` or a `story` or both, your marker will not create a pop-up display
	 * when the marker is selected.
	 *
	 * See the {@tutorial Markers} tutorial for additional implementation instructions.
	 *
	 * @param {Object} params Parameters to describe the marker.
	 * @param {string} params.type The marker type to be drawn.
	 * <br>Available options are:
	 * - "circle"
	 * - "square"
	 * - "diamond"
	 * - "callout"
	 * - "text"
	 * @param {string} [params.headline] The headline text to pop up when clicked.
	 * @param {string} [params.category] The category class to add to your marker.
	 * <br>Available options are:
	 * - "news"
	 * - "earningsUp"
	 * - "earningsDown"
	 * - "dividend"
	 * - "filing"
	 * - "split"
	 *
	 * Other custom categories require a corresponding CSS entry. See example.
	 *
	 * @param {string} [params.size] Size class to add to your marker.
	 * 		Requires corresponding CSS entry.
	 * @param {boolean} [params.displayCategory=true] Set to false to not draw the first letter of
	 * 		the category in the marker.
	 * @param {string} [params.displayLabel] Text to place in the marker.  Overrides `displayCategory`.
	 * @param {string} [params.story] The story to pop up when clicked. If left undefined, the
	 * 		marker displays an empty DOM node when clicked.
	 * @param {string} [params.color] Background color to make your marker. Overrides any style
	 * 		set by `params.category`.
	 * @param {boolean} [params.displayStem=true] Set to false to draw the marker at a specific
	 * 		point and not include the stem.
	 * @param {boolean} [params.invert=false] Set to true to invert the stem and point downward.
	 * @param {boolean} [params.infoOnLeft] If true, the information pop-up box is positioned on
	 * 		the left when possible.
	 * @param {number} [params.infoOffset] Distance to offset the information pop-up box.
	 * @param {boolean} [params.hide] Do not process display of marker.
	 * @param {boolean} [params.enableLinks] If true, the story's content is trusted as safe HTML script.
	 * 		As a result, any links in the story will be clickable.
	 * @param {boolean} [params.pinnable] If true, new marker can be "pinned". False by default.
	 * 		Requires **js/extras/pinnedMarkers.js,** which is part of the ChartIQ Extras Package.
	 * 		See {@link CIQ.Marker.prototype.makePinnable} for instructions on using this flag.
	 *
	 * @constructor
	 * @name CIQ.Marker.Performance
	 * @since
	 * - 7.1.0
	 * - 7.2.0 Markers without <u>both</u> a `headline` and `story` are not interactive.
	 * 		You must provide either or both properties for a node (which is the marker pop-up
	 * 		display) to be appended to the DOM. Performance markers now can be positioned anywhere
	 * 		that a DOM marker can be positioned (above, below, or on a candle; at a value; or at
	 * 		the top or bottom of a chart).
	 * - 8.0.0 Added `params.infoOnLeft`, `params.infoOffset`, and `params.invert`.
	 * - 8.6.0 Added `params.hide`, `params.size`, and `params.displayLabel`.
	 * - 9.1.0 Added `params.enableLinks`.
	 * - 9.1.2 Added `params.pinnable`, which requires **js/extras/pinnedMarkers.js,** which is part of the ChartIQ Extras Package.
	 *
	 * @example
	 * <caption>Required CSS entry for a custom category ("trade"), not included in the default
	 * CSS styles.</caption>
	 *
	 * .stx-marker.trade.small .stx-visual {
	 *     background: #C950d7;
	 *     width: 5px;
	 *     height: 5px;
	 * }
	 *
	 * // Corresponding code:
	 *
	 * new CIQ.Marker({
	 *     stx: stxx,
	 *     label: "trade",
	 *     xPositioner: "date",
	 *     x: OHLCData.DT,
	 *     node: new CIQ.Marker.Performance({
	 *         type: "circle",
	 *         category: "trade",
	 *         pinnable: true, //Requires ChartIQ Extras Package
	 *         displayCategory: false,
	 *         displayStem: false,
	 *         size: "small",
	 *         headline: "Executed at $" + OHLCData.Close,
	 *         story: "Like all ChartIQ markers, the object itself is managed by the chart."
	 *     })
	 * });
	 */
	CIQ.Marker.Performance = function (params) {
		this.params = {
			displayCategory: true,
			displayStem: true,
			invert: false,
			story: "",
			headline: ""
		};
		CIQ.ensureDefaults(this.params, {
			pinnable: this.pinnable
		});
		CIQ.extend(this.params, params);
		var template = (this.template = document.createElement("TEMPLATE"));
		template.innerHTML =
			'<div class="stx-marker highlight">' +
			'<div class="stx-visual">' +
			'<div class="stx-marker-content">' +
			'<div class="stx-marker stx-performance-marker stx-marker-expand"><h4></h4><p></p></div>' +
			"</div>" +
			"</div>" +
			'<div class="stx-stem"></div>' +
			"</div>";
		var n = this.template.content.cloneNode(true);
		var marker = n.querySelector(".stx-marker");
		marker.classList.add(params.type);
		marker.classList.add(params.category);
		if (params.size) marker.classList.add(params.size);
		var visual = n.querySelector(".stx-visual");
		var expand = n.querySelector(".stx-marker-expand");
		var header = n.querySelector("h4");
		var text = n.querySelector("p");
		header.innerText = this.params.headline;
		text[this.params.enableLinks ? "innerHTML" : "innerText"] =
			this.params.story;
		this.hasText = !!params.headline || !!params.story;

		this.deferAttach = true;

		this.node = n.firstChild;
		this.node.params = this.params;
		this.visual = visual;
		this.expand = expand;
		if (params.type === "callout") {
			var h = expand.removeChild(header);
			n.querySelector(".stx-marker-content").insertBefore(h, expand);
		}
	};

	CIQ.inheritsFrom(CIQ.Marker.Performance, CIQ.Marker.NodeCreator, false);

	/**
	 * This function keeps you from having a ton of marker expand dialogs from overlapping each other and becoming too hard to read.
	 * Checks the markers that have been marked as highlighted by the chart engine and combines the text of their expands into the last one highlighted.
	 *
	 * @param {CIQ.ChartEngine} stx
	 * @static
	 * @private
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.consolidateExpanded = function (stx) {
		var highlighted = stx.markerHelper.highlighted;
		if (!highlighted.length) return;

		function findInner(marker) {
			var node = marker.params.node,
				expand = node.expand;
			if (!expand) return null;
			return expand.querySelector(".marker_content") || expand;
		}

		var focusedMarker = stx.activeMarker;
		if (!focusedMarker.consolidated) focusedMarker.consolidated = [];
		for (var i = highlighted.length - 1; i >= 0; i--) {
			if (focusedMarker === highlighted[i]) continue;
			var inner = findInner(highlighted[i]);
			if (inner) {
				var consolidated =
					"<cq-consolidated><br><br>" +
					inner.innerHTML.replace(
						/<cq-consolidated>.*<\/cq-consolidated>/g,
						""
					) +
					"</cq-consolidated>";
				findInner(focusedMarker).innerHTML += consolidated;
			}
		}
		focusedMarker.stxNodeCreator.quickCache(focusedMarker);
	};

	/**
	 * Resets any highlighted markers to their default display state and removes any consolidated text from the marker.
	 *
	 * @param {CIQ.ChartEngine} stx
	 * @static
	 * @private
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.reconstituteExpanded = function (stx) {
		if (!stx.markerHelper.highlighted.length || !stx.activeMarker) return;

		Array.from(
			stx.activeMarker.params.node.expand.querySelectorAll("cq-consolidated")
		).forEach((child) => child.remove());
	};

	/**
	 * <span class="animation">Animation Loop</span>
	 *
	 * Iterates through all [high performance canvas]{@link CIQ.Marker.Performance} markers and
	 * draws them on the canvas.
	 *
	 * See {@tutorial Markers} tutorials for additional implementation instructions.
	 *
	 * @param {CIQ.ChartEngine} stx A reference to the chart object.
	 *
	 * @memberof CIQ.Marker.Performance
	 * @static
	 * @since 7.2.0 Replaces {@link CIQ.ChartEngine#drawMarkers}.
	 */
	CIQ.Marker.Performance.drawMarkers = function (stx) {
		var markers = stx.getMarkerArray("all");
		var chart = stx.chart;
		for (var i = 0; i < markers.length; i++) {
			var marker = markers[i],
				nodeCreator = marker.stxNodeCreator;
			var startingTick = chart.dataSegment[0].tick,
				endingTick = chart.dataSegment[chart.dataSegment.length - 1].tick;
			if (startingTick <= marker.tick && marker.tick <= endingTick) {
				// if markers are off screen don't draw them
				if (nodeCreator && nodeCreator.drawMarker)
					nodeCreator.drawMarker(marker);
			}
		}
	};

	/**
	 * Calculates the styles used in drawing [high performance canvas]{@link CIQ.Marker.Performance} markers.
	 * We use this method instead of other chart styling methods because Markers expect styles to cascade down and then be calculated.
	 * Other style methods are for adding or calculating a single property.
	 * This will save styles to the engine's style object where they can be adjusted with {@link CIQ.ChartEngine#setStyle}.
	 *
	 * @member CIQ.Marker.Performance
	 * @param {CIQ.ChartEngine} stx The chart engine.
	 * @param {CIQ.Marker} marker The marker to compute the styles from.
	 * @param {string} style Name to save to {@link CIQ.ChartEngine#styles}.
	 * @private
	 * @static
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.calculateMarkerStyles = function (stx, marker, style) {
		var doc = stx.container.ownerDocument;
		var testArea = doc.querySelector(".stx-marker-templates");
		if (!testArea) {
			testArea = document.createElement("DIV");
			testArea.style.visibility = "hidden";
			testArea.style.left = "-1000px";
			doc.body.append(testArea);
		}
		testArea.appendChild(marker.node);
		var s = getComputedStyle(marker.stxNodeCreator.visual);
		if (!stx.styles.stx_marker_stem) {
			var stem = getComputedStyle(marker.node.querySelector(".stx-stem"));
			stx.styles.stx_marker_stem = stx.cloneStyle(stem);
		}
		stx.styles[style] = stx.cloneStyle(s);
		testArea.removeChild(marker.node);
	};

	/**
	 * Draws circular canvas markers based on the styles for {@link CIQ.Marker.Performance} markers.
	 *
	 * @param {CIQ.Marker} marker
	 * @param {object} style
	 * @param {object} params
	 * @static
	 * @private
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.drawCircleMarker = function (marker, style, params) {
		var stx = marker.params.stx,
			chart = stx.chart,
			ctx = chart.context;
		var x = params.x,
			y = params.y,
			radius = params.radius,
			label = stx.emojify(params.label);
		var color = params.color ? params.color : style.backgroundColor;

		// Draw Circle
		ctx.save();
		ctx.beginPath();
		ctx.setLineDash([]);
		ctx.lineWidth = 1;
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font =
			"normal bold " +
			Math.min(12, 2 * (radius + 1)) +
			"px Roboto, Helvetica, sans-serif";
		ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		// Write text
		if (label) {
			ctx.fillStyle = CIQ.chooseForegroundColor(ctx.fillStyle);
			ctx.fillText(label, x, y + 1);
		}

		if (!marker.params.noInteraction && (marker.highlight || marker.active)) {
			if (CIQ.isTransparent(color)) ctx.strokeStyle = stx.defaultColor;
			ctx.beginPath();
			ctx.arc(x, y, radius + 4, 0, 2 * Math.PI, false); // 4 pixels just chosen for giving slight space around marker
			ctx.stroke();
			ctx.closePath();
		}
		ctx.restore();
	};

	/**
	 * Draws square canvas markers based on the styles for {@link CIQ.Marker.Performance} markers.
	 *
	 * @param {CIQ.Marker} marker
	 * @param {object} style
	 * @param {object} params
	 * @static
	 * @private
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.drawSquareMarker = function (marker, style, params) {
		var stx = marker.params.stx,
			chart = stx.chart,
			ctx = chart.context;
		var x = params.x,
			y = params.y,
			half = params.half,
			label = stx.emojify(params.label);
		var color = params.color ? params.color : style.backgroundColor;
		var whole = half * 2;

		// Draw Square
		ctx.setLineDash([]);
		ctx.lineWidth = 1;
		ctx.fillStyle = color;
		ctx.strokeStyle = color;

		ctx.save();
		ctx.beginPath();
		if (marker.node.params.type === "diamond") {
			ctx.translate(x, y);
			ctx.rotate(Math.PI / 4);
			ctx.translate(-x, -y);
			half /= 1.42;
			whole = half * 2;
		}
		ctx.fillRect(x - half, y - half, whole, whole);
		if (marker.highlight || marker.active)
			ctx.strokeRect(x - half - 4, y - half - 4, whole + 8, whole + 8); // whole + 4 + 4 for the highlighted box
		ctx.closePath();
		ctx.restore();

		// Write text
		if (label) {
			ctx.save();
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font =
				"normal bold " +
				Math.min(12, 2 * half) +
				"px Roboto, Helvetica, sans-serif";
			ctx.fillStyle = CIQ.chooseForegroundColor(ctx.fillStyle);
			ctx.fillText(label, x, y + 1);
			ctx.restore();
		}
	};

	/**
	 * Draws callout (rectangular) canvas marker based on the style for a {@link CIQ.Marker.Performance} markers.
	 *
	 * @param {CIQ.Marker} marker
	 * @param {object} style
	 * @param {object} params
	 * @static
	 * @private
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.drawCalloutMarker = function (marker, style, params) {
		var stx = marker.params.stx,
			chart = stx.chart,
			ctx = chart.context,
			mParams = marker.params;
		var x = params.x,
			y = params.y,
			half = params.half,
			calloutMid = params.midWidth,
			headline = stx.emojify(params.headline);
		var color = params.color ? params.color : style.backgroundColor;

		var height = half * 2 || 25;
		var headlineLength = Math.round(ctx.measureText(headline).width);
		// If there's no length use the text measurement plus some padding
		var calloutWidth = calloutMid ? calloutMid * 2 : headlineLength + 8;

		// Draw the rectangle
		ctx.beginPath();
		ctx.setLineDash([]);
		ctx.lineWidth = 1;
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.font =
			style.fontStyle +
			" bold " +
			(parseInt(style.fontSize, 10) + 2) +
			"px " +
			style.fontFamily;
		ctx.rect(mParams.box.x0, mParams.box.y0, calloutWidth, height);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		// draw the "background" box that text apears in
		ctx.beginPath();
		ctx.fillStyle =
			marker.highlight || marker.active
				? "rgba(255,255,255,0.8)"
				: "rgba(255,255,255,0.65)";
		ctx.rect(mParams.box.x0, mParams.box.y0, calloutWidth, height - 3);
		ctx.fill();
		ctx.closePath();

		ctx.fillStyle = "black";
		ctx.fillText(headline, mParams.box.x0 + 10, y);
	};

	/**
	 * Draws text markers based on the styles for {@link CIQ.Marker.Performance} markers.
	 * To specify emoji(s), use short codes. For example, :fire: or :point_up::skin-tone-4:
	 *
	 * @param {CIQ.Marker} marker
	 * @param {object} style
	 * @param {object} params
	 * @static
	 * @private
	 * @since 8.8.0
	 */
	CIQ.Marker.Performance.drawTextMarker = function (marker, style, params) {
		const { stx } = marker.params,
			ctx = stx.chart.context;
		const { x, y } = params,
			halfHeight = params.radius;

		const content = stx.emojify(params.label);

		// Draw text
		ctx.save();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font =
			style.fontStyle +
			" " +
			style.fontWeight +
			" " +
			halfHeight * 2 +
			"px " +
			style.fontFamily;
		ctx.fillStyle = params.color || stx.defaultColor;
		ctx.fillText(content, x, y);

		if (marker.highlight || marker.active) {
			const headlineLength = Math.round(ctx.measureText(content).width);
			const halfWidth = headlineLength / 2;
			const padding = 4.5;
			ctx.strokeStyle = params.color || stx.defaultColor;
			ctx.beginPath();
			ctx.strokeRect(
				Math.floor(x) - halfWidth - padding,
				Math.floor(y) - halfHeight - padding,
				(halfWidth + padding) * 2,
				(halfHeight + padding) * 2
			);
			ctx.stroke();
			ctx.closePath();
		}
		ctx.restore();
	};

	/**
	 * Draws marker stems for a based on a style for {@link CIQ.Marker.Performance} markers.
	 *
	 * @param {CIQ.Marker} marker
	 * @param {object} style
	 * @param {object} params
	 * @static
	 * @private
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.drawMarkerStem = function (marker, style, params) {
		const ctx = marker.params.stx.chart.context;
		const { x } = params;

		ctx.beginPath();
		ctx.strokeStyle = style.borderLeftColor;
		// ctx.setLineDash(CIQ.borderPatternToArray(stemStyle.borderLeftWidth, stemStyle.borderLeftStyle));
		ctx.setLineDash([1, 1]);
		const stemHeight = CIQ.stripPX(style.height);
		const startY = params.invert ? marker.params.box.y0 : marker.params.box.y1;
		const endY = params.invert
			? marker.params.box.y0 - stemHeight
			: marker.params.box.y1 + stemHeight;
		ctx.moveTo(x, startY);
		ctx.lineTo(x, endY);
		ctx.stroke();
		ctx.closePath();
	};

	/**
	 * Draws a canvas marker on the chart and positions the pop-up for the marker if necessary.
	 *
	 * @memberof CIQ.Marker.Performance
	 * @param {CIQ.Marker} marker The marker to be drawn.
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.prototype.drawMarker = function (marker) {
		if (marker.hidden) return;
		var mParams = marker.params,
			stx = mParams.stx;
		if (!stx) return;

		var chart = stx.chart,
			dataSegment = chart.dataSegment;
		if (!dataSegment || !dataSegment.length) return;

		var panel = stx.panels[mParams.panelName];
		if (!panel || panel.hidden) return;
		var yAxis =
			mParams.yAxis || stx.getYAxisByField(panel, mParams.field) || panel.yAxis;
		var nParams = marker.stxNodeCreator.params;
		if (nParams.hide) return;
		var type = nParams.type,
			category = nParams.category,
			headline = nParams.headline,
			display = nParams.displayCategory,
			color = nParams.color,
			label = nParams.displayLabel,
			invert = nParams.invert,
			size = nParams.size;
		if (color === "auto") color = stx.defaultColor;
		var style = "stx_marker_" + type + "_" + category;
		if (size) style += "_" + size;
		if (!stx.styles[style])
			CIQ.Marker.Performance.calculateMarkerStyles(stx, marker, style);
		var markerStyle = (marker.style = stx.styles[style]),
			stemStyle = stx.styles.stx_marker_stem;

		var halfSide = parseInt(markerStyle.height, 10) / 2,
			halfWidth = parseInt(markerStyle.width, 10) / 2;
		if (type === "diamond") {
			halfSide *= 1.42;
			halfWidth *= 1.42;
		}
		var stemHeight = nParams.displayStem
			? parseInt(stemStyle.height, 10) + parseInt(stemStyle.marginBottom, 10)
			: 0;
		var markerHeight = stemHeight + halfSide * 2;
		var offset = mParams.offset || 0;

		var x = stx.pixelFromTick(marker.tick);
		var y = mParams.node.calculateYPosition({
			marker: marker,
			panel: panel,
			yAxis: yAxis,
			height: markerHeight,
			half: halfSide,
			offset: offset,
			stemHeight: stemHeight,
			inverted: invert,
			field: mParams.field,
			x: x
		});

		// This can happen if for some reason the marker is missing a tick.
		//It's possible but rare,  in that scenario just abort the drawing to prevent throwing errors
		if (!marker.tick && marker.tick !== 0) return;

		mParams.box = {
			x0: x - (halfWidth || halfSide),
			y0: y - halfSide,
			x1: x + (halfWidth || halfSide),
			y1: y + halfSide,
			midY: halfSide,
			midX: halfWidth || halfSide,
			stemHeight: stemHeight
		};

		if (!display) category = "";
		else category = category[0].toUpperCase();
		stx.startClip(panel.name);

		var params = {
			x: x,
			y: y,
			half: halfSide,
			radius: halfSide,
			label: label || category,
			midWidth: halfWidth,
			headline: headline,
			color: color
		};
		if (type === "circle") {
			CIQ.Marker.Performance.drawCircleMarker(marker, markerStyle, params);
		} else if (type === "square" || type === "diamond") {
			CIQ.Marker.Performance.drawSquareMarker(marker, markerStyle, params);
		} else if (type === "callout") {
			CIQ.Marker.Performance.drawCalloutMarker(marker, markerStyle, params);
		} else if (type === "text") {
			CIQ.Marker.Performance.drawTextMarker(marker, markerStyle, params);
		} else {
			console.warn(
				"Marker type: " +
					type +
					" is unsupported with canvas markers!\nSupported Styles are Square, Diamond, Circle, Callout or Text."
			);
		}

		if (nParams.displayStem)
			CIQ.Marker.Performance.drawMarkerStem(marker, stemStyle, {
				x: x,
				y: y,
				invert: invert
			});

		stx.endClip();
		if (!marker.attached && mParams.pinnedPosition) {
			marker.attached = marker.active = true;
			stx.addToHolder(marker);
		}
		if (marker.attached) this.positionPopUpNode(marker);
		if (marker.position) marker.position();
	};

	/**
	 * Positions a marker's pop-up `div` that has been appended to the chart so that it follows the canvas marker.
	 * This is the replacement for {@link CIQ.ChartEngine#positionDOMMarkers}, but it is now an instance method for the individual performance marker.
	 *
	 * @private
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.prototype.positionPopUpNode = function (marker) {
		if (!marker.attached || !marker.params.box) return;
		var mparams = marker.params,
			stx = mparams.stx,
			mbox = mparams.box,
			expand = mparams.node.expand;
		var dataSet = stx.chart.dataSet,
			dataSegment = stx.chart.dataSegment;
		var panel = stx.panels[mparams.panelName];

		var markerVisible;
		if (marker.tick) {
			var startBuffer = [
				dataSet[dataSegment[0] && dataSegment[0].tick - 1],
				dataSet[dataSegment[0] && dataSegment[0].tick - 2]
			]; // check two ticks ahead the dataSegment b/c markers sometimes extend past ticks
			var first = stx.getFirstLastDataRecord(
				startBuffer.concat(dataSegment),
				"DT"
			);
			var endBuffer = [
				dataSet[dataSegment[dataSegment.length - 1].tick + 1],
				dataSet[dataSegment[dataSegment.length - 1].tick + 2]
			]; // check two ticks behind the dataSegment b/c markers sometimes extend past ticks
			var last = stx.getFirstLastDataRecord(
				dataSegment.concat(endBuffer),
				"DT",
				true
			);
			markerVisible =
				first.DT <= dataSet[marker.tick].DT &&
				dataSet[marker.tick].DT <= last.DT &&
				marker.params.box.y0 <= panel.yAxis.bottom &&
				marker.params.box.y1 >= panel.yAxis.top;
		} else {
			markerVisible = false;
		}

		if (!marker.highlight && !marker.active) markerVisible = false;
		expand.style.visibility = markerVisible ? "" : "hidden";
		if (!markerVisible) return; // don't continue if the marker is off the screen

		if (expand.style.height !== "") expand.style.height = "";
		var expandRect = expand.rects;
		var medianHeight = expandRect.height / 2;

		var tx;
		var offset = marker.node.params.infoOffset || 0;
		if (marker.node.params.infoOnLeft) {
			tx =
				mbox.x0 - expandRect.width - offset < panel.left
					? mbox.x1 + offset
					: mbox.x0 - expandRect.width - offset;
		} else {
			tx =
				mbox.x0 + expandRect.width > panel.right
					? mbox.x0 - expandRect.width - offset
					: mbox.x1 + offset;
		}
		tx -= stx.chart.left;
		var buffer = mparams.avoidFlush ? 5 : 0;
		var ty =
			mbox.y0 - medianHeight >= panel.yAxis.top
				? mbox.y0 + mbox.midY - medianHeight
				: panel.yAxis.top + buffer;
		// case where the marker is set to "bottom" alignment. We make the marker flush with the bottom of the yAxis unless the expand height is shorter than the marker height (ie a short marker label on a marker with a stem)
		if (
			!mparams.avoidFlush &&
			mbox.y1 + mbox.stemHeight === panel.yAxis.bottom &&
			expandRect.height > mbox.y1 - mbox.y0 + mbox.stemHeight
		)
			ty = mbox.y1 - expandRect.height + mbox.stemHeight;
		// If expand div extends past bottom of panel, align to bottom
		if (mbox.y1 + medianHeight > panel.yAxis.bottom)
			ty = panel.yAxis.bottom - expandRect.height - buffer;
		// If expand div is larger than the panel height then align to top of panel
		// and adjust the height to the panel height
		if (expandRect.height > panel.yAxis.height) {
			ty = panel.yAxis.top + buffer;
			expand.style.height = panel.yAxis.height - 2 * buffer + "px";
		}
		ty -= panel.yAxis.top;
		var positionStyle = {
			top: "",
			left: "",
			transform:
				"translate3d(" + Math.floor(tx) + "px, " + Math.floor(ty) + "px, 0)"
		};
		var body =
			(stx.uiContext && stx.uiContext.topNode) ||
			stx.container.ownerDocument.body;
		if (body.classList.contains("sharing")) {
			positionStyle = {
				top: Math.floor(ty) + "px",
				left: Math.floor(tx) + "px",
				transform: ""
			};
		}
		Object.assign(expand.style, positionStyle);

		// cache values for later use to determine x/y location of the expand popup
		expand.transform = { translateX: tx, translateY: ty };
	};

	/**
	 * Performs and caches some necessary calculations when the expand popup is first appended to the DOM.
	 * We do these calculations here once instead of on every call of the draw loop when we iterate thru the markers.
	 * The only thing that will change is the X/Y transform position which we already calculate in CIQ.Marker.Performance#drawMarker.
	 * So we can safely add the transform values we cache there to the default X/Y calculated here and find position without trashing the layout.
	 *
	 * **NOTE** You will notice that if you remove a marker and add it back, the values should be correct for X/Y (or at least the same as what it was before + translateX/Y).
	 * While this is true, it's only true if you add a marker back, so we can't reliably assume that the values are correct for X/Y.
	 *
	 * @param {CIQ.Marker} marker
	 * @private
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.prototype.quickCache = function (marker) {
		var node = marker.params.node,
			expand = node.expand,
			style = marker.style;
		var notScroll = !style
			? 0
			: CIQ.stripPX(style.marginLeft) +
			  CIQ.stripPX(style.marginRight) +
			  CIQ.stripPX(style.borderRight) +
			  CIQ.stripPX(style.borderLeft);
		expand.rects = expand.getBoundingClientRect();
		expand.scrollBarWidth = expand.rects.width - expand.clientWidth - notScroll;
	};

	/**
	 * Calculates the initial y-axis positioning when drawing a canvas marker.
	 *
	 * @param {object} params
	 * @param {CIQ.Marker} params.marker The marker for which the y-axis position is calculated.
	 * @param {CIQ.ChartEngine.Panel} params.panel Panel on which the marker appears.
	 * @param {number} params.tick The tick of the quote in the chart's data set.
	 * @param {number} params.height Total height of the marker as defined by marker height plus
	 * 		stem height.
	 * @param {number} params.half Half the height of the marker as defined by the marker CSS
	 * 		style.
	 * @param {number} params.offset Height of the offset provided when creating the marker.
	 * @param {number} params.stemHeight Height of the marker stem offset as defined by the marker
	 * 		stem CSS style height plus margin bottom.
	 * @param {boolean} params.inverted Indicates whether the marker stem is inverted; that is,
	 * 		pointing downward.
	 * @param {string} params.field Field to attach marker to if using appropriate yPositioner.
	 * @param {number} params.x Already computed x position, in pixels.
	 * @return {number} Initial y-coordinate positioning for drawing the canvas marker.
	 *
	 * @memberof CIQ.Marker.Performance
	 * @since
	 * - 7.2.0
	 * - 8.0.0 Added param `inverted`.
	 * - 8.6.0 Added params `field`, `x`, `stemHeight`.
	 */
	CIQ.Marker.Performance.prototype.calculateYPosition = function (params) {
		var marker = params.marker,
			stx = marker.params.stx,
			chart = stx.chart,
			field = params.field,
			symbol = params.symbol || marker.params.symbol,
			panel = params.panel,
			yAxis = params.yAxis || stx.getYAxisByField(panel, field) || panel.yAxis,
			height = params.height,
			side = params.half,
			offset = params.offset,
			stemHeight = params.stemHeight,
			inverted = params.inverted;

		// this code finds the actual tick or the one right before to put the marker on.
		var useHighs = stx.chart.highLowBars;
		var quote = chart.dataSet[marker.tick];
		if (!quote) return;

		var position = marker.params.yPositioner,
			y;

		var getPixel = stx.pixelFromPrice.bind(stx);
		if (
			quote.transform &&
			field in quote.transform &&
			yAxis === stx.chart.yAxis &&
			position !== "value"
		) {
			quote = quote.transform;
			getPixel = stx.pixelFromTransformedValue.bind(stx);
		}
		if (quote && symbol) quote = quote[symbol];
		if (quote && field) quote = quote[field];
		if (typeof quote === "number") {
			quote = { Close: quote };
			quote[chart.defaultPlotField] = quote.Close;
			useHighs = false;
		}
		if (!quote) return;

		var bounds = stx.getBarBounds(quote, !!field);
		var high = useHighs
			? bounds[yAxis.flipped ? "low" : "high"]
			: quote[chart.defaultPlotField];
		var low = useHighs
			? bounds[yAxis.flipped ? "high" : "low"]
			: quote[chart.defaultPlotField];

		if (isNaN(high)) high = (yAxis.high + yAxis.low) / 2;
		if (isNaN(low)) low = (yAxis.high + yAxis.low) / 2;

		var bottomAdjust = 0;
		if (position != "none") {
			var isLane = position.indexOf("_lane") > -1;
			var placementMap = stx.markerHelper.placementMap;
			var keyBase = position + "|" + panel.name + "|" + field;
			if (isLane && placementMap[keyBase] === undefined)
				placementMap[keyBase] = 2;
			var placementKey =
				keyBase + "-" + (isLane ? marker.params.label : marker.tick);
			if (placementMap[placementKey] === undefined) {
				placementMap[placementKey] = isLane ? placementMap[keyBase] : 0;
				if (isLane) placementMap[keyBase] += height + 2;
			}
			bottomAdjust = placementMap[placementKey];
			if (!isLane) placementMap[placementKey] += height + 1;
		}

		switch (position) {
			case "value": // this is actually our default case
				if (marker.params.y || marker.params.y === 0) {
					y = getPixel(marker.params.y, panel, yAxis) - height * 0.5 + side;
					break;
				} /* falls through */
			case "above_candle":
				y =
					getPixel(high, panel, yAxis) -
					side -
					((!inverted && stemHeight) || offset) -
					bottomAdjust;
				break;
			case "below_candle":
				y =
					getPixel(low, panel, yAxis) +
					side +
					((inverted && stemHeight) || offset) +
					bottomAdjust;
				break;
			case "on_candle":
				y = getPixel((high + low) / 2, panel, yAxis) - height * 0.5 + side;
				break;
			case "top":
			case "top_lane":
				y =
					panel.yAxis.top +
					side +
					((inverted && stemHeight) || offset) +
					bottomAdjust;
				break;
			case "bottom":
			case "bottom_lane":
				y =
					panel.yAxis.bottom -
					side -
					((!inverted && stemHeight) || offset) -
					bottomAdjust;
				break;
			default:
				break;
		}
		return (Math.round(2 * y) || 0) / 2;
	};

	/**
	 * Method to setup the actual DOM node that gets appended to the chart for Performance markers.
	 * Performance markers require the entire DOM of the template for the styles to be calculated correctly but we only want to append the "pop-up" expand `div`.
	 *
	 * @param {CIQ.Marker} marker The marker to which this node belongs.
	 * @return {HTMLElement} Expand the pop-up node that will be appended to the chart for the performance marker.
	 * @private
	 */
	CIQ.Marker.Performance.prototype.prepareForHolder = function (marker) {
		var expand = this.expand,
			stx = marker.params.stx;
		expand.classList.add(this.params.type);
		expand.classList.add(this.params.category);
		stx.markerHelper.domMarkers.push(marker);
		return expand;
	};

	/**
	 * Adds click and touch events to the marker pop-up when it is appended to the chart.
	 *
	 * @param {CIQ.Marker} marker The marker to which this node belongs.
	 *
	 * @private
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.prototype.addToHolder = function (marker) {
		var expand = this.expand,
			stx = marker.params.stx;

		CIQ.Marker.Performance.reconstituteExpanded(stx);
		CIQ.Marker.Performance.consolidateExpanded(stx);
		this.quickCache(marker);

		if (expand.clickClosure) return;

		function clickClosure(e) {
			stx.activeMarker = marker;
			stx.activeMarker.click({
				cx: e.clientX,
				cy: e.clientY,
				panel: stx.currentPanel
			});
			e.stopPropagation();
		}
		// CIQ.safeClickTouch does not stop propagation well.
		// Attaching the listener explicitly here to ensure stopPropagation and prevent accidental triggering of other markers
		if (!(this.params.pinnable && marker.makePinnable))
			expand.addEventListener("click", clickClosure);
		expand.clickClosure = clickClosure;
	};

	/**
	 * Removes a high performance canvas markers from the `markerHelper.domMarkers` array.
	 * We use this instead of {@link CIQ.ChartEngine#removeFromHolder} because that will remove the whole marker instead of just removing the DOM node.
	 *
	 * @param {CIQ.Marker} marker The marker to which this node belongs.
	 *
	 * @private
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.prototype.remove = function (marker) {
		var stx = marker.params.stx;
		if (!stx) return;
		if (!stx.markerHelper.domMarkers) return; // if never anything appended return

		var idx = stx.markerHelper.domMarkers.indexOf(marker);
		if (idx != -1) stx.markerHelper.domMarkers.splice(idx, 1);
		marker.active = false;
		if (marker.attached) {
			var panel = stx.panels[marker.params.panelName];
			var expand = marker.params.node.expand;
			if (expand.parentNode === panel.subholder)
				panel.subholder.removeChild(expand);
			expand.removeEventListener("click", expand.clickClosure);
			expand.clickClosure = null;
			marker.attached = false;
		}
	};

	/**
	 * Click event handler for performance markers when they are clicked in the canvas.
	 * Adds or removes the marker's pop-up expand `div` to the chart, depending on whether it has already been activated.
	 *
	 * @memberof CIQ.Marker.Performance
	 * @param {object} params Configuration parameters.
	 * @param {number} params.cx Client x-coordinate of click.
	 * @param {number} params.cy Client y-coordinate of click.
	 * @param {CIQ.Marker} params.marker Marker that was clicked.
	 * @param {CIQ.ChartEngine.Panel} params.panel Panel where the click occurred.
	 * @since 7.2.0
	 */
	CIQ.Marker.Performance.prototype.click = function (params) {
		if (!this.hasText) return; // don't display anything if there's nothing to display!

		if (arguments.length > 1) {
			params = {
				cx: arguments[0],
				cy: arguments[1],
				marker: arguments[2],
				panel: arguments[3]
			};
		}
		const { cx, marker } = params;
		const { stx } = marker.params;

		let position = false;
		if (marker.attached) {
			const { expand } = this;
			// checks to see if we clicked on the scroll bar and if we did return
			if (
				expand.rects &&
				expand.transform &&
				expand.rects.width -
					expand.scrollBarWidth +
					expand.transform.translateX <
					stx.backOutX(cx) &&
				stx.backOutX(cx) < expand.rects.width + expand.transform.translateX
			)
				return;
			this.remove(marker);
		} else {
			stx.addToHolder(marker);
			position = true;
		}
		marker.attached = position;
		marker.active = position;
		if (position) marker.stxNodeCreator.positionPopUpNode(marker);
		stx.draw();
	};

	/**
	 * READ ONLY. Indicates that the nodeCreator draws markers on the canvas instead of creating new DOM Elements.
	 *
	 * @type boolean
	 * @default
	 * @memberof CIQ.Marker.Performance
	 * @since 9.1.2
	 */
	CIQ.Marker.Performance.prototype.isCanvasMarker = true; // dts-gen needs this, defineProperty not understood
	Object.defineProperty(CIQ.Marker.Performance.prototype, "isCanvasMarker", {
		writable: false,
		enumerable: true,
		value: true
	});
}
