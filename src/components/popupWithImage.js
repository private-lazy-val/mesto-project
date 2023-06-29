import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(
    popupElement,
    exitButtonSelector,
    imgFullScreenSelector,
    figCaptionSelector
  ) {
    super(popupElement, exitButtonSelector);

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
