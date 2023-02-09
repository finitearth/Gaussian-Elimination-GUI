import { Table } from "./table.js";

export class RowOperation {

    constructor(id) {
        this.id = id;
        this.comboBoxElement          = document.createElement("tr");
        this.comboBoxElement.id       = this.id;

        this.comboboxButton           = document.createElement("button");
        this.comboboxButton.textContent = "Aloha";
        this.comboboxButton.id = this.id+"_displayCombobox";
        this.comboboxButton.addEventListener("click", this.handleComboboxButtons.bind(this));

        this.comboBoxElement.appendChild(this.comboboxButton);

        this.tables;
        this.firstOperatorDropdownID  = "firstOperator"+this.id; 
        this.firstTextFieldID         = "firstText"+this.id;
        this.secondOperatorDropdownID = "secondOperator"+this.id;
        this.rowDropdownID            = "rowDropdown"+this.id;
        this.thirdOperatorDropdownID  = "thirdOperator"+this.id;
        this.secondTextField          = "secondText"+this.id;
    }

    createSelectOption(id, option, selectID) {
        const optionElement = document.createElement("option");

        optionElement.id = id;
        optionElement.innerText = option;

        document.getElementById(selectID).appendChild(optionElement);
    }

    handleComboboxButtons() {

        const elements = [
            { name: "_", id: this.firstOperatorDropdownID,  function: this.chooseFirstOperation, element_name: "select", size: 1, option_1: "*", option_2: "/"  },
            { name: "_", id: this.firstTextFieldID,         function: this.readFirstText,        element_name: "input",  size: 1  },
            { name: "_", id: this.secondOperatorDropdownID, function: this.chooseSecondOperator, element_name: "select", size: 1, option_1: "+", option_2: "-" },
            { name: "_", id: this.secondTextField,          function: this.readSecondText,       element_name: "input",  size: 1  },
            { name: "_", id: this.thirdOperatorDropdownID,  function: this.chooseThirdOperator,  element_name: "select", size: 1, option_1: "*", option_2: "/" },
            { name: "_", id: this.rowDropdownID,            function: this.chooseRow,            element_name: "select", size: 1  }
        ];

        elements.forEach(elem => {
            if (document.getElementById(this.id).childElementCount < 7) {
                const Element = document.createElement(elem.element_name);

                Element.textContent = elem.name;
                Element.id = elem.id;
                Element.size = elem.size;
                Element.addEventListener("click", elem.function.bind(this));
                document.getElementById(this.id).insertBefore(Element, document.getElementById(this.id+"_displayCombobox"));

                if (elem.element_name == "select") {
                    this.createSelectOption("Option_1"+this.id+elem.id, elem.option_1, elem.id);
                    this.createSelectOption("Option_2"+this.id+elem.id, elem.option_2, elem.id);
                };
            }
            else {
                if ( document.getElementById(elem.id).style.display == "none" ) {
                    document.getElementById(elem.id).style.display = "inline"
                }
                else{
                     document.getElementById(elem.id).style.display = "none"
                };
            };
        });
    }

    chooseFirstOperation() {

    }

    readFirstText() {


    }

    chooseSecondOperator() {

    }

    chooseRow() {

    }

    chooseThirdOperator() {

    }

    readSecondText() {

    }

}