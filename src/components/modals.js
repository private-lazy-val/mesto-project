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

// Add event listeners to popup so that it closes when predicate is satisfied
function addPopupEventListeners(popupObj) {
  const popup = popupObj.popup;
  const exitButton = popupObj.exitButton;

  exitButton.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", (evt) =>
    evt.target.classList.contains("popup_opened") ? closePopup(popup) : null
  );
}

export { openPopup, closePopup, addPopupEventListeners };
