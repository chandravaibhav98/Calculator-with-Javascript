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
	Delete() {}
	AppendNumber() {}
	ChooseOperation() {}
	Compute() {}
	UpdateDisplay() {}
}

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
