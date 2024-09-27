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
import "../../js/standard/timezone.js";
import "../../js/webcomponents_legacy/dialog.js";
import "../../js/webcomponents_legacy/close.js";
import "../../js/webcomponents/scroll.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */





var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

// this check is a heuristic for determining whether standard.js has been loaded
if (!CIQ.timeZoneMap) {
	console.error(
		"timezoneDialog component requires first activating timezone feature."
	);
} else {
	/**
	 * Time zone dialog web component `<cq-timezone-dialog>`.
	 *
	 * @namespace WebComponents.cq-timezone-dialog
	 */
	class TimezoneDialog extends CIQ.UI.DialogContentTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, TimezoneDialog);
			this.constructor = TimezoneDialog;
		}

		/**
		 * Opens the dialog and sets the time zone selected by the user.
		 *
		 * @alias open
		 * @memberof WebComponents.cq-timezone-dialog
		 */
		open(params) {
			this.addDefaultMarkup();
			super.open(params);
			var node = this.node;
			var self = this;
			this.context = params.context;
			var stx = this.context.stx;

			function setTimezone(zone) {
				return function (e) {
					var translatedZone = CIQ.timeZoneMap[zone];
					CIQ.ChartEngine.defaultDisplayTimeZone = translatedZone;
					stx.setTimeZone(stx.dataZone, translatedZone);
					if (stx.chart.symbol) stx.draw();
					displayZone();
					//self.close();
				};
			}

			var ul = node.find("ul, .ciq-ul");
			var button = node.find(".ciq-btn");
			if (!this.template) {
				this.template = ul.find("li.timezoneTemplate")[0].cloneNode(true);
			}

			ul.empty();
			for (var key in CIQ.timeZoneMap) {
				var zone = key;
				var display = stx.translateIf(zone);
				var li = this.template.cloneNode(true);
				li.style.display = "block";
				li.innerHTML = display;
				CIQ.safeClickTouch(li, setTimezone(zone));
				ul.append(li);
			}

			displayZone();

			function displayZone() {
				var currentUserTimeZone = node.find(".currentUserTimeZone");
				if (stx.displayZone) {
					var fullZone = stx.displayZone;
					for (var tz in CIQ.timeZoneMap) {
						if (CIQ.timeZoneMap[tz] === stx.displayZone) fullZone = tz;
					}
					currentUserTimeZone.text(
						stx.translateIf("Current Timezone is") +
							" " +
							stx.translateIf(fullZone)
					);
					button.show();
				} else {
					currentUserTimeZone.text(
						stx.translateIf("Your timezone is your current location")
					);
					button.hide();
				}
			}
		}

		/**
		 * Removes any user-selected time zone settings, and sets the time zone to the user's
		 * current location.
		 *
		 * @alias removeTimeZone
		 * @memberof WebComponents.cq-timezone-dialog
		 */
		removeTimezone() {
			CIQ.ChartEngine.defaultDisplayTimeZone = null;
			var stx = this.context.stx;
			stx.displayZone = null;
			stx.setTimeZone();

			if (stx.displayInitialized) stx.draw();

			this.close();
		}
	}

	TimezoneDialog.markup = `
		<h4 class="title">Choose Timezone</h4>
		<cq-close></cq-close>

		<p>To set your timezone use the location button below, or scroll through the following list...</p>
		<p class="currentUserTimeZone"></p>
		<div class="detect">
			<div class="ciq-btn" stxtap="removeTimezone()">Use My Current Location</div>
		</div>
		<div class="timezoneDialogWrapper" style="max-height:360px; overflow: hidden;">
			<cq-scroll cq-no-maximize class="ciq-ul" style="height:360px;">
				<li class="timezoneTemplate" style="display:none;cursor:pointer;"></li>
			</cq-scroll>
		</div>
		<div class="instruct">(Scroll for more options)</div>
	`;
	CIQ.UI.addComponentDefinition("cq-timezone-dialog", TimezoneDialog);
}
