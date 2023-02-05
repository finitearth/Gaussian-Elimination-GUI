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
        for (let i = 0; i < designConfig.nInitRows; i++){this.addRow();}
    
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttons";

        const buttons = [
            { name: "Add Row",       id: "RowAdder",      function: this.addRow },
            { name: "Add Column",    id: "ColumnAdder",   function: this.addColumn },
            { name: "Remove Row",    id: "RowRemover",    function: this.removeRow },
            { name: "Remove Column", id: "ColumnRemover", function: this.removeColumn },
            { name: "Save",          id: "Saver",         function: this.getData }
        ];

        buttons.forEach(button => {
            const buttonElement = document.createElement("button");
            buttonElement.textContent = button.name;
            buttonElement.id = button.id;
            buttonElement.addEventListener("click", button.function.bind(this));
            buttonsContainer.appendChild(buttonElement);
        });
    
        this.tableContainer = document.createElement("div");
        this.tableContainer.appendChild(this.tableElement);
        this.tableContainer.appendChild(buttonsContainer);
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
        if (this.rows.length > designConfig.maxRows) {return;}
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
        if (this.nColumns > designConfig.maxColumns) {return;}
        this.nColumns += 1;
        for (let i = 0; i < this.rows.length; i++) {
            const cell = this.addCell(i, this.nColumns - 1);
            this.rows[i].appendChild(cell);
        }
    }

    removeRow() {
        if (this.rows.length <= designConfig.minRows) {return;}
        this.rows.pop();
        this.tableBody.removeChild(this.tableBody.lastChild);
        
    }

    removeColumn() {
        if (this.nColumns <= designConfig.minColumns) {return;}
        this.nColumns -= 1;
        for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].removeChild(this.rows[i].lastChild);
        }
    }

    getData() {
        console.log("Getting data")
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
        console.log(data)
        return data;
    }
}