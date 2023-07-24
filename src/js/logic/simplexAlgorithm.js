/**
 * Perform the simplex algorithm on a linear programming problem represented by coefficient and constant matrices.
 * Throws an UnsolvableMatrixException if the coefficient matrix is not in standard form.
 * @param {Matrix} coefMatrix - The matrix representing the coefficients of the linear programming problem in standard form.
 * @param {Matrix} constMatrix - The matrix representing the constants of the linear programming problem.
 * @returns {Matrix} - The matrix representing the optimal solution to the linear programming problem.
 */
export function simplexAlgorithm(coefMatrix, constMatrix) {
  // Check if the coefficient matrix is in standard form
  if (!isStandardForm(coefMatrix)) {
    throw new UnsolvableMatrixException("Coefficient matrix is not in standard form.");
  }

  // Initialize the tableau
  let tableau = augment(coefMatrix, constMatrix);

  // Perform the simplex algorithm
  while (!isOptimal(tableau)) {
    let pivotColumn = findPivotColumn(tableau);
    let pivotRow = findPivotRow(tableau, pivotColumn);
    tableau = pivot(tableau, pivotRow, pivotColumn);
  }

  // Return the optimal solution
  return extractSolution(tableau);
}

/**
 * Returns true if the given matrix is in standard form for the simplex algorithm, false otherwise.
 * @param {Matrix} matrix - The matrix to check.
 * @returns {boolean} - True if the matrix is in standard form, false otherwise.
 */
function isStandardForm(matrix) {
  let numVars = matrix.numCols() - 1;
  for (let i = 0; i < matrix.numRows(); i++) {
    let numNonzero = 0;
    let pivotCol = -1;
    for (let j = 0; j < matrix.numCols(); j++) {
      if (matrix.get(i, j) !== 0) {
        numNonzero++;
        if (matrix.get(i, j) === 1) {
          if (pivotCol !== -1) {
            return false;
          }
          pivotCol = j;
        } else if (matrix.get(i, j) !== 0) {
          return false;
        }
      }
    }
    if (numNonzero !== 1 || pivotCol !== i + numVars) {
      return false;
    }
  }
  return true;
}

/**
 * Returns a new matrix that is the result of augmenting the given coefficient matrix with the given constant matrix.
 * @param {Matrix} coefMatrix - The coefficient matrix.
 * @param {Matrix} constMatrix - The constant matrix.
 * @returns {Matrix} - The augmented matrix.
 */
function augment(coefMatrix, constMatrix) {
  let result = new Matrix(coefMatrix.numRows(), coefMatrix.numCols() + constMatrix.numCols());
  for (let i = 0; i < coefMatrix.numRows(); i++) {
    for (let j = 0; j < coefMatrix.numCols(); j++) {
      result.set(i, j, coefMatrix.get(i, j));
    }
    for (let j = 0; j < constMatrix.numCols(); j++) {
      result.set(i, coefMatrix.numCols() + j, constMatrix.get(i, j));
    }
  }
  return result;
}

/**
 * Returns true if the given tableau is in optimal form for the simplex algorithm, false otherwise.
 * @param {Matrix} tableau - The tableau to check.
 * @returns {boolean} - True if the tableau is in optimal form, false otherwise.
 */
function isOptimal(tableau) {
  for (let j = 0; j < tableau.numCols() - 1; j++) {
    if (tableau.get(tableau.numRows() - 1, j) < 0) {
      return false;
    }
  }
  return true;
}

/**
 * Returns the index of the pivot column for the given tableau.
 * @param {Matrix} tableau - The tableau to find the pivot column for.
 * @returns {number} - The index of the pivot column.
 */
function findPivotColumn(tableau) {
  let minVal = Number.MAX_VALUE;
  let minIndex = -1;
  for (let j = 0; j < tableau.numCols() - 1; j++) {
    if (tableau.get(tableau.numRows() - 1, j) < minVal) {
      minVal = tableau.get(tableau.numRows() - 1, j);
      minIndex = j;
    }
  }
  return minIndex;
}

/**
 * Returns the index of the pivot row for the given tableau and pivot column.
 * @param {Matrix} tableau - The tableau to find the pivot row for.
 * @param {number} pivotColumn - The index of the pivot column.
 * @returns {number} - The index of the pivot row.
 */
function findPivotRow(tableau, pivotColumn) {
  let minRatio = Number.MAX_VALUE;
  let minIndex = -1;
  for (let i = 0; i < tableau.numRows() - 1; i++) {
    if (tableau.get(i, pivotColumn) > 0) {
      let ratio = tableau.get(i, tableau.numCols() - 1) / tableau.get(i, pivotColumn);
      if (ratio < minRatio) {
        minRatio = ratio;
        minIndex = i;
      }
    }
  }
  return minIndex;
}

/**
 * Returns a new matrix that is the result of performing a pivot operation on the given tableau with the given pivot row and pivot column.
 * @param {Matrix} tableau - The tableau to perform the pivot operation on.
 * @param {number} pivotRow - The index of the pivot row.
 * @param {number} pivotColumn - The index of the pivot column.
 * @returns {Matrix} - The new tableau after the pivot operation.
 */
function pivot(tableau, pivotRow, pivotColumn) {
  let result = new Matrix(tableau.numRows(), tableau.numCols());
  let pivotVal = tableau.get(pivotRow, pivotColumn);
  for (let j = 0; j < tableau.numCols(); j++) {
    result.set(pivotRow, j, tableau.get(pivotRow, j) / pivotVal);
  }
  for (let i = 0; i < tableau.numRows(); i++) {
    if (i !== pivotRow) {
      let rowVal = tableau.get(i, pivotColumn);
      for (let j = 0; j < tableau.numCols(); j++) {
        result.set(i, j, tableau.get(i, j) - rowVal * result.get(pivotRow, j));
      }
    }
  }
  return result;
}

/**
 * Returns a new matrix that represents the optimal solution to the linear programming problem represented by the given tableau.
 * @param {Matrix} tableau - The tableau representing the linear programming problem.
 * @returns {Matrix} - The matrix representing the optimal solution.
 */
function extractSolution(tableau) {
  let numVars = tableau.numCols() - 1;
  let result = new Matrix(1, numVars);
  for (let j = 0; j < numVars; j++) {
    let found = false;
    for (let i = 0; i < tableau.numRows() - 1; i++) {
      if (tableau.get(i, j) === 1 && !found) {
        result.set(0, j, tableau.get(i, tableau.numCols() - 1));
        found = true;
      } else if (tableau.get(i, j) !== 0) {
        found = false;
      }
    }
  }
  return result;
}