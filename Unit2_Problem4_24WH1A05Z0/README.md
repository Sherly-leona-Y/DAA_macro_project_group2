# Greedy Job Sequencing Flowchart

## Student Details
- Roll Number: 24WH1A05Z0
- Unit: II
- Problem: Greedy Job Sequencing Flowchart

## Objective
To visualize the greedy job sequencing algorithm, where jobs are selected based on their profits and deadlines to maximize total profit.

## Greedy Approach
1. Read jobs with deadlines and profits.
2. Sort jobs in decreasing order of profit.
3. Select the next highest-profit job.
4. Check the latest free slot at or before its deadline.
5. If a slot is available, schedule the job.
6. Otherwise, skip the job.
7. Repeat until all jobs are considered.
8. Calculate the total profit.

## Example

| Job | Deadline | Profit |
|---|---:|---:|
| J1 | 2 | 100 |
| J2 | 1 | 19 |
| J3 | 2 | 27 |
| J4 | 1 | 25 |
| J5 | 3 | 15 |

After sorting by profit:
J1 (100) → J3 (27) → J4 (25) → J2 (19) → J5 (15)

Final schedule: **J3 → J1 → J5**

Maximum profit: **142**

## Complexity
Sorting takes O(n log n). Slot searching takes O(n × d), where d is the maximum deadline. Overall: **O(n log n + n × d)**.

## Files
- `Project4_JobSequencing.cpp` — C++ implementation
- `Prompt.txt` — assigned prompt
- `README.md` — project documentation
- `Visualization.png` — decision-path flowchart
