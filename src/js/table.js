import { designConfig } from "./config.js";
import { stringToFraction } from "./utils.js";
import { Matrix } from "./matrix.js";
import { Fraction } from "./fraction.js";

/**
 *  Represents a table object with functionality to add, remove rows and columns dynamically.
 * @class
 * @constructor
 * @param {string} id - The id of the table to be created.
 * @param {boolean} [showButtons=true] - Optional parameter to determine whether to display buttons to add/remove rows and columns.
 */
export class Table {
    constructor(id, showButtons = true, initCols) {
        this.id = id;
        this.enabled = true;
        this.fractionArray = null;
        this.tableElement = document.createElement("table");
        this.tableElement.id = id;
        this.tableBody = document.createElement("tbody");
        this.tableBody.id = "tableRows";
        this.tableElement.appendChild(this.tableBody);

        this.nColumns = initCols || designConfig.nInitColumns;
        this.rows = [];
        for (let i = 0; i < designConfig.nInitRows; i++) {
            this.addRow();
        }

        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttons";

        const buttons = [
            { name: "+ R", id: "RowAdder", function: (e) => this.addRow(false) },
            { name: "+ C", id: "ColumnAdder", function: (e) => this.addColumn(false) },
            { name: "- R", id: "RowRemover", function: (e) => this.removeRow(false) },
            { name: "- C", id: "ColumnRemover", function: (e) => this.removeColumn(false) },
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

    /**

    Sets the number of rows in the table.
    @method
    @param {number} nRows - The number of rows to set in the table.
    @param {boolean} [force=false] - Optional parameter to force adding/removing rows even if the current number of rows is greater or less than the desired number of rows.
    */
    setNRows(nRows, force = false) {
        if ((nRows < designConfig.minRows || nRows > designConfig.maxRows) && !force) {
            return;
        }
        while (this.rows.length < nRows) {
            this.addRow(force);
        }
        while (this.rows.length > nRows) {
            this.removeRow(force);
        }
    }

    /**

    Sets the number of columns in the table.
    @method
    @param {number} nColumns - The number of columns to set in the table.
    @param {boolean} [force=false] - Optional parameter to force adding/removing columns even if the current number of columns is greater or less than the desired number of columns.
    */
    setNColumns(nColumns, force = false) {
        if ((nColumns < designConfig.minColumns || nColumns > designConfig.maxColumns)&& !force) {
            return;
        }
        while (this.nColumns < nColumns) {
            this.addColumn(force);
        }
        while (this.nColumns > nColumns) {
            this.removeColumn(force);
        }
    }

    /**
    Adds a cell to the specified row and column in the table.
    @method
    @param {number} rowId - The row index to add the cell to.
    @param {number} columnId - The column index to add the cell to.
    @returns {HTMLTableCellElement} - The newly created cell.
    */
    addCell(rowId, columnId) {
        const cell = document.createElement("td");
        const input = document.createElement("input");
        input.value = "";
        input.size = designConfig.inputFieldSize;
        input.width = designConfig.inputFieldSize;
        input.id = `${this.id}-${rowId}-${columnId}`;
        // center cell input
        input.style.textAlign = "center";
        input.disabled = !this.enabled;
        cell.appendChild(input);
        return cell;
    }

    /**

    Adds a row to the table.
    @method
    @param {boolean} [force=false] - Optional parameter to force adding a row even if the current number of rows is equal to the maximum number of rows allowed in the design config.
    */
    addRow(force = false) {
        if (this.rows.length > designConfig.maxRows && !force) {
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

    /**

    Adds a column to the table.
    @method
    @param {boolean} [force=false] - Optional parameter to force adding a column even if the current number of columns is equal to the maximum number of columns allowed in the design config.
    */
    addColumn(force = false) {
        if (this.nColumns > designConfig.maxColumns && !force) {
            return;
        }
        this.nColumns += 1;
        for (let i = 0; i < this.rows.length; i++) {
            const cell = this.addCell(i, this.nColumns - 1);
            this.rows[i].appendChild(cell);
        }
    }

    /**

    Removes the last row from the table.
    @method
    @param {boolean} [force=false] - Optional parameter to force removing a row even if the current number of rows is equal to the minimum number of rows allowed in the design config.
    */
    removeRow(force = false) {
        if (this.rows.length <= designConfig.minRows && !force) {
            return;
        }
        this.rows.pop();
        this.tableBody.removeChild(this.tableBody.lastChild);
    }

    /**

    Removes the last column from the table.
    @method
    @param {boolean} [force=false] - Optional parameter to force removing a column even if the current number of columns is equal to the minimum number of columns allowed in the design config.
    */
    removeColumn(force = false) {
        if (this.nColumns <= designConfig.minColumns && !force) {
            return;
        }
        this.nColumns -= 1;
        for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].removeChild(this.rows[i].lastChild);
        }
    }

    /**

    Sets the data of the table to the values in the given matrix.
    @method
    @param {Matrix|Fraction} matrix - The matrix to use as the new data for the table. If a Fraction is given, it will be converted to a single-cell Matrix.
    */
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

    /**
     * Set the values of a row in the table with a given matrix.
     * @param {number} iRow - The index of the row to set.
     * @param {Matrix} matrix - The matrix containing the new values for the row.
     */
    setRow(iRow, matrix) {
        for (let i = 0; i < matrix.array[0].length; i++) {
            let input = this.rows[iRow].childNodes[i].childNodes[0];
            input.value = matrix.array[iRow][i].stringify();
        }
    }

    /**
     * Get data from the table and convert it to a Matrix object.
     * Each cell's value is parsed to a fraction before being added to the Matrix.
     * @returns {Matrix} A Matrix object representing the data in the table.
     */
    getData() {
        if (this.fractionArray) {
            return this.fractionArray;
        }
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
        return data;
    }

    /**
     * Disables all input fields in the matrix table.
     */

    disableInput() {
        this.enabled = false;
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                let input = this.rows[i].childNodes[j].childNodes[0];
                input.disabled = true;
            }
        }
    }

    /**
     * Enables all input fields in the matrix table.
     */

    enableInput() {
        this.enabled = true;
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                let input = this.rows[i].childNodes[j].childNodes[0];
                input.disabled = false;
            }
        }
    }

    /**
     * Converts all the input values in the table to their decimal representation and updates the input fields with the new values.
     */
    toDecimal() {
        this.fractionArray = this.getData();
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                let input = this.rows[i].childNodes[j].childNodes[0];
                let val = input.value;
                val = stringToFraction(val);
                input.value = val.toDecimal();
            }
        }
    }

    /**
     * Convert all values in the table to fractions and update the input fields.
     */
    toFraction() {
        if (this.fractionArray) {
            this.setData(this.fractionArray);
            return;
        }
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
