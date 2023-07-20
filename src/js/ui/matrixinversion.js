import { gaussElimination } from "../logic/gaussalgorithm.js";
import { getUnitMatrix } from "../logic/matrix.js";
import { generateMatrix } from "../logic/generateExercise.js";
import {
    addCombobox,
    applyRowOperations,
} from "../intermediate/rowoperation.js";
import { Table, addKeyDownListener } from "../intermediate/table.js";
import {
    setEventListenerFunction,
    listenTableDimension,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";

// =========== Tables ===========

/**
 * Adds a Table to a Parent Node and appends it to the tables array.
 * @paramenter {parentId} ID of the parent node.
 */
function addTable(id, disableInput, rowDescription = false) {
    let table = new Table(id, false);
    if (disableInput) {
        table.disableInput();
    }
    table.addRowDescription(rowDescription);
    return table;
}

var dimension = 3;

// creating tables
let coefTable = addTable("table-element-1", false, true);
let identityTable = addTable("table-element-2", false);
identityTable.setData(getUnitMatrix(dimension));

let solIdentityTable = addTable("resultContainerTableRowCol1", true, true);
let solCoefTable = addTable("resultContainerTableRowCol2", true);
let tables = [coefTable, identityTable, solIdentityTable, solCoefTable];

// create initial comboboxes
let rowOperations = []; // rowOperations
for (let i = 0; i < 3; i++) {
    rowOperations = addCombobox("combobox_" + i, rowOperations, coefTable);
}

listenTableDimension(
    "button-dimension",
    [coefTable, solIdentityTable],
    rowOperations,
    "rows",
    false,
    "",
    true
);
listenTableDimension(
    "button-dimension",
    [solCoefTable, identityTable],
    rowOperations,
    "rows",
    false,
    "",
    false
);
listenTableDimension("button-dimension", tables, rowOperations, "cols");
setEventListenerFunction(
    "button-dimension",
    [identityTable],
    [identityTable],
    matrix => [getUnitMatrix(matrix.nRows)]
);

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

setEventListenerFunction(
    "button-adapt-result",
    [solIdentityTable, solCoefTable],
    [coefTable, identityTable],
    (coefMatrix, solMatrix) => [coefMatrix, solMatrix]
);

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

let conversionButtonChecked = false;
getById("button-representation-conversion").addEventListener(
    "click",
    () => {
        conversionButtonChecked = !conversionButtonChecked;

        tables.forEach(table => {
            table.convertRepresentation(conversionButtonChecked);
        });
    }
);

setEventListenerFunction("button-generate-excercise", [], [coefTable], () => [
    generateMatrix(dimension, dimension),
]);

addKeyDownListener(tables, true);

for (let i = 0; i < tables.length; i++) {
    tables[i].addRowDescription();
}
