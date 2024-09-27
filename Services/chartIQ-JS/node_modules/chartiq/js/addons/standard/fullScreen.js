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


import { CIQ as _CIQ } from "../../../js/chartiq.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Creates an add-on that sets the chart UI to full-screen mode. In full-screen mode, a class
 * `full-screen` is added to the context element used for styling. In addition, elements with the
 * class `full-screen-hide` are hidden. Elements with the class `full-screen-show` that are
 * normally hidden are shown.
 *
 * Requires *addOns.js*.
 *
 * ![Full-screen display](./img-Full-Screen-Chart.png)
 *
 * @param {object} params Configuration parameters.
 * @param {CIQ.ChartEngine} [params.stx] The chart object.
 *
 * @constructor
 * @name CIQ.FullScreen
 * @since 7.3.0
 *
 * @example
 * new CIQ.FullScreen({ stx: stxx });
 */
CIQ.FullScreen =
	CIQ.FullScreen ||
	function (params) {
		if (!params) params = {};
		if (!params.stx) {
			console.warn("The Full Screen addon requires an stx parameter");
			return;
		}
		// Check for loading within an iframe from another origin
		try {
			if (window.location.host !== window.top.location.host)
				throw new Error(
					window.location.host + " does not match " + window.top.location.host
				);
		} catch (exception) {
			console.warn("Full screen mode disabled.");
			return;
		}
		this.stx = params.stx;
		this.stx.fullScreen = this;
		this.fullScreenButton = null;
		this.fullScreenState = false;

		//Attaches FullScreen button to HTML DOM inside .chartSize element
		this.addFullScreenButton = function () {
			if (this.stx.registerChartControl)
				this.fullScreenButton = this.stx.registerChartControl(
					"stx-full-screen",
					"Full Screen",
					(function (self) {
						return function (e) {
							self.fullScreenToggle(e);
							e.stopPropagation();
						};
					})(this)
				);
		};

		//Click event handler for the Full Screen button.
		this.fullScreenToggle = function (e) {
			var doc = e.target.ownerDocument;
			// First check for availability of the requestFullScreen function
			if (
				doc.documentElement.requestFullscreen ||
				doc.documentElement.webkitRequestFullscreen ||
				doc.documentElement.mozRequestFullscreen ||
				doc.documentElement.msRequestFullscreen
			) {
				// Check if full screen is already enabled
				if (this.getFullScreenElement(doc)) {
					if (doc.exitFullscreen) doc.exitFullscreen();
					else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
					else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
					else if (doc.msExitFullscreen) doc.msExitFullscreen();
				} else {
					// requestFullscreen methods need to be checked for again here because the browser will not allow the method to be stored in a local var
					if (doc.documentElement.requestFullscreen)
						doc.documentElement.requestFullscreen();
					else if (doc.documentElement.webkitRequestFullscreen)
						doc.documentElement.webkitRequestFullscreen();
					else if (doc.documentElement.mozRequestFullscreen)
						doc.documentElement.mozRequestFullscreen();
					else if (doc.documentElement.msRequestFullscreen)
						doc.documentElement.msRequestFullscreen();
				}
			} else {
				//If the full screen api isn't available, manually trigger the fullScreen styling
				this.fullScreenState = !this.fullScreenState;
				this.fullScreenRender();
			}
		};

		// Append/remove full-screen class to context or body and update button state
		this.fullScreenRender = function () {
			let containerElement = null;
			containerElement = this.stx.container.closest(
				"*[cq-context], cq-context, body"
			);
			if (containerElement) {
				const name = "full-screen";
				const action = this.fullScreenState === true ? "add" : "remove";
				if (this.fullScreenButton)
					this.fullScreenButton.classList[action]("active");
				containerElement.classList[action](name);
				this.stx.channel.componentClass = {
					...this.stx.channel.componentClass,
					[name]: action
				};

				// Trigger a resize event to update the chart size
				window.dispatchEvent(new Event("resize"));
			}
		};

		//Handle full screen change
		this.onFullScreenChange = function (e) {
			if (this.getFullScreenElement(e.target.ownerDocument)) {
				this.fullScreenState = true;
			} else {
				this.fullScreenState = false;
			}
			this.fullScreenRender();
		};

		this.getFullScreenElement = function (doc) {
			return (
				doc.fullscreenElement ||
				doc.webkitCurrentFullScreenElement ||
				doc.mozFullScreenElement ||
				doc.msFullscreenElement
			);
		};

		var listener = this.onFullScreenChange.bind(this);
		var self = this;
		[
			"fullscreenchange",
			"webkitfullscreenchange",
			"mozfullscreenchange",
			"MSFullscreenChange"
		].forEach(function (ev) {
			self.stx.container.ownerDocument.addEventListener(ev, listener);
			self.stx.addEventListener("destroy", function () {
				this.container.ownerDocument.removeEventListener(ev, listener);
			});
		});

		// Add the FullScreen button to chartControls
		this.addFullScreenButton();
	};
