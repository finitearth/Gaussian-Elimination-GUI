import {
    Table,
    addKeyDownListener,
    clearTables,
} from "../intermediate/table.js";
import { calculate } from "../logic/equationParser.js";
import {
    setEventListenerFunction,
} from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";
import { InvalidInputException } from "../exceptions.js";
import { getEmptyMatrix } from "../logic/matrix.js";

// =========== Tables ===========

/**
 * Adds a new table to the document.
 * Prevents adding more tables when there are already 26 tables.
 */
function addTable() {
    if (tables.length > 25) return;

    // Create a new table row
    let tableRow = document.createElement("tr");

    // Create a table container and add it to the document
    let tableContainer = document.createElement("table");
    getById("table").appendChild(tableContainer);

    // Create a cell for the table label (e.g., A =)
    let letterCell = document.createElement("td");
    let letter = String.fromCharCode(65 + tables.length);
    letterCell.innerHTML = `${letter} =`;
    letterCell.className = "letter";
    tableRow.appendChild(letterCell);

    // Create a cell for the table content
    let contentCell = document.createElement("td");
    contentCell.id = `table-${tables.length}`;
    tableRow.appendChild(contentCell);

    // Append the table row to the table container
    tableContainer.appendChild(tableRow);
    getById("table").appendChild(tableContainer);

    // Create a new Table instance and add buttons
    let newTable = new Table(contentCell.id);
    newTable.addButtons();
    tables.push(newTable);
}

/**
 * Removes the last table from the document and table array.
 * Prevents removing tables when there are only 2 tables remaining.
 */
function removeTable() {
    if (tables.length <= 2) {
        return;
    }
    tables.pop();
    getById("table").removeChild(getById("table").lastChild);

    tableContainers.pop();
}

// Initialize tables and tableContainers arrays
let tables = [];
let tableContainers = [];
for (let i = 0; i < 2; i++) {
    addTable();
}

// Create a result table and disable input
let resultTable = new Table("table-result", false);
resultTable.disableInput();


// =========== Event listeners ===========

// Add event listener to the "Add Table" button
getById("button-add-table").addEventListener("click", addTable);

// Add event listener to the "Remove Table" button
getById("remove-table").addEventListener("click", removeTable);

// Set event listener for the "Calculate" button
setEventListenerFunction("button-calculate", tables, [resultTable], () => {
    let equation = getById("input-equation").value;
    try {
        let result = calculate(equation, tables);
    }
    catch (e) {
        let result = getEmptyMatrix(3, 3);
        throw new InvalidInputException("Invalide Berechnungsoperationen!")
    }
    return [result];
});

// Variable to track conversion button status
let conversionButtonchecked = false;

// Add event listener to the "Convert Representation" button
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonchecked = !conversionButtonchecked;
    resultTable.convertRepresentation(conversionButtonchecked);
});

// Add keydown listener to tables
addKeyDownListener(tables);

// Add event listener to the "Convert Representation" button for the result table
getById("button-representation-conversion").addEventListener("click", () => {
    resultTable.convertRepresentation(conversionButtonchecked);
});

// Add event listener to the "Clear" button
getById("button-clear").addEventListener("click", () => {
    clearTables(tables);
    clearTables([resultTable]);
    let l = tables.length - 2;
    for (let i = 0; i < l; i++) {
        removeTable();
    }

    getById("input-equation").value = "";
});





