import { Table } from "../intermediate/table.js";
import { setEventListenerFunction } from "../intermediate/eventlisteners.js";
import { simplexAlgorithm } from "../logic/simplexAlgorithm.js";
import { listenTableDimension } from "../intermediate/eventlisteners.js";

// =========== Tables ===========
let constraintCoefTable = new Table("constraint-coef-table-placeholder");
constraintCoefTable.addButtons();
constraintCoefTable.setNRows(2);
constraintCoefTable.setNColumns(2);
let rightSideTable = new Table("right-side-table-placeholder", 1);
rightSideTable.addButtons();
rightSideTable.setNRows(2);
let objectiveCoefTable = new Table("objective-coef-table-placeholder", 3);
objectiveCoefTable.addButtons();
objectiveCoefTable.setNRows(2);
objectiveCoefTable.setNColumns(1);

let outTable = new Table("output-table-placeholder", 1);

// =========== Event listeners ===========
setEventListenerFunction(
    "button-calculate",
    [constraintCoefTable, rightSideTable],
    [outTable],
    () => {
        let coefMatrix = constraintCoefTable.getData();
        let constMatrix = rightSideTable.getData();
        let objCoef = objectiveCoefTable.getData();
        let result = simplexAlgorithm(coefMatrix, constMatrix, objCoef);
        throw Error("Funktionalität noch nicht implementiert.");
        return [result];
    }
);

listenTableDimension(
    "input-nr-rows",
    [constraintCoefTable, rightSideTable],
    [],
    "rows",
    false,
    null,
    false,
    2
);
listenTableDimension(
    "input-nr-cols",
    [constraintCoefTable, rightSideTable],
    [],
    "cols",
    false,
    null,
    false,
    2
);
listenTableDimension("input-nr-cols", [], [], "cols", false, null, false, 1);
listenTableDimension("input-nr-cols", [], [], "cols", false, null, false, 2);

// let validPattern = /^[-+]?[\d]*[.,\/]?[\d]*$/;

// getById("input-table-placeholder").addEventListener("keydown", () => {
//     validate(validPattern)
// });
