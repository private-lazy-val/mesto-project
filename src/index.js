import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  openPopup,
  closePopup,
  addPopupEventListeners,
} from "./components/modals.js";
import { enableValidation } from "./components/validate.js";
import { createCard } from "./components/card.js";
import { resetFormErrors } from "./components/utils.js";

const formObj = {
  formSelector: ".form",
  inputSelector: ".form__input-field",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input-field_type_error",
  activeErrorClass: "form__input-error_active",
}

// Helper function that adds event listener to forms and resets them on closure
function addListenersForFormReset(popup, form, exitButton) {
  function resetForm() {
    form.reset();
    resetFormErrors(form, formObj);
  }
  exitButton.addEventListener("click", () => resetForm());
  popup.addEventListener("click", (evt) =>
    evt.target.classList.contains("popup_opened") ? resetForm() : null
  );
  document.addEventListener("keydown", (evt) =>
    evt.key === "Escape" ? resetForm() : null
  );
}

function createImagePopup() {
  const popup = document.querySelector(".image-full-screen");
  const exitButton = popup.querySelector(".popup__exit-button");
  const img = popup.querySelector(".image-full-screen__image");
  const figCaption = popup.querySelector(".image-full-screen__figcaption");

  function openImagePopup(imageSrc, imageName) {
    img.src = imageSrc;
    figCaption.textContent = imageName;
    img.alt = `Фотография места ${imageName}`;
    openPopup(popup);
  }

  return {
    popup: popup,
    exitButton: exitButton,
    img: img,
    figCaption: figCaption,
    open: openImagePopup,
  };
}

function createProfileEditPopup() {
  const popup = document.querySelector(".edit-profile");
  const openButton = document.querySelector(".profile__edit-button");
  const name = document.querySelector(".profile__name");
  const occupation = document.querySelector(".profile__occupation");
  const exitButton = popup.querySelector(".popup__exit-button");
  const form = popup.querySelector(".form");
  const formName = popup.querySelector(".form__input-field_el_name");
  const formOccupation = popup.querySelector(
    ".form__input-field_el_occupation"
  );
  const submitButton = popup.querySelector(".form__submit");

  openButton.addEventListener("click", function () {
    openPopup(popup);
    formName.value = name.textContent;
    formOccupation.value = occupation.textContent;
    submitButton.disabled = true;
    submitButton.classList.add("form__submit_inactive");
  });

  form.addEventListener("submit", function () {
    closePopup(popup);
    name.textContent = formName.value;
    occupation.textContent = formOccupation.value;
  });

  addListenersForFormReset(popup, form, exitButton);

  return {
    openButton: openButton,
    name: name,
    occupation: occupation,
    popup: popup,
    exitButton: exitButton,
    form: form,
    formName: formName,
    formOccupation: formOccupation,
    submitButton: submitButton,
  };
}

function createAddCardPopup(cards, imagePopup) {
  const addButton = document.querySelector(".profile__add-button");
  const popup = document.querySelector(".add-place");
  const exitButton = popup.querySelector(".popup__exit-button");
  const form = popup.querySelector(".form");
  const name = popup.querySelector(".form__input-field_el_title");
  const url = popup.querySelector(".form__input-field_el_url");
  const submitButton = popup.querySelector(".form__submit");

  addButton.addEventListener("click", function () {
    openPopup(popup);
    submitButton.disabled = true;
    submitButton.classList.add("form__submit_inactive");
  });

  form.addEventListener("submit", function () {
    const cardObj = { name: name.value, url: url.value };
    const cardElement = createCard(cardObj, imagePopup);
    closePopup(popup);
    form.reset();
    cards.prepend(cardElement);
  });

  addListenersForFormReset(popup, form, exitButton);

  return {
    addButton: addButton,
    popup: popup,
    exitButton: exitButton,
    form: form,
    name: name,
    url: url,
    submitButton: submitButton,
  };
}

function createAvatarPopup() {
  const container = document.querySelector(".profile__edit-avatar-container");
  const img = container.querySelector(".profile__avatar");
  const pencilButton = document.querySelector(".profile__pencil");
  const overlay = container.querySelector(".profile__overlay");
  const popup = document.querySelector(".edit-avatar");
  const form = popup.querySelector(".form");
  const url = popup.querySelector(".form__input-field_el_avatar");
  const exitButton = popup.querySelector(".popup__exit-button");
  const submitButton = popup.querySelector(".form__submit");

  pencilButton.addEventListener("click", function () {
    openPopup(popup);
    url.value = img.src;
    submitButton.disabled = true;
    submitButton.classList.add("form__submit_inactive");
  });

  // Change background AND show overlay on hover over avatar
  container.addEventListener("mouseover", function () {
    pencilButton.style.opacity = "1";
    overlay.style.backgroundColor = "rgba(0, 0, 0, .8)";
  });

  container.addEventListener("mouseout", function () {
    pencilButton.style.opacity = "0";
    overlay.style.backgroundColor = "initial";
  });

  form.addEventListener("submit", function () {
    closePopup(popup);
    img.src = url.value;
  });

  addListenersForFormReset(popup, form, exitButton);

  return {
    container: container,
    img: img,
    pencilButton: pencilButton,
    overlay: overlay,
    popup: popup,
    form: form,
    url: url,
    exitButton: exitButton,
    submitButton: submitButton,
  };
}

const cards = document.querySelector(".cards");
const cardAddPopup = createAddCardPopup(cards, imagePopup);
const avatarPopup = createAvatarPopup();
const profileEditPopup = createProfileEditPopup();
const imagePopup = createImagePopup();

// Close popup if
// ESC button is pressed
// OR "X" icon is clicked
// OR click outside of popup
addPopupEventListeners(profileEditPopup);
addPopupEventListeners(cardAddPopup);
addPopupEventListeners(imagePopup);
addPopupEventListeners(avatarPopup);

// Validate forms
enableValidation(formObj);

// Add a set of cards after page loading
initialCards.forEach((cardObj) => {
  const cardElement = createCard(cardObj, imagePopup);
  cards.append(cardElement);
});
