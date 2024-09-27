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
 * Studies list web component `<cq-studies>`.
 *
 * Lists all studies contained in the [study library]{@link CIQ.Studies.studyLibrary}.
 *
 *  Optionally show and manage favorites.
 *
 * @namespace WebComponents.cq-studies
 * @since
 * - 5.2.0
 * - 8.8.0 Added `cq-favorites` flag.
 *
 * @example
 * <cq-menu class="ciq-menu ciq-studies collapse">
 *     <span>Studies</span>
 *     <cq-menu-dropdown cq-no-scroll>
 *         <cq-study-legend cq-no-close>
 *             <cq-section-dynamic>
 *                 <cq-heading>Current Studies</cq-heading>
 *                 <cq-study-legend-content>
 *                     <template>
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
class Studies extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Studies);
		this.constructor = Studies;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		if (this.context) {
			CIQ.UI.unobserveProperty(
				"studyLibraryHash",
				this.context.stx.chart,
				this.listener
			);
			this.context.stx.removeEventListener("preferences", this.listener);
		}
		super.disconnectedCallback();
	}

	/**
	 * Initializes and displays the list of available studies.
	 *
	 * @param {object} [params] Parameters to control initialization of the studies list.
	 * @param {object} [params.excludedStudies] A map of study names that should be excluded from
	 * 		the studies list, for example: <code>{&nbsp;"macd":&nbsp;true&nbsp;}</code>.
	 * @param {object|boolean} [params.alwaysDisplayDialog=false] If set to boolean true (not
	 * 		truthy), the study edit dialog box is automatically opened for any of the available
	 * 		studies after the study has been added to the chart. If set to boolean false, the
	 * 		study edit dialog box is not opened for any of the available studies after the study
	 * 		has been added to the chart.
	 * 		<p>If set to an object containing a map of study names and boolean values (for example,
	 * 		<code>{&nbsp;"ma":&nbsp;true,&nbsp;"AVWAP":&nbsp;true&nbsp;}</code>), the study edit
	 * 		dialog box is opened after the study has been added to the chart for studies in the
	 * 		map that have a boolean value of true but not for those that have a value of false or
	 * 		for any studies not included in the map.
	 * @param {object|boolean} [params.dialogBeforeAddingStudy=false] If set to boolean true (not
	 * 		truthy), the study edit dialog box is automatically opened for any of the available
	 * 		studies before the study is added to the chart. If set to boolean false, the study
	 * 		edit dialog box is not opened for any of the available studies before the study is
	 * 		added to the chart.
	 * 		<p>If set to an object containing a map of study names and boolean values (for example,
	 * 		<code>{&nbsp;"macd":&nbsp;true&nbsp;}</code>), the study edit dialog box is opened
	 * 		before the study is added to the chart for studies in the map that have a boolean value
	 * 		of true but not for those that have a value of false or for any studies not included
	 * 		in the map.
	 *
	 * @alias initialize
	 * @memberof WebComponents.cq-studies
	 * @since 5.2.0 The `CIQ.UI.StudyMenu` helper has been deprecated. Please call
	 * 		`document.querySelector("cq-studies").initialize()` now.
	 *
	 * @example
	 * let params = {
	 *     excludedStudies: { "macd": true },  // Exclude studies from the list of available studies.
	 *     alwaysDisplayDialog: { "ma": true },  // Show the study preferences dialog after adding studies.
	 *     dialogBeforeAddingStudy: { "rsi": true }  // Show the study preferences dialog before adding studies.
	 * };
	 * document.querySelectorAll("cq-studies").forEach(function(i) {
	 *     i.initialize(params);
	 * });
	 */
	initialize(params) {
		this.addDefaultMarkup();
		this.params = params || {};
		this.alwaysDisplayDialog = this.params.alwaysDisplayDialog || false;
		this.excludedStudies = this.params.excludedStudies || [];
		if (!this.params.template) this.params.template = "template";
		this.params.template = this.node.find(this.params.template);

		const { stx } = this.context;
		this.listener = () => this.renderMenu(stx);
		CIQ.UI.observeProperty("studyLibraryHash", stx.chart, this.listener);
		stx.addEventListener("preferences", this.listener);
		this.listener();
	}

	setContext({ config }) {
		if (config && config.menuStudiesConfig) {
			this.initialize(Object.assign({}, config.menuStudiesConfig));
		}
	}

	/**
	 * Creates a list of studies in a `<cq-studies-content>` element.
	 *
	 * You have the option of creating a hardcoded HTML menu and just using {@link CIQ.Studies}
	 * for processing `stxtap` attributes, or you can call this method to automatically generate
	 * the menu.
	 *
	 * @param  {CIQ.ChartEngine} stx The chart object
	 *
	 * @alias renderMenu
	 * @memberof WebComponents.cq-studies
	 * @since 8.8.0 Added `stx` parameter.
	 */
	renderMenu(stx) {
		if (!CIQ.Studies) return;
		let alphabetized = [];
		let sd;

		for (let field in CIQ.Studies.studyLibrary) {
			sd = CIQ.Studies.studyLibrary[field];
			if (
				!sd ||
				this.excludedStudies[field] ||
				this.excludedStudies[sd.name] ||
				sd.siqList !== undefined
			)
				continue; // siqList = ScriptIQ entry
			if (!sd.name) sd.name = field; // Make sure there's always a name
			alphabetized.push([field, stx.translateIf(sd.name)]);
		}
		alphabetized.sort(function (lhs, rhs) {
			return lhs[1].localeCompare(rhs[1], stx.locale || "en", {
				sensitivity: "base",
				caseFirst: "upper"
			});
		});
		const menu = this.node;
		const self = this;
		const tapFn = function (studyName, context) {
			return function (e) {
				const isInfoButton = e.target.classList.contains("ciq-info-btn");

				if (isInfoButton) {
					if (self.showStudyInfo) {
						self.showStudyInfo(studyName);
					}
					e.stopPropagation();
					return;
				}

				pickStudy(e.target, studyName);
				self.dispatchEvent(new Event("resize"));
			};
		};

		let contentNode = menu.find("cq-studies-content");
		if (!contentNode.length) contentNode = menu;
		const children = contentNode.children();
		for (let i = children.length - 1; i >= 0; i--) {
			if (!children[i].matches("template")) children[i].remove();
		}

		const addFavorites = this.hasAttribute("ciq-favorites");

		alphabetized.forEach(function (study) {
			const menuItem = CIQ.UI.makeFromTemplate(self.params.template);
			sd = CIQ.Studies.studyLibrary[study[0]];

			const spanEl = menuItem.find("span")[0];
			CIQ.makeTranslatableElement(spanEl || menuItem[0], stx, sd.name);
			menuItem[0].type = study[0];
			const favElement = menuItem.find(".fav-marker")[0];
			if (favElement) {
				if (addFavorites) {
					CIQ.safeClickTouch(favElement, getFavoriteHandler(sd, stx));
				} else {
					favElement.remove();
				}
			}

			self.makeTap(menuItem[0], tapFn(study[0], self.context));
			const infoBtn = menuItem.find(".ciq-info-btn")[0];
			if (infoBtn && (!CIQ.Studies.Info || !CIQ.Studies.Info[sd.name])) {
				infoBtn.style.display = "none";
			}
			contentNode.append(menuItem);
		});
		if (addFavorites) {
			this.updateOrder();
		}

		function studyDialog(params, addWhenDone) {
			const { context } = self;

			if (context.config) {
				self.channelWrite(
					context.config.channels.dialog,
					{
						type: "study",
						params: Object.assign({}, params, { context, addWhenDone })
					},
					context.stx
				);
			} else {
				// legacy use when config is not available
				params.context = self.context;
				const dialog = self.ownerDocument.querySelector("cq-study-dialog");
				dialog.addWhenDone = addWhenDone;
				dialog.open(params);
			}
		}

		function pickStudy(node, studyName) {
			const {
				alwaysDisplayDialog = {},
				context: { stx }
			} = self;

			function handleSpecialCase(flag, params, addWhenDone) {
				if (flag === true) {
					studyDialog(params, addWhenDone);
					return true;
				} else if (typeof flag === "object") {
					for (let i in flag) {
						if (i == studyName && flag[i]) {
							studyDialog(params, addWhenDone);
							return true;
						}
					}
				}
			}

			if (
				handleSpecialCase(
					self.params.dialogBeforeAddingStudy,
					{ stx, name: studyName },
					true
				)
			) {
				return;
			}

			const studyParams = alwaysDisplayDialog[studyName]
				? { interactiveAdd: false } // interactiveAdd and dialog are not compatible
				: null;
			const sd = CIQ.Studies.addStudy(stx, studyName, null, null, studyParams);

			handleSpecialCase(self.alwaysDisplayDialog, { sd, stx });
		}

		function getFavoriteHandler(sd, stx) {
			return (e) => {
				const item = e.target.parentElement;
				const isFavorite = item.classList.contains("ciq-favorite");

				item.classList.add(isFavorite ? "ciq-move-down" : "ciq-move-up");

				setTimeout(() => {
					item.classList[isFavorite ? "remove" : "add"]("ciq-favorite");
					CIQ.Studies.Favorites[isFavorite ? "remove" : "add"](sd.name);
					self.updateOrder();
				}, 500);
			};
		}
	}

	updateOrder() {
		const { stx } = this.context;
		CIQ.Studies.Favorites.retrieveList(stx, (favoriteList) => {
			const addFavorites = this.hasAttribute("ciq-favorites");
			const list = Array.from(this.querySelectorAll("cq-item"));
			const favorites = favoriteList
				.filter(({ isCustomized }) => !isCustomized)
				.reduce((acc, { type }) => ({ ...acc, [type]: true }), {});

			const sortFunction = (
				{ textContent: textA, type: typeA },
				{ textContent: textB, type: typeB }
			) => {
				if (addFavorites) {
					if (favorites[typeA] && !favorites[typeB]) return -1;
					if (!favorites[typeA] && favorites[typeB]) return 1;
				}
				return textA.localeCompare(textB, stx.locale || "en", {
					sensitivity: "base",
					caseFirst: "upper"
				});
			};

			const container = this.querySelector("cq-studies-content") || this;
			list.sort(sortFunction).forEach((item) => {
				item.classList[favorites[item.type] ? "add" : "remove"]("ciq-favorite");
				item.classList.remove("ciq-move-up");
				item.classList.remove("ciq-move-down");
				container.append(item);
			});
		});
	}
}

Studies.markup = `
		<template>
			<cq-item></cq-item>
		</template>
		<cq-studies-content></cq-studies-content>
	`;
CIQ.UI.addComponentDefinition("cq-studies", Studies);
