import { gaussElimination } from "../src/js/gaussalgorithm";
import { getUnitMatrix, Matrix } from "../src/js/matrix";
import { Fraction } from "../src/js/fraction";

test("Inverting via GaussElimination twice should return orig. matrix", () => {
    let coefMatrix = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);
    let solMatrix = getUnitMatrix(3);
    let [coefMatrix2, solMatrix2] = gaussElimination(
        coefMatrix,
        solMatrix,
        true
    );
    let [coefMatrix3, solMatrix3] = gaussElimination(
        coefMatrix2,
        solMatrix2,
        true
    );
    expect(coefMatrix3).toEqual(coefMatrix);
    expect(solMatrix3).toEqual(solMatrix);
});

test("matrix with linearly dependent rows should throw error", () => {
    let coefMatrix = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 2), new Fraction(3, 2), new Fraction(5, 2)],
    ]);
    let solMatrix = getUnitMatrix(3);
    expect(() => {
        gaussElimination(coefMatrix, solMatrix);
    }).toThrow();
});