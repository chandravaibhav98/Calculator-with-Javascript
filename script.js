const NumberButton = document.querySelectorAll('[data-number]');
const OperationButton = document.querySelectorAll(['data-operation']);
const EqualsButton = document.querySelectorAll(['data-equals']);
const DeleteButton = document.querySelectorAll(['data-delete']);
const AllClearButton = document.querySelectorAll(['data-all-clear']);
const PreviousOperandTextElement = document.querySelectorAll([
	'data-previous-operand',
]);
const CurrentOperandTextElement = document.querySelectorAll([
	'data-current-operand',
]);
class Calculator {
	constructor(PreviousOperandTextElement, CurrentOperandTextElement) {
		this.PreviousOperandTextElement = PreviousOperandTextElement;
		this.CurrentOperandTextElement = CurrentOperandTextElement;
		this.Clear();
	}
	Clear() {
		this.PreviousOperand = '';
		this.CurrentOperand = '';
		this.Operation = undefined;
	}
	Delete() {
		this.CurrentOperand = this.CurrentOperand.toString().slice(0, -1);
	}
	AppendNumber(number) {
		if (number === '.' && this.CurrentOperand.includes('.')) return;
		this.CurrentOperand =
			this.CurrentOperand.toString() + number.toString();
	}
	ChooseOperation(Operation) {
		if (this.CurrentOperand === '') return;
		if (this.PreviousOperand !== '') {
			this.Compute();
		}
		this.Operation = Operation;
		this.PreviousOperand = this.CurrentOperand;
		this.CurrentOperand = '';
	}
	Compute() {
		let computation;
		const prev = parseFloat(this.PreviousOperand);
		const current = parseFloat(this.CurrentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.Operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '*':
				computation = prev * current;
				break;
			case '/':
				computation = prev / current;
				break;
			default:
				return;
		}
		this.CurrentOperand = computation;
		this.Operation = undefined;
		this.PreviousOperand = '';
	}
	GetDisplayNumber(number) {
		const StringNumber = number.toString();
		const IntegerDigits = parseFloat(StringNumber.split('.')[0]);
		const DecimalDigits = StringNumber('.')[1];
		let IntegerDisplay;
		if (isNaN(IntegerDigits)) {
			IntegerDisplay = '';
		} else {
			IntegerDisplay = IntegerDigits.toLocaleString('en', {
				maximumFractionDigits: 0,
			});
		}
		if (DecimalDigits != null) {
			return `${IntegerDisplay}.${DecimalDigits}`;
		} else {
			return IntegerDigits;
		}
	}
	UpdateDisplay() {
		this.CurrentOperandTextElement.innerText = this.GetDisplayNumber(
			this.CurrentOperand,
		);
		if (this.Operation != null) {
			this.PreviousOperandTextElement.innerText = `${this.GetDisplayNumber(
				PreviousOperand,
			)} ${this.Operation}`;
		} else {
			this.PreviousOperandTextElement.innerText = '';
		}
	}
}

const Calculator = new Calculator(
	PreviousOperandTextElement,
	CurrentOperandTextElement,
);

NumberButton.forEach((button) => {
	button.addEventListener('click', () => {
		Calculator.AppendNumber(button.innerText);
		Calculator.UpdateDisplay();
	});
});
OperationButton.forEach((button) => {
	button.addEventListener('click', () => {
		Calculator.ChooseOperation(button.innerText);
		Calculator.UpdateDisplay();
	});
});
EqualsButton.addEventListener('click', (button) => {
	Calculator.Compute();
	Calculator.UpdateDisplay();
});
AllClearButton.addEventListener('click', (button) => {
	Calculator.Clear();
	Calculator.UpdateDisplay();
});
DeleteButton.addEventListener('click', (button) => {
	Calculator.Delete();
	Calculator.UpdateDisplay();
});
