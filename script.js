// calculator script for index.html

const calculator = {

currentValue: '',
newValue: '',
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

add: function(x,y, precision) {
    const scaler = Math.pow(10, precision);
    const result = (parseFloat(x) * scaler + parseFloat(y) * scaler) / scaler;
    return result.toFixed(precision);
},

subtract: function(x,y, precision) {
    const scaler = Math.pow(10, precision);
    const result = (parseFloat(x) * scaler - parseFloat(y) * scaler) / scaler;
    return result.toFixed(precision);
},

multiply: function(x,y, precision) {
    const result = parseFloat(x) * parseFloat(y);
    return result.toFixed(precision);
},

divide: function(x,y, precision) {
    if (parseFloat(y)==0) {
        return "ERROR: DIV 0"
    }
    const result = parseFloat(x) / parseFloat(y);
    return result.toFixed(precision);
},

modulo: function(x, y, precision) {
    const scaler = Math.pow(10, precision);
    const scaledX = parseFloat(x) * scaler;
    const scaledY = parseFloat(y) * scaler;
    const result = scaledX % scaledY;
    return (result / scaler).toFixed(precision);
},

operate: function(a, op, b, precision) {
    precision = precision || 0;

    if (precision < 0) {
        throw new Error("Precision must be a non-negative integer");
    }

    switch (op) {
        case '+':
            return this.add(a, b, precision);
        case '-':
            return this.subtract(a, b, precision);
        case '*':
            return this.multiply(a, b, precision);
        case '/':
            return this.divide(a, b, precision);
        case '%':
            return this.modulo(a, b, precision);
        default:
            throw new Error("Invalid operator");
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
                calculator.newValue = buttonMaker.label;
                calculator.updateCurrentValue();
                // Console log the variables for debugging
            console.log('oldValue:', this.oldValue);
            console.log('currentValue:', this.currentValue);
            console.log('operator:', this.operator);
            console.log('operationClicked:', this.operationClicked);
            });
        }
        if (buttonMaker.id == "clearBtn") {
            button.addEventListener("click", () => {
                this.clearAll();
                // Console log the variables for debugging
            console.log('oldValue:', this.oldValue);
            console.log('currentValue:', this.currentValue);
            console.log('operator:', this.operator);
            console.log('operationClicked:', this.operationClicked);
            });
        }
        if (buttonMaker.class == "opButton") {
            button.addEventListener("click", () => {
                
                if (this.oldValue && this.currentValue) {
                    this.currentValue = this.operate(this.oldValue, this.operator, this.currentValue, 10);
                    this.display.textContent = this.currentValue;
                    this.currentValue='';
                    console.log("hello world");
                }

                else {
                this.operator=buttonMaker.label;
                this.oldValue=this.currentValue;
                this.currentValue='';
                }
                this.operationClicked=true;
            // Console log the variables for debugging
            console.log('oldValue:', this.oldValue);
            console.log('currentValue:', this.currentValue);
            console.log('operator:', this.operator);
            console.log('operationClicked:', this.operationClicked);                
            });
        }
        if (buttonMaker.id == "equalsBtn") {
            button.addEventListener("click", () => {
                console.log('oldValue:', this.oldValue);
                console.log('currentValue:', this.currentValue);
                console.log('operator:', this.operator);
                console.log('operationClicked:', this.operationClicked);
            });
        }
        
        
        
        
        
        this.calculatorBox.appendChild(button);
    });
    document.body.appendChild(this.calculatorBox);
},

updateCurrentValue: function() {
    // Check if the new value is a decimal point
    if (this.newValue === '.') {
        // If the current value is empty, set it to "0."
        if (this.currentValue === '') {
            this.currentValue = '0';
        } else {
            // If a decimal point already exists, return without appending
            if (this.currentValue.includes('.')) {
                return;
            }
        }
    }

    // Append the new digit to the display value
    this.currentValue += this.newValue;

    // Check if the display value exceeds a certain length
    const maxLength = 10; // Set your desired maximum length here
    if (this.currentValue.length > maxLength) {
        // Convert the display value to scientific notation
        const scientificNotation = parseFloat(this.currentValue).toExponential(maxLength - 5); // Preserve 5 significant digits
        
        // Update the display text content with the scientific notation
        this.display.textContent = scientificNotation;
    }
    else {
        // Update the display text content with the full value
        this.display.textContent = this.currentValue;
    }
},

clearDisplay: function() {
    this.displayValue = '';
    this.display.textContent = this.displayValue;
},

clearAll: function() {
    this.currentValue='';
    this.newValue='';
    this.oldValue='';
    this.result='';
    this.operator='';
    this.operationClicked=false;
    this.clearDisplay();
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

console.log(operate(firstNum, operator, secondNum));



// Calculate 0.1 + 0.2 with precision 10
console.log(calculator.operate('0.1', '+', '0.2', 10)); // Output: '0.3'

// Calculate 0.3 - 0.2 with precision 10
console.log(calculator.operate('0.3', '-', '0.2', 10)); // Output: '0.1'

// Calculate 0.1 * 0.2 with precision 10
console.log(calculator.operate('0.1', '*', '0.2', 10)); // Output: '0.02'

// Calculate 1 / 3 with precision 10
console.log(calculator.operate('1', '/', '3', 10)); // Output: '0.3333333333'

// Calculate 10 % 3 with precision 10
console.log(calculator.operate('10', '%', '3', 10)); // Output: '1'*/
