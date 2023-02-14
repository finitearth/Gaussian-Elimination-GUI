import {Matrix} from "./matrix.js";

export class MatrixInput{
    constructor(id){
        this.id = id;
        this.matrixHtmlElement = document.createElement("table");
        this.matrix = new Matrix();
    }

    createMatrixHtmlElement(){

    }

    getMatrixHtmlElement(){
        return this.matrixHtmlElement;
    }

}