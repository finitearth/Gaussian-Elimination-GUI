import { gaussElimination } from "../logic/gaussalgorithm.js";
import { getUnitMatrix } from "../logic/matrix.js";
import { Table, addKeyDownListener } from "../intermediate/table.js";
import {
    modifyDimListener,
    listenTableDimension,
    setEventListenerFunction,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";



// =========== Tables ===========
let inputTable = new Table("input-table-placeholder");
inputTable.addButtons();

// getById("input-table-placeholder").appendChild(inputTable.tableContainer);

let outputTable = new Table("output-table-placeholder");
outputTable.disableInput();

// getById("output-matrix").appendChild(outputTable.tableContainer);
// =========== Event Listeners ===========
listenTableDimension("input-nr-rows", [inputTable], [], "rows");
listenTableDimension("input-nr-cols", [inputTable], [], "cols");

addKeyDownListener([inputTable], true);

[
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
].forEach(listener => {
    setEventListenerFunction(
        listener.id,
        [inputTable],
        [outputTable],
        listener.func
    );
});


// listenTableDimension(
//     "addrow",
//     [inputTable],
//     [],
//     "rows",
//     false,
//     null,
//     false,
//     "click"
// );

// modifyDimListener([inputTable, outputTable]);

let validPattern = /^[\d\/.,-]*$/;
function validate(e) {
    let focused = document.activeElement;
    let valid = focused.value.match(validPattern);

    if (!valid) {
        focused.classList.add("invalid");
    } else {
        focused.classList.remove("invalid");
    }
}

getById("input-table-placeholder").addEventListener("keydown", validate);

let conversionButtonchecked = false;
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonchecked = !conversionButtonchecked;
    [inputTable, outputTable].forEach(table => {
        table.convertRepresentation(conversionButtonchecked);
    });
});