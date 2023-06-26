export default class Card {
  constructor(
    cardObj,
    handleCardClick,
    handleDeleteCard,
    handleLike,
    cardTemplateSelector
  ) {
    this.cardObj = cardObj;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this.cardTemplate = document
      .querySelector(cardTemplateSelector)
      .content.querySelector(".card");
    this.cardElement = this.cardTemplate.cloneNode(true);
    this.likeButton = this.cardElement.querySelector(".card__like-button");
    this.deleteButton = this.cardElement.querySelector(".card__delete-button");
    this.cardImageElement = this.cardElement.querySelector(".card__image");
    this.likeCountElement = this.cardElement.querySelector(".card__like-count");
  }

  _setEventListeners() {
    this.likeButton.addEventListener("click", () => this._handleLikeClick());
    this.deleteButton.addEventListener("click", () => {
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
    // Optimistically update the UI
    this.likeButton.classList.toggle("card__like-button_active");
    const newLikeCount = isLiked
      ? parseInt(this.likeCountElement.textContent, 10) - 1
      : parseInt(this.likeCountElement.textContent, 10) + 1;
    this.likeCountElement.textContent = newLikeCount;

    // Send the request to the server

    // console.log(isLiked)
    this._handleLike(isLiked, this.cardObj.cardId)
      // If server response is successful, UI is already updated
      // So we don't need to use then
      .catch((err) => {
        // If there's an error, rollback the UI update
        console.log(err);
        this.likeButton.classList.toggle("card__like-button_active");
        this.likeCountElement.textContent = this.cardObj.likes.length;
      });
  }

  generateCard(userId) {
    this.cardImageElement.src = this.cardObj.url;
    this.cardImageElement.alt = `Фотография места ${this.cardObj.name}`;
    this.cardElement.querySelector(".card__title").textContent =
      this.cardObj.name;

    // Check if current user has liked the card already
    const isLikedByUser = this.cardObj.likes.some(
      (like) => like._id === userId
    );

    if (isLikedByUser) {
      this.likeButton.classList.add("card__like-button_active");
    }

    // Set the likes count
    this.likeCountElement.textContent = this.cardObj.likes.length;

    // Check if user and the card owner are the same people
    if (this.cardObj.ownerId === userId) {
      this.deleteButton.style.display = "block";
    } else {
      this.deleteButton.style.display = "none";
    }

    this._setEventListeners();

    return this.cardElement;
  }
}
