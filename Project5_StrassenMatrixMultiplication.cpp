#include <iostream>
#include <vector>
using namespace std;

using Matrix = vector<vector<long long>>;

Matrix addMatrix(const Matrix& A, const Matrix& B) {
    int n = A.size();
    Matrix C(n, vector<long long>(n));
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            C[i][j] = A[i][j] + B[i][j];
    return C;
}

Matrix subMatrix(const Matrix& A, const Matrix& B) {
    int n = A.size();
    Matrix C(n, vector<long long>(n));
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            C[i][j] = A[i][j] - B[i][j];
    return C;
}

Matrix standardMultiply(const Matrix& A, const Matrix& B) {
    int n = A.size();
    Matrix C(n, vector<long long>(n, 0));
    for (int i = 0; i < n; ++i)
        for (int k = 0; k < n; ++k)
            for (int j = 0; j < n; ++j)
                C[i][j] += A[i][k] * B[k][j];
    return C;
}

void splitMatrix(const Matrix& A, Matrix& A11, Matrix& A12,
                 Matrix& A21, Matrix& A22) {
    int n = A.size();
    int k = n / 2;

    A11.assign(k, vector<long long>(k));
    A12.assign(k, vector<long long>(k));
    A21.assign(k, vector<long long>(k));
    A22.assign(k, vector<long long>(k));

    for (int i = 0; i < k; ++i) {
        for (int j = 0; j < k; ++j) {
            A11[i][j] = A[i][j];
            A12[i][j] = A[i][j + k];
            A21[i][j] = A[i + k][j];
            A22[i][j] = A[i + k][j + k];
        }
    }
}

Matrix joinMatrix(const Matrix& C11, const Matrix& C12,
                  const Matrix& C21, const Matrix& C22) {
    int k = C11.size();
    int n = 2 * k;
    Matrix C(n, vector<long long>(n));

    for (int i = 0; i < k; ++i) {
        for (int j = 0; j < k; ++j) {
            C[i][j] = C11[i][j];
            C[i][j + k] = C12[i][j];
            C[i + k][j] = C21[i][j];
            C[i + k][j + k] = C22[i][j];
        }
    }
    return C;
}

// Strassen's algorithm recursively divides matrices into four submatrices
// and performs seven recursive multiplications instead of eight.
Matrix strassenMultiply(const Matrix& A, const Matrix& B) {
    int n = A.size();

    if (n <= 2)
        return standardMultiply(A, B);

    Matrix A11, A12, A21, A22;
    Matrix B11, B12, B21, B22;

    splitMatrix(A, A11, A12, A21, A22);
    splitMatrix(B, B11, B12, B21, B22);

    // Seven Strassen products.
    Matrix M1 = strassenMultiply(addMatrix(A11, A22),
                                 addMatrix(B11, B22));

    Matrix M2 = strassenMultiply(addMatrix(A21, A22), B11);

    Matrix M3 = strassenMultiply(A11,
                                 subMatrix(B12, B22));

    Matrix M4 = strassenMultiply(A22,
                                 subMatrix(B21, B11));

    Matrix M5 = strassenMultiply(addMatrix(A11, A12), B22);

    Matrix M6 = strassenMultiply(subMatrix(A21, A11),
                                 addMatrix(B11, B12));

    Matrix M7 = strassenMultiply(subMatrix(A12, A22),
                                 addMatrix(B21, B22));

    Matrix C11 = addMatrix(subMatrix(addMatrix(M1, M4), M5), M7);
    Matrix C12 = addMatrix(M3, M5);
    Matrix C21 = addMatrix(M2, M4);
    Matrix C22 = addMatrix(subMatrix(addMatrix(M1, M3), M2), M6);

    return joinMatrix(C11, C12, C21, C22);
}

void printMatrix(const Matrix& A) {
    for (const auto& row : A) {
        for (long long x : row)
            cout << x << '\t';
        cout << '\n';
    }
}

int main() {
    int n;
    cout << "Enter matrix size (power of 2): ";
    cin >> n;

    if (n <= 0 || (n & (n - 1)) != 0) {
        cout << "Matrix size must be a positive power of 2.\n";
        return 0;
    }

    Matrix A(n, vector<long long>(n));
    Matrix B(n, vector<long long>(n));

    cout << "Enter Matrix A:\n";
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            cin >> A[i][j];

    cout << "Enter Matrix B:\n";
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            cin >> B[i][j];

    Matrix C = strassenMultiply(A, B);

    cout << "\nProduct Matrix using Strassen's Algorithm:\n";
    printMatrix(C);

    return 0;
}
