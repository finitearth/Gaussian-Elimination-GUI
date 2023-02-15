import { Table } from "./table.js";

export class RowOperation {
    constructor(id, table) {
        this.id = id;
        this.comboBoxElement            = document.createElement("tr");
        this.table                      = table;
        this.tables;
        this.firstOperatorDropdownID    = "firstOperator"+this.id; 
        this.firstTextFieldID           = "firstText"+this.id;
        this.secondOperatorDropdownID   = "secondOperator"+this.id;
        this.rowDropdownID              = "rowDropdown"+this.id;
        this.thirdOperatorDropdownID    = "thirdOperator"+this.id;
        this.secondTextField            = "secondText"+this.id;

        this.comboBoxElement.id         = this.id;
        this.comboboxButton             = document.createElement("button");
        this.comboboxButton.innerHTML   = "&#8680;";
        this.comboboxButton.id          = this.id+"_displayCombobox";
        this.comboboxButton.className   = "button-combobox";
        this.comboBoxElement.className  = "container-combobox";

        this.comboboxButton.addEventListener("click", this.handleComboboxButtons.bind(this));
        this.comboBoxElement.appendChild(this.comboboxButton);
    }       

    createSelectOption(id, option, selectID) {
        const optionElement = document.createElement("option");
        optionElement.id = id;
        optionElement.innerText = option;

        document.getElementById(selectID).appendChild(optionElement);
    }

    handleComboboxButtons() {
        const elements = [
            { name: "_", id: this.firstOperatorDropdownID,  element_name: "select", size: 1, option_1: "*", option_2: "/"  },
            { name: "_", id: this.firstTextFieldID,         element_name: "input",  size: 1  },
            { name: "_", id: this.secondOperatorDropdownID, element_name: "select", size: 1, option_1: "+", option_2: "-" },
            { name: "_", id: this.secondTextField,          element_name: "input",  size: 1  },
            { name: "_", id: this.thirdOperatorDropdownID,  element_name: "select", size: 1, option_1: "*", option_2: "/" },
            { name: "_", id: this.rowDropdownID,            element_name: "select", size: 1  }
        ];

        elements.forEach(elem => {
            if (document.getElementById(this.id).childElementCount < 7) {
                document.getElementById(this.id+"_displayCombobox").innerHTML = "&#8678;";

                const Element = document.createElement(elem.element_name);
                Element.textContent = elem.name;
                Element.id          = elem.id;
                Element.size        = elem.size;
                document.getElementById(this.id).insertBefore(Element, document.getElementById(this.id+"_displayCombobox"));

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
                    document.getElementById(this.id+"_displayCombobox").innerHTML = "&#8678;";
                } else {
                    document.getElementById(elem.id).style.display = "none";
                    document.getElementById(this.id+"_displayCombobox").innerHTML = "&#8680;";
                }
            }
        });
    }

    calculate() {
        
    }
}