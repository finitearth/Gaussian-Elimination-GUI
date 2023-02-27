import { getUnitMatrix, ZERO } from "./utils.js";
import { Matrix } from "./matrix.js";
import { Fraction } from "./fraction.js";

// const levelSettings = [
//     {
//         dimension: 3,
//         nOperations: 4,
//     },
//     {
//         dimension: 4,
//         nOperations: 6,
//     },
//     {
//         dimension: 5,
//         nOperations: 8,
//     },
// ];
let matrix; 
export function generateMatrix(rows, cols) {
    let linearDependent = true;
    while (linearDependent) {
        matrix = getRandomMatrix(rows, cols);
        linearDependent = matrix.hasLinearDependencies();
    }
    return matrix;
}

function getRandomMatrix(rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push([]);
        for (let j = 0; j < cols; j++) {
            matrix[i].push(
                new Fraction(Math.floor(Math.random() * 10), 4).reduce()
            );
        }
    }
    return new Matrix(matrix);
}

// export function generateMatrix(difficultyLevel) {
//     let dimension = levelSettings[difficultyLevel].dimension;
//     let nOperations = levelSettings[difficultyLevel].nOperations;

//     let matrix = getUnitMatrix(dimension);
//     for (let i = 0; i < nOperations; i++) {
//         try {
//             matrix = randomOperation(matrix);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return matrix;
// }

// const operations = [
//     (matrix, scalar) => {
//         return matrix.mul(scalar);
//     },
//     (matrix, scalar) => {
//         return matrix.swapRows((scalar + 1) % matrix.nRows, scalar);
//     },
//     (matrix, scalar) => {
//         return matrix.multiplyRowByScalar((scalar + 1) % matrix.nRows, scalar);
//     },
//     (matrix, scalar) => {
//         return matrix.addRow(
//             scalar,
//             matrix.getRow((scalar + 1) % matrix.nRows)
//         );
//     },
//     (matrix, scalar) => {

// ];

// function randomOperation(matrix) {
//     let operationIdx = Math.floor(Math.random() * operations.length);
//     let scalar = Math.floor(Math.random() * matrix.nRows - 1) + 1;
//     let operation = operations[operationIdx];
//     matrix = operation(matrix, scalar);

//     return matrix;
// }

// function generateRandomMatrix()
