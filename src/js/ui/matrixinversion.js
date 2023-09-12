import { gaussElimination } from "../logic/gaussalgorithm.js";
import { getUnitMatrix } from "../logic/matrix.js";
import { generateMatrix } from "../logic/generateExercise.js";
import {
    addCombobox,
    applyRowOperations,
    clearRowOperations,
} from "../intermediate/rowoperation.js";
import {
    Table,
    addKeyDownListener,
    clearTables,
} from "../intermediate/table.js";
import {
    setEventListenerFunction,
    listenTableDimension,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { designConfig } from "../config.js";

// =========== Tables ===========

/**
 * Adds a Table to a Parent Node and appends it to the tables array.
 * @param {parentId} id - ID of the parent node.
 * @param {disableInput} disableInput - Flag to disable input in the table.
 * @param {rowDescription} rowDescription - Flag to add row descriptions.
 * @returns {Table} - The created table object.
 */
function addTable(id, disableInput, rowDescription = false) {
    let table = new Table(id);
    if (disableInput) {
        table.disableInput();
    }
    table.removeBrackets();
    if (rowDescription) {
        table.addRowDescription();
    }
    return table;
}

var dimension = 3;

// Create tables with specific settings
let coefTable = addTable("table-element-1", false, true);
let identityTable = addTable("table-element-2", false);
identityTable.setData(getUnitMatrix(dimension));

let solIdentityTable = addTable("resultContainerTableRowCol1", true, true);
let solCoefTable = addTable("resultContainerTableRowCol2", true);
let tables = [coefTable, identityTable, solIdentityTable, solCoefTable];

// create initial comboboxes
let rowOperations = [];
for (let i = 0; i < 3; i++) {
    rowOperations = addCombobox("combobox_" + i, rowOperations, coefTable);
}

// Define event listeners for input dimension changes

// Listener for the number of rows in coefficient matrix
listenTableDimension(
    "button-dimension",
    [coefTable, solIdentityTable],
    rowOperations,
    "rows",
    false,
    "",
    [true, [false, null]],
    designConfig.nInitRows
);

// Listener for the number of rows in solution matrix
listenTableDimension(
    "button-dimension",
    [solCoefTable, identityTable],
    rowOperations,
    "rows",
    false,
    "",
    [false, null],
);

// Listener for the number of columns in matrices
listenTableDimension("button-dimension", tables, rowOperations, "cols");

// Set event listener for the "Set Dimension" button
setEventListenerFunction(
    "button-dimension",
    [identityTable],
    [identityTable],
    matrix => [getUnitMatrix(matrix.nRows)]
);

// Set event listener for the "Solve" button
setEventListenerFunction(
    "button-solve-solution",
    [coefTable, identityTable],
    [solIdentityTable, solCoefTable],
    (coefMatrix, solMatrix) => {
        let outputMatrix = gaussElimination(coefMatrix, solMatrix);
        let unitMatrix = getUnitMatrix(coefMatrix.nRows);
        return [unitMatrix, outputMatrix];
    }
);

// Set event listener for the "Adapt Result" button
setEventListenerFunction(
    "button-adapt-result",
    [solIdentityTable, solCoefTable],
    [coefTable, identityTable],
    (coefMatrix, solMatrix) => [coefMatrix, solMatrix]
);

// Set event listener for the "Calculate" button
setEventListenerFunction(
    "button-calculate",
    [coefTable, identityTable],
    [solIdentityTable, solCoefTable],
    (coefMatrix, solMatrix) => {
        coefMatrix = applyRowOperations(coefMatrix, rowOperations);
        solMatrix = applyRowOperations(solMatrix, rowOperations);

        return [coefMatrix, solMatrix];
    }
);

// Variable to track if conversion button is checked
let conversionButtonChecked = false;
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonChecked = !conversionButtonChecked;

    // Iterate through tables and convert their representation based on the button status
    tables.forEach(table => {
        table.convertRepresentation(conversionButtonChecked);
    });
});

// Set event listener for the "Generate Exercise" button
setEventListenerFunction("button-generate-excercise", [], [coefTable], () => [
    generateMatrix(solCoefTable.nRows, solCoefTable.nColumns),
]);

// Add event listener to clear result tables when generating a new exercise
getById("button-generate-excercise").addEventListener("click", () => {
    clearTables([solIdentityTable, solCoefTable]);
});

// Add a keydown listener to tables for handling special key events
addKeyDownListener(tables, true);

// Add event listener to the "Clear" button to clear tables and row operations
getById("button-clear").addEventListener("click", () => {
    clearTables(tables);
    clearRowOperations(rowOperations);
});

