import { gaussElimination } from "../logic/gaussalgorithm.js";
import { getUnitMatrix } from "../logic/matrix.js";
import {
    Table,
    addKeyDownListener,
    clearTables,
} from "../intermediate/table.js";
import {
    modifyDimListener,
    listenTableDimension,
    setEventListenerFunction,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { designConfig } from "../config.js";

// =========== Tables ===========
let inputTable = new Table("input-table-placeholder");
inputTable.addButtons();

let outputTable = new Table("output-table-placeholder");
outputTable.disableInput();

// =========== Event Listeners ===========
listenTableDimension(
    "input-nr-rows",
    [inputTable],
    [],
    "rows",
    false,
    null,
    false,
    designConfig.nInitRows
);
listenTableDimension(
    "input-nr-cols",
    [inputTable],
    [],
    "cols",
    false,
    null,
    false,
    designConfig.nInitColumns
);

addKeyDownListener([inputTable], true);

[
    {
        id: "button-transpose",
        func: matrix => [matrix.transpose()],
    },
    {
        id: "button-inverse",
        func: matrix => {
            let solMatrix = gaussElimination(
                matrix,
                getUnitMatrix(matrix.nRows)
            );
            return [solMatrix];
        },
    },
    {
        id: "button-determinant",
        func: matrix => [matrix.getDeterminantUsingGaussElimination()],
    },
].forEach(listener => {
    setEventListenerFunction(
        listener.id,
        [inputTable],
        [outputTable],
        listener.func
    );
});

function switchBracketsShow(show=true) {
    if (show) {
        getById("solution-bracket-open").classList.remove("hidden");
        getById("solution-bracket-close").classList.remove("hidden");
    } else {
        getById("solution-bracket-open").classList.add("hidden");
        getById("solution-bracket-close").classList.add("hidden");
    }
}
getById("button-determinant").addEventListener("click", () => {
    switchBracketsShow(false);
});
getById("button-inverse").addEventListener("click", () => {
    switchBracketsShow(true);
});
getById("button-transpose").addEventListener("click", () => {
    switchBracketsShow(true);
});


modifyDimListener([inputTable, outputTable]);

let conversionButtonchecked = false;
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonchecked = !conversionButtonchecked;
    [inputTable, outputTable].forEach(table => {
        table.convertRepresentation(conversionButtonchecked);
    });
});

getById("button-clear").addEventListener("click", () => {
    clearTables([inputTable, outputTable]);
});
