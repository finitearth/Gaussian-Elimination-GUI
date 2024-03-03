/**
 * Returns the element with the given ID.
 * @param {string} id - The ID of the element to retrieve.
 * @returns {HTMLElement} - The element with the given ID.
 * @throws {Error} - If the element with the given ID does not exist.
 */
export function getById(id) {
    let element = document.getElementById(id);
    if (element == null) {
        throw new Error("Element with id " + id + " not found.");
    }
    return element;
}
