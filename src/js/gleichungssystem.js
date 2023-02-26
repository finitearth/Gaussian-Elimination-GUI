import { Table } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { addKeyDownListener } from "./utils.js";
import { generateMatrix } from "./generateExercise.js"; 
import { getUnitMatrix } from "./utils.js";
function createTable(id) {
    let table = new Table(id, false);
    document.getElementById(id).appendChild(table.tableContainer);
    return table;
}

// create Tables
let coefTable = createTable("coefTable");
let solTable = createTable("solTable");
solTable.setNColumns(1, true);
let resCoefTable = createTable("resCoefTable");
resCoefTable.disableInput();
let resSolTable = createTable("resSolTable");
resSolTable.setNColumns(1, true);
resSolTable.disableInput();
let tables = [coefTable, solTable, resCoefTable, resSolTable];

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
    resSolTable.setNColumns(numberResultVectors);
});


// decimal conversion
document
    .getElementById("convertToDecimal")
    .addEventListener("click", function () {
        tables.forEach(table => {
            table.toDecimal();
        });
    });

// generate excercise
document.getElementById("generateExercise").addEventListener("click", function () {
    let coefMatrix = generateMatrix(1);
    let solMatrix = generateMatrix(1);

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

    


addKeyDownListener(tables, true);
