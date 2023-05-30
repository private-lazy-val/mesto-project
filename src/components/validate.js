import { showInputError, hideInputError } from "./utils.js";

// Сheck whether an array has invalid inputs
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Toggle submit button
const toggleButtonState = (inputList, buttonElement, formObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(formObj.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(formObj.inactiveButtonClass);
  }
};

// Check validity of the input field
const checkInputValidity = (formElement, inputElement, formObj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      formObj
    );
  } else {
    hideInputError(formElement, inputElement, formObj);
  }
};

// Set listeners for input fields
const setEventListeners = (formElement, formObj) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formObj.inputSelector)
  );
  const buttonElement = formElement.querySelector(formObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, formObj);
      toggleButtonState(inputList, buttonElement, formObj);
    });
  });
};

// Validate form
const enableValidation = (formObj) => {
  const formList = Array.from(document.querySelectorAll(formObj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // Save changes without reloading the entire page
      evt.preventDefault();
    });
    setEventListeners(formElement, formObj);
  });
};

export { enableValidation };
