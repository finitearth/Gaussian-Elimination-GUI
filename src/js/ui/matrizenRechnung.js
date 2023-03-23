import { Table, addKeyDownListener } from "../intermediate/table.js";
import { calculate } from "../logic/equationParser.js";
import { setEventListenerFunction } from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";

// =========== Tables ===========
function addTable() {
    if (tables.length > 25) {
        return;
    }
    let newTable = new Table(tables.length);
    newTable.addButtons();
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
    getById("table").appendChild(tableContainer);
}

function removeTable() {
    if (tables.length <= 2) {
        return;
    }
    tables.pop();
    getById("table").removeChild(getById("table").lastChild);
}

let tables = [];
for (let i = 0; i < 2; i++) {
    addTable();
}

let resultTable = new Table("table-result", false);
resultTable.disableInput();
getById("table-result").appendChild(resultTable.tableContainer);

// =========== Event listeners ===========
getById("button-add-table").addEventListener("click", addTable);
getById("remove-table").addEventListener("click", removeTable);

setEventListenerFunction("button-calculate", tables, [resultTable], () => {
    let equation = getById("input-equation").value;
    return [calculate(equation, tables)];
});

addKeyDownListener(tables);

getById("button-representation-conversion").addEventListener("click", () => {
    resultTable.convertRepresentation(this.checked);
});
