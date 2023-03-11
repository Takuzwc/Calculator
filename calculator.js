'Use strict';

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    //Constructor takes the inputs and the functions for our calculator
    //it will essentially display text for the calculator input as we click our buttons
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    //This is going to clear out all different variables
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    //This will be for removing a single number or operation
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    //This will add or place a number at the end of an existing number hence appending
    if (number === '.' && this.currentOperand.includes('.')) return; //to check
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    //This will select on which operation is to be used next
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
  compute() {
    //This will take our values inside our calculator and compute a single value for what
    //we need to display on a calculator

    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '÷':
        computation = prev / current;
      case 'X':
        computation = prev * current;
      case '2√':
        computation = prev / prev;
      case 'X^2':
        computation = prev * prev;
      case '':
        computation = (22 / 7) * prev;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const floatNumber = parseFloat(number)[1];
    let IntegerDisplay;
    if (isNaN(integerDigits)) {
      IntegerDisplay = '';
    } else {
      IntegerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits !== null) {
      return `${IntegerDisplay}.${decimalDigits}`;
    } else {
      return IntegerDisplay;
    }
  }

  upDateDisplay() {
    //this will update values inside display output
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation !== null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

//the variables bellow will work on our calculator object
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//forEach loops over all buttons in this case
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.upDateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.upDateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.upDateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.upDateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.upDateDisplay();
});
