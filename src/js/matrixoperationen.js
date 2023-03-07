import { Table, addKeyDownListener } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { getUnitMatrix } from "./matrix.js";
import {
    listenTableDimension,
    setEventListenerFunction,
} from "./eventlisteners.js";

// =========== Tables ===========
let inputTable = new Table("input_matrix", true);
document.getElementById("input_matrix").appendChild(inputTable.tableContainer);

let outputTable = new Table("output_matrix", false);
outputTable.disableInput();
document
    .getElementById("output_matrix")
    .appendChild(outputTable.tableContainer);

// =========== Event Listeners ===========
listenTableDimension("nr-rows", [inputTable], [], "rows");
listenTableDimension("nr-cols", [inputTable], [], "cols");
addKeyDownListener([inputTable], true);

let listeners = [
    {
        id: "button_transpose",
        func: matrix => [matrix.transpose()],
    },
    {
        id: "button_inverse",
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
        id: "button_determinant",
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
