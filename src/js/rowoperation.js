import { NEGONE, stringToFraction } from "./fraction.js";

export class RowOperation {
    constructor(id, table) {
        this.id = id;
        this.table = table;

        this.comboBoxElement = document.createElement("tr");
        this.firstOperatorDropdownID = "firstOperator" + this.id;
        this.firstTextFieldID = "firstText" + this.id;
        this.firstTextFieldValue = "0";
        this.secondOperatorDropdownID = "secondOperator" + this.id;
        this.rowDropdownID = "rowDropdown" + this.id;
        this.thirdOperatorDropdownID = "thirdOperator" + this.id;
        this.secondTextField = "secondText" + this.id;
        this.secondTextFieldValue = "0";
        this.enabled = false;

        this.comboBoxElement.id = this.id;
        this.comboboxButton = document.createElement("button");
        this.comboboxButton.innerHTML = "❱";
        this.comboboxButton.id = this.id + "_displayCombobox";
        this.comboboxButton.className = "button-combobox";
        this.comboBoxElement.className = "container-combobox";

        this.comboboxButton.addEventListener(
            "click",
            this.handleComboboxButtons.bind(this)
        );
        this.comboBoxElement.appendChild(this.comboboxButton);
    }

    setFirstTextField(e) {
        this.firstTextFieldValue = e.target.value;
    }

    setSecondTextField(e) {
        this.secondTextFieldValue = e.target.value;
    }

    createSelectOption(id, option, selectID) {
        const optionElement = document.createElement("option");
        optionElement.id = id;
        optionElement.innerText = option;
        optionElement.value = option;

        document.getElementById(selectID).appendChild(optionElement);
    }

    handleComboboxButtons() {
        const elements = [
            {
                id: this.firstOperatorDropdownID,
                element_name: "select",
                class: "combobox-dropdown",
                option_1: "*",
                option_2: "/",
            },
            {
                id: this.firstTextFieldID,
                element_name: "input",
                class: "combobox-input-field",
            },
            {
                id: this.secondOperatorDropdownID,
                element_name: "select",
                class: "combobox-dropdown",
                option_1: "+",
                option_2: "-",
            },
            {
                id: this.secondTextField,
                element_name: "input",
                class: "combobox-input-field",
            },
            {
                id: this.thirdOperatorDropdownID,
                element_name: "select",
                class: "combobox-dropdown",
                option_1: "*",
                option_2: "/",
            },
            {
                id: this.rowDropdownID,
                element_name: "select",
                class: "combobox-dropdown",
            },
        ];

        elements.forEach(elem => {
            if (document.getElementById(this.id).childElementCount < 7) {
                document.getElementById(
                    this.id + "_displayCombobox"
                ).innerHTML = "❰";

                const Element = document.createElement(elem.element_name);
                Element.textContent = elem.name;
                Element.id = elem.id;
                Element.className = elem.class;
                document
                    .getElementById(this.id)
                    .insertBefore(
                        Element,
                        document.getElementById(this.id + "_displayCombobox")
                    );

                this.enabled = true;

                if (
                    elem.element_name == "select" &&
                    elem.id != this.rowDropdownID
                ) {
                    this.createSelectOption(
                        "Option_1" + this.id + elem.id,
                        elem.option_1,
                        elem.id
                    );
                    this.createSelectOption(
                        "Option_2" + this.id + elem.id,
                        elem.option_2,
                        elem.id
                    );
                } else if (
                    elem.element_name == "select" &&
                    elem.id == this.rowDropdownID
                ) {
                    for (let i = 0; i < this.table.rows.length; i++) {
                        this.createSelectOption(
                            "Option_" + i + this.id + elem.id,
                            i + 1,
                            elem.id
                        );
                    }
                }
            } else {
                if (document.getElementById(elem.id).style.display == "none") {
                    document.getElementById(elem.id).style.display = "inline";
                    this.enabled = true;
                    document.getElementById(
                        this.id + "_displayCombobox"
                    ).innerHTML = "❰";
                } else {
                    document.getElementById(elem.id).style.display = "none";
                    this.enabled = false;
                    document.getElementById(
                        this.id + "_displayCombobox"
                    ).innerHTML = "❱";
                }
            }
        });
        document
            .getElementById(this.firstTextFieldID)
            .addEventListener("input", this.setFirstTextField.bind(this));
        document
            .getElementById(this.secondTextField)
            .addEventListener("input", this.setSecondTextField.bind(this));
    }

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

    setNRowDropdownSelectOptions(dimension, n) {
        while (dimension < n) {
            dimension++;
            this.createSelectOption(
                "Option_" + (dimension - 1) + this.id + this.rowDropdownID,
                dimension,
                this.rowDropdownID
            );
        }
        while (dimension > n) {
            dimension--;
            this.removeRowDropdownSelectOption(dimension);
        }
    }

    performRowOperation(matrix) {
        let matrixCopy = matrix.clone();

        // subj = Row to be modified, obj = row subj is modified with
        let subjIdx = Number(this.id.substr(9));
        let subjMultiplier = stringToFraction(this.firstTextFieldValue);
        let mulOrDivSubj = document.getElementById(
            this.firstOperatorDropdownID
        ).value;
        if (mulOrDivSubj === "/") {
            subjMultiplier = subjMultiplier.inverse();
        }

        let operation = document.getElementById(
            this.secondOperatorDropdownID
        ).value;

        let objIdx = Number(document.getElementById(this.rowDropdownID).value) - 1;
        let objMultiplier = stringToFraction(this.secondTextFieldValue);
        let mulOrDivObj = document.getElementById(
            this.thirdOperatorDropdownID
        ).value;
        if (mulOrDivObj === "/") {
            objMultiplier = objMultiplier.inverse();
        }

        if (operation === "-") {
            objMultiplier = objMultiplier.mul(NEGONE);
        }

        matrix = matrix.multiplyRowByScalar(subjIdx, subjMultiplier);
        matrixCopy = matrixCopy.multiplyRowByScalar(objIdx, objMultiplier);

        matrix = matrix.addRow(subjIdx, matrixCopy.getRow(objIdx));

        return matrix;
    }
}
