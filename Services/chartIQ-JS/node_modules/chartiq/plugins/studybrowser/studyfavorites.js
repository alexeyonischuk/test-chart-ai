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


import { CIQ } from "../../js/components.js";

CIQ.Studies.Favorites = {
	_list: [],

	add(study) {
		const { studyLibrary } = CIQ.Studies;
		const list = this._list;

		const info = getStudyInfo(study);
		const found = list.findIndex(({ name }) => name === info.name);

		if (found > -1) {
			this._list[found] = info;
		} else {
			this._list = list.concat(info);
		}
		this.save();

		function getStudyInfo(study) {
			const isCustomized = typeof study === "object";
			if (!isCustomized) {
				let type;
				type = study;
				if (!studyLibrary[type]) {
					[type, study] =
						Object.entries(studyLibrary).find(
							([_, { name }]) => name === study
						) || [];

					if (!type) {
						console.warn("Study not found");
						return;
					}
				} else {
					study = studyLibrary[type];
				}
				return { type, name: study.name };
			}

			if (hasDefaults(study)) {
				return { type: study.type, name: studyLibrary[study.type].name };
			}

			const {
				type,
				name,
				inputs,
				outputs,
				parameters,
				libraryEntry: { name: studyName } = {}
			} = study;

			return {
				type,
				name: name.replace(/-\d{1,2}$/, ""),
				studyName: studyName !== name && studyName,
				inputs,
				outputs,
				parameters,
				isCustomized
			};
		}

		function hasDefaults(study) {
			const libEntry = CIQ.Studies.studyLibrary[study.type];
			const { display, id, ...studyInputs } = study.inputs;

			return (
				JSON.stringify(libEntry.inputs) === JSON.stringify(studyInputs) &&
				JSON.stringify(libEntry.outputs) === JSON.stringify(study.outputs)
			);
		}
	},

	remove(studyName) {
		this._list = this._list.filter(({ name }) => name !== studyName);
		this.save();
	},

	getList() {
		return [...this._list];
	},

	includes(studyName) {
		return this._list.find(({ name }) => name === studyName);
	},

	addToChart(studyName, stx) {
		const study = this._list.find(({ name }) => name === studyName);
		if (!study) {
			console.warn(`Study ${studyName} not in favourite list`);
			return;
		}

		CIQ.Studies.addStudy(
			stx,
			study.type,
			study.inputs,
			study.outputs,
			study.parameters
		);
	},

	_getStore(stx = {}) {
		if (!this._store) {
			const Store = CIQ.getFromNS(
				stx,
				"uiContext.config.nameValueStore",
				CIQ.NameValueStore
			);
			this._store = new Store();
		}
		return this._store;
	},

	save(stx = {}, cb = () => {}) {
		this._getStore(stx).set("CIQ_Studies_Favorite_list", this._list, cb);
	},

	retrieveList(stx = {}, cb = () => {}) {
		this._getStore(stx).get("CIQ_Studies_Favorite_list", (err, result) => {
			if (!err && result) {
				this._list = result;
				cb(result);
			}
		});
	}
};

/**
 * Proxy for adding the study to favorites.
 *
 * Designed to be used as a helper method for the included {@link WebComponents}. A full tutorial on how to work with and customize web components can be found at {@tutorial Web Component Interface}.
 *
 * Assumes the params for the study have already been set.
 * @param {Object} activator
 * @param {Object} activator.params
 * @param {HTMLElement} activator.params.parent Parent node of activator
 * @memberof CIQ.UI.StudyEdit
 * @since 8.8.0
 */
CIQ.UI.StudyEdit.prototype.addToFavorites = function ({ params }) {
	this.contextDialog.forEach(function (studyContext) {
		if (studyContext.close) studyContext.close();
	});
	const { sd } = this.params;
	CIQ.Studies.Favorites.add(sd);
	if (params.parent.postProcess) params.parent.postProcess("favorite", sd);
};
