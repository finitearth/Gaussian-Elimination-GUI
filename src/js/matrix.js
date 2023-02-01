import {Fraction} from './fraction.js';

export class Matrix{
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

    // scalarProduct(other) {
    //     let c = 0;
    //     for (let i = 0; i < this.columns; i++) {
    //         c += this.array[0][i] * other.array[i][0];
    //     }
    //     return c;
    // }



    // matrixProduct(other) {
    //     let newArray = [];
    //     for (let i = 0; i < this.rows; i++) {
    //         newArray[i] = [];
    //         for (let j = 0; j < other.columns; j++) {
    //             newArray[i][j] = this.array[];
    //         }
    //     }
    //     return new Matrix(newArray);
    // }

    getRow(iRow) {
        return this.array[iRow];
    }

    // make a pub

    getColumn(iColumn) {
        let column = [];
        for (let i = 0; i < this.nRows; i++) {
            column[i] = this.array[i][iColumn];
        }
        return column;
    }

    addRow(iRow, otherRow) {
        this.array[iRow] = this.array[iRow].add(otherRow);

        return this;
    }

    static multiplyRowByScalar(iRow, scalar) {
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
        
        return new Matrix(newArray);
    }
}