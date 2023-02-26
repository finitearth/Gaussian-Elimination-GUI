import { Table } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { addKeyDownListener } from "./utils.js";
import { generateMatrix } from "./generateExercise.js"; 
import { addCombobox } from "./utils.js";
import { adaptComboboxes } from "./utils.js";

function createTable(id) {
    let table = new Table(id, false);
    document.getElementById(id).appendChild(table.tableContainer);
    return table;
}

// create Tables
let coefTable = createTable("coefTable");
let solTable = createTable("solTable");
let resultTable = createTable("resultTable");
resultTable.disableInput();
let tables = [coefTable, solTable, resultTable];
let rowOperations = []; 

// creating initial comboboxes
for ( let i = 0; i < coefTable.rows.length; i++ ){
    rowOperations = addCombobox(("combobox_"+i), rowOperations, coefTable);
}

// calc button
document
    .getElementById("calculateSolutionButton")
    .addEventListener("click", function () {
        try {
            let coefMatrix = coefTable.getData();
            let solMatrix = solTable.getData();
            solMatrix = gaussElimination(coefMatrix, solMatrix);
            resultTable.setData(solMatrix);
        } catch (error) {
            alert(error);
        }
    });
    
// number of rows
document.getElementById("nr-eq").addEventListener("input", (e) => {
    let numberEquations = e.target.value;
    tables.forEach(table => {
        table.setNRows(numberEquations);
        rowOperations = adaptComboboxes(rowOperations, coefTable, numberEquations);
    });
});

// number of cols in coeff matrix
document.getElementById("nr-var").addEventListener("input", (e) => {
    let numberVariables = e.target.value;
    coefTable.setNColumns(numberVariables);
});

// number of cols solution matrix
document.getElementById("nr-b").addEventListener("input", (e) => {
    let numberResultVectors = e.target.value;
    solTable.setNColumns(numberResultVectors);
    resultTable.setNColumns(numberResultVectors);
});


// decimal conversion
document
    .getElementById("convertToDecimal")
    .addEventListener("click", function () {
        resultTable.toDecimal();
    });

// generate excercise
document.getElementById("generateExercise").addEventListener("click", function () {
    let coefMatrix = generateMatrix(1);
    let solMatrix = generateMatrix(1);

    coefTable.setData(coefMatrix);
    solTable.setData(solMatrix);
});

addKeyDownListener(tables, true);
