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
import "../../../js/webcomponents_legacy/palette.js";
import "../../../js/webcomponents-legacy/clickable.js";
import "../../../js/webcomponents_legacy/cvpController.js";
import "../../../js/webcomponents-legacy/menu.js";
import "../../../js/webcomponents-legacy/waveParameters.js";
import "../../../js/webcomponents/scroll/menuDropdown.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */








var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

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
	 * Drawing Settings palette web component used to draw and annotate on the chart. Displays a palette
	 * along the top of the chart for managing tool settings.
	 *
	 * Inherits from `<cq-palette>`. Palette components must be placed within a `<cq-palette-dock>` component.
	 *
	 * This works in conjunction with the [cq-drawing-palette]{@link WebComponents.cq-drawing-palette} component
	 * and replaces the [cq-toolbar]{@link WebComponents.cq-toolbar} component, providing additional functionality
	 * and an improved user experience.
	 *
	 * Emits a `change` event.
	 *
	 * @namespace WebComponents.cq-drawing-settings
	 * @example
		<cq-drawing-settings class="palette-settings" docked="true" orientation="horizontal" min-height="40">
			<div class="drawing-settings-wrapper">
				<cq-clickable class="ciq-select ciq-mobile-palette-toggle" stxtap="togglePalette()"><span>Select Tool</span></cq-clickable>
				<div class="ciq-active-tool-label ciq-heading"></div>
				<cq-toolbar-settings>
					<cq-fill-color cq-section class="ciq-color" stxbind="getFillColor()" stxtap="pickFillColor()">
						<span></span>
					</cq-fill-color>
					<div>
						<cq-line-color cq-section cq-overrides="auto" class="ciq-color" stxbind="getLineColor()" stxtap="pickLineColor()"><span></span></cq-line-color>
						<cq-line-style cq-section>
							<cq-menu class="ciq-select">
								<span cq-line-style class="ciq-line ciq-selected"></span>
								<cq-menu-dropdown class="ciq-line-style-menu">
									<cq-item stxtap="setLine(1,'solid')"><span class="ciq-line-style-option ciq-solid-1"></span></cq-item>
									<cq-item stxtap="setLine(3,'solid')"><span class="ciq-line-style-option ciq-solid-3"></span></cq-item>
									<cq-item stxtap="setLine(5,'solid')"><span class="ciq-line-style-option ciq-solid-5"></span></cq-item>
									<cq-item stxtap="setLine(1,'dotted')"><span class="ciq-line-style-option ciq-dotted-1"></span></cq-item>
									<cq-item stxtap="setLine(3,'dotted')"><span class="ciq-line-style-option ciq-dotted-3"></span></cq-item>
									<cq-item stxtap="setLine(5,'dotted')"><span class="ciq-line-style-option ciq-dotted-5"></span></cq-item>
									<cq-item stxtap="setLine(1,'dashed')"><span class="ciq-line-style-option ciq-dashed-1"></span></cq-item>
									<cq-item stxtap="setLine(3,'dashed')"><span class="ciq-line-style-option ciq-dashed-3"></span></cq-item>
									<cq-item stxtap="setLine(5,'dashed')"><span class="ciq-line-style-option ciq-dashed-5"></span></cq-item>
									<cq-item stxtap="setLine(0,'none')" class="ciq-none">None</cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</cq-line-style>
					</div>

					<cq-cvp-controller cq-section cq-cvp-header="1"></cq-cvp-controller>
					<cq-cvp-controller cq-section cq-cvp-header="2"></cq-cvp-controller>
					<cq-cvp-controller cq-section cq-cvp-header="3"></cq-cvp-controller>

					<template cq-cvp-controller>
						<div cq-section>
							<div class="ciq-heading">Dev 1</div>
							<span stxtap="toggleActive()" class="ciq-checkbox">
								<span></span>
							</span>
						</div>
						<cq-line-color cq-section cq-overrides="auto" class="ciq-color" stxbind="getColor()" stxtap="pickColor()">
							<span></span>
						</cq-line-color>
						<cq-line-style cq-section>
							<cq-menu class="ciq-select">
								<span cq-cvp-line-style class="ciq-line ciq-selected"></span>
								<cq-menu-dropdown class="ciq-line-style-menu">
									<cq-item stxtap="setStyle(1, 'solid')"><span class="ciq-line-style-option ciq-solid-1"></span></cq-item>
									<cq-item stxtap="setStyle(3, 'solid')"><span class="ciq-line-style-option ciq-solid-3"></span></cq-item>
									<cq-item stxtap="setStyle(5, 'solid')"><span class="ciq-line-style-option ciq-solid-5"></span></cq-item>
									<cq-item stxtap="setStyle(1, 'dotted')"><span class="ciq-line-style-option ciq-dotted-1"></span></cq-item>
									<cq-item stxtap="setStyle(3, 'dotted')"><span class="ciq-line-style-option ciq-dotted-3"></span></cq-item>
									<cq-item stxtap="setStyle(5, 'dotted')"><span class="ciq-line-style-option ciq-dotted-5"></span></cq-item>
									<cq-item stxtap="setStyle(1, 'dashed')"><span class="ciq-line-style-option ciq-dashed-1"></span></cq-item>
									<cq-item stxtap="setStyle(3, 'dashed')"><span class="ciq-line-style-option ciq-dashed-3"></span></cq-item>
									<cq-item stxtap="setStyle(5, 'dashed')"><span class="ciq-line-style-option ciq-dashed-5"></span></cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</cq-line-style>
					</template>

					<cq-axis-label cq-section>
						<div class="ciq-heading">Axis Label:</div>
						<span stxtap="toggleAxisLabel()" class="ciq-checkbox ciq-active"><span></span></span>
					</cq-axis-label>
					<cq-annotation cq-section>
						<cq-annotation-italic stxtap="toggleFontStyle('italic')" class="ciq-btn" style="font-style:italic;">I</cq-annotation-italic>
						<cq-annotation-bold stxtap="toggleFontStyle('bold')" class="ciq-btn" style="font-weight:bold;">B</cq-annotation-bold>
						<cq-menu class="ciq-select">
							<span cq-font-size>12px</span>
							<cq-menu-dropdown class="ciq-font-size">
								<cq-item stxtap="setFontSize('8px')">8</cq-item>
								<cq-item stxtap="setFontSize('10px')">10</cq-item>
								<cq-item stxtap="setFontSize('12px')">12</cq-item>
								<cq-item stxtap="setFontSize('13px')">13</cq-item>
								<cq-item stxtap="setFontSize('14px')">14</cq-item>
								<cq-item stxtap="setFontSize('16px')">16</cq-item>
								<cq-item stxtap="setFontSize('20px')">20</cq-item>
								<cq-item stxtap="setFontSize('28px')">28</cq-item>
								<cq-item stxtap="setFontSize('36px')">36</cq-item>
								<cq-item stxtap="setFontSize('48px')">48</cq-item>
								<cq-item stxtap="setFontSize('64px')">64</cq-item>
							</cq-menu-dropdown>
						</cq-menu>
						<cq-menu class="ciq-select">
							<span cq-font-family>Default</span>
							<cq-menu-dropdown class="ciq-font-family">
								<cq-item stxtap="setFontFamily('Default')">Default</cq-item>
								<cq-item stxtap="setFontFamily('Helvetica')">Helvetica</cq-item>
								<cq-item stxtap="setFontFamily('Courier')">Courier</cq-item>
								<cq-item stxtap="setFontFamily('Garamond')">Garamond</cq-item>
								<cq-item stxtap="setFontFamily('Palatino')">Palatino</cq-item>
								<cq-item stxtap="setFontFamily('Times New Roman')">Times New Roman</cq-item>
							</cq-menu-dropdown>
						</cq-menu>
					</cq-annotation>
					<cq-clickable cq-fib-settings cq-selector="cq-fib-settings-dialog" cq-method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<cq-clickable cq-volumeprofile-settings cq-selector="cq-volumeprofile-settings-dialog" cq-method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<cq-clickable cq-measurementline-settings cq-selector="cq-measurementline-settings-dialog" cq-method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<div class="ciq-drawing-edit-only" cq-section>
						<div cq-toolbar-action="done_edit" stxtap="DrawingEdit.endEdit('close')" cq-section><cq-tooltip>Done Editing</cq-tooltip></div>
					</div>
					<div class="ciq-drawing-edit-hidden" cq-section>
						<div cq-toolbar-action="save" stxtap="saveConfig()" cq-section><div cq-toolbar-dirty></div><cq-tooltip>Save Config</cq-tooltip></div>
						<div cq-toolbar-action="restore" stxtap="restoreDefaultConfig()" cq-section><cq-tooltip>Restore Config</cq-tooltip></div>
					</div>
				</cq-toolbar-settings>
				<cq-measure><span class="mMeasure"></span></cq-measure>
			</div>
		</cq-drawing-settings>
	 * @since 7.2.0
	 */
	class DrawingSettings extends Palette.classDefinition {
		connectedCallback() {
			if (this.attached) return;
			super.connectedCallback();

			CIQ.UI.stxtap(this, function (e) {
				e.stopPropagation();
			});
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, DrawingSettings);
			this.constructor = DrawingSettings;
		}

		setContext(context) {
			this.addDefaultMarkup();
			this.init();
			this.params = {
				lineSelection: this.node.find("*[cq-line-style]"),
				fontSizeSelection: this.node.find("*[cq-font-size]"),
				fontFamilySelection: this.node.find("*[cq-font-family]"),
				fontStyleToggle: this.node.find("cq-annotation-italic"),
				fontWeightToggle: this.node.find("cq-annotation-bold"),
				fontOptions: this.node.find("cq-annotation"),
				axisLabelToggle: this.node.find("cq-axis-label .ciq-checkbox"),
				spanPanelsToggle: this.node.find("cq-span-panels .ciq-checkbox"),
				showCalloutToggle: this.node.find("cq-show-callout .ciq-checkbox"),
				fillColor: this.node.find("cq-fill-color").not("cq-cvp-controller"),
				lineColor: this.node.find("cq-line-color").not("cq-cvp-controller"),
				cvpControllers: this.node.find("cq-cvp-controller"),
				waveParameters: this.node.find("cq-wave-parameters")
			};
			this.params.cvpControllers.prop("toolbar", this);

			// Add a texture to the drag strip
			//this.querySelector('.drag-strip').style.backgroundImage = "url('css/img/palette-drag-strip.svg')";
			this.sync();
			this.dirty(false);
			var self = this;
			CIQ.UI.contextsForEach(function () {
				if (this.stx.setDrawingContainer) this.stx.setDrawingContainer(self);
			});
			context.stx.addEventListener("theme", function (obj) {
				var isDirty = self.node
					.find("*[cq-toolbar-dirty]")
					.hasClass("ciq-active");
				self.sync();
				if (!isDirty) self.dirty(false);
			});
		}

		// Overridden from palette class
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

		crosshairs(activator) {
			var stx = this.context.stx;
			stx.changeVectorType(null);
			stx.layout.crosshair = true;
			stx.doDisplayCrosshairs();
			stx.findHighlights(false, true);
			stx.changeOccurred("layout");
			stx.draw();
			stx.updateChartAccessories();
			this.node.find("*[cq-section]").removeClass("ciq-active");
			this.emit();
		}

		tool(activator, toolName) {
			this.toolSettings(activator, toolName);
			this.setActiveToolLabel(toolName);
			this.sendMessage("changeToolSettings", {
				activator: activator,
				toolName: toolName
			});
		}

		toolSettings(activator, toolName) {
			var stx = this.context.stx;
			this.node.find("*[cq-section]").removeClass("ciq-active");
			var removeDirty = !this.node
				.find("*[cq-toolbar-dirty]")
				.hasClass("ciq-active");
			var drawingParameters = CIQ.Drawing.getDrawingParameters(stx, toolName);
			if (drawingParameters) {
				this.node.find("*[cq-toolbar-action='save']").addClass("ciq-active");
				var drawingPrefs = stx.preferences.drawings;
				if (drawingPrefs && drawingPrefs[toolName]) {
					this.node
						.find("*[cq-toolbar-action='restore']")
						.addClass("ciq-active");
					removeDirty = true;
				}
				// fibtimezone has no values to display in the settings dialog
				if (toolName === "fibtimezone") {
					delete drawingParameters.parameters;
				}

				var none = this.params.lineSelection.parent().find(".ciq-none");
				none.hide();
				var elements = this.defaultElements(drawingParameters, toolName);
				for (var i = 0; i < elements.length; i++) {
					this.node.find(elements[i]).addClass("ciq-active");
					if (elements[i] == "cq-fill-color") none.show();
				}
				elements = CIQ.Drawing[toolName].prototype.$controls;
				if (elements) {
					for (i = 0; i < elements.length; i++) {
						this.node.find(elements[i]).addClass("ciq-active");
					}
				}
				if (
					toolName === "trendline" &&
					!stx.currentVectorParameters.showCallout
				) {
					["fontOptions", "fillColor"].forEach((name) =>
						this.params[name].removeClass("ciq-active")
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
				if (this.restoreDocked) {
					this.dock();
					delete this.restoreDocked;
				}
				this.hide = "false";
			}
			// Resizing the dock because the setting palette is hidden/shown based on the 'no tool' selection
			this.paletteDock.handleResize();
			this.sync();
			if (removeDirty) this.dirty(false);
		}

		defaultElements(drawingParameters, toolName) {
			var arr = [];
			for (var param in drawingParameters) {
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

		dirty(on) {
			this.node
				.find("*[cq-toolbar-dirty]")
				[on === false ? "removeClass" : "addClass"]("ciq-active");
		}

		emit() {
			var event = new Event("change", {
				bubbles: true,
				cancelable: true
			});
			this.dirty();
			this.dispatchEvent(event);
		}

		getFillColor(activator) {
			var node = CIQ.UI.$(activator.node);
			var specialColorStyles = ["color-auto", "color-transparent"];
			var color = this.context.stx.currentVectorParameters.fillColor;
			node.removeClass(specialColorStyles);
			if (specialColorStyles.includes("color-" + color)) {
				node.removeAttr("style");
				node.addClass("color-" + color);
				return;
			}
			node.css({ background: color });
			var bgColor = CIQ.getBackgroundColor(this.parentNode);
			if (color && Math.abs(CIQ.hsl(bgColor)[2] - CIQ.hsl(color)[2]) < 0.2) {
				var border = CIQ.chooseForegroundColor(bgColor);
				node.css({ border: "solid " + border + " 1px" });
			} else {
				node.css({ border: "" });
			}
		}

		getLineColor(activator) {
			var node = CIQ.UI.$(activator.node);
			var specialColorStyles = ["color-auto", "color-transparent"];
			var color = this.context.stx.currentVectorParameters.currentColor;
			node.removeClass(specialColorStyles);
			if (specialColorStyles.includes("color-" + color)) {
				node.removeAttr("style");
				node.addClass("color-" + color);
				return;
			}
			node.css({ background: color });
			var bgColor = CIQ.getBackgroundColor(this.parentNode);
			if (!color || Math.abs(CIQ.hsl(bgColor)[2] - CIQ.hsl(color)[2]) < 0.2) {
				var border = CIQ.chooseForegroundColor(bgColor);
				node.css({ border: "solid " + border + " 1px" });
			} else {
				node.css({ border: "" });
			}
		}

		pickFillColor(activator) {
			var node = CIQ.UI.$(activator.node);
			var colorPicker = this.uiManager.getColorPicker(this);
			var self = this;
			colorPicker.callback = function (color) {
				self.context.stx.currentVectorParameters.fillColor = color;
				self.getFillColor({ node });
				self.emit();
			};
			var overrides = node.attr("cq-overrides");
			if (overrides) overrides = overrides.split(",");
			colorPicker.display({ node, overrides, context: self.context });
		}

		pickLineColor(activator) {
			var node = CIQ.UI.$(activator.node);
			var colorPicker = this.uiManager.getColorPicker(this);
			var self = this;
			colorPicker.callback = function (color) {
				self.context.stx.currentVectorParameters.currentColor = color;
				self.getLineColor({ node });
				self.emit();
			};
			var overrides = node.attr("cq-overrides");
			if (overrides) overrides = overrides.split(",");
			colorPicker.display({ node, overrides, context: self.context });
		}

		restoreDefaultConfig(activator, all) {
			var stx = this.context.stx;
			CIQ.Drawing.restoreDefaultConfig(
				stx,
				stx.currentVectorParameters.vectorType,
				all
			);
			this.node
				.find("*[cq-toolbar-action='restore']")
				.removeClass("ciq-active");
			this.sync();
			this.dirty(false);
		}

		saveConfig() {
			var stx = this.context.stx;
			CIQ.Drawing.saveConfig(stx, stx.currentVectorParameters.vectorType);
			this.node.find("*[cq-toolbar-action='restore']").addClass("ciq-active");
			this.sync();
			this.dirty(false);
		}

		setFibs(width, pattern) {
			var fib = this.context.stx.currentVectorParameters.fibonacci;
			if (fib) {
				for (var i = 0; i < fib.fibs.length; i++) {
					fib.fibs[i].parameters.lineWidth = width;
					fib.fibs[i].parameters.pattern = pattern;
				}
				fib.timezone.parameters.lineWidth = width;
				fib.timezone.parameters.pattern = pattern;
			}
		}

		setFontFamily(activator, fontFamily) {
			var stx = this.context.stx;

			if (stx.currentVectorParameters.annotation) {
				if (fontFamily == "Default") {
					stx.currentVectorParameters.annotation.font.family = null;
				} else {
					stx.currentVectorParameters.annotation.font.family = fontFamily;
				}
			}
			this.params.fontFamilySelection.text(fontFamily);
			this.emit();
		}

		setFontSize(activator, fontSize) {
			var stx = this.context.stx;

			if (stx.currentVectorParameters.annotation)
				stx.currentVectorParameters.annotation.font.size = fontSize;
			this.params.fontSizeSelection.text(fontSize);
			this.emit();
		}

		setLine(activator, width, pattern) {
			var stx = this.context.stx;

			stx.currentVectorParameters.lineWidth = width;
			stx.currentVectorParameters.pattern = pattern;
			this.setFibs(width, pattern);
			if (this.currentLineSelectedClass)
				this.params.lineSelection.removeClass(this.currentLineSelectedClass);
			this.currentLineSelectedClass =
				"ciq-" + pattern + "-" + parseInt(width, 10);
			if (pattern == "none") {
				this.currentLineSelectedClass = null;
			} else {
				this.params.lineSelection.addClass(this.currentLineSelectedClass);
			}
			this.emit();
		}

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
		 * @param {object} [cvp=stx.currentVectorParameters] A new drawing object, otherwise defaults to the current one
		 * @memberof WebComponents.cq-toolbar
		 */
		sync(cvp) {
			var stx = this.context.stx;
			if (!cvp) cvp = stx.currentVectorParameters;
			else
				stx.currentVectorParameters = CIQ.extend(
					stx.currentVectorParameters || {},
					cvp
				);

			var params = this.params;
			this.setLine(null, cvp.lineWidth, cvp.pattern);

			var style = stx.canvasStyle("stx_annotation");

			var font = cvp.annotation && cvp.annotation.font;

			var initialSize = (font && font.size) || style.fontSize;
			this.setFontSize(null, initialSize);

			var initialFamily = (font && font.family) || style.fontFamily;
			this.setFontFamily(null, initialFamily);

			var initialFontStyle = (font && font.style) || style.fontStyle;
			params.fontStyleToggle[
				initialFontStyle === "italic" ? "addClass" : "removeClass"
			]("ciq-active");

			var initialWeight = (font && font.weight) || style.fontWeight;
			params.fontWeightToggle[
				initialWeight === "bold" || initialWeight >= 700
					? "addClass"
					: "removeClass"
			]("ciq-active");

			params.axisLabelToggle[cvp.axisLabel ? "addClass" : "removeClass"](
				"ciq-active"
			);

			params.showCalloutToggle[cvp.showCallout ? "addClass" : "removeClass"](
				"ciq-active"
			);

			params.spanPanelsToggle[cvp.spanPanels ? "addClass" : "removeClass"](
				"ciq-active"
			);

			this.getFillColor({ node: params.fillColor });
			this.getLineColor({ node: params.lineColor });

			params.cvpControllers.each(function () {
				this.sync(cvp);
			});

			var waveParameters = params.waveParameters;
			if (waveParameters && waveParameters[0]) {
				waveParameters[0].activate();
			}
		}

		toggleCheckbox(activator, id) {
			const node = CIQ.UI.$(activator.node),
				cvp = this.context.stx.currentVectorParameters;
			cvp[id] = !cvp[id];
			node[cvp[id] ? "addClass" : "removeClass"]("ciq-active");
			if (id === "showCallout") {
				["fontOptions", "fillColor"].forEach((name) =>
					this.params[name][cvp[id] ? "addClass" : "removeClass"]("ciq-active")
				);
			}
			this.emit();
		}

		toggleFontStyle(activator, fontStyle) {
			var stx = this.context.stx;
			var node = CIQ.UI.$(activator.node);

			if (fontStyle == "italic") {
				if (stx.currentVectorParameters.annotation.font.style == "italic") {
					stx.currentVectorParameters.annotation.font.style = null;
					node.removeClass("ciq-active");
				} else {
					stx.currentVectorParameters.annotation.font.style = "italic";
					node.addClass("ciq-active");
				}
			} else if (fontStyle == "bold") {
				if (stx.currentVectorParameters.annotation.font.weight == "bold") {
					stx.currentVectorParameters.annotation.font.weight = null;
					node.removeClass("ciq-active");
				} else {
					stx.currentVectorParameters.annotation.font.weight = "bold";
					node.addClass("ciq-active");
				}
			}
			this.emit();
		}

		toggleMagnet(activator) {
			var toggle = CIQ.UI.$(activator.node);
			var stx = this.context.stx;
			if (stx.preferences.magnet) {
				toggle.removeClass("active");
				stx.preferences.magnet = false;
			} else {
				toggle.addClass("active");
				stx.preferences.magnet = true;
			}
			CIQ.UI.contextsForEach(function () {
				this.stx.preferences.magnet = stx.preferences.magnet;
				if (this.stx.chart.tempCanvas)
					CIQ.clearCanvas(this.stx.chart.tempCanvas, this.stx);
			});
		}

		togglePalette() {
			this.sendMessage("toggleDrawingPalette");
		}
	}

	DrawingSettings.markup = `
	<div class="palette-container">
		<div class="drag-strip"></div>
			<div class="drawing-settings-wrapper">
					<div class="mini-widget-group">
						<cq-item class="ciq-mini-widget" cq-view="detach" stxtap="detach()"><span class="icon"></span><label>Detach</label></cq-item>
						<cq-item class="ciq-mini-widget" cq-view="attach" stxtap="dock()"><span class="icon"></span><label>Attach</label></cq-item>
					</div>
				<cq-clickable class="ciq-select ciq-mobile-palette-toggle" stxtap="togglePalette()"><span>Select Tool</span></cq-clickable>
				<cq-toolbar-settings>
					<div class="ciq-active-tool-label ciq-heading"></div>
					<cq-fill-color cq-section cq-overrides="none" class="ciq-color" stxbind="getFillColor()" stxtap="pickFillColor()">
						<span></span>
					</cq-fill-color>
					<div>
						<cq-line-color cq-section cq-overrides="auto" class="ciq-color" stxbind="getLineColor()" stxtap="pickLineColor()"><span></span></cq-line-color>
						<cq-line-style cq-section>
							<cq-menu class="ciq-select">
								<span cq-line-style class="ciq-line ciq-selected"></span>
								<cq-menu-dropdown class="ciq-line-style-menu">
									<cq-item stxtap="setLine(1,'solid')"><span class="ciq-line-style-option ciq-solid-1"></span></cq-item>
									<cq-item stxtap="setLine(3,'solid')"><span class="ciq-line-style-option ciq-solid-3"></span></cq-item>
									<cq-item stxtap="setLine(5,'solid')"><span class="ciq-line-style-option ciq-solid-5"></span></cq-item>
									<cq-item stxtap="setLine(1,'dotted')"><span class="ciq-line-style-option ciq-dotted-1"></span></cq-item>
									<cq-item stxtap="setLine(3,'dotted')"><span class="ciq-line-style-option ciq-dotted-3"></span></cq-item>
									<cq-item stxtap="setLine(5,'dotted')"><span class="ciq-line-style-option ciq-dotted-5"></span></cq-item>
									<cq-item stxtap="setLine(1,'dashed')"><span class="ciq-line-style-option ciq-dashed-1"></span></cq-item>
									<cq-item stxtap="setLine(3,'dashed')"><span class="ciq-line-style-option ciq-dashed-3"></span></cq-item>
									<cq-item stxtap="setLine(5,'dashed')"><span class="ciq-line-style-option ciq-dashed-5"></span></cq-item>
									<cq-item stxtap="setLine(0,'none')" class="ciq-none">None</cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</cq-line-style>
					</div>

					<cq-cvp-controller cq-section cq-cvp-header="1"></cq-cvp-controller>
					<cq-cvp-controller cq-section cq-cvp-header="2"></cq-cvp-controller>
					<cq-cvp-controller cq-section cq-cvp-header="3"></cq-cvp-controller>

					<template cq-cvp-controller>
						<div cq-section>
							<div class="ciq-heading">Dev 1</div>
							<span stxtap="toggleActive()" class="ciq-checkbox">
								<span></span>
							</span>
						</div>
						<cq-line-color cq-section cq-overrides="auto" class="ciq-color" stxbind="getColor()" stxtap="pickColor()">
							<span></span>
						</cq-line-color>
						<cq-line-style cq-section>
							<cq-menu class="ciq-select">
								<span cq-cvp-line-style class="ciq-line ciq-selected"></span>
								<cq-menu-dropdown class="ciq-line-style-menu">
									<cq-item stxtap="setStyle(1, 'solid')"><span class="ciq-line-style-option ciq-solid-1"></span></cq-item>
									<cq-item stxtap="setStyle(3, 'solid')"><span class="ciq-line-style-option ciq-solid-3"></span></cq-item>
									<cq-item stxtap="setStyle(5, 'solid')"><span class="ciq-line-style-option ciq-solid-5"></span></cq-item>
									<cq-item stxtap="setStyle(1, 'dotted')"><span class="ciq-line-style-option ciq-dotted-1"></span></cq-item>
									<cq-item stxtap="setStyle(3, 'dotted')"><span class="ciq-line-style-option ciq-dotted-3"></span></cq-item>
									<cq-item stxtap="setStyle(5, 'dotted')"><span class="ciq-line-style-option ciq-dotted-5"></span></cq-item>
									<cq-item stxtap="setStyle(1, 'dashed')"><span class="ciq-line-style-option ciq-dashed-1"></span></cq-item>
									<cq-item stxtap="setStyle(3, 'dashed')"><span class="ciq-line-style-option ciq-dashed-3"></span></cq-item>
									<cq-item stxtap="setStyle(5, 'dashed')"><span class="ciq-line-style-option ciq-dashed-5"></span></cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</cq-line-style>
					</template>

					<cq-axis-label cq-section>
						<div class="ciq-heading">Axis Label:</div>
						<span stxtap="toggleCheckbox('axisLabel')" class="ciq-checkbox ciq-active"><span></span></span>
					</cq-axis-label>

					<cq-span-panels cq-section>
						<div class="ciq-heading">Span Panels:</div>
						<span stxtap="toggleCheckbox('spanPanels')" class="ciq-checkbox ciq-active"><span></span></span>
					</cq-span-panels>
	
					<cq-show-callout cq-section>
						<div class="ciq-heading">Show Callout:</div>
						<span stxtap="toggleCheckbox('showCallout')" class="ciq-checkbox"><span></span></span>
					</cq-show-callout>
	
					<cq-annotation cq-section>
						<cq-annotation-italic stxtap="toggleFontStyle('italic')" class="ciq-btn" style="font-style:italic;">I</cq-annotation-italic>
						<cq-annotation-bold stxtap="toggleFontStyle('bold')" class="ciq-btn" style="font-weight:bold;">B</cq-annotation-bold>
						<cq-menu class="ciq-select">
							<span cq-font-size>12px</span>
							<cq-menu-dropdown class="ciq-font-size">
								<cq-item stxtap="setFontSize('8px')">8</cq-item>
								<cq-item stxtap="setFontSize('10px')">10</cq-item>
								<cq-item stxtap="setFontSize('12px')">12</cq-item>
								<cq-item stxtap="setFontSize('13px')">13</cq-item>
								<cq-item stxtap="setFontSize('14px')">14</cq-item>
								<cq-item stxtap="setFontSize('16px')">16</cq-item>
								<cq-item stxtap="setFontSize('20px')">20</cq-item>
								<cq-item stxtap="setFontSize('28px')">28</cq-item>
								<cq-item stxtap="setFontSize('36px')">36</cq-item>
								<cq-item stxtap="setFontSize('48px')">48</cq-item>
								<cq-item stxtap="setFontSize('64px')">64</cq-item>
							</cq-menu-dropdown>
						</cq-menu>
						<cq-menu class="ciq-select">
							<span cq-font-family>Default</span>
							<cq-menu-dropdown class="ciq-font-family">
								<cq-item stxtap="setFontFamily('Default')">Default</cq-item>
								<cq-item stxtap="setFontFamily('Helvetica')">Helvetica</cq-item>
								<cq-item stxtap="setFontFamily('Courier')">Courier</cq-item>
								<cq-item stxtap="setFontFamily('Garamond')">Garamond</cq-item>
								<cq-item stxtap="setFontFamily('Palatino')">Palatino</cq-item>
								<cq-item stxtap="setFontFamily('Times New Roman')">Times New Roman</cq-item>
							</cq-menu-dropdown>
						</cq-menu>
					</cq-annotation>
					<cq-clickable cq-fib-settings cq-selector="cq-fib-settings-dialog" cq-method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<cq-clickable cq-volumeprofile-settings cq-selector="cq-volumeprofile-settings-dialog" cq-method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<cq-clickable cq-measurementline-settings cq-selector="cq-measurementline-settings-dialog" cq-method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<div class="ciq-drawing-edit-only" cq-section>
						<div cq-toolbar-action="done_edit" stxtap="DrawingEdit.endEdit('close')" cq-section><cq-tooltip>Done Editing</cq-tooltip></div>
					</div>
					<br cq-section cq-wave-parameters><!-- This break is not displayed by default but uses  the .ciq-active class to be displayed and push cq-wave-parameters onto a new line in the toolbar -->
					<cq-wave-parameters cq-section></cq-wave-parameters>
					<template cq-wave-parameters>
						<div class="ciq-wave-template" cq-section>
							<div class="ciq-heading">WAVE TEMPLATE</div>
							<cq-menu class="ciq-select">
								<span class="ciq-active-template">WAVE TEMPLATE</span>
								<cq-menu-dropdown>
									<cq-item stxtap="update('template','Grand Supercycle')">Grand Supercycle</cq-item>
									<cq-item stxtap="update('template','Supercycle')">Supercycle</cq-item>
									<cq-item stxtap="update('template','Cycle')">Cycle</cq-item>
									<cq-item stxtap="update('template','Primary')">Primary</cq-item>
									<cq-item stxtap="update('template','Intermediate')">Intermediate</cq-item>
									<cq-item stxtap="update('template','Minor')">Minor</cq-item>
									<cq-item stxtap="update('template','Minute')">Minute</cq-item>
									<cq-item stxtap="update('template','Minuette')">Minuette</cq-item>
									<cq-item stxtap="update('template','Sub-Minuette')">Sub-Minuette</cq-item>
									<cq-item stxtap="update('template','Custom')">Custom</cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</div>
						<div class="ciq-wave-impulse" cq-section>
							<div class="ciq-heading">IMPULSE</div>
							<cq-menu  class="ciq-select">
								<span class="ciq-active-impulse">IMPULSE</span>
								<cq-menu-dropdown>
									<cq-item stxTap="update('impulse',null)">- - -</cq-item>
									<cq-item stxtap="update('impulse','I,II,III,IV,V')">I II III IV V</cq-item>
									<cq-item stxtap="update('impulse','i,ii,iii,iv,v')">i ii iii iv v</cq-item>
									<cq-item stxtap="update('impulse','1,2,3,4,5')">1 2 3 4 5</cq-item>
									<cq-item stxtap="update('impulse','A,B,C,D,E')">A B C D E</cq-item>
									<cq-item stxtap="update('impulse','a,b,c,d,e')">a b c d e</cq-item>
									<cq-item stxtap="update('impulse','W,X,Y,X,Z')">W X Y X Z</cq-item>
									<cq-item stxtap="update('impulse','w,x,y,x,z')">w x y x z</cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</div>
						<div class="ciq-wave-corrective" cq-section>
							<div class="ciq-heading">CORRECTIVE</div>
							<cq-menu class="ciq-select">
								<span class="ciq-active-corrective">CORRECTIVE</span>
								<cq-menu-dropdown>
									<cq-item stxtap="update('corrective',null)">- - -</cq-item>
									<cq-item stxtap="update('corrective','A,B,C')">A B C</cq-item>
									<cq-item stxtap="update('corrective','a,b,c')">a b c</cq-item>
									<cq-item stxtap="update('corrective','W,X,Y')">W X Y</cq-item>
									<cq-item stxtap="update('corrective','w,x,y')">w x y</cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</div>
						<span class="ciq-icon-btn ciq-btn" decoration="none" stxtap="update('decoration',null)" cq-section>
							<cq-tooltip>None</cq-tooltip>
						</span>
						<span class="ciq-icon-btn ciq-btn" decoration="parentheses" stxtap="update('decoration','parentheses')" cq-section>
							<cq-tooltip>Parentheses</cq-tooltip>
						</span>
						<span class="ciq-icon-btn ciq-btn" decoration="enclosed" stxtap="update('decoration','enclosed')" cq-section>
							<cq-tooltip>Enclosed</cq-tooltip>
						</span>
						<div class="ciq-heading ciq-show-lines"  cq-section>
							Show Lines: <span stxtap="toggleLines()" class="ciq-checkbox ciq-active"><span></span></span>
						</div>
					</template>
					<div class="ciq-drawing-edit-hidden" cq-section>
						<div cq-toolbar-action="save" stxtap="saveConfig()" cq-section><div cq-toolbar-dirty></div><cq-tooltip>Save Config</cq-tooltip></div>
						<div cq-toolbar-action="restore" stxtap="restoreDefaultConfig()" cq-section><cq-tooltip>Restore Config</cq-tooltip></div>
					</div>
				</cq-toolbar-settings>
				<cq-measure><span class="mMeasure"></span></cq-measure>
			</div>
		<div class="resize-strip"></div>
	</div>
	`;
	CIQ.UI.addComponentDefinition("cq-drawing-settings", DrawingSettings);
}
