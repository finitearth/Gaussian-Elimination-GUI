import { Matrix } from "./matrix.js";
import { DivByZeroException } from "./exceptions.js";

export class Fraction {
    /**
     * Class for fractions, defined as numerator divided by denominator.
     * @param {int8} numerator
     * @param {uint8} denominator
     */
    constructor(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    stringify() {
        /**
        Returns a string representation of the fraction, in the form of "numerator/denominator" if the denominator is not equal to 1,
        otherwise, it returns the numerator as a string.
        @returns {string} A string representation of the fraction.
        */
        if (this.denominator == 1) {
            return this.numerator.toString();
        } else {
            return (
                this.numerator.toString() + "/" + this.denominator.toString()
            );
        }
    }

    inverse() {
        /**
    Returns the inverse of the fraction, i.e., a new fraction with the numerator and denominator swapped.
    If the current fraction's numerator is zero, it throws a DivByZeroException.
    @returns {Fraction} A new Fraction object representing the inverse of the current fraction.
    @throws {DivByZeroException} If the numerator of the current fraction is zero.
    */
        if (this.numerator == 0) {
            throw new DivByZeroException();
        }
        return new Fraction(this.denominator, this.numerator);
    }

    add(other) {
        /**
        Adds the current fraction to another fraction object and returns the result as a new fraction object.
        The method multiplies the numerators of both fractions by the other's denominator, adds the products, and sets the denominator as the least common multiple of both denominators.
        The returned fraction is reduced to its lowest terms.
        @param {Fraction} other - The other fraction object to add to the current fraction.
        @returns {Fraction} A new fraction object representing the result of the addition.
        */
        let numerator =
            this.numerator * other.denominator +
            other.numerator * this.denominator;
        let denominator = this.denominator * other.denominator;
        let newFraction = new Fraction(numerator, denominator);
        newFraction = newFraction.reduce();
        return newFraction;
    }

    subtract(other) {
        /**

    Subtracts another fraction object from the current fraction and returns the result as a new fraction object.
    The method multiplies the other fraction by -1 to get its negative, and then adds it to the current fraction using the add method.
    @param {Fraction} other - The other fraction object to subtract from the current fraction.
    @returns {Fraction} A new fraction object representing the result of the subtraction.
    */
        return this.add(other.mul(new Fraction(-1, 1)));
    }

    greater(other) {
    /**
    Returns true if the current fraction is greater than another fraction object, and false otherwise.
    The method compares the fractions by cross-multiplying, i.e., by checking if this.numerator * other.denominator is greater than other.numerator * this.denominator.
    @param {Fraction} other - The other fraction object to compare to the current fraction.
    @returns {boolean} True if the current fraction is greater than the other fraction, and false otherwise.
    */
        return (
            this.numerator * other.denominator >
            other.numerator * this.denominator
        );
    }

    equals(other) {
    /**
     * Returns true if the current fraction is equal to another fraction object, and false otherwise.
     * Two fractions are considered equal if their numerators and denominators are equal, or if both numerators are zero.
     * @param {Fraction} other - The other fraction object to compare to the current fraction.
     * @returns {boolean} True if the current fraction is equal to the other fraction, and false otherwise.
     */ 

        // check for 0 in numerator
        if (this.numerator === 0 && other.numerator === 0) {
            return true;
        }
        return (
            this.numerator === other.numerator &&
            this.denominator === other.denominator
        );
    }

    abs() {
    /**
     * Returns a new fraction object that represents the absolute value of the current fraction.
     * The method returns a new fraction object with the absolute value of the numerator and denominator of the current fraction.
     * @returns {Fraction} A new fraction object representing the absolute value of the current fraction.
     */ 

        return new Fraction(
            Math.abs(this.numerator),
            Math.abs(this.denominator)
        );
    }

    mul(other) {
    /**
     * Multiplies the current fraction by another fraction object or a number and returns the result as a new fraction object.
     * If the argument is a number, it is converted to a fraction with denominator 1.
     * If the argument is a matrix, the method calls the matrix's `mul` method with the current fraction as the argument.
     * The product is calculated by multiplying the numerators and denominators of both fractions.
     * The returned fraction is reduced to its lowest terms.
     * @param {Fraction|number} other - The other fraction object or number to multiply with the current fraction.
     * @returns {Fraction} A new fraction object representing the result of the multiplication.
     */ 

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

    div(other) {
        /**
 * Divides the current fraction by another fraction object and returns the result as a new fraction object.
 * The method calculates the inverse of the other fraction using its `inverse` method, and multiplies it with the current fraction using the `mul` method.
 * @param {Fraction} other - The other fraction object to divide the current fraction by.
 * @returns {Fraction} A new fraction object representing the result of the division.
 */ 
        return this.mul(other.inverse());
    }

    gcd() {
    /**
     * Finds the greatest common divisor (GCD) of the numerator and denominator of the current fraction.
     * The method uses the Euclidean algorithm to calculate the GCD of the numerator and denominator.
     * @returns {number} The greatest common divisor of the numerator and denominator of the current fraction.
     */ 

        let a = this.numerator;
        let b = this.denominator;
        while (b != 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    reduce() {
    /**
     * Reduces the current fraction to its lowest terms and returns the modified fraction object.
     * The method divides both the numerator and denominator by their greatest common divisor (GCD) using the `gcd` method.
     * If the denominator is negative, the sign is moved to the numerator.
     * The method modifies the current fraction object and returns it.
     * @returns {Fraction} The modified fraction object.
     */ 

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

    toDecimal() {
        /**
     * Converts the current fraction to its decimal equivalent and returns it as a number.
     * The method divides the numerator by the denominator and returns the result as a number.
     * @returns {number} The decimal equivalent of the current fraction as a number.
     */ 
        return this.numerator / this.denominator;
    }
}
