# Design and Analysis of Algorithms – Macro Project

<p align="center">
  <strong>DAA Macro Project | Group 2</strong>
  <br>
  Algorithm Design, Implementation and Visualization
</p>

## About the Repository

This repository contains six projects developed as part of the Design and Analysis of Algorithms (DAA) coursework.

Each project focuses on a different algorithmic problem and demonstrates the practical application of algorithm design techniques such as Divide and Conquer, Greedy Method, Dynamic Programming, Backtracking, and Branch and Bound.

The projects combine algorithm implementation with visual representations to make the underlying problem-solving approaches easier to understand.

## Projects Overview

### 1. Merge Sort – Recursion Tree Visualization

**Technique:** Divide and Conquer

This project demonstrates the recursive working of the Merge Sort algorithm through a visual recursion tree. It illustrates how an input array is repeatedly divided into smaller subarrays until individual elements are reached, followed by the merging of sorted subarrays to produce the final sorted array.

**Key Concepts:**

* Recursive division of arrays.
* Merging sorted subarrays.
* Recursion tree representation.
* Time and space complexity analysis.

**Technologies:** HTML, CSS, JavaScript.

### 2. Greedy Job Sequencing

**Technique:** Greedy Method

This project implements the Job Sequencing with Deadlines problem to maximize the total profit by scheduling jobs within their respective deadlines. Jobs are arranged in descending order of profit, and each job is assigned to an available time slot before its deadline.

**Key Concepts:**

* Greedy selection strategy.
* Profit-based job sorting.
* Deadline and slot management.
* Maximum profit calculation.

**Technology:** C++.

### 3. Strassen's Matrix Multiplication

**Technique:** Divide and Conquer

This project illustrates Strassen's matrix multiplication algorithm, which reduces the number of recursive matrix multiplications from eight to seven. It demonstrates how matrices are divided into smaller submatrices, processed through seven intermediate products, and combined to obtain the final matrix product.

**Key Concepts:**

* Recursive matrix division.
* Seven Strassen multiplication operations.
* Combining submatrices.
* Comparison with conventional matrix multiplication.

**Technology:** C++.

### 4. 0/1 Knapsack Using Dynamic Programming

**Technique:** Dynamic Programming

This project solves the 0/1 Knapsack problem using a dynamic programming approach. A two-dimensional DP table is constructed to determine the maximum value achievable for different capacities. For each item, the algorithm considers both inclusion and exclusion and stores the optimal result for each subproblem.

**Key Concepts:**

* Optimal substructure.
* Overlapping subproblems.
* Tabulation and recurrence relations.
* Item inclusion and exclusion.
* DP table construction.

**Technology:** Python.

### 5. Graph Coloring

**Technique:** Backtracking

This project demonstrates the Graph Coloring problem using a backtracking approach. The objective is to assign colors to graph vertices such that no two adjacent vertices share the same color, while using a limited number of available colors.

The algorithm assigns colors to vertices one at a time, checks whether each assignment is valid, and backtracks whenever a conflict occurs.

**Key Concepts:**

* Graph representation using adjacency matrices.
* Vertex coloring.
* Constraint checking.
* Recursive backtracking.
* Valid color assignment.

**Technology:** C++.

### 6. 0/1 Knapsack Using Branch and Bound

**Technique:** Branch and Bound

This project implements the 0/1 Knapsack problem using the Branch and Bound optimization technique. It explores possible item selections by generating inclusion and exclusion branches. Upper-bound calculations based on the fractional knapsack approach help identify unpromising branches that can be pruned.

An interactive web-based visualization represents the generated decision tree and displays the algorithm's results.

**Key Concepts:**

* Best-first search.
* Branch generation.
* Upper-bound calculation.
* Fractional knapsack bounding.
* Pruning unpromising branches.
* Decision tree visualization.

**Technologies:** C++, HTML, CSS, JavaScript, D3.js.

## Algorithms and Techniques Covered

| Algorithmic Technique | Projects                                     |
| --------------------- | -------------------------------------------- |
| Divide and Conquer    | Merge Sort, Strassen's Matrix Multiplication |
| Greedy Method         | Job Sequencing                               |
| Dynamic Programming   | 0/1 Knapsack                                 |
| Backtracking          | Graph Coloring                               |
| Branch and Bound      | 0/1 Knapsack                                 |

## Repository Structure

```text
DAA_macro_project_group2/
│
├── Unit1_Project2_24WH1A05X1/
│   └── Merge Sort Visualization
│
├── Unit2_Problem4_24WH1A05Z0/
│   └── Job Sequencing
│
├── Unit2_Problem5_24WH1A05X4/
│   └── Strassen's Matrix Multiplication
│
├── Unit3_Problem9_24WH1A05X5/
│   └── Knapsack using Dynamic Programming
│
├── Unit4_problem12_24WH1A05X7/
│   └── Graph Coloring
│
└── Unit5_Problem13_24WH1A05Y2/
    └── Knapsack using Branch and Bound
```

## Learning Outcomes

Through these projects, we explore:

* Different algorithm design paradigms and their applications.
* Recursive problem-solving and optimization techniques.
* Time and space complexity analysis.
* Practical implementation of theoretical algorithms.
* Visualization of algorithm execution and decision-making.
* Collaborative development and version control using Git and GitHub.

## Contributors

**DAA Macro Project – Group 2**

Developed as part of the Bachelor of Technology (B.Tech) Computer Science and Engineering curriculum.

---

<p align="center">
  <strong>Understanding Algorithms Through Implementation and Visualization</strong>
</p>
