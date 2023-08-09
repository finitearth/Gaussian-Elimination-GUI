import { UnsolvableMatrixException } from "../exceptions.js";
import { ONE } from "./fraction.js";

/**
 * Perform Gaussian elimination on a system of linear equations represented by coefficient and solution matrices.
 * Throws an UnsolvableMatrixException if the coefficient matrix is not square or its determinant is zero.
 * @param {Matrix} coefMatrix - The matrix representing the coefficients of the system of linear equations.
 * @param {Matrix} solMatrix - The matrix representing the solutions of the system of linear equations.
 * @param {Boolean} coefMatrix - rather to return the coefMatrix
 * @param {Boolean} returnLambda - rather to return the product of the factors used during the gauß elimination. 
 * @returns {Matrix} - The matrix representing the solutions to the system of linear equations after elimination.
 */
export function gaussElimination(
    coefMatrix,
    solMatrix,
    returnCoefMatrix = false,
    returnLambda = false
) {
    let nSols = coefMatrix.getNumberOfSolutions();
    if (nSols === 0) throw new UnsolvableMatrixException();
    if (nSols === -1) throw new UnsolvableMatrixException();
    let lambda = ONE;
    for (let i = 0; i < coefMatrix.nRows; i++) {
        let [pivotIndex, pivotElement] = coefMatrix.getPivot(i);

        // Swap rows so that pivot element is on the diagonal
        coefMatrix = coefMatrix.swapRows(i, pivotIndex);
        solMatrix = solMatrix.swapRows(i, pivotIndex);

        // Scale the row so that the pivot element is 1
        let invPivot = pivotElement.inverse();
        lambda = lambda.mul(invPivot);
        coefMatrix = coefMatrix.multiplyRowByScalar(i, invPivot);
        solMatrix = solMatrix.multiplyRowByScalar(i, invPivot);

        // Use the pivot element to eliminate the variables above and below it
        for (let j = 0; j < coefMatrix.nColumns; j++) {
            if (i === j) continue; // skip
            let factor = coefMatrix.getCell(j, i).mul(-1);
            coefMatrix = coefMatrix.addRow(j, coefMatrix.getRow(i).mul(factor));
            solMatrix = solMatrix.addRow(j, solMatrix.getRow(i).mul(factor));
        }
    }
    if (returnLambda) return lambda;
    if (returnCoefMatrix) return [coefMatrix, solMatrix];
    return solMatrix;
}
