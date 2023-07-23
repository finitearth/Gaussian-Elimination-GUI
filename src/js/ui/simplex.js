import { Table } from "../intermediate/table.js";
import { setEventListenerFunction } from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { simplexAlgorithm } from "../logic/simplexAlgorithm.js";

// =========== Tables ===========
let inTable = new Table("input-table-placeholder");
let outTable = new Table("output-table-placeholder");

// =========== Event listeners ===========
setEventListenerFunction("button-calculate", [inTable], [outTable], () => {
    let coefMatrix = inTable.getData();
    let constMatrix = inTable.getConstants();
    let result = simplexAlgorithm(coefMatrix, constMatrix);
    return [result];
});