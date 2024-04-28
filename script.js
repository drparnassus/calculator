// calculator script for index.html

const calculator = {

displayValue: '',
oldValue: '',
result: '',
operator: '',


buttons: [
    {id: 'clearBtn', label: 'AC', class: 'calcButton'},
    {id: 'altBtn', label: '+/-', class: 'calcButton'},
    {id: 'moduloBtn', label: '%', class: 'calcButton'},
    {id: 'divideBtn', label: '/', class: 'calcButton'},
    {id: 'sevenBtn', label: '7', class: 'calcButton'},
    {id: 'eightBtn', label: '8', class: 'calcButton'},
    {id: 'nineBtn', label: '9', class: 'calcButton'},
    {id: 'multiplyBtn', label: '*', class: 'calcButton'},
    {id: 'fourBtn', label: '4', class: 'calcButton'},
    {id: 'fiveBtn', label: '5', class: 'calcButton'},
    {id: 'sixBtn', label: '6', class: 'calcButton'},
    {id: 'subtractBtn', label: '-', class: 'calcButton'},
    {id: 'oneBtn', label: '1', class: 'calcButton'},
    {id: 'twoBtn', label: '2', class: 'calcButton'},
    {id: 'threeBtn', label: '3', class: 'calcButton'},
    {id: 'addBtn', label: '+', class: 'calcButton'},
    {id: 'zeroBtn', label: '0', class: 'calcButton'},
    {id: 'decimalBtn', label: '.', class: 'calcButton'},
    {id: 'equalsBtn', label: '=', class: 'calcButton'},
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
    const calculatorBox=document.createElement("div")
    calculatorBox.id="calculatorBox";
    calculatorBox.style.display="flex";
    calculatorBox.style.flexWrap="wrap";
    calculatorBox.style.width="400px";
    calculatorBox.style.height="600px";
    calculatorBox.style.backgroundColor="grey";


    const display=document.createElement("div");
    display.className="display";
    display.style.display="flex";
    display.style.width="400px";
    display.style.height="100px";
    display.style.backgroundColor="rgb(65, 65, 65)";
    display.style.color="white";
    display.style.fontSize="72px";
    display.style.justifyContent="end";
    display.style.alignItems="center";
    display.style.padding="10px";
    calculatorBox.appendChild(display);

    this.buttons.forEach(buttonMaker => {
        const button = document.createElement("button");
        button.textContent = buttonMaker.label;
        button.id = buttonMaker.id;
        button.className = buttonMaker.class;
        button.style.width="100px";
        button.style.height="100px";
        button.style.fontSize="24px";
        if (buttonMaker.id == "zeroBtn") {
            button.style.width="200px";
        }
        calculatorBox.appendChild(button);
    });

    document.body.appendChild(calculatorBox);
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

