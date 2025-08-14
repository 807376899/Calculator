function add(a, b) {
  let r1, r2, m, c;
  try {
    r1 = a.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = b.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    const cm = Math.pow(10, c);
    if (r1 > r2) {
      a = Number(a.toString().replace(".", ""));
      b = Number(b.toString().replace(".", "")) * cm;
    } else {
      a = Number(a.toString().replace(".", "")) * cm;
      b = Number(b.toString().replace(".", ""));
    }
  } else {
    a = Number(a.toString().replace(".", ""));
    b = Number(b.toString().replace(".", ""));
  }
  return (a + b) / m;
}
function subtract(a, b) {
  let r1, r2, m, n;
  try {
    r1 = a.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = b.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((a * m - b * m) / m).toFixed(n);
}
function multiply(a, b) {
  let m = 0;
  const s1 = a.toString();
  const s2 = b.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  let t1 = 0,
    t2 = 0;
  try {
    t1 = a.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = b.toString().split(".")[1].length;
  } catch (e) {}
  const r1 = Number(a.toString().replace(".", ""));
  const r2 = Number(b.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
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
  plusFlag = true; // Reset plusFlag to default
  decimalFlag = false; // Reset decimal flag
}
function clearCalculator() {
  firstNumber = 0;
  secondNumber = 0;
  firstNumberFlag = false;
  secondNumberFlag = false;
  inputFlag = false;
  equalsFlag = false;
  plusFlag = true;
  inputNumber = 0;
  currentOperation = "";
  result = 0;
  resetInputNumber(); // Reset input number
  input.value = 0; // Clear the input display
}
function plusMinus() {
  if (inputFlag) {
    inputNumber = -inputNumber;
    input.value = inputNumber;
  } else {
    result = -result;
    input.value = result;
    firstNumber = result; // Update firstNumber to the negated result
  }
  plusFlag = !plusFlag; // Toggle the plusFlag
}
function roundToTwo(num) {
  return parseFloat(num.toFixed(2));
}

let firstNumber = 0;
let firstNumberFlag = false;
let secondNumber = 0;
let secondNumberFlag = false;
let currentOperation = "";
let operationFlag = false;
let result = 0;
let inputNumber = 0;
//flags
let inputFlag = false;
let equalsFlag = false;
let plusFlag = true;
let decimalFlag = false;
//document elements
let input = document.querySelector("input");
const operators = document.querySelectorAll(".operator");
input.value = 0; // Initialize input display
let numbers = document.querySelectorAll(".number");
let equals = document.querySelector("#equals");
let clearBtn = document.querySelector("#clear");
let plusMinusBtn = document.querySelector("#plusMinus");
let roundToTwoBtn = document.querySelector("#round2");
let decimal = document.querySelector("#decimal");

// Event listeners
roundToTwoBtn.addEventListener("click", () => {
  if (inputFlag) {
    inputNumber = roundToTwo(inputNumber);
    input.value = inputNumber;
  } else {
    result = roundToTwo(result);
    input.value = result;
    firstNumber = result; // Update firstNumber to the rounded result
  }
});
decimal.addEventListener("click", () => {
  if (inputFlag) {
    let inputValue = input.value.toString();
    if (!inputValue.includes(".")) {
      input.value += ".";
      inputValue = input.value + "0";
      inputNumber = parseFloat(inputValue);
      decimalFlag = true;
    }
  } else {
    if (!input.value.includes(".")) {
      input.value += ".";
      inputValue = input.value + "0";
      firstNumber = parseFloat(inputValue);
      decimalFlag = true;
    }
  }
});

clearBtn.addEventListener("click", clearCalculator);

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    const target = event.target;
    if (plusFlag) {
      if (decimalFlag) {
        inputNumber = parseFloat(input.value + target.id);
      } else {
        inputNumber = inputNumber * 10 + parseInt(target.id);
      }
    } else {
      if (decimalFlag) {
        inputNumber = parseFloat(input.value + target.id);
      } else {
        inputNumber = inputNumber * 10 - parseInt(target.id);
      }
    }
    input.value = inputNumber;
    inputFlag = true; // Set flag to indicate input is being entered
    equalsFlag = false; // Reset equals flag on new input
    operationFlag = false; // Reset operation flag on new input
  });
});
plusMinusBtn.addEventListener("click", plusMinus);
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
