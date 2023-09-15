import {
    modifyDimListener,
    setEventListenerFunction,
    listenTableDimension,
    validate,
} from "../src/js/intermediate/eventlisteners.js";
import { getById } from "../src/js/intermediate/getElement.js";
import { JSDOM } from "jsdom";
import { Table } from "../src/js/intermediate/table.js";
import { Matrix } from "../src/js/logic/matrix.js";
import { Fraction } from "../src/js/logic/fraction.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("modifyDimListener()", () => {
    let mockTables;

    beforeEach(() => {
        // Create a mock DOM environment
        const dom = new JSDOM(`
      <html>
        <body>
          <input id="input-nr-rows" value="3">
          <input id="input-nr-cols" value="3">
          <button id="addrow"></button>
          <button id="addcol"></button>
          <button id="removerow"></button>
          <button id="removecol"></button>
        </body>
      </html>
    `);
        global.document = dom.window.document;

        // Create mock tables for testing
        mockTables = [
            {
                setNRows: jest.fn(),
                setNColumns: jest.fn(),
            },
            {
                setNRows: jest.fn(),
                setNColumns: jest.fn(),
            },
        ];
    });

    afterEach(() => {
        // Clean up mock elements after each test
        global.document = undefined;
    });

    it("should increase the number of rows when the add row button is clicked", () => {
        // Call the function with the mock tables
        modifyDimListener(mockTables);

        // Click the add row button
        getById("addrow").click();

        // Check that the number of rows has increased
        expect(getById("input-nr-rows").value).toEqual("4");
    });

    it("should increase the number of columns when the add column button is clicked", () => {
        // Call the function with the mock tables
        modifyDimListener(mockTables);

        // Click the add column button
        getById("addcol").click();

        // Check that the number of columns has increased
        expect(getById("input-nr-cols").value).toEqual("4");
    });

    it("should decrease the number of rows when the remove row button is clicked", () => {
        // Call the function with the mock tables
        modifyDimListener(mockTables);

        // Click the remove row button
        getById("removerow").click();

        // Check that the number of rows has decreased
        expect(getById("input-nr-rows").value).toEqual("2");
    });

    it("should decrease the number of columns when the remove column button is clicked", () => {
        // Call the function with the mock tables
        modifyDimListener(mockTables);

        // Click the remove column button
        getById("removecol").click();

        // Check that the number of columns has decreased
        expect(getById("input-nr-cols").value).toEqual("2");
    });
});

describe("setEventListenerFunction()", () => {
    it("should call the operation function when the button is clicked", () => {
        const dom = new JSDOM(`
        <html>
            <body>
                <div id="id1"></div>
                <button id="button"></button>
            </body>
        </html>
        `);
        global.document = dom.window.document;
        let table = new Table("id1");
        table.setData(new Matrix([[new Fraction(0, 1), new Fraction(0, 1)]]));
        let fn = () => {
            return [new Matrix([[new Fraction(1, 2), new Fraction(1, 2)]])];
        };
        setEventListenerFunction("button", [table], [table], fn, false);
        document.getElementById("button").click();
        expect(table.getData()).toEqual(
            new Matrix([[new Fraction(1, 2), new Fraction(1, 2)]])
        );
    });
});

describe("listenTableDimension", () => {
    let dom;
    let input;
    let tables;

    beforeEach(() => {
        dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <input id="input" type="number" value="2">
          <table id="table1"></table>
          <table id="table2"></table>
        </body>
      </html>
    `);

        input = dom.window.document.getElementById("input");
        global.document = dom.window.document;
        tables = [new Table("table1", 3), new Table("table2", 3)];
    });

    test("sets number of rows for tables when rowsOrCols is 'rows'", () => {
        listenTableDimension("input", tables, [], "rows");

        input.value = 4;
        input.dispatchEvent(new dom.window.Event("input"));
        expect(tables[0].rows).toHaveLength(4);
    });

    test("sets number of columns for tables when rowsOrCols is 'cols'", () => {
        listenTableDimension("input", tables, [], "cols");

        input.value = 4;
        input.dispatchEvent(new dom.window.Event("input"));

        expect(tables[0].nColumns).toEqual(4);
        expect(tables[1].nColumns).toEqual(4);
        expect(tables[0].nRows).toEqual(3);
        expect(tables[1].nRows).toEqual(3);
    });

    test("adds column description when desCharacter is provided and rowsOrCols is 'cols'", () => {
        const desCharacter = "y";
        tables[0].setData(
            new Matrix([
                [new Fraction(1, 2), new Fraction(1, 2)],
                [new Fraction(1, 2), new Fraction(1, 2)],
            ])
        );

        tables[1].setData(
            new Matrix([
                [new Fraction(1, 2), new Fraction(1, 2)],
                [new Fraction(1, 2), new Fraction(1, 2)],
            ])
        );

        listenTableDimension(
            "input",
            tables,
            [],
            "cols",
            false,
            desCharacter,
            true
        );

        input.value = 5;
        input.dispatchEvent(new dom.window.Event("input"));
        // check innertext of table[0].describtionRowId
        expect(
            document.getElementById(tables[0].describtionRowId).firstChild
                .innerText
        ).toEqual(desCharacter);
        expect(
            document.getElementById(tables[1].describtionRowId).firstChild
                .innerText
        ).toEqual(desCharacter);
    });

    test("errors in the function are not thrown, but alerted", () => {
        const fn = () => {
            throw new Error("test");
        };
        listenTableDimension("input", tables, [], "cols", false, null, false);
        expect(() => {
            input.dispatchEvent(new dom.window.Event("input"));
        }).not.toThrow();
    });

    afterEach(() => {
        global.document = undefined;
    });
});
