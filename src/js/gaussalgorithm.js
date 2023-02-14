import {Fraction} from './fraction.js';

function solve(A, B){
    var n = A.length;
    console.log("here we are");
    for(var i=0; i<n-1; ++i){
      // Zeilen der Restmatrix werden durchlaufen
      console.log("lalalalala");
      // if (A[i][i].numerator==0){
      //   continue;
      // }
      for(var k=i+1; k<n; ++k){
        // Berechnung von L
        console.log("akljfkalöj");
        A[k][i] = A[k][i].div(A[i][i]); // Achtung: vorher Prüfung auf Nullwerte notwendig
        // Spalten der Restmatrix werden durchlaufen
        for(var j=i+1; j<n; ++j){
          // Berechnung von R
          console.log("jfkjasdklfjadsjjfhsgdkj");
          A[k][j] = A[k][j].subtract(A[k][i].mul(A[i][j]));
        }
      }
    }
    return A;
  }



console.log(solve([[new Fraction(1,1),new Fraction(2,1),new Fraction(3,1)], [new Fraction(4,1),new Fraction(5,1),new Fraction(6,1)], [new Fraction(7,1),new Fraction(8,1),new Fraction(9,1)]], 0));

