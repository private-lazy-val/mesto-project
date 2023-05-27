import { resetFormErrors } from "./validate.js";
// Close popup
function closePopup(popup, formElement, resetForm = (form) => {}) {
  popup.classList.remove("popup_opened");
  resetForm(formElement);
  resetFormErrors(formElement);
}

export { closePopup };
