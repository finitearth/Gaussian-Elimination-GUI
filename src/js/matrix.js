import { Fraction } from "./fraction.js";

export class Matrix {
    constructor(array) {
        this.array = array;
        this.nRows = array.length;
        this.nColumns = array[0].length;
    }

    getCell(rowIndex, colIndex) {
        return this.array[rowIndex][colIndex];
    }

    add(otherMatrix) {
        let newArray = [];
        for (let i = 0; i < this.nRows; i++) {
            newArray[i] = [];
            for (let j = 0; j < this.nColumns; j++) {
                newArray[i][j] = this.array[i][j].add(otherMatrix.array[i][j]);
            }
        }
        return new Matrix(newArray);
    }

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


    getPivot(colIndex) {
        let pivot = this.getCell(colIndex, colIndex);
        let pivotIndex = colIndex;
        for (let j = colIndex + 1; j < this.nRows; j++) {
            let element = this.getCell(j, colIndex);
            if (element.abs().greater(pivot.abs())) {
                pivot = element;
                pivotIndex = j;
            }
        }

        // if (pivot == 0) {
        //     return [pivotIndex, 1];
        // }

        return [pivotIndex, pivot];
    }

    multiplyByMatrix(other) {
        if (this.nColumns != other.nRows) {
            throw new Error("Matrix dimensions do not match");
        }
        if (this.nRows != other.nColumns) {
            throw new Error("Matrix dimensions do not match");
        }
        let newArray = [];
        for (let i = 0; i < this.nRows; i++) {
            newArray[i] = [];
            for (let j = 0; j < other.nColumns; j++) {
                let c = new Fraction(0, 1);
                for (let k = 0; k < this.nColumns; k++) {
                    c = c.add(this.array[i][k].mul(other.array[k][j]));
                }
                newArray[i][j] = c;
            }
        }
        return new Matrix(newArray);
    }

    transpose() {
        let newArray = [];

        for (let i = 0; i < this.nColumns; i++) {
            newArray.push([]);
            for (let j = 0; j < this.nRows; j++) {
                newArray[i].push(this.array[j][i]);
            }
        }

        return new Matrix(newArray);
    }

    swapRows(iRow1, iRow2) {
        let temp = this.array[iRow1];
        this.array[iRow1] = this.array[iRow2];
        this.array[iRow2] = temp;
        return this;
    }

    getRow(iRow) {
        let newArray = new Matrix([this.array[iRow]]);
        return newArray;
    }

    getColumn(iColumn) {
        let column = [];
        for (let i = 0; i < this.nRows; i++) {
            column[i] = this.array[i][iColumn];
        }
        return new Matrix(column);
    }

    addRow(iRow, otherRow) {
        for (let i = 0; i < this.nColumns; i++) {
            this.array[iRow][i] = this.array[iRow][i].add(otherRow.array[0][i]);
        }

        return this;
    }

    multiplyRowByScalar(iRow, scalar) {
        for (let i = 0; i < this.nColumns; i++) {
            this.array[iRow][i] = this.array[iRow][i].mul(scalar);
        }
        return this;
    }

    addRowToRow(iRow, rowArray) {
        for (let i = 0; i < this.nColumns; i++) {
            this.array[iRow][i] = this.array[iRow][i].add(rowArray.getCell(0, i));
        }
        return this;
    }

    multiplyByScalar(scalar) {
        let newArray = [];
        for (let i = 0; i < this.nRows; i++) {
            newArray[i] = [];
            for (let j = 0; j < this.nColumns; j++) {
                newArray[i][j] = this.array[i][j].mul(scalar).reduce();
            }
        }
        return new Matrix(newArray);
    }

    getDeterminant() {
        if (this.nRows === 1 && this.nColumns === 1) {
            return this.getCell(0, 0);
        }

        let determinant = new Fraction(0, 1);
        let i = 0;
        for (let j = 0; j < this.nColumns; j++) {
            let sign = (i + j) % 2 == 0 ? 1 : -1;
            let subMatrix = this.getSubMatrix(i, j);
            let subDeterminant = subMatrix.getDeterminant();
            let coefficient = this.getCell(i, j);
            determinant = determinant.add(coefficient.mul(subDeterminant).mul(sign));
        }

        console.log(determinant);
        console.log(this.stringify())

        return determinant;
    }

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

    stringify(decimal = false) {
        let string = "";
        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                if (decimal) {
                    string += this.array[i][j].toDecimal();
                } else {
                    string += this.array[i][j].stringify();
                }
                string += " ";
            }
            string += "<br>";
        }
        return string;
    }
}
