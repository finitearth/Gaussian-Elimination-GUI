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

    
});

test("set Rows should work", () => {
    let table = new Table("test-id");

    let spyAddRow = jest.spyOn(table, "addRow").mockImplementation(() => {
        table.rows.push(document.createElement("tr"));
    })

    let spyRemoveRow = jest.spyOn(table, "removeRow").mockImplementation(() => {
        table.rows.pop();
    })
    
    table.setNRows(7);
    expect(table.rows.length).toEqual(7);
    table.setNRows(2);
    expect(table.rows.length).toEqual(2);
});

// test("add columns should work", () => {
//     let table = new Table();
//     table.addColumn();
//     expect(Array.from(table.rows[0].children).length).toEqual(4);
// });


// test("remove columns should work", () => {
//     let table = new Table();
//     table.removeColumn();
//     expect(Array.from(table.rows[0].children).length).toEqual(2);
// });



// test("set columns should work", () => {
//     let table = new Table();
//     table.setNColumns(7);
//     expect(Array.from(table.rows[0].children).length).toEqual(7);
// });


// test("buttons should not show if showButtons=false", () => {
//     let table = new Table("test", false);
//     table.setNRows(2);

//     let buttons = Array.from(table.tableContainer.children);
//     buttons = buttons.filter(button =>
//         button.classList.contains("table-button")
//     );
//     buttons.forEach(button => {
//         expect(button.style.display).toEqual("none");
//     });
// });

// test("disable input should work", () => {
//     let table = new Table();
//     table.disableInput();
//     expect(table.rows[0].children[0].children[0].disabled).toEqual(true);
// });

// toString("reenabling input should work", () => {
//     let table = new Table();
//     table.disableInput();
//     table.enableInput();
//     expect(table.rows[0].children[0].children[0].disabled).toEqual(false);
//     excpect(table.enabled).toEqual(true);
// });

// test("setData should work", () => {
//     let table = new Table();
//     let data = new Matrix([
//         [new Fraction(1, 4), new Fraction(3, 4), new Fraction(5, 4)],
//         [new Fraction(1, 1), new Fraction(9, 4), new Fraction(7, 4)],
//         [new Fraction(1, 2), new Fraction(1, 4), new Fraction(3, 4)],
//     ])
//     table.setData(data);
//     expect(table.getData()).toEqual(data);
// });

// test("set Data with only a fraction should work", () => {
//     let table = new Table();
//     let data = new Fraction(1, 4);
//     table.setData(data);
//     expect(table.getData()).toEqual(new Matrix([[data]]));
// });

// test("toDecimal should work", () => {
//     let table = new Table();
//     let data = new Matrix([
//         [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
//         [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
//         [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
//     ])
//     table.setData(data);
//     table.toDecimal();
//     table.tableContainer.querySelectorAll("input").forEach(input => {
//         expect(input.value).toEqual("0.25");
//     }
//     );
// });

// test("toFraction should work", () => {
//     let table = new Table();
//     let data = new Matrix([
//         [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
//         [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
//         [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
//     ])
//     table.setData(data);
//     table.toDecimal();
//     table.toFraction();
//     table.tableContainer.querySelectorAll("input").forEach(input => {
//         expect(input.value).toEqual("1/4");
//     });
// });

// test("reading from user input in table should work", () => {
//     let table = new Table();
//     table.setNRows(2);
//     table.setNColumns(2);
//     table.tableContainer.querySelectorAll("input").forEach((input, index) => {
//         input.value = `${index}/4`
//     });
//     let expected = new Matrix([[new Fraction(0, 4), new Fraction(1, 4)], [new Fraction(2, 4), new Fraction(3, 4)]])
//     expect(table.getData().equals(expected)).toEqual(true);
// });

// // test("add keydown listener should work", () => {
// //     let table = new Table();
// //     addKeyDownListener([table]);
// //     let selectedCell = table.tableContainer.querySelector(".selected");
// //     let id = selectedCell.id;
// //     let event = new KeyboardEvent("keydown", { key: "Down" });
// //     cell.dispatchEvent(event);
// //     // get id of cell below
// //     selectedCell = table.tableContainer.querySelector(".selected");
// //     let newId = selectedCell.id;
// //     expect(id).not.toEqual(newId);
// // });

// test("set Row", () => {
//     let table = new Table();
//     let row = new Matrix([[new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)]]);
//     table.setRow(0, row);
//     expect(table.getData().getRow(0).equals(row)).toEqual(true);
// });
