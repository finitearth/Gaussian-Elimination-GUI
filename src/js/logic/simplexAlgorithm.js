/**
 * Perform the simplex algorithm on a linear programming problem represented by coefficient and constant matrices.
 * Throws an UnsolvableMatrixException if the coefficient matrix is not in standard form.
 * @param {Matrix} coefMatrix - The matrix representing the coefficients of the linear programming problem in standard form.
 * @param {Matrix} constMatrix - The matrix representing the constants of the linear programming problem.
 * @returns {Matrix} - The matrix representing the optimal solution to the linear programming problem.
 */
export function simplexAlgorithm(coefMatrix, constMatrix) {
    if (!coefMatrix.isInStandardForm()) {
        throw new UnsolvableMatrixException();
    }

    while (coefMatrix.getObjectiveRow().hasNegativeCoefficients()) {
        let pivotColumnIndex = coefMatrix.getObjectiveRow().getMostNegativeCoefficientIndex();
        let pivotRowIndex = coefMatrix.getPivotRowIndex(pivotColumnIndex);
        let pivotElement = coefMatrix.getCell(pivotRowIndex, pivotColumnIndex);

        coefMatrix = coefMatrix.divideRowByScalar(pivotRowIndex, pivotElement);
        constMatrix = constMatrix.divideRowByScalar(pivotRowIndex, pivotElement);

        for (let i = 0; i < coefMatrix.nRows; i++) {
            if (i === pivotRowIndex) {
                continue;
            }
            let factor = coefMatrix.getCell(i, pivotColumnIndex).mul(-1);
            coefMatrix = coefMatrix.addRow(i, coefMatrix.getRow(pivotRowIndex).mul(factor));
            constMatrix = constMatrix.addRow(i, constMatrix.getRow(pivotRowIndex).mul(factor));
        }
    }

    return constMatrix;
}