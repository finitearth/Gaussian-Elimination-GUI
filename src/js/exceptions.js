class DivByZeroException extends Exception {
    constructor() {
        super("Divide by zero");
    }
}

class UnsolvableMatrixException extends Exception {
    constructor() {
        super("Matrix is unsolvable");
    }
}

class LinearDependentMatrixException extends Exception {
    constructor() {
        super("Matrix is linear dependent");
    }
}

class InvalidInputException extends Exception {
    constructor() {
        super("Invalid input");
    }
}
