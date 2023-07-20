/**
 * @jest-environment node
 */

import { Table, addKeyDownListener } from "../src/js/intermediate/table.js";
import { Matrix } from "../src/js/logic/matrix.js";
import { Fraction } from "../src/js/logic/fraction.js";
import { JSDOM } from "jsdom";

beforeEach(() => {
    const dom = new JSDOM(
        `<html>
        <div id="test-id">
        </div>
        </html>`
    );
    global.window = dom.window;
    global.document = dom.window.document;
    global.KeyboardEvent = dom.window.KeyboardEvent;
    
});

test("set Rows to a higher value should work", () => {
    let table = new Table("test-id");

    let spyAddRow = jest.spyOn(table, "addRow").mockImplementation(() => {
        table.rows.push(document.createElement("tr"));
    })

    let spyRemoveRow = jest.spyOn(table, "removeRow").mockImplementation(() => {
        table.rows.pop();
    })

    table.setNRows(7);
    expect(spyAddRow).toHaveBeenCalled()
    expect(table.rows.length).toEqual(7);
});

test("set Rows to a lower value should work", () => {
    let table = new Table("test-id");

    let spyAddRow = jest.spyOn(table, "addRow").mockImplementation(() => {
        table.rows.push(document.createElement("tr"));
    })

    let spyRemoveRow = jest.spyOn(table, "removeRow").mockImplementation(() => {
        table.rows.pop();
    })

    table.setNRows(2);
    expect(spyRemoveRow).toHaveBeenCalled()
    expect(table.rows.length).toEqual(2);
});

test("set Columns to a higher value should work", () => {
    let table = new Table("test-id");

    let spyAddColumn = jest.spyOn(table, "addColumn").mockImplementation(() => {
        table.nColumns += 1;
    })

    let spyRemoveColumn = jest.spyOn(table, "removeColumn").mockImplementation(() => {
        table.nColumns -= 1;
    })

    table.setNColumns(7);
    expect(spyAddColumn).toHaveBeenCalled()
    expect(table.nColumns).toEqual(7);
});

test("set Columns to a lower value should work", () => {
    let table = new Table("test-id");

    let spyAddColumn = jest.spyOn(table, "addColumn").mockImplementation(() => {
        table.nColumns += 1;
    })

    let spyRemoveColumn = jest.spyOn(table, "removeColumn").mockImplementation(() => {
        table.nColumns -= 1;
    })

    table.setNColumns(2);
    expect(spyRemoveColumn).toHaveBeenCalled()
    expect(table.nColumns).toEqual(2);
});




test("buttons should not show if showButtons=false", () => {
    let table = new Table("test-id", false);

    let buttons = Array.from(table.tableContainer.children);
    buttons = buttons.filter(button =>
        button.classList.contains("table-button")
    );
    buttons.forEach(button => {
        expect(button.style.display).toEqual("none");
    });
});

test("disable input should work", () => {
    let table = new Table("test-id");
    table.disableInput();
    expect(table.rows[0].children[0].children[0].disabled).toEqual(true);
});

test("reenabling input should work", () => {
    let table = new Table("test-id");
    table.disableInput();
    table.enableInput();
    expect(table.rows[0].children[0].children[0].disabled).toEqual(false);
    expect(table.enabled).toEqual(true);
});

test("setData should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
        [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
        [new Fraction(1, 2), new Fraction(1, 4), new Fraction(3, 4)],
    ])

    
    let spySetNRows = jest.spyOn(table, "setNRows").mockImplementation(() => {
       table.nRows = 3;
    })

    let spySetNColumns = jest.spyOn(table, "setNColumns").mockImplementation(() => {
        table.nColumns = 3;
    })

    table.setData(data);
    expect(table.getData()).toEqual(data);
});

test("set Data with only a fraction should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4)]
    ])
    table.setData(data);
    expect(table.getData()).toEqual(data);
});

test("toDecimal should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
    ])
    let spyGetData = jest.spyOn(table, "getData").mockImplementation(() => {
        return data;
     })
    table.setData(data);
    table.toDecimal();
    table.tableContainer.querySelectorAll("input").forEach(input => {
        expect(input.value).toEqual("0.25");
    }
    );
});

test("toFraction should work", () => {
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
    ])
    let table = new Table("test-id");

    table.setData(data);
    table.toDecimal();
    table.toFraction();
    table.tableContainer.querySelectorAll("input").forEach(input => {
        expect(input.value).toEqual("1/4");
    });
});

test("reading from user input in table should work", () => {
    let table = new Table("test-id");
    table.setNRows(2);
    table.setNColumns(2);
    table.tableContainer.querySelectorAll("input").forEach((input, index) => {
        input.value = `${index}/4`
    });
    let expected = new Matrix([[new Fraction(0, 4), new Fraction(1, 4)], [new Fraction(2, 4), new Fraction(3, 4)]])
    expect(table.getData().equals(expected)).toEqual(true);
});

test("add keydown listener should work", () => {
    // sample.test.js

    // const { addKeyDownListener } = require('./your-module-file'); // Replace with the actual path to your module

    // Mock the DOM environment using JSDOM before running the tests
    


    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
    ])
    table.setData(data)
    addKeyDownListener([table]);
    let selectedCell = document.activeElement;
    let id = selectedCell.id;
    let event = new KeyboardEvent("keydown", { key: "ArrowDown" });
    document.dispatchEvent(event);
    // get id of cell below
    selectedCell = document.activeElement;
    let newId = selectedCell.id;
    console.log(id)
    console.log(newId)
    console.log(selectedCell)
    expect(id).not.toEqual(newId);
});


// test("set Row", () => {
//     let table = new Table();
//     let row = new Matrix([[new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)]]);
//     table.setRow(0, row);
//     expect(table.getData().getRow(0).equals(row)).toEqual(true);
// });
