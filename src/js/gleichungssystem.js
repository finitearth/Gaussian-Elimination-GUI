import { Table } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";

var tables = [];
for (let i = 0; i < 3; i++) {
    tables.push(new Table(tables.length, false));
    document
        .getElementById("table_element_" + tables.length)
        .appendChild(tables[tables.length - 1].tableContainer);
}

tables[2].disableInput();

// number of rows
document.getElementById("nr-eq").addEventListener("input", function (e) {
    let numberEquations = e.target.value;
    tables.forEach((table) => {table.setNRows(numberEquations)});
});

// number of cols in coeff matrix
document.getElementById("nr-var").addEventListener("input", function (e) {
    let numberVariables = e.target.value;
    tables[0].setNColumns(numberVariables);
});

// number of cols solution matrix
document.getElementById("nr-b").addEventListener("input", function (e) {
    let numberResultVectors = e.target.value;
    tables[1].setNColumns(numberResultVectors);
    tables[2].setNColumns(numberResultVectors);
});

// calc button
document
    .getElementById("calculateSolutionButton")
    .addEventListener("click", function () {
        let coefMatrix = tables[0].getData();
        let solMatrix = tables[1].getData();

        solMatrix = gaussElimination(coefMatrix, solMatrix);
        tables[2].setData(solMatrix);
    });

// decimal conversion
document
    .getElementById("convertToDecimal")
    .addEventListener("click", function () {
        tables[2].toDecimal();
    });

// eventlistener for arrow keys
document.addEventListener("keydown", function (e) {
    let activeCellId = document.activeElement.id;
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
