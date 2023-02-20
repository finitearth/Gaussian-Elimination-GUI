import { Table } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";

var tables = [];
var numberEquations = 3;
var numberVariables = 3;
var numberResultVectors = 3;

function addTable() {
    tables.push(new Table(tables.length, false));
    document.getElementById("table_element_"+tables.length).appendChild(tables[tables.length - 1].tableContainer);
}

function calculateSolution() {
    let coefMatrix = tables[0].getData();
    let solMatrix = tables[1].getData();

    solMatrix = gaussElimination(coefMatrix, solMatrix);
    tables[2].setData(solMatrix.array);
}

function addEquation(e) {
    if (numberEquations < e.target.value) {
        tables[0].addRow();
        tables[1].addRow();
        tables[2].addRow();
    }
    else if (numberEquations > e.target.value) {
        tables[0].removeRow();
        tables[1].removeRow();
        tables[2].removeRow();
    }
    numberEquations = e.target.value;
}

function addVariable(e) {
    if (numberVariables < e.target.value) {
        tables[0].addColumn();
    }
    else if (numberVariables > e.target.value) {
        tables[0].removeColumn();
    }
    numberVariables = e.target.value;
}

function addResultVector(e) {
    if (numberResultVectors < e.target.value) {
        tables[1].addColumn();
        tables[2].addColumn();
    }
    else if (numberResultVectors > e.target.value) {
        tables[1].removeColumn();
        tables[2].removeColumn();
    }
    numberResultVectors = e.target.value;
}

document.getElementById("nr-eq").addEventListener("input", addEquation);
document.getElementById("nr-var").addEventListener("input", addVariable);
document.getElementById("nr-b").addEventListener("input", addResultVector);

for (let i = 0; i < 3; i++) {
    addTable();
}
tables[1].removeColumn();
tables[1].removeColumn();
tables[tables.length-1].disableInput();

// add eventlistener to berechnen button
document.getElementById("calculateSolutionButton").addEventListener("click", calculateSolution);

// add eventlistener to convertToDecimal
document.getElementById("convertToDecimal").addEventListener("click", function () {
    tables[2].toDecimal();
});


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
