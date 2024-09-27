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
 * <h4>&lt;cq-redo&gt;</h4>
 *
 * This component will redo an undone drawing.  This works with complementary component [cq-undo]{@link WebComponents.Undo}.
 *
 * @example
 * <cq-undo-section>
 *     <cq-undo class="ciq-btn">Undo</cq-undo>
 *     <cq-redo class="ciq-btn">Redo</cq-redo>
 * </cq-undo-section>

 * @alias WebComponents.Redo
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 */
class Redo extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Redo);
	}

	/**
	 * Finds {@link WebComponents.Undo} and pairs with it to find the last undo and reverse it.
	 * @param {WebComponents.Undo} undo A cq-undo webcomponent
	 * @example
	 * document.querySelector("cq-redo").pairUp(document.querySelector("cq-undo"));
	 *
	 * @tsmember WebComponents.Redo
	 */
	pairUp(undo) {
		this.undo = undo;
		this.undo.redoButton = this;
		CIQ.UI.stxtap(this, () => this.undo.redo());
		this.undo.setButtonStyle();
	}
}

CIQ.UI.addComponentDefinition("cq-redo", Redo);
