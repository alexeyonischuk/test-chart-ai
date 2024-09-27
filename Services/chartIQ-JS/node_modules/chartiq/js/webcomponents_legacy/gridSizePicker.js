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
 * Creates a `<cq-grid-size-picker>` web component.
 *
 * Attributes:
 * <ul>
 * 	<li>maxrows: number &mdash; Maximum number of rows allowed</li>
 * 	<li>maxcols: number &mdash; Maximum number of columns allowed</li>
 * </ul>
 * 
 * Please note that this web component uses 'Symbol' and 'Symbol.Iterator' to create the table dynamically.
 * This syntax is not supported on older browsers such as in IE 11 or Chrome 49.
 *
 * @namespace WebComponents.cq-grid-size-picker
 * @example
      <cq-grid-size-picker maxrows="5" maxcols="5"></cq-grid-size-picker>
 * @since 7.2.0
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

		const createGridLayoutButton = (layoutClass) => {
			let elem = document.createElement("div");
			elem.className = "ciq-multi-chart-button " + layoutClass;
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

	generateTable(columns, rows) {
		const self = this;
		if (this.resize == "fixed") {
			columns = this.maxcols;
			rows = this.maxrows;
		}
		function mouseEnterFcn(event) {
			// Clamp the rows and cols to their max setting before generating the new table
			let newColCt = parseInt(event.target.dataset.column) + 1;
			if (newColCt > self.maxcols) newColCt = self.maxcols;
			let newRowCt = parseInt(event.target.dataset.row) + 1;
			if (newRowCt > self.maxrows) newRowCt = self.maxrows;

			if (this.resize != "fixed") self.generateTable(newColCt, newRowCt);
			// Hilite based on the selected cell, not the expected grid size
			self.highlightTable(
				parseInt(event.target.dataset.column),
				parseInt(event.target.dataset.row)
			);
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

	triggerUpdateGridEvent({ columns, rows, template }) {
		this.columns = +columns;
		this.rows = +rows;
		this.template = template || "";
		this.highlightTable(this.columns, this.rows);
		this.highlightTemplate();
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

	render() {
		return `
				<style>

					.ciq-grid-layout-picker {
						display: grid;
						grid-template-columns: 1fr 1fr 1fr 1fr;
						grid-gap: 10px;
						margin: 5px 0;
					}

					cq-grid-size-picker, cq-grid-size-picker tr, cq-grid-size-picker td{
						display: block;
					}

					cq-grid-size-picker tr{
						margin: 0;
						padding: 0;
						white-space: nowrap;
						line-height: 0;
					}

					cq-grid-size-picker td{
						display: inline-block;
						height: 19px;
						width: 19px;
						margin: 0;
						padding: 0;
						text-align: center;
					}

					cq-grid-size-picker td div{
						pointer-events: none;
						display: inline-block;
						height: 15px;
						width: 15px;
						margin: 2px;
						padding: 0;
						border: solid 1px #ccc;
						border-color: var(--grid-size-border-color, #ccc);
						background: #eee; /* keep a hard coded style in case the var function is unavailable */
						background-color: var(--grid-size-background-color, #eee);
						text-align: center;
					}

					cq-grid-size-picker td:hover div, cq-grid-size-picker td.highlight div{
						border-color: #666;
						border-color: var(--grid-size-border-hl-color, #666);
						background: #ccc;
						background-color: var(--grid-size-background-hl-color, #ccc);
					}

					cq-grid-size-picker p{
						width:100%;
						line-height: 1em;
						text-align: center;
						margin: 5px 0;
					}

					cq-grid-size-picker .multiply{
						transform: rotate(45deg);
						display: inline-block;
					}
				</style>

				<div class="ciq-grid-layout-picker"></div>
				<cq-separator></cq-separator>
				<table class="grid-size-picker"></table>
				<p><span class="row count">1</span> <span class="multiply">+</span> <span class="column count">1</span></p>
			`;
	}
}

CIQ.UI.addComponentDefinition("cq-grid-size-picker", GridSizePicker);
