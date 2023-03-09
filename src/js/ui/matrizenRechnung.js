import { Table, addKeyDownListener } from "../intermediate/table.js";
import { calculate } from "../logic/equationParser.js";
import { setEventListenerFunction } from "../intermediate/eventlisteners.js";

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

let resultTable = new Table("table-result", false);
resultTable.disableInput();
document.getElementById("table-result").appendChild(resultTable.tableContainer);

// =========== Event listeners ===========
document.getElementById("button-add-table").addEventListener("click", addTable);
document
    .getElementById("remove-table")
    .addEventListener("click", removeTable);

setEventListenerFunction("button-calculate", tables, [resultTable], () => {
    let equation = document.getElementById("input-equation").value;
    return [calculate(equation, tables)];
});

addKeyDownListener(tables);

document
    .getElementById("button-representation-conversion")
    .addEventListener("click", function () {
        resultTable.convertRepresentation(this.checked);
    });
