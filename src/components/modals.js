import { openPopup, closePopup } from "./utils.js";
import { createCard } from "./card.js";

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

  openButton.addEventListener("click", function () {
    openPopup(popup);
    formName.value = name.textContent;
    formOccupation.value = occupation.textContent;
  });

  form.addEventListener("submit", function () {
    closePopup(popup, form);
    name.textContent = formName.value;
    occupation.textContent = formOccupation.value;
  });

  return {
    openButton: openButton,
    name: name,
    occupation: occupation,
    popup: popup,
    exitButton: exitButton,
    form: form,
    formName: formName,
    formOccupation: formOccupation,
  };
}

function createAddCardPopup(cards, imagePopup) {
  const addButton = document.querySelector(".profile__add-button");
  const popup = document.querySelector(".add-place");
  const exitButton = popup.querySelector(".popup__exit-button");
  const form = popup.querySelector(".form");
  const name = popup.querySelector(".form__input-field_el_title");
  const url = popup.querySelector(".form__input-field_el_url");

  form.addEventListener("submit", function () {
    const cardObj = { name: name.value, url: url.value };
    const cardElement = createCard(cardObj, imagePopup);
    closePopup(popup, form, (form) => form.reset());
    cards.prepend(cardElement);
  });

  addButton.addEventListener("click", function () {
    openPopup(popup);
  });

  return {
    addButton: addButton,
    popup: popup,
    exitButton: exitButton,
    form: form,
    name: name,
    url: url,
  };
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

function createAvatarPopup() {
  const container = document.querySelector(".profile__edit-avatar-container");
  const img = container.querySelector(".profile__avatar");
  const pencilButton = document.querySelector(".profile__pencil");
  const overlay = container.querySelector(".profile__overlay");
  const popup = document.querySelector(".edit-avatar");
  const form = popup.querySelector(".form");
  const url = popup.querySelector(".form__input-field_el_avatar");
  const exitButton = popup.querySelector(".popup__exit-button");

  pencilButton.addEventListener("click", function () {
    openPopup(popup);
    url.value = img.src;
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
    closePopup(popup, form);
    img.src = url.value;
  });

  return {
    container: container,
    img: img,
    pencilButton: pencilButton,
    overlay: overlay,
    popup: popup,
    form: form,
    url: url,
    exitButton: exitButton,
  };
}


export { createProfileEditPopup, createAddCardPopup, createImagePopup, createAvatarPopup };
