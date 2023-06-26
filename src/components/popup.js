export default class Popup {
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

