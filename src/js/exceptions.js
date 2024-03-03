import { getById } from "./intermediate/getElement.js";

// Custom exception class for division by zero errors
export class DivByZeroException extends Error {
    /**
     * Creates a new DivByZeroException instance with an optional error message.
     * @param {string} message - The error message (default: "Teilen durch Null nicht möglich.").
     */
    constructor(message = "Teilen durch Null nicht möglich.") {
        super(message);
    }
}

// Custom exception class for unsolvable matrix errors
export class UnsolvableMatrixException extends Error {
    /**
     * Creates a new UnsolvableMatrixException instance with an optional error message.
     * @param {string} message - The error message (default: "Matrix ist nicht lösbar.").
     */
    constructor(message="Matrix ist nicht lösbar.") {
        super(message);
    }
}

// Custom exception class for invalid input errors
export class InvalidInputException extends Error {
    /**
     * Creates a new InvalidInputException instance with an optional error message.
     * @param {string} message - The error message (default: "Invalider Input!").
     */
    constructor(message="Invalider Input!") {
        super(message);
    }
}

// Custom exception class for invalid row operation errors
export class InvalidRowOperationException extends Error {
    /**
     * Creates a new InvalidRowOperationException instance with an optional error message.
     * @param {string} message - The error message (default: "Invalide Zeilenoperation!").
     */
    constructor(message="Invalide Zeilenoperation!") {
        super(message);
    }
}

// Custom exception class for invalid matrix dimension errors
export class InvalidMatrixDimension extends Error {
    /**
     * Creates a new InvalidMatrixDimension instance with an optional error message.
     * @param {string} message - The error message (default: "Operation nicht möglich - Matrizen haben unvereinbare Dimensionen.").
     */
    constructor(message="Operation nicht möglich - Matrizen haben unvereinbare Dimensionen.") {
        super(message);
    }
}

/**
 * Displays an error message in an alert box and logs the error to the console.
 * @param {Error} error - The error to be displayed.
 */
export function alertError(error) {
    console.log(error);
    let alertBox = getById("alert");
    alertBox.classList.remove("hidden");
    error = error.toString().replace(/^Error: /, "");
    alertBox.innerHTML = error;
    setTimeout(() => {
        alertBox.classList.add("hidden");
    }, 7000);
}