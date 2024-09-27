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
import "../../js/standard/studies.js";
import "../../js/webcomponents_legacy/dialog.js";
import "../../js/webcomponents_legacy/menu.js";
import "../../js/webcomponents/scroll.js";
import "../../js/webcomponents_legacy/studyInput.js";
import "../../js/webcomponents_legacy/studyOutput.js";
import "../../js/webcomponents_legacy/studyParameter.js";
import "../../js/webcomponents_legacy/swatch.js";
import "../../js/webcomponents/scroll/menuDropdown.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */










var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"studyDialog component requires first activating studies feature."
	);
} else {
	/**
	 * Study dialogs web component `<cq-study-dialog>`.
	 *
	 * Creates and manages study dialogs based on the corresponding study library entry (title,
	 * inputs, outputs, parameters, etc.).
	 *
	 * Requires {@link CIQ.UI.StudyEdit}.
	 *
	 * Optional Attributes:
	 * - `cq-study-axis` &mdash; Displays UI for selecting the y-axisposition (left, right, etc.),
	 *   color and for inverting the y-axis *if not shared with the primary-axis*.
	 * - `cq-study-panel` &mdash; Displays UI for selecting the panel for the study (own, shared,
	 *   etc.) and whether it is rendered as an underlay (under the primary chart) or an overlay
	 *   (over the primary chart). Set this attribute to "alias" to have the panel names listed as
	 *   "<Panel 1>", "<Panel 2>", etc.
	 *
	 * @namespace WebComponents.cq-study-dialog
	 * @since
	 * - 5.2.0 Optional Attributes `cq-study-axis` and `cq-study-panel` are now available.
	 * - 6.3.0 `cq-study-axis` now also provides a check box allowing users to invert study y-axis
	 * 		if not shared with the primary-axis.
	 *
	 * @example <caption> Here is an example of how to create a study dialog. We add the
	 * <code>cq-study-axis</code> and <code>cq-study-panel</code> attributes to enable form fields
	 * used to control axis position, color, study panel, and underlay/overlay.
	 * </caption>
	 * <cq-dialog>
	 *      <cq-study-dialog cq-study-axis cq-study-panel>
	 *           <h4 class="title">Study</h4>
	 *           <cq-scroll cq-no-maximize>
	 *                <cq-study-inputs>
	 *                     <template cq-study-input>
	 *                          <cq-study-input>
	 *                               <div class="ciq-heading"></div>
	 *                               <div class="stx-data">
	 *                                    <template cq-menu>
	 *                                         <cq-menu class="ciq-select">
	 *                                              <cq-selected></cq-selected>
	 *                                              <cq-menu-dropdown cq-lift></cq-menu-dropdown>
	 *                                         </cq-menu>
	 *                                    </template>
	 *                               </div>
	 *                          </cq-study-input>
	 *                     </template>
	 *                </cq-study-inputs>
	 *                <hr>
	 *                <cq-study-outputs>
	 *                     <template cq-study-output>
	 *                          <cq-study-output>
	 *                               <div class="ciq-heading"></div>
	 *                               <cq-swatch cq-overrides="auto"></cq-swatch>
	 *                          </cq-study-output>
	 *                     </template>
	 *                </cq-study-outputs>
	 *                <hr>
	 *                <cq-study-parameters>
	 *                     <template cq-study-parameters>
	 *                          <cq-study-parameter>
	 *                               <div class="ciq-heading"></div>
	 *                               <div class="stx-data"><cq-swatch cq-overrides="auto"></cq-swatch>
	 *                                    <template cq-menu>
	 *                                         <cq-menu class="ciq-select">
	 *                                              <cq-selected></cq-selected>
	 *                                              <cq-menu-dropdown cq-lift></cq-menu-dropdown>
	 *                                         </cq-menu>
	 *                                    </template>
	 *                               </div>
	 *                          </cq-study-parameter>
	 *                     </template>
	 *                </cq-study-parameters>
	 *           </cq-scroll>
	 *           <div class="ciq-dialog-cntrls">
	 *                <div class="ciq-btn" stxtap="close()">Done</div>
	 *           </div>
	 *      </cq-study-dialog>
	 * </cq-dialog>
	 */
	class StudyDialog extends CIQ.UI.DialogContentTag {
		connectedCallback() {
			if (this.attached) return;
			super.connectedCallback();
			this.queuedUpdates = {};
		}

		close() {
			if (this.addWhenDone) {
				var helper = this.helper;
				var sd = CIQ.Studies.addStudy(helper.stx, helper.name);
				if (!CIQ.isEmpty(this.queuedUpdates)) {
					helper.sd = sd;
					helper.updateStudy(this.queuedUpdates);
					this.queuedUpdates = {};
				}
				delete this.addWhenDone;
			}
		}

		closeActiveMenu(node) {
			const hub = this.ownerDocument.body.keystrokeHub;
			const activeMenu = this.querySelector("*.stxMenuActive");
			const uiManager = CIQ.UI.getUIManager(this);
			if (
				!activeMenu ||
				!hub ||
				!hub.tabActiveElement ||
				hub.tabActiveElement.element !== node
			)
				return;
			hub.tabActiveElement = null;
			hub.highlightHide();
			uiManager.closeMenu(activeMenu);
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, StudyDialog);
			this.constructor = StudyDialog;
		}

		disconnectedCallback() {
			CIQ.UI.unobserveProperty("signal", this.helper);
			super.disconnectedCallback();
		}

		formatDateInput(date) {
			date = date.replace(/-/g, "");
			if (!date.search(/^\d{8}$/))
				date =
					date.substring(0, 4) +
					"-" +
					date.substring(4, 6) +
					"-" +
					date.substring(6, 8);
			return date;
		}

		formatTimeInput(time) {
			time = time.replace(/:/g, "");
			if (!time.search(/^\d{4,6}$/))
				time =
					time.substring(0, 2) +
					":" +
					time.substring(2, 4) +
					(time.length == 4 ? "" : ":" + time.substring(4, 6));
			return time;
		}

		hide() {
			if (!CIQ.isEmpty(this.queuedUpdates)) {
				this.helper.updateStudy(this.queuedUpdates);
				this.queuedUpdates = {};
			}
			this.node.find("cq-menu").each(function () {
				if (this.unlift) this.unlift();
			});
			this.node.find("cq-swatch").each(function () {
				if (this.colorPicker) this.colorPicker.close();
			});
		}

		makeMenu(name, currentValue, fields, section) {
			var menu = CIQ.UI.makeFromTemplate(this.menuTemplate);
			var cqMenu = menu.find("cq-menu-dropdown"); // scrollable in menu.
			for (var field in fields) {
				var item = document.createElement("cq-item");
				item.innerText = fields[field];
				item.setAttribute(
					"stxtap",
					"StudyDialog.setSelectOption('" + section + "')"
				); // must call StudyDialog because the item is "lifted" and so doesn't know its parent
				cqMenu.append(item);
				item.cqMenuWrapper = cqMenu.parents("cq-menu")[0];
				item.setAttribute("name", name);
				item.setAttribute("value", field);
				item.context = this.context;
			}
			var inputValue = menu.find("cq-selected");
			inputValue.text(
				fields[currentValue] || this.helper.stx.translateIf(currentValue)
			);
			return menu[0];
		}

		open(params) {
			this.addDefaultMarkup();
			this.selectTemplates();

			super.open(params);
			if (!("axisSelect" in params)) {
				params.axisSelect = this.getAttribute("cq-study-axis");
				if (params.axisSelect === "") params.axisSelect = true;
			}
			if (!("panelSelect" in params)) {
				params.panelSelect = this.getAttribute("cq-study-panel");
				if (params.panelSelect === "") params.panelSelect = true;
			}

			if (typeof params.addWhenDone !== "undefined")
				this.addWhenDone = params.addWhenDone;
			// Generate a "helper" which tells us how to create a dialog
			var self = this,
				stx = this.context.stx;
			CIQ.UI.unobserveProperty("signal", this.helper);
			this.helper = new CIQ.Studies.DialogHelper(params);
			CIQ.UI.observeProperty("signal", this.helper, function (obj) {
				self.refreshInputs();
				self.refreshOutputs();
				self.refreshParameters(params);
			});

			var dialog = this.node;

			dialog.find(".title").text(this.helper.title);

			// Create form elements for all of the inputs
			this.refreshInputs(true);

			// Create form elements for all of the outputs
			this.refreshOutputs(true);

			// Create form elements for all of the parameters
			this.refreshParameters(params, true);
		}

		refreshInputs(empty) {
			var inputs = this.node.find("cq-study-inputs");
			if (empty) inputs.empty();
			for (var i = 0; i < this.helper.inputs.length; i++) {
				var input = this.helper.inputs[i];
				var newInput = CIQ.UI.makeFromTemplate(this.inputTemplate);
				this.menuTemplate = newInput.find("template[cq-menu]");
				newInput.find(".ciq-heading").text(input.heading);
				newInput[0].setAttribute("fieldname", input.name);
				var formField = null;

				var iAttr;
				var attributes = this.helper.attributes[input.name];
				if (input.type == "number") {
					formField = document.createElement("input");
					formField.setAttribute("type", "number");
					formField.value = input.value;
					this.setChangeEvent(formField, "inputs", input.name);
					for (iAttr in attributes) {
						var iAttrVal = attributes[iAttr];
						// poor IE/Edge can't perform decimal step validation properly, so we need to change step to any and give up the neat step effect
						if (
							(CIQ.isIE || CIQ.isEdge) &&
							iAttr == "step" &&
							Math.floor(iAttrVal) != iAttrVal
						)
							iAttrVal = "any";
						if (iAttr !== "hidden") formField.setAttribute(iAttr, iAttrVal);
					}
				} else if (
					input.type == "text" ||
					input.type == "date" ||
					input.type == "time"
				) {
					formField = document.createElement("input");
					formField.setAttribute("type", CIQ.UI.supportedInputType(input.type));
					if (input.type == "date")
						formField.value = this.formatDateInput(input.value);
					else if (input.type == "time")
						formField.value = this.formatTimeInput(input.value);
					else formField.value = input.value;
					this.setChangeEvent(formField, "inputs", input.name);
					for (iAttr in attributes)
						if (iAttr !== "hidden")
							formField.setAttribute(iAttr, attributes[iAttr]);
				} else if (input.type == "select") {
					formField = this.makeMenu(
						input.name,
						input.value,
						input.options,
						"inputs"
					);
					if (attributes && attributes.readonly)
						formField.setAttribute("readonly", attributes.readonly);
				} else if (input.type == "checkbox") {
					formField = document.createElement("input");
					formField.setAttribute("type", "checkbox");
					if (input.value) formField.checked = true;
					this.setChangeEvent(formField, "inputs", input.name);
					for (iAttr in attributes)
						if (iAttr !== "hidden")
							formField.setAttribute(iAttr, attributes[iAttr]);
				}
				if (attributes && attributes.hidden) newInput.hide();
				if (formField) newInput.find(".stx-data").append(formField);

				newInput[0].originalOuterHTML = newInput[0].outerHTML;
				var oldInput = inputs.find("[fieldname='" + input.name + "']");
				if (!oldInput.length) {
					inputs.append(newInput);
				} else if (
					oldInput[0].originalOuterHTML !== newInput[0].originalOuterHTML
				) {
					oldInput[0].replaceWith(newInput[0]);
				}
			}
		}

		refreshOutputs(empty) {
			var outputs = this.node.find("cq-study-outputs");
			if (empty) outputs.empty();
			for (var i = 0; i < this.helper.outputs.length; i++) {
				var output = this.helper.outputs[i];
				var newOutput = CIQ.UI.makeFromTemplate(this.outputTemplate);
				newOutput[0].initialize({
					studyDialog: this,
					output: output.name
				});
				newOutput.find(".ciq-heading").text(output.heading);
				newOutput[0].setAttribute("fieldname", output.name);

				var swatch = newOutput.find("cq-swatch");
				var color = output.color;
				if (typeof color === "object") {
					color = color.color;
				}
				newOutput[0].originalOuterHTML = newOutput[0].outerHTML;
				var oldOutput = outputs.find("[fieldname='" + output.name + "']");
				if (!oldOutput.length) {
					outputs.append(newOutput);
				} else if (
					oldOutput[0].originalOuterHTML !== newOutput[0].originalOuterHTML
				) {
					oldOutput[0].replaceWith(newOutput[0]);
				}
				swatch[0].setColor(color, false); // don't percolate
			}
		}

		refreshParameters(params, empty) {
			var parameters = this.node.find("cq-study-parameters");
			if (empty) parameters.empty();
			for (var i = 0; i < this.helper.parameters.length; i++) {
				var parameter = this.helper.parameters[i];
				var newParam = CIQ.UI.makeFromTemplate(this.parameterTemplate);
				this.menuTemplate = newParam.find("template[cq-menu]");
				if (!this.menuTemplate.length && parameter.options) {
					newParam.remove();
					continue;
				}
				newParam.find(".ciq-heading").text(parameter.heading);
				newParam[0].setAttribute("fieldname", parameter.name);
				var swatch = newParam.find("cq-swatch");
				var paramInput = document.createElement("input");
				var pAttr;
				var setSwatch = false;
				var attributes = {};
				if (parameter.defaultValue.constructor == Boolean) {
					paramInput.setAttribute("type", "checkbox");
					if (parameter.value) paramInput.checked = true;
					this.setChangeEvent(
						paramInput,
						"parameters",
						parameter.name + "Enabled"
					);
					swatch.remove();

					attributes = this.helper.attributes[parameter.name + "Enabled"];
					for (pAttr in attributes)
						if (pAttr !== "hidden")
							paramInput.setAttribute(pAttr, attributes[pAttr]);
				} else if (parameter.defaultValue.constructor == String) {
					var paramName = parameter.name;
					if (parameter.defaultColor) {
						newParam[0].initialize({
							studyDialog: this,
							parameter: parameter.name + "Color",
							params: params
						});
						setSwatch = true;
						paramName = paramName + "Value";
					} else {
						swatch.remove();
					}
					if (parameter.options) {
						paramInput = this.makeMenu(
							paramName,
							parameter.value,
							parameter.options,
							"parameters"
						);
					} else {
						paramInput.value = parameter.value;
					}
					attributes = this.helper.attributes[paramName];
					for (pAttr in attributes)
						if (pAttr !== "hidden")
							paramInput.setAttribute(pAttr, attributes[pAttr]);
				} else if (parameter.defaultValue.constructor == Number) {
					paramInput.setAttribute("type", "number");
					paramInput.value = parameter.value;
					this.setChangeEvent(
						paramInput,
						"parameters",
						parameter.name + "Value"
					);
					newParam[0].initialize({
						studyDialog: this,
						parameter: parameter.name + "Color",
						params: params
					});
					setSwatch = true;

					attributes = this.helper.attributes[parameter.name + "Value"];
					for (pAttr in attributes) {
						var pAttrVal = attributes[pAttr];
						// poor IE/Edge can't perform decimal step validation properly, so we need to change step to any and give up the neat step effect
						if (
							(CIQ.isIE || CIQ.isEdge) &&
							pAttr == "step" &&
							Math.floor(pAttrVal) != pAttrVal
						)
							pAttrVal = "any";
						if (pAttr !== "hidden") paramInput.setAttribute(pAttr, pAttrVal);
					}
				} else continue;

				if (attributes && attributes.hidden) newParam.not("hr").hide();
				newParam.find(".stx-data").append(paramInput);

				newParam[0].originalOuterHTML = newParam[0].outerHTML;
				var oldParam = parameters.find("[fieldname='" + parameter.name + "']");
				if (!oldParam.length) {
					parameters.append(newParam);
				} else if (
					oldParam[0].originalOuterHTML !== newParam[0].originalOuterHTML
				) {
					oldParam[0].replaceWith(newParam[0]);
				}
				if (setSwatch) swatch[0].setColor(parameter.color, false); // don't percolate
			}
		}

		/**
		 * Sets up a handler to process changes to input fields
		 * @param {HTMLElement} node    The input field
		 * @param {string} section The section that is being updated, "inputs","outputs","parameters"
		 * @param {string} name    The name of the field being updated
		 * @memberof! WebComponents.cq-study-dialog
		 * @private
		 */
		setChangeEvent(node, section, name) {
			var self = this;
			function closure() {
				return function () {
					var updates = {};
					updates[section] = {};
					updates[section][name] = this.value;
					if (this.type == "checkbox" || this.type == "radio") {
						updates[section][name] = this.checked;
					}
					self.updateStudy(updates);
				};
			}
			node.addEventListener("change", closure());
		}

		setContext(context) {
			this.context = context;
			context.advertiseAs(this, "StudyDialog");
		}

		/**
		 * Accepts new menu (select box) selections
		 * @param {object} activator
		 * @param {string} section within the dialog ("inputs", "outputs", "parameters")
		 * @memberof! WebComponents.cq-study-dialog
		 * @since 5.2.0 Added `section` parameter.
		 */
		setSelectOption(activator, section) {
			var node = CIQ.UI.$(activator.node);
			var name = node.attr("name");
			var value = node.attr("value");
			var newInput = node[0].cqMenuWrapper;
			newInput.fieldValue = value;
			var inputValue = newInput.querySelector("cq-selected");
			if (!section) section = "inputs";
			if (inputValue) {
				var translatedValue = this.helper.stx.translateIf(value);
				for (var i of this.helper[section]) {
					if (i.name === name && i.options[value]) {
						translatedValue = i.options[value];
						break;
					}
				}
				inputValue.innerText = translatedValue;
			}
			var updates = {};
			updates[section] = {};
			updates[section][name] = value;
			// Close the option menu here when selected via keyboard because keyboard navigation
			// doesn't provide the necessary mouse event to close it automatically.
			this.closeActiveMenu(node[0]);
			this.updateStudy(updates);
		}

		updateStudy(updates) {
			if (this.node.find(":invalid").length) return;
			if (this.addWhenDone) {
				CIQ.extend(this.queuedUpdates, updates);
				return;
			}
			if (this.helper.libraryEntry.deferUpdate) {
				CIQ.extend(this.queuedUpdates, { inputs: updates.inputs });
				this.helper.updateStudy({
					outputs: updates.outputs,
					parameters: updates.parameters
				});
			} else {
				this.helper.updateStudy(updates);
			}
		}

		/**
		 * Selects template elements and attaches them as class properties only once
		 * @memberof! WebComponents.cq-study-dialog
		 */
		selectTemplates() {
			if (this.inputTemplate) return;
			this.inputTemplate = this.querySelector("template[cq-study-input]");
			this.outputTemplate = this.querySelector("template[cq-study-output]");
			this.parameterTemplate = this.querySelector(
				"template[cq-study-parameters]"
			);
		}
	}

	StudyDialog.markup = `
		<h4 class="title">Study here</h4>
		<cq-scroll cq-no-maximize>
			<cq-study-inputs>
				<template cq-study-input>
					<cq-study-input>
						<div class="ciq-heading"></div>
						<div class="stx-data">
							<template cq-menu>
								<cq-menu class="ciq-select">
									<cq-selected></cq-selected>
									<cq-menu-dropdown cq-lift></cq-menu-dropdown>
								</cq-menu>
							</template>
						</div>
					</cq-study-input>
					<hr>
				</template>
			</cq-study-inputs>
			<cq-study-outputs>
				<template cq-study-output>
					<cq-study-output>
						<div class="ciq-heading"></div>
						<cq-swatch cq-overrides="auto"></cq-swatch>
					</cq-study-output>
					<hr>
				</template>
			</cq-study-outputs>
			<cq-study-parameters>
				<template cq-study-parameters>
					<cq-study-parameter>
						<div class="ciq-heading"></div>
						<div class="stx-data"><cq-swatch cq-overrides="auto"></cq-swatch>
							<template cq-menu>
								<cq-menu class="ciq-select">
									<cq-selected></cq-selected>
									<cq-menu-dropdown cq-lift></cq-menu-dropdown>
								</cq-menu>
							</template>
						</div>
					</cq-study-parameter>
					<hr>
				</template>
			</cq-study-parameters>
		</cq-scroll>
		<div class="ciq-dialog-cntrls">
			<div class="ciq-btn" stxtap="close()">Done</div>
		</div>
	`;
	CIQ.UI.addComponentDefinition("cq-study-dialog", StudyDialog);
}
