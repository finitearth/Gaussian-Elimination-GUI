// Create matrix input table
let rows = 2;
let cols = 2;
let matrixInputTable = createMatrixInputTable(rows, cols);
document.getElementById("matrix-input").appendChild(matrixInputTable);

// Get references to the buttons
let addRowButton = document.getElementById("add-row");
let addColButton = document.getElementById("add-col");
// let saveButton = document.getElementById("save-button");

// Attach event listeners to the buttons
addRowButton.addEventListener("click", addRow);
addColButton.addEventListener("click", addCol);
// saveButton.addEventListener("click", saveMatrix);

// Create matrix input table with specified number of rows and cols
function createMatrixInputTable(rows, cols) {
    let table = document.createElement("table");
    table.classList.add("table", "table-bordered");
    for (let i = 0; i < rows; i++) {
      let row = table.insertRow();
      for (let j = 0; j < cols; j++) {
        let cell = row.insertCell();
        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.classList.add("form-control");
        cell.appendChild(input);
      }
    }
    return table;
  }
  

// Add new row to the matrix input table
function addRow() {
  // Create a new row
  let newRow = matrixInputTable.insertRow();

  // Copy the cells from the last row to the new row
  for (let i = 0; i < cols; i++) {
    let newCell = newRow.insertCell();
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.classList.add("form-control");
    newCell.appendChild(input);
  }

  rows++;
}

// Add new column to the matrix input table
function addCol() {
  // Add a new cell to each row
  for (let i = 0; i < rows; i++) {
    let row = matrixInputTable.rows[i];
    let newCell = row.insertCell();
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.classList.add("form-control");
    newCell.appendChild(input);
  }

  cols++;
}

// Save matrix
function saveMatrix() {
  let matrix = getMatrixFromTable(matrixInputTable);
  console.log(matrix);
}

document.getElementById("next-button").addEventListener("click", saveAndProceed);

function saveAndProceed() {
  let matrix = getMatrixFromTable(matrixInputTable);
  let matrixTable = createMatrixTable(matrix);
  let matrixContainer = document.getElementById("matrix-container");
  localStorage.setItem("matrix", JSON.stringify(matrix));
  document.cookie = JSON.stringify(matrix);
  window.location.href = "matrix_display.html";

//   matrixContainer.innerHTML = "";
//   matrixContainer.appendChild(matrixTable);
}

function getMatrixFromTable(table) {
    let matrix = [];
    for (let i = 0; i < table.rows.length; i++) {
      let row = table.rows[i];
      let matrixRow = [];
      for (let j = 0; j < row.cells.length; j++) {
        let cell = row.cells[j];
        let value = cell.children[0].value;
        matrixRow.push(Number(value));
      }
      matrix.push(matrixRow);
    }
    return matrix;
  }
  

function createMatrixTable(matrix) {
    // read mtrix from cookie
    
  let table = document.createElement("table");
  table.classList.add("table", "table-bordered");
  for (let i = 0; i < matrix.length; i++) {
    let row = table.insertRow();
    let matrixRow = matrix[i];
    for (let j = 0; j < matrixRow.length; j++) {
      let cell = row.insertCell();
      cell.innerHTML = matrixRow[j];
    }
  }
  return table;
}

// function to switch rows
function switchRows(row1, row2) {
    let temp = matrix[row1];
    matrix[row1] = matrix[row2];
    matrix[row2] = temp;
}

// function to add row1 to row2
function add2Rows(c1, row1, row2) {
    for (let i = 0; i < matrix[row1].length; i++) {
        matrix[row2][i] += c1*matrix[row1][i];
    }
}