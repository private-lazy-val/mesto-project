const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".card");


// Create and return new card
function createCard(cardObj, imagePopup) {
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

export { createCard };
