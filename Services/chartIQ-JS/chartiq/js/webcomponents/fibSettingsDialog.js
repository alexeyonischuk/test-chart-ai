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
 * <h4>&lt;cq-fib-settings-dialog&gt;</h4>
 *
 * Additional dialog for setting fibonacci tool settings, specifically what levels will be shown for the fibonacci drawings.
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
 * | type | _fibonacci drawing type_ |
 * | levels | _comma-delimited list of displayed levels_ |
 *
 * @alias WebComponents.FibSettingsDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 3.0.9
 * - 9.1.0 Added emitter.
 */
class FibSettingsDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, FibSettingsDialog);
		this.constructor = FibSettingsDialog;
	}

	/**
	 * Adds a custom fib level
	 *
	 * @tsmember WebComponents.FibSettingsDialog
	 * @since 5.2.0
	 */
	add() {
		let level = this.querySelector("[cq-custom-fibonacci-setting] input").value;
		if (!level) return;
		level = parseFloat(level) / 100;
		if (isNaN(level)) return;
		const defaultFibs =
			this.context.stx.currentVectorParameters.fibonacci.fibs || [];
		let fib, newFib;
		for (let index = 0; index < defaultFibs.length; index++) {
			fib = defaultFibs[index];
			if (fib.level > level) {
				newFib = CIQ.clone(fib);
				newFib.level = level;
				newFib.display = true;
				if (newFib.parameters) newFib.parameters.opacity = 0.25;
				defaultFibs.splice(index, 0, newFib);
				break;
			}
		}
		if (!newFib) {
			if (defaultFibs.length) fib = CIQ.clone(defaultFibs[0]);
			else
				fib = {
					color: "auto",
					parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
				};
			newFib = CIQ.clone(fib);
			newFib.level = level;
			newFib.display = true;
			defaultFibs.push(newFib);
		}
		this.open();
	}

	/**
	 * Fires a "change" event and closes the dialog.
	 *
	 * @tsmember WebComponents.FibSettingsDialog
	 * @since 6.2.0
	 */
	close() {
		if (this.opener) {
			const event = new Event("change", {
				bubbles: true,
				cancelable: true
			});

			this.opener.dispatchEvent(event);
			const { currentVectorParameters } = this.context.stx;
			const { fibonacci, vectorType } = currentVectorParameters;
			fibonacci.fibsAlreadySet = true;
			this.emitCustomEvent({
				effect: "save",
				detail: {
					type: vectorType,
					levels: fibonacci.fibs
						.filter(
							(i) => i.display && (i.level >= 0 || vectorType != "fibarc")
						)
						.map((i) => i.level)
						.join()
				}
			});
		}

		super.close();
	}

	/**
	 * Opens the dialog.
	 *
	 * @param  {Object} params Parameters
	 * @param {HTMLElement} params.caller The HTML element that triggered this dialog to open
	 *
	 * @tsmember WebComponents.FibSettingsDialog
	 */
	open(params) {
		this.addDefaultMarkup();
		super.open(params);
		if (params) this.opener = params.caller;
		const vectorParameters = this.context.stx.currentVectorParameters;
		const { vectorType } = vectorParameters;

		const dialog = this.closest("cq-dialog");

		// clear the existing web components
		const parameters = this.querySelectorAll(
			"cq-fibonacci-settings > *:not(template)"
		);
		[...parameters].forEach((el) => el.remove());

		// fibonacci type
		if (vectorParameters.fibonacci && vectorType != "fibtimezone") {
			dialog.setTitle("Fibonacci Settings");
			const defaultFibs = vectorParameters.fibonacci.fibs || [];

			defaultFibs.forEach((fib) => {
				// no negative values for fibonacci arc
				if (vectorType === "fibarc" && fib.level < 0) return;

				const newParam = CIQ.UI.makeFromTemplate(
					this.querySelector("template"),
					this.querySelector("cq-fibonacci-settings")
				)[0];
				const convertPercent = fib.level * 100;
				newParam.querySelector(".ciq-heading").innerText =
					convertPercent.toFixed(1) + "%";
				const paramInput = newParam.querySelector("input");

				if (fib.display) {
					paramInput.checked = true;
				}

				this.setChangeEvent(paramInput, "fib", fib.level);
				newParam.querySelector(".stx-data").append(paramInput);
			});
		}
		// settings dialog default
		else {
			dialog.setTitle("Settings");
		}
		this.querySelector("[cq-custom-fibonacci-setting] input").value = "";
	}

	/**
	 * Sets up a handler to process changes to fields
	 * @param {HTMLElement} node    The input field
	 * @param {string} section The section that is being updated
	 * @param {string} name    The name of the field being updated
	 *
	 * @tsmember WebComponents.FibSettingsDialog
	 * @private
	 */
	setChangeEvent(node, section, item) {
		node.addEventListener("change", () => {
			const vectorParameters = this.context.stx.currentVectorParameters;
			const { vectorType } = vectorParameters;

			// fibonacci type
			if (vectorParameters.fibonacci && vectorType != "fibtimezone") {
				const defaultFibs = vectorParameters.fibonacci.fibs || [];
				if (node.type == "checkbox") {
					defaultFibs.forEach((fib) => {
						if (fib.level === item) {
							fib.display = node.checked ? true : false;
						}
					});
				}
			}
		});
	}
}

/**
 * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.FibSettingsDialog
 */
FibSettingsDialog.markup = `
		<cq-scroll cq-no-maximize>
			<cq-fibonacci-settings>
				<template cq-fibonacci-setting>
					<cq-fibonacci-setting>
						<div class="ciq-heading"></div>
						<div class="stx-data">
							<input type="checkbox">
						</div>
					</cq-fibonacci-setting>
				</template>
			</cq-fibonacci-settings>
			<div cq-custom-fibonacci-setting>
				<input class="ciq-heading" type="text">%
				<div class="ciq-btn stx-data" stxtap="add()">Add</div>
			</div>
		</cq-scroll>
		<div class="ciq-dialog-cntrls">
			<div class="ciq-btn" stxtap="close()">Done</div>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-fib-settings-dialog", FibSettingsDialog);
