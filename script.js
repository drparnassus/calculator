// calculator script for index.html

let firstNum = 0;
let secondNum = 0;
let operator = "";
let oldValue = ""
let displayValue = "0";

const acBtn = document.getElementById("acBtn");
const altBtn = document.getElementById("altBtn");
const moduloBtn = document.getElementById("moduloBtn");
const divideBtn = document.getElementById("divideBtn");
const sevenBtn = document.getElementById("sevenBtn");
const eightBtn = document.getElementById("eightBtn");
const nineBtn = document.getElementById("nineBtn");
const multiplyBtn = document.getElementById("multiplyBtn");
const fourBtn = document.getElementById("fourBtn");
const fiveBtn = document.getElementById("fiveBtn");
const sixBtn = document.getElementById("sixBtn");
const subtractBtn = document.getElementById("subtractBtn");
const oneBtn = document.getElementById("oneBtn");
const twoBtn = document.getElementById("twoBtn");
const threeBtn = document.getElementById("threeBtn");
const addBtn = document.getElementById("addBtn");
const zeroBtn = document.getElementById("zeroBtn");
const decimalBtn = document.getElementById("decimalBtn");
const equalsBtn = document.getElementById("equalsBtn");

function refreshDisplay(num) {
    let newValue = oldValue+num;
    document.getElementById("display").innerText = newValue;
    oldValue = newValue;
}

zeroBtn.addEventListener('click', function() {
    displayValue = 0;
    refreshDisplay(displayValue);
});

oneBtn.addEventListener('click', function() {
    displayValue = 1;
    refreshDisplay(displayValue);
});

twoBtn.addEventListener('click', function() {
    displayValue = 2;
    refreshDisplay(displayValue);
});

threeBtn.addEventListener('click', function() {
    displayValue = 3;
    refreshDisplay(displayValue);
});

fourBtn.addEventListener('click', function() {
    displayValue = 4;
    refreshDisplay(displayValue);
});

fiveBtn.addEventListener('click', function() {
    displayValue = 5;
    refreshDisplay(displayValue);
});

sixBtn.addEventListener('click', function() {
    displayValue = 6;
    refreshDisplay(displayValue);
});

sevenBtn.addEventListener('click', function() {
    displayValue = 7;
    refreshDisplay(displayValue);
});

eightBtn.addEventListener('click', function() {
    displayValue = 8;
    refreshDisplay(displayValue);
});

nineBtn.addEventListener('click', function() {
    displayValue = 9;
    refreshDisplay(displayValue);
});

decimalBtn.addEventListener('click', function() {
    displayValue = ".";
    refreshDisplay(displayValue);
});

function refreshDisplayOp() {
    document.getElementById("display").innerText = operator;
}

altBtn.addEventListener('click', function() {
    operator = "ERROR";
    refreshDisplayOp();
});

moduloBtn.addEventListener('click', function() {
    operator = "%";
    refreshDisplayOp();
});

divideBtn.addEventListener('click', function() {
    operator = "/";
    refreshDisplayOp();
});

multiplyBtn.addEventListener('click', function() {
    operator = "*";
    refreshDisplayOp();
});

subtractBtn.addEventListener('click', function() {
    operator = "-";
    refreshDisplayOp();
});

addBtn.addEventListener('click', function() {
    operator = "+";
    refreshDisplayOp();
});

function add(x,y) {
    return x+y;
};

function subtract(x,y) {
    return x-y;
};

function multiply(x,y) {
    return x*y;
};

function divide(x,y) {
    if (y==0) {
        return "ERROR"
    }
    else {
        return x/y;
    }
};

/*console.log(add(1,7));
console.log(subtract(1,7));
console.log(multiply(1,7));
console.log(divide(1,7));
console.log(add(0.1,0.2));*/

function operate(a, op, b) {
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
};

/*firstNum = 2;
secondNum = 5;
operator = "*";

console.log(operate(firstNum, operator, secondNum));*/

