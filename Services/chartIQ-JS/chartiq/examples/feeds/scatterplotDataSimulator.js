import { CIQ } from "../../js/chartiq.js";
import quotefeed from "./quoteFeedSimulator.js";
// prettier-ignore
const seedData = {
	"Client 1": {name: "Beatles & Sons", portfolio: "A", touchpoints: 25, score: 13.09294, tcv: 450},
	"Client 2": {name: "Led Zeppelin Holdings", portfolio: "A", touchpoints: 40, score: 4.27148, tcv: 200},
	"Client 3": {name: "Queen Wholesale", portfolio: "B", touchpoints: 90, score: 4.14696, tcv: 3555},
	"Client 4": {name: "Pink Floyd Trading", portfolio: "B", touchpoints: 167, score: 6.01689, tcv: 916},
	"Client 5": {name: "Rolling Stones International", portfolio: "C", touchpoints: 245, score: 23.84789, tcv: 3029},
	"Client 6": {name: "AC/DC America", portfolio: "C", touchpoints: 208, score: 11.89953, tcv: 1395},
	"Client 7": {name: "Eagles Inc", portfolio: "A", touchpoints: 208, score: 8.59312, tcv: 903},
	"Client 8": {name: "Metallica Brokerage", portfolio: "A", touchpoints: 14, score: 3.62230, tcv: 100},
	"Client 9": {name: "Guns N' Roses & Co", portfolio: "C", touchpoints: 23, score: 17.87604, tcv: 8446},
	"Client 10": {name: "Aerosmith Partners", portfolio: "A", touchpoints: 59, score: 1.31492, tcv: 77},
	"Client 11": {name: "Fleetwood Mac LLC", portfolio: "B", touchpoints: 245, score: 6.95966, tcv: 8088},
	"Client 12": {name: "Linkin Park & Associates", portfolio: "B", touchpoints: 0, score: 10.35688, tcv: null},
	"Client 13": {name: "Red Hot Chili Peppers Ltd", portfolio: "B", touchpoints: 230, score: 50.50764, tcv: 1332},
	"Client 14": {name: "Maroon 5 Group", portfolio: "A", touchpoints: 265, score: 46.35886, tcv: 2623},
	"Client 15": {name: "Bon Jovi Financial", portfolio: "A", touchpoints: 46, score: 42.23528, tcv: 416},
};
function getTrailSimulator({
	data = seedData,
	dataStoreName = "DataSet"
} = {}) {
	function formatChartData(response, symbol) {
		const feeddata = JSON.parse(response);
		const newQuotes = [];
		for (let i = 0; i < feeddata.length; i++) {
			const newQuote = {};
			newQuote.DT = new Date(feeddata[i].DT); // DT is a string in ISO format, make it a Date instance
			newQuote[dataStoreName] = randomize(data);
			newQuotes.push(newQuote);
		}
		return newQuotes;
	}
	function randomize(sample) {
		return Object.entries(sample).reduce((acc, [key, value]) => {
			const newValue = { ...value };
			newValue.score += Math.round(CIQ.random() * 5);
			newValue.touchpoints += Math.round(CIQ.random() * 30);
			newValue.tcv += Math.round(CIQ.random() * 2000);
			return { ...acc, [key]: newValue };
		}, {});
	}
	return { ...quotefeed, formatChartData };
}
const qf = getTrailSimulator();
export { qf as default, getTrailSimulator };
