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
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-signaliq-dialog&gt;</h4>
	 *
	 * Displays a dialog so signal studies can be entered into the system through the UI.
	 *
	 * **Requires [SignalIQ]{@link CIQ.SignalIQ} plugin.**
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when it saves signal settings.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "save"|
	 * | action | "click" |
	 * | study | _study parameters_ |
	 * | signal | _signal parameters_ |
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * @alias WebComponents.SignalIQDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 *  - 8.6.0
	 *  - 9.1.0 Added emitter.
	 */
	class SignalIQDialog extends CIQ.UI.DialogContentTag {
		constructor() {
			super();
			this.activeStudy = null;
			this.editMode = false;
			this.pickers = new Set();
		}

		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();
			CIQ.UI.addResizeListener(this, () => {
				this.pickers.forEach((picker) => this.config[picker].clean());
			});
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, SignalIQDialog);
			this.constructor = SignalIQDialog;
		}

		disconnectedCallback() {
			if (this.doNotDisconnect) return;
			CIQ.UI.removeResizeListener(this);
			super.disconnectedCallback();
		}

		/**
		 * Push a new empty array to the `signalParams.conditions` and re-render the
		 * condition options UI.
		 *
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
		 * @since 8.6.0
		 */
		addStudy(obj, name) {
			this.removeActiveStudy();
			this.activeStudy = CIQ.Studies.addStudy(this.stx, name);
			this.renderConditionOptions();
			if (this.studyMenu) {
				this.studyMenu.setAttribute("text", this.activeStudy.name);
				this.reconnectStudySearch();

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
		 * @param {Event} activator.e Event associated with activator
		 * @since 8.6.0
		 */
		editStudy(activator) {
			if (!this.activeStudy) return;
			activator.e.stopPropagation();
			this.collapse(this);
			const studyEdit = this.context.getAdvertised("StudyEdit");
			const params = {
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
		 * @param {CIQ.UI.Context} [params.context] A context. See [setContext]{@link CIQ.UI.DialogContentTag#setContext}.
		 * @since 8.6.0
		 */
		init(params) {
			this.form = this.querySelector("form#study-signal");
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

			this.form.addEventListener("submit", (e) => e.preventDefault());

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
		 * @since
		 * - 8.6.0
		 * - 8.7.0 Add index and label parameters.
		 */
		makeMenu(name, currentValue, fields, cb, index, label) {
			let currentValueLabel = "";
			if (!isNaN(currentValue) && !isNaN(parseFloat(currentValue)))
				currentValueLabel = "Value";

			const menu = document.createElement("cq-menu");
			menu.className = "ciq-select " + name;

			menu.setAttribute("id", name + "-" + index);
			menu.setAttribute("name", name + "-" + index);

			const menuitems = []; // scrollable in menu.
			for (let field in fields) {
				let value, label;
				if (Array.isArray(fields[field])) {
					[value, label] = fields[field];
				} else {
					value = label = fields[field];
				}
				if (!currentValueLabel && currentValue == value)
					currentValueLabel = label;
				menuitems.push({
					type: "item",
					label,
					tap: cb.replace("$val", "'" + value + "'")
				});
			}

			menu.setAttribute("text", currentValueLabel || label || "Select...");
			menu.setContent(menuitems, true);
			return menu;
		}

		/**
		 * Create a cq-menu form element with all available studies and inject a
		 * search field in the menu header to filter options. The menu is automatically
		 * attached to a local element with class `study-select-container`.
		 *
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
				CIQ.makeTranslatableElement(
					studySelectContainer,
					this.stx,
					this.activeStudy.name
				);
				return;
			}
			const studyDefs = CIQ.Studies.studyLibrary;
			const menu = document.createElement("cq-menu");
			menu.className = "ciq-select";
			menu.setAttribute("text", "Studies");

			const menuStudies = [
				{
					type: "heading",
					filterMin: 15
				}
			];

			Object.keys(studyDefs)
				.sort(function (lhs, rhs) {
					const lsd = CIQ.Studies.studyLibrary[lhs];
					const rsd = CIQ.Studies.studyLibrary[rhs];
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
					menuStudies.push({
						type: "item",
						label: studyDefs[study].name,
						tap: "SignalIQDialog.addStudy",
						value: study
					});
				});
			menu.setContent(menuStudies, true);

			studySelectContainer.appendChild(menu);
			this.translate();
			this.studyMenu = menu;

			this.reconnectStudySearch = () => {
				const dropdown =
					menu.qsa("cq-dropdown", menu, true)[0] ||
					(menu.lifts && menu.lifts[0]);
				if (dropdown) {
					const heading = dropdown.qsa("cq-heading", dropdown, true)[0];
					heading.itemContainer = CIQ.climbUpDomTree(
						heading,
						".content",
						true
					)[0];
					heading.build();
				}
			};
			this.reconnectStudySearch();
		}

		/**
		 * Called when the dialog is invoked. Automatically sets up local properties
		 * for either adding or editing a study signal.
		 *
		 * @param {object} params The parameter object.
		 * @param {CIQ.UI.Context} [params.context] A context. See [setContext]{@link CIQ.UI.DialogContentTag#setContext}.
		 * @param {CIQ.Studies.StudyDescriptor} params.sd The study descriptor.
		 * @since 8.6.0
		 */
		open(params) {
			this.addDefaultMarkup();
			super.open(params);
			this.dialog = this.closest("cq-dialog");
			if (!this.initialized) this.init(params);

			this.validateSignalParams();

			if (params.context) {
				this.context = params.context;
				this.stx = params.context.stx;
				this.context.advertiseAs(this, "SignalIQDialog");
				this.config = this.context.config.plugins.signalIQ || {};
				this.layoutListener = this.stx.addEventListener("layout", () => {
					if (this.activeStudy) {
						if (this.editMode) {
							this.makeStudyMenu();
						} else if (this.studyMenu) {
							this.studyMenu.setAttribute("text", this.activeStudy.name);
							this.reconnectStudySearch();
						}

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
				this.dialog.setTitle(
					this.dialog.getAttribute("cq-title").replace("New", "Edit")
				);
				this.querySelectorAll("[cq-add-only]").forEach(
					(el) => (el.hidden = true)
				);
				this.activeStudy = params.sd;
				// Populate signalParams with existing values
				const { signalData } = params.sd;
				this.signalParams = {
					name: signalData.name,
					description: signalData.description,
					joiner: signalData.joiner,
					reveal: signalData.reveal,
					notificationType: signalData.notificationType,
					conditions: signalData.conditions.map((condition) => {
						if (typeof condition[4] != "object") {
							// convert old-style conditions
							const { label, position, shape, size } = signalData;
							condition[4] = {
								type: signalData.notificationType,
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
				this.dialog.setTitle(
					this.dialog.getAttribute("cq-title").replace("Edit", "New")
				);
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
					const comparisonSelect = this.makeMenu(
						"ciq-condition-comparison",
						condition[2],
						comparisonOptions,
						"SignalIQDialog.updateConditionVal(" + idx + ",2,$val)",
						idx,
						"Select Action..."
					);
					comparisonContainer.appendChild(comparisonSelect);

					// Value
					const valueInput = document.createElement("input");
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
				const inputControl = joinBtn.appendChild(
					document.createElement("input")
				);
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
				const inputLabel = joinBtn.appendChild(document.createElement("label"));
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

			// Store the last condition row to set focus after a re-render to keep screen readers focused as closely to the last position as possible
			let lastConditionRow = null;

			this.signalParams.conditions.forEach((condition, idx) => {
				// Row container element
				const conditionRow = conditionsBlock.appendChild(
					document.createElement("div")
				);
				lastConditionRow = conditionRow;
				conditionRow.className = "cq-study-signal-condition";

				const rowBody = conditionRow.appendChild(document.createElement("div"));
				rowBody.className = "cq-study-signal-condition-body";
				const conditionOptionsContainer = rowBody.appendChild(
					document.createElement("div")
				);
				conditionOptionsContainer.classList.add("ciq-condition-options");

				// Field
				const fieldSelect = getFieldSelect(condition, idx);
				conditionOptionsContainer.appendChild(fieldSelect);

				// Operator
				if (condition[0]) {
					const opSelect = getOperatorSelect(condition, idx);
					conditionOptionsContainer.appendChild(opSelect);
				}

				// Comparison & Marker Options
				if (condition[1]) {
					conditionOptionsContainer.appendChild(
						getComparisonFieldSelect(condition, idx)
					);
					if (idx == 0 || this.signalParams.joiner == "|") {
						rowBody.appendChild(this.renderSignalOptions(condition, idx));
						// Swatch needs to reference its context element. Set the swatch color after appending the row to the dom.
						const swatch = conditionRow.querySelector("cq-swatch");
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
					const removeBtn = document.createElement("button");
					removeBtn.type = "button";
					removeBtn.className = "ciq-btn ciq-condition-remove";
					removeBtn.innerHTML = "&ndash;";
					removeBtn.setAttribute("aria-label", "Remove Condition");
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
					const joinerGroup = conditionsBlock.appendChild(
						document.createElement("div")
					);
					joinerGroup.className = "joiner-group";

					if (idx == 0) {
						joinerGroup.appendChild(getJoinerButton("or", "|"));
						joinerGroup.appendChild(getJoinerButton("and", "&"));
					} else if (idx < this.signalParams.conditions.length - 1) {
						const label = joinerGroup.appendChild(
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
					const addBtn = document.createElement("button");
					addBtn.type = "button";
					addBtn.innerText = "+";
					addBtn.className = "ciq-btn ciq-condition-add";
					addBtn.setAttribute("aria-label", "Add Condition");
					addBtn.addEventListener("click", () => {
						this.addCondition();
					});
					rowHead.appendChild(addBtn);
				}
			});

			this.translate();
			this.validateSignalParams();

			this.pickers.forEach((picker) => this.config[picker].clean());

			if (lastConditionRow)
				setTimeout(() => {
					lastConditionRow.tabIndex = -1;
					lastConditionRow.focus();
				});
		}

		/**
		 * Update form controls related to marker options based on values in `signalParams`.
		 *
		 * @param {array} condition Array of parameters representing a condition on which the signal will trigger.
		 * @param {number} idx Index of the condition.
		 * @return {Node} A DOM node tailored to the condition options, as form controls.
		 *
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
				const ciqSelect = this.makeMenu(
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

			const makeColorSelect = (idx) => {
				const swatchContainer = document.createElement("span");
				swatchContainer.className = "ciq-condition-color";
				swatchContainer.setColor = (color) => {
					this.updateConditionVal(null, idx, 3, color == "auto" ? "" : color);
				};
				const swatch = document.createElement("cq-swatch");
				swatch.setAttribute("overrides", "auto");
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
				const lblInput = document.createElement("input");
				lblInput.name = `${condition[4].type}-${valueName}-${idx}`;
				lblInput.id = `${condition[4].type}-${valueName}-${idx}`;
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
			const signalOptionsContainer = document.createElement("div");
			signalOptionsContainer.classList.add("ciq-signal-options");

			// Add ciq-select menu for notification type
			const notificationTypeMenu = makeSignalOptionMenu(
				"type",
				condition,
				idx,
				"type",
				this.selectOptions.type,
				CIQ.SignalIQ.notificationTypes[0].type
			);
			signalOptionsContainer.appendChild(notificationTypeMenu);

			// Add other ciq-select menus
			const signalNotificationOptions = CIQ.SignalIQ.notificationTypes.find(
				(elem) => elem.type === condition[4].type
			).options;
			signalNotificationOptions.forEach((elem) => {
				const { optionType, optionName } = elem;
				switch (optionType) {
					case "dropdown":
						const optionMenu = makeSignalOptionMenu(
							optionName,
							condition,
							idx,
							optionName,
							elem.options,
							elem.optionDefault
						);
						signalOptionsContainer.appendChild(optionMenu);
						break;
					case "colorPicker":
						signalOptionsContainer.appendChild(makeColorSelect(idx));
						break;
					case "text":
						const optionTextInput = makeTextInput(
							condition,
							idx,
							optionName,
							elem.optionLabel,
							this.stx.emojify(elem.optionDefault),
							elem.optionPicker
						);
						signalOptionsContainer.appendChild(optionTextInput);
						break;
				}
			});

			return signalOptionsContainer;
		}

		/**
		 * Update marker preview based on values in `signalParams`.
		 *
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
				this.emitCustomEvent({
					effect: "save",
					detail: {
						study: this.activeStudy,
						signal: this.signalParams
					}
				});
				this.close();
			}
			this.saving = false;
		}

		/**
		 * Translates a dialog.
		 *
		 * @since 8.6.0
		 */
		translate() {
			if (this.stx.translateUI) this.stx.translateUI(this);

			// Translate input placeholders
			const placeholderElems = this.querySelectorAll("[placeholder]");
			placeholderElems.forEach((el) => {
				if (!el.dataset.placehold) el.dataset.placehold = el.placeholder;
				el.placeholder = this.stx.translateIf(el.dataset.placehold);
			});
		}

		/**
		 * Update a value in `signalParams.conditions` at provided index.
		 *
		 * @param {object|null} obj Object containing event or null.
		 * @param {Event} [obj.e] Event triggering the update.
		 * @param {number} conditionIdx Index of the condition.
		 * @param {number} paramIdx Index of the property within the condition.
		 * @param {string|number} value Value for the condition property.
		 *
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
		 * @param {Event} [obj.e] Event triggering the update.
		 * @param {number} conditionIdx Index of the condition.
		 * @param {string} paramName Name of the marker property.
		 * @param {string|number} value Value for the condition property.
		 *
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
		 * @param {Event} [obj.e] Event triggering the update.
		 * @param {string} name Name of the property.
		 * @param {string|number} value Value for the property.
		 *
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
		 *
		 * @since 8.6.0
		 */
		validateCondition(index) {
			const condition = this.signalParams.conditions[index];
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
		 * @return {boolean} True if passed all validations.
		 *
		 * @since 8.6.0
		 */
		validateSignalParams() {
			let isValid = true;
			const warningElem = this.querySelector(".info-message");
			let warningMessage = "";
			const newName = this.formElements.name.value;

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
			saveBtn.classList.toggle("ciq-btn-disabled", !isValid);
			saveBtn.ariaDisabled = !isValid;

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

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 */
	SignalIQDialog.markup = `
		<div cq-study-edit-dialog-div>
			<cq-scroll cq-no-maximize>
				<form id="study-signal" class="study-signal">
					<h2 cq-add-only>Choose a Study:</h2>
					<div class="study-select-container"></div>
					<div cq-tooltip-activator class="ciq-edit-study ciq-btn hidden" stxtap="editStudy()" role="button" aria-label="Edit Study">
						&nbsp;
						<cq-tooltip>Edit Study</cq-tooltip>
					</div>
					<div class="cq-study-signal-conditions"></div>
					<hr>
					<div class="notification-type-container"></div>
					<h2 id="signal-description-label" for="signal-description-textarea">Signal Description</h2>
					<textarea aria-labelledby="signal-description-label" name="signal-description" keyboard-selectable="true" type="text" placeholder="Description will appear in an infobox when the signal is clicked."></textarea>
					<hr>
					<div class="clearfix"></div>
					<div class="ciq-misc-settings">
						<input name="signal-name" type="text" value="" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" placeholder="Enter a Name"></input>
						<button type="submit" class="ciq-btn ciq-btn-save" stxtap="save()">Save</button>
						<h2 class="info-message"></h2>
					</div>
				</form>
			</cq-scroll>
		</div>
	`;
	CIQ.UI.addComponentDefinition("cq-signaliq-dialog", SignalIQDialog);
}
