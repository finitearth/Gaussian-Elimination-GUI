import { Fraction } from "./fraction.js";
import { Matrix } from "./matrix.js";
import { InvalidInputException } from "./exceptions.js";
import { RowOperation } from "./rowoperation.js";

/**
 * An instance of the `Fraction` class representing the value 1.
 *
 * @type {Fraction}
 */
export const ONE = new Fraction(1, 1);

/**
 * An instance of the `Fraction` class representing the value 0.
 *
 * @type {Fraction}
 */
export const ZERO = new Fraction(0, 1);

/**
 * An instance of the `Fraction` class representing the value -1.
 *
 * @type {Fraction}
 */
export const NEGONE = new Fraction(-1, 1);

/**
 * Converts a string representing a fraction or decimal to a Fraction object.
 *
 * If the input string contains a forward slash (/), it is assumed to represent
 * a fraction and is split into numerator and denominator. If the input string
 * contains a comma (,) or a period (.), it is assumed to represent a decimal
 * and is converted to a whole numbered fraction. If the input string consists
 * of only numerals, it is treated as an integer and a denominator of 1 is used.
 *
 * If the input string is empty, a Fraction object representing 0/1 is returned.
 *
 * @param {string} string - The input string to convert.
 * @throws {InvalidInputException} if the input string is not a valid representation
 * of a fraction or decimal.
 * @returns {Fraction} The Fraction object representing the input string.
 */
export function stringToFraction(string) {
    let numerator;
    let denominator;
    if (string == "") {
        // if string is empty, return 0/1 (0
        return ZERO;
    }

    if (string.includes("/")) {
        // split string into numerator and denominator
        [numerator, denominator] = string.split("/");
        numerator = Number(numerator);
        denominator = Number(denominator);

        if (denominator === 0) {
            throw new InvalidInputException();
        }
    } else if (string.includes(",") || string.includes(".")) {
        // comma or dot; convert to whole numbered fraction
        let decimal = Number(string);

        // get number of digits after comma/dot
        let digits = string.split(".")[1].length;
        denominator = 10 ** digits;
        numerator = decimal * denominator;
    } else if (string.match(/^-?[0-9]+$/)) {
        // string consists of only numerals
        numerator = Number(string);
        denominator = 1;
    } else {
        throw new InvalidInputException();
    }

    let fraction = new Fraction(numerator, denominator);
    fraction = fraction.reduce();
    return fraction;
}

/**

    Returns an n x n unit matrix.
    @param {number} n - The number of rows and columns of the matrix.
    @returns {Matrix} - The n x n unit matrix.
    */
export function getUnitMatrix(n) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix.push([]);
        for (let j = 0; j < n; j++) {
            if (i == j) {
                matrix[i].push(new Fraction(1, 1));
            } else {
                matrix[i].push(new Fraction(0, 1));
            }
        }
    }
    return new Matrix(matrix);
}

/**

    Adds keydown event listener to move focus between cells of multiple tables.
    @param {Array} tables - Array of table objects.
    @param {boolean} nextTableToTheRight - If true, moves focus to the next table to the right.
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
            tableId = activeCellId.split("-")[0];
            tableIdx = tableIds.indexOf(tableId);
            row = Number(activeCellId.split("-")[1]);
            column = Number(activeCellId.split("-")[2]);
        }

        if (e.code == "ArrowUp" && row > 0) {
            row -= 1;
        } else if (e.code == "ArrowDown" && row < tables[tableIdx].rows.length - 1) {
            row += 1;
        } else if (e.code == "ArrowLeft" && column > 0) {
            column -= 1;
        } else if (e.code == "ArrowRight" && column < tables[tableIdx].nColumns - 1) {
            column += 1;
        } else if (
            e.code == "ArrowUp" &&
            tableIdx > 0 &&
            !nextTableToTheRight
        ) {
            tableIdx -= 1;
            row = tables[tableIdx].rows.length - 1;
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
        let cell = document.getElementById(`${tableId}-${row}-${column}`);
        cell.select();
    });
}

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
        if (rowOperations[i].isEnabled()) {
            rowOperations[i].setNRowDropdownSelectOptions(dimension, n);
        }
    }
    
}