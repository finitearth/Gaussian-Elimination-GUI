import { Table, addKeyDownListener } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { getUnitMatrix } from "./matrix.js";

function resizeMatrixRows(e) {
    if(e.target.value > 9) {
        document.getElementById("nr-rows").value = 9
    }
    if(e.target.value < 2) {
        document.getElementById("nr-rows").value = 2
    }
    inputTable.setNRows(e.target.value);
}

function resizeMatrixCols(e) {
    if(e.target.value > 9) {
        document.getElementById("nr-cols").value = 9
    }
    if(e.target.value < 2) {
        document.getElementById("nr-cols").value = 2
    }
    inputTable.setNColumns(e.target.value);
}

let inputTable = new Table("input_matrix", true);
document.getElementById("input_matrix").appendChild(inputTable.tableContainer);

let outputTable = new Table("output_matrix", false);
outputTable.disableInput();
document.getElementById("output_matrix").appendChild(outputTable.tableContainer);

document.getElementById("button_transpose").onclick = function () {
    let input_matrix = inputTable.getData();
    let output_matrix = input_matrix.transpose();
    outputTable.setData(output_matrix);
};

document.getElementById("button_inverse").onclick = function () {
    try {
        let inputMatrix = inputTable.getData();
        let [coefMatrix, solMatrix] = gaussElimination(
            inputMatrix,
            getUnitMatrix(inputMatrix.nRows),
            true
        );
        outputTable.setData(solMatrix);
    } catch (error) {
        alert(error);
    }
};

document.getElementById("button_determinant").onclick = function () {
    try {
        let inputMatrix = inputTable.getData();
        let determinant = inputMatrix.getDeterminant();
        outputTable.setData(determinant);
    } catch (error) {
        alert(error);
    }
};

document.getElementById("nr-rows").addEventListener("input", resizeMatrixRows);

document.getElementById("nr-cols").addEventListener("input", resizeMatrixCols);

console.log(inputTable.tableContainer.children[1].children[0]);

inputTable.tableContainer.children[1].children[0].onclick = function () {
    document.getElementById("nr-rows").value = String(inputTable.rows.length);
};

inputTable.tableContainer.children[1].children[1].onclick = function () {
    console.log(inputTable.nColumns);
    document.getElementById("nr-cols").value = String(inputTable.nColumns);
};

inputTable.tableContainer.children[1].children[2].onclick = function () {
    document.getElementById("nr-rows").value = String(inputTable.rows.length);
};

inputTable.tableContainer.children[1].children[3].onclick = function () {
    document.getElementById("nr-cols").value = String(inputTable.nColumns);
};

addKeyDownListener([inputTable], true);
