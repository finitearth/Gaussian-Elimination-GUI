import { Fraction, ZERO } from "./fraction";
import { getEmptyMatrix } from "./matrix";

/**  function for simplex algorithm. follows the following steps:
 * 1. check if lowest negative value is in the last row
 * 2. choose pivotcolumn by taking the most negative value
 * 3. choose pivotrow (the row where b/pivotcolumn is lowest)
 * 4. generate 1 in pivotelement and 0s every where else in pivot column
 * 5. go to 1
 */
export function simplexAlgorithm(
    coefMatrix,
    bMatrix,
    objectiveMatrix,
    objectiveBMatrix
) {
    let cMatrix = getEmptyMatrix(coefMatrix.nRows + 1, coefMatrix.nColumns);
    cMatrix = cMatrix.addRow(objectiveMatrix);
    coefMatrix = coefMatrix.addRow;
    let finished = false;
    while (!finished) {
        // check for lowest negative value
        for ([i, j, value] in coefMatrix.iterateElements()) {
            if (value.greater(ZERO) && (i == coefMatrix.nRows - 1)) {
                finished = true;
                break;
            }
        }

        // choose pivotcolumn
        let pivotColumn = 0;
        let pivotColumnValue = 0;
        for ([i, j, value] in coefMatrix.iterateElements()) {
            if (value.less(pivotColumnValue)) {
                pivotColumn = j;
                pivotColumnValue = value;
            }
        }

        // choose pivotrow
        let pivotRow = new Fraction(9999, 1); // TODO max fracs
        let pivotRowValue = 0;
        for (let i = 0; i < coefMatrix.nRows; i++) {
            let value = coefMatrix.getElement(i, pivotColumn);
            let bValue = bMatrix.getElement(i, 0);
            if (bValue.div(value).less(pivotRowValue)) {
                pivotRow = i;
                pivotRowValue = bValue.div(value);
            }
        }
        
        // generate 1 in pivotelement and 0s every where else in pivot column
        let pivotElement = coefMatrix.getElement(pivotRow, pivotColumn);
        coefMatrix = coefMatrix.multiplyRow(pivotRow, pivotElement.inverse());
        bMatrix = bMatrix.multiplyRow(pivotRow, pivotElement.inverse());

        for (let i = 0; i < coefMatrix.nRows; i++) {
            if (i != pivotRow) {
                let value = coefMatrix.getElement(i, pivotColumn);
                coefMatrix = coefMatrix.addRow(
                    i,
                    coefMatrix.getRow(pivotRow).multiply(value).subtract(
                        coefMatrix.getRow(i)
                    )
                );
                bMatrix = bMatrix.addRow(
                    i,
                    bMatrix.getRow(pivotRow).multiply(value).subtract(
                        bMatrix.getRow(i)
                    )
                );
            }

        }
    }
    return [coefMatrix, bMatrix];
}
