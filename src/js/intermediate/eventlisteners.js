import { adaptComboboxes, updateRowOperations } from "./rowoperation.js";
import { designConfig } from "../config.js";
import { getById } from "./getElement.js";
import { alertError } from "../exceptions.js";

/**
 * Adds event listeners for modifying table dimensions (rows and columns).
 * @param {Table[]} tables - An array of table objects to be modified.
 */
export function modifyDimListener(tables) {
    // Loop through buttons for adding/removing rows and columns
    ["addrow", "addcol", "removerow", "removecol"].forEach(buttonId => {
        // Add event listener for each button click
        getById(buttonId).addEventListener("click", () => {
            let nRows = Number(getById("input-nr-rows").value);
            let nCols = Number(getById("input-nr-cols").value);
            if (buttonId == "addrow") {
                nRows++;
            } else if (buttonId == "addcol") {
                nCols++;
            } else if (buttonId == "removerow") {
                nRows--;
            } else if (buttonId == "removecol") {
                nCols--;
            }
            // Ensure dimensions stay within configured limits
            nRows = Math.min(nRows, designConfig.maxRows);
            nCols = Math.min(nCols, designConfig.maxColumns);
            nRows = Math.max(nRows, designConfig.minRows);
            nCols = Math.max(nCols, designConfig.minColumns);
            getById("input-nr-rows").value = nRows;
            getById("input-nr-cols").value = nCols;
            // Update the dimensions of all tables
            tables.forEach(table => {
                table.setNRows(nRows);
                table.setNColumns(nCols);
            });
        });
    });
}

/**
 * Sets an event listener for a button element to perform a matrix operation when clicked.
 * @param {string} buttonId - The ID of the button element.
 * @param {Table[]} inputTables - An array of input table objects.
 * @param {Table[]} outputTables - An array of output table objects.
 * @param {function} operation - The matrix operation function.
 * @param {boolean} [alertOnError=true] - Indicates whether to display an error alert if an exception occurs.
 */
export function setEventListenerFunction(
    buttonId,
    inputTables,
    outputTables,
    operation,
    alertOnError = true
) {
    let button = getById(buttonId);
    button.addEventListener("click", () => {
        try {
            // Get input matrices from input tables
            let inputMatrices = inputTables.map(table => table.getData());
            // Perform the matrix operation
            let outputMatrices = operation(...inputMatrices);

            // Set the data in output tables with the resulting matrices
            outputTables.forEach((table, index) =>
                table.setData(outputMatrices[index])
            );
        } catch (error) {
            // Handle errors, either by displaying an alert or rethrowing the error
            if (alertOnError) alertError(error);
            else throw error;
        }
    });
}

/**
 * Adds an event listener to an input element to dynamically update table dimensions (rows or columns).
 * @param {string} inputId - The ID of the input element.
 * @param {Table[]} tables - An array of table objects to be updated.
 * @param {RowOperation[]} rowOperations - An array of row operation objects.
 * @param {string} rowsOrCols - Indicates whether to update rows or columns.
 * @param {boolean} [allowSmaller=false] - Indicates whether to allow a smaller number of rows/columns.
 * @param {string} [desCharacter=null] - The character to be added in column descriptions.
 * @param {Array} [rowDescription=null] - An array containing a row description character and description text.
 * @param {number} [defaultValue=null] - The default value for the input element.
 */
export function listenTableDimension(
    inputId,
    tables,
    rowOperations,
    rowsOrCols,
    allowSmaller = false,
    desCharacter = null,
    rowDescription = null,
    defaultValue = null
) {
    let input = getById(inputId);
    if (defaultValue) {
        input.value = defaultValue;
    }
    input.addEventListener("input", e => {
        e.target.value = Math.min(e.target.value, designConfig.maxRows);
        let min = allowSmaller ? 1 : designConfig.minRows;
        e.target.value = Math.max(e.target.value, min);
        let numberEquations = e.target.value;
        tables.forEach(table => {
            if (rowsOrCols === "rows") {
                // Update the number of rows for each table
                table.setNRows(numberEquations);
                // Update row operations if applicable
                if (rowOperations.length > 0) {
                    rowOperations = updateRowOperations(
                        rowOperations,
                        rowOperations.length,
                        numberEquations
                    );

                    rowOperations = adaptComboboxes(
                        rowOperations,
                        table,
                        numberEquations
                    );

                }

                // Add row description if provided
                if (rowDescription && rowDescription[0]) {
                    table.addRowDescription(rowDescription[1][0], rowDescription[1][1]);
                }

            } else if (rowsOrCols === "cols") {
                // Update the number of columns for each table
                table.setNColumns(numberEquations);
                // Add column description if provided
                if (desCharacter) {
                    table.addColumnDescription(desCharacter);
                }
            }
        });
    });
}
