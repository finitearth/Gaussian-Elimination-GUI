import {Fraction} from './fraction.js';

export class Matrix{
    constructor(array) {
        this.array = array;
        this.nRows = array.length;
        this.nColumns = array[0].length;
    }

    stringify() {
        let string = "";
        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                string += this.array[i][j].stringify();
                string += " ";
            }
            string += "<br>";
        }
        return string;
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

    // scalarProduct(other) {
    //     let c = new Fraction(0, 1);
    //     for (let i = 0; i <= this.columns; i++) {
    //         c = c.add(
    //                 this.getRow(i).array
    //                 .multiply(other.array[i])
    //         );
    //     }
    //     return c;
    // }

    matrixProduct(other) {
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
                    c = c.add(
                        this.array[i][k].multiply(other.array[k][j])
                    );
                }
                newArray[i][j] = c;
            }
        }
        return new Matrix(newArray);
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
        this.array[iRow] = this.array[iRow].add(otherRow);

        return this;
    }

    multiplyRowByScalar(iRow, scalar) {
        this.array[iRow] = this.array[iRow].multiply(scalar);
        return this;
    }

    multiplyMatrixByScalar(scalar) {
        let newArray = [];
        for (let i = 0; i < this.nRows; i++) {
            newArray[i] = [];
            for (let j = 0; j < this.nColumns; j++) {
                newArray[i][j] = this.array[i][j].multiply(scalar);
            }
        }
        console.log(newArray)
        return new Matrix(newArray);
    }
}