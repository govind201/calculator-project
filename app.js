const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".display");
const clearBtn = calculator.querySelector(".clear");
const equalsBtn = calculator.querySelector(".equals");
const decimalBtn = calculator.querySelector(".decimal");
const numberBtns = calculator.querySelectorAll(".number");
const operatorBtns = calculator.querySelectorAll(".operator");

let firstNum = null;
let secondNum = null;
let operator = null;
let result = null;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
    if (b === 0) {
        display.textContent = "Error: can't divide by 0";
        return null;
    }
    return a / b;
}

const operate = (operator, a, b) => {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
}

const clear = () => {
    firstNum = null;
    secondNum = null;
    operator = null;
    result = null;
    display.textContent = "0";
}

const handleNumberClick = (e) => {
    const number = e.target.textContent;
    if (operator === null) {
        if (firstNum === null) {
            firstNum = number;
        } else {
            firstNum += number;
        }
        display.textContent = firstNum;
    } else {
        if (secondNum === null) {
            secondNum = number;
        } else {
            secondNum += number;
        }
        display.textContent = `${firstNum} ${operator} ${secondNum || ""}`;
    }
}

const handleOperatorClick = (e) => {
    operator = e.target.value;
    if (firstNum === null) {
        firstNum = parseFloat(display.textContent);
    } else if (operator !== null && secondNum === null) {
        operator = e.target.textContent;
        display.textContent = `${firstNum} ${operator}`;
        return;
    } else if (secondNum === null) {
        secondNum = parseFloat(display.textContent);
        result = operate(operator, firstNum, secondNum);
        display.textContent = `${result} ${e.target.textContent}`;
        firstNum = result;
        secondNum = null;
        operator = e.target.textContent;
        return;
    }
    display.textContent = `${firstNum} ${operator} ${secondNum || ""}`;
}

const handleEqualsClick = () => {
    if (firstNum !== null && operator !== null && secondNum !== null) {
        result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
        firstNum = result.toString();
        secondNum = null;
        operator = null;
        display.textContent = firstNum;
    }
}

const handleDecimalClick = () => {
    if (display.textContent.indexOf(".") === -1) {
        if (operator === null) {
            if (firstNum === null) {
                firstNum = "0.";
            } else {
                firstNum += ".";
            }
            display.textContent = firstNum;
        } else {
            if (secondNum === null) {
                secondNum = "0.";
            } else {
                secondNum += ".";
            }
            display.textContent = secondNum;
        }
    }
}
numberBtns.forEach((btn) => {
    btn.addEventListener("click", handleNumberClick);
});
operatorBtns.forEach((btn) => {
    btn.addEventListener("click", handleOperatorClick);
});
equalsBtn.addEventListener("click", handleEqualsClick);
decimalBtn.addEventListener("click", handleDecimalClick);
clearBtn.addEventListener("click", clear);
 