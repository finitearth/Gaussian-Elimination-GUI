import { UnsolvableMatrixException, DivByZeroException } from "./exceptions.js";

export function gaussElimination(coefMatrix, solMatrix) {
    // check for rows = cols in coefmatrix
    if (coefMatrix.nRows !== coefMatrix.nCols) {
        throw new UnsolvableMatrixException();
    }
    let invPivot;
    for (let i = 0; i < coefMatrix.nRows; i++) {
        let [pivotIndex, pivotElement] = coefMatrix.getPivot(i);

        // Swap rows so that pivot element is on the diagonal
        coefMatrix = coefMatrix.swapRows(i, pivotIndex);
        solMatrix = solMatrix.swapRows(i, pivotIndex);

        try {
            // Scale the row so that the pivot element is 1
            invPivot = pivotElement.inverse();
        } catch (e) {
            if (e instanceof DivByZeroException) {
                // Matrix is singular
                throw new UnsolvableMatrixException();
            } else {
                throw e;
            }
        }
        coefMatrix = coefMatrix.multiplyRowByScalar(i, invPivot);
        solMatrix = solMatrix.multiplyRowByScalar(i, invPivot);

        // Use the pivot element to eliminate the variables above and below it
        for (let j = 0; j < coefMatrix.nRows; j++) {
            if (i === j) {
                continue; // skip
            }
            let factor = coefMatrix.getCell(j, i).mul(-1);
            coefMatrix = coefMatrix.addRow(j, coefMatrix.getRow(i).mul(factor));
            solMatrix = solMatrix.addRow(j, solMatrix.getRow(i).mul(factor));
        }
    }

    return solMatrix;
}
