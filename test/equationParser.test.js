import { calculate } from "../src/js/logic/equationParser.js";
import { Matrix } from "../src/js/logic/matrix.js";
import { Fraction } from "../src/js/logic/fraction.js";
import { InvalidInputException } from "../src/js/exceptions.js";
import { Table } from "../src/js/intermediate/table.js";
import { JSDOM } from "jsdom";

let matrix1;
let matrix2;
let table1;
let table2;
let tables;
beforeEach(() => {
    const dom = new JSDOM(
        `<html>
        <div id="id1"></div>
        <div id="id2"></div>
        </html>`
    );
    global.window = dom.window;
    global.document = dom.window.document;

    tables = [new Table("id1"), new Table("id2")];

    matrix1 = new Matrix([
        [new Fraction(1, 2), new Fraction(1, 2)],
        [new Fraction(1, 2), new Fraction(1, 2)],
    ]);
    matrix2 = new Matrix([
        [new Fraction(1, 2), new Fraction(1, 2)],
        [new Fraction(1, 2), new Fraction(1, 2)],
    ]);
    table1 = new Table("id1");
    table2 = new Table("id2");
    table1.setData(matrix1);
    table2.setData(matrix2);

    tables = [table1, table2];

});

test("should calculate a simple equation", () => {
    expect(calculate("2+3")).toEqual(new Fraction(5, 1));
});

test("should calculate an equation with matrices and fractions", () => {
    expect(calculate("A*B", tables)).toEqual(
        new Matrix([
            [new Fraction(1, 2), new Fraction(1, 2)],
            [new Fraction(1, 2), new Fraction(1, 2)],
        ])
    );
});

test("should throw an exception for invalid input", () => {
    expect(() => calculate("2+3*")).toThrow(InvalidInputException);
});

test("subtraction should work", () => {
    expect(calculate("2-3")).toEqual(new Fraction(-1, 1));
});

test("defining a fraction should work", () => {
    expect(calculate("1/2")).toEqual(new Fraction(1, 2));
});

test("operation order should be correct, including paranthasis", () => {
    expect(calculate("2+(2+3)*2")).toEqual(new Fraction(12, 1));
});