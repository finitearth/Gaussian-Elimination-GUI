export function getById(id) {
    let element =  document.getElementById(id);
    if (element == null) {
        throw new Error("Element with id " + id + " not found.");
    }
    return element;
}