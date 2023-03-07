import { Table, addKeyDownListener } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { generateMatrix } from "./generateExercise.js";
import { getUnitMatrix } from "./matrix.js";
import { addCombobox, adaptComboboxes } from "./rowoperation.js";

function createTable(id, initCols, disableInput) {
    let table = new Table(id, false, initCols);
    if (disableInput) {
        table.disableInput();
    }
    document.getElementById(id).appendChild(table.tableContainer);
    return table;
}

// create Tables
let coefTable = createTable("coefTable");
let solTable = createTable("solTable", 1);
let resCoefTable = createTable("resCoefTable", false, true);
let resSolTable = createTable("resSolTable", 1, true);
let tables = [coefTable, solTable, resCoefTable, resSolTable];
let rowOperations = [];

// creating initial comboboxes
for (let i = 0; i < coefTable.nRows; i++) {
    rowOperations = addCombobox("combobox_" + i, rowOperations, coefTable);
}

// calc button
document
    .getElementById("calculateSolutionButton")
    .addEventListener("click", function () {
        try {
            let coefMatrix = coefTable.getData();
            let solMatrix = solTable.getData();

            solMatrix = gaussElimination(coefMatrix, solMatrix);

            resSolTable.setData(solMatrix);
            resCoefTable.setData(getUnitMatrix(coefMatrix.nRows));
        } catch (error) {
            alert(error);
        }
    });

// number of rows
document.getElementById("nr-eq").addEventListener("input", e => {
    if (e.target.value > 9) {
        document.getElementById("nr-eq").value = 9;
    }
    else if (e.target.value < 2) {
        document.getElementById("nr-eq").value = 2;
    }

    let numberEquations = e.target.value;
    tables.forEach(table => {
        table.setNRows(numberEquations);
        rowOperations = adaptComboboxes(
            rowOperations,
            coefTable,
            numberEquations
        );
    });
});

// number of cols in coeff matrix
document.getElementById("nr-var").addEventListener("input", e => {
    if (e.target.value > 9) {
        document.getElementById("nr-var").value = 9;
    }
    else if (e.target.value < 2) {
        document.getElementById("nr-var").value = 2;
    }
    let numberVariables = e.target.value;
    coefTable.setNColumns(numberVariables);
    resCoefTable.setNColumns(numberVariables);
});

// number of cols solution matrix
document.getElementById("nr-b").addEventListener("input", e => {
    if (e.target.value > 9) {
        document.getElementById("nr-b").value = 9;
    }
    else if (e.target.value < 1) {
        document.getElementById("nr-b").value = 1;
    }
    let numberResultVectors = e.target.value;
    solTable.setNColumns(numberResultVectors, true);
    resSolTable.setNColumns(numberResultVectors, true);
});

// generate excercise
document
    .getElementById("generateExercise")
    .addEventListener("click", function () {
        let coefMatrix = generateMatrix(3, 3);
        let solMatrix = generateMatrix(3, 1);

        coefTable.setData(coefMatrix);
        solTable.setData(solMatrix);
    });

// up button
document.getElementById("up").addEventListener("click", function () {
    let coefMatrix = resCoefTable.getData();
    let solMatrix = resSolTable.getData();
    coefTable.setData(coefMatrix);
    solTable.setData(solMatrix);
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

// "Berechne" Button
document.getElementById("calculate").addEventListener("click", function () {
    for (let i = 0; i < rowOperations.length; i++) {
        if (rowOperations[i].enabled) {
            let newCoefMatrix = rowOperations[i].performRowOperation(
                coefTable.getData()
            );
            let newSolMatrix = rowOperations[i].performRowOperation(
                solTable.getData()
            );

            resCoefTable.setRow(i, newCoefMatrix);
            resSolTable.setRow(i, newSolMatrix);
        } else {
            resCoefTable.setRow(i, coefTable.getData());
            resSolTable.setRow(i, solTable.getData());
        }
    }
});

addKeyDownListener(tables, true);
