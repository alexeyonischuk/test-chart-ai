
const _exports = typeof window !== "undefined" ? window : global;
import { CIQ, timezoneJS } from "../../js/standard.js";
CIQ.timeZoneMap = {
	"(UTC-11:00) American Samoa, Midway Island": "Pacific/Pago_Pago",
	"(UTC-10:00) Hawaii": "Pacific/Honolulu",
	"(UTC-10:00) Alaska Aleutian Islands": "America/Adak",
	"(UTC-09:00) Alaska": "America/Juneau",
	"(UTC-08:00) Pacific Time (US and Canada), Tijuana": "America/Los_Angeles",
	"(UTC-07:00) Arizona": "America/Phoenix",
	"(UTC-07:00) Mazatlan": "America/Mazatlan",
	"(UTC-07:00) Mountain Time (US and Canada)": "America/Denver",
	"(UTC-06:00) Saskatchewan": "America/Regina",
	"(UTC-06:00) Central America": "America/Costa_Rica",
	"(UTC-06:00) Central Time (US and Canada)": "America/Chicago",
	"(UTC-06:00) Chihuahua": "America/Chihuahua",
	"(UTC-06:00) Guadalajara, Mexico City, Monterrey": "America/Mexico_City",
	"(UTC-05:00) Bogota, Lima, Quito, Rio Branco": "America/Bogota",
	"(UTC-05:00) Eastern Time (US and Canada)": "America/New_York",
	"(UTC-05:00) Havana": "America/Havana",
	"(UTC-05:00) Port-au-Prince": "America/Port-au-Prince",
	"(UTC-04:00) Caracas": "America/Caracas",
	"(UTC-04:00) Georgetown, La Paz, Manaus, San Juan": "America/Puerto_Rico",
	"(UTC-04:00) Santiago": "America/Santiago",
	"(UTC-04:00) Asuncion": "America/Asuncion",
	"(UTC-04:00) Atlantic Time (Canada)": "America/Halifax",
	"(UTC-03:30) Newfoundland and Labrador": "America/St_Johns",
	"(UTC-03:00) Buenos Aires, Montevideo": "America/Argentina/Buenos_Aires",
	"(UTC-03:00) Punta Arenas": "America/Punta_Arenas",
	"(UTC-03:00) Sao Paulo": "America/Sao_Paulo",
	"(UTC-02:00) Mid-Atlantic": "Atlantic/South_Georgia",
	"(UTC-01:00) Cape Verde Islands": "Atlantic/Cape_Verde",
	"(UTC-01:00) Azores": "Atlantic/Azores",
	"(UTC) Greenwich Mean Time, Reykjavik": "UTC",
	"(UTC) Dublin": "Europe/Dublin",
	"(UTC) Lisbon, London": "Europe/London",
	"(UTC) Casablanca": "Africa/Casablanca",
	"(UTC+01:00) Algiers, Tunis": "Africa/Tunis",
	"(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna":
		"Europe/Berlin",
	"(UTC+01:00) Belgrade, Budapest, Prague, Sarajevo, Warsaw": "Europe/Belgrade",
	"(UTC+01:00) Brussels, Copenhagen, Madrid, Paris": "Europe/Brussels",
	"(UTC+02:00) Cairo": "Africa/Cairo",
	"(UTC+02:00) Harare, Johannesburg": "Africa/Johannesburg",
	"(UTC+02:00) Kaliningrad": "Europe/Kaliningrad",
	"(UTC+02:00) Athens, Bucharest": "Europe/Bucharest",
	"(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius":
		"Europe/Helsinki",
	"(UTC+02:00) Cyprus": "Asia/Nicosia",
	"(UTC+02:00) Beirut": "Asia/Beirut",
	"(UTC+02:00) Jerusalem": "Asia/Jerusalem",
	"(UTC+03:00) Istanbul": "Europe/Istanbul",
	"(UTC+03:00) Damascus": "Asia/Damascus",
	"(UTC+03:00) Amman": "Asia/Amman",
	"(UTC+03:00) Baghdad, Kuwait, Qatar, Riyadh": "Asia/Riyadh",
	"(UTC+03:00) Minsk, Moscow, Kirov, Simferopol": "Europe/Moscow",
	"(UTC+03:00) Volgograd": "Europe/Volgograd",
	"(UTC+03:00) Nairobi": "Africa/Nairobi",
	"(UTC+03:30) Tehran": "Asia/Tehran",
	"(UTC+04:00) Baku": "Asia/Baku",
	"(UTC+04:00) Dubai, Muscat": "Asia/Dubai",
	"(UTC+04:00) Astrakhan, Samara, Saratov, Ulyanovsk": "Europe/Samara",
	"(UTC+04:30) Kabul": "Asia/Kabul",
	"(UTC+05:00) Karachi, Tashkent": "Asia/Karachi",
	"(UTC+05:00) Yekaterinburg": "Asia/Yekaterinburg",
	"(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi": "Asia/Kolkata",
	"(UTC+05:45) Kathmandu": "Asia/Kathmandu",
	"(UTC+06:00) Almaty": "Asia/Almaty",
	"(UTC+06:00) Omsk": "Asia/Omsk",
	"(UTC+06:00) Astana, Dhaka": "Asia/Dhaka",
	"(UTC+06:30) Yangon": "Asia/Yangon",
	"(UTC+07:00) Bangkok, Jakarta, Vietnam": "Asia/Bangkok",
	"(UTC+07:00) Hovd": "Asia/Hovd",
	"(UTC+07:00) Krasnoyarsk": "Asia/Krasnoyarsk",
	"(UTC+07:00) Novokuznetsk": "Asia/Novokuznetsk",
	"(UTC+07:00) Barnaul, Novosibirsk, Tomsk": "Asia/Novosibirsk",
	"(UTC+08:00) Beijing, Chongqing, Hong Kong SAR": "Asia/Hong_Kong",
	"(UTC+08:00) Brunei, Kuala Lumpur, Singapore": "Asia/Singapore",
	"(UTC+08:00) Irkutsk": "Asia/Irkutsk",
	"(UTC+08:00) Choibalsan, Ulaanbaatar": "Asia/Ulaanbaatar",
	"(UTC+08:00) Manila, Taipei": "Asia/Taipei",
	"(UTC+08:00) Perth": "Australia/Perth",
	"(UTC+08:45) Eucla": "Australia/Eucla",
	"(UTC+09:00) Osaka, Sapporo, Tokyo": "Asia/Tokyo",
	"(UTC+09:00) Pyongyang": "Asia/Pyongyang",
	"(UTC+09:00) Seoul": "Asia/Seoul",
	"(UTC+09:00) Chita, Khandyga, Yakutsk": "Asia/Yakutsk",
	"(UTC+09:30) Adelaide": "Australia/Adelaide",
	"(UTC+09:30) Darwin": "Australia/Darwin",
	"(UTC+10:00) Brisbane": "Australia/Brisbane",
	"(UTC+10:00) Canberra, Melbourne, Sydney": "Australia/Sydney",
	"(UTC+10:00) Guam, Port Moresby": "Pacific/Guam",
	"(UTC+10:00) Ust-Nera, Vladivostok": "Asia/Vladivostok",
	"(UTC+11:00) Noumea, Solomon Islands": "Pacific/Noumea",
	"(UTC+11:00) Magadan": "Asia/Magadan",
	"(UTC+11:00) Sakhalin, Srednekolymsk": "Asia/Srednekolymsk",
	"(UTC+12:00) Anadyr, Kamchatka": "Asia/Kamchatka",
	"(UTC+12:00) Auckland, Wellington": "Pacific/Auckland",
	"(UTC+12:00) Fiji": "Pacific/Fiji",
	"(UTC+12:45) Chatham": "Pacific/Chatham",
	"(UTC+13:00) Tonga": "Pacific/Tongatapu",
	"(UTC+13:00) Samoa": "Pacific/Apia",
	"(UTC+14:00) Kiritimati": "Pacific/Kiritimati"
};
// Load all the necessary timezones and their rules
timezoneJS.timezone.loadingScheme =
	timezoneJS.timezone.loadingSchemes.MANUAL_LOAD;
timezoneJS.timezone.loadZoneDataFromObject({
	zones: {
		"Atlantic/Cape_Verde": [[60, "-", "-01", null]],
		"Africa/Cairo": [[-120, "Egypt", "EE%sT", null]],
		"Africa/Nairobi": [[-180, "-", "EAT", null]],
		"Africa/Casablanca": [
			[0, "Morocco", "+00/+01", 1540695600000],
			[-60, "Morocco", "+01/+00", null]
		],
		"Africa/Johannesburg": [[-120, "", "SAST", null]],
		"Africa/Tunis": [[-60, "", "CE%sT", null]],
		"Asia/Kabul": [[-270, "-", "+0430", null]],
		"Asia/Baku": [[-240, "", "+04/+05", null]],
		"Asia/Dhaka": [[-360, "", "+06/+07", null]],
		"Asia/Yangon": [[-390, "-", "+0630", null]],
		"Asia/Hong_Kong": [[-480, "", "HK%sT", null]],
		"Asia/Taipei": [[-480, "", "C%sT", null]],
		"Asia/Nicosia": [[-120, "EUAsia", "EE%sT", null]],
		"Asia/Kolkata": [[-330, "-", "IST", null]],
		"Asia/Tehran": [[-210, "Iran", "+0330/+0430", null]],
		"Asia/Jerusalem": [[-120, "Zion", "I%sT", null]],
		"Asia/Tokyo": [[-540, "", "J%sT", null]],
		"Asia/Amman": [
			[-120, "Jordan", "EE%sT", 1666915200000],
			[-180, "-", "+03", null]
		],
		"Asia/Almaty": [[-360, "-", "ALMT", null]],
		"Asia/Seoul": [[-540, "", "K%sT", null]],
		"Asia/Pyongyang": [[-540, "-", "KST", null]],
		"Asia/Beirut": [[-120, "Lebanon", "EE%sT", null]],
		"Asia/Hovd": [[-420, "", "+07/+08", null]],
		"Asia/Ulaanbaatar": [[-480, "", "+08/+09", null]],
		"Asia/Kathmandu": [[-345, "-", "+0545", null]],
		"Asia/Karachi": [[-300, "", "PK%sT", null]],
		"Asia/Riyadh": [[-180, "-", "+03", null]],
		"Asia/Singapore": [[-480, "-", "+08", null]],
		"Asia/Damascus": [
			[-120, "Syria", "EE%sT", 1666915200000],
			[-180, "-", "+03", null]
		],
		"Asia/Bangkok": [[-420, "-", "+07", null]],
		"Asia/Dubai": [[-240, "-", "+04", null]],
		"Australia/Darwin": [[-570, "", "AC%sT", null]],
		"Australia/Perth": [[-480, "", "AW%sT", null]],
		"Australia/Eucla": [[-525, "", "+0845/+0945", null]],
		"Australia/Brisbane": [[-600, "", "AE%sT", null]],
		"Australia/Adelaide": [[-570, "AS", "AC%sT", null]],
		"Australia/Sydney": [[-600, "AN", "AE%sT", null]],
		"Pacific/Fiji": [[-720, "Fiji", "+12/+13", null]],
		"Pacific/Guam": [[-600, "-", "ChST", null]],
		"Pacific/Kiritimati": [[-840, "-", "+14", null]],
		"Pacific/Noumea": [[-660, "", "+11/+12", null]],
		"Pacific/Auckland": [[-720, "NZ", "NZ%sT", null]],
		"Pacific/Chatham": [[-765, "Chatham", "+1245/+1345", null]],
		"Pacific/Pago_Pago": [[660, "-", "SST", null]],
		"Pacific/Apia": [[-780, "WS", "+13/+14", null]],
		"Pacific/Tongatapu": [[-780, "", "+13/+14", null]],
		"Etc/UTC": [[0, "-", "UTC", null]],
		"Europe/London": [[0, "EU", "GMT/BST", null]],
		"Europe/Dublin": [[0, "Eire", "IST/GMT", null]],
		"Europe/Brussels": [[-60, "EU", "CE%sT", null]],
		"Europe/Helsinki": [[-120, "EU", "EE%sT", null]],
		"Europe/Berlin": [[-60, "EU", "CE%sT", null]],
		"Atlantic/Azores": [[60, "EU", "-01/+00", null]],
		"Europe/Bucharest": [[-120, "EU", "EE%sT", null]],
		"Europe/Kaliningrad": [[-120, "-", "EET", null]],
		"Europe/Moscow": [[-180, "-", "MSK", null]],
		"Europe/Volgograd": [
			[-180, "-", "MSK", 1540692000000],
			[-240, "-", "+04", 1609034400000],
			[-180, "-", "MSK", null]
		],
		"Europe/Samara": [[-240, "-", "+04", null]],
		"Asia/Yekaterinburg": [[-300, "-", "+05", null]],
		"Asia/Omsk": [[-360, "-", "+06", null]],
		"Asia/Novosibirsk": [[-420, "-", "+07", null]],
		"Asia/Novokuznetsk": [[-420, "-", "+07", null]],
		"Asia/Krasnoyarsk": [[-420, "-", "+07", null]],
		"Asia/Irkutsk": [[-480, "-", "+08", null]],
		"Asia/Yakutsk": [[-540, "-", "+09", null]],
		"Asia/Vladivostok": [[-600, "-", "+10", null]],
		"Asia/Magadan": [[-660, "-", "+11", null]],
		"Asia/Srednekolymsk": [[-660, "-", "+11", null]],
		"Asia/Kamchatka": [[-720, "-", "+12", null]],
		"Europe/Belgrade": [[-60, "EU", "CE%sT", null]],
		"Europe/Istanbul": [[-180, "-", "+03", null]],
		"America/New_York": [[300, "US", "E%sT", null]],
		"America/Chicago": [[360, "US", "C%sT", null]],
		"America/Denver": [[420, "US", "M%sT", null]],
		"America/Los_Angeles": [[480, "US", "P%sT", null]],
		"America/Juneau": [[540, "US", "AK%sT", null]],
		"America/Adak": [[600, "US", "HA%sT", null]],
		"Pacific/Honolulu": [[600, "-", "HST", null]],
		"America/Phoenix": [[420, "-", "MST", null]],
		"America/St_Johns": [[210, "Canada", "N%sT", null]],
		"America/Halifax": [[240, "Canada", "A%sT", null]],
		"America/Regina": [[360, "-", "CST", null]],
		"America/Mexico_City": [[360, "Mexico", "C%sT", null]],
		"America/Chihuahua": [
			[420, "Mexico", "M%sT", 1667095200000],
			[360, "US", "CST", null]
		],
		"America/Mazatlan": [[420, "Mexico", "M%sT", null]],
		"America/Costa_Rica": [[360, "", "C%sT", null]],
		"America/Havana": [[300, "Cuba", "C%sT", null]],
		"America/Port-au-Prince": [[300, "Haiti", "E%sT", null]],
		"America/Puerto_Rico": [[240, "-", "AST", null]],
		"America/Argentina/Buenos_Aires": [[180, "", "-03/-02", null]],
		"America/Sao_Paulo": [[180, "Brazil", "-03/-02", null]],
		"America/Santiago": [[240, "Chile", "-04/-03", null]],
		"America/Punta_Arenas": [[180, "-", "-03", null]],
		"America/Bogota": [[300, "", "-05/-04", null]],
		"America/Asuncion": [[240, "Para", "-04/-03", null]],
		"Atlantic/South_Georgia": [[120, "-", "-02", null]],
		"America/Caracas": [[240, "-", "-04", null]],
		// backwards compatibility
		UTC: "Etc/UTC",
		WET: "Europe/London",
		CET: "Europe/Brussels",
		EET: "Europe/Moscow",
		"America/Toronto": "America/New_York",
		"Europe/Amsterdam": "Europe/Brussels",
		"Europe/Athens": "Europe/Bucharest",
		"Europe/Copenhagen": "Europe/Brussels",
		"Europe/Madrid": "Europe/Brussels",
		"Europe/Paris": "Europe/Brussels",
		"Europe/Sarajevo": "Europe/Belgrade",
		"Europe/Stockholm": "Europe/Brussels",
		"Europe/Zurich": "Europe/Berlin",
		"Asia/Kuala_Lumpur": "Asia/Singapore",
		"Asia/Shanghai": "Asia/Hong_Kong"
	},
	rules: {
		Egypt: [
			[2023, "max", "-", "Apr", "lastFri", [0, 0, 0, null], 60, "S"],
			[2023, "max", "-", "Oct", "lastThu", [24, 0, 0, null], 0, "-"]
		],
		Morocco: [
			[2013, 2018, "-", "Oct", "lastSun", [3, 0, 0, null], 0, "-"],
			[2014, 2018, "-", "Mar", "lastSun", [2, 0, 0, null], 60, "-"],
			[2018, "only", "-", "May", "13", [3, 0, 0, null], 0, "-"],
			[2018, "only", "-", "Jun", "17", [2, 0, 0, null], 60, "-"],
			[2019, "only", "-", "May", "5", [3, 0, 0, null], -60, "-"],
			[2019, "only", "-", "Jun", "9", [2, 0, 0, null], 0, "-"],
			[2020, "only", "-", "Apr", "19", [3, 0, 0, null], -60, "-"],
			[2020, "only", "-", "May", "31", [2, 0, 0, null], 0, "-"],
			[2021, "only", "-", "Apr", "11", [3, 0, 0, null], -60, "-"],
			[2021, "only", "-", "May", "16", [2, 0, 0, null], 0, "-"],
			[2022, "only", "-", "Mar", "27", [3, 0, 0, null], -60, "-"],
			[2022, "only", "-", "May", "8", [2, 0, 0, null], 0, "-"],
			[2023, "only", "-", "Mar", "19", [3, 0, 0, null], -60, "-"],
			[2023, "only", "-", "Apr", "23", [2, 0, 0, null], 0, "-"],
			[2024, "only", "-", "Mar", "10", [3, 0, 0, null], -60, "-"],
			[2024, "only", "-", "Apr", "14", [2, 0, 0, null], 0, "-"],
			[2025, "only", "-", "Feb", "23", [3, 0, 0, null], -60, "-"],
			[2025, "only", "-", "Apr", "6", [2, 0, 0, null], 0, "-"],
			[2026, "only", "-", "Feb", "15", [3, 0, 0, null], -60, "-"],
			[2026, "only", "-", "Mar", "22", [2, 0, 0, null], 0, "-"],
			[2027, "only", "-", "Feb", "7", [3, 0, 0, null], -60, "-"],
			[2027, "only", "-", "Mar", "14", [2, 0, 0, null], 0, "-"],
			[2028, "only", "-", "Jan", "23", [3, 0, 0, null], -60, "-"],
			[2028, "only", "-", "Mar", "5", [2, 0, 0, null], 0, "-"]
		],
		EUAsia: [
			[1981, "max", "-", "Mar", "lastSun", [1, 0, 0, "u"], 60, "S"],
			[1996, "max", "-", "Oct", "lastSun", [1, 0, 0, "u"], 0, "-"]
		],
		Iran: [
			[2017, 2019, "-", "Mar", "21", [24, 0, 0, null], 60, "-"],
			[2017, 2019, "-", "Sep", "21", [24, 0, 0, null], 0, "-"],
			[2020, "only", "-", "Mar", "20", [24, 0, 0, null], 60, "-"],
			[2020, "only", "-", "Sep", "20", [24, 0, 0, null], 0, "-"],
			[2021, 2022, "-", "Mar", "21", [24, 0, 0, null], 60, "-"],
			[2021, 2022, "-", "Sep", "21", [24, 0, 0, null], 0, "-"]
		],
		Zion: [
			[2013, "max", "-", "Mar", "Fri>=23", [2, 0, 0, null], 60, "D"],
			[2013, "max", "-", "Oct", "lastSun", [2, 0, 0, null], 0, "S"]
		],
		Jordan: [
			[2014, 2021, "-", "Mar", "lastThu", [24, 0, 0, null], 60, "S"],
			[2014, 2022, "-", "Oct", "lastFri", [0, 0, 0, "s"], 0, "-"],
			[2022, "only", "-", "Feb", "lastThu", [24, 0, 0, null], 60, "S"]
		],
		Lebanon: [
			[1993, "max", "-", "Mar", "lastSun", [0, 0, 0, null], 60, "S"],
			[1999, "max", "-", "Oct", "lastSun", [0, 0, 0, null], 0, "-"]
		],
		Syria: [
			[2012, 2022, "-", "Mar", "lastFri", [0, 0, 0, null], 60, "S"],
			[2009, 2022, "-", "Oct", "lastFri", [0, 0, 0, null], 0, "-"]
		],
		AS: [
			[2008, "max", "-", "Apr", "Sun>=1", [2, 0, 0, "s"], 0, "S"],
			[2008, "max", "-", "Oct", "Sun>=1", [2, 0, 0, "s"], 60, "D"]
		],
		AN: [
			[2008, "max", "-", "Apr", "Sun>=1", [2, 0, 0, "s"], 0, "S"],
			[2008, "max", "-", "Oct", "Sun>=1", [2, 0, 0, "s"], 60, "D"]
		],
		Fiji: [
			[2014, 2018, "-", "Nov", "Sun>=1", [2, 0, 0, null], 60, "-"],
			[2015, 2021, "-", "Jan", "Sun>=12", [3, 0, 0, null], 0, "-"],
			[2019, "only", "-", "Nov", "Sun>=8", [2, 0, 0, null], 60, "-"],
			[2020, "only", "-", "Dec", "20", [2, 0, 0, null], 60, "-"]
		],
		NZ: [
			[2007, "max", "-", "Sep", "lastSun", [2, 0, 0, "s"], 60, "D"],
			[2008, "max", "-", "Apr", "Sun>=1", [2, 0, 0, "s"], 0, "S"]
		],
		Chatham: [
			[2007, "max", "-", "Sep", "lastSun", [2, 45, 0, "s"], 60, "-"],
			[2008, "max", "-", "Apr", "Sun>=1", [2, 45, 0, "s"], 0, "-"]
		],
		WS: [
			[2012, 2021, "-", "Apr", "Sun>=1", [4, 0, 0, null], 0, "-"],
			[2012, 2020, "-", "Sep", "lastSun", [3, 0, 0, null], 60, "-"]
		],
		Eire: [
			[1981, "max", "-", "Mar", "lastSun", [1, 0, 0, "u"], 0, "-"],
			[1996, "max", "-", "Oct", "lastSun", [1, 0, 0, "u"], -60, "-"]
		],
		EU: [
			[1981, "max", "-", "Mar", "lastSun", [1, 0, 0, "u"], 60, "S"],
			[1996, "max", "-", "Oct", "lastSun", [1, 0, 0, "u"], 0, "-"]
		],
		US: [
			[2007, "max", "-", "Mar", "Sun>=8", [2, 0, 0, null], 60, "D"],
			[2007, "max", "-", "Nov", "Sun>=1", [2, 0, 0, null], 0, "S"]
		],
		Canada: [
			[2007, "max", "-", "Mar", "Sun>=8", [2, 0, 0, null], 60, "D"],
			[2007, "max", "-", "Nov", "Sun>=1", [2, 0, 0, null], 0, "S"]
		],
		Mexico: [
			[2002, 2022, "-", "Apr", "Sun>=1", [2, 0, 0, null], 60, "D"],
			[2002, 2022, "-", "Oct", "lastSun", [2, 0, 0, null], 0, "S"]
		],
		Cuba: [
			[2012, "max", "-", "Nov", "Sun>=1", [0, 0, 0, "s"], 0, "S"],
			[2013, "max", "-", "Mar", "Sun>=8", [0, 0, 0, "s"], 60, "D"]
		],
		Haiti: [
			[2017, "max", "-", "Mar", "Sun>=8", [2, 0, 0, null], 60, "D"],
			[2017, "max", "-", "Nov", "Sun>=1", [2, 0, 0, null], 0, "S"]
		],
		Brazil: [
			[2016, 2019, "-", "Feb", "Sun>=15", [0, 0, 0, null], 0, "-"],
			[2018, "only", "-", "Nov", "Sun>=1", [0, 0, 0, null], 60, "-"]
		],
		Chile: [
			[2016, 2018, "-", "May", "Sun>=9", [3, 0, 0, "u"], 0, "-"],
			[2016, 2018, "-", "Aug", "Sun>=9", [4, 0, 0, "u"], 60, "-"],
			[2019, "max", "-", "Apr", "Sun>=2", [3, 0, 0, "u"], 0, "-"],
			[2019, 2021, "-", "Sep", "Sun>=2", [4, 0, 0, "u"], 60, "-"],
			[2022, "only", "-", "Sep", "Sun>=9", [4, 0, 0, "u"], 60, "-"],
			[2023, "max", "-", "Sep", "Sun>=2", [4, 0, 0, "u"], 60, "-"]
		],
		Para: [
			[2010, "max", "-", "Oct", "Sun>=1", [0, 0, 0, null], 60, "-"],
			[2013, "max", "-", "Mar", "Sun>=22", [0, 0, 0, null], 0, "-"]
		]
	}
});
