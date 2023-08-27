import { getById } from "./intermediate/getElement.js";

export class DivByZeroException extends Error {
    constructor(message = "Teilen durch Null nicht möglich.") {
        super(message);
    }
}

export class UnsolvableMatrixException extends Error {
    constructor(message="Matrix ist nicht lösbar.") {
        super(message);
    }
}

export class InvalidInputException extends Error {
    constructor(message="Invalider Input!") {
        super(message);
    }
}

export class InvalidRowOperationException extends Error {
    constructor(message="Invalide Zeilenoperation!") {
        super(message);
    }
}


export class InvalidMatrixDimension extends Error {
    constructor(message="Operation nicht möglich - Matrizen haben unvereinbare Dimensionen.") {
        super(message);
    }
}

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