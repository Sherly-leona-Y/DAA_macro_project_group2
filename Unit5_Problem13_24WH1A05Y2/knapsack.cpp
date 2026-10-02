#include "knapsack.h"
#include <algorithm>
#include <queue>

// Sort items according to profit/weight ratio
bool compareItems(Item a, Item b) {
    double r1 = (double)a.profit / a.weight;
    double r2 = (double)b.profit / b.weight;

    if (r1 == r2)
        return a.id < b.id;

    return r1 > r2;
}

// Calculate the upper bound of a node
double calculateBound(Node u, int n, int capacity,
                      vector<Item>& items) {

    if (u.weight > capacity)
        return 0;

    if (u.weight == capacity)
        return u.profit;

    double bound = u.profit;
    int totalWeight = u.weight;
    int j = u.level + 1;

    while (j < n &&
           totalWeight + items[j].weight <= capacity) {

        totalWeight += items[j].weight;
        bound += items[j].profit;
        j++;
    }

    if (j < n) {
        int remaining = capacity - totalWeight;

        bound += (double)remaining *
                 items[j].profit / items[j].weight;
    }

    return bound;
}

// Main Branch and Bound algorithm
Result solveKnapsack(vector<Item> items, int capacity) {

    int n = items.size();

    sort(items.begin(), items.end(), compareItems);

    Result result;

    result.maxProfit = 0;
    result.totalWeight = 0;
    result.explored = 0;
    result.pruned = 0;

    priority_queue<pair<double, int>> pq;

    // Create root node
    Node root;

    root.id = 0;
    root.parent = -1;
    root.level = -1;
    root.weight = 0;
    root.profit = 0;
    root.bound = 0;
    root.decision = "Root";
    root.status = "Queued";

    root.bound = calculateBound(root, n, capacity, items);

    result.nodes.push_back(root);
    pq.push({root.bound, root.id});

    // Process nodes
    while (!pq.empty()) {

        int nodeIndex = pq.top().second;
        pq.pop();

        Node current = result.nodes[nodeIndex];

        // Prune if this branch cannot improve the solution
        if (current.bound <= result.maxProfit) {

            result.nodes[nodeIndex].status = "Pruned";
            result.pruned++;

            continue;
        }

        result.nodes[nodeIndex].status = "Explored";
        result.explored++;

        int next = current.level + 1;

        if (next >= n)
            continue;

        // ---------------------------------
        // BRANCH 1: INCLUDE NEXT ITEM
        // ---------------------------------

        Node includeNode;

        includeNode.id = result.nodes.size();
        includeNode.parent = current.id;
        includeNode.level = next;

        includeNode.weight =
            current.weight + items[next].weight;

        includeNode.profit =
            current.profit + items[next].profit;

        includeNode.decision =
            "Include Item " + to_string(items[next].id);

        includeNode.selected = current.selected;
        includeNode.selected.push_back(items[next].id);

        includeNode.bound = 0;
        includeNode.status = "Pending";

        if (includeNode.weight <= capacity) {

            // Update best solution
            if (includeNode.profit > result.maxProfit) {

                result.maxProfit = includeNode.profit;
                result.selectedItems = includeNode.selected;
                result.totalWeight = includeNode.weight;
            }

            includeNode.bound = calculateBound(
                includeNode, n, capacity, items
            );

            if (includeNode.bound > result.maxProfit) {
                includeNode.status = "Queued";
            } else {
                includeNode.status = "Best solution";
            }

        } else {

            includeNode.status = "Overweight";
            result.pruned++;
        }

        result.nodes.push_back(includeNode);

        if (includeNode.status == "Queued") {
            pq.push({includeNode.bound, includeNode.id});
        }

        // ---------------------------------
        // BRANCH 2: EXCLUDE NEXT ITEM
        // ---------------------------------

        Node excludeNode;

        excludeNode.id = result.nodes.size();
        excludeNode.parent = current.id;
        excludeNode.level = next;

        excludeNode.weight = current.weight;
        excludeNode.profit = current.profit;

        excludeNode.decision =
            "Exclude Item " + to_string(items[next].id);

        excludeNode.selected = current.selected;

        excludeNode.bound = calculateBound(
            excludeNode, n, capacity, items
        );

        if (excludeNode.bound > result.maxProfit) {
            excludeNode.status = "Queued";
        } else {
            excludeNode.status = "Pruned";
            result.pruned++;
        }

        result.nodes.push_back(excludeNode);

        if (excludeNode.status == "Queued") {
            pq.push({excludeNode.bound, excludeNode.id});
        }
    }

    return result;
}