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
	resistance3: {
		description: "The third line of resistance",
		trend: {
			bullish: " and preference target.",
			bearish: " and alternative target."
		}
	},
	resistance2: {
		description: "The second line of resistance",
		trend: {
			bullish: " and preference target.",
			bearish: " and alternative target."
		}
	},
	resistance1: {
		description: "The first line of resistance",
		trend: {
			bullish: " and preference target.",
			bearish: "-- should not be displayed --"
		}
	},
	pivot: {
		description: "The pivot",
		trend: {
			bullish:
				" and first line of support. Look to preference in resistance or look to alternative in support.",
			bearish:
				" and first line of resistance. Look to preference in support or look to alternative in resistance."
		}
	},
	support1: {
		description: "The first line of support",
		trend: {
			bullish: "-- should not be displayed --",
			bearish: " and preference target."
		}
	},
	support2: {
		description: "The second line of support",
		trend: {
			bullish: " and alternative target.",
			bearish: " and preference target."
		}
	},
	support3: {
		description: "The third line of support",
		trend: {
			bullish: " and alternative target.",
			bearish: " and preference target."
		}
	}
};
