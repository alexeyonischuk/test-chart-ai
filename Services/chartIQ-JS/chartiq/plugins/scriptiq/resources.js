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


import "./thirdparty/esutils.js";
import "./thirdparty/estraverse.js";
import "./thirdparty/esprima.js";
import "./thirdparty/escodegen.js";
import "./thirdparty/coffee-script.min.js";

const { estraverse, escodegen, CoffeeScript } = window || global;

var _esutils, _esprima;

if (typeof define === "function" && define.amd) {
	define(["./thirdparty/esutils.js", "./thirdparty/esprima.js"], function (
		m1,
		m2
	) {
		_esutils = m1;
		_esprima = m2;
	});
} else {
	_esutils = window.esutils;
	_esprima = window.esprima;
}

export {
	_esutils as esutils,
	estraverse,
	_esprima as esprima,
	escodegen,
	CoffeeScript
};
