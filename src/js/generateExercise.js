import { Matrix } from "./matrix.js";
import { Fraction } from "./fraction.js";


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
