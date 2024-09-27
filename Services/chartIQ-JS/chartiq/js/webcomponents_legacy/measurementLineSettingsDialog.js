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


import { CIQ as _CIQ } from "../componentUI.js";
import "../../js/webcomponents_legacy/dialog.js";
import "../../js/webcomponents/scroll.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Measurement Line drawing settings dialog web component `<cq-measurementline-settings-dialog>`.
 *
 * @namespace WebComponents.cq-measurementline-settings-dialog
 * @example
 * 	<h4 class="title">Measurement Line Settings</h4>
	<cq-scroll cq-no-maximize>
		<div class="ciq-drawing-dialog-setting" fieldname="hoverdisplay">
			<div class="ciq-heading">Display Info on Hover</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>

		<div class="ciq-drawing-dialog-setting" fieldname="bars">
			<div class="ciq-heading"># Bars</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="delta">
			<div class="ciq-heading">Delta (% Delta)</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="annpercent">
			<div class="ciq-heading">Annualized %</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="totreturn">
			<div class="ciq-heading">Total Return</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="volume">
			<div class="ciq-heading">Volume</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="studies">
			<div class="ciq-heading">Studies</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
	</cq-scroll>
	<div class="ciq-dialog-cntrls">
		<div class="ciq-btn" stxtap="close()">Done</div>
	</div>
 * @since 8.9.0
 */
class MeasurementLineSettingsDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, MeasurementLineSettingsDialog);
		this.constructor = MeasurementLineSettingsDialog;
	}

	/**
	 * Ensures that when the dialog is opened the input field is populated with the correct value.
	 * Also installs a listener to report changes to the value so the drawing can get updated.
	 *
	 * @memberOf WebComponents.cq-measurementline-settings-dialog
	 * @param {Object} params parameters
	 * @param {HTMLElement} params.caller The HTML element that triggered this dialog to open
	 * @since 8.9.0
	 */
	open(params) {
		this.addDefaultMarkup();
		super.open(params);

		if (params) this.opener = params.caller;
		const { currentVectorParameters: vectorParams } = this.context.stx;
		const settings = vectorParams.measurementline || {};
		const inputFieldHover = this.querySelector(
			'div[fieldname="hoverdisplay"] input'
		);
		inputFieldHover.checked = settings.calloutOnHover;
		if (inputFieldHover.changeHandler)
			inputFieldHover.removeEventListener(
				"change",
				inputFieldHover.changeHandler
			);

		inputFieldHover.changeHandler = ({ target }) => {
			const checkedState = target.checked;

			settings.calloutOnHover = checkedState;
			const event = new Event("change", {
				bubbles: true,
				cancelable: true
			});
			this.opener.dispatchEvent(event);
		};

		inputFieldHover.addEventListener("change", inputFieldHover.changeHandler);

		Object.keys(settings.displayGroups).forEach((groupName) => {
			const inputField = this.querySelector(
				`div[fieldname="${groupName}"] input`
			);
			if (!inputField) return;
			inputField.checked = settings.displayGroups[groupName];
			inputField.groupName = groupName;
			if (inputField.changeHandler)
				inputField.removeEventListener("change", inputField.changeHandler);

			inputField.changeHandler = ({ target }) => {
				const { checked, groupName } = target;

				settings.displayGroups[groupName] = checked;
				const event = new Event("change", {
					bubbles: true,
					cancelable: true
				});
				this.opener.dispatchEvent(event);
			};

			inputField.addEventListener("change", inputField.changeHandler);
		});
	}
}

MeasurementLineSettingsDialog.markup = `
	<h4 class="title">Measurement Line Settings</h4>
	<cq-scroll cq-no-maximize>
		<div class="ciq-drawing-dialog-setting" fieldname="hoverdisplay">
			<div class="ciq-heading">Display Info on Hover</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>

		<div class="ciq-drawing-dialog-setting" fieldname="bars">
			<div class="ciq-heading"># Bars</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="delta">
			<div class="ciq-heading">Delta (% Delta)</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="annpercent">
			<div class="ciq-heading">Annualized %</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<!--<div class="ciq-drawing-dialog-setting" fieldname="totreturn">
			<div class="ciq-heading">Total Return</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>-->
		<div class="ciq-drawing-dialog-setting" fieldname="volume">
			<div class="ciq-heading">Volume</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="studies">
			<div class="ciq-heading">Studies</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
	</cq-scroll>
	<div class="ciq-dialog-cntrls">
		<div class="ciq-btn" stxtap="close()">Done</div>
	</div>
`;

CIQ.UI.addComponentDefinition(
	"cq-measurementline-settings-dialog",
	MeasurementLineSettingsDialog
);
