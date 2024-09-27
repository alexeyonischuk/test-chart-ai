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
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-marker&gt;</h4>
 *
 * This is an implementation of the ContextTag that gets positioned as a marker.
 * This is similar the `cq-marker` attribute found on some webcomponents, except sometimes there
 * is a need to identify a certain group of DOM nodes as a marker.
 * For this reason, this component wraps around the DOM nodes in order that it be converted into a marker.
 *
 * @example <caption>Full-screen navigation menu as marker</caption>
 * 	<cq-marker class="chart-control-group full-screen-show">
 *		<cq-toggle class="ciq-lookup-icon" config ="symbolsearch" reader="Symbol Search" tooltip="Symbol Search" icon="search" help-id="search_symbol_lookup"></cq-toggle>
 *		<cq-toggle class="ciq-comparison-icon" config ="symbolsearch" reader="Add Comparison" tooltip="Add Comparison" icon="compare" help-id="add_comparison" comparison="true"></cq-toggle>
 *		<cq-toggle class="ciq-draw" member="drawing" reader="Draw" icon="draw" tooltip="Draw" help-id="drawing_tools_toggle"></cq-toggle>
 *		<cq-toggle class="ciq-CH" config="crosshair" reader="Crosshair" icon="crosshair" tooltip="Crosshair (Alt + \)"></cq-toggle>
 *		<cq-toggle class="ciq-DT" feature="tableview" member="tableView" reader="Table View" icon="tableview" tooltip="Table View"></cq-toggle>
 *		<cq-menu class="nav-dropdown ciq-period" config="period" text binding="Layout.periodicity"></cq-menu>
 *	</cq-marker>
 *
 * @alias WebComponents.Marker
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 9.1.0
 */
class Marker extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Marker);
	}
}

CIQ.UI.addComponentDefinition("cq-marker", Marker);
