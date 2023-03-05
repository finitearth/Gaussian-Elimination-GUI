import { RowOperation } from "./rowoperation.js";

export function addCombobox(id, RowOperations, table) {
    RowOperations.push(new RowOperation(id, table));

    const table_element = document.createElement("th");
    table_element.id = "Operation";

    document.getElementById("table_row").appendChild(table_element);
    document
        .getElementById("Operation")
        .appendChild(RowOperations[RowOperations.length - 1].comboBoxElement);

    return RowOperations;
}

export function removeCombobox(id, rowOperations) {
    document.getElementById("combobox_" + (id - 1)).remove();
    rowOperations.pop();

    return rowOperations;
}

export function adaptComboboxes(rowOperations, table, n) {
    while (rowOperations.length < n) {
        rowOperations = addCombobox(("combobox_"+rowOperations.length), rowOperations, table);
    }
    while (rowOperations.length > n) {
        rowOperations = removeCombobox((rowOperations.length-1), rowOperations);
    }

    return rowOperations;
}

export function updateRowOperations(rowOperations, dimension, n) {
    for (let i = 0; i < rowOperations.length; i++) {
        if (rowOperations[i].enabled) {
            rowOperations[i].setNRowDropdownSelectOptions(dimension, n);
        }
    }
    
}