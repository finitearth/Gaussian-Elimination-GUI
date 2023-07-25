import { Matrix } from "../src/js/logic/matrix";
import { Fraction, NEGONE } from "../src/js/logic/fraction";
import { InvalidInputException } from "../src/js/exceptions";

let matrix1;
let matrix2;
let matrixSmall;

beforeEach(() => {
    matrix1 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    matrix2 = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(3, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
    ]);

    matrixSmall = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
    ]);
});

test("Matrix addition", () => {
    let matrix3 = new Matrix([
        [new Fraction(1, 2), new Fraction(3, 2), new Fraction(5, 2)],
        [new Fraction(4, 1), new Fraction(9, 2), new Fraction(7, 2)],
        [new Fraction(1, 2), new Fraction(0, 1), new Fraction(3, 2)],
    ]);

    expect(matrix1.add(matrix2).equals(matrix3)).toBe(true);
});

test("Matrix should not equal", () => {
    expect(matrix1.equals(matrix2)).toBe(false);
});

test("Matrix should not equal, not same dimensions", () => {
    expect(matrix1.equals(matrixSmall)).toBe(false);
});

test("Matrix clone should work", () => {
    let matrixClone = matrix1.clone();
    expect(matrix1.equals(matrixClone)).toBe(true);
});

test("empty row present should be detected", () => {
    let matrix = new Matrix([
        [new Fraction(1, 1), new Fraction(2, 1), new Fraction(3, 1)],
        [new Fraction(0, 1), new Fraction(0, 1), new Fraction(0, 1)],
        [new Fraction(1, 1), new Fraction(2, 1), new Fraction(3, 1)],
    ]);
    expect(matrix.hasEmptyRow()).toBe(true);
});

test("should return the maximum element in the matrix", () => {
    const matrix = new Matrix([
        [new Fraction(1, 1), new Fraction(2, 1)],
        [new Fraction(3, 1), new Fraction(4, 1)],
    ]);
    const result = matrix.max();
    expect(result.equals(new Fraction(4, 1))).toBe(true);
});
test("should return a new matrix with absolute values of all elements", () => {
    const matrix = new Matrix([
        [new Fraction(-1, 1), new Fraction(-2, 1)],
        [new Fraction(-3, 1), new Fraction(-4, 1)],
    ]);
    const result = matrix.abs();
    expect(result.getCell(0, 0).equals(new Fraction(1, 1))).toBe(true);
    expect(result.getCell(0, 1).equals(new Fraction(2, 1))).toBe(true);
    expect(result.getCell(1, 0).equals(new Fraction(3, 1))).toBe(true);
    expect(result.getCell(1, 1).equals(new Fraction(4, 1))).toBe(true);
});

test('should return a new matrix with the specified row and column excluded', () => {
    const matrix = new Matrix([
        [new Fraction(1, 1), new Fraction(2, 1), new Fraction(3, 1)],
        [new Fraction(4, 1), new Fraction(5, 1), new Fraction(6, 1)],
        [new Fraction(7, 1), new Fraction(8, 1), new Fraction(9, 1)],
    ]);
    const result = matrix.getSubMatrix(1, 1);
    expect(result.getCell(0, 0).equals(new Fraction(1, 1))).toBe(true);
    expect(result.getCell(0, 1).equals(new Fraction(3, 1))).toBe(true);
    expect(result.getCell(1, 0).equals(new Fraction(7, 1))).toBe(true);
    expect(result.getCell(1, 1).equals(new Fraction(9, 1))).toBe(true);
  });

test("should return the maximum element in the matrix", () => {
    const matrix = new Matrix([
        [new Fraction(-1, 1), new Fraction(-2, 1)],
        [new Fraction(-3, 1), new Fraction(-4, 1)],
    ]);
    const result = matrix.max();
    expect(result.equals(NEGONE)).toBe(true);
});

it('should return the determinant of the matrix', () => {
    const matrix = new Matrix([
        [new Fraction(1, 1), new Fraction(2, 1)],
        [new Fraction(3, 1), new Fraction(4, 1)],
    ]);

    const result = matrix.getDeterminant();
    expect(result.equals(new Fraction(-2, 1))).toBe(true);
  });

  it('should return the determinant of the matrix using gauß', () => {
    const matrix = new Matrix([
        [new Fraction(1, 1), new Fraction(2, 1)],
        [new Fraction(3, 1), new Fraction(4, 1)],
    ]);

    const result = matrix.getDeterminantUsingGaussElimination();
    expect(result.equals(new Fraction(-2, 1))).toBe(true);
  });

test("get Column", () => {
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
    expect(
        matrix1.mul(matrix1).equals(
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
    expect(() => {
        matrix1.mul("2");
    }).toThrow();
});

test("mul matrix should throw invalid input error", () => {
    expect(() => {
        matrix1.mul(matrixSmall);
    }).toThrow(InvalidInputException);
});

test("transpose matrix", () => {
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

test("add matrix should throw invalid input error", () => {
    expect(() => {
        matrix1.add(matrixSmall);
    }).toThrow(InvalidInputException);
});

test("sub matrix should work", () => {
    expect(
        matrix1.sub(matrix2).equals(
            new Matrix([
                [new Fraction(0, 1), new Fraction(0, 1), new Fraction(0, 1)],
                [new Fraction(-2, 1), new Fraction(0, 1), new Fraction(0, 1)],
                [new Fraction(0, 1), new Fraction(0, 1), new Fraction(0, 1)],
            ])
        )
    ).toBe(true);
});

test("set row should work", () => {
    let row = new Matrix([
        [new Fraction(7, 4), new Fraction(2, 4), new Fraction(0, 1)],
    ]);

    expect(
        matrix1.setRow(1, row).equals(
            new Matrix([
                [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
                [new Fraction(7, 4), new Fraction(2, 4), new Fraction(0, 1)],
                [new Fraction(1, 4), new Fraction(0, 1), new Fraction(3, 4)],
            ])
        )
    ).toBe(true);
});

test("number of solutions should be 1", () => {
    let matrix = new Matrix([
        [new Fraction(1, 1), new Fraction(2, 1), new Fraction(3, 1)],
        [new Fraction(4, 1), new Fraction(3, 1), new Fraction(2, 1)],
        [new Fraction(1, 1), new Fraction(2, 1), new Fraction(4, 1)],
    ]);
    expect(matrix.getNumberOfSolutions()).toBe(1);
});

test("number of solutions should be 0", () => {
    let matrix = new Matrix([
        [new Fraction(1, 1), new Fraction(2, 1), new Fraction(3, 1)],
        [new Fraction(0, 1), new Fraction(0, 1), new Fraction(0, 1)],
        [new Fraction(1, 1), new Fraction(2, 1), new Fraction(4, 1)],
    ]);
    expect(matrix.getNumberOfSolutions()).toBe(0);
});
