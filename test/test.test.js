// myFunction.js
function myFunction(num1, num2) {
    return num1 + num2;
  }

  
  test('Wenn der durchgeht ist Nick ne geile sau!', () => {
    expect(myFunction(1, 2)).toBe(3);
  });
  