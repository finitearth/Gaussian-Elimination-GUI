export class DivByZeroException extends Exception {
    constructor() {
        super("Divide by zero");
    }
}

export class UnsolvableMatrixException extends Exception {
    constructor() {
        super("Matrix is unsolvable");
    }
}

export class LinearDependentMatrixException extends Exception {
    constructor() {
        super("Matrix is linear dependent");
    }
}

export class InvalidInputException extends Exception {
    constructor() {
        super("Invalid input");
    }
}

export class InvalidRowOperationException extends Exception {
    constructor() {
        super("Invalid row operation");
    }
}
