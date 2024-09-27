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

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * The menu container web component `<cq-menu-container>`.
 *
 * Generates a menu based on the value of the `cq-name` attribute.
 *
 * @namespace WebComponents.cq-menu-container
 * @since 7.5.0
 *
 * @example
 * <cq-menu class="ciq-menu ciq-period">
 *     <span><cq-clickable stxbind="Layout.periodicity">1D</cq-clickable></span>
 *     <cq-menu-dropdown>
 *         <cq-menu-container cq-name="menuPeriodicity"></cq-menu-container>
 *     </cq-menu-dropdown>
 * </cq-menu>
 */
class MenuContainer extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, MenuContainer);
	}

	/**
	 * Obtains the name of the menu and the items contained in the menu. Adds the default
	 * markup.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @alias setContext
	 * @memberof WebComponents.cq-menu-container
	 * @since 7.5.0
	 */
	setContext(context) {
		const setName = this.getAttribute("cq-name");
		if (setName && context.config) {
			// get menu items as array
			const menuItems = context.config.getMenu(setName);
			this.addDefaultMarkup(this, menuItems && menuItems.join(""));
			if (!this.innerHTML) {
				// hide container and heading if there is no content
				const container = CIQ.UI.BaseComponent.selfOrParentElement(
					this,
					"cq-menu-dropdown-section"
				);
				if (container) container.style.display = "none";
			}
			return;
		}
	}
}

CIQ.UI.addComponentDefinition("cq-menu-container", MenuContainer);
