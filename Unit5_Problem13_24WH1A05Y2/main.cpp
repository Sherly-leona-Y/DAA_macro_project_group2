#include "knapsack.h"
#include <iostream>
#include <fstream>
#include <iomanip>
#include <vector>

using namespace std;

int main() {

    // Sample items
    vector<Item> items = {
        {2, 40, 1},
        {3, 50, 2},
        {4, 60, 3},
        {5, 70, 4},
        {6, 80, 5}
    };

    int capacity = 10;

    // Run Branch and Bound
    Result result = solveKnapsack(items, capacity);

    // Create JavaScript data file
    ofstream file("web/js/tree_data.js");

    if (!file) {
        cout << "Could not create tree_data.js\n";
        return 1;
    }

    file << "window.knapsackData = {\n";

    file << "\"capacity\": " << capacity << ",\n";
    file << "\"maxProfit\": " << result.maxProfit << ",\n";
    file << "\"totalWeight\": " << result.totalWeight << ",\n";
    file << "\"explored\": " << result.explored << ",\n";
    file << "\"pruned\": " << result.pruned << ",\n";

    file << "\"selectedItems\": [";

    for (int i = 0; i < result.selectedItems.size(); i++) {
        file << result.selectedItems[i];

        if (i + 1 < result.selectedItems.size())
            file << ", ";
    }

    file << "],\n";

    file << "\"nodes\": [\n";

    for (int i = 0; i < result.nodes.size(); i++) {

        Node node = result.nodes[i];

        file << "{";

        file << "\"id\": " << node.id << ",";
        file << "\"parent\": " << node.parent << ",";
        file << "\"level\": " << node.level << ",";
        file << "\"weight\": " << node.weight << ",";
        file << "\"profit\": " << node.profit << ",";
        file << "\"bound\": " << fixed << setprecision(2)
             << node.bound << ",";

        file << "\"name\": \"" << node.decision << "\",";
        file << "\"status\": \"" << node.status << "\"";

        file << "}";

        if (i + 1 < result.nodes.size())
            file << ",";

        file << "\n";
    }

    file << "]\n";
    file << "};\n";

    file.close();

    // Display result in terminal
    cout << "\n----- KNAPSACK RESULT -----\n";

    cout << "Maximum Profit: "
         << result.maxProfit << "\n";

    cout << "Total Weight: "
         << result.totalWeight << "\n";

    cout << "Nodes Explored: "
         << result.explored << "\n";

    cout << "Branches Pruned: "
         << result.pruned << "\n";

    cout << "\nSelected Items: ";

    for (int id : result.selectedItems) {
        cout << id << " ";
    }

    cout << "\n\nTree data exported successfully!\n";

    return 0;
}