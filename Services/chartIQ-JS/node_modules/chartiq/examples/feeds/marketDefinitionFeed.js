// -------------------------------------------------------------------------------------------
// Copyright © 2024 S&P Global All rights reserved
// -------------------------------------------------------------------------------------------
// SAMPLE MARKET DEFINITION FEED IMPLEMENTATION -- A self-updating Market Definition object
///////////////////////////////////////////////////////////////////////////////////////////////////////////
import apiRegistry from "../api/apiRegistry.js";
import clientFactory from "../api/apiClient.js";
const client = clientFactory(apiRegistry);
/**
 * A self-updating Market Definition object.
 * @constructor
 * @param {Object} CIQ - The main library namespace.
 * @param {String} symbol - The symbol for which this is the market definition.
 * @returns {Object} A polling market definition object.
 */
export function MarketDefinitionFeed(CIQ, symbol) {
	if (!new.target) {
		return new MarketDefinitionFeed(...arguments);
	}
	if (MarketDefinitionFeed[symbol] !== undefined) {
		return MarketDefinitionFeed[symbol];
	}
	let market_def = {};
	const pollingInterval = 3600000;
	const errorPollingInt = 600000;
	let TTL = 0;
	Object.defineProperties(this, {
		name: {
			enumerable: true,
			get: function () {
				return market_def.name || "no market name specified";
			}
		},
		market_tz: {
			enumerable: true,
			get: function () {
				return market_def.market_tz;
			}
		},
		hour_aligned: {
			enumerable: true,
			get: function () {
				return market_def.hour_aligned;
			}
		},
		convertOnDaily: {
			enumerable: true,
			get: function () {
				return market_def.convertOnDaily;
			}
		},
		beginningDayOfWeek: {
			enumerable: true,
			get: function () {
				return market_def.beginningDayOfWeek;
			}
		},
		normal_daily_open: {
			enumerable: true,
			get: function () {
				return market_def.normal_daily_open;
			}
		},
		normal_daily_close: {
			enumerable: true,
			get: function () {
				return market_def.normal_daily_close;
			}
		},
		minimum_session_length: {
			enumerable: true,
			get: function () {
				return market_def.minimum_session_length;
			}
		},
		rules: {
			enumerable: true,
			get: function () {
				return market_def.rules;
			}
		}
	});
	const pollingMarketDef = new Proxy(this, {
		get: function (target, prop, receiver) {
			if (Object.keys(this).includes(prop) && Date.now() >= TTL) {
				pollingMarketDef.update();
			}
			return Reflect.get(target, prop, receiver);
		}
	});
	Object.defineProperties(pollingMarketDef, {
		endpoint: {
			value: "marketDefinition",
			writable: true
		},
		extract: {
			value: undefined,
			writable: true
		},
		load: {
			value: function (newMarketDef) {
				if (
					[
						"name",
						"hour_aligned",
						"normal_daily_open",
						"normal_daily_close",
						"rules"
					].every((key) => Object.keys(newMarketDef).includes(key))
				) {
					market_def = newMarketDef;
				} else {
					throw new Error("Can't load market def: new definition is invalid");
				}
			}
		},
		transform: {
			value: undefined,
			writable: true
		},
		update: {
			value: async function () {
				try {
					const config = pollingMarketDef.extract
						? await pollingMarketDef.extract(symbol)
						: {};
					const response = await client[pollingMarketDef.endpoint](config);
					const newDef = pollingMarketDef.transform
						? pollingMarketDef.transform(response)
						: JSON.parse(response);
					pollingMarketDef.load(newDef);
					TTL = Date.now() + pollingInterval;
				} catch (e) {
					console.error("MarketDefFeed update error");
					setTimeout(pollingMarketDef.update, errorPollingInt);
					throw new Error(e);
				}
			}
		}
	});
	// clean cache
	const activeSymbols = CIQ.ChartEngine.registeredContainers.flatMap(
		(container) =>
			container.stx.getSymbols({
				"include-parameters": true
			})
	);
	const activeDefinitions = MarketDefinitionFeed.cache;
	const orphans = activeDefinitions.filter(
		(symbol) => !activeSymbols.some((activeSymbol) => activeSymbol === symbol)
	);
	orphans.forEach(MarketDefinitionFeed.purge);
	while (activeDefinitions.length >= MarketDefinitionFeed.MAX_CACHED) {
		const dead = activeDefinitions.shift();
		delete MarketDefinitionFeed[dead];
	}
	return pollingMarketDef;
}
Object.defineProperties(MarketDefinitionFeed, {
	cache: {
		value: []
	},
	MAX_CACHED: {
		value: 10,
		writable: true
	},
	purge: {
		value: function (symbol) {
			const activeDefinitions = MarketDefinitionFeed.cache;
			if (symbol === undefined) {
				activeDefinitions.forEach(
					(symbol) => delete MarketDefinitionFeed[symbol]
				);
				activeDefinitions.splice(0, activeDefinitions.length);
			} else {
				activeDefinitions.splice(activeDefinitions.indexOf(symbol), 1);
				delete MarketDefinitionFeed[symbol];
			}
		}
	}
});
/**
 * A custom promise for market definition updates
 * @constructor
 * @param {String} symbol - The symbol for which this promise is updating a MarketDefinitionFeed.
 * @param {Object} marketDefinitionFeed - The market definition feed object to be updated.
 * @param {Object} fallbackDefinition - The fallback market definition object.
 * @returns {Promise} A promise object for market definition.
 */
export function MarketDefinitionPromise(
	symbol,
	marketDefinitionFeed,
	fallbackDefinition
) {
	if (!new.target) {
		return new MarketDefinitionPromise(...arguments);
	}
	if (MarketDefinitionPromise[symbol]) {
		return MarketDefinitionPromise[symbol];
	}
	if (MarketDefinitionFeed[symbol]) {
		return Promise.resolve(MarketDefinitionFeed[symbol]);
	}
	const promise = new Promise(async (res) => {
		try {
			await marketDefinitionFeed.update();
		} catch (e) {
			console.error(e);
			console.warn(
				"Initial update of Market definition failed; falling back to file"
			);
			marketDefinitionFeed.load(fallbackDefinition);
		} finally {
			delete MarketDefinitionPromise[symbol];
			// cache the new instance
			MarketDefinitionFeed.cache.push(symbol);
			Object.defineProperty(MarketDefinitionFeed, symbol, {
				configurable: true,
				value: marketDefinitionFeed
			});
			res(marketDefinitionFeed);
		}
	});
	Object.setPrototypeOf(promise, MarketDefinitionPromise.prototype);
	MarketDefinitionPromise[symbol] = promise;
	return promise;
}
MarketDefinitionPromise.prototype = Object.create(Promise.prototype);
MarketDefinitionPromise.prototype.constructor = MarketDefinitionPromise;
