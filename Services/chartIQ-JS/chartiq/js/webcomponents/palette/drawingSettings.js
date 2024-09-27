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
import "../../../js/standard/drawing.js";
import "../../../js/webcomponents/palette.js";
import "../../../js/webcomponents/clickable.js";
import "../../../js/webcomponents/cvpController.js";
import "../../../js/webcomponents/menu.js";
import "../../../js/webcomponents/waveParameters.js";
import "../../../js/webcomponents/scroll/menuDropdown.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */








const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

const Palette = CIQ.UI._webcomponents.list["cq-palette"];
if (!Palette) {
	console.error(
		"drawingSettings component requires first activating palette component."
	);
} else if (!CIQ.Drawing) {
	console.error(
		"drawingSettings component requires first activating drawing feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-drawing-settings&gt;</h4>
	 *
	 * Drawing Settings palette web component used to draw and annotate on the chart. Displays a palette
	 * along the top of the chart for managing tool settings.
	 *
	 * Inherits from `<cq-palette>`. Palette components must be placed within a `<cq-palette-dock>` component.
	 *
	 * This works in conjunction with the [cq-drawing-palette]{@link WebComponents.DrawingPalette} component
	 * and replaces the cq-toolbar component, providing additional functionality
	 * and an improved user experience.
	 *
	 * _**Attributes**_
	 *
	 * This component observes the following attributes and will change behavior if these attributes are modified:
	 * | attribute    | description |
	 * | :----------- | :---------- |
	 * | docked       | The docked state of the palette. Set to "false" to float palette over the chart. |
	 * | hide         | The hidden state of the palette. Set to "false" to show palette. |
	 * | active-tool  | Current active drawing tool. |
	 * | axis-label   | "true" to enable axis label. |
	 * | line-color   | Current line color in hex format, or "auto" to select color from theme. |
	 * | fill-color   | Current fill color in hex format, or "auto" to select color from theme. |
	 * | font-family  | Current font name. Note: specified font must be available in the end-user's system. |
	 * | font-size    | Current font size in valid css units. |
	 * | font-italic  | "true" to enable font italics style. |
	 * | font-bold    | "true" to enable font bold style. |
	 * | line-width   | Line width in pixels. |
	 * | line-pattern | Line pattern: "solid", "dotted" or "dashed". |
	 * | show-callout | "true" to enable display of callout. |
	 * | span-panels  | "true" to enable span panels. |
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted by the component when it is clicked.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "select" |
	 * | action | "click" |
	 * | name | _property_ |
	 * | value | _value_ |
	 *
	 * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * @example
	 *	<cq-drawing-settings
	 *		class="palette-settings"
	 *		docked="true"
	 *		hide="true"
	 *		orientation="horizontal"
	 *		min-height="40"
	 *		cq-drawing-edit="none"
	 *		line-pattern="solid"
	 *		font-size="12px"
	 *		font-family="Helvetica, sans-serif"
	 *		fill-color="#7DA6F5"
	 *		line-color="auto"
	 *		active-tool="notool"
	 *	></cq-drawing-settings>
	 *
	 * @alias WebComponents.DrawingSettings
	 * @extends WebComponents.Palette
	 * @class
	 * @protected
	 * @since
	 * - 7.2.0
	 * - 9.1.0 Observes attributes. Added emitter.
	 */
	class DrawingSettings extends Palette.classDefinition {
		static get observedAttributes() {
			return [
				"docked",
				"hide",
				"active-tool",
				"axis-label",
				"fill-color",
				"font-bold",
				"font-family",
				"font-italic",
				"font-size",
				"line-color",
				"line-pattern",
				"line-width",
				"orientation",
				"show-callout",
				"span-panels"
			];
		}

		constructor() {
			super();
		}

		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();
			this.addEventListener("stxtap", (e) => e.stopPropagation());
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, DrawingSettings);
			this.constructor = DrawingSettings;
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setContext(context) {
			this.addDefaultMarkup();
			this.init();
			this.params = {
				lineSelection: this.querySelector(".ciq-line-style"),
				fontSizeSelection: this.querySelector(".ciq-font-size"),
				fontFamilySelection: this.querySelector(".ciq-font-family"),
				fontStyleToggle: this.querySelector("cq-annotation-italic"),
				fontWeightToggle: this.querySelector("cq-annotation-bold"),
				fontOptions: this.querySelector("cq-annotation"),
				axisLabelToggle: this.querySelector("cq-axis-label .ciq-checkbox"),
				spanPanelsToggle: this.querySelector("cq-span-panels .ciq-checkbox"),
				showCalloutToggle: this.querySelector("cq-show-callout .ciq-checkbox"),
				fillColor: this.querySelector("cq-fill-color:not(cq-cvp-controller)"),
				lineColor: this.querySelector("cq-line-color:not(cq-cvp-controller)"),
				cvpControllers: this.querySelectorAll("cq-cvp-controller"),
				waveParameters: this.querySelector("cq-wave-parameters")
			};
			this.params.cvpControllers.forEach(
				(controller) => (controller.toolbar = this)
			);

			// Add a texture to the drag strip
			//this.querySelector('.drag-strip').style.backgroundImage = "url('css/img/palette-drag-strip.svg')";
			this.sync();
			this.dirty(false);
			const self = this;
			CIQ.UI.contextsForEach(function () {
				if (this.stx.setDrawingContainer) this.stx.setDrawingContainer(self);
			});
			context.stx.addEventListener("theme", () => {
				const isDirty = this.querySelector("*[cq-toolbar-dirty].ciq-active");
				this.sync();
				if (!isDirty) this.dirty(false);
			});
		}

		/**
		 * Processes attribute changes.  This is called whenever an observed attribute has changed.
		 *
		 * @param {string} name Attribute name
		 * @param {string} oldValue Original attribute value
		 * @param {string} newValue new Attribute value
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		handlePropertyChange(name, oldValue, newValue) {
			if (newValue === oldValue) return;
			const action = this.activator ? "click" : null;
			delete this.activator;

			switch (name) {
				case "active-tool":
					this.tool(null, newValue);
					break;
				case "line-color":
					this.setColor(newValue, "line");
					break;
				case "fill-color":
					this.setColor(newValue, "fill");
					break;
				case "font-family":
					this.setFontFamily(null, newValue);
					break;
				case "font-size":
					this.setFontSize(null, newValue);
					break;
				case "font-italic":
					this.setFontStyle("italic", newValue === "true" ? true : false);
					break;
				case "font-bold":
					this.setFontStyle("bold", newValue === "true" ? true : false);
					break;
				case "line-width":
					this.setLine(null, newValue, null);
					break;
				case "line-pattern":
					this.setLine(null, null, newValue);
					break;
				case "axis-label":
				case "span-panels":
				case "show-callout":
					this.toggleCheckbox(null, name, newValue === "true");
					break;
			}
			super.handlePropertyChange(name, oldValue, newValue);

			if (!this.context) return;

			if (!this.syncing) {
				this.emitCustomEvent({
					action,
					effect: "select",
					detail: { name, value: newValue }
				});
			}
		}

		/**
		 * Overloaded from palette class.
		 * Handler for responding to messaging sent from other palettes `sendMessage` function.
		 *
		 * @param {string} id Identifier for the message
		 * @param {object | string} message Optional data accompanying the message
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		handleMessage(id, message) {
			switch (id) {
				case "changeTool":
					// The Order is important as tool setting initiates chart repositioning
					// and should be last to make sure that updated height is available
					// A safer approach would be define static label size that may not be
					// as desirable from UI layout perspective
					this.setActiveToolLabel(message.toolLabel);
					this.toolSettings(message.activator, message.toolName);
					break;
				case "clearDrawings":
					this.clearDrawings();
					break;
				case "restoreDefaultConfig":
					this.restoreDefaultConfig(message.activator, message.all);
			}
		}

		/**
		 * Remove all drawings from the chart.
		 */
		clearDrawings() {
			const wrappers =
				this.context.topNode.querySelectorAll("cq-context-wrapper");
			if (wrappers.length)
				wrappers.forEach((wrapper) => {
					if (wrapper.classList.contains("active")) {
						const activeContextNode = wrapper.querySelector("cq-context");
						activeContextNode.context.stx.clearDrawings(null, false);
					}
				});
			else this.context.stx.clearDrawings(null, false);
		}

		/**
		 * Enable crosshairs.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		crosshairs(activator) {
			const { stx } = this.context;
			stx.changeVectorType(null);
			stx.layout.crosshair = true;
			stx.doDisplayCrosshairs();
			stx.findHighlights(false, true);
			stx.changeOccurred("layout");
			stx.draw();
			stx.updateChartAccessories();
			this.querySelectorAll("*[cq-section]").forEach((el) =>
				el.classList.remove("ciq-active")
			);
			this.emit();
		}

		/**
		 * Enable settings UI for specified drawing tool. Sends `changeToolSettings` message to other palettes.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} toolName Name of drawing tool.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		tool(activator, toolName) {
			if (!this.context) return;
			this.toolSettings(activator, toolName);
			this.setActiveToolLabel(toolName);
			this.sendMessage("changeToolSettings", { activator, toolName });
		}

		/**
		 * Enable settings UI for specified drawing tool. Called by `tool` function.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} toolName Name of drawing tool.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		toolSettings(activator, toolName) {
			if (!this.context) return;
			const { stx } = this.context;
			this.querySelectorAll("*[cq-section]").forEach((section) =>
				section.classList.remove("ciq-active")
			);
			let removeDirty = !this.querySelector("*[cq-toolbar-dirty].ciq-active");
			const drawingParameters = CIQ.Drawing.getDrawingParameters(stx, toolName);
			let actionEl;
			if (drawingParameters) {
				actionEl = this.querySelector("*[cq-toolbar-action='save']");
				if (actionEl) actionEl.classList.add("ciq-active");
				const drawingPrefs = stx.preferences.drawings;
				if (drawingPrefs && drawingPrefs[toolName]) {
					actionEl = this.querySelector("*[cq-toolbar-action='restore']");
					if (actionEl) actionEl.classList.add("ciq-active");
					removeDirty = true;
				}
				// fibtimezone has no values to display in the settings dialog
				if (toolName === "fibtimezone") {
					delete drawingParameters.parameters;
				}

				const none = this.params.lineSelection.querySelector(".fills-only");
				if (none) none.setAttribute("hidden", "");
				let elements = this.defaultElements(drawingParameters, toolName);
				for (let i = 0; i < elements.length; i++) {
					const els = this.querySelectorAll(
						`${elements[i]}[cq-section], ${elements[i]} [cq-section]`
					);
					els.forEach((el) => el.classList.add("ciq-active"));
					if (none && elements[i] == "cq-fill-color")
						none.removeAttribute("hidden");
				}
				// special sections which have their own webcomponents, do not activate children of these
				elements = CIQ.Drawing[toolName].prototype.$controls;
				if (elements) {
					for (let i = 0; i < elements.length; i++) {
						const els = this.querySelectorAll(`${elements[i]}[cq-section]`);
						els.forEach((el) => el.classList.add("ciq-active"));
					}
				}
				if (
					toolName === "trendline" &&
					!stx.currentVectorParameters.showCallout
				) {
					["fontOptions", "fillColor"].forEach((name) =>
						this.params[name].classList.remove("ciq-active")
					);
				}
			}
			if (toolName === "notool") {
				stx.changeVectorType("");
				// Don't disengage the magnet
				/*if (stx.preferences.magnet) {
					this.toggleMagnet(this);
				}*/
				this.hide = "true";
			} else {
				this.hide = "false";
				if (this.restoreDocked) {
					this.dock();
					delete this.restoreDocked;
				}
				setTimeout(() => {
					const node = this.querySelector(".palette-container");
					node.tabIndex = -1;
					node.focus();
				}, 10);
			}
			// Resizing the dock because the setting palette is hidden/shown based on the 'no tool' selection
			this.paletteDock.handleResize();
			this["active-tool"] = toolName;
			this.sync();
			if (removeDirty) this.dirty(false);
		}

		/**
		 * Array of element selectors for drawing setting UI elements used by the specified tool.
		 *
		 * @param {object} drawingParameters Drawing parameters object.
		 * @param {string} toolName Name of drawing tool.
		 * @returns Array of drawing setting element selectors
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		defaultElements(drawingParameters, toolName) {
			const arr = [];
			for (let param in drawingParameters) {
				if (param == "color") arr.push("cq-line-color");
				else if (param == "fillColor") arr.push("cq-fill-color");
				else if (param == "pattern" || param == "lineWidth")
					arr.push("cq-line-style");
				else if (param == "axisLabel") arr.push("cq-axis-label");
				else if (param == "spanPanels") arr.push("cq-span-panels");
				else if (param == "showCallout") arr.push("cq-show-callout");
				else if (param == "font") arr.push("cq-annotation");
				else if (param == "parameters") {
					switch (toolName) {
						case "volumeprofile":
							arr.push("cq-clickable[cq-volumeprofile-settings]");
							break;
						case "measurementline":
							arr.push("cq-clickable[cq-measurementline-settings]");
							break;
						default:
							arr.push("cq-clickable[cq-fib-settings]");
					}
				}
			}

			return arr;
		}

		/**
		 * Sets active state of drawing settings Save Config button
		 *
		 * @param {boolean} [on=true] Set to `true` to set active.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		dirty(on = true) {
			this.querySelector("*[cq-toolbar-dirty]").classList.toggle(
				"ciq-active",
				on
			);
		}

		/**
		 * Emits a change event.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		emit() {
			const event = new Event("change", {
				bubbles: true,
				cancelable: true
			});
			this.dirty();
			this.dispatchEvent(event);
		}

		/**
		 * Gets the current drawing color and updates display in palette.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} mode Type of color: `fill` or `line`.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		getColor(activator, mode) {
			if (mode !== "fill" && mode !== "line") return;
			const { node } = activator;
			const specialColorStyles = ["color-auto", "color-transparent"];
			const color =
				this.context.stx.currentVectorParameters[
					mode === "line" ? "currentColor" : "fillColor"
				];
			this[mode + "-color"] = color;
			specialColorStyles.forEach((style) => node.classList.remove(style));
			if (specialColorStyles.includes("color-" + color)) {
				node.removeAttribute("style");
				node.classList.add("color-" + color);
			} else {
				node.style.background = color;
				const bgColor = CIQ.getBackgroundColor(this.parentNode);
				if (!color || Math.abs(CIQ.hsl(bgColor)[2] - CIQ.hsl(color)[2]) < 0.2) {
					const border = CIQ.chooseForegroundColor(bgColor);
					node.style.border = "solid " + border + " 1px";
				} else {
					node.style.border = "";
				}
			}
			const label = node.querySelector("[label]");
			if (label) label.innerText = color;
		}

		/**
		 * Enables colorPicker and provides callback to `setColor`, depending on `mode` value.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} mode Type of color: `fill` or `line`.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		pickColor(activator, mode) {
			if (mode !== "fill" && mode !== "line") return;
			const { node } = activator;
			const colorPicker = this.uiManager.getColorPicker(this);
			colorPicker.callback = (color) => {
				this.activator = activator;
				this.setColor(color, mode);
				this.emit();
			};
			let overrides = node.getAttribute("cq-overrides");
			if (overrides) overrides = overrides.split(",");
			colorPicker.display({ node, overrides, context: this.context });
		}

		/**
		 * Sets the default line or fill color, depending on `mode` value.
		 *
		 * @param {string} color A Valid css color value.
		 * @param {string} mode Type of color: `fill` or `line`.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setColor(color, mode) {
			if (mode !== "fill" && mode !== "line") return;
			if (!this.context) return;
			this.context.stx.currentVectorParameters[
				mode === "line" ? "currentColor" : "fillColor"
			] = color;
			this.getColor(
				{
					node: this.ownerDocument.querySelector("cq-" + mode + "-color")
				},
				mode
			);
			this.emit();
		}

		/**
		 * Restore drawing settings default configuration.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {boolean} all Set to `true` to restore default for all drawing objects. Otherwise only the active drawing object's defaults are restored.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		restoreDefaultConfig(activator, all) {
			const { stx } = this.context;
			CIQ.Drawing.restoreDefaultConfig(
				stx,
				stx.currentVectorParameters.vectorType,
				all
			);
			const actionEl = this.querySelector("*[cq-toolbar-action='restore']");
			if (actionEl) actionEl.classList.remove("ciq-active");
			this.sync();
			this.dirty(false);
		}

		/**
		 * Save current drawing settings as default configuration.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		saveConfig() {
			const { stx } = this.context;
			CIQ.Drawing.saveConfig(stx, stx.currentVectorParameters.vectorType);
			const actionEl = this.querySelector("*[cq-toolbar-action='restore']");
			if (actionEl) actionEl.classList.add("ciq-active");
			this.sync();
			this.dirty(false);
		}

		/**
		 * Set drawing settings for fibonacci drawing tools.
		 *
		 * @param {number} width Line width
		 * @param {string} pattern Line pattern
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setFibs(width, pattern) {
			const fib = this.context.stx.currentVectorParameters.fibonacci;
			if (fib) {
				for (let i = 0; i < fib.fibs.length; i++) {
					fib.fibs[i].parameters.lineWidth = width;
					fib.fibs[i].parameters.pattern = pattern;
				}
				fib.timezone.parameters.lineWidth = width;
				fib.timezone.parameters.pattern = pattern;
			}
		}

		/**
		 * Sets the default font family.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} fontFamily A Valid css font-family value.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setFontFamily(activator, fontFamily) {
			if (!this.context) return;
			this.activator = activator;
			const { stx } = this.context;

			if (stx.currentVectorParameters.annotation) {
				if (fontFamily == "Default") {
					stx.currentVectorParameters.annotation.font.family = null;
				} else {
					stx.currentVectorParameters.annotation.font.family = fontFamily;
				}
			}
			this["font-family"] = fontFamily;
			this.params.fontFamilySelection.setAttribute("text", fontFamily);
			this.emit();
		}

		/**
		 * Sets the default font size.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} fontSize A Valid css font-size value.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setFontSize(activator, fontSize) {
			if (!this.context) return;
			this.activator = activator;
			const { stx } = this.context;

			if (stx.currentVectorParameters.annotation)
				stx.currentVectorParameters.annotation.font.size = fontSize;
			this["font-size"] = fontSize;
			this.params.fontSizeSelection.setAttribute("text", fontSize);
			this.emit();
		}

		/**
		 * Set drawing line style.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {number} width Line width
		 * @param {string} pattern Line pattern
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setLine(activator, width, pattern) {
			if (!this.context) return;
			this.activator = activator;
			const { stx } = this.context;

			width = width || stx.currentVectorParameters.lineWidth;
			pattern = pattern || stx.currentVectorParameters.pattern;

			stx.currentVectorParameters.lineWidth = width;
			stx.currentVectorParameters.pattern = pattern;
			this.setFibs(width, pattern);
			this.currentLineSelectedClass =
				"ciq-" + pattern + "-" + parseInt(width, 10);
			if (pattern == "none") {
				this.currentLineSelectedClass = null;
			}
			this.params.lineSelection.setAttribute(
				"icon",
				this.currentLineSelectedClass
			);
			if (!this.querySelector("cq-fill-color.ciq-active")) {
				const none = this.params.lineSelection.querySelector(".fills-only");
				if (none) none.setAttribute("hidden", "");
			}
			this["line-width"] = width;
			this["line-pattern"] = pattern;
			this.emit();
		}

		/**
		 * Set text of palette active tool label element.
		 *
		 * @param {string} activeToolLabel Name of drawing tool.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setActiveToolLabel(activeToolLabel) {
			// Clean up tool labels
			if (activeToolLabel === "No Tool") {
				activeToolLabel = "";
			} else if (activeToolLabel === "freeform") {
				activeToolLabel = "Doodle";
			} else {
				activeToolLabel = activeToolLabel + ":";
			}
			this.querySelector(".ciq-active-tool-label").innerHTML = activeToolLabel;
			this.querySelector(".ciq-mobile-palette-toggle span").innerHTML =
				activeToolLabel || "Select Tool";
		}

		/**
		 * Synchronizes the drawing toolbar with stx.currentVectorParameters. Poor man's data binding.
		 *
		 * @param {object} [cvp=stx.currentVectorParameters] A new drawing object, otherwise defaults to the current one
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		sync(cvp) {
			this.syncing = true;
			const { stx } = this.context;

			if (!cvp) cvp = stx.currentVectorParameters;
			else
				stx.currentVectorParameters = CIQ.extend(
					stx.currentVectorParameters || {},
					cvp
				);

			const { params } = this;
			this.setLine(null, cvp.lineWidth, cvp.pattern);

			const style = stx.canvasStyle("stx_annotation");

			const font = cvp.annotation && cvp.annotation.font;

			const initialSize = (font && font.size) || style.fontSize;
			this.setFontSize(null, initialSize);

			const initialFamily = (font && font.family) || style.fontFamily;
			this.setFontFamily(null, initialFamily);

			const initialFontStyle = (font && font.style) || style.fontStyle;
			const initialWeight = (font && font.weight) || style.fontWeight;
			this.setFontStyle("italic", initialFontStyle === "italic");
			this.setFontStyle(
				"bold",
				initialWeight === "bold" || initialWeight >= 700
			);

			this.toggleCheckbox(null, "axis-label", cvp.axisLabel);
			this.toggleCheckbox(null, "show-callout", cvp.showCallout);
			this.toggleCheckbox(null, "span-panels", cvp.spanPanels);

			this.getColor({ node: params.fillColor }, "fill");
			this.getColor({ node: params.lineColor }, "line");

			params.cvpControllers.forEach((controller) => {
				controller.sync(cvp);
			});

			const { waveParameters } = params;
			if (waveParameters) {
				waveParameters.activate();
			}
			this.syncing = false;
		}

		/**
		 * Toggle checked state of checkbox element and update associated drawing setting.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} id Drawing setting property name
		 * @param {boolean} [forceValue=null] If set, will force the toggle to that value.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		toggleCheckbox(activator, id, forceValue = null) {
			if (!this.context) return;
			this.activator = activator;
			const cvp = this.context.stx.currentVectorParameters;
			id = id.replace(/-./g, (x) => x[1].toUpperCase());
			cvp[id] = forceValue === null ? !cvp[id] : forceValue;
			const node = this.params[id + "Toggle"];
			if (node) node.classList[cvp[id] ? "add" : "remove"]("ciq-active");
			if (id === "showCallout" && cvp.vectorType === "trendline") {
				["fontOptions", "fillColor"].forEach((name) =>
					this.params[name].classList[cvp[id] ? "add" : "remove"]("ciq-active")
				);
			}
			const attrName = id.replace(/[A-Z]/g, (x) => `-${x.toLowerCase()}`);
			this[attrName] = cvp[id].toString();
			this.params[id + "Toggle"].setAttribute(
				"aria-checked",
				cvp[id].toString()
			);
			this.emit();
		}

		/**
		 * Toggle active state of font "bold" and "italic" styles and update drawing settings.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} fontStyle Style to toggle, "bold" or "italic".
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		toggleFontStyle(activator, fontStyle) {
			const { stx } = this.context;
			let currentState = false;
			this.activator = activator;

			if (fontStyle == "italic") {
				currentState =
					stx.currentVectorParameters.annotation.font.style == "italic";
			} else if (fontStyle == "bold" || fontStyle >= 700) {
				currentState =
					stx.currentVectorParameters.annotation.font.weight == "bold";
			}
			this.setFontStyle(fontStyle, !currentState);
		}

		/**
		 * Set drawing tool font style
		 *
		 * @param {string} fontStyle Style to set, "bold" or "italic".
		 * @param {boolean} state Active state, set to "true" to enable.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setFontStyle(fontStyle, state) {
			if (!this.context) return;
			const { stx } = this.context;
			const node = this.querySelector("cq-annotation-" + fontStyle);

			if (fontStyle == "italic") {
				stx.currentVectorParameters.annotation.font.style = state
					? "italic"
					: null;
			} else if (fontStyle == "bold") {
				stx.currentVectorParameters.annotation.font.weight = state
					? "bold"
					: null;
			} else return;

			this["font-" + fontStyle] = state ? "true" : "false";
			if (node) {
				node.classList[state ? "add" : "remove"]("ciq-active");
				node.setAttribute("aria-pressed", state);
			}
			this.emit();
		}

		/**
		 * Toggle grabbing magnet state
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		toggleMagnet(activator) {
			const toggle = activator.node;
			const { stx } = this.context;
			if (stx.preferences.magnet) {
				toggle.classList.remove("active");
				stx.preferences.magnet = false;
			} else {
				toggle.classList.add("active");
				stx.preferences.magnet = true;
			}
			CIQ.UI.contextsForEach(function () {
				this.stx.preferences.magnet = stx.preferences.magnet;
				if (this.stx.chart.tempCanvas)
					CIQ.clearCanvas(this.stx.chart.tempCanvas, this.stx);
			});
		}

		/**
		 * Sends `toggleDrawingPalette` message to other palettes.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		togglePalette() {
			this.sendMessage("toggleDrawingPalette");
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.DrawingSettings
	 */
	DrawingSettings.markup = `
	<div role="group" aria-label="Drawing Tool Settings Palette" class="palette-container">	
		<div class="drag-strip" aria-hidden="true"></div>
			<div class="drawing-settings-wrapper">
					<div class="mini-widget-group">
						<cq-item class="ciq-mini-widget" cq-view="detach" stxtap="detach()" aria-label="Detach Palette" role="button"><span class="icon" aria-hidden="true"></span><label>Detach</label></cq-item>
						<cq-item class="ciq-mini-widget" cq-view="attach" stxtap="dock()" aria-label="Dock Palette" role="button"><span class="icon" aria-hidden="true"></span><label>Attach</label></cq-item>
					</div>
				<cq-clickable class="ciq-select ciq-mobile-palette-toggle" stxtap="togglePalette()"><span>Select Tool</span></cq-clickable>
				<cq-toolbar-settings>
					<div class="ciq-active-tool-label ciq-heading"></div>
					<cq-fill-color cq-section cq-overrides="auto,none" class="ciq-color" stxbind="getColor('fill')" stxtap="pickColor('fill')" role="button">
						<span class="icon" aria-hidden="true"></span>
						<span class="ciq-screen-reader">Fill Color</span>
						<span class="ciq-screen-reader" label></span>
					</cq-fill-color>
					<div>
						<cq-line-color cq-section cq-overrides="auto" class="ciq-color" stxbind="getColor('line')" stxtap="pickColor('line')" role="button">
							<span class="icon" aria-hidden="true"></span>
							<span class="ciq-screen-reader">Line Color</span>
							<span class="ciq-screen-reader" label></span>
						</cq-line-color>
						<cq-line-style cq-section>
							<cq-menu class="ciq-select ciq-line-style" reader="Line Style" config="linestyle" icon="ciq-solid-1" tooltip="Line Style"></cq-menu>
						</cq-line-style>
					</div>

					<cq-cvp-controller cq-section cq-cvp-header="1"></cq-cvp-controller>
					<cq-cvp-controller cq-section cq-cvp-header="2"></cq-cvp-controller>
					<cq-cvp-controller cq-section cq-cvp-header="3"></cq-cvp-controller>

					<cq-axis-label cq-section>
						<span role="checkbox" stxtap="toggleCheckbox('axisLabel')" class="ciq-checkbox ciq-active" aria-checked="true">
							<div class="ciq-heading">Axis Label:</div>
							<span></span>
						</span>
					</cq-axis-label>

					<cq-span-panels cq-section>
						<span role="checkbox" stxtap="toggleCheckbox('spanPanels')" class="ciq-checkbox ciq-active" aria-checked="true">
							<div class="ciq-heading">Span Panels:</div>
							<span></span>
						</span>
					</cq-span-panels>
	
					<cq-show-callout cq-section>
						<span role="checkbox" stxtap="toggleCheckbox('showCallout')" class="ciq-checkbox" aria-checked="false">
							<div class="ciq-heading">Show Callout:</div>
							<span></span>
						</span>
					</cq-show-callout>
	
					<cq-annotation cq-section role="group" aria-label="Annotation Settings">
						<cq-annotation-italic role="button" aria-label="Font Italic" stxtap="toggleFontStyle('italic')" class="ciq-btn" style="font-style:italic;" aria-pressed="false">I</cq-annotation-italic>
						<cq-annotation-bold role="button" aria-label="Font Bold" stxtap="toggleFontStyle('bold')" class="ciq-btn" style="font-weight:bold;" aria-pressed="false">B</cq-annotation-bold>
						<cq-menu class="ciq-select ciq-font-size" reader="Font Size" config="fontsize" text="Font Size"></cq-menu>
						<cq-menu class="ciq-select ciq-font-family" reader="Font Family" config="fontfamily" text="Font Family"></cq-menu>
					</cq-annotation>
					<cq-clickable role="button" aria-label="Fibonacci Settings" cq-fib-settings selector="cq-fib-settings-dialog" method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<cq-clickable role="button" aria-label="Volume Profile Settings" cq-volumeprofile-settings selector="cq-volumeprofile-settings-dialog" method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<cq-clickable role="button" aria-label="Measurement Line Settings" cq-measurementline-settings selector="cq-measurementline-settings-dialog" method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<div class="ciq-drawing-edit-only" cq-section>
						<div role="button" aria-label="Done Edit" cq-toolbar-action="done_edit" stxtap="DrawingEdit.endEdit('close')" cq-section><cq-tooltip>Done Editing</cq-tooltip></div>
					</div>
					<br cq-section cq-wave-parameters><!-- This break is not displayed by default but uses the .ciq-active class to be displayed and push cq-wave-parameters onto a new line in the toolbar -->
					<cq-wave-parameters cq-section role="group" aria-label="Wave Parameters"></cq-wave-parameters>
					<div class="ciq-drawing-edit-hidden" cq-section>
						<div role="button" aria-label="Save Config" cq-toolbar-action="save" stxtap="saveConfig()" cq-section><div cq-toolbar-dirty></div><cq-tooltip>Save Config</cq-tooltip></div>
						<div role="button" aria-label="Restore Config" cq-toolbar-action="restore" stxtap="restoreDefaultConfig()" cq-section><cq-tooltip>Restore Config</cq-tooltip></div>
					</div>
				</cq-toolbar-settings>
				<cq-measure><span class="mMeasure" aria-label="Measurement"></span></cq-measure>
			</div>
		<div class="resize-strip"></div>
	</div>
	`;
	CIQ.UI.addComponentDefinition("cq-drawing-settings", DrawingSettings);
}
