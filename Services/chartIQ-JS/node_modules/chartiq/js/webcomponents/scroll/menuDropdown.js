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


import { CIQ as _CIQ } from "../../../js/componentUI.js";
import "../../../js/webcomponents/scroll.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

const Scroll = CIQ.UI._webcomponents.list["cq-scroll"];
if (!Scroll) {
	console.error(
		"menuDropdown component requires first activating scroll component."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-menu-dropdown&gt;</h4>
	 *
	 * Menu DropDown handles holding the items that go inside a custom menu component.
	 *
	 * Menu DropDown is a semantic element to be used in menus that has the same functionality as {@link WebComponents.Scroll} The main difference is that Menu DropDown sets noMaximize to true which means that the component will not automatically resize.
	 *
	 * The preferred way of creating menus is to use the [<cq-dropdown>]{@link WebComponents.Dropdown} component.  This component is supported for legacy purposes only.
	 *
	 * @example
	 *	 <cq-menu class="ciq-menu ciq-studies collapse">
	 *		 <span>Studies</span>
	 *		 <cq-menu-dropdown cq-no-scroll>
	 *			 <cq-study-legend cq-no-close>
	 *				 <cq-section-dynamic>
	 *					 <cq-heading>Current Studies</cq-heading>
	 *					 <cq-study-legend-content>
	 *						 <template>
	 *							 <cq-item>
	 *								 <cq-label class="click-to-edit"></cq-label>
	 *								 <div class="ciq-icon ciq-close"></div>
	 *							 </cq-item>
	 *						 </template>
	 *					 </cq-study-legend-content>
	 *					 <cq-placeholder>
	 *						 <div stxtap="Layout.clearStudies()" class="ciq-btn sm">Clear All</div>
	 *					 </cq-placeholder>
	 *				 </cq-section-dynamic>
	 *			 </cq-study-legend>
	 *			 <cq-scroll>
	 *				 <cq-studies>
	 *				 	 <cq-studies-content>
	 *						<template>
	 *							<cq-item>
	 *								<cq-label></cq-label>
	 *							</cq-item>
	 *						</template>
	 *					 </cq-studies-content>
	 *				 </cq-studies>
	 *			 </cq-scroll>
	 *		 </cq-menu-dropdown>
	 *	</cq-menu>
	 * @alias WebComponents.MenuDropDown
	 * @extends WebComponents.Scroll
	 * @class
	 * @protected
	 * @since 7.0.0 no longer dual inherits CIQ.UI.BaseComponent and CIQ.UI.Scroll. Now directly inherits Scroll which extends BaseComponent.
	 */
	class MenuDropDown extends Scroll.classDefinition {
		constructor() {
			super();
			this.noMaximize = true;
		}

		connectedCallback() {
			super.connectedCallback();
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, MenuDropDown);
		}

		disablekeyboardNavigation() {
			if (this.keyboardNavigation) {
				this.keyboardNavigation.setKeyControlElement();
			}
		}
	}

	CIQ.UI.addComponentDefinition("cq-menu-dropdown", MenuDropDown);
}
