import { Matrix } from "./matrix.js";

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

    mul(other) {
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

    divide(other) {
        return this.multiply(other.inverse());
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

        return this;
    }

    convertToDecimal() {
        return this.numerator / this.denominator;
    }
}
