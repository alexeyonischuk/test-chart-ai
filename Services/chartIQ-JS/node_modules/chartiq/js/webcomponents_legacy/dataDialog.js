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
import "../../js/webcomponents_legacy/close.js";
import "../../js/webcomponents_legacy/dialog.js";
import "../../js/webcomponents/scroll.js";
import "../../js/webcomponents_legacy/swatch.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */





var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;
/**
 * Dialog form that allows users to upload CSV files to be loaded into the chart.
 * @namespace WebComponents.cq-data-dialog
 */
class DataDialog extends CIQ.UI.DialogContentTag {
	constructor() {
		super();
		this.fileMap = new Map();
		this.swatchColors = CIQ.UI.defaultSwatchColors;
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, DataDialog);
		this.constructor = DataDialog;
	}

	/**
	 * Aborts the import of a file.
	 * If that is the only file loaded then the form will reset to its default state.
	 * @param {Event} e Submit event
	 * @memberof WebComponents.cq-data-dialog
	 */
	abortImport(e) {
		const self = this;
		const targetClose = e.target.nodeName === "CQ-CLOSE";

		const fmf = [...this.fileMap.keys()];
		const findIndexFn = (fname) => {
			return (file) => file.name === fname;
		};
		for (let fset of this.form.querySelectorAll("fieldset[name]")) {
			let fname = fset.getAttribute("fields");
			if (e && e.target.getAttribute("fields") !== fname && !targetClose)
				continue;
			let idx = fmf.findIndex(findIndexFn(fname));

			this.form.removeChild(fset.parentElement);
			this.fileMap.delete(fmf[idx]);
		}

		if (targetClose) this.fileInput.value = "";

		if (!this.fileMap.size) {
			this.fileInput.value = "";
			this.loadDataBtn.style.display = "inline-block";
			this.importBtn.style.display = "none";
			this.querySelector("cq-section.loader").style.display = "flex";
			this.warn("", "", true);
			CIQ.UI.containerExecute(this, "resize");
		}

		self.resetTabSelect();
	}

	/**
	 * Closes dialog and resets it to the default state.
	 * @memberof WebComponents.cq-data-dialog
	 */
	close() {
		this.abortImport({ target: this.querySelector("cq-close") });
		this.channelWrite("channel.dataLoader", false, this.context.stx);
		this.loadDataBtn.style.display = this.fileInput.value ? "none" : "inline";
		this.querySelector("cq-section.loader").style.display = "flex";
		this.warn("", "", true);
		super.close();
	}

	/**
	 * Gets FormData from fields and appends that data to the {@link CIQ.CSVReader}
	 * @memberof WebComponents.cq-data-dialog
	 */
	getFormData() {
		const appendFormData = (fieldSet, reader) => {
			return (field) => {
				const el = fieldSet.elements[field];
				let value;

				if (el) {
					value = el.type === "checkbox" ? el.checked : el.value;
				} else {
					const v = fieldSet.querySelector(`[name='${field}']`);
					if (v) value = v.value;
				}

				reader.formData.append(field, value);
			};
		};

		for (let entry of this.fileMap) {
			const [file, reader] = entry;
			let fieldSet = this.querySelector(`[name='${file.name}'] fieldset`);

			reader.formData = new FormData();
			["name", "display", "periodicity", "panel", "color"].forEach(
				appendFormData(fieldSet, reader)
			);
		}
	}

	/**
	 * Hides the dialog without clearing data.
	 * @memberof WebComponents.cq-data-dialog
	 */
	hide() {
		this.channelWrite("channel.dataLoader", false, this.context.stx);
	}

	/**
	 * Imports the data if the dialog is in a valid state.
	 * Closes dialog after successfully importing data.
	 * @param {Event} e Submit event. Default is prevented.
	 * @memberof WebComponents.cq-data-dialog
	 */
	importData(e) {
		e.preventDefault();
		const { dialog } = this;
		if (!dialog.validate()()) return;
		let {
			context: { stx },
			fileMap
		} = dialog;
		dialog.getFormData();
		fileMap.forEach((reader) => {
			stx.dataLoader.importData(reader);
		});
		dialog.close();
	}

	/**
	 * Parses files uploaded by the user.
	 * @async
	 * @memberof WebComponents.cq-data-dialog
	 */
	async loadData() {
		this.validateFileInput()();
		if (this.warning.getAttribute("cq-active")) return;
		for (const file of this.fileInput.files) {
			let reader = new CIQ.CSVReader(file);
			this.fileMap.set(file, reader);
			await reader.parse(file);
		}

		this.loadDataBtn.style.display = "none";
		this.querySelector("cq-section.loader").style.display = "none";
		this.showData();
	}

	/**
	 * Realigns tab select from the KeystrokeHub
	 * @memberof WebComponents.cq-data-dialog
	 * @private
	 */
	resetTabSelect() {
		const {
			uiManager: { keystrokeHub }
		} = this.context;

		keystrokeHub.highlightAlign();
	}

	/**
	 * Constructs and displays form for loaded files.
	 * @memberof WebComponents.cq-data-dialog
	 */
	showData() {
		const {
			context: { stx, config = {} },
			keystrokeHub
		} = this;

		const setAbortFunc = (fileName) => {
			return (selector) => {
				selector.setAttribute("fields", fileName);
				selector.addEventListener("pointerup", (e) => {
					e.preventDefault(); // stop submit event!
					CIQ.UI.containerExecute(selector, "abortImport", [e]);
				});
			};
		};

		let main = false;
		let tmpl = this.querySelector("template");
		for (const entries of this.fileMap) {
			const [file, reader] = entries;
			const fileName = file.name;
			const frag = tmpl.content.cloneNode(true);
			frag.firstElementChild.id += `${fileName}`;
			frag.firstElementChild.setAttribute("name", fileName);

			const fieldSet = frag.querySelector("fieldset");
			if (fieldSet) {
				fieldSet.setAttribute("fields", fileName);
				fieldSet.setAttribute("name", "fields");
			}

			const title = frag.querySelector("legend.file-name");
			title.innerText = `File: ${fileName}`;

			const name = frag.querySelector(".data-name input");
			name.setAttribute("placeholder", fileName);
			name.value = fileName;

			const periodicity = frag.querySelector(".ciq-select[name='periodicity']");
			const periodicities = config.menuPeriodicity
				? config.menuPeriodicity
				: (function () {
						const periodicity = stx.getPeriodicity();
						return [
							{
								value: periodicity,
								label: `${periodicity.period}, ${periodicity.timeUnit}`
							}
						];
				  })();
			periodicities
				.filter((m) => m.label)
				.forEach((p) => {
					const opt = document.createElement("option");
					opt.value = opt.innerText = p.label;
					opt.value = JSON.stringify(p.value);
					periodicity.append(opt);
				});

			const fieldsSection = frag.querySelector(".data-fields ul");
			let { fields = [] } = reader;

			fields.forEach((cell) => {
				const item = document.createElement("li");
				item.innerText = cell;
				fieldsSection.append(item);
			});

			const display = frag.querySelector("[name=display]");
			const secondaryOptions = frag.querySelector(".secondary-options");

			if (!main) main = true;
			else {
				display.value = "secondary";
				secondaryOptions.style.display = "block";
			}

			display.addEventListener("change", function (e) {
				let show = this.value.toLowerCase() === "secondary";
				secondaryOptions.style.display = show ? "block" : "none";
				keystrokeHub.highlightAlign();
			});

			frag.querySelectorAll(".abort").forEach(setAbortFunc(fileName));

			CIQ.UI.pickSwatchColor(this, frag.querySelector("cq-swatch"));
			this.form.append(frag);

			// Prevent accidental submit from inputs
			this.form.querySelectorAll("input:not([type=submit]").forEach((input) => {
				input.addEventListener("keypress", (e) => {
					if (e.key === "Enter") e.preventDefault();
				});
			});
		}

		this.importBtn.style.display = "inline";
		CIQ.UI.containerExecute(this, "resize");
		this.resetTabSelect();
	}

	/**
	 * Sets UIContext for the component
	 * @param {CIQ.UI.UIContext} context UIContext for the given chart
	 * @memberof WebComponents.cq-data-dialog
	 */
	setContext(context) {
		this.context = context;
		this.addDefaultMarkup();

		this.form = this.querySelector("form");
		this.fileInput = this.querySelector("input[type=file]");
		this.loadDataBtn = this.querySelector("button.load");
		this.importBtn = this.querySelector("button.import");
		this.controls = this.querySelector("div.ciq-dialog-cntrls");

		this.warning = this.querySelector(".invalid-warning");
		this.warningTitle = this.warning.querySelector(".invalid-warning-title");
		this.warningText = this.warning.querySelector(".invalid-warning-text");

		this.form.dialog = this;
		this.form.addEventListener("submit", this.importData);
		this.form.addEventListener("change", this.validate());

		this.fileInput.addEventListener("change", this.validateFileInput());

		this.keystrokeHub = context.uiManager.keystrokeHub;
	}

	/**
	 * Custom validate method for the determining whether the data is ready to be submitted for import.
	 * ** NOTE** this validate method is for the form, not for validating files set on input
	 * @returns boolean valid
	 */
	validate() {
		const self = this;
		return function (e) {
			self.getFormData();
			let isMain;
			let valid = true;
			for (const entry of self.fileMap) {
				const [, reader] = entry;
				const { formData, fields } = reader;
				const display = formData.get("display");
				const periodicity = formData.get("periodicity");

				let validFields =
					(fields.includes("DT") || fields.includes("Date")) &&
					fields.some((f) => f === "Close" || f === "Value");

				if (!validFields) {
					valid = false;
					return reportValidity(
						{
							messageTitle: "Invalid Data fields",
							messageText:
								'Your data contains invalid schema to display. It must include a "DT" column and either a "Close" or "Value" column.'
						},
						valid
					);
				}

				if (display === "secondary") {
					if (
						!CIQ.equals(
							JSON.parse(periodicity),
							self.context.stx.getPeriodicity()
						)
					) {
						valid = false;
						return reportValidity(
							{
								messageTitle: "Mis-matched periodicities:",
								messageText:
									"Having mixed periodicities can result in chart displaying incorrect time scales. Check your data and try again."
							},
							valid
						);
					}
				} else {
					if (isMain) {
						valid = false;
						return reportValidity(
							{
								messageTitle: "Multiple Main series",
								messageText:
									"Detected multiple data files set to display main data. Only one data file can be main."
							},
							valid
						);
					}
					isMain = true;
				}
			}

			return reportValidity({ messageTitle: "", messageText: "" }, valid);

			function reportValidity({ messageTitle, messageText }, valid) {
				self.warn(messageTitle, messageText, valid);
				self.resetTabSelect();
				return valid;
			}
		};
	}

	/**
	 * Validation function for File Input.
	 * **NOTE** Not the same as the validation for the form
	 * @returns function Funtion that runs on file input change event
	 * @memberof WebComponents.cq-data-dialog
	 */
	validateFileInput() {
		const self = this;
		return function (e) {
			// Determine whether called by the dialog or the input then set files
			const files = self.files || self.fileInput.files;

			let valid = true,
				title = "",
				message = "";
			Object.values(files).forEach(function (file) {
				const { name } = file;
				const extension =
					name.lastIndexOf(".") > 0 &&
					name.slice(name.lastIndexOf("."), name.length);
				if (
					(extension && extension !== ".csv") ||
					DataDialog.mimeTypes.indexOf(file.type) == -1
				) {
					title = "Invalid File Type";
					message =
						"Data Importer requires a text/csv file to work. Please select a CSV file.";
					valid = false;
				}
			});

			if (!files.length) {
				title = `Please select a file!`;
				message =
					"Data Importer requires a text/csv file to work. Please select a CSV file.";
				valid = false;
			}
			self.warn(title, message, valid);
			self.resetTabSelect();
		};
	}

	/**
	 * Displays or clears warning messages based on the validity of the form.
	 * @param {string} title Title text of warning to display.
	 * @param {string} text Body text of warning to display.
	 * @param {boolean} display Should be valid property from validiity
	 * @memberof WebComponents.cq-data-dialog
	 */
	warn(title, text, valid) {
		this.warningTitle.innerText = title;
		this.warningText.innerText = text;
		if (!valid) this.warning.setAttribute("cq-active", true);
		else this.warning.removeAttribute("cq-active");
	}
}

/**
 * Valid MIME types that the DataDialog will recognize.
 * By default the file input only accepts the extensions listed here.
 *
 * For more information about extension and MIME types see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * @memberOf WebComponents.cq-data-dialog
 * @static
 * @type array
 * @alias mimeTypes
 */
DataDialog.mimeTypes = [
	"text/csv",
	"application/csv",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.ms-excel"
];

DataDialog.markup = `
<h4 class="title">Import Data</h4>
<cq-close></cq-close>
<cq-scroll cq-no-maximize>
	<cq-section class="loader">
		<label for="fileSelector">Choose one or more CSV files to load data into the chart:</label>
		<input name="fileSelector" type="file" multiple accept=".csv" />
	</cq-section>
	<cq-section class="ciq-dialog-cntrls">
		<button class="ciq-btn load" stxtap="loadData()">Open Files</button>
	</cq-section>
	<cq-section>
		<form class="import-data" id="data-wizard"></form>
	</cq-section>
	<template class="table">
		<cq-section class="data-table">
			<fieldset form="data-wizard" name="file-fields">
			<legend class="file-name"></legend>
			<div class="data-name"><label for="name">Name for imported data:</label><input type="text" name="name" required /></div>
			<div class="data-periodicity">
				<label for="periodicity">Data Periodicity:</label>
				<span class="select-holder">
					<select name="periodicity" class="ciq-select" form="data-wizard" required>
				</span>
				</select>
			</div>
			<div class="data-fields">
				<label>Data Fields:</label>
				<ul class="content-justify-end"></ul>
			</div>
			<div class="data-display">
				<label>Display As:</label>
				<span class="select-holder">
					<select name="display" form="data-wizard" class="ciq-select" required>
					<option value="main">Main Series</option>
					<option value="secondary">Secondary Series</option>
					</select>
				</span>
			</div>
			<div class="content-justify-end">
				<fieldset class="secondary-options">
				<legend>Secondary Series Options:</legend>
					<div>
						<label>Add in new panel: </label><input type="checkbox" name="panel" />
					</div>
					<div>
						<label>Color: </label><cq-swatch name="color"></cq-swatch>
					</div>
				</fieldset>
			</div>
		</div>
		<div class="buttons">
			<button class="ciq-btn-negative abort">Remove</button>
		</div>
		</fieldset>
		</cq-section>
	</template>
	<cq-section>
		<div class="invalid-warning">
			<div class="invalid-warning-title"></div>
			<div class="invalid-warning-text"></div>
		</div>
	</cq-section>
	<cq-section class="ciq-dialog-cntrls">
		<button class="ciq-btn import" form="data-wizard" type="submit">Confirm</button>
	</cq-section>

</cq-scroll>
`;

CIQ.UI.addComponentDefinition("cq-data-dialog", DataDialog);
