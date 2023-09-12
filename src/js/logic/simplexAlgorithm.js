import { Fraction, NEGONE, ZERO } from "./fraction.js";

/**
 * Solves a linear programming problem using the Simplex Algorithm.
 * The function iteratively performs operations on the coefficient and b matrices
 * to find an optimal solution. The algorithm follows these steps:
 * 1. Check for the lowest negative value in the last row.
 * 2. Choose the pivot column based on the most negative value.
 * 3. Choose the pivot row based on a specific criterion (lowest b/pivot column).
 * 4. Generate a 1 in the pivot element and zeros everywhere else in the pivot column.
 * 5. Repeat from step 1.
 *
 * @param {Matrix} coefMatrix - The coefficient matrix in the linear programming problem.
 * @param {Matrix} bMatrix - The 'b' matrix containing the constants.
 * @returns {Array<Matrix>} - The optimized coefficient and b matrices.
 * @throws Will throw an error if the algorithm doesn't converge within 100 iterations.
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
