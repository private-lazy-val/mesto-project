import { addLike, removeLike } from "./api.js";
const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".card");

// Create and return new card
function createCard(cardObj, imagePopup, confirmationPopup, userId) {
  const { name, url, likes, ownerId, cardId } = cardObj; //const name = cardObj.name; const url = cardObj.url; ...
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  cardImageElement.src = url;
  cardImageElement.alt = `Фотография места ${name}`;
  cardElement.querySelector(".card__title").textContent = name;

  // Check if current user has liked the card already
  const isLikedByUser = likes.some((like) => like._id === userId);
  if (isLikedByUser) {
    likeButton.classList.add("card__like-button_active");
  }

  // Set the likes count
  likeCountElement.textContent = likes.length;

  likeButton.addEventListener("click", function (evt) {
    const isLiked = evt.target.classList.contains("card__like-button_active");
    if (isLiked) {
      removeLike(cardId)
        .then((updatedCard) => {
          evt.target.classList.remove("card__like-button_active");
          // Update the like count
          likeCountElement.textContent = updatedCard.likes.length;
        })
        .catch((err) => console.log(err));
    } else {
      addLike(cardId)
        .then((updatedCard) => {
          evt.target.classList.add("card__like-button_active");
          // Update the like count
          likeCountElement.textContent = updatedCard.likes.length;
        })
        .catch((err) => console.log(err));
    }
  });
  // Check if user and the card owner are the same people
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (ownerId === userId) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () =>
      confirmationPopup.open(cardId, cardElement)
    );
  } else {
    deleteButton.style.display = "none";
  }

  cardImageElement.addEventListener("click", function () {
    imagePopup.open(url, name);
  });

  return cardElement;
}

export { createCard };
