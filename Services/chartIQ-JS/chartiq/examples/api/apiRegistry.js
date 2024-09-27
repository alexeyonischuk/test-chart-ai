/**
 * Registry object containing specifications for API endpoints.
 * Developers can add entries to this registry to define new API endpoints.  Placeholders can be used for dynamic values, enclosed in double curly braces.
 * @typedef {Object} Registry
 * @property {Object} endpointName - The specification for an API endpoint.  This name will become the name of the client method.
 * @property {string} endpointName.url - The URL of the endpoint.
 * @property {string} endpointName.method - The internal client method of the endpoint.  By default, the client supports "get", "post", "put", "delete", and "fetch".  If "fetch" then an additional property "fetchMethod" is needed.
 * @property {string} [endpointName.fetchMethod] - The fetch method used for the request (e.g., 'get', 'post'). Optional.
 * @property {Object.<string, string>} [endpointName.headers] - The headers for the endpoint.  Each key-value pair represents a header, with placeholders enclosed in double curly braces for dynamic values.  Optional.
 * @property {Object} [endpointName.body] - The body of the request.  Optional.
 * @property {number} [endpointName.timeout] - The timeout duration for the request in milliseconds.  If omitted, call will not timeout in the client.  Optional.
 * @property {number} [endpointName.rate] - The number of calls per period.  Optional.
 * @property {string} [endpointName.period] - The time period for the rate limit (e.g., 'minute', 'hour').  Optional.
 * @example
 * const registry = {
 *   exampleAPI: {
 *     url: "http://example.com/path/{{pathParam}}",
 *     method: "post",
 *     headers: {
 *       "x-custom": "{{customHeader}}"
 *     }
 *   }
 * };
 *
 * // Example usage:
 * import apiRegistry from "../api/apiRegistry.js";
 * import clientFactory from "../api/apiClient.js";
 * const client = clientFactory(apiRegistry);
 * client.exampleAPI({
 *   pathParam: "dynamic-path",
 *   customHeader: "header data"
 * });
 */
const apiRegistry = Object.freeze({
	marketDefinition: {
		url: "http://localhost:3000/marketdef/{{symbol}}",
		method: "get",
		headers: {}
	}
});
export default apiRegistry;
