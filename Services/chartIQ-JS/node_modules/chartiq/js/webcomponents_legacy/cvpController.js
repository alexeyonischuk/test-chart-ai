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


import { CIQ as _CIQ } from "../../js/componentUI.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Simple web component that allows data binding to arbitrary properties of
 * {@link CIQ.ChartEngine.currentVectorParameters}. Ideal for use as a drawing toolbar extension.
 *
 * @namespace WebComponents.cq-cvp-controller
 *
 * @example
 * <cq-cvp-controller cq-section cq-cvp-header="1">
 *     <div cq-section>
 *         <div class="ciq-heading">Dev 1</div>
 *         <span stxtap="toggleActive()" class="ciq-checkbox">
 *             <span></span>
 *         </span>
 *     </div>
 *     <cq-line-color cq-section class="ciq-color" stxbind="getColor()" stxtap="pickColor()">
 *         <span></span>
 *     </cq-line-color>
 *     <cq-line-style cq-section>
 *         <cq-menu class="ciq-select">
 *             <span cq-cvp-line-style class="ciq-line ciq-selected"></span>
 *             <cq-menu-dropdown class="ciq-line-style-menu">
 *                 <cq-item stxtap="setStyle(1, 'solid')"><span class="ciq-line-style-option ciq-solid-1"></span></cq-item>
 *                 <cq-item stxtap="setStyle(3, 'solid')"><span class="ciq-line-style-option ciq-solid-3"></span></cq-item>
 *                 <cq-item stxtap="setStyle(5, 'solid')"><span class="ciq-line-style-option ciq-solid-5"></span></cq-item>
 *                 <cq-item stxtap="setStyle(1, 'dotted')"><span class="ciq-line-style-option ciq-dotted-1"></span></cq-item>
 *                 <cq-item stxtap="setStyle(3, 'dotted')"><span class="ciq-line-style-option ciq-dotted-3"></span></cq-item>
 *                 <cq-item stxtap="setStyle(5, 'dotted')"><span class="ciq-line-style-option ciq-dotted-5"></span></cq-item>
 *                 <cq-item stxtap="setStyle(1, 'dashed')"><span class="ciq-line-style-option ciq-dashed-1"></span></cq-item>
 *                 <cq-item stxtap="setStyle(3, 'dashed')"><span class="ciq-line-style-option ciq-dashed-3"></span></cq-item>
 *                 <cq-item stxtap="setStyle(5, 'dashed')"><span class="ciq-line-style-option ciq-dashed-5"></span></cq-item>
 *             </cq-menu-dropdown>
 *         </cq-menu>
 *     </cq-line-style>
 * </cq-cvp-controller>
 */
class CVPController extends CIQ.UI.ContextTag {
	get active() {
		return this.context.stx.currentVectorParameters["active" + this._scope];
	}

	set active(value) {
		this.context.stx.currentVectorParameters["active" + this._scope] = value;
	}

	get color() {
		return this.context.stx.currentVectorParameters["color" + this._scope];
	}

	set color(value) {
		this.context.stx.currentVectorParameters["color" + this._scope] = value;
	}

	get lineWidth() {
		return this.context.stx.currentVectorParameters["lineWidth" + this._scope];
	}

	set lineWidth(value) {
		this.context.stx.currentVectorParameters["lineWidth" + this._scope] = value;
	}

	get pattern() {
		return this.context.stx.currentVectorParameters["pattern" + this._scope];
	}

	set pattern(value) {
		this.context.stx.currentVectorParameters["pattern" + this._scope] = value;
	}

	connectedCallback() {
		if (this.attached) return;

		Object.defineProperty(this, "_scope", {
			configurable: true,
			enumerable: false,
			value: this.getAttribute("cq-cvp-header") || "",
			writable: false
		});

		var tmpl = this.ownerDocument.querySelector(
			'template[cq-cvp-controller], template[cvp-controller="true"]'
		);

		if (this.children.length === 0 && tmpl) {
			var nodes = CIQ.UI.makeFromTemplate(tmpl, this);
			var heading = this.querySelector(".ciq-heading");
			if (heading) {
				heading.innerHTML = this._scope;
			}
		}

		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, CVPController);
	}

	emit(eventName, value) {
		if (this.toolbar) {
			this.toolbar.emit();
		} else {
			this.dispatchEvent(
				new CustomEvent(eventName, {
					bubbles: true,
					cancelable: true,
					detail: value
				})
			);
		}
	}

	getColor(activator) {
		var node = CIQ.UI.$(activator.node || this.node.find("cq-line-color"));
		var color = this.color;

		if (color == "transparent" || color == "auto") {
			color = "";
		}

		node.css({
			background: color
		});

		var bgColor = CIQ.getBackgroundColor(this.parentNode);
		if (!color || Math.abs(CIQ.hsl(bgColor)[2] - CIQ.hsl(color)[2]) < 0.2) {
			var border = CIQ.chooseForegroundColor(bgColor);
			node.css({ border: "solid " + border + " 1px" });
			if (!color)
				node.css({
					background:
						"linear-gradient(to bottom right, " +
						border +
						"," +
						border +
						" 49%, " +
						bgColor +
						" 50%, " +
						bgColor +
						")"
				});
		} else {
			node.css({ border: "" });
		}
	}

	pickColor(activator) {
		var node = CIQ.UI.$(activator.node);
		var colorPicker = this.ownerDocument.querySelector("cq-color-picker");
		var cvpController = this;
		var overrides = node.attr("cq-overrides");

		if (!colorPicker)
			return console.error(
				"CVPController.prototype.pickColor: no <cq-color-picker> available"
			);
		if (overrides) activator.overrides = overrides.split(",");

		colorPicker.callback = function (color) {
			cvpController.color = color;
			cvpController.getColor(activator);
			cvpController.emit("change", {
				color: color
			});
		};
		activator.context = this.context;
		colorPicker.display(activator);
	}

	setContext() {
		this.setStyle();
		if (this.toolbar) this.toolbar.dirty(false);
	}

	setStyle(activator, width, pattern) {
		width = width || "1";
		pattern = pattern || "dotted";

		this.lineWidth = parseInt(width, 10);
		this.pattern = pattern;

		var selection = this.node.find("*[cq-cvp-line-style]");

		if (this.lineStyleClassName) {
			selection.removeClass(this.lineStyleClassName);
		}

		if (pattern && pattern !== "none") {
			this.lineStyleClassName = "ciq-" + pattern + "-" + this.lineWidth;
			selection.addClass(this.lineStyleClassName);
		} else {
			this.lineStyleClassName = null;
		}

		this.emit("change", {
			lineWidth: width,
			pattern: pattern
		});
	}

	/**
	 * Update the component state with configuration. May be a drawing instance or
	 * currentVectorParameters.
	 *
	 * @param {Object} config drawing instance or currentVectorParameters
	 */
	sync(config) {
		var active = config["active" + this._scope];
		var color = config["color" + this._scope];
		var lineWidth = config["lineWidth" + this._scope];
		var pattern = config["pattern" + this._scope];

		var className = "ciq-active";
		var checkbox = this.node.find(".ciq-checkbox");

		if (active) {
			checkbox.addClass(className);
		} else {
			checkbox.removeClass(className);
		}

		this.active = !!active;
		this.color = color || "";
		this.getColor({});
		this.setStyle(null, lineWidth, pattern);
	}

	toggleActive(activator) {
		var node = CIQ.UI.$(activator.node);
		var className = "ciq-active";

		if (this.active) {
			this.active = false;
			node.removeClass(className);
		} else {
			this.active = true;
			node.addClass(className);
		}

		this.emit("change", {
			active: this.active
		});
	}
}

CIQ.UI.addComponentDefinition("cq-cvp-controller", CVPController);
