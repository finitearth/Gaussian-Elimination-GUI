import { Fraction } from "./fraction.js";

export function stringToFraction(string) {
    if (string == "") { // if string is empty, return 0/1 (0
        return new Fraction(0, 1)
    } 

    if (string.includes("/")) {// split string into numerator and denominator
        const [numerator, denominator] = string.split("/");
        numerator = Number(numerator);
        denominator = Number(denominator);
    }
    
    else { // if no slash is contained, the string is a whole number
        const numerator = Number(string);
        const denominator = 1;
    }
    console.log(numerator, denominator)

    return new Fraction(numerator, denominator);
}