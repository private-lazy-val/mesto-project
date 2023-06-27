import Popup from "./popup.js";
import { resetFormErrors } from "./utils.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    exitButtonSelector,
    formSelectors,
    submitFormHandler
  ) {
    super(popupSelector, exitButtonSelector);

    this.formSelectors = formSelectors;
    this.form = this.popupElement.querySelector(formSelectors.formSelector);
    this.submitButton = this.form.querySelector(
      formSelectors.submitButtonSelector
    );
    this._submitFormHandler = submitFormHandler;
    this.defaultSubmitButtonText = this.submitButton.textContent;
    this._context = {};
  }

  _getInputValues() {
    let values = {};
    const inputs = this.form?.querySelectorAll("input") ?? [];
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setFormLoading(isLoading, loadingTxt = "Сохранение...") {
    this.submitButton.textContent = isLoading
      ? loadingTxt
      : this.defaultSubmitButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    let self = this;
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      self._submitFormHandler(
        { ...self._context, ...self._getInputValues() },
        () => self.close(),
        (isLoading) => self.setFormLoading(isLoading)
      );
    });
  }

  reset() {
    this.form.reset();
    resetFormErrors(this.form, this.formSelectors);
  }

  open(context) {
    this.reset();
    super.open();
    this._context = context;
  }
}
