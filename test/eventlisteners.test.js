import {
    modifyDimListener,
    setEventListenerFunction,
} from "../src/js/intermediate/eventlisteners.js";
import { getById } from "../src/js/intermediate/getElement.js";
import { JSDOM } from "jsdom";

describe("modifyDimListener()", () => {
    let mockTables;

    beforeEach(() => {
        // Create a mock DOM environment
        const dom = new JSDOM(`
      <html>
        <body>
          <input id="input-nr-rows" value="2">
          <input id="input-nr-cols" value="2">
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
        expect(getById("input-nr-rows").value).toEqual("3");
    });

    it("should increase the number of columns when the add column button is clicked", () => {
        // Call the function with the mock tables
        modifyDimListener(mockTables);

        // Click the add column button
        getById("addcol").click();

        // Check that the number of columns has increased
        expect(getById("input-nr-cols").value).toEqual("3");
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
