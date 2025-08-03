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
function operation(op,a,b){
    switch(op) {
        case 'add':
        return add(a, b);
        case 'subtract':
        return subtract(a, b);
        case 'multiply':
        return multiply(a, b);
        case 'divide':
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
  firstNumber = NaN;
  secondNumber = NaN;
  currentOperation = '';
  result = 0;
  resetInputNumber(); // Reset input number
  input.value = 0; // Clear the input display
}
let firstNumber=NaN;
let secondNumber=NaN;
let currentOperation='';
let result=0;
let inputNumber=0;
let inputFlag=false;
let input = document.querySelector('input');
const operators = document.querySelectorAll(".operator");
input.value = 0; // Initialize input display
let numbers = document.querySelectorAll('.number');
let equals=document.querySelector('#equals');
numbers.forEach((number) => {
  number.addEventListener('click', (event) => {
    const target = event.target;
      inputNumber= inputNumber*10+parseInt(target.id);
      input.value = inputNumber;
      inputFlag = true; // Set flag to indicate input is being entered
  });
});
operators.forEach((operator)=>{operator.addEventListener('click', (event) =>{
  target = event.target;
  if (firstNumber != NaN) {
    currentOperation = target.id;
    firstNumber = inputNumber;
    resetInputNumber(); // Reset input number for next input
  }
  });
});
equals.addEventListener('click', () => {
  if (currentOperation && firstNumber != NaN) {
    if (inputFlag) {
      secondNumber = inputNumber;
      result = operation(currentOperation, firstNumber, secondNumber);
      input.value = result;
      firstNumber = result; // Allow chaining operations
      resetInputNumber(); // Reset input number after operation
    }else{
      if(secondNumber === NaN) {
        secondNumber = firstNumber; // Use first number if no second input
      }
      result = operation(currentOperation, firstNumber, secondNumber);
      input.value = result;
      firstNumber = result; // Allow chaining operations
      inputNumber = 0; // Reset input number
    }
  }
});
