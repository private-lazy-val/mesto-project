import { resetFormErrors } from "./utils.js";

export class Popup {
  constructor(popupSelector, exitButtonSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this.exitButton = this.popupElement.querySelector(exitButtonSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.exitButton.addEventListener("click", () => this.close());
    this.popupElement.addEventListener("click", (evt) =>
      evt.target.classList.contains("popup_opened") ? this.close() : null
    );
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector, exitButtonSelector, imgFullScreenSelector, figCaptionSelector) {
    super(popupSelector, exitButtonSelector);

    this.imgFullScreen = this.popupElement.querySelector(imgFullScreenSelector);
    this.figCaption = this.popupElement.querySelector(figCaptionSelector);
  }

  open(imgSrc, imgName) {
    super.open();
    this.imgFullScreen.src = imgSrc;
    this.figCaption.textContent = imgName;
    this.imgFullScreen.alt = `Фотография места ${imgName}`;
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, exitButtonSelector, formObj, submitFormHandler) {
    super(popupSelector, exitButtonSelector);

    this.formObj = formObj;
    this.form = this.popupElement.querySelector(formObj.formSelector);
    this.submitButton = this.form.querySelector(formObj.submitButtonSelector);
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

  formLoading(isLoading, loadingTxt = "Сохранение...") {
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
        (isLoading) => self.formLoading(isLoading)
      );
    });
  }

  reset() {
    this.form.reset();
    resetFormErrors(this.form, this.formObj);
  }

  open(context) {
    this.reset();
    super.open();
    this._context = context;
  }
}
