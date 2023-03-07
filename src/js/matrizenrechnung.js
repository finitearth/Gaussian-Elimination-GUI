import { Table, addKeyDownListener } from "./table.js";
import { calculate } from "./matrizenRechnungLogic.js";
import { setEventListenerFunction } from "./eventlisteners.js";


function addTable() {
    if (tables.length > 25) {
        return;
    }
    let table = new Table(tables.length);
    tables.push(table);

    let container = document.createElement("table");
    // append new row to container
    let row = document.createElement("tr");

    let name = document.createElement("td");
    name.className = "matrix-name";
    let ithLetter = String.fromCharCode(64 + tables.length);
    name.innerHTML = `${ithLetter} =`;

    row.appendChild(name);
    let content = document.createElement("td");
    content.appendChild(tables[tables.length - 1].tableContainer);
    row.appendChild(content);
    container.appendChild(row);

    document.getElementById("table").appendChild(container);
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

document.getElementById("addTableButton").addEventListener("click", addTable);
document
    .getElementById("removeTableButton")
    .addEventListener("click", removeTable);
    
// calculate Button
setEventListenerFunction(
    "calculateButton",
    tables,
    [resultTable],
    () => {
        let equation = document.getElementById("equationInput").value;
        return [calculate(equation, tables)];
    }
);



addKeyDownListener(tables);

document
    .getElementById("convertToDecimal")
    .addEventListener("click", function () {
        if (this.checked) {
            resultTable.toDecimal();
        } else {
            resultTable.toFraction();
        }
    });
