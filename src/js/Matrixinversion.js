import { Table } from "./table.js";
import { Fraction } from "./fraction.js";
import { RowOperation } from "./rowoperation.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { getUnitMatrix } from "./utils.js";
import { addKeyDownListener } from "./utils.js";
import { addCombobox } from "./utils.js";
import { removeCombobox } from "./utils.js";
import { updateRowOperations } from "./utils.js";
import { generateMatrix } from "./generateExercise.js";

var dimension = 3;

document
    .getElementById("dimensionButton")
    .addEventListener("input", modifyDimension);

function modifyDimension(e) {
    if (e.target.value < dimension) {
        for (let i = 0; i < tables.length; i++) {
            tables[i].removeRow();
            tables[i].removeColumn();
        }
        
        RowOperations = removeCombobox(dimension, RowOperations);
    } else if (e.target.value > dimension) {
        for (let i = 0; i < tables.length; i++) {
            tables[i].addRow();
            tables[i].addColumn();
        }

        RowOperations = addCombobox(("combobox_" + (e.target.value - 1)), RowOperations, tables[0]);
    }

    tables[1].setData(getUnitMatrix(e.target.value));
    
    updateRowOperations(RowOperations, dimension, e.target.value);
    dimension = e.target.value;
    
}

function addTable() {
    tables.push(new Table(tables.length, false));
    document
        .getElementById("table_element_" + tables.length)
        .appendChild(tables[tables.length - 1].tableContainer);
}



let tables = [];
for (let i = 0; i < 2; i++) {
    addTable();
}

let RowOperations = [];
for (let i = 0; i < 3; i++) {
    RowOperations = addCombobox(("combobox_" + i), RowOperations, tables[0]);
}

tables.push(new Table(tables.length, false));
tables.push(new Table(tables.length, false));

tables[1].setData(getUnitMatrix(dimension));
tables[2].disableInput();
tables[3].disableInput();

document
    .getElementById("resultContainerTableRowCol1")
    .appendChild(tables[2].tableContainer);

document
    .getElementById("resultContainerTableRowCol2")
    .appendChild(tables[3].tableContainer);

function calculateSolution() {
    try {
        let coefMatrix = tables[0].getData();
        let solMatrix = tables[1].getData();
        [coefMatrix, solMatrix] = gaussElimination(coefMatrix, solMatrix, true);
        tables[2].setData(solMatrix);
        tables[3].setData(coefMatrix);
    } catch (e) {
        alert("Inversenberechnung nicht mglich");
    }
}

function useResult() {
    tables[0].setData(tables[2].getData());
    tables[1].setData(tables[3].getData());
}

document
    .getElementById("calculateSolutionButton")
    .addEventListener("click", calculateSolution);
document
    .getElementById("adaptResult")
    .addEventListener("click", useResult);
document
    .getElementById("calculateButton")
    .addEventListener("click", calculate);

function calculate() {
    for (let i = 0; i < RowOperations.length; i++) {
        let matrix = tables[0].getData();
        let secondMatrix = tables[1].getData();

        if (RowOperations[i].isEnabled()) {
            let newMatrix = RowOperations[i].performRowOperation(matrix);
            let newSecondMatrix = RowOperations[i].performRowOperation(secondMatrix);

            tables[2].setRow(i, newMatrix);
            tables[3].setRow(i, newSecondMatrix);
        } else {
            tables[2].setRow(i, matrix);
            tables[3].setRow(i, secondMatrix);
        }
    }
}

// decimal conversion
document
    .getElementById("convertToDecimal")
    .addEventListener("click", function () {
        tables.forEach(table => {
            if (this.checked) {
                table.toDecimal();
            } else {
                table.toFraction();
            }
        });
    });

    // generate excercise
document
.getElementById("generateExercise")
.addEventListener("click", function () {
    let dim = document.getElementById("dimensionButton").value;
    let matrix = generateMatrix(dim, dim);
    tables[0].setData(matrix);
});

addKeyDownListener(tables, true);

