import { UnsolvableMatrixException } from "../exceptions.js";
import { Matrix, getEmptyMatrix } from "../logic/matrix.js";
import { ZERO, Fraction, NEGONE, ONE } from "./fraction.js";

export function simplexAlgorithm(coefMatrix, constMatrix) {
    if (!isStandardForm(coefMatrix)) {
        throw new UnsolvableMatrixException(
            "Coefficient matrix is not in standard form."
        );
    }
    let tableau = augment(coefMatrix, constMatrix);
    let pivotColumn = findPivotColumn(tableau);
    let count = 0;
    while (!isOptimal(tableau)) {
        count += 1;
        if (count > 100) {
            throw new Error(
                "Too many iterations. The problem might be unbounded."
            );
        }
        pivotColumn = findPivotColumn(tableau);
        if (pivotColumn === -1) {
            break; // The solution is optimal
        }
        let pivotRow = findPivotRow(tableau, pivotColumn);
        if (pivotRow === -1) {
            throw new Error(
                "No valid pivot row. The problem might be unbounded."
            );
        }
        tableau = pivot(tableau, pivotRow, pivotColumn);
        checkNonNegativity(tableau);
    }

    return extractSolution(tableau);
}

// TODO: allow for other boundaries

function checkNonNegativity(tableau) {
    let nVars = tableau.nColumns - 1;
    for (let j = 0; j < nVars; j++) {
        for (let i = 0; i < tableau.nRows; i++) {
            let cellVal = tableau.getCell(i, j);
            if (ZERO.greater(cellVal)) {
                throw new Error(`Variable at column ${j} became negative.`);
            }
        }
    }
}

function isStandardForm(matrix) {
    for (let i = 0; i < matrix.nRows; i++) {
        if (matrix.getCell(i, 0) < 0) return false;
    }
    return true;
}

function augment(coefMatrix, constMatrix) {
    let result = getEmptyMatrix(coefMatrix.nRows, coefMatrix.nColumns + 1);
    for (let i = 0; i < coefMatrix.nRows; i++) {
        for (let j = 0; j < coefMatrix.nColumns; j++) {
            result = result.setCell(i, j, coefMatrix.getCell(i, j));
        }
        result = result.setCell(
            i,
            coefMatrix.nColumns,
            constMatrix.getCell(i, 0)
        );
    }

    return result;
}

function isOptimal(tableau) {
    for (let j = 0; j < tableau.nColumns - 1; j++) {
        if (ZERO.greater(tableau.getCell(tableau.nRows - 1, j))) {
            return false;
        }
    }
    return true;
}

function findPivotColumn(tableau) {
    let minVal = new Fraction(Number.MAX_VALUE, 1);
    let minIndex = -1;
    for (let j = 0; j < tableau.nColumns - 1; j++) {
        if (minVal.greater(tableau.getCell(tableau.nRows - 1, j))) {
            minVal = tableau.getCell(tableau.nRows - 1, j);
            minIndex = j;
        }
    }
    return minIndex;
}

function findPivotRow(tableau, pivotColumn) {
    let minRatio = new Fraction(Number.MAX_VALUE, 1);
    let minIndex = -1;
    for (let i = 0; i < tableau.nRows - 1; i++) {
        let cellVal = tableau.getCell(i, pivotColumn);
        if (cellVal.greater(ZERO)) {
            let ratio = tableau.getCell(i, tableau.nColumns - 1).div(cellVal);
            if (minRatio.greater(ratio)) {
                minRatio = ratio;
                minIndex = i;
            }
        }
    }
    return minIndex;
}

function pivot(tableau, pivotRow, pivotColumn) {
    let result = tableau.clone();
    let pivotVal = tableau.getCell(pivotRow, pivotColumn);

    if (pivotVal.equals(ZERO)) {
        throw new Error("Invalid pivot value of 0.");
    }

    let normalizedPivotRow = tableau.getRow(pivotRow).mul(pivotVal.inverse());
    result = result.setRow(pivotRow, normalizedPivotRow);

    for (let i = 0; i < tableau.nRows; i++) {
        if (i !== pivotRow) {
            let factor = tableau.getCell(i, pivotColumn);
            let newRow = tableau
                .getRow(i)
                .subtract(normalizedPivotRow.mul(factor));
            result = result.setRow(i, newRow);
        }
    }

    return result;
}

function extractSolution(tableau) {
    let result = getEmptyMatrix(tableau.nRows - 1, 1);
    for (let i = 0; i < tableau.nRows - 1; i++) {
        result = result.setCell(i, 0, tableau.getCell(i, tableau.nColumns - 1));
    }
    return result;
}
