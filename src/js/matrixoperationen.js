import { Table } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { getUnitMatrix } from "./utils.js";
import { addKeyDownListener } from "./utils.js";

var nRows = 3;
var nCols = 3;

function addTable(element) {
    let table = new Table(element, true);
    document.getElementById(element).appendChild(table.tableContainer);

    return table;
}

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

let inputTable = addTable("input_matrix");
let outputTable = addTable("output_matrix");
outputTable.disableInput();
outputTable.tableContainer.children[1].replaceChildren();

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
