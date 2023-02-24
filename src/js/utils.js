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