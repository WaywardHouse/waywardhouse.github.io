---
layout: essay
title: Inequalities and Intervals
author: paul-hobson
date: 2026-03-06
categories:
  - maths
tags:
  - mathematics
  - tutorial
  - math-primer
series: "Math Primer M1: Numbers, Units, and Algebra"
series_order: 6
math: true
viz: true
excerpt: Using inequalities and intervals to represent ranges, constraints, and thresholds in real systems.
permalink: /math/1/inequalities-and-intervals/
---

## Why this matters

Not every quantity in the real world is known exactly.

Environmental systems almost always operate within **ranges** rather than precise values.

For example:

- Safe drinking water requires contaminant concentrations **below** a regulatory limit.
- Flood warnings activate when river discharge rises **above** a threshold.
- Crops grow only when temperature remains **within** a certain band.
- Satellites remain stable only when orbital velocity stays **between** limits.

In mathematics we represent these situations using **inequalities** and **intervals**.

Instead of asking:

> What is the value?

we ask:

> What values are possible?

Understanding inequalities allows us to express **constraints**, which are fundamental to modelling real systems.

---

## The main ideas

This essay introduces three closely related concepts:

- Inequalities as comparisons between quantities
- Interval notation for describing ranges
- Graphical interpretation on the number line

These tools allow us to describe limits, tolerances, and safe operating regions.

---

## 1. Inequalities

An inequality compares two expressions using symbols such as:

| Symbol | Meaning |
|------|------|
| $<$ | less than |
| $>$ | greater than |
| $\le$ | less than or equal to |
| $\ge$ | greater than or equal to |

Example:

$$
x < 5
$$

This means $x$ can take **any value smaller than 5**.

If we write

$$
x \le 5
$$

then the value **5 itself is allowed**.

---

## 2. Solving simple inequalities

Solving an inequality is similar to solving an equation.

Consider

$$
3x + 2 < 11
$$

### Step 1: subtract 2

$$
3x < 9
$$

### Step 2: divide by 3

$$
x < 3
$$

The solution is **any value less than 3**.

---

## Important rule: multiplying by negative numbers

If you multiply or divide both sides of an inequality by a **negative number**, the direction of the inequality reverses.

Example:

$$
-2x > 8
$$

Divide by $-2$:

$$
x < -4
$$

The inequality flips direction.

This rule exists because multiplying by a negative number reverses order on the number line.

---

## 3. Interval notation

Rather than writing inequalities repeatedly, mathematicians often describe ranges using **interval notation**.

Examples:

| Interval | Meaning |
|------|------|
| $(2,7)$ | values strictly between 2 and 7 |
| $[2,7]$ | values including 2 and 7 |
| $(-\infty,4)$ | any value less than 4 |
| $[0,\infty)$ | any non-negative value |

Parentheses mean the boundary is **excluded**.

Brackets mean the boundary is **included**.

---

## Visualising intervals

```html
<div data-viz="echarts" style="height:320px" data-options='{
"xAxis":{"type":"value","min":-5,"max":10},
"yAxis":{"show":false},
"series":[{"type":"line","data":[[-5,0],[3,0]],"lineStyle":{"width":4}}]
}'></div>
```

This diagram represents the interval

$$
(-\infty, 3)
$$

which means all numbers less than 3.

---

## Worked example: water quality regulation

Suppose environmental regulations state that nitrate concentration in drinking water must satisfy

$$
C \le 10 \; mg/L
$$

If measurements show

$$
C = 7.3 \; mg/L
$$

the water meets the requirement.

But if

$$
C = 12 \; mg/L
$$

the system exceeds the safe limit.

This inequality expresses a **regulatory constraint**, not a specific prediction.

---

## Geography example — flood thresholds

Flood warnings are often triggered when river discharge exceeds a critical level.

Suppose a river channel begins flooding when

$$
Q > 900 \; m^3/s
$$

During monitoring, measured discharge values might be:

| Time | Discharge |
|------|------|
| 08:00 | 620 |
| 12:00 | 740 |
| 16:00 | 910 |
| 20:00 | 1050 |

The inequality

$$
Q > 900
$$

indicates when flood response procedures must begin.

This is a simple but powerful use of inequalities in environmental management.

---

## Common mistakes

### Treating inequalities like equations

Inequalities describe ranges, not single values.

### Forgetting the sign reversal rule

Multiplying or dividing by negative numbers reverses the inequality.

### Ignoring physical meaning

Always interpret inequalities within their real-world context.

---

## A compact checklist

When working with inequalities:

1. Identify the quantity and its units.
2. Rearrange the inequality carefully.
3. Remember the sign reversal rule.
4. Express the solution as a range.
5. Interpret the result physically.

---

## Check your understanding

1. Solve

$$
2x + 5 < 13
$$

2. Solve

$$
-3x \ge 9
$$

3. Write the interval represented by

$$
1 \le x < 6
$$

---

## Answer sketches

1. $x < 4$

2. $x \le -3$

3. $[1,6)$

---

## Where this goes next

So far we have focused on relationships between quantities.

The next step is to combine these ideas into **functions**, where one variable systematically determines another.

Functions form the backbone of modelling — from population growth to heat transfer to machine learning models.

That is where the mathematics becomes even more powerful.
