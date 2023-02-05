// import { designConfig } from "./config.js";
import { Table } from "./table.js";
import { Fraction } from "./fraction.js";
// function for adding a table
function addTable() {
    if (tables.length > 25) {return;}

    tables.push(new Table(tables.length));

    let header = document.createElement("h2");
    let ithLetter = String.fromCharCode(64 + tables.length);
    header.innerHTML = `${ithLetter} =`;
    document.getElementById("table").appendChild(header);
    document.getElementById("table").appendChild(tables[tables.length - 1].tableContainer);
}

// function for calculating the result of an equation
function calculate(equationString) {
    if (equationString.length != 3) {
        return 0;
    }

    let matrix1 = tables[equationString.charCodeAt(0) - 65].getData();
    let matrix2 = tables[equationString.charCodeAt(2) - 65].getData();

    if (equationString[1] == "+") {
        return matrix1.add(matrix2);
    } else if (equationString[1] == "-") {
        console.log("Subtracting")
        return matrix1.add(matrix2.multiplyMatrixByScalar(new Fraction(-1, 1)));
    } else if (equationString[1] == "*") {
        return matrix1.matrixProduct(matrix2);
    }
}

console.log("Starting webpage!")
// button for adding a table
let addTableButton = document.createElement("button");
addTableButton.innerHTML = "Add Table";
document.getElementById("table").appendChild(addTableButton);


let tables = [];
for (let i = 0; i < 2; i++) {
    addTable();
}

addTableButton.addEventListener("click", function() {
    addTable();
});

// text field for input of equation + button for "calculate!"
let equationInput = document.createElement("input");
equationInput.id = "equationInput";
// equationInput.size = designConfig.inputFieldSize;
document.getElementById("equation").appendChild(equationInput);

let calculateButton = document.createElement("button");
calculateButton.innerHTML = "Calculate!";
calculateButton.addEventListener("click", function() {
    let equation = document.getElementById("equationInput").value;
    let result = calculate(equation);
    console.log("Result: ");
    console.log(result);
    // stringify result
    result = result.stringify();
    document.getElementById("result").innerHTML = result;
});
document.getElementById("equation").appendChild(calculateButton);

document.addEventListener("keydown", function(e) {
    let activeCellId = document.activeElement.id;
    console.log(activeCellId);
    let row;
    let column;
    let tableId;

    if (activeCellId == "") {
        tableId = 0;
        row = 0;
        column = 0;    
    } else {
        tableId = Number(activeCellId.split("-")[0]);
        row = Number(activeCellId.split("-")[1]);
        column = Number(activeCellId.split("-")[2]);
    }

    if (e.code == "ArrowUp" && row > 0) {
        row -= 1;
    } else if (e.code == "ArrowUp" && tableId > 0) {
        tableId -= 1;
        row = tables[tableId].rows.length - 1;
    } else if (e.code == "ArrowDown" && row < tables[0].rows.length - 1) {
        row += 1;
    } else if (e.code == "ArrowDown" && tableId < tables.length - 1) {
        tableId += 1;
        row = 0;
    } else if (e.code == "ArrowLeft" && column > 0) {
        column -= 1;
    } else if (e.code == "ArrowRight" && column < tables[0].nColumns - 1) {
        column += 1;
    }

    document.getElementById(`${tableId}-${row}-${column}`).focus();
});
