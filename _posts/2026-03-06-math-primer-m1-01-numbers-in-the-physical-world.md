---
layout: essay
title: Numbers in the Physical World
author: paul-hobson
date: 2026-03-06
categories:
  - maths
tags:
  - mathematics
  - tutorial
  - math-primer
series: "Math Primer M1: Numbers, Units, and Algebra"
series_order: 1
math: true
viz: true
excerpt: Scientific notation, units, dimensional thinking, and significant figures for people who want maths to behave in the real world.
permalink: /math/1/numbers-in-the-physical-world/
---

## Why this matters

A surprising amount of mathematical frustration has nothing to do with “hard maths.” It starts earlier, when the numbers themselves feel slippery. One value is written as `0.00000042`, another as `4.2 \times 10^{-7}`, a third comes with units of `m^3/s`, and a fourth has been rounded so aggressively that it is no longer trustworthy. If you cannot read the number, you cannot read the model.

That is why this essay starts here. Before calculus, before matrices, before machine learning, you need a way to look at a quantity and ask four calm questions:

1. How big is it?
2. What units is it measured in?
3. How precise is it?
4. What operations make physical sense?

Those questions are not “school exercises.” They are how hydrologists think about discharge, how atmospheric scientists think about concentration, and how any sensible modeller avoids embarrassing mistakes.

## The main ideas

This essay covers four closely related tools:

- **Scientific notation**, for expressing very large or very small quantities clearly.
- **Unit conversion**, for moving between measurement systems without changing the underlying quantity.
- **Dimensional analysis**, for checking whether an equation even makes physical sense.
- **Significant figures**, for being honest about the precision of a measurement.

Taken together, they form the grammar of quantity.

## 1. Scientific notation: writing scale cleanly

Scientific notation writes a number as

$$
a \times 10^n
$$

where \(1 \le a < 10\) and \(n\) is an integer.

Examples:

- \(4{,}800 = 4.8 \times 10^3\)
- \(0.0048 = 4.8 \times 10^{-3}\)
- \(51{,}000{,}000 = 5.1 \times 10^7\)

The exponent tells you the **order of magnitude**. That phrase matters. It is a way of asking, “Roughly what power of ten are we dealing with?”

A quantity near \(10^2\) is in the hundreds.  
A quantity near \(10^6\) is in the millions.  
A quantity near \(10^{-9}\) is tiny.

This is not cosmetic. It lets you compare scales quickly.

### Example: comparing quantities from Earth systems

Suppose you see the following values:

- average river discharge at a site: \(2.4 \times 10^2 \, \text{m}^3/\text{s}\)
- atmospheric CO\(_2\) fraction by volume: \(4.2 \times 10^{-4}\)
- area of a small watershed: \(8.5 \times 10^7 \, \text{m}^2\)

These are not hard to compare once written properly. The discharge is hundreds, the concentration is ten-thousandths, and the area is tens of millions. Scientific notation keeps the scale visible.

### Common student trap

A negative exponent does **not** mean a negative number.

For example:

$$
10^{-3} = \frac{1}{10^3} = \frac{1}{1000} = 0.001
$$

It is positive, just small.

## 2. Units: numbers are never alone

A number without units is often useless.

If I say a river is flowing at 30, that is incomplete.  
30 what?

- \(30 \, \text{m}^3/\text{s}\)?
- \(30 \, \text{L/s}\)?
- \(30 \, \text{km/h}\)?

The unit tells you what the quantity means.

### Basic conversion structure

A conversion works by multiplying by a fraction equal to 1.

For example, since \(1 \, \text{km} = 1000 \, \text{m}\),

$$
\frac{1000 \, \text{m}}{1 \, \text{km}} = 1
$$

So converting \(3.2 \, \text{km}\) to metres gives

$$
3.2 \, \text{km} \times \frac{1000 \, \text{m}}{1 \, \text{km}} = 3200 \, \text{m}
$$

The unit \(\text{km}\) cancels. That cancellation is not a trick. It is the whole logic.

### Worked example: elevation conversion

A summit is listed as \(7{,}200\) feet above sea level. Convert this to metres and then kilometres.

Use

$$
1 \, \text{ft} = 0.3048 \, \text{m}
$$

Then

$$
7200 \, \text{ft} \times \frac{0.3048 \, \text{m}}{1 \, \text{ft}} = 2194.56 \, \text{m}
$$

Now convert metres to kilometres:

$$
2194.56 \, \text{m} \times \frac{1 \, \text{km}}{1000 \, \text{m}} = 2.19456 \, \text{km}
$$

So the summit is approximately

$$
2195 \, \text{m} \approx 2.195 \, \text{km}
$$

depending on the precision we decide to report.

### A useful habit

Write the units all the way through the calculation. Do not treat them as labels added at the end. If the units do not cancel the way you expected, the algebra is often wrong.

## 3. Dimensional analysis: does the equation make sense?

Dimensional analysis is the habit of checking an expression by its units.

Suppose discharge is defined by

$$
Q = Av
$$

where

- \(Q\) is discharge
- \(A\) is cross-sectional area
- \(v\) is average velocity

If \(A\) has units of \(\text{m}^2\) and \(v\) has units of \(\text{m/s}\), then

$$
\text{m}^2 \cdot \frac{\text{m}}{\text{s}} = \frac{\text{m}^3}{\text{s}}
$$

That matches the expected unit for discharge. Good.

Now imagine someone wrote

$$
Q = A + v
$$

This is nonsense dimensionally, because

- \(A\) is in \(\text{m}^2\)
- \(v\) is in \(\text{m/s}\)

Those are unlike quantities. Adding them is like adding three apples to four kilometres.

### Worked example: river discharge

A river channel has an average cross-sectional area of \(18 \, \text{m}^2\) and an average flow velocity of \(1.6 \, \text{m/s}\). Find the discharge.

Use

$$
Q = Av
$$

Substitute:

$$
Q = 18 \, \text{m}^2 \cdot 1.6 \, \text{m/s}
$$

So

$$
Q = 28.8 \, \text{m}^3/\text{s}
$$

Before trusting the number, inspect the units:

$$
\text{m}^2 \cdot \text{m/s} = \text{m}^3/\text{s}
$$

That is exactly what we want. The calculation is physically coherent.

### Why this matters later

Dimensional thinking becomes even more important in calculus and modelling. A derivative such as \(\frac{dT}{dt}\) has units of temperature per time. An integral often restores the original quantity by multiplying by the variable of integration. If you keep track of units, advanced mathematics becomes much less mysterious.

## 4. Significant figures: how honest is your measurement?

Not every digit deserves equal trust.

If you measure a road segment as `3.2 km`, that does **not** mean the exact distance is 3.200000 km. It means the measurement is known to roughly two significant figures.

### What counts as a significant figure?

- Non-zero digits are significant.
- Zeros between non-zero digits are significant.
- Leading zeros are **not** significant.
- Trailing zeros may or may not be significant depending on context.

Examples:

- `0.00450` has **3** significant figures: 4, 5, and the trailing 0.
- `1200` is ambiguous unless written as `1.2 × 10^3`, `1.20 × 10^3`, or `1.200 × 10^3`.

### Why this matters

Suppose one input is measured only roughly, while another is very precise. Your final answer should not pretend to be more precise than the weakest input supports.

### Worked example: measured area

A rectangular plot is measured as

- length: \(24.6 \, \text{m}\)
- width: \(8.1 \, \text{m}\)

Then the area is

$$
A = 24.6 \times 8.1 = 199.26 \, \text{m}^2
$$

But should we report \(199.26 \, \text{m}^2\)? No.

The width has only **2 significant figures**. So the final answer should usually be reported to **2 significant figures**:

$$
A \approx 2.0 \times 10^2 \, \text{m}^2
$$

or

$$
A \approx 200 \, \text{m}^2
$$

with the understanding that the latter can be ambiguous unless context is clear.

## Seeing powers of ten

A useful way to calm down around scientific notation is to think of powers of ten as a ladder.

```html
<div data-viz="echarts" style="height:360px" data-options='{
  "xAxis":{"type":"category","data":["10^-6","10^-4","10^-2","10^0","10^2","10^4","10^6"]},
  "yAxis":{"type":"value","name":"Relative size"},
  "series":[{"type":"line","data":[0.000001,0.0001,0.01,1,100,10000,1000000]}],
  "tooltip":{"trigger":"axis"}
}'></div>
```

This chart is not meant to impress anyone. It is meant to remind the reader that scale itself is a mathematical object.

## Geography example: area and runoff depth

Suppose a rainfall event deposits \(12 \, \text{mm}\) of rain over a catchment with area \(35 \, \text{km}^2\).

A common question is: what volume of water does that correspond to, before losses?

First convert the depth:

$$
12 \, \text{mm} = 0.012 \, \text{m}
$$

Now convert the area:

$$
35 \, \text{km}^2 = 35 \times (1000 \, \text{m})^2 = 35 \times 10^6 \, \text{m}^2
$$

So the rainfall volume is

$$
V = \text{depth} \times \text{area}
$$

$$
V = 0.012 \, \text{m} \times 35 \times 10^6 \, \text{m}^2
$$

$$
V = 4.2 \times 10^5 \, \text{m}^3
$$

Notice how much easier this is if you are comfortable with units and powers of ten. Without that, the modelling idea is hidden behind arithmetic fog.

## Common mistakes

### Mistake 1: moving the decimal the wrong way
When the exponent is positive, the number gets larger.  
When the exponent is negative, the number gets smaller.

### Mistake 2: converting units by memory alone
Do not “just know” that the answer is right. Write the conversion factor and cancel units.

### Mistake 3: ignoring squared or cubed units
If you convert \(\text{km}^2\) to \(\text{m}^2\), the factor is squared:

$$
1 \, \text{km}^2 = (1000 \, \text{m})^2 = 10^6 \, \text{m}^2
$$

This is a classic place to lose a factor of one million.

### Mistake 4: reporting fake precision
If the measurements are rough, the answer should be rough too.

## A compact checklist

When you face a quantitative problem, try this sequence:

1. Write down the quantity and its unit.
2. Convert everything into compatible units.
3. Check whether the formula is dimensionally sensible.
4. Compute.
5. Round to an honest level of precision.
6. Ask whether the magnitude seems plausible.

That last step matters. If your computed rainfall depth would fill an ocean basin, stop and inspect your units.

## Check your understanding

1. Write \(0.00056\) in scientific notation.
2. Convert \(18.5 \, \text{km}\) to metres.
3. Convert \(2.3 \, \text{km}^2\) to \(\text{m}^2\).
4. If \(Q = Av\), what units should \(A\) have if \(Q\) is in \(\text{m}^3/\text{s}\) and \(v\) is in \(\text{m/s}\)?
5. A concentration is reported as `0.00420`. How many significant figures does it have?

## Answer sketches

1. \(5.6 \times 10^{-4}\)
2. \(18{,}500 \, \text{m}\)
3. \(2.3 \times 10^6 \, \text{m}^2\)
4. \(\text{m}^2\)
5. Three significant figures

## Where this goes next

Now that the numbers themselves are behaving, the next step is to make relationships behave. In the next essay, we move from quantities to **variables and equations**: how letters stand in for measurable things, and how equations express a balance or relationship you can manipulate without losing physical meaning.
