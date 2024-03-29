import { designConfig } from "../config.js";
import { Matrix, getEmptyMatrix } from "../logic/matrix.js";
import { Fraction, stringToFraction } from "../logic/fraction.js";
import { getById } from "./getElement.js";

/**
 * Represents a table object with functionality to add, remove rows and columns dynamically.
 * A Table is a object visually representing the matrix, enabling the user to input.
 * 
 * @class
 * @constructor
 * @param {string} id - The id of the table to be created.
 */
export class Table {
    constructor(id, initCols) {
        this.id = id;
        this.enabled = true;
        this.fractionArray = null;
        this.tableElement = document.createElement("table");
        this.tableElement.id = id;

        this.nColumns = initCols || designConfig.nInitColumns;
        this.nRows = 0;
        this.rows = [];
        for (let i = 0; i < designConfig.nInitRows; i++) {
            this.addRow();
        }

        this.tableContainer = getById(id);

        this.row1 = document.createElement("tr");
        this.row2 = document.createElement("tr");
        this.emptyCell = document.createElement("td");
        this.emptyCell2 = document.createElement("td");
        this.emptyCell3 = document.createElement("td");
        this.buttonsColCell = document.createElement("td"); // td for buttons
        this.buttonsColCell.classList.add("horizontal-align-sizebuttons");
        this.buttonsRowCell = document.createElement("td"); // td for buttons
        this.buttonsRowCell.classList.add("vertical-align-sizebuttons");
        this.tableCell = document.createElement("td");
        this.bracketOpenCell = document.createElement("td"); // td for bracket open
        this.bracketOpenCell.classList.add("matrix-bracket");
        this.bracketOpenCell.classList.add("open");
        this.bracketCloseCell = document.createElement("td"); // td for bracket close
        this.bracketCloseCell.classList.add("matrix-bracket");
        this.bracketCloseCell.classList.add("closed");

        this.row1.appendChild(this.emptyCell);
        this.row1.appendChild(this.emptyCell2);
        this.row1.appendChild(this.buttonsColCell);
        this.row1.appendChild(this.emptyCell3);
        this.row2.appendChild(this.buttonsRowCell);
        this.row2.appendChild(this.bracketOpenCell);
        this.row2.appendChild(this.tableCell);
        this.row2.appendChild(this.bracketCloseCell);
        this.tableCell.appendChild(this.tableElement);

        this.tableContainer.appendChild(this.row1);
        this.tableContainer.appendChild(this.row2);

        this.descriptionColumnId = id + ".description-column";
        this.describtionRowId = id + ".description-row";
    }

    /**
    Sets the number of rows in the table.
    @method
    @param {number} nRows - The number of rows to set in the table.
    */
    setNRows(nRows) {
        while (this.rows.length < nRows) {
            this.addRow();
        }
        while (this.rows.length > nRows) {
            this.removeRow();
        }
    }

    /**
    * Sets the number of columns in the table.
    * @method
    * @param {number} nColumns - The number of columns to set in the table.
    */
    setNColumns(nColumns) {
        while (this.nColumns < nColumns) {
            this.addColumn();
        }
        while (this.nColumns > nColumns) {
            this.removeColumn();
        }
    }

    /**
     * Adds a cell to the specified row and column in the table.
     * @method
     * @param {number} rowId - The row index to add the cell to.
     * @param {number} columnId - The column index to add the cell to.
     * @returns {HTMLTableCellElement} - The newly created cell.
     */
    addCell(rowId, columnId) {
        const cell = document.createElement("td");
        const input = document.createElement("input");
        input.value = "";
        input.size = designConfig.inputFieldSize;
        input.width = designConfig.inputFieldSize;
        input.id = `${this.id}.${rowId}.${columnId}`;
        input.pattern = "^[\\-\\+]{0,1}[\\d]*[.,\\/]{0,1}[\\d]*$";
        // center cell input
        input.style.textAlign = "center";
        input.disabled = !this.enabled;
        cell.appendChild(input);
        // adjust input font size automatically by large inputs
        input.addEventListener("input", () => {
            adjustInputFontSize(input);
        });
        return cell;
    }

    addRowDescription(rowDescription, specialLastRow) {
        if (!rowDescription) {
            // if no rowDescription provided, enumerate rows
            var counter = 0;
            this.tableElement.childNodes.forEach(row => {
                if (row.id !== this.describtionRowId) {
                    counter += 1;
                    if (
                        row.firstChild.id ===
                        this.descriptionColumnId + "." + (counter - 1)
                    ) {
                        row.firstChild.remove();
                    }

                    let rowDes = document.createElement("td");
                    rowDes.id = this.descriptionColumnId + "." + (counter - 1);
                    rowDes.innerText = "(" + counter + ")";

                    if (
                        specialLastRow &&
                        counter ==
                            this.tableElement.childNodes.length -
                                (document.getElementById(
                                    this.describtionRowId
                                ) !=
                                    null)
                    ) {
                        rowDes.innerHTML = specialLastRow;
                    } else {
                        rowDes.innerText = "(" + counter + ")";
                    }

                    row.insertBefore(rowDes, row.firstChild);
                }
            });
        } else {
            // if rowDescription provided, prepend character to each row
            var counter = 0;
            this.tableElement.childNodes.forEach(row => {
                if (row.id !== this.describtionRowId) {
                    counter += 1;
                    if (
                        row.firstChild.id ===
                        this.descriptionColumnId + "." + (counter - 1)
                    ) {
                        row.firstChild.remove();
                    }

                    let rowDes = document.createElement("td");
                    rowDes.id = this.descriptionColumnId + "." + (counter - 1);
                    rowDes.innerText = rowDescription;
                    row.insertBefore(rowDes, row.firstChild);
                }
            });
        }
    }

    addColumnDescription(desCharacter) {
        if (this.tableElement.firstChild.id === this.describtionRowId) {
            this.tableElement.firstChild.remove();
        }

        let describtionRow = document.createElement("tr");
        describtionRow.id = this.describtionRowId;

        if (this.tableElement.lastChild.childElementCount > this.nColumns) {
            let dummyElement = document.createElement("td");
            dummyElement.id = "dummy";
            dummyElement.style =
                "width : " + getById(this.id + ".0.0").offsetWidth + "px";

            describtionRow.appendChild(dummyElement);
        }
        for (let i = 0; i < this.nColumns; i++) {
            let colDescribtion = document.createElement("td");
            let subDes = document.createElement("sub");

            subDes.innerText = i + 1;

            colDescribtion.innerText = desCharacter;
            colDescribtion.appendChild(subDes);
            colDescribtion.style =
                "width : " + getById(this.id + ".0.0").offsetWidth + "px";

            describtionRow.appendChild(colDescribtion);
        }

        this.tableElement.insertBefore(
            describtionRow,
            this.tableElement.firstChild
        );
    }

    /**
    Adds a row to the table.
    @method
    @param {boolean} [force=false] - Optional parameter to force adding a row even if the current number of rows is equal to the maximum number of rows allowed in the design config.
    */
    addRow() {
        // const rowId = this.rows.length;
        const row = document.createElement("tr");
        // row.id = this.nRows;

        for (let i = 0; i < this.nColumns; i++) {
            const cell = this.addCell(this.nRows.toString(), i);
            row.appendChild(cell);
        }

        this.rows.push(row);
        this.tableElement.appendChild(row);
        this.nRows += 1;
    }

    /**

    Adds a column to the table.
    @method
    @param {boolean} [force=false] - Optional parameter to force adding a column even if the current number of columns is equal to the maximum number of columns allowed in the design config.
    */
    addColumn() {
        this.nColumns += 1;
        for (let i = 0; i < this.rows.length; i++) {
            const cell = this.addCell(i, this.nColumns - 1);
            this.rows[i].appendChild(cell);
        }
    }

    addButtons() {
        [
            {
                id: "addrow",
                name: "+",
                class: "button-primary button-matrixsize button-addrow",
                pos: "top",
                function: e => {
                    if (this.rows.length < designConfig.maxRows) {
                        this.addRow();
                    }
                },
            },
            {
                id: "removerow",
                name: "-",
                class: "button-primary button-matrixsize button-removerow",
                pos: "top",
                function: e => {
                    if (this.rows.length > designConfig.minRows) {
                        this.removeRow(false);
                    }
                },
            },
            {
                id: "addcol",
                name: "+",
                class: "button-primary button-matrixsize button-addcol",
                pos: "left",
                function: e => {
                    if (this.nColumns < designConfig.maxColumns) {
                        this.addColumn();
                    }
                },
            },
            {
                id: "removecol",
                name: "-",
                class: "button-primary button-matrixsize button-removecol",
                pos: "left",
                function: e => {
                    if (this.nColumns > designConfig.minColumns) {
                        this.removeColumn(false);
                    }
                },
            },
        ].forEach(button => {
            const buttonElement = document.createElement("button");
            buttonElement.id = button.id;
            buttonElement.className = button.class;
            buttonElement.textContent = button.name;
            buttonElement.addEventListener("click", button.function.bind(this));
            if (button.pos === "top") {
                this.buttonsRowCell.appendChild(buttonElement);
            } else {
                this.buttonsColCell.appendChild(buttonElement);
            }
        });
    }

    /**
     * Removes the brackets around the matrix.
     */
    removeBrackets() {
        this.bracketCloseCell.classList.add("hidden");
        this.bracketOpenCell.classList.add("hidden");
        this.emptyCell2.classList.add("hidden");
        this.emptyCell3.classList.add("hidden");
    }

    /**
     * Adds the brackets around the matrix.
     */
    addBrackets() {
        if (
            this.bracketCloseCell.classList.contains("hidden") &&
            this.bracketCloseCell.classList.contains("hidden") &&
            this.emptyCell2.classList.contains("hidden") &&
            this.emptyCell3.classList.contains("hidden")
        ) {
            this.bracketCloseCell.classList.remove("hidden");
            this.bracketOpenCell.classList.remove("hidden");
            this.emptyCell2.classList.remove("hidden");
            this.emptyCell3.classList.remove("hidden");
        }
    }

    /**
     * Removes the last row from the table.
     * @method
     * @param {boolean} [force=false] - Optional parameter to force removing a row even if the current number of rows is equal to the minimum number of rows allowed in the design config.
     */
    removeRow() {
        this.rows.pop();
        this.tableElement.removeChild(this.tableElement.lastChild);
        this.nRows -= 1;
    }

    /**
     * Removes the last column from the table.
     * @method
     * @param {boolean} [force=false] - Optional parameter to force removing a column even if the current number of columns is equal to the minimum number of columns allowed in the design config.
     */
    removeColumn() {
        this.nColumns -= 1;
        for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].removeChild(this.rows[i].lastChild);
        }
    }

    /**
     * Sets the data of the table to the values in the given matrix.
     * @method
     * @param {Matrix|Fraction} matrix - The matrix to use as the new data for the table. If a Fraction is given, it will be converted to a single-cell Matrix.
     */
    setData(matrix) {
        // if matrix is fraction, convert it to a matrix
        if (matrix instanceof Fraction) {
            matrix = new Matrix([[matrix]]);
        }

        // resize according to matrix size
        this.setNRows(matrix.nRows, true);
        this.setNColumns(matrix.nColumns, true);

        for (let i = 0; i < matrix.nRows; i++) {
            for (let j = 0; j < matrix.nColumns; j++) {
                let input = getById(`${this.id}.${i}.${j}`);
                input.value = matrix.getCell(i, j).stringify();
                adjustInputFontSize(input);
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
        // if (this.fractionArray) {
        //     return this.fractionArray;
        // }
        let data = [];
        for (let i = 0; i < this.rows.length; i++) {
            let row = [];
            for (let j = 0; j < this.nColumns; j++) {
                let input = getById(`${this.id}.${i}.${j}`);
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

    // converts to fraction or to decimal depending on boolean
    convertRepresentation(decimal = false) {
        if (decimal) {
            this.toDecimal();
        } else {
            this.toFraction();
        }
    }

    /**
     * Converts all the input values in the table to their decimal representation and updates the input fields with the new values.
     */
    toDecimal() {
        this.fractionArray = this.getData(); // store exact values for conversion back to fraction
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                let input = getById(`${this.id}.${i}.${j}`);
                let val = input.value;
                val = stringToFraction(val);
                input.value = val.toDecimal();
                adjustInputFontSize(input);
            }
        }
    }

    /**
     * Convert all values in the table to fractions and update the input fields.
     */
    toFraction() {
        // check if the deviation from the stored fraction is more than 0.01, meaning that the user has changed the value
        let data = this.getData();
        let diff = data.sub(this.fractionArray).abs();
        let maxDiff = new Fraction(1, 100);
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                if (diff.array[i][j].greater(maxDiff)) {
                    let input = getById(`${this.id}.${i}.${j}`);
                    let val = input.value;
                    val = stringToFraction(val);
                    this.fractionArray.array[i][j] = val;
                    adjustInputFontSize(input);
                }
            }
        }

        this.setData(this.fractionArray);
    }
}

function adjustInputFontSize(inputElement) {
    let newFontSize;
    if (inputElement.value.length < 4) {
        newFontSize = "14pt";
    } else if (inputElement.value.length == 4) {
        newFontSize = "12pt";
    } else if (inputElement.value.length == 5) {
        newFontSize = "11pt";
    } else if (inputElement.value.length == 6) {
        newFontSize = "9pt";
    } else if (inputElement.value.length >= 7) {
        newFontSize = "8pt";
    }
    inputElement.style.fontSize = newFontSize;
}

/**
 * Adds keydown event listener to move focus between cells of multiple tables.
 * @param {Array} tables - Array of table objects.
 * @param {boolean} nextTableToTheRight - If true, moves focus to the next table to the right.
 */
export function addKeyDownListener(tables, nextTableToTheRight = false) {
    let tableIds = tables.map(table => String(table.id));

    document.addEventListener("keydown", function (e) {
        let activeCellId = document.activeElement.id;
        let row = 0;
        let column = 0;
        let tableId = 0;
        let tableIdx = 0;

        if (activeCellId !== "") {
            tableId = activeCellId.split(".")[0];
            tableIdx = tableIds.indexOf(tableId);
            row = Number(activeCellId.split(".")[1]);
            column = Number(activeCellId.split(".")[2]);
        }

        if (e.code == "ArrowUp" && row > 0) {
            row -= 1;
        } else if (e.code == "ArrowDown" && row < tables[tableIdx].nRows - 1) {
            row += 1;
        } else if (e.code == "ArrowLeft" && column > 0) {
            column -= 1;
        } else if (
            e.code == "ArrowRight" &&
            column < tables[tableIdx].nColumns - 1
        ) {
            column += 1;
        } else if (
            e.code == "ArrowUp" &&
            tableIdx > 0 &&
            !nextTableToTheRight
        ) {
            tableIdx -= 1;
            row = tables[tableIdx].nRows - 1;
        } else if (
            e.code == "ArrowDown" &&
            tableIdx < tables.length - 1 &&
            !nextTableToTheRight
        ) {
            tableIdx += 1;
            row = 0;
        } else if (
            e.code == "ArrowLeft" &&
            tableIdx > 0 &&
            nextTableToTheRight
        ) {
            tableIdx -= 1;
            column = tables[tableIdx].nColumns - 1;
        } else if (
            e.code == "ArrowRight" &&
            tableIdx < tables.length - 1 &&
            nextTableToTheRight
        ) {
            tableIdx += 1;
            column = 0;
        } else {
            return;
        }

        tableId = tableIds[tableIdx];
        let cell = getById(`${tableId}.${row}.${column}`);
        cell.focus();
    });
}

/**
 * clears specified tables, by setting the matrices to 0s
 * @param {Array} tables - Array of table objects.
 */
export function clearTables(tables) {
    tables.forEach(table => {
        table.setData(getEmptyMatrix(table.nRows, table.nColumns));
    });
}
