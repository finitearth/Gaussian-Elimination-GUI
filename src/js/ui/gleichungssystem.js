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
    clearRowOperations,
} from "../intermediate/rowoperation.js";
import {
    setEventListenerFunction,
    listenTableDimension,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { designConfig } from "../config.js";

// =========== Tables ===========

// Function to create a table with specific settings
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

    // Add row and column descriptions if requested
    if (addDescription) {
        table.addRowDescription();
    }
    table.addColumnDescription(rowDescription);

    return table;
}

// Create tables with specific settings
let coefTable = createTable("table-coef", false, 3, "x", true);
let solTable = createTable("table-sol", false, 1, "b");
let resCoefTable = createTable("table-res-coef", true, 3, "x", true);
let resSolTable = createTable("table-res-sol", true, 1, "b");
let tables = [coefTable, solTable, resCoefTable, resSolTable];

// Remove brackets from table elements
tables.forEach(table => table.removeBrackets());

// Create dummy combobox elements
let comboboxDummy = document.createElement("tr");
comboboxDummy.className = "combobox-field";

// Initialize an array to store row operation elements
let rowOperations = [];
for (let i = 0; i < coefTable.nRows; i++) {
    rowOperations = addCombobox("combobox_" + i, rowOperations, coefTable);
}

// =========== Event listeners ===========


// Define event listeners with their associated functions
[
    {
        id: "button-solve",
        inputTables: [coefTable, solTable],
        outputTables: [resCoefTable, resSolTable],
        func: (coefMatrix, solMatrix) => {
            // Perform Gauss elimination and measure time            
            let unitMatrix = getUnitMatrix(coefMatrix.nRows);
            let outputMatrix = gaussElimination(coefMatrix, solMatrix);
            try {
                let unitMatrix = getUnitMatrix(coefMatrix.nRows);
                let outputMatrix = gaussElimination(coefMatrix, solMatrix);
            }catch (e) {
                throw new InvalidInputException("Invalide Matrix!");
            }
            return [unitMatrix, outputMatrix];
        },
    },

    {
        id: "button-generate-excercise",
        inputTables: [coefTable, solTable],
        outputTables: [coefTable, solTable],
        func: (coefMatrix, solMatrix) => {
            // Generate new matrices for the exercise
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
            // Return the result matrices without modifications
            return [coefMatrix, solMatrix];
        },
    },

    {
        id: "button-calculate",
        inputTables: [coefTable, solTable],
        outputTables: [resCoefTable, resSolTable],
        func: (coefMatrix, solMatrix) => {
            // Apply row operations to matrices
            coefMatrix = applyRowOperations(coefMatrix, rowOperations);
            solMatrix = applyRowOperations(solMatrix, rowOperations);
            return [coefMatrix, solMatrix];
        },
    },
].forEach(listener => {
    // Attach event listeners to buttons
    setEventListenerFunction(
        listener.id,
        listener.inputTables,
        listener.outputTables,
        listener.func
    );
});

// Add event listener to clear result tables when generating a new exercise
getById("button-generate-excercise").addEventListener("click", () => {
    clearTables([resCoefTable, resSolTable]);
});

// Variable to track if conversion button is checked
let conversionButtonChecked = false;

// Add event listener to the representation conversion button
getById("button-representation-conversion").addEventListener("click", () => {
    // Toggle the checked status of the conversion button
    conversionButtonChecked = !conversionButtonChecked;
    // Iterate through tables and convert their representation based on the button status
    tables.forEach(table => {
        table.convertRepresentation(conversionButtonChecked);
    });
});

// Define event listeners for input dimension changes

// Listener for the number of rows in coefficient matrix
listenTableDimension(
    "input-nr-eq",
    [coefTable, resCoefTable],
    rowOperations,
    "rows",
    false,
    "",
    [true, [false, null]],
    designConfig.nInitRows
);

// Listener for the number of rows in solution matrix
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


// Listener for the number of columns in coefficient matrix
listenTableDimension(
    "input-nr-var",
    [coefTable, resCoefTable],
    rowOperations,
    "cols",
    false,
    "x",
    [true, [false, null]],
    designConfig.nInitColumns
); 

// Listener for the number of columns in solution matrix
listenTableDimension(
    "input-nr-b",
    [solTable, resSolTable],
    rowOperations,
    "cols",
    true,
    "b",
    false,
    1
); 

// Add a keydown listener to tables for handling special key events
addKeyDownListener(tables, true);

// Add event listener to the "Clear" button to clear tables and row operations
getById("button-clear").addEventListener("click", () => {
    clearTables(tables);
    clearRowOperations(rowOperations);
});
