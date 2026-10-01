# 0/1 Knapsack using Dynamic Programming
## Description
This project demonstrates the 0/1 Knapsack problem using Dynamic
Programming. A DP table is constructed to determine the maximum
value that can be obtained for different knapsack capacities.
The problem uses 4 items and a maximum capacity of 10.
### Item Details
| Item | Weight | Value |
|------|--------|-------|
| Item 1 | 2 | 3 |
| Item 2 | 3 | 4 |
| Item 3 | 4 | 5 |
| Item 4 | 5 | 6 |
## Algorithm
1. Initialize a DP table with rows representing items and columns
   representing capacities from 0 to 10.
2. Set the first row to 0 because no items are available.
3. For each item and each capacity:
   - If the item's weight is greater than the current capacity,
     the item cannot be included.
   - Otherwise, calculate two choices:
     - Exclude the current item.
     - Include the current item and add its value to the best
       value for the remaining capacity.
4. Store the maximum of these two choices in the DP table.
5. The final cell gives the maximum possible value.
### Recurrence
If the item fits:
DP[i][w] = max(DP[i-1][w],
               value[i] + DP[i-1][w-weight[i]])
If the item does not fit:
DP[i][w] = DP[i-1][w]
## Pseudocode
```text
Knapsack(weights, values, capacity):
    n = number of items
    Create DP table of size (n+1) × (capacity+1)
    Initialize all entries to 0
    for i = 1 to n:
        for w = 1 to capacity:
            if weights[i-1] <= w:
                exclude = DP[i-1][w]
                include = values[i-1] +
                          DP[i-1][w - weights[i-1]]
                DP[i][w] = max(exclude, include)
            else:
                DP[i][w] = DP[i-1][w]
    return DP
