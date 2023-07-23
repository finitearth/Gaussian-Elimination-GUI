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
    });

    let spyRemoveRow = jest.spyOn(table, "removeRow").mockImplementation(() => {
        table.rows.pop();
    });

    table.setNRows(7);
    expect(spyAddRow).toHaveBeenCalled();
    expect(table.rows.length).toEqual(7);
});

test("set Rows to a lower value should work", () => {
    let table = new Table("test-id");

    let spyAddRow = jest.spyOn(table, "addRow").mockImplementation(() => {
        table.rows.push(document.createElement("tr"));
    });

    let spyRemoveRow = jest.spyOn(table, "removeRow").mockImplementation(() => {
        table.rows.pop();
    });

    table.setNRows(2);
    expect(spyRemoveRow).toHaveBeenCalled();
    expect(table.rows.length).toEqual(2);
});

test("set Columns to a higher value should work", () => {
    let table = new Table("test-id");

    let spyAddColumn = jest.spyOn(table, "addColumn").mockImplementation(() => {
        table.nColumns += 1;
    });

    let spyRemoveColumn = jest
        .spyOn(table, "removeColumn")
        .mockImplementation(() => {
            table.nColumns -= 1;
        });

    table.setNColumns(7);
    expect(spyAddColumn).toHaveBeenCalled();
    expect(table.nColumns).toEqual(7);
});

test("set Columns to a lower value should work", () => {
    let table = new Table("test-id");

    let spyAddColumn = jest.spyOn(table, "addColumn").mockImplementation(() => {
        table.nColumns += 1;
    });

    let spyRemoveColumn = jest
        .spyOn(table, "removeColumn")
        .mockImplementation(() => {
            table.nColumns -= 1;
        });

    table.setNColumns(2);
    expect(spyRemoveColumn).toHaveBeenCalled();
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
    ]);

    let spySetNRows = jest.spyOn(table, "setNRows").mockImplementation(() => {
        table.nRows = 3;
    });

    let spySetNColumns = jest
        .spyOn(table, "setNColumns")
        .mockImplementation(() => {
            table.nColumns = 3;
        });

    table.setData(data);
    expect(table.getData()).toEqual(data);
});

test("set Data with only a fraction should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([[new Fraction(1, 4)]]);
    table.setData(data);
    expect(table.getData()).toEqual(data);
});

test("toDecimal should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    let spyGetData = jest.spyOn(table, "getData").mockImplementation(() => {
        return data;
    });
    table.setData(data);
    table.toDecimal();
    table.tableContainer.querySelectorAll("input").forEach(input => {
        expect(input.value).toEqual("0.25");
    });
});

test("toFraction should work", () => {
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
    ]);
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
        input.value = `${index}/4`;
    });
    let expected = new Matrix([
        [new Fraction(0, 4), new Fraction(1, 4)],
        [new Fraction(2, 4), new Fraction(3, 4)],
    ]);
    expect(table.getData().equals(expected)).toEqual(true);
});

test("add keydown listener should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    table.setData(data);
    addKeyDownListener([table]);
    document.getElementById("test-id.1.1").focus();
    let selectedCell = document.activeElement;
    let id = selectedCell.id;
    let event = new KeyboardEvent("keydown", { code: "ArrowDown" });
    document.dispatchEvent(event);
    // get id of cell below
    selectedCell = document.activeElement;
    let newId = selectedCell.id;
    expect(id).not.toEqual(newId);
});

test("set Row", () => {
    let table = new Table("test-id");
    let row = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    table.setRow(0, row);
    expect(table.getData().getRow(0).equals(row)).toEqual(true);
});

test("add cell should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    table.setData(data);
    let cell1 = table.addCell(0, 2);
    let cell2 = table.addCell(1, 2);

    let cell1Child = cell1.firstChild;
    let cell2Child = cell2.firstChild;

    expect(cell1Child.id).toEqual(table.id + ".0.2");
    expect(cell2Child.id).toEqual(table.id + ".1.2");

    console.log(table.tableContainer.innerHTML);
});

test("add row description should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    table.setData(data);
    table.addRowDescription(true);

    for (let i = 0; i < table.nRows - 1; i++) {
        let row = document.getElementById(i.toString());
        let firstElement = row.firstChild;
        expect(firstElement.innerText).toEqual("(" + (i + 1) + ")");
    }
});

test("add column description should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    table.setData(data);
    table.addColumnDescription("X");
    let desRow = document.getElementById("description-row");

    for (let i = 1; i < table.nColumns - 1; i++) {
        let desElement = document.getElementById(table.id + "0." + i);
        expect(desElement.innerText).toEqual("X");
        expect(desElement.innerHTML).toEqual("<sub>" + i + "</sub>");
    }
});

test("add row should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    table.setData(data);
    table.addRow();

    let newRow = document.getElementById("2");

    expect(newRow).toBeTruthy();
    expect(table.nRows).toEqual(3);
});

test("addColumn should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    table.setData(data);
    table.addColumn();

    let newColCell1 = document.getElementById(table.id + ".0.2");
    let newColCell2 = document.getElementById(table.id + ".1.2");

    expect(newColCell1).toBeTruthy();
    expect(newColCell2).toBeTruthy();
    expect(table.nColumns).toEqual(3);
});

test("addButtons should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    table.setData(data);
    table.addButtons();

    let buttonAddRow = document.getElementsByClassName(
        "button-matrixsize button-addrow"
    );
    let buttonRemoveRow = document.getElementsByClassName(
        "button-matrixsize button-removerow"
    );
    let buttonAddCol = document.getElementsByClassName(
        "button-matrixsize button-addcol"
    );
    let buttonRemoveCol = document.getElementsByClassName(
        "button-matrixsize button-removecol"
    );

    expect(buttonAddRow).toBeTruthy();
    expect(buttonRemoveRow).toBeTruthy();
    expect(buttonAddCol).toBeTruthy();
    expect(buttonRemoveCol).toBeTruthy();
});

test("removeRow should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    table.setData(data);
    table.removeRow();

    let lastRow = document.getElementById("2");
    expect(lastRow).not.toBeTruthy();
    expect(table.nRows).toEqual(2); // there's a bug related to nRows
});

test("convertRepresentation true should work", () => {
    let table = new Table("test-id");
    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
    ]);

    table.setData(data);

    let spyToDecimal = jest
        .spyOn(table, "toDecimal")
        .mockImplementation(() => {});

    table.convertRepresentation(true);

    expect(spyToDecimal).toHaveBeenCalled();
});

test("convertRepresentation false should work", () => {
    let table = new Table("test-id");

    let data = new Matrix([
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
        [new Fraction(1, 4), new Fraction(1, 4), new Fraction(1, 4)],
    ]);
    table.setData(data);

    let spyToFraction = jest
        .spyOn(table, "toFraction")
        .mockImplementation(() => {});

    table.convertRepresentation(false);

    expect(spyToFraction).toHaveBeenCalled();
});
