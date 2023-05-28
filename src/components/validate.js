// Add error to input field
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input-field_type_error");
  errorElement.classList.add("form__input-error_active");
  errorElement.textContent = errorMessage;
};

// Remove error from input field
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input-field_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

// Reset errors for a form
function resetFormErrors(formElement) {
  if (formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(".form__input-field")
    );
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
    });
  }
}

// Сheck whether an array has invalid inputs
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Toggle submit button
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("form__submit_inactive");
    buttonElement.style.cursor = 'default';
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
    buttonElement.style.cursor = 'cursor';
  }
};

// Check validity of the input field
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Set listeners for input fields
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".form__input-field")
  );
  const buttonElement = formElement.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Validate form
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // Save changes without reloading the entire page
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

export { enableValidation, resetFormErrors };
