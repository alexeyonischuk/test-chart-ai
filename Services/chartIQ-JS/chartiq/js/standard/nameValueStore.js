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


import { CIQ as _CIQ } from "../../js/chartiq.js";


let __js_standard_nameValueStore_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Base class for interacting with a name/value store.
 *
 * This base class saves to local storage, but you can create your own function overrides for
 * remote storage as long as you maintain the same function signatures and callback requirements.
 *
 * See {@link WebComponents.Views} for an implementation example.
 *
 * @constructor
 * @name CIQ.NameValueStore
 */
CIQ.NameValueStore = CIQ.NameValueStore || function () {};

CIQ.NameValueStore.prototype.toJSONIfNecessary = function (obj) {
	if (obj.constructor == String) return obj;
	try {
		var s = JSON.stringify(obj);
		return s;
	} catch (e) {
		console.log("Cannot convert to JSON: " + obj);
		return null;
	}
};

CIQ.NameValueStore.prototype.fromJSONIfNecessary = function (obj) {
	try {
		var s = JSON.parse(obj);
		return s;
	} catch (e) {
		return obj;
	}
};

/**
 * A function called after a retrieval operation on the name/value store has been completed.
 *
 * @param {object|string} error An error object or error code if data retrieval failed; null if
 * 		data retrieval was successful.
 * @param {object|string} response The data retrieved from storage or null if retrieval failed.
 *
 * @callback CIQ.NameValueStore~getCallback
 * @since 8.2.0
 */

/**
 * A function called after an update of the name/value store has been completed.
 *
 * @param {object|string} error An error object or error code if the storage update failed; null
 * 		if the update was successful.
 *
 * @callback CIQ.NameValueStore~updateCallback
 * @since 8.2.0
 */

/**
 * Retrieves a value from the name/value store.
 *
 * @param {string} field The field for which the value is retrieved.
 * @param {CIQ.NameValueStore~getCallback} cb A callback function called after the retrieval
 * 		operation has been completed. Two arguments are provided to the callback function. The
 * 		first argument indicates the success or failure of the operation; the second argument is
 * 		the value returned by the operation.
 *
 * @memberof CIQ.NameValueStore
 * @since 8.2.0 Made `cb` a required parameter; changed its type to
 * 		{@link CIQ.NameValueStore~getCallback}.
 *
 * @example
 * nameValueStore.get("myfield", function(err, data) {
 *     if (err) {
 *         // Do something with the error.
 *     } else {
 *         // Do something with the retrieved data.
 *     }
 * });
 */
CIQ.NameValueStore.prototype.get = function (field, cb) {
	var value = CIQ.localStorage.getItem(field);
	cb(null, this.fromJSONIfNecessary(value));
};

/**
 * Stores a value in the name/value store.
 *
 * @param {string} field The name under which the value is stored.
 * @param {string|object} value The value to store.
 * @param {CIQ.NameValueStore~updateCallback} [cb] A callback function called after the storage
 * 		operation has been completed. A single argument, which indicates success or failure of the
 * 		operation, is provided to the callback function.
 *
 * @memberof CIQ.NameValueStore
 * @since 8.2.0 Changed the type of the `cb` parameter to {@link CIQ.NameValueStore~updateCallback}.
 *
 * @example
 * nameValueStore.set("myfield", "myValue", function(err) {
 *     if (err) {
 *         // Do something with the error.
 *     } else {
 *         // Do something after the data has been stored.
 *     }
 * });
 */
CIQ.NameValueStore.prototype.set = function (field, value, cb) {
	CIQ.localStorageSetItem(field, this.toJSONIfNecessary(value));
	if (cb) cb(null);
};

/**
 * Removes a field from the name/value store.
 *
 * @param {string} field The field to remove.
 * @param {CIQ.NameValueStore~updateCallback} [cb] A callback function called after the storage
 * 		operation has been completed. A single argument, which indicates success or failure of the
 * 		operation, is provided to the callback function.
 *
 * @memberof CIQ.NameValueStore
 * @since 8.2.0 Changed the type of the `cb` parameter to {@link CIQ.NameValueStore~updateCallback}.
 *
 * @example
 * nameValueStore.remove("myfield", function(err) {
 *     if (err) {
 *         // Do something with the error.
 *     } else {
 *         // Do something after the field has been removed.
 *     }
 * });
 */
CIQ.NameValueStore.prototype.remove = function (field, cb) {
	CIQ.localStorage.removeItem(field);
	if (cb) cb(null);
};

};
__js_standard_nameValueStore_(typeof window !== "undefined" ? window : global);
