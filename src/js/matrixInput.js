import {Matrix} from "./matrix.js";
// na ob das noch was wird? :)
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