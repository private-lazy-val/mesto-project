export default class FormValidator {
  constructor(formSelectors, formElement) {
    this.formSelectors = formSelectors;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.formSelectors.inputSelector)
    );
    this.buttonElement = this.formElement.querySelector(
      this.formSelectors.submitButtonSelector
    );
  }

  // Сheck whether an array has invalid inputs
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Toggle submit button depending on the form state
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.buttonElement.disabled = false;
      this.buttonElement.classList.remove(
        this.formSelectors.inactiveButtonClass
      );
    }
  }

  // Toggle submit button on popup opening
  disableButton() {
    this.buttonElement.disabled = true;
    this.buttonElement.classList.add(this.formSelectors.inactiveButtonClass);
  }

  // Check validity of the input field
  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this.showInputError(
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this.hideInputError(inputElement);
    }
  }

  // Set listeners for input fields
  _setEventListeners() {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Add error to input field
  showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.formSelectors.inputErrorClass);
    errorElement.classList.add(this.formSelectors.activeErrorClass);
    errorElement.textContent = errorMessage;
  }

  // Remove error from input field
  hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.formSelectors.inputErrorClass);
    errorElement.classList.remove(this.formSelectors.activeErrorClass);
    errorElement.textContent = "";
  }

  // Reset errors in a form
  resetFormErrors() {
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement, this.formSelectors);
    });
  }

  // Validate form
  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
