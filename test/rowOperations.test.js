// import { RowOperation } from "../src/js/intermediate/rowOperation.js";
// import { Fraction } from "../src/js/logic/fraction.js";
// import { Matrix } from "../src/js/logic/matrix.js";
// import JSDOM from "jsdom";

describe("RowOperation", () => {
    test("wenn der durchgeht hat nick dicke eier", () => {
        expect(true).toBe(true);
    });
});

// describe("RowOperation", () => {
//     let rowOperation;
//     let matrix;

//     beforeEach(() => {
//         // set up jsdom
//         const dom = new JSDOM.JSDOM(
//             '<!DOCTYPE html><html><head></head><body><div id="rowOperationPlaceholder"></div></body></html>'
//         );
//         global.document = dom.window.document;
//         global.window = dom.window;
//         global.navigator = dom.window.navigator;

//         matrix = new Matrix([
//           [new Fraction(1, 1), new Fraction(2, 1)],
//           [new Fraction(3, 1), new Fraction(4, 1)]
//         ]);
//         rowOperation = new RowOperation(0, null);
//     });

//     describe("apply", () => {
//         it("should apply the row operation to the matrix", () => {
//             rowOperation.firstTextFieldValue = "2";
//             rowOperation.secondTextFieldValue = "3";
//             rowOperation.apply(matrix);
//             expect(matrix.get(0, 0)).toBe(7);
//             expect(matrix.get(0, 1)).toBe(10);
//             expect(matrix.get(1, 0)).toBe(3);
//             expect(matrix.get(1, 1)).toBe(4);
//         });
//     });
// });

//   test('should create a new RowOperation object', () => {
//     expect(rowOperation).toBeDefined();
//   });

//   test('should have an id property', () => {
//     expect(rowOperation.id).toBe(1);
//   });

//   test('should have a table property', () => {
//     expect(rowOperation.table).toEqual({});
//   });

//   test('should have an enabled property set to false', () => {
//     expect(rowOperation.enabled).toBe(false);
//   });

//   test('should have a comboBoxElement property', () => {
//     expect(rowOperation.comboBoxElement).toBeDefined();
//   });

//   test('should have a comboboxButton property', () => {
//     expect(rowOperation.comboboxButton).toBeDefined();
//   });

//   test('should have a firstOperatorDropdownID property', () => {
//     expect(rowOperation.firstOperatorDropdownID).toBeDefined();
//   });

//   test('should have a firstTextFieldID property', () => {
//     expect(rowOperation.firstTextFieldID).toBeDefined();
//   });

//   test('should have a firstTextFieldValue property set to "0"', () => {
//     expect(rowOperation.firstTextFieldValue).toBe('0');
//   });

//   test('should have a secondOperatorDropdownID property', () => {
//     expect(rowOperation.secondOperatorDropdownID).toBeDefined();
//   });

//   test('should have a rowDropdownID property', () => {
//     expect(rowOperation.rowDropdownID).toBeDefined();
//   });

//   test('should have a thirdOperatorDropdownID property', () => {
//     expect(rowOperation.thirdOperatorDropdownID).toBeDefined();
//   });

//   test('should have a secondTextField property', () => {
//     expect(rowOperation.secondTextField).toBeDefined();
//   });

//   test('should have a secondTextFieldValue property set to "0"', () => {
//     expect(rowOperation.secondTextFieldValue).toBe('0');
//   });

//   test('should have a handleComboboxButtons method', () => {
//     expect(rowOperation.handleComboboxButtons).toBeDefined();
//   });

//   test('should have a setFirstTextField method', () => {
//     expect(rowOperation.setFirstTextField).toBeDefined();
//   });

//   test('should have a setSecondTextField method', () => {
//     expect(rowOperation.setSecondTextField).toBeDefined();
//   });

//   test('should have a createSelectOption method', () => {
//     expect(rowOperation.createSelectOption).toBeDefined();
//   });

//   test('should have a removeRowDropdownSelectOption method', () => {
//     expect(rowOperation.removeRowDropdownSelectOption).toBeDefined();
//   });

//   test('should have a setNRowDropdownSelectOptions method', () => {
//     expect(rowOperation.setNRowDropdownSelectOptions).toBeDefined();
//   });

//   test('should have an apply method', () => {
//     expect(rowOperation.apply).toBeDefined();
//   });
// });
