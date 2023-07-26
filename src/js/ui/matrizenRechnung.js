import { Table, addKeyDownListener, clearTables } from "../intermediate/table.js";
import { calculate } from "../logic/equationParser.js";
import { 
    setEventListenerFunction,
    validate,
 } from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";

// =========== Tables ===========
function addTable() {
    if (tables.length > 25)
        return;
        
    let tableRow = document.createElement("tr");
    
    let tableContainer = document.createElement("table");
    getById("table").appendChild(tableContainer);
    
    let letterCell = document.createElement("td");
    let letter = String.fromCharCode(65 + tables.length);
    letterCell.innerHTML = `${letter} =`;
    tableRow.appendChild(letterCell);
    
    let contentCell = document.createElement("td");
    contentCell.id = `table-${tables.length}`;
    tableRow.appendChild(contentCell);

    tableContainer.appendChild(tableRow);
    getById("table").appendChild(tableContainer);

    let newTable = new Table(contentCell.id);
    newTable.addButtons();
    tables.push(newTable);
}


function removeTable() {
    if (tables.length <= 2) {
        return;
    }
    tables.pop();
    getById("table").removeChild(getById("table").lastChild);
    
    tableContainers.pop();

}

let tables = [];
let tableContainers = [];
for (let i = 0; i < 2; i++) {
    addTable();
}

let resultTable = new Table("table-result", false);
resultTable.disableInput();

// =========== Event listeners ===========
getById("button-add-table").addEventListener("click", addTable);
getById("remove-table").addEventListener("click", removeTable);

setEventListenerFunction("button-calculate", tables, [resultTable], () => {
    let equation = getById("input-equation").value;
    return [calculate(equation, tables)];
});

let conversionButtonchecked = false;
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonchecked = !conversionButtonchecked;
    resultTable.convertRepresentation(conversionButtonchecked);
});


addKeyDownListener(tables);
getById("button-representation-conversion").addEventListener("click", () => {
    resultTable.convertRepresentation(conversionButtonchecked);
});

getById("button-clear").addEventListener("click", () => {
    clearTables(tables);
    clearTables([resultTable])
    let l = tables.length - 2;
    for (let i = 0; i < l; i++) {
        removeTable();
    }

    getById("input-equation").value = "";

});

let validPattern = /^[-+]?[\d]*[.,\/]?[\d]*$/;

tables.forEach(table => {
   getById(table.id).addEventListener("keydown", () => {
   validate(validPattern)
   });
});




