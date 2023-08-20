import { Table, addKeyDownListener } from "../intermediate/table.js";
import { setEventListenerFunction } from "../intermediate/eventlisteners.js";
import { simplexAlgorithm } from "../logic/simplexAlgorithm.js";
import { listenTableDimension } from "../intermediate/eventlisteners.js";
import { getById } from "../intermediate/getElement.js";

// =========== Tables ===========
let coefTable = new Table("coef-table", 3);
coefTable.addColumnDescription("x");
coefTable.removeBrackets();

let rhsTable = new Table("rhs-table", 1);
rhsTable.addColumnDescription("b");
rhsTable.removeBrackets();

let outTable = new Table("output-table", 3);
outTable.disableInput();
outTable.removeBrackets();

let outBTable = new Table("output-b-table", 1);
outBTable.disableInput();
outBTable.removeBrackets();

// coefTable.setData(
//     new Matrix([
//         [new Fraction(4, 10), new Fraction(3, 5), ONE, ZERO, ZERO],
//         [new Fraction(3, 1), ONE, ZERO, ONE, ZERO],
//         [new Fraction(3, 1), new Fraction(6, 1), ZERO, ZERO, ONE],
//         [new Fraction(-990, 1), new Fraction(-900, 1), ZERO, ZERO, ZERO],
//     ])
// );

// rhsTable.setData(
//     new Matrix([
//         [new Fraction(17, 2)],
//         [new Fraction(25, 1)],
//         [new Fraction(70, 1)],
//         [ZERO],
//     ])
// );



// =========== Event listeners ===========
addKeyDownListener([coefTable, rhsTable], true);

let conversionButtonchecked = false;
getById("button-representation-conversion").addEventListener("click", () => {
    conversionButtonchecked = !conversionButtonchecked;
    [outTable, outBTable].forEach(table => {
        table.convertRepresentation(conversionButtonchecked);
    });
});

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
    3
);
listenTableDimension(
    "input-nr-cols",
    [coefTable],
    [],
    "cols",
    false,
    null,
    false,
    3
);
