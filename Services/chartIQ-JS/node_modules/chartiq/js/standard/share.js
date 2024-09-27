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


import { CIQ as _CIQ } from "../../js/chartiq.js";


let __js_standard_share_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

/* global html2canvas, requirejs */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

var h2canvas;

/**
 * Manages chart sharing and uploading.
 *
 * See the {@tutorial Chart Sharing} tutorial for more details.
 *
 * @constructor
 * @name CIQ.Share
 */
CIQ.Share = CIQ.Share || function () {};

/**
 * Creates a png image or canvas of the current chart and everything inside the container associated with the chart when it was instantiated, including HTML.
 * Elements outside the chart container will **NOT** be included.
 *
 * It will dynamically try to load `js/thirdparty/html2canvas.min.js` if not already loaded.
 *
 * This function is asynchronous and requires a callback function. The callback will be passed
 * a data object or canvas which can be sent to a server or converted to an image.
 *
 * By default this method will rely on HTML2Canvas to create an image which will rely on Promises. If your browser does not implement Promises, be sure to include a polyfill to ensure HTML2Canvas works properly.
 *
 * **This method does not always work with React or Safari**
 *
 * **Canvases can only be exported if all the contents including CSS images come from the same domain,
 * or all images have cross origin set properly and come from a server that supports CORS; which may or may not be possible with CSS images.**
 *
 * @param {CIQ.ChartEngine} stx   Chart object
 * @param {object} params
 * @param {number} params.width
 * @param {number} params.height
 * @param {string} params.background
 * @param {boolean} params.data If true returns the image data, otherwise, it returns the canvas
 * @param {array} params.hide Array of strings; array of the CSS selectors of the DOM elements to hide, before creating a PNG
 * @param {Function} cb  Callback when image is available fc(error,data) where data is the serialized image object or canvas
 * @static
 * @since 4.0.0 Addition of `params.hide`.
 * @version ChartIQ Advanced Package plug-in
 * @private
 */
CIQ.Share.fullChart2PNG = function (stx, params, cb) {
	if (!stx || !stx.chart) return;
	//If we haven't loaded html2canvas, load it
	if (typeof html2canvas === "undefined")
		return loadHTML2Canvas(function () {
			return createHTML2Canvas(stx, params, cb);
		});
	h2canvas = html2canvas;
	createHTML2Canvas(stx, params, cb);
};

function inlineStyle(elem) {
	if (!elem.style) return;
	var styles = getComputedStyle(elem);
	var props = [
		"alignment-baseline",
		"dominant-baseline",
		"fill",
		"fill-opacity",
		"font-family",
		"font-size",
		"font-variant",
		"font-weight",
		"text-align",
		"text-anchor"
	];
	props.forEach(function (i) {
		if (!elem.style[i] && styles[i]) elem.style[i] = styles[i];
	});
	for (var child in elem.children) {
		inlineStyle(elem.children[child]);
	}
}

function createHTML2Canvas(stx, params, cb) {
	if (!params) params = {};
	var ciqNoShare = "ciq-no-share",
		body =
			(stx.uiContext && stx.uiContext.topNode) ||
			stx.container.ownerDocument.body,
		topContext = body.parentElement.closest("cq-context");
	if (topContext) body = topContext;

	// For Safari's sake we've modified the cloneNode() function in html2canvas to not enter nodes with style.display==="none"
	if (params.hide && params.hide instanceof Array) {
		var customHide = params.hide.join(", ");
		var hideItems = body.querySelectorAll(customHide);
		for (var idx = 0; idx < hideItems.length; idx++) {
			hideItems[idx].classList.add(ciqNoShare);
		}
	}
	// Combining ".sharing" and ".ciq-no-share" to display:none for selected elements
	setSubClass(body, "add");
	stx.draw();

	// explicitly set svg text-related attributes
	var svgs = stx.chart.container.getElementsByTagName("svg");
	var svgOriginalSources = [];
	var svgIndex = 0;
	for (; svgIndex < svgs.length; svgIndex++) {
		var svg = svgs[svgIndex];
		svgOriginalSources.push(svg.innerHTML);
		inlineStyle(svg);
	}

	// Safari does not support SVG pattern fills.  So we skip optimization in html2canvas third party file.
	// (we've modified the resizeImage() function in html2canvas to detect "iPad" in user agent)

	h2canvas(stx.chart.container, {
		allowTaint: false,
		foreignObjectRendering: false,
		logging: false,
		width: params.width || null,
		height: params.height || null,
		backgroundColor: params.background || null,
		useCORS: true
	})
		.then(function (canvas) {
			if (cb) {
				//return the full canvas if the data param is not true
				cb(null, params.data ? canvas.toDataURL("image/png") : canvas);
			}
			for (svgIndex = 0; svgIndex < svgs.length; svgIndex++) {
				svgs[svgIndex].innerHTML = svgOriginalSources[svgIndex];
			}
			setSubClass(body, "remove");
		})
		.catch(function (error) {
			if (cb) cb(error);
			for (svgIndex = 0; svgIndex < svgs.length; svgIndex++) {
				svgs[svgIndex].innerHTML = svgOriginalSources[svgIndex];
			}
			setSubClass(body, "remove");
		});

	function setSubClass(el, action) {
		el.classList[action]("sharing");
		(el.root || el).querySelectorAll("[interactable]").forEach(function (wc) {
			setSubClass(wc, action);
		});
	}
}

//Load HTML2Canvas dynamically. If html2canvas.min.js is already loaded (statically, webpacked or with require.js) then this will be skipped.
// HTML2Canvas is rather heavy which is why we provide the option to load dynamically. It isn't really necessary to load this until
// a user actually shares a chart.
function loadHTML2Canvas(cb) {
	//Make sure HTML2Canvas is not already loaded
	if (typeof html2canvas === "undefined") {
		//If we have require, use it
		if (typeof requirejs !== "undefined") {
			try {
				return requirejs(["html2canvas.min.js"], function (h2) {
					h2canvas = h2;
					return cb();
				});
			} catch (exception) {
				console.warn(
					"Require loading has failed, attempting to load html2canvas manually."
				);
			}
		}

		// if no require then load directly
		CIQ.loadScript(getMyRoot() + "html2canvas.min.js", function () {
			h2canvas = html2canvas;
			return cb();
		});
	} else {
		h2canvas = html2canvas;
		return cb();
	}
}

//Get the location of this file. Unbundled, this would be share.js. Bundled, this would be standard.js. When unbundled
//we need to walk back up out of advanced. When bundled we don't need a root because thirdparty should be a relative
//path.
//Set CIQ.Share.html2canvasLocation to completely override this logic.
function getMyRoot() {
	if (CIQ.Share.html2canvasLocation) return CIQ.Share.html2canvasLocation;
	var sc = document.getElementsByTagName("script");
	for (var idx = 0; idx < sc.length; idx++) {
		var s = sc[idx];
		if (s.src && s.src.indexOf("share.js") > -1) {
			return s.src.replace(/standard\/share\.js/, "") + "thirdparty/";
		}
	}
	return "js/thirdparty/";
}

/**
 * Creates a png image of the current chart and everything inside the container associated with the chart when it was instantiated, including HTML.
 * Elements outside the chart container will **NOT** be included.
 *
 * If widthPX and heightPX are passed in then the image will be scaled to the requested dimensions.
 *
 * It will dynamically try to load `js/thirdparty/html2canvas.min.js` if not already loaded.
 *
 * This function is asynchronous and requires a callback function.
 * The callback will be passed a data object or canvas which can be sent to a server or converted to an image.
 *
 * Important Notes:
 * - **This method will rely on Promises. If your browser does not implement Promises, be sure to include a polyfill.**
 *
 * - **This method does not always work with Safari**.
 *
 * - **Canvases can only be exported if all the contents including CSS images come from the same domain,
 * or all images have cross origin set properly and come from a server that supports CORS; which may or may not be possible with CSS images.**
 *
 * - **When using the charts from `file:///`, make sure to include `html2canvas` statically instead of allowing this method to load it dynamically.**
 * <br>Example (adjust path as needed):
 * <br>`<script src="js/thirdparty/html2canvas.min.js"></script>`
 * <br>or
 * <br>`import src="/js/thirdparty/html2canvas.min.js"`
 *
 * @param  {CIQ.ChartEngine}   stx           Chart object
 * @param	 {object}		[params]			Parameters to describe the image.
 * @param  {number}   [params.widthPX]       Width of image to create. If passed then params.heightPX will adjust to maintain ratio.
 * @param  {number}   [params.heightPX]      Height of image to create. If passed then params.widthPX will adjust to maintain ratio.
 * @param  {string}   [params.imageType]   Specifies the file format your image will be output in. The default is PNG and the format must be supported by your browser.
 * @param {array} 	[params.hide] Array of strings; array of the CSS selectors of the DOM elements to hide, before creating a PNG
 * @param  {Function} cb            Callback when image is available fc(data) where data is the serialized image object
 * @memberOf CIQ.Share
 * @since
 * - 3.0.0 Function signature changed to take parameters.
 * - 4.0.0 Addition of `parameters.hide`.
 * @version ChartIQ Advanced Package plug-in
 */
CIQ.Share.createImage = function (stx, params, cb) {
	var args = [].slice.call(arguments);
	cb = args.pop();
	//imageType is in its location so developers don't need to change their current code.
	if (params === null || typeof params != "object")
		params = { widthPX: args[1], heightPX: args[2], imageType: args[3] };
	var widthPX = params.widthPX;
	var heightPX = params.heightPX;
	var imageType = params.imageType;

	// Set background for any part of canvas that is currently transparent NO LONGER NECESSARY????
	// CIQ.fillTransparentCanvas(stx.chart.context, stx.containerColor, stx.chart.canvas.width, stx.chart.canvas.height);

	// We use style height/width instead of the canvas width/height when the backing store is 2x on retina screens
	var renderedHeight = stx.chart.canvas.height;
	var renderedWidth = stx.chart.canvas.width;
	if (stx.chart.canvas.style.height) {
		renderedHeight = CIQ.stripPX(stx.chart.canvas.style.height);
		renderedWidth = CIQ.stripPX(stx.chart.canvas.style.width);
	}
	if (widthPX && heightPX) {
		renderedHeight = heightPX;
		renderedWidth = widthPX;
	} else if (heightPX) {
		renderedWidth =
			stx.chart.canvas.width * (renderedHeight / stx.chart.canvas.height);
	} else if (widthPX) {
		renderedWidth = widthPX;
		renderedHeight =
			stx.chart.canvas.height * (widthPX / stx.chart.canvas.width);
	}
	//var totalHeight=renderedHeight;
	var imageResult = imageType ? "image/" + imageType : "image/png";
	// Render the canvas as an image
	var shareImage = document.createElement("img");
	shareImage.onload = function () {
		// Print the image on a new canvas of appropriate size
		CIQ.Share.fullChart2PNG(
			stx,
			{
				image: this,
				width: renderedWidth,
				height: renderedHeight,
				hide: params.hide
			},
			function (err, canvas) {
				if (err) {
					console.warn("Error producing canvas snapshot: " + err);
				} else {
					try {
						cb(canvas.toDataURL(imageResult)); // return the data
					} catch (e) {
						console.warn(
							"Safari devices do not handle CORS enabled images. Using the charts' canvas as a fallback."
						);
						cb(shareImage.src);
					}
				}
			}
		);
	};
	shareImage.src = stx.chart.canvas.toDataURL(imageResult);
};

/**
 * Uploads an image to a server. The callback will take two parameters. The first parameter is an error
 * condition (server status), or null if there is no error. The second parameter (if no error) will contain
 * the response from the server.
 * 'payload' is an optional object that contains meta-data for the server. If payload exists then the image will be added as a member of the payload object, otherwise an object will be created
 * 'dataImage' should be a data representation of an image created by the call canvas.toDataURL such as is returned by CIQ.Share.createImage
 * If you are getting a status of zero back then you are probably encountering a cross-domain ajax issue. Check your access-control-allow-origin header on the server side

 * @param  {string}   dataImage Serialized data for image
 * @param  {string}   url       URL to send the image
 * @param  {object}   [payload]   Any additional data to send to the server should be sent as an object.
 * @param  {Function} cb        Callback when image is uploaded
 * @memberOf CIQ.Share
 * @version ChartIQ Advanced Package plug-in
 */
CIQ.Share.uploadImage = function (dataImage, url, payload, cb) {
	if (!payload) payload = {};
	payload.image = dataImage;
	var valid = CIQ.postAjax(
		url,
		JSON.stringify(payload),
		function (status, response) {
			if (status != 200) {
				cb(status, null);
				return;
			}
			cb(null, response);
		}
	);
	if (!valid) cb(0, null);
};

/**
 * Convenience function that serves as a wrapper for createImage and uploadImage.
 * It will create an image using the default parameters. If you wish to customize the image you must use {@link CIQ.Share.createImage} separately and then call {@link CIQ.Share.uploadImage}.
 * @param {CIQ.ChartEngine}	stx Chart Object
 * @param {object}  [override] Parameters that overwrite the default hosting location from https://share.chartiq.com to a custom location.
 * @param {object}	[override.host]
 * @param {object}	[override.path]
 * @param {function}	cb Callback when the image is uploaded.
 * @memberof CIQ.Share
 * @since 2015-11-01
 * @example
 *  // here is the exact code this convenience function is using
	CIQ.Share.createImage(stx, {}, function(imgData){
		var id=CIQ.uniqueID();
		var host="https://share.chartiq.com";
		var url= host + "/upload/" + id;
		if(override){
			if(override.host) host=override.host;
			if(override.path) url=host+override.path+"/"+id;
		}
		var startOffset=stx.getStartDateOffset();
		var metaData={
			"layout": stx.exportLayout(),
			"drawings": stx.exportDrawings(),
			"xOffset": startOffset,
			"startDate": stx.chart.dataSegment[startOffset].Date,
			"endDate": stx.chart.dataSegment[stx.chart.dataSegment.length-1].Date,
			"id": id,
			"symbol": stx.chart.symbol
		};
		var payload={"id": id, "image": imgData, "config": metaData};
		CIQ.Share.uploadImage(imgData, url, payload, function(err, response){
			if(err!==null){
				CIQ.alert("error sharing chart: ",err);
			}else{
				cb(host+response);
			}
		});
		// end sample code to upload image to a server
	});
 *
 */
CIQ.Share.shareChart = function (stx, override, cb) {
	CIQ.Share.createImage(stx, {}, function (imgData) {
		var id = CIQ.uniqueID();
		var host = "https://share.chartiq.com";
		var url = host + "/upload/" + id;
		if (override) {
			if (override.host) host = override.host;
			if (override.path) url = host + override.path + "/" + id;
		}
		var startOffset = stx.getStartDateOffset();
		var metaData = {
			layout: stx.exportLayout(),
			drawings: stx.exportDrawings(),
			xOffset: startOffset,
			startDate: stx.chart.dataSegment[startOffset].Date,
			endDate: stx.chart.dataSegment[stx.chart.dataSegment.length - 1].Date,
			id: id,
			symbol: stx.chart.symbol
		};
		var payload = { id: id, image: imgData, config: metaData };
		CIQ.Share.uploadImage(imgData, url, payload, function (err, response) {
			if (err !== null) {
				CIQ.alert("error sharing chart: ", err);
			} else {
				cb(host + response);
			}
		});
		// end sample code to upload image to a server
	});
};

/**
 * Persists the current chart layout to the cloud.
 * Returns an ID that can be used to retrieve the layout from the cloud.
 *
 * @param {CIQ.ChartEngine} stx Chart object
 * @return {Promise<string>} id
 * @memberOf CIQ.Share
 * @since 9.0.0
 */
CIQ.Share.saveChartLayout = async (stx) => {
	const { chartSharing } = stx.uiContext.config;

	if (!chartSharing || !chartSharing.saveChartLayout) {
		throw new Error("saveChartLayout not defined in config");
	}

	let dtLeft;

	if (stx.chart.dataSegment[0] && stx.chart.dataSegment[0].DT) {
		dtLeft = stx.chart.dataSegment[0].DT;
	} else if (stx.chart.dataSet[0]) {
		dtLeft = stx.chart.dataSet[0].DT;
	}

	if (!dtLeft) {
		throw new Error("Unable to retrieve starting point of data set or segment");
	}

	stx.layout.range = {
		padding: stx.preferences.whitespace,
		dtLeft: dtLeft,
		dtRight: stx.chart.dataSegment[stx.chart.dataSegment.length - 1].DT,
		periodicity: {
			period: stx.layout.periodicity,
			interval: stx.layout.interval,
			timeUnit: stx.layout.timeUnit
		}
	};

	const layout = stx.exportLayout({ withSymbols: true });
	const drawings = stx.exportDrawings();
	const preferences = stx.exportPreferences();
	const chartTitle = `${stx.chart.symbol} Chart`;

	return chartSharing.saveChartLayout(
		JSON.stringify({
			version: CIQ.packageInfo.version,
			layout,
			drawings,
			preferences,
			chartTitle
		})
	);
};

/**
 * Extracts shareID pattern from a given string.
 *
 * @private
 * @param {string} value
 * @memberOf CIQ.Share
 * @since 9.0.0
 */
CIQ.Share.extractShareID = (value) => {
	const match = value.match(
		/([a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+)/
	);
	return (match && match[1]) || "";
};

/**
 * Adds a listener for paste events on clipboard.
 *
 * @param {Function} cb
 * @memberOf CIQ.Share
 * @since 9.0.0
 */
CIQ.Share.onClipboard = (cb) => {
	window.addEventListener("paste", async function (e) {
		let pastedText = "";
		if (window.clipboardData && window.clipboardData.getData) {
			// IE
			pastedText = window.clipboardData.getData("Text");
		} else if (e.clipboardData && e.clipboardData.getData) {
			pastedText = e.clipboardData.getData("text/plain");
		}

		const shareID = CIQ.Share.extractShareID(pastedText);

		if (shareID) {
			cb(shareID);
		}
	});
};

/**
 * Attempts to read a shareID from the clipboard.
 *
 * @return {Promise<string>} shareID
 * @memberOf CIQ.Share
 * @since 9.0.0
 */
CIQ.Share.getClipboard = async () => {
	return new Promise(async (resolve) => {
		try {
			const shareID = CIQ.Share.extractShareID(
				await navigator.clipboard.readText()
			);

			resolve(shareID);
		} catch (e) {
			resolve("");
		}
	});
};

/**
 * Loads a chart with the configuration for the given shareID.
 *
 * @param {CIQ.ChartEngine} stx	Chart Object
 * @param {string} shareID  Share ID
 * @return {Promise<void>}
 * @memberOf CIQ.Share
 * @since 9.0.0
 */
CIQ.Share.loadChartFromID = async (stx, shareID) =>
	new Promise(async (resolve, reject) => {
		if (!shareID) {
			return reject();
		}

		const { getChartLayout } = stx.uiContext.config.chartSharing;
		const data = await getChartLayout(shareID),
			json = JSON.parse(data);

		resolve(CIQ.Share.loadChartFromLayout(stx, json));
	});

/**
 * Loads a chart with the given configuration.
 *
 * @param {object} chart Chart Object
 * @param {string} configuration  Share configuration
 * @return {Promise<void>}
 * @memberOf CIQ.Share
 * @since 9.0.0
 */
CIQ.Share.loadChartFromLayout = async (chart, configuration) =>
	new Promise(async (resolve, reject) => {
		if (
			configuration.version.split(".")[0] !=
			CIQ.packageInfo.version.split(".")[0]
		) {
			reject(new Error("Version mismatch"));
		}

		chart.importPreferences(configuration.preferences);

		chart.importLayout(configuration.layout, {
			managePeriodicity: true,
			preserveTicksAndCandleWidth: true,
			cb: () => {
				chart.importDrawings(configuration.drawings);
				chart.draw();
				resolve();
			}
		});
	});

};
__js_standard_share_(typeof window !== "undefined" ? window : global);
