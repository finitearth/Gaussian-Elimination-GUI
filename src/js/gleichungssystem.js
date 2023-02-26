import { Table } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { addKeyDownListener } from "./utils.js";

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

addKeyDownListener(tables, true);
