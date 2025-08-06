function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
function operation(op, a, b) {
  switch (op) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
    default:
      throw new Error("Unknown operation");
  }
}
function resetInputNumber() {
  inputNumber = 0;
  inputFlag = false; // Reset input flag
}
function clearCalculator() {
  firstNumber = 0;
  secondNumber = 0;
  firstNumberFlag = false;
  secondNumberFlag = false;
  inputFlag = false;
  equalsFlag = false;
  inputNumber = 0;
  currentOperation = "";
  result = 0;
  resetInputNumber(); // Reset input number
  input.value = 0; // Clear the input display
}
let firstNumber = 0;
let firstNumberFlag = false;
let secondNumber = 0;
let secondNumberFlag = false;
let currentOperation = "";
let operationFlag = false;
let result = 0;
let inputNumber = 0;
let inputFlag = false;
let equalsFlag = false;
let input = document.querySelector("input");
const operators = document.querySelectorAll(".operator");
input.value = 0; // Initialize input display
let numbers = document.querySelectorAll(".number");
let equals = document.querySelector("#equals");
let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clearCalculator);
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    const target = event.target;
    inputNumber = inputNumber * 10 + parseInt(target.id);
    input.value = inputNumber;
    inputFlag = true; // Set flag to indicate input is being entered
    equalsFlag = false; // Reset equals flag on new input
    operationFlag = false; // Reset operation flag on new input
  });
});
operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    target = event.target;
    operationFlag = true; // Set operation flag
    if (inputFlag) {
      if (firstNumberFlag === false) {
        firstNumber = inputNumber;
        currentOperation = target.id;
        firstNumberFlag = true; // Set flag to indicate first number is set
        resetInputNumber(); // Reset input number for next input
      } else if (firstNumberFlag === true) {
        if (equalsFlag === false) {
          secondNumber = inputNumber;
          result = operation(currentOperation, firstNumber, secondNumber);
          input.value = result;
          firstNumber = result; // Use the last result as first number
          resetInputNumber(); // Reset input number after operation
          secondNumberFlag = true; // Set flag to indicate second number is set
          currentOperation = target.id;
        }
      }
    } else {
      currentOperation = target.id;
      secondNumberFlag = false; // Reset second number flag
    }
  });
});

equals.addEventListener("click", () => {
  if (currentOperation && firstNumberFlag === true) {
    equalsFlag = true; // Set equals flag
    if (inputFlag) {
      secondNumber = inputNumber;
      result = operation(currentOperation, firstNumber, secondNumber);
      input.value = result;
      firstNumber = result; // Allow chaining operations
      resetInputNumber(); // Reset input number after operation
    } else {
      if (secondNumberFlag === false) {
        if (operationFlag === true) {
          secondNumber = result;
        }
        /*else{
          secondNumber = result; 
        }*/
      }
      result = operation(currentOperation, firstNumber, secondNumber);
      input.value = result;
      firstNumber = result; // Allow chaining operations
      inputNumber = 0; // Reset input number
    }
    operationFlag = false; // Reset operation flag after equals
  }
});
