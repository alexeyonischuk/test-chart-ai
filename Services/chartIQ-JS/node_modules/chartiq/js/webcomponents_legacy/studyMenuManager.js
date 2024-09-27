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
import "../../js/webcomponents_legacy/menu.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * StudyMenuManager web component `<cq-study-menu-manager>`.
 *
 * Creates either a default **Studies** menu or a study browser component.
 *
 * @namespace WebComponents.cq-study-menu-manager
 *
 * @since 8.8.0
 */
class StudyMenuManager extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, StudyMenuManager);
		this.constructor = StudyMenuManager;
	}

	setContext() {
		if (!CIQ.Studies.Favorites) {
			this.addDefaultMarkup();
		} else {
			this.addDefaultMarkup(this, this.constructor.studyBrowserMarkup);
			this.closest("cq-menu").classList.add("ciq-study-browser");
		}
	}
}

StudyMenuManager.markup = `
	<cq-study-legend cq-no-close>
		<cq-section-dynamic>
			<cq-heading>Current Studies</cq-heading>
			<cq-study-legend-content>
				<template cq-study-legend>
					<cq-item>
						<cq-label class="click-to-edit"></cq-label>
						<div class="ciq-icon ciq-close"></div>
					</cq-item>
				</template>
			</cq-study-legend-content>
			<cq-placeholder>
				<div stxtap="Layout.clearStudies()" class="ciq-btn sm" keyboard-selectable="true">Clear All</div>
			</cq-placeholder>
		</cq-section-dynamic>
	</cq-study-legend>
	<div class="scriptiq-ui">
		<cq-heading>ScriptIQ</cq-heading>
			<cq-item><cq-clickable cq-selector="cq-scriptiq-editor" cq-method="open">New Script</cq-clickable></cq-item>
			<cq-scriptiq-menu></cq-scriptiq-menu>
		<cq-separator></cq-separator>
	</div>
	<cq-heading cq-filter cq-filter-min="15">Studies</cq-heading>
	<cq-studies></cq-studies>
	`;

StudyMenuManager.studyBrowserMarkup = `
	<cq-study-browser></cq-study-browser>
`;
CIQ.UI.addComponentDefinition("cq-study-menu-manager", StudyMenuManager);
