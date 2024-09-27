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


import { CIQ as _CIQ } from "../../../js/componentUI.js";
import "../../../js/webcomponents_legacy/dialog.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

const Dialog = CIQ.UI._webcomponents.list["cq-dialog"];
if (!Dialog) {
	console.error(
		"colorPicker component requires first activating dialog component."
	);
} else {
	/**
	 * Color Picker web component `<cq-color-picker>`.
	 *
	 * `cq-colors` attribute can contain a csv list of CSS colors to use
	 * or `params.colorMap` can be set to a two dimensional array of colors as follows:
	 * ```
	 * var myColorPicker = document.querySelector("cq-color-picker");
	 * myColorPicker.params.colorMap=[[row 1 of colors],[row 2 of colors],[row 3 of colors],[etc]]
	 * myColorPicker.initialize();
	 * ```
	 * @namespace WebComponents.cq-color-picker
	 * @example
	 * var myColorPicker = document.querySelector("cq-color-picker");
	 * myColorPicker.params.colorMap=[["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"]];
	 * myColorPicker.initialize();
	 *
	 * @example
		 <cq-color-picker>
			 <cq-colors></cq-colors>
			 <cq-overrides>
				 <template>
					 <div class="ciq-btn"></div>
				 </template>
			 </cq-overrides>
		 </cq-color-picker>
	 */
	class ColorPicker extends Dialog.classDefinition {
		constructor() {
			super();
			this.params = {
				colorMap:[
					["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"],
					["#f4977c", "#f7ac84", "#fbc58d", "#fff69e", "#c4de9e", "#85c99e", "#7fcdc7", "#75d0f4", "#81a8d7", "#8594c8", "#8983bc", "#a187bd", "#bb8dbe", "#f29bc1"],
					["#ef6c53", "#f38d5b", "#f8ae63", "#fff371", "#acd277", "#43b77a", "#2ebbb3", "#00bff0", "#4a8dc8", "#5875b7", "#625da6", "#8561a7", "#a665a7", "#ee6fa9"],
					["#ea1d2c", "#ee652e", "#f4932f", "#fff126", "#8ec648", "#00a553", "#00a99c", "#00afed", "#0073ba", "#0056a4", "#323390", "#66308f", "#912a8e", "#e9088c"],
					["#9b0b16", "#9e4117", "#a16118", "#c6b920", "#5a852d", "#007238", "#00746a", "#0077a1", "#004c7f", "#003570", "#1d1762", "#441261", "#62095f", "#9c005d"],
					["#770001", "#792e03", "#7b4906", "#817a0b", "#41661e", "#005827", "#005951", "#003b5c", "#001d40", "#000e35", "#04002c", "#19002b", "#2c002a", "#580028"],
				] // prettier-ignore
			};
		}

		connectedCallback() {
			if (this.attached) return;
			super.connectedCallback();
			this.build();
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, ColorPicker);
			this.constructor = ColorPicker;
		}

		build() {
			this.addDefaultMarkup();
			var node = this.node;
			var colors = node.attr("cq-colors");
			if (colors) {
				// Convert a csv list of colors to a two dimensional array
				colors = colors.split(",");
				var cols = Math.ceil(Math.sqrt(colors.length));
				this.params.colorMap = [];
				var col = 0;
				var row = [];
				for (var i = 0; i < colors.length; i++) {
					if (col >= cols) {
						col = 0;
						this.params.colorMap.push(row);
						row = [];
					}
					row.push(colors[i]);
					col++;
				}
				this.params.colorMap.push(row);
			}

			this.cqOverrides = node.find("cq-overrides");
			this.template = this.cqOverrides.find("template");
			this.initialize();
		}

		/**
		 * Displays the color picker in proximity to the node passed in
		 * @param {object} activator The object representing what caused picker to display
		 * @param {HTMLElement} [activator.node] The node near where to display the color picker
		 * @param {array} [activator.overrides] Array of overrides. For each of these, a button will be created that if pressed
		 * will pass that override back instead of the color
		 * @alias display
		 * @memberof WebComponents.cq-color-picker
		 */
		display(activator) {
			// Algorithm to place the color picker to the right of whichever node was just pressed
			var node = CIQ.UI.$(activator.node)[0];
			var positionOfNode = node.getBoundingClientRect();
			this.node.css({ top: "0px", left: "0px" });
			var positionOfColorPicker = this.parentNode.getBoundingClientRect();
			var oneSwatchDims = CIQ.elementDimensions(node, { border: true });
			var x =
				positionOfNode.left -
				positionOfColorPicker.left +
				oneSwatchDims.width +
				10;
			var y = positionOfNode.top - positionOfColorPicker.top + 15;

			this.cqOverrides.children(":not(template)").remove();
			var context =
				activator.context || this.context || CIQ.UI.getMyContext(this);
			this.uiManager = context.uiManager || CIQ.UI.getUIManager(this);

			var closure = function (self, override) {
				return function () {
					self.pickColor(override);
				};
			};

			var overrideHeight = 0;
			if (activator.overrides && this.template.length) {
				var n;
				for (var i = 0; i < activator.overrides.length; i++) {
					var override = activator.overrides[i];
					n = CIQ.UI.makeFromTemplate(this.template, true);
					if (context.stx) override = context.stx.translateIf(override);
					n.text(override);
					CIQ.UI.stxtap(
						n[0],
						closure(this, override == "none" ? "transparent" : override)
					);
				}
				overrideHeight = CIQ.elementDimensions(n[0]).height;
			}

			// ensure color picker doesn't go off right edge of screen
			var dims = CIQ.elementDimensions(this, { border: true });
			var doc = this.ownerDocument || document;
			var docWidth = CIQ.guaranteedSize(doc).width;
			var w =
				dims.width ||
				oneSwatchDims.width * this.colors.children()[0].children.length;
			if (x + w > docWidth) x = docWidth - w - 20; // 20 for a little whitespace and padding

			// or bottom of screen
			var docHeight = CIQ.guaranteedSize(doc).height;
			var h =
				dims.height ||
				oneSwatchDims.height * this.colors.children().length + overrideHeight;
			if (y + h > docHeight) y = docHeight - h - 30; // 30 for a little whitespace and padding

			this.node.css({ left: x + "px", top: y + "px" });

			if (!this.classList.contains("stxMenuActive")) {
				this.open({ context: context }); // Manually activate the color picker
			} else {
				if (context.e) context.e.stopPropagation(); // Otherwise the color picker is closed when you swap back and forth between fill and line swatches on the toolbar
			}

			if (this.keyboardNavigation) this.keyboardNavigation.highlightAlign();
		}

		initialize() {
			var self = this;
			this.colors = this.node.find("cq-colors");
			if (!this.colors.length) this.colors = this.node;
			this.colors.empty(); // allow re-initialize, with new colors for instance

			function closure(self, color) {
				return function () {
					self.pickColor(color);
				};
			}
			for (var a = 0; a < this.params.colorMap.length; a++) {
				var lineOfColors = this.params.colorMap[a];
				var ul = document.createElement("ul");
				this.colors[0].appendChild(ul);
				for (var b = 0; b < lineOfColors.length; b++) {
					var li = document.createElement("li");
					ul.appendChild(li);
					var span = document.createElement("span");
					li.appendChild(span);
					span.style.backgroundColor = lineOfColors[b];
					CIQ.UI.stxtap(span, closure(self, lineOfColors[b]));
				}
			}
			this.rowLength = this.params.colorMap[0].length || 0;
		}

		keyStroke(hub, key, e) {
			if (hub && hub.tabActiveModals[0] !== this) return;

			const items = this.querySelectorAll("cq-colors span, .ciq-btn");
			if (key === "Escape" || key === "Esc") {
			} else if (key === "ArrowRight") {
				this.focusNextItem(items);
			} else if (key === "ArrowLeft") {
				this.focusNextItem(items, true);
			} else if (key === "ArrowDown") {
				this.focusNextRow(items);
			} else if (key === "ArrowUp") {
				this.focusNextRow(items, { reverse: true });
			} else if (key == "Enter") {
				const focused = this.findFocused(items);
				this.clickItem(focused[0], e);
			}
		}

		focusNextRow(items, options) {
			const { reverse } = options || {};
			const focused = this.findFocused(items);
			let i = -1;
			if (focused.length) {
				// find our location in the list of items
				for (i = 0; i < items.length; i++) if (items[i] === focused[0]) break;
			}

			if (reverse) {
				// Find the previous available item
				do {
					i -= this.rowLength;
					if (i < 0) break;
				} while (!CIQ.trulyVisible(items[i]));
			} else {
				// Find the next available item
				do {
					i += this.rowLength;
					if (i >= items.length) {
						i = items.length - 1;
						break;
					}
				} while (!CIQ.trulyVisible(items[i]));
			}

			if (i > -1 && i < items.length && items[i] !== focused[0]) {
				this.removeFocused(items);
				this.focusItem(items[i]);
				return true;
			}
			return false;
		}

		/**
		 * @param color
		 * @alias pickColor
		 * @memberof WebComponents.cq-color-picker
		 */
		pickColor(color) {
			if (this.callback) this.callback(color);
			this.close();
		}

		resize() {
			// do nothing for resize, overrides Dialog default which centers
		}

		/**
		 * @param {object} colorMap Object that holds an array of various color arrays.
		 * @alias setColors
		 * @memberof WebComponents.cq-color-picker
		 */
		setColors(colorMap) {
			this.params.colorMap = colorMap;
			this.initialize();
		}
	}

	ColorPicker.markup = `
		<cq-colors></cq-colors>
		<cq-overrides>
			<template>
				<div class="ciq-btn"></div>
			</template>
		</cq-overrides>
	`;
	CIQ.UI.addComponentDefinition("cq-color-picker", ColorPicker);
}
