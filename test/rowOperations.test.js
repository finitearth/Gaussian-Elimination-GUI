/**
 * @jest-environment node
 */

import { getById } from "../src/js/intermediate/getElement.js";
import { RowOperation, addCombobox } from "../src/js/intermediate/rowoperation.js";
import { Table, addKeyDownListener } from "../src/js/intermediate/table.js";
import { Fraction } from "../src/js/logic/fraction.js";
import { Matrix } from "../src/js/logic/matrix.js";
import { JSDOM } from "jsdom";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

beforeEach(() => {
    const dom = new JSDOM(
        `<html>
        <div id="test-id">
        <div id="operations-table"></div>
        </div>
        </html>`
    );
    global.window = dom.window;
    global.document = dom.window.document;
    global.KeyboardEvent = dom.window.KeyboardEvent;
});



test("setFirstTextField should work", () => {
    let table = new Table("test-id");
    let inputValue = "5";

    let rowOperations = [];
    for (let i = 0; i < table.nRows; i++) {
        rowOperations = addCombobox("combobox_" + i, rowOperations, table);
    }

    // click display combobox button and simulate input event 
    fireEvent.click(document.getElementById("combobox_0_displayCombobox"))
    fireEvent.change(document.getElementById("firstTextcombobox_0"), {target: {value: inputValue}})
   
    expect(document.getElementById("firstTextcombobox_0").value).toBe(inputValue);
});

test("setSecondTextField should work", () => {
    let table = new Table("test-id");
    let inputValue = "5";

    let rowOperations = [];
    for (let i = 0; i < table.nRows; i++) {
        rowOperations = addCombobox("combobox_" + i, rowOperations, table);
    }

    // click display combobox button and simulate input event 
    fireEvent.click(document.getElementById("combobox_0_displayCombobox"))
    fireEvent.change(document.getElementById("secondTextcombobox_0"), {target: {value: inputValue}})
   
    expect(document.getElementById("secondTextcombobox_0").value).toBe(inputValue);
});

test("createSelectOption should work", () => {
   let dummySelect = document.createElement("select");
   dummySelect.id = "select-test-id";
   document.getElementById("test-id").appendChild(dummySelect);

   let table = new Table("test-id");
   let rowOperation = new RowOperation("rowOp", table)

   rowOperation.createSelectOption("option-1", "1", "select-test-id");

   // expected result
   expect(document.getElementById("select-test-id").children[0]).not.toBeNull();
   expect(document.getElementById("select-test-id").children[0].innerText).toBe("1");
   expect(document.getElementById("select-test-id").children[0].id).toBe("option-1");
});

test("handleComboboxButtons should work scenario 1", () => {
    let table = new Table("test-id");
    let rowOperation = new RowOperation("rowOp", table)


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
