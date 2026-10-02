# Divide-and-Conquer Matrix Multiplication — Strassen's Algorithm

## 1. Project Title
**Illustrate Recursive Division of Matrices in Strassen's Algorithm**

## 2. Objective
To demonstrate how Strassen's matrix multiplication algorithm uses the divide-and-conquer technique. The matrices are recursively divided into smaller submatrices, seven recursive multiplications are performed, and the results are combined to obtain the final product.

## 3. Algorithm Idea
For two matrices A and B:

A = [[A11, A12],
     [A21, A22]]

B = [[B11, B12],
     [B21, B22]]

Instead of performing eight recursive multiplications, Strassen's algorithm uses seven:

M1 = (A11 + A22)(B11 + B22)
M2 = (A21 + A22)B11
M3 = A11(B12 - B22)
M4 = A22(B21 - B11)
M5 = (A11 + A12)B22
M6 = (A21 - A11)(B11 + B12)
M7 = (A12 - A22)(B21 + B22)

The four result blocks are:

C11 = M1 + M4 - M5 + M7
C12 = M3 + M5
C21 = M2 + M4
C22 = M1 - M2 + M3 + M6

## 4. Divide-and-Conquer Steps
1. Divide each input matrix into four equal-sized blocks.
2. Form the seven Strassen products.
3. Recursively multiply the smaller matrices.
4. Combine the seven products to calculate C11, C12, C21, and C22.
5. Join the four result blocks to obtain the final matrix C.
6. For very small matrices, the program uses ordinary multiplication as the base case.

## 5. Complexity
- Standard matrix multiplication: O(n^3)
- Strassen's algorithm: approximately O(n^2.807)
- The improvement comes from reducing the number of recursive multiplications from 8 to 7.

## 6. Files
- `Project5_StrassenMatrixMultiplication.cpp` — C++ implementation.
- `Prompt.txt` — prompt used to describe the required visualization.
- `README.md` — project explanation and algorithm details.
- `Visualization.png` — block diagram of recursive division and Strassen operations.

## 7. Compilation
Use a C++ compiler such as g++:

    g++ Project5_StrassenMatrixMultiplication.cpp -o strassen

Run:

    ./strassen

The program accepts square matrices whose size is a positive power of 2.

## 8. Example Input
For a 2 × 2 example:

    2
    1 2
    3 4
    5 6
    7 8

Expected output:

    19 22
    43 50

## 9. Conclusion
Strassen's algorithm is an important divide-and-conquer technique for matrix multiplication. By replacing eight recursive matrix multiplications with seven, it improves the asymptotic running time for sufficiently large matrices.
