---
layout: essay
title: "Contested Ground"
subtitle: "Global Energy Markets, War, Sanctions, and the Renewable Tide"
series: "Alberta in Context"
series_order: 4
date: 2026-02-21
last_modified_at: 2026-02-26
categories:
  - economic-geography
  - energy
tags:
  - alberta
  - global-energy
  - oil-markets
  - sanctions
  - russia
  - china
  - renewables
  - india
  - shadow-fleet
  - demand-profiles
viz: true
description: >
  A treatise on the global oil market Alberta actually sells into — shaped by
  wars, sanctions, a shadow shipping economy, China's extraordinary renewable
  buildout, and the profoundly uneven demand profiles of the world's major
  population centres.
excerpt: >
  Three forces press simultaneously on global oil markets. Sanctions have
  reshuffled trade flows without removing supply. China's renewable buildout
  is compressing the growth curve that sustained two decades of demand
  expansion. And rising population centres in India and Southeast Asia are
  pulling demand upward — but on a timeline that depends on whether they
  leapfrog fossil fuel systems the way they leapfrogged telephone landlines.
  Where Alberta sits in that story is the central question.
difficulty: 4
domain: economic-geography
math_core: proportional-reasoning
spatial_reasoning: global-flows
dynamics: supply-demand-equilibrium
toc: true
comments: true
---

## Contents
{:.no_toc}

* TOC
{:toc}

---

## Preface: The World Alberta Sells Into

Any serious assessment of Alberta's energy future must begin not with Alberta, but with the world. It is a persistent failure of both pro-industry boosterism and environmental critique that they conduct their arguments on an imaginary global stage — one in which either demand is infinite and secure, or in which transition is clean and orderly. The reality is murkier, more volatile, and more geopolitically entangled than either position admits.

This essay examines the global energy market as Alberta's oil sands producers actually encounter it: a market shaped by active wars, cascading sanctions regimes, a shadow shipping economy, the extraordinary solar and wind buildout concentrated in China, and the profoundly uneven demand profiles of the major population centres of the world.

Three forces press simultaneously on global oil markets. From the supply side, wars and sanctions have reshuffled trade flows without removing supply, creating a parallel economy of discounted oil. From the demand side, China's renewable buildout is beginning to compress the growth curve that sustained two decades of oil demand expansion. And from below, rising population centres in India, Southeast Asia, and Africa are pulling demand upward — at a pace and on a timeline that depends entirely on their economic trajectory, their infrastructure investment, and whether they leapfrog fossil fuel systems the way they leapfrogged telephone landlines.

---

## Part A: The War Economy of Oil

### The Ukraine Invasion and the Great Reshuffling

When Russia launched its full-scale invasion of Ukraine in February 2022, the Western response included what were described as unprecedented economic sanctions on the Russian oil sector. Before the invasion, Russia supplied approximately 40% of the EU's natural gas and over a quarter of its crude oil. The G7 price cap — fixing the maximum price at $60 per barrel for Western-serviced Russian oil exports — was designed to preserve global supply while stripping Russia of marginal profit.[^brookings]

[^brookings]: Brookings Institution, *Stiffening European Sanctions Against the Russian Oil Trade*, January 2026.

It did not work as designed. What it did was restructure global oil trade more fundamentally than any single event since the 1973 Arab oil embargo — but without removing supply.

EU imports of Russian crude fell from 3.5 million barrels per day in 2021 to 0.4 million in 2024 — a reduction of nearly 90%. But the oil changed direction. China's daily imports of Russian crude reached approximately $171 million per day in 2024. India went from virtually no Russian crude imports before 2022 to $144 million per day on average in 2024.[^crea]

[^crea]: Centre for Research on Energy and Clean Air (CREA), Monthly Fossil Fuel Tracker, 2024–2025.

<div data-viz="echarts" style="height:340px" data-options='{
  "title": {"text": "Russian Crude: The Great Reshuffling (million bbl/day)", "left": "center"},
  "tooltip": {"trigger": "axis"},
  "legend": {"bottom": 0},
  "xAxis": {"type": "category", "data": ["2021", "2022", "2023", "2024"]},
  "yAxis": {"type": "value", "name": "million bbl/day"},
  "series": [
    {"name": "EU imports from Russia", "type": "line", "data": [3.5, 2.2, 0.8, 0.4], "lineStyle": {"width": 3}, "smooth": true},
    {"name": "China imports from Russia", "type": "line", "data": [1.6, 1.9, 2.5, 2.8], "lineStyle": {"width": 3}, "smooth": true},
    {"name": "India imports from Russia", "type": "line", "data": [0.04, 0.7, 1.3, 1.6], "lineStyle": {"width": 3}, "smooth": true}
  ]
}'></div>

The structural consequences are permanent. Europe had to find replacements from the Middle East, West Africa, Norway, and — through the expanded Trans Mountain pipeline — Canada. Alberta was, counterintuitively, a net beneficiary of the sanctions architecture — not because its oil flowed to displaced markets directly, but because the reshuffling of Middle Eastern crude toward Europe opened Asian refinery capacity that Trans Mountain was positioning to serve.

### The Shadow Fleet

The most remarkable institutional consequence of the sanctions regime has been the creation of the shadow fleet: an estimated 900 to 1,400 tankers operating outside Western financial, insurance, and registration systems.[^kpler]

[^kpler]: Kpler Intelligence, *Russian Oil Flows Under Sanctions: An Update*, December 2025.

The shadow fleet was not invented for Ukraine. It existed as modest infrastructure for Iranian sanctions evasion. What changed after 2022 was its industrialization — aging tankers registered under flags of convenience in Palau, Gabon, and Cameroon, insured through opaque mechanisms, conducting ship-to-ship transfers off Malaysia, Ceuta, and the Danish Straits.[^ftm]

[^ftm]: Follow the Money (FTM), *Russia's Shadow Fleet Shakes Off Western Sanctions*, December 2025.

By late 2025, the U.S. and EU had sanctioned approximately two-thirds of the fleet's vessels. It made little difference. The analytical conclusion across multiple research centres is consistent: the moment a vessel is sanctioned, another joins. The shadow fleet is not fixed infrastructure — it is an adaptive market response.[^mitrova]

[^mitrova]: Tatyana Mitrova, *Into the Shadows*, The Insider / Columbia University CGEP, December 2025.

The real effect has been to impose a discount. By late 2025, Urals crude traded at approximately $33–34 per barrel versus Brent at $65–70. Russian oil export revenues for 2025 ended approximately 24% below 2024 — damaging, but not crippling.

### What the Sanctions Architecture Means for Price

The persistent availability of discounted Russian crude at $33–40 per barrel puts a ceiling on how high global prices can rise before buyers accept shadow-fleet logistics. This has contributed to keeping Brent in the $60–75 range through 2024 and 2025, despite geopolitical events that would historically have driven prices above $90.

> **For Alberta's oil sands:** Greenfield SAGD projects require approximately $80 per barrel WTI equivalent to justify new capital investment. The shadow-fleet discount compresses price upside, making new development economically marginal — even as existing operations remain profitable.
{:.callout}

### Iran, Venezuela, and the Parallel Supply Economy

Together, the sanctioned suppliers — Russia, Iran, Venezuela — account for roughly 10–11 million barrels per day of global supply, or approximately 10% of total world consumption.[^iea-omr]

[^iea-omr]: IEA Oil Market Reports, monthly editions, 2024–2025.

<div data-viz="echarts" style="height:320px" data-options='{
  "title": {"text": "Sanctioned Oil Exporters (2024-2025)", "left": "center"},
  "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
  "legend": {"bottom": 0},
  "xAxis": {"type": "category", "data": ["Russia", "Iran", "Venezuela", "Combined"]},
  "yAxis": [
    {"type": "value", "name": "mb/d", "position": "left"},
    {"type": "value", "name": "$/bbl discount", "position": "right"}
  ],
  "series": [
    {"name": "Export Volume (mb/d)", "type": "bar", "data": [7.1, 1.8, 0.9, 9.8], "label": {"show": true, "position": "top"}},
    {"name": "Discount vs. Brent", "type": "bar", "yAxisIndex": 1, "data": [13.5, 9.5, 6, null]}
  ]
}'></div>

| Country | Export Volume (mb/d) | Primary Buyers | Discount vs. Brent |
|:---|---:|:---|:---|
| Russia | ~6.9–7.3 | China, India, Turkey | $12–15/bbl (late 2025) |
| Iran | ~1.7–1.9 | China (teapot refiners) | $7–12/bbl |
| Venezuela | ~0.8–1.0 | China, Cuba, others | $4–8/bbl |
| **Combined** | **~9.4–10.2** | **~10% of global supply** | **Structural floor on prices** |

This is the paradox of sanctions as a price tool: they were designed partly to reduce Russian revenues, but their effect on supply availability prevents the price spikes that would benefit non-sanctioned producers like Canada, Saudi Arabia, and the UAE.

### The Straits: Physical Chokepoints

The Strait of Hormuz — through which approximately 21 million barrels per day flow, roughly 20% of all oil traded globally — remains the single most consequential physical chokepoint. The Bab-el-Mandeb Strait, disrupted by Houthi attacks throughout 2024, demonstrated that even lesser chokepoints carry material consequences: diversions around the Cape added 10–14 days and $1–2 million per voyage.

For Alberta specifically, these chokepoints are less material because Canadian crude's primary Asian route runs westward from Vancouver through the Pacific — avoiding both the Red Sea and Persian Gulf. TMX explicitly creates this routing advantage.

---

## Part B: The Renewable Tide

### China's Solar and Wind Expansion

To understand the scale of what China has accomplished in renewable energy, it is necessary to sit with numbers that resist intuitive comprehension.[^china-nea]

[^china-nea]: China National Energy Administration (NEA), 2024; Enerdata, February 2025; Ember Energy, April 2025; EcoWatch, June 2025.

In 2024, China added 277 gigawatts of new solar capacity in a single year — more than the total installed solar capacity of every other country combined. By the end of May 2025, cumulative solar capacity crossed one terawatt. By August 2025, total renewable capacity surpassed total fossil fuel generating capacity for the first time.

<div data-viz="echarts" style="height:360px" data-options='{
  "title": {"text": "China Renewable Energy Capacity (GW)", "left": "center"},
  "tooltip": {"trigger": "axis"},
  "legend": {"bottom": 0},
  "xAxis": {"type": "category", "data": ["2020", "2022", "2023", "2024", "May 2025", "Aug 2025"]},
  "yAxis": {"type": "value", "name": "GW installed"},
  "series": [
    {"name": "Solar", "type": "bar", "stack": "total", "data": [282, 392, 610, 887, 1080, 1200]},
    {"name": "Wind", "type": "bar", "stack": "total", "data": [299, 365, 441, 521, 567, 580]}
  ]
}'></div>

| Year | Solar (GW) | Wind (GW) | Milestone |
|:---|---:|---:|:---|
| 2020 | 282 | 299 | Xi sets 1,200 GW solar+wind target by 2030 |
| 2022 | 392 | 365 | China exceeds 87 GW annual solar additions |
| 2023 | 610 | 441 | Gap widens over all other nations |
| 2024 | 887 | 521 | 277 GW solar added — more than rest of world combined; 2030 target met six years early |
| May 2025 | 1,080+ | 567+ | 93 GW solar in single month; total crosses 1 TW |
| Aug 2025 | ~1,200+ | ~580+ | Renewables surpass fossil fuel capacity |

The drivers are structural: China controls approximately 80% of global polysilicon production and has driven solar panel prices down roughly 75% since 2018.

### How Renewables Compress Oil Demand

Solar and wind do not directly displace oil in most use cases. The interaction is indirect but potent, operating through several channels:

**Transport electrification.** China's EV adoption reached approximately 35% of new passenger vehicle sales in 2024. The IEA estimates EVs will displace 5.4 million barrels per day of oil demand by the end of the decade.[^iea-oil]

[^iea-oil]: International Energy Agency, *Oil 2025: Analysis and Forecast to 2030*, 2025.

**Natural gas trucking.** China has promoted LNG-powered trucks for heavy freight, structurally removing road transport as a growth driver of oil demand.

**High-speed rail.** China operates approximately 45,000 km of high-speed rail — more than the rest of the world combined — suppressing short-haul aviation demand.

The cumulative effect: China's oil consumption growth in 2024 was approximately 0.8%, compared to an average of over 5% annually in the decade before the pandemic. The IEA projects China's total consumption will be only marginally higher in 2030 than in 2024.

The IEA's previous forecast had predicted China would add approximately 1 million barrels per day by 2030. The revision — driven by faster EV adoption — represents a demand reduction roughly equal to the entire output of the Canadian oil sands.

### The Edge Eating Inward

Renewables do not displace oil from the core of existing demand. They displace the growth at the margin: the next unit of demand that would otherwise have materialized.

The IEA projects global oil demand reaching a plateau of approximately 105.5 million barrels per day by the end of the decade. By 2026, petrochemical feedstocks will account for more than 60% of all new demand growth.

> **The petrochemical pivot:** Bitumen's chemical composition — rich in long-chain hydrocarbons — makes it a valuable feedstock for precisely the chemical industries driving remaining demand growth. Alberta's long-term market is less likely to be gasoline and more likely to be naphtha becoming plastic, synthetic fibre, and industrial chemicals. Writing off bitumen's market role on the basis of EV adoption alone is premature.
{:.callout}

---

## Part C: World Demand Profiles

### The Geography of Consumption

Global oil demand of approximately 103 million barrels per day in 2024 reflects a historical pattern: wealthy nations built on cheap oil are slowly transitioning away, while developing nations are moving through economic stages that drive energy intensity upward.[^iea-ger][^eia-steo]

[^iea-ger]: International Energy Agency, *Global Energy Review 2025*.
[^eia-steo]: U.S. Energy Information Administration, *Short-Term Energy Outlook*, February 2026.

<div data-viz="echarts" style="height:400px" data-options='{
  "title": {"text": "Global Oil Demand by Region (2024)", "left": "center"},
  "tooltip": {"trigger": "item", "formatter": "{b}: {c} mb/d ({d}%)"},
  "series": [{
    "type": "pie",
    "radius": ["30%", "65%"],
    "data": [
      {"value": 20.3, "name": "United States"},
      {"value": 16.5, "name": "China"},
      {"value": 11.0, "name": "European Union"},
      {"value": 5.6, "name": "India"},
      {"value": 5.0, "name": "Japan + S. Korea"},
      {"value": 9.3, "name": "Middle East"},
      {"value": 6.8, "name": "Southeast Asia"},
      {"value": 4.2, "name": "Sub-Saharan Africa"},
      {"value": 4.9, "name": "Russia + CIS"},
      {"value": 19.4, "name": "Rest of World"}
    ],
    "label": {"formatter": "{b}\n{c} mb/d"},
    "itemStyle": {"borderRadius": 4, "borderWidth": 2}
  }]
}'></div>

| Region | Consumption (mb/d) | Per Capita (bbl/yr) | Trajectory to 2030 |
|:---|---:|---:|:---|
| United States | ~20.3 | ~22 | Slow decline; EVs offsetting aviation growth |
| China | ~16.5 | ~4.2 | Plateauing; EV/rail/LNG compressing growth |
| European Union | ~11.0 | ~8 | Structural decline |
| India | ~5.6 | ~1.4 | Fastest growing; ~1 mb/d increase by 2030 |
| Japan + South Korea | ~5.0 | ~18–20 | Declining |
| Middle East | ~9.3 | ~12–25 | Growing domestic; Saudi diversifying |
| Southeast Asia | ~6.8 | ~3.5 | Strong growth; Vietnam, Philippines, Indonesia |
| Sub-Saharan Africa | ~4.2 | ~0.9 | Low base, uneven |
| Russia + CIS | ~4.9 | ~12 | Stable/slight decline |
| Rest of World | ~19.4 | Varies | Mixed |

*Sources: IEA Oil Market Reports 2024–2025; EIA STEO; OPEC Annual Statistical Bulletin 2024.*

### The Per Capita Gap

<div data-viz="echarts" style="height:340px" data-options='{
  "title": {"text": "Per Capita Oil Consumption (barrels/year, 2024)", "left": "center"},
  "tooltip": {"trigger": "axis"},
  "grid": {"left": "22%", "right": "12%"},
  "xAxis": {"type": "value", "name": "barrels per person per year"},
  "yAxis": {"type": "category", "data": ["Sub-Saharan Africa", "India", "Southeast Asia", "China", "EU", "Middle East", "Japan/Korea", "United States"]},
  "series": [{"type": "bar", "data": [0.9, 1.4, 3.5, 4.2, 8, 18, 19, 22], "label": {"show": true, "position": "right"}}]
}'></div>

### India: The Ascending Successor

If China has been the demand story of the last 20 years, India is the demand story of the next 20. With 1.44 billion people, GDP growing at 6.5–7% annually, and per capita oil consumption of just 1.4 barrels per year (one-sixteenth of the American level), India is the most consequential potential demand growth source on earth.[^india-demand]

[^india-demand]: IEA India demand forecasts; EIA STEO; OPEC World Oil Outlook 2050.

The IEA projects India to add approximately 1 million barrels per day to global demand by 2030 — the largest single-country increase. Gasoline consumption in India grew 41.7% from 2019 to 2024.

India's EV transition is real but early — penetration reached 3–4% of new vehicle sales in 2024, compared to China's 35%. The question is whether the 20 years of high-oil-demand growth that India's economic stage implies will actually materialize, or whether affordable solar and Chinese-manufactured EVs allow Indian consumers to skip the highest-consumption phase.

### Southeast Asia: The Fragmented Growth Corridor

Southeast Asia — approximately 700 million people — had combined oil demand of approximately 6.8 million barrels per day in 2024, growing at 2–3% annually. Vietnam stands out with oil consumption surging 27% in 2024 alone.

The region is strategically important for Canadian crude: refineries are predominantly configured for medium sour crude — the same grades for which Trans Mountain's Pacific Coast access creates an export pathway.

### Sub-Saharan Africa: The Leapfrog Question

Sub-Saharan Africa is home to approximately 1.2 billion people with average oil consumption below one barrel per person per year. If consumption rose to merely the Southeast Asian average (~3.5 barrels/year), that would add approximately 2.5 million barrels per day to global demand.

Whether that materializes as oil demand, electricity from solar and batteries, or something in between is one of the genuinely open questions in energy forecasting. The grounds for leapfrogging are real: almost no legacy infrastructure to protect, distributed solar microgrids already serving remote communities, and electric motorcycles gaining market share at competitive price points. The constraints are also real: GDP per capita averages approximately $1,700.

---

## Part D: What This Means for Alberta

### The Market Alberta Operates In

The global oil market that Alberta sells into in 2026:

**Global supply is persistently abundant.** U.S. shale at record levels, OPEC+ unwinding cuts, new production from Brazil, Guyana, and Canada, plus shadow fleet flows have created a structural surplus keeping Brent at $60–75. The EIA forecasts Brent averaging $58 in 2026 and $53 in 2027 — prices at which new oil sands projects are uneconomic.

**The discount problem persists.** WCS trades at a structural discount to WTI of $10–20 per barrel. Discounted sanctioned crude provides unexpected competition for Canadian dilbit in Asian markets.

**The demand engine is shifting.** China is plateauing. India is ascending but slowly in absolute terms. Petrochemical feedstocks will account for more than 60% of all new demand growth by 2026.

**The price window for new development is narrowing.** Greenfield SAGD requires ~$80 WTI. The supply surplus, shadow fleet ceiling, and decelerating demand growth collectively make sustained $80+ prices less likely.

### Alberta's Structural Advantages

The analysis is not simply grim. Alberta holds genuine structural advantages.

**Stability.** Unlike shale wells that decline 60–80% in year one, oil sands projects produce for 30–50 years at stable rates with declining operating costs.

**The petrochemicals opportunity.** Bitumen's chemical composition makes it valuable feedstock for Asia's chemical industries — a market that is structurally supportive for decades.

**Geopolitical stability.** Canadian oil operates under transparent rule of law and is not subject to sanctions, revolution, or military interdiction. In a world where an increasing share of supply involves shadow fleet logistics, Canadian crude's provenance carries a genuine premium.

**Trans Mountain optionality.** The pipeline provides capacity to participate in Asian markets in a way Alberta could not before 2024.

### The Essential Honesty This Market Demands

Alberta is not insulated from global energy markets by any political arrangement. Whether Alberta is a Canadian province, an American state, or an independent nation, its oil sands compete in a global market where price is set by forces Canadian policy cannot meaningfully influence.

What Canadian federal-provincial policy can influence is infrastructure, regulatory environment, and fiscal terms. An improvement of $5 per barrel on 3.7 million barrels per day is $6.75 billion per year. These are real gains — but improvements at the margin of a market structure set by forces far larger than any Canadian political decision.

> The renewable tide is real. The geopolitical disruption of oil markets is real. The demand shift toward petrochemicals is real. The window of high-return development is real and narrowing. Alberta's interest — whether viewed through a provincial, federal, or independence lens — is in maximizing value while the window exists, and investing in downstream chemistry and infrastructure that would preserve relevance in a market shifting toward feedstocks rather than fuels.
{:.callout}

---

## Conclusion: Contested Ground, Real Stakes

The global oil market in 2026 is genuinely contested — by wars that reshuffled trade without removing supply, by China's unprecedented renewable buildout, by the rising demand of population centres whose trajectories will define energy consumption for the next generation, and by the structural retreat of transport fuels as the dominant driver of oil demand.

Alberta sits at the intersection of all these forces, with a resource base of enormous scale, a cost structure that requires price support for new development, and a political culture that frequently debates sovereignty and federal relations rather than market position and competitive strategy.

The shadow fleet and the solar fields are mirror images of the same transformation: the world is simultaneously extending the use of oil it already has (shadow fleet keeping supply flowing at a discount) and reducing the oil it will need in the future (solar displacement of transport energy). Both compress the price environment Alberta's development economics require.

Oil will be needed for decades, and Alberta's oil will be among it. But the terms — price, end uses, transport routes, buyers — are being rewritten by forces far larger than any provincial or federal political decision.

---

## Sources and References

International Energy Agency (IEA). *Oil 2025: Analysis and Forecast to 2030*. Paris: IEA, 2025.

International Energy Agency (IEA). *Oil Market Reports*: Monthly editions, 2025.

International Energy Agency (IEA). *Global Energy Review 2025*.

U.S. Energy Information Administration (EIA). *Short-Term Energy Outlook*, February 2026.

Brookings Institution. *Stiffening European Sanctions Against the Russian Oil Trade*. January 2026.

Centre for Research on Energy and Clean Air (CREA). *Monthly Analysis of Russian Fossil Fuel Exports*. 2024–2025.

Mitrova, Tatyana. "Into the Shadows." *The Insider* / Columbia University CGEP, December 2025.

Kpler Intelligence. *Russian Oil Flows Under Sanctions*. December 2025.

Follow the Money (FTM). "Russia's Shadow Fleet Shakes Off Sanctions." December 2025.

Enerdata. "China Installs Record Solar and Wind Capacity in 2024." February 2025.

Ember Energy. "Wind and Solar Over a Quarter of China's Electricity." April 2025.

OPEC. *Annual Statistical Bulletin 2024*. Vienna: OPEC, 2024.

OPEC. *World Oil Outlook 2050*: Chapter 3 — Oil Demand.

Argus Media. Urals Crude Price Data, 2024–2025.

---

*Previous: [The Texas of the North](/alberta-in-context/texas-of-the-north/)*
