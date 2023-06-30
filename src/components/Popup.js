export default class Popup {
  constructor(popupElement, exitButtonSelector) {
    this.popupElement = popupElement;
    this.exitButton = this.popupElement.querySelector(exitButtonSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.popupOpenedSelector = "popup_opened";
  }

  open() {
    this.popupElement.classList.add(this.popupOpenedSelector);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popupElement.classList.remove(this.popupOpenedSelector);
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
      evt.target.classList.contains(this.popupOpenedSelector) ? this.close() : null
    );
  }
}

