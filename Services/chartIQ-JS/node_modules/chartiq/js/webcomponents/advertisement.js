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


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Marker) {
	console.error(
		"advertisement component requires first activating markers feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-advertisement&gt;</h4>
	 *
	 * Displays an advertisement banner as a "marker" (inside the chart, use CSS to position absolutely against the chart panel).
	 * The advertisement should contain content that can be enabled by calling {@link CIQ.UI.Advertisement#show} based on your
	 * business logic.
	 *
	 * The advertisement will automatically adjust the height to accommodate the content (assuming overflow-y: auto).
	 *
	 * _**Attributes**_
	 *
	 * This component supports the following attributes:
	 * | attribute | description |
	 * | :-------- | :---------- |
	 * | name      | Name of advertisement.  If omitted, uses "default" |
	 *
	 * @example
	 *	<cq-advertisement name="dollartrades" style="height: 106px;">
	 *	    <cq-close class="ciq-tight"></cq-close>
	 *		<div class="sample ciq-show" content>
	 *			<div cq-desktop="">
	 *				<div>$1 Trades</div>
	 *				<div>Use code <strong>Sample</strong></div>
	 *				<a target="_blank" href="https://yourURL?codeSample&desktop">Click to learn more</a>
	 *			</div>
	 *			<div cq-phone="">
	 *				<div>$1 Trades</div>
	 *				<a target="_blank" href="https://yourURL?codeSample&mobile">Click to learn more</a>
	 *			</div>
	 *		</div>
	 *	</cq-advertisement>
	 *
	 * @alias WebComponents.Advertisement
	 * @extends CIQ.UI.ModalTag
	 * @class
	 * @protected
	 */
	class Advertisement extends CIQ.UI.ModalTag {
		constructor() {
			super();
		}

		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();
			this.style.display = "none";
			this.name = this.getAttribute("name") || "default";
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, Advertisement);
		}

		/**
		 * Hides the advertisement and suppresses it for 24 hours by storing it in local storage.
		 * If the selector itself changes however then the ad will reappear.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		close() {
			this.style.display = "none";
			this.nameValueStore.get("cq-advertisement", (err, ls) => {
				if (err) return;
				const future = new Date();
				if (!this.sleepAmount) this.sleepAmount = { units: 1, unitType: "day" };
				const { units, unitType } = this.sleepAmount;
				if (unitType == "minute")
					future.setMinutes(future.getMinutes() + units);
				else if (unitType == "hour") future.setHours(future.getHours() + units);
				else if (unitType == "day") future.setDate(future.getDate() + units);
				else if (unitType == "week")
					future.setDate(future.getDate() + units * 7);
				else if (unitType == "month")
					future.setMonth(future.getMonth() + units);
				const ms = future.getTime();
				if (!ls || typeof ls != "object") ls = {};
				ls[this.name] = ms;
				this.nameValueStore.set("cq-advertisement", ls);
			});
		}

		/**
		 * Creates a marker out of this component.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		makeMarker() {
			if (this.markerExists) return;
			CIQ.Marker({
				stx: this.context.stx,
				xPositioner: "none",
				label: "advertisement",
				permanent: true,
				node: this
			});
			this.markerExists = true;
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		setContext(context) {
			const {
				config: { nameValueStore }
			} = context;
			this.setNameValueStore(nameValueStore);
			this.show();
		}

		/**
		 * Creates a local nameValueStore using a custom namespace passed in as a parameter.
		 *
		 * @param {Object} nameValueStore The nameValueStore namespace to use.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
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
		 * Sets the sleep time for this amount of time before re-displaying.
		 *
		 * @param  {Number} units    Units
		 * @param  {String} unitType Unit type. Value values "minute","hour","day","week".
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		setSleepAmount(units, unitType) {
			this.sleepAmount = {
				units: units,
				unitType: unitType
			};
		}

		/**
		 * Show the advertisement. This should be a div inside of the web component.
		 *
		 * @param {String} [selector] A selector. If none specified then the node with attribute `content` will be selected.
		 * @param {Boolean} [ignoreSleep=false] If true then ignore sleep.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		show(selector, ignoreSleep = false) {
			if (this.selector) {
				const priorContent = this.querySelector(this.selector);
				if (priorContent) priorContent.classList.remove("ciq-show");
			}
			this.selector = selector || "[content]";
			this.ignoreSleep = ignoreSleep;
			const doIt = () => {
				this.makeMarker();
				this.style.display = "block";
				const content = this.querySelector(this.selector);
				if (content) content.classList.add("ciq-show");

				// resize content
				this.style.height = "0px";
				setTimeout(() => (this.style.height = this.scrollHeight + "px"), 0);
			};
			if (!ignoreSleep) {
				this.nameValueStore.get("cq-advertisement", (err, ls) => {
					if (err) return;
					if (!ls || typeof ls != "object") ls = {};
					const ms = ls[this.name];
					if (ms && ms > Date.now()) return; // still surpressed
					doIt();
				});
			} else {
				doIt();
			}
		}

		/**
		 * Call this to force the advertisement to monitor the nameValueStore for updates. It will do this by
		 * polling. This is useful when running in multiple windows, so that if the advertisement is closed in one
		 * window then it will automatically close in the other windows.
		 *
		 * @param {Number} [ms=1000] Number of milliseconds to poll.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		watchForRemoteClose(ms) {
			if (!ms) ms = 1000;
			setInterval(() => {
				if (this.style.display === "none") return; // already closed, do nothing
				this.nameValueStore.get("cq-advertisement", (err, ls) => {
					if (err) return;
					if (!ls || typeof ls != "object") ls = {};
					const ms = ls[this.name];
					if (ms && ms > Date.now()) this.close();
				});
			}, ms);
		}
	}

	CIQ.UI.addComponentDefinition("cq-advertisement", Advertisement);
}
