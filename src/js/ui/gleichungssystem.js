import { gaussElimination } from "../logic/gaussalgorithm.js";
import { generateMatrix } from "../logic/generateExercise.js";
import { getUnitMatrix } from "../logic/matrix.js";
import {
    Table,
    addKeyDownListener,
    clearTables,
} from "../intermediate/table.js";
import {
    addCombobox,
    applyRowOperations,
} from "../intermediate/rowoperation.js";
import {
    setEventListenerFunction,
    listenTableDimension,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { designConfig } from "../config.js";

// =========== Tables ===========
function createTable(
    id,
    disableInput,
    initCols = 3,
    rowDescription,
    addDescription
) {
    let table = new Table(id, initCols);
    if (disableInput) {
        table.disableInput();
    }
    // getById(id).appendChild(table.tableContainer);

    if (addDescription) {
        table.addRowDescription();
    }
    table.addColumnDescription(rowDescription);

    return table;
}

let coefTable = createTable("table-coef", false, 3, "x", true);
let solTable = createTable("table-sol", false, 1, "b");
let resCoefTable = createTable("table-res-coef", true, 3, "x", true);
let resSolTable = createTable("table-res-sol", true, 1, "b");
let tables = [coefTable, solTable, resCoefTable, resSolTable];

tables.forEach(table => table.removeBrackets());

let comboboxDummy = document.createElement("tr");
comboboxDummy.className = "combobox-field";
// document.getElementById("operations-table").appendChild(comboboxDummy);

let rowOperations = [];
for (let i = 0; i < coefTable.nRows; i++) {
    rowOperations = addCombobox("combobox_" + i, rowOperations, coefTable);
}

// =========== Event listeners ===========
[
    {
        id: "button-solve",
        inputTables: [coefTable, solTable],
        outputTables: [resCoefTable, resSolTable],
        func: (coefMatrix, solMatrix) => {
            // if (coefMatrix.getNumberOfSolutions() === 0) {
            // alert("KEINE LÖSUNG WIEDERHOLE: KEINE LÖSUNG");
            // }
            // if (coefMatrix.getNumberOfSolutions() === -1) {
            // alert(
            // "UNENDLICH VIELE LÖSUNGEN WIEDERHOLE: UNENDLICH VIELE LÖSUNGEN"
            // );
            // }
            let unitMatrix = getUnitMatrix(coefMatrix.nRows);
            let outputMatrix = gaussElimination(coefMatrix, solMatrix);
            return [unitMatrix, outputMatrix];
        },
    },

    {
        id: "button-generate-excercise",
        inputTables: [coefTable, solTable],
        outputTables: [coefTable, solTable],
        func: (coefMatrix, solMatrix) => {
            let nRows = coefMatrix.nRows;
            let nCols = coefMatrix.nColumns;
            let nEq = solMatrix.nColumns;
            let newCoefMatrix = generateMatrix(nRows, nCols);
            let newSolMatrix = generateMatrix(nRows, nEq);
            return [newCoefMatrix, newSolMatrix];
        },
    },

    {
        id: "button-adapt-result",
        inputTables: [resCoefTable, resSolTable],
        outputTables: [coefTable, solTable],
        func: (coefMatrix, solMatrix) => {
            return [coefMatrix, solMatrix];
        },
    },

    {
        id: "button-calculate",
        inputTables: [coefTable, solTable],
        outputTables: [resCoefTable, resSolTable],
        func: (coefMatrix, solMatrix) => {
            if (coefMatrix.getNumberOfSolutions() === 0) {
                alert("KEINE LÖSUNG WIEDERHOLE: KEINE LÖSUNG");
            }
            if (coefMatrix.getNumberOfSolutions() === -1) {
                alert(
                    "UNENDLICH VIELE LÖSUNGEN WIEDERHOLE: UNENDLICH VIELE LÖSUNGEN"
                );
            }
            coefMatrix = applyRowOperations(coefMatrix, rowOperations);
            solMatrix = applyRowOperations(solMatrix, rowOperations);
            return [coefMatrix, solMatrix];
        },
    },
].forEach(listener => {
    setEventListenerFunction(
        listener.id,
        listener.inputTables,
        listener.outputTables,
        listener.func
    );
});

getById("button-generate-excercise").addEventListener("click", () => {
    clearTables([resCoefTable, resSolTable]);
});

let conversionButtonChecked = false;
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonChecked = !conversionButtonChecked;
    tables.forEach(table => {
        table.convertRepresentation(conversionButtonChecked);
    });
});

listenTableDimension(
    "input-nr-eq",
    [coefTable, resCoefTable],
    rowOperations,
    "rows",
    false,
    "",
    true,
    designConfig.nInitRows
); // number of rows
listenTableDimension(
    "input-nr-eq",
    [solTable, resSolTable],
    rowOperations,
    "rows",
    false,
    "",
    false,
    designConfig.nInitRows
);
listenTableDimension(
    "input-nr-var",
    [coefTable, resCoefTable],
    rowOperations,
    "cols",
    false,
    "x",
    true,
    designConfig.nInitColumns
); // number of cols in coeff matrix
listenTableDimension(
    "input-nr-b",
    [solTable, resSolTable],
    rowOperations,
    "cols",
    true,
    "b",
    false,
    1
); // number of cols solution matrix
addKeyDownListener(tables, true);

getById("button-clear").addEventListener("click", () => {
    clearTables(tables);
});
