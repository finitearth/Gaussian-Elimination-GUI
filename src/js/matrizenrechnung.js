// import { designConfig } from "./config.js";
import { Table } from "./table.js";

console.log("Starting webpage!")
let table = new Table();
document.getElementById("table").appendChild(table.tableContainer);

document.addEventListener("keydown", function(e) {
    let activeCellId = document.activeElement.id;
    console.log(activeCellId);
    if (activeCellId == "") {
        document.getElementById("0-0").focus();
    }

    let row = Number(activeCellId.split("-")[0]);
    let column = Number(activeCellId.split("-")[1]);

    if (e.code == "ArrowUp" && row > 0) {
            document.getElementById(`${row - 1}-${column}`).focus();
    }
    
    else if (e.code == "ArrowDown" && row < table.rows.length - 1) {
            document.getElementById(`${row + 1}-${column}`).focus();
    }
    
    else if (e.code == "ArrowLeft" && column > 0) {
            document.getElementById(`${row}-${column - 1}`).focus();
    }
    
    else if (e.code == "ArrowRight" && column < table.nColumns - 1) {
        document.getElementById(`${row}-${column + 1}`).focus();
    }
});
