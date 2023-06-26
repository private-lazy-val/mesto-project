// Add error to input field
const showInputError = (formElement, inputElement, errorMessage, formSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formSelectors.inputErrorClass);
  errorElement.classList.add(formSelectors.activeErrorClass);
  errorElement.textContent = errorMessage;
};

// Remove error from input field
const hideInputError = (formElement, inputElement, formSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formSelectors.inputErrorClass);
  errorElement.classList.remove(formSelectors.activeErrorClass);
  errorElement.textContent = "";
};

// Reset errors in a form
function resetFormErrors(formElement, formSelectors) {
  if (formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(".form__input-field")
    );
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, formSelectors);
    });
  }
}

export { showInputError, hideInputError, resetFormErrors };
