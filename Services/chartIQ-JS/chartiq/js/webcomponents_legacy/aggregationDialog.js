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
import "../../js/webcomponents_legacy/dialog.js";
import "../../js/webcomponents_legacy/close.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */



var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Aggregation Dialog web component `<cq-aggregation-dialog>`.
 *
 * @namespace WebComponents.cq-aggregation-dialog
 */
class AggregationDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, AggregationDialog);
		this.constructor = AggregationDialog;
	}

	/**
	 * Opens the nearest {@link WebComponents.cq-dialog} to display your dialog.
	 * @alias open
	 * @memberof WebComponents.cq-aggregation-dialog
	 */
	open(params) {
		this.addDefaultMarkup();
		super.open(params);
		var stx = this.context.stx;
		var aggregationType = params.aggregationType;
		var map = {
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

		var entry = map[aggregationType];
		var node = this.node;
		node.find(".title").text(stx.translateIf(entry.title));

		for (var type in map) {
			node
				.find(".ciq" + type)
				.css(aggregationType === type ? { display: "" } : { display: "none" });
		}
		node.find(".ciq" + aggregationType + " input").each(function () {
			var name = this.name;
			if (name == "box" || name == "reversal") name = "pandf." + name;
			var tuple = CIQ.deriveFromObjectChain(stx.layout, name);
			if (tuple && (tuple.obj[tuple.member] || tuple.obj[tuple.member] === 0)) {
				this.value = tuple.obj[tuple.member];
			} else if (stx.chart.defaultChartStyleConfig[this.name]) {
				this.value = stx.chart.defaultChartStyleConfig[this.name];
			}
		});
	}
}

AggregationDialog.markup = `
		<h4 class="title"></h4>
		<cq-close></cq-close>
		<div style="text-align:center;margin-top:10px;">
			<div class="ciqkagi">
				<em>Enter value and hit "Enter"</em>
				<p>
					<input name="kagi" stxtap="Layout.setAggregationEdit('kagi')">
				</p>
			</div>
			<div class="ciqrenko">
				<em>Enter value and hit "Enter"</em>
				<p>
					<input name="renko" stxtap="Layout.setAggregationEdit('renko')">
				</p>
			</div>
			<div class="ciqlinebreak">
				<em>Enter value and hit "Enter"</em>
				<p>
					<input name="priceLines" stxtap="Layout.setAggregationEdit('priceLines')">
				</p>
			</div>
			<div class="ciqrangebars">
				<em>Enter value and hit "Enter"</em>
				<p>
					<input name="range" stxtap="Layout.setAggregationEdit('rangebars')">
				</p>
			</div>
			<div class="ciqpandf">
				<i>Enter box size and hit "Enter"</i>
				<p>
					<input name="box" stxtap="Layout.setAggregationEdit('pandf.box')">
				</p>
				<p>
					<i>Enter reversal and hit "Enter"</i>
				</p>
				<p>
					<input name="reversal" stxtap="Layout.setAggregationEdit('pandf.reversal')">
				</p>
			</div>
			<p>or</p>
			<div class="ciq-btn" stxtap="Layout.setAggregationEdit('auto')">Auto Select</div>
		</div>

	`;
CIQ.UI.addComponentDefinition("cq-aggregation-dialog", AggregationDialog);
