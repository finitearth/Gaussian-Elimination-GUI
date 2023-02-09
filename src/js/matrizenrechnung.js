// import { designConfig } from "./config.js";
import { Table } from "./table.js";
import { Fraction } from "./fraction.js";


function addTable() {
    if (tables.length > 25) {return;}

    tables.push(new Table(tables.length));

    let header = document.createElement("h2");
    let ithLetter = String.fromCharCode(64 + tables.length);
    header.innerHTML = `${ithLetter} =`;
    document.getElementById("table").appendChild(header);
    document.getElementById("table").appendChild(tables[tables.length - 1].tableContainer);
}

function removeTable() {
    if (tables.length <= 2) {return;}

    tables.pop();
    document.getElementById("table").removeChild(document.getElementById("table").lastChild);
    document.getElementById("table").removeChild(document.getElementById("table").lastChild);
}

function calculate(equationString) {
    var stack = [];
    var operatorStack = [];

    var context = function (varName) {
        // check type; Number (0 to 9) or Character (A-Z)?
        if (varName.charCodeAt(0) >= 48 && varName.charCodeAt(0) <= 57) {
            return new Fraction(parseInt(varName), 1);
        } else{
        var table = tables[varName.charCodeAt(0) - 65];
        return table.getData();
        }
    }

    var operator = {
        "+": function (a, b) { return a.add(b); },
        "-": function (a, b) { return a.add(b.mul(new Fraction(-1, 1))); },
        "*": function (a, b) { return a.mul(b); },
        "/": function (a, b) { return a.divide(b); }
    };

    equationString = orderOperations(equationString);

    equationString.split("").forEach(token => {
        switch (token) {
        case "+":
        case "-":
        case "*":
        case "/":
            while (operatorStack.length && ["+", "-", "*", "/"].indexOf(operatorStack[operatorStack.length - 1]) >= 0) {
                var op = operatorStack.pop();
                var b = stack.pop();
                var a = stack.pop();
                stack.push(operator[op](a, b));
            }
            operatorStack.push(token);
            break;
        default:
            stack.push(context(token));
        }
    });

    while (operatorStack.length) {
        var op = operatorStack.pop();
        var b = stack.pop();
        var a = stack.pop();
        stack.push(operator[op](a, b));
    }

    return stack.pop();
}

function orderOperations(equationString) {
    const output = [];
    const operatorStack = [];
    // const operators = ["+", "-", "*", "/"];
  
    equationString.split("").forEach(token => {
      switch (token) {
        case "(":
          operatorStack.push(token);
          break;
        case ")":
          while (operatorStack[operatorStack.length - 1] !== "(") {
            output.push(operatorStack.pop());
          }
          operatorStack.pop();
          break;
        case "+":
        case "-":
          while (
            operatorStack.length &&
            ["*", "/"].indexOf(operatorStack[operatorStack.length - 1]) >= 0
          ) {
            output.push(operatorStack.pop());
          }
          operatorStack.push(token);
          break;
        case "*":
        case "/":
          while (
            operatorStack.length &&
            ["*", "/"].indexOf(operatorStack[operatorStack.length - 1]) >= 0
          ) {
            output.push(operatorStack.pop());
          }
          operatorStack.push(token);
          break;
        default:
          if (!isNaN(token) || /[A-Z]/.test(token)) {
            output.push(token);
          } else {
            const subEquation = extractSubEquation(equationString, token);
            output.push(orderOperations(subEquation));
          }
      }
    });
  
    while (operatorStack.length) {
      output.push(operatorStack.pop());
    }
  
    return output.join("");
  }

function extractSubEquation(equationString, startIndex) {
    let openParenCount = 0;
    let endIndex = startIndex;
  
    while (endIndex < equationString.length) {
      const char = equationString[endIndex];
      if (char === "(") {
        openParenCount++;
      } else if (char === ")") {
        openParenCount--;
        if (openParenCount === 0) {
          break;
        }
      }
      endIndex++;
    }
  
    return equationString.slice(startIndex + 1, endIndex);
  }


console.log("Starting webpage!")
// button for adding a table
let addTableButton = document.createElement("button");
addTableButton.innerHTML = "Add Table";
document.getElementById("table").appendChild(addTableButton);
addTableButton.addEventListener("click", function() {
  addTable();
});

// remove table
let removeTableButton = document.createElement("button");
removeTableButton.innerHTML = "Remove Table";
document.getElementById("table").appendChild(removeTableButton);
removeTableButton.addEventListener("click", function() {
  removeTable();
});


let tables = [];
for (let i = 0; i < 2; i++) {
    addTable();
}



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

