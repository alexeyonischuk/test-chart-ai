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
 * Loads static data from uploaded files into the chart for easier consumption.
 * @param {object} params Configuration parameters.
 * @param {CIQ.ChartEngine} params.stx A reference to the chart engine that contains the chart for
 * 		which the DataLoader is created.
 * @constructor
 * @name CIQ.DataLoader
 * @since 8.4.0
 */
class DataLoader {
	constructor(params) {
		const { stx } = params;
		if (!stx) {
			console.warn("The DataLoader requires an stx parameter");
			return;
		}

		this.stx = stx;
		this.cssRequired = true;

		stx.dataLoader = this;
		if (CIQ.UI) {
			const listener = ({ value: uiContext }) => {
				if (!uiContext) return;
				setTimeout(this.subscribeToChanges, 0, uiContext);
				setTimeout(this.registerHotKeys, 0, uiContext);
			};
			CIQ.UI.observeProperty("uiContext", stx, listener);
			stx.addEventListener("destroy", () =>
				CIQ.UI.unobserveProperty("uiContext", stx, listener)
			);
		}
	}

	/**
	 * Formats data into OHLC format readable by the {@link CIQ.ChartEngine}
	 * @param {CIQ.CSVReader} dataObj CIQ.CSVReader which contains the parsed data
	 * @param {FormData} dataOptions FormData options that get the name of the imported data
	 * @memberof CIQ.DataLoader
	 * @alias formatData
	 */
	formatData(dataObj, dataOptions) {
		const { defaultPlotField } = this.stx.chart;
		const { results, fields } = dataObj;
		const { name } = dataOptions;

		const dtIdx = fields.indexOf("DT");
		const dateIdx = fields.indexOf("Date");
		const nameIdx = fields.indexOf(name);

		const useField = nameIdx > -1;
		let usedFields = [dtIdx > -1 ? dtIdx : dateIdx];
		if (useField) usedFields.push(fields.indexOf(name));
		results.data = results.map((row) => {
			const entry = {};
			row.split(",").forEach((col, idx) => {
				if (useField && usedFields.indexOf(idx) === -1) return;
				let f = fields[idx];
				let c;
				try {
					c = JSON.parse(col);
				} catch (e) {
					c = col;
				}
				let parsedCol = f === "DT" || f === "Date" ? c : Number.parseFloat(c);
				entry[fields[idx]] = parsedCol;

				// If we're using the "name" to signify we want to add a series
				// then take the value of the series and set it the defaultPlotField.
				// Otherwise we end up trying to plot the defaultPlotField instead of the "name"
				if (idx === nameIdx) {
					delete entry[fields[idx]];
					entry[defaultPlotField] = parsedCol;
				}
			});
			return entry;
		});
	}

	/**
	 * Imports data from a {@link CIQ.CSVReader} and loads it into the chart based on FormData parameters.
	 * @param {CIQ.CSVReader} dataObj CIQ.CSVReader that contains parsed data
	 * @memberof CIQ.DataLoader
	 * @alias importData
	 */
	importData(dataObj) {
		const self = this;
		const { stx } = this;

		const opt = Object.fromEntries(dataObj.formData.entries());
		let { color, display, name, panel, periodicity } = opt;
		periodicity = JSON.parse(periodicity);

		this.formatData(dataObj, opt);
		const { results } = dataObj;
		const { data } = results;

		const symbolObject = {
			symbol: name,
			static: true
		};
		const params = {
			data,
			symbolObject,
			panel: panel === "true" ? true : undefined,
			color
		};

		if (display === "secondary") {
			stx.addSeries(name, params, function () {
				let series = stx.getSeries({ symbol: name })[0];
				const tick = stx.tickFromDate(series.endPoints.end);
				stx.chart.scroll =
					stx.chart.dataSet.length - 1 - tick + stx.chart.maxTicks;
				self.registerDataWarnings(true);
			});
		} else {
			stx.quoteDriver.pause(name);
			stx.loadChart(symbolObject, { masterData: data, periodicity }, () => {
				self.registerDataWarnings();

				const contextWrapper = stx.container.closest("cq-context-wrapper");
				if (contextWrapper && contextWrapper.removeEmptyMsg)
					contextWrapper.removeEmptyMsg();
			});
		}
	}

	/**
	 * Registers and cleans up warnings about when data will be removed on users actions
	 * @param {boolean} series When true adds tear downs for series.
	 * @memberof DataLoader#
	 */
	registerDataWarnings(series) {
		const { stx } = this;
		const warningEvt = stx.addEventListener("menu", ({ stx, menu }) => {
			if (
				menu.matches(".ciq-period") &&
				CIQ.UI.getMyContext(menu) === stx.uiContext
			) {
				stx.dispatch("notification", "changeperiodicity");
			}
		});
		let seriesInj, highlightInj;
		if (series) {
			seriesInj = stx.append("removeSeries", removeWarnings);
			highlightInj = stx.append("deleteHighlighed", removeWarnings);
		}

		stx.addEventListener("periodicity", ({ stx, differentData }) => {
			const statics = stx.getSymbols({ static: true });
			if (statics && differentData) {
				statics.forEach((symbol) => {
					stx.removeSeries(symbol, stx.chart);
					removeWarnings();
				});
			}
		});

		stx.addEventListener("newChart", () => {
			removeWarnings();
		});

		function removeWarnings() {
			if (!stx.getSymbols({ static: true }).length) {
				stx.removeEventListener(warningEvt);
				if (series) {
					stx.removeInjection(seriesInj);
					stx.removeInjection(highlightInj);
				}
			}
		}
	}

	registerHotKeys(uiContext) {
		const hotKeys = CIQ.getFromNS(uiContext.config, "hotkeyConfig.hotkeys");
		if (!hotKeys) return;

		let hotKey = hotKeys.find(({ action }) => action === "dataLoader");
		if (hotKey)
			hotKey.action = () => {
				uiContext.getAdvertised("Channel").write(null, "dataLoader", true);
			};
	}

	subscribeToChanges(uiContext) {
		const { stx } = uiContext;
		const base = CIQ.UI.BaseComponent.prototype;

		base.channelSubscribe(
			"channel.dataLoader",
			(value) => {
				let val = value
					? { type: "dataLoader", params: { stx, context: uiContext } }
					: {};

				base.channelWrite("channel.dialog", val, stx);
			},
			stx
		);
	}
}

/**
 * Helper class to read loaded web files with a FileReader.
 * @constructor
 * @name CIQ.CSVReader
 * @param {external:File} file Web file that the CSVReader should parse.
 * @since 8.4.0
 */
class CSVReader {
	constructor(file) {
		const reader = new FileReader();
		/**
		 * @type {external:FileReader}
		 * @alias reader
		 * @memberof CIQ.CSVReader
		 * @instance
		 */
		this.reader = reader;
		/**
		 * @type {external:File}
		 * @alias file
		 * @memberof CIQ.CSVReader
		 * @instance
		 */
		this.file = file;
	}

	/**
	 * Asynchronously parse a File with the FileReader.
	 * Determines the linebreak and splits into arrays for fields and data.
	 * On resolve returns the results of the file split based on identified line break.
	 * @param {external:File} file File to passed to the FileReader and parsed.
	 * @memberof CIQ.CSVReader
	 * @async
	 * @return {Promise<string[]>}
	 */
	async parse(file) {
		const { reader } = this;
		return new Promise((res, rej) => {
			reader.readAsText(file);

			reader.onload = (e) => {
				const raw = this.splitResults(reader.result);
				const fields = raw.shift(); // remove fields so they aren't reparsed
				const quoted = !!fields.match(/"/);
				const splitter = quoted ? new RegExp(/,(?=")/) : new RegExp(/,/);
				this.fields = fields.split(splitter).map((field) => {
					let f;
					try {
						f = JSON.parse(field);
					} catch (e) {
						f = field;
					}
					return f;
				});
				if (raw[raw.length - 1] === "") raw.pop(); // remove any trailing newline
				this.results = raw;
				res(raw);
			};

			reader.onerror = (e) => {
				console.warn(e);
				rej(e);
			};
		});
	}

	/**
	 * Determines the line break on the File by checking for carriage and newLine return.
	 * Progressively reads 5% ofthe file until it finds a value.
	 * @param {string} data Raw parsed values from the FileReader
	 * @memberof CIQ.CSVReader
	 * @returns string Identified line break in the file which will be used to split results
	 */
	determineLineBreak(data) {
		const { length } = data;
		const carriage = "\r\n";
		const newLine = "\n";
		let pct = Math.floor(length * 0.05); // take first 5% of the string
		let start = 0;
		let lbreak;
		do {
			const sub = data.substring(start, pct);
			if (sub.indexOf(carriage) > -1) lbreak = carriage;
			else if (sub.indexOf(newLine) > -1) lbreak = newLine;
			else start += pct;
		} while (!lbreak);
		return lbreak;
	}

	/**
	 * Splits data from the FileReader based on determined linebreak.
	 * @param {string} data Parsed data from FileReader
	 * @memberof CIQ.CSVReader
	 * @returns string[] Split data from the FileReader
	 */
	splitResults(data) {
		return data.split(this.determineLineBreak(data));
	}
}

CIQ.CSVReader = CIQ.CSVReader || CSVReader;
CIQ.DataLoader = CIQ.DataLoader || DataLoader;

/**
 * Native Web File API. Files are an implementation of the Blob Object. From MDN:
 > The File interface provides information about files and allows JavaScript in a web page to access their content.
 >
 > File objects are generally retrieved from a FileList object returned as a result of a user selecting files using the `<input>` element, from a drag and drop operation's DataTransfer object, or from the mozGetAsFile() API on an HTMLCanvasElement.
 >
 > A File object is a specific kind of a Blob, and can be used in any context that a Blob can. In particular, FileReader, URL.createObjectURL(), createImageBitmap(), and XMLHttpRequest.send() accept both Blobs and Files.
 *
 * @external File
 * @see [File](https://developer.mozilla.org/en-US/docs/Web/API/File) at Mozilla Developer Network.
 */
/**
 * Web API that will asynchronously read File or Blob Objects. From MDN:
 >The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
 >
 > File objects may be obtained from a FileList object returned as a result of a user selecting files using the `<input>` element, from a drag and drop operation's DataTransfer object, or from the mozGetAsFile() API on an HTMLCanvasElement.
 >
 > FileReader can only access the contents of files that the user has explicitly selected, either using an HTML `<input type="file">` element or by drag and drop. It cannot be used to read a file by pathname from the user's file system. To read files on the client's file system by pathname, use the File System Access API. To read server-side files, use standard Ajax solutions, with CORS permission if reading cross-domain.


 * @external FileReader
 * @see [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) at Mozilla Developer Network.
 */
