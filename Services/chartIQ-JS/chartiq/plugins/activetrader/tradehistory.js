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


import { CIQ } from "../../js/componentUI.js";

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-tradehistory&gt;</h4>
 *
 * Displays a table of trade information from {@link CIQ.ChartEngine.Chart#currentMarketData}.
 *
 * The following data should exist in the data record sent to either {@link CIQ.ChartEngine#updateCurrentMarketData} or {@link CIQ.ChartEngine#updateChartData}:
 * - Last or Close
 * - LastSize
 * - LastTime (this will default to DT if omitted)
 *
 * **Requires [Active Trader]{@link CIQ.MarketDepth} plugin. See {@link CIQ.ChartEngine#updateCurrentMarketData} for data requirements**
 *
 * This component will take up 100% of its parent element.
 *
 * Use component's open() and close() methods to show and hide.
 *
 * _**Attributes**_
 *
 * The following attribute is supported:
 * | attribute | description |
 * | :-------- | :---------- |
 * | cq-active | Reflects/Drives the shown/hidden status of the component. |
 *
 * Visual Reference:<br>
 * ![img-tradehistory](img-tradehistory.png "img-tradehistory")
 *
 * @example
 * <!--
 * This is your chart container. Position it anywhere, and in any way that you wish on your webpage.
 * Make position relative for the chart container div element.
 * -->
 * <cq-context>
 * <cq-ui-manager></cq-ui-manager>
 * <div class="chartContainer" style="width:800px;height:460px;position:relative;">
 *     <cq-tradehistory cq-active>
 *         <cq-tradehistory-table>
 *             <cq-scroll cq-no-claim>
 *                 <cq-tradehistory-body maxrows=500></cq-tradehistory-body>
 *             </cq-scroll>
 *         </cq-tradehistory-table>
 *         <template>
 *             <cq-item>
 *                 <div col="qty">Qty</div>
 *                 <div col="price">Price</div>
 *                 <div col="amount">Amount</div>
 *             </cq-item>
 *         </template>
 *     </cq-tradehistory>
 * </div>
 * </cq-context>
 *
 * @example
 * // Once the component is added to the HTML, it can be activated, and data can be loaded as follows:
 * let stxx = new CIQ.ChartEngine({container:document.querySelector(".chartContainer")});
 * new CIQ.UI.Context(stxx, document.querySelector("cq-context,[cq-context]"));
 * stxx.updateCurrentMarketData(yourL2Data); // Call this every time you want refresh.
 *
 * @alias WebComponents.TradeHistory
 * @extends CIQ.UI.ModalTag
 * @class
 * @protected
 * @since 6.2.0
 */
class TradeHistory extends CIQ.UI.ModalTag {
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		const myTemplate = this.querySelector("template");
		const table = this.querySelector("cq-tradehistory-table");
		table.setAttribute("role", "table");

		const header = CIQ.UI.makeFromTemplate(myTemplate)[0];
		if (!header) return;
		if (table.hasAttribute("reverse")) {
			for (let i = 1; i < header.childNodes.length; i++) {
				header.insertBefore(header.childNodes[i], header.firstChild);
			}
		}
		header.setAttribute("cq-tradehistory-header", true);
		header.setAttribute("role", "row");

		const tableBody = table.querySelector("cq-tradehistory-body");
		if (tableBody) tableBody.setAttribute("role", "rowgroup");

		table.insertBefore(header, table.firstChild);
		// initialize header width at 100/n% width where n is number of columns
		const { children } = header,
			childCount = children.length;
		[...children].forEach((child) => {
			child.style.width = 100 / childCount + "%";
			child.setAttribute("role", "cell");
		});
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, TradeHistory);
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		if (this.context) {
			const { stx } = this.context;
			CIQ.UI.unobserveProperty(
				"touched",
				stx.chart.currentMarketData,
				this.listener
			);
			stx.removeEventListener("symbolChange", this.symbolChangeListener);
		}
		super.disconnectedCallback();
	}

	/**
	 * Clears all items from the table.
	 *
	 * @param {String} selector DOM selector for container including the items to be deleted.
	 */
	clearTable(selector) {
		[...this.querySelectorAll(`${selector} cq-item`)].forEach((item) =>
			item.remove()
		);
	}

	/**
	 * Hides the table.
	 */
	close() {
		this.removeAttribute("cq-active");
	}

	/**
	 * Shows the table.
	 */
	open() {
		this.setAttribute("cq-active", "true");
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 */
	setContext(context) {
		const { stx } = context;
		this.listener = ({ obj }) => {
			const last = obj.Last;
			if (!last || !last.Size) return;
			if (!CIQ.equals(last, this.lastTrade)) {
				const snapshotLast = CIQ.clone(last);
				this.lastTrade = snapshotLast;
				setTimeout(() => this.update(snapshotLast));
			}
		};

		CIQ.UI.observeProperty(
			"touched",
			stx.chart.currentMarketData,
			this.listener
		);

		this.symbolChangeListener = (obj) => {
			if (obj.action == "master" && this.symbol != obj.symbol)
				this.clearTable("cq-tradehistory-body");
			this.symbol = obj.symbol;
		};
		stx.addEventListener("symbolChange", this.symbolChangeListener);
		CIQ.addTranslatableAriaLabel(
			this.querySelector("cq-tradehistory-table"),
			stx,
			"Trade History"
		);
	}

	/**
	 * Adds a new record if the table is visible.
	 *
	 * @param {Object} last Last trade
	 * @param {Number} last.Size Size of trade
	 * @param {Number} last.Price Price of trade
	 * @param {Date} last.Timestamp Time of trade
	 */
	update(last) {
		if (!CIQ.trulyVisible(this)) return;
		const table = this.querySelector("cq-tradehistory-table");
		if (table.querySelectorAll("cq-tradehistory-body").length) {
			this.updateTableRow(
				last,
				"cq-tradehistory-body",
				table.hasAttribute("reverse")
			);
		}
	}

	/**
	 * Adds a new record to the table.  Use {@link WebComponents.TradeHistory#update} to update the table gracefully.
	 *
	 * @param {Object} data Last trade
	 * @param {Number} data.Size Size of trade
	 * @param {Number} data.Price Price of trade
	 * @param {Date} data.Timestamp Time of trade
	 * @param {HTMLElement} selector Selector of table body element.
	 *
	 */
	updateTableRow(data, selector, reverseOrder) {
		if (!data.Timestamp) return;
		const myTemplate = this.querySelector("template");
		const side = this.querySelector(selector);
		if (!side) return;
		const maxRows = side.getAttribute("maxrows");
		const { stx } = this.context;
		const { animation } = stx.layout;

		const setHtml = (record) => {
			return (row) => {
				const myCol = row.getAttribute("col");
				if (myCol && record[myCol] !== undefined) {
					let val;
					if (myCol == "time") val = record[myCol];
					else {
						val = record[myCol];
						row.setAttribute("rawval", val);
						val = Number(val.toFixed(8)); // remove roundoff error
						const myStx = stx.marketDepth ? stx.marketDepth.marketDepth : stx;
						val = myStx.formatPrice(val, myStx.chart.panel);
					}
					row.innerHTML = val;
				}
			};
		};
		let row;
		let items = side.querySelectorAll("cq-item");
		if (maxRows && maxRows == items.length) {
			row = items[maxRows - 1];
			row.remove();
		} else {
			row = CIQ.UI.makeFromTemplate(myTemplate, side)[0];
			[...row.children].forEach((child) => {
				child.setAttribute("role", "cell");
			});
			row.setAttribute("role", "row");
			if (reverseOrder) {
				for (let i = 1; i < row.childNodes.length; i++) {
					row.insertBefore(row.childNodes[i], row.firstChild);
				}
			}
		}
		let place;
		for (place = 0; place < items.length; place++) {
			if (items[place].getAttribute("ts") <= data.Timestamp) {
				break;
			}
		}
		row.removeAttribute("corrected");
		if (items.length) items[place].parentNode.insertBefore(row, items[place]);

		const children = row.children;
		const childCount = children.length;
		[...children].forEach((child) => {
			child.style.width =
				CIQ.elementDimensions(row[0], { padding: 1 }).width / childCount + "px";
			child.removeAttribute("cq-translate-original");
		});

		// readjust headers
		const headers = this.querySelector("[cq-tradehistory-header]");
		[...headers.children].forEach((child) => {
			child.style.width =
				CIQ.elementDimensions(child.parentElement, { padding: 1 }).width /
					childCount +
				"px";
		});

		[...children].forEach(
			setHtml({
				time: data.Timestamp.toLocaleTimeString({}, { hour12: false }),
				qty: data.Size,
				price: data.Price,
				amount: data.Size * data.Price
			})
		);

		row.setAttribute("price", data.Price);
		row.setAttribute("ts", data.Timestamp.getTime());

		items = side.querySelectorAll("cq-item");

		//set the price direction of this row and the row before this if applicable
		for (let idx = 0; idx < 2; idx++) {
			const _row = items[place - idx];
			const _nextRow = items[place - idx + 1];
			let dir = "";

			if (_row) {
				if (_nextRow) {
					const p1 = Number(_row.getAttribute("price")),
						p2 = Number(_nextRow.getAttribute("price"));
					dir = p1 < p2 ? "down" : p1 > p2 ? "up" : "";
				}
				_row.setAttribute("dir", dir);
				if (animation) {
					_row.setAttribute("animate", true);
					_row.addEventListener("animationend", () => {
						_row.removeAttribute("animate");
					});
				}
				if (idx) _row.setAttribute("corrected", true);
			}
		}

		// this removes any extra rows from the end.
		const scroll = this.querySelector("cq-scroll");
		if (scroll) scroll.resize();
	}
}

CIQ.UI.addComponentDefinition("cq-tradehistory", TradeHistory);
