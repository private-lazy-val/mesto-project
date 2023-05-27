import { initialCards } from "./components/cards.js";
import { enableValidation } from "./components/validate.js";
import { closePopup } from "./components/utils.js";

const cards = document.querySelector(".cards");
const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".card");

// Create and return new card
function createCard(cardObj) {
  const name = cardObj.name;
  const url = cardObj.url;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = url;
  cardImageElement.alt = `Фотография места ${name}`;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  cardImageElement.addEventListener("click", function () {
    imagePopup.open(url, name);
  });
  return cardElement;
}

// Add a set of cards after page loading
initialCards.forEach((cardObj) => {
  const cardElement = createCard(cardObj);
  cards.append(cardElement);
});

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

const profileEditPopup = createProfileEditPopup();

function createAddCardPopup(cards) {
  const addButton = document.querySelector(".profile__add-button");
  const popup = document.querySelector(".add-place");
  const exitButton = popup.querySelector(".popup__exit-button");
  const form = popup.querySelector(".form");
  const name = popup.querySelector(".form__input-field_el_title");
  const url = popup.querySelector(".form__input-field_el_url");

  form.addEventListener("submit", function () {
    const cardObj = { name: name.value, url: url.value };
    const cardElement = createCard(cardObj);
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

const cardAddPopup = createAddCardPopup(cards);

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

const imagePopup = createImagePopup();

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

  // Change background and show overlay on hover over avatar
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

const avatarPopup = createAvatarPopup();



// Open popup
function openPopup(popup) {
  const submitButton = popup.querySelector(".form__submit");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add("form__submit_inactive");
  }
  popup.classList.add("popup_opened");
}



// || CLOSE POPUPS START
// Close popup if predicate is satisfied
function returnClosePopup(popup, predicate, formElement, resetForm) {
  return (evt) => {
    if (predicate(evt)) {
      closePopup(popup, formElement, resetForm);
    }
  };
}

// Close popup without saving by clicking on "X" button
let predicateAlwaysTrue = (evt) => true;
// Close popup without saving by clicking outside of popup
let predicateTargetContainsPopupOpened = (evt) =>
  evt.target.classList.contains("popup_opened");

// Function that adds event listeners to popup and closes them
function addPopupEventListeners(popup, exitButton, formElement, resetForm = (form) => {}) {
  exitButton.addEventListener(
    "click",
    returnClosePopup(popup, predicateAlwaysTrue, formElement, resetForm)
  );
  popup.addEventListener(
    "click",
    returnClosePopup(popup, predicateTargetContainsPopupOpened, formElement, resetForm)
  );
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape" && popup.classList.contains("popup_opened")) {
      closePopup(popup, formElement, resetForm);
    }
  });
}

// Call the function for each popup
addPopupEventListeners(
  profileEditPopup.popup,
  profileEditPopup.exitButton,
  profileEditPopup.form
);
addPopupEventListeners(
  cardAddPopup.popup,
  cardAddPopup.exitButton,
  cardAddPopup.form,
  (form) => form.reset()
);
addPopupEventListeners(imagePopup.popup, imagePopup.exitButton, null);
addPopupEventListeners(
  avatarPopup.popup,
  avatarPopup.exitButton,
  avatarPopup.form
);
// || OPEN AND CLOSE POPUPS END

enableValidation();





