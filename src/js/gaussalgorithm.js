import { Fraction } from "./fraction.js";
import { Matrix } from "./matrix.js";

function gaussElimination(matrix) {
    for (let i = 0; i < matrix.nRows; i++) {
        let [pivotIndex, pivotElement] = matrix.getPivot(i);
        matrix = matrix.swapRows(i, pivotIndex);
        matrix = matrix.multiplyRowByScalar(i, pivotElement.inverse());

        // Eliminate the variables above and below the pivot
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let factor = matrix.array[j][i].mul(-1);
                matrix = matrix.addRow(j, matrix.getRow(i).mul(factor));
            }
        }
    }

    return matrix;
}

// Example usage:
// let matrix = [[2, 1, -1, 8], [-3, -1, 2, -11], [-2, 1, 2, -3]];
let matrix = [
    [new Fraction(2, 1), new Fraction(1, 1), new Fraction(-1, 1)],
    [new Fraction(-1, 1), new Fraction(2, 1), new Fraction(-11, 1)],
    [new Fraction(-2, 1), new Fraction(1, 1), new Fraction(2, 1)],
];
matrix = new Matrix(matrix);
let solution = gaussElimination(matrix);
console.log(solution.stringify()); // [2, 3, -1]

// console.log(solve([[new Fraction(1,1),new Fraction(2,1),new Fraction(3,1)], [new Fraction(4,1),new Fraction(5,1),new Fraction(6,1)], [new Fraction(7,1),new Fraction(8,1),new Fraction(9,1)]], 0));
