
const _exports = typeof window !== "undefined" ? window : global;

const CIQ = _exports.CIQ;
/*
 *	Governor rate limits calls to a given key
 *
 *	Can be configured to throttle calls to a maximum per second, minute, hour, or day.
 *	Return value is boolean indicating if the call is allowed
 */
function Governor(key, rate, period = "second") {
	const throttleInterval = (() => {
		let interval;
		switch (period) {
			case "minute":
				interval = 60000;
				break;
			case "hour":
				interval = 3600000;
				break;
			case "day":
				interval = 86400000;
				break;
			case "second":
			default:
				interval = 1000;
		}
		return Math.round(interval / rate);
	})();
	Object.defineProperty(Governor, key, {
		get: function cache() {
			const now = Date.now();
			const elapsed = now - (cache.last || 0);
			const open = elapsed >= throttleInterval;
			if (open) {
				cache.last = now;
			}
			return open;
		}
	});
}
/*
 * A client object that is bound to a set of endpoints
 */
export default function APIClientFactory(registry) {
	if (!new.target) {
		return new APIClientFactory(registry);
	}
	if (APIClientFactory.instance !== undefined) {
		return APIClientFactory.instance;
	}
	const interpolate = function interpolator(model, template = "") {
		if (template instanceof Object) {
			const interpolated = template instanceof Array ? [] : {};
			for (const o in template) {
				interpolated[o] = interpolator(model, template[o]);
			}
			return interpolated;
		}
		if (typeof template !== "string") {
			return template;
		}
		return template.replace(/\{\{(.+?)\}\}/g, function (_match, br) {
			const val = model[br] || "";
			if (val instanceof Object) {
				return JSON.stringify(val);
			}
			return encodeURI(val);
		});
	};
	const client = {
		get: function (entry, config) {
			const req = new XMLHttpRequest();
			const timeout = config.timeout || entry.timeout || 0;
			req.open(entry.method, interpolate(config, entry.url));
			Object.entries(entry.headers || {}).forEach(([header, value]) => {
				req.setRequestHeader(header, interpolate(config, value));
			});
			req.onload = function () {
				config.success(req.response);
			};
			req.onerror = function (e) {
				config.failure(e);
			};
			if (timeout > 0) {
				req.timeout = timeout;
				req.ontimeout = function (e) {
					config.failure(e);
				};
			}
			req.send();
		},
		post: function (entry, config) {
			const req = new XMLHttpRequest();
			const timeout = config.timeout || entry.timeout || 0;
			req.open(entry.method, interpolate(config, entry.url));
			Object.entries(entry.headers || {}).forEach(([header, value]) => {
				req.setRequestHeader(header, interpolate(config, value));
			});
			req.onload = function () {
				config.success(req.response);
			};
			req.onerror = function (e) {
				config.failure(e);
			};
			if (timeout > 0) {
				req.timeout = timeout;
				req.ontimeout = function (e) {
					config.failure(e);
				};
			}
			let payload;
			if (typeof entry.body === "object") {
				payload = JSON.stringify(interpolate(config, entry.body));
			} else {
				payload = entry.body;
			}
			req.send(payload);
		},
		fetch: async function (entry, config) {
			try {
				const response = await fetch(interpolate(config, entry.url), {
					method: entry.fetchMethod,
					headers: Object.entries(entry.headers || {}).reduce((acc, [k, v]) => {
						acc[k] = v;
						return acc;
					}, {}),
					body: interpolate(config, entry.body)
				});
				config.success(response);
			} catch (e) {
				config.failure(e);
			}
		}
	};
	Object.keys(registry).forEach((key) => {
		const entry = registry[key];
		if (entry.rate) {
			Governor(key, entry.rate, entry.period);
		}
		Object.defineProperty(this, key, {
			enumerable: true,
			value: function (config) {
				return new Promise((res, rej) => {
					if (config.success === undefined) {
						config.success = (resp) => {
							res(resp);
						};
						config.failure = (err) => {
							rej(err);
						};
					} else {
						res("Using provided callback");
					}
					if (Governor[key] === false) {
						const msg = `Call to ${key} throttled`;
						config.failure(msg);
						return;
					}
					client[entry.method].call(this, entry, config);
				});
			}
		});
	});
	Object.defineProperty(APIClientFactory, "instance", {
		value: this
	});
}
if (CIQ === undefined) {
	// is running in karma
	_exports.clientFactory = APIClientFactory;
} else {
	CIQ.clientFactory = APIClientFactory;
}
