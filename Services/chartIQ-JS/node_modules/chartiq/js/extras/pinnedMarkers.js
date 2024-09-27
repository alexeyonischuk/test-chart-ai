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


/*
	Pinned Markers
	==============
	Including this file will allow you to pin a tooltip to the chart when left clicking a highlighted series.
	It will also allow you to move the tooltip around on the chart.  A stem line will be drawn connecting the marker
	to the point on the series to which is it associated.
	The tooltip is represented as a marker, and can persist across sessions.  If the range selector addon is enabled, a marker will be
	placed there too, for reference.
	This file also provides the utilities required to make any marker pinnable.
	Note: This feature relies on the HTML5 Drag and Drop API, which is not well supported on touch devices.  As a result, the markers
	   may not be able to be dragged using touch gestures.  Tooltips will also not be able to be pinned using touch gestures.
*/
import { CIQ } from "../../js/chartiq.js";
/**
 * Checks to see whether pinning tooltips is universally allowed, or allowed based on plot type or gesture.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {string} type Type of plot to pin upon.  Valid values are "series" and "study".
 * @return {boolean} true if pinning is allowed.
 *
 * @alias allowPinning
 * @memberof CIQ.ChartEngine#
 * @since 9.1.2
 * @version ChartIQ Extras Package
 */
CIQ.ChartEngine.prototype.allowPinning = function (type) {
	if (this.highlightViaTap || this.touches.length) return; // disallow touch pinning
	if (type === "study") return false; // hardcode off for now
	if (!CIQ.Marker.PinnedTooltip.enable) return false;
	if (typeof CIQ.Marker.PinnedTooltip.enable === "object")
		return CIQ.Marker.PinnedTooltip.enable[type];
	return CIQ.Marker.PinnedTooltip.enable;
};
/**
 * If a series is clicked with the left mouse (or tapped on a touch device), a tooltip will be created showing the price information
 * either for that series or all series on the panel, depending on the value of {@link CIQ.Marker.PinnedTooltip.includeAllSeries}.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * Currently works only on a series curve, not a study curve.
 *
 * @param {Object} params
 * @param {number} params.cx Pixel of x coordinate.
 * @param {number} params.cy Pixel of y coordinate.
 * @return {boolean} true if tooltip created (this will depend on data being available, as well as if a series was what was clicked).
 *
 * @alias leftClickPinTooltip
 * @memberof CIQ.ChartEngine#
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.ChartEngine.prototype.leftClickPinTooltip = function ({ cx, cy }) {
	if (this.openDialog !== "") return;
	const { s } = this.highlightedPlot;
	if (s) {
		const field = s.field;
		const record = this.chart.dataSegment[this.barFromPixel(cx)];
		const panel = this.whichPanel(cy);
		const x = record.DT;
		const y = this.priceFromPixel(
			cy,
			panel,
			this.getYAxisByField(panel, field)
		);
		const candleOffset = 0;
		CIQ.Marker.PinnedTooltip.create({
			stx: this,
			field,
			record,
			panel,
			x,
			y,
			candleOffset
		}).store();
		return true;
	}
	return false;
};
const cachedState = {
	chartType: null,
	aggregationType: null,
	symbolPanelHash: null
};
// get things started!
CIQ.ChartEngine.helpersToRegister.push((stx) => {
	stx.pinnedMarkers = {
		list: [],
		cachedLayoutState: CIQ.clone(cachedState),
		hasLayoutListener: false
	};
	const hashFn = (sym) =>
		`${sym.symbol}|${
			sym.parameters ? sym.parameters.panel : stx.chart.panel.name
		}`;
	// Watch for new symbols, maybe there is a pinned marker for them
	stx.addEventListener("symbolImport", () => CIQ.PinnedMarker.restore(stx));
	// Watch layout changes:
	// chartType & aggregationType for pinned tooltip OHL display,
	// studies and symbolPanelHash for study field name change or panel modification.
	const { cachedLayoutState } = stx.pinnedMarkers;
	["symbolChange", "layout"].forEach((evt) =>
		stx.addEventListener(evt, () => {
			let doRestore = false;
			const hash =
				evt === "symbolChange"
					? stx
							.getSymbols({ "include-parameters": true })
							.map(hashFn)
							.join(",")
					: cachedLayoutState.symbolPanelHash;
			Object.entries(cachedLayoutState).forEach(([key, value]) => {
				switch (key) {
					case "chartType":
					case "aggregationType":
					case "studies":
						if (stx.layout[key] !== value) doRestore = true;
						break;
					case "symbolPanelHash":
						if (hash !== value) doRestore = true;
						break;
				}
			});
			if (doRestore) CIQ.PinnedMarker.restore(stx);
			const { chartType, aggregationType, studies } = stx.layout;
			Object.assign(cachedLayoutState, {
				chartType,
				aggregationType,
				studies,
				symbolPanelHash: hash
			});
		})
	);
	if (CIQ.UI) CIQ.UI.activatePluginUI(stx, "pinnedmarkers");
});
if (CIQ.UI) {
	CIQ.UI.Markers.prototype.removePinnedMarkers = new Proxy(
		CIQ.UI.Markers.prototype.removeMarkers,
		{
			apply(target, thisArg, args) {
				const { stx } = thisArg.context;
				const symbols = stx
					.getSymbols({ "exclude-studies": true })
					.map((s) => s.symbol);
				if (args[1] === "pinned_event")
					CIQ.PinnedMarker.removeByLabel(stx, args[1]);
				else Reflect.apply(target, thisArg, args);
				stx.pinnedMarkers.list = stx.pinnedMarkers.list.filter(
					(pt) =>
						!symbols.includes(pt.field) ||
						CIQ.xor(
							pt.marker.className === "CIQ.Marker.PinnedTooltip",
							args[1] === "pinned_tooltip"
						)
				);
				CIQ.PinnedMarker.store(stx);
			}
		}
	);
}
if (CIQ.Marker.Performance) {
	const originalFn = CIQ.Marker.Performance.prototype.positionPopUpNode;
	CIQ.Marker.Performance.prototype.positionPopUpNode = function (marker) {
		const { params } = marker,
			{ expand } = params.node;
		if (params.pinnedPosition) {
			if (expand.style.visibility === "hidden" && marker.tick)
				marker.createSliderMarker();
			expand.style.visibility = marker.tick === null ? "hidden" : "";
		}
		if (
			Object.values(params.pinnedPosition || {}).some((val) => val || val === 0)
		)
			expand.style.transform = "";
		else {
			expand.style.inset = "";
			originalFn.call(this, marker);
		}
	};
}
/**
 * Creates a small marker on the range selector.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @alias createSliderMarker
 * @memberof CIQ.Marker#
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.Marker.prototype.createSliderMarker = function () {
	if (this.sliderMarker) this.sliderMarker.remove();
	const div = document.createElement("div");
	div.className = "pinned-slider";
	this.sliderMarker = new CIQ.Marker({
		stx: this.params.stx.slider.slider,
		x: this.params.x,
		xPositioner: this.params.xPositioner,
		yPositioner: "on_candle",
		node: div
	});
};
/**
 * Makes an event marker pinnable.  See {@link CIQ.PinnedMarker} for details.
 * If you would like the marker subsystem to manage pinnable markers for you, you can set the `pinnable` flag to true for simple and performance markers:
 * 	`CIQ.Marker.Simple.prototype.pinnable = true;`
 * 	`CIQ.Marker.Performance.prototype.pinnable = true;`
 * The `pinnable` flag is read when a marker is created. If you change these flags to true, all new markers of the relevant type pinnable. However, if you then change that flag to false, existing markers will remain pinnable, as the flag is not reread. To turn off the pinnable feature for an existing pinned marker, you must either destroy and recreate this marker or change the `pinnable` flag at the instance level. as well as all markers created while the flag continues to be true.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {boolean} [isTooltip] If true this is a pinned tooltip, otherwise a pinned marker.
 *
 * @alias makePinnable
 * @memberof CIQ.Marker#
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.Marker.prototype.makePinnable = function (isTooltip) {
	const {
		observer,
		stxNodeCreator,
		params: { stx, field }
	} = this;
	const pushPinnedMarker = () => {
		stx.pinnedMarkers.list = stx.pinnedMarkers.list.filter(
			(m) => m.marker.node.params.id !== this.node.params.id
		);
		stx.pinnedMarkers.list.push({
			marker: this,
			field: field || stx.chart.symbol
		});
		this.store();
	};
	Object.entries(CIQ.PinnedMarker).forEach(
		([k, f]) => (this[k] = f.bind(this))
	);
	if (stxNodeCreator) {
		const { expand, node } = stxNodeCreator;
		let consolidated;
		if (expand) {
			consolidated = expand.querySelector("cq-consolidated");
			if (consolidated) consolidated.remove();
		}
		let closeCell = expand && expand.querySelector(".ciq-close");
		if (!closeCell) {
			const tr = document.createElement("tr");
			const contentCell = document.createElement("td");
			[...(expand || node).children].forEach((child) => {
				contentCell.appendChild(child);
			});
			tr.appendChild(contentCell);
			closeCell = document.createElement("td");
			closeCell.className = "ciq-icon ciq-close";
			closeCell.innerHTML = "Close Tooltip";
			tr.appendChild(closeCell);
			const table = document.createElement("table");
			table.appendChild(tr);
			if (!isTooltip) table.className = "pinned-event-marker";
			(expand || node).appendChild(table);
		}
		if (consolidated) expand.appendChild(consolidated);
		closeCell.removeEventListener("click", this.dismissClickFn);
		this.dismissClickFn = () => {
			stx.modalEnd();
			if (expand) stxNodeCreator.remove(this);
			else this.remove();
			["attached", "active"].forEach((prop) => {
				if (this[prop]) this[prop] = false;
			});
		};
		closeCell.addEventListener("click", this.dismissClickFn);
		const superRemove = stxNodeCreator.constructor.prototype.remove;
		stxNodeCreator.remove = (marker) => {
			if (superRemove) superRemove.call(stxNodeCreator, marker);
			if (marker.sliderMarker) marker.sliderMarker.remove();
			delete marker.params.pinnedPosition;
			const pinned = stx.pinnedMarkers.list.map((m) => m.marker);
			const index = pinned.indexOf(marker);
			if (index > -1) {
				if (marker.leavePinned) {
					stx.pinnedMarkers.list[index].placeholder = true;
					return;
				}
				stx.pinnedMarkers.list.splice(index, 1);
				marker.store();
			}
			stx.draw();
		};
		node.wasHighlighted = false;
		if (expand) {
			if (observer) observer.disconnect();
			this.observer = new MutationObserver((mutationList) => {
				for (const mutation of mutationList) {
					if (mutation.attributeName === "class") {
						const highlighted = mutation.target.classList.contains("highlight");
						if (highlighted && !node.wasHighlighted) {
							pushPinnedMarker();
							if (stx.slider) this.createSliderMarker();
						} else if (!highlighted && node.wasHighlighted) {
							delete this.params.pinnedPosition;
							if (stxNodeCreator.expand) stxNodeCreator.expand.style.inset = "";
							stxNodeCreator.remove(this);
							if (this.sliderMarker) this.sliderMarker.remove();
						}
						node.wasHighlighted = highlighted;
					}
				}
			});
			this.observer.observe(node, { attributes: true });
			if (node.classList.contains("highlight")) node.classList.add("highlight"); // force mutation
		} else {
			if (stx.slider) this.createSliderMarker();
			pushPinnedMarker();
		}
	} else {
		pushPinnedMarker();
	}
	this.makeDraggable();
	stx.draw();
};
/**
 * After the group marker is positioned, this function is called to position pinned expansions for markers in the group.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @alias position
 * @memberof CIQ.Marker.Group#
 * @version ChartIQ Extras Package
 * @since 9.4.0
 */
CIQ.Marker.Group.prototype.position = function () {
	const markers = this.getMarkersInGroup();
	const { stx } = this.params;
	markers.forEach((groupedMarker) => {
		if (!groupedMarker.groupExpansionEl) return;
		const expand =
			groupedMarker.groupExpansionEl.querySelector(".stx-marker-expand");
		if (expand.closest(".ciq-expansion-holder")) return;
		this.positionPinnedExpansion(stx, groupedMarker, expand);
		const { pinnedPosition } = groupedMarker.params;
		if (!pinnedPosition || !pinnedPosition.candleOffset || !pinnedPosition.y)
			return;
		CIQ.PinnedMarker.drawStem(groupedMarker, expand);
	});
};
/**
 * Position a pinned expansion for a marker in a group.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {CIQ.Marker} marker The marker to position.
 *
 * @alias positionPinnedExpansion
 * @memberof CIQ.Marker.Group#
 * @version ChartIQ Extras Package
 * @since 9.4.0
 */
CIQ.Marker.Group.prototype.positionPinnedExpansion = function (
	stx,
	marker,
	expand
) {
	const { node } = this;
	const mparams = marker.params;
	const pinnedPosition = mparams.pinnedPosition || {};
	const candleOffset = pinnedPosition.candleOffset || 0;
	let expandPosition =
		(expand && mparams.pinnedPosition) || mparams.expandPosition;
	let panel =
		(mparams.panelName && stx.panels[mparams.panelName]) || stx.chart.panel;
	let yAxis = mparams.yAxis || panel.yAxis;
	let height = mparams.chartContainer ? stx.height : yAxis.bottom;
	CIQ.efficientDOMUpdate(
		expand.style,
		"left",
		CIQ.stripPX(getComputedStyle(node).width) +
			candleOffset * stx.layout.candleWidth +
			"px"
	);
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
	}
};
/**
 * Pinned tooltip HTML marker class.  Do not call this constructor directly. Instead, use the {@link CIQ.Marker.PinnedTooltip.create} function to call this.
 *
 * Requires **"js/extras/pinnedMarkers.js"**, which is included in the ChartIQ Extras Package.
 *
 * @name CIQ.Marker.PinnedTooltip
 * @constructor
 * @param {Object} params Parameters to describe the marker
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.Marker.PinnedTooltip = function (params) {
	if (!this.className) this.className = "CIQ.Marker.PinnedTooltip";
	CIQ.extend(params, {
		label: "pinned_tooltip",
		xPositioner: "date"
	});
	params.x = new Date(params.x);
	CIQ.Marker.call(this, params);
};
CIQ.inheritsFrom(CIQ.Marker.PinnedTooltip, CIQ.Marker, false);
/**
 * Creates a tooltip in the form of a marker when a tap occurs on a plot which is highlighted.
 * The tooltip can contain all the data relevant to the curve (Close, Open, High, Low) and persists in session storage.
 * It will contain data for all series found on the panel.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {Object} params
 * @param {CIQ.ChartEngine} params.stx Chart engine instance.
 * @param {string} [params.field] Plot field name. This is the id of the series the marker is attached to.  Leave blank for main series.
 * @param {Object} params.record Data segment record for the marker's position.
 * @param {CIQ.ChartEngine.Panel} [params.panel] Panel on which marker is found.  Defaults to chart panel.
 * @param {Date} params.x Date where marker is to be oriented.
 * @param {number} params.y Value where marker is to be oriented.
 * @param {number} [params.candleOffset] Multiple of candles left or right of the x value
 * @return {CIQ.Marker.PinnedTooltip} Tooltip marker if created, otherwise undefined
 *
 * @memberof CIQ.Marker.PinnedTooltip
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.Marker.PinnedTooltip.create = function ({
	stx,
	field,
	record,
	panel,
	x,
	y,
	candleOffset
}) {
	const formatNumber = (number) => {
		if (!number && number !== 0) return "";
		if (number.constructor == Number) {
			var intl = stx.internationalizer;
			if (intl) {
				const l = intl.priceFormatters.length;
				let decimalPlaces = CIQ.countDecimals(number);
				if (decimalPlaces >= l) decimalPlaces = l - 1;
				return intl.priceFormatters[decimalPlaces].format(number);
			}
			return number.toFixed(stx.chart.decimalPlaces);
		}
		return number;
	};
	const symbolKey = field || stx.chart.symbol;
	const result = [];
	[stx.chart.symbol, ...Object.keys(stx.chart.series)]
		.filter((symbol) => {
			if (!this.includeAllSeries && symbol !== symbolKey) return false;
			let p = stx.chart.panel;
			const series = stx.chart.series[symbol];
			if (series) {
				if (series.parameters.isEvent) return false;
				p = stx.panels[series.parameters.panel];
			}
			return p === panel;
		})
		.sort((a, b) => {
			if (a === symbolKey) return -1;
			if (b === symbolKey) return 1;
			return a < b ? -1 : 1;
		})
		.forEach((symbol) => {
			result.push(this.createRecord(stx, symbol, record));
		});
	if (result.length) {
		const marker = new this({
			stx,
			x,
			field,
			pinnedPosition: { y, candleOffset },
			node: this.createNode({
				formatNumber,
				result
			})
		});
		if (y || y === 0) marker.params.yPositioner = "value";
		if (!marker.node.params) marker.node.params = {};
		marker.node.params.id = Date.now();
		marker.makePinnable(true);
		return marker;
	}
};
/**
 * Creates a DOM node for the marker.  The node is of type "PinnedTooltip".
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {function} formatNumber Formatting function for the quotes.
 * @param {Object[]} result Array of results generated by {@link CIQ.Marker.PinnedTooltip.createRecord}.
 * @return {Object} A PinnedTooltipNodeCreator object containing a DOM node.
 *
 * @memberof CIQ.Marker.PinnedTooltip
 * @version ChartIQ Extras Package
 * @private
 * @since 9.1.0
 */
CIQ.Marker.PinnedTooltip.createNode = function ({ formatNumber, result }) {
	if (!result[0]) return;
	const table = document.createElement("table");
	const tr = document.createElement("tr");
	const th = document.createElement("th");
	const td = document.createElement("td");
	if (this.layout === "rows") {
		const row = tr.cloneNode();
		["Symbol", "Close", "Open", "High", "Low"].forEach((field) => {
			if (result.some((r) => field in r)) {
				const cell = th.cloneNode();
				cell.innerHTML =
					field === "Symbol" ? CIQ.mmddhhmm(result[0].DT) : field;
				row.appendChild(cell);
			}
		});
		table.appendChild(row);
		result.forEach((sym) => {
			const row = tr.cloneNode();
			["Symbol", "Close", "Open", "High", "Low"].forEach((field) => {
				if (field in sym) {
					const cell = (field === "Symbol" ? th : td).cloneNode();
					if (field === "Symbol") cell.style.textAlign = "left";
					cell.innerHTML = formatNumber(sym[field]);
					row.appendChild(cell);
				}
			});
			table.appendChild(row);
		});
	} else {
		["Symbol", "Close", "Open", "High", "Low"].forEach((field) => {
			if (result.some((r) => field in r)) {
				const row = tr.cloneNode();
				const cell = th.cloneNode();
				cell.style.textAlign = "left";
				cell.innerHTML =
					field === "Symbol" ? CIQ.mmddhhmm(result[0].DT) : field;
				row.appendChild(cell);
				result.forEach((sym) => {
					const cell = (field === "Symbol" ? th : td).cloneNode();
					cell.innerHTML = formatNumber(sym[field]);
					row.appendChild(cell);
				});
				table.appendChild(row);
			}
		});
	}
	const div = document.createElement("div");
	div.className = "pinned-tooltip";
	div.appendChild(table);
	document.body.appendChild(div);
	return new PinnedTooltipNodeCreator({
		nodeType: "PinnedTooltip",
		node: div
	});
};
/**
 * Creates a "record" of data to be placed in the tooltip text.
 * A record consists of the symbol, date, Close, and optionally High, Open and Low.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {CIQ.ChartEngine} stx Chart engine instance.
 * @param {string} symbol Plot field name. This is the id of the series the marker is attached to.
 * @param {Object} record Data segment record for the marker's position.
 * @return {object} A record to be pushed into an array for {@link CIQ.Marker.PinnedTooltip.createNode}.
 *
 * @memberof CIQ.Marker.PinnedTooltip
 * @version ChartIQ Extras Package
 * @private
 * @since 9.1.0
 */
CIQ.Marker.PinnedTooltip.createRecord = function (stx, symbol, record) {
	let _record = record;
	if (_record) {
		if (symbol in stx.chart.series) {
			symbol = stx.chart.series[symbol].parameters.symbol;
			_record = _record[symbol] || { DT: record.DT };
		}
		if (_record) {
			const {
				display,
				parameters: { chartType }
			} = stx.getSeries({ symbol })[0] || {
				display: stx.chart.symbol,
				parameters: {
					chartType:
						stx.layout.chartType === "ohlc"
							? stx.layout.aggregationType
							: stx.layout.chartType
				}
			};
			const {
				DT,
				Close = "NA",
				Open = "NA",
				High = "NA",
				Low = "NA"
			} = _record;
			return CIQ.Renderer.produce(chartType, {}).highLowBars
				? { Symbol: display, Close, Open, High, Low, DT }
				: { Symbol: display, Close, DT };
		}
	}
};
/**
 * Controls whether the tooltip can be pinned.
 * Use an object to enable pinned tooltips based on plot type (series or study). Use a boolean to enable them unconditionally. (See examples.)
 *
 * NOTE: currently only series plot is supported.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @type {boolean|Object}
 *
 * @memberof CIQ.Marker.PinnedTooltip
 * @since 9.1.2
 * @version ChartIQ Extras Package
 * @example <caption>Universally allowed</caption>
 * CIQ.Marker.PinnedTooltip.enable = true;
 * @example <caption>Universally disallowed</caption>
 * CIQ.Marker.PinnedTooltip.enable = false;
 * @example <caption>Allowed for series plots only</caption>
 * CIQ.Marker.PinnedTooltip.enable = {
 *	series: true
 * };
 */
CIQ.Marker.PinnedTooltip.enable = {
	series: true
};
/**
 * Layout of tooltip.
 * - `columns`: Each series appears in a column on the tooltip, with the fields appearing one per row.
 * - `rows`: Each field appears as a column on the tooltip, with the series appearing one per row.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @example <caption>Columns</caption>
 * |-----------------------------|
 * |          IBM     GE    MSFT |
 * | Close      3      4       5 |
 * | Open       4      5       6 |
 * | High       6      7       8 |
 * | Low        1      2       3 |
 * |-----------------------------|
 *
 * @example <caption>Rows</caption>
 * |------------------------------------|
 * |        Close   Open    High    Low |
 * | IBM        3      4       6      1 |
 * | GE         4      5       7      2 |
 * | MSFT       5      6       8      3 |
 * |------------------------------------|
 *
 * @type {string}
 *
 * @memberof CIQ.Marker.PinnedTooltip
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.Marker.PinnedTooltip.layout = "columns";
/**
 * Controls whether the other series appearing on the panel, besides the one clicked on, are included in the tooltip.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @type {boolean}
 *
 * @memberof CIQ.Marker.PinnedTooltip
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.Marker.PinnedTooltip.includeAllSeries = true;
/**
 *
 * `CIQ.PinnedMarker` is a namespace containing functions required to make a marker "pinnable".  Pinnable markers have the following characteristics:
 * - They can be dragged
 * - They draw a stem from themselves to the point of the plot to which they are attached
 * - They are closed from a close button (for example, an X in the corner)
 * - They can persist in storage
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @namespace
 * @name CIQ.PinnedMarker
 * @since 9.1.0
 * @version ChartIQ Extras Package
 */
CIQ.PinnedMarker = function () {};
/**
 * Defines a storage constructor.
 * This defaults to a {@link CIQ.NameValueStore} constructor.  It can be customized by implementing the instance functions defined in {@link CIQ.NameValueStore}.
 * If storage is not desired, set to null.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @example <caption>No storage</caption>
 * CIQ.PinnedMarker.NameValueStore = null;
 *
 * @constructor
 * @name CIQ.PinnedMarker.NameValueStore
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.PinnedMarker.NameValueStore = function () {};
/**
 * Draws a stem from the bar that the marker is attached, to the marker itself.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {CIQ.Marker} marker The marker to draw stem for.
 * @param {HTMLElement} [expandNode] The expansion element to position.  If not provided, the node will be selected from the marker.stxNodeCreator.expand property.
 *
 * @memberof CIQ.PinnedMarker
 * @version ChartIQ Extras Package
 * @since 9.1.0
 * @since 9.4.0 - Added expandNode parameter to allow for the stem to be drawn from an alternative expansion node.
 */
CIQ.PinnedMarker.drawStem = function (marker, expandNode) {
	const {
		node,
		params: mparams,
		dragOrigin = marker &&
			CIQ.Marker.beingDragged &&
			CIQ.Marker.beingDragged.marker === marker &&
			CIQ.Marker.beingDragged.marker.dragOrigin,
		stxNodeCreator,
		tick
	} = (marker &&
		marker.hidden &&
		marker.params.stx.markerHelper.groupMap[marker.groupKey].groupMarker) ||
	this;
	if (!tick && tick !== 0) return;
	if (!expandNode) {
		expandNode = stxNodeCreator && stxNodeCreator.expand;
		if (expandNode && !node.classList.contains("highlight")) return;
	}
	const groupExpansionHolder =
		stxNodeCreator && stxNodeCreator.expansionHolder
			? stxNodeCreator.expansionHolder
			: {};
	const { stx } = mparams;
	const ctx = stx.chart.context;
	const panel = stx.panels[mparams.panelName];
	if (!panel || panel.hidden) return;
	const yAxis =
		mparams.yAxis || stx.getYAxisByField(panel, mparams.field) || panel.yAxis;
	let quote = stx.chart.dataSet[tick];
	let getPixel = stx.pixelFromPrice.bind(stx);
	if (
		quote.transform &&
		mparams.field in quote.transform &&
		yAxis === stx.chart.yAxis
	) {
		quote = quote.transform;
		getPixel = stx.pixelFromTransformedValue.bind(stx);
	}
	if (quote && mparams.field) quote = quote[mparams.field];
	if (typeof quote === "number") quote = { Close: quote };
	else if (!quote) return;
	const myNode = expandNode || node; //TODO: need to get a reference to the expansion tied to the marker.
	const {
		offsetLeft: myOffsetLeft,
		offsetTop: myOffsetTop,
		offsetWidth: myOffsetWidth,
		offsetHeight: myOffsetHeight
	} = myNode;
	const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = expandNode
		? node
		: {};
	const { offsetLeft: groupOffsetLeft, offsetWidth: groupOffsetWidth } =
		groupExpansionHolder;
	const groupOffsetHeight = groupExpansionHolder.offsetHeight
		? offsetHeight - 5
		: 0; // Add expansion height to a group marker because it's not baked into the element height.
	const centerX =
		(dragOrigin
			? dragOrigin.x
			: stx.chart.left -
			  (groupOffsetWidth || 0) -
			  (groupOffsetLeft || 0) +
			  (offsetLeft || 0) +
			  myOffsetLeft) +
		myOffsetWidth / 2;
	const centerY =
		(dragOrigin
			? dragOrigin.y
			: panel.top + (groupOffsetHeight || 0) + (offsetTop || 0) + myOffsetTop) +
		myOffsetHeight / 2;
	const candleX =
		expandNode && node.isConnected
			? stx.chart.left + offsetLeft + offsetWidth / 2
			: stx.pixelFromTick(tick);
	const candleY =
		expandNode && node.isConnected
			? panel.top + offsetTop + offsetHeight / 2
			: getPixel(quote.Close, panel, yAxis);
	const style = stx.canvasStyle("pinned-stem");
	stx.startClip(panel.name);
	ctx.rect(
		centerX - myOffsetWidth / 2,
		centerY - myOffsetHeight / 2,
		myOffsetWidth,
		myOffsetHeight
	);
	ctx.clip("evenodd");
	ctx.beginPath();
	ctx.strokeStyle = style.color;
	ctx.lineWidth = CIQ.stripPX(style.width);
	ctx.moveTo(centerX, centerY);
	ctx.lineTo(candleX, candleY);
	ctx.stroke();
	stx.endClip();
};
/**
 * After marker is positioned, this function is called to draw the stem and update storage if a hidden marker is now visible.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {CIQ.Marker} marker The marker to position.
 *
 * @memberof CIQ.PinnedMarker
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.PinnedMarker.position = function (marker) {
	let myMarker = marker || this;
	if (myMarker.tick !== null && !myMarker.stxNodeCreator) {
		// We've discovered a tooltip that had been out of range
		const { stx, x, y, candleOffset, field, pinnedPosition } = myMarker.params;
		const sym = field === stx.chart.symbol ? undefined : field;
		myMarker.remove();
		stx.pinnedMarkers.list = stx.pinnedMarkers.list.filter(
			(m) => m.marker !== myMarker
		);
		if (
			!sym ||
			stx.getSeries({ symbol: sym })[0] ||
			stx.getStudies({ output: sym })[0]
		) {
			if (myMarker.className === "CIQ.Marker.PinnedTooltip") {
				myMarker = CIQ.Marker.PinnedTooltip.create({
					stx,
					field: sym,
					record: stx.chart.dataSet[myMarker.tick],
					panel: stx.getPanelByField(field) || stx.chart.panel,
					x,
					y,
					candleOffset
				});
				myMarker.params.pinnedPosition = pinnedPosition;
			}
		}
	}
	if (
		(CIQ.Marker.beingDragged && CIQ.Marker.beingDragged.marker === myMarker) ||
		(Object.values(myMarker.params.pinnedPosition || {}).some(
			(val) => val || val === 0
		) &&
			myMarker.attached !== false)
	)
		myMarker.drawStem();
};
/**
 * Removes all markers currently pinned to any plots on the screen.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {CIQ.ChartEngine} stx Chart engine instance.
 * @param {string} label Should always be "pinned_tooltip" or "pinned_event".
 *
 * @memberof CIQ.PinnedMarker
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.PinnedMarker.removeByLabel = function (stx, label) {
	stx.pinnedMarkers.list.slice(0).forEach((pt) => {
		const { marker } = pt;
		const isTooltip = marker.className === "CIQ.Marker.PinnedTooltip";
		if (label === "pinned_tooltip" && !isTooltip) return;
		if (label === "pinned_event" && isTooltip) return;
		const { stxNodeCreator = {}, sliderMarker } = marker;
		if (isTooltip) stx.removeFromHolder(marker);
		else if (stxNodeCreator.remove) stxNodeCreator.remove(marker);
		stx.pinnedMarkers.list = stx.pinnedMarkers.list.filter(
			(m) => m.marker !== marker
		);
		if (sliderMarker) sliderMarker.remove();
	});
	if (!this.NameValueStore) return;
	const nameValueStore = new this.NameValueStore();
	const key = this.getChartKey(stx, "pinned_tooltip");
	nameValueStore.get(key, (err, data) => {
		if (err || !data) return;
		nameValueStore.set(
			key,
			data.filter(
				(pt) =>
					pt.fld !== stx.chart.symbol && !stx.getSeries({ symbol: pt.fld })[0]
			)
		);
	});
	this.store(stx);
	stx.draw();
};
/**
 * Restores markers to the chart if found in storage.
 * This will restore markers when a page is reloaded.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {CIQ.ChartEngine} stx Chart engine instance.
 *
 * @memberof CIQ.PinnedMarker
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.PinnedMarker.restore = function (stx) {
	if (!this.NameValueStore) return;
	if (!stx.chart.dataSet) {
		setTimeout(() => this.restore(stx), 1000);
		return;
	}
	stx.pinnedMarkers.list.forEach((pt) => {
		stx.pinnedMarkers.list = stx.pinnedMarkers.list.filter(
			(m) => m.marker !== pt.marker
		);
		if (pt.marker.sliderMarker) pt.marker.sliderMarker.remove();
		if (pt.marker.className === "CIQ.Marker.PinnedTooltip")
			stx.removeFromHolder(pt.marker);
		else {
			const { stxNodeCreator } = pt.marker;
			if (stxNodeCreator && stxNodeCreator.constructor.prototype.remove)
				stxNodeCreator.constructor.prototype.remove(pt.marker);
		}
	});
	const nameValueStore = new this.NameValueStore();
	const key = this.getChartKey(stx, "pinned_markers");
	nameValueStore.get(key, (err, data) => {
		if (err || !data) return;
		const foundMarkers = [];
		data.forEach((pt) => {
			const type = pt.typ,
				label = pt.lbl,
				id = pt.id,
				x = pt.x;
			let record;
			switch (pt.xp) {
				case "date":
					record = stx.chart.dataSet[stx.tickFromDate(new Date(x))];
					break;
				case "tick":
					record = stx.chart.dataSet[x];
					break;
				case "bar":
					record = stx.chart.dataSegment[x];
					break;
				case "master":
					record = stx.chart.masterData[x];
					break;
			}
			const panel = stx.getPanelByField(pt.fld) || stx.chart.panel;
			const sym = pt.fld === stx.chart.symbol ? undefined : pt.fld;
			if (
				!sym ||
				stx.getSeries({ symbol: sym })[0] ||
				stx.getStudies({ output: sym })[0]
			) {
				if (type === "CIQ.Marker.PinnedTooltip") {
					CIQ.Marker.PinnedTooltip.create({
						stx,
						field: sym,
						record,
						panel,
						x,
						y: pt.v,
						candleOffset: pt.co
					});
					return;
				}
				const arr = stx.getMarkerArray("label", label);
				if (arr.length)
					arr
						.filter((marker) => marker.className === type)
						.forEach((marker) => {
							if (marker.node.params && marker.node.params.id === id) {
								if (!id) return;
								if (marker.params.pinnedPosition) {
									if (!marker.node.classList.contains("highlight")) {
										marker.node.wasHighlighted = false;
										foundMarkers.push(marker);
									}
									return;
								}
								if (marker.attached) marker.attached = marker.active = false;
								marker.params.pinnedPosition = { y: pt.v, candleOffset: pt.co };
								foundMarkers.push(marker);
							}
						});
			}
			stx.pinnedMarkers.list.push({
				field: pt.fld,
				marker: {
					chart: {
						name: stx.chart.name
					},
					className: type,
					node: {
						params: { id },
						remove: () => {}
					},
					params: {
						label: pt.lbl,
						x,
						xPositioner: pt.xp,
						pinnedPosition: { y: pt.v, candleOffset: pt.co }
					}
				},
				placeholder: true
			});
			if (!watchedLabels.includes(label)) {
				if (!stx.markers[label]) stx.markers[label] = [];
				Object.defineProperty(stx.markers[label], "push", {
					value: function () {
						Array.prototype.push.apply(this, arguments);
						if (
							stx.pinnedMarkers.list
								.filter((pt) => pt.placeholder)
								.map(
									(pt) =>
										`${pt.marker.params.label}|${
											pt.marker.node.params && pt.marker.node.params.id
										}`
								)
								.includes(
									`${arguments[0].params.label}|${
										arguments[0].node.params && arguments[0].node.params.id
									}`
								)
						)
							CIQ.PinnedMarker.restore(stx);
						return arguments[arguments.length - 1];
					}
				});
				watchedLabels.push(pt.lbl);
			}
		});
		foundMarkers.forEach((m) => m.click({}));
		if (foundMarkers.length < stx.pinnedMarkers.list.length)
			CIQ.PinnedMarker.store(stx);
		stx.draw();
	});
};
/**
 * Stores a marker in storage, if available.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {CIQ.ChartEngine} stx The chart engine instance.
 *
 * @memberof CIQ.PinnedMarker
 * @version ChartIQ Extras Package
 * @since 9.1.0
 */
CIQ.PinnedMarker.store = function (stx) {
	if (!this.NameValueStore) return;
	const nameValueStore = new this.NameValueStore();
	const exports = [];
	const myStx = stx || this.params.stx;
	myStx.pinnedMarkers.list.forEach((pt) => {
		const { className, params, node } = pt.marker;
		exports.push({
			typ: className,
			lbl: params.label,
			fld: pt.field,
			x: params.x,
			xp: params.xPositioner,
			v: params.pinnedPosition && params.pinnedPosition.y,
			co: params.pinnedPosition && params.pinnedPosition.candleOffset,
			id: node && node.params ? node.params.id : undefined
		});
	});
	const key = this.getChartKey(myStx, "pinned_markers");
	nameValueStore.set(key, exports);
};
/**
 * Returns chartId-specific key to be used with nameValueStore.
 *
 * **Requires "js/extras/pinnedMarkers.js"**
 *
 * @param {CIQ.ChartEngine} stx Chart engine instance.
 * @param {string} key Should always be "pinned_tooltip" or "pinned_event".
 * @return {string} Chart id modified key
 *
 * @memberof CIQ.PinnedMarker
 * @version ChartIQ Extras Package
 * @since 9.4.0
 */
CIQ.PinnedMarker.getChartKey = function (stx, key) {
	const chartId = CIQ.getFromNS(stx, "uiContext.config.chartId", "");
	return `${key}${chartId ? "_" + chartId : ""}`;
};
CIQ.inheritsFrom(CIQ.PinnedMarker.NameValueStore, CIQ.NameValueStore, false);
const PinnedTooltipNodeCreator = function (params) {
	Object.assign(this, params);
};
CIQ.inheritsFrom(PinnedTooltipNodeCreator, CIQ.Marker.NodeCreator, false);
const watchedLabels = [];
