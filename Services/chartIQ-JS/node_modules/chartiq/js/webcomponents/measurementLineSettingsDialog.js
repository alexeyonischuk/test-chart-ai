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
import "./dialog.js";
import "./scroll.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-measurementline-settings-dialog&gt;</h4>
 *
 * Additional dialog for setting measurement line settings, specifically what is to appear in the callout for the measurement line drawing tool.
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
 * @alias WebComponents.MeasurementlineSettingsDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 8.9.0
 * - 9.1.0 Added emitter.
 */
class MeasurementlineSettingsDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, MeasurementlineSettingsDialog);
		this.constructor = MeasurementlineSettingsDialog;
	}

	/**
	 * Ensures that when the dialog is opened the input field is populated with the correct value.
	 * Also installs a listener to report changes to the value so the drawing can get updated.
	 *
	 * @param {Object} params parameters
	 * @param {HTMLElement} params.caller The HTML element that triggered this dialog to open
	 * @since 8.9.0
	 *
	 * @tsmember WebComponents.MeasurementlineSettingsDialog
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
			this.emitCustomEvent({
				effect: "select",
				detail: {
					field: "hoverdisplay",
					value: checkedState
				}
			});
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
				this.emitCustomEvent({
					effect: "select",
					detail: {
						field: groupName,
						value: checked
					}
				});
			};

			inputField.addEventListener("change", inputField.changeHandler);
		});
	}
}

/**
 * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.MeasurementlineSettingsDialog
 */
MeasurementlineSettingsDialog.markup = `
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
	MeasurementlineSettingsDialog
);
