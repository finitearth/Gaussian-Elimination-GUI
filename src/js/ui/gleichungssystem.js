import { gaussElimination } from "../logic/gaussalgorithm.js";
import { generateMatrix } from "../logic/generateExercise.js";
import { getUnitMatrix } from "../logic/matrix.js";
import { Table, addKeyDownListener } from "../intermediate/table.js";
import { addCombobox } from "../intermediate/rowoperation.js";
import {
    setEventListenerFunction,
    listenTableDimension,
} from "../intermediate/eventlisteners.js";

function createTable(id, disableInput, initCols = 3, desCharacter) {
    let table = new Table(id, false, initCols, desCharacter);
    if (disableInput) {
        table.disableInput();
    }
    document.getElementById(id).appendChild(table.tableContainer);
    return table;
}

// create Tables
let coefTable = createTable("table-coef", false, 3, "x");
let solTable = createTable("table-sol", false, 1, "b");
let resCoefTable = createTable("table-res-coef", true, 3, "x");
let resSolTable = createTable("table-res-sol", true, 1, "b");
let tables = [coefTable, solTable, resCoefTable, resSolTable];

// creating initial comboboxes
let rowOperations = [];
for (let i = 0; i < coefTable.nRows; i++) {
    rowOperations = addCombobox("combobox_" + i, rowOperations, coefTable);
}

// solve button
setEventListenerFunction(
    "button-solve",
    [coefTable, solTable],
    [resCoefTable, resSolTable],
    (coefMatrix, solMatrix) => {
        let outputMatrix = gaussElimination(coefMatrix, solMatrix);
        let unitMatrix = getUnitMatrix(coefMatrix.nRows);
        return [unitMatrix, outputMatrix];
    }
);

listenTableDimension("input-nr-eq", tables, rowOperations, "rows"); // number of rows
listenTableDimension(
    "input-nr-var",
    [coefTable, resCoefTable],
    rowOperations,
    "cols"
); // number of cols in coeff matrix
listenTableDimension(
    "input-nr-b",
    [solTable, resSolTable],
    rowOperations,
    "cols",
    true
); // number of cols solution matrix

// generate excercise
setEventListenerFunction(
    "button-generate-excercise",
    [coefTable, solTable],
    [coefTable, solTable],
    (coefMatrix, solMatrix) => {
        let nRows = coefMatrix.nRows;
        let newCoefMatrix = generateMatrix(nRows, nRows);
        let newSolMatrix = generateMatrix(nRows, 1);
        return [newCoefMatrix, newSolMatrix];
    }
);

// up button
setEventListenerFunction(
    "button-adapt-result",
    [coefTable, solTable],
    [resCoefTable, resSolTable],
    coefMatrix => {
        return [coefMatrix, solMatrix];
    }
);

// to decimal
document
    .getElementById("button-representation-conversion")
    .addEventListener("click", function () {
        tables.forEach(table => {
            table.convertRepresentation(this.checked);
        });
    });

// "Berechne" Button
document
    .getElementById("button-calculate")
    .addEventListener("click", function () {
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

coefTable.addDescription();
solTable.addDescription();
resCoefTable.addDescription();
resSolTable.addDescription();


