def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0 for _ in range(capacity + 1)]
          for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i - 1] <= w:
                exclude = dp[i - 1][w]
                include = values[i - 1] + dp[i - 1][w - weights[i - 1]]
                dp[i][w] = max(exclude, include)
            else:
                dp[i][w] = dp[i - 1][w]
    return dp
weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 10
dp = knapsack(weights, values, capacity)
print("0/1 Knapsack DP Table")
print("-" * 60)
print("Capacity:", end=" ")
for w in range(capacity + 1):
    print(w, end="\t")
print()
for i in range(len(dp)):
    print(f"Item {i}", end="\t")
    for value in dp[i]:
        print(value, end="\t")
    print()
print("\nMaximum Value:", dp[len(weights)][capacity])