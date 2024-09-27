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
import "../../js/standard/studies.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"studyLegend component requires first activating studies feature."
	);
} else {
	/**
	 * Study legend web component `<cq-study-legend>`.
	 *
	 * Click on the "X" to remove the study.
	 * Click on the cog to edit the study.
	 * Optionally only show studies needing custom Removal. cq-custom-removal-only
	 * Optionally only show overlays. cq-overlays-only
	 * Optionally only show studies in this panel. cq-panel-only
	 * Optionally only show signalling studies. cq-signal-studies-only
	 * Optionally clone to all panels. cq-clone-to-panels="Plots" or whatever name you choose
	 * Optionally specify selector for which nodes have content. cq-content-keys
	 *
	 * **Keyboard control**
	 *
	 * When selected with tab key navigation and activated with Return/Enter, this component has
	 * the following internal controls:
	 * - Up/Down arrow &mdash; Move selection between internal cq-item and cq-comparison-item
	 * elements.
	 * - Left/Right arrow &mdash; Select a control within a selected cq-item element, such as
	 * the Remove button. Child elements must have the attribute `keyboard-selectable-child` set to
	 * "true" to be selectable with these keys.
	 *
	 * @namespace WebComponents.cq-study-legend
	 * @since
	 * - 8.3.0 Enabled internal keyboard navigation and selection.
	 * - 8.6.0 added `cq-signal-studies-only` flag.
	 *
	 * @example
	 * <caption>
	 *     Here is an example of how to create a study legend on the chart. We use the
	 *     <code>cq-marker</code> attribute to ensure that it floats inside the chart. We set the
	 *     optional <code>cq-panel-only</code> attribute so that only studies from this panel are
	 *     displayed.
	 * </caption>
	 * <cq-study-legend cq-marker-label="Studies" cq-overlays-only cq-marker cq-hovershow>
	 *     <template>
	 *         <cq-item>
	 *             <cq-label></cq-label>
	 *             <span class="ciq-edit"></span>
	 *             <div class="ciq-icon ciq-close"></div>
	 *         </cq-item>
	 *     </template>
	 * </cq-study-legend>
	 *
	 * @example
	 * <caption>
	 *     Here is an example of how to create a study legend inside a dropdown menu. We use the
	 *     <code>cq-no-close</code> attribute so that dropdown is not closed when the user removes
	 *     a study from the list.
	 * </caption>
	 * <cq-menu class="ciq-menu ciq-studies collapse">
	 *     <span>Studies</span>
	 *     <cq-menu-dropdown cq-no-scroll>
	 *         <cq-study-legend cq-no-close>
	 *             <cq-section-dynamic>
	 *                 <cq-heading>Current Studies</cq-heading>
	 *                 <cq-study-legend-content>
	 *                     <template cq-study-legend>
	 *                         <cq-item>
	 *                             <cq-label class="click-to-edit"></cq-label>
	 *                             <div class="ciq-icon ciq-close"></div>
	 *                         </cq-item>
	 *                     </template>
	 *                 </cq-study-legend-content>
	 *                 <cq-placeholder>
	 *                     <div stxtap="Layout.clearStudies()" class="ciq-btn sm">Clear All</div>
	 *                 </cq-placeholder>
	 *             </cq-section-dynamic>
	 *         </cq-study-legend>
	 *         <cq-scroll>
	 *             <cq-studies>
	 *                 <cq-studies-content>
	 *                     <template>
	 *                         <cq-item>
	 *                             <cq-label></cq-label>
	 *                         </cq-item>
	 *                     </template>
	 *                 </cq-studies-content>
	 *             </cq-studies>
	 *         </cq-scroll>
	 *     </cq-menu-dropdown>
	 * </cq-menu>
	 */
	class StudyLegend extends CIQ.UI.ModalTag {
		connectedCallback() {
			if (this.attached) return;
			super.connectedCallback();

			if (!this.hasAttribute("cq-no-claim")) this.addClaim(this);
			// Update the keyboard navigation. New study legend components can be added at runtime.
			if (this.context && this.context.config && this.context.config.channels) {
				this.channelWrite(
					this.context.config.channels.keyboardNavigation ||
						"channel.keyboardNavigation",
					{ action: "registerElements" }
				);
			}
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, StudyLegend);
		}

		disconnectedCallback() {
			if (this.doNotDisconnect) return;
			if (this.context) {
				// Update the keyboard navigation. Need to remove this element from the index now that it's detached
				if (this.context.config && this.context.config.channels) {
					this.channelWrite(
						this.context.config.channels.keyboardNavigation ||
							"channel.keyboardNavigation",
						{ action: "registerElements" }
					);
				}
			}
			window.removeEventListener("resize", this.resizeListener);
			this.setActiveState(false);
			this.removeClaim(this);
			super.disconnectedCallback();
		}

		/**
		 * Begins running the StudyLegend.
		 * @memberof! WebComponents.cq-study-legend
		 * @private
		 */
		begin() {
			if (this.init) return;
			var stx = this.context.stx;
			var node = this.node;

			this.template = node.find("template[cq-study-legend]");
			if (!this.template.length) this.template = node.find("template"); // backwards compatibility, this can fail if more than one template is present!
			this.contentKeys = node.attr("cq-content-keys") || "cq-label";

			this.eventListeners.push(
				stx.addEventListener("layout", this.renderLegend.bind(this)),
				stx.addEventListener("theme", this.renderLegend.bind(this))
			);

			this.resizeListener = () => this.setPanelLegendWidth();
			window.addEventListener("resize", this.resizeListener);

			if (this.hasAttribute("cq-marker")) {
				this.setAttribute("chart-legend", "");
				CIQ.UI.stxtap(this, function () {
					this.setActiveState();
				});
			}

			this.renderLegend();
			this.init = true;
		}

		setActiveState(newState) {
			let isActive = this.classList.contains("ciq-active");
			// If newState is undefined, toggle the active state
			newState = typeof newState === "undefined" ? !isActive : newState;
			const keystrokeHub = this.ownerDocument.body.keystrokeHub;
			if (newState) {
				this.classList.add("ciq-active");
				// Treat the legend like a modal so keyboard navigation is returned after using colorPicker
				if (keystrokeHub && this.keyboardNavigation)
					keystrokeHub.addActiveModal(this);
			} else {
				this.classList.remove("ciq-active");
				if (keystrokeHub) keystrokeHub.removeActiveModal(this);
			}
		}

		keyStroke(hub, key, e) {
			if (!this.keyboardNavigation) return;
			const items = this.querySelectorAll(
				"[keyboard-selectable='true'], cq-item:not(.item-hidden), cq-comparison-item"
			);

			if (key == " " || key == "Spacebar" || key == "Enter") {
				const focused = this.findFocused(items);
				if (!focused || !focused.length) return;
				const childItemsSelected = focused[0].querySelector(
					"[keyboard-selectable-child='true'][cq-focused]"
				);
				if (childItemsSelected) {
					this.storeFocused(focused, childItemsSelected);
					this.clickItem(childItemsSelected, e);
				} else {
					// If no child item is seleted, but there is a swatch, go ahead and click it.
					const selectabelSwatch = focused[0].querySelector("cq-swatch");
					if (selectabelSwatch) this.clickItem(selectabelSwatch, e);
					else this.clickItem(focused[0], e);
				}
			} else if (key == "ArrowDown" || key == "Down") {
				this.focusNextItem(items);
			} else if (key == "ArrowUp" || key == "Up") {
				this.focusNextItem(items, true);
			} else if (key == "ArrowRight" || key == "Right") {
				const focused = this.findFocused(items);
				if (!focused || !focused.length) return;
				const childItems = focused[0].querySelectorAll(
					"[keyboard-selectable-child='true']"
				);
				if (childItems.length) this.focusNextItem(childItems);
			} else if (key == "ArrowLeft" || key == "Left") {
				const focused = this.findFocused(items)[0];
				if (!focused) return;
				const childItems = focused.querySelectorAll(
					"[keyboard-selectable-child='true']"
				);
				// If the end of the child items has been reached select the parent item instead
				if (childItems.length && !this.focusNextItem(childItems, true)) {
					this.removeFocused(childItems);
					this.focusItem(focused);
				}
			} else if (key === "Tab" || key === "Esc" || key === "Escape") {
				this.removeFocused(items);
				this.setActiveState(false);
				const keystrokeHub = this.ownerDocument.body.keystrokeHub;
				if (keystrokeHub) keystrokeHub.tabOrderSelect();
			}
		}

		storeFocused(focused, childItemsSelected) {
			let el = focused[0].querySelector("cq-label") || focused[0];
			const isSwitch = childItemsSelected.classList.contains("ciq-switch");
			if (!isSwitch) {
				el =
					(focused[0].previousElementSibling.nodeName !== "TEMPLATE" &&
						focused[0].previousElementSibling) ||
					focused[0].nextElementSibling;
				if (el && el.querySelector("cq-label"))
					el = el.querySelector("cq-label");
			}
			if (el) {
				this.clickedItem = {
					name: el.textContent.trim(),
					isSwitch,
					ms: +new Date()
				};
			}
		}

		/**
		 * If a color-picker is opened within this component, this will make sure the component stays active.
		 * @memberof! WebComponents.cq-study-legend
		 */
		launchColorPicker() {
			this.setActiveState(true);
		}

		/**
		 * Renders the legend based on the current studies in the CIQ.ChartEngine object.
		 * @memberof! WebComponents.cq-study-legend
		 */
		renderLegend() {
			var stx = this.context.stx;

			this.template.nextAll().remove();

			function closeStudy(self, sd) {
				return function (e) {
					e.stopPropagation();
					// Need to run this in the nextTick because the study legend can be removed by this click
					// causing the underlying chart to receive the mousedown (on IE win7)
					setTimeout(function () {
						if (!sd.permanent) CIQ.Studies.removeStudy(self.context.stx, sd);
						if (self.node[0].hasAttribute("cq-marker"))
							self.context.stx.modalEnd();
						self.renderLegend();
					}, 0);
				};
			}
			function editStudy(self, studyId) {
				return function (e) {
					var sd = stx.layout.studies[studyId];
					if (sd.permanent || !sd.editFunction) {
						stx.dispatch("notification", "studynoteditable");
						return;
					}
					e.stopPropagation();
					self.uiManager.closeMenu();
					var studyEdit = self.context.getAdvertised("StudyEdit");
					var params = {
						stx: stx,
						sd: sd,
						inputs: sd.inputs,
						outputs: sd.outputs,
						parameters: sd.parameters
					};
					studyEdit.editPanel(params);
				};
			}
			var overlaysOnly = this.hasAttribute("cq-overlays-only");
			var panelOnly = this.hasAttribute("cq-panel-only");
			var customRemovalOnly = this.hasAttribute("cq-custom-removal-only");
			var signalStudiesOnly = this.hasAttribute("cq-signal-studies-only");
			var markerLabel = this.node.attr("cq-marker-label");
			var isNativeMobile = false;
			var panelName = null;
			var holder = this.node.parents(".stx-holder")[0];
			if (holder) panelName = holder.panel.name;

			var context = this.closest("cq-context");
			if (context && context.hasAttribute("ciq-native-mobile"))
				isNativeMobile = true;

			if (CIQ.Studies) {
				for (var id in stx.layout.studies) {
					var sd = stx.layout.studies[id];
					if (sd.customLegend) continue;
					if (customRemovalOnly && !sd.study.customRemoval) continue;
					if (panelOnly && sd.panel != panelName) continue;
					if (overlaysOnly && !sd.overlay && !sd.underlay) continue;
					if (
						(!holder || panelName === "chart") &&
						CIQ.xor(signalStudiesOnly, sd.signalData)
					)
						continue;
					var newChild = CIQ.UI.makeFromTemplate(this.template, true);
					var labelEl = newChild.find("cq-label");
					labelEl.text(sd.inputs.display);
					labelEl[0].setAttribute("title", sd.inputs.display);

					var handleClickTouch = function (sd, stx) {
						return (e) => {
							sd.toggleDisabledState(stx);
							stx.changeOccurred("layout");
							e.target.parentElement.classList[sd.disabled ? "remove" : "add"](
								"ciq-active"
							);
						};
					};

					if (!sd.signalData && holder) {
						newChild[0].insertAdjacentHTML("afterbegin", getThumbnail(sd));
					}

					var toggle = document.createElement("span");
					toggle.className = "ciq-switch";
					toggle.setAttribute("keyboard-selectable-child", "true");
					if (!sd.disabled) newChild.addClass("ciq-active");

					CIQ.safeClickTouch(toggle, handleClickTouch(sd, stx));
					if (holder) {
						newChild[0].insertBefore(toggle, newChild[0].firstElementChild);
					} else newChild.append(toggle);

					// restore focus
					if (
						this.clickedItem &&
						+new Date() - this.clickedItem.ms < 100 &&
						this.clickedItem.name.replace(/\u200C/g, "") ===
							sd.inputs.display.replace(/\u200C/g, "")
					) {
						this.focusItem(newChild[0]);
						if (this.clickedItem.isSwitch) {
							this.focusItem(toggle);
						}
					}

					var close = newChild.find(".ciq-close");
					if (close.length) {
						if (sd.permanent) {
							close.hide();
						} else {
							close[0].setAttribute("keyboard-selectable-child", "true");
							CIQ.UI.stxtap(close[0], closeStudy(this, sd));
						}
					}
					var edit = newChild.find(".ciq-edit")[0];
					if (edit && (sd.permanent || !sd.editFunction)) {
						edit.style.visibility = "hidden";
					} else {
						// If there isn't an edit button, put the edit function on the parent so it responds to a keyboard navigation click
						var targetElem = edit || newChild[0];
						CIQ.UI.stxtap(
							targetElem,
							isNativeMobile ? handleClickTouch(sd, stx) : editStudy(this, id)
						);
					}

					// Fixes an issue on mobile where the close study option has an unpredictable target area
					// if we don't assign a tap event to the surrounding elements
					if (CIQ.isMobile) {
						CIQ.UI.stxtap(newChild.find(".ciq-legend-color")[0], () => {});
						CIQ.UI.stxtap(newChild.find("cq-label")[0], () => {});
					}

					this.setPanelLegendWidth();
				}
			}
			//Only want to display the marker label if at least one study has been
			//rendered in the legend. If no studies are rendered, only the template tag
			//will be in there.
			if (typeof markerLabel != "undefined") {
				if (!this.node.find("cq-marker-label").length) {
					var label = document.createElement("cq-marker-label");
					label.innerText = markerLabel;
					this.insertBefore(label, this.firstChild);
				}
			}

			this.displayLegendTitle();

			function getThumbnail(sd) {
				var colors = Object.values(sd.outputs);
				var bandWidth = (1 / colors.length) * 100;
				if (!stx.defaultColor) stx.getDefaultColor();
				var els = colors
					.slice(0, 3)
					.map((item, i) => {
						const color = item.color || item;
						const bg = color === "auto" ? stx.defaultColor : color;
						return `<span style="background: ${bg};"></span>`;
					})
					.join("");

				return `<div class="ciq-legend-color">${els}</div>`;
			}
		}

		displayLegendTitle() {
			if (hasKeys(this, this.contentKeys)) {
				this.node.css("display", "");
				this.node.parents("div.stx-panel-legend").css("width", "");
			} else {
				this.node.css("display", "none");
				this.node.parents("div.stx-panel-legend").css("width", "0px");
			}
			if (this.context.stx.translateUI)
				this.context.stx.translateUI(this.node[0]);

			function hasKeys(node, keys) {
				// checks if key is not template as in frameworks such as React or Angular
				// templates may be rendered as regular node allowing to inner content queries
				return Array.from(node.querySelectorAll(keys)).some(notInTemplate);
			}

			function notInTemplate(el) {
				while (el) {
					if (el.nodeName.toLowerCase() === "template") return false;
					el = el.parentElement;
				}
				return true;
			}
		}

		setContext(context) {
			if (this.init) return;
			var self = this;
			if (!this.parentElement) return;
			if (this.node.attr("cq-clone-to-panels") !== undefined) {
				self.closest("cq-context").classList.add("stx-panel-legend");
				self.spawnPanelLegend();
				this.addInjection("append", "stackPanel", function (display, name) {
					self.spawnPanelLegend();
				});
			}
			this.begin();
		}

		changeContext(newContext) {
			if (!this.init) {
				// context change in multichart is executed prior setContext
				this.context = newContext;
				this.setContext(newContext);
				return;
			}
			this.eventListeners.forEach((listener) => {
				this.context.stx.removeEventListener(listener);
			});
			this.eventListeners = [
				newContext.stx.addEventListener("layout", this.renderLegend.bind(this)),
				newContext.stx.addEventListener("theme", this.renderLegend.bind(this))
			];
			this.context = newContext;
			this.renderLegend();
		}

		spawnPanelLegend() {
			var stx = this.context.stx;
			function tap(legend) {
				return function (e) {
					legend.setActiveState();
				};
			}
			for (var p in stx.panels) {
				if (p == stx.chart.panel.name) continue;
				var legendHolder =
					stx.panels[p].subholder.querySelector(".stx-panel-legend");
				if (legendHolder) {
					var panelLegend = legendHolder.querySelector(this.nodeName);
					if (!panelLegend) {
						if (this.ownerDocument !== document) {
							const templ = document.createElement("template");
							templ.innerHTML = this.outerHTML;
							document.body.append(templ);
							panelLegend = CIQ.UI.makeFromTemplate(templ)[0];
							templ.remove();
						} else {
							panelLegend = this.cloneNode(true);
						}
						panelLegend.setAttribute(
							"cq-marker-label",
							this.getAttribute("cq-clone-to-panels")
						);
						panelLegend.removeAttribute("cq-clone-to-panels");
						panelLegend.removeAttribute("cq-overlays-only");
						panelLegend.removeAttribute("cq-marker");
						CIQ.UI.stxtap(panelLegend, tap(panelLegend));
						var mLabel = panelLegend.querySelector("cq-marker-label");
						if (mLabel) mLabel.remove();
						var fixedWrapper = document.createElement(
							"cq-study-legend-fixed-wrapper"
						);
						fixedWrapper.appendChild(panelLegend);
						legendHolder.appendChild(fixedWrapper);
						panelLegend.begin();
					}
				}
			}
		}

		// Creates an element to expand the background over the panel control buttons when they are visible on hovering over the study panel.
		setPanelLegendWidth() {
			if (
				this.parentElement.tagName.toLowerCase() !==
				"cq-study-legend-fixed-wrapper"
			)
				return;

			const panelControl = this.node.parents("div.stx-panel-control")[0],
				allButtons = panelControl.querySelectorAll(".stx-btn-panel");

			for (let button of allButtons) {
				button.style.marginLeft = "";
			}

			const firstBtn =
					panelControl.querySelector(".stx-btn-panel.stx-show") || null,
				firstBtnOffset = firstBtn ? firstBtn.offsetLeft : null,
				lastBtn = panelControl.lastChild || null,
				lastBtnOffset = lastBtn
					? lastBtn.offsetLeft + lastBtn.offsetWidth
					: null;

			const breakpointValue = this.channelRead("channel.breakpoint");
			if (breakpointValue === "break-sm") {
				firstBtn.style.marginLeft = "";
			} else {
				firstBtn.style.marginLeft =
					"-" + (lastBtnOffset - firstBtnOffset + 20) + "px";
			}
		}
	}

	CIQ.UI.addComponentDefinition("cq-study-legend", StudyLegend);
}
