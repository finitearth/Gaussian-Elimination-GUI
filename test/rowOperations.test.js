/**
 * @jest-environment node
 */

// import { getById } from "../src/js/intermediate/getElement.js";
import { RowOperation, removeCombobox, adaptComboboxes, updateRowOperations } from "../src/js/intermediate/rowoperation.js";
import { addCombobox as addCombobox } from "../src/js/intermediate/rowoperation.js";
import { Table, addKeyDownListener } from "../src/js/intermediate/table.js";
// import { Fraction } from "../src/js/logic/fraction.js";
// import { Matrix } from "../src/js/logic/matrix.js";
import { JSDOM } from "jsdom";
// import React from 'react';
import { fireEvent } from '@testing-library/react'; //render

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

test("handleComboboxButtons should work if the combobox is created the first time", () => {
    let table = new Table("test-id");

    let rowOperations = [];
    for (let i = 0; i < table.nRows; i++) {
        rowOperations = addCombobox("combobox_" + i, rowOperations, table);
    }

    // click display combobox button
    fireEvent.click(document.getElementById("combobox_0_displayCombobox"))

    let combobox_1 = document.getElementById("combobox_0");

    // check whether everything has been created correctly
    expect(combobox_1.children.length).toBe(7)
    // check number of select options in the first dropdown
    expect(combobox_1.children[1].children.length).toBe(2);
    expect(combobox_1.children[3].children.length).toBe(2);
    expect(combobox_1.children[5].children.length).toBe(2);
    expect(combobox_1.children[6].children.length).toBe(table.nRows);
});

test("handleComboboxButtons should save user inputs after the user collapsed the combobox", () => {
    let table = new Table("test-id");

    let rowOperations = [];
    for (let i = 0; i < table.nRows; i++) {
        rowOperations = addCombobox("combobox_" + i, rowOperations, table);
    }

    // click display combobox button
    fireEvent.click(document.getElementById("combobox_0_displayCombobox"))

    //inputs
    fireEvent.change(document.getElementById("firstTextcombobox_0"), {target: {value: "1"}})
    fireEvent.change(document.getElementById("secondTextcombobox_0"), {target: {value: "2"}})

    // dropdowns
    fireEvent.change(document.getElementById("firstOperatorcombobox_0"), {target: {value: "/"}})
    fireEvent.change(document.getElementById("secondOperatorcombobox_0"), {target: {value: "-"}})
    fireEvent.change(document.getElementById("thirdOperatorcombobox_0"), {target: {value: "/"}})
    fireEvent.change(document.getElementById("rowDropdowncombobox_0"), {target: {value: "2"}})

    // collapse combobox and show it again
    fireEvent.click(document.getElementById("combobox_0_displayCombobox"))
    fireEvent.click(document.getElementById("combobox_0_displayCombobox"))
    let combobox_1 = document.getElementById("combobox_0");

    // check whether everything has been created correctly
    expect(combobox_1.children.length).toBe(7)
    // check number of select options in the first dropdown
    expect(combobox_1.children[1].children.length).toBe(2);
    expect(combobox_1.children[3].children.length).toBe(2);
    expect(combobox_1.children[5].children.length).toBe(2);
    expect(combobox_1.children[6].children.length).toBe(table.nRows);

    // check the text fields
    expect(combobox_1.children[2].value).toBe("1");
    expect(combobox_1.children[4].value).toBe("2");

    // check the dropdowns
    expect(combobox_1.children[1].value).toBe("/");
    expect(combobox_1.children[3].value).toBe("-");
    expect(combobox_1.children[5].value).toBe("/");
    expect(combobox_1.children[6].value).toBe("2");
});

test("removeRowDropdownSelectOption should work", () => {
    let table = new Table("test-id");
    let rowOperation = new RowOperation("combobox_0", table);
    document.getElementById("operations-table").appendChild(rowOperation.comboBoxElement);

    // click display combobox button
    fireEvent.click(document.getElementById("combobox_0_displayCombobox"))
  
    let combobox_1 = document.getElementById("combobox_0");

    expect(combobox_1.children.length).toBe(7);
    expect(combobox_1.children[6].children.length).toBe(3);

    // call removeRowDropdownSelectOption
    rowOperation.removeRowDropdownSelectOption(2);

    expect(combobox_1.children.length).toBe(7);
    expect(combobox_1.children[6].children.length).toBe(2);
});

test("setNRowDropdownSelectOptions should work if the number of rows is reduced", () => {
    let table = new Table("test-id");
    let rowOperation = new RowOperation("combobox_0", table);
    document.getElementById("operations-table").appendChild(rowOperation.comboBoxElement);

    // spy on removeRowDropdownSelectOption
    let spyRemoveRowDropdownSelectOption = jest
        .spyOn(rowOperation, "removeRowDropdownSelectOption")
        .mockImplementation(() => {
            
        });

    rowOperation.setNRowDropdownSelectOptions(3, 1)
    expect(spyRemoveRowDropdownSelectOption).toBeCalledTimes(2);
});

test("setNRowDropdownSelectOptions should work if the number of rows is increased", () => {
    let table = new Table("test-id");
    let rowOperation = new RowOperation("combobox_0", table);
    document.getElementById("operations-table").appendChild(rowOperation.comboBoxElement);

    // spy on removeRowDropdownSelectOption
    let spyCreateSelectOption = jest
        .spyOn(rowOperation, "createSelectOption")
        .mockImplementation(() => {
            
        });

    rowOperation.setNRowDropdownSelectOptions(3, 5)
    expect(spyCreateSelectOption).toBeCalledTimes(2);
});

test("addCombobox should work", () => {
    let table = new Table("test-id");

    let rowOperations = [];
    for (let i = 0; i < table.nRows; i++) {
        rowOperations = addCombobox("combobox_" + i, rowOperations, table);
    }

    expect(rowOperations.length).toBe(table.nRows);
    expect(document.getElementById("operations-table").children.length).toBe(3);
});

test("removeCombobox should work", () => {
    let table = new Table("test-id");

    let rowOperations = [];
    for (let i = 0; i < table.nRows; i++) {
        rowOperations = addCombobox("combobox_" + i, rowOperations, table);
    }

    rowOperations = removeCombobox("", rowOperations);

    expect(rowOperations.length).toBe(table.nRows-1);
    expect(document.getElementById("operations-table").children.length).toBe(2);
});

test("adaptComboboxes should work if the number of RowOperations is increased", () => {
    let table = new Table("test-id");

    let rowOperations = [];
    for (let i = 0; i < table.nRows; i++) {
        rowOperations = addCombobox("combobox_" + i, rowOperations, table);
    }

    rowOperations = adaptComboboxes(rowOperations, table, 5);

    expect(rowOperations.length).toBe(5);
    expect(document.getElementById("operations-table").children.length).toBe(5);
});

test("adaptComboboxes should work if the number of RowOperations is reduced", () => {
    let table = new Table("test-id");

    let rowOperations = [];
    for (let i = 0; i < table.nRows; i++) {
        rowOperations = addCombobox("combobox_" + i, rowOperations, table);
    }

    rowOperations = adaptComboboxes(rowOperations, table, 1);

    expect(rowOperations.length).toBe(1);
    expect(document.getElementById("operations-table").children.length).toBe(1);
});

test("updateRowOperations should work", () => {
    let table = new Table("test-id");

    let rowOperations = [];
    for (let i = 0; i < table.nRows; i++) {
        rowOperations = addCombobox("combobox_" + i, rowOperations, table);
    }

    let spySetNRowDropdownSelectOptions = jest
        .spyOn(rowOperations[0], "setNRowDropdownSelectOptions")
        .mockImplementation(() => {
            
        });

    // enable only one row operation
    fireEvent.click(document.getElementById("combobox_0_displayCombobox"));
    rowOperations = updateRowOperations(rowOperations, 3, 3);
    
    expect(spySetNRowDropdownSelectOptions).toBeCalledTimes(1);
});
