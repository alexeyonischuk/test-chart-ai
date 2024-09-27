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
import "../../js/webcomponents/dialog.js";
import "../../js/webcomponents/close.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-aggregation-dialog&gt;</h4>
 *
 * Provides content for aggregation chart settings dialog.  Most aggregation types require a parameter to control box reversal amount and/or box size.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when it saves a view.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "change" |
 * | action | "input" |
 * | aggregationType | _type of chart aggregation_ |
 * | box | _box size_ |
 * | reversal | _reversal size_ |
 *
 * @alias WebComponents.AggregationDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class AggregationDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, AggregationDialog);
		this.constructor = AggregationDialog;
	}

	/**
	 * Opens the aggregation dialog.
	 *
	 * @param {object} params
	 * @param {CIQ.UI.Context} [params.context] A context to set. See
	 * 		[setContext]{@link CIQ.UI.DialogContentTag#setContext}.
	 * @param {string} params.aggregationType Aggregation Type, e.g., "kagi", "renko", etc.
	 *
	 * @tsmember WebComponents.AggregationDialog
	 */
	open(params) {
		this.addDefaultMarkup();
		super.open(params);
		this.dialog = this.closest("cq-dialog");
		const { stx } = this.context;
		const { aggregationType } = params;
		const map = {
			kagi: {
				title: "Set Reversal Percentage"
			},
			renko: {
				title: "Set Brick Size"
			},
			linebreak: {
				title: "Set Price Lines"
			},
			rangebars: {
				title: "Set Range"
			},
			pandf: {
				title: "Set Point & Figure Parameters"
			}
		};
		if (stx.layout.aggregationType != aggregationType)
			stx.setAggregationType(aggregationType);

		let entry = map[aggregationType];
		this.dialog.setTitle(stx.translateIf(entry.title));

		for (let type in map) {
			const elem = this.querySelector(".ciq" + type);
			elem.style.display = aggregationType === type ? "" : "none";
		}
		[...this.querySelectorAll(".ciq" + aggregationType + " input")].forEach(
			(elem) => {
				const { name } = elem;
				const chainName =
					name == "box" || name == "reversal" ? "pandf." + name : name;
				const tuple = CIQ.deriveFromObjectChain(stx.layout, chainName);
				if (
					tuple &&
					(tuple.obj[tuple.member] || tuple.obj[tuple.member] === 0)
				) {
					elem.value = tuple.obj[tuple.member];
				} else if (stx.chart.defaultChartStyleConfig[elem.name]) {
					elem.value = stx.chart.defaultChartStyleConfig[elem.name];
				}
			}
		);
	}

	/**
	 * Called after an stxtap event is fired.
	 * Emits the event for the action performed.
	 *
	 * @param {object} params New values of the inputs
	 * @param {string} [params.aggregationType] Aggregation type
	 * @param {string} [params.box] Box size
	 * @param {string} [params.reversal] Reversal size
	 *
	 * @tsmember WebComponents.AggregationDialog
	 */
	postProcess(params) {
		this.emitCustomEvent({
			effect: "change",
			action: "input",
			detail: params
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.AggregationDialog
 */
AggregationDialog.markup = `
	<div style="text-align:center;margin-top:10px;">
	<div class="ciqkagi">
		<label>
			<em>Enter value and hit "Enter"</em>
			<br>
			<input name="kagi" stxtap="Layout.setAggregationEdit('kagi')">
		</label>
	</div>
	<div class="ciqrenko">
		<label>
			<em>Enter value and hit "Enter"</em>
			<br>
			<input name="renko" stxtap="Layout.setAggregationEdit('renko')">
		</label>
	</div>
	<div class="ciqlinebreak">
		<label>
			<em>Enter value and hit "Enter"</em>
			<br>
			<input name="priceLines" stxtap="Layout.setAggregationEdit('priceLines')">
		</label>
	</div>
	<div class="ciqrangebars">
		<label>
			<em>Enter value and hit "Enter"</em>
			<br>
			<input name="range" stxtap="Layout.setAggregationEdit('rangebars')">
		</label>
	</div>
	<div class="ciqpandf">
		<label>
			<em>Enter box size and hit "Enter"</em>
			<br>
			<input name="box" stxtap="Layout.setAggregationEdit('pandf.box')">
		</label>
		<br>
		<label>
			<em>Enter reversal and hit "Enter"</em>
			<br>
			<input name="reversal" stxtap="Layout.setAggregationEdit('pandf.reversal')">
		</label>
	</div>
		<p>or</p>
		<div class="ciq-btn" stxtap="Layout.setAggregationEdit('auto')">Auto Select</div>
	</div>
	`;
CIQ.UI.addComponentDefinition("cq-aggregation-dialog", AggregationDialog);
