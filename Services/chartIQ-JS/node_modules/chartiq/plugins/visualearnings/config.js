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


export default {
	markup: `<cq-menu class="nav-dropdown stx-visualearnings alignright" reader="Visual Earnings" config="estimize" icon tooltip="Visual Earnings"></cq-menu>`,
	markupOld: `
<cq-menu class="ciq-menu stx-visualearnings collapse">
	<span></span>
	<cq-menu-dropdown>
	  <cq-menu-container cq-name="menuEstimize"></cq-menu-container>
	</cq-menu-dropdown>
</cq-menu>
`,
	menu: {
		content: [
			{
				type: "switch",
				label: "Price Horizon: EPS",
				setget: "Layout.VisualEarningsFlag",
				value: "ph_eps"
			},
			{
				type: "switch",
				label: "Price Horizon: REV",
				setget: "Layout.VisualEarningsFlag",
				value: "ph_rev"
			},
			{
				type: "switch",
				label: "Historical",
				setget: "Layout.VisualEarningsFlag",
				value: "ph_historical"
			},
			{
				type: "item",
				label: "Miss/Beat: EPS",
				tap: "VisualEarnings.toggle",
				value: "earnings"
			},
			{
				type: "item",
				label: "Miss/Beat: REV",
				tap: "VisualEarnings.toggle",
				value: "revenue"
			},
			{
				type: "item",
				label: "Data Table",
				tap: "VisualEarnings.toggle",
				value: "data"
			}
		]
	},
	menuOld: [
		{
			type: "checkbox",
			label: "Price Horizon: EPS",
			cmd: "Layout.VisualEarningsFlag('ph_eps')"
		},
		{
			type: "checkbox",
			label: "Price Horizon: REV",
			cmd: "Layout.VisualEarningsFlag('ph_rev')"
		},
		{
			type: "checkbox",
			label: "Historical",
			cmd: "Layout.VisualEarningsFlag('ph_historical')"
		},
		{
			type: "item",
			label: "Miss/Beat: EPS",
			cmd: "VisualEarnings.toggle('earnings')"
		},
		{
			type: "item",
			label: "Miss/Beat: REV",
			cmd: "VisualEarnings.toggle('revenue')"
		},
		{ type: "item", label: "Data Table", cmd: "VisualEarnings.toggle('data')" }
	]
};
