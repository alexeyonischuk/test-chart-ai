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


import { CIQ as _CIQ } from "../../js/chartiq.js";


let __js_standard_i18n_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Sets the locale for the charts.
 *
 * Do not call this method directly. Instead use {@link CIQ.I18N.setLocale} or {@link CIQ.I18N.localize}
 *
 * If set, display prices and dates will be displayed in localized format.
 * The locale should be a valid [IANA locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
 * For instance `de-AT` represents German as used in Austria.
 *
 * Localization in the library is supported through the `Intl object` which is a [W3 standard](https://www.w3.org/International/articles/language-tags/)  supported by all modern browsers.
 *
 * Once a locale is set, `stxx.internationalizer` will be an object that will contain several Intl formatters.
 *
 * These are the default date and time formats:
 * - stxx.internationalizer.hourMinute=new Intl.DateTimeFormat(this.locale, {hour:"numeric", minute:"numeric", hourCycle:"h23"});
 * - stxx.internationalizer.hourMinuteSecond=new Intl.DateTimeFormat(this.locale, {hour:"numeric", minute:"numeric", second:"numeric", hourCycle:"h23"});
 * - stxx.internationalizer.mdhm=new Intl.DateTimeFormat(this.locale, {year:"2-digit", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit"});
 * - stxx.internationalizer.monthDay=new Intl.DateTimeFormat(this.locale, {month:"numeric", day:"numeric"});
 * - stxx.internationalizer.yearMonthDay=new Intl.DateTimeFormat(this.locale, {year:"numeric", month:"numeric", day:"numeric"});
 * - stxx.internationalizer.yearMonth=new Intl.DateTimeFormat(this.locale, {year:"numeric", month:"numeric"});
 * - stxx.internationalizer.month=new Intl.DateTimeFormat(this.locale, {month:"short"});
 *
 * These can be overridden manually if the specified format is not acceptable. See example.
 * Also see [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) for formatting alternatives
 *
 * @param {string} locale A valid [IANA locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 * @param {number} [maxDecimals] maximum number of decimal places to allow on number conversions. Defaults to 5. Please note that this will supersede any defaults set in {@link CIQ.ChartEngine.YAxis#maxDecimalPlaces} or {@link CIQ.ChartEngine.YAxis#decimalPlaces}
 * @memberof CIQ.ChartEngine
 * @since 3.0.0 Added `maxDecimals` parameter.
 * @example
 * // override time formatting to enable 12 hour clock (hour12:true)
 * CIQ.I18N.setLocale(stxx, "en");
 * stxx.internationalizer.hourMinute=new Intl.DateTimeFormat(this.locale, {hour:"numeric", minute:"numeric", hour12:true});
 * stxx.internationalizer.hourMinuteSecond=new Intl.DateTimeFormat(this.locale, {hour:"numeric", minute:"numeric", second:"numeric", hour12:true});
 * @example
 * // override formatting to dislay 'Sep 15' insted of '9/15' on x-axis labels.
 * CIQ.I18N.setLocale(stxx, "en");
 * stxx.internationalizer.monthDay=new Intl.DateTimeFormat(this.locale, {month:"short", day:"numeric"});
 * @private
 */
CIQ.ChartEngine.prototype.setLocale = function (locale, maxDecimals) {
	if (typeof Intl == "undefined") return;
	if (this.locale != locale) {
		this.locale = locale;
	} else {
		return;
	}
	var i,
		internationalizer = (this.internationalizer = {});
	internationalizer.hourMinute = new Intl.DateTimeFormat(this.locale, {
		hour: "numeric",
		minute: "numeric",
		hourCycle: "h23"
	});
	internationalizer.hourMinuteSecond = new Intl.DateTimeFormat(this.locale, {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hourCycle: "h23"
	});
	internationalizer.mdhm = new Intl.DateTimeFormat(this.locale, {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	});
	internationalizer.monthDay = new Intl.DateTimeFormat(this.locale, {
		month: "numeric",
		day: "numeric"
	});
	internationalizer.yearMonthDay = new Intl.DateTimeFormat(this.locale, {
		year: "numeric",
		month: "numeric",
		day: "numeric"
	});
	internationalizer.yearMonth = new Intl.DateTimeFormat(this.locale, {
		year: "numeric",
		month: "numeric"
	});
	internationalizer.month = new Intl.DateTimeFormat(this.locale, {
		month: "short"
	});
	internationalizer.numbers = new Intl.NumberFormat(this.locale);
	internationalizer.priceFormatters = [];
	if (!maxDecimals) maxDecimals = 8;
	for (i = 0; i < maxDecimals + 1; i++) {
		internationalizer.priceFormatters.push(
			new Intl.NumberFormat(this.locale, {
				maximumFractionDigits: i,
				minimumFractionDigits: i
			})
		);
	}
	// minification efficient generation of...
	// internationalizer.percent=new Intl.NumberFormat(this.locale, {style:"percent", minimumFractionDigits:2, maximumFractionDigits:2, signDisplay:"exceptZero"})
	// internationalizer.percent1=new Intl.NumberFormat(this.locale, {style:"percent", minimumFractionDigits:1, maximumFractionDigits:1. signDisplay:"exceptZero"})
	// ...
	for (i = 0; i < 5; i++) {
		var c = i,
			j = i;
		if (!i) {
			c = "";
			j = 2;
		}
		internationalizer["percent" + c] = new Intl.NumberFormat(this.locale, {
			style: "percent",
			minimumFractionDigits: j,
			maximumFractionDigits: j,
			signDisplay: "exceptZero"
		});
	}

	if (CIQ.I18N.createMonthArrays)
		CIQ.I18N.createMonthArrays(this, internationalizer.month, this.locale);
};

/**
 * Convenience function for passing through the UI (DOM elements) and
 * translating all of the text for the given language. See {@link CIQ.I18N.translateUI}.
 *
 * It is important to note that if you are dynamically creating UI content and adding it to the
 * DOM after you have set the language, you must either call this function again after the new
 * content is added or ensure your code explicitly translates the new content using
 * {@link CIQ.makeTranslatableElement} or {@link CIQ.ChartEngine#translateIf}.
 *
 * @param {HTMLElement} [root=document.body] Root node for the DOM tree walker to prevent the
 * 		entire page from being translated.
 *
 * @memberof CIQ.ChartEngine
 * @since 8.5.0
 */
CIQ.ChartEngine.prototype.translateUI = function (root) {
	if (CIQ.I18N.localized) CIQ.I18N.translateUI(this.preferences.language, root);
};

/**
 * Namespace for Internationalization API.
 * See {@tutorial Localization} for more details.
 * @namespace
 * @name CIQ.I18N
 */

CIQ.I18N = function () {};

// Hack code to make a multi line string easy cut & paste from a spreadsheet
CIQ.I18N.hereDoc = function (f) {
	return f
		.toString()
		.replace(/^[^/]+\/\*!?/, "")
		.replace(/ {4,10}/g, "")
		.replace(/\*\/[^/]+$/, "");
};

/**
 * The local language.
 *
 * @memberof CIQ.I18N
 * @type {string}
 * @default "en"
 */
CIQ.I18N.language = "en";

/**
 * The list of languages that don't support shortening the local representation of the month
 * portion of the date.
 *
 * Customize this property by redefining the list of languages. See the example below.
 *
 * @memberof CIQ.I18N
 * @type {object}
 * @default { zh: true, ja: true }
 *
 * @example
 * CIQ.I18N.longMonths = {
 *     "zh-CN": true
 * };
 */
CIQ.I18N.longMonths = { zh: true, ja: true };

/**
 * The list of locales used by {@link CIQ.I18N.setLocale} to determine whether the up/down colors
 * of candles should be reversed.
 *
 * Customize this property by redefining the list of locales. See the example below.
 *
 * @type {object}
 * @default {}
 * @memberof CIQ.I18N
 * @since 4.0.0
 *
 * @example
 * CIQ.I18N.reverseColorsByLocale = {
 *     "zh": true,
 *     "ja": true,
 *     "fr": true,
 *     "de": true,
 *     "hu": true,
 *     "it": true,
 *     "pt": true
 * };
 */
CIQ.I18N.reverseColorsByLocale = {};

/** Returns a word list containing unique words. Each word references an array of DOM
 *  nodes that contain that word. This can then be used for translation.
 *  Text nodes and placeholders which are found in the document tree will have their containing
 * elements converted by this function to accommodate easy translation back and forth between languages.
 * @param  {HTMLElement} [root] root for the TreeWalker.  If omitted, document.body assumed.
 * @return {object}      A word list containing unique words.
 * @memberof CIQ.I18N
 */
CIQ.I18N.findAllTextNodes = function (root) {
	if (!root) root = document.body;

	var walker = root.ownerDocument.createTreeWalker(
		root,
		NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
		{
			acceptNode(node) {
				if (
					node.nodeType === Node.TEXT_NODE ||
					node.shadowRoot ||
					node.placeholder
				) {
					return NodeFilter.FILTER_ACCEPT;
				}
				return NodeFilter.FILTER_SKIP;
			}
		}
	);

	var node = walker.nextNode();
	var ws = new RegExp("^\\s*$");
	var line = new RegExp("\n|\t|\f", "g");
	var wordList = {};
	var dontTranslate = {
		SCRIPT: true,
		STYLE: true,
		TEXTAREA: true,
		"CQ-SYMBOL": true
	};

	var original;
	while (node) {
		if (node.shadowRoot) {
			var shadowWords = CIQ.I18N.findAllTextNodes(node.shadowRoot);
			for (var word in shadowWords) {
				if (!wordList[word]) wordList[word] = [];
				wordList[word] = wordList[word].concat(shadowWords[word]);
			}
		}
		// text nodes
		var key = node.nodeValue;
		if (key && !ws.test(key)) {
			var parentNode = node.parentNode;
			if (
				!dontTranslate[parentNode.tagName] &&
				!parentNode.matches("[no-translate]")
			) {
				original = parentNode.getAttribute("cq-translate-original");
				if (original) key = original;
				else parentNode.setAttribute("cq-translate-original", key);
				if (line.test(key)) key = key.replace(line, ""); // strips out new lines in text
				if (!wordList[key]) wordList[key] = [];
				wordList[key].push(node);
			}
		}
		// placeholders
		key = node.placeholder;
		if (key && !ws.test(key)) {
			if (!dontTranslate[node.tagName]) {
				original = node.getAttribute("cq-translate-placeholder-original");
				if (original) key = original;
				else node.setAttribute("cq-translate-placeholder-original", key);
				if (!wordList[key]) wordList[key] = [];
				wordList[key].push(node);
			}
		}

		if (node.tagName && dontTranslate[node.tagName])
			node = walker.nextSibling();
		else node = walker.nextNode();
	}
	if (root == document.body) {
		// For missing word list collation only:
		// Get all the words from the study library that are used to populate the study dialogs.
		// These will have an empty array since they aren't associated with any nodes
		var studyLibrary = CIQ.Studies ? CIQ.Studies.studyLibrary : null;
		if (studyLibrary) {
			for (var study in studyLibrary) {
				if (wordList[study] === null) wordList[study] = [];
				var s = studyLibrary[study];
				if (s.inputs) {
					for (var input in s.inputs) {
						if (!wordList[input]) wordList[input] = [];
					}
				}
				if (s.outputs) {
					for (var output in s.outputs) {
						if (!wordList[output]) wordList[output] = [];
					}
				}
			}
		}
	}
	return wordList;
};

/**
 * CIQ.I18N.missingWordList will scan the UI by walking all the text elements. It will determine which
 * text elements have not been translated for the given language and return those as a JSON object.
 * @param {string} [language] The language to search for missing words. Defaults to whatever language CIQ.I18N.language has set.
 * @return {object} Words that are undefined with values set to empty strings
 * @memberof CIQ.I18N
 * @since 4.0.0 Iterates over the studyLibrary entry name, inputs, and outputs.
 */
CIQ.I18N.missingWordList = function (language) {
	if (!language) language = CIQ.I18N.language;
	var wordsInUI = CIQ.I18N.findAllTextNodes();
	var missingWords = {};
	var languageWordList = CIQ.I18N.wordLists[language];
	if (!languageWordList) languageWordList = {};

	var addIfMissing = function (x) {
		if (typeof languageWordList[x] == "undefined") {
			missingWords[x] = "";
		}
	};

	for (var word in wordsInUI) {
		addIfMissing(word);
	}

	if (!(CIQ.Studies && CIQ.Studies.studyLibrary)) {
		return missingWords;
	}

	var study;
	var value;

	for (var id in CIQ.Studies.studyLibrary) {
		study = CIQ.Studies.studyLibrary[id];

		addIfMissing(study.name);

		for (var input in study.inputs) {
			addIfMissing(input);
			value = study.inputs[input];

			switch (Object.prototype.toString.call(value)) {
				case "[object String]":
					addIfMissing(value);
					break;
				case "[object Array]":
					for (var i = 0; i < value.length; ++i) {
						addIfMissing(value[i]);
					}
					break;
			}
		}

		for (var output in study.outputs) {
			addIfMissing(output);
		}
	}

	// study parameter fields
	addIfMissing("Show Zones");
	addIfMissing("OverBought");
	addIfMissing("OverSold");
	addIfMissing("Panel");
	addIfMissing("Show as Underlay");
	addIfMissing("Y-Axis");
	addIfMissing("Invert Y-Axis");

	return missingWords;
};

/**
 * A convenience function for creating a JSON object containing words from
 * {@link CIQ.I18N.missingWordList}.
 *
 * @param {string} [language={@link CIQ.I18N.language}] The language for which words in
 * {@link CIQ.I18N.missingWordList} are included in the JSON object.
 * @return {string} The list of of missing words.
 *
 * @memberof CIQ.I18N
 */
CIQ.I18N.printableMissingWordList = function (language) {
	var missingWords = JSON.stringify(CIQ.I18N.missingWordList(language));
	missingWords = missingWords.replace(/","/g, '",\n"');
	return missingWords;
};

/**
 * Passes through the UI (DOM elements) and translates all of the text for the given language.
 *
 * It is important to note that if you are dynamically creating UI content and adding it to the
 * DOM after you have set the language, you must either call this function again after the new
 * content is added or ensure your code explicitly translates the new content using
 * {@link CIQ.makeTranslatableElement} or {@link CIQ.ChartEngine#translateIf}.
 *
 * @param {string} [language={@link CIQ.I18N.language}] The language into which the UI text is
 * 		translated.
 * @param {HTMLElement} [root=document.body] Root node for the DOM tree walker to prevent the
 * 		entire page from being translated.
 *
 * @memberof CIQ.I18N
 * @since 4.0.0 Language code for Portuguese is now "pt" (formerly "pu", which is supported for
 * 		backward compatibility).
 * @since 9.1.0 Translates aria-labels. Aria-label translations do not cross Shadow DOM borders.
 */
CIQ.I18N.translateUI = function (language, root) {
	if (language == "pu") language = "pt"; // backward compatibility.
	if (!CIQ.I18N.wordLists) return;
	if (!language) language = CIQ.I18N.language;
	const wordsInUI = CIQ.I18N.findAllTextNodes(root);
	const languageWordList = CIQ.I18N.wordLists[language];
	if (!languageWordList) return;

	for (const word in wordsInUI) {
		let translation = CIQ.I18N.translateSections(word, languageWordList);
		const nodes = wordsInUI[word];
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i],
				parentNode = node.parentNode,
				originalText = node.placeholder
					? node.getAttribute("cq-translate-placeholder-original")
					: parentNode.getAttribute("cq-translate-original");
			// Two scenarios where we don't want to use translation, when undefined or word is not in the translation files
			if (translation === "," || !translation) translation = originalText;
			if (node.placeholder) node.placeholder = translation;
			else node.data = translation;
		}
	}

	const wordsInAriaLabel = getAriaLabelWordList(root);
	for (const word in wordsInAriaLabel) {
		let translation = CIQ.I18N.translateSections(word, languageWordList);
		const nodes = wordsInAriaLabel[word];
		for (const node of nodes) {
			const originalText = node.getAttribute("aria-label-original");
			if (translation === "," || !translation) translation = originalText;
			node.setAttribute("aria-label", translation);
		}
	}

	function getAriaLabelWordList(root) {
		return Array.from(
			(root || document).querySelectorAll("[aria-label]")
		).reduce((acc, el) => {
			if (!el.getAttribute("aria-label-original")) {
				el.setAttribute("aria-label-original", el.getAttribute("aria-label"));
			}
			const word = el.getAttribute("aria-label-original");
			acc[word] = (acc[word] || []).concat(el);
			return acc;
		}, {});
	}
};

/**
 * Translates an individual word for a given language using {@link CIQ.I18N.wordLists}.
 *
 * Set `stxx.translationCallback` to this function to automatically translate all textual elements
 * on the chart.
 *
 * @param {string} word The word to translate. To be translated, the word must be a property of
 * 		the object in {@link CIQ.I18N.wordLists} specified by `language` (see the example below).
 * @param {string} [language={@link CIQ.I18N.language}] The language to which the word is
 * 		translated. Identifies a property in {@link CIQ.I18N.wordLists}.
 * @return {string} The translation of `word`, or the value of `word` if no translation is found.
 *
 * @memberof CIQ.I18N
 *
 * @example <caption>Translate to Spanish</caption>
 * CIQ.I18N.wordLists = {
 *     "es": {
 *         "1 D": "1 D",
 *         "1 Hour": "1 Hora",
 *         "1 Min": "1 Min",
 *         "1 Mo": "1 Mes",
 *         "1 W": "1 S",
 *         "1 hour": "1 hora",
 *         "1d": "1d",
 *         "1m": "1m",
 *         "1y": "1a",
 *         "3m": "3m"
 *     }
 * };
 * CIQ.I18N.translate("1 Hour", "es"); // "1 Hora"
 */
CIQ.I18N.translate = function (word, language) {
	if (!language) language = CIQ.I18N.language;
	if (!CIQ.I18N.wordLists) {
		console.log(
			"Must include translations.js in order to use CIQ.I18N.translate()"
		);
		return word;
	}
	var languageWordList = CIQ.I18N.wordLists[language];
	var translation = null;
	if (languageWordList)
		translation = CIQ.I18N.translateSections(word, languageWordList) || word;
	// Lastly check and see if the translation is blank in the CSV source (no translation for given language) which is parsed as ',' and if so fall back to English default
	return translation === "," ? word : translation;
};

/**
 * Translates a phrase which may have untranslatable parts (like a study id).
 * The translatable pieces are delimited left and right with a non-printable character Zero-Width-Non_Joiner.
 * @param {string} word The word to translate
 * @param {object} [languageWordList] Map of words and translations in the desired language
 * @return {string} Translation of the given phrase
 * @memberof CIQ.I18N
 * @since 4.0.0
 */
CIQ.I18N.translateSections = function (word, languageWordList) {
	// Test here for word phrases, delimited by the zero-width-non-breaking character
	// we'll split the text into pieces, filtering out the parentheses, and commas to generate phrases
	var zwnb = "\u200c"; // https://en.wikipedia.org/wiki/Zero-width_non-joiner
	if (typeof word == "string" && word.indexOf(zwnb) != -1) {
		word = word.replace(/([(),])/g, zwnb + "$1" + zwnb);
		var sections = word.split(zwnb);
		sections.forEach(function (val, i, arr) {
			var padding = val.match(/^(\s*).{0,100}\S(\s*)$/);
			var translation = languageWordList[val.trim()];
			if (translation) {
				if (padding) translation = padding[1] + translation + padding[2];
				arr[i] = translation;
			}
		});
		return sections.join("");
	}
	return languageWordList[word];
};

/**
 * Where we can store a translation spreadsheet in csv format **as a single long string**.
 *
 * @memberof CIQ.I18N
 * @type {string}
 */
CIQ.I18N.csv = CIQ.I18N.csv || "";

/**
 * Converts a 'CSV formatted' string of translations into the required JSON format and set to {@link CIQ.I18N.wordLists}
 * You can output {@link CIQ.I18N.wordLists} to the console and paste back in if desired.
 * @param {string} [csv] Translation spreadsheet in csv format **as a single long string**.
 * Make sure there are no leading tabs, trailing commas or spaces.
 * Assumes that the header row of the CSV is the language codes and that the first column is the key language (English).
 * Assumes non-quoted words, data is comma delimited and lines separated by '\n'. Default is CIQ.I18N.csv
 * @memberof CIQ.I18N
 * @example
	var csv="en,ar,fr,de,hu,it,pt,ru,es,zh,ja\nChart,الرسم البياني,Graphique,Darstellung,Diagram,Grafico,Gráfico,График,Gráfica,图表,チャート\nChart Style,أسلوب الرسم البياني,Style de graphique,Darstellungsstil,Diagram stílusa,Stile grafico,Estilo do gráfico,Тип графика,Estilo de gráfica,图表类型,チャート形式\nCandle,الشموع,Bougie,Kerze,Gyertya,Candela,Vela,Свеча,Vela,蜡烛,ローソク足\nShape,شكل,Forme,Form,Alak,Forma,Forma,Форма,Forma,形状,パターン";
	CIQ.I18N.convertCSV(csv);
 */
CIQ.I18N.convertCSV = function (csv) {
	var curly = new RegExp("[\u201C\u201D]|[\u2018\u2019]", "g");
	var wordLists = CIQ.I18N.wordLists;
	if (!csv) csv = CIQ.I18N.csv;
	if (!csv) return;
	var lines = csv.split("\n");
	var headerRow = lines[0];
	var languages = headerRow.split(",");
	for (var j = 0; j < languages.length; j++) {
		var lang = languages[j];
		if (!wordLists[lang]) {
			wordLists[lang] = {};
		}
	}
	for (var i = 1; i < lines.length; i++) {
		var words =
			lines[i].match(
				/(".{0,1000}?"|[^",]{1,1000})(?=\s{0,100},|\s{0,100}$)|(,(?=,))/g
			) || [];
		var key = words[0];
		var startChar = key.charAt(0);
		var endChar = key.charAt(key.length - 1);

		if (startChar === '"' && endChar === '"') {
			key = key.substring(1, key.length - 1);
		}
		if (curly.test(key)) key = key.replace(curly, '"');
		for (var k = 1; k < words.length; k++) {
			var word = words[k];
			startChar = word.charAt(0);
			endChar = word.charAt(word.length - 1);
			if (startChar === '"' && endChar === '"') {
				word = word.substring(1, word.length - 1);
			}
			wordLists[languages[k]][key] = word;
		}
	}
};

/**
 * Convenience function to set up translation services for a chart and its surrounding GUI.
 * Automatically sets {@link CIQ.I18N.language}, loads all translations, and translates the chart.
 *
 * Uses/sets (in execution order):
 *  - {@link CIQ.I18N.convertCSV}
 *  - {@link CIQ.I18N.language}
 *  - {@link CIQ.I18N.translateUI}
 *  - {@link CIQ.I18N.translate}
 *
 * Feel free to create your own convenience function if required to explicitly set
 * {@link CIQ.I18N.wordLists} instead of using the `CIQ.I18N.hereDoc` copy/paste spreadsheet in
 * *translationSample.js*.
 *
 * It is important to note that if you are dynamically creating UI content and adding it to the
 * DOM after you have set the language, you must either call {@link CIQ.I18N.translateUI} after
 * the new content is added, or ensure your code explicitly translates the new content using
 * {@link CIQ.makeTranslatableElement} or {@link CIQ.ChartEngine#translateIf}.
 *
 * @param {CIQ.ChartEngine} stx A chart object.
 * @param {string} language A language in your csv file. For instance "en" from
 * 		`CIQ.I18N.csv` in *translationSample.js*.
 * @param {string} [translationCallback] Function to perform canvas built-in word translations.
 * 		Default is {@link CIQ.I18N.translate}.
 * @param {string} [csv] Translation spreadsheet in csv format **as a single long string**. Make
 * 		sure the string contains no leading tabs, trailing commas, or spaces. Default is
 * 		`CIQ.I18N.csv` in *translationSample.js*. See {@link CIQ.I18N.convertCSV} for a format
 * 		sample.
 * @param {HTMLElement} [root] Root element from which to start translating. If the parameter is
 * 		omitted, the chart UI context is checked for its top node before defaulting to
 * 		`document.body`.
 *
 * @memberof CIQ.I18N
 * @since
 * - 04-2015
 * - 3.0.0 Added `root` parameter.
 * - 4.0.0 Language code for Portuguese is "pt" (formerly "pu"; maintained for backwards
 * 		compatibility).
 * - 8.2.0 If no `root` parameter, the chart UI context is checked for its top node before
 * 		defaulting to `document.body`.
 */
CIQ.I18N.setLanguage = function (
	stx,
	language,
	translationCallback,
	csv,
	root
) {
	if (!root) root = (stx.uiContext || {}).topNode || document.body;
	if (language == "pu") language = "pt"; // backward compatibility.
	CIQ.I18N.convertCSV(csv);
	CIQ.I18N.language = language;
	CIQ.I18N.translateUI(language, root);
	if (!translationCallback) translationCallback = CIQ.I18N.translate;
	stx.translationCallback = translationCallback;
};

/**
 * This method will set the chart locale and check to see if candle colors should be reversed.
 *
 * If set, display prices and dates will be displayed in localized format.
 * The locale should be a valid [IANA locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
 * For instance `de-AT` represents German as used in Austria.
 *
 * {@link CIQ.I18N.reverseColorsByLocale}  is used to determine if the candle colors should be reversed.
 *
 * Localization in the library is supported through the `Intl object` which is a [W3 standard](https://www.w3.org/International/articles/language-tags/)  supported by all modern browsers.
 *
 * Once a locale is set, `stxx.internationalizer` will be an object that will contain several Intl formatters.
 *
 * These are the default date and time formats:
 * - stxx.internationalizer.hourMinute=new Intl.DateTimeFormat(this.locale, {hour:"numeric", minute:"numeric", hourCycle:"h23"});
 * - stxx.internationalizer.hourMinuteSecond=new Intl.DateTimeFormat(this.locale, {hour:"numeric", minute:"numeric", second:"numeric", hourCycle:"h23"});
 * - stxx.internationalizer.mdhm=new Intl.DateTimeFormat(this.locale, {year:"2-digit", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit"});
 * - stxx.internationalizer.monthDay=new Intl.DateTimeFormat(this.locale, {month:"numeric", day:"numeric"});
 * - stxx.internationalizer.yearMonthDay=new Intl.DateTimeFormat(this.locale, {year:"numeric", month:"numeric", day:"numeric"});
 * - stxx.internationalizer.yearMonth=new Intl.DateTimeFormat(this.locale, {year:"numeric", month:"numeric"});
 * - stxx.internationalizer.month=new Intl.DateTimeFormat(this.locale, {month:"short"});
 *
 * These can be overridden manually if the specified format is not acceptable. See example.
 * Also see [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) for formatting alternatives
 *
 * @param {CIQ.ChartEngine} stx A chart object
 * @param {string} locale A valid [IANA locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl), for instance en-IN
 * @param {Function} [cb] Callback when locale has been loaded. This function will be passed an error message if it cannot be loaded.
 * @param {string} [url] url where to fetch the locale data. Defaults to "locale-data/jsonp". Only used if not natively supported by the browser.
 * @param {number} [maxDecimals] maximum number of decimal places to allow on number conversions. Defaults to 5. See {@link CIQ.ChartEngine#setLocale} for more details.
 * @since 3.0.0 Added `maxDecimals` parameter.
 * @memberof CIQ.I18N
 * @example
 * CIQ.I18N.setLocale(stxx, "zh");	// set localization services -- before any UI or chart initialization is done
 * // override time formatting to enable 12 hour clock (hour12:true)
 * stxx.internationalizer.hourMinute=new Intl.DateTimeFormat(this.locale, {hour:"numeric", minute:"numeric", hour12:true});
 * stxx.internationalizer.hourMinuteSecond=new Intl.DateTimeFormat(this.locale, {hour:"numeric", minute:"numeric", second:"numeric", hour12:true});
 */
CIQ.I18N.setLocale = function (stx, locale, cb, url, maxDecimals) {
	// checks to see if we're switching from a locale with reversed candles
	if (
		CIQ.xor(
			this.reverseColorsByLocale[locale],
			this.reverseColorsByLocale[stx.locale]
		)
	) {
		this.reverseCandles(stx);
	}

	if (typeof Intl == "undefined" || !Intl.__addLocaleData) {
		// Intl built into browser
		stx.setLocale(locale, maxDecimals);
		if (cb) cb(null);
		return;
	}
	url = typeof url == "undefined" ? "locale-data/jsonp" : url;
	var localeFileURL = url + "/" + locale + ".js";
	var script = document.createElement("SCRIPT");
	script.async = true;
	script.src = localeFileURL;
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(script, s.nextSibling);
	script.onload = function () {
		stx.setLocale(locale, maxDecimals);
		if (cb) cb(null);
	};
	script.onerror = function () {
		if (cb) cb("cannot load script");
	};
};

/**
 * Extract the name of the month from the locale. We do this by creating a
 * localized date for the first date of each month. Then we extract the alphabetic characters.
 * MonthLetters then becomes the first letter of the month. The arrays are stored in stx.monthAbv and stx.monthLetters which
 * will then override the global arrays CIQ.monthAbv and CIQ.monthLetters.
 * @param  {CIQ.ChartEngine} stx       Chart object
 * @param  {object} formatter An Intl compatible date formatter
 * @param  {string} locale    A valid Intl locale, such as en-IN
 * @memberof CIQ.I18N
 */
CIQ.I18N.createMonthArrays = function (stx, formatter, locale) {
	stx.monthAbv = [];
	stx.monthLetters = [];
	var dt = new Date();
	var shortenMonth = true;
	if (CIQ.I18N.longMonths && CIQ.I18N.longMonths[locale]) shortenMonth = false;
	for (var i = 0; i < 12; i++) {
		dt.setDate(1);
		dt.setMonth(i);
		var str = formatter.format(dt);
		if (shortenMonth) {
			var month = "";
			for (var j = 0; j < str.length; j++) {
				var c = str.charAt(j);
				var cc = c.charCodeAt(0);
				if (cc < 65) continue;
				month += c;
			}
			stx.monthAbv[i] = month;
			stx.monthLetters[i] = month[0];
		} else {
			stx.monthAbv[i] = str;
			stx.monthLetters[i] = str;
		}
	}
};

/**
 * A convenience function that sets locale and language at once. Each of these grouped functions are called with default arguments.
 * If you require custom parameters you will need to call each separately.
 *
 * It is important to note that if you are dynamically creating UI content and adding it to the DOM after you have set the language,
 * you must either call {@link CIQ.I18N.translateUI} after the new content is added,
 * or ensure your code explicitly translates the new content using {@link CIQ.makeTranslatableElement} or {@link CIQ.ChartEngine#translateIf}.
 *
 * Functions are called in the following order:
 * - {@link CIQ.I18N.setLocale}
 * - {@link CIQ.I18N.setLanguage}
 * - {@link CIQ.I18N.reverseCandles} - Called only if colors need to be reversed.
 *
 * @param {CIQ.ChartEngine} stx Chart object
 * @param  {string} locale    A valid Intl locale, such as en-IN
 * @memberof CIQ.I18N
 * @since 4.0.0
 * @example
 * CIQ.I18N.localize(stxx, "zh");	// set translation and localization services -- before any UI or chart initialization is done
 * // override time formatting to enable 12 hour clock (hour12:true)
 * stxx.internationalizer.hourMinute=new Intl.DateTimeFormat(this.locale, {hour:"numeric", minute:"numeric", hour12:true});
 * stxx.internationalizer.hourMinuteSecond=new Intl.DateTimeFormat(this.locale, {hour:"numeric", minute:"numeric", second:"numeric", hour12:true});
 */
CIQ.I18N.localize = function (stx, locale) {
	locale = this.langConversionMap[locale] || locale;
	this.setLocale(stx, locale);
	this.setLanguage(stx, locale);
	CIQ.I18N.localized = true;
};

/**
 * Reverses the up/down candle colors, as preferred by some locales.
 *
 * Reverses the colors without changing the CSS.
 *
 * @param {CIQ.ChartEngine} stx A reference to the chart engine.
 *
 * @memberof CIQ.I18N
 * @since 4.0.0
 */
CIQ.I18N.reverseCandles = function (stx) {
	var styles = stx.styles;
	var candleDown = stx.cloneStyle(styles.stx_candle_down);
	var candleUp = stx.cloneStyle(styles.stx_candle_up);
	styles.stx_candle_up = candleDown;
	styles.stx_candle_down = candleUp;
};

/**
 * A list of word translations for one or more languages.
 *
 * {@link CIQ.I18N.convertCSV} assigns an object to this property based on a CSV-formatted string.
 * You can also set a value explicitly without using {@link CIQ.I18N.convertCSV} or
 * {@link CIQ.I18N.setLanguage} (see the example below).
 *
 * @memberof CIQ.I18N
 * @type {object}
 * @default { en: {} }
 *
 * @example <caption>Word translations for Arabic and Spanish.</caption>
 * // Setting explicitly without using CIQ.I18N.convertCSV or CIQ.I18N.setLanguage.
 * CIQ.I18N.wordLists = {
 *     "ar": {
 *         "1 D": "1ي",
 *         "1 Hour": "1 ساعة",
 *         "1 Min": "1د",
 *         "1 Mo": "1ش",
 *         "1 W": "أ1",
 *         "1 hour": "ساعة واحدة",
 *         "1d": "1يوم",
 *         "1m": "1شهر",
 *         "1y": "1عام",
 *         "3m": "3أشهر"
 *     },
 *     "es": {
 *         "1 D": "1 D",
 *         "1 Hour": "1 Hora",
 *         "1 Min": "1 Min",
 *         "1 Mo": "1 Mes",
 *         "1 W": "1 S",
 *         "1 hour": "1 hora",
 *         "1d": "1d",
 *         "1m": "1m",
 *         "1y": "1a",
 *         "3m": "3m"
 *     }
 * }
 */
CIQ.I18N.wordLists = {
	en: {}
};

/**
 * A map of language codes to endonyms (language names in the mapped language). Can be used as a
 * data source for UI components, such as a language picker.
 *
 * The following languages are predefined:
 * - en: "English"
 *
 * The following additional languages are supported in the
 * *examples/translations/translationSample.js* file:
 * - "en-US": "English",
 * - "ar-EG": "عربى",
 * - "fr-FR": "Français",
 * - "de-DE": "Deutsche",
 * - "hu-HU": "Magyar",
 * - "it-IT": "Italiano",
 * - "pt-PT": "Português",
 * - "ru-RU": "русский",
 * - "es-ES": "Español",
 * - "zh-CN": "中文",
 * - "ja-JP": "日本語"
 *
 * You can add language mappings as follows:
 * ```
 * CIQ.I18N.languages.ko = "한국어";
 * ```
 *
 * You can remove unsupported languages by deleting the mappings from this object or by redefining
 * the object with only the languages you choose to support.
 *
 * @memberof CIQ.I18N
 * @type {object}
 * @default { en: "English" }
 */
CIQ.I18N.languages = {
	en: "English"
};

/**
 * A map of language codes to language-region codes for backward compatibility.
 *
 * The following locale / language-region codes are supported in the
 * *examples/translations/translationSample.js* file:
 * - en: "en-US"
 * - ar: "ar-EG"
 * - fr: "fr-FR"
 * - de: "de-DE"
 * - hu: "hu-HU"
 * - it: "it-IT"
 * - pt: "pt-PT"
 * - ru: "ru-RU"
 * - es: "es-ES"
 * - zh: "zh-CN"
 * - ja: "ja-JP"
 *
 * You can add code mappings as follows:
 * ```
 * CIQ.I18N.langConversionMap.ko = "ko-KR";
 * ```
 *
 * You can remove unsupported codes by deleting the mappings from this object or by redefining the
 * object with only the languages and regions you choose to support.
 *
 * @memberof CIQ.I18N
 * @type {object}
 * @since 8.3.0
 */
CIQ.I18N.langConversionMap = {};

/**
 * Indicates whether a translation has taken place. Used by web components and helpers.
 *
 * @memberof CIQ.I18N
 * @type {boolean}
 * @default false
 * @private
 * @since 8.3.0
 */
CIQ.I18N.localized = false;

};
__js_standard_i18n_(typeof window !== "undefined" ? window : global);
