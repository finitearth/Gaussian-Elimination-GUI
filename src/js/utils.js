import { Fraction } from "./fraction.js";
import { Matrix } from "./matrix.js";
import { InvalidInputException } from "./exceptions.js";

export function stringToFraction(string) {
    let numerator;
    let denominator;
    if (string == "") {
        // if string is empty, return 0/1 (0
        return new Fraction(0, 1);
    }

    if (string.includes("/")) {
        // split string into numerator and denominator
        [numerator, denominator] = string.split("/");
        numerator = Number(numerator);
        denominator = Number(denominator);

        if (denominator === 0) {
            throw new InvalidInputException();
        }

    } else if (string.includes(",") || string.includes(".")){
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

export function addKeyDownListener(tables, nextTableToTheRight=false) {
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
    
        if        (e.code == "ArrowUp" && row > 0) {
            row -= 1;
        } else if (e.code == "ArrowDown" && row < tables[0].rows.length - 1) {
            row += 1;
        } else if (e.code == "ArrowLeft" && column > 0) {
            column -= 1;
        } else if (e.code == "ArrowRight" && column < tables[0].nColumns - 1) {
            column += 1;

        } else if (e.code == "ArrowUp" && tableIdx > 0 && !nextTableToTheRight) {
            tableId -= 1;
            row = tables[tableIdx].rows.length - 1;
        } else if (e.code == "ArrowDown" && tableIdx < tables.length - 1 && !nextTableToTheRight) {
            tableIdx += 1;
            row = 0;
        } else if (e.code == "ArrowLeft" && tableIdx > 0 && nextTableToTheRight) {
            tableIdx -= 1;
            column = tables[tableId].nColumns - 1;
        } else if (e.code == "ArrowRight" && tableIdx < tables.length - 1 && nextTableToTheRight) {
            tableIdx += 1;
            column = 0;
        } else {
            return;
        }
        tableId = tableIds[tableIdx];
        document.getElementById(`${tableId}-${row}-${column}`).focus();
    });
}