import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupElement,
    exitButtonSelector,
    formSelectors,
    submitFormHandler
  ) {
    super(popupElement, exitButtonSelector);

    this.formSelectors = formSelectors;
    this.formElement = this.popupElement.querySelector(formSelectors.formSelector);
    this.submitButton = this.formElement.querySelector(
      formSelectors.submitButtonSelector
    );
    this._submitFormHandler = submitFormHandler;
    this.defaultSubmitButtonText = this.submitButton.textContent;
    this._context = {};
    this.formInputs = this.formElement?.querySelectorAll("input") ?? [];
  }

  _getInputValues() {
    const values = {};
    this.formInputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setFormLoading(isLoading, loadingTxt) {
    this.submitButton.textContent = isLoading
      ? loadingTxt
      : this.defaultSubmitButtonText;
  }

  setEventListeners() {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitFormHandler(
        { ...this._context, ...this._getInputValues() },
        this
      );
    });
  }

  // Pre-fill input values on opening in index.js
   setInputValues(data) {
    this.formInputs.forEach((input) => {

      input.value = data[input.name];
    });
  }

  getFormName() {
    return this.formElement.getAttribute('name');
  }

  open(context) {
    this.formElement.reset();
    super.open();
    this._context = context;
  }
}
