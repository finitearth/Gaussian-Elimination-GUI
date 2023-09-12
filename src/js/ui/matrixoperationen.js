import { gaussElimination } from "../logic/gaussalgorithm.js";
import { getEmptyMatrix, getUnitMatrix } from "../logic/matrix.js";
import {
    Table,
    addKeyDownListener,
    clearTables,
} from "../intermediate/table.js";
import {
    modifyDimListener,
    listenTableDimension,
    setEventListenerFunction,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { designConfig } from "../config.js";
import { InvalidInputException } from "../exceptions.js";

// =========== Tables ===========
/**
 * Represents the input table for matrix operations.
 * @type {Table}
 */
let inputTable = new Table("input-table-placeholder");

/**
 * Calling function addButtons from table.
 * Adds buttons to change the dimension directly by buttons at the matrix.
 */
inputTable.addButtons();

/**
 * Represents the output table for displaying matrix results.
 * @type {Table}
 */
let outputTable = new Table("output-table-placeholder");

/**
 * Calling function disbaleInput from table.
 * Disables the input fields of the output table.
 */
outputTable.disableInput();

// =========== Event Listeners ===========
// Listen for changes in the number of rows of the tables.
listenTableDimension(
    "input-nr-rows",
    [inputTable, outputTable],
    [],
    "rows",
    false,
    null,
    false,
    designConfig.nInitRows
);

// Listen for changes in the number of columns in the input table.
listenTableDimension(
    "input-nr-cols",
    [inputTable, outputTable],
    [],
    "cols",
    false,
    null,
    false,
    designConfig.nInitColumns
);

// Callin function addKeyDownListener from table.
// Enables moving from cell to cell with keyboard.
addKeyDownListener([inputTable], true);

// Array of listener objects for matrix operations.
// Adds event listeners for matrix operations.

[
    {
        // ID of the "Transpose" button.
        id: "button-transpose",
        // Function to transpose a matrix.
        func: matrix => {
            let result = matrix.transpose();
            return [result];
        },
    },
    {
        // ID of the "Inverse" button.
        id: "button-inverse",
        // Function to calculate the inverse of a matrix.
        func: matrix => {
            let result = getEmptyMatrix(3, 3);
            try {
                result = gaussElimination(matrix, getUnitMatrix(matrix.nRows));
            } catch (e) {
                throw new InvalidInputException("Invalide Matrix!");
            }
            return [result];
        },
    },
    {
        // ID of the "Determinant" button.
        id: "button-determinant",
        // Function to calculate the determinant of a matrix.
        func: matrix => {
            let result = getEmptyMatrix(3, 3);
            if (matrix.nRows !== matrix.nColumns) {
                throw new InvalidInputException(
                    "Determinante ist für nicht-quadratische Matrizen nicht definiert."
                );
            }
            try {
                result = matrix.getDeterminantUsingGaussElimination();
            } catch (e) {
                throw new InvalidInputException("Invalide Matrix!");
            }
            return [result];
        },
    },
].forEach(listener => {
    // Set event listener functions for matrix operations.
    setEventListenerFunction(
        listener.id,
        [inputTable],
        [outputTable],
        listener.func
    );
});

// Add a click event listener to the "button-determinant" to remove brackets from the output table.
getById("button-determinant").addEventListener("click", () => {
    outputTable.removeBrackets();
});
// Add a click event listener to the "button-inverse" to add brackets to the output table.
getById("button-inverse").addEventListener("click", () => {
    outputTable.addBrackets();
});
// Add a click event listener to the "button-transpose" to add brackets to the output table.
getById("button-transpose").addEventListener("click", () => {
    outputTable.addBrackets();
});

// Add an event listener to modify table dimensions.
modifyDimListener([inputTable, outputTable]);

// Flag indicating whether the conversion toggle button is checked.
let conversionButtonchecked = false;
// Add a click event listener to the "button-representation-conversion" to toggle matrix representation.
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonchecked = !conversionButtonchecked;
    [inputTable, outputTable].forEach(table => {
        table.convertRepresentation(conversionButtonchecked);
    });
});

// Add a click event listener to the "button-clear" to clear the table inputs.
getById("button-clear").addEventListener("click", () => {
    clearTables([inputTable, outputTable]);
});
