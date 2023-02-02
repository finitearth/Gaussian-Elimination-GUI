class Table {
    constructor() {
        this.tableElement = document.createElement("table");
        this.tableBody = document.createElement("tbody");
        this.tableBody.id = "tableRows";
        this.tableElement.appendChild(this.tableBody);

        this.rows = [];
        this.nColumns = 3;
        for (let i = 0; i < 3; i++) {
            this.addRow();
        }

        this.rowAdder = document.createElement("button");
        this.rowAdder.textContent = "Add Row";
        this.rowAdder.id = "RowAdder";
        this.rowAdder.addEventListener("click", this.addRow.bind(this));

        this.columnAdder = document.createElement("button");
        this.columnAdder.textContent = "Add Column";
        this.columnAdder.id = "ColumnAdder";
        this.columnAdder.addEventListener("click", this.addColumn.bind(this));

        this.rowRemover = document.createElement("button");
        this.rowRemover.textContent = "Remove Row";
        this.rowRemover.id = "RowRemover";
        this.rowRemover.addEventListener("click", this.removeRow.bind(this));

        this.columnRemover = document.createElement("button");
        this.columnRemover.textContent = "Remove Column";
        this.columnRemover.id = "ColumnRemover";
        this.columnRemover.addEventListener("click", this.removeColumn.bind(this));

        this.saver = document.createElement("button");
        this.saver.textContent = "Save";
        this.saver.id = "Saver";
        this.saver.addEventListener("click", this.getData.bind(this));


        const buttons = document.createElement("div");
        buttons.id = "buttons";
        buttons.appendChild(this.rowAdder);
        buttons.appendChild(this.columnAdder);
        buttons.appendChild(this.rowRemover);
        buttons.appendChild(this.columnRemover);
        buttons.appendChild(this.saver);

        this.tableContainer = document.createElement("div");
        this.tableContainer.appendChild(this.tableElement);
        this.tableContainer.appendChild(buttons);
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
            // input.type = "number";
            input.value = "";
            // set input size
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
            input.type = "number";
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

// focus first cell when i press space
document.addEventListener("keydown", function(e) {
    // current active cell
    let activeCellId = document.activeElement.id;
    console.log(activeCellId);
    if (activeCellId == "") {
        return;// document.getElementById("0-0").focus();
    }
    // row
    let row = Number(activeCellId.split("-")[0]);
    // column
    let column = Number(activeCellId.split("-")[1]);

    if (e.code == "ArrowUp") {
        if (row > 0) {
            document.getElementById(`${row - 1}-${column}`).focus();
        }
    }
    // arrowDown
    if (e.code == "ArrowDown") {
        if (row < tableObj.rows.length - 1) {
            document.getElementById(`${row + 1}-${column}`).focus();
        }
    }
    // arrowLeft
    if (e.code == "ArrowLeft") {
        if (column > 0) {
            document.getElementById(`${row}-${column - 1}`).focus();
        }
    }
    // arrowRight
    if (e.code == "ArrowRight") {
        if (column < tableObj.nColumns - 1) {
            document.getElementById(`${row}-${column + 1}`).focus();
        }
    }
});
// // import Table from "../table.js";

// class Table {
//     constructor() {
//         this.html = `<h1>A=</h1>
//         <table>
//         <tbody id="tableRows">`

//         this.rows = []
//         this.nColumns = 3;
//         for (let i = 0; i < 3; i++) {
//             this.addRow()
//         }
//         this.endOfHtml = `</tbody></table>
//         <div id="buttons">    
//             <button id="RowAdder">Add Row</button>
//             <button id="ColumnAdder">Add Column</button>
//             <button id="RowRemover">Remove Row</button>
//             <button id="ColumnRemover">Remove Column</button>
//         </div>`;
//     }

//     addRow() {
//         let rowId = this.rows.length;
//         let extraRow = [`<tr id=${rowId}>`];
//         // extraRow.push();
//         for (let i = 0; i < this.nColumns; i++) {
//             extraRow.push(`<td><input type="number" value="" id=${rowId}></td>`);
//         }
//         extraRow.push("</tr>");
//         let extraRowString = extraRow.join("");
//         this.rows.push(extraRowString);
//         return extraRowString;
//     }

//     addColumn() {
//         this.nColumns += 1;
//         for (let i = 0; i < this.rows.length; i++) {
//             this.rows[i] = this.rows[i].slice(0, -5) + `<td><input type="number" value="" id=${i}></td></tr>`;
//         }

//     }

//     removeRow() {
//         if (this.rows.length > 1){
//             this.rows.pop();
//         }
//     }

//     removeColumn() {
//         this.nColumns = Math.max(1, this.nColumns - 1);
//         for (let i = 0; i < this.rows.length; i++) {
//             this.rows[i] = this.rows[i].slice(0, -22) + "</tr>";
//         }
//     }

//     getHtml() {
//         return this.html + this.rows.join("") + this.endOfHtml;
//     }

//     readTable() {
//         let table = document.getElementById("table");
//         console.log(table);
//     }
// }

// console.log("Starting webpage")
// let tableObj = new Table();
// document.getElementById("table").innerHTML = tableObj.getHtml();

// document.getElementById("RowAdder").addEventListener("click", function() {
//     let newRow = tableObj.addRow();
//     document.getElementById("tableRows").innerHTML = tableObj.rows.join("");
//     // document.getElementById("tableRows").insertAdjacentHTML("beforeend", newRow);
// });

// document.getElementById("ColumnAdder").addEventListener("click", function() {
//     tableObj.addColumn();
//     document.getElementById("tableRows").innerHTML = tableObj.rows.join("");
// });

// document.getElementById("RowRemover").addEventListener("click", function() {
//     tableObj.removeRow();
//     document.getElementById("tableRows").innerHTML = tableObj.rows.join("");
// });

// document.getElementById("ColumnRemover").addEventListener("click", function() {
//     tableObj.removeColumn();
//     document.getElementById("tableRows").innerHTML = tableObj.rows.join("");
// });

