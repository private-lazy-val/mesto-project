import './pages/index.css';
import { addPopupEventListeners } from "./components/utils.js";
import { initialCards } from "./components/cards.js";
import {
  createProfileEditPopup,
  createAddCardPopup,
  createImagePopup,
  createAvatarPopup,
} from "./components/modals.js";
import { enableValidation } from "./components/validate.js";
import { createCard } from "./components/card.js";

const cards = document.querySelector(".cards");

const imagePopup = createImagePopup();

// Add a set of cards after page loading
initialCards.forEach((cardObj) => {
  const cardElement = createCard(cardObj, imagePopup);
  cards.append(cardElement);
});

const cardAddPopup = createAddCardPopup(cards, imagePopup);

const profileEditPopup = createProfileEditPopup();

const avatarPopup = createAvatarPopup();

// Close popup if
// ESC button is pressed
// OR "X" icon is clicked
// OR click outside of popup
addPopupEventListeners(profileEditPopup);
addPopupEventListeners(cardAddPopup, (form) => form.reset());
addPopupEventListeners(imagePopup);
addPopupEventListeners(avatarPopup);

// Validate forms
enableValidation();
