import { Table, addKeyDownListener } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { addCombobox, updateRowOperations, adaptComboboxes } from "./utils.js";
import { generateMatrix } from "./generateExercise.js";
import { getUnitMatrix } from "./matrix.js";

var dimension = 3;

// creating tables
let tables = [];

addTable("table_element_1");
addTable("table_element_2");

addTable("resultContainerTableRowCol1");
addTable("resultContainerTableRowCol2");

tables[1].setData(getUnitMatrix(dimension));
tables[2].disableInput(); 
tables[3].disableInput();

// create initial comboboxes
let RowOperations = []; // rowOperations
for (let i = 0; i < 3; i++) {
    RowOperations = addCombobox("combobox_" + i, RowOperations, tables[0]);
}

function addTable(parentId) {
    tables.push(new Table(tables.length, false));
    document
        .getElementById(parentId)
        .appendChild(tables[tables.length - 1].tableContainer);
}

document
    .getElementById("dimensionButton")
    .addEventListener("input", function (e) {
        if (e.target.value > 9) {
            document.getElementById("dimensionButton").value = 9
        }
        else if (e.target.value < 2) {
            document.getElementById("dimensionButton").value = 2
        }
    
        for (let i = 0; i < tables.length; i++) {
            tables[i].setNColumns(e.target.value)
            tables[i].setNRows(e.target.value)
        }
    
        tables[1].setData(getUnitMatrix(e.target.value));
        RowOperations = adaptComboboxes(RowOperations, tables[0], e.target.value )
        updateRowOperations(RowOperations, dimension, e.target.value);
        dimension = e.target.value;
    });

document
    .getElementById("calculateSolutionButton")
    .addEventListener("click", function () {
        try {
            let coefMatrix = tables[0].getData();
            let solMatrix = tables[1].getData();
            [coefMatrix, solMatrix] = gaussElimination(coefMatrix, solMatrix, true);
            tables[2].setData(solMatrix);
            tables[3].setData(coefMatrix);
        } catch (e) {
            alert("Inversenberechnung nicht möglich");
        }
    });

document
    .getElementById("adaptResult")
    .addEventListener("click", function () {
        tables[0].setData(tables[2].getData());
        tables[1].setData(tables[3].getData());
    });


document
    .getElementById("calculateButton")
    .addEventListener("click", function () {
        for (let i = 0; i < RowOperations.length; i++) {
            let matrix = tables[0].getData();
            let secondMatrix = tables[1].getData();
    
            if (RowOperations[i].enabled) {
                let newMatrix       = RowOperations[i].performRowOperation(matrix);
                let newSecondMatrix = RowOperations[i].performRowOperation(secondMatrix);
    
                tables[2].setRow(i, newMatrix);
                tables[3].setRow(i, newSecondMatrix);
            } else {
                tables[2].setRow(i, matrix);
                tables[3].setRow(i, secondMatrix);
            }
        }
});

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
