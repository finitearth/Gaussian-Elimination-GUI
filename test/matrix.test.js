import { Matrix } from "../src/js/logic/matrix";
import { Fraction } from "../src/js/logic/fraction";

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
        [new Fraction(1, 2), new Fraction(3, 2), new Fraction(5, 2)],
        [new Fraction(2, 1), new Fraction(9, 2), new Fraction(7, 2)],
        [new Fraction(1, 2), new Fraction(0, 1), new Fraction(3, 2)],
    ]);

    expect(matrix1.add(matrix2).equals(matrix3)).toBe(true);
});

test("Matrix should not equal", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    let matrix2 = new Matrix([
        [new Fraction(3, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(3, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(3, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    expect(matrix1.equals(matrix2)).toBe(false);
});

test("Matrix should not equal, not same dimensions", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    let matrix2 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
    ]);

    expect(matrix1.equals(matrix2)).toBe(false);
});

test("Matrix clone should work", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    let matrix2 = matrix1.clone();

    expect(matrix1.equals(matrix2)).toBe(true);
});

test("get Column", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    expect(
        matrix1
            .getColumn(1)
            .equals(
                new Matrix([
                    [
                        new Fraction(3, 4),
                        new Fraction(9, 4),
                        new Fraction(0, 1),
                    ],
                ])
            )
    ).toBe(true);
});

test("get Row", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    expect(
        matrix1
            .getRow(1)
            .equals(
                new Matrix([
                    [
                        new Fraction(1, 1),
                        new Fraction(9, 4),
                        new Fraction(7, 4),
                    ],
                ])
            )
    ).toBe(true);
});

test("Add Row", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    let row = new Matrix([
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
    ]);
    matrix1.addRow(1, row);

    expect(
        matrix1.equals(
            new Matrix([
                [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
                [new Fraction(2, 1), new Fraction(9, 2), new Fraction(7, 2)],
                [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
            ])
        )
    ).toBe(true);
});

test("Mul Matrix by scalar", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    let scalar = new Fraction(2, 1);

    expect(
        matrix1.mul(scalar).equals(
            new Matrix([
                [new Fraction(1, 2), new Fraction(3, 2), new Fraction(5, 2)],
                [new Fraction(2, 1), new Fraction(9, 2), new Fraction(7, 2)],
                [new Fraction(1, 2), new Fraction(0, 1), new Fraction(3, 2)],
            ])
        )
    ).toBe(true);
});

test("Mul Matrix by matrix", () => {
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

    expect(
        matrix1.mul(matrix2).equals(
            new Matrix([
                [new Fraction(9, 8), new Fraction(15, 8), new Fraction(41, 16)],
                [
                    new Fraction(47, 16),
                    new Fraction(93, 16),
                    new Fraction(13, 2),
                ],
                [new Fraction(1, 4), new Fraction(3, 16), new Fraction(7, 8)],
            ])
        )
    ).toBe(true);
});

test("Mul Matrix by Number", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    expect(
        matrix1.mul(2).equals(
            new Matrix([
                [new Fraction(1, 2), new Fraction(3, 2), new Fraction(5, 2)],
                [new Fraction(2, 1), new Fraction(9, 2), new Fraction(7, 2)],
                [new Fraction(1, 2), new Fraction(0, 1), new Fraction(3, 2)],
            ])
        )
    ).toBe(true);
});

test("mul matrix by string, should throw error", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    expect(() => {
        matrix1.mul("2");
    }).toThrow();
});

test("mul matrix, unmatching dimensions, should throw error", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    let matrix2 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
    ]);

    expect(() => {
        matrix1.mul(matrix2);
    }).toThrow();
});

test("transpose matrix", () => {
    let matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    expect(
        matrix1.transpose().equals(
            new Matrix([
                [new Fraction(1, 4), new Fraction(1, 1), new Fraction(1, 4)],
                [new Fraction(3, 4), new Fraction(9, 4), new Fraction(0, 1)],
                [new Fraction(5, 4), new Fraction(7, 4), new Fraction(3, 4)],
            ])
        )
    ).toBe(true);
});
