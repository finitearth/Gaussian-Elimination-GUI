import { gaussElimination } from "../logic/gaussalgorithm.js";
import { getUnitMatrix } from "../logic/matrix.js";
import { Table, addKeyDownListener } from "../intermediate/table.js";
import {
    listenTableDimension,
    setEventListenerFunction,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";

const pattern = /^([\d]*)$|^([\d]*[\/]{1}[\d]+)$|^([\d]*[\,]{1}[\d]*)$/g;

// =========== Tables ===========
let inputTable = new Table("input-table-placeholder");
inputTable.addButtons();

let outputTable = new Table("output-table-placeholder");
outputTable.disableInput();

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

getById("input-table-placeholder").addEventListener("keydown", validate);

function validate(e) {
    let valid = true;
    var focused = document.activeElement;
    if (focused.value != "") {
        if (!focused.value.match(pattern) == true) {
            valid = false;
        } else {
            valid = true;
        }
    } else {
        valid = true;
    }

    if (valid == false) {
        focused.classList.add("invalid");
    } else {
        focused.classList.remove("invalid");
    }
}
