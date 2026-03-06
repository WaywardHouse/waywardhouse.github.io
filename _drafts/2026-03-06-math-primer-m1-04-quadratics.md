---
layout: essay
title: Quadratics
author: paul-hobson
date: 2026-03-06
categories:
  - maths
tags:
  - mathematics
  - tutorial
  - math-primer
series: "Math Primer M1: Numbers, Units, and Algebra"
series_order: 4
math: true
viz: true
excerpt: Parabolas, roots, vertex form, and the quadratic formula taught through shape, motion, and practical interpretation.
permalink: /math/1/quadratics/
---

## Why this matters

The first time students meet a squared variable, the problem often changes character.

A linear equation gives a straight-line relationship. A quadratic equation bends. That bend matters. It appears in projectile motion, area optimization, and many simple physical models. The graph is no longer a line but a **parabola**, and once you can read that shape, quadratics become much less frightening.

This essay is about that shift: from line to curve, from one crossing to possibly two, from constant rate of change to changing rate of change.

## What a quadratic is

A **quadratic expression** has the general form

$$
ax^2 + bx + c
$$

with \(a \ne 0\).

A **quadratic equation** sets that expression equal to something, often zero:

$$
ax^2 + bx + c = 0
$$

The corresponding graph of

$$
y = ax^2 + bx + c
$$

is a parabola.

## The shape of a parabola

The coefficient \(a\) controls the opening:

- if \(a > 0\), the parabola opens upward
- if \(a < 0\), it opens downward

The parabola has a highest or lowest point called the **vertex**.

### Example

$$
y = x^2
$$

opens upward, with vertex at \((0,0)\).

$$
y = -x^2
$$

opens downward, also with vertex at \((0,0)\).

### Why the vertex matters

In many applied problems, the vertex represents an optimum:

- maximum height
- minimum cost
- maximum area
- minimum distance under a simplified model

So the shape is not decorative. It is interpretive.

## Solving quadratics by factoring

Factoring works when the quadratic can be written as a product of simpler expressions.

### Worked example 1

Solve

$$
x^2 - 5x + 6 = 0
$$

Factor:

$$
x^2 - 5x + 6 = (x-2)(x-3)
$$

So

$$
(x-2)(x-3)=0
$$

If a product is zero, at least one factor must be zero:

$$
x-2=0 \quad \text{or} \quad x-3=0
$$

Hence

$$
x=2 \quad \text{or} \quad x=3
$$

These are the **roots** or **solutions**.

## Why roots matter graphically

The roots are the \(x\)-values where the graph crosses the horizontal axis.

If

$$
y = x^2 - 5x + 6
$$

then the graph crosses the \(x\)-axis at \(x=2\) and \(x=3\).

```html
<div data-viz="echarts" style="height:360px" data-options='{
  "xAxis":{"type":"value","min":-1,"max":6},
  "yAxis":{"type":"value","min":-3,"max":8},
  "series":[
    {"type":"line","smooth":true,"data":[[-1,12],[0,6],[1,2],[2,0],[2.5,-0.25],[3,0],[4,2],[5,6],[6,12]]},
    {"type":"scatter","data":[[2,0],[3,0],[2.5,-0.25]],"name":"key points"}
  ],
  "tooltip":{"trigger":"axis"}
}'></div>
```

A graph like this helps the student see three important features at once:

- the intercepts
- the turning point
- the overall opening direction

## Completing the square and vertex form

Factoring is useful, but it does not always work neatly. Another way to understand a quadratic is to rewrite it in **vertex form**:

$$
y = a(x-h)^2 + k
$$

Here the vertex is at \((h,k)\).

### Worked example 2

Rewrite

$$
y = x^2 - 4x + 1
$$

in vertex form.

Take the first two terms:

$$
x^2 - 4x
$$

Complete the square by adding and subtracting \(4\), because

$$
\left(\frac{-4}{2}\right)^2 = 4
$$

So:

$$
y = x^2 - 4x + 4 - 4 + 1
$$

$$
y = (x-2)^2 - 3
$$

So the vertex is

$$
(2,-3)
$$

That means the parabola opens upward and reaches its minimum value \(-3\) at \(x=2\).

### Why this matters

In many problems, the vertex tells you the answer faster than the roots do. If the parabola models area or height, the turning point is often the physically important quantity.

## The quadratic formula

For a general quadratic

$$
ax^2 + bx + c = 0
$$

the solutions are

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

This formula is not the beginning of the topic. It is the universal fallback when factoring is awkward.

### Worked example 3

Solve

$$
2x^2 + 3x - 2 = 0
$$

Here:

- \(a = 2\)
- \(b = 3\)
- \(c = -2\)

Substitute into the formula:

$$
x = \frac{-3 \pm \sqrt{3^2 - 4(2)(-2)}}{2(2)}
$$

$$
x = \frac{-3 \pm \sqrt{9 + 16}}{4}
$$

$$
x = \frac{-3 \pm \sqrt{25}}{4}
$$

$$
x = \frac{-3 \pm 5}{4}
$$

So the two solutions are

$$
x = \frac{2}{4} = \frac{1}{2}
$$

and

$$
x = \frac{-8}{4} = -2
$$

Both are valid roots.

## The discriminant: how many solutions?

Inside the square root sits

$$
b^2 - 4ac
$$

This is called the **discriminant**.

It tells us how many real roots the quadratic has:

- if \(b^2 - 4ac > 0\): two distinct real roots
- if \(b^2 - 4ac = 0\): one repeated real root
- if \(b^2 - 4ac < 0\): no real roots

This matters because it predicts the graph’s relationship to the \(x\)-axis.

### Example

For

$$
x^2 - 4x + 4 = 0
$$

the discriminant is

$$
(-4)^2 - 4(1)(4) = 16 - 16 = 0
$$

So there is one repeated root. Indeed:

$$
x^2 - 4x + 4 = (x-2)^2
$$

The parabola touches the axis at \(x=2\) but does not cross it.

## Geography example: projectile-style trajectory

Quadratics often appear in simplified motion models.

Suppose the height of a rock thrown from a ledge is modeled by

$$
h(t) = -5t^2 + 20t + 15
$$

where:

- \(h\) is height in metres
- \(t\) is time in seconds

This is a quadratic in \(t\).

### Question 1: what is the maximum height?

The graph opens downward because the coefficient of \(t^2\) is negative, so the vertex is the maximum.

Use the vertex formula:

$$
t = \frac{-b}{2a}
$$

Here \(a=-5\) and \(b=20\), so

$$
t = \frac{-20}{2(-5)} = 2
$$

Now compute height at \(t=2\):

$$
h(2) = -5(2)^2 + 20(2) + 15 = -20 + 40 + 15 = 35
$$

So the maximum height is

$$
35 \, \text{m}
$$

at \(2\) seconds.

### Question 2: when does it hit the ground?

Set \(h(t)=0\):

$$
-5t^2 + 20t + 15 = 0
$$

Divide by \(-5\):

$$
t^2 - 4t - 3 = 0
$$

Use the quadratic formula:

$$
t = \frac{4 \pm \sqrt{(-4)^2 - 4(1)(-3)}}{2}
$$

$$
t = \frac{4 \pm \sqrt{16+12}}{2}
$$

$$
t = \frac{4 \pm \sqrt{28}}{2}
= \frac{4 \pm 2\sqrt{7}}{2}
= 2 \pm \sqrt{7}
$$

Numerically:

- \(t \approx 2 + 2.646 = 4.646\)
- \(t \approx 2 - 2.646 = -0.646\)

The negative time is not physically meaningful in this context, so the rock hits the ground after about

$$
4.65 \, \text{s}
$$

### This is an important modelling lesson

Quadratics can give more than one mathematical answer, but context tells you which answers make physical sense.

## Area optimization example

Suppose you have \(20\) metres of fencing for three sides of a rectangular enclosure built against a wall, so only two widths and one length need fencing.

Let width be \(x\), so length is \(20 - 2x\).

Area is

$$
A = x(20 - 2x) = 20x - 2x^2
$$

This is a quadratic:

$$
A(x) = -2x^2 + 20x
$$

It opens downward, so it has a maximum at the vertex.

Use

$$
x = \frac{-b}{2a} = \frac{-20}{2(-2)} = 5
$$

So the optimal width is \(5\) m, and length is

$$
20 - 2(5) = 10
$$

Maximum area is

$$
A = 5 \cdot 10 = 50 \, \text{m}^2
$$

This is a clean example of a quadratic as an optimization machine.

## Common mistakes

### Mistake 1: using the quadratic formula with the wrong signs
If the equation is \(ax^2 + bx + c = 0\), be very careful about the sign of \(b\) and \(c\) when substituting.

### Mistake 2: forgetting to set the equation equal to zero
Factoring and the quadratic formula are designed for equations in standard form:

$$
ax^2 + bx + c = 0
$$

### Mistake 3: thinking the vertex and roots are the same thing
The roots are where the graph crosses the axis.  
The vertex is the turning point.

### Mistake 4: accepting impossible roots without interpretation
In a time or distance problem, a negative solution may not make physical sense.

## A student-friendly summary of the toolkit

When you see a quadratic, ask:

1. Can I graph or imagine its shape?
2. Can I factor it?
3. Is the vertex what I really care about?
4. If factoring is messy, should I use the quadratic formula?
5. Does the physical context rule out one of the solutions?

That sequence is much more useful than trying to remember isolated procedures.

## Check your understanding

1. Solve \(x^2 - 7x + 12 = 0\) by factoring.
2. Find the vertex of \(y = x^2 - 6x + 5\).
3. Use the quadratic formula to solve \(x^2 + x - 6 = 0\).
4. A projectile has height \(h(t) = -4t^2 + 16t\). What is its maximum height?
5. What does it mean if the discriminant is negative?

## Answer sketches

1. \((x-3)(x-4)=0\), so \(x=3,4\)
2. Complete the square or use vertex formula: vertex at \((3,-4)\)
3. \(x = \frac{-1 \pm \sqrt{25}}{2}\), so \(x=2,-3\)
4. Vertex at \(t=2\), height \(16\)
5. The quadratic has no real roots; the graph does not cross the \(x\)-axis.

## Where this goes next

Quadratics are the first serious encounter with nonlinear shape. The next two essays in this series widen that pattern-recognition skill: **proportional and inverse relationships** teach you how quantities scale, and **inequalities and intervals** teach you how to reason about feasible ranges instead of single exact answers.
