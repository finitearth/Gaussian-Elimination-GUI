import { Fraction, ONE, ZERO, NEGONE } from "../src/js/logic/fraction";
import { Matrix } from "../src/js/logic/matrix";
import { simplexAlgorithm } from "../src/js/logic/simplexAlgorithm";

let coefMatrix, rhsMatrix;
beforeEach(() => {
    coefMatrix = new Matrix([
        [new Fraction(4, 10), new Fraction(3, 5), ONE, ZERO, ZERO],
        [new Fraction(3, 1), ONE, ZERO, ONE, ZERO],
        [new Fraction(3, 1), new Fraction(6, 1), ZERO, ZERO, ONE],
        [new Fraction(-990, 1), new Fraction(-900, 1), ZERO, ZERO, ZERO],
    ]);
    rhsMatrix = new Matrix([
        [new Fraction(17, 2)],
        [new Fraction(25, 1)],
        [new Fraction(70, 1)],
        [ZERO],
    ]);
});

test("should calculate", () => {
    let [solcoefMatrix, solrhsMatrix] = simplexAlgorithm(coefMatrix, rhsMatrix);
    expect(solcoefMatrix).toEqual(
        new Matrix([
            [ZERO, ZERO, ONE, new Fraction(-1, 25), new Fraction(-7, 75)],
            [ONE, ZERO, ZERO, new Fraction(2, 5), new Fraction(-1, 15)],
            [ZERO, ONE, ZERO, new Fraction(-1, 5), new Fraction(1, 5)],
            [ZERO, ZERO, ZERO, new Fraction(216, 1), new Fraction(114, 1)]
        ])
    );

    expect(solrhsMatrix).toEqual(
        new Matrix([
            [new Fraction(29, 30)],
            [new Fraction(16, 3)],
            [new Fraction(9, 1)],
            [new Fraction(13380, 1)]
        ])
    );
});
