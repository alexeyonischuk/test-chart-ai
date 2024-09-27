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


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Study Context Dialog web component `<cq-study-context>`.
 *
 * @namespace WebComponents.cq-study-context
 * @since  4.1.0 cq-study-context is now required (cq-dialog[cq-study-context] no longer works)
 */
class StudyContext extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, StudyContext);
		this.constructor = StudyContext;
	}

	setContext(context) {
		let markup = this.constructor.markup;
		const hasStudyBrowser =
			!!context.topNode.querySelector(".ciq-sb-container");

		if (!hasStudyBrowser) {
			markup = markup
				.split(/\n/g)
				.filter((line) => !/StudyEdit\.addToFavorites/i.test(line))
				.join("\n");
		}

		this.addDefaultMarkup(this, markup);
		this.classList.add("ciq-context-menu");
		super.setContext(context);
	}
}

StudyContext.markup = `
		<div stxtap="StudyEdit.edit()">Edit Settings...</div>
		<div stxtap="StudyEdit.addToFavorites()">Add to Favorites</div>
		<div stxtap="StudyEdit.remove()">Delete Study</div>
	`;
CIQ.UI.addComponentDefinition("cq-study-context", StudyContext);
