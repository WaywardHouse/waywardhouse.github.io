---
layout: essay
title: "Contested Ground"
subtitle: "Global Energy Markets, War, Sanctions, and the Renewable Tide"
series: "Alberta in Context"
series_order: 4
date: 2026-02-21
last_modified_at: 2026-02-26
author: paul
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
  - hash-viz
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

Three forces press simultaneously on global oil markets. From the supply side, wars and sanctions have reshuffled trade flows without removing supply, creating a parallel economy of discounted oil. From the demand side, China's extraordinary renewable buildout is beginning to compress the growth curve that sustained two decades of global oil demand expansion. And from below, rising population centres in India, Southeast Asia, and Africa are pulling demand upward — at a pace and on a timeline that depends entirely on their economic trajectory, their infrastructure investment, and whether they leapfrog fossil fuel systems the way they leapfrogged telephone landlines.

Where Alberta sits in that story is the central question.

---

## Part A: The War Economy of Oil

### The Ukraine Invasion and the Great Reshuffling

When Russia launched its full-scale invasion of Ukraine in February 2022, the Western response included what were described as unprecedented economic sanctions on the Russian oil sector. Before the invasion, Russia had been the largest single source of European oil and gas imports, supplying approximately 40% of the EU's natural gas and over a quarter of its crude oil. The G7 price cap — fixing the maximum price at which Western-flagged tankers, Western insurers, and Western financial institutions could service Russian oil exports at $60 per barrel — was designed to preserve supply to the global market while stripping Russia of marginal profit.[^brookings]

[^brookings]: Brookings Institution, *Stiffening European Sanctions Against the Russian Oil Trade*, January 2026.

It did not work as designed. What it did was restructure global oil trade more fundamentally than any single event since the 1973 Arab oil embargo — but without removing supply.

Russia found willing buyers in China and India. EU imports of Russian crude fell from 3.5 million barrels per day in 2021 to 0.4 million barrels per day by 2024 — a reduction of nearly 90%. But the oil did not stop flowing. It changed direction. China's average daily imports of Russian crude reached approximately $171 million per day in 2024. India's transformation was more dramatic: from virtually no Russian crude imports before 2022 to $144 million per day on average in 2024.[^crea]

[^crea]: Centre for Research on Energy and Clean Air (CREA), Monthly Fossil Fuel Tracker, 2024–2025.

```echarts
{
  "title": { "text": "Russian Crude: The Great Reshuffling (million bbl/day)", "left": "center", "textStyle": { "fontSize": 15 } },
  "tooltip": { "trigger": "axis" },
  "legend": { "bottom": 0 },
  "xAxis": { "type": "category", "data": ["2021\n(Pre-invasion)", "2022", "2023", "2024"] },
  "yAxis": { "type": "value", "name": "million bbl/day" },
  "series": [
    { "name": "EU imports from Russia", "type": "line", "data": [3.5, 2.2, 0.8, 0.4], "lineStyle": { "width": 3 } },
    { "name": "China imports from Russia", "type": "line", "data": [1.6, 1.9, 2.5, 2.8], "lineStyle": { "width": 3 } },
    { "name": "India imports from Russia", "type": "line", "data": [0.04, 0.7, 1.3, 1.6], "lineStyle": { "width": 3 } }
  ]
}
```

The structural consequences are permanent. Europe, having lost its primary crude supplier, had to find replacements from the Middle East, West Africa, Norway, and — through the expanded Trans Mountain pipeline — Canada. This secondary reshuffling created the most significant new market opportunity for Canadian heavy crude in a generation.

Alberta was, counterintuitively, a net beneficiary of the sanctions architecture — not because its oil flowed to the displaced markets directly, but because the reshuffling of Middle Eastern crude toward Europe opened Asian refinery capacity that Trans Mountain was positioning to serve.

### The Shadow Fleet

The most remarkable institutional consequence of the sanctions regime has been the creation of what analysts call the shadow fleet: an estimated 900 to 1,400 tankers operating outside Western financial, insurance, and registration systems, carrying Russian (and Iranian and Venezuelan) crude to buyers unwilling or unable to use sanctioned supply chains.[^kpler]

[^kpler]: Kpler Intelligence, *Russian Oil Flows Under Sanctions: An Update*, December 2025.

The shadow fleet was not invented in response to Ukraine. It existed as modest infrastructure for Iranian oil sanctions evasion. What changed after 2022 was its industrialization. Within two years, Russia had assembled a network of aging tankers — many over 20 years old — registered under flags of convenience in jurisdictions like Palau, Gabon, and Cameroon, insured through opaque mechanisms, and conducting ship-to-ship transfers in international waters off Malaysia, Ceuta, and the Danish Straits.[^ftm]

[^ftm]: Follow the Money (FTM), *Russia's Shadow Fleet Shakes Off Western Sanctions*, December 2025.

By the end of 2025, the U.S. and EU had sanctioned approximately two-thirds of the shadow fleet's vessels. It made little difference. The analytical conclusion across multiple research centres is consistent: the moment a vessel is sanctioned, another joins. Western ship-owners sell aging tankers without close scrutiny of buyers. New shell companies emerge within weeks. The shadow fleet is not fixed infrastructure — it is an adaptive market response.[^mitrova]

[^mitrova]: Tatyana Mitrova, *Into the Shadows*, The Insider / Columbia University CGEP, December 2025.

The real effect of sanctions has not been to halt Russian oil exports but to impose a discount on them. By late 2025, Urals crude was trading at approximately $33–34 per barrel at Baltic and Black Sea ports, compared to Brent at $65–70. Russian oil export revenues for 2025 ended approximately 24% below 2024 levels — damaging, but not crippling.

### What the Sanctions Architecture Means for Price

For global oil prices, the post-2022 sanctions environment has produced an outcome that carries complex long-term consequences: supply was preserved, but at a discount that benefited buyers rather than the seller.

The persistent availability of discounted Russian crude — at Urals prices of $33–40 per barrel through the shadow fleet — puts a ceiling on how high global oil prices can rise before buyers find the discount attractive enough to accept the logistical complications of shadow-fleet sourcing. This has contributed to structural price pressure keeping Brent crude in the $60–75 range through much of 2024 and 2025, despite geopolitical events that would historically have driven prices above $90.

> **For Alberta's oil sands:** Greenfield SAGD projects require approximately $80 per barrel WTI equivalent to justify new capital investment. The current price environment, in which a persistent shadow-fleet discount compresses price upside, makes new oil sands development economically marginal — even as existing operations remain profitable.
{:.callout}

### Iran, Venezuela, and the Parallel Supply Economy

Russia is the largest but not the only source of sanctioned supply reshaping global trade flows. Iran has maintained crude oil exports of approximately 1.7–1.9 million barrels per day through 2024 and 2025, almost entirely to Chinese buyers — primarily the independent refiners known as "teapots" in Shandong province. Venezuela, operating under U.S. sanctions since 2019, exports approximately 800,000 to 1 million barrels per day.[^iea-omr]

[^iea-omr]: IEA Oil Market Reports, monthly editions, 2024–2025.

Together, the sanctioned suppliers account for roughly 10–11 million barrels per day of global supply, or approximately 10% of total world consumption. All of this supply reaches market through informal channels at discounts to benchmark prices.

```echarts
{
  "title": { "text": "Sanctioned Oil Exporters (2024-2025)", "left": "center", "textStyle": { "fontSize": 15 } },
  "tooltip": { "trigger": "axis", "axisPointer": { "type": "shadow" } },
  "legend": { "bottom": 0, "data": ["Export Volume (mb/d)", "Discount vs. Brent ($/bbl)"] },
  "xAxis": { "type": "category", "data": ["Russia", "Iran", "Venezuela", "Combined"] },
  "yAxis": [
    { "type": "value", "name": "mb/d", "position": "left" },
    { "type": "value", "name": "$/bbl discount", "position": "right" }
  ],
  "series": [
    { "name": "Export Volume (mb/d)", "type": "bar", "data": [7.1, 1.8, 0.9, 9.8], "label": { "show": true, "position": "top" } },
    { "name": "Discount vs. Brent ($/bbl)", "type": "bar", "yAxisIndex": 1, "data": [13.5, 9.5, 6, null] }
  ]
}
```

| Country | Export Volume (mb/d) | Primary Buyers | Discount vs. Brent |
|:---|---:|:---|:---|
| Russia | ~6.9–7.3 | China, India, Turkey | $12–15/bbl (late 2025) |
| Iran | ~1.7–1.9 | China (teapot refiners) | $7–12/bbl |
| Venezuela | ~0.8–1.0 | China, Cuba, others | $4–8/bbl |
| **Combined** | **~9.4–10.2 mb/d** | **~10% of global supply** | **Structural floor on prices** |

This is the paradox of sanctions as a price tool: they were designed partly to reduce Russian revenues, but their effect on supply availability prevents the price spikes that would benefit non-sanctioned producers like Canada, Saudi Arabia, and the UAE.

### The Straits: Physical Chokepoints

While the shadow fleet has proven remarkably adaptive, the physical geography of oil trade contains constraints no shadow tanker can route around. The Strait of Hormuz — through which approximately 21 million barrels per day flow, roughly 20% of all oil traded globally — remains the single most consequential physical chokepoint in the global energy system.

The Bab-el-Mandeb Strait at the southern end of the Red Sea — through which Houthi attacks from Yemen disrupted shipping throughout 2024 and into 2025 — demonstrated that even lesser chokepoints carry material consequences. The diversion of traffic around the Cape of Good Hope added approximately 10–14 days and $1–2 million to voyage costs per vessel.

For Alberta specifically, these chokepoints are somewhat less material than for Middle Eastern or Russian producers, because Canadian crude's primary route to Asian markets runs westward from Vancouver through the Pacific — avoiding both the Red Sea and the Persian Gulf entirely. TMX explicitly creates this routing advantage. But the chokepoints matter to the extent that they affect the global price at which all crude is sold.

---

## Part B: The Renewable Tide

### A Decade Defined by Two Parallel Booms

The decade from 2015 to 2024 was shaped by two simultaneous forces: the extraordinary growth of U.S. shale production, which added more than 8 million barrels per day to global supply; and the extraordinary growth of Chinese oil demand, which rose by nearly 6 million barrels per day and accounted for approximately 60% of all new global oil consumption.

Both are now decelerating simultaneously, and what replaces them will determine the price and demand environment for the remainder of the decade.

### China's Solar and Wind Expansion

To understand the scale of what China has accomplished in renewable energy, it is necessary to sit with numbers that resist intuitive comprehension.[^china-nea]

[^china-nea]: China National Energy Administration (NEA), 2024; Enerdata, February 2025; Ember Energy, April 2025; EcoWatch, June 2025.

In 2024, China added 277 gigawatts of new solar capacity in a single year — more than the total installed solar capacity of every other country combined at the time. By the end of May 2025, China's cumulative solar capacity had crossed one terawatt. By August 2025, total installed renewable capacity had surpassed total fossil fuel generating capacity for the first time.

```echarts
{
  "title": { "text": "China Renewable Energy Capacity (GW)", "left": "center", "textStyle": { "fontSize": 15 } },
  "tooltip": { "trigger": "axis" },
  "legend": { "bottom": 0 },
  "xAxis": { "type": "category", "data": ["2020", "2022", "2023", "2024", "May 2025", "Aug 2025"] },
  "yAxis": { "type": "value", "name": "GW installed" },
  "series": [
    { "name": "Solar", "type": "bar", "stack": "total", "data": [282, 392, 610, 887, 1080, 1200] },
    { "name": "Wind", "type": "bar", "stack": "total", "data": [299, 365, 441, 521, 567, 580] }
  ]
}
```

| Year | Solar Installed (GW) | Wind Installed (GW) | Key Milestone |
|:---|---:|---:|:---|
| 2020 | 282 | 299 | Xi sets 1,200 GW solar+wind target by 2030 |
| 2022 | 392 | 365 | China exceeds 87 GW annual solar additions |
| 2023 | 610 | 441 | Gap widens over all other nations |
| 2024 | 887 | 521 | Adds 277 GW solar — more than rest of world combined; 2030 target met six years early |
| May 2025 | 1,080+ | 567+ | 93 GW solar added in single month; total crosses 1 TW |
| Aug 2025 | ~1,200+ | ~580+ | Renewables capacity exceeds fossil fuel capacity for first time |

The drivers are structural: China controls approximately 80% of global polysilicon production, dominates photovoltaic cell and module manufacturing, and has constructed a supply chain so deeply integrated that solar panel prices have fallen by roughly 75% since 2018.

### How Renewables Compress Oil Demand

Solar panels and wind turbines do not directly displace oil in most use cases. The interaction is indirect but potent, operating through several channels:

**Channel 1: Transport electrification.** China's EV adoption rate in 2024 reached approximately 35% of new passenger vehicle sales. By 2025, EV sales in China were approaching 13 million units annually. The IEA estimates that globally, EVs will displace 5.4 million barrels per day of oil demand by the end of the decade.[^iea-oil]

[^iea-oil]: International Energy Agency, *Oil 2025: Analysis and Forecast to 2030*, 2025.

**Channel 2: Natural gas trucking.** China has aggressively promoted LNG-powered trucks for heavy freight. The combination of EVs for passenger transport and LNG trucks for freight has structurally removed road transport as a growth driver of Chinese oil demand.

**Channel 3: High-speed rail.** China operates approximately 45,000 kilometres of high-speed rail — more than the rest of the world combined — suppressing short-haul aviation demand that would otherwise depend on jet fuel.

The cumulative effect is visible in the data. China's oil consumption growth in 2024 was approximately 0.8%, compared to an average of over 5% annually in the decade before the pandemic. The IEA's current forecast is that China's total oil consumption will be only marginally higher in 2030 than in 2024 — a near-complete plateau.

The IEA's previous forecast, just one year earlier, had predicted China would add approximately 1 million barrels per day by 2030. The revision — driven by faster EV adoption than anticipated — represents a demand reduction of roughly 1 million barrels per day relative to expectations. That is approximately the entire output of the Canadian oil sands.

### The Renewables Export Machine

China's renewable buildout is not self-contained. The overcapacity of Chinese solar manufacturing has driven global panel prices to levels that make large-scale solar deployment economically rational in markets from India to Pakistan to Turkey. The cost of solar electricity has fallen by more than 90% since 2010. The levelized cost of utility-scale solar in most sunny regions is now below the marginal cost of new gas and coal generation.

This matters for global oil markets because the markets where oil demand is growing fastest — India, Southeast Asia, Sub-Saharan Africa — are precisely the markets where Chinese-manufactured solar panels are making renewable energy economically accessible for the first time. Whether these regions follow a high-carbon growth path identical to China's in the 1990s — or whether cheap solar allows them to leapfrog carbon intensity the way mobile phones allowed them to leapfrog landline infrastructure — is perhaps the single most consequential variable in global oil demand forecasting over the 2025–2040 period.

### The Edge Eating Inward

Renewables do not displace oil from the core of existing demand. They displace the growth at the margin: the next unit of demand that would otherwise have materialized. This is why oil demand can continue growing in absolute terms while the renewable buildout accelerates — the growth just comes more slowly, from fewer sources, and for fewer end uses.

The IEA projects global oil demand reaching a plateau of approximately 105.5 million barrels per day by the end of the decade. But the growth is increasingly narrow. By 2026, petrochemical feedstocks will account for more than 60% of all new demand growth — meaning plastics, synthetic fibres, and industrial chemicals will be the primary engine of future oil consumption, not transportation.

> **The petrochemical pivot:** Bitumen's chemical composition — rich in long-chain hydrocarbons — makes it a valuable feedstock for precisely the chemical industries driving remaining demand growth. Alberta's long-term market is less likely to be the gasoline that powers the SUV and more likely to be the naphtha that becomes the plastic, the synthetic fibre, and the industrial chemical. This does not make the economics easier given breakeven prices, but it means writing off bitumen's long-term market role on the basis of EV adoption alone is premature.
{:.callout}

---

## Part C: World Demand Profiles

### The Geography of Consumption

Global oil demand of approximately 103 million barrels per day in 2024 is not evenly distributed. It reflects a historical pattern in which wealthy, industrialized nations built their infrastructure around cheap oil and are now slowly transitioning away, while developing nations are moving through the economic stages that drive energy intensity upward.[^iea-ger][^eia-steo]

[^iea-ger]: International Energy Agency, *Global Energy Review 2025*.
[^eia-steo]: U.S. Energy Information Administration, *Short-Term Energy Outlook*, February 2026.

The world's major demand centres can be organized into four structural categories: the declining legacy consumers of the OECD; the plateauing engine (China); the ascending successor (India); and the latent demand reserve (Sub-Saharan Africa, Southeast Asia, parts of the Middle East).

```echarts
{
  "title": { "text": "Global Oil Demand by Region (2024, million bbl/day)", "left": "center", "textStyle": { "fontSize": 15 } },
  "tooltip": { "trigger": "item", "formatter": "{b}: {c} mb/d ({d}%)" },
  "series": [{
    "type": "pie",
    "radius": ["30%", "65%"],
    "data": [
      { "value": 20.3, "name": "United States" },
      { "value": 16.5, "name": "China" },
      { "value": 11.0, "name": "European Union" },
      { "value": 5.6, "name": "India" },
      { "value": 5.0, "name": "Japan + S. Korea" },
      { "value": 9.3, "name": "Middle East" },
      { "value": 6.8, "name": "Southeast Asia" },
      { "value": 4.2, "name": "Sub-Saharan Africa" },
      { "value": 4.9, "name": "Russia + CIS" },
      { "value": 19.4, "name": "Rest of World" }
    ],
    "label": { "formatter": "{b}\n{c} mb/d" },
    "itemStyle": { "borderRadius": 4, "borderColor": "var(--bg)", "borderWidth": 2 }
  }]
}
```

| Region | Consumption (mb/d) | Per Capita (bbl/yr) | Trajectory to 2030 |
|:---|---:|---:|:---|
| United States | ~20.3 | ~22 | Slow decline; EVs offsetting some aviation growth |
| China | ~16.5 | ~4.2 | Plateauing; EV/rail/LNG trucks compressing growth |
| European Union | ~11.0 | ~8 | Structural decline; aggressive renewable transition |
| India | ~5.6 | ~1.4 | Fastest growing; ~1 mb/d increase expected by 2030 |
| Japan + South Korea | ~5.0 | ~18–20 | Declining; efficiency improvements and aging population |
| Middle East | ~9.3 | ~12–25 | Growing domestic; Saudi Arabia diversifying |
| Southeast Asia | ~6.8 | ~3.5 | Strong growth; Vietnam, Philippines, Indonesia |
| Sub-Saharan Africa | ~4.2 | ~0.9 | Low base, uneven; subsidy reform disrupting growth |
| Russia + CIS | ~4.9 | ~12 | Stable/slight decline |
| Rest of World | ~19.4 | Varies | Mixed |

*Sources: IEA Oil Market Reports 2024–2025; IEA Global Energy Review 2025; EIA Short-Term Energy Outlook; OPEC Annual Statistical Bulletin 2024.*

### The United States: Largest Consumer in Structural Transition

The United States consumes approximately 20 million barrels per day — roughly one-fifth of global consumption. Per capita consumption is approximately 22 barrels per year, more than five times the global average. And it is declining, slowly and somewhat erratically, but declining.

The drivers are structural: fuel economy standards have roughly doubled average fleet efficiency since 1990; electric vehicles accounted for approximately 8–9% of new sales in 2024; remote work patterns have reduced vehicle miles travelled. Against this, American oil demand has proven more resilient than earlier IEA forecasts anticipated — the IEA actually revised its 2030 American oil demand forecast upward by 1.1 million barrels per day, reflecting policy reversal under the second Trump administration.

### China: The Plateauing Engine

China's oil demand story is perhaps the most consequential shift in global energy markets this decade. From 2013 to 2023, China added approximately 6 million barrels per day — the equivalent of adding another Saudi Arabia's worth of demand to world consumption.

That engine has slowed to near-stall. The causes are structural: EV adoption at 35% of new sales, LNG trucks displacing diesel freight, 45,000 km of high-speed rail suppressing aviation, and the property sector downturn creating a structural demand hole in diesel consumption.

The per capita dimension is revealing. China consumes approximately 4.2 barrels per person per year, compared to 22 in the United States. The point of the renewable transition story is that China appears to be aiming for an economic model in which electrification captures much of the per capita energy service increase that additional oil consumption would otherwise represent. Whether it succeeds, and at what pace, is genuinely uncertain.

### India: The Ascending Successor

If China has been the demand story of the last 20 years, India is the demand story of the next 20. With 1.44 billion people, GDP growing at approximately 6.5–7% annually, and per capita oil consumption of just 1.4 barrels per year (one-sixteenth of the American level), India has the demographic scale and economic growth trajectory that makes it the most consequential potential demand growth source on earth.[^india-demand]

[^india-demand]: IEA India demand forecasts; EIA STEO; OPEC World Oil Outlook 2050.

The IEA projects India to add approximately 1 million barrels per day to global oil demand by 2030 — the largest single-country increase. Over the period to 2050, OPEC projects India adding 8.2 million barrels per day. Gasoline consumption in India grew 41.7% from 2019 to 2024.

```echarts
{
  "title": { "text": "Per Capita Oil Consumption (barrels/year, 2024)", "left": "center", "textStyle": { "fontSize": 15 } },
  "tooltip": { "trigger": "axis" },
  "xAxis": { "type": "value", "name": "barrels per person per year" },
  "yAxis": {
    "type": "category",
    "data": ["Sub-Saharan\nAfrica", "India", "Southeast\nAsia", "China", "EU", "Middle\nEast", "Japan/Korea", "United\nStates"],
    "axisLabel": { "fontSize": 11 }
  },
  "series": [{
    "type": "bar",
    "data": [0.9, 1.4, 3.5, 4.2, 8, 18, 19, 22],
    "label": { "show": true, "position": "right", "formatter": "{c}" },
    "itemStyle": { "borderRadius": [0, 4, 4, 0] }
  }]
}
```

India's EV transition is real but early — penetration reached approximately 3–4% of new vehicle sales in 2024, compared to China's 35%. The question is whether the 20 years of high-oil-demand growth that India's economic stage implies will actually materialize, or whether affordable solar and Chinese-manufactured EVs allow Indian consumers to skip the highest-consumption phase.

### Southeast Asia: The Fragmented Growth Corridor

Southeast Asia — Indonesia, Vietnam, the Philippines, Thailand, Malaysia and neighbours, representing approximately 700 million people — had combined oil demand of approximately 6.8 million barrels per day in 2024, growing at 2–3% annually.

Vietnam stands out as a demand growth outlier, with oil consumption surging 27% in 2024 alone. The Southeast Asian market is strategically important for Canadian crude for a counterintuitive reason: refineries in the region are predominantly configured for medium sour crude — the same grades for which Trans Mountain's Pacific Coast access creates an export pathway.

### Sub-Saharan Africa: The Leapfrog Question

Sub-Saharan Africa is home to approximately 1.2 billion people — and average oil consumption of less than one barrel per person per year. If the region's population were to increase per capita consumption to merely the Southeast Asian average (~3.5 barrels per year), that would add approximately 2.5 million barrels per day to global demand.

Whether that potential materializes as oil demand, as electricity from solar and batteries, or as something in between is one of the genuinely open questions in energy forecasting. The grounds for leapfrogging are real: almost no legacy oil infrastructure to protect, distributed solar microgrids already providing electricity to remote communities, and electric motorcycles gaining market share at competitive price points. The constraints are also real: GDP per capita averages approximately $1,700 per year, and several major economies face deep structural challenges.

---

## Part D: What This Means for Alberta

### The Market Alberta Actually Operates In

Gathering these threads, the global oil market that Alberta's producers sell into in 2026 has the following structural characteristics:

**Global supply is persistently abundant.** U.S. shale at record levels, OPEC+ unwinding production cuts, new production from Brazil, Guyana, and Canada, plus continued shadow fleet flows have created a structural surplus keeping Brent in the $60–75 range. The EIA forecasts Brent averaging $58 per barrel in 2026 and $53 in 2027 — prices at which new oil sands projects are uneconomic.

**The discount problem persists.** WCS trades at a structural discount to WTI of $10–20 per barrel due to bitumen-blend chemistry and limited refinery access. The discount on sanctioned crude provides unexpected competition: Chinese teapot refiners buying Urals at steep discounts have less incentive to pay premium prices for Canadian dilbit.

**The demand engine is shifting.** China is plateauing. India is ascending but at per capita levels that take time to generate China-scale volumes. Petrochemical feedstocks will account for more than 60% of all new demand growth by 2026.

**The price window for new development is narrowing.** Greenfield SAGD requires ~$80 WTI. The structural supply surplus, the shadow fleet discount ceiling, and decelerating demand growth collectively make sustained $80+ prices less likely than they were five years ago.

### Alberta's Structural Advantages

The analysis is not simply grim. Alberta holds genuine structural advantages that its political debate frequently fails to articulate clearly.

**Stability.** Unlike shale wells that decline 60–80% in year one and require continuous drilling capital, oil sands projects produce for 30–50 years at stable rates with declining operating costs. In a market where price volatility is extreme, a low-operating-cost, long-duration asset has value that a high-decline-rate shale well does not.

**The petrochemicals opportunity.** Bitumen's chemical composition makes it a valuable feedstock for the chemical industries of Asia. The market — driven by India's plastics consumption growth, Southeast Asia's industrial development, and China's downstream expansion — is structurally supportive of heavy crude for decades.

**Geopolitical stability.** Canadian oil comes from a stable democratic country, operates under transparent rule of law, and is not subject to sanctions regimes, revolutionary upheaval, or military interdiction. In a world where an increasing share of low-cost supply involves shadow fleet logistics and counterparty uncertainty, Canadian crude's clean provenance carries a genuine premium for buyers who value supply security.

**Trans Mountain optionality.** The pipeline's completion to Westridge Marine Terminal provides capacity to participate in Asian markets in a way that Alberta could not before 2024. Whether that capacity is used effectively depends on developing customer relationships and refinery configurations that make Canadian heavy crude the preferred feedstock for Asian complex refineries.

### The Essential Honesty This Market Demands

Any serious policy discussion about Alberta's energy future must grapple with the market reality documented above. Alberta is not insulated from global energy markets by any political arrangement. Whether Alberta is a Canadian province, an American state, or an independent nation, its oil sands compete in a global market in which price is set by supply and demand forces that Canadian policy cannot meaningfully influence.

What Canadian federal-provincial policy can influence is the infrastructure, the regulatory environment, and the fiscal terms under which Alberta's oil sands compete within this market. The pipeline debate — Trans Mountain, Northern Gateway, Energy East, Keystone XL — has been about the incremental billions of dollars in value that market access improvements could yield. An improvement of $5 per barrel on 3.7 million barrels per day is $6.75 billion per year. These are real. But they are improvements at the margin of a market structure set by forces far larger than any Canadian political decision.

> The renewable tide is real. The geopolitical disruption of oil markets is real. The demand shift toward petrochemicals is real. The window of high-return development is real and narrowing. Alberta's interest — whether viewed through a provincial, federal, or independence lens — is in maximizing the value extracted from the resource while that window exists, and in investing in the downstream chemistry and infrastructure that would preserve Alberta's relevance in a market shifting toward feedstocks rather than fuels.
{:.callout}

---

## Conclusion: Contested Ground, Real Stakes

The global oil market in 2026 is genuinely contested — by wars that have reshuffled trade without removing supply, by a renewables buildout in China of unprecedented scale, by the rising demand of population centres whose trajectories will define energy consumption for the next generation, and by the slow structural retreat of transport fuels as the dominant driver of oil demand.

Alberta sits at the intersection of all these forces, with a resource base of enormous scale, a cost structure that requires price support to justify new development, and a political culture that frequently debates sovereignty and federal relations rather than market position and competitive strategy.

The shadow fleet and the solar fields are, in a sense, mirror images of the same structural transformation: the world is simultaneously finding ways to extend the use of the oil it already has (shadow fleet evasion keeping supply on market at a discount) and ways to reduce the oil it will need in the future (solar displacement of transport energy). Both compress the price environment and the demand trajectory that Alberta's long-term development economics require.

Oil will be needed for decades, and Alberta's oil will be among the oil that is needed. But the terms on which it will be needed — at what price, for what end uses, transported how, and to which buyers — are being rewritten by forces far larger than any provincial or federal political decision. The most valuable contribution that analysis can make is to ensure that policy arguments about Alberta's future — however legitimate their underlying concerns about fiscal fairness, pipeline access, and democratic representation — are conducted with an honest reckoning of the market into which Alberta's resource must be sold.

---

## Sources and References

International Energy Agency (IEA). *Oil 2025: Analysis and Forecast to 2030*. Paris: IEA, 2025.

International Energy Agency (IEA). *Oil Market Reports*: Monthly editions, January–December 2025.

International Energy Agency (IEA). *Global Energy Review 2025*.

U.S. Energy Information Administration (EIA). *Short-Term Energy Outlook: Global Liquid Fuels*, February 2026.

U.S. Energy Information Administration (EIA). "China's Solar Capacity Installations Grew Rapidly in 2024." January 2025.

U.S. Energy Information Administration (EIA). "India to Surpass China as Top Source of Global Oil Consumption Growth." 2024.

Brookings Institution. *Stiffening European Sanctions Against the Russian Oil Trade*. January 2026.

Centre for Research on Energy and Clean Air (CREA). *Monthly Analysis of Russian Fossil Fuel Exports and Sanctions*. March 2025; November 2025.

Atlantic Council. *Russia Sanctions Database*. April 2025.

Mitrova, Tatyana. "Into the Shadows: Sanctions Have Reduced Russia from an Oil Superpower to a Global Energy Disrupter." *The Insider* / Columbia University CGEP, December 2025.

Kpler Intelligence. *Russian Oil Flows Under Sanctions: An Update Two Weeks On*. December 2025.

Follow the Money (FTM). "Russia's Shadow Fleet Shakes Off Western Sanctions to Keep Oil Revenues Flowing." December 2025.

Enerdata. "China Installs Record Capacity for Solar (+45%) and Wind (+18%) in 2024." February 2025.

Ember Energy. "Wind and Solar Generate Over a Quarter of China's Electricity for the First Month on Record." April 2025.

EcoWatch. "China Sets Wind and Solar Installation Records for Second Year in a Row." January 2025.

OPEC. *Annual Statistical Bulletin 2024*. Vienna: OPEC, 2024.

OPEC. *World Oil Outlook 2050*: Chapter 3 — Oil Demand.

Visual Capitalist. "Ranked: The World's Top 25 Countries by Oil Consumption." September 2025.

Argus Media. Urals Crude Price Data, 2024–2025.

---

*Previous in this series: [The Texas of the North](/alberta-in-context/texas-of-the-north/)*
