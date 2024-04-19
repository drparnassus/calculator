// calculator script for index.html

let firstNum = 0;
let secondNum = 0;
let operator = "";

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

firstNum = 2;
secondNum = 5;
operator = "*";

console.log(operate(firstNum, operator, secondNum));