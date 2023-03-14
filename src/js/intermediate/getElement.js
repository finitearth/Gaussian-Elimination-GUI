export function getById(id) {
    let element =  document.getElementById(id);
    if (element == null) {
        throw "No element with id " + id + " found.";
    }
    return element;
}