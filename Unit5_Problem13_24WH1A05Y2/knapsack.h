
#ifndef KNAPSACK_H
#define KNAPSACK_H

#include <iostream>
#include <vector>
#include <string>

using namespace std;

// Stores information about each item
struct Item {
    int weight;
    int profit;
    int id;
};

// Stores information about each search tree node
struct Node {
    int id;
    int parent;
    int level;
    int weight;
    int profit;
    double bound;

    string decision;
    string status;

    vector<int> selected;
};

// Stores the final algorithm result
struct Result {
    int maxProfit;
    int totalWeight;

    vector<int> selectedItems;
    vector<Node> nodes;

    int explored;
    int pruned;
};

// Main Branch and Bound function
Result solveKnapsack(vector<Item> items, int capacity);

#endif