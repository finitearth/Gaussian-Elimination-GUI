import { Fraction, NEGONE } from "./fraction.js";
import { InvalidInputException } from "../exceptions.js";
import { gaussElimination } from "./gaussalgorithm.js";
import { getUnitMatrix } from "./matrix.js";

export function calculate(equationString, tables) {
    // check that only allowed characters are used (a-z, 0-9 and +, -, *, /), also check no operands and operators come twice after each other.
    if (
        !equationString.match(/^[a-z0-9\+\-\*\(\)\s\/\^\|]+$/i) ||
        equationString.match(/[a-z]{2,}/i) ||
        equationString.match(/[\+\-\*]{2,}/i) ||
        equationString.match(/[\+\-\*\/]$/i) ||
        equationString.match(/^[\+\-\*\/]/i)
    ) {
        throw new InvalidInputException();
    }

    // replace lowercase letters with uppercase letters
    equationString = equationString.replace(/[a-z]/g, l => l.toUpperCase());
    // Remove all spaces
    equationString = equationString.replace(/\s/g, "");

    // Split equationString into array of strings,
    // split by letter or number or paranthasis or /
    // do not split if number followed by number or minus followed by number
    let equation = equationString.split(
        /([a-z]|[0-9]+\/[0-9]+|[0-9]+|\(|\)|\^|\|)/i
        // /([a-z]|[0-9]+\/[0-9]+|[0-9]+|\(|\)|\^|\|)/i
    );

    // Remove empty strings
    equation = equation.filter(element => element != "");

    // Replace letters with matrices, but if numeral, convert to fraction
    for (let i = 0; i < equation.length; i++) {
        // if letter replace with matrix
        if (equation[i].length == 1 && equation[i].match(/[A-SU-Z]/i)) {
            let index = equation[i].charCodeAt(0) - 65;
            equation[i] = tables[index].getData();
        }
        // if number followed by slash followed by number
        else if (equation[i].match(/[0-9]+\/[0-9]+/i)) {
            let [nom, den] = equation[i].split("/");
            equation[i] = new Fraction(Number(nom), Number(den)).reduce();
        }
        // if numerical value
        else if (equation[i].match(/[0-9]/i)) {
            equation[i] = new Fraction(Number(equation[i]), 1);
        }
        // check if not first character, preceded by minus and if minus is preceded by fraction or matrix
        if (
            i > 0 &&
            typeof equation[i - 2] == "string" &&
            typeof equation[i - 1] == "string" &&
            equation[i - 1].match(/^-/i) 
        ) {
            equation[i] = equation[i].mul(NEGONE);
            // remove minus
            equation.splice(i - 1, 1);
            // equation[i-1] = "+";
        }
    }
    let res = evaluate(equation);
    return res;
}

// Evaluate the equation using operator precedence and grouping
function evaluate(equation) {
    // Handle grouping: find innermost parentheses and evaluate them first
    let openParenIndex = equation.lastIndexOf("(");
    if (openParenIndex != -1) {
        let closeParenIndex = equation.indexOf(")", openParenIndex);
        let groupResult = evaluate(
            equation.slice(openParenIndex + 1, closeParenIndex)
        );
        equation.splice(
            openParenIndex,
            closeParenIndex - openParenIndex + 1,
            groupResult
        );
    }

    for (let i = 0; i < equation.length; i++) {
        // Handle determinant: i.e. |A|
        if (equation[i] == "|") {
            // Perform determinant
            let opResult = equation[i + 1].getDeterminant();
            // Replace both pipes and the matrix in between with the result of the determinant
            equation.splice(i, 3, opResult);
            // Decrement i by 2 to adjust for the removed elements
            i -= 2;
        } else if (equation[i] == "^" && equation[i + 1] == "T") {
            let opResult = equation[i - 1].transpose();
            equation.splice(i - 1, 3, opResult);
            i -= 2;
        } else if (
            equation[i] == "^" &&
            equation[i + 1].equals(NEGONE)
        ) {
            let matrix = equation[i - 1];
            let opResult = gaussElimination(
                matrix,
                getUnitMatrix(matrix.nRows)
            );
            equation.splice(i - 1, 3, opResult);
            i -= 2;
        }
    }

    for (let i = 1; i < equation.length - 1; i += 2) {
        if (equation[i] == "*") {
            let opResult = equation[i - 1].mul(equation[i + 1]);
            equation.splice(i - 1, 3, opResult);
            i -= 2;
        }
    }

    for (let i = 1; i < equation.length - 1; i += 2) {
        if (equation[i] == "+") {
            let opResult = equation[i - 1].add(equation[i + 1]);
            equation.splice(i - 1, 3, opResult);
            i -= 2;
        } else if (equation[i] == "-") {
            let opResult = equation[i - 1].sub(equation[i + 1]);
            equation.splice(i - 1, 3, opResult);
            i -= 2;
        }
    }
    if (equation.length != 1) {
        throw new InvalidInputException("Invalide Rechenoperationen!");
    }

    return equation[0];
}
