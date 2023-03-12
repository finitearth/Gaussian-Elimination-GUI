import { gaussElimination } from "../logic/gaussalgorithm.js";
import { getUnitMatrix } from "../logic/matrix.js";
import { generateMatrix } from "../logic/generateExercise.js";
import { addCombobox, applyRowOperations } from "../intermediate/rowoperation.js";
import { Table, addKeyDownListener } from "../intermediate/table.js";
import {
    setEventListenerFunction,
    listenTableDimension,
} from "../intermediate/eventlisteners.js";


// =========== Tables ===========

/**
 * Adds a Table to a Parent Node and appends it to the tables array.
 * @paramenter {parentId} ID of the parent node.
 */
function addTable(parentId, disableInput) {
    let newTable = new Table(parentId, false);
    if (disableInput) {
        newTable.disableInput();
    }

    document.getElementById(parentId).appendChild(newTable.tableContainer);

    return newTable;
}
var dimension = 3;

// creating tables
let coefTable = addTable("table-element-1", false);
let identityTable = addTable("table-element-2", false);
identityTable.setData(getUnitMatrix(dimension));

let solIdentityTable = addTable("resultContainerTableRowCol1", true);
let solCoefTable = addTable("resultContainerTableRowCol2", true);
let tables = [coefTable, identityTable, solIdentityTable, solCoefTable];

// create initial comboboxes
let rowOperations = []; // rowOperations
for (let i = 0; i < 3; i++) {
    rowOperations = addCombobox("combobox_" + i, rowOperations, coefTable);
}

// =========== Event listeners ===========
listenTableDimension("button-dimension", tables, rowOperations, "rows");
listenTableDimension("button-dimension", tables, rowOperations, "cols");
setEventListenerFunction(
    "button-dimension",
    [identityTable],
    [identityTable],
    matrix => [getUnitMatrix(matrix.nRows)]
);

// calculate solution
setEventListenerFunction(
    "button-solve",
    [coefTable, identityTable],
    [solIdentityTable, solCoefTable],
    (coefMatrix, solMatrix) => {
        let outputMatrix = gaussElimination(coefMatrix, solMatrix);
        let unitMatrix = getUnitMatrix(coefMatrix.nRows);
        return [unitMatrix, outputMatrix];
    }
);

// use result as input
setEventListenerFunction(
    "button-adapt-result",
    [solIdentityTable, solCoefTable],
    [coefTable, identityTable],
    (coefMatrix, solMatrix) => [solMatrix, coefMatrix]
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

// decimal conversion
document
    .getElementById("button-representation-conversion")
    .addEventListener("click", function () {
        tables.forEach(table => {
            table.convertRepresentation(this.checked);
        });
    });

// generate excercise
setEventListenerFunction("button-generate-excercise", [], [coefTable], () => [
    generateMatrix(dimension, dimension),
]);

addKeyDownListener(tables, true);
