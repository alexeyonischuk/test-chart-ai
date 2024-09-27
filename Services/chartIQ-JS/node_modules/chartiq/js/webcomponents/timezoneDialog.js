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
import "../../js/webcomponents/dialog.js";
import "../../js/webcomponents/close.js";
import "../../js/webcomponents/scroll.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */





const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

// this check is a heuristic for determining whether standard.js has been loaded
if (!CIQ.timeZoneMap) {
	console.error(
		"timezoneDialog component requires first activating timezone feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-timezone-dialog&gt;</h4>
	 *
	 * Provides content for timezone settings dialog.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when it changes the timezone, or removes the current setting.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "change", "remove" |
	 * | action | "click" |
	 * | zone | _timezone_ |
	 *
	 * @alias WebComponents.TimezoneDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 * - 9.1.0 Added emitter.
	 */
	class TimezoneDialog extends CIQ.UI.DialogContentTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, TimezoneDialog);
			this.constructor = TimezoneDialog;
		}

		/**
		 * Opens the dialog and sets the timezone provided by the user.
		 *
		 * @param {Object} [params] Contains the chart context.
		 * @param {CIQ.UI.Context} [params.context] A context to set for the dialog. See
		 * 		{@link CIQ.UI.DialogContentTag#setContext}.
		 *
		 * @tsmember WebComponents.TimezoneDialog
		 */
		open(params) {
			this.addDefaultMarkup();
			super.open(params);
			this.context = params.context;
			const { stx } = this.context;

			const displayZone = () => {
				const currentUserTimeZone = this.querySelector(".currentUserTimeZone");
				if (stx.displayZone) {
					let fullZone = stx.displayZone;
					for (let tz in CIQ.timeZoneMap) {
						if (CIQ.timeZoneMap[tz] === stx.displayZone) fullZone = tz;
					}
					currentUserTimeZone.innerText =
						stx.translateIf("Current Timezone is") +
						" " +
						stx.translateIf(fullZone);
					button.style.display = "";
				} else {
					currentUserTimeZone.innerText = stx.translateIf(
						"Your timezone is your current location"
					);
					button.style.display = "none";
				}
			};

			const setTimezone = (zone) => {
				return (e) => {
					const translatedZone = CIQ.timeZoneMap[zone];
					CIQ.ChartEngine.defaultDisplayTimeZone = translatedZone;
					stx.setTimeZone(stx.dataZone, translatedZone);
					if (stx.chart.symbol) stx.draw();
					displayZone();
					this.emitCustomEvent({
						effect: "change",
						detail: {
							zone: translatedZone
						}
					});
				};
			};

			const ul = this.querySelector("ul, .ciq-ul");
			const button = this.querySelector(".ciq-btn");
			if (!this.template) {
				this.template = ul.querySelector("li.timezoneTemplate").cloneNode(true);
			}

			ul.innerHTML = "";
			for (let key in CIQ.timeZoneMap) {
				const li = this.template.cloneNode(true);
				li.innerHTML = stx.translateIf(key);
				CIQ.safeClickTouch(li, setTimezone(key).bind(this));
				ul.append(li);
			}

			displayZone();
		}

		/**
		 * Removes any user-selected time zone settings, and sets the time zone to the user's
		 * current location.
		 *
		 * @tsmember WebComponents.TimezoneDialog
		 */
		removeTimezone() {
			CIQ.ChartEngine.defaultDisplayTimeZone = null;
			const { stx } = this.context;
			stx.displayZone = null;
			stx.setTimeZone();

			if (stx.displayInitialized) stx.draw();

			this.emitCustomEvent({
				effect: "remove"
			});

			this.close();
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.TimezoneDialog
	 */
	TimezoneDialog.markup = `
		<p class="currentUserTimeZone"></p>
		<div class="detect">
			<div class="ciq-btn" stxtap="removeTimezone()">Use My Current Location</div>
		</div>
		<div class="timezoneDialogWrapper">
			<cq-scroll cq-no-maximize class="ciq-ul" role="listbox">
				<li class="timezoneTemplate" role="option"></li>
			</cq-scroll>
		</div>
		<div class="instruct">(Scroll for more options)</div>
	`;
	CIQ.UI.addComponentDefinition("cq-timezone-dialog", TimezoneDialog);
}
