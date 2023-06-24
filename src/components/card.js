import Api from "./api.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "fbf2685b-0a91-4bb8-81bb-36697ce1b928",
    "Content-Type": "application/json",
  },
});

export default class Card {
  constructor(cardObj, handleCardClick, handleDeleteCard, userId, handleLike) {
    this.cardObj = cardObj;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this.userId = userId;
    this.cardTemplate = document
      .querySelector("#card")
      .content.querySelector(".card");
    this._handleLike = handleLike;
  }

  _setEventListeners() {
    const likeButton = this.cardElement.querySelector(".card__like-button");
    const deleteButton = this.cardElement.querySelector(".card__delete-button");

    likeButton.addEventListener("click", () => this._handleLikeClick());
    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this.cardObj.cardId, this.cardElement);
    });
    this.cardImageElement.addEventListener("click", () =>
      this._handleCardClick(this.cardObj.url, this.cardObj.name)
    );
  }

  _handleLikeClick() {
    const isLiked = this.likeButton.classList.contains(
      "card__like-button_active"
    );
    const likePromise = this._handleLike(isLiked, this.cardObj.cardId);
    likePromise
      .then((updatedCard) => {
        this.likeButton.classList.toggle("card__like-button_active");
        // Update the like count
        this.likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log(err));
  }

  generateCard() {
    this.cardElement = this.cardTemplate.cloneNode(true);
    this.cardImageElement = this.cardElement.querySelector(".card__image");
    this.likeButton = this.cardElement.querySelector(".card__like-button");
    this.likeCountElement = this.cardElement.querySelector(".card__like-count");

    this.cardImageElement.src = this.cardObj.url;
    this.cardImageElement.alt = `Фотография места ${this.cardObj.name}`;
    this.cardElement.querySelector(".card__title").textContent =
      this.cardObj.name;

    // Check if current user has liked the card already
    const isLikedByUser = this.cardObj.likes.some(
      (like) => like._id === this.userId
    );

    if (isLikedByUser) {
      this.likeButton.classList.add("card__like-button_active");
    }

    // Set the likes count
    this.likeCountElement.textContent = this.cardObj.likes.length;

    // Check if user and the card owner are the same people
    const deleteButton = this.cardElement.querySelector(".card__delete-button");
    if (this.cardObj.ownerId === this.userId) {
      deleteButton.style.display = "block";
    } else {
      deleteButton.style.display = "none";
    }

    this._setEventListeners();

    return this.cardElement;
  }
}
