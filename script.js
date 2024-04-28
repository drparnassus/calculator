// calculator script for index.html

const calculator = {

displayValue: '',
newDigit: '',
oldValue: '',
result: '',
operator: '',
operationClicked: false,


buttons: [
    {id: 'clearBtn', label: 'AC', class: 'calcButton'},
    {id: 'altBtn', label: '+/-', class: 'calcButton'},
    {id: 'moduloBtn', label: '%', class: 'opButton'},
    {id: 'divideBtn', label: '/', class: 'opButton'},
    {id: 'sevenBtn', label: '7', class: 'numButton'},
    {id: 'eightBtn', label: '8', class: 'numButton'},
    {id: 'nineBtn', label: '9', class: 'numButton'},
    {id: 'multiplyBtn', label: '*', class: 'opButton'},
    {id: 'fourBtn', label: '4', class: 'numButton'},
    {id: 'fiveBtn', label: '5', class: 'numButton'},
    {id: 'sixBtn', label: '6', class: 'numButton'},
    {id: 'subtractBtn', label: '-', class: 'opButton'},
    {id: 'oneBtn', label: '1', class: 'numButton'},
    {id: 'twoBtn', label: '2', class: 'numButton'},
    {id: 'threeBtn', label: '3', class: 'numButton'},
    {id: 'addBtn', label: '+', class: 'opButton'},
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

modulo: function(x,y) {
    return x%y;
},

operate: function(a, op, b) {
    switch (op) {
        case "+":
            return this.add(parseFloat(a), parseFloat(b)); // Ensure a and b are parsed as floats
        case "-":
            return this.subtract(parseFloat(a), parseFloat(b)); // Ensure a and b are parsed as floats
        case "*":
            return this.multiply(parseFloat(a), parseFloat(b)); // Ensure a and b are parsed as floats
        case "/":
            return this.divide(parseFloat(a), parseFloat(b)); // Ensure a and b are parsed as floats
        case "%":
            return this.modulo(parseFloat(a), parseFloat(b)); // Ensure a and b are parsed as floats
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
                // Clear the display if an operation button was clicked previously
                if (calculator.operationClicked) {
                    calculator.clearDisplay();
                    calculator.operationClicked = false; // Reset the flag after clearing the display
                }               
                calculator.newDigit = buttonMaker.label;
                calculator.updateDisplay();
            });
        }
        if (buttonMaker.id == "clearBtn") {
            button.addEventListener("click", () => {
                calculator.clearDisplay();
                calculator.operationClicked = false;
            });
        }
        if (buttonMaker.class == "opButton") {
            button.addEventListener("click", () => {
                calculator.operationClicked = true;
                calculator.operator=buttonMaker.label;
                calculator.oldValue=calculator.displayValue;
            });
        }
        if (buttonMaker.id == "equalsBtn") {
            button.addEventListener("click", () => {
                console.log('Equals Button Clicked');
                console.log('Old Value:', calculator.oldValue);
                console.log('Operator:', calculator.operator);
                console.log('Display Value:', calculator.displayValue);
                const maxLength = 10;
        
                if (calculator.oldValue === '' || calculator.operator === '') {
                    // If oldValue or operator is empty, display an error
                    console.log('Error: Missing operand or operator');
                    calculator.display.textContent = "Error";
                } else {
                    // Perform the calculation using parseFloat on both operands
                    const newValue = calculator.operate(parseFloat(calculator.oldValue), calculator.operator, parseFloat(calculator.displayValue));
                    console.log('New Value:', newValue);
        
                    if (isNaN(newValue)) {
                        console.log('Error: Invalid calculation result');
                        calculator.display.textContent = "Error";
                    } else {
                        let displayResult;
                        const roundedValue = parseFloat(newValue.toFixed(10));
                        calculator.displayValue = roundedValue.toString();
                        if (this.displayValue.length > maxLength) {
                            // Convert the display value to scientific notation
                            const scientificNotation = parseFloat(this.displayValue).toExponential(maxLength - 5); // Preserve 5 significant digits
                            
                            // Update the display text content with the scientific notation
                            this.display.textContent = scientificNotation;
                            this.oldValue = scientificNotation; // Store the result for future operations
                        } else {
                            // Update the display text content with the full value
                            this.display.textContent = this.displayValue;
                            this.oldValue = this.displayValue; // Store the result for future operations
                        }
                    }
                }
                calculator.operationClicked = false; // Reset operation flag after calculation
            });
            console.log('Old Value:', calculator.oldValue);
            console.log('Operator:', calculator.operator);
            console.log('Display Value:', calculator.displayValue);
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