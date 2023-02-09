import { Table } from "./table.js";
import { Fraction } from "./fraction.js";
import { Matrix } from "./matrix.js";

//const table_row = document.createElement ("tr");
//table_row.id = "table_row"



function addTable(element) {
    if (tables.length > 25) {return;}

    tables.push(new Table(tables.length));

    document.getElementById(element).appendChild(tables[tables.length - 1].tableContainer);
}



console.log("Starting webpage!") 


let tables = [];
addTable("input_matrix")
addTable("output_matrix")



document.addEventListener("keydown", function(e) {
   let activeCellId = document.activeElement.id;
   console.log(activeCellId);
   let row;
   let column;
   let tableId;

   if (activeCellId == "") {
       tableId = 0;
       row = 0;
       column = 0;    
   } else {
       tableId = Number(activeCellId.split("-")[0]);
       row = Number(activeCellId.split("-")[1]);
       column = Number(activeCellId.split("-")[2]);
   }

   if (e.code == "ArrowUp" && row > 0) {
       row -= 1;
   } else if (e.code == "ArrowUp" && tableId > 0) {
       tableId -= 1;
       row = tables[tableId].rows.length - 1;
   } else if (e.code == "ArrowDown" && row < tables[0].rows.length - 1) {
       row += 1;
   } else if (e.code == "ArrowDown" && tableId < tables.length - 1) {
       tableId += 1;
       row = 0;
   } else if (e.code == "ArrowLeft" && column > 0) {
       column -= 1;
   } else if (e.code == "ArrowRight" && column < tables[0].nColumns - 1) {
       column += 1;
   }

   document.getElementById(`${tableId}-${row}-${column}`).focus();
});



document.getElementById("button_transpose").onclick = function() {
    console.log("Test")
    let input_matrix = tables[0].getData();
    let output_matrix = input_matrix.transpose()
    console.log(output_matrix)
    //let matrix = new Matrix(input_matrix);
    //let outputMatrix = matrix.transpose()
};