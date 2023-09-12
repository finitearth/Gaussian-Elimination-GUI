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
/**
 * Listen for changes in the number of rows of the tables.
 * @function
 * @param {string} inputId - The HTML element ID for the input field.
 * @param {Array<Table>} tables - An array of table objects to update.
 * @param {Array<HTMLElement>} rowOperations - An array of rowopertion elements to update.
 * @param {string} rowsOrCols - The dimension to listen for ("rows" or "cols").
 * @param {boolean} allowSmaller - Whether to allow smaller dimension.
 * @param {HTMLElement} desCharacter - The description element to update.
 * @param {boolean} rowDescription - Indicates if the table has row description elements.
 * @param {number} initialValue - The initial value for the dimension.
 */
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

/**
 * Listen for changes in the number of columns in the input table.
 * @function
 * @param {string} inputId - The HTML element ID for the input field.
 * @param {Array<Table>} tables - An array of table objects to update.
 * @param {Array<HTMLElement>} rowOperations - An array of rowopertion elements to update.
 * @param {string} rowsOrCols - The dimension to listen for ("rows" or "cols").
 * @param {boolean} allowSmaller - Whether to allow smaller dimension.
 * @param {HTMLElement} desCharacter - The description element to update.
 * @param {boolean} rowDescription - Indicates if the table has row description elements.
 * @param {number} initialValue - The initial value for the dimension.
 */
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

/**
 * Callin function addKeyDownListener from table.
 * Enables moving from cell to cell with keyboard.
 * @function
 * @param {Array<Table>} tables - An array of table objects to apply the listener to.
 * @param {boolean} nextTableToTheRight - Whether there is more than one input table.
 */
addKeyDownListener([inputTable], true);

/**
 * Array of listener objects for matrix operations.
 * Adds event listeners for matrix operations.
 * @type {Array<Object>}
 */
[
    {
        /**
         * ID of the "Transpose" button.
         * @type {string}
         */
        id: "button-transpose",
        /**
         * Function to transpose a matrix.
         * @function
         * @param {Matrix} matrix - The input matrix.
         * @returns {Array<Matrix>} - An array containing the transposed matrix.
         */
        func: matrix => {
            let result = matrix.transpose();
            return [result];
        },
    },
    {
        /**
         * ID of the "Inverse" button.
         * @type {string}
         */
        id: "button-inverse",
        /**
         * Function to calculate the inverse of a matrix.
         * @function
         * @param {Matrix} matrix - The input matrix.
         * @returns {Array<Matrix>} - An array containing the inverse matrix.
         */
        func: matrix => {
            let result = getEmptyMatrix(3, 3);
            try {
                result = gaussElimination(
                    matrix,
                    getUnitMatrix(matrix.nRows)
                );
            } catch (e) {
                throw new InvalidInputException("Invalide Matrix!");
            }
            return [result];
        },
    },
    {
        /**
         * ID of the "Determinant" button.
         * @type {string}
         */
        id: "button-determinant",
        /**
         * Function to calculate the determinant of a matrix.
         * @function
         * @param {Matrix} matrix - The input matrix.
         * @returns {Array<number>} - An array containing the determinant value.
         * @throws {InvalidInputException} - If the matrix is not square.
         */
        func: matrix => {
            let result = getEmptyMatrix(3, 3);;
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
    /**
     * Set event listener functions for matrix operations.
     * @function
     * @param {string} listener.id - The ID of the button triggering the event.
     * @param {Array<Table>} [inputTables] - An array of input table objects.
     * @param {Array<Table>} [outputTables] - An array of output table objects.
     * @param {Function} listener.func - The function to execute when the button is clicked.
     */
    setEventListenerFunction(
        listener.id,
        [inputTable],
        [outputTable],
        listener.func
    );
});

/**
 * Add a click event listener to the "button-determinant" to remove brackets from the output table.
 */
getById("button-determinant").addEventListener("click", () => {
    outputTable.removeBrackets();
});
/**
 * Add a click event listener to the "button-inverse" to add brackets to the output table.
 */
getById("button-inverse").addEventListener("click", () => {
    outputTable.addBrackets();
});
/**
 * Add a click event listener to the "button-transpose" to add brackets to the output table.
 */
getById("button-transpose").addEventListener("click", () => {
    outputTable.addBrackets();
});

/**
 * Add an event listener to modify table dimensions.
 * @function
 * @param {Array<Table>} tables - An array of table objects to apply the listener to.
 */
modifyDimListener([inputTable, outputTable]);

/**
 * Flag indicating whether the conversion toggle button is checked.
 * @type {boolean}
 */
let conversionButtonchecked = false;
/**
 * Add a click event listener to the "button-representation-conversion" to toggle matrix representation.
 */
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonchecked = !conversionButtonchecked;
    [inputTable, outputTable].forEach(table => {
        table.convertRepresentation(conversionButtonchecked);
    });
});

/**
 * Add a click event listener to the "button-clear" to clear the table inputs.
 */
getById("button-clear").addEventListener("click", () => {
    clearTables([inputTable, outputTable]);
});
