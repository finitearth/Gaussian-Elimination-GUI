import { gaussElimination } from "../logic/gaussalgorithm.js";
import { getUnitMatrix } from "../logic/matrix.js";
import { generateMatrix } from "../logic/generateExercise.js";
import {
    addCombobox,
    applyRowOperations,
} from "../intermediate/rowoperation.js";
import {
    Table,
    addKeyDownListener,
    clearTables,
} from "../intermediate/table.js";
import {
    setEventListenerFunction,
    listenTableDimension,
    validate,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { designConfig } from "../config.js";

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
    true,
    designConfig.nInitRows
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
        if (coefMatrix.getNumberOfSolutions() === 0) {
            alert("KEINE LÖSUNG WIEDERHOLE: KEINE LÖSUNG");
        }
        if (coefMatrix.getNumberOfSolutions() === -1) {
            alert(
                "UNENDLICH VIELE LÖSUNGEN WIEDERHOLE: UNENDLICH VIELE LÖSUNGEN"
            );
        }
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
        if (coefMatrix.getNumberOfSolutions() === 0) {
            alert("KEINE LÖSUNG WIEDERHOLE: KEINE LÖSUNG");
        }
        if (coefMatrix.getNumberOfSolutions() === -1) {
            alert(
                "UNENDLICH VIELE LÖSUNGEN WIEDERHOLE: UNENDLICH VIELE LÖSUNGEN"
            );
        }
        coefMatrix = applyRowOperations(coefMatrix, rowOperations);
        solMatrix = applyRowOperations(solMatrix, rowOperations);

        return [coefMatrix, solMatrix];
    }
);

let conversionButtonChecked = false;
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonChecked = !conversionButtonChecked;

    tables.forEach(table => {
        table.convertRepresentation(conversionButtonChecked);
    });
});

setEventListenerFunction("button-generate-excercise", [], [coefTable], () => [
    generateMatrix(dimension, dimension),
]);

getById("button-generate-excercise").addEventListener("click", () => {
    clearTables([solIdentityTable, solCoefTable]);
});

addKeyDownListener(tables, true);

getById("button-clear").addEventListener("click", () => {
    clearTables(tables);
});

for (let i = 0; i < tables.length; i++) {
    tables[i].addRowDescription();
}

let validPattern = /^[-+]?[\d]*[.,\/]?[\d]*$/;

getById("table-element-1").addEventListener("keydown", () => {
    validate(validPattern)
});

getById("table-element-2").addEventListener("keydown", () => {
    validate(validPattern)
});