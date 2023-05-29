// Add error to input field
const showInputError = (formElement, inputElement, errorMessage, formObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formObj.inputErrorClass);
  errorElement.classList.add(formObj.activeErrorClass);
  errorElement.textContent = errorMessage;
};

// Remove error from input field
const hideInputError = (formElement, inputElement, formObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formObj.inputErrorClass);
  errorElement.classList.remove(formObj.activeErrorClass);
  errorElement.textContent = "";
};

// Reset errors in a form
function resetFormErrors(formElement, formObj) {
  if (formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(".form__input-field")
    );
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, formObj);
    });
  }
}

export { showInputError, hideInputError, resetFormErrors };
