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


/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-grid-size-picker&gt;</h4>
 *
 * Creates a `<cq-grid-size-picker>` web component.
 *
 * This component supports the following attributes:
 * | attribute | description |
 * | :-------- | :---------- |
 * | maxrows   | Maximum number of rows allowed |
 * | maxcols   | Maximum number of columns allowed |
 * | resize    | Set to fixed will always have picker table at fixed max size |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a template or new size is picked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter  | this component |
 * | cause    | "useraction" |
 * | effect   | "update-grid" |
 * | action   | "click" |
 * | columns  | number of columns |
 * | rows     | number of rows |
 * | template | selected template |
 *
 * @example
 *		<cq-grid-size-picker maxrows="5" maxcols="5"></cq-grid-size-picker>
 *
 * @alias WebComponents.GridSizePicker
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since 7.2.0
 * @since 9.3.0 Added new emitter
 */
class GridSizePicker extends CIQ.UI.BaseComponent {
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		this.innerHTML = this.render();
		this.columns = 2;
		this.rows = 2;
		this.generateTable(this.columns, this.rows);
		this.highlightTable(this.columns - 1, this.rows - 1);
		this.querySelector("table").addEventListener("mouseleave", () => {
			this.generateTable(this.columns + 1, this.rows + 1);
			this.highlightTable(this.columns, this.rows);
		});

		const { srMapping = {} } = this.constructor;

		const createGridLayoutButton = (layoutClass) => {
			let elem = document.createElement("li");
			elem.className = "ciq-multi-chart-button " + layoutClass;
			const srContent = srMapping[layoutClass] || "Custom Template";
			if (srContent) elem.setAttribute("aria-label", srContent);
			elem.setAttribute("role", "menuitem");
			CIQ.safeClickTouch(
				elem,
				function (event) {
					this.triggerUpdateGridEvent({
						template: layoutClass
					});
				}.bind(this)
			);
			return elem;
		};

		if (this.templates) {
			const layoutPicker = this.querySelector(".ciq-grid-layout-picker");
			this.templates.split(" ").forEach((template) => {
				layoutPicker.appendChild(createGridLayoutButton(template));
			});
			// Add empty div elements to fill in the layout icon.
			layoutPicker.childNodes.forEach((elem) => {
				const elemStyles = getComputedStyle(elem);
				let cellCt = 0;
				if (
					elemStyles.gridTemplateAreas &&
					elemStyles.gridTemplateAreas != "none"
				) {
					let uniqueTemplateAreas = [
						...new Set(elemStyles.gridTemplateAreas.match(/([a-z])+/gi))
					];
					cellCt = uniqueTemplateAreas.length;
				} else if (elemStyles.getPropertyValue("--grid-dimension")) {
					cellCt =
						parseInt(elemStyles.getPropertyValue("--grid-dimension")) || 0;
					// It will always have an extra chart initially, spanning the full width
					cellCt++;
				}

				for (let idx = 0; idx < cellCt; idx++) {
					elem.innerHTML += "<div></div>";
				}
			});
		}

		this.setAttribute("role", "menu");
		this.setAttribute("aria-label", "Multichart grid selector");
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, GridSizePicker);
		this.constructor = GridSizePicker;
	}

	get maxcols() {
		return this.getAttribute("maxcols") || 4;
	}

	set maxcols(newValue) {
		this.setAttribute("maxcols", newValue);
	}

	get maxrows() {
		return this.getAttribute("maxrows") || 4;
	}

	set maxrows(newValue) {
		this.setAttribute("maxrows", newValue);
	}

	get templates() {
		return this.getAttribute("templates") || "";
	}

	set templates(newValue) {
		this.setAttribute("templates", newValue);
	}

	get resize() {
		return this.getAttribute("resize") || "";
	}

	set resize(newValue) {
		this.setAttribute("resize", newValue);
	}

	/**
	 * Generates grid size picker table
	 *
	 * @param {number} columns Table column count
	 * @param {number} rows Table row count
	 *
	 * @tsmember WebComponents.GridSizePicker
	 */
	generateTable(columns, rows) {
		const self = this;
		if (this.resize == "fixed") {
			columns = this.maxcols;
			rows = this.maxrows;
		}
		function mouseEnterFcn(event) {
			const { column, row } = event.target.dataset;
			// Clamp the rows and cols to their max setting before generating the new table
			let newColCt = parseInt(column) + 1;
			if (newColCt > self.maxcols) newColCt = self.maxcols;
			let newRowCt = parseInt(row) + 1;
			if (newRowCt > self.maxrows) newRowCt = self.maxrows;

			if (this.resize != "fixed") self.generateTable(newColCt, newRowCt);
			// Hilite based on the selected cell, not the expected grid size
			self.highlightTable(parseInt(column), parseInt(row));
		}

		let parentElem = this.querySelector("table");

		if (!parentElem) return;
		// Clear out the existing table
		this.cleanTable(columns, rows);

		columns = columns || 1;
		rows = rows || 1;

		for (let idx = 1; idx <= Math.min(rows, this.maxrows); idx++) {
			let tmpRow;
			if (parentElem.childNodes[idx - 1]) {
				tmpRow = parentElem.childNodes[idx - 1];
			} else {
				tmpRow = document.createElement("tr");
				parentElem.appendChild(tmpRow);
			}
			for (let jdx = 1; jdx <= Math.min(columns, this.maxcols); jdx++) {
				if (!tmpRow.childNodes[jdx - 1]) {
					let tmpCell = document.createElement("td");
					tmpCell.dataset.row = idx;
					tmpCell.dataset.column = jdx;
					tmpCell.dataset.rows = rows;
					tmpCell.dataset.columns = columns;
					tmpCell.addEventListener("mouseenter", mouseEnterFcn);
					tmpCell.setAttribute(
						"aria-label",
						`${idx} row${idx - 1 ? "s" : ""} ${jdx} column${jdx - 1 ? "s" : ""}`
					);
					tmpCell.setAttribute("role", "menuitem");
					tmpCell.addEventListener(
						"click",
						function (event) {
							this.triggerUpdateGridEvent({
								columns: event.target.dataset.column,
								rows: event.target.dataset.row
							});
						}.bind(this)
					);

					tmpCell.appendChild(document.createElement("div"));

					tmpRow.appendChild(tmpCell);
				}
			}
		}
	}

	/**
	 * Triggers grid upgrade event.
	 *
	 * @param {object} params Event parameters
	 * @param {string|number} params.columns Grid columns
	 * @param {string|number} params.rows Grid columns
	 * @param {string|number} params.template Grid template
	 *
	 * @private
	 *
	 * @tsmember WebComponents.GridSizePicker
	 */
	triggerUpdateGridEvent({ columns, rows, template }) {
		this.columns = +columns;
		this.rows = +rows;
		this.template = template || "";
		this.highlightTable(this.columns, this.rows);
		this.highlightTemplate();
		this.emitCustomEvent({
			effect: "update-grid",
			detail: {
				columns: columns,
				rows: rows,
				template: template
			}
		});
		const context = this.closest("cq-context, [cq-context]");
		context.dispatchEvent(
			new CustomEvent("update-grid", {
				detail: {
					columns: columns,
					rows: rows,
					template: template,
					container: this.closest("cq-context")
				},
				bubbles: true,
				composed: true
			})
		);
	}

	/**
	 * Highlights provided number of rows and columns
	 *
	 * @param {number} columns Columns to highlight
	 * @param {number} rows Rows to highlight
	 *
	 * @tsmember WebComponents.GridSizePicker
	 */
	highlightTable(columns, rows) {
		for (let gridCell of this.querySelectorAll("td")) {
			if (gridCell.dataset.column <= columns && gridCell.dataset.row <= rows) {
				gridCell.classList.add("highlight");
			} else {
				gridCell.classList.remove("highlight");
			}
		}
		const rowEl = this.querySelector(".row.count");
		const multEl = this.querySelector(".multiply");
		const hideRows = this.maxrows < 2;
		rowEl.style.display = hideRows ? "none" : "";
		multEl.style.display = hideRows ? "none" : "";
		rowEl.innerHTML = rows;
		this.querySelector(".column.count").innerHTML = columns;
	}

	/**
	 * Applies highlight on the idenified template
	 *
	 * @param {string|undefined} gridTemplate Template to highlight
	 *
	 * @tsmember WebComponents.GridSizePicker
	 */
	highlightTemplate(gridTemplate) {
		if (gridTemplate) this.template = gridTemplate;
		const templateButtons = this.querySelectorAll(
			".ciq-grid-layout-picker .ciq-multi-chart-button"
		);
		templateButtons.forEach((button) => {
			button.classList.remove("active");
		});
		if (this.template) {
			const activeButton = Array.from(templateButtons).find((button) =>
				button.classList.contains(this.template)
			);
			if (activeButton) activeButton.classList.add("active");
		}
	}

	/**
	 * Removes unused rows and columns in the grid size picker table
	 *
	 * @param {number} columns Columns to keep
	 * @param {number} rows Rows to keep
	 *
	 * @tsmember WebComponents.GridSizePicker
	 */
	cleanTable(columns, rows) {
		let element = this.querySelector("table");
		// Remove unused rows
		while (element.childNodes.length > rows) {
			element.removeChild(element.lastChild);
		}
		// Remove unused columns from remaining rows
		for (let rowNode of element.childNodes) {
			while (rowNode.childNodes.length > columns) {
				rowNode.removeChild(rowNode.lastChild);
			}
		}
	}

	/**
	 * Returns the component content as a string to render it
	 *
	 * @returns {string} Component content
	 * @tsmember WebComponents.GridSizePicker
	 */
	render() {
		return `
				<ul class="ciq-grid-layout-picker"></ul>
				<cq-separator></cq-separator>
				<table class="grid-size-picker"></table>
				<p><span class="row count">1</span> <span class="multiply">+</span> <span class="column count">1</span></p>
			`;
	}
}

/**
 * Grid template mapping to sceen reader content
 *
 * @static
 * @type {string}
 *
 * @tsmember WebComponents.GridSizePicker
 * @since 9.3.0
 */
GridSizePicker.srMapping = {
	"ciq-auto-grid-1": "Top 1 chart, bottom 2 charts",
	"ciq-auto-grid-2": "Top 2 charts, bottom 1 chart",
	"ciq-auto-grid-3": "Left 1 chart, right 2 charts",
	"ciq-auto-grid-4": "Left 2 charts, right 1 chart",
	"ciq-auto-grid-5": "Top 1 chart, bottom 3 charts",
	"ciq-auto-grid-6": "Top 3 charts, bottom 1 chart",
	"ciq-auto-grid-7": "Left 1 chart, right 3 charts",
	"ciq-auto-grid-8": "Left 3 charts, right 1 chart",
	"ciq-auto-grid-9": "Top 1 chart, bottom 4 charts",
	"ciq-auto-grid-10": "Top 4 charts, bottom 1 chart",
	"ciq-auto-grid-11": "Left 1 chart, right 4 charts",
	"ciq-auto-grid-12": "Left 4 charts, right 1 chart"
};

CIQ.UI.addComponentDefinition("cq-grid-size-picker", GridSizePicker);
