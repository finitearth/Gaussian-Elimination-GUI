import { Table } from "./table.js";
import { Fraction } from "./fraction.js";
import { addKeyDownListener } from "./utils.js";
import { InvalidInputException } from "./exceptions.js";

const operators = {
    "+": (a, b) => a.add(b),
    "-": (a, b) => a.sub(b),
    "*": (a, b) => a.mul(b),
};

function calculate(equationString) {
    // check that only allowed characters are used (a-z, 0-9 and +, -, *, /), also check no operands and operators come twice after each other.
    if (
        !equationString.match(/^[a-z0-9\+\-\*\(\)\s\/]+$/i) ||
        equationString.match(/[a-z]{2,}/i) ||
        equationString.match(/[\+\-\*]{2,}/i)
    ) {
        throw new InvalidInputException();
    }

    // Remove all spaces
    equationString = equationString.replace(/\s/g, "");

    // Split equationString into array of strings,
    // split by letter or number or paranthasis or /
    // do not split if number followed by number
    let equation = equationString.split(/([a-z]|[0-9]+\/[0-9]+|[0-9]+|\(|\))/i);

    // Remove empty strings
    equation = equation.filter(element => element != "");
    // Replace letters with matrices, but if numeral, convert to fraction
    for (let i = 0; i < equation.length; i++) {
        if (equation[i].length == 1 && equation[i].match(/[A-Z]/i)) {
            let index = equation[i].charCodeAt(0) - 65;
            equation[i] = tables[index].getData();
        }
        // if number followed by slash followed by number
        else if (equation[i].match(/[0-9]+\/[0-9]+/i)) {
            let [nom, den] = equation[i].split("/");
            equation[i] = new Fraction(Number(nom), Number(den)).reduce();
        } else if (equation[i].match(/[0-9]/i)) {
            equation[i] = new Fraction(Number(equation[i]), 1);
        }
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

        // Handle operator precedence: evaluate multiplication and division first
        for (let i = 1; i < equation.length - 1; i += 2) {
            if (equation[i] == "*") {
                // Perform multiplication
                let opResult = operators[equation[i]](
                    equation[i - 1],
                    equation[i + 1]
                );
                // Replace the three elements of the equation with the result of the multiplication
                equation.splice(i - 1, 3, opResult);
                // Decrement i by 2 to adjust for the removed elements
                i -= 2;
            }
        }

        // Handle operator precedence: evaluate addition and subtraction last
        for (let i = 1; i < equation.length - 1; i += 2) {
            if (equation[i] == "+" || equation[i] == "-") {
                // Perform addition or subtraction
                let opResult = operators[equation[i]](
                    equation[i - 1],
                    equation[i + 1]
                );
                // Replace the three elements of the equation with the result of the addition or subtraction
                equation.splice(i - 1, 3, opResult);
                // Decrement i by 2 to adjust for the removed elements
                i -= 2;
            }
        }

        return equation[0];
    }
    let res = evaluate(equation);
    return res;
}

function addTable() {
    if (tables.length > 25) {
        return;
    }
    let table = new Table(tables.length);
    tables.push(table);

    let container = document.createElement("table");
    // append new row to container
    let row = document.createElement("tr");

    let name = document.createElement("td");
    name.className = "matrix-name";
    let ithLetter = String.fromCharCode(64 + tables.length);
    name.innerHTML = `${ithLetter} =`;

    row.appendChild(name);
    let content = document.createElement("td");
    content.appendChild(tables[tables.length - 1].tableContainer);
    row.appendChild(content);
    container.appendChild(row);

    document.getElementById("tables").appendChild(container);
}

function removeTable() {
    if (tables.length <= 2) {
        return;
    }

    tables.pop();
    document
        .getElementById("table")
        .removeChild(document.getElementById("table").lastChild);
}

let tables = [];
for (let i = 0; i < 2; i++) {
    addTable();
}

let resultTable = new Table("resultTable", false);
resultTable.disableInput();
document.getElementById("resultTable").appendChild(resultTable.tableContainer);

document
    .getElementById("calculateButton")
    .addEventListener("click", function () {
        let equation = document.getElementById("equationInput").value;
        try {
            let result = calculate(equation);
            resultTable.setData(result);
        } catch (e) {
            // throw e
            alert(e);
        }
    });

document.getElementById("addTableButton").addEventListener("click", addTable);
document
    .getElementById("removeTableButton")
    .addEventListener("click", removeTable);

addKeyDownListener(tables);

document
    .getElementById("convertToDecimal")
    .addEventListener("click", function () {
        if (this.checked) {
            resultTable.toDecimal();
        } else {
            resultTable.toFraction();
        }
    });
