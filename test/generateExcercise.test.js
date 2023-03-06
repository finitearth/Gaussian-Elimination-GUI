import { gaussElimination } from '../src/js/gaussalgorithm.js';
import { getUnitMatrix } from '../src/js/matrix.js';
import { generateMatrix } from '../src/js/generateExercise.js';

test("generated Matrix should be solvable", () => {
    let matrix = generateMatrix(3, 3);
    let solMatrix = getUnitMatrix(3);
    let [coefMatrix2, solMatrix2] = gaussElimination(
        matrix,
        solMatrix,
        true
    );
    expect(coefMatrix2.equals(getUnitMatrix(3))).toEqual(true);
});