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
import "../../js/standard/i18n.js";
import "../../js/webcomponents_legacy/dialog.js";
import "../../js/webcomponents_legacy/close.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */




var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.I18N) {
	console.error(
		"languageDialog component requires first activating i18n feature."
	);
} else {
	/**
	 * Language dialog web component `<cq-language-dialog>`. This creates a dialog that the user can use to change the language.
	 *
	 * The actual language choices are obtained from {@link CIQ.I18N.languages}. Choosing a different language causes the entire
	 * UI to be translated through use of the {@link CIQ.I18N.setLanguage} method.
	 *
	 * @namespace WebComponents.cq-language-dialog
	 * @since
	 * - 4.0.0 New component added added.
	 * - 4.1.0 Now it calls {@link CIQ.I18N.localize} instead of {@link CIQ.I18N.setLocale}.
	 *
	 * @example
	 * <cq-dialog>
	 *    <cq-language-dialog>
	 *    </cq-language-dialog>
	 * </cq-dialog>
	 */
	class LanguageDialog extends CIQ.UI.DialogContentTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, LanguageDialog);
			this.constructor = LanguageDialog;
		}

		/**
		 * Closes dialog box.
		 *
		 * @alias close
		 * @memberof WebComponents.cq-language-dialog
		 * @since 4.0.0
		 */
		close() {
			const langDialog = this.ownerDocument.querySelector("cq-language-dialog");
			if (langDialog) langDialog.closest("cq-dialog,cq-menu").close();
		}

		/**
		 * Opens the nearest {@link WebComponents.cq-dialog} to display your dialog.
		 *
		 * @param {Object} [params] Contains the chart context.
		 * @param {CIQ.UI.Context} [params.context] A context to set for the dialog. See
		 * 		{@link CIQ.UI.DialogContentTag#setContext}.
		 *
		 * @alias open
		 * @memberof WebComponents.cq-language-dialog
		 * @since 4.0.0
		 */
		open(params) {
			this.addDefaultMarkup();
			super.open(params);

			const cqLanguages = this.node.find("cq-languages");
			cqLanguages.children(":not(template)").remove();
			const template = this.node.find("template");
			const { languages } = CIQ.I18N;
			if (!languages) return;
			const self = this;

			function switchToLanguage(langCode) {
				return function () {
					CIQ.UI.contextsForEach(function () {
						const { stx } = this;
						CIQ.I18N.localize(stx, langCode);
						stx.preferences.language = langCode;
						stx.changeOccurred("preferences");
						stx.draw();
					}, self);
					CIQ.I18N.translateUI(langCode, self.querySelector(".title"));
				};
			}
			for (let langCode in languages) {
				const node = CIQ.UI.makeFromTemplate(template, cqLanguages);
				node.find("cq-language-name").text(languages[langCode]);
				node.find("cq-flag").attr("cq-lang", langCode);
				CIQ.UI.stxtap(node[0], switchToLanguage(langCode));
			}
			// Set the main dialog as keyboard active to reset the highlight when this panel reloads
			if (this.ownerDocument.body.keystrokeHub) {
				let { tabActiveModals } = this.ownerDocument.body.keystrokeHub;
				if (tabActiveModals[0])
					this.ownerDocument.body.keystrokeHub.setKeyControlElement(
						tabActiveModals[0]
					);
			}
		}
	}

	LanguageDialog.markup = `
		<h4 class="title">Choose language</h4>
		<cq-close></cq-close>
		<cq-languages>
			<template><div keyboard-selectable="true"><cq-flag></cq-flag><cq-language-name></cq-language-name></div></template>
		</cq-languages>
	`;
	CIQ.UI.addComponentDefinition("cq-language-dialog", LanguageDialog);
}
