import { Matrix } from "./matrix.js";
import { DivByZeroException } from "./exceptions.js";

export class Fraction {
    /**
     * Class for fractions, defined as numerator/denominator.
     * @param {int8} numerator
     * @param {uint8} denominator
     */
    constructor(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    stringify() {
        if (this.denominator == 1) {
            return this.numerator.toString();
        } else {
            return (
                this.numerator.toString() + "/" + this.denominator.toString()
            );
        }
    }
    inverse() {
        if (this.numerator == 0) {
            throw new DivByZeroException();
        }
        return new Fraction(this.denominator, this.numerator);
    }

    add(other) {
        let numerator =
            this.numerator * other.denominator +
            other.numerator * this.denominator;
        let denominator = this.denominator * other.denominator;
        let newFraction = new Fraction(numerator, denominator);
        newFraction = newFraction.reduce();
        return newFraction;
    }

    subtract(other) {
        return this.add(other.mul(new Fraction(-1, 1)));
    }

    greater(other) {
        return (
            this.numerator * other.denominator >
            other.numerator * this.denominator
        );
    }

    eqauls(other) {
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
        return new Fraction(
            Math.abs(this.numerator),
            Math.abs(this.denominator)
        );
    }

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
    // make the above function public

    div(other) {
        return this.mul(other.inverse());
    }

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

    toDecimal() {
        return this.numerator / this.denominator;
    }
}
