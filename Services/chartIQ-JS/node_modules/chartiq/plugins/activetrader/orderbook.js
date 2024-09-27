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
 * <h4>&lt;cq-orderbook&gt;</h4>
 *
 * Displays a table of Level 2 Bid/Ask information from {@link CIQ.ChartEngine.Chart#currentMarketData}.
 *
 * **Requires [Active Trader]{@link CIQ.MarketDepth} plugin. See {@link CIQ.ChartEngine#updateCurrentMarketData} for data requirements**
 *
 * This component will take up 100% of its parent element.
 *
 * Use component's open() and close() methods to show and hide.
 *
 * _**Attributes**_
 *
 * The following attributes are supported:
 * | attribute       | description |
 * | :-------------- | :---------- |
 * | cq-active       | Reflects/Drives the shown/hidden status of the component. |
 * | cq-close        | Adds a cq-close component to control visibility. |
 * | cq-show-totals  | Displays Total Size and Total Amount columns.  Omit this attribute for a more condensed book. |
 * | cq-size-shading | Proportionally shades the rows with the size magnitude. |
 *
 * There are two ways to proportionally shade the rows with the size magnitude:
 * 1. Use attribute `cq-size-shading` which uses a linear-gradient (used in our sample).
 * 2. If that does not work on your required browsers, the second method is to include the `<div col="shading"></div>` cell within the template.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component whenever a price row is clicked, opening a trade form when TFC (Trade From Chart) is enabled.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "trade" |
 * | action | "click" |
 * | price | _order price_ |
 * | side | "buy", "sell" |
 *
 *
 * A custom event will be emitted by the component when it is opened or closed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "trigger" |
 * | effect | "open", "close" |
 * | action | null |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * Working example:<br>
 * <iframe width="100%" height="500" scrolling="no" seamless="seamless" align="top" style="float:top" src="https://jsfiddle.net/chartiq/L30hna2s/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="1"></iframe>
 *
 * @example
 * <!-- Define your chart context. -->
 * <cq-context>
 * <!-- Define your UI manager component. -->
 * <cq-ui-manager></cq-ui-manager>
 * <!-- This is your chart container. Position it anywhere and in any way that you wish on your webpage. Make position style=relative. -->
 * <div class="chartContainer" style="width:800px;height:460px;position:relative;">
 *     <cq-orderbook cq-active></cq-orderbook>
 * </div>
 * </cq-context>
 *
 * @example
 * // Once the component is added to the HTML it can be activated and data loaded as follows:
 * let stxx = new CIQ.ChartEngine({container:document.querySelector(".chartContainer")});
 * new CIQ.UI.Context(stxx, document.querySelector("cq-context,[cq-context]"));
 * stxx.updateCurrentMarketData(yourL2Data); // Call this every time you want refresh.
 *
 * @alias WebComponents.Orderbook
 * @extends CIQ.UI.ModalTag
 * @class
 * @protected
 * @since
 * - 6.1.0
 * - 9.1.0 Added emitter.
 */
class Orderbook extends CIQ.UI.ModalTag {
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Orderbook);
		this.constructor = Orderbook;
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
		}
		super.disconnectedCallback();
	}

	/**
	 * Hides the table.
	 */
	close() {
		this.removeAttribute("cq-active");
		if (this.toggle) {
			if (!this.toggle.value) return;
			this.toggle.value = false;
		}
		this.emitCustomEvent({
			action: null,
			effect: "close"
		});
	}

	/**
	 * Converts the data from the L2 object into a structure to be consumedd by the orderbook.
	 *
	 * @param {array[]} data Data consisting of an array of [price, size] pairs.
	 * @return {object[]} Records with price, size, cumulative size, amount, and cumulative amount.
	 */
	createMatrix(data) {
		const res = [];
		let lastRecord;
		for (let i = 0; i < data.length; i++) {
			const d = data[i];
			if (!d[1]) continue;
			const amt = d[0] * d[1];
			lastRecord = {
				price: d[0],
				size: d[1],
				cum_size: d[1] + (lastRecord ? lastRecord.cum_size : 0),
				amount: amt,
				cum_amount: amt + (lastRecord ? lastRecord.cum_amount : 0)
			};
			res.push(lastRecord);
		}
		return res;
	}

	/**
	 * Creates the orderbook table.
	 *
	 * @param {array[]} data Trade array, each record is an array itself of at least 2 elements:
	 * 			The first element is the trade size, the second is trade price, e.g. [2000, 13.94].
	 * 			The `data` parameter is therefore an array of these pairs.
	 * @param {HTMLElement} selector Selector of table body element.
	 * @param {boolean} reverseOrder True if order of table is reversed (usually for bids table)
	 * @return {Promise<void>}
	 */
	createTable(data, selector, reverseOrder) {
		return new Promise((resolve) => {
			const myTemplate = this.querySelector("template");
			const side = this.querySelector(selector);
			if (!side) return;

			const rows = side.querySelectorAll("cq-item");
			const self = this;

			function setHtml(i) {
				return function (child) {
					const myCol = child.getAttribute("col");
					if (myCol && data[i][myCol] !== undefined) {
						let val = Number(data[i][myCol].toFixed(8)); // remove roundoff error
						let { stx } = self.context;
						if (stx.marketDepth) stx = stx.marketDepth.marketDepth;
						val = stx.formatPrice(val, stx.chart.panel);
						if (child.hasAttribute("cq-translate-original"))
							child.removeAttribute("cq-translate-original");
						child.innerHTML = val;
					}
				};
			}

			function order(selector) {
				return function (e) {
					const price = e.currentTarget.getAttribute("price");
					if (!price && price !== 0) return;
					const { config, stx } = self.context;
					const { tfc } = stx;
					let side = "";
					if (tfc) {
						const channel = (config.channels || {}).tfc || "channel.tfc";
						self.channelWrite(channel, true, stx);
						if (selector == "cq-orderbook-bids") side = "buy";
						else if (selector == "cq-orderbook-asks") side = "sell";
						if (side) tfc.newTrade("enable" + CIQ.capitalize(side));
						tfc.positionCenterLine(Number(price));
					}
					self.emitCustomEvent({
						effect: "trade",
						detail: { price, side }
					});
				};
			}

			function setWidth() {
				return function (child, i, arr) {
					child.style.width =
						CIQ.elementDimensions(child.parentElement, { padding: 1 }).width /
							arr.length +
						"px";
				};
			}

			function cleanup() {
				// this removes any extra rows from the end.
				[
					...side.querySelectorAll(
						"cq-item:nth-last-child(-n+" +
							(side.children.length - data.length).toString() +
							")"
					)
				].forEach((item) => item.remove());
				const scrolls = self.querySelectorAll("cq-scroll");
				[...scrolls].forEach(function (scroll) {
					scroll.resize();
				});

				resolve();
			}

			function processEntries(i) {
				const t0 = new Date().getTime();
				const nextFrame = (i) => () => processEntries(i);

				for (; data[i]; i++) {
					// don't lock up thread for more than 5ms at a time
					const tooLong = new Date().getTime() - t0 > 5;
					if (tooLong)
						return self.context.stx.ownerWindow.requestAnimationFrame(
							nextFrame(i)
						);

					let row = rows[i];
					let children;

					if (!row) {
						row = CIQ.UI.makeFromTemplate(myTemplate, side)[0];
						if (reverseOrder) {
							for (let i = 1; i < row.childNodes.length; i++) {
								row.insertBefore(row.childNodes[i], row.firstChild);
							}
						}
						children = [...row.children].filter(
							(child) => !child.matches('[col="shading"]')
						);
						children.forEach(setWidth());

						if (i === 0) {
							// readjust headers only if there's data
							const headers = self.querySelectorAll("[cq-orderbook-header]");
							for (const header of headers) {
								[...header.children]
									.filter((child) => !child.matches('[col="shading"]'))
									.forEach(setWidth());
							}
						}
						row.selectFC = order(selector);
						CIQ.UI.stxtap(row, row.selectFC);
					}

					children = [...row.children].filter(
						(child) => !child.matches('[col="shading"]')
					);
					children.forEach(setHtml(i));
					row.setAttribute("price", data[i].price);

					const percentSize =
						(100 * data[i].size) / data[data.length - 1].cum_size + "%";

					// using linear-gradient is ideal, but it doesn't shade the row in
					// IE Edge or Safari - the cells get the shading instead.  Too bad.
					if (row.hasAttribute("cq-size-shading")) {
						const gcs = getComputedStyle(row);
						row.style.background =
							"linear-gradient(" +
							(reverseOrder
								? "to right, " + gcs["border-left-color"]
								: "to left, " + gcs["border-right-color"]) +
							" " +
							percentSize +
							", transparent " +
							percentSize +
							", transparent)";
					}
					// use absolutely positioned cell instead
					const shadeCell = row.querySelector('[col="shading"]');
					if (shadeCell) shadeCell.style.width = percentSize;
				}

				// if we got past the for loop without returning with requestAnimationFrame
				// that means we got through all of data and can clean up unnecessary rows
				cleanup();
			}

			self.context.stx.ownerWindow.requestAnimationFrame(() =>
				processEntries(0)
			);
		});
	}

	/**
	 * Shows the table.
	 */
	open() {
		this.setAttribute("cq-active", true);
		this.emitCustomEvent({
			action: null,
			effect: "open"
		});
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
			setTimeout(() => this.update({ obj }));
		};
		CIQ.UI.observeProperty(
			"touched",
			stx.chart.currentMarketData,
			this.listener
		);
		this.addDefaultMarkup(this, this.getMarkup());

		const myTemplate = this.querySelector("template");
		const tables = this.querySelectorAll("cq-orderbook-table");
		[...tables].forEach((table) => {
			const header = CIQ.UI.makeFromTemplate(myTemplate)[0];
			if (!header) return;
			if (table.hasAttribute("reverse")) {
				for (let i = 1; i < header.childNodes.length; i++) {
					header.insertBefore(header.childNodes[i], header.firstChild);
				}
			}
			header.setAttribute("cq-orderbook-header", true);
			table.insertBefore(header, table.firstChild);
			// initialize header width at 100/n% width where n is number of columns
			const children = [...header.children].filter(
					(child) => !child.matches('[col="shading"]')
				),
				childCount = children.length;
			children.forEach((child) => (child.style.width = 100 / childCount + "%"));
		});
	}

	/**
	 * Updates orderbook with new L2 dataset.
	 *
	 * @param {object} params
	 * @param {object} params.obj
	 * @param {object} params.obj.BidL2
	 * @param {array[]} params.obj.BidL2.Price_Size Array of price and size data for bid
	 * @param {object} params.obj.AskL2
	 * @param {array[]} params.obj.AskL2.Price_Size Array of price and size data for ask
	 * @async
	 */
	async update({ obj }) {
		if (!CIQ.trulyVisible(this) || this.creatingTables) return;

		const bids = obj.BidL2 && obj.BidL2.Price_Size.slice();
		const asks = obj.AskL2 && obj.AskL2.Price_Size.slice();
		if (!(bids && asks)) return;

		const sortFn = (a, b) => (a[0] < b[0] ? -1 : 1);
		const bidData = this.createMatrix(bids.sort(sortFn).reverse());
		const askData = this.createMatrix(asks.sort(sortFn));
		const tables = [...this.querySelectorAll("cq-orderbook-table")];
		if (!tables.length) return;
		let bidsTable, asksTable;
		tables.forEach((table) => {
			if (table.querySelector("cq-orderbook-bids")) bidsTable = table;
			else if (table.querySelector("cq-orderbook-asks")) asksTable = table;
		});

		this.creatingTables = true;

		if (bidsTable) {
			await this.createTable(
				bidData,
				"cq-orderbook-bids",
				bidsTable.hasAttribute("reverse")
			);
		}

		if (asksTable) {
			await this.createTable(
				askData,
				"cq-orderbook-asks",
				asksTable.hasAttribute("reverse")
			);
		}

		this.creatingTables = false;
	}

	/**
	 * Returns the inner HTML of the component when the component is attached to the DOM without any existing inner HTML.
	 *
	 * @return {String} HTML markup.
	 */
	getMarkup() {
		const close = this.hasAttribute("cq-close");
		const includeTotals = this.hasAttribute("cq-show-totals");
		return this.constructor.markup
			.replace("{{close}}", close ? "<cq-close></cq-close>" : "")
			.replace(
				"{{totalsize}}",
				includeTotals ? '<div col="cum_size">Total Size</div>' : ""
			)
			.replace(
				"{{totalamount}}",
				includeTotals ? '<div col="cum_amount">Total Amount</div>' : ""
			);
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * This markup contains placeholder values which the component replaces with values from its attributes.
 * Variables are represented in double curly-braces, for example: `{{text}}`.
 * The following variables are defined:
 * | variable    | source |
 * | :---------- | :----- |
 * | close       | from attribute value |
 * | totalsize   | computed |
 * | totalamount | computed |
 *
 * @static
 * @type {String}
 */
Orderbook.markup = `
		{{close}}
		<cq-orderbook-table reverse role="table" aria-label="Bids">
			<cq-scroll cq-no-claim>
				<cq-orderbook-bids role="rowgroup"></cq-orderbook-bids>
			</cq-scroll>
		</cq-orderbook-table>
		<cq-orderbook-table role="table" aria-label="Asks">
			<cq-scroll cq-no-claim>
				<cq-orderbook-asks role="rowgroup"></cq-orderbook-asks>
			</cq-scroll>
		</cq-orderbook-table>
		<template>
			<cq-item cq-size-shading role="row">
				<div col="price" role="cell">Price</div>
				<div col="size" role="cell">Size</div>
				{{totalsize}}
				<div col="amount" role="cell">Amount</div>
				{{totalamount}}
				<!--<div col="shading"></div>-->
			</cq-item>
		</template>
	`;
CIQ.UI.addComponentDefinition("cq-orderbook", Orderbook);
