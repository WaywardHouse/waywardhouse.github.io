---
layout: essay
title: Variables and Equations
author: paul-hobson
date: 2026-03-06
categories:
  - maths
tags:
  - mathematics
  - tutorial
  - math-primer
series: "Math Primer M1: Numbers, Units, and Algebra"
series_order: 2
math: true
viz: true
excerpt: A respectful, practical guide to variables, linear equations, and formula rearrangement using real measurable quantities.
permalink: /math/1/variables-and-equations/
---

## Why this matters

Students often say they are “bad at algebra” when what they really mean is this: letters enter the page and the problem stops feeling real.

That reaction is understandable. In arithmetic, you are usually given the numbers directly. In algebra, you are asked to think one level higher. A symbol might stand for discharge, speed, temperature, or time. The letters are not there to make the problem abstract. They are there to make the relationship portable.

A good equation is a compact statement about how the world hangs together.

If you can read and rearrange equations, you can solve for the unknown quantity you care about. That is how you compute travel time from distance and speed. It is how you isolate velocity from discharge and area. It is how you turn a physical relationship into a usable tool.

## Variables are placeholders for quantities

A **variable** is a symbol that stands for a quantity that may vary or that is currently unknown.

Examples:

- \(t\) for time
- \(d\) for distance
- \(v\) for velocity
- \(T\) for temperature

A variable is not “just any letter.” It should point to a specific quantity with units and meaning.

### Example

If you write

$$
Q = Av
$$

then:

- \(Q\) is discharge
- \(A\) is cross-sectional area
- \(v\) is average velocity

These are not random symbols. They are a compact way of writing a relationship.

## What an equation says

An **equation** says that two expressions are equal.

For example,

$$
d = vt
$$

says that distance equals velocity times time.

This can be read physically:

- go faster, and distance covered in a given time increases
- travel for longer, and distance increases
- if distance and time are known, you can solve for velocity

One equation can often answer several different questions depending on which variable is unknown.

## Solving a linear equation

A **linear equation** is an equation in which the variable appears only to the first power.

Examples:

$$
3x + 5 = 17
$$

$$
T = 2h + 14
$$

The core principle is balance. If two sides are equal, you may perform the same legal operation on both sides and preserve equality.

### Worked example 1: direct algebra

Solve

$$
3x + 5 = 17
$$

Subtract 5 from both sides:

$$
3x = 12
$$

Now divide by 3:

$$
x = 4
$$

That is the whole logic. You are peeling away operations in reverse order.

## Formula rearrangement

A formula rearrangement is the same principle, but now the letters represent meaningful quantities.

### Worked example 2: solving for time

Start with

$$
d = vt
$$

Suppose you know distance and velocity, but want time. Solve for \(t\).

Divide both sides by \(v\):

$$
t = \frac{d}{v}
$$

This rearrangement matters because it lets you move from a memorized formula to a useful one.

### Example with numbers

A hiker travels \(12 \, \text{km}\) at an average speed of \(4 \, \text{km/h}\). Find the travel time.

Use

$$
t = \frac{d}{v}
$$

Substitute:

$$
t = \frac{12 \, \text{km}}{4 \, \text{km/h}} = 3 \, \text{h}
$$

Notice the units:

$$
\frac{\text{km}}{\text{km/h}} = \text{h}
$$

Even algebra becomes easier when the units stay visible.

## The idea of isolation

When solving for a variable, the goal is to **isolate** it. That means getting it alone on one side of the equation.

Here are some common patterns:

### Pattern 1
If

$$
ax = b
$$

then

$$
x = \frac{b}{a}
$$

provided \(a \ne 0\).

### Pattern 2
If

$$
x + c = d
$$

then

$$
x = d - c
$$

### Pattern 3
If

$$
\frac{x}{a} = b
$$

then

$$
x = ab
$$

### Pattern 4
If

$$
a(x+b)=c
$$

then first divide by \(a\), then subtract \(b\).

The most common student problem is not arithmetic. It is forgetting which operation happened to the variable last.

## Reading an equation structurally

Take

$$
Q = Av
$$

You can read this in several ways:

- If area increases and velocity stays fixed, discharge increases.
- If velocity doubles and area stays fixed, discharge doubles.
- If discharge and area are known, then velocity is

$$
v = \frac{Q}{A}
$$

- If discharge and velocity are known, then area is

$$
A = \frac{Q}{v}
$$

This is not separate mathematics. It is one relationship seen from different angles.

## Worked example 3: river flow velocity

A stream has discharge \(Q = 24 \, \text{m}^3/\text{s}\) and average cross-sectional area \(A = 15 \, \text{m}^2\). Find the mean velocity.

Start with

$$
Q = Av
$$

Solve for \(v\):

$$
v = \frac{Q}{A}
$$

Substitute:

$$
v = \frac{24 \, \text{m}^3/\text{s}}{15 \, \text{m}^2}
$$

$$
v = 1.6 \, \text{m/s}
$$

Unit check:

$$
\frac{\text{m}^3/\text{s}}{\text{m}^2} = \text{m/s}
$$

Again, the algebra and the physics agree.

## Linear relationships as graphs

A linear equation often graphs as a straight line.

For example,

$$
y = mx + b
$$

where:

- \(m\) is the slope
- \(b\) is the intercept

This is not only a graphing rule. It is a way to interpret change.

### Example

Suppose temperature decreases with altitude according to

$$
T = 18 - 0.0065h
$$

where \(T\) is in degrees Celsius and \(h\) is altitude in metres.

This says:

- when \(h = 0\), temperature is \(18^\circ\text{C}\)
- for each additional metre, temperature drops by \(0.0065^\circ\text{C}\)

The coefficient of \(h\) is a rate of change.

```html
<div data-viz="echarts" style="height:340px" data-options='{
  "xAxis":{"type":"value","name":"Altitude (m)","min":0,"max":3000},
  "yAxis":{"type":"value","name":"Temperature (°C)","min":-5,"max":20},
  "series":[{"type":"line","smooth":false,"data":[[0,18],[1000,11.5],[2000,5],[3000,-1.5]]}],
  "tooltip":{"trigger":"axis"}
}'></div>
```

The graph helps the student see that algebra and geometry are telling the same story.

## Worked example 4: rearranging a temperature formula

Suppose

$$
T = 18 - 0.0065h
$$

and the temperature is measured as \(5^\circ \text{C}\). Find the altitude \(h\).

Substitute \(T = 5\):

$$
5 = 18 - 0.0065h
$$

Subtract 18 from both sides:

$$
-13 = -0.0065h
$$

Divide by \(-0.0065\):

$$
h = \frac{-13}{-0.0065} = 2000
$$

So the altitude is

$$
h = 2000 \, \text{m}
$$

This is useful because the formula now works in reverse: from temperature to altitude.

## Common mistakes

### Mistake 1: changing one side but not the other
If you subtract 5 on the left, you must subtract 5 on the right.

### Mistake 2: moving terms “across the equals sign” by magic
Students are often taught to “move it across and change the sign.” That is a memory trick, not a reason. The real reason is that you are performing inverse operations on both sides.

### Mistake 3: forgetting what the variable means
If \(v\) is velocity, the answer should carry velocity units. If your final units are nonsense, the rearrangement or substitution is wrong.

### Mistake 4: confusing multiplication with addition
In

$$
Q = Av
$$

the area and velocity are multiplied. In

$$
T = 18 - 0.0065h
$$

the constant and variable term are added algebraically. These structures behave differently.

## A useful discipline: annotate the symbols

Before solving, write down what the symbols mean.

For example:

- \(d\): distance in km
- \(v\): speed in km/h
- \(t\): time in h

This slows you down slightly at the start and saves you confusion later.

## A geography-flavoured example: travel across a transect

A field team must travel \(48 \, \text{km}\) along a survey transect. Their average speed over rough ground is \(6 \, \text{km/h}\).

How long will the traverse take?

Start with

$$
d = vt
$$

Solve for \(t\):

$$
t = \frac{d}{v}
$$

Substitute:

$$
t = \frac{48}{6} = 8
$$

So the traverse time is

$$
8 \, \text{h}
$$

Now suppose they can only spend 6 hours in transit. What speed would they need?

Rearrange instead for \(v\):

$$
v = \frac{d}{t}
$$

Then

$$
v = \frac{48}{6} = 8 \, \text{km/h}
$$

One equation, two questions, two useful answers.

## Check your understanding

1. Solve \(7x - 9 = 26\).
2. Rearrange \(A = lw\) to solve for \(w\).
3. If \(Q = Av\), solve for \(A\).
4. A vehicle travels \(150 \, \text{km}\) in \(2.5 \, \text{h}\). Find its average speed.
5. If \(T = 20 - 0.01h\), what is \(T\) at \(h = 500\)?

## Answer sketches

1. \(x = 5\)
2. \(w = \frac{A}{l}\)
3. \(A = \frac{Q}{v}\)
4. \(v = 60 \, \text{km/h}\)
5. \(T = 15^\circ\text{C}\)

## Where this goes next

A single equation can describe one relationship. But real systems often impose more than one condition at once. The next essay introduces **systems of equations**, where several relationships work together to pin down a solution.
