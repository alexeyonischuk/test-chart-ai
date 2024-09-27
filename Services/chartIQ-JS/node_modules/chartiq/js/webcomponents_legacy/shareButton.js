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


/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Share Button web component `<cq-share-button>`.
 *
 * @namespace WebComponents.cq-share-button
 *
 * @example
 * <cq-share-button>
 *     <div stxtap="tap();">Share</div>
 * </cq-share-button>
 */
class ShareButton extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ShareButton);
		this.constructor = ShareButton;
	}

	setContext() {
		this.addDefaultMarkup();
		CIQ.safeClickTouch(this, () => this.tap());
		CIQ.Share.onClipboard((shareID) => {
			CIQ.Share.loadChartFromID(this.context.stx, shareID);
		});
	}

	/**
	 * Opens a customizable dialog that can share a chart.
	 * @alias tap
	 * @memberof WebComponents.cq-share-button
	 */
	tap(e) {
		const { context } = this;
		if (context.config) {
			this.channelWrite(
				context.config.channels.dialog,
				{ type: "share", params: { context } },
				context.stx
			);
		} else {
			const shareDialog = this.ownerDocument.querySelector("cq-share-dialog");
			if (shareDialog && shareDialog.open) shareDialog.open({ context });
		}
	}

	/**
	 *
	 * @param {string} shareID
	 */
	async getClipboard() {
		const shareID = await CIQ.Share.getClipboard();

		if (shareID) {
			CIQ.Share.loadChartFromID(this.context.stx, shareID);
		} else {
			this.tap();
		}
	}
}

ShareButton.markup = `<div>Share</div>`;
CIQ.UI.addComponentDefinition("cq-share-button", ShareButton);
