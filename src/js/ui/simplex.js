import { Table } from "../intermediate/table.js";
import { setEventListenerFunction } from "../intermediate/eventlisteners.js";
import { simplexAlgorithm } from "../logic/simplexAlgorithm.js";
import { listenTableDimension } from "../intermediate/eventlisteners.js";

// =========== Tables ===========
let rightSideTable = new Table("right-side-table", 1);
rightSideTable.addColumnDescription("b");
rightSideTable.removeBrackets();

let constraintCoefTable = new Table("constraint-coef-table");
constraintCoefTable.removeBrackets();
constraintCoefTable.addRowDescription();
constraintCoefTable.addColumnDescription("x");

let objectiveCoefTable = new Table("objective-coef-table", 3);
objectiveCoefTable.setNRows(1);
objectiveCoefTable.removeBrackets();
objectiveCoefTable.addRowDescription("f");

let objectiveResultTable = new Table("objective-b-table", 1);
objectiveResultTable.setNRows(1);
objectiveResultTable.removeBrackets();


let outTable = new Table("output-table", 1);
outTable.disableInput();

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
