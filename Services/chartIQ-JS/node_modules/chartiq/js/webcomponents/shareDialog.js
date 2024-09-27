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
import "../../js/standard/share.js";
import "../../js/webcomponents/dialog.js";
import "../../js/webcomponents/close.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */




const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Share) {
	console.error(
		"shareDialog component requires first activating share feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-share-dialog&gt;</h4>
	 *
	 * Dialog form that allows users share/post their charts to a remote service, such as social media or a file server.
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when data is generated for sharing.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" or "auto" |
	 * | effect | "share" or "id" |
	 * | action | "click" or null |
	 * | value | _link to image, or id_ |
	 *
	 * A custom event will be emitted from the component when data is copied to the clipboard.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "copy" |
	 * | action | "click" |
	 * | value | _contents of clipboard_ |
	 *
	 * @alias WebComponents.ShareDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 * - 9.0.0 Added functionality to export layouts to social media services.
	 * - 9.1.0 Added emitter.
	 */
	class ShareDialog extends CIQ.UI.DialogContentTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, ShareDialog);
			this.constructor = ShareDialog;
		}

		/**
		 * Opens the share dialog.
		 *
		 * @param {object} params
		 * @param {CIQ.UI.Context} [params.context] A context to set. See
		 * 		[setContext]{@link CIQ.UI.DialogContentTag#setContext}.
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		open(params) {
			this.addDefaultMarkup();
			this.closeTeamsDialog();

			if (
				!params.context ||
				!params.context.stx ||
				!params.context.stx.chart ||
				!params.context.stx.chart.canvas
			)
				return;

			super.open(params);

			const { chartSharing } = params.context.config;

			if (chartSharing && chartSharing.getChartLayout) {
				this.querySelector("[cq-share-dialog-div]").classList.add(
					"has-live-chart-sharing"
				);
				this.shareChartID("auto");
			} else {
				this.shareChartImage("auto");
			}

			// Set the main dialog as keyboard active to reset the highlight when this panel reloads
			if (this.ownerDocument.body.keystrokeHub) {
				let { tabActiveModals } = this.ownerDocument.body.keystrokeHub;
				if (tabActiveModals[0])
					this.ownerDocument.body.keystrokeHub.setKeyControlElement(
						tabActiveModals[0]
					);
			}
		}

		/**
		 * Creates an image of the chart.
		 *
		 * @return {Promise<void>}
		 * @async
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		async createImage() {
			return new Promise((resolve) => {
				const { stx } = this.context;
				const shareLink = this.querySelector(
					".share-image-container .share-copyable-link"
				);
				if (shareLink) shareLink.innerHTML = "Loading...";

				const copyButton = this.querySelector(
					`.share-image-container .cq-share-copy`
				);
				if (copyButton) copyButton.setAttribute("disabled", "");

				// "hide" is a selector list, of DOM elements to be hidden while an image of the chart is created.  "cq-comparison-add-label" and ".chartSize" are hidden by default.
				CIQ.UI.bypassBindings = true;
				CIQ.Share.createImage(
					stx,
					{
						hide: [
							".ciq-nav",
							".ciq-footer",
							"cq-dialog",
							"cq-dialogs",
							".stx_chart_controls",
							".stx-btn-panel",
							".stx_jump_today",
							".stx-baseline-handle",
							".ciq-edit",
							".ciq-close",
							"cq-marker-label"
						]
					},
					(data) => {
						CIQ.UI.bypassBindings = false;
						const id = CIQ.uniqueID();
						const host = "https://share.chartiq.com"; //TODO make configurable
						const startOffset = stx.getStartDateOffset();
						const metaData = {
							layout: stx.exportLayout(),
							drawings: stx.exportDrawings(),
							xOffset: startOffset,
							startDate: stx.chart.dataSegment[startOffset].Date,
							endDate:
								stx.chart.dataSegment[stx.chart.dataSegment.length - 1].Date,
							id,
							symbol: stx.chart.symbol
						};
						const url = host + "/upload/" + id;
						const payload = { id, image: data, config: metaData };
						CIQ.Share.uploadImage(data, url, payload, (err, response) => {
							if (err !== null) {
								CIQ.alert("error: " + err);
							} else {
								const link = host + response;
								if (shareLink) shareLink.innerHTML = link;
								if (copyButton) copyButton.removeAttribute("disabled");
								resolve(link);
							}
						});
					}
				);
				// Set the main dialog as keyboard active to reset the highlight when this panel reloads
				if (this.ownerDocument.body.keystrokeHub) {
					let { tabActiveModals } = this.ownerDocument.body.keystrokeHub;
					if (tabActiveModals[0])
						this.ownerDocument.body.keystrokeHub.setKeyControlElement(
							tabActiveModals[0]
						);
				}
			});
		}

		/**
		 * Function for copying PNG image.
		 * @param {object} activator
		 * @param {HTMLElement} activator.node The button which was tapped to execute this function
		 *
		 * @tsmember WebComponents.ShareDialog
		 * @since 9.2.0
		 */
		copy_image({ node }) {
			if (!node.disabled) this.copy("image");
		}

		/**
		 * Function for copying chart layout.
		 * @param {object} activator
		 * @param {HTMLElement} activator.node The button which was tapped to execute this function
		 *
		 * @tsmember WebComponents.ShareDialog
		 * @since 9.2.0
		 */
		copy_layout({ node }) {
			if (!node.disabled) this.copy("layout");
		}

		/**
		 * Copies the chart image or layout ID to the clipboard.
		 *
		 * @param {String} type image|layout
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		copy(type) {
			const shareLink = this.querySelector(
				`.share-${type}-container .share-copyable-link`
			);
			if (!shareLink) return;
			const linkToCopy = shareLink.innerText;
			const tempInputElem = document.createElement("input");
			tempInputElem.type = "text";
			tempInputElem.value = linkToCopy;
			tempInputElem.contentEditable = true;
			tempInputElem.readOnly = true;
			this.ownerDocument.body.appendChild(tempInputElem);
			tempInputElem.focus();
			tempInputElem.select();
			if (!CIQ.isIE) {
				const range = document.createRange();
				range.selectNodeContents(tempInputElem);
				const s = window.getSelection();
				s.removeAllRanges();
				s.addRange(range);
				tempInputElem.setSelectionRange(0, linkToCopy.length);
			}
			this.ownerDocument.execCommand("copy");
			this.ownerDocument.body.removeChild(tempInputElem);
			shareLink.parentElement.classList.add("share-copied");

			const copyButton = this.querySelector(
				`.share-${type}-container .cq-share-copy`
			);

			const origText = copyButton.innerHTML;

			if (type === "image") {
				copyButton.innerHTML = "URL Copied!";
			} else {
				copyButton.innerHTML = "ID Copied!";
			}

			this.emitCustomEvent({
				effect: "copy",
				detail: { value: linkToCopy }
			});

			setTimeout(() => {
				copyButton.innerHTML = origText;
			}, 3000);
		}

		/**
		 * Loads a chart from a provided layout ID.
		 *
		 * @param {object} response
		 * @param {Event} response.e The event triggering the load.
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		loadChart(response) {
			CIQ.Share.loadChart(
				this.context.stx,
				response.e.target.previousElementSibling.value
			);
		}

		/**
		 * Shows the appropriate "tab" in the dialog, whether for sharing a chart or an image.
		 *
		 * @param {string} type "id" or "image".
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		activateTab(type) {
			const activeTab = this.querySelector(
					`.ciq-share-chart-tab[type="${type}"]`
				),
				activeContent = this.querySelector(
					`.ciq-share-chart-tab-content[type="${type}"]`
				);

			[
				...this.querySelectorAll(
					".ciq-share-chart-tab, .ciq-share-chart-tab-content"
				)
			].forEach((tab) => {
				tab.classList.remove("ciq-active");
			});

			activeTab.classList.add("ciq-active");
			activeContent.classList.add("ciq-active");

			return { activeTab, activeContent };
		}

		/**
		 * Shares the layout ID to a social media service.
		 *
		 * @param {string} source Indicates a cause for the sharing.  Used in the emitter.
		 * @async
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		async shareChartID(source) {
			const { activeContent: shareContainer } = this.activateTab("id");

			CIQ.Share.saveChartLayout(this.context.stx).then((shareID) => {
				const { chartSharing } = this.context.config;

				this.emitCustomEvent({
					action: source ? null : undefined,
					cause: source,
					effect: "share",
					detail: { value: shareID }
				});

				if (chartSharing.generateURL) {
					chartSharing.generateURL(shareID).then((shareURL) => {
						const encodedMessage = encodeURI(`${shareURL}`);

						const copyableLinkContainer = this.querySelector(
							".share-layout-container .share-copyable-link"
						);

						if (copyableLinkContainer)
							copyableLinkContainer.innerHTML = shareURL;
						if (shareContainer)
							shareContainer.classList.add("share-layout-loaded");

						const copyButton = this.querySelector(
							`.share-layout-container .cq-share-copy`
						);
						if (copyButton) copyButton.removeAttribute("disabled");

						this.updateSocialLinks("layout", encodedMessage);
					});
				}
			});
		}

		/**
		 * Open Microsoft Teams dialog area.
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		openTeamsDialog() {
			this.querySelector(".ciq-share-teams").classList.add("ciq-active");
			const dialog = this.closest("cq-dialog");
			dialog.setTitle("Share With Teams");
		}

		/**
		 * Close Microsoft Teams dialog area.
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		closeTeamsDialog() {
			this.querySelector(".ciq-share-teams").classList.remove("ciq-active");
			const dialog = this.closest("cq-dialog");
			dialog.setTitle("Share Your Chart");
		}

		/**
		 * Update Microsoft Teams posting link.
		 *
		 * @param {Event} e Input event
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		updateTeamsLink(e) {
			const link = e.target.parentElement.querySelector(
				".ciq-share-teams-link"
			);
			link.href = `https://teams.microsoft.com/l/chat/0/0?users=${
				e.target.value
			}&topicName=View%20Chart&message=${link.getAttribute(
				"ciq-encoded-message"
			)}`; //TODO use regex to do replacement of message value
		}

		/**
		 * Update social media posting link.
		 *
		 * @param {string} type "layout" or "image".
		 * @param {string} encodedMessage URI-encoded data to post.
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		updateSocialLinks(type, encodedMessage) {
			const { chartSharing } = this.context.config;

			if (chartSharing && chartSharing.quickLinks) {
				const { quickLinks } = chartSharing;

				[
					...this.querySelectorAll(`.share-${type}-container .ciq-share-link`)
				].forEach((button) => {
					const name = button.getAttribute("cq-share-name");

					// check if sharing is disabled for this 3rd party service
					if (quickLinks[name] === false) return;

					switch (name) {
						case "msteams":
							button.href = `https://teams.microsoft.com/l/chat/0/0?users=&topicName=View%20Chart&message=${encodedMessage}`; //TODO make configurable
							button.addEventListener("click", (e) => {
								e.preventDefault();
								this.openTeamsDialog();
								const teamsLink = this.querySelector(".ciq-share-teams-link");
								const teamsInput = this.querySelector(
									".ciq-share-teams textarea"
								);
								teamsInput.addEventListener("change", this.updateTeamsLink);
								teamsInput.addEventListener("keyup", this.updateTeamsLink);
								teamsLink.setAttribute("ciq-encoded-message", encodedMessage);
								teamsLink.addEventListener("click", () => {
									this.closeTeamsDialog();
								});
							});
							break;
						case "twitter":
							button.href = `http://twitter.com/share?text=${encodedMessage}&hashtags=&url=`; //TODO make configurable
							break;
						case "symphony":
							button.href = `https://open.symphony.com/?startChat=&message=${encodedMessage}`; //TODO make configurable
					}
				});
			}
		}

		/**
		 * Shares the image PNG to a social media service.
		 *
		 * @param {string} source Indicates a cause for the sharing.  Used in the emitter.
		 * @async
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		async shareChartImage(source) {
			this.activateTab("image");

			const link = await this.createImage();

			this.updateSocialLinks("image", encodeURI(link));

			this.emitCustomEvent({
				action: source ? null : undefined,
				cause: source,
				effect: "link",
				detail: { value: link }
			});

			setTimeout(() => {
				this.tabIndex = -1;
				this.focus();
			}, 10);
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.ShareDialog
	 */
	ShareDialog.markup = `
		<div class="ciq-share-teams">
			<div>Enter Teams recipients separated by commas:</div>
			<textarea></textarea>
			<div class="ciq-share-teams-buttons">
				<a href="#" target="_blank" class="ciq-btn ciq-share-teams-link" stxtap="shareTeams()">Share</a>
			</div>
		</div>
		<div class="ciq-share-form">
			<div cq-share-dialog-div>
				<div class="ciq-share-chart-tabs">
					<div class="ciq-share-chart-tab" type="id" keyboard-selectable="true" stxtap="shareChartID()">
						<span class="ciq-radio"><span></span></span>
						<span>Live Chart</span>
					</div>
					<div class="ciq-share-chart-tab" type="image" keyboard-selectable="true" stxtap="shareChartImage()">
						<span class="ciq-radio"><span></span></span>
						<span>Chart Image</span>
					</div>
				</div>

				<cq-separator></cq-separator>

				<div class="ciq-share-chart-tab-content share-layout-container" type="id">
					<div class="share-copy-container">
						<div class="share-copyable-link">Loading...</div>
						<button class="ciq-btn cq-share-copy" stxtap="copy_layout()" disabled>Copy URL</button>
					</div>
					<div class="ciq-share-icons">
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="twitter">
							<span class="ciq-share-name">Share to Twitter</span>
						</a>
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="msteams">
							<span class="ciq-share-name">Share to Microsoft Teams</span>
						</a>
						<!--
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="symphony">
							<span class="ciq-share-name">Share to Symphony</span>
						</a>
						-->
					</div>

					<!--
					<cq-separator></cq-separator>

					<h4 class="title">Load Chart</h4>
					<div class="share-load-container">
						<input type="text" placeholder="Paste share ID" />
						<button class="ciq-btn" stxtap="loadChart()">Load Chart</button>
					</div>
					-->
				</div>
				<div class="ciq-share-chart-tab-content share-image-container" type="image">
					<div class="share-copy-container">
						<div class="share-copyable-link">Loading...</div>
						<button class="ciq-btn cq-share-copy" stxtap="copy_image()" disabled>Copy URL</button>
					</div>
					<div class="ciq-share-icons">
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="twitter">
							<span class="ciq-share-name">Share to Twitter</span>
						</a>
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="msteams">
							<span class="ciq-share-name">Share to Microsoft Teams</span>
						</a>
						<!--
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="symphony">
							<span class="ciq-share-name">Share to Symphony</span>
						</a>
						-->
					</div>
				</div>
			</div>
		</div>
	`;
	CIQ.UI.addComponentDefinition("cq-share-dialog", ShareDialog);
}
