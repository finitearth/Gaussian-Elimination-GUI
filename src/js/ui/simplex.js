import { Table } from "../intermediate/table.js";
import {
    setEventListenerFunction,
    validate,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { simplexAlgorithm } from "../logic/simplexAlgorithm.js";

// =========== Tables ===========
let constraintCoefTable = new Table("constraint-coef-table-placeholder");
let rightSideTable = new Table("right-side-table-placeholder", 1);
let objectiveCoefTable = new Table("objective-coef-table-placeholder", 1);

let outTable = new Table("output-table-placeholder", 1);

// =========== Event listeners ===========
setEventListenerFunction("button-calculate", [inTable], [outTable], () => {
    let coefMatrix = inTable.getData();
    let constMatrix = inTable.getConstants();
    let result = simplexAlgorithm(coefMatrix, constMatrix);
    return [result];
});

let validPattern = /^[-+]?[\d]*[.,\/]?[\d]*$/;

getById("input-table-placeholder").addEventListener("keydown", () => {
    validate(validPattern)
});