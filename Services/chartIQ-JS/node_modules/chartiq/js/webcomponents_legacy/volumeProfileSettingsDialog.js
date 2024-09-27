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
import "../../js/webcomponents/scroll.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Volume profile drawing settings dialog web component `<cq-volumeprofile-settings-dialog>`.
 *
 * @namespace WebComponents.cq-volumeprofile-settings-dialog
 * @example
 * <h4 class="title">Volume Profile Settings</h4>
	<cq-scroll cq-no-maximize>
		<div class="ciq-drawing-dialog-setting">
			<div class="ciq-heading">Price Buckets</div>
			<div class="stx-data">
				<input type="number" min="1" step="1">
			</div>
		</div
	</cq-scroll>
	<div class="ciq-dialog-cntrls">
		<div class="ciq-btn" stxtap="close()">Done</div>
	</div>
 * @since 8.4.0
 */
class VolumeProfileSettingsDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, VolumeProfileSettingsDialog);
		this.constructor = VolumeProfileSettingsDialog;
	}

	/**
	 * Ensures that when the dialog is opened the input field is populated with the correct value.
	 * Also installs a listener to report changes to the value so the drawing can get updated.
	 *
	 * @memberOf WebComponents.cq-volumeprofile-settings-dialog
	 * @param {Object} params parameters
	 * @param {HTMLElement} params.caller The HTML element that triggered this dialog to open
	 * @since 8.4.0
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
		};

		inputField.addEventListener("change", inputField.changeHandler);
	}
}

VolumeProfileSettingsDialog.markup = `
	<h4 class="title">Volume Profile Settings</h4>
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
	VolumeProfileSettingsDialog
);
