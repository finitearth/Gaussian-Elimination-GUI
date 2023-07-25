import { Table } from "../intermediate/table.js";
import { setEventListenerFunction } from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { simplexAlgorithm } from "../logic/simplexAlgorithm.js";

// =========== Tables ===========
let constraintCoefTable = new Table("constraint-coef-table-placeholder");
let rightSideTable = new Table("right-side-table-placeholder", 1);
let objectiveCoefTable = new Table("objective-coef-table-placeholder", 1);

let outTable = new Table("output-table-placeholder", 1);

// =========== Event listeners ===========
setEventListenerFunction("button-calculate", "click", () => {
    let result = simplexAlgorithm(
        constraintCoefTable.getValues(),
        rightSideTable.getValues(),
        objectiveCoefTable.getValues(),
        getById("select-objective").value
    );

    outTable.setValues(result);
});