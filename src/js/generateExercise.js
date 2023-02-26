import { getUnitMatrix } from "./utils.js";

const levelSettings = {
    0: {
        dimension: 3,
        nOperations: 4,
    },
    1: {
        dimension: 4,
        nOperations: 6,
    },
    2: {
        dimension: 5,
        nOperations: 8,
    },
};

export function generateMatrix(difficultyLevel) {
    let dimension = levelSettings[difficultyLevel].dimension;
    let nOperations = levelSettings[difficultyLevel].nOperations;

    let matrix = getUnitMatrix(dimension);
    for (let i = 0; i < nOperations; i++) {
        try{
            matrix = randomOperation(matrix);
        } catch (error) {
            console.log(error);
        }
    }

    return matrix;
}

const operations = [
    (matrix, scalar) => {
        return matrix.mul(scalar);
    },
    (matrix, scalar) => {
        return matrix.swapRows((scalar + 1) % matrix.nRows, scalar);
    },
    (matrix, scalar) => {
        return matrix.multiplyRowByScalar((scalar + 1) % matrix.nRows, scalar);
    },
    (matrix, scalar) => {
        return matrix.addRow(
            scalar,
            matrix.getRow((scalar + 1) % matrix.nRows)
        );
    },
];

function randomOperation(matrix) {
    let operationIdx = Math.floor(Math.random() * operations.length);
    let scalar = Math.floor(Math.random() * matrix.nRows) + 1;
    let operation = operations[operationIdx];
    matrix = operation(matrix, scalar);
    return matrix;
}
