import { Fraction } from "./fraction.js";

export class Matrix {
    constructor(array) {
        this.array = array;
        this.nRows = array.length;
        this.nColumns = array[0].length;
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

    getPivot(i) {
        // check if array[i][i] exists
        if (i >= this.nRows || i >= this.nColumns) {
            throw new Error("haha Singular Matrix");
        }

        if (typeof this.array[i][i] == "undefined") {
            throw new Error("Singular matrix");
        }

        // Find the pivot element (largest element in column)

        let pivot = this.array[i][i].abs();
        let pivotIndex = i;
        for (let j = i + 1; j < this.nRows; j++) {
            if (this.array[j][i].abs() > pivot) {
                element = this.array[j][i];
                if (
                    typeof element !== "undefined" &&
                    element.abs() > pivotElement.abs()
                ) {
                    pivot = element;
                    pivotIndex = i;
                }
                // pivot = this.array[j][i].abs();
                // pivotIndex = j;
            }
        }

        // if (this.array[i][i].abs().equals(new Fraction(0, 1))) {
        //     throw new Error('Singular matrix');
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

    getElement(iRow, iColumn) {
        return this.array[iRow][iColumn];
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

    stringify(decimal=false) {
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
