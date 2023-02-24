import { designConfig } from "./config.js";
import { stringToFraction } from "./utils.js";
import { Matrix } from "./matrix.js";
import { Fraction } from "./fraction.js";

export class Table {
    constructor(id, showButtons = true) {
        
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
            { name: "+ R",       id: "RowAdder",      function: this.addRow },
            { name: "+ C",    id: "ColumnAdder",   function: this.addColumn },
            { name: "- R",       id: "RowRemover",    function: this.removeRow },
            { name: "- C",    id: "ColumnRemover", function: this.removeColumn }
        ];

        buttons.forEach(button => {
            const buttonElement = document.createElement("button");
            // add css class
            buttonElement.classList.add("table-button");
            buttonElement.textContent = button.name;
            buttonElement.id = button.id;
            buttonElement.addEventListener("click", button.function.bind(this));
            buttonsContainer.appendChild(buttonElement);
            if (!showButtons) {
                buttonElement.style.display = "none";
            }
        });

        this.tableContainer = document.createElement("div");
        this.tableContainer.appendChild(this.tableElement);
        this.tableContainer.appendChild(buttonsContainer);
    }

    setNRows(nRows, force=false) {
        while (this.rows.length < nRows) {
            this.addRow(force);
        }
        while (this.rows.length > nRows) {
            this.removeRow(force);
        }
    }

    setNColumns(nColumns, force=false) {
        while (this.nColumns < nColumns) {
            this.addColumn(force);
        }
        while (this.nColumns > nColumns) {
            this.removeColumn(force);
        }
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

    addRow(force=false) {
        if ((this.rows.length > designConfig.maxRows) && (!force)) {
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

    addColumn(force=false) {
        if ((this.nColumns > designConfig.maxColumns) && (!force)) {
            return;
        }
        this.nColumns += 1;
        for (let i = 0; i < this.rows.length; i++) {
            const cell = this.addCell(i, this.nColumns - 1);
            this.rows[i].appendChild(cell);
        }
    }

    removeRow(force=false) {
        if ((this.rows.length <= designConfig.minRows) && (!force)) {
            return;
        }
        this.rows.pop();
        this.tableBody.removeChild(this.tableBody.lastChild);
    }

    removeColumn(force=false) {
        if ((this.nColumns <= designConfig.minColumns) && (!force)) {
            return;
        }
        this.nColumns -= 1;
        for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].removeChild(this.rows[i].lastChild);
        }
    }

    setData(matrix) {
        // if matrix is fraction, convert it to a matrix
        if (matrix instanceof Fraction) {
            matrix = new Matrix([[matrix]]);
        }

        // resize according to matrix size
        this.setNRows(matrix.nRows, true);
        this.setNColumns(matrix.nColumns, true);

        let data = matrix.array;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                let input = this.rows[i].childNodes[j].childNodes[0];
                input.value = data[i][j].stringify();
            }
        }
    }

    setRow(iRow, matrix) {
        for (let i = 0; i < matrix.array[0].length; i++) {
            let input = this.rows[iRow].childNodes[i].childNodes[0];
            input.value = matrix.array[iRow][i].stringify();
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

    disableInput() {
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                let input = this.rows[i].childNodes[j].childNodes[0];
                input.disabled = true;
            }
        }
    }

    enableInput() {
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                let input = this.rows[i].childNodes[j].childNodes[0];
                input.disabled = false;
            }
        }
    }

    toDecimal() {
        console.log("Converting to decimal")
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                let input = this.rows[i].childNodes[j].childNodes[0];
                let val = input.value;
                val = stringToFraction(val);
                input.value = val.toDecimal();
            }
        }
    }

    toFraction() {
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                let input = this.rows[i].childNodes[j].childNodes[0];
                let val = input.value;
                val = stringToFraction(val);
                input.value = val.stringify();
            }
        }
    }
    
}
