import { Matrix } from "./matrix.js";
import { DivByZeroException, InvalidInputException } from "../exceptions.js";

/**
 * Class for fractions, defined as numerator divided by denominator.
 * @class
 * @param {int8} numerator
 * @param {uint8} denominator
 * @property {int8} numerator
 * @property {uint8} denominator
 */
export class Fraction {
    /**
     * Constructs a Fraction
     * @param {int8} numerator
     * @param {uint8} denominator
     */
    constructor(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    /**
     * Creates and returns a new `Fraction` object with the same numerator and denominator
     * as the current object.
     *
     * @returns {Fraction} A new `Fraction` object with the same numerator and denominator
     *                     as the current object.
     */

    clone() {
        return new Fraction(this.numerator, this.denominator);
    }

    /**
     * Returns a string representation of the fraction, in the form of "numerator/denominator" if the denominator is not equal to 1,
     * otherwise, it returns the numerator as a string.
     * @returns {string} A string representation of the fraction.
     */
    stringify() {
        if (this.numerator == 0) return "";
        if (this.denominator == 1) return this.numerator.toString();
        return this.numerator.toString() + "/" + this.denominator.toString();
    }

    /**
     * Returns the inverse of the fraction, i.e., a new fraction with the numerator and denominator swapped.
     * If the current fraction's numerator is zero, it throws a DivByZeroException.
     * @returns {Fraction} A new Fraction object representing the inverse of the current fraction.
     * @throws {DivByZeroException} If the numerator of the current fraction is zero.
     */
    inverse() {
        if (this.numerator == 0) {
            throw new DivByZeroException();
        }
        return new Fraction(this.denominator, this.numerator);
    }

    /**
     * Adds the current fraction to another fraction object and returns the result as a new fraction object.
     * The method multiplies the numerators of both fractions by the other's denominator, adds the products, and sets the denominator as the least common multiple of both denominators.
     * The returned fraction is reduced to its lowest terms.
     * @param {Fraction} other - The other fraction object to add to the current fraction.
     * @returns {Fraction} A new fraction object representing the result of the addition.
     */
    add(other) {
        let numerator =
            this.numerator * other.denominator +
            other.numerator * this.denominator;
        let denominator = this.denominator * other.denominator;
        let newFraction = new Fraction(numerator, denominator);
        newFraction = newFraction.reduce();
        return newFraction;
    }

    /**
     * Subtracts another fraction object from the current fraction and returns the result as a new fraction object.
     * The method multiplies the other fraction by -1 to get its negative, and then adds it to the current fraction using the add method.
     * @param {Fraction} other - The other fraction object to subtract from the current fraction.
     * @returns {Fraction} A new fraction object representing the result of the subtraction.
     */
    subtract(other) {
        return this.add(other.mul(new Fraction(-1, 1)));
    }

    /**
     * Alias for the `subtract` method.
     * This method performs subtraction in the same way as the `subtract` method does.
     * @param {Fraction} other - The other fraction object to subtract from the current fraction.
     * @returns {Fraction} A new fraction object representing the result of the subtraction.
     */
    sub(other) {
        return this.subtract(other);
    }

    /**
     * Returns true if the current fraction is greater than another fraction object, and false otherwise.
     * The method compares the fractions by cross-multiplying, i.e., by checking if this.numerator * other.denominator is greater than other.numerator * this.denominator.
     * @param {Fraction} other - The other fraction object to compare to the current fraction.
     * @returns {boolean} True if the current fraction is greater than the other fraction, and false otherwise.
     */
    greater(other) {
        return (
            this.numerator * other.denominator >
            other.numerator * this.denominator
        );
    }
    
    /**
     * Determines if the current fraction is less than another fraction object.
     * This method utilizes the `greater` method of the other fraction to determine the result.
     * @param {Fraction} other - The other fraction object to compare to the current fraction.
     * @returns {boolean} True if the current fraction is less than the other fraction, and false otherwise.
     */
    lower(other) {
        return other.greater(this);
    }

    /**
     * Returns true if the current fraction is equal to another fraction object, and false otherwise.
     * Two fractions are considered equal if their numerators and denominators are equal, or if both numerators are zero.
     * @param {Fraction} other - The other fraction object to compare to the current fraction.
     * @returns {boolean} True if the current fraction is equal to the other fraction, and false otherwise.
     */
    equals(other) {
        // check for 0 in numerator
        if (this.numerator === 0 && other.numerator === 0) {
            return true;
        }
        other = other.reduce();
        let thisReduced = this.reduce();
        return (
            thisReduced.numerator === other.numerator &&
            thisReduced.denominator === other.denominator
        );
    }
    /**
     * Returns a new fraction object that represents the absolute value of the current fraction.
     * The method returns a new fraction object with the absolute value of the numerator and denominator of the current fraction.
     * @returns {Fraction} A new fraction object representing the absolute value of the current fraction.
     */
    abs() {
        return new Fraction(
            Math.abs(this.numerator),
            Math.abs(this.denominator)
        );
    }

    /**
     * Multiplies the current fraction by another fraction object or a number and returns the result as a new fraction object.
     * If the argument is a number, it is converted to a fraction with denominator 1.
     * If the argument is a matrix, the method calls the matrix's `mul` method with the current fraction as the argument.
     * The product is calculated by multiplying the numerators and denominators of both fractions.
     * The returned fraction is reduced to its lowest terms.
     * @param {Fraction|number} other - The other fraction object or number to multiply with the current fraction.
     * @returns {Fraction} A new fraction object representing the result of the multiplication.
     */
    mul(other) {
        // if number
        if (typeof other == "number") {
            return this.mul(new Fraction(other, 1));
        }
        // if other type matrix
        if (other instanceof Matrix) {
            return other.mul(this);
        }
        let numerator = this.numerator * other.numerator;
        let denominator = this.denominator * other.denominator;

        let newFraction = new Fraction(numerator, denominator);
        newFraction = newFraction.reduce();
        return newFraction;
    }

    /**
     * Divides the current fraction by another fraction object and returns the result as a new fraction object.
     * The method calculates the inverse of the other fraction using its `inverse` method, and multiplies it with the current fraction using the `mul` method.
     * @param {Fraction} other - The other fraction object to divide the current fraction by.
     * @returns {Fraction} A new fraction object representing the result of the division.
     */
    div(other) {
        return this.mul(other.inverse());
    }

    /**
     * Finds the greatest common divisor (GCD) of the numerator and denominator of the current fraction.
     * The method uses the Euclidean algorithm to calculate the GCD of the numerator and denominator.
     * @returns {number} The greatest common divisor of the numerator and denominator of the current fraction.
     */
    gcd() {
        let a = this.numerator;
        let b = this.denominator;
        while (b != 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    /**
     * Reduces the current fraction to its lowest terms and returns the modified fraction object.
     * The method divides both the numerator and denominator by their greatest common divisor (GCD) using the `gcd` method.
     * If the denominator is negative, the sign is moved to the numerator.
     * The method modifies the current fraction object and returns it.
     * @returns {Fraction} The modified fraction object.
     */
    reduce() {
        let gcd = this.gcd();
        this.numerator /= gcd;
        this.denominator /= gcd;

        // if denominator is negative, move it to numerator
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }

        return this;
    }

    /**
     * Converts the current fraction to its decimal equivalent and returns it as a number.
     * The method divides the numerator by the denominator and returns the result as a number.
     * @returns {number} The decimal equivalent of the current fraction as a number.
     */
    toDecimal(nDecimals = 2) {
        return (
            Math.round((this.numerator / this.denominator) * 10 ** nDecimals) /
            10 ** nDecimals
        );
    }
}

/**
 * An instance of the `Fraction` class representing the value 1.
 *
 * @type {Fraction}
 */
export const ONE = new Fraction(1, 1);

/**
 * An instance of the `Fraction` class representing the value 0.
 *
 * @type {Fraction}
 */
export const ZERO = new Fraction(0, 1);

/**
 * An instance of the `Fraction` class representing the value -1.
 *
 * @type {Fraction}
 */
export const NEGONE = new Fraction(-1, 1);

/**
 * Converts a string representing a fraction or decimal to a Fraction object.
 *
 * If the input string contains a forward slash (/), it is assumed to represent
 * a fraction and is split into numerator and denominator. If the input string
 * contains a comma (,) or a period (.), it is assumed to represent a decimal
 * and is converted to a whole numbered fraction. If the input string consists
 * of only numerals, it is treated as an integer and a denominator of 1 is used.
 *
 * If the input string is empty, a Fraction object representing 0/1 is returned.
 *
 * @param {string} string - The input string to convert.
 * @throws {InvalidInputException} if the input string is not a valid representation
 * of a fraction or decimal.
 * @returns {Fraction} The Fraction object representing the input string.
 */
export function stringToFraction(string) {
    let numerator;
    let denominator;
    if (string == "") {
        // if string is empty, return 0/1
        return ZERO;
    }

    if (string.includes("/")) {
        // split string into numerator and denominator
        [numerator, denominator] = string.split("/");
        numerator = Number(numerator);
        denominator = Number(denominator);

        if (denominator === 0) {
            throw new InvalidInputException();
        }
    } else if (string.includes(",") || string.includes(".")) {
        // replace comma with .
        string = string.replace(",", ".");

        let digits = string.split(".")[1].length;

        let decimal = Number(string);
        numerator = decimal * 10 ** digits;
        denominator = 10 ** digits;
    } else if (string.match(/^-?[0-9]+$/)) {
        // string consists of only numerals
        numerator = Number(string);
        denominator = 1;
    } else {
        throw new InvalidInputException();
    }

    let fraction = new Fraction(numerator, denominator);
    fraction = fraction.reduce();
    return fraction;
}
