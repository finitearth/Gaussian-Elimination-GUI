import { Table, addKeyDownListener } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { generateMatrix } from "./generateExercise.js";
import { getUnitMatrix } from "./matrix.js";
import { addCombobox, adaptComboboxes } from "./rowoperation.js";
import { addEventListenerCalculation, listenTableDimension } from "./eventlisteners.js";

function createTable(id, initCols, disableInput) {
    let table = new Table(id, false, initCols);
    if (disableInput) {
        table.disableInput();
    }
    document.getElementById(id).appendChild(table.tableContainer);
    return table;
}

// create Tables
let coefTable = createTable("coefTable");
let solTable = createTable("solTable", 1);
let resCoefTable = createTable("resCoefTable", false, true);
let resSolTable = createTable("resSolTable", 1, true);
let tables = [coefTable, solTable, resCoefTable, resSolTable];

// creating initial comboboxes
let rowOperations = [];
for (let i = 0; i < coefTable.nRows; i++) {
    rowOperations = addCombobox("combobox_" + i, rowOperations, coefTable);
}

// calc button
let operation = (coefMatrix, solMatrix) => {
    let outputMatrix = gaussElimination(coefMatrix, solMatrix);
    let unitMatrix = getUnitMatrix(coefMatrix.nRows);
    return [unitMatrix, outputMatrix];
};
addEventListenerCalculation("calculateSolutionButton", [coefTable, solTable], [resCoefTable, resSolTable], operation);

listenTableDimension("nr-eq", tables, rowOperations, "rows"); // number of rows
listenTableDimension("nr-var", [coefTable, resCoefTable], rowOperations, "cols"); // number of cols in coeff matrix
listenTableDimension("nr-b", [solTable, resSolTable], rowOperations, "cols"); // number of cols solution matrix


// generate excercise
let generateExerciseOperation = (coefMatrix, solMatrix) => {
    let nRows = coefMatrix.nRows;
    let newCoefMatrix = generateMatrix(nRows, nRows);
    let newSolMatrix = generateMatrix(nRows, 1);
    return [newCoefMatrix, newSolMatrix];
};
addEventListenerCalculation("generateExercise", [coefTable, solTable], [coefTable, solTable], generateExerciseOperation);

// up button
let moveMatrixOperation = (coefMatrix, ) => {
    return [coefMatrix, solMatrix];
};
addEventListenerCalculation("up", [coefTable, solTable], [resCoefTable, resSolTable], moveMatrixOperation);

// to decimal 
document
    .getElementById("convertToDecimal")
    .addEventListener("click", function () {
        tables.forEach(table => {
            if (this.checked) {
                table.toDecimal();
            } else {
                table.toFraction();
            }
        });
    });

// "Berechne" Button
document.getElementById("calculate").addEventListener("click", function () {
    for (let i = 0; i < rowOperations.length; i++) {
        if (rowOperations[i].enabled) {
            let newCoefMatrix = rowOperations[i].performRowOperation(
                coefTable.getData()
            );
            let newSolMatrix = rowOperations[i].performRowOperation(
                solTable.getData()
            );

            resCoefTable.setRow(i, newCoefMatrix);
            resSolTable.setRow(i, newSolMatrix);
        } else {
            resCoefTable.setRow(i, coefTable.getData());
            resSolTable.setRow(i, solTable.getData());
        }
    }
});

addKeyDownListener(tables, true);
