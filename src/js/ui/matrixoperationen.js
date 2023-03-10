import { gaussElimination } from "../logic/gaussalgorithm.js";
import { getUnitMatrix } from "../logic/matrix.js";
import { Table, addKeyDownListener } from "../intermediate/table.js";
import {
    listenTableDimension,
    setEventListenerFunction,
} from "../intermediate/eventlisteners.js";

// =========== Tables ===========
let inputTable = new Table("input-matrix");
inputTable.addButtons();
document.getElementById("input-matrix").appendChild(inputTable.tableContainer);

let outputTable = new Table("output-matrix", false);
outputTable.disableInput();
document
    .getElementById("output-matrix")
    .appendChild(outputTable.tableContainer);

// =========== Event Listeners ===========
listenTableDimension("input-nr-rows", [inputTable], [], "rows");
listenTableDimension("input-nr-cols", [inputTable], [], "cols");
addKeyDownListener([inputTable], true);

let listeners = [
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
            return [solMatrix];
        },
    },
    {
        id: "button-determinant",
        func: matrix => [matrix.getDeterminant()],
    },
];

listeners.forEach(listener => {
    setEventListenerFunction(
        listener.id,
        [inputTable],
        [outputTable],
        listener.func
    );
});
