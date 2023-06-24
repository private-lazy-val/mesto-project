import { showInputError, hideInputError } from "./utils.js";

export default class FormValidator {
  constructor(formObj, formElement) {
    this.formObj = formObj;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.formObj.inputSelector)
    );
    this.buttonElement = this.formElement.querySelector(
      this.formObj.submitButtonSelector
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
      this.buttonElement.classList.remove(this.formObj.inactiveButtonClass);
    }
  }

  // Toggle submit button on popup opening
  disableButton() {
    this.buttonElement.disabled = true;
    this.buttonElement.classList.add(this.formObj.inactiveButtonClass);
  }

  // Check validity of the input field
  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(
        this.formElement,
        inputElement,
        inputElement.validationMessage,
        this.formObj
      );
    } else {
      hideInputError(this.formElement, inputElement, this.formObj);
    }
  }

  // Set listeners for input fields
  _setEventListeners() {
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
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

// Сheck whether an array has invalid inputs
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// Toggle submit button depending on the form state
// const toggleButtonState = (inputList, buttonElement, formObj) => {
//   if (hasInvalidInput(inputList)) {
//     disableButton(buttonElement, formObj);
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(formObj.inactiveButtonClass);
//   }
// };

// Toggle submit button on popup opening
// const disableButton = (buttonElement, formObj) => {
//   buttonElement.disabled = true;
//   buttonElement.classList.add(formObj.inactiveButtonClass);
// }

// Check validity of the input field
// const checkInputValidity = (formElement, inputElement, formObj) => {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//     inputElement.setCustomValidity("");
//   }
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       formObj
//     );
//   } else {
//     hideInputError(formElement, inputElement, formObj);
//   }
// };

// Set listeners for input fields
// const setEventListeners = (formElement, formObj) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(formObj.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(formObj.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, formObj);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement, formObj);
//       toggleButtonState(inputList, buttonElement, formObj);
//     });
//   });
// };

// Validate form
// const enableValidation = (formObj) => {
//   const formList = Array.from(document.querySelectorAll(formObj.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", (evt) => {
//       // Save changes without reloading the entire page
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, formObj);
//   });
// };

// export { enableValidation, disableButton };
