#include <iostream>
#include <algorithm>
using namespace std;

struct Job {
    char id;
    int deadline;
    int profit;
};

bool compare(Job a, Job b) {
    return a.profit > b.profit;
}

int main() {
    Job jobs[] = {
        {'J1', 2, 100},
        {'J2', 1, 19},
        {'J3', 2, 27},
        {'J4', 1, 25},
        {'J5', 3, 15}
    };

    int n = 5;
    sort(jobs, jobs + n, compare);

    int slot[4] = {0};
    int totalProfit = 0;

    for(int i = 0; i < n; i++) {
        for(int j = jobs[i].deadline; j >= 1; j--) {
            if(slot[j] == 0) {
                slot[j] = i + 1;
                totalProfit += jobs[i].profit;
                break;
            }
        }
    }

    cout << "Job Sequence: ";

    for(int i = 1; i <= 3; i++) {
        if(slot[i] != 0)
            cout << jobs[slot[i] - 1].id << " ";
    }

    cout << "\nMaximum Profit: " << totalProfit << endl;

    return 0;
}
