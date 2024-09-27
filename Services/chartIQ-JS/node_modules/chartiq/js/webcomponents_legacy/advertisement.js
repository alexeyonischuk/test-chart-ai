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
import "../../js/standard/markers.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Marker) {
	console.error(
		"advertisement component requires first activating markers feature."
	);
} else {
	/**
	 * Advertisement web component `<cq-advertisement>`.
	 *
	 * Displays an advertisement banner as a "marker" (inside the chart, use CSS to position absolutely against the chart panel).
	 * The advertisement should contain content that can be enabled by calling {@link CIQ.UI.Advertisement#show} based on your
	 * business logic.
	 *
	 * The advertisement will automatically adjust the height to accommodate the content (assuming overflow-y: auto)
	 * @namespace WebComponents.cq-advertisement
	 * @example
		<cq-advertisement style="display: block; height: 106px;">
		    <cq-close class="ciq-tight"></cq-close>
			<div class="sample ciq-show">
				<div cq-desktop="">
					<div>$1 Trades</div>
					<div>Use code <strong>Sample</strong></div>
					<a target="_blank" href="https://yourURL?codeSample&desktop">Click to learn more</a>
				</div>
				<div cq-phone="">
					<div>$1 Trades</div>
					<a target="_blank" href="https://yourURL?codeSample&mobile">Click to learn more</a>
				</div>
			</div>
		</cq-advertisement>
	 *
	 */
	class Advertisement extends CIQ.UI.ModalTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, Advertisement);
		}

		/**
		 * Hides the advertisement and suppresses it for 24 hours by storing it in local storage.
		 * If the selector itself changes however then the ad will reappear.
		 * @memberof WebComponents.cq-advertisement
		 */
		close() {
			this.node.css({ display: "none" });
			var self = this;
			this.nameValueStore.get("cq-advertisement", function (err, ls) {
				if (err) return;
				var future = new Date();
				if (!self.sleepAmount) self.sleepAmount = { units: 1, unitType: "day" };
				var u = self.sleepAmount.units;
				var ut = self.sleepAmount.unitType;
				if (ut == "minute") future.setMinutes(future.getMinutes() + u);
				else if (ut == "hour") future.setHours(future.getHours() + u);
				else if (ut == "day") future.setDate(future.getDate() + u);
				else if (ut == "week") future.setDate(future.getDate() + u * 7);
				else if (ut == "month") future.setMonth(future.getMonth() + u);
				var ms = future.getTime();
				if (!ls || typeof ls != "object") ls = {};
				ls[self.selector] = ms;
				self.nameValueStore.set("cq-advertisement", ls);
			});
		}

		makeMarker() {
			if (this.markerExists) return;
			CIQ.Marker({
				stx: this.context.stx,
				xPositioner: "none",
				label: "advertisement",
				permanent: true,
				node: this.node[0]
			});
			this.markerExists = true;
		}

		setContext(context) {
			const {
				config: { nameValueStore }
			} = context;
			this.setNameValueStore(nameValueStore);
		}

		setNameValueStore(nameValueStore) {
			if (!nameValueStore && CIQ.NameValueStore)
				nameValueStore = CIQ.NameValueStore;

			this.nameValueStore = nameValueStore
				? new nameValueStore()
				: {
						get: function () {},
						set: function () {}
				  };
		}

		/**
		 * Sets the sleep time for this amount of time before re-displaying
		 * @param  {Number} units    Units
		 * @param  {string} unitType Unit type. Value values "minute","hour","day","week"
		 * @memberof WebComponents.cq-advertisement
		 */
		setSleepAmount(units, unitType) {
			this.sleepAmount = {
				units: units,
				unitType: unitType
			};
		}

		/**
		 * Show the advertisement. This should be a div inside of the web component.
		 * @param  {Selector} [selector]    A selector. If none specified then the first div will be selected.
		 * @param  {Boolean} [ignoreSleep=false] If true then ignore sleep
		 * @member! CIQ.UI.Advertisement
		 */
		show(selector, ignoreSleep = false) {
			if (this.selector) {
				var priorContent = this.node.find(this.selector);
				priorContent.removeClass("ciq-show");
			}
			this.selector = selector;
			if (!this.selector) {
				var div = this.node.find("div:first-of-type");
				this.selector = "." + div.attr("class");
			}
			this.ignoreSleep = ignoreSleep;
			var self = this;
			function doIt() {
				self.makeMarker();
				self.node.css({ display: "block" });
				var content = self.node.find(self.selector);
				content.addClass("ciq-show");

				// resize content
				self.node.css({ height: "0px" });
				setTimeout(function () {
					self.node.css({ height: self.node[0].scrollHeight + "px" });
				}, 0);
			}
			if (!ignoreSleep) {
				this.nameValueStore.get("cq-advertisement", function (err, ls) {
					if (err) return;
					if (!ls || typeof ls != "object") ls = {};
					var ms = ls[self.selector];
					if (ms && ms > Date.now()) return; // still surpressed
					doIt();
				});
			} else {
				doIt();
			}
		}

		/**
		 * Call this to force the advertisement to monitor the nameValueStore for updates. It will do this by
		 * polling. This is useful when running in multiple windows, do that if the advertisement is closed in one
		 * window then it will automatically close in the other windows.
		 * @param {Number} [ms=1000] Number of milliseconds to poll.
		 * @memberof WebComponents.cq-advertisement
		 */
		watchForRemoteClose(ms) {
			if (!ms) ms = 1000;
			var self = this;
			setInterval(function () {
				if (self.node.css("display") == "none") return; // already closed, do nothing
				self.nameValueStore.get("cq-advertisement", function (err, ls) {
					if (err) return;
					if (!ls || typeof ls != "object") ls = {};
					var ms = ls[self.selector];
					if (ms && ms > Date.now()) self.close();
				});
			}, ms);
		}
	}

	CIQ.UI.addComponentDefinition("cq-advertisement", Advertisement);
}
