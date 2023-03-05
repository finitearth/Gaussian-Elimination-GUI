import {Matrix} from '../src/js/matrix.js';
import {Fraction} from '../src/js/fraction.js';

var matrix1 = new Matrix([
    [new Fraction(1, 1), new Fraction(1, 1)],
    [new Fraction(2, 1), new Fraction(2, 1)],
    [new Fraction(1, 1), new Fraction(1, 1)]
]);

let matrix2 = new Matrix([
    [new Fraction(2, 1), new Fraction(2, 1), new Fraction(2, 1)],
    [new Fraction(2, 1), new Fraction(2, 1), new Fraction(2, 1)]
]);

// console.log(matrix1.getColumn(0));

// console.log(matrix1.multiplyMatrixByScalar(new Fraction(4, 1)).array);
console.log(matrix2.matrixProduct(matrix1).array);
// console.log(new Fraction(1, 1).multiply(new Fraction(6, 3)));