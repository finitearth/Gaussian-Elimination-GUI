export class DivByZeroException extends Error {
    constructor() {
        super("Divide by zero");
    }
}

export class UnsolvableMatrixException extends Error {
    constructor() {
        super("Matrix is unsolvable");
    }
}

export class LinearDependentMatrixException extends Error {
    constructor() {
        super("Matrix is linear dependent");
    }
}

export class InvalidInputException extends Error {
    constructor() {
        super("Invalid input");
    }
}

export class InvalidRowOperationException extends Error {
    constructor() {
        super("Invalid row operation");
    }
}