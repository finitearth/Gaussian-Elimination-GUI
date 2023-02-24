import { Table }            from "./table.js";
import { Fraction }         from "./fraction.js";
import { RowOperation }     from "./rowoperation.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { getUnitMatrix }    from "./utils.js";
var dimension = 3;

document
    .getElementById("dimensionButton")
    .addEventListener("input", modifyDimension);

function modifyDimension(e) {
    if (e.target.value < dimension) {
        console.log("a_"+e.target.value);
        console.log("d_"+dimension);
        console.log("");

        tables[0].removeRow();
        tables[0].removeColumn();
        tables[1].removeRow();
        tables[1].removeColumn();
        tables[2].removeRow();
        tables[2].removeColumn();

        removeCombobox(dimension);
        updateComboboxes();
    } else if (e.target.value > dimension) {
        console.log("b_"+e.target.value);
        console.log("d_"+dimension);
        console.log("");

        tables[0].addRow();
        tables[0].addColumn();
        tables[1].addRow();
        tables[1].addColumn();
        tables[2].addRow();
        tables[2].addColumn();

        addCombobox("combobox_" + (e.target.value - 1));
        updateComboboxes();
    }

    dimension = e.target.value;
 };
 
 function addTable() {
     tables.push(new Table(tables.length, false));
     document.getElementById("table_element_"+tables.length).appendChild(tables[tables.length - 1].tableContainer);
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
    document.getElementById("combobox_"+(id-1)).remove();
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

tables[1].setData(getUnitMatrix(dimension));
tables[2].disableInput();

document
    .getElementById("resultContainer")
    .appendChild(tables[tables.length - 1].tableContainer);

function calculateSolution() {
    let coefMatrix = tables[0].getData();
    console.log(coefMatrix.stringify());
    let solMatrix = tables[1].getData();
    console.log(solMatrix.stringify());
    solMatrix = gaussElimination(coefMatrix, solMatrix);
    console.log(solMatrix.stringify());
    tables[2].setData(solMatrix);
    
}

function useResult() {
    tables[0].setData(tables[2].getData());
}

document.getElementById("calculateSolutionButton").addEventListener("click", calculateSolution);
document.getElementById("adaptResult").addEventListener("click", useResult);
document.getElementById("calculateButton").addEventListener("click", calculate);

function calculate() {
   

    for (let i = 0; i < RowOperations.length; i++) {
        let matrix = tables[0].getData();

        if (RowOperations[i].isEnabled()) {
            let new_matrix  = RowOperations[i].performRowOperation(matrix);
            tables[2].setRow(i, new_matrix);
        }
        else {
            tables[2].setRow(i, matrix);
        }
    }
}

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
