import { Fraction, stringToFraction } from "../src/js/logic/fraction";
import { Matrix } from "../src/js/logic/matrix";

test("Fraction addition", () => {
    let a = new Fraction(1, 2);
    let b = new Fraction(1, 4);
    let c = a.add(b);
    expect(c).toEqual(new Fraction(3, 4));
});

test("Fraction Multiplication", () => {
    let a = new Fraction(1, 2);
    let b = new Fraction(1, 4);
    let c = a.mul(b);
    expect(c).toEqual(new Fraction(1, 8));
});

test("Fraction Division", () => {
    let a = new Fraction(1, 2);
    let b = new Fraction(1, 4);
    let c = a.div(b);
    expect(c).toEqual(new Fraction(2, 1));
});

test("Fraction reduction", () => {
    let a = new Fraction(2, 4);
    a = a.reduce();
    expect(a).toEqual(new Fraction(1, 2));
});

test("Fraction cloning", () => {
    let a = new Fraction(1, 2);
    let b = a.clone();
    expect(a).toEqual(b);
});

test("Fraction stringify", () => {
    let a = new Fraction(1, 2);
    expect(a.stringify()).toEqual("1/2");
});

test("Fraction stringify, denom=1", () => {
    let a = new Fraction(1, 1);
    expect(a.stringify()).toEqual("1");
});

test("Fraction div by zero", () => {
    let a = new Fraction(0, 1);
    expect(() => a.inverse()).toThrow();
});

test("Sub by Fraction", () => {
    let a = new Fraction(1, 2);
    let b = new Fraction(1, 4);
    let c = a.sub(b);
    expect(c).toEqual(new Fraction(1, 4));
});

test("Fraction equality", () => {
    let a = new Fraction(0, 2);
    let b = new Fraction(0, 4);
    expect(a.equals(b)).toBe(true);
});

test("Fraction equality, denom=1", () => {
    let a = new Fraction(2, 1);
    let b = new Fraction(2, 1);
    expect(a).toEqual(b);
});

test("Mul Fraction by Matrix", () => {
    let a = new Fraction(1, 2);
    let matrix = new Matrix([[new Fraction(1, 2), new Fraction(1, 2)]]);
    let result = a.mul(matrix);
    expect(result).toEqual(new Matrix([[new Fraction(1, 4), new Fraction(1, 4)]]));
});

test("Fraction to decimal", () => {
    let a = new Fraction(1, 2);
    expect(a.toDecimal()).toEqual(0.5);
});

test("String to Fraction", () => {
    let a = stringToFraction("1/2");
    expect(a).toEqual(new Fraction(1, 2));
});

test("String to fraction, empty string", () => {
    let a = stringToFraction("");
    expect(a).toEqual(new Fraction(0, 1));
});

test("String to fraction, 0 denominator", () => {
    expect(() => stringToFraction("1/0")).toThrow();
});

test("String to fraction, invalid string", () => {
    expect(() => stringToFraction("abc")).toThrow();
});

test("String to fraction, decimal", () => {
    let a = stringToFraction("0.5");
    expect(a).toEqual(new Fraction(1, 2));
});

test("String to fraction, decimal with comma", () => {
    let a = stringToFraction("0,5");
    expect(a).toEqual(new Fraction(1, 2));
});

test("String to fraction, no slash", () => {
    let a = stringToFraction("1");
    expect(a).toEqual(new Fraction(1, 1));
});

test("stringify if 0", () => {
    let a = new Fraction(0, 1);
    expect(a.stringify()).toEqual("");
});