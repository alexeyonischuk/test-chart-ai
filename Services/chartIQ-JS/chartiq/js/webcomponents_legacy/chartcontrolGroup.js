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
import "../../js/webcomponents_legacy/clickable.js";
import "../../js/webcomponents_legacy/lookup.js";
import "../../js/webcomponents_legacy/menu.js";
import "../../js/webcomponents_legacy/menuContainer.js";
import "../../js/webcomponents_legacy/toggle.js";
import "../../js/webcomponents/scroll/menuDropdown.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */







var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Creates a `<cq-chartcontrol-group>` web component. The chart control group is a wrapper element for
 * chart UI controls, enabling the controls to be placed on top of the chart.
 *
 * **Note:** The `cq-marker` attribute must be added to the element to place it within the chart area.
 * The element will sit above the chart bars.
 *
 * @namespace WebComponents.cq-chartcontrol-group
 * @example
	<cq-chartcontrol-group cq-marker>
		<cq-menu class="ciq-search">
			<cq-lookup cq-keystroke-claim cq-uppercase>
				<cq-lookup-input cq-no-close>
					<input type="text" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" name="symbol" placeholder="">
					<cq-lookup-icon></cq-lookup-icon>
				</cq-lookup-input>
				<cq-lookup-results>
					<cq-lookup-filters cq-no-close>
						<cq-filter class="true">ALL</cq-filter>
						<cq-filter>STOCKS</cq-filter>
						<cq-filter>FX</cq-filter>
						<cq-filter>INDEXES</cq-filter>
						<cq-filter>FUNDS</cq-filter>
						<cq-filter>FUTURES</cq-filter>
					</cq-lookup-filters>
					<cq-scroll></cq-scroll>
				</cq-lookup-results>
			</cq-lookup>
		</cq-menu>
		<cq-toggle class="ciq-draw"><span></span><cq-tooltip>Draw</cq-tooltip></cq-toggle>
		<cq-toggle class="ciq-CH" cq-member="crosshair"><span></span><cq-tooltip>Crosshair</cq-tooltip></cq-toggle>
		<cq-menu class="ciq-menu ciq-period">
			<span><cq-clickable stxbind="Layout.periodicity">1D</cq-clickable></span>
			<cq-menu-dropdown>
				<cq-item stxtap="Layout.setPeriodicity(1,1,'day')">1 D</cq-item>
				<cq-item stxtap="Layout.setPeriodicity(1,1,'week')">1 W</cq-item>
				<cq-item stxtap="Layout.setPeriodicity(1,1,'month')">1 Mo</cq-item>
				<cq-separator></cq-separator>
				<cq-item stxtap="Layout.setPeriodicity(1,1,'minute')">1 Min</cq-item>
				<cq-item stxtap="Layout.setPeriodicity(1,5,'minute')">5 Min</cq-item>
				<cq-item stxtap="Layout.setPeriodicity(1,10,'minute')">10 Min</cq-item>
				<cq-item stxtap="Layout.setPeriodicity(3,5,'minute')">15 Min</cq-item>
				<cq-item stxtap="Layout.setPeriodicity(1,30,'minute')">30 Min</cq-item>
				<cq-item stxtap="Layout.setPeriodicity(2,30,'minute')">1 Hour</cq-item>
				<cq-item stxtap="Layout.setPeriodicity(8,30,'minute')">4 Hour</cq-item>
				<cq-separator></cq-separator>
				<cq-item stxtap="Layout.setPeriodicity(1,1,'second')">1 Sec</cq-item>
				<cq-item stxtap="Layout.setPeriodicity(1,10,'second')">10 Sec</cq-item>
				<cq-item stxtap="Layout.setPeriodicity(1,30,'second')">30 Sec</cq-item>
				<cq-separator></cq-separator>
				<cq-item stxtap="Layout.setPeriodicity(1,250,'millisecond')">250 MSec</cq-item>
			</cq-menu-dropdown>
		</cq-menu>
	</cq-chartcontrol-group>
 *
 * @since 7.3.0
 */
class ChartcontrolGroup extends CIQ.UI.ModalTag {
	connectedCallback() {
		if (this.attached) return;
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ChartcontrolGroup);
		this.constructor = ChartcontrolGroup;
	}

	setContext(context) {
		this.addDefaultMarkup();
		var node = this.node;

		// Prevent interaction events from propagating through the panel to the chart
		node[0].addEventListener(
			"touchstart",
			function (event) {
				event.stopPropagation();
			},
			{ passive: false }
		);
		node[0].addEventListener("mousedown", function (event) {
			event.stopPropagation();
		});

		// Set focus on the input field when tapped to invoke
		// on-screen keyboard.
		var input = node.find("input");
		CIQ.UI.stxtap(input[0], function () {
			this.focus();
		});
	}
}

ChartcontrolGroup.markup = `
		<cq-clickable role="button" class="symbol-search" cq-selector="cq-lookup-dialog" cq-method="open">
			<cq-help help-id="search_symbol_lookup"></cq-help>
			<span class="ciq-lookup-icon"></span>
			<cq-tooltip>Symbol Search</cq-tooltip>
		</cq-clickable>
		<cq-clickable role="button" class="symbol-search" cq-selector="cq-lookup-dialog" cq-method="open" comparison="true">
			<cq-help help-id="add_comparison"></cq-help>
			<span class="ciq-comparison-icon"></span>
			<cq-tooltip>Add Comparison</cq-tooltip>
		</cq-clickable>
		<cq-toggle class="ciq-draw" member="drawing" reader="Draw"tooltip="Draw" help-id="drawing_tools_toggle"></cq-toggle>
		<cq-toggle class="ciq-CH" member="crosshair" reader="Crosshair" tooltip="Crosshair (Alt + \\)"></cq-toggle>
		<cq-toggle class="ciq-DT" feature="tableview" member="tableView" reader="Table View" tooltip="Table View"></cq-toggle>
		<cq-menu class="ciq-menu ciq-period">
			<span><cq-clickable stxbind="Layout.periodicity">1D</cq-clickable></span>
			<cq-menu-dropdown>
				<cq-menu-container cq-name="menuPeriodicity"></cq-menu-container>
			</cq-menu-dropdown>
		</cq-menu>
	`;
CIQ.UI.addComponentDefinition("cq-chartcontrol-group", ChartcontrolGroup);
