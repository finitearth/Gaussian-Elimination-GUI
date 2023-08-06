import { getById } from "./intermediate/getElement.js";

export class DivByZeroException extends Error {
    constructor() {
        super("Teilen durch Null nicht möglich.");
    }
}

export class UnsolvableMatrixException extends Error {
    constructor() {
        super("Matrix ist nicht lösbar");
    }
}

// export class LinearDependentMatrixException extends Error {
//     constructor() {
//         super("Matrix is linear dependent");
//     }
// }

export class InvalidInputException extends Error {
    constructor() {
        super("Invalider Input!");
    }
}

export class InvalidRowOperationException extends Error {
    constructor() {
        super("Invalide Zeilenoperation!");
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