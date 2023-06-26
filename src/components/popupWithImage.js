import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
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
