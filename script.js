// calculator script for index.html

const calculator = {

displayValue: '',
oldValue: '',
result: '',
operator: '',


buttons: [
    {id: '', label: 'AC', class: ''},
    {id: 'altBtn', label: '+/-', class: ''},
    {id: 'moduloBtn', label: '%', class: ''},
    {id: 'divideBtn', label: '/', class: ''},
    {id: 'sevenBtn', label: '7', class: ''},
    {id: 'eightBtn', label: '8', class: ''},
    {id: 'nineBtn', label: '9', class: ''},
    {id: 'multiplyBtn', label: '*', class: ''},
    {id: 'fourBtn', label: '4', class: ''},
    {id: 'fiveBtn', label: '5', class: ''},
    {id: 'sixBtn', label: '6', class: ''},
    {id: 'subtractBtn', label: '1', class: ''},
    {id: 'oneBtn', label: '2', class: ''},
    {id: 'twoBtn', label: '3', class: ''},
    {id: 'threeBtn', label: '+', class: ''},
    {id: 'addBtn', label: '-', class: ''},
    {id: 'zeroBtn', label: '0', class: ''},
    {id: 'decimalBtn', label: '.', class: ''},
    {id: 'equalsBtn', label: '=', class: ''},
],

add: function(x,y) {
    return x+y;
},

subtract: function(x,y) {
    return x-y;
},

multiply: function(x,y) {
    return x*y;
},

divide: function(x,y) {
    if (y==0) {
        return "ERROR"
    }
    else {
        return x/y;
    }
},

operate: function(a, op, b) {
    switch (op) {
        case "+":
            return add(a,b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "*":
            return multiply(a,b);
            break;
        case "/":
            return divide(a,b);
            break;
        default:
            break;
    }
    
},

makeCalculator: function() {
    const calc=document.getElementById("calculatorBox");
    const display=document.createElement("div");
    display.className="display";
    calc.appendChild(display);
},
}

calculator.makeCalculator();








/*console.log(add(1,7));
console.log(subtract(1,7));
console.log(multiply(1,7));
console.log(divide(1,7));
console.log(add(0.1,0.2));*/


/*firstNum = 2;
secondNum = 5;
operator = "*";

console.log(operate(firstNum, operator, secondNum));*/

