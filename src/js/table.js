import { designConfig } from "./config.js";
import { stringToFraction } from "./utils.js";
import { Matrix } from "./matrix.js";

export class Table {
    constructor(id) {
        this.id = id;
        this.tableElement = document.createElement("table");
        this.tableElement.id = id;
        this.tableBody = document.createElement("tbody");
        this.tableBody.id = "tableRows";
        this.tableElement.appendChild(this.tableBody);

        this.nColumns = designConfig.nInitColumns;
        this.rows = [];
        for (let i = 0; i < designConfig.nInitRows; i++) {
            this.addRow();
        }

        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttons";
        // add css class button_container
        // buttonsContainer.classList.add("button_container");

        const buttons = [
            { name: "+ R", id: "RowAdder", function: this.addRow },
            { name: "+ C", id: "ColumnAdder", function: this.addColumn },
            { name: "- R", id: "RowRemover", function: this.removeRow },
            { name: "- C", id: "ColumnRemover", function: this.removeColumn },
        ];

        buttons.forEach(button => {
            const buttonElement = document.createElement("button");
            // add css class
            buttonElement.classList.add("table_button");
            buttonElement.textContent = button.name;
            buttonElement.id = button.id;
            buttonElement.addEventListener("click", button.function.bind(this));
            buttonsContainer.appendChild(buttonElement);
        });

        this.tableContainer = document.createElement("div");
        this.tableContainer.appendChild(this.tableElement);
        this.tableContainer.appendChild(buttonsContainer);

        document.addEventListener("keydown", function (e) {
            let activeCellId = document.activeElement.id;
            console.log(activeCellId);
            let row;
            let column;
            let tableId;

            if (activeCellId == "") {
                tableId = 0;
                row = 0;
                column = 0;
            } else {
                tableId = Number(activeCellId.split("-")[0]);
                row = Number(activeCellId.split("-")[1]);
                column = Number(activeCellId.split("-")[2]);
            }

            if (e.code == "ArrowUp" && row > 0) {
                row -= 1;
            } else if (e.code == "ArrowUp" && tableId > 0) {
                tableId -= 1;
                row = tables[tableId].rows.length - 1;
            } else if (
                e.code == "ArrowDown" &&
                row < tables[0].rows.length - 1
            ) {
                row += 1;
            } else if (e.code == "ArrowDown" && tableId < tables.length - 1) {
                tableId += 1;
                row = 0;
            } else if (e.code == "ArrowLeft" && column > 0) {
                column -= 1;
            } else if (
                e.code == "ArrowRight" &&
                column < tables[0].nColumns - 1
            ) {
                column += 1;
            }

            document.getElementById(`${tableId}-${row}-${column}`).focus();
        });
    }

    addCell(rowId, columnId) {
        const cell = document.createElement("td");
        const input = document.createElement("input");
        input.value = "";
        input.size = designConfig.inputFieldSize;
        input.width = designConfig.inputFieldSize;
        input.id = `${this.id}-${rowId}-${columnId}`;
        // center cell input
        input.style.textAlign = "center";
        cell.appendChild(input);
        return cell;
    }

    addRow() {
        if (this.rows.length > designConfig.maxRows) {
            return;
        }
        const rowId = this.rows.length;
        const row = document.createElement("tr");
        row.id = rowId;

        for (let i = 0; i < this.nColumns; i++) {
            const cell = this.addCell(rowId, i);
            row.appendChild(cell);
        }

        this.rows.push(row);
        this.tableBody.appendChild(row);
    }

    addColumn() {
        if (this.nColumns > designConfig.maxColumns) {
            return;
        }
        this.nColumns += 1;
        for (let i = 0; i < this.rows.length; i++) {
            const cell = this.addCell(i, this.nColumns - 1);
            this.rows[i].appendChild(cell);
        }
    }

    removeRow() {
        if (this.rows.length <= designConfig.minRows) {
            return;
        }
        this.rows.pop();
        this.tableBody.removeChild(this.tableBody.lastChild);
    }

    removeColumn() {
        if (this.nColumns <= designConfig.minColumns) {
            return;
        }
        this.nColumns -= 1;
        for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].removeChild(this.rows[i].lastChild);
        }
    }

    getData() {
        console.log("Getting data");
        let data = [];
        for (let i = 0; i < this.rows.length; i++) {
            let row = [];
            for (let j = 0; j < this.nColumns; j++) {
                let input = this.rows[i].childNodes[j].childNodes[0];
                let val = input.value;
                val = stringToFraction(val);
                row.push(val);
            }
            data.push(row);
        }
        data = new Matrix(data);
        console.log(data);
        return data;
    }
}
