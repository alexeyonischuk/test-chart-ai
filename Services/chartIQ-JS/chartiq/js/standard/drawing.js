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


import { CIQ as _CIQ, timezoneJS as _timezoneJS } from "../../js/chartiq.js";


let __js_standard_drawing_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;
var timezoneJS =
	typeof _timezoneJS !== "undefined" ? _timezoneJS : _exports.timezoneJS;

/**
 * READ ONLY. Map of registered drawing tools and their constructors. Populated via lazy eval, so it only contains tools which were used so far.
 * @type object
 * @default
 * @alias drawingTools
 * @memberof CIQ.ChartEngine
 * @static
 */
CIQ.ChartEngine.drawingTools = {};

/**
 * Each {@link CIQ.ChartEngine} object clones this object template and uses the copy to store the
 * settings for the active drawing tool. The default settings can be changed by overriding these
 * defaults on your own files.
 *
 * See the [Creating a custom drawing toolbar]{@tutorial Custom Drawing Toolbar} tutorial for
 * details on how to use this template to replace the standard drawing toolbar.
 *
 * This object can be extended to support additional drawing tools; for instance, note the extensive
 * customization capabilities for
 * <a href="CIQ.ChartEngine.html#.currentVectorParameters%5B%60fibonacci%60%5D">fibonacci</a>.
 *
 * @type object
 * @memberof CIQ.ChartEngine
 * @static
 */
CIQ.ChartEngine.currentVectorParameters = {
	/**
	 * The type of drawing to activate.
	 *
	 * See the list of classes in {@link CIQ.Drawing} for available drawing types. Use
	 * {@link CIQ.ChartEngine#changeVectorType} to activate.
	 *
	 * @type string
	 * @alias CIQ.ChartEngine.currentVectorParameters[`vectorType`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 */
	vectorType: null,
	/**
	 * Line pattern.
	 * <br><B>Valid values for pattern: solid, dotted, dashed, none</B>
	 * <br>Not all parameters/values are valid on all drawings. See the specific `reconstruct` method for your desired drawing for more details(Example: {@link CIQ.Drawing.horizontal#reconstruct})
	 * @type string
	 * @default
	 * @alias CIQ.ChartEngine.currentVectorParameters[`pattern`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 */
	pattern: "solid",
	/**
	 * Line width.
	 * <br>Not all parameters/values are valid on all drawings. See the specific `reconstruct` method for your desired drawing for more details (Example: {@link CIQ.Drawing.horizontal#reconstruct}).
	 * @type number
	 * @default
	 * @alias CIQ.ChartEngine.currentVectorParameters[`lineWidth`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 */
	lineWidth: 1,
	/**
	 * Fill color.
	 * <br>Not all parameters/values are valid on all drawings. See the specific `reconstruct` method for your desired drawing for more details (Example: {@link CIQ.Drawing.horizontal#reconstruct}).
	 * @type string
	 * @default
	 * @alias CIQ.ChartEngine.currentVectorParameters[`fillColor`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 */
	fillColor: "#7DA6F5",
	/**
	 * Line color.
	 * <br>Not all parameters/values are valid on all drawings. See the specific `reconstruct` method for your desired drawing for more details (Example: {@link CIQ.Drawing.horizontal#reconstruct}).
	 * @type string
	 * @default
	 * @alias CIQ.ChartEngine.currentVectorParameters[`currentColor`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 */
	currentColor: "auto",
	/**
	 * Axis label.
	 * Set to `true` to display a label on the x-axis.
	 * <br>Not all parameters/values are valid on all drawings. See the specific `reconstruct` method for your desired drawing for more details(Example: {@link CIQ.Drawing.horizontal#reconstruct})
	 * @type string
	 * @default
	 * @alias CIQ.ChartEngine.currentVectorParameters[`axisLabel`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 */
	axisLabel: true,
	/**
	 * Show callout.
	 * Set to `true` to display a callout on a drawing.
	 * <br>Not all parameters/values are valid on all drawings. See the specific `reconstruct` method for your desired drawing for more details (Example: {@link CIQ.Drawing.trendline#reconstruct})
	 * @type boolean
	 * @default
	 * @alias CIQ.ChartEngine.currentVectorParameters[`showCallout`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 * @since 8.8.0
	 */
	showCallout: false,
	/**
	 * Always Magnetize
	 * Set to `true` to magnetize regardless of ChartEngine.preferences.magnetize setting
	 * <br>Not all parameters/values are valid on all drawings. See the specific `reconstruct` method for your desired drawing for more details (Example: {@link CIQ.Drawing.trendline#reconstruct})
	 * @type boolean
	 * @default
	 * @alias CIQ.ChartEngine.currentVectorParameters[`alwaysMagnetize`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 * @since 8.9.0
	 */
	alwaysMagnetize: false,
	/**
	 * Span panels.
	 * Set to `true` to render in all chart panels.
	 * <br>Not all parameters/values are valid on all drawings. See the specific `reconstruct` method for your desired drawing for more details (Example: {@link CIQ.Drawing.trendline#reconstruct}).
	 * @type boolean
	 * @default
	 * @alias CIQ.ChartEngine.currentVectorParameters[`spanPanels`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 * @since 8.9.0
	 */
	spanPanels: false,
	/**
	 * Fibonacci settings.
	 * See {@link CIQ.Drawing.fibonacci#reconstruct} `parameters` object for valid options.
	 *
	 * Use `fibonacci.fibsAlreadySet=true;` to maintain custom levels. See {@link CIQ.Drawing.fibonacci#initializeSettings} for more details.
	 * @type object
	 * @alias CIQ.ChartEngine.currentVectorParameters[`fibonacci`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 * @example
	 * fibonacci:{
	 *     trend:{color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}},
	 *     fibs:[
	 *         {level:-0.786, color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}},
	 *         {level:-0.618, color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}, display: true},
	 *         {level:-0.382, color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}, display: true},
	 *         {level:0, color:"auto", parameters:{pattern:"solid", lineWidth:1}, display: true},
	 *         {level:0.382, color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}, display: true},
	 *         {level:0.618, color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}, display: true},
	 *         {level:0.786, color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}},
	 *         {level:0.5, color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}, display: true},
	 *         {level:1, color:"auto", parameters:{pattern:"solid", lineWidth:1}, display: true},
	 *         {level:1.382, color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}, display: true},
	 *         {level:1.618, color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}, display: true}
	 *     ],
	 *     extendLeft: false,
	 *     printLevels: true, // display the % levels to the right of the drawing
	 *     printValues: false, // display the values on the y-axis
	 *     timezone:{color:"auto", parameters:{pattern:"solid", opacity:0.25, lineWidth:1}}
	 * }
	 * @since
	 * - 3.0.9 Added 0.786 and -0.786 levels.
	 * - 5.2.0 Added 1.272 level.
	 */
	fibonacci: {
		trend: {
			color: "auto",
			parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
		},
		fibs: [
			{
				level: -0.786,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
			},
			{
				level: -0.618,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 },
				display: true
			},
			{
				level: -0.5,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
			},
			{
				level: -0.382,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 },
				display: true
			},
			{
				level: -0.236,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
			},
			{
				level: 0,
				color: "auto",
				parameters: { pattern: "solid", lineWidth: 1 },
				display: true
			},
			{
				level: 0.236,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
			},
			{
				level: 0.382,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 },
				display: true
			},
			{
				level: 0.5,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 },
				display: true
			},
			{
				level: 0.618,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 },
				display: true
			},
			{
				level: 0.786,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
			},
			{
				level: 1,
				color: "auto",
				parameters: { pattern: "solid", lineWidth: 1 },
				display: true
			},
			{
				level: 1.272,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
			},
			{
				level: 1.382,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 },
				display: true
			},
			{
				level: 1.618,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 },
				display: true
			},
			{
				level: 2.618,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
			},
			{
				level: 4.236,
				color: "auto",
				parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
			}
		],
		extendLeft: false,
		printLevels: true,
		printValues: false,
		timezone: {
			color: "auto",
			parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
		}
	},
	/**
	 * Volume profile drawing settings.
	 *
	 * @type object
	 * @alias CIQ.ChartEngine.currentVectorParameters[`volumeProfile`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 * @example
	 * volumeProfile:{
	 * 		priceBuckets: 30
	 * }
	 * @since 8.4.0
	 */
	volumeProfile: {
		priceBuckets: 30
	},
	/**
	 * Annotation settings.
	 * @type object
	 * @alias CIQ.ChartEngine.currentVectorParameters[`annotation`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 * @example
	 *	annotation:{
	 *		font:{
	 *			style:null,
	 *			size:null,	// override .stx_annotation default
	 *			weight:null, // override .stx_annotation default
	 *			family:null // override .stx_annotation default
	 *		}
	 *	}
	 */
	annotation: {
		font: {
			style: null,
			size: null, // override .stx_annotation default
			weight: null, // override .stx_annotation default
			family: null // override .stx_annotation default
		}
	},
	/**
	 * Measurement Line settings.
	 * @type object
	 * @alias CIQ.ChartEngine.currentVectorParameters[`measurementline`]
	 * @memberof CIQ.ChartEngine.currentVectorParameters
	 * @example
	 * measurementline: {
	 * 	calloutOnHover: false,
	 * 	displayGroups: {
	 * 		bars: true,
	 * 		delta: true,
	 * 		annpercent: false,
	 * 		totreturn: false,
	 * 		volume: false,
	 * 		studies: false
	 * 	}
	 * }
	 * @since 8.9.0
	 */
	measurementline: {
		calloutOnHover: false,
		displayGroups: {
			bars: true,
			delta: true,
			annpercent: false,
			totreturn: false,
			volume: false,
			studies: false
		}
	}
};

/**
 * Registers a drawing tool. This is typically done using lazy eval.
 * @private
 * @param  {string} name Name of drawing tool.
 * @param  {function} func Constructor for drawing tool.
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.registerDrawingTool = function (name, func) {
	CIQ.ChartEngine.drawingTools[name] = func;
};

/**
 * Reset vector type to empty string and, if available, set the drawing palette to "no tool".
 * Dispatches a "drawingComplete" event.
 * @private
 * @param  {CIQ.ChartEngine} stx The chart object.
 * @memberof CIQ.ChartEngine
 * @static
 */
CIQ.ChartEngine.completeDrawing = function (stx) {
	if (!stx || !stx.activeDrawing) return;
	// Store a reference to the activeDrawing. Some activeDrawings (ex. callout) are cleared in the tool change.
	const drawing = stx.activeDrawing;
	if (!stx.keepDrawingToolSelected) {
		if (stx.drawingContainer && stx.drawingContainer.tool) {
			stx.drawingContainer.tool({ node: null }, "notool");
		} else {
			stx.changeVectorType("");
		}
	}
	// Dispatch a drawingComplete event
	stx.dispatch("drawingComplete", { stx, drawing });
};

/**
 * Determines if a drawing tool remains selected after use. When false, the "notool" tool is automatically selected after a shape is drawn.
 * @type boolean
 * @default
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.prototype.keepDrawingToolSelected = false;

/**
 * Given an HTML element, this allows the chart container to keep track of its own drawing container.
 * where appropriate.
 * @param {object} htmlElement The HTML element for the chart container.
 * @memberof CIQ.ChartEngine
 * @example
 *	var stxx=new CIQ.ChartEngine({container:document.querySelector(".chartContainer"), preferences:{labels:false, currentPriceLine:true, whitespace:0}});
 *	stxx.setDrawingContainer(document.querySelector('cq-drawing-settings'));
 * @since 6.0.0
 */
CIQ.ChartEngine.prototype.setDrawingContainer = function (htmlElement) {
	this.drawingContainer = htmlElement;
};

/**
 * Exports (serializes) all of the drawings on the chart(s) so that they can be saved to an external database and later imported with {@link CIQ.ChartEngine#importDrawings}.
 * @see {@link CIQ.ChartEngine#importDrawings}
 * @return {array} An array of serialized objects representing each drawing.
 * @memberof CIQ.ChartEngine
 * @since 3.0.0 Replaces `serializeDrawings`.
 */
CIQ.ChartEngine.prototype.exportDrawings = function () {
	var arr = [];
	for (var i = 0; i < this.drawingObjects.length; i++) {
		arr.push(this.drawingObjects[i].serialize());
	}
	return arr;
};

/**
 * Causes all drawings to delete themselves. External access should be made through @see CIQ.ChartEngine.prototype.clearDrawings
 * @param {boolean} deletePermanent Set to `false` to retain permanent drawings.
 * @private
 * @memberof CIQ.ChartEngine
 * @since 6.0.0 Added `deletePermanent` parameter.
 */
CIQ.ChartEngine.prototype.abortDrawings = function (deletePermanent) {
	if (deletePermanent !== false) deletePermanent = true;
	for (var i = this.drawingObjects.length - 1; i >= 0; i--) {
		var drawing = this.drawingObjects[i];
		drawing.abort(true);
		if (deletePermanent || !drawing.permanent) this.drawingObjects.splice(i, 1);
	}
};

/**
 * Imports drawings from an array originally created by {@link CIQ.ChartEngine#exportDrawings}.
 * To immediately render the reconstructed drawings, you must call `draw()`.
 * See {@tutorial Using and Customizing Drawing Tools} for more details.
 *
 * **Important:**
 * Calling this function in a way that will cause it to run simultaneously with [importLayout]{@link CIQ.ChartEngine#importLayout}
 * will damage the results on the layout load. To prevent this, use the {@link CIQ.ChartEngine#importLayout} or {@link CIQ.ChartEngine#loadChart} callback listeners.
 *
 * @see {@link CIQ.ChartEngine#exportDrawings}
 * @param  {array} arr An array of serialized drawings.
 * @memberof CIQ.ChartEngine
 * @since 4.0.0 Replaces `reconstructDrawings`.
 * @example
 * // Programmatically add a rectangle.
 * stxx.importDrawings([{"name":"rectangle","pnl":"chart","col":"transparent","fc":"#7DA6F5","ptrn":"solid","lw":1.1,"d0":"20151216030000000","d1":"20151216081000000","tzo0":300,"tzo1":300,"v0":152.5508906882591,"v1":143.3385829959514}]);
 * // Programmatically add a vertical line.
 * stxx.importDrawings([{"name":"vertical","pnl":"chart","col":"transparent","ptrn":"solid","lw":1.1,"v0":147.45987854251013,"d0":"20151216023000000","tzo0":300,"al":true}]);
 * // Now render the reconstructed drawings.
 * stxx.draw();
 */
CIQ.ChartEngine.prototype.importDrawings = function (arr) {
	if (!CIQ.Drawing) return;
	for (var i = 0; i < arr.length; i++) {
		var rep = arr[i];
		if (rep.name == "fibonacci") rep.name = "retracement";
		var Factory = CIQ.ChartEngine.drawingTools[rep.name];
		if (!Factory) {
			if (CIQ.Drawing[rep.name]) {
				Factory = CIQ.Drawing[rep.name];
				CIQ.ChartEngine.registerDrawingTool(rep.name, Factory);
			}
		}
		if (Factory) {
			var drawing = new Factory();
			drawing.reconstruct(this, rep);
			this.drawingObjects.push(drawing);
		}
	}
};

/**
 * Clears all the drawings on the chart (do not call abortDrawings directly).
 * @param {boolean} cantUndo Set to true to make this an "non-undoable" operation.
 * @param {boolean} deletePermanent Set to false to not delete permanent drawings.
 * @memberof CIQ.ChartEngine
 * @since 6.0.0 Added `deletePermanent` parameter.
 */
CIQ.ChartEngine.prototype.clearDrawings = function (cantUndo, deletePermanent) {
	if (deletePermanent !== false) deletePermanent = true;
	var before = this.exportDrawings();
	this.abortDrawings(deletePermanent);
	if (cantUndo) {
		this.undoStamps = [];
	} else {
		this.undoStamp(before, this.exportDrawings());
	}
	this.changeOccurred("vector");
	//this.createDataSet();
	//this.deleteHighlighted(); // this will remove any stickies and also call draw()
	// deleteHighlighted was doing too much, so next we call 'just' what we need.
	this.cancelTouchSingleClick = true;
	CIQ.clearCanvas(this.chart.tempCanvas, this);
	this.draw();
	var mSticky = this.controls.mSticky;
	if (mSticky) {
		mSticky.style.display = "none";
		mSticky.querySelector(".mStickyInterior").innerHTML = "";
	}
};

/**
 * Creates a new drawing of the specified type with the specified parameters. See {@tutorial Using and Customizing Drawing Tools} for more details.
 * @param  {string} type The drawing name.
 * @param  {object} parameters Parameters that describe the drawing.
 * @return {CIQ.Drawing} A drawing object.
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.prototype.createDrawing = function (type, parameters) {
	if (!CIQ.Drawing) return;
	var drawing = new CIQ.Drawing[type]();
	drawing.reconstruct(this, parameters);
	//set default configs if not provided
	var config = new CIQ.Drawing[type]();
	config.stx = this;
	config.copyConfig();
	for (var prop in config) {
		drawing[prop] = drawing[prop] || config[prop];
	}
	this.drawingObjects.push(drawing);
	this.draw();
	return drawing;
};

/**
 * Removes the drawing. Drawing object should be one returned from {@link CIQ.ChartEngine#createDrawing}. See {@tutorial Using and Customizing Drawing Tools} for more details.
 * @param  {object} drawing The drawing object.
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.prototype.removeDrawing = function (drawing) {
	for (var i = 0; i < this.drawingObjects.length; i++) {
		if (this.drawingObjects[i] == drawing) {
			this.drawingObjects.splice(i, 1);
			this.changeOccurred("vector");
			this.draw();
			return;
		}
	}

	//this.checkForEmptyPanel(drawing.panelName);
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Stops (aborts) the current drawing. See {@link CIQ.ChartEngine#undoLast} for an actual "undo" operation.
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias undo
 */
CIQ.ChartEngine.prototype.undo = function () {
	if (this.runPrepend("undo", arguments)) return;
	if (this.activeDrawing) {
		this.editingAnnotation = false;
		this.activeDrawing.abort();
		this.activeDrawing.hidden = false;
		this.drawingSnapshot = null;
		this.activateDrawing(null);
		CIQ.clearCanvas(this.chart.tempCanvas, this);
		this.draw();
		this.controls.crossX.classList.replace(
			"stx_crosshair_drawing",
			"stx_crosshair"
		);
		this.controls.crossY.classList.replace(
			"stx_crosshair_drawing",
			"stx_crosshair"
		);
		CIQ.ChartEngine.drawingLine = false;
		this.cancelTouchSingleClick = true;
	}
	this.runAppend("undo", arguments);
};

/**
 * Creates an undo stamp for the chart's current drawing state and triggers a call to the [undoStampEventListener]{@link CIQ.ChartEngine~undoStampEventListener}.
 *
 * Every time a drawing is added or removed the {@link CIQ.ChartEngine#undoStamps} object is updated with a new entry containing the resulting set of drawings.
 * Using the corresponding {@link CIQ.ChartEngine#undoLast} method, you can revert back to the last state, one at a time.
 * You can also use the [undoStampEventListener]{@link CIQ.ChartEngine~undoStampEventListener} to create your own tracker to undo or redo drawings.
 * @memberof CIQ.ChartEngine
 * @param {array} before The chart's array of [serialized drawingObjects]{@link CIQ.ChartEngine#exportDrawings} before being modified.
 * @param {array} after The chart's array of [serialized drawingObjects]{@link CIQ.ChartEngine#exportDrawings} after being modified
 * @since 7.0.0 'before' and 'after' parameters must now be an array of serialized drawings instead of an array of drawingObjects. See {@link CIQ.ChartEngine#exportDrawings}.
 */
CIQ.ChartEngine.prototype.undoStamp = function (before, after) {
	this.undoStamps.push(before);
	this.dispatch("undoStamp", {
		before: before,
		after: after,
		stx: this
	});
};

/**
 * Reverts back to the previous drawing state change.
 * **Note:** By design this method only manages drawings manually added during the current session and will not remove drawings restored from
 * a previous session. If you wish to remove all drawings use {@link CIQ.ChartEngine#clearDrawings}.
 *
 * You can also view and interact with all drawings by traversing through the {@link CIQ.ChartEngine#drawingObjects} array which includes **all** drawings displayed
 * on the chart, regardless of session. Removing a drawing from this list, will remove the drawing from the chart after a draw() operation is executed.
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.prototype.undoLast = function () {
	if (this.activeDrawing) {
		this.undo();
	} else {
		if (this.undoStamps.length) {
			this.drawingObjects = []; // drawingObjects will be repopulated by importDrawings
			this.importDrawings(this.undoStamps.pop());
			this.changeOccurred("vector");
			this.draw();
		}
	}
};

/**
 * Programmatically add a drawing.
 * @param {object} drawing The drawing definition.
 * @memberof CIQ.ChartEngine
 * @private
 */
CIQ.ChartEngine.prototype.addDrawing = function (drawing) {
	var drawings = this.exportDrawings();
	this.drawingObjects.push(drawing);
	this.undoStamp(drawings, this.exportDrawings());
};

/**
 * Repositions a drawing onto the temporary canvas. Called when a user moves a drawing.
 * @param  {CIQ.Drawing} drawing The drawing to reposition.
 * @param  {boolean} activating True when first activating "reposition", so the drawing simply gets re-rendered in the same spot, but on the tempCanvas
 * (otherwise it would jump immediately to the location of the next click/touch).
 * @since
 * - 3.0.0
 * - 5.0.0 Added `activating` parameter.
 * @private
 */
CIQ.ChartEngine.prototype.repositionDrawing = function (drawing, activating) {
	if (this.currentPanel.name != drawing.panelName && !drawing.spanPanels)
		return;
	var panel = this.panels[drawing.panelName];
	var value = this.adjustIfNecessary(
		panel,
		this.crosshairTick,
		drawing.valueFromPixel(
			this.backOutY(CIQ.ChartEngine.crosshairY),
			panel,
			this.getYAxisByField(panel, drawing.field)
		)
	);
	var tempCanvas = this.chart.tempCanvas;
	CIQ.clearCanvas(tempCanvas, this);
	this.startClip(panel.name);
	if (activating) {
		this.drawingSnapshot = this.exportDrawings();
		if (drawing.spanPanels) {
			drawing.originPanelName = drawing.panelName;
			Object.values(this.panels).forEach((panelTest) => {
				drawing.panelName = panelTest.name;
				drawing.render(tempCanvas.context);
			});
			drawing.panelName = drawing.originPanelName;
		} else {
			drawing.render(tempCanvas.context);
		}
	} else {
		drawing.reposition(
			tempCanvas.context,
			drawing.repositioner,
			this.crosshairTick,
			value
		);
		if (this.drawingSnapshot)
			this.undoStamp(
				CIQ.shallowClone(this.drawingSnapshot),
				this.exportDrawings()
			);
		this.drawingSnapshot = null;
	}
	if (this.editingDrawing) this.editingDrawing.render(tempCanvas.context);
	this.endClip();
	if (drawing.measure) drawing.measure();
};

/**
 * Activates or deactivates repositioning on a drawing.
 * @param  {CIQ.Drawing} drawing The drawing to activate. Send null to deactivate.
 * @memberOf  CIQ.ChartEngine
 * @since 3.0.0
 */
CIQ.ChartEngine.prototype.activateRepositioning = function (drawing) {
	var repositioningDrawing = (this.repositioningDrawing = drawing);
	if (drawing) {
		// Take the drawing off the main canvas and put it on the tempCanvas
		this.draw();
		this.repositionDrawing(drawing, true);
	}
	this.chart.tempCanvas.style.display = drawing ? "block" : "none";
};

/**
 * Activate a drawing. The user can then finish the drawing.
 *
 * **Note:** Some drawings labeled "chartsOnly" can only be activated on the chart panel.
 * @param {string} drawingTool The tool to activate. Send null to deactivate.
 * @param {CIQ.ChartEngine.Panel} [panel] The panel where to activate the tool. Defaults to the current panel.
 * @return {boolean} Returns true if the drawing was successfully activated. Returns false if inactivated or unsuccessful.
 * @memberof CIQ.ChartEngine
 * @since
 * - 3.0.0
 * - 7.0.0 `panel` defaults to the current panel.
 */
CIQ.ChartEngine.prototype.activateDrawing = function (drawingTool, panel) {
	if (!panel) panel = this.currentPanel;
	this.drawingSnapshot = null;
	function removeStudyOverlay(stx) {
		if (!panel || !stx.layout.studies) return;
		var study = stx.layout.studies[panel.name];
		if (study && !study.overlay) delete stx.overlays[study.name];
	}
	if (!drawingTool) {
		this.activeDrawing = null;
		this.chart.tempCanvas.style.display = "none";
		removeStudyOverlay(this);
		return false;
	}
	var Factory = CIQ.ChartEngine.drawingTools[drawingTool];
	if (!Factory) {
		if (CIQ.Drawing[drawingTool]) {
			Factory = CIQ.Drawing[drawingTool];
			CIQ.ChartEngine.registerDrawingTool(drawingTool, Factory);
		}
	}
	if (Factory) {
		this.activeDrawing = new Factory();
		this.activeDrawing.construct(this, panel);
		if (!this.charts[panel.name]) {
			if (this.activeDrawing.chartsOnly) {
				this.activeDrawing = null;
				removeStudyOverlay(this);
				return false;
			}
		}
	}
	this.chart.tempCanvas.style.display = "block";
	if (this.controls.drawOk) this.controls.drawOk.style.display = "none";
	removeStudyOverlay(this);
	return true;
};

/**
 * This is called to send a potential click event to an active drawing, if one is active.
 * @param  {CIQ.ChartEngine.Panel} panel The panel in which the click occurred.
 * @param  {number} x The X pixel location of the click.
 * @param  {number} y The Y pixel location of the click.
 * @return {boolean} Returns true if a drawing is active and received the click.
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.prototype.drawingClick = function (panel, x, y) {
	if (!CIQ.Drawing) return;
	if (!panel) return; // can be true if panel was closed in the middle of a drawing

	if (this.openDialog) return; // don't register a drawing click if in modal mode
	if (this.editingDrawing) return; // do not start new drawing when editing another
	if (!this.activeDrawing) {
		if (!this.activateDrawing(this.currentVectorParameters.vectorType, panel))
			return;
	}
	if (this.activeDrawing) {
		if (this.userPointerDown && !this.activeDrawing.dragToDraw) {
			if (!CIQ.ChartEngine.drawingLine) this.activateDrawing(null);
			return;
		} else if (!this.activeDrawing.p0) {
			let field = this.highlightedDataSetField;
			if (
				this.magnetizedPrice !== null &&
				(panel !== this.chart.panel ||
					["Open", "High", "Low", "Close"].indexOf(this.magneticHold) < 0)
			)
				field = CIQ.getObjectChainRoot(this.magneticHold);
			if (!field && panel != this.chart.panel) {
				for (let sr in this.chart.seriesRenderers) {
					const renderer = this.chart.seriesRenderers[sr];
					if (renderer.params.panel == panel.name) {
						field = renderer.seriesParams[0].field;
						break;
					}
				}
				for (let st in this.layout.studies) {
					const study = this.layout.studies[st]; // find a default study on this panel
					if (study.panel == panel.name) {
						field = Object.keys(study.outputMap)[0];
						break;
					}
				}
			}
			this.activeDrawing.field = field;
		} else if (this.activeDrawing.moving) {
			// If dragging a drawing to create it, reset ending point to where you left off, not where you clicked subsequently
			// (2-in-1 device with no crosshair)
			x = this.crosshairX - this.left;
			y = this.crosshairY - this.top;
		}
		var tick = this.tickFromPixel(x, panel.chart);
		var dpanel = this.panels[this.activeDrawing.panelName];
		var value;
		if (this.magnetizedPrice || this.magnetizedPrice === 0) {
			value = this.adjustIfNecessary(dpanel, tick, this.magnetizedPrice);
		} else {
			value = this.adjustIfNecessary(
				dpanel,
				tick,
				this.activeDrawing.valueFromPixel(
					y,
					dpanel,
					this.getYAxisByField(dpanel, this.activeDrawing.field)
				)
			);
		}
		if (this.activeDrawing.click(this.chart.tempCanvas.context, tick, value)) {
			if (this.activeDrawing) {
				// Just in case the drawing aborted itself, such as measure
				CIQ.ChartEngine.drawingLine = false;
				CIQ.clearCanvas(this.chart.tempCanvas, this);
				this.addDrawing(this.activeDrawing); // Save drawing
				CIQ.ChartEngine.completeDrawing(this);
				this.activateDrawing(null);
				this.adjustDrawings();
				this.draw();
				this.changeOccurred("vector");
				this.controls.crossX.classList.replace(
					"stx_crosshair_drawing",
					"stx_crosshair"
				);
				this.controls.crossY.classList.replace(
					"stx_crosshair_drawing",
					"stx_crosshair"
				);
			}
		} else {
			this.changeOccurred("drawing");
			CIQ.ChartEngine.drawingLine = true;
			this.controls.crossX.classList.replace(
				"stx_crosshair",
				"stx_crosshair_drawing"
			);
			this.controls.crossY.classList.replace(
				"stx_crosshair",
				"stx_crosshair_drawing"
			);
		}
		return true;
	}
	return false;
};

/**
 * Dispatches a [drawingEditEventListener]{@link CIQ.ChartEngine~drawingEditEventListener} event
 * if there are any listeners. Otherwise, removes the given drawing.
 *
 * @param {CIQ.Drawing} drawing The vector instance to edit, normally provided by deleteHighlighted.
 * @param {boolean} forceEdit Skip the context menu and begin editing. Used on touch devices.
 * @param {boolean} forceText Skip the context menu and begin text edit. Used on touch devices.
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias rightClickDrawing
 * @since
 * - 6.2.0
 * - 8.6.0 Add `forceText` flag.
 */
CIQ.ChartEngine.prototype.rightClickDrawing = function (
	drawing,
	forceEdit,
	forceText
) {
	if (this.runPrepend("rightClickDrawing", arguments)) return;
	if (drawing.permanent) return;

	if (this.callbackListeners.drawingEdit.length) {
		this.dispatch("drawingEdit", {
			stx: this,
			drawing: drawing,
			forceEdit: forceEdit,
			forceText: forceText
		});
	} else {
		var dontDeleteMe = drawing.abort();

		if (!dontDeleteMe) {
			var before = this.exportDrawings();
			this.removeDrawing(drawing);
			this.undoStamp(before, this.exportDrawings());
		}

		this.changeOccurred("vector");
	}

	this.runAppend("rightClickDrawing", arguments);
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Calculates the magnet point for the current mouse cursor location. This is the nearest OHLC point. A small white
 * circle is drawn on the temporary canvas to indicate this location for the end user. If the user initiates a drawing, then
 * the end point of the drawing will be tied to the magnet point.
 * This function is only used when creating a new drawing if <a href="CIQ.ChartEngine.html#preferences%5B%60magnet%60%5D">CIQ.ChartEngine.preferences.magnet</a> is true and
 * a drawing <a href="CIQ.ChartEngine.html#currentVectorParameters%5B%60vectorType%60%5D">CIQ.ChartEngine.currentVectorParameters.vectorType</a> has been enabled. It will not be used when an existing drawing is being repositioned.
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias magnetize
 */
CIQ.ChartEngine.prototype.magnetize = function () {
	this.magnetizedPrice = null;
	if (!this.preferences.magnet && !this.currentVectorParameters.alwaysMagnetize)
		return;
	if (this.runPrepend("magnetize", arguments)) return;
	if (this.repositioningDrawing || this.editingDrawing) return; // Don't magnetize
	var drawingTool = this.currentVectorParameters.vectorType;
	if (!drawingTool || drawingTool == "projection" || drawingTool == "freeform")
		return;
	if (
		(drawingTool == "annotation" || drawingTool == "callout") &&
		CIQ.ChartEngine.drawingLine
	)
		return; // Don't magnetize the end of an annotation
	var panel = this.activeDrawing
		? this.panels[this.activeDrawing.panelName]
		: this.currentPanel;
	var chart = panel.chart;
	var tick = this.crosshairTick;
	//if(this.layout.interval!="minute") tick/=this.layout.periodicity;
	if (tick > chart.dataSet.length) return; // Don't magnetize in the future
	var prices = chart.dataSet[tick];
	if (!prices) return;
	var stickMagnet;

	var fields = this.getRenderedItems();
	var ohlc = ["Open", "High", "Low", "Close"];
	if (this.activeDrawing && this.activeDrawing.penDown) {
		if (this.magneticHold) {
			if (ohlc.indexOf(this.magneticHold) != -1 && fields.indexOf("High") != -1)
				fields = ohlc;
			else fields = [this.magneticHold];
		} else return; // no magnetism if you didn't start with any
	} else this.magneticHold = null; //reset for next time!
	var closest = 1000000000;
	var magnetRadius = parseFloat(this.preferences.magnet); // if it is actually a number we use that otherwise magnetRadius is falsey and no harm
	// Always strong magnetize measurement lines
	if (drawingTool == "measurementline") magnetRadius = false;
	for (var i = 0; i < fields.length; i++) {
		var yAxis = this.getYAxisByField(panel, fields[i]) || panel.yAxis;
		var doTransform = chart.transformFunc && yAxis === chart.yAxis;
		if (doTransform && prices.transform) prices = prices.transform;
		var fieldPrice = prices[fields[i]];
		var tuple = CIQ.existsInObjectChain(prices, fields[i]);
		if (tuple) fieldPrice = tuple.obj[tuple.member];

		if (fieldPrice || fieldPrice === 0) {
			var pixelPosition = this.pixelFromTransformedValue(
				fieldPrice,
				panel,
				yAxis
			); // pixel position of Price!
			if (Math.abs(this.cy - pixelPosition) < closest) {
				closest = Math.abs(this.cy - pixelPosition);
				if (magnetRadius && magnetRadius <= closest) continue;
				this.magnetizedPrice = fieldPrice;
				if (doTransform) {
					const untransformFunc = chart.untransformFunc,
						field = CIQ.getObjectChainRoot(fields[i]);
					if (untransformFunc && chart.series[field])
						chart.untransformFunc = (stx, chart, pixel, yAxis) =>
							untransformFunc(stx, chart, pixel, yAxis, field);
					this.magnetizedPrice = this.valueFromPixel(pixelPosition, panel);
					chart.untransformFunc = untransformFunc;
				}
				stickMagnet = pixelPosition;
				this.magneticHold = fields[i];
			}
		}
	}
	var x = this.pixelFromTick(tick, chart);
	var y = stickMagnet;
	CIQ.clearCanvas(chart.tempCanvas, this);
	var ctx = chart.tempCanvas.context;
	ctx.beginPath();
	ctx.lineWidth = 1;
	var radius = Math.max(this.layout.candleWidth, 12) / 3;
	// Limit the radius size to 8 to prevent a large arc
	// when zooming in and increasing the candle width.
	ctx.arc(x, y, Math.min(radius, 8), 0, 2 * Math.PI, false);
	// ctx.lineWidth=2;
	ctx.fillStyle = "#398dff";
	ctx.strokeStyle = "#398dff";
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	chart.tempCanvas.style.display = "block";
	if (this.anyHighlighted) this.container.classList.remove("stx-draggable");
	if (this.activeDrawing) {
		this.startClip(panel.name);
		this.activeDrawing.move(
			ctx,
			this.crosshairTick,
			this.activeDrawing.valueFromPixel(
				y,
				panel,
				this.getYAxisByField(panel, this.activeDrawing.field)
			)
		);
		this.endClip();
	}
	this.runAppend("magnetize", arguments);
};

/**
 * Sets the current drawing tool as described by {@link CIQ.ChartEngine.currentVectorParameters}
 * (segment, line, etc.). Also triggers crosshairs to appear if they are relevant to the drawing.
 *
 * **Note:** The value `""` (empty string) is used for the "no tool" option, and `null` is used to
 * turn off drawing mode entirely. If the "no tool" option is set, crosshairs will not appear even
 * if crosshairs are toggled on.
 *
 * @param {string|null} value The name of the drawing tool to enable.
 *
 * @memberof CIQ.ChartEngine#
 * @alias changeVectorType
 *
 * @example
 * // Activates a drawing type described by currentVectorParameters.
 * stxx.changeVectorType("rectangle");
 *
 * // Deactivates drawing mode.
 * stxx.changeVectorType("");
 *
 * // Clears the drawings.
 * stxx.clearDrawings()
 */
CIQ.ChartEngine.prototype.changeVectorType = function (value) {
	this.currentVectorParameters.vectorType = value;
	this.currentVectorParameters.alwaysMagnetize = false;
	if (CIQ.Drawing) CIQ.Drawing.initializeSettings(this, value);
	if (CIQ.ChartEngine.drawingLine) this.undo();

	const isActiveChart =
		this.uiContext && this.uiContext.topNode.multiChartContainer
			? this.uiContext.topNode.closest("cq-context-wrapper.active")
			: true;

	// cannot check insideChart because last touch location could be inside without triggering crosshairs
	if (
		!this.container.classList.contains("stx-crosshair-cursor-on") &&
		value &&
		isActiveChart
	) {
		const { chart, left, top } = this;
		const fx = chart.width / 2 + left + chart.left;
		const fy = chart.height / 2 + top + chart.top;
		this.mousemoveinner(fx, fy);
	}

	// call regardless of previous display state as they may need to appear or disappear
	this.doDisplayCrosshairs();
};

/**
 * Sets the current drawing parameter as described by {@link CIQ.ChartEngine.currentVectorParameters} (color, pattern, etc).
 * @param  {string} parameter The name of the drawing parameter to change (currentColor, fillColor, lineWidth, pattern, axisLabel, fontSize, fontStyle, fontWeight, fontFamily)
 * @param  {string} value The value of the parameter.
 * @return  {boolean} Returns `true` if property was assigned.
 * @memberof CIQ.ChartEngine
 * @example
 * 		this.stx.changeVectorParameter("currentColor","yellow");  // or rgb/hex
 *		this.stx.changeVectorParameter("axisLabel",false);  // or "false"
 *		this.stx.changeVectorParameter("lineWidth",5);  // or "5"
 *		this.stx.changeVectorParameter("fontSize","12");  // or 12 or "12px"
 *		this.stx.changeVectorParameter("pattern","dotted");
 *
 * @since 3.0.0
 */
CIQ.ChartEngine.prototype.changeVectorParameter = function (parameter, value) {
	if (parameter == "axisLabel")
		value = value.toString() === "true" || Number(value);
	else if (parameter == "lineWidth") value = Number(value);
	else if (parameter == "fontSize") value = parseInt(value, 10) + "px";
	var currentVectorParams = this.currentVectorParameters;
	if (typeof currentVectorParams[parameter] !== "undefined") {
		currentVectorParams[parameter] = value;
		return true;
	} else if (parameter.substr(0, 4) == "font") {
		parameter = parameter.substr(4).toLowerCase();
		if (parameter == "family" && value.toLowerCase() == "default") value = null;
		currentVectorParams = currentVectorParams.annotation.font;
		if (typeof currentVectorParams[parameter] !== "undefined") {
			currentVectorParams[parameter] = value;
			return true;
		}
	}
	return false;
};

/**
 * <span class="injection">INJECTABLE</span>
 * <span class="animation">Animation Loop</span>
 *
 * Draws the drawings (vectors). Each drawing is iterated and asked to draw itself. Drawings are automatically
 * clipped by their containing panel.
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias drawVectors
 */
CIQ.ChartEngine.prototype.drawVectors = function () {
	if (this.vectorsShowing) return;
	if (this.runPrepend("drawVectors", arguments)) return;
	this.vectorsShowing = true;
	if (!this.chart.hideDrawings && !this.highlightedDraggable) {
		var tmpPanels = {};
		// First find all the existing panels in the given set of drawings (excluding those that aren't displayed)
		var panelName, i;
		for (i = 0; i < this.drawingObjects.length; i++) {
			var drawing = this.drawingObjects[i];
			if (drawing.hidden) continue; // do not draw this on the main canvas; it's being edited on the tempCanvas
			if (this.repositioningDrawing === drawing && !this.editingDrawing)
				continue; // don't display a drawing that is currently being repositioned because it will show on the tempCanvas
			panelName = drawing.panelName;
			if (
				!this.panels[drawing.panelName] ||
				this.panels[drawing.panelName].hidden
			)
				continue; // drawing from a panel that is not enabled
			for (var testPanelName in this.panels) {
				if (!tmpPanels[testPanelName]) {
					tmpPanels[testPanelName] = [];
				}
				// Drawings set to spanPanels are added to each panel
				if (drawing.spanPanels || testPanelName == panelName) {
					drawing.originPanelName = drawing.panelName;
					tmpPanels[testPanelName].push(drawing);
				}
			}
		}
		if (this.editingDrawing) {
			var tempCanvas = this.chart.tempCanvas;
			CIQ.clearCanvas(tempCanvas, this);
			tempCanvas.style.display = "block";
		}
		// Now render all the drawings in those panels, clipping each panel
		for (panelName in tmpPanels) {
			this.startClip(panelName);
			var arr = tmpPanels[panelName];
			for (i = 0; i < arr.length; i++) {
				const context =
					arr[i] === this.editingDrawing
						? this.chart.tempCanvas.context
						: this.chart.context;
				if (arr[i].spanPanels) {
					// When a drawing spans panels, it still retains the panelName of its origin.
					// Temporarily replace that name to render in the current panel.
					arr[i].panelName = panelName;
					arr[i].render(context);
					arr[i].panelName = arr[i].originPanelName;
				} else {
					arr[i].render(context);
				}
			}
			this.endClip();
		}
	}
	this.runAppend("drawVectors", arguments);
};

/**
 * Loops through the existing drawings and asks them to adjust themselves to the chart dimensions.
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.prototype.adjustDrawings = function () {
	for (var i = 0; i < this.drawingObjects.length; i++) {
		var drawing = this.drawingObjects[i];
		if (this.panels[drawing.panelName]) drawing.adjust();
	}
};

/**
 * Base class for Drawing Tools. Use {@link CIQ.inheritsFrom} to build a subclass for custom drawing tools.
 * The name of the subclass should be CIQ.Drawing.yourname. Whenever CIQ.ChartEngine.currentVectorParameters.vectorType==yourname, then
 * your drawing tool will be the one that is enabled when the user begins a drawing. Capitalization of yourname
 * must be an exact match otherwise the kernel will not be able to find your drawing tool.
 *
 * Each of the CIQ.Drawing prototype functions may be overridden. To create a functioning drawing tool,
 * you must override the functions below that create alerts.
 *
 * Drawing clicks are always delivered in *adjusted price*. That is, if a stock has experienced splits, then
 * the drawing will not display correctly on an unadjusted price chart unless this is considered during the rendering
 * process. Follow the templates to assure correct rendering under both circumstances.
 *
 * If no color is specified when building a drawing, then the color will be set to `"auto"` and the chart will automatically display
 * white or black depending on the background.
 *
 * **Permanent drawings:**<br>
 * To make a particular drawing permanent, set its `permanent` property to `true` once created.
 * <br>Example: <br>
 * ```drawingObject.permanent=true;```
 *
 * See {@tutorial Using and Customizing Drawing Tools} for more details.
 *
 * @name  CIQ.Drawing
 * @constructor
 */
CIQ.Drawing =
	CIQ.Drawing ||
	function () {
		this.chartsOnly = false; // Set this to true to restrict drawing to panels containing charts (as opposed to studies)
		this.penDown = false; // Set to true when in the midst of creating the object
	};

/**
 * Since not all drawings have the same configuration parameters,
 * this is a helper function intended to return the relevant drawing parameters and default settings for the requested drawing type.
 *
 * For example, you can use the returning object as your template for creating the proper UI toolbox for that particular drawing.
 * Will you need a line width UI element, a fill color, etc.? Or you can use it to determine what values you should be setting if enabling
 * a particular drawing type programmatically with specific properties.
 * @param {CIQ.ChartEngine} stx The chart object.
 * @param {string} drawingName Name of drawing; for example: "ray", "segment".
 * @returns {object} Map of parameters used in the drawing type, with their current values.
 * @memberOf CIQ.Drawing
 * @since 3.0.0
 */
CIQ.Drawing.getDrawingParameters = function (stx, drawingName) {
	var drawing;
	try {
		drawing = new CIQ.Drawing[drawingName]();
	} catch (e) {}
	if (!drawing) return null;
	drawing.stx = stx;
	drawing.copyConfig(true);
	var result = {};
	var confs = drawing.configs;
	for (var c = 0; c < confs.length; c++) {
		result[confs[c]] = drawing[confs[c]];
	}
	var style = stx.canvasStyle("stx_annotation");
	if (style && result.font) {
		result.font.size = style.fontSize;
		result.font.family = style.fontFamily;
		result.font.style = style.fontStyle;
		result.font.weight = style.fontWeight;
	}
	return result;
};

/**
 * Static method for saving drawing parameters to preferences.
 *
 * Values are stored in `stxx.preferences.drawings` and can be saved together with the rest of the chart preferences,
 * which by default are placed in the browser's local storage under "myChartPreferences".
 * @param {CIQ.ChartEngine} stx The chart object.
 * @param {string} toolName Name of drawing tool; for example: "ray", "segment", "fibonacci".
 * @memberOf CIQ.Drawing
 * @since 6.0.0
 */
CIQ.Drawing.saveConfig = function (stx, toolName) {
	if (!toolName) return;
	var preferences = stx.preferences;
	if (!preferences.drawings) preferences.drawings = {};
	preferences.drawings[toolName] = {};
	var tempDrawing = new CIQ.Drawing[toolName]();
	tempDrawing.stx = stx;
	CIQ.Drawing.copyConfig(tempDrawing);
	tempDrawing.configs.forEach(function (config) {
		preferences.drawings[toolName][config] = tempDrawing[config];
	});
	stx.changeOccurred("preferences");
};

/**
 * Static method for restoring default drawing parameters and removing custom preferences.
 *
 * @param {CIQ.ChartEngine} stx The chart object.
 * @param {string} toolName Name of active drawing tool; for example: "ray", "segment", "fibonacci".
 * @param {boolean} all Set to `true` to restore default for all drawing objects. Otherwise only the active drawing object's defaults are restored.
 * @memberOf CIQ.Drawing
 * @since 6.0.0
 */
CIQ.Drawing.restoreDefaultConfig = function (stx, toolName, all) {
	if (all) stx.preferences.drawings = null;
	else stx.preferences.drawings[toolName] = null;
	stx.changeOccurred("preferences");
	stx.currentVectorParameters = CIQ.clone(
		CIQ.ChartEngine.currentVectorParameters
	);
	stx.currentVectorParameters.vectorType = toolName;
};

/**
 * Static method to call optional initializeSettings instance method of the drawing whose name is passed in as an argument.
 * @param {CIQ.ChartEngine} stx Chart object
 * @param {string} drawingName Name of drawing, e.g. "ray", "segment", "fibonacci"
 * @memberOf CIQ.Drawing
 * @since 5.2.0 Calls optional instance function instead of doing all the work internally.
 */
CIQ.Drawing.initializeSettings = function (stx, drawingName) {
	var drawing = CIQ.Drawing[drawingName];
	if (drawing) {
		var drawInstance = new drawing();
		if (drawInstance.initializeSettings) drawInstance.initializeSettings(stx);
	}
};

/**
 * Updates the drawing's field or panelName property to the passed in argument if the field of the drawing is "sourced" from the passed in name.
 *
 * This is used when moving a series or study, and there is a drawing based upon it.<br>
 * It will be called based on the following occurrences:
 * - Panel of series changed
 * - Panel of study changed
 * - Default panel of study changed due to field change
 * - Outputs of study changed due to field change
 * - Outputs of study changed due to name change (due to field of field change)
 * @param {CIQ.ChartEngine} stx Chart object
 * @param {string} name Name of study or symbol of series to match with
 * @param {string} newName Name of new field to use for the drawing field if a name match is found
 * @param {string} newPanel Name of new panel to use for the drawing if a name match is found, ignored if `newName`` is set
 * @memberOf CIQ.Drawing
 * @since 7.0.0
 */
CIQ.Drawing.updateSource = function (stx, name, newName, newPanel) {
	if (!name) return;
	var vectorChange = false;
	for (var dKey in stx.drawingObjects) {
		var drawing = stx.drawingObjects[dKey];
		if (!drawing.field) continue;
		if (newName) {
			// field change
			if (drawing.field == name) {
				drawing.field = newName;
				vectorChange = true;
			} else if (
				drawing.field.indexOf(name) > -1 &&
				drawing.field.indexOf(name + "-") == -1
			) {
				drawing.field = drawing.field.replace(name, newName);
				vectorChange = true;
			}
		} else {
			// panel change
			if (drawing.field.split("-->")[0] == name || drawing.panelName == name) {
				drawing.panelName = newPanel;
				vectorChange = true;
			}
		}
	}
	if (vectorChange) stx.changeOccurred("vector");
};

/**
 * Instance function used to copy the relevant drawing parameters into itself.
 * It just calls the static function.
 * @param {boolean} withPreferences set to true to return previously saved preferences
 * @memberOf CIQ.Drawing
 * @since 3.0.0
 */
CIQ.Drawing.prototype.copyConfig = function (withPreferences) {
	CIQ.Drawing.copyConfig(this, withPreferences);
};
/**
 * Static function used to copy the relevant drawing parameters into the drawing instance.
 * Use this when overriding the Instance function, to perform basic copy before performing custom operations.
 * @param {CIQ.Drawing} drawingInstance to copy into
 * @param {boolean} withPreferences set to true to return previously saved preferences
 * @memberOf CIQ.Drawing
 * @since
 * - 3.0.0
 * - 6.0.0 Overwrites parameters with those stored in `preferences.drawings`.
 */
CIQ.Drawing.copyConfig = function (drawingInstance, withPreferences) {
	var cvp = drawingInstance.stx.currentVectorParameters;
	var configs = drawingInstance.configs;
	var c, conf;
	for (c = 0; c < configs.length; c++) {
		conf = configs[c];
		if (conf == "color") {
			drawingInstance.color = cvp.currentColor;
		} else if (conf == "parameters") {
			drawingInstance.parameters = CIQ.clone(cvp.fibonacci);
		} else if (conf == "font") {
			drawingInstance.font = CIQ.clone(cvp.annotation.font);
		} else {
			drawingInstance[conf] = cvp[conf];
		}
	}
	if (!withPreferences) return;
	var customPrefs = drawingInstance.stx.preferences;
	if (customPrefs && customPrefs.drawings) {
		CIQ.extend(drawingInstance, customPrefs.drawings[cvp.vectorType]);
		for (c = 0; c < configs.length; c++) {
			conf = configs[c];
			if (conf == "color") {
				cvp.currentColor = drawingInstance.color;
			} else if (conf == "parameters") {
				cvp.fibonacci = CIQ.clone(drawingInstance.parameters);
			} else if (conf == "font") {
				cvp.annotation.font = CIQ.clone(drawingInstance.font);
			} else {
				cvp[conf] = drawingInstance[conf];
			}
		}
	}
};

/**
 * Used to set the user behavior for creating drawings.
 *
 * By default, a drawing is created with this sequence:
 * <br>`move crosshair to staring point` → `click` → `move crosshair to ending point` → `click`.
 * > On a touch device this would be:
 * > <br>`move crosshair to staring point` → `tap` → `move crosshair to ending point` → `tap`.
 *
 * Set dragToDraw to `true` to create the drawing with the following alternate sequence:
 * <br>`move crosshair to staring point` → `mousedown` → `drag` → `mouseup`
 * > On a touch device this would be:
 * > <br>`move crosshair to staring point` → `press` → `drag` → `release`.
 *
 *  This parameter is **not compatible** with drawings requiring more than one drag movement to complete, such as:
 *  - Channel
 *  - Continuous Line
 *  - Elliott Wave
 *  - Gartley
 *  - Pitchfork
 *  - Fibonacci Projection
 *
 * Line and Ray have their own separate parameter, which also needs to be set in the same way,  if this option is desired:   `CIQ.Drawing.line.prototype.dragToDraw=true;`
 *
 * This parameter may be set for all drawings compatible with it, for a specific drawing type, or for a specific drawing instance. See examples.
 * @memberOf CIQ.Drawing
 * @type {boolean}
 * @example
 * // set drawing instance to dragToDraw. Only this one drawing will be affected
 * drawing.dragToDraw=true;
 * // Set particular drawing prototype to dragToDraw. All drawings to type "difference" will be affected
 * CIQ.Drawing["difference"].prototype.dragToDraw=true;
 * // Set all drawings to dragToDraw
 * CIQ.Drawing.prototype.dragToDraw=true;
 */
CIQ.Drawing.prototype.dragToDraw = false;

/**
 * Set this to true to disable selection, repositioning, and deletion by the end user.
 *
 * This parameter may be set for all drawings, for a specific drawing type, or for a specific drawing instance. See examples.
 * @memberOf CIQ.Drawing
 * @type {boolean}
 * @example
 * // set drawing instance to permanent. Only this one drawing will be affected
 * drawing.permanent=true;
 * // Set particular drawing prototype to permanent. All drawings to type "difference" will be affected
 * CIQ.Drawing["difference"].prototype.permanent=true;
 * // Set all drawings to permanent
 * CIQ.Drawing.prototype.permanent=true;
 */
CIQ.Drawing.prototype.permanent = false;

/**
 * Set this parameter to `true` to restrict drawing from being rendered on a study panel.
 *
 * This parameter may be set for all drawings, for a specific drawing type, or for a specific drawing instance. See examples.
 * @memberOf CIQ.Drawing
 * @type {boolean}
 * @example
 * // Set drawing instance to chartsOnly. Only this one drawing will be affected.
 * drawing.chartsOnly=true;
 * // Set a particular drawing prototype to chartsOnly. All drawings to type "difference" will be affected.
 * CIQ.Drawing["difference"].prototype.chartsOnly=true;
 * // Set all drawings to chartsOnly.
 * CIQ.Drawing.prototype.chartsOnly=true;
 */
CIQ.Drawing.prototype.chartsOnly = false;

/**
 * This function is called to tell a drawing to abort itself. It should clean up any rendered objects such as DOM elements or toggle states. It
 * does not need to clean up anything that it drew on the canvas.
 * @param  {boolean} forceClear Indicates that the user explicitly deleted the drawing (advanced usage).
 * @memberOf CIQ.Drawing
 */
CIQ.Drawing.prototype.abort = function (forceClear) {};

/**
 * Should call this.stx.setMeasure() with the measurements of the drawing if supported.
 * @memberOf CIQ.Drawing
 */
CIQ.Drawing.prototype.measure = function () {};

/**
 * Initializes the drawing
 * @param  {CIQ.ChartEngine} stx The chart object.
 * @param  {CIQ.ChartEngine.Panel} panel The panel reference.
 * @memberOf CIQ.Drawing
 */
CIQ.Drawing.prototype.construct = function (stx, panel) {
	this.stx = stx;
	this.panelName = panel.name;
};

/**
 * Decides if a drawing can be created on the specified field.
 * @param  {CIQ.ChartEngine} stx  The chart object.
 * @param  {string} [field] Field in the dataset, if something other than default.
 * @return  {boolean} Whether a drawing can be made on the field.
 * @memberOf CIQ.Drawing
 * @since 8.6.0
 */
CIQ.Drawing.prototype.isAllowed = function (stx, field) {
	return true;
};

/**
 * Called to render the drawing.
 * @param {CanvasRenderingContext2D} context Canvas context on which to render.
 * @memberOf CIQ.Drawing
 */
CIQ.Drawing.prototype.render = function (context) {
	console.warn("must implement render function!");
};

/**
 * Called when a user clicks while drawing.
 *
 * @param {object} context The canvas context.
 * @param {number} tick The tick in the `dataSet`.
 * @param {number} value The value (price) of the click.
 * @return {boolean} True if the drawing is complete. Otherwise the kernel continues accepting
 * 		clicks.
 *
 * @memberof CIQ.Drawing
 */
CIQ.Drawing.prototype.click = function (context, tick, value) {
	console.warn("must implement click function!");
};

/**
 * Called when the user moves while creating a drawing.
 * @param {CanvasRenderingContext2D} context Canvas context on which to render.
 * @param {number} tick Tick in the `dataSet`.
 * @param {number} value Value at position.
 * @memberOf CIQ.Drawing
 */
CIQ.Drawing.prototype.move = function (context, tick, value) {
	console.warn("must implement move function!");
};

/**
 * Called when the user attempts to reposition a drawing. The repositioner is the object provided
 * by {@link CIQ.Drawing.intersected} and can be used to determine which aspect of the drawing is
 * being repositioned. For instance, this object may indicate which point on the drawing was
 * selected by the user. It might also contain the original coordinates of the point or anything
 * else that is useful to render the drawing.
 *
 * @param  {object} context The canvas context.
 * @param  {object} repositioner The repositioner object.
 * @param  {number} tick Current tick in the `dataSet` for the mouse cursor.
 * @param  {number} value Current value in the `dataSet` for the mouse cursor.
 *
 * @memberof CIQ.Drawing
 */
CIQ.Drawing.prototype.reposition = function (
	context,
	repositioner,
	tick,
	value
) {};
/**
 * Called to determine whether the drawing is intersected by either the tick/value (pointer
 * location) or box (small box surrounding the pointer). For line-based drawings, the box should
 * be checked. For area drawings (rectangles, circles) the point should be checked.
 *
 * @param {number} tick The tick in the `dataSet` representing the cursor point.
 * @param {number} value The value (price) representing the cursor point.
 * @param {object} box	x0, y0, x1, y1, r representing an area around the cursor, including radius.
 * @return {object} An object that contains information about the intersection. This object is
 * 		passed back to {@link CIQ.Drawing.reposition} when repositioning the drawing. Return
 * 		false or null if not intersected. Simply returning true highlights the drawing.
 *
 * @memberof CIQ.Drawing
 */
CIQ.Drawing.prototype.intersected = function (tick, value, box) {
	console.warn("must implement intersected function!");
};

/**
 * Reconstruct this drawing type from a serialization object
 * @param {CIQ.ChartEngine} stx Instance of the chart engine
 * @param {object} obj Serialized data about the drawing from which it can be reconstructed.
 * @memberOf CIQ.Drawing
 */
CIQ.Drawing.prototype.reconstruct = function (stx, obj) {
	console.warn("must implement reconstruct function!");
};

/**
 * Serialize a drawing into an object.
 * @memberOf CIQ.Drawing
 */
CIQ.Drawing.prototype.serialize = function () {
	console.warn("must implement serialize function!");
};

/**
 * Called whenever periodicity changes so that drawings can adjust their rendering.
 * @memberOf CIQ.Drawing
 */
CIQ.Drawing.prototype.adjust = function () {
	console.warn("must implement adjust function!");
};

/**
 * Returns the highlighted state. Set this.highlighted to the highlight state.
 * For simple drawings the highlighted state is just true or false. For complex drawings
 * with pivot points for instance, the highlighted state may have more than two states.
 * Whenever the highlighted state changes a draw() event will be triggered.
 * @param {Boolean} highlighted True to highlight the drawing, false to unhighlight
 * @memberOf CIQ.Drawing
 */
CIQ.Drawing.prototype.highlight = function (highlighted) {
	if (highlighted && !this.highlighted) {
		this.highlighted = highlighted;
	} else if (!highlighted && this.highlighted) {
		this.highlighted = highlighted;
	}
	return this.highlighted;
};

CIQ.Drawing.prototype.littleCircleRadius = function () {
	var radius = 6; //Math.max(12, this.layout.candleWidth)/2;
	return radius;
};

CIQ.Drawing.prototype.littleCircle = function (ctx, x, y, fill) {
	if (this.permanent) return;
	var strokeColor = this.stx.defaultColor;
	var fillColor = CIQ.chooseForegroundColor(strokeColor);
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.arc(x, y, this.littleCircleRadius(), 0, 2 * Math.PI, false);
	if (fill) ctx.fillStyle = strokeColor;
	else ctx.fillStyle = fillColor;
	ctx.strokeStyle = strokeColor;
	ctx.setLineDash([]);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
};

CIQ.Drawing.prototype.rotator = function (ctx, x, y, on) {
	if (this.permanent) return;
	var circleSize = this.littleCircleRadius();
	var strokeColor = this.stx.defaultColor;
	ctx.beginPath();
	ctx.lineWidth = 2;
	if (!on) ctx.globalAlpha = 0.5;
	var radius = 4 + circleSize;
	ctx.arc(x, y, radius, 0, (3 * Math.PI) / 2, false);
	ctx.moveTo(x + 2 + radius, y + 2);
	ctx.lineTo(x + radius, y);
	ctx.lineTo(x - 2 + radius, y + 2);
	ctx.moveTo(x - 2, y + 2 - radius);
	ctx.lineTo(x, y - radius);
	ctx.lineTo(x - 2, y - 2 - radius);
	ctx.strokeStyle = strokeColor;
	ctx.stroke();
	ctx.closePath();
	ctx.globalAlpha = 1;
};

CIQ.Drawing.prototype.mover = function (ctx, x, y, on) {
	if (this.permanent) return;
	var circleSize = this.littleCircleRadius();
	var strokeColor = this.stx.defaultColor;
	var length = 5;
	var start = circleSize + 1;
	ctx.save();
	ctx.lineWidth = 2;
	ctx.strokeStyle = strokeColor;
	ctx.translate(x, y);
	if (!on) ctx.globalAlpha = 0.5;
	for (var i = 0; i < 4; i++) {
		ctx.rotate(Math.PI / 2);
		ctx.beginPath();
		ctx.moveTo(0, start);
		ctx.lineTo(0, start + length);
		ctx.moveTo(-2, start + length - 2);
		ctx.lineTo(0, start + length);
		ctx.lineTo(2, start + length - 2);
		ctx.closePath();
		ctx.stroke();
	}
	ctx.globalAlpha = 1;
	ctx.restore();
};

CIQ.Drawing.prototype.resizer = function (ctx, x, y, on) {
	if (this.permanent) return;
	var circleSize = this.littleCircleRadius();
	var strokeColor = this.stx.defaultColor;
	var length = 5 * Math.sqrt(2);
	var start = circleSize + 1;
	ctx.save();
	ctx.lineWidth = 2;
	ctx.strokeStyle = strokeColor;
	ctx.translate(x, y);
	ctx.rotate(((-(x * y) / Math.abs(x * y)) * Math.PI) / 4);
	if (!on) ctx.globalAlpha = 0.5;
	for (var i = 0; i < 2; i++) {
		ctx.rotate(Math.PI);
		ctx.beginPath();
		ctx.moveTo(0, start);
		ctx.lineTo(0, start + length);
		ctx.moveTo(-2, start + length - 2);
		ctx.lineTo(0, start + length);
		ctx.lineTo(2, start + length - 2);
		ctx.closePath();
		ctx.stroke();
	}
	ctx.globalAlpha = 1;
	ctx.restore();
};

/**
 * Returns true if the tick and value are inside the box
 * @param  {number} tick  The tick
 * @param  {number} value The value
 * @param  {object} box   The box
 * @param  {boolean} isPixels   True if tick and value are in pixels; otherwise, they assumed to be in ticks and untransformed y-axis values, respectively
 * @return {boolean}       True if the tick and value are within the box
 * @memberOf CIQ.Drawing
 * @since 7.0.0 Added `isPixels`.
 */
CIQ.Drawing.prototype.pointIntersection = function (
	tick,
	value,
	box,
	isPixels
) {
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	if (!panel) return false;
	if (this.field && !isPixels) {
		value = this.pixelFromValue(
			panel,
			tick,
			value,
			stx.getYAxisByField(panel, this.field)
		);
		tick = stx.pixelFromTick(tick, panel.chart);
		isPixels = true;
	}
	if (isPixels) {
		if (
			tick >= box.cx0 &&
			tick <= box.cx1 &&
			value >= box.cy0 &&
			value <= box.cy1
		)
			return true;
	} else {
		if (
			tick >= box.x0 &&
			tick <= box.x1 &&
			value >= Math.min(box.y0, box.y1) &&
			value <= Math.max(box.y0, box.y1)
		)
			return true;
	}
	return false;
};

/**
 * Sets the internal properties of the drawing points where x is a tick or a date and y is a value.
 * @param  {number} point    index to point to be converted (0,1)
 * @param  {number|string} x    index of bar in dataSet (tick) or date of tick (string form)
 * @param  {number} y    price
 * @param  {CIQ.ChartEngine.Chart} [chart] Optional chart object
 * @memberOf CIQ.Drawing
 * @since
 * - 04-2015
 * - 8.3.0 `x` tick values outside an allowable range will be replaced by values at the edge
 * 		of the range. This is to prevent performance problems when switching periodicities.
 */
CIQ.Drawing.prototype.setPoint = function (point, x, y, chart) {
	const { stx } = this;
	const { maxTicks = 100, dataSet = [] } = chart || stx.chart || {};
	const minAllowableTick = -maxTicks;
	const maxAllowableTick = dataSet.length - 1 + maxTicks;
	let tick = null;
	let date = null;

	if (typeof x == "number") tick = x;
	else if (x.length >= 8) date = x;
	else tick = Number(x);

	if (y || y === 0) this["v" + point] = y;

	if (tick !== null) {
		// tick is restricted to an allowable range to eliminate the possibility of numbers wildly
		// outside dataSet which could result in possibly millions of market class function calls
		// the same restriction is not applied if setting a date instead of a tick as the date to
		// tick conversion does not introduce the same performance complications as tick to date
		tick = Math.max(tick, minAllowableTick);
		tick = Math.min(tick, maxAllowableTick);
		const d = stx.dateFromTick(tick, chart, true);
		this["tzo" + point] = d.getTimezoneOffset();
		this["d" + point] = CIQ.yyyymmddhhmmssmmm(d);
		this["p" + point] = [tick, y];
	} else if (date !== null) {
		const d = CIQ.strToDateTime(date);
		if (!this["tzo" + point] && this["tzo" + point] !== 0)
			this["tzo" + point] = d.getTimezoneOffset();
		this["d" + point] = date;
		const adj = this["tzo" + point] - d.getTimezoneOffset();
		d.setMinutes(d.getMinutes() + adj);
		let forward = false;
		// if no match, we advance on intraday when there is a no time portion
		// except for free form which already handles time placement internally
		if (
			this.name != "freeform" &&
			!CIQ.ChartEngine.isDailyInterval(stx.layout.interval) &&
			!d.getHours() &&
			!d.getMinutes() &&
			!d.getSeconds() &&
			!d.getMilliseconds()
		)
			forward = true;

		this["p" + point] = [
			stx.tickFromDate(CIQ.yyyymmddhhmmssmmm(d), chart, null, forward),
			y
		];
	}
};

/**
 * Compute the proper color to use when rendering lines in the drawing.
 *
 * Will use the color but if set to auto or transparent, will use the container's defaultColor.
 * However, if color is set to auto and the drawing is based off a series or study plot,
 * this function will return that plot's color.
 * If drawing is highlighted will use the highlight color as defined in stx_highlight_vector style.
 * @param {string} color Color string to check and use as a basis for setting.  If not supplied, uses this.color.
 * @param {boolean} [ignoreHighlight] True to ignore highlighting status when determining color (for example, if a label, or if determining fill color).
 * @return {string} Color to use for the line drawing
 * @memberOf CIQ.Drawing
 * @since
 * - 7.0.0 Replaces `setLineColor`. Will return source line's color if auto.
 * - 8.4.0 Added `isLabel` parameter.
 * - 9.1.2 Changed name of `isLabel` parameter to `ignoreHighlight`.
 * @example
 * 		var trendLineColor=this.getLineColor();
 *		this.stx.plotLine(x0, x1, y0, y1, trendLineColor, "segment", context, panel, parameters);
 */
CIQ.Drawing.prototype.getLineColor = function (color, ignoreHighlight) {
	if (!color) color = this.color;
	var stx = this.stx,
		lineColor = color;
	if (
		!ignoreHighlight &&
		this.highlighted &&
		this.stx.editingDrawing !== this
	) {
		lineColor = stx.getCanvasColor("stx_highlight_vector");
	} else if (lineColor == "auto") {
		lineColor = stx.defaultColor;
		if (this.field) {
			// ugh, need to search for it
			var n;
			for (n in stx.layout.studies) {
				var s = stx.layout.studies[n];
				var candidateColor = s.outputs[s.outputMap[this.field]];
				if (candidateColor) {
					lineColor = candidateColor.color || candidateColor;
					break;
				}
			}
			var fallBackOn;
			for (n in stx.chart.seriesRenderers) {
				var renderer = stx.chart.seriesRenderers[n];
				for (var m = 0; m < renderer.seriesParams.length; m++) {
					var series = renderer.seriesParams[m];
					var fullField = series.field;
					if (!fullField && !renderer.highLowBars)
						fullField = this.defaultPlotField || "Close";
					if (series.symbol && series.subField)
						fullField += "-->" + series.subField;
					if (this.field == fullField) {
						lineColor = series.color;
						break;
					}
					if (series.field && series.field == this.field.split("-->")[0])
						fallBackOn = series.color;
				}
			}
			if (fallBackOn) lineColor = fallBackOn;
		}
	}
	if (lineColor == "auto") lineColor = stx.defaultColor;

	return lineColor;
};

/**
 * Returns the value (price) of a drawing given a y-axispixel. The value is relative to the panel or the canvas.
 * This function is preferred over {@link CIQ.ChartEngine#valueFromPixel} when used by drawing functions because
 * it automatically returns the value based off the plot corresponding the drawing's `field` property.
 * {@link CIQ.ChartEngine#valueFromPixel} usually returns the value of the main series plot.
 * @param  {number} pixel	  The y pixel position
 * @param  {CIQ.ChartEngine.Panel} [panel] A panel object. If passed then the value will be relative to that panel. If not passed then the value will be relative to the panel that is in the actual Y location.
 * @param  {CIQ.ChartEngine.YAxis} [yAxis] Which yAxis. Defaults to panel.yAxis.
 * @return {number}		  The value relative to the panel, of the plot whose field matches the field property of the drawing
 * @memberof CIQ.Drawing
 * @since 8.4.0
 */
CIQ.Drawing.prototype.valueFromPixel = function (pixel, panel, yAxis) {
	const untransformFunc = panel.chart.untransformFunc,
		field = this.field;
	if (untransformFunc && panel.chart.series[field])
		panel.chart.untransformFunc = (stx, chart, pixel, yAxis) =>
			untransformFunc(stx, chart, pixel, yAxis, field);
	const value = this.stx.valueFromPixel(pixel, panel, yAxis);
	panel.chart.untransformFunc = untransformFunc;
	return value;
};

/**
 * Returns the Y pixel location for the (split) unadjusted price rather than the displayed price for a drawing.
 * This is important for drawing tools or any other device that requires the actual underlying price.
 * This function is preferred over {@link CIQ.ChartEngine#pixelFromValueAdjusted} when used by drawing functions
 * because it automatically returns the pixel based off the value of the plot corresponding the drawing's
 * `field` property.
 * {@link CIQ.ChartEngine#pixelFromValueAdjusted} usually returns the pixel of the main series plot's value.
 *
 * @param  {CIQ.ChartEngine.Panel} panel The panel to get the value from
 * @param  {number} tick  The tick location (in the dataSet) to check for an adjusted value
 * @param  {number} value The value
 * @param {CIQ.ChartEngine.YAxis} [yAxis] The yaxis to use
 * @return {number}		  The pixel location of the plot whose field matches the field property of the drawing
 * @memberof CIQ.Drawing
 * @since 8.4.0
 */
CIQ.Drawing.prototype.pixelFromValue = function (panel, tick, value, yAxis) {
	const transformFunc = panel.chart.transformFunc,
		field = this.field;
	if (transformFunc && panel.chart.series[field])
		panel.chart.transformFunc = (stx, chart, price, yAxis) =>
			transformFunc(stx, chart, price, yAxis, field);
	const pixel = this.stx.pixelFromValueAdjusted(panel, tick, value, yAxis);
	panel.chart.transformFunc = transformFunc;
	return pixel;
};

/**
 * Converts a box represented by two corner coordinates [tick0,value0] and [tick1,value1] into pixel coordinates.
 * This is important for drawing tools or any other device that requires the actual underlying price.
 * This function is preferred over {@link CIQ.convertBoxToPixels} when used by drawing functions because it
 * automatically returns the pixel values based off the values of the box as if they were values of the plot
 * corresponding to the drawing's `field` property.
 * {@link CIQ.convertBoxToPixels} usually returns the pixel values of the box assuming those values are the main series plot's values.
 * @param {CIQ.ChartEngine} stx The chartEngine
 * @param  {string} panelName  Panel on which the coordinates reside
 * @param  {object} box Box to convert
 * @param  {number} [box.x0]
 * @param  {number} [box.y0]
 * @param  {number} [box.x1]
 * @param  {number} [box.y1]
 * @param  {CIQ.ChartEngine.YAxis} [yAxis]
 * @return  {object} A converted box
 * @memberof CIQ.Drawing
 * @since 8.4.0
 */
CIQ.Drawing.prototype.boxToPixels = function (stx, panelName, box, yAxis) {
	const panel = stx.panels[panelName],
		transformFunc = panel.chart.transformFunc,
		field = this.field;
	if (transformFunc && panel.chart.series[field])
		panel.chart.transformFunc = (stx, chart, price, yAxis) =>
			transformFunc(stx, chart, price, yAxis, field);
	const boxWithPixels = CIQ.convertBoxToPixels(stx, panelName, box, yAxis);
	panel.chart.transformFunc = transformFunc;
	return boxWithPixels;
};

/**
 * Base class for drawings that require two mouse clicks. Override as required.
 * @constructor
 * @name  CIQ.Drawing.BaseTwoPoint
 */
CIQ.Drawing.BaseTwoPoint = function () {
	this.p0 = null;
	this.p1 = null;
	this.color = "";
};

CIQ.inheritsFrom(CIQ.Drawing.BaseTwoPoint, CIQ.Drawing);

CIQ.Drawing.BaseTwoPoint.prototype.configs = [];

/**
 * Intersection is based on a hypothetical box that follows a user's mouse or finger. An
 * intersection occurs when the box crosses over the drawing. The type should be "segment", "ray"
 * or "line" depending on whether the drawing extends infinitely in any or both directions. Radius
 * determines the size of the box in pixels and is determined by the kernel depending on the user
 * interface (mouse, touch, etc.).
 *
 * @param {number} tick Tick in the `dataSet`.
 * @param {number} value Value at the cursor position.
 * @param {object} box x0, y0, x1, y1, r representing an area around the cursor, including the
 * 		radius.
 * @param {string} type Determines how the line should be treated (as segment, ray, or line) when
 * 		finding an intersection.
 * @param {number[]} [p0] The x/y coordinates of the first endpoint of the line that is tested for
 * 		intersection with `box`.
 * @param {number[]} [p1] The x/y coordinates of the second endpoint of the line that is tested for
 * 		intersection with `box`.
 * @param {boolean} [isPixels] Indicates that box values are in pixel values.
 * @return {boolean} True if the line intersects the box; otherwise, false.
 *
 * @memberOf CIQ.Drawing.BaseTwoPoint
 */
CIQ.Drawing.BaseTwoPoint.prototype.lineIntersection = function (
	tick,
	value,
	box,
	type,
	p0,
	p1,
	isPixels
) {
	if (!p0) p0 = this.p0;
	if (!p1) p1 = this.p1;
	var stx = this.stx;
	if (!(p0 && p1)) return false;
	if (box.cx0 === undefined) return false;
	var pixelPoint = { x0: p0[0], x1: p1[0], y0: p0[1], y1: p1[1] };
	if (!isPixels)
		pixelPoint = this.boxToPixels(
			stx,
			this.panelName,
			pixelPoint,
			stx.getYAxisByField(stx.panels[this.panelName], this.field)
		);
	return CIQ.boxIntersects(
		box.cx0,
		box.cy0,
		box.cx1,
		box.cy1,
		pixelPoint.x0,
		pixelPoint.y0,
		pixelPoint.x1,
		pixelPoint.y1,
		type
	);
};

/**
 * Determine whether the tick/value lies within the theoretical box outlined by this drawing's two
 * points.
 *
 * @param {number} tick Tick in the `dataSet`.
 * @param {number} value Value at position.
 * @param {object} box x0, y0, x1, y1, r representing an area around the cursor, including the
 * 		radius.
 * @return {boolean} True if box intersects the drawing.
 *
 * @memberOf CIQ.Drawing.BaseTwoPoint
 */
CIQ.Drawing.BaseTwoPoint.prototype.boxIntersection = function (
	tick,
	value,
	box
) {
	if (!this.p0 || !this.p1) return false;
	let { x0, x1, y0, y1, cy0, cy1 } = box;
	if (
		x0 > Math.max(this.p0[0], this.p1[0]) ||
		x1 < Math.min(this.p0[0], this.p1[0])
	)
		return false;
	const { field, panelName, stx } = this;
	if (field) {
		const panel = stx.panels[panelName];
		const yAxis = stx.getYAxisByField(panel, field);
		y0 = this.valueFromPixel(cy0, panel, yAxis);
		y1 = this.valueFromPixel(cy1, panel, yAxis);
	}
	if (
		y1 > Math.max(this.p0[1], this.p1[1]) ||
		y0 < Math.min(this.p0[1], this.p1[1])
	)
		return false;
	return true;
};

/**
 * Any two-point drawing that results in a drawing that is less than 10 pixels
 * can safely be assumed to be an accidental click. Such drawings are so small
 * that they are difficult to highlight and delete, so we won't allow them.
 *
 * <b>Note:</b> it is very important to use {@link CIQ.Drawing#pixelFromValue}. This will ensure that
 * saved drawings always render correctly when a chart is adjusted or transformed for display.
 * @param {number} tick Tick in the `dataSet`.
 * @param {number} value Value at position.
 * @memberOf CIQ.Drawing.BaseTwoPoint
 */
CIQ.Drawing.BaseTwoPoint.prototype.accidentalClick = function (tick, value) {
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	var x0 = stx.pixelFromTick(this.p0[0], panel.chart);
	var x1 = stx.pixelFromTick(tick, panel.chart);
	var yAxis = stx.getYAxisByField(panel, this.field);
	var y0 = this.pixelFromValue(panel, this.p0[0], this.p0[1], yAxis);
	var y1 = this.pixelFromValue(panel, tick, value, yAxis);
	var h = Math.abs(x1 - x0);
	var v = Math.abs(y1 - y0);
	var length = Math.sqrt(h * h + v * v);
	if (length < 10) {
		this.penDown = false;
		stx.undo();
		return true;
	}
};

/**
 * Value will be the actual underlying, unadjusted value for the drawing. Any adjustments or transformations
 * are reversed out by the kernel. Internally, drawings should store their raw data (date and value) so that
 * they can be rendered on charts with different layouts, axis, etc
 * @param {CanvasRenderingContext2D} context Canvas context on which to render.
 * @param {number} tick Tick in the `dataSet`.
 * @param {number} value Value at position.
 * @memberOf CIQ.Drawing.BaseTwoPoint
 */
CIQ.Drawing.BaseTwoPoint.prototype.click = function (context, tick, value) {
	this.copyConfig();
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	if (!this.penDown) {
		this.setPoint(0, tick, value, panel.chart);
		this.penDown = true;
		return false;
	}
	if (this.accidentalClick(tick, value)) return true;

	this.setPoint(1, tick, value, panel.chart);
	this.penDown = false;
	return true; // kernel will call render after this
};

/**
 * Default adjust function for BaseTwoPoint drawings
 * @memberOf CIQ.Drawing.BaseTwoPoint
 */
CIQ.Drawing.BaseTwoPoint.prototype.adjust = function () {
	// If the drawing's panel doesn't exist then we'll check to see
	// whether the panel has been added. If not then there's no way to adjust
	var panel = this.stx.panels[this.panelName];
	if (!panel) return;
	this.setPoint(0, this.d0, this.v0, panel.chart);
	this.setPoint(1, this.d1, this.v1, panel.chart);
};

/**
 * Default move function for BaseTwoPoint drawings
 * @param {CanvasRenderingContext2D} context Canvas context on which to render.
 * @param {number} tick Tick in the `dataSet`.
 * @param {number} value Value at position.
 * @memberOf CIQ.Drawing.BaseTwoPoint
 */
CIQ.Drawing.BaseTwoPoint.prototype.move = function (context, tick, value) {
	if (!this.penDown) {
		this.moving = false;
		return;
	}
	this.moving = true;
	this.copyConfig();
	this.p1 = [tick, value];
	this.render(context);
};

/**
 * Default measure function for BaseTwoPoint drawings
 * @memberOf CIQ.Drawing.BaseTwoPoint
 */
CIQ.Drawing.BaseTwoPoint.prototype.measure = function () {
	var stx = this.stx;
	if (this.p0 && this.p1) {
		stx.setMeasure(
			this.p0[1],
			this.p1[1],
			this.p0[0],
			this.p1[0],
			true,
			this.name
		);
		var mSticky = stx.controls.mSticky;
		var mStickyInterior = mSticky && mSticky.querySelector(".mStickyInterior");
		if (mStickyInterior) {
			var lines = [];
			lines.push(stx.translateIf(CIQ.capitalize(this.name)));
			if (this.getYValue)
				lines.push(
					stx.translateIf(this.field || stx.defaultPlotField || "Close")
				);
			lines.push(mStickyInterior.innerHTML);
			mStickyInterior.innerHTML = lines.join("<br>");
		}
	}
};

CIQ.Drawing.BaseTwoPoint.prototype.reposition = function (
	context,
	repositioner,
	tick,
	value
) {
	if (!repositioner) return;
	var panel = this.stx.panels[this.panelName];
	var tickDiff = repositioner.tick - tick;
	var valueDiff = repositioner.value - value;
	if (repositioner.action == "move") {
		this.setPoint(
			0,
			repositioner.p0[0] - tickDiff,
			repositioner.p0[1] - valueDiff,
			panel.chart
		);
		this.setPoint(
			1,
			repositioner.p1[0] - tickDiff,
			repositioner.p1[1] - valueDiff,
			panel.chart
		);
		this.render(context);
	} else if (repositioner.action == "drag") {
		this[repositioner.point] = [tick, value];
		this.setPoint(0, this.p0[0], this.p0[1], panel.chart);
		this.setPoint(1, this.p1[0], this.p1[1], panel.chart);
		this.render(context);
	}
};

CIQ.Drawing.BaseTwoPoint.prototype.drawDropZone = function (
	context,
	hBound1,
	hBound2,
	leftBound,
	rightBound
) {
	var panel = this.stx.panels[this.panelName];
	if (!panel) return;
	var stx = this.stx;
	var x0 = panel.left;
	var x1 = panel.width;
	if (leftBound || leftBound === 0)
		x0 = stx.pixelFromTick(leftBound, panel.chart);
	if (rightBound || rightBound === 0)
		x1 = stx.pixelFromTick(rightBound, panel.chart);
	var yAxis = stx.getYAxisByField(panel, this.field);
	var y0 = this.pixelFromValue(panel, leftBound, hBound1, yAxis);
	var y1 = this.pixelFromValue(panel, rightBound, hBound2, yAxis);
	context.fillStyle = "#008000";
	context.globalAlpha = 0.2;
	context.fillRect(x0, y0, x1 - x0, y1 - y0);
	context.globalAlpha = 1;
};

/**
 * Returns the Y value on the drawing's axis of the value passed in which is on the panel's main y-axis.
 *
 * @param  {number} tick  The tick location (in the dataSet) to check for an adjusted value
 * @param  {number} value The value
 * @return {number} The value on the drawing's axis.
 *
 * @memberOf CIQ.Drawing.BaseTwoPoint#
 * @since 8.4.0
 */
CIQ.Drawing.BaseTwoPoint.prototype.valueOnDrawingAxis = function (tick, value) {
	const { stx, panelName, field } = this;
	const panel = stx.panels[panelName];
	return this.valueFromPixel(
		stx.pixelFromValueAdjusted(stx.currentPanel, tick, value),
		panel,
		stx.getYAxisByField(panel, field)
	);
};

/**
 * Annotation drawing tool. An annotation is a simple text tool. It uses the class stx_annotation
 * to determine the font style and color for the annotation. Class stx_annotation_highlight_bg is used to
 * determine the background color when highlighted.
 *
 * The controls controls.annotationSave and controls.annotationCancel are used to create HTMLElements for
 * saving and canceling the annotation while editing. A textarea is created dynamically. The annotation tool
 * attempts to draw the annotations at the same size and position as the textarea so that the effect is wysiwig.
 * @constructor
 * @name  CIQ.Drawing.annotation
 * @see {@link CIQ.Drawing.BaseTwoPoint}
 * @since 8.8.0 Added support for emoji short names, which resolve into emojis.
 */
CIQ.Drawing.annotation = function () {
	this.name = "annotation";
	this.arr = [];
	this.w = 0;
	this.h = 0;
	this.padding = 5;
	this.text = "";
	this.ta = null;
	this.border = true;
	this.fontSize = 0;
	this.font = {};
	this.defaultWidth = 25;
	this.whitespace = 30;
	this.fontModifier = 3;
};
CIQ.inheritsFrom(CIQ.Drawing.annotation, CIQ.Drawing.BaseTwoPoint);

CIQ.Drawing.annotation.prototype.getFontString = function () {
	this.fontDef = {
		style: null,
		weight: null,
		size: "12px",
		family: null
	};
	var css = this.stx.canvasStyle("stx_annotation");
	if (css) {
		if (css.fontStyle) this.fontDef.style = css.fontStyle;
		if (css.fontWeight) this.fontDef.weight = css.fontWeight;
		if (css.fontSize) this.fontDef.size = css.fontSize;
		if (css.fontFamily) this.fontDef.family = css.fontFamily;
	}
	if (this.font.style) this.fontDef.style = this.font.style;
	if (this.font.weight) this.fontDef.weight = this.font.weight;
	if (this.font.size) this.fontDef.size = this.font.size;
	if (this.font.family) this.fontDef.family = this.font.family;
	this.fontString = "";
	var first = true;
	for (var n in this.fontDef) {
		if (this.fontDef[n]) {
			if (!first) {
				this.fontString += " ";
			} else {
				first = false;
			}
			this.fontString += this.fontDef[n];
		}
	}
};

CIQ.Drawing.annotation.prototype.configs = ["color", "font"];

CIQ.Drawing.annotation.prototype.measure = function () {};

CIQ.Drawing.annotation.prototype.render = function (context) {
	if (this.ta) return;
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	var yAxis = stx.getYAxisByField(panel, this.field);
	if (!panel || (this.field && !yAxis)) return;
	var x0 = stx.pixelFromTick(this.p0[0], panel.chart);
	var y0 = this.pixelFromValue(panel, this.p0[0], this.p0[1], yAxis);

	context.font = this.fontString;
	context.textBaseline = "middle";
	var x = x0;
	var y = y0;
	var w = this.w;
	var h = this.h;

	var color = this.getLineColor();
	if (this.stem) {
		var sx0, sx1, sy0, sy1;
		if (this.stem.d) {
			// absolute positioning of stem
			sx0 = stx.pixelFromTick(this.stem.t); // bottom of stem
			sy0 = this.pixelFromValue(panel, this.stem.t, this.stem.v, yAxis);
			sx1 = x + w / 2; // center of text
			sy1 = y + h / 2;
		} else if (this.stem.x) {
			// stem with relative offset positioning
			sx0 = x;
			sy0 = y;
			x += this.stem.x;
			y += this.stem.y;
			sx1 = x + w / 2;
			sy1 = y + h / 2;
		}

		context.beginPath();
		if (this.borderColor) context.strokeStyle = this.borderColor;
		else context.strokeStyle = color;
		context.moveTo(sx0, sy0);
		context.lineTo(sx1, sy1);
		context.stroke();
	}
	var lineWidth = context.lineWidth;
	if (this.highlighted) {
		stx.canvasColor("stx_annotation_highlight_bg", context);
		context.fillRect(
			x - lineWidth,
			y - h / 2 - lineWidth,
			w + 2 * lineWidth,
			h + 2 * lineWidth
		);
	} else {
		if (this.fillColor) {
			context.fillStyle = this.getLineColor(this.fillColor, true);
			context.fillRect(x, y - h / 2, w, h);
		} else if (this.stem) {
			// If there's a stem then use the container color otherwise the stem will show through
			context.fillStyle = stx.containerColor;
			context.fillRect(x, y - h / 2, w, h);
		}
	}
	if (this.borderColor) {
		context.beginPath();
		context.strokeStyle = this.highlighted
			? stx.getCanvasColor("stx_highlight_vector")
			: this.borderColor;
		context.rect(
			x - lineWidth,
			y - h / 2 - lineWidth,
			w + 2 * lineWidth,
			h + 2 * lineWidth
		);
		context.stroke();
	}

	if (this.highlighted) {
		stx.canvasColor("stx_annotation_highlight", context);
	} else {
		context.fillStyle = color;
	}
	y += this.padding / 2;
	if (!this.ta) {
		for (var i = 0; i < this.arr.length; i++) {
			context.fillText(
				this.arr[i],
				x + this.padding,
				y - h / 2 + this.fontSize / 2
			);
			y += this.fontSize + 2; // 2 px space between lines
		}
	}
	context.textBaseline = "alphabetic";
};

CIQ.Drawing.annotation.prototype.onChange = function (e) {
	//no operation. Override if you want to capture the change.
};

CIQ.Drawing.annotation.prototype.edit = function (context, editExisting) {
	var panel = this.stx.panels[this.panelName];
	if (!panel) return;
	// When mouse events are attached to the container then any dom objects on top
	// of the container will intercept those events. In particular, the textarea for
	// annotations gets in the way, so here we capture the mouseup that fires on the textarea
	// and pass it along to the kernel if necessary
	function handleTAMouseUp(stx) {
		return function (e) {
			if (stx.manageTouchAndMouse && CIQ.ChartEngine.drawingLine) {
				stx.mouseup(e);
			}
		};
	}

	function cancelAnnotation(self) {
		return function (e) {
			self.stx.undo();
		};
	}
	function saveAnnotation(self) {
		return function (e) {
			if (!self.ta || !self.ta.value) return;
			self.text = self.ta.value;
			var stx = self.stx;
			stx.editingAnnotation = false;
			self.adjust();
			if (stx.drawingSnapshot) {
				stx.undoStamp(
					CIQ.shallowClone(stx.drawingSnapshot),
					stx.exportDrawings()
				);
			} else {
				CIQ.ChartEngine.completeDrawing(stx);
				stx.addDrawing(self); // add only if it's not already there (text being modified)
			}
			stx.undo();
			stx.changeOccurred("vector");
		};
	}

	function resizeAnnotation(self) {
		return function (e) {
			if (e) {
				var key = e.keyCode;
				switch (key) {
					case 27:
						self.stx.undo();
						return;
				}
			}

			var stx = self.stx;
			var ta = self.ta;
			var arr = ta.value.split("\n");
			var w = 0;

			stx.chart.context.font = self.fontString;
			self.fontSize = CIQ.stripPX(self.fontDef.size);
			for (var i = 0; i < arr.length; i++) {
				var m = stx.chart.context.measureText(arr[i]).width;
				if (m > w) w = m;
			}
			var h = (arr.length + 1) * (self.fontSize + self.fontModifier);
			if (CIQ.touchDevice) h += 5;
			w = Math.max(w, self.defaultWidth * 2);
			ta.style.width = w + self.whitespace + "px"; // Leave room for scroll bar
			ta.style.height = h + "px";
			var y = parseInt(CIQ.stripPX(ta.style.top), 10);
			var x = Math.max(0, CIQ.stripPX(ta.style.left));
			w = ta.clientWidth;
			h = ta.clientHeight;
			ta.focus();
			if (self.border === false) ta.style.border = "none";
			if (x + w + 100 < self.stx.chart.canvasWidth) {
				save.style.top = y + "px";
				cancel.style.top = y + "px";
				save.style.left = x + w + 10 + "px";
				save.style.display = "inline-block";
				cancel.style.left = x + w + save.clientWidth + 5 + "px";
				cancel.style.display = "inline-block";
			} else if (y + h + 30 < self.stx.chart.canvasHeight) {
				save.style.top = y + h + 10 + "px";
				cancel.style.top = y + h + 10 + "px";
				save.style.left = x + "px";
				save.style.display = "inline-block";
				cancel.style.left = x + save.clientWidth - 5 + "px";
				cancel.style.display = "inline-block";
			} else {
				save.style.top = y - 35 + "px";
				cancel.style.top = y - 35 + "px";
				save.style.left = x + "px";
				save.style.display = "inline-block";
				cancel.style.left = x + save.clientWidth - 5 + "px";
				cancel.style.display = "inline-block";
			}
		};
	}

	var save = this.stx.controls.annotationSave;
	var cancel = this.stx.controls.annotationCancel;
	if (!save || !cancel) return;

	var stx = this.stx,
		ta = this.ta;
	stx.editingAnnotation = true;
	stx.undisplayCrosshairs();
	if (!stx.openDialog) stx.openDialog = [];
	if (!stx.openDialog.includes("annotation")) stx.openDialog.push("annotation");
	if (!ta) {
		ta = this.ta = document.createElement("TEXTAREA");
		ta.className = "stx_annotation";
		ta.onkeyup = resizeAnnotation(this);
		ta.onmouseup = handleTAMouseUp(stx);
		ta.setAttribute("wrap", "hard");
		if (CIQ.isIOS7or8) ta.setAttribute("placeholder", "Enter Text");
		stx.chart.container.appendChild(ta);
		ta.style.position = "absolute";
		ta.style.paddingLeft = this.padding + "px";
		ta.value = this.text;
		if (CIQ.touchDevice) {
			ta.ontouchstart = function (e) {
				e.stopPropagation();
			};
			/*var ta=this.ta;
				CIQ.safeClickTouch(this.ta, function(e){
					if(document.activeElement===ta){
							window.focus();
							CIQ.focus(ta, true);
					}
				});*/
		}
	}
	var self = this;
	ta.oninput = function (e) {
		e.target.value = stx.emojify(e.target.value);
		// disable browser undo history due to hidden textarea with contenteditable
		if (e.inputType != "historyUndo" && e.inputType != "historyRedo")
			self.onChange(e);
	};
	ta.style.font = this.fontString;
	if (this.color) {
		if (this.color == "transparent" || this.color == "auto") {
			var styles = getComputedStyle(ta);
			if (styles && CIQ.isTransparent(styles.backgroundColor)) {
				ta.style.color = this.getLineColor();
			} else {
				ta.style.color = "#000"; // text area always has white background
			}
		} else {
			ta.style.color = this.color;
		}
	}
	var x0 = stx.pixelFromTick(this.p0[0], panel.chart);
	var y0 = this.pixelFromValue(
		panel,
		this.p0[0],
		this.p0[1],
		stx.getYAxisByField(panel, this.field)
	);

	//if the right edge of the ta is off of the screen, scootch it to the left.
	ta.style.left =
		x0 + 140 < stx.chart.canvasRight
			? x0 + "px"
			: stx.chart.canvasRight - 200 + "px";
	//if user clicks within 60 px of bottom of the chart,scootch it up.
	ta.style.top =
		y0 + 60 < stx.chart.canvasHeight
			? y0 - (!isNaN(this.h) ? this.h / 2 : this.defaultHeight) + "px"
			: y0 - 60 + "px";
	if (this.repositionTextArea) {
		this.repositionTextArea(ta);
	}

	if (editExisting) {
		this.w = ta.clientWidth;
		this.h = ta.clientHeight;
	}
	//prevent annotation textarea from stretching beyond chart canvas
	const left = CIQ.stripPX(ta.style.left);
	ta.style.maxWidth =
		Math.min(left + this.w, stx.chart.right) - left - 5 + "px";

	if (ta !== save.ta) {
		CIQ.safeClickTouch(save, saveAnnotation(this));
		save.ta = ta;
	}

	if (ta !== cancel.ta) {
		CIQ.safeClickTouch(cancel, cancelAnnotation(this));
		cancel.ta = ta;
	}

	resizeAnnotation(this)();

	context = stx.chart.tempCanvas.context;
	CIQ.clearCanvas(context.canvas, stx);
	context.canvas.style.display = "block";
	if (editExisting) {
		// lift the drawing off the canvas and onto the tempCanvas
		stx.drawingSnapshot = stx.exportDrawings();
		this.hidden = true;
		stx.draw();
		stx.activeDrawing = this;
		CIQ.ChartEngine.drawingLine = true;
		this.highlighted = false;
		renderClipped(context);
		this.edit(context);
	} else {
		renderClipped(context);
	}

	if (CIQ.isAndroid && !CIQ.is_chrome && !CIQ.isFF) {
		// Android soft keyboard will cover up the lower half of the browser so if our
		// annotation is in that area we temporarily scroll the chart container upwards
		// The style.bottom of the chart container is reset in abort()
		this.priorBottom = stx.container.style.bottom;
		var keyboardHeight = 400; // hard coded. We could get this by measuring the change in innerHeight but timing is awkward because the keyboard scrolls
		var screenLocation = stx.resolveY(y0) + 100; // figure 100 pixels of height for text
		var view = stx.container.ownerDocument.defaultView;
		if (screenLocation > CIQ.pageHeight(view) - keyboardHeight) {
			var pixelsFromBottomOfScreen = CIQ.pageHeight(view) - screenLocation;
			var scrolledBottom = keyboardHeight - pixelsFromBottomOfScreen;
			stx.chart.container.style.bottom = scrolledBottom + "px";
		}
	}

	function renderClipped(context) {
		stx.startClip(panel.name);
		self.render(context);
		stx.endClip();
	}
};

CIQ.Drawing.annotation.prototype.click = function (context, tick, value) {
	//don't allow user to add annotation on the axis.
	if (this.stx.overXAxis || this.stx.overYAxis) return;
	var panel = this.stx.panels[this.panelName];
	this.copyConfig();
	//this.getFontString();
	this.setPoint(0, tick, value, panel.chart);
	this.adjust();

	this.edit(context);
	return false;
};

CIQ.Drawing.annotation.prototype.reposition = function (
	context,
	repositioner,
	tick,
	value
) {
	if (!repositioner) return;
	var panel = this.stx.panels[this.panelName];
	var tickDiff = repositioner.tick - tick;
	var valueDiff = repositioner.value - value;
	this.setPoint(
		0,
		repositioner.p0[0] - tickDiff,
		repositioner.p0[1] - valueDiff,
		panel.chart
	);
	this.render(context);
};

CIQ.Drawing.annotation.prototype.intersected = function (tick, value, box) {
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	if (!this.p0) return null; // in case invalid drawing (such as from panel that no longer exists)
	var x0 = stx.pixelFromTick(this.p0[0], panel.chart);
	var yAxis = stx.getYAxisByField(panel, this.field);
	var y0 =
		this.pixelFromValue(panel, this.p0[0], this.p0[1], yAxis) - this.h / 2;
	var x1 = x0 + this.w;
	var y1 = y0 + this.h;
	if (this.stem && this.stem.x) {
		x0 += this.stem.x;
		x1 += this.stem.x;
		y0 += this.stem.y;
		y1 += this.stem.y;
	}
	var x = stx.pixelFromTick(tick, panel.chart);
	var y = stx.pixelFromValueAdjusted(panel, tick, value);

	if (
		x + box.r >= x0 &&
		x - box.r <= x1 &&
		y + box.r >= y0 &&
		y - box.r <= y1
	) {
		this.highlighted = true;
		return {
			p0: CIQ.clone(this.p0),
			tick: tick,
			value: this.valueOnDrawingAxis(tick, value)
		};
	}
	return false;
};

CIQ.Drawing.annotation.prototype.abort = function () {
	var stx = this.stx,
		save = stx.controls.annotationSave,
		cancel = stx.controls.annotationCancel;
	if (save) save.style.display = "none";
	if (cancel) cancel.style.display = "none";
	if (this.ta) stx.chart.container.removeChild(this.ta);
	this.ta = null;
	if (stx.openDialog) {
		stx.openDialog = stx.openDialog.filter((i) => i !== "annotation");
	}
	if (!stx.openDialog.length) stx.openDialog = "";
	stx.showCrosshairs();
	//document.body.style.cursor="crosshair"; //Was interfering with undisplayCrosshairs().
	stx.editingAnnotation = false;
	CIQ.clearCanvas(stx.chart.tempCanvas, stx);
	if (CIQ.isAndroid && !CIQ.is_chrome && !CIQ.isFF) {
		stx.chart.container.style.bottom = this.priorBottom;
	}
	CIQ.fixScreen();
};

/**
 * Reconstruct an annotation
 * @param {CIQ.ChartEngine} stx The chart object
 * @param {object} [obj] A drawing descriptor
 * @param {string} [obj.col] The text color for the annotation
 * @param {string} [obj.pnl] The panel name
 * @param {string} [obj.d0] String form date or date time
 * @param {number} [obj.v0] The value at which to position the annotation
 * @param {string} [obj.fld] Field which drawing is associated with
 * @param {string} [obj.text] The annotation text (escaped using encodeURIComponent())
 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
 * @param {string} [obj.bc] Border color
 * @param {string} [obj.bg] Background color
 * @param {string} [obj.lw] Line width
 * @param {string} [obj.ptrn] Line pattern
 * @param {object} [obj.fnt] Font
 * @param {object} [obj.fnt.st] Font style
 * @param {object} [obj.fnt.sz] Font size
 * @param {object} [obj.fnt.wt] Font weight
 * @param {object} [obj.fnt.fl] Font family
 * @param {number} [obj.prm] Whether the drawing is permanent
 * @param {number} [obj.hdn] Whether the drawing is hidden
 * @memberOf CIQ.Drawing.annotation
 *
 * @since 8.4.0 Added `fld` property to `obj` parameter.
 * @since 9.0.0 Added `prm` and `hdn` property to `obj` parameter.
 */
CIQ.Drawing.annotation.prototype.reconstruct = function (stx, obj) {
	this.stx = stx;
	this.color = obj.col;
	this.panelName = obj.pnl;
	this.d0 = obj.d0;
	this.tzo0 = obj.tzo0;
	this.v0 = obj.v0;
	this.field = obj.fld;
	this.text = stx.escapeOnSerialize ? decodeURIComponent(obj.text) : obj.text;
	this.stem = obj.stem;
	this.borderColor = obj.bc;
	this.fillColor = obj.bg;
	this.lineWidth = obj.lw;
	this.pattern = obj.ptrn;
	this.font = CIQ.replaceFields(obj.fnt, {
		st: "style",
		sz: "size",
		wt: "weight",
		fl: "family"
	});
	if (!this.font) this.font = {};
	this.hidden = obj.hdn ? true : false;
	this.permanent = obj.prm ? true : false;
	this.adjust();
};

CIQ.Drawing.annotation.prototype.serialize = function () {
	var obj = {
		name: this.name,
		pnl: this.panelName,
		col: this.color,
		d0: this.d0,
		tzo0: this.tzo0,
		v0: this.v0,
		fld: this.field,
		text: this.stx.escapeOnSerialize
			? encodeURIComponent(this.text)
			: this.text,
		hdn: this.hidden ? 1 : 0,
		prm: this.permanent ? 1 : 0
	};
	if (this.font) {
		var fnt = CIQ.removeNullValues(
			CIQ.replaceFields(this.font, {
				style: "st",
				size: "sz",
				weight: "wt",
				family: "fl"
			})
		);
		if (!CIQ.isEmpty(fnt)) obj.fnt = fnt;
	}
	if (this.stem) {
		obj.stem = {
			d: this.stem.d,
			v: this.stem.v,
			x: this.stem.x,
			y: this.stem.y
		};
	}
	if (this.borderColor) obj.bc = this.borderColor;
	if (this.fillColor) obj.bg = this.fillColor;
	if (this.lineWidth) obj.lw = this.lineWidth;
	if (this.pattern) obj.ptrn = this.pattern;

	return obj;
};

CIQ.Drawing.annotation.prototype.setTextareaProps = function () {
	this.getFontString();
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	if (!panel) return;
	var text = this.ta ? this.ta.value : this.text;
	this.arr = text.split("\n");
	var w = 0;
	stx.chart.context.font = this.fontString;
	for (var i = 0; i < this.arr.length; i++) {
		var m = stx.chart.context.measureText(this.arr[i]).width;
		if (m > w) w = m;
	}
	if (w === 0) w = 2 * this.defaultWidth;
	if (stx.editingAnnotation) w = Math.max(w, 2 * this.defaultWidth);
	this.fontSize = CIQ.stripPX(this.fontDef.size);
	var h = (this.arr.length + 1) * (this.fontSize + this.fontModifier);
	if (CIQ.touchDevice) h += 5;
	this.w = w + this.whitespace + this.padding;
	this.h = h;
	var x1 = stx.pixelFromTick(this.p0[0], panel.chart) + w;
	var yAxis = stx.getYAxisByField(panel, this.field);
	var y1 = this.pixelFromValue(panel, this.p0[0], this.p0[1], yAxis) + h;
	if (this.stem && this.stem.d) {
		this.stem.t = stx.tickFromDate(this.stem.d, panel.chart);
	}
};

CIQ.Drawing.annotation.prototype.adjust = function () {
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	if (!panel) return;
	this.setPoint(0, this.d0, this.v0, panel.chart);
	this.setTextareaProps();
	if (this === stx.activeDrawing && stx.editingAnnotation) {
		var context = stx.chart.tempCanvas.context;
		CIQ.clearCanvas(context.canvas, stx);
		this.edit(context);
	}
};

/**
 * segment is an implementation of a {@link CIQ.Drawing.BaseTwoPoint} drawing.
 * @name CIQ.Drawing.segment
 * @constructor
 */
CIQ.Drawing.segment = function () {
	this.name = "segment";
};

CIQ.inheritsFrom(CIQ.Drawing.segment, CIQ.Drawing.BaseTwoPoint);

CIQ.Drawing.segment.prototype.getDateFromTick = function (tick) {
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	var dt = stx.dateFromTick(tick, panel.chart, true);
	dt = this.convertDate(dt);

	return dt;
};

CIQ.Drawing.segment.prototype.convertDate = function (dt) {
	var stx = this.stx;

	if (!CIQ.ChartEngine.isDailyInterval(stx.layout.interval)) {
		var milli = dt.getSeconds() * 1000 + dt.getMilliseconds();
		if (timezoneJS.Date && stx.displayZone) {
			// this converts from the quote feed timezone to the chart specified time zone
			var newDT = new timezoneJS.Date(dt.getTime(), stx.displayZone);
			dt = new Date(
				newDT.getFullYear(),
				newDT.getMonth(),
				newDT.getDate(),
				newDT.getHours(),
				newDT.getMinutes()
			);
			dt = new Date(dt.getTime() + milli);
		}
	} else {
		dt.setHours(0, 0, 0, 0);
	}

	return dt;
};

CIQ.Drawing.segment.prototype.formatDate = function (date) {
	var stx = this.stx;
	var panel = stx.panels[this.panelName];

	var formattedDate = CIQ.mmddhhmm(CIQ.yyyymmddhhmm(date));

	if (panel.chart.xAxis.formatter) {
		formattedDate = panel.chart.xAxis.formatter(
			date,
			this.name,
			null,
			null,
			formattedDate
		);
	} else if (this.stx.internationalizer) {
		formattedDate = CIQ.displayableDate(stx, stx.chart, date);
	}

	return formattedDate;
};

CIQ.Drawing.segment.prototype.render = function (context) {
	if (!this.p1) return;
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	var yAxis = stx.getYAxisByField(panel, this.field);
	if (!panel || (this.field && !yAxis && !this.spanPanels)) return;
	yAxis = yAxis || panel.yAxis;
	var x0 = stx.pixelFromTick(this.p0[0], panel.chart);
	var x1 = stx.pixelFromTick(this.p1[0], panel.chart);
	var y0 = this.pixelFromValue(panel, this.p0[0], this.p0[1], yAxis);
	var y1 = this.pixelFromValue(panel, this.p1[0], this.p1[1], yAxis);
	var width = this.lineWidth;
	var color = this.getLineColor();

	var parameters = {
		pattern: this.pattern,
		lineWidth: width
	};
	if (parameters.pattern == "none") parameters.pattern = "solid";
	stx.plotLine(x0, x1, y0, y1, color, this.name, context, panel, parameters);

	if (this.axisLabel && !this.repositioner) {
		if (this.name == "horizontal") {
			stx.endClip();
			var txt = this.p0[1];
			if (panel.chart.transformFunc)
				txt = panel.chart.transformFunc(stx, panel.chart, txt);
			if (yAxis.priceFormatter) txt = yAxis.priceFormatter(stx, panel, txt);
			else txt = stx.formatYAxisPrice(txt, panel, null, yAxis);
			stx.createYAxisLabel(panel, txt, y0, color, null, null, yAxis);
			stx.startClip(panel.name);
		} else if (
			this.name == "vertical" &&
			this.p0[0] >= 0 &&
			!stx.chart.xAxis.noDraw &&
			(!this.spanPanels || panel.yAxis.bottom !== panel.bottom)
		) {
			// don't try to compute dates from before dataSet
			var dt;
			if (this.d0) {
				dt = CIQ.strToDateTime(this.d0);
				dt = this.convertDate(dt);
			} else dt = this.getDateFromTick(this.p0[0]);

			stx.endClip();
			stx.createXAxisLabel({
				panel: panel,
				txt: this.formatDate(dt),
				x: x0,
				backgroundColor: color,
				color: null,
				pointed: true,
				padding: 2
			});
			stx.startClip(panel.name);
		}
	}
	if (
		this.highlighted &&
		this.name != "horizontal" &&
		this.name != "vertical"
	) {
		var p0Fill = this.highlighted == "p0" ? true : false;
		var p1Fill = this.highlighted == "p1" ? true : false;
		this.littleCircle(context, x0, y0, p0Fill);
		this.littleCircle(context, x1, y1, p1Fill);
	}
};

CIQ.Drawing.segment.prototype.abort = function () {
	this.stx.setMeasure(null, null, null, null, false);
};

CIQ.Drawing.segment.prototype.intersected = function (tick, value, box) {
	if (!this.p0 || !this.p1) return null; // in case invalid drawing (such as from panel that no longer exists)
	var name = this.name;
	if (name != "horizontal" && name != "vertical" && name != "gartley") {
		var pointsToCheck = { 0: this.p0, 1: this.p1 };
		for (var pt in pointsToCheck) {
			if (
				this.pointIntersection(pointsToCheck[pt][0], pointsToCheck[pt][1], box)
			) {
				this.highlighted = "p" + pt;
				return {
					action: "drag",
					point: "p" + pt
				};
			}
		}
	}
	if (name == "horizontal" || name == "vertical") name = "line";
	var isIntersected = this.lineIntersection(tick, value, box, name);
	if (isIntersected) {
		this.highlighted = true;
		// This object will be used for repositioning
		return {
			action: "move",
			p0: CIQ.clone(this.p0),
			p1: CIQ.clone(this.p1),
			tick: tick, // save original tick
			value: this.valueOnDrawingAxis(tick, value) // save original value
		};
	}
	return null;
};

CIQ.Drawing.segment.prototype.configs = ["color", "lineWidth", "pattern"];

CIQ.Drawing.segment.prototype.copyConfig = function (withPreferences) {
	CIQ.Drawing.copyConfig(this, withPreferences);
	if (this.pattern == "none" && this.configs.indexOf("fillColor") == -1)
		this.pattern = "solid";
};

/**
 * Reconstruct a segment
 * @param  {CIQ.ChartEngine} stx The chart object
 * @param  {object} [obj] A drawing descriptor
 * @param {string} [obj.col] The line color
 * @param {string} [obj.pnl] The panel name
 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
 * @param {number} [obj.lw] Optional line width. Defaults to 1.
 * @param {number} [obj.v0] Value (price) for the first point
 * @param {number} [obj.v1] Value (price) for the second point
 * @param {number} [obj.d0] Date (string form) for the first point
 * @param {number} [obj.d1] Date (string form) for the second point
 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
 * @param {string} [obj.fld] Field which drawing is associated with
 * @memberOf CIQ.Drawing.segment
 *
 * @since 8.4.0 Added `fld` property to `obj` parameter.
 */
CIQ.Drawing.segment.prototype.reconstruct = function (stx, obj) {
	this.stx = stx;
	this.color = obj.col;
	this.panelName = obj.pnl;
	this.pattern = obj.ptrn;
	this.lineWidth = obj.lw;
	this.d0 = obj.d0;
	this.d1 = obj.d1;
	this.tzo0 = obj.tzo0;
	this.tzo1 = obj.tzo1;
	this.v0 = obj.v0;
	this.v1 = obj.v1;
	this.field = obj.fld;
	this.adjust();
};

CIQ.Drawing.segment.prototype.serialize = function () {
	return {
		name: this.name,
		pnl: this.panelName,
		col: this.color,
		ptrn: this.pattern,
		lw: this.lineWidth,
		d0: this.d0,
		d1: this.d1,
		tzo0: this.tzo0,
		tzo1: this.tzo1,
		v0: this.v0,
		v1: this.v1,
		fld: this.field
	};
};

/**
 * Line drawing tool. A line is a vector defined by two points that is infinite in both directions.
 *
 * It inherits its properties from {@link CIQ.Drawing.segment}.
 * @constructor
 * @name  CIQ.Drawing.line
 */
CIQ.Drawing.line = function () {
	this.name = "line";
};

CIQ.inheritsFrom(CIQ.Drawing.line, CIQ.Drawing.segment);

CIQ.Drawing.line.prototype.dragToDraw = false;

CIQ.Drawing.line.prototype.click = function (context, tick, value) {
	var panel = this.stx.panels[this.panelName];
	if (!panel) return;
	this.copyConfig();
	if (!this.penDown) {
		this.setPoint(0, tick, value, panel.chart);
		this.penDown = true;
		return false;
	}
	// if the user accidentally clicks without drawing anything
	if (this.accidentalClick(tick, value)) return true;
	this.setPoint(1, tick, value, panel.chart);
	this.penDown = false;
	return true; // kernel will call render after this
};

/**
 * Reconstruct a line
 * @param  {CIQ.ChartEngine} stx The chart object
 * @param  {object} [obj] A drawing descriptor
 * @param {string} [obj.col] The line color
 * @param {string} [obj.pnl] The panel name
 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
 * @param {number} [obj.lw] Optional line width. Defaults to 1.
 * @param {number} [obj.v0] Value (price) for the first point
 * @param {number} [obj.v1] Value (price) for the second point
 * @param {number} [obj.d0] Date (string form) for the first point
 * @param {number} [obj.d1] Date (string form) for the second point
 * @param {number} [obj.v0B] Computed outer Value (price) for the first point if original drawing was on intraday but now displaying on daily
 * @param {number} [obj.v1B] Computed outer Value (price) for the second point if original drawing was on intraday but now displaying on daily
 * @param {number} [obj.d0B] Computed outer Date (string form) for the first point if original drawing was on intraday but now displaying on daily
 * @param {number} [obj.d1B] Computed outer Date (string form) for the second point if original drawing was on intraday but now displaying on daily
 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
 * @param {string} [obj.fld] Field which drawing is associated with
 * @param {number} [obj.prm] Whether the drawing is permanent
 * @param {number} [obj.hdn] Whether the drawing is hidden
 * @memberOf CIQ.Drawing.line
 *
 * @since 8.4.0 Added `fld` property to `obj` parameter.
 * @since 9.0.0 Added `prm` and `hdn` property to `obj` parameter.
 */
CIQ.Drawing.line.prototype.reconstruct = function (stx, obj) {
	this.stx = stx;
	this.color = obj.col;
	this.panelName = obj.pnl;
	this.pattern = obj.ptrn;
	this.lineWidth = obj.lw;
	this.v0 = obj.v0;
	this.v1 = obj.v1;
	this.d0 = obj.d0;
	this.d1 = obj.d1;
	this.tzo0 = obj.tzo0;
	this.tzo1 = obj.tzo1;
	this.field = obj.fld;
	this.hidden = obj.hdn ? true : false;
	this.permanent = obj.prm ? true : false;
	this.adjust();
};

CIQ.Drawing.line.prototype.serialize = function () {
	return {
		name: this.name,
		pnl: this.panelName,
		col: this.color,
		ptrn: this.pattern,
		lw: this.lineWidth,
		d0: this.d0,
		d1: this.d1,
		tzo0: this.tzo0,
		tzo1: this.tzo1,
		v0: this.v0,
		v1: this.v1,
		fld: this.field,
		hdn: this.hidden ? 1 : 0,
		prm: this.permanent ? 1 : 0
	};
};

CIQ.Drawing.line.prototype.adjust = function () {
	var panel = this.stx.panels[this.panelName];
	if (!panel) return;
	this.setPoint(0, this.d0, this.v0, panel.chart);
	this.setPoint(1, this.d1, this.v1, panel.chart);
	// Use outer set if original drawing was on intraday but now displaying on daily
	if (CIQ.ChartEngine.isDailyInterval(this.stx.layout.interval) && this.d0B) {
		this.setPoint(0, this.d0B, this.v0B, panel.chart);
		this.setPoint(1, this.d1B, this.v1B, panel.chart);
	}
};

/**
 * Horizontal line drawing tool. The horizontal line extends infinitely in both directions.
 *
 * It inherits its properties from {@link CIQ.Drawing.segment}
 * @constructor
 * @name  CIQ.Drawing.horizontal
 */
CIQ.Drawing.horizontal = function () {
	this.name = "horizontal";
};
CIQ.inheritsFrom(CIQ.Drawing.horizontal, CIQ.Drawing.segment);

CIQ.Drawing.horizontal.prototype.dragToDraw = false;

CIQ.Drawing.horizontal.prototype.measure = function () {};

CIQ.Drawing.horizontal.prototype.click = function (context, tick, value) {
	var panel = this.stx.panels[this.panelName];
	if (!panel) return;
	this.copyConfig();
	this.setPoint(0, tick, value, panel.chart);
	return true; // kernel will call render after this
};

// skips point interection and forces positioner points inside of the dataSet
CIQ.Drawing.horizontal.prototype.intersected = function (tick, value, box) {
	if (this.lineIntersection(tick, value, box, "line")) {
		var stx = this.stx;
		var t0 = stx.chart.dataSet.length;
		var v0 = this.p0[1];

		this.highlighted = true;

		return {
			action: "move",
			p0: [t0 - 2, v0],
			p1: [t0 - 1, v0],
			tick: tick,
			value: this.valueOnDrawingAxis(tick, value)
		};
	}

	return null;
};

/**
 * Reconstruct a horizontal
 * @param  {CIQ.ChartEngine} stx The chart object
 * @param  {object} [obj] A drawing descriptor
 * @param {string} [obj.col] The line color
 * @param {string} [obj.pnl] The panel name
 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
 * @param {number} [obj.lw] Optional line width. Defaults to 1.
 * @param {number} [obj.v0] Value (price) for the first point
 * @param {number} [obj.d0] Date (string form) for the first point
 * @param {boolean} [obj.al] True to include an axis label
 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
 * @param {string} [obj.fld] Field which drawing is associated with
 * @memberOf CIQ.Drawing.horizontal
 *
 * @since 8.4.0 Added `fld` property to `obj` parameter.
 */
CIQ.Drawing.horizontal.prototype.reconstruct = function (stx, obj) {
	this.stx = stx;
	this.color = obj.col;
	this.panelName = obj.pnl;
	this.pattern = obj.ptrn;
	this.lineWidth = obj.lw;
	this.v0 = obj.v0;
	this.d0 = obj.d0;
	this.tzo0 = obj.tzo0;
	this.axisLabel = obj.al;
	this.field = obj.fld;
	this.adjust();
};

CIQ.Drawing.horizontal.prototype.serialize = function () {
	var obj = {
		name: this.name,
		pnl: this.panelName,
		col: this.color,
		ptrn: this.pattern,
		lw: this.lineWidth,
		v0: this.v0,
		d0: this.d0,
		tzo0: this.tzo0,
		al: this.axisLabel,
		fld: this.field
	};

	return obj;
};

CIQ.Drawing.horizontal.prototype.adjust = function () {
	var panel = this.stx.panels[this.panelName];
	if (!panel) return;
	this.setPoint(0, this.d0, this.v0, panel.chart);
	this.p1 = [this.p0[0] + 100, this.p0[1]];
};

CIQ.Drawing.horizontal.prototype.configs = [
	"color",
	"lineWidth",
	"pattern",
	"axisLabel"
];

/**
 * Vertical line drawing tool. The vertical line extends infinitely in both directions.
 *
 * It inherits its properties from {@link CIQ.Drawing.horizontal}.
 * @constructor
 * @name  CIQ.Drawing.vertical
 */
CIQ.Drawing.vertical = function () {
	this.name = "vertical";
	this.spanPanels = false;
};

CIQ.inheritsFrom(CIQ.Drawing.vertical, CIQ.Drawing.horizontal);
CIQ.Drawing.vertical.prototype.measure = function () {};

CIQ.Drawing.vertical.prototype.configs = [
	"color",
	"lineWidth",
	"pattern",
	"axisLabel",
	"spanPanels"
];

// override specialized horizontal method
CIQ.Drawing.vertical.prototype.intersected =
	CIQ.Drawing.segment.prototype.intersected;

CIQ.Drawing.vertical.prototype.adjust = function () {
	var panel = this.stx.panels[this.panelName];
	if (!panel) return;
	this.setPoint(0, this.d0, this.v0, panel.chart);
	this.p1 = [this.p0[0], this.p0[1] + 1];
};

const {
	reconstruct: verticalSuperReconstruct,
	serialize: verticalSuperSerialize,
	reposition: verticalSuperReposition
} = CIQ.Drawing.vertical.prototype;

CIQ.Drawing.vertical.prototype.reconstruct = function (stx, obj) {
	// reconstruct segment as usual, then add spanPanels as property
	verticalSuperReconstruct.call(this, stx, obj);
	this.spanPanels = obj.sp;
};

CIQ.Drawing.vertical.prototype.serialize = function () {
	// serialize segment as usual, then add spanPanels as property if checkbox is checked
	var obj = verticalSuperSerialize.call(this);
	obj.sp = this.spanPanels;
	return obj;
};

CIQ.Drawing.vertical.prototype.reposition = function (
	context,
	repositioner,
	tick,
	value
) {
	if (this.spanPanels) {
		this.originPanelName = this.panelName;
		Object.values(this.stx.panels).forEach((panelTest) => {
			this.panelName = panelTest.name;
			verticalSuperReposition.call(this, context, repositioner, tick, value);
		});
		this.panelName = this.originPanelName;
	} else {
		verticalSuperReposition.call(this, context, repositioner, tick, value);
	}
};

/**
 * Measure tool.
 * It inherits its properties from {@link CIQ.Drawing.segment}.
 * @constructor
 * @name  CIQ.Drawing.measure
 */
CIQ.Drawing.measure = function () {
	this.name = "measure";
};

CIQ.inheritsFrom(CIQ.Drawing.measure, CIQ.Drawing.segment);

CIQ.Drawing.measure.prototype.click = function (context, tick, value) {
	this.copyConfig();
	if (!this.penDown) {
		this.p0 = [tick, value];
		this.penDown = true;

		return false;
	}
	this.stx.undo();
	this.penDown = false;
	return true;
};

/**
 * rectangle is an implementation of a {@link CIQ.Drawing.BaseTwoPoint} drawing
 * @constructor
 * @name  CIQ.Drawing.rectangle
 */
CIQ.Drawing.rectangle = function () {
	this.name = "rectangle";
};

CIQ.inheritsFrom(CIQ.Drawing.rectangle, CIQ.Drawing.BaseTwoPoint);

CIQ.Drawing.rectangle.prototype.render = function (context) {
	if (!this.p1) return;
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	var yAxis = stx.getYAxisByField(panel, this.field);
	if (!panel || (this.field && !yAxis)) return;
	var x0 = stx.pixelFromTick(this.p0[0], panel.chart);
	var x1 = stx.pixelFromTick(this.p1[0], panel.chart);
	var y0 = this.pixelFromValue(panel, this.p0[0], this.p0[1], yAxis);
	var y1 = this.pixelFromValue(panel, this.p1[0], this.p1[1], yAxis);

	var x = Math.round(Math.min(x0, x1)) + 0.5;
	var y = Math.min(y0, y1);
	var width = Math.max(x0, x1) - x;
	var height = Math.max(y0, y1) - y;
	var edgeColor = this.getLineColor();

	var fillColor = this.fillColor;
	if (fillColor && !CIQ.isTransparent(fillColor)) {
		context.beginPath();
		context.rect(x, y, width, height);
		context.fillStyle = this.getLineColor(fillColor, true);
		context.globalAlpha = 0.2;
		context.fill();
		context.closePath();
		context.globalAlpha = 1;
	}

	var parameters = {
		pattern: this.pattern,
		lineWidth: this.lineWidth
	};
	if (this.highlighted && parameters.pattern == "none") {
		parameters.pattern = "solid";
		if (parameters.lineWidth == 0.1) parameters.lineWidth = 1;
	}

	// We extend the vertical lines by .5 to account for displacement of the horizontal lines
	// HTML5 Canvas exists *between* pixels, not on pixels, so draw on .5 to get crisp lines
	stx.plotLine(
		x0,
		x1,
		y0,
		y0,
		edgeColor,
		"segment",
		context,
		panel,
		parameters
	);
	stx.plotLine(
		x1,
		x1,
		y0 - 0.5,
		y1 + 0.5,
		edgeColor,
		"segment",
		context,
		panel,
		parameters
	);
	stx.plotLine(
		x1,
		x0,
		y1,
		y1,
		edgeColor,
		"segment",
		context,
		panel,
		parameters
	);
	stx.plotLine(
		x0,
		x0,
		y1 + 0.5,
		y0 - 0.5,
		edgeColor,
		"segment",
		context,
		panel,
		parameters
	);
	if (this.highlighted) {
		var p0Fill = this.highlighted == "p0" ? true : false;
		var p1Fill = this.highlighted == "p1" ? true : false;
		this.littleCircle(context, x0, y0, p0Fill);
		this.littleCircle(context, x1, y1, p1Fill);
	}
};

CIQ.Drawing.rectangle.prototype.intersected = function (tick, value, box) {
	if (!this.p0 || !this.p1) return null; // in case invalid drawing (such as from panel that no longer exists)
	var pointsToCheck = { 0: this.p0, 1: this.p1 };
	for (var pt in pointsToCheck) {
		if (
			this.pointIntersection(pointsToCheck[pt][0], pointsToCheck[pt][1], box)
		) {
			this.highlighted = "p" + pt;
			return {
				action: "drag",
				point: "p" + pt
			};
		}
	}
	if (this.boxIntersection(tick, value, box)) {
		this.highlighted = true;
		return {
			action: "move",
			p0: CIQ.clone(this.p0),
			p1: CIQ.clone(this.p1),
			tick: tick,
			value: this.valueOnDrawingAxis(tick, value)
		};
	}
	return null;
};

CIQ.Drawing.rectangle.prototype.configs = [
	"color",
	"fillColor",
	"lineWidth",
	"pattern"
];

/**
 * Reconstruct an rectangle
 * @param  {CIQ.ChartEngine} stx The chart object
 * @param  {object} [obj] A drawing descriptor
 * @param {string} [obj.col] The border color
 * @param {string} [obj.fc] The fill color
 * @param {string} [obj.pnl] The panel name
 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
 * @param {number} [obj.lw] Optional line width. Defaults to 1.
 * @param {number} [obj.v0] Value (price) for the first point
 * @param {number} [obj.v1] Value (price) for the second point
 * @param {number} [obj.d0] Date (string form) for the first point
 * @param {number} [obj.d1] Date (string form) for the second point
 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
 * @param {string} [obj.fld] Field which drawing is associated with
 * @param {number} [obj.prm] Whether the drawing is permanent
 * @param {number} [obj.hdn] Whether the drawing is hidden
 * @memberOf CIQ.Drawing.rectangle
 *
 * @since 8.4.0 Added `fld` property to `obj` parameter.
 * @since 9.0.0 Added `prm` and `hdn` property to `obj` parameter.
 */
CIQ.Drawing.rectangle.prototype.reconstruct = function (stx, obj) {
	this.stx = stx;
	this.color = obj.col;
	this.fillColor = obj.fc;
	this.panelName = obj.pnl;
	this.pattern = obj.ptrn;
	this.lineWidth = obj.lw;
	this.d0 = obj.d0;
	this.d1 = obj.d1;
	this.tzo0 = obj.tzo0;
	this.tzo1 = obj.tzo1;
	this.v0 = obj.v0;
	this.v1 = obj.v1;
	this.field = obj.fld;
	this.hidden = obj.hdn ? true : false;
	this.permanent = obj.prm ? true : false;
	this.adjust();
};

CIQ.Drawing.rectangle.prototype.serialize = function () {
	return {
		name: this.name,
		pnl: this.panelName,
		col: this.color,
		fc: this.fillColor,
		ptrn: this.pattern,
		lw: this.lineWidth,
		d0: this.d0,
		d1: this.d1,
		tzo0: this.tzo0,
		tzo1: this.tzo1,
		v0: this.v0,
		v1: this.v1,
		fld: this.field,
		hdn: this.hidden ? 1 : 0,
		prm: this.permanent ? 1 : 0
	};
};

/**
 * shape is a default implementation of a {@link CIQ.Drawing.BaseTwoPoint} drawing
 * which places a "shape" on the canvas.  It can be rotated and/or stretched.
 * It is meant to be overridden with specific shape designs, such as arrows....
 * @constructor
 * @name  CIQ.Drawing.shape
 * @since 2015-11-1
 * @version ChartIQ Advanced Package
 */
CIQ.Drawing.shape = function () {
	this.name = "shape";
	this.radians = 0;
	this.a = 0;
	this.rotating = false;
	this.textMeasure = false; // turns on display of scaling factors
	this.configurator = "shape"; //forces all derived classes to default to shape drawing tools
	this.dimension = [0, 0];
	this.points = [];
};

CIQ.inheritsFrom(CIQ.Drawing.shape, CIQ.Drawing.BaseTwoPoint);

/**
 * If true, enables rotation when the drawing is initially drawn.
 *
 * @type boolean
 * @default
 * @memberof CIQ.Drawing.shape
 * @since 7.4.0
 */
CIQ.Drawing.shape.prototype.setRotationOnInitialDraw = false;

CIQ.Drawing.shape.prototype.measure = function () {};

CIQ.Drawing.shape.prototype.render = function (context) {
	if (!this.points.length) return;
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	var yAxis = stx.getYAxisByField(panel, this.field);
	if (!panel || (this.field && !yAxis)) return;
	var x0 = stx.pixelFromTick(this.p0[0], panel.chart);
	var y0 = this.pixelFromValue(panel, this.p0[0], this.p0[1], yAxis);
	if (this.p1) {
		var x1 = stx.pixelFromTick(this.p1[0], panel.chart);
		var y1 = this.pixelFromValue(panel, this.p1[0], this.p1[1], yAxis);

		context.globalAlpha = 0.5;
		context.fillStyle = this.getLineColor();
		if (this.rotating) {
			this.radians = Math.atan((y1 - y0) / (x1 - x0));
			if (x1 < x0) this.radians += Math.PI;
			else if (y1 < y0) this.radians += 2 * Math.PI;
			this.a = parseInt(((this.radians * 36) / Math.PI).toFixed(0), 10) * 5;
			this.a %= 360;
			this.radians = (this.a * Math.PI) / 180;
			if (this.textMeasure)
				context.fillText(this.a + "\u00b0", x1 + 10, y1 + 10);
		} else if (this.penDown) {
			this.sx = Math.max(
				1,
				parseFloat(Math.abs((2 * (x1 - x0)) / this.dimension[0]).toFixed(1))
			);
			if (x1 < x0) this.sx *= -1;
			this.sy = Math.max(
				1,
				parseFloat(Math.abs((2 * (y1 - y0)) / this.dimension[1]).toFixed(1))
			);
			if (y1 < y0) this.sy *= -1;
			if (this.textMeasure)
				context.fillText(
					this.sx + "x," + this.sy + "x",
					x1 + this.sx + 5,
					y1 + this.sy + 5
				);
		}
		context.globalAlpha = 1;
	}
	if (typeof this.sx === "undefined") {
		this.sx = this.sy = 1;
	}

	var lineWidth = this.lineWidth;
	if (!lineWidth) lineWidth = 1.1;

	var parameters = {
		pattern: this.pattern,
		lineWidth: lineWidth
	};
	if (this.highlighted && parameters.pattern == "none") {
		parameters.pattern = "solid";
		if (parameters.lineWidth == 0.1) parameters.lineWidth = 1;
	}
	var edgeColor = this.getLineColor();
	if (this.highlighted && lineWidth == 0.1) lineWidth = 1.1;

	var fillColor = this.fillColor;
	lineWidth /=
		(Math.abs(this.sx * this.sy) * 2) / (Math.abs(this.sx) + Math.abs(this.sy));

	context.save();
	context.translate(x0, y0);
	context.rotate(this.radians);
	context.scale(this.sx, (yAxis || panel.yAxis).flipped ? -this.sy : this.sy);

	var subshape, point;
	var origin = {
		x: (this.dimension[0] - 1) / 2,
		y: (this.dimension[1] - 1) / 2
	};
	for (subshape = 0; subshape < this.points.length; subshape++) {
		context.beginPath();
		for (point = 0; point < this.points[subshape].length; point++) {
			var x, y, cx1, cx2, cy1, cy2;
			var points = this.points;
			if (points[subshape][point] == "M") {
				//move
				x = points[subshape][++point] - origin.x;
				y = points[subshape][++point] - origin.y;
				context.moveTo(x, y);
			} else if (points[subshape][point] == "L") {
				//line
				x = points[subshape][++point] - origin.x;
				y = points[subshape][++point] - origin.y;
				context.lineTo(x, y);
			} else if (points[subshape][point] == "Q") {
				//quadratic
				cx1 = points[subshape][++point] - origin.x;
				cy1 = points[subshape][++point] - origin.y;
				x = points[subshape][++point] - origin.x;
				y = points[subshape][++point] - origin.y;
				context.quadraticCurveTo(cx1, cy1, x, y);
			} else if (points[subshape][point] == "B") {
				//bezier
				cx1 = points[subshape][++point] - origin.x;
				cy1 = points[subshape][++point] - origin.y;
				cx2 = points[subshape][++point] - origin.x;
				cy2 = points[subshape][++point] - origin.y;
				x = points[subshape][++point] - origin.x;
				y = points[subshape][++point] - origin.y;
				context.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
			}
		}
		context.closePath();

		if (fillColor && !CIQ.isTransparent(fillColor)) {
			//context.globalAlpha=0.4;
			context.fillStyle = this.getLineColor(fillColor, true);
			context.fill();
			//context.globalAlpha=1;
		}
		if (edgeColor && this.pattern != "none") {
			context.strokeStyle = edgeColor;
			context.lineWidth = lineWidth;
			if (context.setLineDash) {
				context.setLineDash(CIQ.borderPatternToArray(lineWidth, this.pattern));
				context.lineDashOffset = 0; //start point in array
			}
			context.stroke();
		}
	}

	//context.strokeRect(-(this.dimension[0]-1)/2,-(this.dimension[1]-1)/2,this.dimension[0]-1,this.dimension[1]-1);

	context.restore();
	context.save();
	context.translate(x0, y0);
	context.rotate(this.radians);

	if (this.highlighted) {
		var p0Fill = this.highlighted == "p0" ? true : false;
		var p1Fill = this.highlighted == "p1" ? true : false;
		var p2Fill = this.highlighted == "p2" ? true : false;
		this.littleCircle(context, 0, 0, p0Fill);
		this.mover(context, 0, 0, p0Fill);
		this.littleCircle(
			context,
			(this.sx * this.dimension[0]) / 2,
			(this.sy * this.dimension[1]) / 2,
			p1Fill
		);
		this.resizer(
			context,
			(this.sx * this.dimension[0]) / 2,
			(this.sy * this.dimension[1]) / 2,
			p1Fill
		);
		this.littleCircle(context, (this.sx * this.dimension[0]) / 2, 0, p2Fill);
		this.rotator(context, (this.sx * this.dimension[0]) / 2, 0, p2Fill);
		context.globalAlpha = 0.5;
		context.fillStyle = this.getLineColor(null, false);
		if (this.textMeasure) {
			context.fillText(
				this.sx + "x," + this.sy + "x",
				(this.sx * this.dimension[0]) / 2 + 12,
				(this.sy * this.dimension[1]) / 2 + 5
			);
			context.fillText(
				this.a + "\u00b0",
				(this.sx * this.dimension[0]) / 2 + 12,
				5
			);
		}
		context.globalAlpha = 1;
	} else if (this.penDown) {
		if (this.rotating) {
			this.rotator(context, (this.sx * this.dimension[0]) / 2, 0, true);
		} else {
			this.resizer(
				context,
				(this.sx * this.dimension[0]) / 2,
				(this.sy * this.dimension[1]) / 2,
				true
			);
		}
	}
	context.restore();
};

CIQ.Drawing.shape.prototype.reposition = function (
	context,
	repositioner,
	tick,
	value
) {
	if (!repositioner) return;
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	if (repositioner.action == "move") {
		var tickDiff = repositioner.tick - tick;
		var valueDiff = repositioner.value - value;
		this.setPoint(
			0,
			repositioner.p0[0] - tickDiff,
			repositioner.p0[1] - valueDiff,
			panel.chart
		);
		this.render(context);
	} else {
		var yAxis = stx.getYAxisByField(panel, this.field);
		var x0 = stx.pixelFromTick(this.p0[0], panel.chart);
		var y0 = this.pixelFromValue(panel, this.p0[0], this.p0[1], yAxis);
		var x1 = stx.pixelFromTick(tick, panel.chart);
		var y1 = this.pixelFromValue(panel, tick, value, yAxis);
		if (repositioner.action == "scale") {
			this[repositioner.point] = [tick, value];
			this.sx = parseFloat(
				(
					((x1 - x0) * Math.cos(this.radians) +
						(y1 - y0) * Math.sin(this.radians)) /
					(this.dimension[0] / 2)
				).toFixed(1)
			);
			if (Math.abs(this.sx) < 1) this.sx /= Math.abs(this.sy);
			this.sy = parseFloat(
				(
					((y1 - y0) * Math.cos(this.radians) -
						(x1 - x0) * Math.sin(this.radians)) /
					(this.dimension[1] / 2)
				).toFixed(1)
			);
			if (Math.abs(this.sy) < 1) this.sy /= Math.abs(this.sy);
			this.render(context);
		} else if (repositioner.action == "rotate") {
			this[repositioner.point] = [tick, value];
			this.radians = Math.atan((y1 - y0) / (x1 - x0));
			if (x1 < x0) this.radians += Math.PI;
			else if (y1 < y0) this.radians += 2 * Math.PI;
			this.a = parseInt(((this.radians * 36) / Math.PI).toFixed(0), 10) * 5;
			if (this.sx < 0) this.a = this.a + 180;
			this.a %= 360;
			this.radians = (this.a * Math.PI) / 180;
			this.render(context);
		}
	}
};

CIQ.Drawing.shape.prototype.intersected = function (tick, value, box) {
	var stx = this.stx;
	if (!this.p0) return null; // in case invalid drawing (such as from panel that no longer exists)
	if (stx.repositioningDrawing == this && stx.repositioningDrawing.repositioner)
		return stx.repositioningDrawing.repositioner;

	var panel = stx.panels[this.panelName];
	var yAxis = stx.getYAxisByField(panel, this.field);
	var x0 = stx.pixelFromTick(this.p0[0], panel.chart);
	var y0 = this.pixelFromValue(panel, this.p0[0], this.p0[1], yAxis);
	var x1 = stx.pixelFromTick(tick, panel.chart);
	var y1 = stx.pixelFromValueAdjusted(panel, tick, value);

	x1 -= x0;
	y1 -= y0;
	var y1t = y1,
		x1t = x1;
	x1 = Math.cos(this.radians) * x1t + Math.sin(this.radians) * y1t;
	y1 = Math.cos(this.radians) * y1t - Math.sin(this.radians) * x1t;
	x1 /= this.sx;
	y1 /= this.sy;
	this.padding = CIQ.ensureDefaults(this.padding || {}, {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	});
	var paddingX = this.padding.right + this.padding.left,
		paddingY = this.padding.bottom + this.padding.top;
	var circleR2 = Math.pow(
		CIQ.touchDevice ? 25 : 5 + this.littleCircleRadius(),
		2
	);
	var scaledCircleR2 = Math.abs(circleR2 / (this.sx * this.sy));
	var extraPaddingToIncludeScalingControls = 3;
	var overShape =
		Math.pow(
			(this.dimension[0] - paddingX + extraPaddingToIncludeScalingControls) / 2,
			2
		) +
			Math.pow(
				(this.dimension[1] - paddingY + extraPaddingToIncludeScalingControls) /
					2,
				2
			) >
		Math.pow(x1 - paddingX / 2, 2) + Math.pow(y1 - paddingY / 2, 2);
	var moveProximity =
		(circleR2 - (Math.pow(x1 * this.sx, 2) + Math.pow(y1 * this.sy, 2))) /
		Math.abs(this.sx * this.sy);
	var scaleProximity =
		scaledCircleR2 -
		Math.pow(x1 - this.dimension[0] / 2, 2) -
		Math.pow(y1 - this.dimension[1] / 2, 2);
	var rotateProximity =
		scaledCircleR2 - Math.pow(x1 - this.dimension[0] / 2, 2) - Math.pow(y1, 2);
	//console.log("s:"+scaleProximity+" r:"+rotateProximity+" m:"+moveProximity);
	if (overShape) {
		if (
			scaleProximity >= rotateProximity &&
			scaleProximity >= moveProximity &&
			scaleProximity > -1
		) {
			this.highlighted = "p1";
			return {
				action: "scale"
			};
		}
		if (
			rotateProximity >= scaleProximity &&
			rotateProximity >= moveProximity &&
			rotateProximity > -1
		) {
			this.highlighted = "p2";
			return {
				action: "rotate"
			};
		}

		this.highlighted = moveProximity > -1 ? "p0" : true;
		return {
			action: "move",
			p0: CIQ.clone(this.p0),
			tick: tick,
			value: this.valueOnDrawingAxis(tick, value)
		};
	}
	return null;
};

CIQ.Drawing.shape.prototype.configs = [
	"color",
	"fillColor",
	"lineWidth",
	"pattern"
];

CIQ.Drawing.shape.prototype.littleCircleRadius = function () {
	return 3;
};

CIQ.Drawing.shape.prototype.click = function (context, tick, value) {
	if (!this.points.length) return false;
	this.copyConfig();
	var panel = this.stx.panels[this.panelName];
	if (!this.penDown) {
		this.setPoint(0, tick, value, panel.chart);
		this.penDown = true;
		return false;
	}

	this.setPoint(1, tick, value, panel.chart);

	if (this.rotating || !this.setRotationOnInitialDraw) {
		this.penDown = false;
		this.rotating = false;
		return true; // kernel will call render after this
	}
	this.rotating = true;
	return false;
};

CIQ.Drawing.shape.prototype.adjust = function () {
	var panel = this.stx.panels[this.panelName];
	if (!panel) return;

	// this section deals with backwards compatibility
	var compatibilityShapeName = this.name + "_v" + (this.version || 0);
	if (CIQ.Drawing[compatibilityShapeName]) {
		var oldShape = new CIQ.Drawing[compatibilityShapeName]();
		this.name = oldShape.name;
		this.dimension = oldShape.dimension;
		this.padding = oldShape.padding;
		this.points = oldShape.points;
		this.version = oldShape.version;
	}

	this.setPoint(0, this.d0, this.v0, panel.chart);
	this.radians = (Math.round(this.a / 5) * Math.PI) / 36;
};

/**
 * Reconstruct a shape.
 * @param  {CIQ.ChartEngine} stx The chart object.
 * @param  {object} [obj] A drawing descriptor.
 * @param {string} [obj.col] The border color.
 * @param {string} [obj.fc] The fill color.
 * @param {string} [obj.pnl] The panel name.
 * @param {string} [obj.ptrn] Pattern for line "solid", "dotted", or "dashed". Defaults to solid.
 * @param {number} [obj.lw] Line width. Defaults to 1.
 * @param {number} [obj.v0] Value (price) for the center point.
 * @param {number} [obj.d0] Date (string form) for the center point
 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes.
 * @param {number} [obj.a] Angle of the rotation in degrees.
 * @param {number} [obj.sx] Horizontal scale factor.
 * @param {number} [obj.sy] Vertical scale factor.
 * @param {string} [obj.fld] Field to which drawing is associated.
 * @param {number} [obj.ver] Version number of the shape.
 * @param {number} [obj.prm] Whether the drawing is permanent
 * @param {number} [obj.hdn] Whether the drawing is hidden
 * @memberOf CIQ.Drawing.shape
 *
 * @since 8.4.0 Added `fld` property to `obj` parameter.
 * @since 9.0.0 Added `prm` and `hdn` property to `obj` parameter.
 */
CIQ.Drawing.shape.prototype.reconstruct = function (stx, obj) {
	this.stx = stx;
	this.color = obj.col;
	this.fillColor = obj.fc;
	this.panelName = obj.pnl;
	this.pattern = obj.ptrn;
	this.lineWidth = obj.lw;
	this.d0 = obj.d0;
	this.v0 = obj.v0;
	this.tzo0 = obj.tzo0;
	this.a = obj.a;
	this.sx = obj.sx;
	this.sy = obj.sy;
	this.field = obj.fld;
	this.version = obj.ver;
	this.hdn = obj.hdn ? true : false;
	this.prm = obj.prm ? true : false;
	this.adjust();
};

CIQ.Drawing.shape.prototype.serialize = function () {
	return {
		name: this.name,
		pnl: this.panelName,
		col: this.color,
		fc: this.fillColor,
		ptrn: this.pattern,
		lw: this.lineWidth,
		d0: this.d0,
		v0: this.v0,
		tzo0: this.tzo0,
		a: this.a,
		sx: this.sx,
		sy: this.sy,
		fld: this.field,
		ver: this.version,
		hdn: this.hidden ? 1 : 0,
		prm: this.permanent ? 1 : 0
	};
};

/* Drawing specific shapes.
 *
 * this.dimension: overall dimension of shape as designed, as a pair [dx,dy] where dx is length and dy is width, in pixels
 * this.points: array of arrays. Each array represents a closed loop subshape.
 * 	Within each array is a series of values representing coordinates.
 * 	For example, ["M",0,0,"L",1,1,"L",2,1,"Q",3,3,4,1,"B",5,5,0,0,3,3]
 * 	The array will be parsed by the render function:
 * 		"M" - move to the xy coordinates represented by the next 2 array elements
 * 		"L" - draw line to xy coordinates represented by the next 2 array elements
 * 		"Q" - draw quadratic curve where next 2 elements are the control point and following 2 elements are the end coordinates
 * 		"B" - draw bezier curve where next 2 elements are first control point, next 2 elements are second control point, and next 2 elements are the end coordinates
 * See sample shapes below.
 *
 */

CIQ.Drawing.arrow = function () {
	this.name = "arrow";
	this.version = 1;
	this.dimension = [11, 22];
	this.padding = {
		left: 0,
		right: 0,
		top: 11,
		bottom: 0
	};
	this.points = [
		[
			"M", 3, 21,
			"L", 7, 21,
			"L", 7, 16,
			"L", 10, 16,
			"L", 5, 11,
			"L", 0, 16,
			"L", 3, 16,
			"L", 3, 21
		]
	]; // prettier-ignore
};
CIQ.inheritsFrom(CIQ.Drawing.arrow, CIQ.Drawing.shape);

/**
 * trendline is an implementation of a {@link CIQ.Drawing.segment} drawing.
 *
 * Extends {@link CIQ.Drawing.segment} and renders an optional {@link CIQ.Drawing.callout}
 * containing trend information.
 * @constructor
 * @name CIQ.Drawing.trendline
 * @since
 * - 5.1.2
 * - 8.8.0 Added to Basic Package and moved here from drawingAdvanced.js. Made callout optional and disabled by default, so trendline replaces segment in the drawing palette.
 */
CIQ.Drawing.trendline = function () {
	this.name = "trendline";
	this.showCallout = false;
};

CIQ.inheritsFrom(CIQ.Drawing.trendline, CIQ.Drawing.segment);

// allow configuration of font and fillColor for trendline
CIQ.Drawing.trendline.prototype.copyConfig = function (withPreferences) {
	if (
		CIQ.Drawing.callout &&
		!CIQ.Drawing.trendline.prototype.configs.includes("showCallout")
	)
		CIQ.Drawing.trendline.prototype.configs =
			CIQ.Drawing.trendline.prototype.configs.concat([
				"fillColor",
				"showCallout",
				"font"
			]);
	CIQ.Drawing.copyConfig(this, withPreferences);
};

CIQ.Drawing.trendline.prototype.measure = function () {
	// if the info will display in a callout, then this function is empty, so we don't duplicate it in the tooltip
	if (!this.showCallout || !CIQ.Drawing.callout)
		CIQ.Drawing.BaseTwoPoint.prototype.measure.call(this);
};

CIQ.Drawing.trendline.prototype.reconstruct = function (stx, obj) {
	// reconstruct segment as usual, then add callout as property
	CIQ.Drawing.segment.prototype.reconstruct.call(this, stx, obj);
	if (obj.callout && CIQ.Drawing.callout) {
		this.callout = new CIQ.Drawing.callout();
		this.callout.reconstruct(stx, obj.callout);
		this.showCallout = true;
	}
};

CIQ.Drawing.trendline.prototype.serialize = function () {
	// serialize segment as usual, then add callout as property if checkbox is checked or if trendline already has a callout (for backwards compatibility)
	var obj = CIQ.Drawing.segment.prototype.serialize.call(this);
	if (this.showCallout && CIQ.Drawing.callout) {
		obj.callout = this.callout.serialize();
	}
	return obj;
};

CIQ.Drawing.trendline.prototype.render = function (context) {
	var stx = this.stx;
	var panel = stx.panels[this.panelName];
	var yAxis = stx.getYAxisByField(panel, this.field);
	if (!panel || (this.field && !yAxis)) return;

	// render segment as usual
	CIQ.Drawing.segment.prototype.render.call(this, context);

	// do not render a callout unless the user has selected callout
	if (!this.showCallout || !CIQ.Drawing.callout) {
		this.callout = null;
		return;
	}

	// only create and initialize callout once
	if (!this.callout) {
		this.callout = new CIQ.Drawing.callout();
		var obj = CIQ.Drawing.segment.prototype.serialize.call(this);
		this.callout.reconstruct(stx, obj);
	}

	// always render the callout perpendicular above / below the segment / trendline
	this.callout.p0 = CIQ.clone(this.p0);

	// extract segment coordinates
	var x0 = stx.pixelFromTick(this.p0[0], panel.chart);
	var x1 = stx.pixelFromTick(this.p1[0], panel.chart);
	var y0 = this.pixelFromValue(panel, this.p0[0], this.p0[1], yAxis);
	var y1 = this.pixelFromValue(panel, this.p1[0], this.p1[1], yAxis);

	// return if we are off the screen axes else insanity ensues
	if (!isFinite(y0) || !isFinite(y1)) return;

	// calculate midpoint (for stem of callout)
	var xmid = (x0 + x1) / 2;
	var ymid = (y0 + y1) / 2;

	// determine length of segment and multiplier / direction of normal vector to give fixed length depending on stem location
	this.fontSize = CIQ.stripPX((this.font && this.font.size) || 13);
	var stemDist =
		this.callout.w * 1.2 + (this.callout.stemEntry[0] == "c" ? 0 : 50);
	var segmentDist = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
	var scalar =
		(stemDist / (segmentDist || stemDist)) * (this.p1[1] < this.p0[1] ? 1 : -1);

	// normal vector (see e.g. http://mathworld.wolfram.com/NormalVector.html)
	var nX = -(y1 - ymid) * scalar + xmid;
	var nY = (x1 - xmid) * scalar + ymid;

	// assign callout coordinates
	this.callout.p0[0] = stx.tickFromPixel(nX, panel.chart);
	this.callout.p0[1] = this.valueFromPixel(nY, panel, yAxis);
	this.callout.v0 = this.callout.p0[1];
	this.callout.p1 = CIQ.clone(this.p0);

	// assign callout properties
	this.callout.stx = stx;
	this.callout.fillColor = this.fillColor || this.callout.fillColor;
	this.callout.borderColor = this.color;
	this.callout.font = this.font || this.callout.font;
	this.callout.noHandles = true;

	// calculate trend and assign to callout text; only show percent if not Inf
	var deltaV = this.p1[1] - this.p0[1];
	this.callout.text =
		"" +
		Number(deltaV).toFixed(2) +
		(this.p0[1] === 0
			? ""
			: " (" + Number((100 * deltaV) / this.p0[1]).toFixed(2) + "%) ") +
		"" +
		Math.abs(this.p1[0] - this.p0[0]) +
		" Bars";

	// calculate stem as midpoint of segment
	var midtickIdx = Math.floor((this.p0[0] + this.p1[0]) / 2),
		midV;
	if (
		Math.abs(this.p0[0] - this.p1[0]) > 1 &&
		Math.abs(this.p0[0] - this.p1[0]) < 20
	) {
		// because of math.floor, we may be grabbing a bar off of center,
		// so calculate price based on slope of trendline
		var midtickXpixel = stx.pixelFromTick(midtickIdx, panel.chart);
		var midtickYpixel = y0 + ((y1 - y0) / (x1 - x0)) * (midtickXpixel - x0);
		midV = this.valueFromPixel(midtickYpixel, panel, yAxis) || ymid;
	} else {
		midV = this.valueFromPixel(ymid, panel, yAxis);
	}

	this.callout.stem = {
		t: midtickIdx,
		v: midV
	};

	// render callout and text
	this.callout.setTextareaProps();
	this.callout.render(context);

	// paint the handle circles based on highlighting
	if (this.highlighted) {
		var p0Fill = this.highlighted == "p0" ? true : false;
		var p1Fill = this.highlighted == "p1" ? true : false;
		this.littleCircle(context, x0, y0, p0Fill);
		this.littleCircle(context, x1, y1, p1Fill);
	}
};

CIQ.Drawing.trendline.prototype.lineIntersection = function (
	tick,
	value,
	box,
	type
) {
	// override type as segment to preserve lineIntersection functionality
	return CIQ.Drawing.BaseTwoPoint.prototype.lineIntersection.call(
		this,
		tick,
		value,
		box,
		"segment"
	);
};

CIQ.Drawing.trendline.prototype.intersected = function (tick, value, box) {
	// in case invalid drawing (such as from panel that no longer exists)
	if (!this.p0 || !this.p1) return null;

	// call and store intersection methods on both callout and segment
	var calloutIntersected = this.callout
		? this.callout.intersected(tick, value, box)
		: null;
	var segmentIntersected = CIQ.Drawing.segment.prototype.intersected.call(
		this,
		tick,
		value,
		box
	);

	// synchronize highlighting
	if (this.callout)
		this.callout.highlighted = !!(calloutIntersected || segmentIntersected);
	//this.highlighted = segmentIntersected || calloutIntersected;

	if (segmentIntersected) {
		// If segment is highlighted, return as usual;
		return segmentIntersected;
	} else if (calloutIntersected) {
		// Otherwise, if callout is highlighted, move segment (callout will follow / rerender)
		return {
			action: "move",
			p0: CIQ.clone(this.p0),
			p1: CIQ.clone(this.p1),
			tick: tick, // save original tick
			value: this.valueOnDrawingAxis(tick, value) // save original value
		};
	}

	// neither are intersected
	return null;
};

/**
 * Function to determine which drawing tools are available.
 * @param  {object} excludeList Exclusion list of tools in object form; for example, {"vertical":true,"annotation":true}.
 * @returns {object} Map of tool names and types.
 * @memberof CIQ.Drawing
 * @since 3.0.0
 */
CIQ.Drawing.getDrawingToolList = function (excludeList) {
	var map = {};
	var excludedDrawings = {
		arrow_v0: true,
		BaseTwoPoint: true,
		fibonacci: true,
		shape: true
	};
	CIQ.extend(excludedDrawings, excludeList);
	for (var drawing in CIQ.Drawing) {
		if (!excludedDrawings[drawing] && CIQ.Drawing[drawing].prototype.render)
			map[new CIQ.Drawing[drawing]().name] = drawing;
	}
	return map;
};

};
__js_standard_drawing_(typeof window !== "undefined" ? window : global);
