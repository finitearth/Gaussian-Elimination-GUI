import { Fraction, NEGONE, ZERO } from "./fraction.js";

/**  function for simplex algorithm. follows the following steps:
 * 1. check if lowest negative value is in the last row
 * 2. choose pivotcolumn by taking the most negative value
 * 3. choose pivotrow (the row where b/pivotcolumn is lowest)
 * 4. generate 1 in pivotelement and 0s every where else in pivot column
 * 5. go to 1
 */
export function simplexAlgorithm(coefMatrix, bMatrix) {
    let finished = false;
    let count = 0;
    while (!finished) {
        count += 1;
        if (count > 100) {
            throw new Error("na");
        }
        // check for lowest negative value
        finished = true;
        coefMatrix
            .getRow(coefMatrix.nRows - 1)
            .iterateElements()
            .forEach(([i, j, value]) => {
                if (value.lower(ZERO)) {
                    finished = false;
                }
            });
        if (finished) {
            break;
        }

        // choose pivotcolumn
        let pivotColumn = 0;
        let pivotColumnValue = ZERO;
        coefMatrix
            .getRow(coefMatrix.nRows - 1)
            .iterateElements()
            .forEach(([i, j, value]) => {
                if (value.lower(pivotColumnValue)) {
                    pivotColumn = j;
                    pivotColumnValue = value;
                }
            });

        // choose pivotrow
        let pivotRow = 0;
        let pivotRowValue = new Fraction(999999, 1); // TODO max fracs
        coefMatrix.iterateElements().forEach(([i, j, value]) => {
            if (j !== pivotColumn || i === coefMatrix.nRows - 1) {
                return;
            }
            value = coefMatrix.getCell(i, pivotColumn);
            let bValue = bMatrix.getCell(i, 0);
            if (bValue.div(value).lower(pivotRowValue)) {
                pivotRow = i;
                pivotRowValue = bValue.div(value);
            }
        });
        // generate 1 in pivotelement and 0s every where else in pivot column
        let pivotElement = coefMatrix.getCell(pivotRow, pivotColumn);
        coefMatrix = coefMatrix.multiplyRowByScalar(
            pivotRow,
            pivotElement.inverse()
        );
        bMatrix = bMatrix.multiplyRowByScalar(pivotRow, pivotElement.inverse());

        for (let i = 0; i < coefMatrix.nRows; i++) {
            if (i === pivotRow) {
                continue;
            }

            let value = coefMatrix.getCell(i, pivotColumn).mul(NEGONE);
            coefMatrix = coefMatrix.addRow(
                i,
                coefMatrix.getRow(pivotRow).mul(value)
            );
            bMatrix = bMatrix.addRow(i, bMatrix.getRow(pivotRow).mul(value));
        }
    }
    return [coefMatrix, bMatrix];
}
