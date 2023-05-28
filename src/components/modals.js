
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

// Function that adds event listeners to popup and closes them
function addPopupEventListeners(popupObj) {
  const popup = popupObj.popup;
  const exitButton = popupObj.exitButton;

  exitButton.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", (evt) =>
    evt.target.classList.contains("popup_opened") ? closePopup(popup) : null
  );
}

export { openPopup, closePopup, addPopupEventListeners };

