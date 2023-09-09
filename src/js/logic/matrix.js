import {
    InvalidInputException,
    InvalidMatrixDimension,
} from "../exceptions.js";
import { Fraction, NEGONE, ZERO, ONE } from "./fraction.js";
import { gaussElimination } from "./gaussalgorithm.js";

/**
 * Class for a matrix consisting of a 2-dimensional array of Fraction objects.
 * @class
 * @property {Array<Array<Fraction>>} array - The 2-dimensional array representing the matrix.
 * @property {number} nRows - The number of rows in the matrix.
 * @property {number} nColumns - The number of columns in the matrix.
 */
export class Matrix {
    /**
     * Constructs a matrix
     * @param {Array<Array<Fraction>>} array 2-d array of fraction objects representing the matrix.
     */
    constructor(array) {
        this.array = array;
        this.nRows = array.length;
        this.nColumns = array[0].length;
    }

    /**
     * Identifies linearly dependent rows in the matrix.
     * Returns an array containing pairs of row indices that are linearly dependent.
     * @returns {Array<Array<number>>} - Array of pairs of row indices.
     */
    findLinearDependencies() {
        let matrixCopy = this.clone();
        let linearDependencies = [];

        for (let i = 0; i < matrixCopy.nRows; i++) {
            for (let j = i; j < matrixCopy.nRows; j++) {
                if (i == j) {
                    continue;
                }
                let row1 = matrixCopy.getRow(i);
                let row2 = matrixCopy.getRow(j);

                let factor1 = ZERO;
                let factor2 = ZERO;
                let c = 0;
                while (
                    factor1.equals(ZERO) &&
                    factor2.equals(ZERO) &&
                    c <= matrixCopy.nColumns
                ) {
                    c++;
                    factor1 = row1.getCell(0, c);
                    factor2 = row2.getCell(0, c);
                }

                // (factor1 == 0) XOR (factor2 == 0)
                if (
                    (factor1.equals(ZERO) || factor2.equals(ZERO)) &&
                    !(factor1.equals(ZERO) && factor2.equals(ZERO))
                ) {
                    continue;
                }
                let resultingRow = row1.multiplyRowByScalar(
                    0,
                    factor2.div(factor1)
                );
                if (resultingRow.equals(row2)) {
                    linearDependencies.push([i, j]);
                }
            }
        }
        return linearDependencies;
    }

    /**
     * Calculates the number of solutions for the system of equations represented by the matrix.
     * Returns 0, 1, or -1 (=inf), based on the conditions met.
     * @returns {number} - Number of solutions.
     */
    getNumberOfSolutions() {
        let matrixCopy = this.clone();
        let rank = matrixCopy.getRank();
        if (rank < Math.min(matrixCopy.nColumns, matrixCopy.nRows)) {
            return 0;
        }
        // if whole row is zero
        if (matrixCopy.hasEmptyRow() || matrixCopy.transpose().hasEmptyRow()) {
            return 0;
        }
        if (matrixCopy.nRows < matrixCopy.nColumns) {
            return -1;
        }

        return 1;
    }

    /**
     * Checks for the presence of rows containing only zero elements in the matrix.
     * @returns {boolean} - True if such rows exist, false otherwise.
     */
    hasEmptyRow() {
        return this.countEmptyRows() > 0;
    }

        /**
     * Counts the number of rows in the matrix that contain only zero elements.
     * @returns {number} - Count of empty rows.
     */
    countEmptyRows() {
        let count = 0;
        for (let i = 0; i < this.nRows; i++) {
            let rowEmpty = true;
            for (let j = 0; j < this.nColumns; j++) {
                if (!this.getCell(i, j).equals(ZERO)) {
                    rowEmpty = false;
                    break;
                }
            }
            if (rowEmpty) {
                count += 1;
            }
        }
        return count;
    }

        /**
     * Calculates the rank of the matrix.
     * Takes into account linearly dependent rows and columns.
     * @returns {number} - Rank of the matrix.
     */
    getRank() {
        let matrixCopy = this.clone();
        // rows
        let linearDependencies = this.findLinearDependencies();
        // columns
        let linearDependencies2 = matrixCopy
            .transpose()
            .findLinearDependencies();
        return (
            matrixCopy.nRows -
            linearDependencies.length -
            linearDependencies2.length
        );
    }

        /**
     * Checks if the matrix is square, i.e., if the number of rows equals the number of columns.
     * @returns {boolean} - True if the matrix is square, false otherwise.
     */
    isSquare() {
        return this.nRows == this.nColumns;
    }

        /**
     * Checks for equality between two Matrix objects.
     * Compares dimensions and individual elements.
     * @param {Matrix} otherMatrix - The other Matrix object to compare.
     * @returns {boolean} - True if matrices are equal, false otherwise.
     */
    equals(otherMatrix) {
        if (
            this.nRows != otherMatrix.nRows ||
            this.nColumns != otherMatrix.nColumns
        ) {
            return false;
        }
        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                if (!this.getCell(i, j).equals(otherMatrix.getCell(i, j))) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
    Returns a new Matrix object that is a clone of the current matrix object.
    @returns {Matrix} A new Matrix object that is a clone of the current matrix object.
    */
    clone() {
        let newArray = [];
        for (let i = 0; i < this.nRows; i++) {
            newArray[i] = [];
            for (let j = 0; j < this.nColumns; j++) {
                newArray[i][j] = this.array[i][j].clone();
            }
        }
        return new Matrix(newArray);
    }

    /**
     * Returns the Fraction object at the specified row and column indices in the matrix.
     * @param {number} rowIndex - The index of the row containing the desired Fraction object.
     * @param {number} colIndex - The index of the column containing the desired Fraction object.
     * @returns {Fraction} The Fraction object at the specified row and column indices in the matrix.
     */
    getCell(rowIndex, colIndex) {
        if (
            rowIndex < 0 ||
            rowIndex >= this.nRows ||
            colIndex < 0 ||
            colIndex >= this.nColumns
        ) {
            throw new Error("Trying to access invalid cell!🥲");
        }
        return this.array[rowIndex][colIndex];
    }

        /**
     * Sets the value of a specific cell in the matrix.
     * @param {number} rowIndex - The row index of the cell.
     * @param {number} colIndex - The column index of the cell.
     * @param {Fraction} value - The new value to set.
     * @returns {Matrix} - A reference to this matrix with the updated cell value.
     */
    setCell(rowIndex, colIndex, value) {
        this.array[rowIndex][colIndex] = value;
        return this;
    }

    /**
     * Adds the values of each corresponding cell in the input matrix to this matrix and returns a new Matrix object representing the result.
     * @param {Matrix} otherMatrix - The input matrix to be added to this matrix.
     * @returns {Matrix} A new Matrix object representing the sum of this matrix and the input matrix.
     */
    add(otherMatrix) {
        if (
            this.nRows != otherMatrix.nRows ||
            this.nColumns != otherMatrix.nColumns
        ) {
            throw new InvalidMatrixDimension();
        }
        let newArray = [];
        for (let i = 0; i < this.nRows; i++) {
            newArray[i] = [];
            for (let j = 0; j < this.nColumns; j++) {
                newArray[i][j] = this.getCell(i, j).add(
                    otherMatrix.getCell(i, j)
                );
            }
        }
        return new Matrix(newArray);
    }

    /**
     * Returns a new matrix with the absolute values of all elements in the original matrix.
     * @returns {Matrix} A new matrix with the absolute values of all elements in the original matrix.
     */
    abs() {
        let newArray = [];
        for (let i = 0; i < this.nRows; i++) {
            newArray[i] = [];
            for (let j = 0; j < this.nColumns; j++) {
                newArray[i][j] = this.getCell(i, j).abs();
            }
        }
        return new Matrix(newArray);
    }

    /**
     * Returns the maximum element in the matrix.
     * @returns {number} The maximum element in the matrix.
     */
    max() {
        let max = this.array[0][0];
        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                if (this.getCell(i, j).greater(max)) {
                    max = this.array[i][j];
                }
            }
        }
        return max;
    }

    /**
     * Subs the value
     */
    sub(otherMatrix) {
        otherMatrix = otherMatrix.mul(NEGONE);
        return this.add(otherMatrix);
    }

    /**
     * Multiplies this matrix by the input value, which can be either a scalar value represented as a Fraction or a Matrix object.
     * If the input is a scalar value, the function returns a new Matrix object where each cell is multiplied by the scalar value.
     * If the input is a Matrix object, the function returns a new Matrix object that is the product of the two matrices.
     * Throws an error if the input is not a scalar value or a Matrix object.
     * @param {Fraction|Matrix|number} other - The value to multiply this matrix by.
     * @returns {Matrix} A new Matrix object representing the product of this matrix and the input value.
     * @throws {Error} An error is thrown if the input is not a scalar value represented as a Fraction or a Matrix object.
     */
    mul(other) {
        // check for type of other; if fraction -> multiply by scalar; if Matrix -> matrixProduct
        if (other instanceof Fraction) {
            return this.multiplyByScalar(other);
        } else if (other instanceof Matrix) {
            return this.multiplyByMatrix(other);
        } else if (typeof other == "number") {
            return this.multiplyByScalar(new Fraction(other, 1));
        } else {
            throw new Error("Invalid type " + other);
        }
    }

    /**
     * Retrieves the pivot element and its index within a given column.
     * The pivot is the largest absolute value in the column.
     * @param {number} colIndex - The column index to find the pivot in.
     * @returns {Array} An array containing the pivot index and the pivot value.
     */
    getPivot(colIndex) {
        let pivot = this.getCell(colIndex, colIndex);
        let pivotIndex = colIndex;

        // Check if you are within the bounds of the matrix
        if (colIndex >= this.nRows) {
            return [pivotIndex, pivot]; // Return current pivot details if out of bounds
        }

        // Loop through the rows below the current row
        for (let j = colIndex + 1; j < this.nRows; j++) {
            let element = this.getCell(j, colIndex);
            if (element.abs().greater(pivot.abs())) {
                pivot = element;
                pivotIndex = j;
            }
        }

        return [pivotIndex, pivot];
    }

    /**
     * Multiplies this matrix with another matrix and returns a new one.
     * @param {Matrix} other - The other matrix.
     * @returns {Matrix} - A new matrix that is the product of the two matrices.
     * @throws {Error} - If the matrices are incompatible for multiplication.
     */
    multiplyByMatrix(other) {
        if (this.nColumns != other.nRows) {
            // || this.nRows != other.nColumns) {
            throw new InvalidMatrixDimension();
        }
        let newArray = [];
        for (let i = 0; i < this.nRows; i++) {
            newArray[i] = [];
            for (let j = 0; j < other.nColumns; j++) {
                let c = ZERO;
                for (let k = 0; k < this.nColumns; k++) {
                    c = c.add(this.array[i][k].mul(other.array[k][j]));
                }
                newArray[i][j] = c;
            }
        }
        return new Matrix(newArray);
    }

    /**
     * Transposes the matrix and returns a new one.
     * @returns {Matrix} - A new matrix that is the transpose of the original.
     */
    transpose() {
        let newArray = [];

        for (let i = 0; i < this.nColumns; i++) {
            newArray.push([]);
            for (let j = 0; j < this.nRows; j++) {
                newArray[i].push(this.getCell(j, i));
            }
        }

        return new Matrix(newArray);
    }

    /**
     * Swaps two rows in the matrix.
     * @param {number} iRow1 - The index of the first row to swap.
     * @param {number} iRow2 - The index of the second row to swap.
     * @returns {Matrix} - A reference to this matrix with the rows swapped.
     */
    swapRows(iRow1, iRow2) {
        let temp = this.array[iRow1];
        this.array[iRow1] = this.array[iRow2];
        this.array[iRow2] = temp;
        return this;
    }

    /**
     * Returns a Matrix object representing the specified row of the current matrix.
     * @param {number} iRow - The index of the row to get.
     * @returns {Matrix} - A Matrix object representing the specified row.
     */
    getRow(iRow) {
        let newArray = new Matrix([this.array[iRow]]);
        return newArray;
    }

    /**
     * Returns a new Matrix object representing the specified column of this matrix.
     *
     * @param {number} iColumn - The index of the column to retrieve.
     * @returns {Matrix} A new Matrix object representing the specified column of this matrix.
     */
    getColumn(iColumn) {
        let column = [[]];
        for (let i = 0; i < this.nRows; i++) {
            column[0][i] = this.array[i][iColumn];
        }
        return new Matrix(column);
    }

    /**
     * Add the elements of another row to a given row in the matrix.
     *
     * @param {number} iRow - The index of the row to add to.
     * @param {Matrix} otherRow - The row to add to the given row.
     * @returns {Matrix} - The matrix with the modified row.
     */
    addRow(iRow, otherRow) {
        for (let i = 0; i < this.nColumns; i++) {
            this.array[iRow][i] = this.getCell(iRow, i).add(
                otherRow.getCell(0, i)
            );
        }

        return this;
    }

    /**
     * Subtracts the values of another row from the specified row of the matrix.
     *
     * @param {number} iRow - The index of the row to be updated.
     * @param {Matrix} otherRow - The row to be subtracted from the specified row.
     * @returns {Matrix} - The updated matrix.
     * @throws {Error} - If the number of columns in the input matrix does not match the number of columns in this matrix.
     */
    substractRow(iRow, otherRow) {
        return this.addRow(iRow, otherRow.mul(NEGONE));
    }

    /**
     * Multiply a row by a scalar.
     * @param {number} iRow - The index of the row to multiply.
     * @param {Fraction} scalar - The scalar value to multiply the row by.
     * @returns {Matrix} - The matrix with the row multiplied by the scalar.
     */
    multiplyRowByScalar(iRow, scalar) {
        for (let i = 0; i < this.nColumns; i++) {
            this.array[iRow][i] = this.getCell(iRow, i).mul(scalar);
        }
        return this;
    }

    /**
     * Multiplies all elements of the matrix by the given scalar.
     *
     * @param {Fraction} scalar - The scalar to multiply by.
     * @returns {Matrix} A new matrix with the same dimensions as the original, but with each element multiplied by the scalar.
     */
    multiplyByScalar(scalar) {
        let newArray = [];
        for (let i = 0; i < this.nRows; i++) {
            newArray[i] = [];
            for (let j = 0; j < this.nColumns; j++) {
                newArray[i][j] = this.getCell(i, j).mul(scalar).reduce();
            }
        }
        return new Matrix(newArray);
    }

    /**
     Computes the determinant of the matrix recursively.
     If the matrix has dimensions 1x1, then the determinant is simply the only element of the matrix.
     Otherwise, the determinant is calculated as the sum of the products of the elements of the first row by the determinants
      of their corresponding submatrices. The sign of each product alternates depending on the sum of the indices of the row and column of the element.
     @returns {Fraction} The determinant of the matrix.
     */
    getDeterminant() {
        if (this.nRows === 1 && this.nColumns === 1) {
            return this.getCell(0, 0);
        }

        let determinant = ZERO;
        let i = 0;
        for (let j = 0; j < this.nColumns; j++) {
            let sign = (i + j) % 2 == 0 ? 1 : -1;
            let subMatrix = this.getSubMatrix(i, j);
            let subDeterminant = subMatrix.getDeterminant();
            let coefficient = this.getCell(0, j);
            determinant = determinant.add(
                coefficient.mul(subDeterminant).mul(sign)
            );
        }

        return determinant;
    }

    /**
 * Computes the determinant of the matrix using Gauss Elimination.
 *
 * @returns {Fraction} - The determinant of the matrix.
 */
    getDeterminantUsingGaussElimination() {
        let identityMatrix = getUnitMatrix(this.nRows);
        let lambda = gaussElimination(this, identityMatrix, false, true);
        let determinant = lambda.inverse().reduce();

        return determinant;
    }

    /**
     * Returns a new matrix that is a submatrix of the current matrix,
     * where the specified row and column are excluded.
     *
     * @param {number} excludedRow - the row to exclude from the submatrix
     * @param {number} excludedColumn - the column to exclude from the submatrix
     * @returns {Matrix} - a new Matrix object that is a submatrix of the current matrix
     */
    getSubMatrix(excludedRow, excludedColumn) {
        let newArray = [];
        for (let i = 0; i < this.nRows; i++) {
            if (i === excludedRow) {
                continue;
            }
            newArray.push([]);
            for (let j = 0; j < this.nColumns; j++) {
                if (j === excludedColumn) {
                    continue;
                }
                newArray[newArray.length - 1].push(this.getCell(i, j));
            }
        }
        return new Matrix(newArray);
    }
    /**
     * Sets the values of a row in the matrix to the values of a row in another matrix.
     * @param {number} iRow - The index of the row to set.
     * @param {Matrix} newRow - The matrix containing the new row values.
     * @returns {Matrix} This matrix object, for chaining.
     */
    setRow(iRow, newRow) {
        for (let i = 0; i < this.nColumns; i++) {
            this.array[iRow][i] = newRow.getCell(0, i);
        }
        return this;
    }

    /**
 * Iterates through each element of the matrix, capturing row and column indices and the element itself.
 *
 * @returns {Array} - An array of triplets [rowIndex, columnIndex, cellValue], where rowIndex and columnIndex represent the row and column indices, and cellValue is the value of the cell.
 */
    iterateElements() {
        let elements = [];
        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                elements.push([i, j, this.getCell(i, j)]);
            }
        }
        return elements;
    }

/**
 * Converts the matrix to its string representation.
 *
 * @param {boolean} [decimal=false] - Optional flag to represent values as decimals instead of fractions.
 * @returns {string} - The string representation of the matrix.
 */
    stringify(decimal = false) {
        let string = "";
        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                if (decimal) {
                    string += this.array[i][j].toDecimal();
                } else {
                    string += this.array[i][j].stringify();
                }
                string += "    |    ";
            }
            string += "\n";
        }
        return string;
    }
}

/**
 *  Returns an n x n unit matrix.
 *  @param {number} n - The number of rows and columns of the matrix.
 *  @returns {Matrix} - The n x n unit matrix.
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
 * Creates and returns an empty matrix with the given number of rows and columns, initialized with zeros.
 *
 * @param {number} nRows - The number of rows for the empty matrix.
 * @param {number} nColumns - The number of columns for the empty matrix.
 * @returns {Matrix} - The newly created matrix with all values initialized to zero.
 */
export function getEmptyMatrix(nRows, nColumns) {
    let matrix = [];
    for (let i = 0; i < nRows; i++) {
        matrix.push([]);
        for (let j = 0; j < nColumns; j++) {
            matrix[i].push(ZERO);
        }
    }
    return new Matrix(matrix);
}
