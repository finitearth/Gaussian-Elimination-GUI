import { Matrix } from "./matrix.js";
import { Fraction } from "./fraction.js";

let matrix;
export function generateMatrix(rows, cols) {
    matrix = getRandomMatrix(rows, cols);
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
