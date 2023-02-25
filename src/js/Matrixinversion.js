import { Table } from "./table.js";
import { Fraction } from "./fraction.js";
import { RowOperation } from "./rowoperation.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { getUnitMatrix } from "./utils.js";
import { addKeyDownListener } from "./utils.js";
var dimension = 3;

document
    .getElementById("dimensionButton")
    .addEventListener("input", modifyDimension);

function modifyDimension(e) {
    if (e.target.value < dimension) {
        console.log("a_" + e.target.value);
        console.log("d_" + dimension);
        console.log("");

        tables[0].removeRow();
        tables[0].removeColumn();
        tables[1].removeRow();
        tables[1].removeColumn();
        tables[2].removeRow();
        tables[2].removeColumn();
        tables[3].removeRow();
        tables[3].removeColumn();

        removeCombobox(dimension);
        updateComboboxes();
    } else if (e.target.value > dimension) {
        console.log("b_" + e.target.value);
        console.log("d_" + dimension);
        console.log("");

        tables[0].addRow();
        tables[0].addColumn();
        tables[1].addRow();
        tables[1].addColumn();
        tables[2].addRow();
        tables[2].addColumn();
        tables[3].addRow();
        tables[3].addColumn();

        addCombobox("combobox_" + (e.target.value - 1));
        updateComboboxes();
    }

    dimension = e.target.value;
}

function addTable() {
    tables.push(new Table(tables.length, false));
    document
        .getElementById("table_element_" + tables.length)
        .appendChild(tables[tables.length - 1].tableContainer);
}

function addCombobox(id) {
    RowOperations.push(new RowOperation(id, tables[0]));

    const table_element = document.createElement("th");
    table_element.id = "Operation";

    document.getElementById("table_row").appendChild(table_element);
    document
        .getElementById("Operation")
        .appendChild(RowOperations[RowOperations.length - 1].comboBoxElement);
}

function removeCombobox(id) {
    document.getElementById("combobox_" + (id - 1)).remove();
    RowOperations.pop();
}

function updateComboboxes() {
    for (let i = 0; i < RowOperations.length; i++) {
        RowOperations[i] = new RowOperation(tables[0]);
    }
}

console.log("Starting webpage!");

let tables = [];
for (let i = 0; i < 2; i++) {
    addTable();
}

let RowOperations = [];
// creating comboboxes
for (let i = 0; i < 3; i++) {
    addCombobox("combobox_" + i);
}

tables.push(new Table(tables.length, false));
tables.push(new Table(tables.length, false));

tables[1].setData(getUnitMatrix(dimension));
tables[2].disableInput();
tables[3].disableInput();

document
    .getElementById("resultContainerTableRowCol1")
    .appendChild(tables[2].tableContainer);

// let verticalElement = document.createElement("div");
// verticalElement.className = "vertical";

// document
//     .getElementById("resultContainer")
//     .appendChild(verticalElement);

document
    .getElementById("resultContainerTableRowCol2")
    .appendChild(tables[3].tableContainer);

function calculateSolution() {
    try {
        let coefMatrix = tables[0].getData();
        let solMatrix = tables[1].getData();
        solMatrix = gaussElimination(coefMatrix, solMatrix);
        tables[2].setData(solMatrix);
        tables[3].setData(getUnitMatrix(dimension));
    } catch (e) {
        alert("satz mit x das war wohl nix");
    }
}

function useResult() {
    tables[0].setData(tables[2].getData());
}

document
    .getElementById("calculateSolutionButton")
    .addEventListener("click", calculateSolution);
document.getElementById("adaptResult").addEventListener("click", useResult);
document.getElementById("calculateButton").addEventListener("click", calculate);

function calculate() {
    for (let i = 0; i < RowOperations.length; i++) {
        let matrix = tables[0].getData();

        if (RowOperations[i].isEnabled()) {
            let new_matrix = RowOperations[i].performRowOperation(matrix);
            tables[2].setRow(i, new_matrix);
        } else {
            tables[2].setRow(i, matrix);
        }
    }
}

addKeyDownListener(tables, true);
