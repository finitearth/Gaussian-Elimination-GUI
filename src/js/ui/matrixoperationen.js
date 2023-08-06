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
    validate,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { designConfig } from "../config.js";
import { alertError } from "../exceptions.js";

// =========== Tables ===========
let inputTable = new Table("input-table-placeholder");
inputTable.addButtons();

let outputTable = new Table("output-table-placeholder");
outputTable.disableInput();

// =========== Event Listeners ===========
listenTableDimension(
    "input-nr-rows",
    [inputTable],
    [],
    "rows",
    false,
    null,
    false,
    designConfig.nInitRows
);
listenTableDimension(
    "input-nr-cols",
    [inputTable],
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
        func: matrix => [matrix.transpose()],
    },
    {
        id: "button-inverse",
        func: matrix => {
            let [coefMatrix, solMatrix] = gaussElimination(
                matrix,
                getUnitMatrix(matrix.nRows),
                true
            );
        },
    },
    {
        id: "button-determinant",
        func: matrix => [matrix.getDeterminant()],
    },
].forEach(listener => {
    setEventListenerFunction(
        listener.id,
        [inputTable],
        [outputTable],
        listener.func
    );
});

modifyDimListener([inputTable, outputTable]);

let validPattern = /^[-+]?[\d]*[.,\/]?[\d]*$/;
getById("input-table-placeholder").addEventListener("keydown", () => {
    validate(validPattern);
});

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
