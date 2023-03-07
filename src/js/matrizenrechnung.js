import { Table, addKeyDownListener } from "./table.js";
import { calculate } from "./matrizenRechnungLogic.js";
import { setEventListenerFunction } from "./eventlisteners.js";

// =========== Tables ===========
function addTable() {
    if (tables.length > 25) {
        return;
    }
    let newTable = new Table(tables.length);
    tables.push(newTable);

    let tableContainer = document.createElement("table");
    let tableRow = document.createElement("tr");
    let letterCell = document.createElement("td");
    let letter = String.fromCharCode(64 + tables.length);
    letterCell.innerHTML = `${letter} =`;
    tableRow.appendChild(letterCell);
    let contentCell = document.createElement("td");
    contentCell.appendChild(tables[tables.length - 1].tableContainer);
    tableRow.appendChild(contentCell);
    tableContainer.appendChild(tableRow);
    document.getElementById("table").appendChild(tableContainer);
}

function removeTable() {
    if (tables.length <= 2) {
        return;
    }

    tables.pop();
    document
        .getElementById("table")
        .removeChild(document.getElementById("table").lastChild);
}

let tables = [];
for (let i = 0; i < 2; i++) {
    addTable();
}

let resultTable = new Table("resultTable", false);
resultTable.disableInput();
document.getElementById("resultTable").appendChild(resultTable.tableContainer);

// =========== Event listeners ===========
document.getElementById("addTableButton").addEventListener("click", addTable);
document
    .getElementById("removeTableButton")
    .addEventListener("click", removeTable);

setEventListenerFunction("calculateButton", tables, [resultTable], () => {
    let equation = document.getElementById("equationInput").value;
    return [calculate(equation, tables)];
});

addKeyDownListener(tables);

document
    .getElementById("convertToDecimal")
    .addEventListener("click", function () {
        resultTable.convertRepresentation(this.checked);
    });
