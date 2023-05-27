import { resetFormErrors } from "./validate.js";

function openPopup(popup) {
  const submitButton = popup.querySelector(".form__submit");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add("form__submit_inactive");
  }
  popup.classList.add("popup_opened");
}

function closePopup(popup, formElement, resetForm = (form) => {}) {
  popup.classList.remove("popup_opened");
  resetForm(formElement);
  resetFormErrors(formElement);
}

// Close popup if predicate is satisfied
function createClosePopup(popup, predicate, formElement, resetForm) {
  return (evt) => {
    if (predicate(evt)) {
      closePopup(popup, formElement, resetForm);
    }
  };
}

// Close popup without saving by clicking on "X" button
let predicateAlwaysTrue = (evt) => true;
// Close popup without saving by clicking outside of popup
let predicateTargetContainsPopupOpened = (evt) =>
  evt.target.classList.contains("popup_opened");

// Function that adds event listeners to popup and closes them
function addPopupEventListeners(
  popupObj,
  resetForm = () => {}
) {
  const popup = popupObj.popup;
  const exitButton = popupObj.exitButton;
  const formElement = popupObj.form;

  exitButton.addEventListener(
    "click",
    createClosePopup(popup, predicateAlwaysTrue, formElement, resetForm)
  );
  popup.addEventListener(
    "click",
    createClosePopup(
      popup,
      predicateTargetContainsPopupOpened,
      formElement,
      resetForm
    )
  );
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape" && popup.classList.contains("popup_opened")) {
      closePopup(popup, formElement, resetForm);
    }
  });
}

export { openPopup, closePopup, addPopupEventListeners };
