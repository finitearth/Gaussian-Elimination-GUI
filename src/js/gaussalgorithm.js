export function gaussElimination(coefMatrix, solMatrix) {
    for (let i = 0; i < coefMatrix.nRows; i++) {
        let [pivotIndex, pivotElement] = coefMatrix.getPivot(i);

        // Swap rows so that pivot element is on the diagonal
        coefMatrix = coefMatrix.swapRows(i, pivotIndex);
        solMatrix = solMatrix.swapRows(i, pivotIndex);

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
