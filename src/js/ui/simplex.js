import { Table } from "../intermediate/table.js";
import { Matrix } from "../logic/matrix.js";
import { setEventListenerFunction } from "../intermediate/eventlisteners.js";
import { simplexAlgorithm } from "../logic/simplexAlgorithm.js";
import { listenTableDimension } from "../intermediate/eventlisteners.js";
import { Fraction, ONE, ZERO } from "../logic/fraction.js";

// =========== Tables ===========
let coefTable = new Table("coef-table", 3);
coefTable.addColumnDescription("x");
coefTable.removeBrackets();

let rhsTable = new Table("rhs-table", 1);
rhsTable.addColumnDescription("b");
rhsTable.removeBrackets();

coefTable.setData(
    new Matrix([
        [new Fraction(4, 10), new Fraction(3, 5), ONE, ZERO, ZERO],
        [new Fraction(3, 1), ONE, ZERO, ONE, ZERO],
        [new Fraction(3, 1), new Fraction(6, 1), ZERO, ZERO, ONE],
        [new Fraction(-990, 1), new Fraction(-900, 1), ZERO, ZERO, ZERO],
    ])
);

rhsTable.setData(
    new Matrix([
        [new Fraction(17, 2)],
        [new Fraction(25, 1)],
        [new Fraction(70, 1)],
        [ZERO],
    ])
);

// let constraintCoefTable = new Table("constraint-coef-table");
// constraintCoefTable.removeBrackets();
// constraintCoefTable.addRowDescription();
// constraintCoefTable.addColumnDescription("x");
// let objectiveCoefTable = new Table("objective-coef-table", 3);
// objectiveCoefTable.setNRows(1);
// objectiveCoefTable.removeBrackets();
// objectiveCoefTable.addRowDescription("f");
// objectiveCoefTable.addColumnDescription("0*");

// let objectiveResultTable = new Table("objective-b-table", 1);
// objectiveResultTable.setNRows(1);
// objectiveResultTable.removeBrackets();

let outTable = new Table("output-table", 3);
outTable.setNRows(3);
outTable.disableInput();

let outBTable = new Table("output-b-table", 1);
outBTable.setNRows(3);
outBTable.disableInput();

// =========== Event listeners ===========
setEventListenerFunction(
    "button-calculate",
    [coefTable, rhsTable],
    [outTable, outBTable],
    simplexAlgorithm
);

listenTableDimension(
    "input-nr-rows",
    [coefTable, rhsTable],
    [],
    "rows",
    false,
    null,
    false,
    2
);
listenTableDimension(
    "input-nr-cols",
    [coefTable],
    [],
    "cols",
    false,
    null,
    false,
    2
);
// listenTableDimension("input-nr-cols", [], [], "cols", false, null, false, 1);
// listenTableDimension("input-nr-cols", [], [], "cols", false, null, false, 2);

// let validPattern = /^[-+]?[\d]*[.,\/]?[\d]*$/;

// getById("input-table-placeholder").addEventListener("keydown", () => {
//     validate(validPattern)
// });
