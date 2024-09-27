//
// Sample market symbology file
// Customize this file if you need symbology definitions different from these default settings
//
import { CIQ } from "../../js/chartiq.js";
import {
	MarketDefinitionFeed,
	MarketDefinitionPromise
} from "../feeds/marketDefinitionFeed.js";
CIQ.Market = CIQ.Market || function () {};
CIQ.Market.MarketDefinitionFeed = MarketDefinitionFeed;
CIQ.Market.MarketDefinitionPromise = MarketDefinitionPromise;
CIQ.Market.Symbology = CIQ.Market.Symbology || function () {};
/**
 * Returns a configuration object if the symbol needs to retrieve its market definition from a network request.
 *
 * The config object must contain, at a minimum, the name of an APIClient endpoint.  It can optionally
 * contain extract and transform functions.  The extract function is called prior to calling the APIClient
 * endpoint and must return the configuration object that will be passed to APIClient.  The transform
 * function receives the raw API response and is responsible for parsing it and transforming it into the
 * ChartIQ cannonical form.
 *
 * @param {string} symbol The symbol for which to determine if a network request is needed.
 * @returns {Object|undefined} A configuration object containing information about the network request,
 * or `undefined` if the symbol is not API-backed.
 * @since TBD
 */
CIQ.Market.Symbology.isAPIBacked = function (symbol) {
	const definitionAPI =
		CIQ.Market.symbolMapping[symbol] ||
		CIQ.Market.Symbology.isAPIBacked.defaultAPI;
	return CIQ.Market.definitionAPIs[definitionAPI];
};
/**
 * Returns true if the instrument is foreign.
 * By default, if the instrument contains a period (.) it will be considered foreign (non US). (e.g. VOD.L)
 *
 * @param  {string}  symbol The symbol
 * @return {boolean}        True if it's a foreign symbol
 */
CIQ.Market.Symbology.isForeignSymbol = function (symbol) {
	if (!symbol) return false;
	return symbol.indexOf(".") != -1;
};
/**
 * Returns true if the instrument is a future.
 * By default, if the symbol begins with `/` it will be considered a future. (e.g. /C)
 *
 * @param  {string}  symbol The symbol
 * @return {boolean}        True if it's a futures symbol
 */
CIQ.Market.Symbology.isFuturesSymbol = function (symbol) {
	if (!symbol) return false;
	return symbol.length > 1 && symbol[0] == "/";
};
/**
 * Returns true if the instrument is a rate.
 * By default, if the symbol begins with `%` it will be considered a rate. (e.g. %Treasury)
 *
 * @param  {string}  symbol The symbol
 * @return {boolean}        True if it's a rate symbol
 */
CIQ.Market.Symbology.isRateSymbol = function (symbol) {
	if (!symbol) return false;
	return symbol.length > 1 && symbol[0] == "%";
};
/**
 * Returns true if the instrument is a forex symbol.
 * By default, if the symbol begins with `^` and is followed by 6 alpha characters, or just 6 alpha characters long without a '^', it will be considered forex.(e.g. ^EURUSD)
 *
 * @param  {string}  symbol The symbol
 * @return {boolean}        True if it's a forex symbol
 */
CIQ.Market.Symbology.isForexSymbol = function (symbol) {
	if (!symbol) return false;
	if (CIQ.Market.Symbology.isForeignSymbol(symbol)) return false;
	if (CIQ.Market.Symbology.isFuturesSymbol(symbol)) return false;
	if (symbol.length < 6 || symbol.length > 7) return false;
	if (symbol.length == 6 && symbol[5] == "X") return false; // This is a fund of some sort
	if (/\^?[A-Za-z]{6}/.test(symbol)) return true;
	return false;
};
/**
 * Returns true if the symbol is a metal/currency or currency/metal pair
 * By default, it must be a forex for a precious metal. (e.g. ^XAUUSD - looks for XAU,XPD,XPT,XAG only)
 *
 * @param  {string}   symbol The symbol
 * @param  {boolean}  inverse Set to true to test specifically for a currency/metal pair (e.g. EURXAU, but not XAUEUR).
 * @return {boolean}  True if it's a metal symbol
 */
CIQ.Market.Symbology.isForexMetal = function (symbol, inverse) {
	const metalsSupported = {
		XAU: true,
		XAG: true,
		XPT: true,
		XPD: true
	};
	if (!symbol) return false;
	if (!CIQ.Market.Symbology.isForexSymbol(symbol)) return false;
	if (symbol.charAt(0) != "^") symbol = "^" + symbol;
	if (
		!metalsSupported[symbol.substring(1, 4)] &&
		metalsSupported[symbol.substring(4, 7)]
	)
		return true;
	else if (
		!inverse &&
		metalsSupported[symbol.substring(1, 4)] &&
		!metalsSupported[symbol.substring(4, 7)]
	)
		return true;
	return false;
};
/**
 * Returns true if the symbol is a cryptocurrency pair
 *
 * @param  {string}   symbol The symbol
 * @return {boolean}  True if it's a crypto symbol
 */
CIQ.Market.Symbology.isForexCrypto = function (symbol) {
	const cryptosSupported = {
		BTC: true,
		ETH: true,
		XLM: true,
		LTC: true,
		ETC: true,
		XRP: true,
		ADA: true,
		BNB: true
	};
	if (!symbol) return false;
	if (!CIQ.Market.Symbology.isForexSymbol(symbol)) return false;
	if (symbol.charAt(0) != "^") symbol = "^" + symbol;
	return (
		cryptosSupported[symbol.substring(1, 4)] ||
		cryptosSupported[symbol.substring(4, 7)]
	);
};
/**
 * Returns the market definition of a symbolObject.
 *
 * @param  {object} symbolObject Symbol object of form accepted by {@link CIQ.ChartEngine#loadChart}
 * @return {object} A market definition. See {@link CIQ.Market} for instructions.
 * @throws {MarketDefinitionPromise} If the symbol's associated market is API-backed and is not ready.
 *
 * @since TBD API-backed symbols will throw to allow callers to restart after update.
 * @since 8.4.0 Foreign symbols now get a 24/5 market definition, while cryptocurrencies get a 24/7 one.
 */
CIQ.Market.Symbology.factory = function (symbolObject) {
	let market_def = CIQ.Market.NYSE;
	const symbol = symbolObject.symbol;
	if (CIQ.Market.Symbology.isForeignSymbol(symbol))
		market_def = CIQ.Market.GENERIC_5DAY;
	else if (CIQ.Market.Symbology.isFuturesSymbol(symbol))
		market_def = CIQ.Market.GLOBEX;
	else if (CIQ.Market.Symbology.isForexCrypto(symbol))
		market_def = null; // 24 hour market definition
	else if (CIQ.Market.Symbology.isForexMetal(symbol))
		market_def = CIQ.Market.METALS;
	else if (CIQ.Market.Symbology.isForexSymbol(symbol))
		market_def = CIQ.Market.FOREX;
	const symbolAPI = CIQ.Market.Symbology.isAPIBacked(symbol);
	if (symbolAPI) {
		if (MarketDefinitionFeed[symbol]) {
			return MarketDefinitionFeed[symbol];
		}
		const inFlight = MarketDefinitionPromise[symbol];
		if (inFlight) {
			throw inFlight;
		}
		const marketDefinition = new MarketDefinitionFeed(CIQ, symbol);
		marketDefinition.endpoint = symbolAPI.endpoint;
		marketDefinition.extract = symbolAPI.extract;
		marketDefinition.transform = symbolAPI.transform;
		throw new MarketDefinitionPromise(symbol, marketDefinition, market_def);
	}
	return market_def;
};
/**
 * Encodes the string identifier for an instrument in a term structure chart.
 *
 * @param  {string} entity The symbol/entity for the curve; for example, "US-T BENCHMARK".
 * @param  {string} instrument An individual instrument; for example, "20 YR".
 * @return {string} The symbol for the individual instrument; for example, "US-T BENCHMARK 20 YR".
 */
CIQ.Market.Symbology.encodeTermStructureInstrumentSymbol = function (
	entity,
	instrument
) {
	if (entity[0] === "%") entity = entity.slice(1);
	return entity + " " + instrument;
};
export { CIQ };
