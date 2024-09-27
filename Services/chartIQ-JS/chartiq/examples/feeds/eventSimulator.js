// -------------------------------------------------------------------------------------------
// Copyright © 2023 S&P Global All rights reserved
// -------------------------------------------------------------------------------------------
// SAMPLE QUOTEFEED IMPLEMENTATION -- Hardcoded Events
///////////////////////////////////////////////////////////////////////////////////////////////////////////
let eventFeed = {};
// local, non-dependent implementation of XmlHttpRequest
eventFeed.postAjax = (url, cb) => {
	if (!url) return cb(null);
	const server = new XMLHttpRequest();
	url += (url.indexOf("?") === -1 ? "?" : "&") + new Date().getTime();
	server.open("GET", url);
	server.onload = function () {
		cb(this.status, this.responseText);
	};
	server.onerror = function () {
		cb(500);
	};
	server.send();
};
eventFeed.url = null; //"https://events.chartiq.com/datafeed";
eventFeed.fetchInitialData = function (
	eventId,
	suggestedStartDate,
	suggestedEndDate,
	params,
	cb
) {
	const queryUrl =
		this.url &&
		this.url +
			"?identifier=" +
			eventId +
			"&startdate=" +
			suggestedStartDate.toISOString() +
			"&enddate=" +
			suggestedEndDate.toISOString();
	const handler = (status, response) => {
		if (status === null)
			response = this.generateData(
				eventId,
				suggestedStartDate,
				suggestedEndDate
			);
		const newQuotes = this.formatData(response, eventId);
		cb({
			quotes: newQuotes,
			moreAvailable: true,
			beginDate: suggestedStartDate,
			attribution: { source: "eventsim", exchange: "" }
		}); // return fetched data (and set moreAvailable)
	};
	this.postAjax(queryUrl, handler);
};
eventFeed.fetchUpdateData = function (eventId, startDate, params, cb) {
	startDate = new Date(+startDate + 1);
	const queryUrl =
		this.url &&
		this.url +
			"?identifier=" +
			eventId +
			"&startdate=" +
			startDate.toISOString();
	const handler = (status, response) => {
		if (status === null)
			response = this.generateData(eventId, startDate, new Date());
		const newQuotes = this.formatData(response, eventId);
		cb({
			quotes: newQuotes,
			attribution: { source: "eventsim", exchange: "" }
		}); // return fetched data (and set moreAvailable)
	};
	this.postAjax(queryUrl, handler);
};
eventFeed.fetchPaginationData = function (
	eventId,
	suggestedStartDate,
	endDate,
	params,
	cb
) {
	const queryUrl =
		this.url &&
		this.url +
			"?identifier=" +
			eventId +
			"&startdate=" +
			suggestedStartDate.toISOString() +
			"&enddate=" +
			endDate.toISOString();
	const handler = (status, response) => {
		if (status === null)
			response = this.generateData(eventId, suggestedStartDate, endDate);
		const newQuotes = this.formatData(response, eventId);
		cb({
			quotes: newQuotes,
			moreAvailable: suggestedStartDate.getTime() > 0,
			upToDate: endDate.getTime() > Date.now(),
			beginDate: suggestedStartDate,
			attribution: { source: "eventsim", exchange: "" }
		}); // return fetched data (and sdataet moreAvailable)
	};
	this.postAjax(queryUrl, handler);
};
eventFeed.formatData = (response, eventId) => {
	// process remote response here
	const data = [];
	response.forEach((item) => {
		const datum = {};
		datum.DT = item.DT;
		datum.data = item.data;
		data.push(datum);
	});
	return data;
};
eventFeed.generateData = (eventId, start, end) => {
	if (["square", "circle", "callout"].includes(eventId))
		return generateCorpActionData(start, end);
	else if (["video"].includes(eventId))
		return generateMultimediaData(start, end);
	else if (["trade"].includes(eventId)) return generateTradeData(start, end);
	return [];
};
function generateCorpActionData(start, end) {
	const data = [];
	const DT = new Date(end.getTime());
	DT.setDate(DT.getDate() - DT.getDay() + 5);
	DT.setHours(0, 0, 0);
	DT.setMilliseconds(0);
	const categories = [
		"news",
		"earningsUp",
		"earningsDown",
		"dividend",
		"filing",
		"split"
	];
	const headlines = [
		"a News Item",
		"Earnings (+)",
		"Earnings (-)",
		"Dividends",
		"a Filing",
		"a Split"
	];
	let i = 0;
	while (DT > end) DT.setDate(DT.getDate() - 14);
	while (DT >= start) {
		data.push({
			DT: new Date(DT),
			data: {
				id: DT.toISOString(),
				group: null,
				sequence: 1,
				final: true,
				timestamp: new Date(DT),
				category: categories[i],
				headline: "This is a Marker for " + headlines[i],
				story: null,
				source: "eventsim simulator",
				value: null,
				size: null,
				url: null,
				image: null
			}
		});
		if (i === headlines.length - 1) break; // remove for repeating events
		i = (i + 1) % categories.length;
		DT.setDate(DT.getDate() - 14);
	}
	return data.reverse();
}
function generateMultimediaData(start, end) {
	const data = [];
	const DT = new Date(end.getTime());
	DT.setDate(DT.getDate() - DT.getDay() + 5);
	DT.setHours(0, 0, 0);
	DT.setMilliseconds(0);
	const records = [
		{
			category: "video",
			headline: "Interview",
			url: "https://embed-ssl.wistia.com/deliveries/d1aa8163948cdcc3d01a0ccda618e4a91dbff03c.bin"
		},
		{
			category: "video",
			headline: "Utilizing Studies",
			url: "https://embed-ssl.wistia.com/deliveries/3bebd8d93f5d1cd878e63037fc1294d7116d93e4.bin"
		},
		{
			category: "video",
			headline: "Smart Zoom",
			url: "https://embed-ssl.wistia.com/deliveries/68f205d2284792be162071c853c4af0a.bin"
		},
		{
			category: "video",
			headline: "Drawing Tools",
			url: "https://embed-ssl.wistia.com/deliveries/4048329c0ded7972445032db0372e0bdb268c78d.bin"
		},
		{
			category: "video",
			headline: "Time Span Events",
			url: "https://embed-ssl.wistia.com/deliveries/46685ec00a9d3ab4bdcadd1391cf1f91.bin"
		}
	];
	while (DT > end) DT.setDate(DT.getDate() - 14);
	while (DT >= start) {
		for (let record of records) {
			data.push({
				DT: new Date(DT),
				data: {
					id: DT.toISOString(),
					group: null,
					sequence: 1,
					final: true,
					timestamp: new Date(DT),
					category: record.category,
					headline: record.headline,
					story: record.story,
					source: "eventsim simulator",
					value: null,
					size: null,
					url: record.url,
					image: record.image
				}
			});
			DT.setDate(DT.getDate() - 28);
			if (DT < start) break;
		}
		break; // remove for repeating events
	}
	return data.reverse();
}
function generateTradeData(start, end) {
	let data = [];
	const DT = new Date(end.getTime());
	DT.setDate(DT.getDate() - DT.getDay() + 5);
	DT.setHours(0, 0, 0);
	DT.setMilliseconds(0);
	while (DT > end) DT.setDate(DT.getDate() - 28);
	while (DT >= start) {
		let tempData = [],
			i = 30,
			final = true;
		const grp = Date.now(); // quasi-uniqueness
		while (i) {
			DT.setDate(DT.getDate() - 2);
			if (DT.getDay() % 6 === 0) continue;
			i--;
			tempData.push({
				DT: new Date(DT),
				data: {
					id: `${grp}---${DT.toISOString()}`,
					group: grp,
					sequence: i + 1,
					final,
					timestamp: new Date(DT),
					category: "trade",
					headline: "execution",
					story: null,
					source: "eventsim simulator",
					value: (100 + 5 * Math.random()).toFixed(2),
					size: Math.ceil(Math.random() * 10) * 100,
					url: null,
					image: null
				}
			});
			final = false;
		}
		let popped = 0;
		while (DT < start) {
			tempData.pop();
			if (!tempData.length) break;
			DT.setTime(+tempData[tempData.length - 1].DT);
			popped++;
		}
		if (popped) {
			for (let r of tempData) r.data.sequence -= popped;
		}
		data = data.concat(tempData);
		DT.setDate(DT.getDate() - 28);
		break; // remove for repeating events
	}
	return data.reverse();
}
export default eventFeed;
