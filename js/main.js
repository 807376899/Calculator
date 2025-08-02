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