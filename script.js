// calculator script for index.html

const calculator = {

displayValue: '',
newDigit: '',
oldValue: '',
result: '',
operator: '',


buttons: [
    {id: 'clearBtn', label: 'AC', class: 'calcButton'},
    {id: 'altBtn', label: '+/-', class: 'calcButton'},
    {id: 'moduloBtn', label: '%', class: 'calcButton'},
    {id: 'divideBtn', label: '/', class: 'calcButton'},
    {id: 'sevenBtn', label: '7', class: 'numButton'},
    {id: 'eightBtn', label: '8', class: 'numButton'},
    {id: 'nineBtn', label: '9', class: 'numButton'},
    {id: 'multiplyBtn', label: '*', class: 'calcButton'},
    {id: 'fourBtn', label: '4', class: 'numButton'},
    {id: 'fiveBtn', label: '5', class: 'numButton'},
    {id: 'sixBtn', label: '6', class: 'numButton'},
    {id: 'subtractBtn', label: '-', class: 'calcButton'},
    {id: 'oneBtn', label: '1', class: 'numButton'},
    {id: 'twoBtn', label: '2', class: 'numButton'},
    {id: 'threeBtn', label: '3', class: 'numButton'},
    {id: 'addBtn', label: '+', class: 'calcButton'},
    {id: 'zeroBtn', label: '0', class: 'numButton'},
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
    this.calculatorBox=document.createElement("div")
    this.calculatorBox.id="calculatorBox";
    this.calculatorBox.style.display="flex";
    this.calculatorBox.style.flexWrap="wrap";
    this.calculatorBox.style.width="400px";
    this.calculatorBox.style.height="600px";
    this.calculatorBox.style.backgroundColor="grey";


    this.display=document.createElement("div");
    this.display.className="display";
    this.display.style.display="flex";
    this.display.style.width="400px";
    this.display.style.height="100px";
    this.display.style.backgroundColor="rgb(65, 65, 65)";
    this.display.style.color="white";
    this.display.style.fontSize="72px";
    this.display.style.justifyContent="end";
    this.display.style.alignItems="center";
    this.display.style.padding="10px";
    this.calculatorBox.appendChild(this.display);

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
        if (buttonMaker.class == "numButton" || buttonMaker.id == "decimalBtn") {
            button.addEventListener("click", () => {
                calculator.newDigit = buttonMaker.label;
                calculator.updateDisplay();
            });
        }
        if (buttonMaker.id == "clearBtn") {
            button.addEventListener("click", () => {
                calculator.clearDisplay();
            });
        }
        this.calculatorBox.appendChild(button);
    });

    document.body.appendChild(this.calculatorBox);
},

updateDisplay: function() {
    // Prevent adding multiple decimal points
    if (this.newDigit === '.' && this.displayValue.includes('.')) {
        return;
    }
    
    // Append the new digit to the display value
    this.displayValue += this.newDigit;

    // Check if the display value exceeds a certain length
    const maxLength = 10; // Set your desired maximum length here
    if (this.displayValue.length > maxLength) {
        // Convert the display value to scientific notation
        const scientificNotation = parseFloat(this.displayValue).toExponential(maxLength - 5); // Preserve 5 significant digits
        
        // Update the display text content with the scientific notation
        this.display.textContent = scientificNotation;
    } else {
        // Update the display text content with the full value
        this.display.textContent = this.displayValue;
    }
},

clearDisplay: function() {
    this.displayValue = '';
    this.display.textContent = this.displayValue;
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

