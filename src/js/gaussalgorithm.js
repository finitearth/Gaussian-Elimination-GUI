import { Fraction } from "./fraction.js";
import { Matrix } from "./matrix.js";

export function gaussElimination(coefMatrix, solMatrix) {
        for (let i = 0; i < coefMatrix.nRows; i++) {
            let [pivotIndex, pivotElement] = coefMatrix.getPivot(i);

            // Swap rows so that pivot element is on the diagonal
            coefMatrix = coefMatrix.swapRows(i, pivotIndex);
            matrixB = matrixB.swapRows(i, pivotIndex);

            // Scale the row so that the pivot element is 1
            coefMatrix = coefMatrix.multiplyRowByScalar(i, pivotElement.inverse());
            solMatrix = solMatrix.multiplyRowByScalar(i, pivotElement.inverse());

            // Use the pivot element to eliminate the variables above and below it
            for (let j = 0; j < coefMatrix.nRows; j++) {
                if (i === j) {
                    continue;
                }
                let factor = coefMatrix.array[j][i].mul(-1);
                coefMatrix = coefMatrix.addRow(j, coefMatrix.getRow(i).mul(factor));
                solMatrix = solMatrix.addRow(j, solMatrix.getRow(i).mul(factor));
            }
        }

        return solMatrix;
    }
// better naming than matrixA and matrixB would be
// matrixCoefficients and matrixConstants, but are those constants?
//

let matrix = [
    [new Fraction(2, 1), new Fraction(1, 1), new Fraction(-1, 1)],
    [new Fraction(-1, 1), new Fraction(2, 1), new Fraction(-11, 1)],
    [new Fraction(-2, 1), new Fraction(1, 1), new Fraction(2, 1)],
];
let matrixB = [
    [new Fraction(8, 1)],
    [new Fraction(-11, 1)],
    [new Fraction(-3, 1)],
];
matrix = new Matrix(matrix);
matrixB = new Matrix(matrixB);

let solution = gaussElimination(matrix, matrixB);
console.log(solution.stringify(false)); // [2, 3, -1]

// console.log(solve([[new Fraction(1,1),new Fraction(2,1),new Fraction(3,1)], [new Fraction(4,1),new Fraction(5,1),new Fraction(6,1)], [new Fraction(7,1),new Fraction(8,1),new Fraction(9,1)]], 0));
