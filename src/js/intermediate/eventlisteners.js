import { adaptComboboxes, updateRowOperations } from "./rowoperation.js";
import { designConfig } from "../config.js";
import { getById } from "./getElement.js";

export function modifyDimListener(tables) {
    ["addrow", "addcol", "removerow", "removecol"].forEach(b => {
        getById(b).addEventListener("click", () => {
            let nRows = Number(getById("input-nr-rows").value);
            let nCols = Number(getById("input-nr-cols").value);
            if (b == "addrow") {
                nRows++;
            } else if (b == "addcol") {
                nCols++;
            } else if (b == "removerow") {
                nRows--;
            } else if (b == "removecol") {
                nCols--;
            }
            nRows = Math.min(nRows, designConfig.maxRows);
            nCols = Math.min(nCols, designConfig.maxColumns);
            nRows = Math.max(nRows, designConfig.minRows);
            nCols = Math.max(nCols, designConfig.minColumns);
            getById("input-nr-rows").value = nRows;
            getById("input-nr-cols").value = nCols;
            tables.forEach(table => {
                table.setNRows(nRows);
                table.setNColumns(nCols);
            });
        });
    });
}

export function setEventListenerFunction(
    buttonId,
    inputTables,
    outputTables,
    operation,
    alertOnError = true
) {
    let button = getById(buttonId);
    button.addEventListener("click", () => {
        try {
            let inputMatrices = inputTables.map(table => table.getData());
            let outputMatrices = operation(...inputMatrices);
            outputTables.forEach((table, index) =>
                table.setData(outputMatrices[index])
            );
        } catch (error) {
            if (alertOnError) {
                alert(error);
                console.error(error);
            }
            else throw error;
        }
    });
}

export function listenTableDimension(
    inputId,
    tables,
    rowOperations,
    rowsOrCols,
    allowSmaller = false,
    desCharacter = null,
    rowDescription = false
) {
    let input = document.getElementById(inputId);
    input.addEventListener("input", e => {
        e.target.value = Math.min(e.target.value, designConfig.maxRows);
        let min = allowSmaller ? 1 : designConfig.minRows;
        e.target.value = Math.max(e.target.value, min);
        let numberEquations = e.target.value;
        tables.forEach(table => {
            if (rowsOrCols === "rows") {
                table.setNRows(numberEquations);
                if (rowOperations.length > 0) {
                    rowOperations = updateRowOperations(
                        rowOperations,
                        rowOperations.length,
                        numberEquations
                    );

                    rowOperations = adaptComboboxes(
                        rowOperations,
                        table,
                        numberEquations
                    );
                    if (rowDescription) {
                        table.addRowDescription(rowDescription);
                    }
                }
            } else if (rowsOrCols === "cols") {
                table.setNColumns(numberEquations);
                if (desCharacter) {
                    table.addColumnDescription(desCharacter);
                }
            }
        });
    });
}


export function validate(validPattern) {
    let focused = document.activeElement;
    let valid = focused.value.match(validPattern);

    if (!valid) {
        focused.classList.add("invalid");
    } else {
        focused.classList.remove("invalid");
    }
}
