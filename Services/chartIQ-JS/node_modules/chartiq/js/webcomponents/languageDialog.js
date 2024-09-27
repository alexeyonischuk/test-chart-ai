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
import "../../js/webcomponents/dialog.js";
import "../../js/webcomponents/close.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */




const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.I18N) {
	console.error(
		"languageDialog component requires first activating i18n feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-language-dialog&gt;</h4>
	 *
	 * Creates a dialog that the user can use to change the language.
	 *
	 * The actual language choices are obtained from {@link CIQ.I18N.languages}. Choosing a different language causes the entire
	 * UI to be translated through use of the {@link CIQ.I18N.setLanguage} method.
	 *
	 * The `setHtmlLang` configuration property is used to control whether this component should change the page's default language,
	 * To disable this functionality, set this attribute to false.  This can be done as illustrated in the example below,
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when a language is selected.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "change" |
	 * | action | "click" |
	 * | language | _language code_ |
	 *
	 * @example
	 * <cq-dialog>
	 *    <cq-language-dialog>
	 *    </cq-language-dialog>
	 * </cq-dialog>
	 *
	 * @example <caption>Adjust context config to not set &lt;html&gt; `lang` attribute</caption>
	 * stxx.uiContext.config.setHtmlLang = false;
	 *
	 * @alias WebComponents.LanguageDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 * - 4.0.0 New component added.
	 * - 4.1.0 Now it calls {@link CIQ.I18N.localize} instead of {@link CIQ.I18N.setLocale}.
	 * - 9.1.0 Added emitter.
	 * - 9.2.0 Added `cq-set-htmllang` attribute.
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
		 * @tsmember WebComponents.LanguageDialog
		 * @since 4.0.0
		 */
		close() {
			const langDialog = this.ownerDocument.querySelector("cq-language-dialog");
			if (langDialog) langDialog.closest("cq-dialog,cq-menu").close();
		}

		/**
		 * Opens the language dialog.
		 *
		 * @param {Object} [params] Contains the chart context.
		 * @param {CIQ.UI.Context} [params.context] A context to set for the dialog. See
		 * 		{@link CIQ.UI.DialogContentTag#setContext}.
		 *
		 * @tsmember WebComponents.LanguageDialog
		 * @since 4.0.0
		 */
		open(params) {
			this.addDefaultMarkup();
			super.open(params);

			const cqLanguages = this.querySelector("cq-languages");
			[...cqLanguages.children].forEach((child) => {
				if (!child.matches("template")) child.remove();
			});
			const template = this.querySelector("template");
			const { languages } = CIQ.I18N;
			if (!languages) return;

			const switchToLanguage = (language) => {
				return () => {
					CIQ.UI.contextsForEach(function () {
						const { stx } = this;
						CIQ.I18N.localize(stx, language);
						if (this.config.setHtmlLang)
							document.documentElement.setAttribute("lang", language);
						stx.preferences.language = language;
						stx.changeOccurred("preferences");
						stx.draw();
					}, this);
					CIQ.I18N.translateUI(language, this.dialog);
					this.emitCustomEvent({
						effect: "change",
						detail: { language }
					});
				};
			};
			for (let langCode in languages) {
				const node = CIQ.UI.makeFromTemplate(template, cqLanguages)[0];
				node.querySelector("cq-language-name").innerText = languages[langCode];
				node.querySelector("cq-flag").setAttribute("cq-lang", langCode);
				CIQ.UI.stxtap(node, switchToLanguage(langCode));
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

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.LanguageDialog
	 */
	LanguageDialog.markup = `
		<cq-languages role="listbox">
			<template><div keyboard-selectable="true" role="option"><cq-flag></cq-flag><cq-language-name></cq-language-name></div></template>
		</cq-languages>
	`;
	CIQ.UI.addComponentDefinition("cq-language-dialog", LanguageDialog);
}
