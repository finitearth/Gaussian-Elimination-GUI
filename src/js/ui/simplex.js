import { Table, addKeyDownListener } from "../intermediate/table.js";
import { setEventListenerFunction } from "../intermediate/eventlisteners.js";
import { simplexAlgorithm } from "../logic/simplexAlgorithm.js";
import { listenTableDimension } from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { designConfig } from "../config.js";
import { clearTables } from "../intermediate/table.js";
import { getEmptyMatrix } from "../logic/matrix.js";
import { InvalidInputException } from "../exceptions.js";

// =========== Tables ===========

// Create a table for coefficients (coefTable)
let coefTable = new Table("coef-table", 3);
coefTable.removeBrackets();
coefTable.addRowDescription(false, "f(<b>x</b>)");
coefTable.addColumnDescription("x");

// Create a table for right-hand side values (rhsTable)
let rhsTable = new Table("rhs-table", 1);
rhsTable.addColumnDescription("b");
rhsTable.removeBrackets();

// Create an output table for results (outTable)
let outTable = new Table("output-table", 3);
outTable.disableInput();
outTable.removeBrackets();
outTable.addRowDescription(false, "f(<b>x</b>)");
outTable.addColumnDescription("x");

// Create an output table for result values (outBTable)
let outBTable = new Table("output-b-table", 1);
outBTable.disableInput();
outBTable.removeBrackets();
outBTable.addColumnDescription("b");

// =========== Event listeners ===========

// Event listener for the "Calculate" button
setEventListenerFunction(
    "button-calculate",
    [coefTable, rhsTable],
    [outTable, outBTable],
    (coefMatrix, bMatrix) => {
        let result = getEmptyMatrix(3, 3);
        try {
            result = simplexAlgorithm(coefMatrix, bMatrix);
        } catch (e) {
            console.log(e)
            throw new InvalidInputException("Invalider Input");
        }
        return result;
    }
);

// Event listener for keyboard input (keydown)
addKeyDownListener([coefTable, rhsTable], true);

// Event listener for representation conversion button
let conversionButtonchecked = false;
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonchecked = !conversionButtonchecked;
    [outTable, outBTable].forEach(table => {
        table.convertRepresentation(conversionButtonchecked);
    });
});

// Event listener for the "Clear" button
getById("button-clear").addEventListener("click", () => {
    clearTables([coefTable, rhsTable, outTable, outBTable]);
});

// Event listeners to dynamically adjust the dimensions of tables
listenTableDimension(
    "input-nr-rows",
    [coefTable, outTable],
    [],
    "rows",
    false,
    "x",
    [true, [false, "f(<b>x</b>)"]],
    designConfig.nInitRows
);

listenTableDimension(
    "input-nr-rows",
    [rhsTable, outBTable],
    [],
    "rows",
    false,
    "b",
    [false, null],
    designConfig.nInitRows
);

listenTableDimension(
    "input-nr-cols",
    [coefTable, outTable],
    [],
    "cols",
    false,
    "x",
    [true, [false, "f(<b>x</b>)"]],
    designConfig.nInitColumns
);
