import { deleteCard } from "../api.js";
const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".card");

// Create and return new card
function createCard(cardObj, imagePopup, userId) {
  const { name, url, likes, ownerId, cardId } = cardObj;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = url;
  cardImageElement.alt = `Фотография места ${name}`;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__like-count").textContent = likes;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (ownerId === userId) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", function () {
      deleteCard(cardId);
      cardElement.remove();
    });
  } else {
    deleteButton.style.display = "none";
  }

  cardImageElement.addEventListener("click", function () {
    imagePopup.open(url, name);
  });
  return cardElement;
}

export { createCard };
