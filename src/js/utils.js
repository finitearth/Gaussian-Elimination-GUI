import { Fraction } from "./fraction.js";
import { Matrix } from "./matrix.js";

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
    } else {
        // if no slash is contained, the string is a whole number
        numerator = Number(string);
        denominator = 1;
    }
    console.log(numerator, denominator);

    return new Fraction(numerator, denominator);
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