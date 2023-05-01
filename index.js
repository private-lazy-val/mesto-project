import initialCards from "./cards.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const profileEditPopup = document.querySelector(".edit-profile");
const profileEditExit = profileEditPopup.querySelector(".popup__exit-button");
const profileEditForm = profileEditPopup.querySelector(".popup__form");
const profileEditName = profileEditPopup.querySelector(
  ".popup__input-field_el_name"
);
const profileEditOccupation = profileEditPopup.querySelector(
  ".popup__input-field_el_occupation"
);
const newPlaceAddButton = document.querySelector(".profile__add-button");
const newPlacePopup = document.querySelector(".add-place");
const newPlaceExit = newPlacePopup.querySelector(".popup__exit-button");
const newPlaceForm = newPlacePopup.querySelector(".popup__form");
const newPlaceName = newPlacePopup.querySelector(
  ".popup__input-field_el_title"
);
const newPlaceLink = newPlacePopup.querySelector(".popup__input-field_el_link");
const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".card");
const cards = document.querySelector(".cards");
const imagePopup = document.querySelector(".image-full-screen");
const imagePopupExit = imagePopup.querySelector(".popup__exit-button");
const fullScreenImage = imagePopup.querySelector(".image-full-screen__image");
const figCaption = imagePopup.querySelector(".image-full-screen__figcaption");

// Open popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Close popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Open image popup
function openImagePopup(imageSrc, imageName) {
  fullScreenImage.src = imageSrc;
  figCaption.textContent = imageName;
  openPopup(imagePopup);
}

// Sanitize url
function sanitizeUrl(url) {
  const urlPattern = /^https?:\/\/\S+/;
  if (!urlPattern.test(url.trim())) {
    throw new Error("Invalid URL");
  }
  return url;
}

// Initialize Edit Profile button
function initEditProfileButton() {
  profileEditButton.addEventListener("click", function () {
    openPopup(profileEditPopup);
    profileEditName.value = profileName.textContent;
    profileEditOccupation.value = profileOccupation.textContent;
  });
}

// Add listener to submit event in Profile Edit form
function initProfileEditForm() {
  profileEditForm.addEventListener("submit", function (evt) {
    // Save changes without reloading the entire page
    evt.preventDefault();
    closePopup(profileEditPopup);
    profileName.textContent = profileEditName.value;
    profileOccupation.textContent = profileEditOccupation.value;
  });
}

// Initialize Add New Place button
function initAddPlaceButton() {
  newPlaceAddButton.addEventListener("click", function () {
    openPopup(newPlacePopup);
  });
}

// Create and return new card
function createCard(cardObj) {
  const name = cardObj.name;
  const rawLink = cardObj.link;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const sanitizedLink = sanitizeUrl(rawLink);
  cardImageElement.src = sanitizedLink;
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
    openImagePopup(sanitizedLink, name);
  });
  return cardElement;
}

// Add listener to submit event in Add New Place form
function initNewPlaceForm() {
  newPlaceForm.addEventListener("submit", function (evt) {
    // Save changes without reloading the entire page
    evt.preventDefault();
    const name = newPlaceName.value;
    const rawLink = newPlaceLink.value;
    const cardObj = { name: name, link: rawLink };
    const cardElement = createCard(cardObj);
    closePopup(newPlacePopup);
    newPlaceForm.reset();
    cards.prepend(cardElement);
  });
}

// Add a set of cards after page loading
initialCards.forEach((cardObj) => {
  const cardElement = createCard(cardObj);
  cards.append(cardElement);
});

initEditProfileButton();

initProfileEditForm();

initAddPlaceButton();

initNewPlaceForm();

// Close Edit Profile pop up without saving
profileEditExit.addEventListener("click", function () {
  closePopup(profileEditPopup);
});

// Close Add New Place pop up without saving
newPlaceExit.addEventListener("click", function () {
  closePopup(newPlacePopup);
  newPlaceForm.reset();
});

// Close image popup
imagePopupExit.addEventListener("click", function () {
  closePopup(imagePopup);
});
