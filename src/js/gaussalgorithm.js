import { UnsolvableMatrixException, DivByZeroException } from "./exceptions.js";

export function gaussElimination(coefMatrix, solMatrix) {
    if (
        coefMatrix.nRows !== coefMatrix.nCols ||
        coefMatrix.getDeterminant() === 0
    ) {
        throw new UnsolvableMatrixException();
    }

    for (let i = 0; i < coefMatrix.nRows; i++) {
        let [pivotIndex, pivotElement] = coefMatrix.getPivot(i);

        // Swap rows so that pivot element is on the diagonal
        coefMatrix = coefMatrix.swapRows(i, pivotIndex);
        solMatrix = solMatrix.swapRows(i, pivotIndex);

        // Scale the row so that the pivot element is 1
        let invPivot = pivotElement.inverse();
        coefMatrix = coefMatrix.multiplyRowByScalar(i, invPivot);
        solMatrix = solMatrix.multiplyRowByScalar(i, invPivot);

        // Use the pivot element to eliminate the variables above and below it
        for (let j = 0; j < coefMatrix.nCols; j++) {
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
