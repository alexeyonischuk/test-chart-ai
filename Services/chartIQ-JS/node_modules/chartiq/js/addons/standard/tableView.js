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


import { CIQ as _CIQ } from "../../../js/chartiq.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Creates an overlay that displays the visible chart data segment as a table.
 *
 * The overlay includes controls that enable users to copy the table data to the clipboard or
 * download the data as a character-separated values (CSV) file. See
 * {@link TableViewBuilder.dataToCsv} for the default separator character.
 *
 * The table view can be opened using the Alt+K keystroke combination and closed using the Escape
 * key (see the `tableView` action in `hotkeyConfig.hotkeys` in *js/defaultConfiguration.js*).
 *
 * Requires *addOns.js*.
 *
 * @param {object} params Configuration parameters.
 * @param {CIQ.ChartEngine} params.stx A reference to the chart engine that contains the chart for
 * 		which the table view is created.
 * @param {string} [params.minColumnWidth="84px"] The minimum width (including units) of the
 * 		table columns. **Note:** The units can be any CSS unit acceptable by the CSS `calc`
 * 		function.
 * @param {number} [params.coverUIMaxWidth=400] The chart width (in pixels) below which the table
 * 		view covers the entire chart, including user interface elements (symbol input field,
 * 		menus, etc.). For example, if the value of this parameter is 1000, the table view covers
 * 		the entire chart area if the chart width is <= 999 pixels.
 * @param {string} [params.coverContainer] A CSS selector used to obtain the DOM element that
 * 		ultimately contains the table view; for example, ".chartContainer".
 * @param {boolean} [params.usePreviousCloseForChange=true] Indicates whether the closing price of
 * 		the previous data point should be used instead of the opening price of the current data
 * 		point to determine the amount of change for the current data point; that is,
 * 		(current close - previous close) or (current close - current open).
 * @param {object} [params.builderConfig] Optional object to configure the TableViewBuilder's static properties.
 *
 * @constructor
 * @name CIQ.TableView
 * @since
 * - 8.1.0
 * - 9.1.0 Added `builderConfig` parameter.
 *
 * @example
 * new CIQ.TableView({ stx: stxx });
 */
CIQ.TableView =
	CIQ.TableView ||
	function ({
		stx,
		minColumnWidth = "84px",
		coverUIMaxWidth = 400,
		coverContainer,
		usePreviousCloseForChange = true,
		builderConfig
	} = {}) {
		if (!stx) {
			console.warn("The TableView addon requires an stx parameter");
			return;
		}

		/**
		 * The chart engine instance that contains the chart for which the table view is created.
		 *
		 * @type CIQ.ChartEngine
		 * @memberof CIQ.TableView#
		 * @alias stx
		 * @since 8.1.0
		 */
		this.stx = stx;
		/**
		 * Toggle to display and hide additional table view columns, such as % Change and Volume.
		 *
		 * **Note:** Data in the additional columns might not be present in the chart view because
		 * the data is calculated (for example, % Change) or is not part of the standard chart
		 * display (for example, Volume &mdash; which can be displayed with the
		 * [Volume Chart]{@link CIQ.Studies.createVolumeChart} study).
		 *
		 * @type boolean
		 * @memberof CIQ.TableView#
		 * @alias viewAdditionalColumns
		 * @since 8.1.0
		 */
		this.viewAdditionalColumns = false;
		/**
		 * Minimum width of the table view columns, including units. The units can be any CSS
		 * unit acceptable by the CSS `calc` function.
		 *
		 * @type string
		 * @memberof CIQ.TableView#
		 * @alias minColumnWidth
		 * @since 8.1.0
		 */
		this.minColumnWidth = minColumnWidth;
		/**
		 * The chart width in pixels below which the table view covers the entire chart, including
		 * user interface elements, such as the menus and footer.
		 *
		 * @type number
		 * @memberof CIQ.TableView#
		 * @alias coverUIMaxWidth
		 * @since 8.1.0
		 */
		this.coverUIMaxWidth = coverUIMaxWidth;
		/**
		 * A CSS selector used to obtain the DOM element that hosts the table view.
		 *
		 * @type string
		 * @memberof CIQ.TableView#
		 * @alias coverContainer
		 * @since 8.1.0
		 */
		this.coverContainer = coverContainer;
		/**
		 * If true, the closing price of the previous data point is used instead of the opening
		 * price of the current data point to determine the amount of change for the current data
		 * point.
		 *
		 * @type boolean
		 * @memberof CIQ.TableView#
		 * @alias usePreviousCloseForChange
		 * @since 8.1.0
		 */
		this.usePreviousCloseForChange = usePreviousCloseForChange;
		/**
		 * A reference to the {@link TableViewBuilder} namespace for access to the namespace
		 * static methods.
		 *
		 * @type TableViewBuilder
		 * @tsdeclaration
		 *    public builder: typeof TableViewBuilder
		 * @memberof CIQ.TableView#
		 * @alias builder
		 * @since 8.1.0
		 */
		this.builder = Object.assign({}, TableViewBuilder, builderConfig);

		this.listeners = [];

		stx.tableView = this;
		this.cssRequired = true;

		if (CIQ.UI) {
			this.listener = ({ value: uiContext }) => {
				if (!uiContext) return;

				setTimeout(() => {
					const channel = this.subscribeToChanges(uiContext);

					// Updated hotkey alias if available to action
					const tableViewKeyEntry = CIQ.getFromNS(
						uiContext.config,
						"hotkeyConfig.hotkeys",
						[]
					).find(({ action }) => action === "tableView");
					if (tableViewKeyEntry) {
						tableViewKeyEntry.action = () => {
							const { stx: contextStx } =
								uiContext.topNode.ownerDocument.body.keystrokeHub.context;
							const { tableView } = contextStx;
							if (tableView) {
								CIQ.UI.BaseComponent.prototype.channelWrite(
									channel,
									!tableView.view,
									contextStx
								);
								return true;
							}
						};
					}
				});
			};
			CIQ.UI.observeProperty("uiContext", stx, this.listener);
		}
		setTimeout(() => {
			// allow uiContext creation first
			this.setup({ minColumnWidth, coverUIMaxWidth, coverContainer });
		});
	};

/**
 * Sets up the dialog and toolbar for the table view.
 * @param {object} config Setup configuration
 * @memberof CIQ.TableView
 * @since 8.7.0
 */
CIQ.TableView.prototype.setup = function (config) {
	const { stx, builder } = this;
	if (stx.destroyed) return;
	const { getChartCover, createToolbar, createTable } = builder;
	const cover = getChartCover(stx, config);
	const toolbar = createToolbar(stx, config);
	cover.append(toolbar);
	cover.style.display = "none";

	stx.addEventListener("symbolChange", () => {
		if (this.view) {
			this.close();
			createTable(stx, config);
			this.dialog.focus();
		}
	});

	this.dialog = cover;
	this.toolbar = {
		symbol: toolbar.querySelector(".ciq-data-table-title > cq-symbol"),
		copyBtn: toolbar.querySelector(".ciq-data-table-copy"),
		downloadBtn: toolbar.querySelector(".ciq-data-table-download"),
		additional: toolbar.querySelector(".ciq-data-table-additionalColumns")
	};
};

/**
 * Displays the table view.
 *
 * @param {object} [params] Configuration parameters.
 * @param {object} [params.config] Table column information.
 * @param {function} [params.onClose] Callback function to execute on closing the table view. The
 * 		callback enables synchronization of state in the application when the table view is
 * 		closed.
 * @param {function} [params.processCloseEvent] A function to receive event that closes table. If required,
 * 		event propagation can be stopped in this function. If the function is not provided, event propagation is stopped by default.
 *
 * @memberof CIQ.TableView#
 * @alias open
 * @since
 * - 8.1.0
 * - 8.9.3 Added processCloseEvent parameter.
 */
CIQ.TableView.prototype.open = function (params) {
	if (params) {
		this.params = params;
	}
	const { config = {}, onClose, processCloseEvent } = this.params || {};
	if (this.view) {
		this.close(false);
	}
	this.onClose = onClose;
	this.builder.createTable(this.stx, config);
	if (!this.dialog) return;
	const { stx } = this;
	if (!stx.chart.masterData) return;
	const close = this.close.bind(this);

	this.lastFocused = null;
	// Set the dialog as an active modal, this will disable the main tab key handler
	// and tie us into the main escape key handler.
	const keystrokeHub = this.dialog.ownerDocument.body.keystrokeHub;
	if (keystrokeHub) {
		if (keystrokeHub.tabActiveElement)
			this.lastFocused = this.dialog.ownerDocument.activeElement; //keystrokeHub.tabActiveElement.element;//
		keystrokeHub.highlightHide();
		keystrokeHub.addActiveModal(this.dialog);
	}

	setTimeout(() => (this.removeCloseListener = getCloseListener(this)));

	function getCloseListener(self) {
		const contextNode = stx.uiContext.topNode;
		const body = contextNode.ownerDocument.body;

		const closeHandler = (e) => {
			const withinTable = e.target.closest(".ciq-data-table-container");
			if (withinTable) return;
			close();
			if (processCloseEvent) processCloseEvent(e);
			else e.stopPropagation();
		};
		contextNode.addEventListener("click", closeHandler, true);
		const handleKeydown = (e) => {
			const { tableView } = body.keystrokeHub.context.stx;
			if (!tableView || !tableView.view) return;
			if (e.code === "Escape") {
				tableView.close();
				e.preventDefault();
			} else {
				// Handle all other keys using keyboard navigation functions in BaseComponent
				if (!CIQ.UI || !CIQ.UI.BaseComponent) return;
				const componentProxy = CIQ.UI.BaseComponent.prototype;
				const items = tableView.view.querySelectorAll("button");

				if (e.code === "Tab") {
					let { shiftKey } = e || {};
					componentProxy.focusNextItem(items, shiftKey, true);
					const focused = componentProxy.findFocused(items);
					// The highlightItem context must have a keyboardNavigation property
					if (focused[0])
						componentProxy.highlightItem.call(
							{ keyboardNavigation: body.keystrokeHub },
							focused[0]
						);
				} else if (e.code === "Enter") {
					const focused = componentProxy.findFocused(items);
					if (focused[0]) componentProxy.clickItem(focused[0], e);
				}
			}
		};
		body.addEventListener("keydown", handleKeydown);

		// Use modal functionality available in menu
		const uiManager = CIQ.getFn("UI.getUIManager")(contextNode);
		if (uiManager) {
			// Menu item requires show and hide providing no-op functions
			self.view.show = self.view.hide = function () {};
			uiManager.openMenu(self.view, {});
			self.view.isDialog = true;
		}
		return () => {
			contextNode.removeEventListener("click", closeHandler, true);
			body.removeEventListener("keydown", handleKeydown);
			if (uiManager) uiManager.closeMenu(self.view);
		};
	}
};

/**
 * Closes the table view.
 *
 * @param {boolean} [notify=true] Indicates whether the `onClose` callback function is set (see
 * 		[open]{@link CIQ.TableView#open}).
 *
 * @memberof CIQ.TableView#
 * @alias close
 * @since 8.1.0
 */
CIQ.TableView.prototype.close = function (notify = true) {
	let body;
	if (this.dialog) {
		this.dialog.style.display = "none";
		this.dialog.ariaModal = "false";
	}
	if (this.view) {
		body = this.view.ownerDocument.body;
		this.view.remove();
		this.view = null;
	}
	if (notify && this.onClose) {
		this.onClose();
	}

	if (this.removeCloseListener) {
		this.removeCloseListener();
		this.removeCloseListener = null;
	}

	// Remove the table view as an active modal in keyboard navigation
	if (body && body.keystrokeHub) {
		const { keystrokeHub } = body;
		let { tabActiveModals } = keystrokeHub;
		let modalIdx = tabActiveModals.indexOf(this.dialog);
		if (modalIdx > -1) {
			tabActiveModals.splice(modalIdx, 1);
		}
		if (!keystrokeHub.tabActiveElement && this.lastFocused)
			keystrokeHub.tabActiveElement = {
				element: this.lastFocused
			};
		keystrokeHub.tabIndex = Math.abs(keystrokeHub.tabIndex);
		keystrokeHub.highlightAlign();
	}
	if (this.lastFocused) this.lastFocused.focus();
};

/**
 * Opens the table view if it is closed. Closes the table view if it is open.
 *
 * @memberof CIQ.TableView#
 * @alias toggle
 * @since 8.1.0
 */
CIQ.TableView.prototype.toggle = function () {
	this[this.view ? "close" : "open"]();
	// DO NOT move this into open method!
	// You don't want to change focus when toggling additional columns
	if (!this.view) this.dialog.focus();
};

/**
 * Subscribes to changes in the table view component communication channel, which enables other
 * components to open and close the table view.
 *
 * @param {CIQ.UI.Context} uiContext The user interface context of the table view. Provides the
 * 		communication channel path that identifies the table view channel.
 * @param {string} [channelPath] Specifies the channel path if the path is not available in the
 * 		context configuration provided by `uiContext`.
 * @return {string} Channel name subscribed to.
 *
 * @memberof CIQ.TableView#
 * @alias subscribeToChanges
 * @since
 * - 8.1.0
 * - 9.1.0 Returns the channel name.
 */
CIQ.TableView.prototype.subscribeToChanges = function (
	uiContext,
	channelPath = "channels.tableView"
) {
	const { channelSubscribe, channelWrite } = CIQ.UI.BaseComponent.prototype;
	const { channels: { tableView = channelPath } = {} } = uiContext.config || {};
	const { stx } = this;

	channelSubscribe(
		tableView,
		(value) => {
			if (stx.tableView) {
				if (value) {
					stx.tableView.open({
						onClose: () => {
							channelWrite(tableView, false, stx);
						}
					});
					// DO NOT move this into open method!
					// You don't want to change focus when toggling additional columns
					stx.tableView.dialog.focus();
				} else {
					stx.tableView.close();
				}
			}
		},
		stx
	);

	stx.addEventListener("destroy", () => {
		if (this.dialog) this.dialog.remove();
		if (this.listener)
			CIQ.UI.unobserveProperty("uiContext", stx, this.listener);
	});

	return tableView;
};

/**
 * Namespace for {@link CIQ.TableView} creation&ndash;related properties and functions.
 *
 * @namespace
 * @name TableViewBuilder
 * @since 8.1.0
 */
function TableViewBuilder() {}

/**
 * The column header configuration for the table view.
 *
 * Can be used for rearranging the column order, removing columns, and updating labels.
 *
 * **Note:** Adding new columns has no effect.
 *
 * @type Object.<string, {label: string, cls: string|undefined}>
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.colHeaders = {
	date: { label: "Date", alias: "DT" },
	open: { label: "Open" },
	high: { label: "High" },
	low: { label: "Low" },
	close: { label: "Close" },
	pctChange: { label: "% Change", cls: "ciq-extra" },
	pctChangeVsAvg: { label: "% Change vs Average", cls: "ciq-extra" },
	volume: { label: "Volume", cls: "ciq-extra" }
};

/**
 * Character separator between columns in export
 *
 * @type string
 * @memberof TableViewBuilder
 * @since 9.1.0
 */
TableViewBuilder.colSeparator = ",";

/**
 * Number of decimal places to display for percent formatted columns
 *
 * @type number
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.percentDecimalPlaces = 2;

/**
 * Label for the copy button on the table view toolbar.
 *
 * @type string
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.copyLabel = "Copy";

/**
 * Label for the download button on the table view toolbar.
 *
 * @type string
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.downloadLabel = "Download";

/**
 * Creates the toolbar cover elements of the table view.
 *
 * The toolbar contains buttons for copying and saving the table data and for displaying
 * additional table columns.
 * @param {CIQ.ChartEngine} stx A reference to the chart engine that contains the chart for which
 * 		the table view is created.
 * @param {object} [config] Configuration parameters.
 * @param {function} [config.fileNameFormatter] Formats the name of the file that contains the
 * 		downloaded table data.
 * @return {HTMLElement} toolbar Constructed toolbar container element.
 * @memberof TableViewBuilder
 * @since
 * - 8.7.0
 */
TableViewBuilder.createToolbar = function (stx, config = {}) {
	const { tableView } = stx;
	const { builder } = tableView;
	const { symbolDisplay, symbol } = stx.chart;
	const {
		colSeparator,
		dataToCsv,
		downloadCsv,
		getCoverToolbar,
		getFilenameFormatter
	} = builder;
	const { fileNameFormatter = getFilenameFormatter(stx) } = config;

	const toolbar = getCoverToolbar({
		stx,
		symbol: symbolDisplay || symbol,
		copyFn,
		downloadFn,
		toggleAdditionalColumnsFn: (e) => {
			const { tableView } = stx;
			tableView.viewAdditionalColumns = !tableView.viewAdditionalColumns;
			e.currentTarget.classList[
				tableView.viewAdditionalColumns ? "add" : "remove"
			]("ciq-active");
			e.currentTarget.ariaChecked = tableView.viewAdditionalColumns
				? "true"
				: "false";
			const { lastFocused } = tableView;
			delete tableView.lastFocused;
			tableView.open();
			tableView.lastFocused = lastFocused;
		},
		closeFn: () => stx.tableView.close()
	});
	return toolbar;

	function copyFn() {
		const contentEl = document.createElement("textArea");
		stx.container.ownerDocument.body.appendChild(contentEl);

		const colHeaders = builder.getColumnHeaders(stx);
		contentEl.textContent = dataToCsv(tableView.currentTable, {
			colHeaders,
			colSeparator
		});
		contentEl.select();
		stx.container.ownerDocument.execCommand("copy");
		contentEl.remove();
		stx.dispatch("notification", "copytoclipboard");
	}

	function downloadFn() {
		const colHeaders = builder.getColumnHeaders(stx);
		const csvData = dataToCsv(tableView.currentTable, {
			colHeaders,
			colSeparator
		});
		const fileName = fileNameFormatter(csvData);
		downloadCsv(csvData, fileName, stx);
	}
};

/**
 * Creates column header object
 *
 * @param {CIQ.ChartEngine} stx  A reference to the chart engine that contains the chart for
 * 		which the column headers object is created.
 * @returns Colum header object
 * @memberof TableViewBuilder
 * @since 9.3.0
 */
TableViewBuilder.getColumnHeaders = function (stx) {
	const { builder } = stx.tableView;
	const colHeaders = Object.assign({}, builder.colHeaders);

	if (!stx.chart.highLowBars) {
		delete colHeaders.open;
		delete colHeaders.high;
		delete colHeaders.low;
	}

	if (!stx.tableView.viewAdditionalColumns) {
		for (let key in colHeaders) {
			if (colHeaders[key].cls) {
				delete colHeaders[key];
			}
		}
	}
	const labels = Object.values(colHeaders).map((item) => item.label);

	builder
		.getSeriesDataNames(stx)
		.forEach((item) => (colHeaders[item] = { label: item }));

	builder.getStudyDataNames(stx).forEach((item) => {
		if (!labels.includes(item)) colHeaders[item] = { label: item };
	});
	return colHeaders;
};

/**
 * Creates a table view as an HTMLElement overlay over a chart container. The table view displays
 * a snapshot of the visible chart data segment.
 *
 * The overlay contains buttons for copying and saving the table data and for displaying
 * additional table columns.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine that contains the chart for which
 * 		the table view is created.
 * @param {object} [config] Configuration parameters.
 * @param {function} [config.dateFormatter] Formats table date fields.
 * @param {function} [config.valueFormatter] Formats table values.
 * @param {function} [config.volumeFormatter] Formats the table volume field.
 * @param {function} [config.fileNameFormatter] Formats the name of the file that contains the
 * 		downloaded table data.
 * @param {string} [config.minColumnWidth="84px"] The minimum width (including units) of the
 * 		table columns. **Note:** The units can be any CSS unit acceptable by the CSS `calc`
 * 		function.
 * @return {HTMLElement}
 *
 * @memberof TableViewBuilder
 * @since
 * - 8.1.0
 */
TableViewBuilder.createTable = function (stx, config = {}) {
	if (!stx.chart || !stx.chart.dataSegment) return;

	const { tableView } = stx;
	const {
		getChartData,
		dataToHtml,
		getDateFormatter,
		getValueFormatter,
		getVolumeFormatter,
		getSeriesDataNames,
		getStudyDataNames,
		percentDecimalPlaces,
		getColumnHeaders
	} = tableView.builder;

	const colHeaders = getColumnHeaders(stx);

	const additionalDataFields = getSeriesDataNames(stx).concat(
		getStudyDataNames(stx)
	);

	const {
		dateFormatter = getDateFormatter(stx),
		valueFormatter = getValueFormatter(stx),
		percentFormatter = getValueFormatter(stx, percentDecimalPlaces),
		volumeFormatter = getVolumeFormatter(stx),
		minColumnWidth = "84px"
	} = config;

	const arr = getChartData(stx, {
		dateFormatter,
		valueFormatter,
		percentFormatter,
		volumeFormatter,
		additionalDataFields
	});

	// Save reference to the tableData for devs to inspect/use just in case
	tableView.currentTable = arr;

	const cover = tableView.dialog;
	cover.role = "dialog";
	cover.ariaModal = "true";
	cover.style.display = "";
	const { symbolDisplay, symbol } = stx.chart;
	tableView.toolbar.symbol.textContent = symbolDisplay || symbol;

	setTimeout(() => {
		const htmlTable = dataToHtml(arr, {
			colHeaders,
			minColumnWidth
		});
		cover.appendChild(htmlTable);
		tableView.view = htmlTable;
		const scrollbarStyling = CIQ.getFromNS(
			stx,
			"uiContext.config.scrollbarStyling"
		);
		if (scrollbarStyling) {
			scrollbarStyling.refresh(cover.querySelector("tbody"));
			scrollbarStyling.refresh(cover.querySelector(".ciq-data-table-wrapper"), {
				suppressScrollY: true
			});
		}
		if (stx.translateUI) stx.translateUI(cover);
		cover.classList.remove("loading");
	});

	return cover;
};

/**
 * Creates an HTML table containing the chart data and column headers (see
 * {@link TableViewBuilder.colHeaders}).
 *
 * @param {object[]} data The chart data.
 * @param {object} params Configuration parameters.
 * @param {Object.<string, {label: string, cls: string|undefined}>} params.colHeaders The column
 * 		headers as defined in {@link TableViewBuilder.colHeaders}.
 * @param {string} [params.minColumnWidth] The minimum width of the table columns, including units.
 * 		**Note:** The units can be any CSS unit acceptable by the CSS `calc` function.
 * @return {HTMLElement} A table containing the chart data and column headers.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.dataToHtml = function (data, { colHeaders, minColumnWidth }) {
	const keyLength = Object.keys(colHeaders).length;
	const colWidth = `calc((100% - ${10 + keyLength * 4}px ) / ${keyLength})`;
	const tableHeader = Object.entries(colHeaders).map(([, { label }], index) => {
		return `<th
			scope="col"
			style="width: ${colWidth};"
			>${label.replace("(", "  (")}</th>`;
	});

	const tableRows = data.map((row) => {
		const htmlRow = Object.keys(colHeaders)
			.map((key, index) => {
				const value = row[key];
				return index === 0
					? `<th scope="row"
							style="width: ${colWidth}"
						>${value}</th>`
					: `<td style="width: ${colWidth}">${value}</td>`;
			})
			.join("");
		return `<tr>${htmlRow}</tr>`;
	});

	const tableWrapper = document.createElement("div");
	tableWrapper.classList.add("ciq-data-table-wrapper");
	const minWidth = minColumnWidth
		? `calc(${keyLength} * ${minColumnWidth})`
		: "";
	tableWrapper.innerHTML = `
		<table class="header-fixed"	aria-description="Data visible in the chart"
		${minWidth ? `style="min-width: ${minWidth}"` : ""}>
		<thead role="rowgroup">${tableHeader.join("")}</thead>
		<tbody role="rowgroup">${tableRows.join("")}</tbody>
		</table>`;
	return tableWrapper;
};

/**
 * Transforms the chart data into a character-separated values (CSV) file, including column headers.
 *
 * @param {object[]} data The chart data.
 * @param {object} params Configuration parameters.
 * @param {Object.<string, {label: string, cls: string|undefined}>} params.colHeaders The column
 * 		headers as defined in {@link TableViewBuilder.colHeaders}.
 * @param {string} params.colSeparator="\t" The column separator for the CSV format.
 * @return {string} The column headers and chart data as a CSV file.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.dataToCsv = function (
	data,
	{ colHeaders, colSeparator = "\t" }
) {
	const tableHeader = Object.entries(colHeaders)
		.map(([, { label }]) => `"${label}"`)
		.join(colSeparator);

	const columns = Object.entries(colHeaders).map(
		(arr) => arr[1].alias || arr[0]
	);
	const tableRows = data.map((row) => {
		return columns
			.map((key) => `"${key === "DT" ? row[key].toISOString() : row[key]}"`)
			.join(colSeparator);
	});

	return `${tableHeader}\n${tableRows.reverse().join("\n")}`;
};

/**
 * Downloads the table view as a character-separated values (CSV) file.
 *
 * @param {string} csvString The table view in the form of character-separated data.
 * @param {string} filename The name given to the download file.
 * @param {CIQ.ChartEngine} [stx] The chart engine
 *
 * @memberof TableViewBuilder
 * @since
 * - 8.1.0
 * - 8.5.0 Added optional `stx` parameter to aid in specifying document to download from.
 */
TableViewBuilder.downloadCsv = function (
	csvString,
	filename = "filename",
	stx = null
) {
	const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

	const a = document.createElement("a");
	a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
	a.download = `${filename}.csv`;
	a.style.display = "none";
	const doc = ((stx || {}).container || {}).ownerDocument || document;
	doc.body.appendChild(a);
	a.click();
	doc.body.removeChild(a);
};

/**
 * Extracts OHLC (open, high, low, close) data from the chart.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine that contains the chart from which
 * 		the data is extracted.
 * @param {object} params Configuration parameters.
 * @param {function} [params.dateFormatter] Formats date fields.
 * @param {function} [params.valueFormatter] Formats OHLC and other values.
 * @param {function} [params.percentFormatter] Formats percent fields.
 * @param {function} [params.volumeFormatter] Formats the volume field.
 * @param {string[]} [params.additionalDataFields] An array of additional data field names for
 * 		comparison series and study data.
 * @return {object[]} The formatted chart data.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.getChartData = function (
	stx,
	{
		dateFormatter,
		valueFormatter,
		percentFormatter,
		volumeFormatter,
		additionalDataFields
	}
) {
	const data = stx.chart.dataSegment.filter((item) => item !== null);
	const { usePreviousCloseForChange } = stx.tableView;
	let out = [];
	let length = 0;
	const avgPctChange =
		data.reduce((acc, { Close, iqPrevClose, Open }) => {
			const Base = usePreviousCloseForChange ? iqPrevClose : Open;
			if (
				typeof Close === "undefined" ||
				Number.isNaN(Close) ||
				typeof Base === "undefined" ||
				Number.isNaN(Base)
			) {
				return acc;
			}
			length++;
			return acc + (Close - Base) / Base;
		}, 0) / length;
	data.forEach((item, index) => {
		const { DT, displayDate, High, Low, Open, Close, iqPrevClose, Volume } =
			item;
		const Base = usePreviousCloseForChange ? iqPrevClose : Open;
		const pctChange = (Close - Base) / Base;
		const date =
			displayDate ||
			(stx.displayZone
				? CIQ.convertTimeZone(DT, stx.dataZone, stx.displayZone)
				: DT);
		const obj = {
			DT,
			date: dateFormatter(date),
			open: valueFormatter(Open),
			close: valueFormatter(Close),
			change: valueFormatter(Close - Base),
			pctChange: percentFormatter(pctChange * 100),
			pctChangeVsAvg: percentFormatter((pctChange - avgPctChange) * 100),
			high: valueFormatter(High),
			low: valueFormatter(Low),
			volume: volumeFormatter(Volume)
		};
		additionalDataFields.forEach((fieldName) => {
			let value = item[fieldName];
			if (value == null) {
				obj[fieldName] = "";
				return;
			}
			if (typeof value === "object") {
				value = value.Close;
			}
			obj[fieldName] = valueFormatter(value);
		});

		out.push(obj);
	});
	out.sort((a, b) => b.DT - a.DT);
	return out;
};

/**
 * Creates a function that formats table view date fields.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine that contains the chart for which
 * 		the date fields are formatted.
 * @return {function} A date formatter.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.getDateFormatter = function (stx) {
	return (dt, panel) => {
		if (!dt) return "";

		return CIQ.displayableDate(stx, stx.chart, dt, true);
	};
};

/**
 * Creates a function that formats table view value fields.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine that contains the chart for which
 * 		the value fields are formatted.
 * @param {number} [decimalPlaces] Number of decimal places to use, overrides any auto-detection of decimal places in data.
 * @return {function} A value formatter.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.getValueFormatter = function (stx, decimalPlaces) {
	const {
		chart: { panel, yAxis },
		layout: { chartScale }
	} = stx;
	let formatValue;

	if (yAxis.originalPriceFormatter && yAxis.originalPriceFormatter.func) {
		formatValue = (value) =>
			yAxis.originalPriceFormatter.func(stx, panel, value, decimalPlaces);
	} else if (
		yAxis.priceFormatter &&
		chartScale != "percent" &&
		chartScale != "relative"
	) {
		formatValue = (value) =>
			yAxis.priceFormatter(stx, panel, value, decimalPlaces);
	} else {
		formatValue = (value) => stx.formatYAxisPrice(value, panel, decimalPlaces);
	}

	return (value) => formatValue(value).replace(/^-*0\.0*$/, "0"); // display 0.00 as 0
};

/**
 * Creates a function that formats the table view volume field.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine that contains the chart for which
 * 		the volume field is formatted.
 * @return {function} A volume field formatter.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.getVolumeFormatter = function (stx) {
	return (num) => {
		if (num == null) return "";

		if (stx.internationalizer) {
			return stx.internationalizer.priceFormatters[0].format(num);
		}

		const num_parts = num.toString().split(".");
		num_parts[0] = CIQ.commas(num_parts[0]);
		return num_parts[0];
	};
};

/**
 * Creates a function that creates and formats a file name from the chart symbol and table view
 * data.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine that contains the chart whose
 * 		symbol and data is included in the file name.
 * @return {function} A function that creates and formats a file name.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.getFilenameFormatter = function (stx) {
	return (csvData) => {
		const symbol = stx.chart.symbolDisplay || stx.chart.symbol;
		let firstDate, lastDate;
		if (csvData) {
			const rows = csvData.split("\n");
			if (rows.length > 1) {
				[, firstDate = ""] = rows[rows.length - 1].match(/^"([^"]*)"/) || [];
				[, lastDate = ""] = rows[1].match(/^"([^"]*)"/) || [];
				firstDate = CIQ.yyyymmddhhmmssmmm(new Date(firstDate));
				lastDate = CIQ.yyyymmddhhmmssmmm(new Date(lastDate));
			}
		}
		return `${symbol}${firstDate ? ` (${firstDate} _ ${lastDate})` : ""}`;
	};
};

/**
 * Creates and attaches an HTML container element to the DOM. The element covers the chart and
 * contains the table view.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine that contains the chart over which
 * 		the cover is placed.
 * @param {object} params Configuration parameters.
 * @param {number} [params.coverUIMaxWidth] The width of the chart (in pixels) below which the
 * 		cover element overlays the entire chart, including user interface elements.
 * @param {string} [params.coverContainer] A CSS selector used to obtain the DOM element that
 * 		serves as the parent element of the cover element; for example, ".chartContainer".
 * @return {HTMLElement} The cover element.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.getChartCover = function (
	stx,
	{ coverUIMaxWidth, coverContainer }
) {
	const parentElement =
		(coverContainer &&
			stx.container.ownerDocument.querySelector(coverContainer)) ||
		(stx.uiContext && stx.container.offsetWidth < coverUIMaxWidth
			? stx.uiContext.topNode
			: stx.container.parentElement.parentElement);

	const cover = document.createElement("div");
	Object.assign(cover.style, { top: 0, left: 0, right: 0, bottom: 0 });

	cover.classList.add("ciq-data-table-container", "loading");
	cover.setAttribute("role", "dialog");
	CIQ.addTranslatableAriaLabel(cover, stx, "Data Table");
	cover.setAttribute("tabindex", 0);

	const spinner = document.createElement("div");
	spinner.classList.add("ciq-spinner-wrapper");
	spinner.innerHTML = `<span class="ciq-spinner"></span>`;

	cover.appendChild(spinner);

	parentElement.appendChild(cover);
	return cover;
};

/**
 * Creates a toolbar containing the table title and controls used to copy and download the table
 * data and add additional table columns.
 *
 * @param {object} params Function parameters.
 * @param {CIQ.ChartEngine} params.stx Chart engine instance.
 * @param {string} params.symbol An instrument symbol, which is used as the table title in the
 * 		toolbar. Should be the symbol of the chart main series.
 * @param {function} [params.copyFn] Event handler for selection of the copy control.
 * @param {function} [params.downloadFn] Event handler for selection of the download control.
 * @param {function} [params.toggleAdditionalColumnsFn] Event handler for selection of the
 * 		additional column control.
 * @param {function} [params.closeFn] Event handler for selection of the table view close (X)
 * 		control.
 * @return {HTMLElement} The toolbar, containing title and controls.
 *
 * @memberof TableViewBuilder
 * @since
 * - 8.1.0
 * - 9.1.0 Removed unused parameter `viewAdditionalColumns`, added parameter `stx`.
 */
TableViewBuilder.getCoverToolbar = function ({
	stx,
	symbol,
	copyFn,
	downloadFn,
	toggleAdditionalColumnsFn,
	closeFn
}) {
	const { builder } = stx.tableView;
	const toolBar = document.createElement("div");
	toolBar.classList.add("ciq-data-table-toolbar");
	toolBar.innerHTML = `
		<div class="ciq-data-table-title"><span>Symbol</span>: <cq-symbol></cq-symbol></div>
		<button class="ciq-data-table-copy">${builder.copyLabel}</button>
		<button class="ciq-data-table-download">${builder.downloadLabel}</button>
		<div>
			<label class="additionalColumns" role="switch">
				<span class="ciq-switch"><span></span></span>
				<span>Show Additional Columns</span>
			</label>
		</div>
		<cq-close role="button" aria-label="close" />
	`;
	const titleEl = toolBar.querySelector(".ciq-data-table-title");
	titleEl.querySelector("cq-symbol").textContent = symbol;
	titleEl.setAttribute("role", "heading");

	const btnCopy = toolBar.querySelector(".ciq-data-table-copy");
	if (copyFn) {
		btnCopy.addEventListener("click", copyFn);
	} else {
		btnCopy.style.display = "none";
	}

	const btnDownload = toolBar.querySelector(".ciq-data-table-download");
	if (downloadFn) {
		btnDownload.addEventListener("click", function () {
			btnDownload.blur();
			downloadFn();
		});
	} else {
		btnDownload.style.display = "none";
	}

	const btnAdditionalColumns = toolBar.querySelector(".additionalColumns");
	if (toggleAdditionalColumnsFn) {
		btnAdditionalColumns.addEventListener("click", toggleAdditionalColumnsFn);
	} else {
		btnAdditionalColumns.style.display = "none";
	}

	toolBar.close = closeFn;

	return toolBar;
};

/**
 * Gets the label of the additional columns button on the table view toolbar.
 *
 * @param {boolean} viewingAdditionalColumns If this parameter is true, the label should indicate
 * 		additional table columns will be shown; if false, hidden.
 * @return {string} The button label.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.getAdditionalColumnLabel = function (
	viewingAdditionalColumns
) {
	return `<span>${
		viewingAdditionalColumns ? "- " : "+ "
	}</span>Additional columns`;
};

/**
 * Obtains the names of all studies that have data in the chart's visible data segment.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine that contains the chart studies.
 * @return {string[]} The names of all studies that are in the visible portion of the chart.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.getStudyDataNames = function (stx) {
	return Object.values(stx.layout.studies || {})
		.filter((study) => !study.signalData || study.signalData.reveal)
		.map(getDataNames)
		.reduce((acc, item) => acc.concat(item), []);

	function getDataNames(study) {
		return Object.keys(study.outputMap).filter(hasData);
	}

	function hasData(name) {
		return stx.chart.dataSegment.some((data) => data && data[name]);
	}
};

/**
 * Obtains the symbols of all comparison series that have data in the chart's visible data
 * segment.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine that contains the comparison
 * 		series.
 * @return {string[]} The names (symbols) of all comparison series that are in the visible
 * 		portion of the chart.
 *
 * @memberof TableViewBuilder
 * @since 8.1.0
 */
TableViewBuilder.getSeriesDataNames = function (stx) {
	return Object.values(stx.chart.seriesRenderers || {})
		.filter((item) => item.params.name !== "_main_series")
		.map((item) => {
			return item.seriesParams.map(({ symbol }) => symbol);
		})
		.reduce((acc, item) => acc.concat(item), []);
};

/**
 * CIQ.UI.Context interface placeholder to be augmented in *componentUI.js* with properties.
 *
 * @tsinterface CIQ.UI~Context
 */
