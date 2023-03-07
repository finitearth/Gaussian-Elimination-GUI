import { adaptComboboxes } from "./rowoperation.js";

export function addEventListenerCalculation(buttonId, inputTables, outputTables, operation){
    let button = document.getElementById(buttonId);
    button.onclick = () => {
        try {
            let inputMatrices = inputTables.map(table => table.getData());
            let outputMatrices = operation(...inputMatrices);
            outputTables.forEach((table, index) => table.setData(outputMatrices[index]));
        } catch (error) {
            // alert(error);
            throw error;
        }
    };
}

export function listenTableDimension(inputId, tables, rowOperations, rowsOrCols) {
    let input = document.getElementById(inputId);
    input.addEventListener("input", e => {
        if (e.target.value > 9) {
            e.target.value = 9;
        }
        else if (e.target.value < 2) {
            e.target.value = 2;
        }
        let numberEquations = e.target.value;
        tables.forEach(table => {
            if (rowsOrCols === "rows") {
                table.setNRows(numberEquations);
                rowOperations = adaptComboboxes(
                    rowOperations,
                    table,
                    numberEquations
                );
            }
            else if (rowsOrCols === "cols") {
                table.setNColumns(numberEquations);
            }
        });
    });
}