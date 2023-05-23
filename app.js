const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".display");
const clearBtn = calculator.querySelector(".clear");
const equalsBtn = calculator.querySelector(".equals");
const decimalBtn = calculator.querySelector(".decimal");
const numberBtns = calculator.querySelectorAll(".number");
const operatorBtns = calculator.querySelectorAll(".operator");

let firstNum = "";
let secondNum = "";
let operator = "";
let result = "";

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    display.textContent = "Error: can't divide by 0";
    return "";
  }
  return a / b;
};

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
      return "";
  }
};

const clear = () => {
  firstNum = "";
  secondNum = "";
  operator = "";
  result = "";
  display.textContent = "0";
};

const handleNumberClick = (e) => {
  const number = e.target.textContent;
  if (isOperatorEmpty()) {
    setFirstNumber(number);
    display.textContent = firstNum;
  } else {
    setSecondNumber(number);
    display.textContent = `${firstNum} ${operator} ${secondNum || ""}`;
  }
};

const isFirstNumEmpty = () => {
  return firstNum === "";
};

const setFirstNumber = (number) => {
  firstNum = isFirstNumEmpty() ? number : firstNum + number;
};

const setSecondNumber = (number) => {
  secondNum = isSecondNumEmpty() ? number : secondNum + number;
};

const handleOperatorClick = (e) => {
  let lastOperator = operator;
  operator = e.target.value;
  if (isFirstNumEmpty()) {
    display.textContent = "Error: Input Number before operator";
    return;
  }
  if (isAllInputsFilled()) {
    result = operate(lastOperator, parseFloat(firstNum), parseFloat(secondNum));
    firstNum = result.toString();
    secondNum = "";
  }
  display.textContent = `${firstNum} ${operator} ${secondNum || ""}`;
};

const isOperatorEmpty = () => {
  return operator === "";
};

const isSecondNumEmpty = () => {
  return secondNum === "";
};

const handleEqualsClick = () => {
  if (isAllInputsFilled()) {
    result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
    if (result === "0") {
      firstNum = "";
      secondNum = "";
      operator = "";
      result = "";
      return;
    }
    firstNum = result.toString();
    secondNum = "";
    operator = "";
    display.textContent = firstNum;
  }
};

const isAllInputsFilled = () => {
  return !isFirstNumEmpty() && !isSecondNumEmpty() && !isOperatorEmpty();
};

const handleDecimalClick = () => {
  if (isOperatorEmpty()) {
    handleDecimalClickForFirstNum();
  } else {
    handleDecimalClickForSecondNum();
  }
};

const handleDecimalClickForFirstNum = () => {
  if (firstNum.indexOf(".") === -1) {
    firstNum = isFirstNumEmpty() ? "0." : firstNum + ".";
    display.textContent = firstNum;
  }
};

const handleDecimalClickForSecondNum = () => {
  if (secondNum.indexOf(".") === -1) {
    secondNum = isSecondNumEmpty() ? "0." : secondNum + ".";
    display.textContent = `${firstNum} ${operator} ${secondNum || ""}`;
  }
};

numberBtns.forEach((btn) => {
  btn.addEventListener("click", handleNumberClick);
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", handleOperatorClick);
});

equalsBtn.addEventListener("click", handleEqualsClick);
decimalBtn.addEventListener("click", handleDecimalClick);
clearBtn.addEventListener("click", clear);
