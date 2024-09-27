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



var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * fibonacci settings dialog web component `<cq-fib-settings-dialog>`.
 *
 * @namespace WebComponents.cq-fib-settings-dialog
 * @example
  <cq-dialog>
  	<cq-fib-settings-dialog>
  		<h4 class="title">Settings</h4>
  		<cq-scroll cq-no-maximize>
  			<cq-fibonacci-settings>
  				<template cq-fibonacci-setting>
  					<cq-fibonacci-setting>
  						<div class="ciq-heading"></div>
  						<div class="stx-data"></div>
  					</cq-fibonacci-setting>
  				</template>
  			</cq-fibonacci-settings>
  		</cq-scroll>
  		<div class="ciq-dialog-cntrls">
  			<div class="ciq-btn" stxtap="close()">Done</div>
  		</div>
  	</cq-fib-settings-dialog>
  </cq-dialog>
 * @since 3.0.9
 */
class FibSettingsDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, FibSettingsDialog);
		this.constructor = FibSettingsDialog;
	}

	/**
	 * Adds a custom fib level
	 * @memberOf WebComponents.cq-fib-settings-dialog
	 * @since 5.2.0
	 */
	add() {
		var level = this.node.find("[cq-custom-fibonacci-setting] input").val();
		if (!level) return;
		level = parseFloat(level) / 100;
		if (isNaN(level)) return;
		var defaultFibs =
			this.context.stx.currentVectorParameters.fibonacci.fibs || [];
		var fib, newFib;
		for (var index = 0; index < defaultFibs.length; index++) {
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
	 * @memberOf WebComponents.cq-fib-settings-dialog
	 * @since 6.2.0
	 */
	close() {
		if (this.opener) {
			var event = new Event("change", {
				bubbles: true,
				cancelable: true
			});

			this.opener.dispatchEvent(event);
			this.context.stx.currentVectorParameters.fibonacci.fibsAlreadySet = true;
		}

		super.close();
	}

	/**
	 * Opens the cq-fib-settings-dialog
	 * @param  {Object} params Parameters
	 * @memberOf WebComponents.cq-fib-settings-dialog
	 */
	open(params) {
		this.addDefaultMarkup();
		super.open(params);
		if (params) this.opener = params.caller;
		var vectorParameters = this.context.stx.currentVectorParameters;
		var vectorType = vectorParameters.vectorType;
		var dialog = this.node;

		// fibonacci type
		var parameters;
		if (vectorParameters.fibonacci && vectorType != "fibtimezone") {
			dialog.find(".title").text("Fibonacci Settings");
			var defaultFibs = vectorParameters.fibonacci.fibs || [];
			parameters = dialog.find("cq-fibonacci-settings");
			parameters.children(":not(template)").remove();

			for (var index = 0; index < defaultFibs.length; index++) {
				var fib = defaultFibs[index];

				// no negative values for fibonacci arc
				if (vectorType === "fibarc" && fib.level < 0) continue;

				var newParam = CIQ.UI.makeFromTemplate(
					this.node.find("template"),
					parameters
				);
				var convertPercent = fib.level * 100;
				newParam.find(".ciq-heading").text(convertPercent.toFixed(1) + "%");
				var paramInput = newParam.find("input");

				if (fib.display) {
					paramInput.prop("checked", true);
				}

				this.setChangeEvent(paramInput, "fib", fib.level);
				newParam.find(".stx-data").append(paramInput);
			}
		}
		// settings dialog default
		else {
			dialog.find(".title").text("Settings");

			// clear the existing web components
			parameters = dialog.find("cq-fibonacci-settings");
			parameters.children(":not(template)").remove();
		}
		this.node.find("[cq-custom-fibonacci-setting] input").val("");
	}

	/**
	 * Sets up a handler to process changes to fields
	 * @param {HTMLElement} node    The input field
	 * @param {string} section The section that is being updated
	 * @param {string} name    The name of the field being updated
	 * @memberOf WebComponents.cq-fib-settings-dialog
	 * @private
	 */
	setChangeEvent(node, section, item) {
		var self = this;
		function closure() {
			return function () {
				var vectorParameters = self.context.stx.currentVectorParameters;
				var vectorType = vectorParameters.vectorType;

				// fibonacci type
				if (vectorParameters.fibonacci && vectorType != "fibtimezone") {
					var defaultFibs = vectorParameters.fibonacci.fibs || [];
					if (this.type == "checkbox") {
						for (var index = 0; index < defaultFibs.length; index++) {
							var fib = defaultFibs[index];

							if (fib.level === item) {
								fib.display = this.checked ? true : false;
							}
						}
					}
				}
			};
		}
		node[0].addEventListener("change", closure());
	}
}

FibSettingsDialog.markup = `
		<h4 class="title">Settings</h4>
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
