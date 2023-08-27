import { gaussElimination } from "../logic/gaussalgorithm.js";
import { getUnitMatrix } from "../logic/matrix.js";
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
let inputTable = new Table("input-table-placeholder");
inputTable.addButtons();

let outputTable = new Table("output-table-placeholder");
outputTable.disableInput();

// =========== Event Listeners ===========
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

addKeyDownListener([inputTable], true);

[
    {
        id: "button-transpose",
        func: matrix => {

            let result = matrix.transpose();
            return [result]},
    },
    {
        id: "button-inverse",
        func: matrix => {
            let solMatrix = gaussElimination(
                matrix,
                getUnitMatrix(matrix.nRows)
            );
            return [solMatrix];
        },
    },
    {
        id: "button-determinant",
        func: matrix => {
            if (matrix.nRows !== matrix.nColumns) {
                throw new InvalidInputException("Determinante ist für nicht-quadratische Matrizen nicht definiert.");
            }
            return [matrix.getDeterminantUsingGaussElimination()]
        },
    },
].forEach(listener => {
    setEventListenerFunction(
        listener.id,
        [inputTable],
        [outputTable],
        listener.func
    );
});

getById("button-determinant").addEventListener("click", () => {
    outputTable.removeBrackets();
});
getById("button-inverse").addEventListener("click", () => {
    outputTable.addBrackets();
});
getById("button-transpose").addEventListener("click", () => {
    outputTable.addBrackets();
});


modifyDimListener([inputTable, outputTable]);

let conversionButtonchecked = false;
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonchecked = !conversionButtonchecked;
    [inputTable, outputTable].forEach(table => {
        table.convertRepresentation(conversionButtonchecked);
    });
});

getById("button-clear").addEventListener("click", () => {
    clearTables([inputTable, outputTable]);
});
