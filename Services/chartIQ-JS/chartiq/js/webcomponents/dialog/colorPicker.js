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
import "../../../js/webcomponents/dialog.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

const Dialog = CIQ.UI._webcomponents.list["cq-dialog"];
if (!Dialog) {
	console.error(
		"colorPicker component requires first activating dialog component."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-color-picker&gt;</h4>
	 *
	 * The color picker is a dialog which allows the user to choose a color to apply to the item which presented the color picker.
	 * The item is usually a "swatch" {@link WebComponents.Swatch} which is embedded in elsewhere, like in a study dialog or drawing palette.
	 * In addition to colors, there can be configured "overrides", which are buttons under the color picker allowing the user to choose something
	 * other than a specific color, for example, "None" or "Auto".
	 *
	 * _**Attributes**_
	 *
	 * This component observes the following attributes and will change behavior if these attributes are modified:
	 * | attribute    | description |
	 * | :----------- | :---------- |
	 * | cq-active    | Set if the element is visible |
	 * | cq-colors    | Contains a comma-separated list of CSS colors to use |
	 *
	 * In addition, there are two ways to set the colors.  These are given in the examples below.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when a color is selected.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "select" |
	 * | action | "click" |
	 * | value | _color value_ |
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 * This component is automatically created if it doesn't exist in the DOM already.
	 *
	 * @example <caption>Set colors for instance: `setColors()` can be passed a two dimensional array of colors</caption>
	 * const myColorPicker = document.querySelector("cq-color-picker");
	 * myColorPicker.setColors([["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"]]);
	 *
	 * @example <caption>Set colors for Component class: `ColorPicker.defaultColors` can be set to a two dimensional array of colors</caption>
	 * // Note: do this before creating the ChartEngine
	 * const pickerClassDef = CIQ.UI.components("cq-color-picker")[0].classDefinition;
	 * pickerClassDef.defaultColors=[["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"]];
	 *
	 * @alias WebComponents.ColorPicker
	 * @extends WebComponents.Dialog
	 * @class
	 * @protected
	 * @since
	 * - 9.1.0 Added emitter.
	 */
	class ColorPicker extends Dialog.classDefinition {
		static get observedAttributes() {
			return ["cq-active", "cq-colors"];
		}

		constructor() {
			super();
			this.params = {
				colorMap: []
			};
			this.items = [];
		}

		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			this.setAttribute("cq-close-button", "false");
			super.connectedCallback();
			this.build();
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, ColorPicker);
			this.constructor = ColorPicker;
		}

		/**
		 * Processes attribute changes.  This is called whenever an observed attribute has changed.
		 *
		 * @param {string} name Attribute name
		 * @param {string} oldValue Original attribute value
		 * @param {string} newValue new Attribute value
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		handlePropertyChange(name, oldValue, newValue) {
			if (newValue === oldValue) return;
			this[name] = newValue;
			switch (name) {
				case "cq-active":
					this.reposition();
					return;
				case "cq-colors":
					this.build();
					return;
			}
		}

		/**
		 * Sets the class members up with the proper colors and overrides.
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		build() {
			this.addDefaultMarkup();
			let colors = this.getAttribute("cq-colors");
			if (colors) {
				// Convert a csv list of colors to a two dimensional array
				colors = colors.split(",");
				const cols = Math.ceil(Math.sqrt(colors.length));
				this.params.colorMap = [];
				let col = 0,
					row = [];
				colors.forEach((i) => {
					if (col >= cols) {
						col = 0;
						this.params.colorMap.push(row);
						row = [];
					}
					row.push(i);
					col++;
				});
				this.params.colorMap.push(row);
			} else {
				this.params.colorMap = this.constructor.defaultColors;
			}

			this.cqOverrides = this.querySelector("[cq-overrides]");
			if (this.cqOverrides)
				this.template = this.cqOverrides.querySelector("template");
			this.initialize();
		}

		/**
		 * Displays the color picker in proximity to the node passed in
		 * @param {object} activator The object representing what caused picker to display
		 * @param {HTMLElement} [activator.node] The node near where to display the color picker
		 * @param {string[]} [activator.overrides] Array of overrides. For each of these, a button will be created that if pressed
		 * will pass that override back instead of the color
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		display(activator) {
			// Algorithm to place the color picker to the right of whichever node was just pressed
			const { node } = activator;
			this.callingNode = node;
			const positionOfNode = node.getBoundingClientRect();
			this.style.top = this.style.left = "0px";
			const positionOfColorPicker = this.parentNode.getBoundingClientRect();
			const oneSwatchDims = CIQ.elementDimensions(node, { border: true });
			let x =
				positionOfNode.left -
				positionOfColorPicker.left +
				oneSwatchDims.width +
				10;
			let y = positionOfNode.top - positionOfColorPicker.top + 15;

			if (this.cqOverrides) {
				[...this.cqOverrides.children].forEach((child) => {
					if (!child.matches("template")) child.remove();
				});
			}
			const context =
				activator.context || this.context || CIQ.UI.getMyContext(this);
			this.uiManager = context.uiManager || CIQ.UI.getUIManager(this);

			if (activator.overrides && this.template) {
				let n;
				activator.overrides.forEach((override) => {
					n = CIQ.UI.makeFromTemplate(this.template, true)[0];
					n.innerText = context.stx
						? context.stx.translateIf(override)
						: override;
					CIQ.UI.stxtap(n, () =>
						this.pickColor(override == "none" ? "transparent" : override)
					);
				});
			}

			// ensure color picker doesn't go off right edge of screen
			const dims = CIQ.elementDimensions(this, { border: true });
			const doc = this.ownerDocument || document;
			const docWidth = CIQ.guaranteedSize(doc).width;
			const w = dims.width;
			if (x + w > docWidth) x = docWidth - w - 20; // 20 for a little whitespace and padding

			// or bottom of screen
			const docHeight = CIQ.guaranteedSize(doc).height;
			const h = dims.height;
			if (y + h > docHeight) y = docHeight - h - 30; // 30 for a little whitespace and padding

			this.style.left = x + "px";
			this.style.top = y + "px";

			if (!this.hasAttribute("aria-label"))
				this.setAttribute("aria-label", "Color Picker");

			if (!this.classList.contains("stxMenuActive")) {
				this.open({ context, caller: node }); // Manually activate the color picker
			} else {
				if (context.e) context.e.stopPropagation(); // Otherwise the color picker is closed when you swap back and forth between fill and line swatches on the toolbar
			}

			this.items = this.querySelectorAll("[cq-colorgrid] span, .ciq-btn");

			// Set keyboard focus on the color selector
			setTimeout(() => this.colors.focus());
		}

		/**
		 * Repositions the color picker so it fits on the screen.
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		reposition() {
			// ensure color picker doesn't go off right edge of screen
			const dims = CIQ.elementDimensions(this, { border: true });
			const doc = this.ownerDocument || document;
			const docWidth = CIQ.guaranteedSize(doc).width;
			const w = dims.width;
			if (CIQ.stripPX(this.style.left) + w > docWidth)
				this.style.left = docWidth - w - 20 + "px"; // 20 for a little whitespace and padding

			// or bottom of screen
			const docHeight = CIQ.guaranteedSize(doc).height;
			const h = dims.height;
			if (CIQ.stripPX(this.style.top) + h > docHeight)
				this.style.top = docHeight - h - 30 + "px"; // 30 for a little whitespace and padding
		}

		/**
		 * Generates the HTML for the component.
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		initialize() {
			this.colors = this.querySelector("[cq-colorgrid]");
			if (!this.colors) this.colors = this;
			[...this.colors.children].forEach((i) => i.remove()); // allow re-initialize, with new colors for instance

			this.params.colorMap.forEach((lineOfColors) => {
				const ul = document.createElement("ul");
				this.colors.appendChild(ul);
				lineOfColors.forEach((color) => {
					const li = document.createElement("li");
					ul.appendChild(li);
					const span = document.createElement("span");
					li.appendChild(span);
					span.style.backgroundColor = color;
					CIQ.UI.stxtap(span, () => this.pickColor(color));
					span.setAttribute("role", "option");
					span.setAttribute("tabindex", "0");
					span.setAttribute("aria-label", color);
				});
			});
			this.rowLength = this.params.colorMap[0].length || 0;
		}

		/**
		 * Handler for keyboard interaction.
		 * Arrow keys move around the picker, while `Enter` will select.
		 *
		 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
		 * @param {string} key Key that was stroked
		 * @param {Event} e The event object
		 * @return {boolean} true if keystroke was processed
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		keyStroke(hub, key, e) {
			if (hub && hub.tabActiveModals[0] !== this) return;

			const { items } = this;
			switch (key) {
				case "Tab":
					this.focusNextItem(items, !!e.shiftKey);
					break;
				case "ArrowRight":
					this.focusNextItem(items);
					break;
				case "ArrowLeft":
					this.focusNextItem(items, true);
					break;
				case "ArrowDown":
					this.focusNextRow(items);
					break;
				case "ArrowUp":
					this.focusNextRow(items, { reverse: true });
					break;
				case "Enter":
					const focused = this.findFocused(items);
					this.clickItem(focused[0], e);
					return true;
			}
		}

		/**
		 * Switches the focus to the next row of colors.
		 *
		 * @param {NodeList} items List of items in the picker (rows and overrides)
		 * @param {object} [options]
		 * @param {boolean} [options.reverse] If true, reverses order for focus
		 * @return {boolean} true if next item is focusable
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
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
		 * After color is chosen from the picker, this function will pass it back to the element which caused the picker to display.
		 *
		 * @param {string} color Color to pass back.
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		pickColor(color) {
			const keystrokeHighlight = this.context.topNode.querySelector(
					".cq-keyboard-selected-highlight"
				),
				keyboardNavigation =
					keystrokeHighlight &&
					!keystrokeHighlight.classList.contains("disabled");
			if (this.callback) this.callback(color);
			this.emitCustomEvent({
				effect: "select",
				detail: {
					value: color
				}
			});
			this.close();
			const controller = CIQ.getFromNS(
				document,
				"body.keystrokeHub.keyControlElement"
			);
			if (controller && keyboardNavigation) controller.focusItem(this.caller);
			else this.caller.focus();
		}

		resize() {
			// do nothing for resize, overrides Dialog default which centers
		}

		/**
		 * Sets the colors to a newly provided two dimensional array of colors.
		 *
		 * @param {object} colorMap Object that holds an array of various color arrays.
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		setColors(colorMap) {
			this.params.colorMap = colorMap;
			this.initialize();
		}
	}

	/**
	 * Default array of colors for the component.
	 *
	 * @static
	 * @type {String[][]}
	 *
	 * @example
	 * ColorPicker.defaultColors = [
	 *	["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7"],
	 *	["#f4977c", "#f7ac84", "#fbc58d", "#fff69e"]
	 * ];
	 *
	 * @tsmember WebComponents.ColorPicker
	 */
	ColorPicker.defaultColors = [
		["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"],
		["#f4977c", "#f7ac84", "#fbc58d", "#fff69e", "#c4de9e", "#85c99e", "#7fcdc7", "#75d0f4", "#81a8d7", "#8594c8", "#8983bc", "#a187bd", "#bb8dbe", "#f29bc1"],
		["#ef6c53", "#f38d5b", "#f8ae63", "#fff371", "#acd277", "#43b77a", "#2ebbb3", "#00bff0", "#4a8dc8", "#5875b7", "#625da6", "#8561a7", "#a665a7", "#ee6fa9"],
		["#ea1d2c", "#ee652e", "#f4932f", "#fff126", "#8ec648", "#00a553", "#00a99c", "#00afed", "#0073ba", "#0056a4", "#323390", "#66308f", "#912a8e", "#e9088c"],
		["#9b0b16", "#9e4117", "#a16118", "#c6b920", "#5a852d", "#007238", "#00746a", "#0077a1", "#004c7f", "#003570", "#1d1762", "#441261", "#62095f", "#9c005d"],
		["#770001", "#792e03", "#7b4906", "#817a0b", "#41661e", "#005827", "#005951", "#003b5c", "#001d40", "#000e35", "#04002c", "#19002b", "#2c002a", "#580028"],
	]; // prettier-ignore

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.ColorPicker
	 */
	ColorPicker.markup = `
		<div cq-colorgrid aria-label="Color Choices" role="region" tabindex="-1"></div>
		<div cq-overrides>
			<template>
				<div class="ciq-btn" role="button"></div>
			</template>
		</div>
	`;
	CIQ.UI.addComponentDefinition("cq-color-picker", ColorPicker);
}
