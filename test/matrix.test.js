import { Matrix } from "../src/js/matrix";
import { Fraction } from "../src/js/fraction";

test("Matrix addition", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);
    let matrix2 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    let matrix3 = new Matrix([
        [new Fraction(1 , 2), new Fraction(3, 2), new Fraction(5, 2)],
        [new Fraction(2, 1), new Fraction(18, 4), new Fraction(14, 4)],
        [new Fraction(1, 2), new Fraction(0, 1), new Fraction(3, 2)],
    ]);

    expect(matrix1.add(matrix2)).toEqual(matrix3);
});