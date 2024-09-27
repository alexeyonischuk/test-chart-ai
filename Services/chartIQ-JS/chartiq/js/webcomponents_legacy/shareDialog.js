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
import "../../js/webcomponents_legacy/dialog.js";
import "../../js/webcomponents_legacy/close.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */




var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Share) {
	console.error(
		"shareDialog component requires first activating share feature."
	);
} else {
	/**
	 * Share dialog web component `<cq-share-dialog>`.
	 *
	 * @namespace WebComponents.cq-share-dialog
	 *
	 * @example
	 * <cq-dialog>
	 *     <cq-share-dialog>
	 *         <h4 class="title">Share Your Chart</h4>
	 *         <cq-close></cq-close>
	 *         <div cq-share-dialog-div>
	 *             <cq-separator></cq-separator>
	 *             <cq-share-create class="ciq-btn" stxtap="share()">Create Image</cq-share-create>
	 *             <cq-share-generating>Generating Image</cq-share-generating>
	 *             <cq-share-uploading>Uploading Image</cq-share-uploading>
	 *             <div class="share-copyable-link"></div>
	 *             <cq-share-copy class="ciq-btn" stxtap="copy()">Copy Link to Clipboard</cq-share-copy>
	 *             <cq-share-copied>Link Copied!</cq-share-copied>
	 *         </div>
	 *     </cq-share-dialog>
	 * </cq-dialog>
	 */
	class ShareDialog extends CIQ.UI.DialogContentTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, ShareDialog);
			this.constructor = ShareDialog;
		}

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

			const { chartSharing } = this.context.config;

			if (chartSharing && chartSharing.getChartLayout) {
				this.qsa("[cq-share-dialog-div]")[0].classList.add(
					"has-live-chart-sharing"
				);
				this.shareChartID();
			} else {
				this.shareChartImage();
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

		close() {
			super.close();
		}

		/**
		 * Creates an image of the chart
		 *
		 * @memberof WebComponents.cq-share-dialog
		 */
		async createImage() {
			return new Promise((resolve) => {
				var stx = this.context.stx;
				var shareLink = this.ownerDocument.querySelector(
					"cq-share-dialog .share-image-container .share-copyable-link"
				);
				if (shareLink) shareLink.innerHTML = "Loading...";
				// "hide" is a selector list, of DOM elements to be hidden while an image of the chart is created.  "cq-comparison-add-label" and ".chartSize" are hidden by default.
				CIQ.UI.bypassBindings = true;
				CIQ.Share.createImage(
					stx,
					{
						hide: [
							".stx_chart_controls",
							".stx-btn-panel",
							".stx_jump_today",
							".stx-baseline-handle",
							".ciq-edit",
							".ciq-close",
							"cq-marker-label"
						]
					},
					function (data) {
						CIQ.UI.bypassBindings = false;
						var id = CIQ.uniqueID();
						var host = "https://share.chartiq.com";
						var startOffset = stx.getStartDateOffset();
						var metaData = {
							layout: stx.exportLayout(),
							drawings: stx.exportDrawings(),
							xOffset: startOffset,
							startDate: stx.chart.dataSegment[startOffset].Date,
							endDate:
								stx.chart.dataSegment[stx.chart.dataSegment.length - 1].Date,
							id: id,
							symbol: stx.chart.symbol
						};
						var url = host + "/upload/" + id;
						var payload = { id: id, image: data, config: metaData };
						CIQ.Share.uploadImage(data, url, payload, function (err, response) {
							if (err !== null) {
								CIQ.alert("error: " + err);
							} else {
								const link = host + response;
								if (shareLink) shareLink.innerHTML = link;
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

		copy_image() {
			this.copy("image");
		}

		copy_layout() {
			this.copy("layout");
		}

		/**
		 * @param {*} type image|layout
		 */
		copy(type) {
			var shareLink = this.ownerDocument.querySelector(
				`.share-${type}-container .share-copyable-link`
			);
			if (!shareLink) return;
			var linkToCopy = shareLink.innerText;
			var tempInputElem = document.createElement("input");
			tempInputElem.type = "text";
			tempInputElem.value = linkToCopy;
			tempInputElem.contentEditable = true;
			tempInputElem.readOnly = true;
			this.ownerDocument.body.appendChild(tempInputElem);
			tempInputElem.focus();
			tempInputElem.select();
			if (!CIQ.isIE) {
				var range = document.createRange();
				range.selectNodeContents(tempInputElem);
				var s = window.getSelection();
				s.removeAllRanges();
				s.addRange(range);
				tempInputElem.setSelectionRange(0, linkToCopy.length);
			}
			this.ownerDocument.execCommand("copy");
			this.ownerDocument.body.removeChild(tempInputElem);
			shareLink.parentElement.classList.add(`share-copied`);

			var copyButton = this.ownerDocument.querySelector(
				`.share-${type}-container .cq-share-copy`
			);

			const origText = copyButton.innerHTML;

			if (type === "image") {
				copyButton.innerHTML = "URL Copied!";
			} else {
				copyButton.innerHTML = "ID Copied!";
			}

			setTimeout(() => {
				copyButton.innerHTML = origText;
			}, 3000);
		}

		loadChart(response) {
			CIQ.Share.loadChart(
				this.context.stx,
				response.e.target.previousElementSibling.value
			);
		}

		activateTab(activeTabIndex) {
			const activeTab = this.qsa(".ciq-share-chart-tab")[activeTabIndex],
				activeContent = this.qsa(".ciq-share-chart-tab-content")[
					activeTabIndex
				];

			this.qsa(".ciq-share-chart-tab, .ciq-share-chart-tab-content").forEach(
				(tab) => {
					tab.classList.remove("ciq-active");
				}
			);

			activeTab.classList.add("ciq-active");
			activeContent.classList.add("ciq-active");

			return { activeTab, activeContent };
		}

		async shareChartID() {
			const { activeContent: shareContainer } = this.activateTab(0);

			CIQ.Share.saveChartLayout(this.context.stx).then((shareID) => {
				const { chartSharing } = this.context.config;

				if (chartSharing.generateURL) {
					chartSharing.generateURL(shareID).then((shareURL) => {
						const encodedMessage = encodeURI(`${shareURL}`);

						const copyableLinkContainer = this.qsa(
							".share-layout-container .share-copyable-link"
						)[0];

						if (copyableLinkContainer)
							copyableLinkContainer.innerHTML = shareURL;
						if (shareContainer)
							shareContainer.classList.add("share-layout-loaded");

						this.updateSocialLinks("layout", encodedMessage);
					});
				}
			});
		}

		openTeamsDialog() {
			this.qsa(".ciq-share-teams")[0].classList.add("ciq-active");
		}

		closeTeamsDialog() {
			this.qsa(".ciq-share-teams")[0].classList.remove("ciq-active");
		}

		updateTeamsLink(e) {
			const link = e.target.parentElement.querySelector(
				".ciq-share-teams-link"
			);
			link.href = `https://teams.microsoft.com/l/chat/0/0?users=${
				e.target.value
			}&topicName=View%20Chart&message=${link.getAttribute(
				"ciq-encoded-message"
			)}`;
		}

		updateSocialLinks(type, encodedMessage) {
			const { chartSharing } = this.context.config;

			if (chartSharing && chartSharing.quickLinks) {
				const quickLinks = chartSharing.quickLinks;

				this.qsa(`.share-${type}-container .ciq-share-link`).forEach(
					(button) => {
						const name = button.getAttribute("cq-share-name");

						// check if sharing is disabled for this 3rd party service
						if (quickLinks[name] === false) {
							return;
						}

						switch (name) {
							case "msteams":
								button.href = `https://teams.microsoft.com/l/chat/0/0?users=&topicName=View%20Chart&message=${encodedMessage}`;
								button.addEventListener("click", (e) => {
									e.preventDefault();
									this.openTeamsDialog();
									const teamsLink = this.qsa(".ciq-share-teams-link")[0];
									const teamsInput = this.qsa(".ciq-share-teams textarea")[0];
									teamsInput.addEventListener("change", this.updateTeamsLink);
									teamsInput.addEventListener("keyup", this.updateTeamsLink);
									teamsLink.setAttribute("ciq-encoded-message", encodedMessage);
									teamsLink.addEventListener("click", () => {
										this.closeTeamsDialog();
									});
								});
								break;
							case "twitter":
								button.href = `http://twitter.com/share?text=${encodedMessage}&hashtags=&url=`;
								break;
							case "symphony":
								button.href = `https://open.symphony.com/?startChat=&message=${encodedMessage}`;
						}
					}
				);
			}
		}

		async shareChartImage() {
			this.activateTab(1);

			const link = await this.createImage();

			this.updateSocialLinks("image", encodeURI(link));
		}
	}

	ShareDialog.markup = `
		<div class="ciq-share-teams">
			<h4 class="title">Share With Teams</h4>
			<cq-close></cq-close>
			<div>Enter Teams recipients separated by commas:</div>
			<textarea></textarea>
			<div class="ciq-share-teams-buttons">
				<a href="#" target="_blank" class="ciq-btn ciq-share-teams-link" stxtap="shareTeams()">Share</a>
			</div>
		</div>
		<div class="ciq-share-form">
			<h4 class="title">Share Your Chart</h4>
			<cq-close></cq-close>
			<div cq-share-dialog-div>
				<div class="ciq-share-chart-tabs">
					<div class="ciq-share-chart-tab" keyboard-selectable="true" stxtap="shareChartID()">
						<span class="ciq-radio"><span></span></span>
						Live Chart
					</div>
					<div class="ciq-share-chart-tab" keyboard-selectable="true" stxtap="shareChartImage()">
						<span class="ciq-radio"><span></span></span>
						Chart Image
					</div>
				</div>

				<cq-separator></cq-separator>

				<div class="ciq-share-chart-tab-content share-layout-container">
					<div class="share-copy-container">
						<div class="share-copyable-link">Loading...</div>
						<button class="ciq-btn  cq-share-copy" stxtap="copy_layout()">Copy URL</button>
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
				<div class="ciq-share-chart-tab-content share-image-container">
					<div class="share-copy-container">
						<div class="share-copyable-link">Loading...</div>
						<button class="ciq-btn cq-share-copy" stxtap="copy_image()">Copy URL</button>
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
