import { NEGONE, ZERO, stringToFraction } from "../logic/fraction.js";
import { getById } from "./getElement.js";

/**
 * Represents a RowOperation class.
 * @class
 */
export class RowOperation {
    /**
     * Initializes a new instance of the RowOperation class.
     * @constructor
     * @param {string} id - The ID of the row operation.
     * @param {HTMLElement} table - The table element to which the row operation belongs.
     */
    constructor(id, table) {
        // Initialize properties
        this.id    = id;
        this.table = table;

        // Create the main combo box element
        this.comboBoxElement          = document.createElement("tr");
        this.firstOperatorDropdownID  = "firstOperator" + this.id;
        this.firstTextFieldID         = "firstText"     + this.id;
        this.firstTextFieldValue      = "1";
        this.secondOperatorDropdownID = "secondOperator" + this.id;
        this.rowDropdownID            = "rowDropdown"    + this.id;
        this.thirdOperatorDropdownID  = "thirdOperator"  + this.id;
        this.secondTextField          = "secondText"     + this.id;
        this.secondTextFieldValue     = "0";
        this.enabled = false;

        // Set combo box element attributes
        this.comboBoxElement.id        = this.id;
        this.comboboxButton            = document.createElement("button");
        this.comboboxButton.innerHTML  = "❱";
        this.comboboxButton.id         = this.id + "_displayCombobox";
        this.comboboxButton.className  = "button-primary button-combobox";
        this.comboBoxElement.className = "combobox-field";

        // Append the combo box button to the combo box element
        this.comboBoxElement.appendChild(this.comboboxButton);

        // Add click event listener to the combo box button
        this.comboboxButton.addEventListener(
            "click",
            this.handleComboboxButtons.bind(this)
        );
    }

    /**
     * Sets the properties of the RowOperation instance to default values.
     */
    setToDefaults() {
        this.firstTextFieldValue      = "1";
        this.secondTextFieldValue     = "0";

        // Set default values for text fields and row dropdown
        document.getElementById(this.firstTextFieldID).value = "1";
        document.getElementById(this.secondTextField).value = "0";
        document.getElementById(this.rowDropdownID).selectedIndex = parseInt(this.id.charAt(this.id.length - 1));
    }

    /**
     * Sets the value of the first text field.
     * @param {Event} e - The event object.
     */
    setFirstTextField(e) {
        this.firstTextFieldValue = e.target.value;
    }

    /**
     * Sets the value of the second text field.
     * @param {Event} e - The event object.
     */
    setSecondTextField(e) {
        this.secondTextFieldValue = e.target.value;
    }

    /**
     * Creates a select option element and appends it to a select element.
     * @param {string} id - The ID of the option element.
     * @param {string} option - The text content of the option.
     * @param {string} selectID - The ID of the select element.
     */
    createSelectOption(id, option, selectID) {
        const optionElement = document.createElement("option");
        optionElement.id = id;
        optionElement.innerText = option;
        optionElement.value = option;

        // Append the option element to the select element
        document.getElementById(selectID).appendChild(optionElement);
    }

    /**
     * Handles the click event for the combo box button.
     */
    handleComboboxButtons() {
        // Create an array of row dropdown options
        let rowDropdownOptions = [];
        for (let i = 1; i < this.table.rows.length+1; i++) {
            rowDropdownOptions.push("("+i+")");
        }

        // Define elements to be added to the combo box
        const elements = [
            { id: this.firstOperatorDropdownID,  element_name: "select", class: "combobox-dropdown", options: ["*", "/"], },
            { id: this.firstTextFieldID,         element_name: "input",  class: "combobox-input-field", },
            { id: this.secondOperatorDropdownID, element_name: "select", class: "combobox-dropdown", options: ["+", "-"], },
            { id: this.rowDropdownID,            element_name: "select", class: "combobox-dropdown", options: rowDropdownOptions, },
            { id: this.thirdOperatorDropdownID,  element_name: "select", class: "combobox-dropdown", options: ["*", "/"], },
            { id: this.secondTextField,          element_name: "input",  class: "combobox-input-field", },
        ];

        elements.forEach(elem => {
            if (document.getElementById(this.id).childElementCount < 7) {
                // Set combo box button symbol
                document.getElementById(this.id + "_displayCombobox").innerHTML = "❰";

                // Create and append HTML elements
                const htmlElement       = document.createElement(elem.element_name);
                htmlElement.textContent = elem.name;
                htmlElement.id          = elem.id;
                htmlElement.className   = elem.class;
                document
                    .getElementById(this.id)
                    .appendChild(
                        htmlElement,
                        document.getElementById(this.id + "_displayCombobox")
                    );

                // Enable the combo box
                this.enabled = true;

                if (elem.element_name == "select" ) {
                    // Create select options
                    let options = [];
                    options = elem.options
                    for (let i = 0; i < options.length; i++) {
                        this.createSelectOption(
                            "Option_" + i + this.id + elem.id,
                            options[i],
                            elem.id
                        );
                    }
                } 
            } else {
                
                if (document.getElementById(elem.id).style.display == "none") {
                    // Show the element
                    document.getElementById(elem.id).style.display = "inline";
                    this.enabled = true;
                    document.getElementById(this.id + "_displayCombobox").innerHTML = "❰";
                } else {
                    // Hide the element
                    document.getElementById(elem.id).style.display = "none";
                    this.enabled = false;
                    document.getElementById(this.id + "_displayCombobox").innerHTML = "❱";
                }
            }
        });

        // Set the selected index of the row dropdown
        document.getElementById(this.rowDropdownID).selectedIndex = parseInt(this.id.charAt(this.id.length - 1));

        // Add input event listeners to text fields
        document
            .getElementById(this.firstTextFieldID)
            .addEventListener("input", this.setFirstTextField.bind(this));
        document
            .getElementById(this.secondTextField)
            .addEventListener("input", this.setSecondTextField.bind(this));
    }

    /**
     * Removes a select option from the row dropdown.
     * @param {string} id - The ID of the option to remove.
     */
    removeRowDropdownSelectOption(id) {
        document
            .getElementById(
                "Option_" +
                    id +
                    "combobox_" +
                    this.id.substr(9) +
                    "rowDropdowncombobox_" +
                    this.id.substr(9)
            )
            .remove();
    }

    /**
     * Sets the options for the row dropdown based on the specified dimension.
     * @param {number} dimension - The current dimension of the row dropdown.
     * @param {number} n - The desired number of options for the row dropdown.
     */
    setNRowDropdownSelectOptions(dimension, n) {
        while (dimension < n) {
            dimension++;
            this.createSelectOption(
                "Option_" + (dimension - 1) + this.id + this.rowDropdownID,
                "(" + dimension + ")",
                this.rowDropdownID
            );
        }
        while (dimension > n) {
            dimension--;
            this.removeRowDropdownSelectOption(dimension);
        }
    }

    /**
     * Applies a row operation to a matrix and returns the modified matrix.
     * @param {Matrix} matrix - The input matrix to which the operation is applied.
     * @returns {Matrix} - The modified matrix after applying the operation.
     */
    apply(matrix) {
        let matrixCopy = matrix.clone();
        let matrixCopy2 = matrix.clone();
        
        let subjIdx = Number(this.id.substr(9));
        let subjMultiplier = stringToFraction(this.firstTextFieldValue);
        let mulOrDivSubj = getById(this.firstOperatorDropdownID).value;

        let operation = getById(this.secondOperatorDropdownID).value;

        let objIdx =
            Number(
                getById(this.rowDropdownID)
                    .value.replace("(", "")
                    .replace(")", "")
            ) - 1;
        let objMultiplier = stringToFraction(this.secondTextFieldValue);
        let mulOrDivObj = getById(this.thirdOperatorDropdownID).value;

        // Handle division operations
        if (mulOrDivSubj === "/") {
            subjMultiplier = subjMultiplier.inverse();
        }
        if (mulOrDivObj === "/") {
            objMultiplier = objMultiplier.inverse();
        }

        // Handle subtraction operation
        if (operation === "-") {
            objMultiplier = objMultiplier.mul(NEGONE);
        }

        // Apply the operations to the matrix
        matrixCopy2 = matrixCopy2.multiplyRowByScalar(subjIdx, subjMultiplier);
        matrixCopy = matrixCopy.multiplyRowByScalar(objIdx, objMultiplier);
        matrixCopy2 = matrixCopy2.addRow(subjIdx, matrixCopy.getRow(objIdx));

        return matrixCopy2;
    }
}

/**
 * Adds a combo box for row operations to the specified rowOperations array and table.
 * @param {string} id - The ID for the new combo box.
 * @param {RowOperation[]} rowOperations - The array of row operations to which the new combo box is added.
 * @param {HTMLElement} table - The table element to which the combo box belongs.
 * @returns {RowOperation[]} - The updated array of row operations.
 */
export function addCombobox(id, rowOperations, table) {
    rowOperations.push(new RowOperation(id, table));

    // Append the combo box element to the operations table
    getById("operations-table").appendChild(
        rowOperations[rowOperations.length - 1].comboBoxElement
    );

    rowOperations[rowOperations.length - 1].handleComboboxButtons();

    // Handle the combo box buttons and set initial values
    document.getElementById(
        rowOperations[rowOperations.length - 1].firstTextFieldID
    ).value = "1";
    document.getElementById(
        rowOperations[rowOperations.length - 1].secondTextField
    ).value = "0";

    // Set patterns for text fields
    document.getElementById(
        rowOperations[rowOperations.length - 1].firstTextFieldID
    ).pattern = "^[\\-\\+]{0,1}[\\d]*[.,\\/]{0,1}[\\d]*$";
    document.getElementById(
        rowOperations[rowOperations.length - 1].secondTextField
    ).pattern = "^[\\-\\+]{0,1}[\\d]*[.,\\/]{0,1}[\\d]*$";
    
    return rowOperations;
}

/**
 * Removes the last combo box from the specified rowOperations array.
 * @param {string} id - The ID of the combo box to remove.
 * @param {RowOperation[]} rowOperations - The array of row operations from which the combo box is removed.
 * @returns {RowOperation[]} - The updated array of row operations.
 */
export function removeCombobox(id, rowOperations) {
    // Remove the combo box element from the DOM
    document.getElementById("combobox_" + (rowOperations.length - 1)).remove();

    // Remove the last row operation from the array
    rowOperations.pop();

    return rowOperations;
}

/**
 * Ensures that there are a specific number of combo boxes in the rowOperations array.
 * @param {RowOperation[]} rowOperations - The array of row operations to adapt.
 * @param {HTMLElement} table - The table element to which the combo boxes belong.
 * @param {number} n - The desired number of combo boxes.
 * @returns {RowOperation[]} - The updated array of row operations.
 */
export function adaptComboboxes(rowOperations, table, n) {
    while (rowOperations.length < n) {
        rowOperations = addCombobox(
            "combobox_" + rowOperations.length,
            rowOperations,
            table
        );
    }
    while (rowOperations.length > n) {
        rowOperations = removeCombobox(rowOperations.length - 1, rowOperations);
    }

    return rowOperations;
}

/**
 * Updates the options of all row dropdowns in the rowOperations array based on the specified dimension and n.
 * @param {RowOperation[]} rowOperations - The array of row operations to update.
 * @param {number} dimension - The current dimension of the row dropdowns.
 * @param {number} n - The desired number of options for the row dropdowns.
 * @returns {RowOperation[]} - The updated array of row operations.
 */
export function updateRowOperations(rowOperations, dimension, n) {
    for (let i = 0; i < rowOperations.length; i++) {
        rowOperations[i].setNRowDropdownSelectOptions(dimension, n);

        let rowOperationNumber = parseInt(
            rowOperations[i].id.charAt(rowOperations[i].id.length - 1)
        );
        document.getElementById(rowOperations[i].rowDropdownID).selectedIndex =
            rowOperationNumber;
    }

    return rowOperations;
}

/**
 * Checks the validity of row operations to ensure they account for all rows.
 * @param {RowOperation[]} rowOperations - The array of row operations to check.
 * @returns {boolean} - True if all rows are accounted for, otherwise false.
 */
function checkValidity(rowOperations) {
    let rowOperationsMultipliedByZero = [];

    // Find row operations that multiply by zero
    rowOperations.forEach((rowOperation, i) => {
        if (stringToFraction(rowOperation.firstTextFieldValue).equals(ZERO)) {
            rowOperationsMultipliedByZero.push(rowOperation);
        }
    });

    let rowOperationsNotAccountedFor = [];
    // Create a list of row indices not accounted for
    rowOperationsMultipliedByZero.forEach(r => {
        rowOperationsNotAccountedFor.push(Number(r.id.substr(9)));
    });
    rowOperationsMultipliedByZero.forEach((rowOperation, i) => {
        let currentRowDropdownValue =
            Number(
                getById(rowOperation.rowDropdownID)
                    .value.replace("(", "")
                    .replace(")", "")
            ) - 1;

        // check if the current dropdown selected a row that was not accounted for, and does not multiply it by zero
        // if so than remove that referenced row from rowOperationsNotAccountedFor
        if (
            rowOperationsNotAccountedFor.includes(currentRowDropdownValue) &&
            !stringToFraction(rowOperation.secondTextFieldValue).equals(ZERO)
        ) {
            rowOperationsNotAccountedFor.splice(
                rowOperationsNotAccountedFor.indexOf(currentRowDropdownValue),
                1
            );
        }
    });
    return rowOperationsNotAccountedFor.length == 0;
}

/**
 * Applies a series of row operations to a matrix and returns the modified matrix.
 * @param {Matrix} matrix - The input matrix to which the operations are applied.
 * @param {RowOperation[]} rowOperations - The array of row operations to apply.
 * @returns {Matrix} - The modified matrix after applying the row operations.
 * @throws {Error} - If the row operations are invalid.
 */
export function applyRowOperations(matrix, rowOperations) {
    let matrixCopy = matrix.clone();

    // Check the validity of row operations
    if (!checkValidity(rowOperations)) {
        throw Error("Invalide Zeilenoperationen!");
    }

    // Apply each enabled row operation to the matrix
    rowOperations.forEach((rowOperation, i) => {
        if (rowOperation.enabled) {
            let newMatrix = rowOperation.apply(matrix);
            matrixCopy = matrixCopy.setRow(i, newMatrix.getRow(i));
        }
    });
    return matrixCopy;
}


/**
 * Clears the values of all row operations to their defaults.
 * @param {RowOperation[]} rowOperations - The array of row operations to clear.
 */
export function clearRowOperations(rowOperations) {
    // Set all row operations to their default values
    rowOperations.forEach((rowOperation, i) => {
        rowOperation.setToDefaults();
    });
}
