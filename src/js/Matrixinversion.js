import { Table, addKeyDownListener } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { addCombobox } from "./rowoperation.js";
import { generateMatrix } from "./generateExercise.js";
import { getUnitMatrix } from "./matrix.js";
import {
    setEventListenerFunction,
    listenTableDimension,
} from "./eventlisteners.js";

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
let coefTable = addTable("table_element_1", false);
let identityTable = addTable("table_element_2", false);
identityTable.setData(getUnitMatrix(dimension));

let solIdentityTable = addTable("resultContainerTableRowCol1", true);
let solCoefTable = addTable("resultContainerTableRowCol2", true);
let tables = [coefTable, identityTable, solIdentityTable, solCoefTable];

// create initial comboboxes
let RowOperations = []; // rowOperations
for (let i = 0; i < 3; i++) {
    RowOperations = addCombobox("combobox_" + i, RowOperations, coefTable);
}

listenTableDimension("dimensionButton", tables, RowOperations, "rows");
listenTableDimension("dimensionButton", tables, RowOperations, "cols");
setEventListenerFunction(
    "dimensionButton",
    [identityTable],
    [identityTable],
    matrix => [getUnitMatrix(matrix.nRows)]
);

// calculate solution
setEventListenerFunction(
    "calculateSolutionButton",
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
    "adaptResult",
    [solIdentityTable, solCoefTable],
    [coefTable, identityTable],
    (coefMatrix, solMatrix) => [solMatrix, coefMatrix]
);

//
document
    .getElementById("calculateButton")
    .addEventListener("click", function () {
        for (let i = 0; i < RowOperations.length; i++) {
            let matrix = coefTable.getData();
            let secondMatrix = identityTable.getData();

            if (RowOperations[i].enabled) {
                let newMatrix = RowOperations[i].performRowOperation(matrix);
                let newSecondMatrix =
                    RowOperations[i].performRowOperation(secondMatrix);

                solIdentityTable.setRow(i, newMatrix);
                solCoefTable.setRow(i, newSecondMatrix);
            } else {
                solIdentityTable.setRow(i, matrix);
                solCoefTable.setRow(i, secondMatrix);
            }
        }
    });

// decimal conversion
document
    .getElementById("convertToDecimal")
    .addEventListener("click", function () {
        tables.forEach(table => {
            if (this.checked) {
                table.toDecimal();
            } else {
                table.toFraction();
            }
        });
    });

// generate excercise
setEventListenerFunction("generateExercise", [], [coefTable], () => [
    generateMatrix(dimension, dimension),
]);

addKeyDownListener(tables, true);
