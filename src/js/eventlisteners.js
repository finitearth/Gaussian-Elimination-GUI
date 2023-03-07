import { adaptComboboxes } from "./rowoperation.js";
import { designConfig } from "./config.js";

export function setEventListenerFunction(
    buttonId,
    inputTables,
    outputTables,
    operation
) {
    let button = document.getElementById(buttonId);
    button.onclick = () => {
        try {
            let inputMatrices = inputTables.map(table => table.getData());
            let outputMatrices = operation(...inputMatrices);
            outputTables.forEach((table, index) =>
                table.setData(outputMatrices[index])
            );
        } catch (error) {
            // alert(error);
            throw error;
        }
    };
}

export function listenTableDimension(
    inputId,
    tables,
    rowOperations,
    rowsOrCols,
    allowSmaller = false
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
                    rowOperations = adaptComboboxes(
                        rowOperations,
                        table,
                        numberEquations
                    );
                }
            } else if (rowsOrCols === "cols") {
                table.setNColumns(numberEquations);
            }
        });
    });
}
