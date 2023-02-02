// import Table from "../table.js";

class Table {
    constructor() {
        this.html = `<table>
        <tr> <h1>A = </h1></tr>
        <tr>
            <td><input type="number" name="b11" value="0"></td>
            <td><input type="number" name="b12" value="0"></td>
            <td><input type="number" name="b13" value="0"></td>
        </tr>
        <tr>
            <td><input type="number" name="b21" value="0"></td>
            <td><input type="number" name="b22" value="0"></td>
            <td><input type="number" name="b23" value="0"></td>
        </tr>
        <tr>
            <td><input type="number" name="b31" value="0"></td>
            <td><input type="number" name="b32" value="0"></td>
            <td><input type="number" name="b33" value="0"></td>
        </tr>
        <button>Add Row</button>
        <button>Add Column</button>
        <button id="RowAdder">Remove Row</button>
        <button>Remove Column</button>
        `;
        
    this.endOfHtml = "</table>";
    }

    addRow() {
        console.log("huhu")
        this.html += `<tr>
        <td><input type="number" name="b11" value="0"></td>
        <td><input type="number" name="b12" value="0"></td>
        <td><input type="number" name="b13" value="0"></td>
    </tr>`;
    }

    getHtml() {
        return this.html + this.endOfHtml;
    }
}

(function(window, document, undefined){
    window.onload = init;
      function init(){
        let table = new Table();
        document.getElementById("dingensbbumens").innerHtml = table.getHtml();
        // document.getElementById("RowAdder").addEventListener("click", table.addRow); 
      }
})(window, document, undefined);
