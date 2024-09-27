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
import "../../js/webcomponents/dialog.js";
import "../../js/webcomponents/scroll.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-volumeprofile-settings-dialog&gt;</h4>
 *
 * Additional dialog for setting volume profile settings, specifically what is to appear in the callout for the volume profile drawing tool.
 *
 * A custom event will be emitted from the component when any of its fields are changed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select" |
 * | action | "click" |
 * | field | _name of field toggled_ |
 * | value | _true or false_ |
 *
 * @alias WebComponents.VolumeprofileSettingsDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 8.4.0
 * - 9.1.0 Added emitter.
 */
class VolumeprofileSettingsDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, VolumeprofileSettingsDialog);
		this.constructor = VolumeprofileSettingsDialog;
	}

	/**
	 * Ensures that when the dialog is opened the input field is populated with the correct value.
	 * Also installs a listener to report changes to the value so the drawing can get updated.
	 *
	 * @param {Object} params parameters
	 * @param {HTMLElement} params.caller The HTML element that triggered this dialog to open
	 * @since 8.4.0
	 *
	 * @tsmember WebComponents.VolumeprofileSettingsDialog
	 */
	open(params) {
		this.addDefaultMarkup();
		super.open(params);

		if (params) this.opener = params.caller;
		const { currentVectorParameters: vectorParams } = this.context.stx;
		if (!vectorParams.volumeprofile) vectorParams.volumeprofile = {};
		const settings = vectorParams.volumeProfile;
		const inputField = this.querySelector(
			'div[fieldname="Price Buckets"] input'
		);
		inputField.value = settings.priceBuckets;
		if (inputField.changeHandler)
			inputField.removeEventListener("change", inputField.changeHandler);

		inputField.changeHandler = ({ target }) => {
			const intVal = parseInt(target.value);
			if (isNaN(intVal)) return;

			settings.priceBuckets = intVal;
			const event = new Event("change", {
				bubbles: true,
				cancelable: true
			});
			this.opener.dispatchEvent(event);
			this.emitCustomEvent({
				effect: "change",
				detail: {
					field: "priceBuckets",
					value: intVal
				}
			});
		};

		inputField.addEventListener("change", inputField.changeHandler);
	}
}

/**
 * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.VolumeprofileSettingsDialog
 */
VolumeprofileSettingsDialog.markup = `
	<cq-scroll cq-no-maximize>
		<div class="ciq-drawing-dialog-setting" fieldname="Price Buckets">
			<div class="ciq-heading">Price Buckets</div>
			<div class="stx-data">
				<input type="number" min="1" step="1">
			</div>
		</div
	</cq-scroll>
	<div class="ciq-dialog-cntrls">
		<div class="ciq-btn" stxtap="close()">Done</div>
	</div>
`;
CIQ.UI.addComponentDefinition(
	"cq-volumeprofile-settings-dialog",
	VolumeprofileSettingsDialog
);
