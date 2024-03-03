import { Matrix } from "./matrix.js";
import { Fraction } from "./fraction.js";

/**
 * Generates and exports a random matrix with the specified number of rows and columns.
 *
 * @param {number} rows - The number of rows the generated matrix should have.
 * @param {number} cols - The number of columns the generated matrix should have.
 * @returns {Matrix} The generated random matrix.
 */
export function generateMatrix(rows, cols) {
    let matrix = getRandomMatrix(rows, cols);
    return matrix;
}

/**
 * Creates a random matrix with the specified number of rows and columns.
 * The elements of the matrix are fractions with random numerators between 0 and 9 and a denominator of 4.
 *
 * @param {number} rows - The number of rows the random matrix should have.
 * @param {number} cols - The number of columns the random matrix should have.
 * @returns {Matrix} The generated random matrix.
 */
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
