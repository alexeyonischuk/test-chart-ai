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


import { CIQ as _CIQ, timezoneJS as _timezoneJS } from "../../js/chartiq.js";


let __js_standard_studies_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;
var timezoneJS =
	typeof _timezoneJS !== "undefined" ? _timezoneJS : _exports.timezoneJS;

if (CIQ.ChartEngine) {
	/**
	 * <span class="injection">INJECTABLE</span>
	 *
	 * This function is called when a highlighted study overlay is right clicked. If the overlay has an edit function (as many studies do), it will be called. Otherwise, it will remove the overlay.
	 * @param  {string} name The name (id) of the overlay
	 * @param  {boolean} [forceEdit] If true, then force edit menu
	 * @memberof CIQ.ChartEngine.AdvancedInjectable#
	 * @alias rightClickOverlay
	 */
	CIQ.ChartEngine.prototype.rightClickOverlay = function (name, forceEdit) {
		if (this.runPrepend("rightClickOverlay", arguments)) return;
		var sd = this.overlays[name];
		if (sd.editFunction) {
			sd.editFunction(forceEdit);
		} else {
			this.removeOverlay(name);
		}
		this.runAppend("rightClickOverlay", arguments);
	};

	/**
	 * <span class="injection">INJECTABLE</span>
	 *
	 * Registers an activated overlay study with the chart.
	 *
	 * This is the recommended method for registering an overlay study, rather than directly manipulating the [stxx.overlays]{@link CIQ.ChartEngine#overlays} object.
	 * @param {CIQ.Studies.StudyDescriptor} sd The study object
	 * @memberof CIQ.ChartEngine.AdvancedInjectable#
	 * @alias addOverlay
	 * @since 5.2.0
	 */
	CIQ.ChartEngine.prototype.addOverlay = function (sd) {
		if (this.runPrepend("addOverlay", arguments)) return;
		this.overlays[sd.name] = sd;
		this.runAppend("addOverlay", arguments);
	};

	/**
	 * <span class="injection">INJECTABLE</span>
	 *
	 * Removes an overlay (and the associated study)
	 * @param  {string} name The name (id) of the overlay
	 * @memberof CIQ.ChartEngine.AdvancedInjectable#
	 * @alias removeOverlay
	 */
	CIQ.ChartEngine.prototype.removeOverlay = function (name) {
		if (this.runPrepend("removeOverlay", arguments)) return;
		var mySD = this.overlays[name];
		if (mySD) {
			for (var o in this.overlays) {
				var sd = this.overlays[o];
				var fieldInputs = ["Field"];
				if (CIQ.Studies) fieldInputs = CIQ.Studies.getFieldInputs(sd);
				for (var f = 0; f < fieldInputs.length; f++) {
					// Study sd is reliant on an output from the about-to-be-deleted overlay
					var mapField = sd.inputs[fieldInputs[f]],
						series = mySD.inputs.Series;
					if (series && series !== "series")
						mapField = mapField.replace(" [" + series + "]", "");
					if (mapField in mySD.outputMap) {
						// Yucky, we should move to explicit parent nodes
						this.removeOverlay(sd.name);
					}
				}
			}

			this.cleanupRemovedStudy(mySD);
			var panel = this.panels[mySD.panel];
			delete this.overlays[name];
			this.checkForEmptyPanel(mySD.panel);
		}

		if (!this.currentlyImporting) {
			// silent mode while importing
			this.displaySticky();
			this.createDataSet();
			this.changeOccurred("layout");
		}
		this.resetDynamicYAxis();
		this.runAppend("removeOverlay", arguments);
	};

	/**
	 * Cleans up a removed study. called by {@link CIQ.ChartEngine#privateDeletePanel} or {@link CIQ.ChartEngine#removeOverlay}
	 * Calls removeFN, and plugins associated with study.
	 * Finally, removes study from layout.
	 * @param  {CIQ.ChartEngine} stx A chart object
	 * @param  {object} sd  A study descriptor
	 * @memberof CIQ.ChartEngine
	 * @private
	 * @since 2015-11-1
	 */
	CIQ.ChartEngine.prototype.cleanupRemovedStudy = function (sd) {
		if (!sd) return;
		if (sd.study.removeFN) sd.study.removeFN(this, sd);
		// delete any plugins associated with this study
		for (let p in this.plugins) {
			if (p.indexOf("{" + sd.id + "}") > -1) delete this.plugins[p];
		}
		// remove any signals associated with study
		if (sd.removeSignals) sd.removeSignals();
		// remove markers
		for (let field in sd.outputMap) {
			this.getMarkerArray("field", field).forEach((marker) => marker.remove());
		}

		if (this.layout.studies) delete this.layout.studies[sd.name];
		this.chart.state.studies.sorted = null; // nullify sort order
		delete this.overlays[sd.name];

		const { sd: repositioning } = this.repositioningAnchorSelector || {};
		if (repositioning && repositioning === sd) {
			this.repositioningAnchorSelector = null;
			const { anchorHandles } = this.controls;
			if (anchorHandles && anchorHandles[sd.uniqueId]) {
				anchorHandles[sd.uniqueId].highlighted = false;
				CIQ.Studies.displayAnchorHandleAndLine(
					this,
					sd,
					this.chart.dataSegment
				);
			}
		}

		if (CIQ.Studies) CIQ.Studies.removeStudySymbols(sd, this);
		if (this.quoteDriver) this.quoteDriver.updateSubscriptions();
	};

	/**
	 * Returns an array of studies that match the given filters.
	 *
	 * @param {object} params Parameters
	 * @param {string} [params.type] Filter for only studies of this type
	 * @param {object} [params.name] Filter for only studies that have this name
	 * @param {object} [params.output] Filter for only studies that contain this output name in the output map
	 * @return {array} Array of study descriptors
	 *
	 * @memberOf  CIQ.ChartEngine
	 * @since 9.1.0
	 */
	CIQ.ChartEngine.prototype.getStudies = function (params) {
		const { studies } = this.layout;
		var arr = [];
		if (studies) {
			for (let sd in studies) {
				const study = studies[sd];
				if (study.name === params.name || study.type === params.type)
					arr.push(study);
				else {
					const { outputMap } = study;
					if (outputMap && outputMap[params.output]) arr.push(study);
				}
			}
		}
		return arr;
	};
}

/**
 * Namespace for functionality related to studies (aka indicators).
 *
 * See {@tutorial Using and Customizing Studies} for additional details and a general overview about studies.
 * @namespace
 * @name CIQ.Studies
 */
CIQ.Studies = CIQ.Studies || function () {};

/**
 * Default Inputs.
 * Constants for when no inputs or outputs specified in studies.
 * Values can be changed but do not change keys.
 * @type {object}
 * @memberof CIQ.Studies
 */
CIQ.Studies.DEFAULT_INPUTS = { Period: 14 };
/**
 * Default Outputs.
 * Constants for when no inputs or outputs specified in studies.
 * Values can be changed but do not change keys.
 * @type {object}
 * @memberof CIQ.Studies
 */
CIQ.Studies.DEFAULT_OUTPUTS = { Result: "auto" };

/**
 * Implied volatility availability in data feed.
 *
 * @type boolean
 * @default
 * @alias impliedVolatilityAvailable
 * @static
 * @memberof CIQ.Studies
 * @since 8.6.0
 *
 */
CIQ.Studies.impliedVolatilityAvailable = false;

/**
 * Whether or not to use a delimiting character when generating study IDs
 *
 * @type boolean
 * @alias useTranslationDelimiter
 * @static
 * @memberof CIQ.Studies
 * @since 9.0.0
 */
CIQ.Studies.useTranslationDelimiter = true;

CIQ.Studies.sortForProcessing = (stx) => {
	function setIndependentStudies(list, arr) {
		list.forEach((study) => {
			if (arr.indexOf(study) == -1) {
				let dependents = study.getDependents(stx);
				if (dependents.length) setIndependentStudies(dependents, arr);
				arr.unshift(study);
			}
		});
	}
	let sortArray = [];
	const studies = stx.layout.studies;
	if (studies) {
		setIndependentStudies(Object.values(studies), sortArray);
	}
	return sortArray;
};

/**
 * Provides a unified way of accessing numeric quote data using
 * field keys from objects in a quote feed.
 *
 * @param {object} quote An item from a quote feed
 * @param {string} field The field key to extract from the quote feed object
 * @param {string} [subField="Close"] The sub field to retrieve if the field value is an object
 * @return {(number|null)} The value of the specified field in the quote object
 * @memberof CIQ.Studies
 * @static
 * @deprecated use {@link CIQ.ChartEngine.getQuoteFieldValue} instead
 * @since
 * - 8.9.1
 * - 9.4.0 Deprecated, use {@link CIQ.ChartEngine.getQuoteFieldValue} instead
 */
CIQ.Studies.getQuoteFieldValue = function (quote, field, subField = "Close") {
	return CIQ.ChartEngine.getQuoteFieldValue(quote, field, subField);
};

/**
 * Creates a study descriptor which contains all of the information necessary to handle a study. Also
 * provides convenience methods to extract information from it.
 *
 * Do not call directly or try to manually create your own study descriptor, but rather always use the one returned by {@link CIQ.Studies.addStudy}
 *
 * @param {string} name	   The name of the study. This should be unique to the chart. For instance if there are two RSI panels then they should be of different periods and named accordingly. Usually this is determined automatically by the library.
 * @param {string} type	   The type of study, which can be used as a look up in the StudyLibrary
 * @param {string} panel	  The name of the panel that contains the study
 * @param {object} inputs	 Names and values of input fields
 * @param {object} outputs	Names and values (colors) of outputs
 * @param {object} parameters Additional parameters that are unique to the particular study
 * @constructor
 * @name  CIQ.Studies.StudyDescriptor
 */
CIQ.Studies.StudyDescriptor = function (
	name,
	type,
	panel,
	inputs,
	outputs,
	parameters
) {
	/**
	 * The study's ID. Includes ZWNJ characters.
	 * **Please note:** To facilitate study name translations, study names use zero-width non-joiner (unprintable) characters to delimit the general study name from the specific study parameters.
	 * Example: "\u200c"+"Aroon"+"\u200c"+" (14)".
	 * At translation time, the library will split the text into pieces using the ZWNJ characters, parentheses, and commas to just translate the required part of a study name.
	 * For more information on ZWNJ characters see: [Zero-width_non-joiner](https://en.wikipedia.org/wiki/Zero-width_non-joiner).
	 * Please be aware of these ZWNJ characters, which will now be present in all study names and corresponding panel names; including the `layout.studies` study keys.
	 * Affected fields in the study descriptors could be `id	`, `display`, `name` and `panel`.
	 * <br>To prevent issues, always use the names returned in the **study descriptor**. This will ensure compatibility between versions.
	 * >Example:
	 * ><br>Correct reference:
	 * ><br>`stxx.layout.studies["\u200c"+"Aroon"+"\u200c"+" (14)"];`
	 * ><br>Incorrect reference:
	 * ><br>`stxx.layout.studies["Aroon (14)"];`
	 *
	 * @type {string}
	 * @memberof CIQ.Studies.StudyDescriptor#
	 * @alias name
	 */
	this.name = name;
	/**
	 * Display state of the study.
	 * @type {boolean}
	 * @memberof CIQ.Studies.StudyDescriptor#
	 * @alias disabled
	 * @since 8.7.0
	 */
	this.disabled = false;
	/**
	 * The study type.
	 * @type {string}
	 * @memberof CIQ.Studies.StudyDescriptor#
	 * @alias type
	 */
	this.type = type;
	/**
	 * ID of the panel element to which the study is attached.
	 * @type {string}
	 * @memberof CIQ.Studies.StudyDescriptor#
	 * @alias panel
	 */
	this.panel = panel;
	/**
	 * Keys for each possible study input with descriptors for the set and default values.
	 * @type {Object.<string, (string | number | boolean)>}
	 * @memberof CIQ.Studies.StudyDescriptor#
	 * @alias inputs
	 */
	this.inputs = inputs;
	/**
	 * Keys for each possible study output with its corresponding rendering color.
	 * @type {Object.<string, string | number>}
	 * @memberof CIQ.Studies.StudyDescriptor#
	 * @alias outputs
	 */
	this.outputs = outputs;
	/**
	 * Keys for each of the study's possible plot parameters.
	 * @type {Object.<string, string | number | boolean | Object.<string, string | number | boolean>>}
	 * @memberof CIQ.Studies.StudyDescriptor#
	 * @alias parameters
	 */
	this.parameters = parameters; // Optional parameters, i.e. zones.
	/**
	 * Mapping between a unique study field name in the dataSet/datSegment and its corresponding general `outputs` name/color, as set in the study library entry.<br>
	 * 		This mapping is automatically created and present on all study descriptors, and used by all default study functions to ensure data generated by a calculation function can be found by the display function.<br>
	 * @type {Object.<string, string | number>}
	 * @memberof CIQ.Studies.StudyDescriptor#
	 * @alias outputMap
	 * 		Example:
	 * ```
	 * // Map for an Alligator study with inputs of:
	 * // -Jaw Period:13
	 * // -Jaw Offset:8
	 * // -Teeth Period:8
	 * // -Teeth Offset:5
	 * // -Lips Period:5
	 * // -Lips Offset:3
	 * // -Show Fractals:false
	 *
	 * {
	 * 	"Jaw &zwnj;Alligator&zwnj; (13,8,8,5,5,3,n)":	"Jaw",
	 * 	"Teeth &zwnj;Alligator&zwnj; (13,8,8,5,5,3,n)":	"Teeth",
	 * 	"Lips &zwnj;Alligator&zwnj; (13,8,8,5,5,3,n)":	"Lips"
	 * }
	 * ```
	 */
	this.outputMap = {}; // Maps dataSet label to outputs label "RSI (14)" : "RSI", for the purpose of figuring color.
	/**
	 * The minimum data point.
	 * @type {number | null}
	 * @memberof CIQ.Studies.StudyDescriptor#
	 * @alias min
	 */
	this.min = null;
	/**
	 * The maximum data point.
	 * @type {number | null}
	 * @memberof CIQ.Studies.StudyDescriptor#
	 * @alias max
	 */
	this.max = null;
	this.startFrom = 0;
	this.subField = "Close"; // In case study is off a series
	var libraryEntry = CIQ.Studies.studyLibrary[type];
	if (!libraryEntry) {
		libraryEntry = {};
		if (
			panel == "chart" ||
			(!panel && parameters && parameters.chartName == "chart")
		)
			this.overlay = true;
	}
	if (typeof libraryEntry.inputs == "undefined")
		libraryEntry.inputs = CIQ.clone(CIQ.Studies.DEFAULT_INPUTS);
	if (typeof libraryEntry.outputs == "undefined")
		libraryEntry.outputs = CIQ.clone(CIQ.Studies.DEFAULT_OUTPUTS);

	this.study = libraryEntry;
	this.libraryEntry = libraryEntry; // deprecated, backwards compatibility
};

/**
 * Toggles the `disabled` property.
 * @param {CIQ.ChartEngine} stx CIQ.ChartEngine
 * @memberof CIQ.Studies.StudyDescriptor
 * @since 8.7.0
 */
CIQ.Studies.StudyDescriptor.prototype.toggleDisabledState = function (stx) {
	let { disabled, study, signalData } = this;
	const { chart } = stx;

	this.disabled = disabled = !disabled;

	if (!disabled) {
		this.startFrom = 0;
		this.error = null;
		if (study && study.calculateFN) study.calculateFN(stx, this);
		if (this.flagSignals) this.flagSignals();
	} else if (chart.customChart && chart.customChart.owner === this.name) {
		study.calculateFN(stx, this);
	}
	if (signalData) signalData[disabled ? "hide" : "show"]();
	stx.changeOccurred("layout");
	stx.draw();
};

/**
 * Returns the y-axis used by the study
 * @param {CIQ.ChartEngine} stx CIQ.ChartEngine
 * @memberof CIQ.Studies.StudyDescriptor
 * @return {CIQ.ChartEngine.YAxis} y-axis
 * @since 7.1.0
 */
CIQ.Studies.StudyDescriptor.prototype.getYAxis = function (stx) {
	var yAxis = this.yAxis;
	var specifiedYAxis;
	if (this.parameters) {
		specifiedYAxis = this.parameters.yAxis
			? this.parameters.yAxis.name
			: this.parameters.yaxisDisplayValue;
	}
	if (!yAxis) {
		var testPanel = stx.panels[this.panel];
		if (testPanel) {
			yAxis =
				stx.getYAxisByName(testPanel, specifiedYAxis) ||
				stx.getYAxisByName(testPanel, this.name) ||
				testPanel.yAxis;
		}
	}
	if (!yAxis)
		yAxis =
			stx.getYAxisByName(stx.chart.panel, specifiedYAxis) ||
			stx.chart.panel.yAxis;
	return yAxis;
};

/**
 * Returns the context to use for drawing the study
 * @param  {CIQ.ChartEngine} stx A chart object
 * @return {object} An HTML canvas context
 * @memberof CIQ.Studies.StudyDescriptor
 * @since 7.1.0
 */
CIQ.Studies.StudyDescriptor.prototype.getContext = function (stx) {
	// If the study is draggable it will be placed on the tempCanvas and so that canvas's context will be returned.
	//if(this.highlight && stx.highlightedDraggable) return stx.chart.tempCanvas.context;
	return stx.chart.context;
};

/**
 * Returns an array of all studies which depend on a given study.
 * A dependent study is one which uses an output of another study as input.
 * @param  {CIQ.ChartEngine} stx A chart object
 * @param  {boolean} [followsPanel] If true, will only return those studies which are not assigned to an explicit panel
 * @return  {array} Array of dependent studies
 * @memberof CIQ.Studies.StudyDescriptor
 * @since 7.1.0
 */
CIQ.Studies.StudyDescriptor.prototype.getDependents = function (
	stx,
	followsPanel
) {
	var dependents = [];
	for (var s in stx.layout.studies) {
		var dependent = stx.layout.studies[s];
		if (dependent == this) continue;
		var fieldInputs = CIQ.Studies.getFieldInputs(dependent);
		for (var f = 0; f < fieldInputs.length; f++) {
			var dependentName = dependent.inputs[fieldInputs[f]]
				.toLowerCase()
				.replace(/\u200c/g, "");
			var thisName = this.name.toLowerCase().replace(/\u200c/g, "");
			if (dependentName.includes(thisName)) {
				if (
					followsPanel &&
					dependent.parameters &&
					dependent.parameters.panelName
				)
					continue;
				dependents.push(dependent);
				dependents = dependents.concat(
					dependent.getDependents(stx, followsPanel)
				);
				break;
			}
		}
	}
	return dependents;
};

/**
 * Determines whether the study can be dragged to another axis or panel.
 *
 * @param {CIQ.ChartEngine} stx A chart object.
 * @return {boolean} true if not allowed to drag.
 * @memberof CIQ.Studies.StudyDescriptor
 * @since 7.3.0
 */
CIQ.Studies.StudyDescriptor.prototype.undraggable = function (stx) {
	if (this.signalData) return true;
	var attr = this.study.attributes;
	if (attr) {
		if (attr.panelName && attr.panelName.hidden) return true;
		if (attr.yaxisDisplayValue && attr.yaxisDisplayValue.hidden) return true;
	}
	return false;
};

/**
 * Adds extra ticks to the end of the scrubbed array, to be added later to the dataSet.
 *
 * This function can be used to add extra ticks, like offsets into the future, to the dataSet to be plotted ahead of the current bar.
 * If a DT is not supplied, one will be calculated for each tick in the array.
 *
 * Remember to call this outside of any loop that iterates through the quotes array, or you will create a never-ending loop, since this increases the array size.
 *
 * @param  {CIQ.ChartEngine} stx A chart engine instance
 * @param  {array} ticks The array of ticks to add. Each tick is an object containing whatever data to add.
 * @example
 * var futureTicks=[];
 * for(i++;i<quotes.length;i++){
 *     var quote=quotes[i];
 *     if(i+offset>=0){
 *         if(i+offset<quotes.length) quotes[i+offset][name]=quote["Forecast "+sd.name];
 *         else {
 *             var ft={};
 *             ft[name]=quote["Forecast "+sd.name];
 *             futureTicks.push(ft);
 *         }
 *     }
 * }
 * sd.appendFutureTicks(stx,futureTicks);
 *
 * @memberof CIQ.Studies
 * @since 7.3.0
 */
CIQ.Studies.StudyDescriptor.prototype.appendFutureTicks = function (
	stx,
	ticks
) {
	var scrubbed = stx.chart.scrubbed;
	if (!scrubbed.length) return;
	var iter = stx.standardMarketIterator(scrubbed[scrubbed.length - 1].DT);
	var t, tick;
	// pop off the records which have only nulls
	for (t = ticks.length - 1; t >= 0; t--) {
		tick = ticks[t];
		for (var prop in tick) {
			if (tick[prop] || tick[prop] === 0) {
				t = -1;
				break;
			}
		}
		if (t == -1) break;
		ticks.pop();
	}
	for (t = 0; t < ticks.length; t++) {
		tick = ticks[t];
		if (!tick.DT) tick.DT = iter.next();
		if (!tick.displayDate) stx.setDisplayDate(tick);
		tick.futureTick = true;
		scrubbed.push(tick);
	}
};

/**
 * Automatically generates a unique name for the study instance.
 *
 * If a translation callback has been associated with the chart object then the name of the study will be translated.
 * @param  {CIQ.ChartEngine} stx A chart engine instance.
 * @param  {string} studyName Type of study.
 * @param  {object} inputs The inputs for this study instance.
 * @param {string} [replaceID] If it matches, then return the same id.
 * @param {string} [customName] If this is supplied, use it to form the full study name. Otherwise `studyName` will be used. <br>ie: if custom name is 'SAMPLE', the unique name returned would resemble "SAMPLE(paam1,param2,param3,...)-X".
 * @return {string} A unique name for the study.
 * @memberof CIQ.Studies
 * @since 5.1.1 Added `customName` argument; if supplied, use it to form the full study name. Otherwise `studyName` will be used.
 */
CIQ.Studies.generateID = function (
	stx,
	studyName,
	inputs,
	replaceID,
	customName
) {
	var libraryEntry = CIQ.Studies.studyLibrary[studyName];
	var translationPiece = customName || studyName; // zero-width non-joiner (unprintable) to delimit translatable phrase

	if (CIQ.Studies.useTranslationDelimiter) {
		translationPiece = "\u200c" + translationPiece + "\u200c";
	}

	var id = translationPiece;
	if (libraryEntry) {
		// only one instance can exist at a time if custom removal, so return study name
		if (libraryEntry.customRemoval) return id;
	}
	if (!CIQ.isEmpty(inputs)) {
		var first = true;
		for (var field in inputs) {
			// some values do not merit being in the study name
			if (["id", "display", "Shading", "Anchor Selector"].includes(field)) {
				continue;
			}

			var val = inputs[field];
			if (val == "field") continue; // skip default, usually means "Close"
			if (field == "Series" && (val == "Primary" || val == "series")) continue; // Primary series
			val = val.toString();
			if (CIQ.Studies.prettify[val] !== undefined)
				val = CIQ.Studies.prettify[val];
			if (first) {
				first = false;
				id += " (";
			} else {
				if (val) id += ",";
			}
			id += val;
		}
		if (!first) id += ")";
	}

	//this tests if replaceID is just a warted version of id, in that case keep the old id
	if (replaceID === id || (replaceID && replaceID.indexOf(id + "-") === 0))
		return replaceID;

	// If the id already exists then we'll wart it by adding -N
	if (stx.layout.studies && stx.layout.studies[id]) {
		for (var i = 2; i < 50; i++) {
			var warted = id + "-" + i;
			if (!stx.layout.studies[warted]) {
				id = warted;
				break;
			}
		}
	}
	return id;
};

/**
 * A helper class for adding studies to charts, modifying studies, and creating study edit dialog
 * boxes.
 *
 * Study DialogHelpers are created from
 * [study definitions](tutorial-Using%20and%20Customizing%20Studies%20-%20Study%20objects.html#understanding_the_study_definition)
 * or
 * [study descriptors](tutorial-Using%20and%20Customizing%20Studies%20-%20Study%20objects.html#understanding_the_study_descriptor_object)
 * (see the examples below).
 *
 * A DialogHelper contains the inputs, outputs, and parameters of a study. Inputs configure the
 * study. Outputs style the lines and filled areas of the study. Parameters set chart&#8209;related
 * aspects of the study, such as the panel that contains the study or whether the study is an
 * underlay.
 *
 * For example, a DialogHelper for the Anchored VWAP study with the `axisSelect` parameter set to `true` contains the following data:
 * ```
 * inputs: Array(8)
 * 0: {name: "Field", heading: "Field", value: "Close", defaultInput: "Close", type: "select", …}
 * 1: {name: "Anchor Date", heading: "Anchor Date", value: "", defaultInput: "", type: "date"}
 * 2: {name: "Anchor Time", heading: "Anchor Time", value: "", defaultInput: "", type: "time"}
 * 3: {name: "Display 1 Standard Deviation (1σ)", heading: "Display 1 Standard Deviation (1σ)", value: false,
 *     defaultInput: false, type: "checkbox"}
 * 4: {name: "Display 2 Standard Deviation (2σ)", heading: "Display 2 Standard Deviation (2σ)", value: false,
 *     defaultInput: false, type: "checkbox"}
 * 5: {name: "Display 3 Standard Deviation (3σ)", heading: "Display 3 Standard Deviation (3σ)", value: false,
 *     defaultInput: false, type: "checkbox"}
 * 6: {name: "Shading", heading: "Shading", value: false, defaultInput: false, type: "checkbox"}
 * 7: {name: "Anchor Selector", heading: "Anchor Selector", value: true, defaultInput: true, type: "checkbox"}
 * outputs: Array(4)
 * 0: {name: "VWAP", heading: "VWAP", defaultOutput: "#FF0000", color: "#FF0000"}
 * 1: {name: "1 Standard Deviation (1σ)", heading: "1 Standard Deviation (1σ)", defaultOutput: "#e1e1e1", color: "#e1e1e1"}
 * 2: {name: "2 Standard Deviation (2σ)", heading: "2 Standard Deviation (2σ)", defaultOutput: "#85c99e", color: "#85c99e"}
 * 3: {name: "3 Standard Deviation (3σ)", heading: "3 Standard Deviation (3σ)", defaultOutput: "#fff69e", color: "#fff69e"}
 * parameters: Array(4)
 * 0: {name: "panelName", heading: "Panel", defaultValue: "Auto", value: "Auto", options: {…}, …}
 * 1: {name: "underlay", heading: "Show as Underlay", defaultValue: false, value: undefined, type: "checkbox"}
 * 2: {name: "yaxisDisplay", heading: "Y-Axis", defaultValue: "default", value: "shared", options: {…}, …}
 * 3: {name: "flipped", heading: "Invert Y-Axis", defaultValue: false, value: false, type: "checkbox"}
 * ```
 *
 * which corresponds to the fields of the Study Edit dialog box:
 *
 * <img src="./img-AVWAP-Edit-Dialog-Box.png" alt="AVWAP study edit dialog box">
 *
 * DialogHelpers also contain `attributes` which specify the formatting of dialog box input
 * fields. For example, the DialogHelper for the Anchored VWAP study contains the following:
 * ```
 * attributes:
 *     Anchor Date: {placeholder: "yyyy-mm-dd"}
 *     Anchor Time: {placeholder: "hh:mm:ss", step: 1}
 * ```
 *
 * The `placeholder` property (in addition to its normal HTML function of providing placeholder
 * text) determines the input type of date and time fields. If the property value is "yyyy-mm-dd"
 * for a date field, the field in the edit dialog box is a date input type instead of a string
 * input. If the value is "hh:mm:ss" for a time field, the field is a time input type instead of a
 * string. If the `hidden` property of a field is set to true, the field is excluded from the
 * study edit dialog box.
 *
 * In the Anchored VWAP edit dialog box (see above), the Anchor Date field is formatted as a date
 * input type; Anchor Time, as a time input type.
 *
 * **Note:** Actual date/time displays are browser dependent. The time is displayed in the
 * `displayZone` time zone. Time values are converted to the `dataZone` time zone before being
 * used internally so they always match the time zone of `masterData`. See
 * {@link CIQ.ChartEngine#setTimeZone}.
 *
 * For more information on DialogHelpers, see the
 * {@tutorial Using and Customizing Studies - Advanced} tutorial.
 *
 * @see {@link CIQ.Studies.addStudy} to add a study to the chart using the inputs, outputs, and
 * 		parameters of a DialogHelper.
 * @see {@link CIQ.Studies.DialogHelper#updateStudy} to add or modify a study.
 * @see {@link CIQ.UI.StudyEdit} to create a study edit dialog box using a DialogHelper.
 *
 * @param {object} params Constructor parameters.
 * @param {string} [params.name] The name of a study. The DialogHelper is created from the study's
 * 		definition. Must match a name specified in the
 * 		[study library]{@link CIQ.Studies.studyLibrary}. Ignored if `params.sd` is provided.
 * @param {CIQ.Studies.StudyDescriptor} [params.sd] A study descriptor from which the
 * 		DialogHelper is created. Takes precedence over `params.name`.
 * @param {boolean} [params.axisSelect] If true, the parameters property of the DialogHelper
 * 		includes options for positioning the study y-axis, setting the y-axis color, and
 * 		inverting the y-axis.
 * @param {boolean} [params.panelSelect] If true, the parameters property of the DialogHelper
 * 		includes the Show as Underlay option and a list of panels in which the study can be
 * 		placed.
 * @param {CIQ.ChartEngine} params.stx The chart object associated with the DialogHelper.
 *
 * @name CIQ.Studies.DialogHelper
 * @constructor
 * @since
 * - 6.3.0 Added parameters `axisSelect` and `panelSelect`. If a placeholder attribute of
 * 		`yyyy-mm-dd` or `hh:mm:ss` is set on an input field, the dialog displays a date or time
 * 		input type instead of a string input type.
 * - 7.1.0 It is expected that the study dialog's parameters section is refreshed whenever the
 * 		DialogHelper changes. The "signal" member should be observed to see if it has flipped.
 * - 8.2.0 Attribute property values in the study definition can now be functions. See the
 * 		[Input Validation](tutorial-Using%20and%20Customizing%20Studies%20-%20Advanced.html#InputValidation)
 * 		section of the {@tutorial Using and Customizing Studies - Advanced} tutorial.
 *
 * @example <caption>Create a DialogHelper from a study definition.</caption>
 * let helper = new CIQ.Studies.DialogHelper({ name: "ma", stx: stxx })
 *
 * @example <caption>Create a DialogHelper from a study descriptor.</caption>
 * let sd = CIQ.Studies.addStudy(stxx, "Aroon");
 * let helper = new CIQ.Studies.DialogHelper({ sd: sd, stx: stxx, axisSelect: true });
 *
 * @example <caption>Display the DialogHelper inputs, outputs, parameters, and attributes.</caption>
 * let helper = new CIQ.Studies.DialogHelper({ name: "stochastics", stx: stxx });
 * console.log("Inputs:", JSON.stringify(helper.inputs));
 * console.log("Outputs:", JSON.stringify(helper.outputs));
 * console.log("Parameters:", JSON.stringify(helper.parameters));
 * console.log("Attributes:", JSON.stringify(helper.attributes));
 */
CIQ.Studies.DialogHelper = function (params) {
	const stx = (this.stx = params.stx);
	let sd = (this.sd = params.sd);
	this.name = sd ? sd.type : params.name;
	this.signal = 1; // for observing changes
	this.inputs = [];
	this.outputs = [];
	this.parameters = [];
	const libraryEntry = (this.libraryEntry = sd
		? sd.study
		: CIQ.Studies.studyLibrary[params.name]);
	if (typeof libraryEntry.inputs == "undefined")
		libraryEntry.inputs = CIQ.clone(CIQ.Studies.DEFAULT_INPUTS);
	if (typeof libraryEntry.outputs == "undefined")
		libraryEntry.outputs = CIQ.clone(CIQ.Studies.DEFAULT_OUTPUTS);
	const panel = (sd && stx.panels[sd.panel]) || stx.chart.panel,
		chart = panel.chart;

	this.title = stx.translateIf(libraryEntry.name);

	this.attributes = CIQ.clone(libraryEntry.attributes);
	if (!this.attributes) this.attributes = {};

	for (let attrField in this.attributes) {
		const attributes = this.attributes[attrField];
		for (let attr in attributes) {
			if (typeof attributes[attr] == "function")
				attributes[attr] = attributes[attr].call(sd || libraryEntry);
		}
	}

	function hideTheField(fieldName, condition) {
		const helper = this;
		if (!helper.attributes[fieldName]) helper.attributes[fieldName] = {};
		if (condition) helper.attributes[fieldName].hidden = true;
	}
	// build array of study outputs which should be considered valid fields in the study dialog "Field" dropdown
	const actualOutputs = [],
		s = stx.layout.studies;
	let excludes = [];
	if (sd) excludes = Array.prototype.concat(sd, sd.getDependents(stx));
	for (let n in s) {
		if (s[n].signalData) continue; // don't include signalling studies
		if (excludes.indexOf(s[n]) > -1) continue; // don't include its own fields or its dependents' fields
		for (let actualOutput in s[n].outputMap) {
			const joiner = CIQ.Studies.useTranslationDelimiter ? "\u200c" : "";
			if (s[n].inputs.Series && s[n].inputs.Series !== "series")
				actualOutput = `${joiner}${actualOutput}${joiner} [${s[n].inputs.Series}]`;
			actualOutputs.push(actualOutput);
		}
	}

	/*
		This code loops through the acceptable inputs for the study in question. The format of the input default in the studyLibrary determines what type of input
		is required. For instance a number requires an input field. A string will produce a select box, of moving averages for instance if the string is "ma".
		If the string is "field" then a select box of acceptable fields is displayed. Likewise, an array will show up as a select box.
		 */
	for (let i in libraryEntry.inputs) {
		const input = {};
		this.inputs.push(input);
		input.name = i;
		input.heading = stx.translateIf(i);
		const acceptedData = libraryEntry.inputs[i];
		if (
			sd &&
			sd.inputs &&
			typeof sd.inputs[i] != "undefined" &&
			sd.inputs[i] !== null
		)
			input.value = sd.inputs[i];
		else input.value = libraryEntry.inputs[i];

		input.defaultInput = libraryEntry.inputs[i];
		if (!this.attributes[i])
			this.attributes[i] = CIQ.Studies.inputAttributeDefaultGenerator(
				input.defaultInput
			);

		if (acceptedData.constructor == Number) {
			input.type = "number";
		} else if (acceptedData.constructor == String) {
			const isMA = CIQ.Studies.movingAverageHelper(stx, input.defaultInput);
			if (isMA) {
				input.type = "select";
				input.defaultInput = isMA;
				let converted = CIQ.Studies.movingAverageHelper(stx, input.value);
				if (!converted) converted = input.value;
				input.value = converted;
				input.options = CIQ.Studies.movingAverageHelper(stx, "options");
			} else if (acceptedData == "field") {
				// Get a list of comparison study symbols
				const series = stx.chart.series,
					comparisonFields = [];
				for (let symbol in series) {
					const { parameters } = series[symbol];
					if (parameters && parameters.isComparison)
						comparisonFields.push(symbol);
				}
				input.type = "select";
				input.options = {};
				const studyFields = [
					"Open",
					"High",
					"Low",
					"Close",
					"hl/2",
					"hlc/3",
					"hlcc/4",
					"ohlc/4",
					chart.defaultPlotField
				].concat(actualOutputs, comparisonFields);
				if (stx.layout.adj) {
					studyFields.splice(4, 0, "Adj_Close");
				}
				for (let field = 0; field < studyFields.length; field++) {
					const fieldText = studyFields[field];
					input.options[fieldText] = stx.translateIf(fieldText);
				}
				if (input.value == "field") {
					input.value = "Close";
				}
				if (input.defaultInput == "field") {
					input.defaultInput = "Close";
				}
			} else if (acceptedData == "series") {
				input.options = Object.keys(stx.chart.series).reduce(
					(acc, key) => {
						const { display, parameters } = stx.chart.series[key];
						const symbol = (parameters || {}).symbol || key;
						return { ...acc, [symbol]: display || key };
					},
					{ Primary: "Primary" }
				);

				if (
					!input.value ||
					input.value === "series" ||
					input.value === "field"
				) {
					input.value = "Primary";
				}

				input.type = "select";
				if (input.defaultInput == "field") {
					input.defaultInput = "Primary";
				}
			} else {
				input.type = "text";
				if (this.attributes[i].placeholder == "yyyy-mm-dd") input.type = "date";
				else if (this.attributes[i].placeholder == "hh:mm:ss")
					input.type = "time";
			}
		} else if (acceptedData.constructor == Boolean) {
			input.type = "checkbox";
			if (input.value === true || input.value == "true" || input.value == "on")
				input.value = true;
		} else if (acceptedData.constructor == Array) {
			input.type = "select";
			input.options = {};
			for (let ii = 0; ii < acceptedData.length; ii++) {
				input.options[acceptedData[ii]] = stx.translateIf(acceptedData[ii]);
			}
			if (input.value.constructor == Array) {
				input.value = input.value[0];
			}
			if (this.attributes[i].defaultSelected) {
				input.defaultInput = this.attributes[i].defaultSelected;
			} else {
				input.defaultInput = acceptedData[0];
			}
		}
	}

	// find datetime inputs (these have two fields named "xyz Date" and "xyz Time").  We extract the xyz and put in array
	this.dateTimeInputs = [];
	for (let dateInput = 0; dateInput < this.inputs.length; dateInput++) {
		const date = this.inputs[dateInput];
		if (date.type == "date") {
			const fieldName = date.name.substring(0, date.name.indexOf(" Date"));
			for (let timeInput = 0; timeInput < this.inputs.length; timeInput++) {
				const time = this.inputs[timeInput];
				if (time.type == "time") {
					if (time.name == fieldName + " Time") {
						this.dateTimeInputs.push(fieldName);
						break;
					}
				}
			}
		}
	}

	// adjust date inputs for displayZone
	this.adjustInputTimesForDisplayZone();

	/*
		Outputs are much simpler than inputs. Outputs are simply a list of available outputs and the selected color for that output. So here
		we print a line item in the dialog for each output and attach a color picker to it. The color picker is obtained from the Context.
		 */

	for (let i in libraryEntry.outputs) {
		const output = {
			name: i,
			heading: stx.translateIf(i)
		};

		output.color = output.defaultOutput = libraryEntry.outputs[i];
		if (sd && sd.outputs && sd.outputs[i]) output.color = sd.outputs[i];
		if (output.color == "auto") {
			output.color = stx.defaultColor;
			output.isAuto = true;
		}
		this.outputs.push(output);
	}

	/* And now the parameters */
	const parameters = sd ? sd.parameters : null;
	if (libraryEntry.parameters) {
		const init = libraryEntry.parameters.init;
		if (init) {
			let obj;
			if (init.studyOverZonesEnabled !== undefined) {
				obj = {
					name: "studyOverZones",
					heading: stx.translateIf("Show Zones"),
					defaultValue: init.studyOverZonesEnabled,
					value: init.studyOverZonesEnabled
				};
				if (
					parameters &&
					(parameters.studyOverZonesEnabled ||
						parameters.studyOverZonesEnabled === false)
				) {
					obj.value = parameters.studyOverZonesEnabled;
				}
				obj.type = "checkbox";
				this.parameters.push(obj);
			}

			if (init.studyOverBoughtValue !== undefined) {
				obj = {
					name: "studyOverBought",
					heading: stx.translateIf("OverBought"),
					defaultValue: init.studyOverBoughtValue,
					value: init.studyOverBoughtValue,
					defaultColor: init.studyOverBoughtColor,
					color: init.studyOverBoughtColor
				};
				if (parameters && parameters.studyOverBoughtValue)
					obj.value = parameters.studyOverBoughtValue;
				if (parameters && parameters.studyOverBoughtColor)
					obj.color = parameters.studyOverBoughtColor;
				if (obj.color == "auto") {
					obj.color = stx.defaultColor;
					obj.isAuto = true;
				}
				obj.type = "text";
				this.parameters.push(obj);
			}

			if (init.studyOverSoldValue !== undefined) {
				obj = {
					name: "studyOverSold",
					heading: stx.translateIf("OverSold"),
					defaultValue: init.studyOverSoldValue,
					value: init.studyOverSoldValue,
					defaultColor: init.studyOverSoldColor,
					color: init.studyOverSoldColor
				};
				if (parameters && parameters.studyOverSoldValue)
					obj.value = parameters.studyOverSoldValue;
				if (parameters && parameters.studyOverSoldColor)
					obj.color = parameters.studyOverSoldColor;
				if (obj.color == "auto") {
					obj.color = stx.defaultColor;
					obj.isAuto = true;
				}
				obj.type = "text";
				this.parameters.push(obj);
			}

			if (!this.attributes.studyOverBoughtValue)
				this.attributes.studyOverBoughtValue = {};
			if (!this.attributes.studyOverSoldValue)
				this.attributes.studyOverSoldValue = {};
		}
	}

	/* Automatic parameters such as panel and axis, if enabled */
	function selectObject(sourceObj) {
		const options = {},
			defaults = sourceObj.defaults,
			obj = {
				name: sourceObj.name,
				heading: stx.translateIf(sourceObj.label),
				defaultValue: defaults[0],
				value: sourceObj.value,
				options,
				type: "select"
			};

		for (let i = 0; i < defaults.length; i++) {
			options[defaults[i]] = stx.translateIf(defaults[i]);
		}

		if (sourceObj.color !== undefined) {
			obj.defaultColor = stx.defaultColor;
			obj.color = sourceObj.color;
		}

		return obj;
	}
	function checkboxObject(sourceObj) {
		const obj = {
			name: sourceObj.name,
			heading: stx.translateIf(sourceObj.label),
			defaultValue: sourceObj.defaults,
			value: sourceObj.value,
			type: "checkbox"
		};

		return obj;
	}
	let panelSelect = (this.panelSelect = params.panelSelect),
		axisSelect = (this.axisSelect = params.axisSelect);
	function alias(panel) {
		function format(p, i) {
			return "Panel " + i.toString();
		}
		if (panelSelect == "alias") {
			let i = 1;
			for (let p in stx.panels) {
				if (p == panel) return format(p, i);
				i++;
			}
		}
		return panel;
	}
	// not allowed to pick panel or axis if we pop up the dialog before the study is added.
	if (params.addWhenDone) axisSelect = panelSelect = false;
	if (axisSelect || panelSelect) {
		if (!sd) {
			sd = CIQ.Studies.addStudy(stx, params.name, null, null, {
				calculateOnly: true
			});
			CIQ.Studies.removeStudy(stx, sd);
		}
		if (panelSelect) {
			this.parameters.push(
				selectObject({
					label: "Panel",
					name: "panelName",
					defaults: (function () {
						const defaults = [];
						defaults.push("Auto");
						for (let pnl in stx.panels) {
							if (pnl != sd.panel || !parameters || !parameters.panelName)
								if (!stx.panels[pnl].noDrag) defaults.push(alias(pnl));
						}
						if (!stx.checkForEmptyPanel(sd.panel, true, sd))
							defaults.push("New panel");
						return defaults;
					})(),
					value:
						parameters && parameters.panelName
							? alias(parameters.panelName)
							: "Auto"
				}),
				checkboxObject({
					label: "Show as Underlay",
					name: "underlay",
					defaults: false,
					value: sd.underlay || (sd.parameters && sd.parameters.underlayEnabled)
				})
			);
		}
		const myAxis = stx.getYAxisByName(panel, sd.name);
		if (axisSelect) {
			this.parameters.push(
				selectObject({
					label: "Y-Axis",
					name: "yaxisDisplay",
					defaults: (function () {
						const yaxes = panel.yaxisLHS.concat(panel.yaxisRHS),
							defaults = [];
						defaults.push("default", "right", "left", "none", "shared");
						for (let yax = 0; yax < yaxes.length; yax++) {
							if (yaxes[yax] != myAxis) defaults.push(yaxes[yax].name);
						}
						return defaults;
					})(),
					value:
						(parameters && parameters.yaxisDisplayValue) ||
						(myAxis && myAxis.position) ||
						(!myAxis ? "shared" : "default"),
					color: (myAxis && myAxis.textStyle) || "auto"
				}),
				checkboxObject({
					label: "Invert Y-Axis",
					name: "flipped",
					defaults: false,
					value:
						parameters && parameters.flippedEnabled !== undefined
							? parameters.flippedEnabled
							: myAxis
							? myAxis.flipped
							: false
				})
			);
		}

		hideTheField.call(this, "flippedEnabled", !myAxis && sd.panel != sd.name);
		hideTheField.call(this, "underlayEnabled", libraryEntry.underlay);
		hideTheField.call(this, "panelName", libraryEntry.seriesFN === null);
		hideTheField.call(
			this,
			"yaxisDisplayValue",
			libraryEntry.seriesFN === null ||
				(libraryEntry.yAxis && libraryEntry.yAxis.noDraw)
		);
	}
};

/**
 * Updates or adds the study represented by the DialogHelper.
 *
 * When a study has been added using this function, a study descriptor is stored in the `sd`
 * property of the DialogHelper.
 *
 * When a study has been updated using this function, all DialogHelper properties, including `sd`,
 * are updated to reflect the changes. However, other DialogHelper instances of the same study
 * type are not updated. For example, the inputs, outputs, and parameters of a DialogHelper will
 * not contain any new values as a result of another DialogHelper's update.
 *
 * @param {object} updates Contains values for the `inputs`, `outputs`, and `parameters`
 * 		properties of the DialogHelper.
 *
 * @memberof CIQ.Studies.DialogHelper
 *
 * @example <caption>Add and update a study.</caption>
 * // Add the study.
 * let aroonSd = CIQ.Studies.addStudy(stxx, "Aroon");
 *
 * // Create a DialogHelper.
 * let dialogHelper = new CIQ.Studies.DialogHelper({ stx: stxx, sd: aroonSd });
 *
 * // Move the study to the chart panel.
 * dialogHelper.updateStudy({ parameters: { panelName: "chart" } });
 *
 * // Move the study back to its own panel.
 * dialogHelper.updateStudy({ parameters: { panelName: "New panel" } });
 *
 * @example <caption>Add a customized study.</caption>
 * let helper = new CIQ.Studies.DialogHelper({ stx: stxx, name: "AVWAP" });
 * helper.updateStudy({ inputs: { Field: "High" },
 *                      outputs: { VWAP: "#ff0" },
 *                      parameters: { panelName: "New Panel" }
 * });
 *
 * @example <caption>Update a study and get the updated study descriptor.</caption>
 * let helper = new CIQ.Studies.DialogHelper({ stx: stxx, name: "Aroon" });
 * helper.updateStudy({ inputs: { Period: 60 } });
 * let updatedSd = helper.sd;
 *
 * @since 6.3.0 This DialogHelper instance is refreshed after an update; recreating it is no
 * 		longer necessary.
 */
CIQ.Studies.DialogHelper.prototype.updateStudy = function (updates) {
	var newParams = {};
	var sd = this.sd;
	var libraryEntry = this.libraryEntry;
	if (!libraryEntry) libraryEntry = {};
	if (!sd) sd = libraryEntry;
	newParams.inputs = CIQ.clone(sd.inputs);
	newParams.outputs = CIQ.clone(sd.outputs);
	newParams.parameters = CIQ.clone(sd.parameters);

	// adjust date inputs for displayZone
	this.adjustInputTimesForDisplayZone(updates);

	function dealias(panel) {
		var helper = this;
		function extractPanelNumber(p) {
			var match = p.match(/.{0,50} (\d)/);
			return match && match[1];
		}
		if (helper.panelSelect == "alias") {
			var i = extractPanelNumber(panel);
			if (i) {
				for (var p in helper.stx.panels) {
					if (!--i) return p;
				}
			}
		}
		return panel;
	}

	if (updates.parameters && updates.parameters.panelName) {
		updates.parameters.panelName = dealias.call(
			this,
			updates.parameters.panelName
		);
	}
	CIQ.extend(newParams, updates);
	if (!newParams.parameters) newParams.parameters = {};
	if (newParams.inputs && newParams.inputs.id) {
		sd = CIQ.Studies.replaceStudy(
			this.stx,
			newParams.inputs.id,
			this.name,
			newParams.inputs,
			newParams.outputs,
			newParams.parameters,
			null,
			sd.study
		);
	} else {
		sd = CIQ.Studies.addStudy(
			this.stx,
			this.name,
			newParams.inputs,
			newParams.outputs,
			newParams.parameters,
			null,
			sd.study
		);
	}
	var newHelper = new CIQ.Studies.DialogHelper({
		stx: this.stx,
		sd: sd,
		axisSelect: this.axisSelect,
		panelSelect: this.panelSelect
	});
	for (var obj in newHelper) {
		if (obj != "signal") this[obj] = newHelper[obj];
	}
	this.signal *= -1; // signal a change to an observer
};

/**
 * Adjust all date and time fields in the DialogHelper to use the display zone.
 *
 * This function can adjust both to and from the display zone depending on the presence of the second argument.
 * When creating the DialogHelper, the second argument is null, and any date and time in the study descriptor's inputs is converted to display zone when stored in the DialogHelper's `inputs` property.
 * When updating the DialogHelper, the second argument contains any changed fields.  If a date or time has been changed, it is converted back from display zone so it can be stored correctly in the study descriptor.  It is assumed that the updated date and time are in display zone already.
 * The function adjusts the time by changing the `updates` object if it is passed, or the `inputs` property if it is not.
 *
 * In the example below, it is assumed that there are input fields named "Anchor Date" and "Anchor Time".  Whenever you want to set up an input field with date and time, use this convention:
 * Name both fields the same name and add " Date" to one and " Time" to the other.
 *
 * @param  {Object} [updates] If updating, it should contain an object with updates to the `inputs` object used in {@link CIQ.Studies.addStudy}.
 * @memberof CIQ.Studies.DialogHelper
 * @example
 * var helper=new CIQ.Studies.DialogHelper({sd:sd, stx:stx});
 * var updates={inputs:{"Anchor Time":"06:00"}};
 * helper.adjustInputTimesForDisplayZone(updates});
 *
 * @since 6.3.0
 */
CIQ.Studies.DialogHelper.prototype.adjustInputTimesForDisplayZone = function (
	updates
) {
	if (this.stx.displayZone) {
		// adjust date inputs for displayZone
		for (var dtField = 0; dtField < this.dateTimeInputs.length; dtField++) {
			var field = this.dateTimeInputs[dtField];
			// build the date string
			var i,
				newDate,
				newTime,
				thisInput,
				dtStr = "";
			if (updates && updates.inputs) {
				newDate = updates.inputs[field + " Date"];
				newTime = updates.inputs[field + " Time"];
				if (newDate) dtStr = newDate;
				if (newTime) dtStr += newTime;
			}
			for (i = 0; i < this.inputs.length; i++) {
				thisInput = this.inputs[i];
				if (!newDate && newDate !== "" && thisInput.name == field + " Date")
					dtStr = thisInput.value + dtStr;
				else if (
					!newTime &&
					newTime !== "" &&
					thisInput.name == field + " Time"
				)
					dtStr += thisInput.value;
			}
			dtStr = dtStr.replace(/\D/g, "");
			if (dtStr.length < 12) return; // date only
			// create date object and adjust
			var datetime = CIQ.strToDateTime(dtStr);
			var adjDate;
			if (!isNaN(datetime.valueOf())) {
				if (updates) {
					if (!updates.inputs) updates.inputs = {};
					adjDate = CIQ.convertTimeZone(datetime, this.stx.displayZone);
					updates.inputs[field + " Date"] = CIQ.yyyymmdd(adjDate);
					updates.inputs[field + " Time"] = CIQ.hhmmss(adjDate);
				} else {
					adjDate = CIQ.convertTimeZone(datetime, null, this.stx.displayZone);
					for (i = 0; i < this.inputs.length; i++) {
						thisInput = this.inputs[i];
						if (thisInput.name == field + " Date")
							thisInput.value = CIQ.yyyymmdd(adjDate);
						if (thisInput.name == field + " Time")
							thisInput.value = CIQ.hhmmss(adjDate);
					}
				}
			}
		}
	}
};

/**
 * Prepares a study descriptor for use by assigning default calculation or display functions if required and configuring the outputMap
 * which is used internally to determine the color for each output.
 * @private
 * @param  {CIQ.ChartEngine} stx A chart object
 * @param  {object} study The study library entry
 * @param  {CIQ.Studies.StudyDescriptor} sd The study descriptor being prepared
 * @memberOf CIQ.Studies
 * @since
 * - 6.2.0 Added `calculateOnly` parameter.
 * - 7.1.0 Removed `calculateOnly` parameter. Moved rejigger functionality out and into
 * 		[replaceStudy]{@link CIQ.Studies.replaceStudy}.
 */
CIQ.Studies.prepareStudy = function (stx, study, sd) {
	if (typeof study.calculateFN == "undefined") study.useRawValues = true;
	//if(typeof(study.seriesFN)=="undefined") study.seriesFN=CIQ.Studies.displaySeriesAsLine;

	// Unless overridden by the calculation function we assume the convention that the dataSet entries
	// will begin with the output name such as "RSI rsi (14)"
	if (CIQ.isEmpty(sd.outputMap)) {
		for (var i in sd.outputs) {
			if (study.useRawValues) {
				sd.outputMap[i] = i;
			} else {
				sd.outputMap[i + " " + sd.name] = i;
			}
		}
	}
};

/**
 * Fixes any derived studies or drawings that were based off of a study that has just changed.
 * This is called after the study has been modified.
 *
 * For instance a moving average on another overlay, or a moving average on an RSI.<br>
 * The panel name needs to change and the input "Field".
 * @private
 * @param  {CIQ.ChartEngine} stx	   The stx instance
 * @param  {CIQ.Studies.StudyDescriptor} masterStudy The old study whose dependents are to be rejiggered
 * @param  {string} newID	 The new ID for the underlying study
 * @memberof CIQ.Studies
 * @since
 * - 5.2.0 Removed `panelID` argument.
 * - 7.0.0 Also fixes drawings.
 * - 7.1.0 Changed second argument.
 */
CIQ.Studies.rejiggerDerivedStudies = function (stx, masterStudy, newID) {
	var replaceID = masterStudy.name;
	var oldPanel = masterStudy.panel;
	var dependents = masterStudy.getDependents(stx);
	for (var s = 0; s < dependents.length; s++) {
		var st = dependents[s];
		var inputs = CIQ.clone(st.inputs);
		var oldId = inputs.id;
		if (!oldId) continue;
		var fieldInputs = CIQ.Studies.getFieldInputs(st);
		for (var f = 0; f < fieldInputs.length; f++) {
			inputs[fieldInputs[f]] = inputs[fieldInputs[f]].replace(replaceID, newID);
		}
		var sd = CIQ.Studies.replaceStudy(
			stx,
			oldId,
			st.type,
			inputs,
			st.outputs,
			CIQ.extend(st.parameters, { rejiggering: true }),
			null,
			st.study
		);
		delete sd.parameters.rejiggering;
	}
};

/**
 * Removes any series that the study is referencing.
 *
 * @param {object} sd Study descriptor.
 * @param {CIQ.ChartEngine} stx The chart engine.
 *
 * @memberof CIQ.Studies
 * @since
 * - 3.0.0
 * - 3.0.7 Changed `name` argument to take a study descriptor.
 * - 3.0.7 Added required `stx` argument.
 */
CIQ.Studies.removeStudySymbols = function (sd, stx) {
	if (sd.series) {
		for (var s in sd.series) {
			stx.deleteSeries(sd.series[s], null, { action: "remove-study" });
		}
	}
	//stx.draw();
};

/**
 * Replaces an existing study with new inputs, outputs and parameters.
 *
 * When using this method a study's position in the stack will remain the same. Derived (child) studies will shift to use the new study as well
 * @param {CIQ.ChartEngine} stx		The chart object
 * @param {string} id 		The id of the current study. If set, then the old study will be replaced
 * @param {string} type	   The name of the study (out of the studyLibrary)
 * @param {object} [inputs]	 Inputs for the study instance. Default is those defined in the studyLibrary.
 * @param {object} [outputs]	Outputs for the study instance. Default is those defined in the studyLibrary.
 * @param {object} [parameters] additional custom parameters for this study if supported or required by that study
 * @param {string} [panelName] Optionally specify the panel. If not specified, then an attempt will be made to locate a panel based on the input id or otherwise created if required.
 * @param {object} [study] Optionally supply a study definition, overriding what may be found in the study library
 * @return {object} A study descriptor which can be used to remove or modify the study.
 * @since 3.0.0 Added `study` parameter.
 * @memberof CIQ.Studies
 */
CIQ.Studies.replaceStudy = function (
	stx,
	id,
	type,
	inputs,
	outputs,
	parameters,
	panelName,
	study
) {
	if (!parameters) parameters = {};
	if (id) parameters.replaceID = id;
	id = parameters.replaceID;
	var sd = stx.layout.studies[id];
	CIQ.Studies.removeStudySymbols(sd, stx);
	if (sd.attribution) stx.removeFromHolder(sd.attribution.marker);
	if (stx.quoteDriver) stx.quoteDriver.updateSubscriptions();
	var newSD;
	if (inputs) {
		if (inputs.id == inputs.display) delete inputs.display;
		delete inputs.id;
	}
	newSD = CIQ.Studies.addStudy(
		stx,
		type,
		inputs,
		outputs,
		parameters,
		panelName,
		study
	);
	newSD.highlight = sd.highlight;
	newSD.uniqueId = sd.uniqueId;
	if (sd.signalData) {
		newSD.signalData = sd.signalData;
		if (newSD.signalData.updateConditions)
			newSD.signalData.updateConditions(id, newSD.inputs.id);
	}

	// move the new study into the place of the old study
	var s,
		tmp = {};
	for (s in stx.layout.studies) {
		if (s == id) tmp[newSD.name] = newSD;
		else tmp[s] = stx.layout.studies[s];
	}
	stx.layout.studies = tmp;
	tmp = {};
	for (s in stx.overlays) {
		if (s == id) {
			if (newSD.overlay || newSD.underlay) tmp[newSD.name] = newSD;
		} else tmp[s] = stx.overlays[s];
	}
	stx.overlays = tmp;
	if (!stx.overlays[newSD.name] && (newSD.overlay || newSD.underlay))
		stx.addOverlay(newSD);

	var oldOutputMapKeys = Object.keys(sd.outputMap),
		newOutputMapKeys = Object.keys(newSD.outputMap);
	if (sd.panel !== newSD.panel) {
		oldOutputMapKeys.forEach(function (key) {
			stx.moveMarkers(sd.panel, newSD.panel, stx.getMarkerArray("field", key));
		});
	}
	stx.getMarkerArray("panelName", sd.panel).forEach(function (marker, j) {
		var i = oldOutputMapKeys.indexOf(marker.params.field);
		if (i > -1 && newOutputMapKeys.indexOf(marker.params.field) === -1)
			marker.params.field = newOutputMapKeys[j];
	});

	stx.checkForEmptyPanel(sd.panel); // close any evacuated panels

	if (!parameters.rejiggering) {
		// done to initialize yAxes on panels
		stx.initializeDisplay(stx.chart);

		// Rename any overlays that relied on the old panel ID name, for instance a moving average on RSI(14)
		CIQ.Studies.rejiggerDerivedStudies(stx, sd, newSD.inputs.id, newSD.panel);
	}

	CIQ.transferObject(sd, newSD); // we do this so the developer retains use of his handle to the study
	stx.layout.studies[newSD.name] = sd;
	stx.overlays[newSD.name] = sd;
	stx.chart.state.studies.sorted = null;

	if (!parameters.rejiggering) {
		if (
			!sd.currentlyImporting &&
			!parameters.calculateOnly &&
			sd.chart.dataSet
		) {
			// silent mode while importing
			stx.createDataSet(null, sd.chart);
		}
		stx.changeOccurred("layout");
		stx.drawWithRange();
	}
	return sd;
};

/**
 * Adds or replaces a study on the chart.
 *
 * A [layout change event]{@link CIQ.ChartEngine~layoutEventListener} is triggered when this occurs.
 *
 * See {@tutorial Using and Customizing Studies} for more details.
 *
 * <P>Example: <iframe width="100%" height="500" scrolling="no" seamless="seamless" align="top" style="float:top" src="https://jsfiddle.net/chartiq/5y4a0kry/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="1"></iframe>
 *
 * Optionally you can [define an edit event listeners]{@link CIQ.ChartEngine#addEventListener} to call a custom function that can handle initialization of a dialog box for editing studies.
 * - Use [studyPanelEditEventListener]{@link CIQ.ChartEngine~studyPanelEditEventListener} to link the cog wheel on study panels to your desired edit menu/functionality.
 * - Use [studyOverlayEditEventListener]{@link CIQ.ChartEngine~studyOverlayEditEventListener} to link the right click on study overlays to your desired edit menu/functionality.
 * - All studies will use the same function set by the event listeners.
 * - If there are no event listeners set, the edit study buttons/functionality will not appear.
 * - The 'Study Edit' feature is standard functionality in the advanced sample template.
 * - See `Examples` section for exact function parameters and return value requirements.<br>
 * - Please note that these listeners must be set **before** you call importLayout. Otherwise your imported studies will not have an edit capability.
 *
 * Use the {@link CIQ.Tooltip} addOn if you wish to display values on mouse hover.<br>
 * Alternatively, you can create your own Heads-Up-Display (HUD) using this tutorial: {@tutorial Custom Heads-Up-Display (HUD)}
 *
 * @param {CIQ.ChartEngine} stx		The chart object
 * @param {string} type	   The name of the study (object key on the {@link CIQ.Studies.studyLibrary})
 * @param {object} [inputs]	 Inputs for the study instance. Default is those defined in the studyLibrary. Note that if you specify this object, it will be combined with (override) the library defaults. To bypass a library default, set that field to null.
 * @param {string} [inputs.id] The id of the current study. If set, then the old study will be replaced
 * @param {string} [inputs.display] The display name of the current study. If not set, a name generated by {@link CIQ.Studies.prettyDisplay} will be used. Note that if the study descriptor defines a `display` name, the study descriptor name will allays override this parameter.
 * @param {object} [outputs]	Outputs for the study instance. Default is those defined in the studyLibrary. Values specified here will override those in the studyLibrary.
 * @param {object} [parameters] Additional custom parameters for this study if supported or required by that study. Default is those defined in the {@link CIQ.Studies.studyLibrary}.
 * @param {object} [parameters.replaceID] If `inputs.id` is specified, this value can be used to set the new ID for the modified study( will display as the study name on the study panel). If omitted the existing ID will be preserved.
 * @param {object} [parameters.display] If this is supplied, use it to form the full study name. Otherwise `studyName` will be used. Is both `inputs.display` and `parameters.display` are set, `inputs.display` will always take precedence.<br>ie: if custom name is 'SAMPLE', the unique name returned would resemble "SAMPLE(param1,param2,param3,...)-X".
 * @param {object} [parameters.calculateOnly] Only setup the study for calculations and not display.  If this is supplied, UI elements will not be added.
 * @param {string} [panelName] Optionally specify the panel.<br> This must be an existing panel (see example).<br> If set to "New panel" a new panel will be created for the study. If not specified or an invalid panel name is provided, then an attempt will be made to locate a panel based on the input id or otherwise created if required. Multiple studies can be overlaid on any panel.
 * @param {object} [study] Study definition, overriding what may be found in the study library
 * @return {CIQ.Studies.StudyDescriptor} A study descriptor which can be used to remove or modify the study.
 * @since
 * - 3.0.0 Added `study` parameter.
 * - 5.1.1 Added `parameters.display`. If this parameter is supplied, use it to form the full study name.
 * - 5.2.0 Multiple studies can be overlaid on any panel using the `panelName` parameter.
 * - 6.3.0 `panelName` argument is deprecated but maintained for backwards compatibility. Use `parameters.panelName` instead.
 * - 7.1.0 Changed specification for a new panel in `panelName` from "Own panel" to "New panel".
 * @memberof CIQ.Studies
 * @example <caption>Add a volume underlay study with custom colors:</caption>
 * CIQ.Studies.addStudy(stxx, "vol undr", {}, {"Up Volume":"#8cc176","Down Volume":"#b82c0c"});
 * @example <caption>Define the edit function for study Panels:</caption>
 * var params={stx:stx,sd:sd,inputs:inputs,outputs:outputs, parameters:parameters};
 * stxx.addEventListener("studyPanelEdit", function(studyData){
 *		// your code here
 * });
 * @example <caption>Define the edit function for study overlays:</caption>
 * stxx.addEventListener("studyOverlayEdit", function(studyData){
 *	  CIQ.alert(studyData.sd.name);
 *	  var helper=new CIQ.Studies.DialogHelper({name:studyData.sd.type,stx:studyData.stx});
 *	  console.log('Inputs:',JSON.stringify(helper.inputs));
 *	  console.log('Outputs:',JSON.stringify(helper.outputs));
 *	  console.log('Parameters:',JSON.stringify(helper.parameters));
 *	  // call your menu here with the  data returned in helper
 *	  // modify parameters as needed and call addStudy or replaceStudy
 * });
 * @example <caption>Add an Aroon study with a custom display name:</caption>
 * CIQ.Studies.addStudy(stxx, "Aroon",null,null,{display:'Custom Name'});
 *
 * @example <caption>Add multiple studies to the same panel.</caption>
 * // create your panel
 * stxx.createPanel('New Panel', 'new_panel')
 * // add your studies to it.
 * CIQ.Studies.addStudy(stxx, "ma", null, null, {panelName:'new_panel'});
 * CIQ.Studies.addStudy(stxx, "Aroon", null, null, {panelName:'new_panel'});
 */
CIQ.Studies.addStudy = function (
	stx,
	type,
	inputs,
	outputs,
	parameters,
	panelName,
	study
) {
	var libraryEntry = study ? study : CIQ.Studies.studyLibrary[type];

	if (!parameters) parameters = {};
	if (libraryEntry) {
		if (libraryEntry.inputs) {
			// Default to the library inputs
			var libraryInputs = CIQ.clone(libraryEntry.inputs);
			for (var i in libraryInputs) {
				// But set any arrays to the default (the first item in the array)
				if (libraryInputs[i] instanceof Array) {
					if (
						libraryEntry.attributes &&
						libraryEntry.attributes[i] &&
						libraryEntry.attributes[i].defaultSelected
					) {
						libraryInputs[i] = libraryEntry.attributes[i].defaultSelected;
					} else {
						libraryInputs[i] = libraryInputs[i][0];
					}
				}
			}
			// Now override the library inputs with anything the user passed in
			inputs = CIQ.extend(libraryInputs, inputs);
		}
		if (libraryEntry.outputs) {
			outputs = CIQ.extend(CIQ.clone(libraryEntry.outputs), outputs);
		}
		var libraryParameters = libraryEntry.parameters;
		if (libraryParameters && libraryParameters.init) {
			parameters = CIQ.extend(CIQ.clone(libraryParameters.init), parameters);
		}

		if (libraryParameters && !parameters.display) {
			parameters.display = libraryParameters.display;
		}
	}

	if (!inputs) inputs = CIQ.clone(CIQ.Studies.DEFAULT_INPUTS);
	if (!outputs) outputs = CIQ.clone(CIQ.Studies.DEFAULT_OUTPUTS);
	if (!parameters.chartName) parameters.chartName = "chart";
	if (parameters.panelName == "Auto" || parameters.panelName == "Default panel")
		parameters.panelName = "";

	if (inputs.Period < 1) inputs.Period = 1; // periods can't be less than one candle. This is a general safety check. Each study should have a check or add input validation.

	var sd = null;
	if (!stx.layout.studies) stx.layout.studies = {};
	if (libraryEntry && libraryEntry.initializeFN) {
		sd = libraryEntry.initializeFN(
			stx,
			type,
			inputs,
			outputs,
			parameters,
			panelName,
			study
		);
	} else {
		sd = CIQ.Studies.initializeFN(
			stx,
			type,
			inputs,
			outputs,
			parameters,
			panelName,
			study
		);
	}
	if (!sd) {
		console.log(
			"CIQ.Studies.addStudy: initializeFN() returned null for " + type
		);
		return;
	} else if (sd === "abort") return; // but do so silently this time
	study = sd.study;
	sd.chart = stx.charts[parameters.chartName];
	sd.type = type;
	sd.permanent = study.permanent;
	sd.customLegend = study.customLegend;
	sd.uniqueId = CIQ.uniqueID();
	CIQ.Studies.prepareStudy(stx, study, sd);

	var state = stx.chart.state.studies;
	if (!state) state = stx.chart.state.studies = {};
	state.sorted = null; // nullify sort order

	var noDraw;
	if (!parameters.replaceID) {
		stx.layout.studies[sd.inputs.id] = sd;
		if (sd.overlay || sd.underlay) stx.addOverlay(sd);
		if (
			!stx.currentlyImporting &&
			!parameters.calculateOnly &&
			sd.chart.dataSet
		) {
			// silent mode while importing
			stx.createDataSet(null, sd.chart);
		}
	} else {
		noDraw = true;
		delete parameters.replaceID;
	}
	//if(!stx.currentlyImporting) CIQ.Studies.checkSymbolChanged(stx, sd, "add-study");
	if (stx.quoteDriver) stx.quoteDriver.updateSubscriptions();
	if (parameters.calculateOnly) {
		stx.changeOccurred("layout");
		return sd;
	}

	var panel = stx.panels[sd.panel];
	var hasEditCallback = false;
	var isPanelStudy = !(sd.overlay || sd.underlay);

	if (isPanelStudy && study.horizontalCrosshairFieldFN) {
		panel.horizontalCrosshairField = study.horizontalCrosshairFieldFN(stx, sd);
	}

	if (stx.editCallback) {
		hasEditCallback = true;
	} else if (isPanelStudy) {
		if (
			stx.callbackListeners.studyPanelEdit &&
			stx.callbackListeners.studyPanelEdit.length
		)
			hasEditCallback = true;
	} else {
		if (
			stx.callbackListeners.studyOverlayEdit &&
			stx.callbackListeners.studyOverlayEdit.length
		)
			hasEditCallback = true;
	}

	if (hasEditCallback) {
		parameters.editMode = true;
		var hasInput = false;
		for (var input in sd.inputs) {
			if (input == "id") continue;
			if (input == "display") continue;
			hasInput = true;
			break;
		}
		if (!hasInput) {
			for (var output in sd.outputs) {
				hasInput = true;
				break;
			}
		}
		if (hasInput) {
			var editFunction;
			if (typeof sd.study.edit != "undefined") {
				if (sd.study.edit) {
					editFunction = (function (stx, sd, inputs, outputs, parameters) {
						return function () {
							CIQ.clearCanvas(stx.chart.tempCanvas, stx); // clear any drawing in progress
							sd.study.edit(sd, {
								stx: stx,
								inputs: inputs,
								outputs: outputs,
								parameters: parameters
							});
						};
					})(stx, sd, inputs, outputs, parameters);
					stx.setPanelEdit(panel, editFunction);
					sd.editFunction = editFunction;
				}
			} else if (!isPanelStudy) {
				editFunction = (function (stx, sd, inputs, outputs, parameters) {
					return function (forceEdit) {
						CIQ.clearCanvas(stx.chart.tempCanvas, stx); // clear any drawing in progress
						stx.dispatch("studyOverlayEdit", {
							stx: stx,
							sd: sd,
							inputs: inputs,
							outputs: outputs,
							parameters: parameters,
							forceEdit: forceEdit
						});
					};
				})(stx, sd, inputs, outputs, parameters);
				sd.editFunction = editFunction;
			} else {
				if (stx.editCallback) {
					// deprecated legacy support
					editFunction = (function (stx, sd, inputs, outputs, parameters) {
						return function () {
							var dialogDiv = stx.editCallback(stx, sd);
							CIQ.clearCanvas(stx.chart.tempCanvas, stx); // clear any drawing in progress
							CIQ.Studies.studyDialog(stx, type, dialogDiv, {
								inputs: inputs,
								outputs: outputs,
								parameters: parameters
							});
						};
					})(stx, sd, inputs, outputs, parameters);
					if (panel.name != "chart") {
						stx.setPanelEdit(panel, editFunction);
					}
				} else {
					editFunction = (function (stx, sd, inputs, outputs, parameters) {
						return function () {
							CIQ.clearCanvas(stx.chart.tempCanvas, stx); // clear any drawing in progress
							stx.dispatch("studyPanelEdit", {
								stx: stx,
								sd: sd,
								inputs: inputs,
								outputs: outputs,
								parameters: parameters
							});
						};
					})(stx, sd, inputs, outputs, parameters);
					if (panel.name != "chart") {
						stx.setPanelEdit(panel, editFunction);
						sd.editFunction = editFunction;
					}
				}
			}
		}
	}

	stx.changeOccurred("layout");
	if (!noDraw) stx.drawWithRange(); // we put this extra draw here in case of study parameters which affect the appearance of the y-axis, since adding a y-axis calls draw() but before the layout has changed.
	return sd;
};

/**
 * Removes a study from the chart (and panel if applicable)
 *
 * @param  {CIQ.ChartEngine} stx A chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd  A study descriptor returned from {@link CIQ.Studies.addStudy}
 * @memberOf CIQ.Studies
 */
CIQ.Studies.removeStudy = function (stx, sd) {
	var sPanel = stx.panels[sd.panel];
	var yAxisName = sPanel && sPanel.yAxis.name;
	if (sd.overlay || sd.underlay) {
		stx.removeOverlay(sd.name);
	}
	var panel = stx.panels[sd.panel];
	if (sd.attribution) stx.removeFromHolder(sd.attribution.marker);
	stx.cleanupRemovedStudy(sd);
	if (panel && !stx.checkForEmptyPanel(panel)) {
		if (yAxisName == sd.name) {
			// promote an overlay to own the panel (and axis maybe)
			stx.electNewPanelOwner(panel);
		}
		var studyAxis = stx.getYAxisByName(sd.panel, sd.name);
		if (studyAxis) {
			studyAxis.name = studyAxis.studies[1] || studyAxis.renderers[0];
		}
	}
	stx.drawWithRange();
	stx.resizeChart();
};

/**
 * Returns the panel which the study's Field input value references.
 *
 * For example, a ma (Moving Average) study with a Field of Volume may return the Volume panel, since that is the panel
 * where the Field input value may be found..
 * @param  {CIQ.ChartEngine} stx The charting object
 * @param  {CIQ.Studies.StudyDescriptor} sd	 The study descriptor
 * @return {string} Name of panel containing the output field corresponding to the Field input value, null if not found
 * @memberof CIQ.Studies
 * @since 6.3.0
 */
CIQ.Studies.getPanelFromFieldName = function (stx, sd) {
	var fieldInputs = CIQ.Studies.getFieldInputs(sd);
	if (!fieldInputs.length) return null;
	var s = stx.layout.studies;
	if (!s) return null;

	var studyPanelMap = {};
	for (var n in s) {
		for (var i in s[n].outputMap) {
			var series = s[n].inputs.Series;
			if (series && series !== "series") i += " [" + series + "]";
			studyPanelMap[i] = s[n].panel;
		}
	}
	for (var nn in stx.chart.series) {
		studyPanelMap[nn] = stx.chart.series[nn].parameters.panel;
	}
	for (var f = 0; f < fieldInputs.length; f++) {
		var field = sd.inputs[fieldInputs[f]];
		if (field) {
			var mapEntry = studyPanelMap[field];
			if (mapEntry) return mapEntry;
		}
	}
	return null;
};

/**
 * Computes a hash of the study library keys. The hash can be assigned to a property so that `studyLibrary` changes can be observed.
 * This function is automatically called in the draw loop.
 *
 * @return {string} A hash of `studyLibrary` keys.
 * @memberof CIQ.Studies
 * @since 7.2.0
 */
CIQ.Studies.createLibraryHash = function () {
	return Object.keys(CIQ.Studies.studyLibrary).join("|"); // create a hash so we can observe the studyLibrary!
};

/**
 * <span class="animation">Animation Loop</span>
 *
 * This method displays all of the studies for a chart. It is called from within the chart draw() loop.
 * @param  {CIQ.ChartEngine} stx The charting object
 * @param {CIQ.ChartEngine.Chart} chart Which chart to display studies for
 * @param {Boolean} [underlays=false] If set to true then underlays only will be displayed, otherwise underlays will be skipped
 * @memberof CIQ.Studies
 */
CIQ.Studies.displayStudies = function (stx, chart, underlays) {
	if (underlays) chart.studyLibraryHash = CIQ.Studies.createLibraryHash();
	var s = stx.layout.studies;
	if (!s) return;
	var permanentPanel = {}; // local map of permanent panels
	permanentPanel[chart.name] = true; // no X on chart panel
	for (var n in s) {
		var sd = s[n];
		var study = sd.study;
		if (!study) continue;
		if (sd.disabled || (sd.signalData && !sd.signalData.reveal)) continue;
		var isUnderlay =
			sd.underlay || (sd.parameters && sd.parameters.underlayEnabled);
		if ((underlays && !isUnderlay) || (!underlays && isUnderlay)) continue;

		var rendererConfigs = CIQ.clone(study.renderer);
		if (rendererConfigs && !(rendererConfigs instanceof Array))
			rendererConfigs = [rendererConfigs];
		var panel = stx.panels[sd.panel];
		if (panel) {
			if (panel.chart != chart) continue;
			if (panel.hidden) continue;
			if (!permanentPanel[panel.name]) {
				var permanent = sd.permanent || !stx.manageTouchAndMouse;
				if (panel.closeX) {
					if (permanent) panel.closeX.style.display = "none";
				} else if (panel.close) {
					if (permanent) panel.close.style.display = "none";
				}
				if (panel.edit) {
					if (permanent) panel.edit.style.display = "none";
				}
				permanentPanel[panel.name] = permanent;
			}
		} else {
			//orphaned panel study, kill it on import
			if (stx.currentlyImporting) delete s[n];
			continue;
		}

		var quotes = sd.chart.dataSegment; // Find the appropriate data to drive this study

		// change the panel if it's an overlay and the underlying field has changed
		if (
			sd.panel == sd.parameters.chartName &&
			(!sd.parameters || !sd.parameters.panelName)
		) {
			var newPanel = CIQ.Studies.getPanelFromFieldName(stx, sd);
			if (newPanel && sd.panel != newPanel) sd.panel = newPanel;
		}
		if (typeof study.seriesFN == "undefined") {
			// null means don't display, undefined means display by default as a series
			if (rendererConfigs) {
				if (!sd.overlay) CIQ.Studies.createYAxis(stx, sd, quotes, panel);
				for (var r = 0; r < rendererConfigs.length; r++) {
					var params = rendererConfigs[r];
					// Get the input-specific output name from the outputMap.  At this point params.field is just the output name,
					// without any inputs. For example, "RSI" vs "RSI (14)".  Here we set it to the actual name used in dataSegment.
					for (var om in sd.outputMap) {
						if (sd.outputMap[om] == params.field) params.field = om;
					}
					if (!params.field) continue;
					params.panel = sd.panel;
					var binding = params.binding;
					// Binding is the ability to attach the color chosen by the user to a particular renderer property.
					if (binding) {
						for (var m in binding) {
							var color = CIQ.Studies.determineColor(sd.outputs[binding[m]]);
							if (color && color != "auto") params[m] = color;
							/*For future implementation
								if(typeof(sd.outputs[binding[m]])=="object"){
									params.pattern=sd.outputs[binding[m]].pattern;
									params.width=sd.outputs[binding[m]].width;
								}*/
						}
					}
					params.yAxis = null; // not allowed to specify y-axis in these renderers
					var renderer = CIQ.Renderer.produce(params.type, params);
					renderer.stx = stx;
					renderer.attachSeries(null, params).draw();
				}
			} else {
				CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
			}
			if (panel) CIQ.Studies.displayError(stx, sd);
		} else {
			if (panel) {
				if (study.seriesFN) study.seriesFN(stx, sd, quotes);
				CIQ.Studies.displayError(stx, sd);
			}
		}
		var colors = Object.values(sd.outputs);
		var els = colors.slice(0, 3).map(colorMapping);
		stx.chart.legendColorMap[sd.name] = {
			color: els,
			display: sd.name,
			components: Object.keys(sd.outputs).slice(0, 3)
		};
	}
	function colorMapping(item) {
		var color = item.color || item;
		return color === "auto" ? stx.defaultColor : color;
	}
};

/**
 * Displays a watermark on a panel for a study with `sd.error set`.
 *
 * The `sd.error` property can be set to true, which will display the default message "Not enough data to compute XXX",
 * or it can be set to a custom string which will be displayed as supplied.
 *
 * @param {CIQ.ChartEngine} stx The charting object.
 * @param {CIQ.Studies.StudyDescriptor} sd The study descriptor.
 * @param {Object} [params]	Additional options to customize the watermark.
 * @param {string} [params.panel] Name of the panel on which to display the error, defaults to `sd.panel`.
 * @param {string} [params.h] Watermark horizontal position.
 * @param {string} [params.v] Watermark vertical position.
 * @memberof CIQ.Studies
 * @since
 * - 3.0.0
 * - 4.0.0 Displays one error per panel. Added `params` object.
 * - 7.3.0 Errors without `params` or in center bottom, use
 * 		{@link CIQ.ChartEngine#displayErrorAsWatermark} instead of
 * 		{@link CIQ.ChartEngine#watermark}, which stacks errors vertically to prevent errors
 * 		overlaying other errors. Any other positioning is deprecated and results in multiple
 * 		errors at that location getting stacked on the z-axis.
 */
CIQ.Studies.displayError = function (stx, sd, params) {
	if (!sd.error) return;

	var panelKey = params && params.panel ? params.panel : sd.panel;
	var errorText =
		sd.error === true
			? stx.translateIf("Not enough data to compute ") +
			  stx.translateIf(sd.study.name)
			: stx.translateIf(sd.error);

	// backwards compatability
	if (params && (params.h !== "center" || params.v !== "bottom")) {
		stx.watermark(panelKey, params);
		return;
	}

	stx.displayErrorAsWatermark(panelKey, errorText);
};
/**
 * Convenience function for determining the min and max for a given data point.
 *
 * @param {CIQ.ChartEngine} stx The chart
 * @param {string} name The field to evaluate
 * @param {array} quotes The array of quotes to evaluate (typically dataSet, scrubbed or dataSegment)
 * @memberof CIQ.Studies
 * @return {object} Object containing the min and max data point values
 */
CIQ.Studies.calculateMinMaxForDataPoint = function (stx, name, quotes) {
	var min = Number.MAX_VALUE;
	var max = Number.MAX_VALUE * -1;
	for (var i = 0; i < quotes.length; i++) {
		var m = quotes[i][name];
		if (m === null || typeof m == "undefined") continue;
		if (isNaN(m)) continue;
		min = Math.min(m, min);
		max = Math.max(m, max);
	}
	return { min: min, max: max };
};

/**
 * Retrieves parameters to be used to draw the y-axis, retrieved from the study library.
 *
 * If a range is set in the study library, the yAxis high and low properties are set.<br>
 * Invoked by {@link CIQ.ChartEngine.renderYAxis} before createYAxis
 * @param  {CIQ.ChartEngine} stx	The chart object
 * @param  {CIQ.ChartEngine.YAxis} yAxis	 The axis to act upon
 * @return {object} y-axis parameters such as noDraw, range, and ground
 * @memberof CIQ.Studies
 * @since 5.2.0
 */
CIQ.Studies.getYAxisParameters = function (stx, yAxis) {
	var parameters = {};
	var sd = stx.layout.studies && stx.layout.studies[yAxis.name];
	if (sd) {
		var study = sd.study;
		if (study.yaxis || study.yAxisFN) {
			parameters.noDraw = true;
		} else {
			// If zones are enabled then we don't want to draw the yAxis
			if (study.parameters && study.parameters.excludeYAxis)
				parameters.noDraw = true;
			parameters.ground = study.yAxis && study.yAxis.ground;
			if (yAxis) {
				if (study.range != "bypass") {
					if (study.range == "0 to 100") parameters.range = [0, 100];
					else if (study.range == "-1 to 1") parameters.range = [-1, 1];
					else {
						if (study.range == "0 to max") {
							parameters.range = [0, Math.max(0, yAxis.high)];
						} else if (study.centerline || study.centerline === 0) {
							parameters.range = [
								Math.min(study.centerline, yAxis.low),
								Math.max(study.centerline, yAxis.high)
							];
						}
					}
				}
				if (parameters.range) {
					yAxis.low = parameters.range[0];
					yAxis.high = parameters.range[1];
				}
				if (sd.min) yAxis.min = sd.min;
				if (sd.max) yAxis.max = sd.max;
				if (sd.parameters && sd.parameters.studyOverZonesEnabled)
					parameters.noDraw = true;
			}
		}
	}
	return parameters;
};

/**
 * studyOverZones will be displayed and Peaks & Valleys will be filled if corresponding thresholds are set in the study library as follows:
 * ```
 * "parameters": {
 *	init:{studyOverZonesEnabled:true, studyOverBoughtValue:80, studyOverBoughtColor:"auto", studyOverSoldValue:20, studyOverSoldColor:"auto"}
 * }
 * ```
 * Invoked by {@link CIQ.ChartEngine.renderYAxis} after createYAxis
 * @param  {CIQ.ChartEngine} stx	The chart object
 * @param  {CIQ.ChartEngine.YAxis} yAxis	 The axis to draw upon
 * @memberof CIQ.Studies
 * @since 5.2.0
 */
CIQ.Studies.doPostDrawYAxis = function (stx, yAxis) {
	for (var s in stx.layout.studies) {
		var sd = stx.layout.studies[s];
		var panel = stx.panels[sd.panel];
		if (!panel || panel.hidden) continue;
		var studyAxis = sd.getYAxis(stx);
		if (studyAxis != yAxis) continue;
		var study = sd.study;
		if (yAxis.name == sd.name) {
			// only draw the custom yAxis for a panel study, not an overlay
			if (study.yaxis) study.yaxis(stx, sd); // backward compatibility
			if (study.yAxisFN) study.yAxisFN(stx, sd); // Use yAxisFN for forward compatibility
		}
		CIQ.Studies.drawZones(stx, sd);

		if (!sd.error) {
			var centerline = study.centerline;
			if (
				centerline ||
				centerline === 0 ||
				(centerline !== null &&
					yAxis.highValue - 0.000000000001 > 0 &&
					yAxis.lowValue + 0.000000000001 < 0)
			) {
				CIQ.Studies.drawHorizontal(stx, sd, null, centerline || 0, yAxis);
			}
		}
	}
};

/**
 * Displays a single or group of series as lines in the study panel using {@link CIQ.Studies.displayIndividualSeriesAsLine}
 *
 * One series per output field declared in the study library will be displayed.<br>
 * It expects the 'quotes' array to have data fields for each series with keys in the outputMap format:
 * ```
 * 'output name from study library'+ " " + sd.name
 * ```
 * For most custom studies this function will do the work for you.
 * @param  {CIQ.ChartEngine} stx	The chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd	 The study descriptor. See {@link CIQ.Studies.displayIndividualSeriesAsLine} for accepted `sd`  parameters.
 * @param  {array} quotes The set of quotes (dataSegment)
 * @memberof CIQ.Studies
 * @example
 * var study = {
 * 		overlay: true,
 * 		yAxis: {},
 * 		parameters: {
 * 			plotType: 'step',
 * 		},
 * 		seriesFN: function(stx, sd, quotes){
 * 			sd.extendToEnd=false;
 * 			sd.gaplines=false,
 * 			CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
 * 		}
 * 	};
 * 	CIQ.Studies.addStudy(stxx, "Vol", {}, {"Volume": "green"}, null, null, study);
 */
CIQ.Studies.displaySeriesAsLine = function (stx, sd, quotes) {
	if (!quotes.length) return;
	var panel = stx.panels[sd.panel];
	if (!panel || panel.hidden) return;

	for (var i in sd.outputMap) {
		CIQ.Studies.displayIndividualSeriesAsLine(stx, sd, panel, i, quotes);
	}
};

/**
 * Displays a single or group of series as histogram in the study panel.
 *
 * It expects the 'quotes' array to have data fields for each series with keys in the outputMap
 * format:
 * ```
 * 'output name from study library'+ " " + sd.name
 * ```
 *
 * It takes into account the following study fields (see {@link CIQ.ChartEngine#drawHistogram}
 * for details):
 * - `sd.inputs.HistogramType` &mdash; "overlaid", "clustered", or "stacked". Default "overlaid".
 * - `sd.outputs` &mdash; Can contain a color string or an object containing `{color, opacity}`.
 *    Default opacity ".3".
 * - `sd.parameters.widthFactor` &mdash; Default ".5".
 *
 * @param {CIQ.ChartEngine} stx The chart object.
 * @param {CIQ.Studies.StudyDescriptor} sd The study descriptor.
 * @param {array} quotes The set of quotes (`dataSegment`).
 *
 * @memberof CIQ.Studies
 * @since 7.0.0 No longer supports `sd.inputs.HeightPercentage`.
 * 		Use {@link CIQ.ChartEngine.YAxis#heightFactor} instead.
 *
 * @example
 * <caption>Adds a study panel that will display the High and Low values from the masterData as a
 * clustered histogram study.</caption>
 * CIQ.Studies.studyLibrary["Plot High Low"]={
 *     "seriesFN": CIQ.Studies.displaySeriesAsHistogram,
 *     inputs:{"HistogramType":["clustered","stacked","overlaid"]},
 *     outputs:{"High":"blue","Low":{color:"red",opacity:0.7},
 *     parameters:{"widthFactor":0.5},
 *     range: "0 to max",
 *     yAxis:{"ground":true,"initialMarginTop":0,"zoom":0, "heightFactor":0.5}
 * };
 * CIQ.Studies.addStudy(stxx, "Plot High Low");
 */
CIQ.Studies.displaySeriesAsHistogram = function (stx, sd, quotes) {
	if (!quotes.length) return;
	var panel = stx.panels[sd.panel];
	if (!panel) return;
	if (panel.hidden) return;

	var seriesParam = [];
	for (var i in sd.outputMap) {
		var output = sd.outputs[sd.outputMap[i]];
		if (!output) continue;
		var opacity = 0.3;
		if (typeof output == "object") {
			opacity = output.opacity;
			output = output.color;
		}
		var series = {
			field: i,
			fill_color_up: output,
			border_color_up: output,
			fill_color_down: output,
			border_color_down: output
		};
		if (sd.underlay) {
			series.opacity_up = series.opacity_down = opacity || 0.3;
		}
		seriesParam.push(series);
	}

	var yAxis = sd.getYAxis(stx);
	var inputs = sd.inputs;
	var widthFactor = inputs.WidthFactor;
	if (sd.study && sd.study.parameters) {
		var parms = sd.study.parameters;
		if (typeof parms.widthFactor !== "undefined")
			widthFactor = parms.widthFactor;
	}
	var params = {
		name: sd.name,
		type: inputs.HistogramType ? inputs.HistogramType : "overlaid",
		panel: sd.panel,
		yAxis: yAxis,
		widthFactor: widthFactor || 0.5,
		bindToYAxis: true,
		highlight: sd.highlight
	};

	stx.drawHistogram(params, seriesParam);
};

/**
 * Displays multiple data-points as series on a panel.
 *
 * This is the default display function for an indicator and will work for 90% of custom indicators.
 * @param  {CIQ.ChartEngine} stx	The chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd	 The study descriptor.
 *
 * Set the following elements to customize behavior (see example):
 * - `sd.highlight` Set to true to highlight the line.
 * - `sd.gaplines` Follows the same rules as `params.gapDisplayStyle` in {@link CIQ.ChartEngine#drawLineChart}
 *
 * 	Set the flowing `parameters` to customize behavior (see example):
 * - `plotType` Set to "step" to draw a step line. See {@tutorial Chart Styles and Types} for more details.
 * - `noSlopes` Follows the same rules as `params.noSlopes` in {@link CIQ.ChartEngine#drawLineChart}
 * - extendToEnd=true
 *
 * @param  {CIQ.ChartEngine.Panel} panel  A reference to the study panel
 * @param  {string} name   The name of this output field (should match field from 'quotes' needed to render this line)
 * @param  {array} quotes The array of quotes (dataSegment)
 * @memberof CIQ.Studies
 * @since 5.2.0 The number of decimal places for the y-axis is determined by the distance between ticks as opposed to shadow.
 * @example
 * var study = {
 * 		overlay: true,
 * 		yAxis: {},
 * 		parameters: {
 * 			plotType: 'step',
 * 		},
 * 		seriesFN: function(stx, sd, quotes){
 * 			sd.extendToEnd=false;
 * 			sd.gaplines=false,
 * 			CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
 * 		}
 * 	};
 * 	CIQ.Studies.addStudy(stxx, "Vol", {}, {"Volume": "green"}, null, null, study);
 */
CIQ.Studies.displayIndividualSeriesAsLine = function (
	stx,
	sd,
	panel,
	name,
	quotes
) {
	if (!panel.height) panel.height = panel.bottom - panel.top;

	var context = sd.getContext(stx);
	var output = sd.outputs[sd.outputMap[name]];
	if (!output) return;

	// save the original context settings
	context.save();

	// backwards compatibility if the output is just a color string
	if (typeof output === "string") {
		output = {
			color: output,
			width: 1
		};
	}

	context.lineWidth = output.width || 1;

	var color = output.color;
	if (color == "auto") color = stx.defaultColor; // This is calculated and set by the kernel before draw operation.
	context.strokeStyle = color;

	var pattern = output.pattern;

	context.setLineDash(CIQ.borderPatternToArray(context.lineWidth, pattern));
	context.lineDashOffset = 0;

	var labelDecimalPlaces = 0;
	var study = sd.study,
		yAxis = sd.getYAxis(stx);
	labelDecimalPlaces = stx.decimalPlacesFromPriceTick(
		yAxis.priceTick,
		yAxis.idealTickSizePixels
	);
	if (sd.overlay || sd.underlay) labelDecimalPlaces = null; // will end up using the same as the chart itself
	if (yAxis.decimalPlaces || yAxis.decimalPlaces === 0)
		labelDecimalPlaces = yAxis.decimalPlaces;
	var label = null;
	if (sd.parameters) label = sd.parameters.label;
	var libParams = study.parameters;
	if (!libParams) libParams = {};
	var step = libParams.plotType == "step";
	if (sd.series) {
		// not even sure why this is here but leaving for "backward compatibility"
		for (var s in sd.series) {
			var ser = sd.series[s].parameters.type;
			if (ser) step = ser == "step";
		}
	}
	// backwards compatibility
	if (libParams.noLabels) label = false;
	if (!sd.noSlopes && sd.noSlopes !== false) sd.noSlopes = libParams.noSlopes;
	if (!sd.extendToEnd && sd.extendToEnd !== false)
		sd.extendToEnd = libParams.extendToEnd;
	var showLabel = label || (stx.preferences.labels && label !== false);

	var gaplines = sd.gaplines;
	if (gaplines === false) gaplines = "transparent";
	var symbol = sd.inputs.Symbol;
	var colorFunction = gaplines
		? stx.getGapColorFunction(symbol, name, output, gaplines)
		: null;

	stx.plotDataSegmentAsLine(
		name,
		panel,
		{
			yAxis: yAxis,
			skipTransform: stx.panels[sd.panel].name != sd.chart.name,
			label: showLabel,
			labelDecimalPlaces: labelDecimalPlaces,
			noSlopes: sd.noSlopes,
			step: step,
			alignStepToSide: sd.alignStepToSide,
			extendToEndOfLastBar: sd.extendToEndOfLastBar,
			width: sd.lineWidth,
			extendToEndOfDataSet: sd.extendToEnd,
			gapDisplayStyle: gaplines,
			highlight: sd.highlight
		},
		colorFunction
	);

	if (study.appendDisplaySeriesAsLine)
		study.appendDisplaySeriesAsLine(stx, sd, quotes, name, panel);

	// restore the original context settings
	context.restore();
};

/**
 * Draws a horizontal line on the study.
 *
 * @param  {CIQ.ChartEngine} stx	The chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd	 The study descriptor
 * @param  {array} quotes The array of quotes (unused)
 * @param  {number} price  The price (value) to draw the horizontal line
 * @param  {CIQ.ChartEngine.YAxis} yAxis  The axis to use when drawing the line
 * @param  {object} color  Optional color to use when drawing line.  Can be a string or an object like {color:#334455, opacity:0.5}
 * @memberof CIQ.Studies
 * @since 5.2.0 Added `yAxis` and `color` parameters.
 */
CIQ.Studies.drawHorizontal = function (stx, sd, quotes, price, yAxis, color) {
	var panel = stx.panels[sd.panel],
		context = stx.getBackgroundCanvas().context;
	if (!panel) return;
	if (!color) color = yAxis.textStyle;

	var y = stx.pixelFromPrice(price, panel, yAxis);
	if (y > yAxis.top && y < yAxis.bottom)
		stx.plotLine(
			panel.left,
			panel.right,
			y,
			y,
			color,
			"segment",
			context,
			false,
			{ opacity: color && color.opacity ? color.opacity : 0.5 }
		);
};

/**
 * Method used to display series together with a histogram centered at the zero value.
 *
 * Used in studies such as on the "MACD" and "Klinger Volume Oscillator".
 *
 * This function creates the y-axis, draws **a single** histogram, and then plots series, multiple if needed.
 *
 * Note that to differentiate between a regular series and the histogram series there is a convention to use sd.name+"_hist" for histogram values on a study.
 * See {@link CIQ.Studies.createHistogram} for details and examples.
 * @param  {CIQ.ChartEngine} stx	  The chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd	   The study descriptor
 * @param  {array} quotes   The quotes (dataSegment)
 * @memberof CIQ.Studies
 */
CIQ.Studies.displayHistogramWithSeries = function (stx, sd, quotes) {
	var panel = stx.panels[sd.panel];
	var opacity = 0.5;
	if (sd.underlay) opacity = 0.3;
	CIQ.Studies.createHistogram(stx, sd, quotes, false, opacity);
	CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
};

/**
 * Plots over/under zones for indicators that support them, and when the user selects them.
 *
 * This method will draw its own yAxis which will not have a scale, but merely the over under points.<br>
 * Shading will be performed between the zone lines and the study plot.
 * @param  {CIQ.ChartEngine} stx	  The chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd	   The study descriptor
 * @param  {array} quotes   unused
 * @memberof CIQ.Studies
 */
CIQ.Studies.drawZones = function (stx, sd, quotes) {
	if (!sd.parameters || !sd.parameters.studyOverZonesEnabled) return;

	var low = parseFloat(sd.parameters.studyOverSoldValue);
	var high = parseFloat(sd.parameters.studyOverBoughtValue);
	var lowColor = sd.parameters.studyOverSoldColor;
	var highColor = sd.parameters.studyOverBoughtColor;
	var output = sd.zoneOutput;
	if (!output) output = "Result";
	var zoneColor = CIQ.Studies.determineColor(sd.outputs[output]);
	if (!zoneColor || zoneColor == "auto" || CIQ.isTransparent(zoneColor))
		zoneColor = stx.defaultColor;
	if (!lowColor) lowColor = zoneColor;
	if (!lowColor || lowColor == "auto" || CIQ.isTransparent(lowColor))
		lowColor = stx.defaultColor;
	if (!highColor) highColor = zoneColor;
	if (!highColor || highColor == "auto" || CIQ.isTransparent(highColor))
		highColor = stx.defaultColor;
	var panel = stx.panels[sd.panel];
	var yAxis = sd.getYAxis(stx);
	var drawBorders = yAxis.displayBorder;
	if (stx.axisBorders === false) drawBorders = false;
	if (stx.axisBorders === true) drawBorders = true;
	if (yAxis.width === 0) drawBorders = false;
	var yaxisPosition = stx.getYAxisCurrentPosition(yAxis, panel);
	var leftAxis = yaxisPosition == "left",
		rightJustify = yAxis.justifyRight;
	if (!rightJustify && rightJustify !== false) {
		if (
			stx.chart.yAxis.justifyRight ||
			stx.chart.yAxis.justifyRight === false
		) {
			rightJustify = stx.chart.yAxis.justifyRight;
		} else rightJustify = leftAxis;
	}
	var borderEdge = Math.round(yAxis.left + (leftAxis ? yAxis.width : 0)) + 0.5;
	var tickWidth = drawBorders ? 3 : 0; // pixel width of tick off edge of border
	if (leftAxis) tickWidth = drawBorders ? -3 : 0;

	var ctx = stx.getBackgroundCanvas().context;
	var color = ctx.fillStyle;

	ctx.globalAlpha = 0.2;

	stx.startClip(panel.name, true);

	ctx.beginPath();
	var ph = Math.round(stx.pixelFromPrice(high, panel, yAxis)) - 0.5;
	ctx.strokeStyle = highColor;
	ctx.moveTo(panel.left, ph);
	ctx.lineTo(panel.right, ph);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	var pl = Math.round(stx.pixelFromPrice(low, panel, yAxis)) + 0.5;
	ctx.strokeStyle = lowColor;
	ctx.moveTo(panel.left, pl);
	ctx.lineTo(panel.right, pl);
	ctx.stroke();
	ctx.closePath();

	var yAxisPlotter = new CIQ.Plotter();
	yAxisPlotter.newSeries(
		"border",
		"stroke",
		stx.canvasStyle("stx_grid_border")
	);
	if (drawBorders) {
		var tickLeft = leftAxis ? borderEdge + tickWidth : borderEdge - 0.5;
		var tickRight = leftAxis ? borderEdge + 0.5 : borderEdge + tickWidth;
		yAxisPlotter.moveTo("border", tickLeft, ph);
		yAxisPlotter.lineTo("border", tickRight, ph);
		yAxisPlotter.moveTo("border", tickLeft, pl);
		yAxisPlotter.lineTo("border", tickRight, pl);
	}

	ctx.fillStyle = color;

	var params = {
		skipTransform: stx.panels[sd.panel].name != sd.chart.name,
		panelName: sd.panel,
		band: output + " " + sd.name,
		yAxis: yAxis,
		opacity: 0.3
	};
	if (!sd.highlight && stx.highlightedDraggable) params.opacity *= 0.3;
	CIQ.preparePeakValleyFill(
		stx,
		CIQ.extend(params, {
			threshold: high,
			direction: yAxis.flipped ? -1 : 1,
			color: highColor
		})
	);
	CIQ.preparePeakValleyFill(
		stx,
		CIQ.extend(params, {
			threshold: low,
			direction: yAxis.flipped ? 1 : -1,
			color: lowColor
		})
	);

	ctx.globalAlpha = 1;

	if (!sd.study || !sd.study.yaxis) {
		if (drawBorders) {
			var b = Math.round(yAxis.bottom) + 0.5;
			yAxisPlotter.moveTo("border", borderEdge, yAxis.top);
			yAxisPlotter.lineTo("border", borderEdge, b);
			yAxisPlotter.draw(ctx, "border");
		}

		var dynamicWidth = sd.chart.dynamicYAxis;
		var extraPaddingBeforeText = 3;
		[high, low].forEach(function (price) {
			var paddedPrice = price + "\xA0"; // add a space to ensure the last character isn't cut off by the chart container
			var labelWidth =
				dynamicWidth &&
				Math.max(
					yAxis._width,
					sd.chart.context.measureText(paddedPrice).width +
						Math.abs(tickWidth) +
						extraPaddingBeforeText
				);
			if (dynamicWidth && labelWidth > (yAxis._dynamicWidth || yAxis._width)) {
				// the chart was initialized at an invalid width
				yAxis._dynamicWidth = labelWidth;
				stx.calculateYAxisPositions(); // side effects
				stx.endClip();
				throw new Error("reboot draw");
			} else if (!dynamicWidth && yAxis._dynamicWidth) {
				stx.resetDynamicYAxis();
				stx.endClip();
				throw new Error("reboot draw");
			}
		});

		var textX;
		var titleEnabled = yAxis.getTitleEnabled && yAxis.getTitleEnabled();
		if (yAxis.width !== 0) {
			// Draw the y-axis with high/low
			stx.canvasFont("stx_yaxis", ctx);
			stx.canvasColor("stx_yaxis", ctx);
			ctx.textAlign = rightJustify ? "right" : "left";
			var textHeight = stx.getCanvasFontSize("stx_yaxis") / 2; // half to account for middle textBaseline
			if (titleEnabled) yAxis.fontHeight = textHeight * 2;
			if (leftAxis) {
				textX = yAxis.left + 3;
				if (rightJustify) textX = yAxis.left + yAxis.width + tickWidth - 3;
			} else {
				textX = yAxis.left + tickWidth + 3;
				if (rightJustify) textX = yAxis.left + yAxis.width;
			}
			if (ph > yAxis.top + textHeight) {
				ctx.fillStyle = highColor;
				ctx.fillText(high, textX, ph);
			}
			if (pl < yAxis.bottom - textHeight) {
				ctx.fillStyle = lowColor;
				ctx.fillText(low, textX, pl);
			}
			ctx.fillStyle = color;
		}
		if (titleEnabled) {
			var textStyle = yAxis.textStyle || "stx_yaxis";
			yAxisPlotter.newSeries("text", "fill", stx.colorOrStyle(textStyle));
			stx.drawTitleText(panel, yAxis, yAxisPlotter, textX);
			yAxisPlotter.draw(stx.getBackgroundCanvas(stx.chart).context, "text");
		}
	}
	stx.endClip();
	ctx.globalAlpha = 1;

	if (yAxis.name == sd.name) yAxis.yAxisPlotter = new CIQ.Plotter();
};

/**
 * Method used to display a histogram, which can be centered at the zero value.
 *
 * Used in studies such as on the "MACD" and "Klinger Volume Oscillator".
 *
 * Initial bar color is defined in stx-chart.css under '.stx_histogram'. <br>
 * If using the default UI, refer to provided css files under '.stx_histogram' and '.ciq-night .stx_histogram' style sections.<br>
 * If sd.outputs["Decreasing Bar"], sd.outputs["Negative Bar"], sd.outputs["Increasing Bar"] and sd.outputs["Positive Bar"] are present, their corresponding colors will be used instead.<br>
 * <p><b>Note the convention to use sd.name+"_hist" for histogram values on a study</b></p>
 *
 * @param  {CIQ.ChartEngine} stx	  The chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd	   The study descriptor
 * @param  {array} quotes   The quotes (dataSegment)
 * @param  {boolean} centered If true then the histogram will be physically centered on the yAxis, otherwise it will be centered at the zero value on the yAxis
 * @param  {number} [opacity=1] Optionally set the opacity
 * @memberof CIQ.Studies
 * @example <caption> Draws a histogram with alternating bid and ask records. Bids are positive, asks are negative.</caption>
 * CIQ.Studies.calculateBidAsk=function(stx, sd) {
 *		var quotes=sd.chart.scrubbed;
 *		var name=sd.name;
 *
 *		var histogram=name+"_hist";
 *		for(i=0;i<quotes.length;i++){
 *			quote=quotes[i];
 *			i % 2 ? quote[histogram]= quote.Bid : quote[histogram]= quote.Ask*-1;
 *		}
 *	};
 *
 *	CIQ.Studies.studyLibrary["Plot BidAsk"] = {
 *		seriesFN: CIQ.Studies.createHistogram,
 *		calculateFN: CIQ.Studies.calculateBidAsk,
 *		outputs: { "Negative Bar": "red", "Positive Bar": "green" },
 *	};
 *
 *	CIQ.Studies.addStudy(stxx, "Plot BidAsk");
 */

CIQ.Studies.createHistogram = function (stx, sd, quotes, centered, opacity) {
	var panel = stx.panels[sd.panel],
		context = sd.getContext(stx);
	var yAxis = sd.getYAxis(stx);
	stx.startClip(panel.name);

	var myWidth = stx.layout.candleWidth - 2;
	if (myWidth < 2) myWidth = 1;

	var y = stx.pixelFromPrice(0, panel, yAxis);
	if (yAxis.min > 0) y = stx.pixelFromPrice(yAxis.min, panel, yAxis); // Don't draw below the bottom of the chart. If zero isn't on the chart then make it behave like a bar graph.
	if (centered) {
		y = Math.floor(panel.top + panel.height / 2);
	}

	var field = sd.name + "_hist";
	stx.canvasColor("stx_histogram");
	var defaultFillStyle = context.fillStyle;

	if (opacity || opacity === 0) context.globalAlpha = opacity;
	if (!sd.highlight && stx.highlightedDraggable) context.globalAlpha *= 0.3;
	var y0 = null,
		y1 = null;
	var outputs = sd.outputs;
	for (var i = 0; i < quotes.length; i++) {
		var skippedBars = 0;
		var quote = quotes[i];
		if (!quote) continue;
		if (stx.cleanupGaps === "stretch") {
			while (quotes[i + 1]) {
				var nextQuote = quotes[i + 1][field];
				if (nextQuote || nextQuote === 0 || quotes[i + 1].futureTick) break;
				skippedBars++;
				i++;
			}
		}
		if (quote.candleWidth)
			myWidth = Math.floor(Math.max(1, quote.candleWidth - 2));
		var x0 = Math.floor(
			stx.pixelFromBar(i - skippedBars, panel.chart) - myWidth / 2
		);
		var x1 = Math.floor(myWidth + skippedBars * stx.layout.candleWidth);
		if (y0 === null) {
			var tick = stx.tickFromPixel(x0, panel.chart) - 1;
			if (tick < 0) y0 = y1;
			else
				y0 =
					stx.pixelFromPrice(stx.chart.dataSet[tick][field], panel, yAxis) - y;
		} else {
			y0 = y1;
		}
		y1 = stx.pixelFromPrice(quote[field], panel, yAxis) - y;

		var decreasingBarColor = CIQ.Studies.determineColor(
			outputs["Decreasing Bar"]
		);
		var increasingBarColor = CIQ.Studies.determineColor(
			outputs["Increasing Bar"]
		);
		var positiveBarColor = CIQ.Studies.determineColor(outputs["Positive Bar"]);
		var negativeBarColor = CIQ.Studies.determineColor(outputs["Negative Bar"]);

		var flipped = yAxis.flipped;
		context.fillStyle = defaultFillStyle;
		if (decreasingBarColor && (flipped ? y1 < y0 : y1 > y0))
			context.fillStyle = decreasingBarColor;
		else if (increasingBarColor && (flipped ? y1 > y0 : y1 < y0))
			context.fillStyle = increasingBarColor;
		else if (positiveBarColor && (flipped ? y1 > 0 : y1 < 0))
			context.fillStyle = positiveBarColor;
		else if (negativeBarColor && (flipped ? y1 < 0 : y1 > 0))
			context.fillStyle = negativeBarColor;
		context.fillRect(x0, y, x1, Math.floor(y1));
	}

	context.globalAlpha = 1;
	stx.endClip();
};

/**
 * Used to reduce certain common fields to abbreviated form for display in study panel labels
 *
 * @type {Object}
 * @memberof CIQ.Studies
 */
CIQ.Studies.prettify = {
	Close: "C",
	Open: "O",
	High: "H",
	Low: "L",
	simple: "ma",
	exponential: "ema",
	triangular: "tma",
	VIDYA: "vdma",
	weighted: "wma",
	"welles wilder": "smma",
	true: "y",
	false: "n"
};

CIQ.Studies.prettyRE = /^.{0,50}\((.{0,50})\).{0,50}$/;

/**
 * Convert a study ID into a displayable format
 *
 * @param  {string} id The ID
 * @return {string}	A pretty (shortened) ID
 * @memberof CIQ.Studies
 */
CIQ.Studies.prettyDisplay = function (id) {
	var match = CIQ.Studies.prettyRE.exec(id);
	if (!match) return id;
	var guts = match[1];
	if (guts) {
		for (var i in CIQ.Studies.prettify) {
			guts = guts.replace(i, CIQ.Studies.prettify[i]);
		}
		id = id.replace(match[1], guts);
	}
	return id;
};

/**
 * Returns an array of input field names which are used to specify the field for the study.
 *
 * In most cases, this field is called "Field", but it does not have to be, nor does there need to be only one.
 *
 * @param  {CIQ.Studies.StudyDescriptor} sd	   The study descriptor
 * @return {array}		   Input fields used to specify the field
 * @since 3.0.0
 * @memberof CIQ.Studies
 */
CIQ.Studies.getFieldInputs = function (sd) {
	var res = [];
	var defaultInputs = sd.study.inputs;
	for (var input in defaultInputs) {
		if (["field", "series"].includes(defaultInputs[input])) res.push(input);
	}
	return res;
};

/**
 * The default initialize function for a study. It creates the study descriptor. It creates the panel if one is required.
 *
 * @param  {CIQ.ChartEngine} stx		The chart object
 * @param  {string} type	   The type of study (from studyLibrary)
 * @param  {object} inputs	 The inputs for the study instance
 * @param  {object} outputs	The outputs for the study instance
 * @param  {object} [parameters] Additional parameters if required or supported by this study
 * @param {string} [panelName] Deprecated. Panel name.  Use parameters.panelName instead.
 * @param {object} [study]	Study definition to use in lieu of the study library entry
 * @return {CIQ.Studies.StudyDescriptor}		The newly initialized study descriptor
 * @since
 * - 3.0.0 Added `study` parameter.
 * - 6.3.0 `panelName` argument is deprecated; use `parameters.panelName` instead. If neither are valid, will automatically determine default panel.
 * @memberof CIQ.Studies
 */
CIQ.Studies.initializeFN = function (
	stx,
	type,
	inputs,
	outputs,
	parameters,
	panelName,
	study
) {
	if (!inputs) inputs = {};
	if (!parameters) parameters = {};
	if (!inputs.id) {
		inputs.id = CIQ.Studies.generateID(
			stx,
			type,
			inputs,
			parameters.replaceID,
			parameters.display
		);
	}
	if (!inputs.display) inputs.display = inputs.id;
	var sd = new CIQ.Studies.StudyDescriptor(
		inputs.id,
		type,
		inputs.id,
		inputs,
		outputs,
		parameters
	);
	if (inputs.Period) sd.days = Math.max(1, parseInt(sd.inputs.Period, 10)); // you can't have fractional or non-positive day periods
	if (study) {
		if (!study.inputs) study.inputs = sd.study.inputs;
		if (!study.outputs) study.outputs = sd.study.outputs;
		sd.study = study;
	} else study = sd.study;
	if (study.display) inputs.display = study.display; // override what is displayed in the label
	if (typeof parameters.panelName == "string") panelName = parameters.panelName;
	if (panelName == inputs.id || (panelName && !stx.panelExists(panelName))) {
		sd.underlay = sd.overlay = false;
	}
	if (panelName == "Own panel" || panelName == "New panel") {
		panelName = null;
	}
	var isOverlay =
		sd.overlay || inputs.Overlay || (sd.overlay !== false && study.overlay);
	var isUnderlay =
		sd.underlay || inputs.Underlay || (sd.underlay !== false && study.underlay);
	if (isOverlay && parameters.underlayEnabled) isUnderlay = true;
	if (isUnderlay) sd.underlay = true;
	if (!isUnderlay && stx.chart.panel && panelName == stx.chart.panel.name)
		isOverlay = true;
	if (isOverlay) sd.overlay = true;

	var drag = stx.preferences.dragging;
	if (drag === true || (drag && drag.study)) sd.overlay = true; // override for draggable studies
	if (panelName) parameters.panelName = panelName;
	else if (!isOverlay && !isUnderlay) panelName = inputs.id;

	if (parameters.calculateOnly) {
		if (isOverlay || isUnderlay) {
			if (stx.panels[parameters.panelName]) sd.panel = parameters.panelName;
			else
				sd.panel =
					CIQ.Studies.getPanelFromFieldName(stx, sd) || parameters.chartName;
		}
		// don't setup panel, return now
		return sd;
	}

	var oldStudyValues = {}; // capture these values in case they change throughout this function
	var oldStudy = stx.layout.studies[parameters.replaceID];
	if (oldStudy) {
		oldStudyValues = {
			outputMap: CIQ.clone(oldStudy.outputMap),
			panel: oldStudy.panel
		};
	}
	// adjust panel
	sd.panel = "";
	if (panelName) {
		var newPanel = CIQ.Studies.smartMovePanel(
			stx,
			sd.inputs,
			panelName,
			parameters.replaceID,
			parameters.panelName == "New panel"
		);
		if (newPanel) sd.panel = newPanel.name;
		if (
			parameters.yaxisDisplayValue &&
			!["left", "right", "none", "shared", "default"].includes(
				parameters.yaxisDisplayValue
			) &&
			!stx.getYAxisByName(newPanel, parameters.yaxisDisplayValue)
		)
			parameters.yaxisDisplayValue = "default";
	} else if (isOverlay || isUnderlay) {
		sd.panel =
			CIQ.Studies.getPanelFromFieldName(stx, sd) || parameters.chartName;
	}
	if (!sd.panel) {
		var panelHeight = study.panelHeight || null;
		var yaxisParameters = parameters.yAxis || study.yAxis || {};
		yaxisParameters.name = sd.inputs.id;
		sd.panel = sd.inputs.id;
		stx.createPanel(
			sd.inputs.display,
			sd.panel,
			panelHeight,
			parameters.chartName,
			new CIQ.ChartEngine.YAxis(yaxisParameters)
		);
	}

	if (sd.parameters && sd.parameters.panelName)
		sd.parameters.panelName = sd.panel;

	// adjust yAxis
	var panel = stx.panels[sd.panel];
	var syAxis = study ? CIQ.clone(study.yAxis) : null;
	var yAxisParam = parameters.yAxis || syAxis;
	if ((yAxisParam || {}).ground)
		yAxisParam["initialMargin" + (yAxisParam.flipped ? "Top" : "Bottom")] = 0;
	var yAxis = CIQ.Studies.smartCreateYAxis(
		stx,
		panel,
		sd.inputs.id,
		parameters.yaxisDisplayValue,
		yAxisParam
	);

	if (yAxis) {
		if (yAxis.name == parameters.replaceID) yAxis.name = sd.inputs.id;
		if (!parameters.replaceID && yAxis.name === sd.name)
			stx.calculateYAxisMargins(yAxis);
		yAxis.allowSharing = !parameters.yAxis && !study.yAxis;
		yAxis.width =
			yAxis.position == "none" ? 0 : CIQ.ChartEngine.YAxis.prototype.width;
		if (
			parameters.yaxisDisplayValue == "shared" ||
			parameters.yaxisDisplayValue == "default"
		) {
			delete parameters.yaxisDisplayValue;
		} else {
			if (syAxis) CIQ.ensureDefaults(yAxis, syAxis);
			if (yAxis.name == sd.name) {
				// study owns axis
				if (
					(!(syAxis || {}).textStyle && !parameters.yaxisDisplayColor) ||
					parameters.yaxisDisplayColor == "auto"
				)
					delete yAxis.textStyle;
				else if (parameters.yaxisDisplayColor)
					yAxis.textStyle = CIQ.colorToHex(parameters.yaxisDisplayColor);

				if ((syAxis || {}).justifyRight === undefined)
					yAxis.justifyRight = null;
				if (parameters.flippedEnabled !== undefined)
					yAxis.flipped = parameters.flippedEnabled;
			}
		}
		if (yAxis != panel.yAxis) {
			yAxis.displayGridLines = false;
		} else if (yAxis != stx.chart.yAxis) {
			yAxis.displayGridLines = stx.displayGridLinesInStudies;
		}
	}
	stx.resetDynamicYAxis();
	stx.calculateYAxisPositions();

	// move study's drawings
	if (oldStudy) {
		var drawingChanged = false;
		for (var d in stx.drawingObjects) {
			var drawing = stx.drawingObjects[d];
			if (
				oldStudyValues.outputMap &&
				oldStudyValues.outputMap.hasOwnProperty(drawing.field)
			) {
				drawing.field = drawing.field.replace(
					parameters.replaceID,
					sd.inputs.id
				);
				if (sd.parameters && sd.parameters.panelName) {
					drawing.panelName = sd.parameters.panelName;
				} else {
					drawing.panelName = sd.panel;
				}
				drawingChanged = true;
			} else if (
				oldStudyValues.panel &&
				oldStudyValues.panel == drawing.panelName
			) {
				drawing.panelName = drawing.panelName.replace(
					parameters.replaceID,
					sd.inputs.id
				);
				drawingChanged = true;
			}
		}
		if (drawingChanged) stx.changeOccurred("vector");
	}
	return sd;
};

/**
 * Manages the panel for a study when a new panel is requested.
 *
 * @param {CIQ.ChartEngine} stx A chart engine instance.
 * @param {object} inputs The study inputs.
 * @param {string} panelName Name of the panel where the study will lie. **Note:** This panel's name may be changed in this function.
 * @param {string} replaceID Name of the original study.
 * @param {boolean} toNewPanel `true` if request to move to a new panel.
 * @return {CIQ.ChartEngine.Panel} The panel to which the study was moved; null if a new panel needs to be created.
 * @memberof CIQ.Studies
 * @since
 * - 7.1.0
 * - 7.2.0 Added the `toNewPanel` argument.
 */
CIQ.Studies.smartMovePanel = function (
	stx,
	inputs,
	panelName,
	replaceID,
	toNewPanel
) {
	var oldStudy;
	var name = inputs.id;
	if (replaceID) oldStudy = stx.layout.studies[replaceID];
	if (oldStudy) {
		var oldPanel = stx.panels[oldStudy.panel];
		if (oldPanel) {
			if (oldPanel.yAxis.name == replaceID) {
				// study owns panel
				if (
					(toNewPanel || (panelName != replaceID && panelName != name)) &&
					!stx.checkForEmptyPanel(oldPanel.name, true, oldStudy)
				) {
					// case 1: Either we are moving to a new panel, or we changed the inputs,
					//         and existing panel is still populated with other plots
					stx.electNewPanelOwner(oldPanel); // promote a new panel owner
					var yAxis = oldStudy.getYAxis(stx);
					if (yAxis.name == replaceID) stx.electNewYAxisOwner(yAxis); // promote a new axis owner
				} else if (panelName == replaceID || !stx.panels[panelName]) {
					// case 2: We changed something not necessitating any panel move
					if (name != oldPanel.name)
						stx.modifyPanel(oldPanel, { name: name, display: inputs.display });
					panelName = name;
				}
			}
		}
	}
	return stx.panels[panelName];
};

/**
 * Manages yAxis for a study when a new position is requested.
 *
 * @param {CIQ.ChartEngine} stx A chart engine instance
 * @param {CIQ.ChartEngine.Panel} panel The panel where the yAxis should be
 * @param {string} name The study whose axis to manage
 * @param {string} [newPosition] New position (left/right/none,default/shared, or specific axis name)
 * @param {object} [defaultAxis] Axis defaults to use when creating new axis
 * @return {CIQ.ChartEngine.YAxis} The yAxis to use
 * @memberof CIQ.Studies
 * @since
 * - 7.1.0
 * - 8.4.0 Creates a new yAxis if existing default yAxis has `allowSharing` property set to false.
 */
CIQ.Studies.smartCreateYAxis = function (
	stx,
	panel,
	name,
	newPosition,
	defaultAxis
) {
	var newParams = defaultAxis || {};
	var yAxis = stx.getYAxisByName(panel, name); // get existing yAxis to see if it is owned by the study
	if (!newPosition && defaultAxis) newPosition = defaultAxis.position;
	if (
		["left", "right", "none"].indexOf(newPosition) > -1 ||
		(newPosition === undefined && defaultAxis)
	) {
		// left/right/none or not specified
		// was sharing or default
		if (!yAxis || yAxis.isShared(stx)) {
			// was sharing an axis, need a new axis
			if (defaultAxis instanceof CIQ.ChartEngine.YAxis) {
				//want to share existing axis, DON'T rename it!
				name = defaultAxis.name;
			}
			CIQ.extend(newParams, { name: name, position: newPosition });
			if (
				!yAxis &&
				!stx.currentlyImporting &&
				panel != panel.chart.panel &&
				!panel.yAxis.studies.length &&
				!panel.yAxis.renderers.length
			) {
				// use orphaned yAxis which is not hosting anything
				yAxis = panel.yAxis;
				CIQ.extend(yAxis, newParams);
			} else {
				var isPanelAxis = yAxis == panel.yAxis;
				if (yAxis) yAxis.name = stx.electNewYAxisOwner(yAxis);
				var oldAxis = yAxis || panel.yAxis;
				if (oldAxis.lockScale) {
					CIQ.extend(newParams, {
						zoom: oldAxis.zoom,
						scroll: oldAxis.scroll,
						lockScale: true
					});
				}
				yAxis = stx.addYAxis(panel, new CIQ.ChartEngine.YAxis(newParams));
				if (isPanelAxis) panel.yAxis = yAxis;
			}
		} else {
			// was own axis, switch to left/right/none
			if (defaultAxis) CIQ.extend(yAxis, defaultAxis);
			yAxis.position = newPosition;
			yAxis.name = name;
		}
		return yAxis;
	}
	if (
		newPosition &&
		newPosition !== "default" &&
		newPosition !== "shared" &&
		newPosition !== panel.yAxis.name
	) {
		// a specific axis is specified
		var newAxis = stx.getYAxisByName(panel, newPosition);
		if (newAxis && yAxis == panel.yAxis && !yAxis.isShared(stx)) {
			// normally we don't need to do anything, but in this special case we need to give the panel a different owning yaxis
			panel.yAxis = newAxis;
		}
		if (yAxis && yAxis.isShared(stx)) {
			// pick a new axis name
			yAxis.name = stx.electNewYAxisOwner(yAxis);
		} else {
			if (yAxis !== panel.yAxis) stx.deleteYAxisIfUnused(panel, yAxis);
		}
		return newAxis;
	}
	if (
		newPosition == "shared" ||
		newPosition == panel.yAxis.name ||
		(panel.yAxis.allowSharing && (!yAxis || yAxis.allowSharing))
	) {
		// going to shared/default axis
		if (yAxis) {
			if (yAxis !== panel.yAxis && yAxis.isShared(stx)) {
				// pick a new axis name
				yAxis.name = stx.electNewYAxisOwner(yAxis);
			} else {
				delete yAxis.position;
				stx.deleteYAxisIfUnused(panel, yAxis);
			}
		}
		stx.resizeChart();
		return panel.yAxis;
	}

	// "default" but must create a new yAxis because the existing default one is "selfish" (allowSharing is false)
	CIQ.extend(newParams, { name: name });
	if (yAxis) yAxis.name = stx.electNewYAxisOwner(yAxis);
	if (!yAxis || yAxis.name)
		yAxis = stx.addYAxis(panel, new CIQ.ChartEngine.YAxis(newParams));
	else {
		CIQ.extend(yAxis, newParams);
		delete yAxis.position;
	}
	return yAxis;
};

/**
 * Default Volume calculation function.
 *
 * Volume is already obtained, so all that is done here is setting colors.
 * @param {CIQ.ChartEngine} stx A chart engine instance
 * @param {CIQ.Studies.StudyDescriptor} sd Study to calculate volume for
 * @memberOf CIQ.Studies
 */
CIQ.Studies.calculateVolume = function (stx, sd) {
	if (sd.type == "vol undr") {
		if (!stx || !stx.chart.dataSet) return;
		var layout = stx.layout;
		var remove = sd.parameters.removeStudy;
		var previous = layout.volumeUnderlay;
		layout.volumeUnderlay = !remove;
		if (previous != layout.volumeUnderlay) stx.changeOccurred("layout");
		if (remove) {
			CIQ.Studies.removeStudy(stx, sd);
		}
	}
	sd.outputMap = {};
	sd.outputMap.Volume = "";
};

/**
 * Moving Average convenience function.
 *
 * @param  {string}   type	The type of moving average (e.g., simple, exponential, triangular, etc.). Valid options can be seen by inspecting the keys on the `CIQ.Studies.movingAverage.typeMap` object.
 * @param  {number}   periods Moving average period
 * @param  {string}   field   The field in the data array to perform the moving average on
 * @param  {number}   offset  Periods to offset the result by
 * @param  {string}   name	String to prefix to the name of the output. Full name of output would be name + " " + sd.name. For instance, sending 'Signal' on a 'macd' study will result in an output field called "Signal &zwnj;macd&zwnj; (12,26,9)"
 * @param  {CIQ.ChartEngine} stx	 Chart object
 * @param  {object}   sd	  Study Descriptor
 * @param  {string}   subField	  Subfield within field to perform moving average on, if applicable.  For example, IBM.Close: field:"IBM", subField:"Close"
 * @memberof CIQ.Studies
 * @since 04-2015
 */
CIQ.Studies.MA = function (
	type,
	periods,
	field,
	offset,
	name,
	stx,
	sd,
	subField
) {
	var ma = new CIQ.Studies.StudyDescriptor(
		name + " " + sd.name,
		"ma",
		sd.panel
	);
	ma.chart = sd.chart;
	ma.days = parseInt(periods, 10);
	ma.startFrom = sd.startFrom;
	if (subField) ma.subField = subField;
	ma.inputs = {};
	if (type) ma.inputs.Type = type;
	if (field) ma.inputs.Field = field;
	if (offset) ma.inputs.Offset = parseInt(offset, 10);
	CIQ.Studies.calculateMovingAverage(stx, ma);
};

// Moving average data; add to it if adding moving average functionality
CIQ.Studies.movingAverage = {
	//conversions: mapping of study type to moving average type name
	conversions: {
		ma: "simple",
		sma: "simple",
		ema: "exponential",
		tma: "triangular",
		vdma: "vidya",
		wma: "weighted",
		smma: "welles wilder"
	},
	//translations: mapping of moving average type name to display name
	translations: {
		simple: "Simple",
		exponential: "Exponential",
		triangular: "Triangular",
		vidya: "VIDYA",
		weighted: "Weighted",
		"welles wilder": "Welles Wilder"
	},
	//typeMap: mapping of both study type and type name to calculation function suffix
	//i.e., calculateMovingAverageXXX
	typeMap: {
		ema: "Exponential",
		exponential: "Exponential",
		tma: "Triangular",
		triangular: "Triangular",
		vdma: "VIDYA",
		vidya: "VIDYA",
		wma: "Weighted",
		weighted: "Weighted",
		smma: "Exponential",
		"welles wilder": "Exponential"
	}
};
/**
 * Does conversions for valid moving average types
 *
 * @param  {CIQ.ChartEngine} stx The chart object
 * @param  {string} input String to test if a moving average type or "options" to return the list of ma options.
 * @return {Object} The name of the moving average or a list of options
 * @memberof CIQ.Studies
 */
CIQ.Studies.movingAverageHelper = function (stx, input) {
	if (input == "options") {
		var translations = {};
		for (var t in CIQ.Studies.movingAverage.translations) {
			translations[t] = stx.translateIf(
				CIQ.Studies.movingAverage.translations[t]
			);
		}
		return translations;
	}
	return CIQ.Studies.movingAverage.conversions[input];
};

/**
 * Creates a volume chart.
 *
 * If no volume is available on the screen then the panel will be watermarked "Volume Not Available" (translated if a translate function is attached to the kernel object).
 *
 * Uses {@link CIQ.ChartEngine#drawHistogram} and any "parameters" in the study definition will send into its 'params' object to control the histogram look and feel.
 * <br>Example:
 * ```
 * CIQ.extend(CIQ.Studies.studyLibrary["vol undr"],{
 * 		"parameters": {
 * 			"widthFactor":0.5
 * 		}
 * });
 * ```
 *
 * Uses CSS style :
 *  - `stx_volume_underlay` if "sd.underlay" is true
 *  - `stx_volume` if "sd.underlay" is NOT true
 *
 * See {@link CIQ.ChartEngine#colorByCandleDirection} to base colors on difference between open and close vs. difference between previous close and close.
 *
 * @param {CIQ.ChartEngine} stx A chart engine instance
 * @param {CIQ.Studies.StudyDescriptor} sd A study descriptor
 * @param {array} quotes Array of quotes
 * @memberof CIQ.Studies
 * @example
 * // default volume study library entry with required parameters
 * "volume": {
 *     "name": "Volume Chart",
 *     "range": "0 to max",
 *     "yAxis": {"ground":true, "initialMarginTop":0, "zoom":0},
 *     "seriesFN": CIQ.Studies.createVolumeChart,
 *     "calculateFN": CIQ.Studies.calculateVolume,
 *     "inputs": {},
 *     "outputs": {"Up Volume":"#8cc176","Down Volume":"#b82c0c"}
 * }
 * @example
 * // default volume underlay library entry with required parameters
 * "vol undr": {
 *     "name": "Volume Underlay",
 *     "underlay": true,
 *     "range": "0 to max",
 *     "yAxis": {"ground":true, "initialMarginTop":0, "position":"none", "zoom": 0, "heightFactor": 0.25},
 *     "seriesFN": CIQ.Studies.createVolumeChart,
 *     "calculateFN": CIQ.Studies.calculateVolume,
 *     "inputs": {},
 *     "outputs": {"Up Volume":"#8cc176","Down Volume":"#b82c0c"},
 *     "customRemoval": true,
 *     "removeFN": function(stx, sd){
 *         stx.layout.volumeUnderlay=false;
 *         stx.changeOccurred("layout");
 *     },
 *     "attributes":{
 *         "panelName":{hidden:true}
 *     }
 * }
 */
CIQ.Studies.createVolumeChart = function (stx, sd, quotes) {
	var panel = sd.panel,
		inputs = sd.inputs,
		underlay = sd.underlay;
	var colorUp = CIQ.Studies.determineColor(sd.outputs["Up Volume"]);
	var colorDown = CIQ.Studies.determineColor(sd.outputs["Down Volume"]);
	var style = underlay ? "stx_volume_underlay" : "stx_volume";
	stx.setStyle(style + "_up", "color", colorUp);
	stx.setStyle(style + "_down", "color", colorDown);
	var field = sd.volumeField || "Volume";
	var subField = null;

	var series = inputs.Series;
	if (series && series !== "Primary" && series !== "series") {
		subField = field;
		field = series;
	}

	var seriesParam = [
		{
			field: field,
			subField: subField,
			fill_color_up: stx.canvasStyle(style + "_up").color,
			border_color_up: stx.canvasStyle(style + "_up").borderLeftColor,
			opacity_up: stx.canvasStyle(style + "_up").opacity,
			fill_color_down: stx.canvasStyle(style + "_down").color,
			border_color_down: stx.canvasStyle(style + "_down").borderLeftColor,
			opacity_down: stx.canvasStyle(style + "_down").opacity,
			color_function: sd.colorFunction
		}
	];
	var seriesParam0 = seriesParam[0];

	var yAxis = sd.getYAxis(stx);
	var params = {
		name: "Volume",
		panel: panel,
		yAxis: yAxis,
		widthFactor: 1,
		bindToYAxis: true,
		highlight: sd.highlight
	};

	CIQ.extend(params, sd.study.parameters);
	CIQ.extend(params, sd.parameters);

	if (stx.colorByCandleDirection && !sd.colorFunction) {
		seriesParam0.color_function = function (quote) {
			var series = inputs.Series;
			if (series && series !== "Primary" && series !== "series") {
				quote = quote[series];
			}

			var O = quote.Open,
				C = quote.Close;
			//if((!O && O!==0) || (!C && C!==0) || O===C) return stx.defaultColor;

			return {
				fill_color:
					O > C ? seriesParam0.fill_color_down : seriesParam0.fill_color_up,
				border_color:
					O > C ? seriesParam0.border_color_down : seriesParam0.border_color_up
			};
		};
	}

	stx.drawHistogram(params, seriesParam);
};

/**
 * Calculate function for standard deviation.
 *
 * The resulting values will be added to the dataSet using the field name provided by the `sd.outputMap` entry.
 *
 * **Notes:**
 * - If no `outputs` object is defined in the library entry, the study will default to a single output named `Result`, which will then be used in lieu of `sd.outputs` to build the `sd.outputMap`.
 * - The study name may contain the unprintable character `&zwnj;`, see {@link CIQ.Studies.StudyDescriptor} documentation
 *
 * @param  {CIQ.ChartEngine} stx Chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd  Study Descriptor
 * @memberOf CIQ.Studies
 */
CIQ.Studies.calculateStandardDeviation = function (stx, sd) {
	var quotes = sd.chart.scrubbed;
	if (quotes.length < sd.days + 1) {
		sd.error = true;
		return;
	}
	var field = sd.inputs.Field;
	if (!field || field == "field") field = "Close";
	var type = sd.inputs["Moving Average Type"];
	if (!type) type = sd.inputs.Type;
	CIQ.Studies.MA(type, sd.days, field, sd.inputs.Offset, "_MA", stx, sd);

	var acc1 = 0;
	var acc2 = 0;
	var ma = 0;
	var mult = Number(sd.inputs["Standard Deviations"]);
	if (mult < 0) mult = 2;
	var name = sd.name;
	for (var p in sd.outputs) {
		name = p + " " + name;
	}
	var i, val, its;
	for (i = sd.startFrom - 1, its = 0; i >= 0 && its < sd.days; i--, its++) {
		val = CIQ.Studies.getQuoteFieldValue(quotes[i], field, sd.subField);
		if (val === null) val = 0;
		acc1 += Math.pow(val, 2);
		acc2 += val;
	}
	for (i = sd.startFrom; i < quotes.length; i++) {
		var quote = quotes[i];
		val = CIQ.Studies.getQuoteFieldValue(quote, field, sd.subField);
		if (val === null) val = 0;
		acc1 += Math.pow(val, 2);
		acc2 += val;
		if (i < sd.days - 1) continue;
		if (i >= sd.days) {
			var val2 = CIQ.Studies.getQuoteFieldValue(
				quotes[i - sd.days],
				field,
				sd.subField
			);
			if (val2 === null) val2 = 0;
			acc1 -= Math.pow(val2, 2);
			acc2 -= val2;
		}
		ma = quote["_MA " + sd.name];
		if (ma || ma === 0)
			quote[name] =
				Math.sqrt(
					(acc1 + sd.days * Math.pow(ma, 2) - 2 * ma * acc2) / sd.days
				) * mult;
	}
};

/**
 * Calculate function for moving averages.
 *
 * sd.inputs["Type"] can be used to request a specific type of moving average. Valid options can be seen by inspecting the keys on the `CIQ.Studies.movingAverage.typeMap` object.
 *
 * The resulting values will be added to the dataSet using the field name provided by the `sd.outputMap` entry.
 *
 * **Notes:**
 * - This function calculates a single value, so it expects `sd.outputMap` to contain a single mapping.
 * - To leverage as part of a larger study calculation, use {@link CIQ.Studies.MA} instead.
 * - If no `outputs` object is defined in the library entry, the study will default to a single output named `Result`, which will then be used in lieu of `sd.outputs` to build the field name.
 * - The study name may contain the unprintable character `&zwnj;`, see {@link CIQ.Studies.StudyDescriptor} documentation.
 *
 *
 * @param {CIQ.ChartEngine} stx A chart engine instance
 * @param {CIQ.Studies.StudyDescriptor} sd A study descriptor
 * @memberOf CIQ.Studies
 */
CIQ.Studies.calculateMovingAverage = function (stx, sd) {
	if (!sd.chart.scrubbed) return;
	var type = sd.inputs.Type;
	if (type == "ma" || type == "sma" || !type) type = "simple"; // handle when the default inputs are passed in
	var typeMap = CIQ.Studies.movingAverage.typeMap;
	if (type in typeMap) {
		return CIQ.Studies["calculateMovingAverage" + typeMap[type]](stx, sd);
	} else if (type !== "simple") {
		return;
	}
	var quotes = sd.chart.scrubbed;
	var acc = 0;
	var vals = [];
	var name = sd.name;
	for (var p in sd.outputs) {
		name = p + " " + name;
	}
	var field = sd.inputs.Field;
	if (!field || field == "field") field = "Close"; // Handle when the default inputs are passed in
	var offset = parseInt(sd.inputs.Offset, 10);
	if (isNaN(offset)) offset = 0;
	var i,
		val,
		ft,
		start = sd.startFrom;
	// backload the past data into the array
	var offsetBack = offset;
	for (i = sd.startFrom - 1; i >= 0; i--) {
		val = CIQ.Studies.getQuoteFieldValue(quotes[i], field, sd.subField);
		if (val === null) continue;
		if (offsetBack > 0) {
			offsetBack--;
			start = i;
			continue;
		}
		if (vals.length == sd.days - 1) break;
		acc += val;
		vals.unshift(val);
	}
	if (vals.length < sd.days - 1) {
		vals = [];
		start = 0; // not enough records to continue where left off
	}
	var futureTicks = [];
	for (i = start; i < quotes.length; i++) {
		var quote = quotes[i];
		val = CIQ.Studies.getQuoteFieldValue(quote, field, sd.subField);
		var notOverflowing = i + offset >= 0 && i + offset < quotes.length;
		var offsetQuote = notOverflowing ? quotes[i + offset] : null;
		if (val === null) {
			if (offsetQuote) offsetQuote[name] = null;
			else if (i + offset >= quotes.length) {
				ft = {};
				ft[name] = null;
				futureTicks.push(ft);
			}
			continue;
		}
		acc += val;
		vals.push(val);
		if (vals.length > sd.days) acc -= vals.shift();
		var myVal = vals.length == sd.days ? acc / sd.days : null;
		if (offsetQuote) offsetQuote[name] = myVal;
		else if (i + offset >= quotes.length) {
			ft = {};
			ft[name] = myVal;
			futureTicks.push(ft);
		}
	}
	sd.appendFutureTicks(stx, futureTicks);
};

/**
 * Calculate function for exponential moving average.
 *
 * The resulting values will be added to the dataSet using the field name provided by the `sd.outputMap` entry.
 *
 * **Notes:**
 * - This function calculates a single value, so it expects `sd.outputMap` to contain a single mapping.
 * - To leverage as part of a larger study calculation, use {@link CIQ.Studies.MA} instead.
 * - If no `outputs` object is defined in the library entry, the study will default to a single output named `Result`, which will then be used in lieu of `sd.outputs` to build the field name.
 * - The study name may contain the unprintable character `&zwnj;`, see {@link CIQ.Studies.StudyDescriptor} documentation.
 *
 * @param  {CIQ.ChartEngine} stx Chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd  Study Descriptor
 * @private
 * @memberof CIQ.Studies
 */
CIQ.Studies.calculateMovingAverageExponential = function (stx, sd) {
	var type = sd.inputs.Type;
	var quotes = sd.chart.scrubbed;
	var acc = 0;
	var ma = 0;
	var ii = 0;
	var multiplier = 2 / (sd.days + 1);
	if (type === "welles wilder" || type === "smma") multiplier = 1 / sd.days;

	var emaPreviousDay = null;
	var name = sd.name;
	for (var p in sd.outputs) {
		name = p + " " + name;
	}

	var field = sd.inputs.Field;
	if (!field || field == "field") field = "Close"; // Handle when the default inputs are passed in
	var offset = parseInt(sd.inputs.Offset, 10);
	if (isNaN(offset)) offset = 0;
	var i, val;
	var start = sd.startFrom;
	// find emaPreviousDay
	var offsetBack = offset;
	for (i = sd.startFrom - 1; i >= 0; i--) {
		val = quotes[i][name];
		if (!val && val !== 0) continue;
		if (emaPreviousDay === null) emaPreviousDay = val;
		ii = sd.days;
		if (offsetBack <= 0) break;
		offsetBack--;
		start = i;
	}
	if (emaPreviousDay === null) {
		emaPreviousDay = start = 0;
	}
	var futureTicks = [];
	for (i = start; i < quotes.length; i++) {
		var quote = quotes[i];
		val = CIQ.Studies.getQuoteFieldValue(quote, field, sd.subField);
		var notOverflowing = i + offset >= 0 && i + offset < quotes.length;
		var offsetQuote = notOverflowing ? quotes[i + offset] : null;
		var myVal;
		if (val === null) {
			myVal = null;
		} else {
			if (ii == sd.days - 1) {
				acc += val;
				ma = acc / sd.days;
				myVal = ma;
			} else if (ii < sd.days - 1) {
				acc += val;
				ma = acc / (ii + 1);
				myVal = null;
			} else if (ii === 0) {
				acc += val;
				ma = acc;
				myVal = null;
			} else if (emaPreviousDay || emaPreviousDay === 0) {
				ma = (val - emaPreviousDay) * multiplier + emaPreviousDay;
				myVal = ma;
			}
			emaPreviousDay = ma;
			ii++;
		}
		if (offsetQuote) offsetQuote[name] = myVal;
		else if (i + offset >= quotes.length) {
			var ft = {};
			ft[name] = myVal;
			futureTicks.push(ft);
		}
	}
	sd.appendFutureTicks(stx, futureTicks);
};

/**
 * Calculate function for VI Dynamic MA (VIDYA).
 *
 * The resulting values will be added to the dataSet using the field name provided by the `sd.outputMap` entry.
 *
 * **Notes:**
 * - This function calculates a single value, so it expects `sd.outputMap` to contain a single mapping.
 * - To leverage as part of a larger study calculation, use {@link CIQ.Studies.MA} instead.
 * - If no `outputs` object is defined in the library entry, the study will default to a single output named `Result`, which will then be used in lieu of `sd.outputs` to build the field name.
 * - The study name may contain the unprintable character `&zwnj;`, see {@link CIQ.Studies.StudyDescriptor} documentation.
 *
 * @param  {CIQ.ChartEngine} stx Chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd  Study Descriptor
 * @private
 * @memberof CIQ.Studies
 * @since 5.2.1
 */
CIQ.Studies.calculateMovingAverageVIDYA = function (stx, sd) {
	var type = sd.inputs.Type;
	var quotes = sd.chart.scrubbed;
	var alpha = 2 / (sd.days + 1);

	var vmaPreviousDay = null;
	var name = sd.name;
	for (var p in sd.outputs) {
		name = p + " " + name;
	}

	var field = sd.inputs.Field;
	if (!field || field == "field") field = "Close"; // Handle when the default inputs are passed in

	sd.std = new CIQ.Studies.StudyDescriptor(sd.name, "sdev", sd.panel);
	sd.std.chart = sd.chart;
	sd.std.days = 5;
	sd.std.startFrom = sd.startFrom;
	sd.std.inputs = { Field: field, "Standard Deviations": 1, Type: "ma" };
	sd.std.outputs = { _STD: null };
	CIQ.Studies.calculateStandardDeviation(stx, sd.std);

	CIQ.Studies.MA("ma", 20, "_STD " + sd.name, 0, "_MASTD", stx, sd);

	var offset = parseInt(sd.inputs.Offset, 10);
	if (isNaN(offset)) offset = 0;

	var i, val, ft;
	var start = sd.startFrom;
	// find vmaPreviousDay
	var offsetBack = offset;
	for (i = sd.startFrom - 1; i >= 0; i--) {
		val = quotes[i][name];
		if (!val && val !== 0) continue;
		if (vmaPreviousDay === null) vmaPreviousDay = val;
		if (offsetBack <= 0) break;
		offsetBack--;
		start = i;
	}
	if (vmaPreviousDay === null) {
		vmaPreviousDay = start = 0;
	}
	var futureTicks = [];
	for (i = start; i < quotes.length; i++) {
		var quote = quotes[i];
		val = CIQ.Studies.getQuoteFieldValue(quote, field, sd.subField);
		var notOverflowing = i + offset >= 0 && i + offset < quotes.length;
		var offsetQuote = notOverflowing ? quotes[i + offset] : null;
		if (val === null) {
			if (offsetQuote) offsetQuote[name] = null;
			else if (i + offset >= quotes.length) {
				ft = {};
				ft[name] = null;
				futureTicks.push(ft);
			}
			continue;
		}
		if (!quote["_MASTD " + sd.name] && quote["_MASTD " + sd.name] !== 0)
			continue;
		var vi = quote["_STD " + sd.name] / quote["_MASTD " + sd.name];
		var vma = alpha * vi * val + (1 - alpha * vi) * vmaPreviousDay;
		vmaPreviousDay = vma;
		if (i < sd.days) vma = null;
		if (offsetQuote) offsetQuote[name] = vma;
		else if (i + offset >= quotes.length) {
			ft = {};
			ft[name] = vma;
			futureTicks.push(ft);
		}
	}
	sd.appendFutureTicks(stx, futureTicks);
};

/**
 * Calculate function for triangular moving average.
 *
 * The resulting values will be added to the dataSet using the field name provided by the `sd.outputMap` entry.
 *
 * **Notes:**
 * - This function calculates a single value, so it expects `sd.outputMap` to contain a single mapping.
 * - To leverage as part of a larger study calculation, use {@link CIQ.Studies.MA} instead.
 * - If no `outputs` object is defined in the library entry, the study will default to a single output named `Result`, which will then be used in lieu of `sd.outputs` to build the field name.
 * - The study name may contain the unprintable character `&zwnj;`, see {@link CIQ.Studies.StudyDescriptor} documentation.
 *
 * @param  {CIQ.ChartEngine} stx Chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd  Study Descriptor
 * @private
 * @memberof CIQ.Studies
 */
CIQ.Studies.calculateMovingAverageTriangular = function (stx, sd) {
	var quotes = sd.chart.scrubbed;

	var field = sd.inputs.Field;
	if (!field || field == "field") field = "Close"; // Handle when the default inputs are passed in
	var days = Math.ceil(sd.days / 2);
	CIQ.Studies.MA("simple", days, field, 0, "TRI1", stx, sd);
	if (sd.days % 2 === 0) days++;
	CIQ.Studies.MA("simple", days, "TRI1 " + sd.name, 0, "TRI2", stx, sd);

	var name = sd.name;
	for (var p in sd.outputs) {
		name = p + " " + name;
	}
	var offset = parseInt(sd.inputs.Offset, 10);
	if (isNaN(offset)) offset = 0;

	// find start
	var offsetBack = offset;
	for (var i = sd.startFrom - 1; i >= 0; i--) {
		var val = CIQ.Studies.getQuoteFieldValue(quotes[i], name);
		if (val === null) continue;
		if (offsetBack > 0) {
			offsetBack--;
			continue;
		}
		break;
	}
	var futureTicks = [];
	for (i++; i < quotes.length; i++) {
		if (i + offset >= 0) {
			if (i + offset < quotes.length)
				quotes[i + offset][name] = quotes[i]["TRI2 " + sd.name];
			else {
				var ft = {};
				ft[name] = quotes[i]["TRI2 " + sd.name];
				futureTicks.push(ft);
			}
		}
	}
	sd.appendFutureTicks(stx, futureTicks);
};

/**
 * Calculate function for weighted moving average.
 *
 * The resulting values will be added to the dataSet using the field name provided by the `sd.outputMap` entry.
 *
 * **Notes:**
 * - This function calculates a single value, so it expects `sd.outputMap` to contain a single mapping.
 * - To leverage as part of a larger study calculation, use {@link CIQ.Studies.MA} instead.
 * - If no `outputs` object is defined in the library entry, the study will default to a single output named `Result`, which will then be used in lieu of `sd.outputs` to build the field name.
 * - The study name may contain the unprintable character `&zwnj;`, see {@link CIQ.Studies.StudyDescriptor} documentation.
 *
 * @param  {CIQ.ChartEngine} stx Chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd  Study Descriptor
 * @private
 * @memberof CIQ.Studies
 */
CIQ.Studies.calculateMovingAverageWeighted = function (stx, sd) {
	var quotes = sd.chart.scrubbed;

	var accAdd = 0;
	var accSubtract = 0;
	var field = sd.inputs.Field;
	if (!field || field == "field") field = "Close"; // Handle when the default inputs are passed in
	var divisor = (sd.days * (sd.days + 1)) / 2;

	var name = sd.name;
	for (var p in sd.outputs) {
		name = p + " " + name;
	}
	var offset = parseInt(sd.inputs.Offset, 10);
	if (isNaN(offset)) offset = 0;
	var i, val, ft;
	var vals = [];
	var start = sd.startFrom;
	// backload the past data into the array
	var offsetBack = offset;
	for (i = sd.startFrom - 1; i >= 0; i--) {
		val = CIQ.Studies.getQuoteFieldValue(quotes[i], field, sd.subField);
		if (val === null) continue;
		if (offsetBack > 0) {
			offsetBack--;
			start = i;
			continue;
		}
		if (vals.length == sd.days - 1) break;
		vals.unshift(val);
	}
	if (vals.length < sd.days - 1) {
		vals = [];
		start = 0; // not enough records to continue where left off
	}
	for (i = 0; i < vals.length; i++) {
		accAdd += (i + 1) * vals[i];
		accSubtract += vals[i];
	}
	var futureTicks = [];
	for (i = start; i < quotes.length; i++) {
		var quote = quotes[i];
		val = CIQ.Studies.getQuoteFieldValue(quote, field, sd.subField);
		var notOverflowing = i + offset >= 0 && i + offset < quotes.length;
		var offsetQuote = notOverflowing ? quotes[i + offset] : null;
		if (val === null) {
			if (offsetQuote) offsetQuote[name] = null;
			else if (i + offset >= quotes.length) {
				ft = {};
				ft[name] = null;
				futureTicks.push(ft);
			}
			continue;
		}
		vals.push(val);
		if (vals.length > sd.days) {
			accAdd -= accSubtract;
			accSubtract -= vals.shift();
		}
		accAdd += vals.length * val;
		accSubtract += val;

		var myVal = i < sd.days - 1 ? null : accAdd / divisor;
		if (offsetQuote) offsetQuote[name] = myVal;
		else if (i + offset >= quotes.length) {
			ft = {};
			ft[name] = myVal;
			futureTicks.push(ft);
		}
	}
	sd.appendFutureTicks(stx, futureTicks);
};

CIQ.Studies.calculateMultMA = function (stx, sd) {
	const quotes = sd.chart.scrubbed;
	const periods = [Number.MAX_VALUE];
	Object.keys(sd.inputs)
		.filter((n) => n.indexOf("Period") > -1)
		.forEach((n, i) => {
			periods[i + 1] = sd.inputs[n];
		});
	if (quotes.length < Math.min(...periods) + 1) {
		sd.error = true;
		return;
	}
	let field = sd.inputs.Field;
	if (!field || field == "field") field = "Close";
	let maType = sd.inputs["Moving Average Type"];
	if (!maType) maType = "simple";
	let offset = sd.inputs.Offset || 0;
	for (let i = 1; i < periods.length; i++)
		CIQ.Studies.MA(maType, periods[i], field, offset, "MA " + i, stx, sd);
};

CIQ.Studies.calculateStudyATR = function (stx, sd) {
	var quotes = sd.chart.scrubbed;
	var period = sd.days;
	if (quotes.length < period + 1) {
		sd.error = true;
		return;
	}
	var total = 0;
	var name = sd.name;
	for (var i = Math.max(sd.startFrom, 1); i < quotes.length; i++) {
		var prices = quotes[i];
		var pd = quotes[i - 1];
		var trueRange = prices.trueRange;
		if (pd["Sum True Range " + name]) total = pd["Sum True Range " + name];
		total += trueRange;
		if (i > period) total -= quotes[i - period]["True Range " + name];
		prices["True Range " + name] = trueRange;
		prices["Sum True Range " + name] = total;
		if (i == period) prices["ATR " + name] = total / period;
		else if (i > period)
			prices["ATR " + name] =
				(pd["ATR " + name] * (period - 1) + trueRange) / period;
	}
};

/**
 * Default display function used on 'ATR Trailing Stop' and 'Parabolic SAR' studies to display a series of 'dots' at the required price-date coordinates.
 *
 * Visual Reference:<br>
 * ![displayPSAR2](img-displayPSAR2.png "displayPSAR2")
 *
 * @param {CIQ.ChartEngine} stx A chart engine instance
 * @param {CIQ.Studies.StudyDescriptor} sd
 * @param {array} quotes Array of quotes
 * @memberOf CIQ.Studies
 */
CIQ.Studies.displayPSAR2 = function (stx, sd, quotes) {
	var panel = stx.panels[sd.panel];
	var yAxis = sd.getYAxis(stx);
	var sharingChartAxis = yAxis == stx.chart.panel.yAxis;
	stx.startClip(panel.name);
	var ctx = sd.getContext(stx);
	var squareWave = sd.inputs["Plot Type"] == "squarewave";
	for (var output in sd.outputs) {
		var field = output + " " + sd.name;
		ctx.beginPath();
		var candleWidth = stx.layout.candleWidth;
		var pointWidth = Math.max(3, Math.floor(candleWidth / 4));
		for (var x = 0; x < quotes.length; x++) {
			var quote = quotes[x];
			if (!quote || CIQ.Studies.getQuoteFieldValue(quote, field) === null)
				continue;
			if (quote.candleWidth) candleWidth = quote.candleWidth;
			if (sharingChartAxis && quote.transform) quote = quote.transform;
			var x0 = stx.pixelFromBar(x, panel.chart);
			if (squareWave) x0 -= candleWidth / 2;
			var y0 = stx.pixelFromTransformedValue(
				quote[sd.referenceOutput ? sd.referenceOutput + " " + sd.name : field],
				panel,
				yAxis
			);
			if (
				x === 0 ||
				!quotes[x - 1] ||
				CIQ.Studies.getQuoteFieldValue(quotes[x - 1], field) === null
			) {
				ctx.moveTo(x0, y0);
			}
			if (squareWave) {
				ctx.lineTo(x0, y0);
				ctx.lineTo(x0 + candleWidth, y0);
				if (quotes[x + 1]) {
					var quote_1 = quotes[x + 1];
					if (sharingChartAxis && quote_1.transform)
						quote_1 = quote_1.transform;
					if (CIQ.Studies.getQuoteFieldValue(quote_1, field) === null) {
						ctx.lineTo(
							x0 + candleWidth,
							stx.pixelFromTransformedValue(
								quote_1[
									sd.referenceOutput
										? sd.referenceOutput + " " + sd.name
										: field
								],
								stx.panels[sd.panel],
								yAxis
							)
						);
					}
				}
			} else {
				ctx.moveTo(x0 - pointWidth / 2, y0);
				ctx.lineTo(x0 + pointWidth / 2, y0);
			}
		}
		ctx.lineWidth = 1;
		if (sd.highlight) ctx.lineWidth = 3;
		var color = CIQ.Studies.determineColor(sd.outputs[output]);
		if (color == "auto") color = stx.defaultColor; // This is calculated and set by the kernel before draw operation.
		ctx.strokeStyle = color;
		if (!sd.highlight && stx.highlightedDraggable) ctx.globalAlpha *= 0.3;
		ctx.stroke();
		ctx.closePath();
		ctx.lineWidth = 1;
	}
	stx.endClip();
};

CIQ.Studies.inputAttributeDefaultGenerator = function (value) {
	if (!value && value !== 0) return {};
	if (value.constructor == Number) {
		if (Math.floor(value) == value) {
			// Integer
			if (value > 0) return { min: 1, step: 1 }; // positive
			return { step: 1 }; // full range
		}
		// Decimal
		if (value > 0) return { min: 0, step: 0.01 }; // positive
		return { step: 0.01 }; // full range
	}
	return {};
};

/**
 * Gets the difference between the local browser time and the market time.
 *
 * @param {object} params Function parameters.
 * @param {CIQ.ChartEngine} params.stx A reference to the chart object.
 * @param {object} params.localQuoteDate A Date object that contains the market date and time.
 * @param {boolean} params.shiftToDateBoundary Indicates whether the offset for FOREX symbols
 * 		should be adjusted such that the beginning of the trading day (17:00 New York time) falls
 * 		on a date boundary; if so, adds seven hours to the date/time (six for metals). **Note:**
 * 		This parameter applies to FOREX symbols only. No additional time offset is added to
 * 		non-FOREX symbols, regardless of the value of this parameter.
 * @return {number} The local browser date/time minus the market date/time in milliseconds.
 *
 * @memberof CIQ.Studies
 * @since
 * - 8.0.0
 * - 8.1.0 Removed `isForex` parameter. Added `shiftToDateBoundary` parameter. Added `params`
 * 		parameter and made all other parameters properties of `params`.
 */
CIQ.Studies.getMarketOffset = function ({
	stx,
	localQuoteDate,
	shiftToDateBoundary
}) {
	let isForex; // defer to passed value if present
	if (arguments.length > 1) {
		stx = arguments[0];
		localQuoteDate = arguments[1];
		isForex = arguments[2];
	}

	const { symbol } = stx.chart;
	const isMetal = CIQ.getFn("Market.Symbology.isForexMetal")(symbol);
	if (isForex === undefined) {
		isForex = CIQ.getFn("Market.Symbology.isForexSymbol")(symbol);
	}

	let marketZone;
	if (!stx.chart.market) marketZone = null;
	else marketZone = isForex ? "America/New_York" : stx.chart.market.market_tz;

	var dt = new Date(
		localQuoteDate.getTime() + localQuoteDate.getTimezoneOffset() * 60000
	);
	if (!marketZone || marketZone.indexOf("UTC") == -1)
		dt = CIQ.convertTimeZone(dt, "UTC", marketZone);

	let marketOffset =
		new Date(
			dt.getFullYear(),
			dt.getMonth(),
			dt.getDate(),
			dt.getHours(),
			dt.getMinutes(),
			dt.getSeconds(),
			dt.getMilliseconds()
		).getTime() - localQuoteDate.getTime();

	if (shiftToDateBoundary && isForex)
		marketOffset += (isMetal ? 6 : 7) * 60 * 60 * 1000;
	return marketOffset;
};

/**
 * Function to determine which studies are available.
 * @param  {object} excludeList Exclusion list of studies in object form (e.g., {"rsi":true,"macd":true})
 * @returns {object} Map of available entries from {@link CIQ.Studies.studyLibrary}.
 * @memberof CIQ.Studies
 * @since 3.0.0
 */
CIQ.Studies.getStudyList = function (excludeList) {
	var map = {};
	var excludedStudies = {}; // from time to time put old studies in here to not list them
	CIQ.extend(excludedStudies, excludeList);
	for (var libraryEntry in CIQ.Studies.studyLibrary) {
		if (!excludedStudies[libraryEntry])
			map[CIQ.Studies.studyLibrary[libraryEntry].name] = libraryEntry;
	}
	return map;
};

/**
 * A helper function that will find the color value in the output.
 * @param {string|object} output Color string value or object that has the color value
 * @return {string}	Color value
 * @memberof CIQ.Studies
 * @since 4.0.0
 */
CIQ.Studies.determineColor = function (output) {
	if (!output) {
		return null;
	} else if (typeof output === "object") {
		return output.color;
	}

	return output;
};

/**
 * Calculate function for preparing data to be used by displayChannel().
 *
 * Inserts the following fields in the dataSet:
 * ```
 * quote[sd.type + " Top " + sd.name]=quote[centerIndex]+totalShift;
 * quote[sd.type + " Bottom " + sd.name]=quote[centerIndex]-totalShift;
 * quote[sd.type + " Median " + sd.name]=quote[centerIndex];
 * quote["Bandwidth " + sd.name]=200*totalShift/quote[centerIndex];
 * quote["%b " + sd.name]=50*((quote.Close-quote[centerIndex])/totalShift+1);
 * ```
 * Example: 'Prime Bands' + ' Top ' +  'Prime Number Bands (true)'.
 * @param  {CIQ.ChartEngine} stx Chart object
 * @param  {CIQ.Studies.StudyDescriptor} sd  Study Descriptor
 * @param  {object} percentShift Used to calculate totalShift. Defaults to 0 (zero)
 * @param  {object} [centerIndex=Close]  Quote element to use for center series (Open, Close, High, Low). Defaults to "Close"
 * @param  {object} [offsetIndex=centerIndex]  Quote element to use for calculating totalShift (percentShift*quote[offsetIndex]+pointShift;)
 * @param  {object} [pointShift=0]   Used to calculate totalShift.Defaults to 0 (zero)
 * @memberOf CIQ.Studies
 */
CIQ.Studies.calculateGenericEnvelope = function (
	stx,
	sd,
	percentShift,
	centerIndex,
	offsetIndex,
	pointShift
) {
	if (!percentShift) percentShift = 0;
	if (!pointShift) pointShift = 0;
	if (!centerIndex || centerIndex == "field") centerIndex = "Close";
	if (!offsetIndex) offsetIndex = centerIndex;
	var quotes = sd.chart.scrubbed;
	if (!quotes) return;
	var field = sd.inputs.Field;
	for (var i = sd.startFrom; i < quotes.length; i++) {
		var quote = quotes[i];
		if (!quote) continue;
		var qfv = CIQ.Studies.getQuoteFieldValue(quote, field);
		var closeValue =
			qfv !== null && qfv !== undefined
				? qfv
				: CIQ.Studies.getQuoteFieldValue(quote, "Close");
		var offsetValue = CIQ.Studies.getQuoteFieldValue(
			quote,
			offsetIndex,
			sd.subField
		);
		var centerValue = CIQ.Studies.getQuoteFieldValue(quote, centerIndex);
		if (centerValue === null) continue;
		var totalShift = percentShift * offsetValue + pointShift;
		quote[sd.type + " Top " + sd.name] = centerValue + totalShift;
		quote[sd.type + " Bottom " + sd.name] = centerValue - totalShift;
		quote[sd.type + " Median " + sd.name] = centerValue;
		quote["Bandwidth " + sd.name] = centerValue
			? (200 * totalShift) / centerValue
			: 0;
		quote["%b " + sd.name] = 50 * ((closeValue - centerValue) / totalShift + 1);
	}
};

/**
 * Rendering function for displaying a Channel study output composed of top, middle and bottom lines.
 *
 * Requires study library input of `"Channel Fill":true` to determine if the area within the channel is to be shaded.
 * Shading will be done using the "xxxxx Channel" or "xxxxx Median" color defined in the outputs parameter of the study library.
 *
 * Requires study library outputs to have fields in the format of:
 * - 'xxxxx Top' or 'xxxxx High' for the top band,
 * - 'xxxxx Bottom' or 'xxxxx Low' for the bottom band and
 * - 'xxxxx Median' or 'xxxxx Channel' for the middle line.
 *
 * It expects 'quotes' to have fields for each series in the channel with keys in the following format:
 * - study-output-name ( from study library) + " " + sd.name.
 * - Example: 'Prime Bands Top'+ ' ' +  'Prime Number Bands (true)'. Which equals : 'Prime Bands Top Prime Number Bands (true)'
 *
 * @param  {CIQ.ChartEngine} stx Chart object
 * @param {CIQ.Studies.StudyDescriptor} sd  Study Descriptor
 * @param {array} quotes The array of quotes needed to render the channel
 * @memberOf CIQ.Studies
 * @example
 * "inputs": {"Period":5, "Shift": 3, "Field":"field", "Channel Fill":true}
 * "outputs": {"Prime Bands Top":"red", "Prime Bands Bottom":"auto", "Prime Bands Channel":"rgb(184,44,11)"}
 * @example
 * // full definition example including opacity
	"Bollinger Bands": {
		"name": "Bollinger Bands",
		"overlay": true,
		"calculateFN": CIQ.Studies.calculateBollinger,
		"seriesFN": CIQ.Studies.displayChannel,
		"inputs": {"Field":"field", "Period":20, "Standard Deviations": 2, "Moving Average Type":"ma", "Channel Fill": true},
		"outputs": {"Bollinger Bands Top":"auto", "Bollinger Bands Median":"auto", "Bollinger Bands Bottom":"auto"},
		"attributes": {
			"Standard Deviations":{min:0.1,step:0.1}
		},
		"parameters": {
			"init":{opacity: 0.2}
		}
	}
 * @since
 * - 4.1.0 Now also uses `sd.parameters.opacity` if one defined.
 * - 4.1.0 Now shading is rendered under the channel lines instead of over.
 */
CIQ.Studies.displayChannel = function (stx, sd, quotes) {
	if (sd.inputs["Channel Fill"]) {
		var parameters = { panelName: sd.panel };
		for (var p in sd.outputs) {
			var lastWord = p.split(" ").pop();
			if (lastWord == "Top" || lastWord == "High") {
				parameters.topBand = p + " " + sd.name;
			} else if (lastWord == "Bottom" || lastWord == "Low") {
				parameters.bottomBand = p + " " + sd.name;
			} else if (lastWord == "Median" || lastWord == "Channel") {
				parameters.color = CIQ.Studies.determineColor(sd.outputs[p]);
			}
		}
		if (sd.parameters && sd.parameters.opacity) {
			parameters.opacity = sd.parameters.opacity;
		} else {
			parameters.opacity = 0.2;
		}
		var panel = stx.panels[sd.panel];
		parameters.skipTransform = panel.name != sd.chart.name;
		parameters.yAxis = sd.getYAxis(stx);
		if (!sd.highlight && stx.highlightedDraggable) parameters.opacity *= 0.3;

		CIQ.prepareChannelFill(stx, parameters);
	}
	CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
};

/**
 * Initializes an anchor handle element on a study and adds the anchor element to the chart
 * controls. If the anchor element and study already exist but the study object has changed, the
 * existing anchor element is added to the new study object. **Note:** A study object may change
 * without its unique ID changing.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart object.
 * @param {CIQ.Studies.StudyDescriptor} sd Specifies a study object.
 *
 * @memberof CIQ.Studies
 * @since 8.1.0
 */
CIQ.Studies.initAnchorHandle = function (stx, sd) {
	let { handle } = sd;
	if (handle) return;

	if (!stx.controls.anchorHandles) stx.controls.anchorHandles = {};
	const { anchorHandles, chartControls } = stx.controls;

	if (anchorHandles[sd.uniqueId]) {
		({ handle } = anchorHandles[sd.uniqueId]);
	} else {
		handle = document.createElement("div");
		handle.classList.add("stx_anchor_handle");
		handle.setAttribute(sd.uniqueId, "");
		anchorHandles[sd.uniqueId] = { handle, sd };
		if (chartControls) chartControls.parentElement.appendChild(handle);
	}

	sd.anchorHandle = handle;
};

/**
 * Removes an anchor handle element from the specified study.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart object.
 * @param {CIQ.Studies.StudyDescriptor} sd Specifies a study object.
 *
 * @memberof CIQ.Studies
 * @since 8.1.0
 */
CIQ.Studies.removeAnchorHandle = function (stx, sd) {
	const { handle } = (stx.controls.anchorHandles || {})[sd.uniqueId] || {};
	if (handle) {
		delete stx.controls.anchorHandles[sd.uniqueId];
		handle.remove();
	}
};

/**
 * Repositions the anchor for a study to the tick where the anchor element has been dragged. This
 * causes the study to be recalculated. If there is no hover location (the anchor has not been
 * dragged), the study is recalculated without changing the anchor.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart object.
 * @param {CIQ.Studies.StudyDescriptor} sd Specifies a study object.
 *
 * @memberof CIQ.Studies
 * @since 8.1.0
 */
CIQ.Studies.repositionAnchor = function (stx, sd) {
	const { currentAnchorTime, uniqueId } = sd;
	const { hoverTick } = stx.repositioningAnchorSelector || {};
	const { dataSet, market } = stx.chart;
	if (!stx.controls.anchorHandles) stx.controls.anchorHandles = {};
	const { anchorHandles } = stx.controls;
	let newInputs = {};

	if (hoverTick || hoverTick === 0) {
		if (hoverTick >= dataSet.length) return;

		const isDaily = !sd.inputs.hasOwnProperty("Anchor Date");
		let hoverDate = dataSet[hoverTick].DT;

		const marketOffset = CIQ.Studies.getMarketOffset({
			stx,
			localQuoteDate: hoverDate,
			shiftToDateBoundary: true
		});

		if (
			currentAnchorTime &&
			isDaily &&
			new Date(hoverDate.getTime() + marketOffset).getDate() !==
				new Date(currentAnchorTime.getTime() + marketOffset).getDate()
		) {
			return;
		}

		if (market.market_def && market.market_def.market_tz) {
			hoverDate = new timezoneJS.Date(hoverDate, market.market_def.market_tz);
		}

		const newAnchorDate = !isDaily && CIQ.dateToStr(hoverDate, "YYYY-MM-dd");
		const newAnchorTime = CIQ.dateToStr(hoverDate, "HH:mm:ss");
		newInputs = { "Anchor Time": newAnchorTime };
		if (newAnchorDate) newInputs["Anchor Date"] = newAnchorDate;
	} else return;

	const newSd = CIQ.Studies.replaceStudy(
		stx,
		sd.inputs.id,
		sd.type,
		Object.assign(sd.inputs, newInputs),
		sd.outputs,
		sd.parameters,
		sd.panel
	);

	// check for handle because we may be "repositioning" an as yet unanchored study
	if (anchorHandles[uniqueId]) anchorHandles[uniqueId].sd = newSd;
	stx.draw();
};

/**
 * Cancels an active repositioning. If the study requires a tap to finish adding (e.g. AVWAP),
 * the incomplete study will be removed.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart object.
 *
 * @memberof CIQ.Studies
 * @since 8.4.0
 */
CIQ.Studies.cancelRepositionAnchor = function (stx) {
	const { sd, tapToAdd } = stx.repositioningAnchorSelector || {};
	if (!sd) return;
	if (tapToAdd) CIQ.Studies.removeStudy(stx, sd);
	stx.repositioningAnchorSelector = null;
	const { anchorHandles } = stx.controls;
	if (anchorHandles && anchorHandles[sd.uniqueId]) {
		anchorHandles[sd.uniqueId].highlighted = false;
		CIQ.Studies.displayAnchorHandleAndLine(stx, sd, stx.chart.dataSegment);
	}
	stx.draw();
};

/**
 * Displays the anchor element at its current location and a line depicting the hover location of
 * the anchor as it is being dragged. Called as part of the draw loop.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart object.
 * @param {CIQ.Studies.StudyDescriptor} sd Specifies a study object.
 * @param {array} quotes The quotes (`dataSegment`) array.
 *
 * @memberof CIQ.Studies
 * @since 8.1.0
 */
CIQ.Studies.displayAnchorHandleAndLine = function (stx, sd, quotes) {
	if (sd.signalData && !sd.signalData.reveal) return;
	if (!quotes || !quotes[0]) return;

	const currentPanelDragging =
		(stx.repositioningAnchorSelector || {}).sd === sd;
	const { hoverTick } = currentPanelDragging && stx.repositioningAnchorSelector;
	const { chart, panels, cy } = stx;
	const { market = {}, symbol } = chart;
	const panel = panels[sd.panel];
	const { top, right, left, height, subholder } = panel;
	const { bottom } = panel.yAxis; // yAxis bottom accounts for x-axis
	const { inputs, anchorHandle: handle, currentAnchorTime, lineWidth = 1 } = sd;
	const { backgroundColor: color, borderLeftColor: colorInvalid } =
		stx.canvasStyle("stx_anchor_handle");
	const isDaily = !inputs["Anchor Date"]; // for anchors without a date
	const isForex = CIQ.getFn("Market.Symbology.isForexSymbol")(symbol);
	const hoverDate =
		(hoverTick || hoverTick === 0) && (stx.chart.dataSet[hoverTick] || {}).DT;
	const marketOffset = CIQ.Studies.getMarketOffset({
		stx,
		localQuoteDate: quotes[quotes.length - 1].DT,
		shiftToDateBoundary: true
	});
	const hoverOutOfBounds =
		currentAnchorTime &&
		hoverDate &&
		isDaily &&
		new Date(hoverDate.getTime() + marketOffset).getDate() !==
			new Date(currentAnchorTime.getTime() + marketOffset).getDate();
	const { floatDate, anchorHandles = {} } = stx.controls;
	const anchorControl = anchorHandles[sd.uniqueId] || {};
	const { highlighted } = anchorControl;
	const [normalOpenHours, normalOpenMins] = market
		.getNormalOpen()
		.split(":")
		.map((x) => parseInt(x));

	const getPixel = (dt) => {
		let tick = dt ? stx.tickFromDate(dt, null, null, true) : hoverTick;
		return [stx.pixelFromTick(tick, chart), tick];
	};

	const lineConfig = {
		y0: top,
		y1: bottom,
		type: "line",
		confineToPanel: panel
	};

	let [hoverPixel] = getPixel();

	if (hoverPixel) {
		hoverPixel -= 0.5; // to line up with handle properly
		stx.plotLine(
			Object.assign(lineConfig, {
				x0: hoverPixel,
				x1: hoverPixel,
				color: hoverOutOfBounds ? colorInvalid : color,
				pattern: [6, 6],
				lineWidth: 1,
				opacity: hoverOutOfBounds ? 0.5 : 1
			})
		);

		CIQ.efficientDOMUpdate(floatDate.style, "visibility", "");
		stx.updateChartAccessories();
	}

	if (handle) {
		let anchorTime = isDaily
			? new Date(quotes[quotes.length - 1].DT) // if no anchor date diplay at right most
			: CIQ.strToDate(inputs["Anchor Date"]);

		if (market.market_def && market.market_def.market_tz) {
			anchorTime = new timezoneJS.Date(anchorTime, market.market_def.market_tz);
		}

		if (!isDaily) {
			let [YYYY, MM, dd] = (inputs["Anchor Date"] || "").split("-");
			if (!dd) [, YYYY, MM, dd] = YYYY.match(/([0-9]{4})([0-9]{2})([0-9]{2})/);
			anchorTime.setFullYear(YYYY, MM - 1, dd);
		}
		let [hh = 0, mm = 0, ss = 0] = (inputs["Anchor Time"] || "").split(":");
		if (!mm && mm !== 0)
			[, hh, mm, ss] = hh.match(/([0-9]{2})([0-9]{2})([0-9]{2})/);
		anchorTime.setHours(hh, mm, ss);

		// This will allow us to shift the anchor and end of day to compensate for the midnight-bisected
		// nature of FOREX market sessions
		const firstSection =
			isForex &&
			(anchorTime.getHours() > normalOpenHours ||
				(anchorTime.getHours() === normalOpenHours &&
					anchorTime.getMinutes() >= normalOpenMins));

		if (firstSection) anchorTime.setDate(anchorTime.getDate() - 1);

		let [currentPixel, currentTick] = getPixel(anchorTime);
		let endOfDay = new Date(anchorTime);
		endOfDay.setHours(...market.getNormalClose().split(":"));
		if (firstSection) endOfDay.setDate(endOfDay.getDate() + 1);

		const [endOfDayPixel] = (endOfDay && getPixel(endOfDay)) || [];

		if (isDaily && (currentPixel > right || endOfDayPixel > right)) {
			// rewind if necessary to get anchor on day that is fully visible
			let shiftedAnchor = new Date(anchorTime);
			if (market) {
				do {
					shiftedAnchor.setDate(shiftedAnchor.getDate() - 1);
				} while (!market.isMarketDate(shiftedAnchor));
			}
			// if new position is off the left of the chart don't both shifting
			let [shiftedPixel, shiftedTick] = getPixel(shiftedAnchor);
			if (shiftedPixel > left) {
				anchorTime = shiftedAnchor;
				currentPixel = shiftedPixel;
				currentTick = shiftedTick;
			}
		}

		currentPixel -= 0.5; // to line up with handle properly
		stx.plotLine(
			Object.assign(lineConfig, {
				x0: currentPixel,
				x1: currentPixel,
				color: color,
				pattern: "solid",
				lineWidth,
				opacity: highlighted || sd.highlight ? 1 : 0.5
			})
		);

		anchorControl.currentPixel = currentPixel;

		if (highlighted) {
			handle.style.display = "";
			handle.style.height = Math.max(Math.min(25, height / 4), 8) + "px";

			const handleDims = handle.getBoundingClientRect();
			const verticalPosition = Math.max(
				Math.min(cy - handleDims.height / 2, bottom - 3 - handleDims.height),
				top + 3 // include 3px gutters
			);

			handle.style.top = verticalPosition + "px";
			handle.style.left =
				(hoverTick || hoverTick === 0 ? hoverPixel : currentPixel) -
				handleDims.width / 2 +
				"px";

			subholder.style.cursor = "ew-resize";
		} else {
			handle.style.display = "none";
			subholder.style.cursor = "auto";
		}

		sd.currentAnchorTime = anchorTime;
		sd.currentAnchorTick = currentTick;
	}
};

/**
 * Assign an output alias for the study displayed in the tooltip addon.
 *
 * @param {object} studyOutputAliasList The alias object with a key being the study name and the value being an object that maps what you want the pre-existing study output to be.
 * @memberof CIQ.Studies
 * @example
 * CIQ.Studies.assignAliasesToStudies({"PMO": { "PMOSignal": "Signal" }});
 * @since 9.1.0
 */
CIQ.Studies.assignAliasesToStudies = function (studyOutputAliasList) {
	const self = this;
	Object.entries(studyOutputAliasList).forEach(
		([key, value]) => ((self.studyLibrary[key] || {}).alias = value)
	);
};

// object to keep track of the custom scripts
CIQ.Studies.studyScriptLibrary = {};

/**
 * The `studyLibrary` defines all of the available studies.
 *
 * This is used to drive the dialog boxes and creation of the studies. When you
 * create a custom study you should add it to the studyLibrary.
 *
 * You can also alter study defaults by overriding the different elements on each definition.
 * For example, if you wanted to change the default colors for the volume underlay,
 * you would add the following code in your files; making sure your files are loaded **after** the library js files -- not before:
 * ```
 * CIQ.Studies.studyLibrary["vol undr"].outputs= {"Up Volume":"blue","Down Volume":"yellow"};
 * ```
 * See {@tutorial Using and Customizing Studies} for complete details.
 * @type {Object}
 * @memberof CIQ.Studies
 * @example
 * "RAVI": {
 *     "name": "RAVI",
 *     "seriesFN": CIQ.Studies.displayRAVI,
 *     "calculateFN": CIQ.Studies.calculatePriceOscillator,
 *     "inputs": {"Field":"field", "Short Cycle":7, "Long Cycle":65},
 *     "outputs": {"Increasing Bar":"#00DD00", "Decreasing Bar":"#FF0000"},
 *     "parameters": {
 *         init:{studyOverZonesEnabled:true, studyOverBoughtValue:3, studyOverBoughtColor:"auto", studyOverSoldValue:-3, studyOverSoldColor:"auto"}
 *     },
 *     "attributes":{
 *         "studyOverBoughtValue":{"min":0,"step":"0.1"},
 *         "studyOverSoldValue":{"max":0,"step":"0.1"}
 *     }
 * }
 */
CIQ.Studies.studyLibrary = CIQ.Studies.studyLibrary || {};
CIQ.extend(CIQ.Studies.studyLibrary, {
	ma: {
		name: "Moving Average",
		overlay: true,
		calculateFN: CIQ.Studies.calculateMovingAverage,
		inputs: { Period: 50, Field: "field", Type: "ma", Offset: 0 },
		outputs: { MA: "#FF0000" }
	},
	"STD Dev": {
		name: "Standard Deviation",
		calculateFN: CIQ.Studies.calculateStandardDeviation,
		inputs: {
			Period: 14,
			Field: "field",
			"Standard Deviations": 2,
			"Moving Average Type": "ma"
		},
		attributes: {
			"Standard Deviations": { min: 0.1, step: 0.1 }
		}
	},
	"True Range": {
		name: "True Range",
		calculateFN: CIQ.Studies.calculateStudyATR,
		inputs: {},
		outputs: { "True Range": "auto" }
	},
	volume: {
		name: "Volume Chart",
		range: "0 to max",
		yAxis: { ground: true },
		seriesFN: CIQ.Studies.createVolumeChart,
		calculateFN: CIQ.Studies.calculateVolume,
		inputs: { Series: "series" },
		attributes: {
			Series: {
				hidden: function () {
					return !Object.keys(this.chart.series).length;
				}
			}
		},
		outputs: { "Up Volume": "#8cc176", "Down Volume": "#b82c0c" }
	},
	MACross: {
		name: "Moving Average Cross",
		overlay: true,
		calculateFN: CIQ.Studies.calculateMultMA,
		inputs: {
			"MA 1 Period": 20,
			"MA 2 Period": 50,
			"MA 3 Period": 200,
			Field: "field",
			"Moving Average Type": "ma",
			Offset: 0
		},
		outputs: {
			"MA 1": "#e9088c",
			"MA 2": "#00afed",
			"MA 3": "#f4932f"
		}
	}
});

};
__js_standard_studies_(typeof window !== "undefined" ? window : global);
