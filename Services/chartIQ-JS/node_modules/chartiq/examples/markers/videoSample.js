//
// This file contains functions which create a sample implementation of video markers by extending MarkersSample.
// This file depends on the markersSample.js file. There is a stylesheet which goes along with it as well.
//
import { CIQ, markers } from "../../js/standard.js";
import marker from "../../examples/markers/markersSample.js";
const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(
			/* webpackMode: "eager" */ "../../examples/markers/videoSample.css"
		).then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["../../examples/markers/videoSample.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(
			new URL("../../examples/markers/videoSample.css", import.meta.url).href,
			resolve
		);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, "videoSample")); // a framework, such as Angular, may require style addition
CIQ.activateImports(markers); // so we can inherit from nodeCreator
const MarkersSample = marker.MarkersSample;
document.addEventListener("play", onlyOneVideoPlaying, { capture: true });
MarkersSample.registerType("video", "showVideoMarkers");
MarkersSample.prototype.showVideoMarkers = function (label) {
	const { stx } = this;
	if (!stx.chart.dataSet.length) return;
	stx.addEvent(label, {
		retoggle: true,
		noStorage: true,
		processResults: (stx, error, series, data) => {
			if (error) return;
			// Loop through the data and create markers
			for (let record of data) {
				const datum = record.data;
				if (!datum || datum.category !== "video") continue;
				datum.type = series.id;
				datum.videoWidth = 340;
				CIQ.Marker({
					stx,
					label: series.id,
					xPositioner: "date",
					x: record.DT,
					node: new VideoMarkerNode(datum)
				});
			}
			stx.draw();
		},
		takedownResults: (stx, id) => {
			this.activeLabels = this.activeLabels.filter((label) => label != id);
			CIQ.Marker.removeByLabel(stx, id);
		}
	});
	return label;
};
function VideoMarkerNode({ category, url }) {
	const node = (this.node = document.createElement("div"));
	node.className = "stx-marker square";
	if (category) node.classList.add(category);
	const visual = CIQ.newChild(node, "div", "stx-visual");
	CIQ.newChild(node, "div", "stx-stem");
	const expand = createVideoExpandNode(url);
	node.append(expand);
	// node.addEventListener('click', nodeClicked);
	CIQ.safeClickTouch(node, nodeClicked);
	function nodeClicked({ target: el }) {
		const isVisual = el === visual;
		const isClose = el.classList.contains("ciq-close");
		let isVisible = node.classList.contains("highlight");
		const video = node.querySelector("video");
		if (isVisual || isClose) {
			node.classList.toggle("highlight");
			CIQ.Marker.positionContentVerticalAndHorizontal(node, true);
			if (isVisible) {
				video.pause();
			}
		}
		// autoplay video
		if (!video.firstClick) {
			setTimeout(() => {
				if (!video.firstClick) {
					video.firstClick = true;
					video.play();
				}
			}, 100); // estimating time of 100 ms to be able to start video
		}
	}
}
CIQ.inheritsFrom(VideoMarkerNode, CIQ.Marker.NodeCreator, false);
// creates node for marker content
function createVideoExpandNode(videoUrl) {
	const expand = document.createElement("div");
	expand.className = "stx-marker-video stx-marker-expand";
	const closeButton = document.createElement("div");
	closeButton.className = "ciq-icon ciq-close";
	expand.appendChild(closeButton);
	var video = document.createElement("video");
	if (video.canPlayType("video/mp4")) {
		video.setAttribute("src", videoUrl);
	}
	// Edge does not appear to respond to controls
	if (!/Edge/.test(navigator.userAgent)) {
		video.setAttribute("controls", "controls");
	}
	expand.appendChild(video);
	return expand;
}
let zIndex = 400;
function onlyOneVideoPlaying(e) {
	const video = e.target;
	video.parentElement.style.zIndex = zIndex++;
	Array.from(video.ownerDocument.querySelectorAll("video"))
		.filter((v) => v !== video)
		.forEach((v) => v.pause());
}
export default marker;
