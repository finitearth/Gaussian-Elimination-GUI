import { Table } from "./table.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { addKeyDownListener } from "./utils.js";

var tables = [];
for (let i = 0; i < 3; i++) {
    tables.push(new Table(tables.length, false));
    document
        .getElementById("table_element_" + tables.length)
        .appendChild(tables[tables.length - 1].tableContainer);
}

tables[2].disableInput();

// number of rows
document.getElementById("nr-eq").addEventListener("input", function (e) {
    let numberEquations = e.target.value;
    tables.forEach(table => {
        table.setNRows(numberEquations);
    });
});

// number of cols in coeff matrix
document.getElementById("nr-var").addEventListener("input", function (e) {
    let numberVariables = e.target.value;
    tables[0].setNColumns(numberVariables);
});

// number of cols solution matrix
document.getElementById("nr-b").addEventListener("input", function (e) {
    let numberResultVectors = e.target.value;
    tables[1].setNColumns(numberResultVectors);
    tables[2].setNColumns(numberResultVectors);
});

// calc button
document
    .getElementById("calculateSolutionButton")
    .addEventListener("click", function () {
        try {
            let coefMatrix = tables[0].getData();
            let solMatrix = tables[1].getData();
            solMatrix = gaussElimination(coefMatrix, solMatrix);
            tables[2].setData(solMatrix);
        } catch (error) {
            alert(error);
        }
    });

// decimal conversion
document
    .getElementById("convertToDecimal")
    .addEventListener("click", function () {
        tables[2].toDecimal();
    });

addKeyDownListener(tables, true);
