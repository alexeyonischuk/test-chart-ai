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
 * Theme Piece web component `<cq-theme-piece>`.
 *
 * Manages themes in for chart layout.
 *
 * @namespace WebComponents.cq-theme-piece
 *
 * @example
 * <cq-section>
 *     <cq-placeholder>Background
 *         <cq-theme-piece cq-piece="bg"><cq-swatch></cq-swatch></cq-theme-piece>
 *     </cq-placeholder>
 *     <cq-placeholder>Grid Lines
 *         <cq-theme-piece cq-piece="gl"><cq-swatch></cq-swatch></cq-theme-piece>
 *     </cq-placeholder>
 *     <cq-placeholder>Date Dividers
 *         <cq-theme-piece cq-piece="dd"><cq-swatch></cq-swatch></cq-theme-piece>
 *     </cq-placeholder>
 *     <cq-placeholder>Axis Text
 *         <cq-theme-piece cq-piece="at"><cq-swatch></cq-swatch></cq-theme-piece>
 *     </cq-placeholder>
 * </cq-section>
 */
class ThemePiece extends CIQ.UI.BaseComponent {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ThemePiece);
	}

	setBoolean(result) {
		CIQ.UI.containerExecute(
			this,
			"setValue",
			this.piece.obj,
			this.piece.field,
			result
		);
	}

	/**
	 * @alias setColor
	 * @memberof WebComponents.cq-theme-piece
	 */
	setColor(color) {
		if (color == "Hollow" || color == "No Border") {
			color = "transparent";
			this.node.find("cq-swatch")[0].setColor("transparent", false);
		}
		CIQ.UI.containerExecute(
			this,
			"setValue",
			this.piece.obj,
			this.piece.field,
			color
		);
	}
}

CIQ.UI.addComponentDefinition("cq-theme-piece", ThemePiece);
