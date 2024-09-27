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


import { CIQ } from "../../js/standard.js";

if (!CIQ.Studies.Info) {
	CIQ.Studies.Info = {};
}

// Info object key is the study "name" in the library.
CIQ.Studies.Info = {
	...CIQ.Studies.Info,
	"Accumulation/Distribution": {
		description:
			"The Accumulation/Distribution (A/D) indicator calculates the strength of the market over time, based on the net change in price for each period compared to its prior period. When the net change is positive, the maximum difference between the close and the low or the close and the prior close is added to the A/D. Conversely, if the net change is negative the maximum difference between the close and the high or the prior close is subtracted from the A/D.You can use the A/D to analyze money flow. In this case, the positive or negative direction is multiplied by the volume for the current period.\nNote: The A/D uses all the data loaded into the chart. Typically this is 200 bars prior to the first bar shown. As the chart is compressed or panned it will load more data forcing the A/D to recalculate and will produce different values. That said, the pattern of the A/D will remain the same."
	},
	"Accumulative Swing Index": {
		description:
			"The Accumulative Swing Index indicator (ASI) aggregates all the prior Swing Index (SI) values providing a longer term tool to support a swing trading strategy. The ASI is designed to help simplify market interpretation and leverage the sensitivity of the SI which helps detect potential changes in trend.\nNote: The ASI uses all the data loaded into the chart. Typically this is 200 bars prior to the first bar shown. As the chart is compressed or panned it loads more data forcing the ASI to recalculate and will produce different values. That said, the pattern of the ASI will remain the same.\nThe Accumulative Swing Index was developed by Welles Wilder.\nRelated Study: Swing Index"
	},
	"ADX/DMS": {
		description:
			"ADX (Average Directional Index) or DMS (Directional Movement System) uses Directional Movement (DM) calculations to identify trends and gauge the strength of those trends. Directional Movement (DM) is defined as the largest part of the current period`s price range that lies outside the previous period`s price range. Each period will either be positive (PDM = larger range above previous range), negative (NDM = larger range below previous range), or zero if moves above and below the previous period`s range are equal or price stays within the previous day`s range (an inside bar).\nA smoothed average of both positive and negative directional movement are calculated and then divided by the Average True Range (ATR) to derive the Plus Directional Indicator (+DI) and Minus Directional Indicator (-DI). Each period will have only one result, either plus, minus or zero. +DI increases and -DI decreases during rising trends and vice-versa in down trends. The DI Difference (DI) is the sum of +DI and -DI. Accordingly, the DI Histogram will oscillate around zero as the market trends.\nThe Average Directional Index (ADX) is a simple moving average of the absolute value of the DI. The ADX is a non-directional trend analysis tool. Low values indicate the market has consolidated and is ready to trend, whereas high values indicate a strong trend has been well established and may be nearing an end.\nThe ADX/DMS study displays the ADX line as well as the +DI and -DI. In addition, there is an option to display a histogram of the spread between +DI and -DI which serves as a momentum oscillator."
	},
	Alligator: {
		description:
			"The Alligator indicator uses three smoothed moving averages (SMMAs) named Jaw, Teeth, and Lips. Each one is offset forward (into the future) to indicate convergence/divergence relationships. The SMMAs are calculated on the Median Price. When the market is trending, the Alligator lines will diverge. When the three lines are close together, the Alligator indicates consolidation. The Gator oscillator is often used as a companion study to better understand the divergence/convergence between the three SMMAs.\nThe Alligator study can hide its Jaw, Teeth, and Lips lines, enabling users to show only the Fractal Arrows to emphasize trading signals.\nThe Alligator indicator was invented by Bill Williams.\nRelated Study: Gator Oscillator"
	},
	"Anchored VWAP": {
		description:
			"Anchored VWAP derives the volume-weighted average price (VWAP) starting from a specified date and time. Unlike VWAP, the Anchored VWAP can be applied to both intraday and historical price data. The mean of the high, low, and close price is the default price used to derive Anchored VWAP.\nRelated Study: VWAP"
	},
	Aroon: {
		description:
			"The Aroon indicator measures the strength of a trend based on the recency of new Highs/Lows. Aroon plots two lines: the Aroon Up is based on recent highs and Aroon Down is based on recent lows. The values shown are in percentage terms and fluctuate between 0 and 100.\nRelated Study: Aroon Oscillator"
	},
	"Aroon Oscillator": {
		description:
			"The Aroon Oscillator measures the difference between Aroon Up and Aroon Down. The Aroon Oscillator is bounded between 100 and -100.\nRelated Study: Aroon"
	},
	"ATR Bands": {
		description:
			"The ATR Bands indicator displays two lines forming an envelope around the Price series (X) based on recent volatility as measured by Average True Range (ATR). The Bands are calculated using a percentage multiple (±Shift) of the ATR which is added/subtracted from X (typically, last price). When the price breaks out of the channel, it can be interpreted as a signal.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Average True Range (ATR), ATR Trailing Stop, True Range (TR), STARC Bands"
	},
	"ATR Trailing Stops": {
		description:
			"ATR Trailing Stop highlights a reversal in trend by plotting a stop point based upon recent market volatility. Average True Range (ATR) is used to adjust the stop point based upon recent market volatility. The trailing stop will continue to increase in a rising market, and decrease in a down market. If the trend stalls or the market consolidates, the stop will stabilize at a level until the trend resumes or crosses through the stop level. ATR Trailing Stop flips to the invert when price corrects below/above the stop line.\nCalculate the ATR and then apply the multiplier. For an up trend, subtract from previous close. For a down trend, add to the previous close.\nRelated Study: Average True Range (ATR), ATR Bands, True Range (TR)"
	},
	"Average True Range": {
		description:
			"The Average True Range (ATR) is a simple moving average of the volatility of the market as measured by the True Range (TR).\nRelated Study: ATR Bands, ATR Trailing Stop, True Range (TR)"
	},
	"Awesome Oscillator": {
		description:
			"The Awesome Oscillator measures the difference between a 5 period simple moving average (SMA) and a 34 period SMA based on the median price of each bar. The result is an unbounded oscillator. The Awesome is displayed as a histogram and each value is colored based on if the Awesome value is increasing or decreasing to provide visual clarity.\nRelated Study: Price Oscillator"
	},
	"Balance of Power": {
		description:
			"The Balance of Power is a moving average of the internal strength of each bar. The internal strength is measured by deriving a ratio of each bar's close-open relative to its high-low range. The highest/lowest value for any bar 1/-1, which occurs if the market opens on the low and closes on the high, and vice-versa in a down market. If the close equals the open the value for the bar is zero, indicating the power is balanced between the bulls and the bears."
	},
	Beta: {
		description:
			"Beta measures the volatility of returns for one security against those of a benchmark security, usually a market index. It is often used as a measure of risk of a security relative to the market. A Beta greater than 1.0 will tend to move up or down faster than the benchmark security."
	},
	"Bollinger %b": {
		description:
			"Bollinger %B is a percentage measure of a security`s location between the Bollinger Bands. %B can be lower than 0 or higher than 100 if price moves outside the bands which would be considered a breakout signal. A value of 50 implies the price is equal to the middle moving average.\nBollinger Bands were created by John Bolinger.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Bollinger Bands, Bollinger Bandwidth"
	},
	"Bollinger Bands": {
		description:
			"The Bollinger Bands indicator displays two lines forming an envelope around a moving average of price. The upper and lower bands are determined by a number of standard deviations above and below the moving average. The expansion and compression of the bands highlight changes in volatility. Breakouts of the bands typically represent trading opportunities.\nBollinger Bands were created by John Bolinger.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Bollinger Bandwidth, Bollinger %B"
	},
	"Bollinger Bandwidth": {
		description:
			"The Bollinger Bandwidth measures the difference (spread) between the upper and lower Bollinger Bands. As the market trends and price dispersion increases the bands will widen, thereby providing a measure of volatility. When the Bollinger Bandwidth is low, due to a market consolidation, it is often considered a setup for a trend.\nBollinger Bands were created by John Bolinger.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Bollinger Bands, Bollinger %b"
	},
	"Center Of Gravity": {
		description:
			"The Center of Gravity (COG) is a leading oscillator created by John Ehlers in 2002. It is used to identify support and resistance. It is constructed using a weighted moving average, which according to its creator, was analogous to the weighted coordinates of an object&#8217;s mass distribution. It is accompanied by a Signal line, a simple moving average.\nClaiming to have zero lag, COG allows for clear indication of reversals due to the smoothing effect of the indicator. When the COG line crosses above the signal line, it is an indication of an upturn. When the COG line crosses below the signal line, it is an indication of a market downturn."
	},
	"Chaikin Money Flow": {
		description:
			"The Chaikin Money Flow (CMF) indicator is a moving sum of volume which is weighted by where price closes within its range. The indicator oscillates around 0, with positive amounts indicating a bullish trend, and negative amounts indicating a bearish trend.\nThe weight is called a “multiplier”, which ranges from -1 for a close at the low to +1 for a close at the high. A multiplier of -1 implies all the volume is negative, and is subtracted from the moving sum. In contrast, if the multiplier equals +1, all the volume for the period is added to the moving sum.\nThe Chaikin Money Flow was developed by Marc Chaikin.\nRelated Study: On Balance Volume, Twiggs Money Flow"
	},
	"Chaikin Volatility": {
		description:
			"Chaikin Volatility measures the rate of change, in percentage terms, of a moving average of the high-low range. Higher values indicate the volatility (as measured by range) has been increasing relative to itself. The values are unbounded.\nThe Chaikin Volatility was developed by Marc Chaikin."
	},
	"Chande Forecast Oscillator": {
		description:
			"The Chande Forecast Oscillator (CFO) measures the spread, in percentage terms, between the market price and a Time Series Moving Average (TSMA) which is a n-period moving linear regression using the “least squares fit” method. The oscillator is above zero when the price is above the CFO and less than zero if it is below. The oscillator is quite responsive to changes in trend as the TSMA follows price quite closely.\nThe Chande Forecast Oscillator was introduced by Tushar Chande.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Moving Average Deviation"
	},
	"Chande Momentum Oscillator": {
		description:
			"The Chande Momentum Oscillator (CMO) compares, in percentage terms, the sum of all recent one-period price changes divided by the sum of the absolute values of the one-period price changes over the same time period. The range of the CMO is bounded between -100 and +100.\nThe Chande Momentum Oscillator was introduced by Tushar Chande and Stanley Kroll."
	},
	"Choppiness Index": {
		description:
			"The Choppiness Index (CI) is a non-directional trend analysis indicator which rises during a consolidation and falls as the market trends. The CI is a bounded range between 0 - 100. The higher the value, the less the market is trending.\nThe Choppiness Index was created by Australian commodities trader E.W. Driess."
	},
	"Commodity Channel Index": {
		description:
			"The Commodity Channel Index (CCI) study measures market momentum by deriving a price oscillator and normalizing it by the deviation of price from its average. Specifically, it uses the average of the high, low and close for the period (HLC3, also referred to as “typical price”) and subtracts the “n” period moving average of HLC3, this quantity is then divided by the mean deviation of price from the simple moving average (SMA). By measuring price relative to its SMA, the CCI effectively captures the acceleration and deceleration of a market trend.\nCCI is an unbounded oscillator. A factor of 0.015 is used to center the series so that +100 and -100 (default threshold values) may be used to identify Overbought and Oversold conditions. When CCI equals 0 it indicates that price is equal to the SMA. The Commodity Channel Index was developed by Donald Lambert."
	},
	"Coppock Curve": {
		description:
			"The Coppock Curve is calculated by first summing two rate of change measures, one with a long period and second with a short period. The Coppock Curve is a weighted moving average of this sum.\nThe Coppock Curve was created by Edwin Coppock.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	"Correlation Coefficient": {
		description:
			"The Correlation Coefficient is a statistical measure used to calculate the strength and direction of the linear relationship (or the statistical relationship) between two data sets. For charting, it is between two traded instruments and the result is recalculated for each period in the same way a moving average “moves” through time using fresh data.\nThe value ranges between -1 to +1. The positive and negative correlation coefficient represents the direct (positive) and inverse (negative) linear correlation or statistical relationship between the data sets. That is, a positive correlation indicates two instruments have traded in the same direction, whereas a negative correlation implies they have traded in opposite directions. If the correlation is close to zero or equal to zero then the data sets are considered uncorrelated."
	},
	"Darvas Box": {
		description:
			"The Darvas Box is a support/resistance indicator and a trading methodology rolled into one. It is an overlay study meant to indicate stocks that are trading at new highs by highlighting recent highs and lows to indicate entry points and placement of stop-losses.\nThe rules of drawing the Darvas Box are:\n<div class=ciq-info-panel-indent>&#8226; Boxes are drawn around bars where an “all time high” was reached followed by 3 successive higher lows, and the high of the first bar was not broken by a higher high.\n&#8226; The box continues until either the original high is broken out, or the lowest of the 2 successive lows is broken below.\n&#8226; User can configure if high/low or close breaks the box.\n&#8226; User can configure if “Ghost boxes” are shown.\n<div class=ciq-info-panel-indent>&#8227; These will form on an upwards breakout of a Darvas.\n&#8227; The low of the Ghost box will be the same value as the high of the Darvas which was broken.\n&#8227; The height of the Ghost box will be the same as the Darvas box.\n&#8227; The width of the Ghost box will be either:\n<div class=ciq-info-panel-indent>&#8259; The width of the Darvas box\n&#8259; Until the Ghost box is broken below\n&#8259; Until the Ghost box is broken above, in which case another Ghost box forms with the lower left corner at the upper right corner of the preceding Ghost box.</div></div>\n&#8226; User can define if arrow is drawn pointing to a volume spike and at what percentage that will be.\n&#8226; User can configure period defining all time high.\n&#8226; User can define a price minimum below which boxes will not form.\n&#8226; User can define whether “Stop Levels” are drawn and how far below the box low. Stop levels cannot be lowered, only raised (or broken).</div>\nWhile the indicator will run on any bar interval it is best used on higher intervals (i.e., weekly/monthly) with securities in a strong trend.\nThe logic behind the construction of the Darvas Box is somewhat complex but the usage is fairly straightforward. Once you have a closed box (a blue box assuming the default settings) you wait for a close (or a high) above the box on higher volume for a bullish signal or a close (or a low) below the box on higher volume for a bearish signal. The stop would generally be set just past the other side of the box. New boxes which form while you are in a trade provide an opportunity to build on a position upon a new breakout as well as updating a trailing stop level based on the most recent box. When used strictly as an indicator, the Darvas Box is an excellent mechanism to identify trading ranges on all bar intervals."
	},
	"Depth of Market": {
		description:
			"The Depth of Market (DOM) study overlays a vertical market depth chart over the price chart. This DOM shows the supply and demand by indicating the number of bids (buy orders) and asks (sell orders) for each price level surrounding the current market price. The overlay of DOM on the price chart supports blending of technical analysis with the current supply and demand data.\nThe DOM study requires Level 2 market data."
	},
	"Detrended Price Oscillator": {
		description:
			"The Detrended Price Oscillator (DPO) seeks to remove trend information from the data. It does this by taking a moving average and shifting it to the left. It then subtracts the average from the time period from the close of that time period to arrive at the result.\nThe DPO will not be displayed on the most recent period as the moving average is shifted to the left. The resulting DPO plot will emphasize the movement of the security above and below the moving average while filtering out the general trends. The DPO is often used to help find cycles in the market by identifying peaks and troughs.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	"Disparity Index": {
		description:
			"The Disparity Index (DI) measures the distance of price from a moving average in percentage terms. The DI is an unbounded oscillator that uses percentage based calculation to normalize the spread across time and price.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Moving Average Deviation"
	},
	"Donchian Channel": {
		description:
			"The Donchian Channel displays a median line and bands that form an envelope around price. The Donchian High is the Highest High and the Donchian Low is the Lowest Low of the prior n periods starting with the previous bar. The median line is the average of the Donchian High and Donchian Low bands for each period.\nThe Donchian Channel was developed by Richard Donchian.\nRelated Study: Donchian Width, Highest High Value, Lowest Low Value"
	},
	"Donchian Width": {
		description:
			"The Donchian Width indicator measures the spread between the Donchian High and Donchian Low bands. This serves as a simple measure of volatility as it captures the range expansion/compression of the market.\nThe Donchian Channel was developed by Richard Donchian.\nRelated Study: Donchian Bands, Highest High Value, Lowest Low Value"
	},
	"Ease of Movement": {
		description:
			"The Ease of Movement (EOM) indicator is designed to measure volume`s impact on price. EOM first divides the volume by the period`s high-low Range, essentially distributing the volume equally across the high-low range. This value is then used as the denominator to measure the impact on the price change. A large change in price implies the volume was able to move the market.\nEOM is an unbounded oscillator. A rising EOM indicates the market is easily moving upward, and the converse is true on the downside.\nThe Ease of Movement indicator was developed by Richard W. Arms, Jr."
	},
	"Ehler Fisher Transform": {
		description:
			"The Ehler Fisher Transform (EFT) is designed to convert prices into a Gaussian normal distribution based on the recent n-period trading range. The EFT is an unbounded oscillator with a trailing Trigger line that is the EFT with a lag of 1 period. The EFT is designed to reduce volatility of the indicator, but still provide timely signals of change in trend.\nThe Fisher Transform is a technical indicator created by John F. Ehlers."
	},
	"Elder Force Index": {
		description:
			"The Elder Force Index (EFI) is a money flow based oscillator that multiplies the period`s volume times the price change thereby showing the strength of the price movement. EFI is an unbounded oscillator. A rising EFI indicates volume is driving prices higher, and a declining EFI indicates volume is pushing the market lower.\nThe Elder Force Index was developed by Alexander Elder."
	},
	"Elder Impulse System": {
		description:
			"The Elder Impulse System (EIS) combines net changes in an exponential moving average (EMA) of price with net changes in the MACD histogram to produce bullish and bearish signals applied to the chart using paintbars. The result is a colored bar chart where the colors represent bullish, bearish or neutral signals. Bullish (green) signals appear when the values of both the EMA and the MACD Histogram increase from the prior period. Conversely, if both decrease then it is a bearish (red) signal. If they move in opposite directions then it is a neutral signal (blue).\nThe Elder Impulse System was developed by Alexander Elder."
	},
	"Elder Ray Index": {
		description:
			"The Elder Ray Index is an unbounded oscillator that displays two superimposed histograms measuring the distance of the high/low from the exponential moving average.\nThe Elder Ray Index was developed by Alexander Elder."
	},
	"Fractal Chaos Bands": {
		description:
			"The Fractal Chaos Bands are designed to identify breakouts and trend persistence based on the market making new Highs/Lows. An upside breakout is identified when the current high is the Highest High when compared to the prior two highs, in which case the Upper Band holds its last value and moves sideways. If the market is not trending, either up or down, then the Upper Band will display the high from two bars ago. The reverse is done for the Lower Band.\nRelated Study: Fractal Chaos Oscillator"
	},
	"Fractal Chaos Oscillator": {
		description:
			"The Fractal Chaos Oscillator has three states -1, 0, +1. A value of 0 indicates the market is consolidating. A value of +1 indicates a change in the upper range of the market, as best seen using the Upper Fractal Chaos Band. A value of -1 indicates a change in the lower range of the market, as best seen using the Lower Fractal Chaos Band.\nThe Fractal Chaos Oscillator was developed by E. W. Dreiss.\nRelated Study: Fractal Chaos Bands"
	},
	"Gator Oscillator": {
		description:
			"The Gator Oscillator (GO) is derived from the Alligator indicator. It plots two histograms in opposite directions that highlight the divergence/convergence between the three SMMAs used in the Alligator: Jaws, Teeth, and Lips. The positive histogram is the absolute value of the (Jaw - Teeth). The negative histogram is the absolute value of the (Teeth - Lips) multiplied by -1.\nGreen histogram bars indicate the averages are diverging, highlighting acceleration of the trend. Red bars indicate convergence of the averages showing the trend is losing strength. Compression of the histograms helps determine when a market is consolidating.\nAlthough the GO can be used separately, it is most often combined with the Alligator as they complement each other in giving a more complete overview of current market conditions. The GO shows the absolute degree of convergence/divergence of the three moving averages plotted by Alligator study."
	},
	"GoNoGo - Icons + Trend": {
		description:
			"Trend identification is arguably the most important concept in technical analysis. By blending objective, widely proven statistical indicators together with the foundational principles of technical analysis, GoNoGo Trend® colors the price action of any security according to the strength of its trend.\nDisciplined investing is simple, but not easy. Many traders and investors are overwhelmed by the often redundant, occasionally contradictory, and ever-complicated battery of indicators. GoNoGo Charts help investors understand the direction and continuity of price trends for any security, any asset class, across any time frame. By blending objective principles of technical analysis and the most widely used statistical measures, GoNoGo Charts remove “indicator overload.” Investors remain focused on what matters most – price – while colors of each bar or candle reflect the strength of the trend.\nFinancial markets can be complicated, your charts don’t have to be.\nFree from the clutter of many technical charts, GoNoGo Trend is easy to interpret. It paints the price bars bright blue when its unique mix of inputs signal the strongest bullish environment. When slightly less bullish, the color turns to aqua. This can happen at the start of a new trend, or after bright blue bars, indicating that the trend may be weakening. The amber bars represent uncertainty, often appearing in the transition from bull trend to bear trend and vice versa. The lower intensity bearish color is pink, and the darker purple appears when the bearish trend intensifies.\nGoNoGo Charts highlight low-risk opportunities for trend participation and alert investors to short-term countertrend corrections with intuitive icons directly in the price action.\nThe resurgence of momentum in the direction of the trend is an excellent entry opportunity, or the chance to scale up positions. GoNoGo Icons illuminate these events on the chart with green or red solid circles. When GoNoGo Trend is painting blue bars, a green solid circle will appear above price each time GoNoGo Oscillator finds support at zero. When GoNoGo Trend is painting purple bars, a red solid circle will appear each time GoNoGo Oscillator hits resistance at the zero-line from below.\nContrarily, within a “Go” trend, a security’s momentum may reach overbought levels, then fall back toward the zero-line. While in a “NoGo” trend, a security’s momentum may fall to extreme oversold levels, and then cool. As the momentum calculations retreat from extreme overbought or oversold levels, GoNoGo Icons highlight the possible countertrend correction in price."
	},
	"GoNoGo - Oscillator": {
		description:
			"Momentum goes hand in hand with trend identification. GoNoGo Oscillator® helps investors understand the velocity of price change, giving valuable information about the strength of a trend and the market’s conviction in it. Strong or increasing momentum provides confirmation of a trend while decelerating momentum gives the investor a leading indication of weakness and the potential for reversal.\nGoNoGo Oscillator® blends several popular momentum ideas together to provide the user with meaningful momentum analysis. As an oscillator, the indicator’s values range above and below zero, from -6 to +6, with extreme positive values being considered overbought and extreme negative values, oversold. Within trend, a security’s momentum may reach overbought/oversold levels, then fall back toward the zero-line, and then rally again. A break above/below zero would indicate divergent momentum – unsustainable for a healthy trend.\nIn addition, GoNoGo Oscillator’s color features a change from light blue to dark blue when volume is heavier than normal. Confirming or diverging volume readings give investors additional insight at pivotal decision points."
	},
	"GoNoGo - Squeeze": {
		description:
			"Studies have shown that momentum readings are not only useful for mean-reversion strategies but can also add insight within trend. GoNoGo Oscillator is calculated so that when inputs are in neutral territory, it rests at zero. Meaning, when enthusiasm wanes within a trending market, GoNoGo Oscillator® provides an objective point of support/resistance for momentum at the zero line.\nWhere there is no excessive buying or selling, price action stagnates, volatility declines, markets move sideways, and GoNoGo Oscillator® rests at the zero line. This volatility compression is highlighted by GoNoGo Squeeze®. A visual grid in the oscillator panel climbs as momentum remains neutral reaching extremes with prolonged reduction in volatility. Like a coiled spring, researchers have shown that following these stalemates between buyers and sellers, a breakout can be expected."
	},
	"GoNoGo - Trend": {
		description:
			"The GoNoGo Trend study colors the price action of any security according to the strength of its trend, making it simple to identify and interpret the current trend:\n<div class=ciq-info-panel-indent>&#8226; Bright Blue price bars indicate the strongest bullish environment.\n&#8226; Aqua bars are slightly less bullish; they often occur at the start of a new trend, or as a strong bullish trend begins to weaken.\n&#8226; Amber bars represent uncertainty, often appearing in the transition from bull trend to bear trend and vice versa.\n&#8226; Pink bars indicate a lower intensity bearish environment\n&#8226; Dark Purple bars are shown when the bearish trend intensifies.</div>\nThe “Go” and “NoGo” labels on the chart mark transitions to bull or bear trends, respectively.\nFor more information:\n<a href='https://www.gonogocharts.com/indicators/' target='_blank' style='margin-top:0px;padding-left:0px'>www.gonogocharts.com/indicators</a>"
	},
	"Gopalakrishnan Range Index": {
		description:
			"The Gopalakrishnan Range Index (GAPO) measures the volatility of the market by measuring the natural log of the spread between the Highest High and Lowest Low over a given period which is then normalized by the natural log. When the GAPO is increasing the market is making new highs or lows relative to the lookback period."
	},
	"Guppy Multiple Moving Average": {
		description:
			"The Guppy Multiple Moving Average (GMMA) combines a group of six short-term exponential moving averages (EMA) and a group of six long-term EMAs. The multiple moving averages provide a “weight of the evidence” approach to identify changing trends, breakouts, and trading opportunities in the price of an asset.\nThe Guppy Multiple Moving Average was introduced by Daryl Guppy."
	},
	"High Low Bands": {
		description:
			"The High Low Bands are drawn a percentage or number of points above and below a triangular moving average of the selected field.\nRelated Study: Triangular Moving Average, Moving Average Envelope"
	},
	"High Minus Low": {
		description:
			"High Minus Low measures the trading range of the bar.\nRelated Study: True Range"
	},
	"Highest High Value": {
		description:
			"Identifies the highest price over a defined range, excluding the current bar in order to highlight if the current price is exceeding the recent Highest High.\nRelated Study: Lowest Low Value"
	},
	"Historical Volatility": {
		description:
			"Historical Volatility measures the standard deviation of the underlying percent returns over n-periods. The result is annualized."
	},
	"Ichimoku Clouds": {
		description:
			"The Ichimoku Cloud study is designed to indicate support/resistance, momentum, and trend direction. It plots five lines and computes various “clouds” based on the interactions between these lines. Ichimoku translates to “one look,” implying that the indicator can signal support and resistance at a glance.\nThere are five components:\n<div class=ciq-info-panel-indent>&#8226; Tenkan Sen (Conversion Line) &#0150; Calculated as the sum of the Highest High over the past nine periods and the Lowest Low divided by two.\n&#8226; The Kijun Sen (Base Line) &#0150; Calculated as the sum of the Highest High over the past 22 periods and the Lowest Low divided by two.\n&#8226; Senkou Span A (leading) &#0150; The sum of the Tenkan Sen and the Kijun Sen divided by two. The calculation is then plotted 26 time periods ahead of the current price action.\n&#8226; Senkou Span B (leading) &#0150; The sum of the Highest High and the Lowest Low over the past 52 periods divided by two. It is also plotted 26 periods ahead.\n&#8226; Chikou (lagging) &#0150; The same and Senkou Span B leading but plotted 26 periods in the past.</div>"
	},
	"Intraday Momentum Index": {
		description:
			"The Intraday Momentum Index (IMI) measures trend strength by using a ratio of the moving sum of the close-open (candle body) over the past “n” periods and relative to the moving sum of the net decreases. The result is a bounded oscillator that is indexed between 0 and 100 and is displayed with Overbought (OB) and Oversold (OS) levels.\nThe methodology to calculate IMI is quite similar to the Relative Strength Indicator (RSI) and can be interpreted in a similar manner. The central difference between the two is IMI measures market strength/weakness using the range of close-open (hence, the use of ‘Intraday` in the name) whereas RSI measures the one-period net change. An advantage of IMI is it tends to trend more smoothly and produces OB/OB levels more frequently.\nRelated Study: RSI"
	},
	"Keltner Channel": {
		description:
			"The Keltner Channel indicator displays two lines forming an envelope around a moving average of price. The upper and lower channel lines are determined by adding/subtracting a multiple of the Average True Range above and below the moving average of price. The Keltner Channel highlights the expansion and compression of volatility."
	},
	"Klinger Volume Oscillator": {
		description:
			"The Klinger Volume Oscillator (KVO) is designed to identify short term fluctuations in money flowing in or out of a security. Each period`s volume is assigned a positive or negative value based on the one period change in Typical Price (the mean of the high, low, and close). The KVO is the spread between a long and a short exponential moving average (EMA) of the directional volume series.\nThe Signal Line is simply an EMA of the KVO line. The KVO Histogram measures the spread between the KVO and the Signal line. The KVO Histogram is colored green when the values are increasing and red when they are decreasing (green and red are default colors).\nKVO is useful in helping evaluate if volume is supporting the trend.\nThe KVO was developed by Stephen Klinger."
	},
	"Linear Reg Forecast": {
		description:
			"The Linear Regression Forecast (LRF) uses the ordinary least squares method to derive a linear function which plots a straight line through prices so as to minimize the distances between the prices and the resulting trendline. The last point of the trendline is the forecasted value. The LRF is a moving series which plots the forecasted value of the derived trend line each period, thereby following the market like a moving average.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Time Series Forecast, Linear Regression R2, Lin Regression Slope, Linear Regression Intercept"
	},
	"Linear Reg Intercept": {
		description:
			"The Linear Regression Intercept (LR-I) uses the ordinary least squares method to derive a linear function which plots a straight line through prices so as to minimize the distances between the prices and the resulting trendline. The LR-I is a moving linear regression which plots the y-axis intercept for the derived trend line at each period. The intercept is the origination point of the regression and thereby appears to be an offset moving average.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Linear Regression Forecast, Linear Regression Slope, Linear Regression Intercept"
	},
	"Linear Reg R2": {
		description:
			"The Linear Regression R2 (LR-R2) uses the ordinary least squares method to derive a linear function which plots a straight line through prices so as to minimize the distances between the prices and the resulting trendline. The LR-R2 is a moving linear regression which plots the R-Squared for the derived trend line at each period. The LR-R2 is an oscillator that effectively measures the quality of fit of the derived trend line. Higher R2 values indicate better quality of fit of the trend line and the LR-Forecast thereby making it an ideal companion study to LR-Forecast.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Linear Regression Forecast, Linear Regression Slope, Linear Regression Intercept"
	},
	"Linear Reg Slope": {
		description:
			"The Linear Regression Slope (LR-Slope) uses the ordinary least squares method to derive a linear function which plots a straight line through prices so as to minimize the distances between the prices and the resulting trendline. The LR-Slope is a moving linear regression which plots the slope for the derived trend line at each period. The LR-Slope is an oscillator that effectively measures the direction of the market over the defined period.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Linear Regression Forecast, Linear Regression R2, Linear Regression Intercept"
	},
	"Lowest Low Value": {
		description:
			"Identifies the lowest price over a defined range, excluding the current bar to highlight if the current price is below the recent Lowest Low."
	},
	MACD: {
		description:
			"The Moving Average Convergence/Divergence (MACD) indicator makes use of three exponential moving averages (EMA). Two are averages of price and the third is a signal line that is an average of the difference of the other two.\nThe MACD line is generated from the first two averages, subtracting the longer from the shorter. The Signal Line is simply an EMA of the MACD line. The MACD Histogram measures the spread between the MACD and the Signal line. Changes in direction of the MACD Histogram are often used as early signals of change in trend."
	},
	"Market Facilitation Index": {
		description:
			"The Market Facilitation Index (MFI) is a histogram that analyzes the effect of volume on price. The MFI does not provide directional information, but rather divides the bars range by volume thereby measuring if price responded to the volume executed. A high MFI indicates the volume was able to drive price movement, whereas a low MFI indicates significant balance between buyers and sellers.\nThe MFI histogram is colored to identify four states that indicate the quality of the price action in relation to increasing or decreasing volume:\n<div class=ciq-info-panel-indent><b>Green:</b> MFI and volume both increased, signifying the directional momentum is increasing and the volume was able to move price.</div>\n<div class=ciq-info-panel-indent><b>Fade (Brown):</b> MFI and volume both decreased, signifying momentum is decreasing.</div>\n<div class=ciq-info-panel-indent><b>Fake (Blue):</b> MFI is increasing while volume is decreasing, signifying uncertainty about whether one-off speculators are driving the market or not</div>\n<div class=ciq-info-panel-indent><b>Squat (Pink):</b>MFI is decreasing while volume is increasing, signifying active competition between the bears and bulls in the market, and unclear price direction.</div>\nThe MFI was developed by Bill Williams."
	},
	"Mass Index": {
		description:
			"The Mass Index (MI) is a measure of volatility which has been stabilized to provide comparable values over time. High volatility is often associated with turning points in a market. When the MI crosses above the Bulge Threshold it is an indication that volatility has hit an extreme level.\nThe MI is derived by comparing an exponential moving average (EMA) of the high-low range to a smoothed EMA of the range. These ratios are then summed over time which serves to normalize the MI.\nThe Mass Index indicator was developed by Donald Dorsey."
	},
	"Median Price": {
		description:
			"A simple moving average of the mid-point between the High and Low of each bar.\nRelated Study: Moving Average"
	},
	"Momentum Indicator": {
		description:
			"Momentum measures the change in price over a set range, it is simply: Current Price - Price n-periods ago. Momentum is similar to Price Rate of Change except it shows actual change rather than percent change."
	},
	"Money Flow Index": {
		description:
			"Money Flow Index (MFI) is essentially a volume-weighted Relative Strength Index (RSI). However, instead of using simple close prices, MFI uses the Typical Price (TP or HLC3, the mean of the high, low and close) multiplied by volume. The result is then used in the RSI calculation as a ratio of average volume weighted size of the up-closes over the past “n” periods and compared to the average volume weighted size of the down-closes. The result is a bounded oscillator that ranges from 0 and 100.\nThe Money Flow Index (MFI) was developed by Gene Quong and Avrum Soudack."
	},
	"Moving Average": {
		description:
			"Moving Averages (MAs) are average price lines that use a fixed lookback and update with each new period. They are the most common tool to remove noise and volatility from a data series allowing the underlying trend to be seen. MAs are a core building block of many other studies. There are many types of moving averages, the most important of which being the Simple Moving Average (SMA), the Exponential Moving Average (EMA).\nMoving Averages may be applied to any data series or study shown on the chart using the Field parameter."
	},
	"Moving Average Cross": {
		description:
			"Applies three moving averages of the same type to signal changes in trend as the shorter moving averages cross the longer ones."
	},
	"Moving Average Deviation": {
		description:
			"The Moving Average Deviation measures the spread, in points, between the market price and a moving average. The calculation may be shown in either points or percentages.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Disparity Index"
	},
	"Moving Average Envelope": {
		description:
			"The Moving Average Envelope (MAE) plots two lines that form an envelope around a Moving Average of price. The upper and lower bands are a percentage or number of points above and below the moving average.\nThe MAE can be derived using any of the eleven averaging methodologies supported and may be applied to any data field or study displayed on the chart."
	},
	"Negative Volume Index": {
		description:
			"The Negative Volume Index (NVI) and its sister study, the Positive Volume Index (PVI), are designed to measure the quality of the trend by using volume as a barometer to evaluate the strength of the price action. Price changes on decreasing volume are considered a positive indicator. Whereas, price changes with increasing volume are considered a negative indicator, as increasing trading volumes are more common with retail traders following-the-crowd.\nNVI is a moving average of cumulative percentage price changes on periods when volume decreases from bar to bar. For clarity, volume is only used to determine which data points to average, it is not part of the calculation. A trailing moving average of the NVI is used to signal significant changes in trend.\nThe Negative Volume Index (NVI) was developed by Paul Dysart.\nNOTE: This study can have other studies applied to it using the Field parameter.\nRelated Study: Negative Volume Index"
	},
	"On Balance Volume": {
		description:
			"On Balance Volume (OBV) is a cumulative total of the daily volume which sums the volume on days when price rises and subtracts the volume on down days. OBV is often used as a confirmation indicator that shows if the volume activity is supporting the trend.\nRelated Study: Trade Volume Index"
	},
	"Option Sentiment By Strike": {
		description:
			"The Option Sentiment by Strike study overlays a profile of the volume or open interest of option contracts at each strike price for a security`s most current data point. Calls and puts are graphed as separate, adjacent horizontal bars, allowing the user to understand any bias within the two option types.\nDisplaying the actual market activity within a security`s corresponding derivative market allows the user to understand positioning and bias within that market. The study may be combined with any other price-based analytics to understand market support and resistance points."
	},
	"Parabolic SAR": {
		description:
			"The Parabolic SAR indicator is a stop and reverse (SAR) strategy that is designed to highlight when a trend has stalled indefinitely or reversed direction.\nThe initial SAR is set at the extreme price of the previous trend. After the initial SAR is set, the next interval`s SAR is adjusted in the direction of the trend by the distance between the high for the new trend and the previous SAR then multiplied by an acceleration factor (AF). This is then added to the prior period`s SAR. The acceleration factor typically starts at .02 and increases by .02 to a typical maximum of .20 each period the market makes a new high/low for the move.\nWhen price crosses above the SAR point, the entire calculation starts over but the extreme point becomes the Lowest Low of the new trend and the AF becomes a negative number. The reverse is true when price crosses below."
	},
	"Performance Index": {
		description:
			"The Performance Index (PI) study measures the relative strength of a security to the relative strength of a selected comparison security. Specifically, the PI derives the relative strength, price divided by a moving average, for both the primary series and the comparison series. The PI is the comparison of these two internal relative strength measures. As a ratio, the PI oscillates around 1.00, with positive values indicating strength of the primary security as compared to the benchmark comparison.\nRelated Study: Price Relative"
	},
	"Pivot Points": {
		description:
			"Pivots points are used to identify support, resistance and targets, most frequently on intraday charts. The Pivot Points study plots 7 horizontal lines for each period, one for the Pivot line, 3 support levels, and 3 resistance levels. The pivot point itself is simply the average of the high, low and closing prices from the previous trading period. In the subsequent period, trading above the pivot point is thought to indicate ongoing bullish sentiment, while trading below the pivot point indicates bearish sentiment. Pivot points are determined using a longer periodicity than the data displayed on the chart."
	},
	"Positive Volume Index": {
		description:
			"The Positive Volume Index (PVI) and its sister study, the Negative Volume Index (NVI), are designed to measure the quality of the trend by using volume as a barometer to evaluate the strength of the price action. Price changes on decreasing volume are considered a positive indicator. Whereas, price changes with increasing volume are considered a negative indicator, as increasing trading volumes are more common with retail traders following-the-crowd.\nPVI is a moving average of cumulative percentage price changes on periods when volume increases from bar to bar. For clarity, volume is only used to determine which data points to average, it is not part of the calculation. A trailing moving average of the PVI is used to signal significant changes in trend.\nThe Positive Volume Index (PVI) was developed by Paul Dysart.\nNOTE: This study can have other studies applied to it using the Field parameter.\nRelated Study: Negative Volume Index"
	},
	"Pretty Good Oscillator": {
		description:
			"The Pretty Good Oscillator (PGO) evaluates the strength of the trend in terms of the security`s volatility as measured by an average of the True Range (TR). The PGO calculates the spread of the current close from a simple moving average of the close. This value is normalized by dividing by an exponential moving average of the TR.\nThe Pretty Good Oscillator was created by Mark Johnson."
	},
	"Price Momentum Oscillator": {
		description:
			"The Price Momentum Oscillator (PMO) is a twice smoothed exponential moving average (EMA) of the percent change of price over one period. The PMO is an unbounded oscillator as it is based on the trend in one period percent changes. An EMA of the PMO is overlaid to provide a signal line to detect significant changes in the PMO oscillator.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	"Price Oscillator": {
		description:
			"The Price Oscillator measures the spread between two moving averages, similar to a MACD. Accordingly, it is an unbounded oscillator which measures trend strength. An advantage of the Price Oscillator is it allows the selection of Field, Moving Average Type, and derivation in Points or Percent.\nUnlike the MACD, the Price Oscillator does not display a Signal Line or a Histogram.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: MACD, RAVI"
	},
	"Price Rate of Change": {
		description:
			"Price Rate of Change measures the percent change in price over a set range. It is an unbounded oscillator similar to Momentum.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Momentum"
	},
	"Price Relative": {
		description:
			"Price Relative is a simple ratio of security A (the loaded security) divided by security B. A rising line indicates security A is out-performing security B and vice-versa."
	},
	"Price Volume Trend": {
		description:
			"The Price Volume Trend (PVT) is an aggregation of volume multiplied by price percent change over one period. Significant price moves result in large moves in PVT. The intent of the PVT is to assess the supply/demand balance and volume executed in rising markets versus falling markets."
	},
	"Prime Number Bands": {
		description:
			"Prime numbers are often considered magnetic points for price. Accordingly, the Prime Number Bands (PNB) indicator plots the nearest prime number above and below the market price. Spikes in the upper or lower PNB are often considered swing points in the market as it implies the market has failed to break through a prime number."
	},
	"Prime Number Oscillator": {
		description:
			"Prime numbers are often considered magnetic points for price. Accordingly, the Prime Number Oscillator (PNO) simply identifies if the closest prime number is above (+1) or below (-1) the market on the assumption that the market will gravitate toward that value."
	},
	"Pring's Know Sure Thing": {
		description:
			"Created by Martin Pring, The Know Sure Thing (KST) is an unbounded oscillator which sums together four smoothed Rate of Change oscillators with different periodicities into a single measure, the KST line. The use of multiple periodicities results in a very stable oscillator reducing the potential for false signals. The trading signals are generated when the KST line crosses above/below its signal line, a simple moving average of the KST. The KST can also be used to determine overbought and oversold conditions.\nKST operates on the principle that price trends are determined by confluence or divergence of many different time cycles and price trend reversals. As a result, the KST formula is weighted in favor of longer time spans.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	"Pring's Special K": {
		description:
			"Created by Martin Pring, the Special K is an unbounded momentum indicator that sums several different weighted averages of twelve rate-of-change calculations. The intent of combining the short-, intermediate- and long-term velocity into one series is to give a view of the true strength of the trend.\nSpecial K serves two functions. First, it identifies reversals in the primary trend relatively early. Second, it uses that information to time short-term pro-trend price moves.\nSpecial K operates on the principle that price trends are determined by confluence or divergence of many different time cycles and price trend reversals. As a result, the formula incorporates rate-of-change calculations using data from years in the past.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	"Projected Aggregate Volume": {
		description:
			"Projected Aggregate Volume (PAV) study is an aggregation of the day`s trading volume up to the current time along with a projection of the aggregate volume for the remainder of the trading day. The PAV study reveals whether the trend in trading volume is above or below average and provides a forecast of volume for the rest of the day.\nThe anchor time control allows the user to set the starting time of the study to understand how the volume is aggregated from that time forward.\nNote: This study is displayed ONLY for intraday periodicities.\nRelated Study: Projected Volume at Time"
	},
	"Projected Volume at Time": {
		description:
			"Projected Volume at Time (PVAT) is an average of intraday trading volume for each given time segment. The study highlights whether today`s volume for any particular segment is above or below average. PVAT projects the volume for each time segment for the remainder of the day. A bar graph shows the volume at each periodicity interval (candle); an overlay line shows the average volume for each time segment.\nThe anchor time control allows the user to set the starting time of the study. If the volume for a given time segment exceeds the threshold multiplier of the average for that time it will be highlighted in yellow (default color).\nNote: This study is displayed ONLY for intraday periodicities.\nRelated Study: Projected Aggregate Volume"
	},
	"Psychological Line": {
		description:
			"The Psychological Line measures the percentage of bars with rising closing prices relative to the prior bar over the defined period. Values above 50% indicate buyers are in control pushing prices higher whereas a value below 50% indicates weakness as sellers are pushing prices lower on average."
	},
	QStick: {
		description:
			"The QStick indicator is a moving average of close-open. It measures the average height of the body of a candle, providing insight to the internal strength of the market."
	},
	"Rainbow Moving Average": {
		description:
			"The Rainbow Moving Average (RMA) study displays ten smoothed simple moving averages (SMA) overlaid on price. The first SMA is calculated on price, each subsequent average smooths the prior SMA using the same range parameter. The averages are color-coded with red being the first average and purple as the smoothest/slowest average.\nThe RMA can be used to identify trend strength and signal reversals. The trend is strongest when all the SMAs are rising or falling. A reversal is signaled when the faster averages cross all of the slower averages. Consolidation is seen when the averages converge and the spread between them collapses.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	"Rainbow Oscillator": {
		description:
			"The Rainbow Oscillator (RO) study is a price oscillator that is normalized by the price range. The RO measures the spread of the last price to the average of the ten simple moving averages (SMAs) which is then divided by the range of Highest High-Lowest Low (HH-LL) over the selected period. The result is a momentum oscillator that is normalized by the magnitude of the market&#8217;s movement. That is, during a trend both the numerator and the denominator will increase in value, whereas in a consolidation both will decrease.\nThe RO histogram is displayed within upper and lower bands which mirror one another. Similar to the RO, the Bands measure the spread between the highest and lowest SMA, this value is normalized by the HH-LL range as well.\nThe Rainbow Oscillator was developed by Mel Widner.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Rainbow Moving Average"
	},
	"Random Walk Index": {
		description:
			"The Random Walk Index (RWI) is a statistical indicator that helps determine if the current trend is statistically significant or if it is closer to behaving randomly. RWI plots two lines, a High and a Low, which measure the upward and downward trends, respectively. A significant divergence of the High and Low lines indicates a non-random trend is underway. Spikes in either line indicate a trend corresponding to that line. When the High and Low lines are hovering toward the bottom or close together, it indicates more random behavior. A value of zero in either line indicates the trend in the opposite direction has likely reached an extreme point."
	},
	RAVI: {
		description:
			"The Rapid Adaptive Variance Indicator (RAVI) measures the percent difference between two moving averages. RAVI is an unbounded oscillator that is similar to the Price Oscillator and MACD, except the result is in percent. In addition it is displayed as a histogram with colored bars which indicate the moving averages are diverging and above/below the Overbought/Oversold level which indicates a trend is in place and accelerating.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Price Oscillator"
	},
	"Relative Vigor Index": {
		description:
			"The Relative Vigor Index (RVI) study compares a Triangular Moving Average (TMA) of the close-open (candle bodies) to a TMA of the high-low range. The RVI rises when the close is near the highs and the open is near the lows. Candle bodies are close in size to the high-low range of the period. The converse is true in down trends.\nA TMA of the RVI is used as a signal line to indicate significant change in trend. In addition, a histogram is displayed which measures the spread between the RVI and its Signal line."
	},
	"Relative Volatility": {
		description:
			"Relative Volatility measures the standard deviation of price changes over a set lookback range. The value is then normalized into a percentage, with overbought and oversold lines being marked at 70% and 30%, respectively. Readings above 50 indicate upward volatility, while readings below 50 indicate downward volatility.\nIt is similar to the Relative Strength Index (RSI), which looks at the close instead of the standard deviation.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	RSI: {
		description:
			"The Relative Strength Index (RSI) measures trend strength by using a ratio of average size of the net increases over the past “n” periods and relative to the average size of the net decreases. The result is a bounded oscillator that is indexed between 0 and 100 and is displayed with Overbought and Oversold levels. RSI values are smoothed exponentially using the same “n” period parameter.\nThe RSI was developed by J. Welles Wilder Jr.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Intraday Momentum Index (IMI)"
	},
	"Schaff Trend Cycle": {
		description:
			"The Schaff Trend Cycle (STC) is designed to be a forward-looking, leading indicator that generates faster, more reactive and accurate signals than other indicators. The STC is a double smoothed stochastic of the MACD creating a bounded oscillator between 0 - 100.\nThe STC will remain in Overbought or Oversold territory for long stretches of time producing limited information when a market is trending. Crossing above 25 or below 75 are the key signals generated by the STC.\nThe Schaff Trend Cycle was developed by Doug Schaff.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	"Shinohara Intensity Ratio": {
		description:
			"The Shinohara Intensity Ratio (SIR) displays Strong (Strength) and Weak Ratio (Popularity) lines which are similar to the +DI and -DI of the ADX/DMS study. Market strength is indicated when the SIR Strong Ratio is above the SIR Weak Ratio.\nThe Weak Ratio is a moving sum of the High-Close divided by Close-Low. In a bull market when the Close is typically above the midpoint of the bar the numerator High(i)-Close(i) will be less than the denominator Close(i)-Low(i) resulting in smaller values that are summed.\nThe Strong Ratio is a moving sum of a bar&#8217;s High less the prior bar&#8217;s Close divided by the prior Close less the Low. This captures the true directional strength of a trend as prices should advance/decline from one period to the next. Accordingly, the Strong Ratio will follow the market. A change in direction of the Strong Ratio suggests that a trend may be reversing and a cross of the Weak Ratio indicates an emerging trend."
	},
	"Standard Deviation": {
		description:
			"The Standard Deviation indicator is a statistical measure of variability, it is frequently used to assess market volatility. A low standard deviation indicates that the data points tend to be very close to the mean which occurs when the market is consolidating. A high standard deviation value indicates significant dispersion of the data points which often occurs when trends are ending.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	"STARC Bands": {
		description:
			"The STARC (Stoller Average Range Channel) Bands are similar to ATR Bands, except the bands are centered on a simple moving average (SMA) instead of the last close. STARC plots the SMA with upper and lower bands based on recent volatility as measured by Average True Range (ATR). The Bands are calculated using a set percentage multiple (±S) of the ATR which is added/subtracted to the SMA.\nWhen the price breaks out of the channel, it can be interpreted as a signal. Given the center line is a moving average instead of last price, the bands are far more stable than the ATR Bands.\nSTARC Bands were developed by Manning Stoller.\nRelated Study: Average True Range (ATR), ATR Trailing Stop, True Range (TR), ATR Bands"
	},
	"Stochastic Momentum Index": {
		description:
			"The Stochastic Momentum (SMI) is a variation on the original Stochastic indicator, both of which are bounded oscillators designed to identify Overbought and Oversold conditions. The SMI measures price relative to the median of its recent range, rather than a percentage location within the range as done for the Stochastic. The SMI is positive when price is above the median and negative when below it. In addition the SMI uses EMAs to smooth and stabilize the output.\nThe %D is a moving average of the %K SMI line which provides trigger line that helps to confirm the directional signals. The SMI oscillator values range from -100 to 100 with Overbought and Oversold thresholds defaulted to 40 and -40, respectively.\nThe SMI was developed by William Blau."
	},
	Stochastics: {
		description:
			"The Stochastics indicator is a bounded oscillator that normalizes price within a range by measuring the percentage distance of the last price relative to the upper and lower bounds of its recent trading range. That is, the Stochastic equals 0 when price is at the bottom of the range and 100 when it is at the top. The Fast version (%K) of the Stochastic simply measures where price is in its range. The Slow version (%D) of Stochastic applies a simple moving average (SMA) (typically, 3 period) to remove the volatility of the oscillator and reduce the number of signals generated.\nThe %D is a trailing trigger line which is a SMA of the %K Stochastic line. The Stochastic values range from 0 to 100. The Overbought and Oversold levels default to 80 and 20 respectively.\nThe Stochastic Oscillator was developed by George C. Lane.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Williams %R, Stochastic Momentum"
	},
	Supertrend: {
		description:
			"The Supertrend indicator is a trailing stop tool which plots either a support line below the market or a resistance line above the market, based on the market trend. The Supertrend will switch lines when the high or low price intersects with the plotted line, similar to the Parabolic SAR indicator.\nThe upper line is the median price plus a multiple of Average True Range (ATR). Similarly, the lower line is the median price minus a multiple of the ATR. Similar to any trailing stop, the upper line follows the market lower and will never move higher once established. Conversely, the lower line follows the market higher and will never move lower once established.\nArrows are drawn pointing to the close of the bar when the direction changes and the bands flip."
	},
	"Swing Index": {
		description:
			"The Swing Index indicator (SI) uses last two bars data to identify market swings that may signal a change in trend over a longer period of time. Accordingly, each period`s value is independent from prior values. The SI compares the action from the current high/low to the prior close as well as the current range and open-close body of the current and prior bars. The short term nature of the SI make is useful as an early warning signal highlighting that investors are changing their trading behavior setting up for a potential change in trend.\nThe Swing Index was developed by Welles Wilder.\nRelated Study: Accumulative Swing Index"
	},
	"Time Series Forecast": {
		description:
			"The Time Series Forecast (TSF) uses the ordinary least squares method to derive a linear function which plots a straight line through prices so as to minimize the distances between the prices and the resulting trendline. The last point of the trendline is the forecasted value. The TSF is a moving series which plots the forecasted value of the derived trend line each period, thereby following the market like a moving average.\nNOTE: This study can be applied to other studies by using the Field parameter.\nRelated Study: Linear Regression Forecast"
	},
	"Trade Volume Index": {
		description:
			"Trade Volume Index (TVI) adds a price movement threshold parameter to the On Balance Volume (OBV) study. Accordingly, like OBV, TVI is a cumulative total of the volume with the difference being that it only sums the volume on periods when price rises to a minimum threshold and subtracts the volume on down periods that exceed the threshold. TVI is often used as a confirmation indicator that shows if the volume activity is supporting the trend.\nRelated Study: On Balance Volume"
	},
	"Trend Intensity Index": {
		description:
			"The Trend Intensity Index (TII) is a ratio of the sum of price deviation above a simple moving average relative to the sum of the price deviation below a simple moving average. The TII is a bounded oscillator between 0 and 100. The TII will move to an extreme value during strong trends."
	},
	TRIX: {
		description:
			"The TRIX Oscillator measures the percent change of the triple exponential moving average (TEMA) of the close from one bar to the next. A central benefit of the TRIX oscillator when compared to others is it is quite smooth, providing greater clarity of the signals.\nThe TRIX Oscillator was developed by Jack Hutson."
	},
	"True Range": {
		description:
			"The derivation of the True Range (TR) captures gap openings that are missed by traditional high-low ranges.\nRelated Study: ATR Bands, Average True Range (ATR)"
	},
	"Twiggs Money Flow": {
		description:
			"Developed by Colin Twiggs, the Twiggs Money Flow (TMF) indicator is a moving sum of volume, displayed as an oscillator, weighted by where price closes within its range. The indicator oscillates around 0, with positive amounts indicating a bullish trend, and negative amounts indicating a bearish trend.\nThe TMF is a derivation of the Chaikin Money Flow (CMF) indicator, which is in turn derived from the Accumulation/Distribution line. There are two primary differences between TMF and CMF. The first is that the TMF volume multiplier is derived using the True Range instead of the H-L range. The second is that TMF is derived using moving averages instead of cumulative volume. Consequently, these two indicators produce similar results."
	},
	"Typical Price": {
		description:
			"The Typical Price indicator is a simple moving average (SMA) of the mean of the high, low, and close.\nNote: The term “Typical Price” is used throughout technical analysis in other studies where it refers to HLC3, whereas the Typical Price Indicator is an SMA of HLC3."
	},
	"Ulcer Index": {
		description:
			"The Ulcer Index measures the depth of a drawdown from a recent high. Specifically, as stated by Peter Martin: it is the square root of the mean of the squared percentage drawdowns in value. The squaring effect penalizes large drawdowns proportionately more than small drawdowns.\nThe Ulcer Index was developed by Peter Martin and Byron McCann.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	"Ultimate Oscillator": {
		description:
			"The Ultimate Oscillator (UO) indicator is designed to improve the Overbought and Oversold signals by capturing the market`s momentum across three different time periods (i.e., Cycles). The UO effectively averages oscillators across three periodicities. The UO is a bounded oscillator with values between 0 and 100. Divergences between the UO and market price are often considered an important signal that the trend is failing and will reverse.\nThe Ultimate Oscillator was developed by Larry Williams."
	},
	"Valuation Lines": {
		description:
			"The Valuation Line is an average of all the data points displayed on the chart. Accordingly, the value will change as the data on the chart is panned left/right or expanded or compressed. Any Field shown on the chart may be selected as the input, including other studies. Three average types are supported: Mean, Median, Harmonic.\nStandard Deviation bands may also be displayed above/below the average.\nNOTE: This study can be applied to other studies by using the Field parameter."
	},
	"Vertical Horizontal Filter": {
		description:
			"The Vertical Horizontal Filter (VHF) is a measure of trend extension and consolidation. It is a ratio of high-low over a range of time divided by the sum of the absolute value of price changes. Higher values indicate a stronger trend, lower values indicate a consolidation.\nThe Vertical Horizontal Filter was created by Adam White."
	},
	"Volatility Cone": {
		description:
			"The Volatility Cone indicator displays a cone projected forward with the likely price range based on recent volatility. Either historical or implied volatility (if available) may be used as the input. The Volatility Projection Cone is a forward-looking study that allows users to blend information from the options market with other technical analysis tools."
	},
	"Volume Chart": {
		description:
			"Volume is used to quantify trading activity each period in a market, market sector, or individual instrument. It can be added as an underlay on the chart or in a separate window.\nRelated Study: Volume Underlay"
	},
	"Volume Oscillator": {
		description:
			"The Volume Oscillator (VO) measures the spread between two exponential moving averages of volume, which is similar to a Price Oscillator using volume as the field."
	},
	"Volume Profile": {
		description:
			"Volume Profile, sometimes called “volume at price”, overlays horizontal volume bars extending from the y-axis. It is designed to show the volume traded at each price level over the span of the chart. Volume Profile is often used to identify possible support and resistance.\nThe High-Low range for the date:time range displayed is divided by the number of buckets resulting in a high and low of each bucket. For each time period, the volume value is examined and that volume is placed into the bucket whose high value < volume value and low value > volume value.\nThe Volume Profile only considers the range of data shown on the screen and will change if the chart is stretched, squeezed, or scrolled back or forward in time. By combining volume and price, the user can identify high-volume price ranges which indicate price levels where significant volume was transacted indicating a balanced market. These levels are likely to provide support or resistance in the future."
	},
	"Volume Rate of Change": {
		description:
			"Volume Rate of Change measures the percent change in volume over a set range.\nRelated Study: Price Rate of Change"
	},
	"Volume Underlay": {
		description:
			"Volume is used to quantify trading activity each period in a market, market sector, or individual instrument. It can be added as an underlay on the chart or in a separate window.\nRelated Study: Volume Chart"
	},
	"Vortex Indicator": {
		description:
			"The Vortex Indicator (VI) evaluates the strength of the trend by measuring the upside and downside price action. Accordingly, the VI derives an Uptrend line (+VI) and a Downtrend line (-VI). Positive price movement is measured over two bars by subtracting the prior low from the current high. The +VI is the sum of the upside values divided by the sum of the True Range (TR) for each bar.\nConversely, negative price movement subtracts the prior high from the current low. The -VI is the sum of the downside values divided by the sum of the TR for each bar.\nThe crossover of the +VI and -VI is often considered the signal of a new trend in the direction of the rising VI line.\nThe Vortex Indicator was created by Etienne Botes and Douglas Siepman."
	},
	VWAP: {
		description:
			"The Volume-Weighted Average Price (VWAP) is an intraday moving average that is weighted by the volume. It is used to get a view of the fair value of the market based on the price at which volume was executed on average throughout a single day&#8217;s trading session. The calculation starts when trading opens and ends when it closes.\nThe VWAP multiplies the volume for each period times the typical price (HLC3). Because it also divides by the total volume, the VWAP is considered distinct from the simple moving average (SMA).\nVWAP is often used as a confirmation tool in combination with other indicators, and has many uses. For example, a stock trading at prices below the VWAP may be seen as undervalued.\nRelated Study: Anchored VWAP"
	},
	"Weighted Close": {
		description:
			"The Weighted Close indicator is a simple moving average of the period`s high, low, and close, with close receiving double weight given its importance of mark-to-market."
	},
	"Williams %R": {
		description:
			"The Williams %R indicator normalizes prices within a range by measuring the percentage distance of the last price relative to the upper and lower bounds of its recent trading range. The result is multiplied by -100 and is plotted on a scale of -100 to zero.\nThe Williams %R indicator was developed by Larry Williams.\nRelated Study: Stochastics"
	},
	ZigZag: {
		description:
			"The ZigZag study identifies price swings of a predefined minimum magnitude. It is designed to filter out noisy fluctuations in price while identifying larger trends in which the market advances or declines by a minimum percentage (D). ZigZag is effective for analyzing historical data, and cannot forecast future trends.\nThe trend lines are drawn when price movement exceeds a distance threshold percentage. A Lowest Low point is recorded once the upward price movement achieves the percentage distance threshold from the low. Conversely, a Highest High point is recorded once the downward price is reached which achieves the minimum percentage magnitude.\nFor OHLC data, the high and low values of the bar are considered. For line and mountain charts, only the close is considered.\nThe final leg of the ZigZag is a proposed line between the last extreme value encountered and the present price."
	}
};
