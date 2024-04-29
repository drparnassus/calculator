// calculator script for index.html

const calculator = {

currentValue: '',
newValue: '',
oldValue: '',
result: '',
operator: '',
newOperator: '',
operationClicked: false,
lastEquals: false,


buttons: [
    {id: 'clearBtn', label: 'AC', class: 'calcButton', dataKey: 'Escape'},
    {id: 'altBtn', label: '+/-', class: 'altButton', dataKey: 'Alt'},
    {id: 'moduloBtn', label: '%', class: 'opButton', dataKey: '%' },
    {id: 'divideBtn', label: '/', class: 'opButton', dataKey: '/'},
    {id: 'sevenBtn', label: '7', class: 'numButton', dataKey: '7'},
    {id: 'eightBtn', label: '8', class: 'numButton', dataKey: '8'},
    {id: 'nineBtn', label: '9', class: 'numButton', dataKey: '9'},
    {id: 'multiplyBtn', label: '*', class: 'opButton', dataKey: '*'},
    {id: 'fourBtn', label: '4', class: 'numButton', dataKey: '4'},
    {id: 'fiveBtn', label: '5', class: 'numButton', dataKey: '5'},
    {id: 'sixBtn', label: '6', class: 'numButton', dataKey: '6'},
    {id: 'subtractBtn', label: '-', class: 'opButton', dataKey: '-'},
    {id: 'oneBtn', label: '1', class: 'numButton', dataKey: '1'},
    {id: 'twoBtn', label: '2', class: 'numButton', dataKey: '2'},
    {id: 'threeBtn', label: '3', class: 'numButton', dataKey: '3'},
    {id: 'addBtn', label: '+', class: 'opButton', dataKey: '+'},
    {id: 'zeroBtn', label: '0', class: 'numButton', dataKey: '0'},
    {id: 'decimalBtn', label: '.', class: 'calcButton', dataKey: '.'},
    {id: 'equalsBtn', label: '=', class: 'calcButton', dataKey: 'Enter'},
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

reverseSign: function (x, precision) {
    return (x*(-1)).toFixed(precision);
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
        case '+/-':
            return this.reverseSign(a, precision);
        default:
            throw new Error("Invalid operator");
    }
},

handleKeyPress: function(event) {
    const key = event.key;
    // Special case for Escape key to trigger AC functionality
    if (key === "Escape") {
        document.getElementById("clearBtn").click();
        return;
    }
    
    const button = this.buttons.find(btn => btn.dataKey === key);
    if (button) {
        document.getElementById(button.id).click();
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
    this.display.style.fontSize="52px";
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
                this.lastEquals = false;
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
                console.log('result:', this.result);
                console.log('operationClicked:', this.operationClicked);
                console.log('last equals:', this.lastEquals);
            });
        }
        if (buttonMaker.class == "altButton") {
            button.addEventListener("click", () => {
                if (this.oldValue && this.currentValue) {
                    this.currentValue = this.reverseSign(this.currentValue);
                    this.shredToFit(this.currentValue);
                    console.log('oldValue:', this.oldValue);
                    console.log('currentValue:', this.currentValue);
                    console.log('operator:', this.operator);
                    console.log('result:', this.result);
                    console.log('operationClicked:', this.operationClicked);
                    console.log('last equals:', this.lastEquals);
                    return;
                }
                if (this.result) {
                    this.result = this.reverseSign(this.result);
                    this.shredToFit(this.result);
                    console.log('oldValue:', this.oldValue);
                    console.log('currentValue:', this.currentValue);
                    console.log('operator:', this.operator);
                    console.log('result:', this.result);
                    console.log('operationClicked:', this.operationClicked);
                    console.log('last equals:', this.lastEquals);
                    return;
                }
                if (!this.oldValue && this.currentValue) {
                    this.currentValue = this.reverseSign(this.currentValue);
                    this.shredToFit(this.currentValue);
                }
                console.log('oldValue:', this.oldValue);
                console.log('currentValue:', this.currentValue);
                console.log('operator:', this.operator);
                console.log('result:', this.result);
                console.log('operationClicked:', this.operationClicked);
                console.log('last equals:', this.lastEquals);
            });
        }
        if (buttonMaker.id == "clearBtn") {
            button.addEventListener("click", () => {
                this.clearAll();
                // Console log the variables for debugging
                console.log('oldValue:', this.oldValue);
                console.log('currentValue:', this.currentValue);
                console.log('operator:', this.operator);
                console.log('result:', this.result);
                console.log('operationClicked:', this.operationClicked);
                console.log('last equals:', this.lastEquals);
            });
        }
        if (buttonMaker.class == "opButton") {
            button.addEventListener("click", () => {
                console.log('oldValue:', this.oldValue);
                console.log('currentValue:', this.currentValue);
                console.log('operator:', this.operator);
                console.log('result:', this.result);
                console.log('operationClicked:', this.operationClicked);
                console.log('last equals:', this.lastEquals);
                this.lastEquals = false;
                if (this.result) {
                    this.oldValue = this.result;
                    this.result = '';
                    this.currentValue = '';
                    this.operator = buttonMaker.label;
                    this.operationClicked = true;
                }
                if (!this.oldValue && this.currentValue) {
                    this.oldValue=this.currentValue;
                    this.currentValue='';
                    this.operator = buttonMaker.label;
                    this.operationClicked = true;
                }
                else if (this.oldValue && this.currentValue) {
                    console.log("hello world");
                    this.result = this.operate(this.oldValue, this.operator, this.currentValue, 14);
                    this.operator = buttonMaker.label;
                    this.oldValue = this.result;
                    if (this.oldValue.includes('.') && this.oldValue.match(/\.?0+$/)) {
                        this.oldValue = this.oldValue.replace(/\.?0+$/, '');
                    }
                    this.shredToFit(this.oldValue);
                    this.result = '';
                    this.currentValue = '';
                }
            // Console log the variables for debugging
            console.log('oldValue:', this.oldValue);
            console.log('currentValue:', this.currentValue);
            console.log('operator:', this.operator);
            console.log('result:', this.result);
            console.log('operationClicked:', this.operationClicked);
            console.log('last equals:', this.lastEquals);                
            });
        }
        if (buttonMaker.id == "equalsBtn") {
            button.addEventListener("click", () => {
                console.log('oldValue:', this.oldValue);
                console.log('currentValue:', this.currentValue);
                console.log('operator:', this.operator);
                console.log('result:', this.result);
                console.log('operationClicked:', this.operationClicked);
                console.log('last equals:', this.lastEquals);
                console.log("calculating........");
                if (this.lastEquals) {
                    this.result = this.operate(this.result, this.operator, this.currentValue, 14)
                    if (this.result.includes('.') && this.result.match(/\.?0+$/)) {
                        this.result = this.result.replace(/\.?0+$/, '');
                    }
                    this.shredToFit(this.result);
                }
                else {
                    this.result = this.operate(this.oldValue, this.operator, this.currentValue, 14)
                    if (this.result.includes('.') && this.result.match(/\.?0+$/)) {
                        this.result = this.result.replace(/\.?0+$/, '');
                    }
                    this.shredToFit(this.result);
                }
                this.lastEquals = true;
                this.oldValue = '';
                console.log('oldValue:', this.oldValue);
                console.log('currentValue:', this.currentValue);
                console.log('operator:', this.operator);
                console.log('result:', this.result);
                console.log('operationClicked:', this.operationClicked);
                console.log('last equals:', this.lastEquals);
            });
        }
        
        
        
        
        
        this.calculatorBox.appendChild(button);
    });
    document.body.appendChild(this.calculatorBox);
    document.addEventListener('keypress', this.handleKeyPress.bind(this));
},

shredToFit: function(preTrim) {
    const maxLength = 14; // Set your desired maximum length here
    if (preTrim.length > maxLength) {
        // Convert the display value to scientific notation
        const scientificNotation = parseFloat(preTrim).toExponential(maxLength - 5); // Preserve 5 significant digits
        
        // Update the display text content with the scientific notation
        this.display.textContent = scientificNotation;
    }
    else {
        // Update the display text content with the full value
        this.display.textContent = preTrim;
    }
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
    const maxLength = 14; // Set your desired maximum length here
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
    this.lastEquals = false;
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
