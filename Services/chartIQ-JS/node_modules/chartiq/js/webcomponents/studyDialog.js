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
import "../../js/webcomponents/dialog.js";
import "../../js/webcomponents/menu.js";
import "../../js/webcomponents/scroll.js";
import "../../js/webcomponents/studyInput.js";
import "../../js/webcomponents/studyOutput.js";
import "../../js/webcomponents/studyParameter.js";
import "../../js/webcomponents/swatch.js";
import "../../js/webcomponents/scroll/menuDropdown.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */










const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"studyDialog component requires first activating studies feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-study-dialog&gt;</h4>
	 *
	 * Creates and manages study dialogs based on the corresponding study library entry (title,
	 * inputs, outputs, parameters, etc.).
	 *
	 * Requires {@link CIQ.UI.StudyEdit}.
	 *
	 * _**Attributes**_
	 *
	 * The following attributes are supported (but not observed for changes):
	 * | attribute      | description |
	 * | :------------- | :---------- |
	 * | cq-study-axis  | Displays UI for selecting the y-axis position (left, right, etc.), color and for inverting the y-axis *if not shared with the primary-axis*. |
	 * | cq-study-panel | Displays UI for selecting the panel for the study (own, shared, etc.) and whether it is rendered as an underlay (under the primary chart) or an overlay (over the primary chart). Set this attribute to "alias" to have the panel names listed as "<Panel 1>", "<Panel 2>", etc.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when it updates a study.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "update" |
	 * | action | "change" |
	 * | updates | _updated settings_ |
	 *
	 * `cause` and `action` are set only when the dialog is updated as a direct result of changing a form field.
	 *
	 * @example
	 * <caption> Here is an example of how to create a study dialog. We add the
	 * <code>cq-study-axis</code> and <code>cq-study-panel</code> attributes to enable form fields
	 * used to control axis position, color, study panel, and underlay/overlay.
	 * </caption>
	 * <cq-dialog>
	 *      <cq-study-dialog cq-study-axis cq-study-panel></cq-study-dialog>
	 * </cq-dialog>
	 *
	 * @alias WebComponents.StudyDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 * - 5.2.0 Optional Attributes `cq-study-axis` and `cq-study-panel` are now available.
	 * - 6.3.0 `cq-study-axis` now also provides a check box allowing users to invert study y-axis
	 * 		if not shared with the primary-axis.
	 * - 9.1.0 Added emitter.
	 */
	class StudyDialog extends CIQ.UI.DialogContentTag {
		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();
			this.queuedUpdates = {};
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, StudyDialog);
			this.constructor = StudyDialog;
		}

		disconnectedCallback() {
			if (this.doNotDisconnect) return;
			CIQ.UI.unobserveProperty("signal", this.helper);
			super.disconnectedCallback();
		}

		/**
		 * Closes the study dialog.  This will also update the study with any changes made in the dialog.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		close() {
			if (this.addWhenDone) {
				const helper = this.helper;
				const sd = CIQ.Studies.addStudy(helper.stx, helper.name);
				if (!CIQ.isEmpty(this.queuedUpdates)) {
					helper.sd = sd;
					helper.updateStudy(this.queuedUpdates);
					this.queuedUpdates = {};
				}
				delete this.addWhenDone;
			}
		}

		/**
		 * Closes the menu that may be open on the study dialog.
		 *
		 * @param {HTMLElement} node The open menu node.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
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

		/**
		 * Forces a date string into yyyy-mm-dd format.
		 *
		 * @param {string} date Date in an "almost" yyyy-mm-dd format.  Meaning, it may have dashes or slashes, or no separators, but the date components must be in the proper order.
		 * @return {String} Date in yyyy-mm-dd format.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
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

		/**
		 * Forces a time string into HH:nn or HH:nn:ss format.  Seconds appear in the return value only if they were present in the input parameter.
		 *
		 * @param {string} time Time in an "almost" correct format.  Meaning, it may have colons or not, but the time components must be in the proper order.
		 * @return {String} Time in HH:nn or HH:nn:ss format.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
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

		/**
		 * Hides the dialog.  This performs UI cleanup of the lifted menus.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		hide() {
			if (!CIQ.isEmpty(this.queuedUpdates)) {
				this.helper.updateStudy(this.queuedUpdates);
				this.queuedUpdates = {};
			}
			[...this.querySelectorAll("cq-menu")].forEach((el) => {
				if (el.unlift) el.unlift();
			});
			[...this.querySelectorAll("cq-swatch")].forEach((el) => {
				if (el.colorPicker) el.colorPicker.close();
			});
		}

		/**
		 * Creates and returns a form menu (droopdown select box) using the inputs provided.
		 *
		 * @param {string} name Menu name, ultimately used as a key for updates.
		 * @param {string} currentValue The current selection value.  This is what is displayed even when menu is closed.
		 * @param {Object} fields Options for the menu.  These are key-value pairs representing the selection value as the key and the text as the value.
		 * @param {string} section Where the menu will be placed.  Possible values are "inputs" and "parameters".
		 * @return {WebComponents.Menu} a menu webcomponent.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		makeMenu(name, currentValue, fields, section) {
			const menu = document.createElement("cq-menu");
			menu.className = "ciq-select";
			menu.setAttribute(
				"id",
				"cq-study-dialog-" + section + "-" + name.replace(/ /g, "_")
			);
			const menuContent = [];
			for (const field in fields) {
				const item = {};
				item.type = "item";
				item.label = fields[field];
				item.tap = "StudyDialog.setSelectOption"; // must call StudyDialog because the item is "lifted" and so doesn't know its parent
				item.value = [section, name, field];
				menuContent.push(item);
			}
			const translatedValue =
				fields[currentValue] || this.helper.stx.translateIf(currentValue);
			if (menu && menu.setContent) menu.setContent(menuContent, true);
			menu.setAttribute("text", translatedValue);
			menu.setAttribute("reader", translatedValue);

			return menu;
		}

		/**
		 * Opens the study dialog, showing the proper fields based on the parameters provided.
		 *
		 * @param {Object} params
		 * @param {string} [params.axisSelect] If this key is present, axis selection options appear in the Parameters section of the dialog.
		 * @param {string} [params.panelSelect] If this key is present, panel selection options appear in the Parameters section of the dialog.
		 * @param {string} [params.addWhenDone] If set, and adding a new study, then study will only be added if "Done" key is pressed.
		 * @param {HTMLElement} [params.caller] The HTML element that triggered this dialog to open
		 * @param {CIQ.UI.Context} [params.context] A context to set. See
		 * 		[setContext]{@link CIQ.UI.DialogContentTag#setContext}.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		open(params) {
			this.addDefaultMarkup();
			this.selectTemplates();

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
			CIQ.UI.unobserveProperty("signal", this.helper);
			this.helper = new CIQ.Studies.DialogHelper(params);

			const dialog = this.closest("cq-dialog");
			dialog.setTitle(this.helper.title);

			super.open(params);

			CIQ.UI.observeProperty("signal", this.helper, (obj) => {
				this.refreshInputs();
				this.refreshOutputs();
				this.refreshParameters(params);
			});

			// Create form elements for all of the inputs
			this.refreshInputs(true);

			// Create form elements for all of the outputs
			this.refreshOutputs(true);

			// Create form elements for all of the parameters
			this.refreshParameters(params, true);
		}

		/**
		 * Creates/recreates the fields in the "inputs" section of the dialog.
		 *
		 * @param {boolean} [empty] If true, clears all inputs fields first.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		refreshInputs(empty) {
			const inputs = this.querySelector("cq-study-inputs");
			if (empty) [...inputs.children].forEach((child) => child.remove());
			for (let i = 0; i < this.helper.inputs.length; i++) {
				const input = this.helper.inputs[i];
				const inputContainer = document.createElement("div");
				CIQ.UI.makeFromTemplate(this.inputTemplate, inputContainer);
				const newInput = inputContainer.querySelector("cq-study-input");
				this.menuTemplate = newInput.querySelector("template[cq-menu]");
				const id = "cq-study-dialog-inputs-" + input.name.replace(/ /g, "_");
				const heading = newInput.querySelector(".ciq-heading");
				if (heading) {
					heading.innerText = input.heading;
					const label = newInput.querySelector("label");
					if (label) label.setAttribute("for", id);
				}
				newInput.setAttribute("fieldname", input.name);
				let formField = null;

				let iAttr;
				const attributes = this.helper.attributes[input.name];
				if (input.type == "number") {
					formField = document.createElement("input");
					formField.setAttribute("type", "number");
					formField.setAttribute("id", id);
					formField.value = input.value;
					this.setChangeEvent(formField, "inputs", input.name);
					for (iAttr in attributes) {
						let iAttrVal = attributes[iAttr];
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
					formField.setAttribute("id", id);
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
					formField.setAttribute("id", id);
					if (input.value) formField.checked = true;
					this.setChangeEvent(formField, "inputs", input.name);
					for (iAttr in attributes)
						if (iAttr !== "hidden")
							formField.setAttribute(iAttr, attributes[iAttr]);
				}
				if (attributes && attributes.hidden)
					[...inputContainer.children].forEach((el) => (el.hidden = true));
				if (formField) newInput.querySelector(".stx-data").append(formField);

				newInput.originalOuterHTML = newInput.outerHTML;
				const oldInput = inputs.querySelector(
					"[fieldname='" + input.name + "']"
				);
				if (!oldInput) {
					inputs.append(...inputContainer.children);
				} else if (oldInput.originalOuterHTML !== newInput.originalOuterHTML) {
					oldInput.replaceWith(newInput);
				}
			}
		}

		/**
		 * Creates/recreates the fields in the "outputs" section of the dialog.
		 *
		 * @param {boolean} [empty] If true, clears all outputs fields first.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		refreshOutputs(empty) {
			const outputs = this.querySelector("cq-study-outputs");
			if (empty) [...outputs.children].forEach((child) => child.remove());
			for (let i = 0; i < this.helper.outputs.length; i++) {
				const output = this.helper.outputs[i];
				const outputContainer = document.createElement("div");
				CIQ.UI.makeFromTemplate(this.outputTemplate, outputContainer);
				const newOutput = outputContainer.querySelector("cq-study-output");
				newOutput.initialize({
					studyDialog: this,
					output: output.name
				});
				const id = "cq-study-dialog-outputs-" + output.name.replace(/ /g, "_");
				const heading = newOutput.querySelector(".ciq-heading");
				if (heading) {
					heading.innerText = output.heading;
					const label = newOutput.querySelector("label");
					if (label) label.setAttribute("for", id);
				}
				newOutput.setAttribute("fieldname", output.name);

				newOutput.originalOuterHTML = newOutput.outerHTML;
				const oldOutput = outputs.querySelector(
					"[fieldname='" + output.name + "']"
				);
				if (!oldOutput) {
					outputs.append(...outputContainer.children);
				} else if (
					oldOutput.originalOuterHTML !== newOutput.originalOuterHTML
				) {
					oldOutput.replaceWith(newOutput);
				}
				const swatch = newOutput.querySelector("cq-swatch");
				if (swatch) {
					swatch.setAttribute("id", id);
					let color = output.color;
					if (typeof color === "object") {
						color = color.color;
					}
					swatch.setColor(color, false, output.isAuto); // don't percolate
				}

				const menu = newOutput.querySelector("cq-menu");
				const { pattern = "solid", width = 1 } = output.color || {};

				menu.icon = `ciq-${pattern}-${width}`;
			}
		}

		/**
		 * Creates/recreates the fields in the "parameters" section of the dialog.
		 *
		 * @param {Object} params
		 * @param {string} [params.axisSelect] If this key is present, axis selection options appear in the Parameters section of the dialog.
		 * @param {string} [params.panelSelect] If this key is present, panel selection options appear in the Parameters section of the dialog.
		 * @param {string} [params.addWhenDone] If set, and adding a new study, then study will only be added if "Done" key is pressed.
		 * @param {boolean} [empty] If true, clears all parameters fields first.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		refreshParameters(params, empty) {
			const parameters = this.querySelector("cq-study-parameters");
			if (empty) [...parameters.children].forEach((child) => child.remove());
			for (let i = 0; i < this.helper.parameters.length; i++) {
				const parameter = this.helper.parameters[i];
				const paramContainer = document.createElement("div");
				CIQ.UI.makeFromTemplate(this.parameterTemplate, paramContainer);
				const newParam = paramContainer.querySelector("cq-study-parameter");
				this.menuTemplate = newParam.querySelector("template[cq-menu]");
				if (!this.menuTemplate && parameter.options) continue;

				const id =
					"cq-study-dialog-parameters-" + parameter.name.replace(/ /g, "_");
				const heading = newParam.querySelector(".ciq-heading");
				if (heading) {
					heading.innerText = parameter.heading;
					const label = newParam.querySelector("label");
					if (label) label.setAttribute("for", id);
				}
				newParam.setAttribute("fieldname", parameter.name);
				const swatch = newParam.querySelector("cq-swatch");
				let paramInput = document.createElement("input");
				let pAttr;
				let setSwatch = false;
				let attributes = {};
				if (parameter.defaultValue.constructor == Boolean) {
					paramInput.setAttribute("type", "checkbox");
					paramInput.setAttribute("id", id);
					if (parameter.value) paramInput.checked = true;
					this.setChangeEvent(
						paramInput,
						"parameters",
						parameter.name + "Enabled"
					);
					if (swatch) swatch.remove();

					attributes = this.helper.attributes[parameter.name + "Enabled"];
					for (pAttr in attributes)
						if (pAttr !== "hidden")
							paramInput.setAttribute(pAttr, attributes[pAttr]);
				} else if (parameter.defaultValue.constructor == String) {
					let paramName = parameter.name;
					paramInput.setAttribute("id", id);
					if (parameter.defaultColor) {
						newParam.initialize({
							studyDialog: this,
							parameter: parameter.name + "Color",
							params
						});
						setSwatch = true;
						paramName = paramName + "Value";
					} else {
						if (swatch) swatch.remove();
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
					paramInput.setAttribute("id", id);
					paramInput.value = parameter.value;
					this.setChangeEvent(
						paramInput,
						"parameters",
						parameter.name + "Value"
					);
					newParam.initialize({
						studyDialog: this,
						parameter: parameter.name + "Color",
						params
					});
					setSwatch = true;

					attributes = this.helper.attributes[parameter.name + "Value"];
					for (pAttr in attributes) {
						let pAttrVal = attributes[pAttr];
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

				if (attributes && attributes.hidden)
					[...paramContainer.children].forEach((el) => (el.hidden = true));
				if (paramInput) newParam.querySelector(".stx-data").append(paramInput);

				newParam.originalOuterHTML = newParam.outerHTML;
				const oldParam = parameters.querySelector(
					"[fieldname='" + parameter.name + "']"
				);
				if (!oldParam) {
					parameters.append(...paramContainer.children);
				} else if (oldParam.originalOuterHTML !== newParam.originalOuterHTML) {
					oldParam.replaceWith(newParam);
				}
				if (setSwatch)
					swatch.setColor(parameter.color, false, parameter.isAuto); // don't percolate
			}
		}
		/**
		 * Sets up a handler to process changes to input fields
		 *
		 * @param {HTMLElement} node    The input field
		 * @param {string} section The section that is being updated, "inputs","outputs","parameters"
		 * @param {string} name    The name of the field being updated
		 * @private
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		setChangeEvent(node, section, name) {
			const changeCallback = (e) => {
				const { target } = e;
				const updates = {
					[section]: {
						[name]: ["checkbox", "radio"].includes(target.type)
							? target.checked
							: target.value
					}
				};
				this.updateStudy(updates, true);
			};
			node.addEventListener("change", changeCallback.bind(this));
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		setContext(context) {
			this.context = context;
			context.advertiseAs(this, "StudyDialog");
		}

		/**
		 * Accepts new menu (select box) selections.
		 *
		 * @param {object} activator The object representing the dropdown selection
		 * @param {HTMLElement} activator.node The node of the dropdown
		 * @param {string} section Section within the dialog ("inputs", "outputs", "parameters")
		 * @param {string} name Text of selection
		 * @param {string} value Value of selection
		 *
		 * @tsmember WebComponents.StudyDialog
		 *
		 * @since 5.2.0 Added `section` parameter.
		 * @since 9.1.0 Added `name` and `value` parameters.
		 */
		setSelectOption(activator, section, name, value) {
			const { node } = activator;
			name = name || node.getAttribute("name");
			value = value || node.getAttribute("value");
			const updates = {
				[section]: {
					[name]: value
				}
			};
			// Close the option menu here when selected via keyboard because keyboard navigation
			// doesn't provide the necessary mouse event to close it automatically.
			this.closeActiveMenu(node);
			this.updateStudy(updates, true);
		}

		/**
		 * Performs the updates on the study itself.
		 *
		 * @param {Object} updates Changes made in the dialog form elements from the defaults, that will be saved in the study.
		 * @param {Object} [updates.inputs] Changes made in the inputs section.
		 * @param {Object} [updates.outputs] Changes made in the outputs section.
		 * @param {Object} [updates.parameters] Changes made in the parameters section.
		 * @param {boolean} [wasChange=false] True if updating due to change in a field, False if performing a batch update.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		updateStudy(updates, wasChange = false) {
			if (this.querySelector(":invalid")) return;
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
			this.emitCustomEvent({
				action: wasChange ? "change" : null,
				effect: "update",
				detail: { updates }
			});
		}

		/**
		 * Selects template elements and attaches them as class properties only once
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		selectTemplates() {
			if (this.inputTemplate) return;
			this.inputTemplate = this.querySelector("template[cq-study-input]");
			this.outputTemplate = this.querySelector("template[cq-study-output]");
			this.parameterTemplate = this.querySelector(
				"template[cq-study-parameters]"
			);
		}

		/**
		 * Updates the line style, width, and color for the study output.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node The corresponding line style dropdown.
		 * @param {number} width The selected line width.
		 * @param {string} pattern The selected line pattern.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		setLine(activator, width, pattern) {
			const menu = CIQ.climbUpDomTree(activator.node, "cq-dropdown")[0]
				.owningMenu;
			const studyOutput = CIQ.climbUpDomTree(menu, "cq-study-output")[0];
			const { color } = studyOutput.querySelector("cq-swatch");
			menu.icon = `ciq-${pattern}-${width}`;
			this.updateStudy({
				outputs: { [studyOutput.params.output]: { width, pattern, color } }
			});
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.StudyDialog
	 */
	StudyDialog.markup = `
		<cq-scroll cq-no-maximize>
			<cq-study-inputs>
				<template cq-study-input>
					<cq-study-input>
						<label>
							<span class="ciq-heading"></span>
							<div class="stx-data">
								<template cq-menu>
									<cq-menu class="ciq-select"></cq-menu>
								</template>
							</div>
						</label>
					</cq-study-input>
					<hr>
				</template>
			</cq-study-inputs>
			<cq-study-outputs>
				<template cq-study-output>
					<cq-study-output>
						<label>
							<span class="ciq-heading"></span>
							<div class="stx-data">
								<cq-menu lift-dropdown class="ciq-select ciq-line-style" reader="Line Style" config="studyLinestyle" icon="ciq-solid-1" tooltip="Line Style"></cq-menu>
								<cq-swatch overrides="auto"></cq-swatch>
							</div>
						</label>
					</cq-study-output>
					<hr>
				</template>
			</cq-study-outputs>
			<cq-study-parameters>
				<template cq-study-parameters>
					<cq-study-parameter>
						<label>
							<span class="ciq-heading"></span>
							<div class="stx-data"><cq-swatch overrides="auto"></cq-swatch>
								<template cq-menu>
									<cq-menu class="ciq-select"></cq-menu>
								</template>
							</div>
						</label>
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

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-study-output&gt;</h4>
 *
 * Set the color of study outputs in the {@link WebComponents.StudyDialog}.
 *
 * @alias WebComponents.StudyOutput
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 */
class StudyOutput extends CIQ.UI.BaseComponent {
	constructor() {
		super();
		this.type = this.tagName.split("-").pop().toLowerCase();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, StudyOutput);
	}

	initialize(params) {
		this.params = params;
	}

	/**
	 * Sets the color swatch to the selected color.
	 * The `color` argument must be only string-type for StudyParameter component.
	 *
	 * @param {object|string} color Color value or object containing color key and value.
	 *
	 * @tsmember WebComponents.StudyOutput
	 */
	setColor(color) {
		if (!this.params) return;
		const key = `${this.type}s`;
		const updates = { [key]: {} };
		updates[key][this.params[this.type]] =
			this.type === "output" ? { color } : color;
		this.params.studyDialog.updateStudy(updates, true);
	}
}
CIQ.UI.addComponentDefinition("cq-study-output", StudyOutput);

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-study-parameter&gt;</h4>
 *
 * Set the color of study parameters in the {@link WebComponents.StudyDialog}.
 *
 * @alias WebComponents.StudyParameter
 * @extends WebComponents.StudyOutput
 * @class
 * @protected
 */
class StudyParameter extends StudyOutput {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, StudyParameter);
	}
}
CIQ.UI.addComponentDefinition("cq-study-parameter", StudyParameter);
