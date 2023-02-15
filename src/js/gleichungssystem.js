import { Table } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";

var tables = [];
function addTable() {
    tables.push(new Table(tables.length, false));
    document.getElementById("table_element_"+tables.length).appendChild(tables[tables.length - 1].tableContainer);
}

function calculateSolution() {
    let coefMatrix = tables[0].getData();
    console.log(coefMatrix.stringify());
    let solMatrix = tables[1].getData();
    console.log(solMatrix.stringify());
    solMatrix = gaussElimination(coefMatrix, solMatrix);
    console.log(solMatrix.stringify());
    tables[2].setData(solMatrix.array);
}

for (let i = 0; i < 3; i++) {
    addTable();
}

tables[tables.length-1].disableInput();

// add eventlistener to berechnen button
document.getElementById("calculateSolutionButton").addEventListener("click", calculateSolution);

document.addEventListener("keydown", function (e) {
    let activeCellId = document.activeElement.id;
    console.log(activeCellId);
    let row;
    let column;
    let tableId;

    if (activeCellId == "") {
        tableId = 0;
        row = 0;
        column = 0;
    } else {
        tableId = Number(activeCellId.split("-")[0]);
        row = Number(activeCellId.split("-")[1]);
        column = Number(activeCellId.split("-")[2]);
    }

    if (e.code == "ArrowUp" && row > 0) {
        row -= 1;
    } else if (e.code == "ArrowUp" && tableId > 0) {
        tableId -= 1;
        row = tables[tableId].rows.length - 1;
    } else if (e.code == "ArrowDown" && row < tables[0].rows.length - 1) {
        row += 1;
    } else if (e.code == "ArrowDown" && tableId < tables.length - 1) {
        tableId += 1;
        row = 0;
    } else if (e.code == "ArrowLeft" && column > 0) {
        column -= 1;
    } else if (e.code == "ArrowRight" && column < tables[0].nColumns - 1) {
        column += 1;
    }

    document.getElementById(`${tableId}-${row}-${column}`).focus();
});
