
class Table {
    constructor() {
        this.tableElement = document.createElement("table");
        this.tableBody = document.createElement("tbody");
        this.tableBody.id = "tableRows";
        this.tableElement.appendChild(this.tableBody);
    
        this.nColumns = 3;
        this.rows = [];
        for (let i = 0; i < 3; i++){this.addRow();}
    
        const buttons = [
            { name: "Add Row", id: "RowAdder", function: this.addRow },
            { name: "Add Column", id: "ColumnAdder", function: this.addColumn },
            { name: "Remove Row", id: "RowRemover", function: this.removeRow },
            { name: "Remove Column", id: "ColumnRemover", function: this.removeColumn },
            { name: "Save", id: "Saver", function: this.getData }
        ];
    
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttons";

        buttons.forEach(button => {
            const buttonElement = document.createElement("button");
            buttonElement.textContent = button.name;
            buttonElement.id = button.id;
            buttonElement.addEventListener("click", button.function.bind(this));
            buttonsContainer.appendChild(buttonElement);
        });
    
        this.tableContainer = document.createElement("div");
        this.tableContainer.appendChild(this.tableElement);
        this.tableContainer.appendChild(buttonsContainer);
    }
      

    addRow() {
        if (this.rows.length > 10) {
            return;
        }
        const rowId = this.rows.length;
        const row = document.createElement("tr");
        row.id = rowId;

        for (let i = 0; i < this.nColumns; i++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.value = "";
            input.size = 2;
            input.id = `${rowId}-${i}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }

        this.rows.push(row);
        this.tableBody.appendChild(row);
    }

    addColumn() {
        this.nColumns += 1;
        for (let i = 0; i < this.rows.length; i++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            // input.type = "ber";
            input.size = 2;
            input.value = "";
            input.id = `${i}-${this.nColumns - 1}`;
            cell.appendChild(input);
            this.rows[i].appendChild(cell);
        }
    }

    removeRow() {
        if (this.rows.length > 1) {
            this.rows.pop();
            this.tableBody.removeChild(this.tableBody.lastChild);
        }
    }

    removeColumn() {
        if (this.nColumns < 2) {
            return;
        }
        this.nColumns -= 1;
        for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].removeChild(this.rows[i].lastChild);
        }
    }

    getHtml() {
        return this.tableContainer;
    }

    readTable() {
        let table = document.getElementById("table");
        console.log(table);
    }

    
    getData() {
        let data = [];
        for (let i = 0; i < this.rows.length; i++) {
            let row = [];
            for (let j = 0; j < this.nColumns; j++) {
                let input = this.rows[i].childNodes[j].childNodes[0];
                let val = input.value;
                if (val == ""){val = 0;}
                row.push(val);
            }
            data.push(row);
        }
        console.log(data)
        // return data;
    }
}

console.log("Starting webpage")
let tableObj = new Table();
document.getElementById("table").appendChild(tableObj.getHtml());


document.addEventListener("keydown", function(e) {
    let activeCellId = document.activeElement.id;
    console.log(activeCellId);
    if (activeCellId == "") {
        return;
    }

    let row = Number(activeCellId.split("-")[0]);

    let column = Number(activeCellId.split("-")[1]);

    if (e.code == "ArrowUp") {
        if (row > 0) {
            document.getElementById(`${row - 1}-${column}`).focus();
        }
    }
    
    else if (e.code == "ArrowDown") {
        if (row < tableObj.rows.length - 1) {
            document.getElementById(`${row + 1}-${column}`).focus();
        }
    }
    
    else if (e.code == "ArrowLeft") {
        if (column > 0) {
            document.getElementById(`${row}-${column - 1}`).focus();
        }
    }
    
    else if (e.code == "ArrowRight") {
        if (column < tableObj.nColumns - 1) {
            document.getElementById(`${row}-${column + 1}`).focus();
        }
    }
});
