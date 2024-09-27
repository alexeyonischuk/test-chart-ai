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


let __js_standard_visualization_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Creates a DOM object capable of receiving a data stream. The object changes as a result of the incoming data.
 * The constructor function takes attributes that define how and where in the HTML document the object gets created.
 * See {@link CIQ.Visualization#setAttributes} for more information on attributes.
 *
 * One useful application of this is to render an SVG graphic.
 *
 * Methods are provided to pass data into the object and to render it in the HTML document. Note that the `data` and
 * `attributes` that are passed into the prototype methods of this object become owned by it and therefore can be mutated.
 *
 * The DOM object-generating function can assign class names to sub elements within the object. These class names can be used
 * to style the object using CSS. Documentation for the built-in functions explains which classes are available to be styled.
 *
 * @param {object} attributes Parameters to be used when creating the object.
 * @param {function} attributes.renderFunction DOM object-generating function. Takes data as an array (sorted by index property)
 * 		and attributes as arguments *by reference* and returns an `HTMLElement` (which may have children).
 * @param {HTMLElement|string} [attributes.container] Element in which to put the DOM object (or selector thereof). If omitted,
 * 		a container element is created with 300 x 300 pixel dimensions.
 * @param {boolean} [attributes.useCanvasShim] Set to true to relocate the container behind the canvas but in front of the
 * 		gridlines. **Note:** Consider using {@link CIQ.ChartEngine#embedVisualization}; it automatically places the object
 * 		within the canvases.
 * @param {CIQ.ChartEngine} [attributes.stx] A reference to the chart engine. Required if using the canvas shim.
 * @param {string} [attributes.id] Optional id attribute to assign to the object.
 * @param {boolean} [attributes.forceReplace] True to force a complete replacement of the DOM object when data changes.
 * 		Do not set if `renderFunction` can handle an incremental update of the object. Alternatively, `renderFunction` might set
 * 		this attribute. When attributes are updated using `setAttributes`, a complete replacement occurs.
 * @param {HTMLDcument} [attributes.document] Optional document where visualization should be rendered.
 * @constructor
 * @name CIQ.Visualization
 * @example
 * let svg=new CIQ.Visualization({ renderFunction: CIQ.SVGChart.renderPieChart });
 * svg.updateData({"Low":{name:"low", value:30}, "High":{name:"high", value:70}});
 * @tsdeclaration
 * constructor(
 *   attributes: {
 *     renderFunction: Function,
 *     container?: HTMLElement|string,
 *     useCanvasShim?: boolean,
 *     stx?: CIQ.ChartEngine,
 *     id?: string,
 *     forceReplace?: boolean,
 *     [renderAttributes:string]: any
 *   }
 * )
 * @since
 * - 7.4.0
 * - 8.5.0 Added the `attributes.document` parameter.
 */
CIQ.Visualization =
	CIQ.Visualization ||
	function (attributes) {
		if (!attributes) {
			console.log("CIQ.Visualization() missing attributes argument.");
			return;
		}
		if (typeof attributes.renderFunction !== "function") {
			console.log(
				"CIQ.Visualization() missing renderFunction property in attributes."
			);
			return;
		}
		/**
		 * READ ONLY. The DOM container that hosts the DOM object.
		 *
		 * @type HTMLElement
		 * @alias container
		 * @memberof CIQ.Visualization#
		 * @since 7.4.0
		 */
		this.container = null;
		/**
		 * READ ONLY. The attributes used to render the DOM object. See the [function description]{@link CIQ.Visualization}
		 * for details. Do not change this property directly; instead, use {@link CIQ.Visualization#setAttributes}.
		 * @type object
		 * @alias attributes
		 * @memberof CIQ.Visualization#
		 * @since 7.4.0
		 */
		this.attributes = attributes;
		/**
		 * READ ONLY. The data used to render the DOM object. See the [function description]{@link CIQ.Visualization}
		 * for details. Do not change this property directly; instead, use {@link CIQ.Visualization#updateData}.
		 * @type object
		 * @alias data
		 * @memberof CIQ.Visualization#
		 * @since 7.4.0
		 */
		this.data = null;
		/**
		 * READ ONLY. The DOM object created by the rendering function.
		 *
		 * @type HTMLElement
		 * @alias object
		 * @memberof CIQ.Visualization#
		 * @since 7.4.0
		 */
		this.object = null;
	};
CIQ.extend(CIQ.Visualization.prototype, {
	/**
	 * Removes the DOM object. If the container was generated by this object, the container is also removed.
	 *
	 * @param {boolean} soft True to leave properties of this object alone. Setting to false is preferable.
	 * @memberof CIQ.Visualization#
	 * @since 7.4.0
	 */
	destroy: function (soft) {
		var container = this.container || {};
		CIQ.resizeObserver(container, null, container.resizeHandle);
		if (container.autoGenerated) {
			container.remove();
			delete this.container;
		} else container.innerHTML = "";
		if (soft) return;

		// suicide!!!
		this.attributes = null;
		this.container = null;
		this.data = null;
		this.object = null;
		this.destroy = this.draw = this.setAttributes = function () {};
		this.updateData = function () {
			return undefined;
		};
	},
	/**
	 * Draws the DOM object in its container. Data must be set using {@link CIQ.Visualization#updateData} prior
	 * to calling this function. Any content existing within the container is removed prior to drawing the object.
	 *
	 * @param {boolean} forceReplace Indicates whether a full redraw is requested.
	 * @since 7.4.0
	 * @memberof CIQ.Visualization#
	 */
	draw: function (forceReplace) {
		if (!this.data || typeof this.data !== "object") {
			console.log("CIQ.Visualization.draw() missing data.");
			return;
		}

		function sortFcn(l, r) {
			return l.index < r.index ? -1 : l.index > r.index ? 1 : 0;
		}

		var attributes = this.attributes || {};
		var doc = attributes.document || document;
		var container = attributes.container || this.container;
		if (typeof container === "string") container = doc.querySelector(container);

		if (!container) {
			container = document.createElement("div");
			container.style.height = container.style.width = "300px";
			doc.body.appendChild(container);
			container.autoGenerated = true;
		}
		if (attributes.stx) {
			var shim = attributes.stx.chart.canvasShim;
			if (
				attributes.useCanvasShim &&
				shim &&
				shim !== container &&
				shim !== container.parentNode
			) {
				if (!container.autoGenerated) {
					container = container.cloneNode();
					container.id = "";
					container.autoGenerated = true;
				}
				shim.appendChild(container);
			}
		}
		if (this.container && this.container !== container) {
			this.destroy(true);
		}
		if (!container.resizeHandle) {
			var closure = function (me) {
				return function () {
					if (me.data && me.container && doc.body.contains(me.container)) {
						me.draw.call(me, true);
					}
				};
			};
			container.resizeHandle = CIQ.resizeObserver(container, closure(this));
		}
		this.container = container;
		this.attributes = attributes;

		attributes = CIQ.ensureDefaults(
			{ container: this.container },
			this.attributes
		);
		var object = attributes.renderFunction(
			Object.values(this.data).sort(sortFcn),
			attributes
		);
		if (object) {
			if (attributes.id) object.id = attributes.id;
			if (forceReplace || attributes.forceReplace) {
				this.container.innerHTML = "";
				this.container.appendChild(object);
			}
		}
		this.attributes = attributes;
		this.object = object;
	},
	/**
	 * Adds or changes the visualization object attributes, and then calls the draw function.
	 *
	 * The following generic attributes are available to all objects; all attributes are passed into the object-generating
	 * function and may be used there:
	 * - renderFunction
	 * - container
	 * - stx
	 * - useCanvasShim
	 * - id
	 * - forceReplace
	 *
	 * Attributes are passed into `renderFunction`, the object-generating function; and so, additional attributes can be
	 * added specific to the function.
	 *
	 * **Note:** The attributes passed into `renderFunction` can be changed by the render function when necessary. You can
	 * set either one attribute by passing in a key and a value, or you can add a set of attributes by passing in an object
	 * of key/value pairs.
	 *
	 * @param {object|string} arg1 An attribute key or an object of attribute key/value pairs.
	 * @param {*} [arg2] The value of the attribute if passing in one key and value.
	 * @memberof CIQ.Visualization#
	 * @since 7.4.0
	 */
	setAttributes: function (arg1, arg2) {
		var forceAttrs = [
			"renderFunction",
			"container",
			"stx",
			"useCanvasShim",
			"id",
			"forceReplace"
		];
		var useForce = false;
		var attr = arg1;
		if (typeof arg1 == "string") {
			attr = {};
			attr[arg1] = arg2;
		}
		if (typeof attr == "object") {
			for (var key in attr) {
				if (
					this.attributes[key] !== attr[key] &&
					forceAttrs.indexOf(key) !== -1
				)
					useForce = true;
				this.attributes[key] = attr[key];
			}
		}
		this.draw(useForce);
	},
	/**
	 * Adds or changes the visualization object data, and then calls the draw function.
	 *
	 * @param {(object|array)} data Provides data used to generate the DOM object. Contains at a minimum a `name`, a `value`,
	 * 		and an optional `index`, which specifies sort order. The data must accommodate the update `action`.
	 * @param {string} [action] The action to take when generating the DOM object. Valid actions are "add", "update",
	 * 		"delete", and "replace" (default).
	 *
	 * The `data` object provides each action with the required data.
	 *
	 * | Action | Required Data |
	 * | ------ | ---- |
	 * | replace | A full data object. |
	 * | delete | The data records to remove. **Note:** This may affect the colors used in the chart.
	 * | update | The data records to update. The existing records will have their properties replaced with the new properties, leaving all non-matching properties alone.
	 * | add | The same as the "update" action except the `value` property of the existing data is augmented instead of replaced by the new value.
	 *
	 * See the examples below.
	 *
	 * **Note:** If only the `value` property is being changed, it may be passed as a raw number rather than being assigned
	 * to an object property.
	 *
	 * @example
	 * <caption>Given a CIQ.Visualization instance <code>obj</code>:</caption>
	 * obj.updateData({"up",{value:1}},"add") // Adds 1 to the value property of the data record "up".
	 * obj.updateData({"up":1},"add") // Also adds 1 to the value property of the data record "up".
	 * obj.updateData({"up",{name:"UP"}},"update") // Updates the name property of the data record "up" to "UP".
	 * obj.updateData({"down",null},"delete") // Removes the record "down".
	 * obj.updateData({"down",{value:6}},"update") // Updates the value property of the data record "down" to 6.
	 * obj.updateData({"down",0},"update") // Updates the value property of the data record "down" to 0.
	 * obj.updateData({"up":5,"down":4},"replace") // Replaces the entire data record with the new record.
	 * obj.updateData({"up":5,"down":4}) // Same as above; "replace" is the default action.
	 *
	 * @return {CIQ.Visualization} This object.
	 * @memberof CIQ.Visualization#
	 * @since 7.4.0
	 */
	updateData: function (data, action) {
		var n, value;
		// normalize data into object
		var _data = Array.isArray(data)
			? data.reduce(function (acc, cur) {
					acc[cur.name] = cur;
					return acc;
			  }, {})
			: CIQ.shallowClone(data);
		for (n in _data) {
			value = _data[n];
			if (Object.prototype.toString.call(value) !== "[object Object]")
				_data[n] = { value: value };
			if (!_data[n].name) _data[n].name = n;
			if (!_data[n].value) _data[n].value = 0;
		}

		if (!action) action = "replace";
		switch (action.toLowerCase()) {
			case "delete":
				for (n in _data) delete this.data[n];
				break;
			case "replace":
				this.data = {}; /* falls through */
			case "update":
			case "add":
				for (n in _data) {
					if (!this.data[n]) this.data[n] = { name: n };
					value = _data[n].value;
					if (Object.prototype.toString.call(value) == "[object Number]") {
						if (!this.data[n].value || action == "update")
							this.data[n].value = 0;
						this.data[n].value += value;
					} else {
						this.data[n].value = value;
					}
					for (var p in _data[n]) {
						if (p !== "value") this.data[n][p] = _data[n][p];
					}
				}
				break;
			default:
				console.log(
					"Invalid or missing action.  Valid values are 'add', 'delete', 'replace', or 'update'."
				);
		}
		this.draw(this.attributes.forceReplace);
		return this;
	}
});

/**
 * Convenience function that embeds a {@link CIQ.Visualization} in the canvas area. Embedding is accomplished
 * by placing the visualization object within the chart engine's canvas shim, an area
 * behind the main canvas. Placing an object in the canvas shim creates the appearance that the chart plot is
 * on top of the  object. If using the chart background canvas (the default), the object appears on top of the
 * gridlines and axes.
 *
 * Attributes are passed into `renderFunction`, so additional attributes can be added specific to the function.
 * **Note:** If a valid `container` attribute is supplied, that container will be cloned and appended into the
 * chart's `canvasShim`.
 *
 * @param {object} attributes Parameters to be used when creating the object.
 * @param {function} attributes.renderFunction The function that generates the object. Takes data and attributes
 * 		as arguments and returns an object element.
 * @param {HTMLElement|string} [attributes.container] Element that is cloned and used to contain the object
 * 		(or selector thereof). If omitted, a container element is created with 300 x 300 pixel dimensions.
 * @param {string} [attributes.id] Optional id attribute to assign to the object.
 * @return {CIQ.Visualization} A handle to the object created, see {@link CIQ.Visualization}.
 * @memberof CIQ.ChartEngine
 *
 * @since 7.4.0
 */
CIQ.ChartEngine.prototype.embedVisualization = function (attributes) {
	if (!attributes) attributes = {};
	attributes.stx = this;
	attributes.useCanvasShim = true;
	attributes.translator = function (x) {
		return attributes.stx.translateIf(x);
	};
	attributes.document = this.container.ownerDocument;
	return new CIQ.Visualization(attributes);
};

};
__js_standard_visualization_(typeof window !== "undefined" ? window : global);
