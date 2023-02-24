import { Table } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { getUnitMatrix } from "./utils.js";

function addTable(element) {
    let table = new Table(element, true);
    document
        .getElementById(element)
        .appendChild(table.tableContainer);

    return table;
}

console.log("Starting webpage!");

let inputTable = addTable("input_matrix");
let outputTable = addTable("output_matrix");
outputTable.disableInput();


document.getElementById("button_transpose").onclick = function () {
    let input_matrix = inputTable.getData();
    let output_matrix = input_matrix.transpose();

    outputTable.setData(output_matrix.array);
};

document.getElementById("button_inverse").onclick = function () {
    let inputMatrix = inputTable.getData();
    let solMatrix = gaussElimination(inputMatrix, getUnitMatrix(inputMatrix.nRows));
    
    outputTable.setData(solMatrix);
}

document.getElementById("button_determinant").onclick = function () {
    let inputMatrix = inputTable.getData();
    let determinant = inputMatrix.getDeterminant();
    outputTable.setData(determinant);
}

document.addEventListener("keydown", function (e) {
    let activeCellId = document.activeElement.id;
    console.log(activeCellId);
    let row;
    let column;
    let tableId;

    if (activeCellId == "") {
        tableId = inputTable.id;
        row = 0;
        column = 0;
    } else {
        tableId = Number(activeCellId.split("-")[0]);
        row = Number(activeCellId.split("-")[1]);
        column = Number(activeCellId.split("-")[2]);
    }

    if (e.code == "ArrowUp" && row > 0) {
        row -= 1;
    } else if (e.code == "ArrowDown" && row < inputTable.nRows - 1) {
        row += 1;
    } else if (e.code == "ArrowLeft" && column > 0) {
        column -= 1;
    } else if (e.code == "ArrowRight" && column < inputTable.nColumns - 1) {
        column += 1;
    }

    document.getElementById(`${tableId}-${row}-${column}`).focus();
});