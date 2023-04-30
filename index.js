let profileEditButton = document.querySelector(".profile__edit-button");
let profileEditPopup = document.querySelector(".edit-profile");
let profileEditExit = profileEditPopup.querySelector(".popup__exit-button");
let profileEditForm = profileEditPopup.querySelector(".popup__form");
let profileEditName = profileEditPopup.querySelector(
  ".popup__input-field_el_name"
);
let profileEditOccupation = profileEditPopup.querySelector(
  ".popup__input-field_el_occupation"
);
let newPlaceAddButton = document.querySelector(".profile__add-button");
let newPlacePopup = document.querySelector(".add-place");
let newPlaceExit = newPlacePopup.querySelector(".popup__exit-button");
let newPlaceForm = newPlacePopup.querySelector(".popup__form");
let newPlaceTitle = newPlacePopup.querySelector(".popup__input-field_el_title");
let newPlaceLink = newPlacePopup.querySelector(".popup__input-field_el_link");
let cardTemplate = document.querySelector("#card").content;
let cards = document.querySelector(".cards");

// Close popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Toggle like button
function toggleLike() {
  let likeButtons = document.querySelectorAll(".card__like-button");
  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener("click", function () {
      this.classList.toggle("card__like-button_active");
    });
  }
}

toggleLike();

// Delete card
function deleteCard() {
  let deleteButtons = document.querySelectorAll(".card__delete-button");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      this.closest(".card").remove();
    });
  }
}

deleteCard();

// Add new card
function addCard(name, link) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
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
  cards.append(cardElement);
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

// Add a set of 6 cards after page loading
initialCards.slice(0, 6).forEach((card) => {
  addCard(card.name, card.link);
});

// Open Edit Profile pop up
profileEditButton.addEventListener("click", function () {
  profileEditPopup.classList.add("popup_opened");
  profileEditName.value = document.querySelector(".profile__name").textContent;
  profileEditOccupation.value = document.querySelector(
    ".profile__occupation"
  ).textContent;
});

// Save changes in Edit Profile pop up
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

// Close Edit Profile pop up without saving
profileEditExit.addEventListener("click", function () {
  closePopup(profileEditPopup);
});

// Add new card
newPlaceForm.addEventListener("submit", function (evt) {
  // Save changes without reloading the entire page and close popup
  evt.preventDefault();
  if (newPlaceForm.checkValidity()) {
    let cardTitle = newPlaceTitle.value;
    let cardLink = newPlaceLink.value;
    let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__image").src = cardLink;
    cardElement.querySelector(".card__title").textContent = cardTitle;
    cards.prepend(cardElement);
    closePopup(newPlacePopup);
    newPlaceForm.reset();
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
  } else {
    newPlaceForm.reportValidity();
  }
});

// Open Add New Place pop up
newPlaceAddButton.addEventListener("click", function () {
  newPlacePopup.classList.add("popup_opened");
});

// Close Add New Place pop up without saving
newPlaceExit.addEventListener("click", function () {
  closePopup(newPlacePopup);
  newPlaceForm.reset();
});
