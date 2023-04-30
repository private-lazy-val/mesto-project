const profileEditButton = document.querySelector(".profile__edit-button");
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
const cardTemplate = document.querySelector("#card").content;
const cards = document.querySelector(".cards");
const imagePopup = document.querySelector(".image-full-screen");
const imagePopupExit = imagePopup.querySelector(".popup__exit-button");

// Close popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Open image popup
function openImagePopup(imageSrc, imageName) {
  const fullScreenImage = imagePopup.querySelector(".image-full-screen__image");
  const figCaption = imagePopup.querySelector(".image-full-screen__figcaption");
  fullScreenImage.src = imageSrc;
  figCaption.textContent = imageName;
  imagePopup.classList.add("popup_opened");
}

// Sanitize url
function sanitizeUrl(url) {
  const urlPattern = /^https?:\/\/\S+/;
  if (!urlPattern.test(url)) {
    throw new Error("Invalid URL provided.");
  }
  return url;
}

// Initialize Edit Profile button
function initEditProfileButton() {
  profileEditButton.addEventListener("click", function () {
    profileEditPopup.classList.add("popup_opened");
    profileEditName.value =
      document.querySelector(".profile__name").textContent;
    profileEditOccupation.value = document.querySelector(
      ".profile__occupation"
    ).textContent;
  });
}

// Initialize Add New Place button
function initAddPlaceButton() {
  newPlaceAddButton.addEventListener("click", function () {
    newPlacePopup.classList.add("popup_opened");
  });
}

// Add listener to submit event in Profile Edit form
function initProfileEditForm() {
  profileEditForm.addEventListener("submit", function (evt) {
    // Save changes without reloading the entire page and close popup
    evt.preventDefault();
    if (profileEditForm.checkValidity()) {
      closePopup(profileEditPopup);
      document.querySelector(".profile__name").textContent =
        profileEditName.value;
      document.querySelector(".profile__occupation").textContent =
        profileEditOccupation.value;
    } else {
      profileEditForm.reportValidity();
    }
  });
}

// Add listener to submit event in New Place form
function initNewPlaceForm() {
  newPlaceForm.addEventListener("submit", function (evt) {
    // Save changes without reloading the entire page and close popup
    evt.preventDefault();
    if (newPlaceForm.checkValidity()) {
      const name = newPlaceName.value;
      const rawLink = newPlaceLink.value;
      const cardElement = createCard(name, rawLink);
      closePopup(newPlacePopup);
      cards.prepend(cardElement);
    } else {
      newPlaceForm.reportValidity();
    }
  });
}

// Create new card and return
function createCard(name, rawLink) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const sanitizedLink = sanitizeUrl(rawLink);
  cardImageElement.src = sanitizedLink;
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

// Array of initial cards
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Add a set of cards after page loading
initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link);
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
