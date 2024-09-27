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


import { CIQ } from "../../js/chartiq.js";
import "./signaliq.js";

const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(/* webpackMode: "eager" */ "./signaliqDialog.css").then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["./signaliqDialog.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.SignalIQ.stylesheets.push({
			url: new URL("./signaliqDialog.css", import.meta.url).href,
			callback: resolve
		});
	}
}).then((m) => CIQ.addInternalStylesheet(m, "signaliqDialog")); // a framework, such as Angular, may require style addition

if (CIQ.UI) {
	CIQ.UI.StudyEdit.prototype.editPanel = function (params, editStudy) {
		const { stx, config } = this.context;
		params.context = this.context;
		// Make sure we don't open the dialog in the context menu position
		params.x = null;
		params.y = null;

		const { channelWrite } = CIQ.UI.BaseComponent.prototype;

		const name = !editStudy && params.sd.signalData ? "signaliq" : "study";

		if (config) {
			const channel = (config.channels || {}).dialog || "channel.dialog";
			channelWrite(channel, { type: name, params }, stx);
		} else {
			stx.container.ownerDocument
				.querySelector("cq-" + name + "-dialog")
				.open(params);
		}
	};

	/**
	 * SignalIQ Dialog web component `<cq-signaliq-dialog>`.
	 *
	 * Displays a dialog so signal studies can be entered into the system through the UI.
	 *
	 * **Requires [SignalIQ]{@link CIQ.SignalIQ} plugin.**
	 *
	 * @namespace WebComponents.cq-signaliq-dialog
	 * @since 8.6.0
	 *
	 * @example
	 * <h4 class="title">New Signal</h4>
	 * <cq-close></cq-close>
	 * <div cq-study-edit-dialog-div>
	 * 	<form id="study-signal" class="study-signal">
	 * 		<h2 cq-add-only>Choose a Study:</h2>
	 * 		<div class="study-select-container"></div>
	 * 		<div cq-tooltip-activator class="ciq-edit-study" stxtap="editStudy()">
	 * 			&nbsp;
	 * 			<cq-tooltip>Edit Study</cq-tooltip>
	 * 		</div>
	 * 		<h2>Define Conditions:</h2>
	 * 		<div class="cq-study-signal-conditions"></div>
	 * 		<hr/>
	 * 		<div class="notification-type-container"></div>
	 * 		<div class="ciq-marker-container">
	 * 			<h2>Choose an appearance:</h2>
	 * 			<div class="ciq-marker-settings">
	 * 				<div class="ciq-marker-preview">
	 * 					<div class="stx-marker signal">
	 * 						<div class="stx-visual"></div>
	 * 						<div class="stx-marker-content"></div>
	 * 					</div>
	 * 				</div>
	 * 				<div class="ciq-signal-options"></div>
	 * 			</div>
	 * 		</div>
	 * 		<h2>Description</h2>
	 * 		<textarea name="signal-description" type="text" placeholder="Description will appear in an infobox when the signal is clicked."></textarea>
	 * 		<hr/>
	 * 		<div class="clearfix"></div>
	 * 		<div class="ciq-misc-settings">
	 * 			<input name="signal-name" type="text" value="" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" placeholder="Enter a Name" />
	 * 			<div class="ciq-btn ciq-btn-save" stxtap="save()">Save</div>
	 * 			<h2 class="info-message"><h2>
	 * 		</div>
	 * 	</form>
	 * 	<template cq-study-menu>
	 * 		<cq-menu class="ciq-select">
	 * 			<cq-selected></cq-selected>
	 * 			<cq-menu-dropdown cq-lift>
	 * 				<cq-study-filter cq-filter-min="15"></cq-study-filter>
	 * 				<cq-study-items></cq-study-items>
	 * 			</cq-menu-dropdown>
	 * 		</cq-menu>
	 * 	</template>
	 * 	<template cq-menu>
	 * 		<cq-menu class="ciq-select">
	 * 			<cq-selected></cq-selected>
	 * 			<cq-menu-dropdown cq-lift></cq-menu-dropdown>
	 * 		</cq-menu>
	 * 	</template>
	 * </div>
	 */
	class SignalIQDialog extends CIQ.UI.DialogContentTag {
		constructor() {
			super();
			this.activeStudy = null;
			this.editMode = false;
			this.pickers = new Set();
		}

		connectedCallback() {
			if (this.attached) return;
			super.connectedCallback();
			CIQ.UI.addResizeListener(this, () => {
				this.pickers.forEach((picker) => this.config[picker].clean());
			});
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, SignalIQDialog);
		}

		disconnectedCallback() {
			CIQ.UI.removeResizeListener(this);
			super.disconnectedCallback();
		}

		/**
		 * Push a new empty array to the `signalParams.conditions` and re-render the
		 * condition options UI.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias addCondition
		 * @since 8.6.0
		 */
		addCondition() {
			this.signalParams.conditions.push([]);
			this.renderConditionOptions();
			if (this.dialog.keyboardNavigation.tabActiveElement) {
				// At this point the add button has been removed and tab navigation placement is lost.
				// Keyboard focus the first element of the new condition. This is ignored if keyboard navigation isn't used.
				const menuItems = this.querySelectorAll(
					".cq-study-signal-conditions .cq-study-signal-condition .ciq-condition-line"
				);
				const newConditionMenu = menuItems[menuItems.length - 1];
				if (newConditionMenu) this.dialog.focusItem(newConditionMenu);
			}
		}

		/**
		 * Callback function for the study select menu. Adds the selected
		 * study to the chart.
		 *
		 * @param {object|null} obj Object containing event or null
		 * @param {string} name Name of the study to add.
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias addStudy
		 * @since 8.6.0
		 */
		addStudy(obj, name) {
			this.removeActiveStudy();
			this.activeStudy = CIQ.Studies.addStudy(this.stx, name);
			this.renderConditionOptions();
			if (this.studyMenu) {
				const inputValue = this.studyMenu.querySelector("cq-selected");
				CIQ.makeTranslatableElement(
					inputValue,
					this.stx,
					this.activeStudy.name
				);
				// Manually close the menu after a keyboard selection
				if (this.studyMenu.getAttribute("cq-keyboard-active") === "true") {
					this.studyMenu.close();
					this.dialog.focusItem(this.studyMenu);
				}
			}

			if (this.activeStudy.parameters.interactiveAdd) {
				this.settingInteractive = true;
				this.context.uiManager.closeMenu();
				this.settingInteractive = false;
				this.activeStudy.parameters.interactiveAddCB = () => {
					this.open({ sd: this.activeStudy });
					delete this.activeStudy.parameters.interactiveAddCB;
					this.stx.findHighlights(null, true);
				};
			}
		}

		/**
		 * Closes any lifts or popups for the node.
		 *
		 * @param {HTMLElement} node Element to collapse.
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias collapse
		 * @since 8.6.0
		 */
		collapse(node) {
			node.querySelectorAll("cq-menu").forEach((el) => {
				el.close();
			});
			node.querySelectorAll("cq-swatch").forEach((el) => {
				if (el.colorPicker) el.colorPicker.close();
			});
		}

		/**
		 * Invoke the Study Edit dialog for the currently active study
		 *
		 * @param {Object} activator
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias editStudy
		 * @since 8.6.0
		 */
		editStudy(activator) {
			if (!this.activeStudy) return;
			activator.e.stopPropagation();
			this.collapse(this);
			var studyEdit = this.context.getAdvertised("StudyEdit");
			var params = {
				stx: this.stx,
				sd: this.activeStudy,
				inputs: this.activeStudy.inputs,
				outputs: this.activeStudy.outputs,
				parameters: this.activeStudy.parameters,
				axisSelect: false,
				panelSelect: false,
				opener: this.closest("cq-dialog")
			};
			studyEdit.editPanel(params, true);
			// Remove focused prop from the edit button to prevent double-tap after closing the edit dialog.
			this.querySelector(".ciq-btn.ciq-edit-study").removeAttribute(
				"cq-focused"
			);
		}

		/**
		 * Hides the dialog and resets local signal properties if
		 * not in the middle of an interactive add operation.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias hide
		 * @since 8.6.0
		 */
		hide() {
			this.collapse(this);
			if (this.settingInteractive) return;
			this.reset();
			if (this.stx) this.stx.removeEventListener(this.layoutListener);
		}

		/**
		 * Adds local property containing dropdown menu options.
		 * Adds form element event handlers.
		 *
		 * @param {object} params The parameter object.
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias init
		 * @since 8.6.0
		 */
		init(params) {
			this.formElements = {
				name: this.querySelector("[name=signal-name]"),
				description: this.querySelector("[name=signal-description]")
			};
			this.selectOptions = {
				type: CIQ.SignalIQ.notificationTypes.map((elem) => [
					elem.type,
					elem.name
				]),
				comparison: ["Value", "Open", "High", "Low", "Close"],
				operator: [
					[">", "Is Greater Than"],
					["<", "Is Less Than"],
					["=", "Is Equal To"],
					["x", "Crosses"],
					["x+", "Crosses Above"],
					["x-", "Crosses Below"],
					["t+", "Turns Up"],
					["t-", "Turns Down"],
					[">p", "Increases"],
					["<p", "Decreases"],
					["=p", "Does Not Change"]
				]
			};

			const { stx } = params.context || {};
			const cb = () => this.updateFormValues(true);
			const cb2 = (e) => (e.target.value = stx.emojify(e.target.value));

			Object.values(this.formElements).forEach((element) => {
				element.addEventListener("change", cb);
			});

			this.formElements.name.addEventListener("keyup", cb);
			if (stx) this.formElements.description.addEventListener("input", cb2);

			this.initialized = true;
		}

		/**
		 * Create a cq-menu form element and return it. The created element
		 * is not attached to the DOM.
		 *
		 * @param {string} name Name of the form element.
		 * @param {string} currentValue Value to select by default.
		 * @param {Array} fields A one-dimensional array of values or a two-dimensional array of name/value pairs.
		 * @param {string} cb Stringified callback function template, with $val to be replaced,
		 * 						and called when a value is selected.
		 * @param {number} index Numerical index of menu element. Used to differentiate multiple condition selections.
		 * @param {string} label Alternative label for menu when value is not selected. Default is "Select..."
		 * @return {HTMLElement} cq-menu element
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias makeMenu
		 * @since
		 * 8.6.0
		 * 8.7.0 Add index and label parameters.
		 */
		makeMenu(name, currentValue, fields, cb, index, label) {
			let currentValueLabel = "";
			if (!isNaN(currentValue) && !isNaN(parseFloat(currentValue)))
				currentValueLabel = "Value";
			const menu = CIQ.UI.makeFromTemplate(this.menuTemplate);
			menu[0].classList.add(name);
			let savedOpen = menu[0].open.bind(menu[0]);
			menu[0].open = (e) => {
				this.collapse(this);
				const { uiManager } = this.context;
				if (uiManager) {
					let studyDialog = uiManager.activeMenuStack.find((modal) =>
						modal.hasAttribute("cq-study-dialog")
					);
					if (studyDialog) studyDialog.close();
				}
				savedOpen();
			};
			menu[0].setAttribute("name", name + "-" + index);
			const cqMenu = menu.find("cq-menu-dropdown"); // scrollable in menu.
			for (let field in fields) {
				let value, label;
				if (Array.isArray(fields[field])) {
					[value, label] = fields[field];
				} else {
					value = label = fields[field];
				}
				if (!currentValueLabel && currentValue == value)
					currentValueLabel = label;
				let item = document.createElement("cq-item");
				item.innerText = label;
				item.setAttribute("stxtap", cb.replace("$val", "'" + value + "'")); // must call StudyDialog because the item is "lifted" and so doesn't know its parent
				cqMenu.append(item);
				item.cqMenuWrapper = cqMenu.parents("cq-menu")[0];
				item.setAttribute("name", name);
				item.setAttribute("value", field);
				item.context = this.context;
			}
			const inputValue = menu.find("cq-selected");
			inputValue.text(currentValueLabel || label || "Select...");
			return menu[0];
		}

		/**
		 * Create a cq-menu form element with all available studies and inject a
		 * search field in the menu header to filter options. The menu is automatically
		 * attached to a local element with class `study-select-container`.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias makeStudyMenu
		 * @since 8.6.0
		 */
		makeStudyMenu() {
			const studySelectContainer = this.querySelector(
				".study-select-container"
			);
			// Wipe the study menu block clean
			while (studySelectContainer.firstChild) {
				studySelectContainer.lastChild.remove();
			}
			if (this.editMode) {
				studySelectContainer.innerText = this.activeStudy.name;
				return;
			}
			const studyDefs = CIQ.Studies.studyLibrary;
			const menu = CIQ.UI.makeFromTemplate(this.studyMenuTemplate);
			const cqMenu = menu.find("cq-menu-dropdown"); // scrollable in menu.
			const itemContainer = cqMenu[0].querySelector("cq-study-items");
			const filterContainer = cqMenu[0].querySelector("cq-study-filter");

			const input = document.createElement("input");
			input.type = "search";
			input.placeholder = "Search";
			input.setAttribute("keyboard-selectable", "true");
			filterContainer.appendChild(input);

			let previousValue = "";

			const updateListVisibility = ({ target: { value } }) => {
				const re = new RegExp(value, "i");
				const qsa = this.qsa;

				cqMenu[0].resize();
				qsa("cq-item", itemContainer).forEach((el) => {
					const visibilityAction =
						value && !re.test(el.textContent) ? "add" : "remove";
					el.classList[visibilityAction]("item-hidden");
					if (previousValue !== value) {
						previousValue = value;
						this.removeFocused.apply(itemContainer);
						qsa(".cq-keyboard-selected-highlight").forEach((highlightEl) => {
							highlightEl.classList.add("disabled");
						});
						input.focus();
					}
				});
			};
			input.addEventListener("input", updateListVisibility);
			input.addEventListener("keyup", updateListVisibility);
			input.addEventListener("pointerdown", (e) => e.stopPropagation());

			Object.keys(studyDefs)
				.sort(function (lhs, rhs) {
					var lsd = CIQ.Studies.studyLibrary[lhs];
					var rsd = CIQ.Studies.studyLibrary[rhs];
					if (lsd.name < rsd.name) return -1;
					if (lsd.name > rsd.name) return 1;
					return 0;
				})
				.filter(
					(study) =>
						!this.stx.signalIQ.allowedStudies.length ||
						this.stx.signalIQ.allowedStudies.includes(study)
				)
				.forEach((study) => {
					let item = document.createElement("cq-item");
					item.innerText = studyDefs[study].name;
					item.setAttribute(
						"stxtap",
						"SignalIQDialog.addStudy('" + study + "')"
					); // must call StudyDialog because the item is "lifted" and so doesn't know its parent
					itemContainer.append(item);
					item.cqMenuWrapper = cqMenu.parents("cq-menu")[0];
					item.setAttribute("name", "study");
					item.setAttribute("value", study);
					item.context = this.context;
				});
			const inputValue = menu.find("cq-selected");
			if (this.activeStudy) inputValue.text(this.activeStudy.name);
			else inputValue.text("Select Study...");
			this.studyMenu = menu[0];
			if (
				itemContainer.children.length <
				(filterContainer.getAttribute("cq-filter-min") || 15)
			)
				filterContainer.remove();
			studySelectContainer.appendChild(menu[0]);
			this.translate();
		}

		/**
		 * Called when the dialog is invoked. Automatically sets up local properties
		 * for either adding or editing a study signal.
		 *
		 * @param {object} params The parameter object.
		 * @param {CIQ.Studies.StudyDescriptor} params.sd The study descriptor.
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias open
		 * @since 8.6.0
		 */
		open(params) {
			super.open(params);
			this.addDefaultMarkup();
			this.dialog = this.closest("cq-dialog");
			if (!this.initialized) this.init(params);

			this.validateSignalParams();

			this.menuTemplate = this.querySelector("template[cq-menu]");
			this.studyMenuTemplate = this.querySelector("template[cq-study-menu]");
			const titleElem = this.querySelector("h4.title");

			if (params.context) {
				this.context = params.context;
				this.stx = params.context.stx;
				this.context.advertiseAs(this, "SignalIQDialog");
				this.config = this.context.config.plugins.signalIQ || {};
				this.layoutListener = this.stx.addEventListener("layout", () => {
					if (this.activeStudy) {
						const inputValue =
							this.studyMenu && this.studyMenu.isConnected
								? this.studyMenu.querySelector("cq-selected")
								: this.querySelector(".study-select-container");
						if (inputValue)
							CIQ.makeTranslatableElement(
								inputValue,
								this.stx,
								this.activeStudy.name
							);
						this.signalParams.conditions.forEach((condition) => {
							condition[0] = condition[0].replace(
								this.signalParams.studyName,
								this.activeStudy.name
							);
							if (typeof condition[2] === "string")
								condition[2] = condition[2].replace(
									this.signalParams.studyName,
									this.activeStudy.name
								);
						});
						this.renderConditionOptions();
					}
				});
			}

			if (params.sd && params.sd.signalData) {
				// Edit an existing study signal
				this.editMode = true;
				titleElem.innerText = titleElem.innerText.replace("New", "Edit");
				CIQ.makeTranslatableElement(titleElem, this.stx, titleElem.innerText);
				this.querySelectorAll("[cq-add-only]").forEach(
					(el) => (el.hidden = true)
				);
				this.activeStudy = params.sd;
				// Populate signalParams with existing values
				this.signalParams = {
					name: params.sd.signalData.name,
					description: params.sd.signalData.description,
					joiner: params.sd.signalData.joiner,
					reveal: params.sd.signalData.reveal,
					notificationType: params.sd.signalData.notificationType,
					conditions: params.sd.signalData.conditions.map((condition) => {
						if (typeof condition[4] != "object") {
							// convert old-style conditions
							let { label, position, shape, size } = params.sd.signalData;
							condition[4] = {
								type: params.sd.signalData.notificationType,
								shape,
								label,
								size,
								position
							};
						}
						return condition.slice();
					})
				};
			} else {
				// Create a new study signal
				this.editMode = false;
				titleElem.innerText = titleElem.innerText.replace("Edit", "New");
				this.querySelectorAll("[cq-add-only]").forEach(
					(el) => (el.hidden = false)
				);
				// Initialize a new signalParams object
				if (!this.activeStudy || !this.activeStudy.parameters.interactiveAddCB)
					this.reset();
			}
			if (this.activeStudy && !this.stx.layout.studies[this.activeStudy.name])
				this.activeStudy = null;

			this.updateFormValues();
			this.renderConditionOptions();
			this.makeStudyMenu();
			// The study menu renders, the search input is automatically focused.
			// Remove that focus to ensure a proper start in keyboard navigation.
			setTimeout(() =>
				this.dialog.removeFocused(this.dialog.getKeyboardSelectableItems())
			);
		}

		/**
		 * Remove the active study from the chart.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias removeActiveStudy
		 * @since 8.6.0
		 */
		removeActiveStudy() {
			if (this.activeStudy) {
				CIQ.Studies.removeStudy(this.stx, this.activeStudy);
				this.activeStudy = null;
				this.signalParams.studyName = "";
				this.signalParams.conditions = [];
			}
		}

		/**
		 * Update form controls related to marker condition options based on values in
		 * `signalParams.conditions` array.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias renderConditionOptions
		 * @since 8.6.0
		 */
		renderConditionOptions() {
			// don't re-render when saving
			if (this.saving) return;

			const getFieldSelect = (condition, idx) => {
				const lineValues = Object.keys(this.activeStudy.outputMap);
				if (!condition[0]) condition[0] = lineValues[0];

				return this.makeMenu(
					"ciq-condition-line",
					condition[0],
					lineValues,
					"SignalIQDialog.updateConditionVal(" + idx + ",0,$val)",
					idx,
					"Select Action..."
				);
			};

			const getOperatorSelect = (condition, idx) => {
				return this.makeMenu(
					"ciq-condition-operator",
					condition[1],
					this.selectOptions.operator,
					"SignalIQDialog.updateConditionVal(" + idx + ",1,$val)",
					idx,
					"Select Action..."
				);
			};

			const getComparisonFieldSelect = (condition, idx) => {
				const comparisonContainer = document.createElement("div");
				comparisonContainer.className = "cq-comparison-container";

				if (condition[1].indexOf("p") < 0 && condition[1].indexOf("t") < 0) {
					const studyOutputs = Object.keys(this.activeStudy.outputMap).filter(
						(item) => item != condition[0]
					);
					const altComparisons = this.selectOptions.comparison.filter(
						(option) => {
							return (
								Object.keys(this.stx.chart.dataSet[0]).includes(option) ||
								option == "Value"
							);
						}
					);
					const comparisonOptions = [...studyOutputs, ...altComparisons];
					if (!condition[2] && condition[2] !== 0)
						condition[2] = comparisonOptions[0];
					// Select comparison
					let comparisonSelect = this.makeMenu(
						"ciq-condition-comparison",
						condition[2],
						comparisonOptions,
						"SignalIQDialog.updateConditionVal(" + idx + ",2,$val)",
						idx,
						"Select Action..."
					);
					comparisonContainer.appendChild(comparisonSelect);

					// Value
					let valueInput = document.createElement("input");
					valueInput.className = "comparison";
					if (condition[2] || condition[2] === 0)
						valueInput.value = condition[2];
					if (
						!valueInput.value ||
						valueInput.value == "Value" ||
						!isNaN(valueInput.value)
					) {
						valueInput.type = "number";
						valueInput.step = "0.01";
						if (!valueInput.value) condition[2] = valueInput.value = 0;
					}
					valueInput.addEventListener("change", (event) =>
						this.updateConditionVal(null, idx, 2, event.target.value)
					);
					comparisonContainer.appendChild(valueInput);
				} else {
					condition[2] = null;
				}

				return comparisonContainer;
			};

			const getJoinerButton = (label, value) => {
				const joinBtn = document.createElement("span");
				let inputControl = joinBtn.appendChild(document.createElement("input"));
				inputControl.setAttribute("value", value);
				inputControl.setAttribute("type", "radio");
				inputControl.setAttribute("name", "joiner");
				inputControl.setAttribute("id", "join" + label);
				inputControl.addEventListener("change", (event) => {
					this.updateParamValue(event.target, "joiner", event.target.value);
					this.renderConditionOptions();
					// Locate and focus the last element after rerendering
					this.dialog.refreshFocus();
				});
				if (this.signalParams.joiner === value)
					inputControl.setAttribute("checked", "");
				let inputLabel = joinBtn.appendChild(document.createElement("label"));
				inputLabel.setAttribute("for", "join" + label);
				inputLabel.setAttribute("name", "ciq-" + label);
				inputLabel.setAttribute("keyboard-selectable", "true");
				inputLabel.innerText = label.toUpperCase();

				return joinBtn;
			};

			const conditionsBlock = this.querySelector(".cq-study-signal-conditions");
			// Wipe the conditions block clean
			this.collapse(conditionsBlock);
			while (conditionsBlock.firstChild) conditionsBlock.lastChild.remove();

			// When adding a new study, all we need to do is clear out this block and wait for the active study to be set.
			if (!this.activeStudy) {
				this.querySelector(".ciq-btn.ciq-edit-study").classList.add("hidden");
				return;
			}

			this.querySelector(".ciq-btn.ciq-edit-study").classList.remove("hidden");
			this.signalParams.studyName = this.activeStudy.name;
			if (!this.signalParams.conditions || !this.signalParams.conditions.length)
				this.signalParams.conditions = [null];

			// Populate any empty (new) conditions
			this.signalParams.conditions.forEach((condition, idx) => {
				if (!condition || !condition.length)
					this.signalParams.conditions[idx] = [null, null, null, null, {}];
			});

			conditionsBlock.appendChild(document.createElement("hr"));

			this.signalParams.conditions.forEach((condition, idx) => {
				// Row container element
				const conditionRow = conditionsBlock.appendChild(
					document.createElement("div")
				);
				conditionRow.className = "cq-study-signal-condition";

				const rowBody = conditionRow.appendChild(document.createElement("div"));
				rowBody.className = "cq-study-signal-condition-body";
				const conditionOptionsContainer = rowBody.appendChild(
					document.createElement("div")
				);
				conditionOptionsContainer.classList.add("ciq-condition-options");

				// Field
				conditionOptionsContainer.appendChild(getFieldSelect(condition, idx));

				// Operator
				if (condition[0])
					conditionOptionsContainer.appendChild(
						getOperatorSelect(condition, idx)
					);

				// Comparison & Marker Options
				if (condition[1]) {
					conditionOptionsContainer.appendChild(
						getComparisonFieldSelect(condition, idx)
					);
					if (idx == 0 || this.signalParams.joiner == "|") {
						rowBody.appendChild(this.renderSignalOptions(condition, idx));
						// Swatch needs to reference its context element. Set the swatch color after appending the row to the dom.
						let swatch = conditionRow.querySelector("cq-swatch");
						if (swatch) swatch.setColor(condition[3] || "auto", false);
					}
				}

				const rowHeadContainer = conditionRow.appendChild(
					document.createElement("div")
				);
				rowHeadContainer.className = "cq-study-signal-condition-head-container";
				const rowHead = document.createElement("div");
				rowHead.className = "cq-study-signal-condition-head";
				rowHead.innerHTML = "<h2>Condition " + (idx + 1) + "</h2>";
				rowHeadContainer.appendChild(rowHead);

				// Remove
				if (this.signalParams.conditions.length > 1) {
					let removeBtn = document.createElement("button");
					removeBtn.className = "ciq-btn ciq-condition-remove";
					removeBtn.innerHTML = "&ndash;";
					removeBtn.addEventListener("click", (event) => {
						event.preventDefault();
						this.signalParams.conditions.splice(idx, 1);
						this.renderConditionOptions();
						if (this.dialog.keyboardNavigation.tabActiveElement) {
							// At this point the remove button has been removed and tab navigation placement is lost.
							// Keyboard focus the first element of the new condition. This is ignored if keyboard navigation isn't used.
							const menuItems = this.querySelectorAll(
								".cq-study-signal-conditions .cq-study-signal-condition .ciq-condition-line"
							);
							const newConditionMenu = menuItems[menuItems.length - 1];
							if (newConditionMenu) this.dialog.focusItem(newConditionMenu);
						}
					});
					rowHead.appendChild(removeBtn);

					// Add the joiner block
					let joinerGroup = conditionsBlock.appendChild(
						document.createElement("div")
					);
					joinerGroup.className = "joiner-group";

					if (idx == 0) {
						joinerGroup.appendChild(getJoinerButton("or", "|"));
						joinerGroup.appendChild(getJoinerButton("and", "&"));
					} else if (idx < this.signalParams.conditions.length - 1) {
						let label = joinerGroup.appendChild(
							document.createElement("label")
						);
						label.innerHTML = this.signalParams.joiner === "&" ? "AND" : "OR";
					}
				}

				// Add
				if (
					idx == this.signalParams.conditions.length - 1 &&
					this.validateCondition(idx)
				) {
					let addBtn = document.createElement("button");
					addBtn.innerText = "+";
					addBtn.className = "ciq-btn ciq-condition-add";
					addBtn.addEventListener("click", () => {
						this.addCondition();
					});
					rowHead.appendChild(addBtn);
				}
			});

			this.translate();
			this.validateSignalParams();

			this.pickers.forEach((picker) => this.config[picker].clean());
		}

		/**
		 * Update form controls related to marker options based on values in
		 * `signalParams`.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias renderSignalOptions
		 * @since 8.6.0
		 * @since 8.7.0 Rename from renderMarkerOptions to renderSignalOptions to include other notification types.
		 */
		renderSignalOptions(condition, idx) {
			const makeSignalOptionMenu = (
				name,
				condition,
				idx,
				valueName,
				data,
				defaultVal
			) => {
				if (typeof condition[4][valueName] === "undefined")
					condition[4][valueName] = defaultVal;
				// Wipe the conditions block clean
				let ciqSelect = this.makeMenu(
					"ciq-condition-signal-" + name,
					condition[4][valueName],
					data,
					"SignalIQDialog.updateConditionSignalVal(" +
						idx +
						",'" +
						valueName +
						"',$val)",
					idx
				);
				return ciqSelect;
			};

			const makeColorSelect = (condition, idx) => {
				let swatchContainer = document.createElement("span");
				swatchContainer.className = "ciq-condition-color";
				swatchContainer.setColor = (color) => {
					this.updateConditionVal(null, idx, 3, color == "auto" ? "" : color);
				};
				let swatch = document.createElement("cq-swatch");
				swatch.setAttribute("cq-overrides", "auto");
				swatch.setAttribute("name", "ciq-condition-color" + idx);
				swatchContainer.appendChild(swatch);

				return swatchContainer;
			};

			const makeTextInput = (
				condition,
				idx,
				valueName,
				label,
				defaultVal,
				picker
			) => {
				if (typeof condition[4][valueName] === "undefined")
					condition[4][valueName] = defaultVal;
				let lblInput = document.createElement("input");
				lblInput.name = `${condition[4].type}-${valueName}-${idx}`;
				lblInput.className = "marker-" + valueName;
				lblInput.type = "text";
				lblInput.setAttribute("title", this.stx.translateIf(label));
				lblInput.value = condition[4][valueName] || "";
				lblInput.addEventListener("input", () => {
					lblInput.value = this.stx.emojify(lblInput.value);
				});
				lblInput.addEventListener("change", () => {
					let { value } = lblInput;
					if (value.indexOf("\\u") === 0)
						value = String.fromCodePoint(parseInt(value.substring(2), 16));
					this.updateConditionSignalVal(lblInput, idx, valueName, value);
				});
				if (this.config[picker]) {
					CIQ.UI.stxtap(lblInput, (e) => {
						this.config[picker].open({
							stx: this.stx,
							targetElement: e.target,
							handler: (value) => {
								this.updateConditionSignalVal(e.target, idx, valueName, value);
							}
						});
						this.pickers.add(picker);
					});
					lblInput.setAttribute("readonly", "readonly");
				}
				return lblInput;
			};

			// Create the container
			let signalOptionsContainer = document.createElement("div");
			signalOptionsContainer.classList.add("ciq-signal-options");

			// Add ciq-select menu for notification type
			signalOptionsContainer.appendChild(
				makeSignalOptionMenu(
					"type",
					condition,
					idx,
					"type",
					this.selectOptions.type,
					CIQ.SignalIQ.notificationTypes[0].type
				)
			);

			// Add other ciq-select menus
			const signalNotificationOptions = CIQ.SignalIQ.notificationTypes.find(
				(elem) => elem.type === condition[4].type
			).options;
			signalNotificationOptions.forEach((elem) => {
				let optionType = elem.optionType,
					optionName = elem.optionName;
				switch (optionType) {
					case "dropdown":
						signalOptionsContainer.appendChild(
							makeSignalOptionMenu(
								optionName,
								condition,
								idx,
								optionName,
								elem.options,
								elem.optionDefault
							)
						);
						break;
					case "colorPicker":
						signalOptionsContainer.appendChild(makeColorSelect(condition, idx));
						break;
					case "text":
						signalOptionsContainer.appendChild(
							makeTextInput(
								condition,
								idx,
								optionName,
								elem.optionLabel,
								this.stx.emojify(elem.optionDefault),
								elem.optionPicker
							)
						);
						break;
				}
			});

			return signalOptionsContainer;
		}

		/**
		 * Update marker preview based on values in `signalParams`.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias renderMarkerPreview
		 * @since 8.6.0
		 */
		renderMarkerPreview() {
			const size = (sz) => {
				switch (sz) {
					case "L":
						return "large";
					case "M":
						return "medium";
					case "S":
					default:
						return "small";
				}
			};
			const marker = this.querySelector(".ciq-marker-preview .stx-marker");
			const visual = this.querySelector(".stx-visual");
			const content = this.querySelector(".stx-marker-content");

			marker.className =
				"stx-marker signal " +
				this.signalParams.shape +
				" " +
				size(this.signalParams.size);

			if (this.signalParams.conditions && this.signalParams.conditions[0]) {
				let bkgColor = "transparent";
				if (this.signalParams.shape !== "noshape") {
					bkgColor = this.signalParams.conditions[0][3];
					if (!bkgColor) {
						bkgColor =
							this.activeStudy.outputs[
								this.activeStudy.outputMap[this.signalParams.conditions[0][0]]
							];
						// Extract the color if the output is an object
						if (typeof bkgColor == "object" && bkgColor.color)
							bkgColor = bkgColor.color;
					}
					if (!bkgColor || bkgColor === "auto")
						bkgColor = this.context.stx.defaultColor;
				}
				visual.style.backgroundColor = bkgColor;
				content.style.color = CIQ.chooseForegroundColor(bkgColor);
			}
			content.innerText = this.signalParams.label;

			this.translate();
		}

		/**
		 * Resets local study signal properties.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias reset
		 * @since 8.6.0
		 */
		reset() {
			if (!this.editMode) this.removeActiveStudy();
			else this.activeStudy = null;
			// Initialize a new signalParams object
			this.signalParams = {
				name: "",
				description: "",
				joiner: "|",
				conditions: [],
				studyName: ""
			};
		}

		/**
		 * Apply the current study signal settings to the active study and close the dialog.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias save
		 * @since 8.6.0
		 */
		save() {
			if (!this.activeStudy) return;

			this.updateFormValues(true);
			this.saving = true;
			if (
				this.stx.signalIQ.convertStudyToSignal(
					this.activeStudy,
					this.signalParams,
					this.editMode
				)
			) {
				this.editMode = true; // prevent deletion of newly added study
				this.close();
			}
			this.saving = false;
		}

		/**
		 * Translates a dialog.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias translate
		 * @since 8.6.0
		 */
		translate() {
			if (this.stx.translateUI) this.stx.translateUI(this);

			// Translate input placeholders
			let placeholderElems = this.querySelectorAll("[placeholder]");
			placeholderElems.forEach((el) => {
				if (!el.dataset.placehold) el.dataset.placehold = el.placeholder;
				el.placeholder = this.stx.translateIf(el.dataset.placehold);
			});
		}

		/**
		 * Update a value in `signalParams.conditions` at provided index.
		 *
		 * @param {object|null} obj Object containing event or null.
		 * @param {number} conditionIdx Index of the condition.
		 * @param {number} paramIdx Index of the property within the condition.
		 * @param {string|number} value Value for the condition property.
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias updateConditionVal
		 * @since 8.6.0
		 */
		updateConditionVal(obj, conditionIdx, paramIdx, value) {
			if (obj && obj.e) obj.e.stopPropagation();
			this.signalParams.conditions[conditionIdx][paramIdx] = value;
			if (isNaN(value)) {
				this.renderConditionOptions();
				// Locate and focus the last element after rerendering
				this.dialog.refreshFocus();
			}
		}

		/**
		 * Update a marker option value in `signalParams.conditions` at provided index.
		 *
		 * @param {object|null} obj Object containing event or null.
		 * @param {number} conditionIdx Index of the condition.
		 * @param {string} paramName Name of the marker property.
		 * @param {string|number} value Value for the condition property.
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias updateConditionSignalVal
		 * @since 8.7.0
		 */
		updateConditionSignalVal(obj, conditionIdx, paramName, value) {
			if (obj && obj.e) obj.e.stopPropagation();
			const condition = this.signalParams.conditions[conditionIdx];
			if (paramName === "type") {
				condition[3] = ""; // reset color
				condition[4] = {}; // reset signal type parameters
			}
			condition[4][paramName] = value;
			this.renderConditionOptions();
			// Locate and focus the last element after rerendering
			this.dialog.refreshFocus();
		}

		/**
		 * Synchronizes dialog HTML elements in the local `formElements` property with
		 * values in the `signalParams` object. By default, this will update the
		 * element value with its corresponding `signalParams` value. Passing
		 * `formToData` parameter as `true` will update the corresponding
		 * `signalParams` value with the element value.
		 *
		 * @param {boolean} formToData Update `signalParams` with form values.
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias updateFormValues
		 * @since 8.6.0
		 */
		updateFormValues(formToData) {
			Object.keys(this.formElements).forEach((key) => {
				if (formToData) {
					this.signalParams[key] = this.formElements[key].value;
				} else {
					this.formElements[key].value = this.signalParams[key];
				}
			});

			this.validateSignalParams();
		}

		/**
		 * Update the value of a `signalParams` property.
		 *
		 * @param {object|null} obj Object containing event or null
		 * @param {string} name Name of the property.
		 * @param {string|number} value Value for the property.
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias updateParamValue
		 * @since 8.6.0
		 */
		updateParamValue(obj, name, value) {
			if (obj && obj.e) obj.e.stopPropagation();
			this.signalParams[name] = value;
			this.validateSignalParams();

			// Locate and focus the last element after rerendering
			this.dialog.refreshFocus();
		}

		/**
		 * Checks local signalParams.conditions array for all properties required by
		 * {@link CIQ.SignalIQ#convertStudyToSignal}.
		 *
		 * @param {number} index Array index to check.
		 * @return {boolean} Return `true` if valid.
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias validateCondition
		 * @since 8.6.0
		 */
		validateCondition(index) {
			let condition = this.signalParams.conditions[index];
			if (!condition || !Array.isArray(condition) || condition.length < 3)
				return false;

			const nullIdx = condition.indexOf(null);
			if (
				nullIdx === 0 ||
				nullIdx === 1 ||
				(nullIdx === 2 &&
					condition[1].indexOf("p") < 0 &&
					condition[1].indexOf("t") < 0)
			)
				return false;

			return true;
		}

		/**
		 * Checks local signalParams object for all properties required by
		 * {@link CIQ.SignalIQ#convertStudyToSignal}. Displays appropriate
		 * feedback messaging at bottom of dialog.
		 *
		 * @memberOf WebComponents.cq-signaliq-dialog#
		 * @alias validateSignalParams
		 * @since 8.6.0
		 */
		validateSignalParams() {
			let isValid = true;
			const warningElem = this.querySelector(".info-message");
			let warningMessage = "";
			let newName = this.formElements.name.value;

			if (!this.activeStudy) {
				isValid = false;
				warningMessage = "Select a study.";
			}

			if (!newName) {
				isValid = false;
			} else if (
				!this.editMode &&
				this.stx &&
				this.stx.layout &&
				this.stx.layout.studies
			) {
				// When adding a new study, check for an existing study signal with the same name
				if (
					Object.keys(this.stx.layout.studies).find((studyname) => {
						const sd = this.stx.layout.studies[studyname];
						if (sd.signalData && sd.signalData.name === newName) return true;
					})
				) {
					isValid = false;
					warningMessage = "Signals cannot have duplicate names.";
				}
			}

			if (this.signalParams) {
				const chartType = this.stx.layout.aggregationType;
				this.signalParams.conditions.forEach((condition, idx) => {
					if (warningMessage) return;
					if (!this.validateCondition(idx)) {
						isValid = false;
						warningMessage = "Complete Signal Conditions.";
						return;
					}
					const type = CIQ.SignalIQ.notificationTypes.find(
						(elem) => elem.type === condition[4].type
					);
					if (type) {
						const typeVerificationFunction = type.validation;
						if (
							typeVerificationFunction &&
							!typeVerificationFunction(chartType)
						) {
							//isValid = false;
							warningMessage = `${type.name} does not work with selected chart type.`;
							return;
						}
					}
				});
			}

			const saveBtn = this.querySelector(".ciq-btn-save");
			if (isValid) {
				saveBtn.classList.remove("ciq-btn-disabled");
			} else {
				saveBtn.classList.add("ciq-btn-disabled");
			}

			if (this.stx) {
				const span = document.createElement("span");
				CIQ.makeTranslatableElement(span, this.stx, warningMessage);
				warningElem.replaceChildren(span);
			}

			if (warningMessage) warningElem.classList.add("warning");
			else warningElem.classList.remove("warning");

			return isValid;
		}
	}

	SignalIQDialog.markup = `
		<h4 class="title">New Signal</h4>
		<cq-close></cq-close>
		<div cq-study-edit-dialog-div>
			<cq-scroll cq-no-maximize>
				<form id="study-signal" class="study-signal">
					<h2 cq-add-only>Choose a Study:</h2>
					<div class="study-select-container"></div>
					<div cq-tooltip-activator class="ciq-edit-study ciq-btn hidden" stxtap="editStudy()">
						&nbsp;
						<cq-tooltip>Edit Study</cq-tooltip>
					</div>
					<div class="cq-study-signal-conditions"></div>
					<hr/>
					<div class="notification-type-container"></div>
					<h2>Description</h2>
					<textarea name="signal-description" keyboard-selectable="true" type="text" placeholder="Description will appear in an infobox when the signal is clicked."></textarea>
					<hr/>
					<div class="clearfix"></div>
					<div class="ciq-misc-settings">
						<input name="signal-name" type="text" value="" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" placeholder="Enter a Name" />
						<div class="ciq-btn ciq-btn-save" stxtap="save()">Save</div>
						<h2 class="info-message"></h2>
					</div>
				</form>
			</cq-scroll>
			<template cq-study-menu>
				<cq-menu class="ciq-select" cq-focus="input">
					<cq-selected></cq-selected>
					<cq-menu-dropdown cq-lift class="ciq-signaliq-study-select">
						<cq-study-filter cq-filter-min="15"></cq-study-filter>
						<cq-study-items></cq-study-items>
					</cq-menu-dropdown>
				</cq-menu>
			</template>
			<template cq-menu>
				<cq-menu class="ciq-select">
					<cq-selected></cq-selected>
					<cq-menu-dropdown cq-lift></cq-menu-dropdown>
				</cq-menu>
			</template>
		</div>
	`;

	CIQ.UI.addComponentDefinition("cq-signaliq-dialog", SignalIQDialog);
}
