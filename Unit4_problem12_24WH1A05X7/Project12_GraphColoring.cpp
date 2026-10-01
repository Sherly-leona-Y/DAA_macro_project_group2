#include <iostream>
using namespace std;

#define V 4
#define C 3

int graph[V][V] = {
    {0,1,1,0},
    {1,0,1,1},
    {1,1,0,1},
    {0,1,1,0}
};

int color[V];

bool isSafe(int vertex, int c) {
    for(int i = 0; i < V; i++)
        if(graph[vertex][i] && color[i] == c)
            return false;
    return true;
}

bool graphColoring(int vertex) {
    if(vertex == V)
        return true;

    for(int c = 1; c <= C; c++) {
        if(isSafe(vertex, c)) {
            color[vertex] = c;

            if(graphColoring(vertex + 1))
                return true;

            color[vertex] = 0;
        }
    }
    return false;
}

int main() {
    if(graphColoring(0)) {
        cout << "Graph Coloring Solution:\n";
        for(int i = 0; i < V; i++)
            cout << "V" << i + 1 << " = Color " << color[i] << endl;
    } else {
        cout << "No solution exists.";
    }

    return 0;
}