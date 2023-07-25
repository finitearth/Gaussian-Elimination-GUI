import { gaussElimination } from "../src/js/logic/gaussalgorithm";
import { getUnitMatrix, Matrix } from "../src/js/logic/matrix";
import { Fraction } from "../src/js/logic/fraction";
import { UnsolvableMatrixException } from "../src/js/exceptions";

let matrix1;
let unitMatrix;
beforeEach(() => {
    matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);
    unitMatrix = getUnitMatrix(3);
});


// integration tests

test("Inverting via GaussElimination twice should return orig. matrix", () => {
    let [coefMatrix2, solMatrix2] = gaussElimination(
        matrix1,
        unitMatrix,
        true
    );
    let [coefMatrix3, solMatrix3] = gaussElimination(
        coefMatrix2,
        solMatrix2,
        true
    );
    expect(coefMatrix3).toEqual(matrix1);
    expect(solMatrix3).toEqual(unitMatrix);
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

test("Coefmatrix should be unit matrix after gaussElimination", () => {
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
    expect(coefMatrix2).toEqual(getUnitMatrix(3));
});

test("GaussElimination should return correct solution", () => {
    let coefMatrix = new Matrix([
        [new Fraction(3, 1), new Fraction(6, 1), new Fraction(3, 1)],
        [new Fraction(3, 1), new Fraction(6, 1), new Fraction(4, 1)],
        [new Fraction(0, 1), new Fraction(2, 1), new Fraction(1, 1)],
    ]);
    let solMatrix = new Matrix([
        [new Fraction(5, 1)],
        [new Fraction(2, 1)],
        [new Fraction(3, 1)],
    ]);
    solMatrix = gaussElimination(coefMatrix, solMatrix);
    expect(
        solMatrix.equals(
            new Matrix([
                [new Fraction(-4, 3)],
                [new Fraction(3, 1)],
                [new Fraction(-3, 1)],
            ])
        )
    ).toBe(true);
});
