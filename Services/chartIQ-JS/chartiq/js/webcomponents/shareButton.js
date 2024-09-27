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
 * <h4>&lt;cq-share-button&gt;</h4>
 *
 * Button that opens a dialog that can be used to share a chart.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute      | description |
 * | :------------- | :---------- |
 * | help-id        | A key to the correct help text in CIQ.Help.Content. |
 * | icon           | Class name for image to use. |
 * | reader         | Accessibility text when focused by a screen reader. |
 * | responsive     | Set this attribute if the text displayed on this component should change to an icon when the viewport's dimensions are reduced. |
 * | text           | Displayed label for this button. |
 * | tooltip        | Text for the tooltip which appears when hovering over the component. |
 *
 * Do not include the `icon` or `text` attributes if you don't want any icon or text, respectively.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when button is pressed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "click" |
 * | action | "click" |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Button with responsive icon:</caption>
 * <cq-share-button class="bottom" text="Share" icon="share" responsive tooltip="Share"></cq-share-button>
 *
 * @alias WebComponents.ShareButton
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.0.0 Added functionality to export layouts to social media services.
 * - 9.1.0 Observes attributes. Added emitter.
 */
class ShareButton extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["help-id", "icon", "reader", "responsive", "text", "tooltip"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		if (this.isShadowComponent && this.children.length) {
			while (this.children.length) {
				this.root.appendChild(this.firstChild);
			}
		}
		this.markup = this.trimInnerHTMLWhitespace();
		this.usingMarkup = !!this.markup.match(/\{\{(.{1,20}?)\}\}/g);

		this.reset();
		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ShareButton);
		this.constructor = ShareButton;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		if (this.usingMarkup) {
			this.reset();
		} else {
			// do nothing when using predefined content
		}
	}

	/**
	 * Formats the default markup, replacing any variables with the actual values provided by the attributes.
	 *
	 * @return {string} The prepared markup
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	getMarkup() {
		let markup = this.markup || this.constructor.markup;
		const names = markup.match(/\{\{(.{1,20}?)\}\}/g);
		if (names)
			names.forEach((name) => {
				const key = name.substring(2, name.length - 2);
				if (key.includes("_class")) return;
				const attr = this[key];
				if (attr == null) {
					if (key === "reader" && this.text)
						markup = markup.replace(name, this.text);
					else if (key === "help-id")
						markup = markup.replace(/\{\{help_class\}\}/g, "hidden");
					else if (key === "icon") markup = markup.replace(name, "hidden");
					else if (key === "text")
						markup = markup.replace("{{label_class}}", "hidden");
					else if (key === "tooltip")
						markup = markup.replace("{{tooltip_class}}", "hidden");
					else markup = markup.replace(name, "");
				} else {
					if (key === "text") markup = markup.replace("{{label_class}}", "");
					else if (key === "tooltip")
						markup = markup.replace("{{tooltip_class}}", "");
					else if (key === "help-id")
						markup = markup.replace(/\{\{help_class\}\}/g, "");
					else if (key === "responsive")
						markup = markup.replace("{{responsive}}", "responsive");
					markup = markup.replace(name, attr);
				}
			});
		return markup;
	}

	/**
	 * Called when an attribute changes, will regenerate the shareButton component,
	 * updating whatever needs to be updated as a result of the attribute change.
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	reset() {
		const { children } = this.root;
		if (!children.length || this.usingMarkup) {
			this.usingMarkup = true;
			if (children.length) {
				[...children].forEach((child) => {
					if (!["LINK", "STYLE"].includes(child.tagName)) child.remove();
				});
			}
			const div = document.createElement("div");
			this.addDefaultMarkup(div, this.getMarkup());
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	setContext(context) {
		this.makeTap(this, (e) => {
			e.stopPropagation();
			this.tap();
		});
		CIQ.Share.onClipboard((shareID) => {
			CIQ.Share.loadChartFromID(this.context.stx, shareID);
		});
		this.reset();
	}

	/**
	 * Opens a customizable dialog that can share a chart.
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	tap() {
		this.uiManager.closeMenu(null, "cq-menu,cq-dialog,cq-color-picker");
		const { context } = this;
		if (context.config) {
			this.channelWrite(
				context.config.channels.dialog,
				{ type: "share", params: { context } },
				context.stx
			);
		} else {
			const shareDialog = this.ownerDocument.querySelector("cq-share-dialog");
			if (shareDialog && shareDialog.open) shareDialog.open({ context });
		}
		this.emitCustomEvent({ effect: "click" });
	}

	/**
	 * Used to extract a shareID from the clipboard content.
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	async getClipboard() {
		const shareID = await CIQ.Share.getClipboard();

		if (shareID) {
			CIQ.Share.loadChartFromID(this.context.stx, shareID);
		} else {
			this.tap();
		}
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * This markup contains placeholder values which the component replaces with values from its attributes.
 * Variables are represented in double curly-braces, for example: `{{text}}`.
 * The following variables are defined:
 * | variable      | source |
 * | :------------ | :----- |
 * | reader        | from attribute value |
 * | icon          | from attribute value |
 * | text          | from attribute value |
 * | help-id       | from attribute value |
 * | responsive    | from attribute value |
 * | tooltip       | from attribute value |
 * | tooltip_class | "hidden" if `tooltip` attribute not specified |
 * | help_class    | "hidden" if `help-id` attribute not specified |
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.ShareButton
 */
ShareButton.markup = `
		<div class="share-clickable {{responsive}}">
			<cq-help class="{{help_class}}" help-id="{{help-id}}"aria-hidden="true"></cq-help>
			<span class="icon {{icon}}">
				<div cq-tooltip class="{{tooltip_class}}" aria-hidden="true">{{tooltip}}</div>
			</span>
			<span class="{{label_class}}" label>{{text}}</span>
		</div>
		<div class="ciq-screen-reader">
			<button type="button" tabindex="-1">{{reader}}</button>
			<em	class="help-instr {{help_class}}">(Help available, press question mark key)</em>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-share-button", ShareButton);
