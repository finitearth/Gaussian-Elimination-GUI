import { gaussElimination } from "../src/js/logic/gaussalgorithm.js";
import { getUnitMatrix } from "../src/js/logic/matrix.js";
import { generateMatrix } from "../src/js/logic/generateExercise.js";

test("generated Matrix should have correct dimensions", () => {
    let matrix = generateMatrix(3, 3);

    expect(matrix.nRows).toBe(3);
    expect(matrix.nColumns).toBe(3);
});
