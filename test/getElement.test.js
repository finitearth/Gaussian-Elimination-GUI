import { getById } from "../src/js/intermediate/getElement";
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

test("getElement should work", () => {
    let element = getById("test-id");
    expect(element).toBeTruthy();
});

test("getElement should throw an error", () => {
    expect(() => getById("test-id2")).toThrow(Error);
});