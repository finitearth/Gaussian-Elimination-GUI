import { Table } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";

var tables = [];
function addTable() {
    tables.push(new Table(tables.length, false));
    document.getElementById("table_element_"+tables.length).appendChild(tables[tables.length - 1].tableContainer);
}

function calculateSolution() {
    let coefMatrix = tables[0].getData();
    console.log(coefMatrix.stringify());
    let solMatrix = tables[1].getData();
    console.log(solMatrix.stringify());
    solMatrix = gaussElimination(coefMatrix, solMatrix);
    console.log(solMatrix.stringify());
    tables[2].setData(solMatrix.array);
}

for (let i = 0; i < 3; i++) {
    addTable();
}

tables[tables.length-1].disableInput();

// add eventlistener to berechnen button
document.getElementById("calculate").addEventListener("click", calculateSolution);