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
import "../../js/standard/drawing.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Drawing) {
	console.error("toolbar component requires first activating drawing feature.");
} else {
	/**
	 * Drawing toolbar web component used to activate and manage available drawings.
	 *
	 * Emits a "change" event when changed.
	 *
	 * @namespace WebComponents.cq-toolbar
	 * @example
	 * <cq-toolbar>
	 *     <cq-menu class="ciq-select">
	 *         <span cq-current-tool>Select Tool</span>
	 *         <cq-menu-dropdown>
	 *             <cq-item stxtap="noTool()">None</cq-item>
	 *             <cq-item stxtap="clearDrawings()">Clear All Drawings</cq-item>
	 *             <cq-item stxtap="restoreDefaultConfig(true)">Restore Default Parameters</cq-item>
	 *             <cq-item stxtap="tool('measure')">Measure</cq-item>
	 *             <cq-separator></cq-separator>
	 *             <cq-item stxtap="tool('annotation')">Annotation</cq-item>
	 *             <cq-item stxtap="tool('average')">Average Line</cq-item>
	 *             <cq-item stxtap="tool('callout')">Callout</cq-item>
	 *             <cq-item stxtap="tool('channel')">Channel</cq-item>
	 *             <cq-item stxtap="tool('continuous')">Continuous</cq-item>
	 *             <cq-item stxtap="tool('crossline')">Crossline</cq-item>
	 *             <cq-item stxtap="tool('freeform')">Doodle</cq-item>
	 *             <cq-item stxtap="tool('ellipse')">Ellipse</cq-item>
	 *             <cq-item stxtap="tool('retracement')">Fib Retracement</cq-item>
	 *             <cq-item stxtap="tool('fibprojection')">Fib Projection</cq-item>
	 *             <cq-item stxtap="tool('fibarc')">Fib Arc</cq-item>
	 *             <cq-item stxtap="tool('fibfan')">Fib Fan</cq-item>
	 *             <cq-item stxtap="tool('fibtimezone')">Fib Time Zone</cq-item>
	 *             <cq-item stxtap="tool('gannfan')">Gann Fan</cq-item>
	 *             <cq-item stxtap="tool('gartley')">Gartley</cq-item>
	 *             <cq-item stxtap="tool('horizontal')">Horizontal</cq-item>
	 *             <cq-item stxtap="tool('line')">Line</cq-item>
	 *             <cq-item stxtap="tool('pitchfork')">Pitchfork</cq-item>
	 *             <cq-item stxtap="tool('quadrant')">Quadrant Lines</cq-item>
	 *             <cq-item stxtap="tool('ray')">Ray</cq-item>
	 *             <cq-item stxtap="tool('rectangle')">Rectangle</cq-item>
	 *             <cq-item stxtap="tool('regression')">Regression Line</cq-item>
	 *             <cq-item stxtap="tool('segment')">Segment</cq-item>
	 *             <cq-item stxtap="tool('arrow')">Shape - Arrow</cq-item>
	 *             <cq-item stxtap="tool('check')">Shape - Check</cq-item>
	 *             <cq-item stxtap="tool('xcross')">Shape - Cross</cq-item>
	 *             <cq-item stxtap="tool('focusarrow')">Shape - Focus</cq-item>
	 *             <cq-item stxtap="tool('heart')">Shape - Heart</cq-item>
	 *             <cq-item stxtap="tool('star')">Shape - Star</cq-item>
	 *             <cq-item stxtap="tool('speedarc')">Speed Resistance Arc</cq-item>
	 *             <cq-item stxtap="tool('speedline')">Speed Resistance Line</cq-item>
	 *             <cq-item stxtap="tool('timecycle')">Time Cycle</cq-item>
	 *             <cq-item stxtap="tool('tirone')">Tirone Levels</cq-item>
	 *             <cq-item stxtap="tool('trendline')">Trend Line</cq-item>
	 *             <cq-item stxtap="tool('vertical')">Vertical</cq-item>
	 *         </cq-menu-dropdown>
	 *     </cq-menu>
	 *     <cq-toolbar-settings>
	 *         <cq-fill-color cq-section class="ciq-color" stxbind="getFillColor()" stxtap="pickFillColor()">
	 *             <span></span>
	 *         </cq-fill-color>
	 *         <div>
	 *             <cq-line-color cq-section cq-overrides="auto" class="ciq-color" stxbind="getLineColor()" stxtap="pickLineColor()"><span></span></cq-line-color>
	 *             <cq-line-style cq-section>
	 *                 <cq-menu class="ciq-select">
	 *                     <span cq-line-style class="ciq-line ciq-selected"></span>
	 *                     <cq-menu-dropdown class="ciq-line-style-menu">
	 *                         <cq-item stxtap="setLine(1,'solid')"><span class="ciq-line-style-option ciq-solid-1"></span></cq-item>
	 *                         <cq-item stxtap="setLine(3,'solid')"><span class="ciq-line-style-option ciq-solid-3"></span></cq-item>
	 *                         <cq-item stxtap="setLine(5,'solid')"><span class="ciq-line-style-option ciq-solid-5"></span></cq-item>
	 *                         <cq-item stxtap="setLine(1,'dotted')"><span class="ciq-line-style-option ciq-dotted-1"></span></cq-item>
	 *                         <cq-item stxtap="setLine(3,'dotted')"><span class="ciq-line-style-option ciq-dotted-3"></span></cq-item>
	 *                         <cq-item stxtap="setLine(5,'dotted')"><span class="ciq-line-style-option ciq-dotted-5"></span></cq-item>
	 *                         <cq-item stxtap="setLine(1,'dashed')"><span class="ciq-line-style-option ciq-dashed-1"></span></cq-item>
	 *                         <cq-item stxtap="setLine(3,'dashed')"><span class="ciq-line-style-option ciq-dashed-3"></span></cq-item>
	 *                         <cq-item stxtap="setLine(5,'dashed')"><span class="ciq-line-style-option ciq-dashed-5"></span></cq-item>
	 *                         <cq-item stxtap="setLine(0,'none')" class="ciq-none">None</cq-item>
	 *                     </cq-menu-dropdown>
	 *                 </cq-menu>
	 *             </cq-line-style>
	 *         </div>
	 *         <cq-axis-label cq-section>
	 *             <div class="ciq-heading">Axis Label:</div>
	 *             <span stxtap="toggleAxisLabel()" class="ciq-checkbox ciq-active"><span></span></span>
	 *         </cq-axis-label>
	 *         <cq-annotation cq-section>
	 *             <cq-annotation-italic stxtap="toggleFontStyle('italic')" class="ciq-btn" style="font-style:italic;">I</cq-annotation-italic>
	 *             <cq-annotation-bold stxtap="toggleFontStyle('bold')" class="ciq-btn" style="font-weight:bold;">B</cq-annotation-bold>
	 *             <cq-menu class="ciq-select">
	 *                 <span cq-font-size>12px</span>
	 *                 <cq-menu-dropdown class="ciq-font-size">
	 *                     <cq-item stxtap="setFontSize('8px')">8</cq-item>
	 *                     <cq-item stxtap="setFontSize('10px')">10</cq-item>
	 *                     <cq-item stxtap="setFontSize('12px')">12</cq-item>
	 *                     <cq-item stxtap="setFontSize('13px')">13</cq-item>
	 *                     <cq-item stxtap="setFontSize('14px')">14</cq-item>
	 *                     <cq-item stxtap="setFontSize('16px')">16</cq-item>
	 *                     <cq-item stxtap="setFontSize('20px')">20</cq-item>
	 *                     <cq-item stxtap="setFontSize('28px')">28</cq-item>
	 *                     <cq-item stxtap="setFontSize('36px')">36</cq-item>
	 *                     <cq-item stxtap="setFontSize('48px')">48</cq-item>
	 *                     <cq-item stxtap="setFontSize('64px')">64</cq-item>
	 *                 </cq-menu-dropdown>
	 *             </cq-menu>
	 *             <cq-menu class="ciq-select">
	 *                 <span cq-font-family>Default</span>
	 *                 <cq-menu-dropdown class="ciq-font-family">
	 *                     <cq-item stxtap="setFontFamily('Default')">Default</cq-item>
	 *                     <cq-item stxtap="setFontFamily('Helvetica')">Helvetica</cq-item>
	 *                     <cq-item stxtap="setFontFamily('Courier')">Courier</cq-item>
	 *                     <cq-item stxtap="setFontFamily('Garamond')">Garamond</cq-item>
	 *                     <cq-item stxtap="setFontFamily('Palatino')">Palatino</cq-item>
	 *                     <cq-item stxtap="setFontFamily('Times New Roman')">Times New Roman</cq-item>
	 *                 </cq-menu-dropdown>
	 *             </cq-menu>
	 *         </cq-annotation>
	 *         <cq-clickable cq-fib-settings cq-selector="cq-fib-settings-dialog" cq-method="open" cq-section><span class="ciq-btn">Settings</span></cq-clickable>
	 *         <div cq-toolbar-action="save" stxtap="saveConfig()" cq-section><div cq-toolbar-dirty></div><div cq-tooltip>Save Config</div></div>
	 *         <div cq-toolbar-action="restore" stxtap="restoreDefaultConfig()" cq-section><div cq-tooltip>Restore Config</div></div>
	 *     </cq-toolbar-settings>
	 *     <cq-measure><span class="mMeasure"></span></cq-measure>
	 *     <cq-undo-section>
	 *         <cq-undo class="ciq-btn">Undo</cq-undo>
	 *         <cq-redo class="ciq-btn">Redo</cq-redo>
	 *     </cq-undo-section>
	 * </cq-toolbar>
	 */
	class DrawingToolbar extends CIQ.UI.ContextTag {
		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();
			this.params = {
				toolSelection: this.node.find("*[cq-current-tool]"),
				lineSelection: this.node.find("*[cq-line-style]"),
				fontSizeSelection: this.node.find("*[cq-font-size]"),
				fontFamilySelection: this.node.find("*[cq-font-family]"),
				fontStyleToggle: this.node.find("cq-annotation-italic"),
				fontWeightToggle: this.node.find("cq-annotation-bold"),
				axisLabelToggle: this.node.find("cq-axis-label .ciq-checkbox"),
				fillColor: this.node.find("cq-fill-color").not("cq-cvp-controller"),
				lineColor: this.node.find("cq-line-color").not("cq-cvp-controller"),
				cvpControllers: this.node.find("cq-cvp-controller")
			};
			this.params.cvpControllers.prop("toolbar", this);
			this.noToolSelectedText = "";
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, DrawingToolbar);
		}

		clearDrawings() {
			this.context.stx.clearDrawings(null, false);
		}

		crosshairs(activator) {
			var node = CIQ.UI.$(activator.node);
			var stx = this.context.stx;
			this.params.toolSelection.html(node.html());
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

		defaultElements(drawingParameters) {
			var arr = [];
			for (var param in drawingParameters) {
				if (param == "color") arr.push("cq-line-color");
				else if (param == "fillColor") arr.push("cq-fill-color");
				else if (param == "pattern" || param == "lineWidth")
					arr.push("cq-line-style");
				else if (param == "axisLabel") arr.push("cq-axis-label");
				else if (param == "font") arr.push("cq-annotation");
				else if (param == "parameters") arr.push("cq-clickable");
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
			var color = this.context.stx.currentVectorParameters.fillColor;
			if (color == "transparent" || color == "auto") color = "";
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
			var color = this.context.stx.currentVectorParameters.currentColor;
			if (color == "transparent" || color == "auto") color = "";
			node.css({ background: color });
			var bgColor = CIQ.getBackgroundColor(this.parentNode);
			if (!color || Math.abs(CIQ.hsl(bgColor)[2] - CIQ.hsl(color)[2]) < 0.2) {
				var border = CIQ.chooseForegroundColor(bgColor);
				node.css({ border: "solid " + border + " 1px" });
				if (!color)
					node.css({
						background:
							"linear-gradient(to bottom right, " +
							border +
							", " +
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

		noTool() {
			var stx = this.context.stx;
			stx.changeVectorType("");
			if (stx.layout.crosshair) {
				stx.layout.crosshair = false;
				stx.changeOccurred("layout");
				stx.doDisplayCrosshairs();
			}
			// Don't disengage the magnet
			/*if (stx.preferences.magnet) {
				this.toggleMagnet(this);
			}*/
			this.params.toolSelection.text(this.noToolSelectedText);
			this.params.toolSelection.attr("cq-current-tool", "");
			this.node.find("*[cq-section]").removeClass("ciq-active");
			this.emit();
		}

		pickFillColor(activator) {
			var node = CIQ.UI.$(activator.node);
			var colorPicker = this.ownerDocument.querySelector("cq-color-picker");
			if (!colorPicker) {
				console.log(
					"DrawingToolbar.prototype.pickFillColor: no ColorPicker available"
				);
				return;
			}
			var self = this;
			colorPicker.callback = function (color) {
				self.context.stx.currentVectorParameters.fillColor = color;
				self.getFillColor({ node });
				self.emit();
			};
			colorPicker.display({ node, context: this.context });
		}

		pickLineColor(activator) {
			var node = CIQ.UI.$(activator.node);
			var colorPicker = this.ownerDocument.querySelector("cq-color-picker");
			if (!colorPicker) {
				console.log(
					"DrawingToolbar.prototype.pickLineColor: no ColorPicker available"
				);
				return;
			}
			var self = this;
			colorPicker.callback = function (color) {
				self.context.stx.currentVectorParameters.currentColor = color;
				self.getLineColor({ node });
				self.emit();
			};
			var overrides = node.attr("cq-overrides");
			if (overrides) overrides = overrides.split(",");
			colorPicker.display({ node, context: this.context, overrides });
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

		setContext(context) {
			this.noToolSelectedText = this.params.toolSelection.text();
			this.sync();
			this.dirty(false);
			var self = this;
			this.eventListeners.push(
				context.stx.addEventListener("theme", function (obj) {
					var isDirty = self.node
						.find("*[cq-toolbar-dirty]")
						.hasClass("ciq-active");
					self.sync();
					if (!isDirty) self.dirty(false);
				})
			);
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

			this.getFillColor({ node: params.fillColor });
			this.getLineColor({ node: params.lineColor });

			params.cvpControllers.each(function () {
				this.sync(cvp);
			});
		}

		toggleAxisLabel(activator) {
			var stx = this.context.stx;
			var node = CIQ.UI.$(activator.node);

			if (stx.currentVectorParameters.axisLabel === true) {
				stx.currentVectorParameters.axisLabel = false;
				node.removeClass("ciq-active");
			} else {
				stx.currentVectorParameters.axisLabel = true;
				node.addClass("ciq-active");
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
			CIQ.clearCanvas(stx.chart.tempCanvas, stx);
		}

		tool(activator, toolName) {
			var node = CIQ.UI.$(activator.node);
			if (!toolName) toolName = node.getAttribute("cq-tool");
			if (!toolName) return;
			var stx = this.context.stx;
			stx.clearMeasure();
			stx.changeVectorType(toolName);
			this.params.toolSelection.html(node.html());
			this.params.toolSelection.attr("cq-current-tool", toolName);

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
				var elements = this.defaultElements(drawingParameters);
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
			}
			this.sync();
			if (removeDirty) this.dirty(false);
		}
	}

	CIQ.UI.addComponentDefinition("cq-toolbar", DrawingToolbar);
}
