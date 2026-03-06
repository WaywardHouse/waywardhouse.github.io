---
layout: essay
title: Systems of Equations
author: paul-hobson
date: 2026-03-06
categories:
  - maths
tags:
  - mathematics
  - tutorial
  - math-primer
series: "Math Primer M1: Numbers, Units, and Algebra"
series_order: 3
math: true
viz: true
excerpt: How multiple constraints work together, with elimination, substitution, and graphical intuition grounded in real examples.
permalink: /math/1/systems-of-equations/
---

## Why this matters

Many problems in the real world are not governed by one condition but by several at once.

A mixture must have the right total volume **and** the right concentration.  
A budget must satisfy a total cost **and** a staffing requirement.  
A point on a graph might need to lie on one line **and** another line at the same time.

That is the logic of a system of equations. Each equation tells part of the story. The solution is the point where all of those conditions are true together.

If a single equation is one rule, a system is a negotiation among rules.

## What a system of equations is

A **system of equations** is a collection of equations involving the same variables.

A simple example is

$$
\begin{aligned}
x + y &= 10 \\
x - y &= 2
\end{aligned}
$$

The solution is a pair of values for \(x\) and \(y\) that makes **both** equations true.

## Three ways to think about a system

There are three useful viewpoints:

1. **Arithmetic viewpoint**: find the unknown values.
2. **Algebraic viewpoint**: manipulate the equations using elimination or substitution.
3. **Geometric viewpoint**: each equation is a curve, often a line; the solution is where they intersect.

A good learner should become comfortable with all three.

## Method 1: substitution

Substitution works best when one variable is already isolated, or can be isolated easily.

### Worked example 1

Solve

$$
\begin{aligned}
x + y &= 10 \\
y &= 3x - 2
\end{aligned}
$$

The second equation already tells us what \(y\) is. Substitute it into the first:

$$
x + (3x - 2) = 10
$$

Simplify:

$$
4x - 2 = 10
$$

$$
4x = 12
$$

$$
x = 3
$$

Now substitute back:

$$
y = 3(3) - 2 = 7
$$

So the solution is

$$
(x, y) = (3, 7)
$$

Check:

- \(3 + 7 = 10\)
- \(7 = 3(3) - 2 = 7\)

Both equations are satisfied.

## Method 2: elimination

Elimination works by combining equations so one variable cancels.

### Worked example 2

Solve

$$
\begin{aligned}
x + y &= 10 \\
x - y &= 2
\end{aligned}
$$

Add the equations:

$$
(x+y) + (x-y) = 10 + 2
$$

$$
2x = 12
$$

$$
x = 6
$$

Now substitute into the first equation:

$$
6 + y = 10
$$

$$
y = 4
$$

So

$$
(x, y) = (6, 4)
$$

### Why elimination works

One equation says “add \(y\).”  
The other says “subtract \(y\).”  
When combined, the \(y\)-terms cancel cleanly.

That cancellation is not luck. It is structure.

## Graphical meaning: intersections

Each linear equation in two variables represents a line.

If two lines intersect once, the system has **one solution**.  
If they are parallel, the system has **no solution**.  
If they are the same line, the system has **infinitely many solutions**.

### Example: one solution

$$
\begin{aligned}
y &= 2x + 1 \\
y &= -x + 7
\end{aligned}
$$

These lines have different slopes, so they intersect once.

### Example: no solution

$$
\begin{aligned}
y &= 2x + 1 \\
y &= 2x - 3
\end{aligned}
$$

Same slope, different intercepts. Parallel lines. No intersection.

### Example: infinitely many solutions

$$
\begin{aligned}
2x + 2y &= 8 \\
x + y &= 4
\end{aligned}
$$

These are the same line written differently.

```html
<div data-viz="echarts" style="height:360px" data-options='{
  "xAxis":{"type":"value","min":0,"max":8},
  "yAxis":{"type":"value","min":0,"max":10},
  "series":[
    {"type":"line","data":[[0,1],[4,9]],"name":"y=2x+1"},
    {"type":"line","data":[[0,7],[7,0]],"name":"y=-x+7"},
    {"type":"scatter","data":[[2,5]],"name":"intersection"}
  ],
  "tooltip":{"trigger":"axis"},
  "legend":{"top":0}
}'></div>
```

A graph like this is worth including because it shows that “solving” means “finding the common truth.”

## Worked example 3: mixing water sources

This is the kind of problem where systems start to feel obviously useful.

Suppose a field station needs \(100\) litres of water with salinity \(2\%\). It has two sources available:

- Source A: \(1\%\) salinity
- Source B: \(4\%\) salinity

How much should be taken from each source?

Let:

- \(x\) = litres from Source A
- \(y\) = litres from Source B

### Step 1: total volume equation

The total volume must be 100 litres:

$$
x + y = 100
$$

### Step 2: total salt equation

Source A contributes \(0.01x\) litres of salt.  
Source B contributes \(0.04y\) litres of salt.

The final mixture must contain \(2\%\) of 100 litres, so total salt must be \(2\) litres:

$$
0.01x + 0.04y = 2
$$

So the system is

$$
\begin{aligned}
x + y &= 100 \\
0.01x + 0.04y &= 2
\end{aligned}
$$

### Solve by substitution

From the first equation:

$$
x = 100 - y
$$

Substitute into the second:

$$
0.01(100-y) + 0.04y = 2
$$

$$
1 - 0.01y + 0.04y = 2
$$

$$
1 + 0.03y = 2
$$

$$
0.03y = 1
$$

$$
y = 33.33
$$

Then

$$
x = 100 - 33.33 = 66.67
$$

So the station should use approximately:

- \(66.67\) L from Source A
- \(33.33\) L from Source B

### Why this is a beautiful example

The first equation alone is too weak. There are infinitely many pairs adding to 100.  
The second equation alone is also too weak.  
Together, they identify one workable mixture.

That is exactly what multiple constraints do.

## Worked example 4: land-use allocation

Suppose a restoration plan divides \(50\) hectares between wetland and grassland.

Let:

- \(w\) = wetland hectares
- \(g\) = grassland hectares

The total area is

$$
w + g = 50
$$

Suppose wetland restoration costs \$12,000 per hectare and grassland restoration costs \$8,000 per hectare, with total budget \$480,000.

Then:

$$
12000w + 8000g = 480000
$$

We now solve

$$
\begin{aligned}
w + g &= 50 \\
12000w + 8000g &= 480000
\end{aligned}
$$

Divide the second equation by 4000 to simplify:

$$
3w + 2g = 120
$$

Use substitution from the first equation:

$$
g = 50 - w
$$

Substitute:

$$
3w + 2(50-w) = 120
$$

$$
3w + 100 - 2w = 120
$$

$$
w = 20
$$

Then

$$
g = 30
$$

So the plan is:

- \(20\) ha wetland
- \(30\) ha grassland

This is already recognizably a planning problem, not a school exercise.

## Three-equation systems

Sometimes you have three variables and three equations. The basic idea is the same: use elimination or substitution step by step.

### Small example

Solve

$$
\begin{aligned}
x + y + z &= 6 \\
x - y + z &= 2 \\
2x + y - z &= 5
\end{aligned}
$$

A good strategy is to eliminate one variable from pairs of equations, reduce the system to two equations in two variables, solve that smaller system, and then substitute back.

You do not need to love the bookkeeping yet. You need to understand the architecture: simplify dimension by dimension.

## Common mistakes

### Mistake 1: solving one equation and forgetting the other
A value is not a solution unless it satisfies **all** equations in the system.

### Mistake 2: arithmetic drift during elimination
When multiplying an equation to align coefficients, multiply every term.

### Mistake 3: losing meaning
In an applied problem, \(x = -14\) litres or \(-3\) hectares may be mathematically possible but physically impossible. Always interpret the answer.

### Mistake 4: not checking
A quick substitution check catches many mistakes. Use it.

## A coaching thought

Students often find systems harder than single equations because they feel like “more algebra.” But conceptually they are often easier. Each equation is just one sentence about the world. The problem only asks you to satisfy all the sentences at once.

That is a modelling mindset.

## Check your understanding

1. Solve
   $$
   \begin{aligned}
   x + y &= 9 \\
   x - y &= 1
   \end{aligned}
   $$
2. Solve by substitution:
   $$
   \begin{aligned}
   y &= 2x + 3 \\
   x + y &= 12
   \end{aligned}
   $$
3. Two products together cost \$40. One costs \$12 more than the other. Set up and solve a system.
4. Explain geometrically what it means if two linear equations have no solution.
5. A mixture problem gives a negative amount for one ingredient. What should you conclude?

## Answer sketches

1. \(x=5, y=4\)
2. \(x=3, y=9\)
3. Let prices be \(x\) and \(y\): \(x+y=40\), \(x-y=12\), so \(x=26, y=14\)
4. The lines are parallel and do not intersect.
5. The mathematical setup or the physical assumptions need inspection; the proposed mixture is not physically feasible.

## Where this goes next

So far the relationships have been linear. The next essay introduces a curve that appears everywhere in modelling: the **parabola**. That means quadratics, where a variable is squared and the geometry becomes richer.
