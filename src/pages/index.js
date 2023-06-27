import "./index.css";
import PopupWithImage from "../components/popupWithImage";
import PopupWithForm from "../components/popupWithForm.js";
import FormValidator from "../components/validate.js";
import Card from "../components/card.js";
import Api from "../components/api.js";
import Section from "../components/section.js";
import UserInfo from "../components/userInfo.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "fbf2685b-0a91-4bb8-81bb-36697ce1b928",
    "Content-Type": "application/json",
  },
});

let userId;
let section;

const formSelectors = {
  formSelector: ".form",
  inputSelector: ".form__input-field",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input-field_type_error",
  activeErrorClass: "form__input-error_active",
};

const userInfo = new UserInfo(
  { nameSelector: ".profile__name", aboutSelector: ".profile__occupation" },
  () => api.getUser(),
  (newUserInfo) => api.editProfile(newUserInfo)
);

userInfo.getUserInfo().then((userData) => {
  document.querySelector(".profile__occupation").textContent = userData.about;
  document.querySelector(".profile__name").textContent = userData.name;
  document.querySelector(".profile__avatar").src = userData.avatar;
  userId = userData._id;
});

const cardRenderer = (cardData) => {
  const cardObj = {
    name: cardData.name,
    url: cardData.link,
    likes: cardData.likes,
    ownerId: cardData.owner._id,
    cardId: cardData._id,
  };

  const card = new Card(
    cardObj,
    (url, name) => imagePopup.open(url, name),
    (cardId, cardElement) =>
      confirmationPopup.open({
        cardId: cardId,
        cardElement: cardElement,
      }),
    (isLiked, cardId) =>
      isLiked ? api.removeLike(cardId) : api.addLike(cardId),
    "#card"
  );

  return card.generateCard(userId);
};

api
  .getInitialCards()
  .then((cardsData) => {
    section = new Section(
      {
        items: cardsData,
        renderer: cardRenderer,
      },
      ".cards"
    );
    section.render();
  })
  .catch((err) => console.log(err));

// Profile edit popup
function createProfileEditPopup() {
  function submitFormHandler(inputValues, closePopup, finalizeSubmission) {
    userInfo
      .setUserInfo({
        name: inputValues["user-name"],
        about: inputValues["user-occupation"],
      })
      .then(() => closePopup())
      .catch((err) => console.log(`Ошибка обновления профиля: ${err}`))
      .finally(() => finalizeSubmission(true));
  }

  const popup = new PopupWithForm(
    ".edit-profile",
    ".popup__exit-button",
    formSelectors,
    submitFormHandler
  );

  const openButton = document.querySelector(".profile__edit-button");
  const userName = document.querySelector('.profile__name');
  const userOccupation = document.querySelector('.profile__occupation');
  const formName = popup.popupElement.querySelector(
    ".form__input-field_el_name"
  );
  const formOccupation = popup.popupElement.querySelector(
    ".form__input-field_el_occupation"
  );

  openButton.addEventListener("click", function () {
      popup.formLoading(false);
      profileEditFormValidator.disableButton();
      popup.open();
      formName.value = userName.textContent;
      formOccupation.value = userOccupation.textContent;
    });

  return popup;
}

const profileEditPopup = createProfileEditPopup();

// Avatar popup
function createAvatarPopup() {
  function submitFormHandler(inputValues, closePopup, finalizeSubmission) {
    const url = inputValues["avatar-url"];
    api
      .changeAvatar({ avatar: url })
      .then(() => {
        closePopup();
        img.src = url;
      })
      .catch((err) => console.log(`Ошибка обновления аватара: ${err}`))
      .finally(() => finalizeSubmission(true));
  }

  const popup = new PopupWithForm(
    ".edit-avatar",
    ".popup__exit-button",
    formSelectors,
    submitFormHandler
  );

  const container = document.querySelector(".profile__edit-avatar-container");
  const img = container.querySelector(".profile__avatar");
  const pencilButton = document.querySelector(".profile__pencil");
  const overlay = container.querySelector(".profile__overlay");
  const url = popup.popupElement.querySelector(".form__input-field_el_avatar");

  pencilButton.addEventListener("click", function () {
    popup.formLoading(false);
    avatarFormValidator.disableButton();
    url.value = img.src;
    popup.open();
  });

  // Change background AND show overlay on hover over avatar
  container.addEventListener("mouseover", function () {
    pencilButton.style.opacity = "1";
    overlay.style.backgroundColor = "rgba(0, 0, 0, .8)";
  });

  container.addEventListener("mouseout", function () {
    pencilButton.style.opacity = "0";
    overlay.style.backgroundColor = "initial";
  });

  return popup;
}

const avatarPopup = createAvatarPopup();

// Delete confirmation popup
function createConfirmationPopup() {
  function submitFormHandler(inputValues, closePopup, finalizeSubmission) {
    api
      .deleteCard(inputValues["cardId"])
      .then(() => {
        inputValues["cardElement"].remove();
        closePopup();
      })
      .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
  }

  const popup = new PopupWithForm(
    ".confirmation-popup",
    ".popup__exit-button",
    formSelectors,
    submitFormHandler
  );

  return popup;
}

const confirmationPopup = createConfirmationPopup();

  // Add card popup
function createAddCardPopup() {

  function handleAddCard(cardObj) {
    return api.addCard(cardObj).then((cardData) => {
      const card = cardRenderer(cardData);
      section.addItem(card, true);
    });
  }

  const popup = new PopupWithForm(
    ".add-place",
    ".popup__exit-button",
    formSelectors,
    (inputValues, closePopup, finalizeSubmission) => {
      const name = inputValues["place-name"];
      const link = inputValues["place-url"];
      handleAddCard({ name: name, link: link })
        .then(() => closePopup())
        .catch((err) => console.log(`Ошибка добавление карточки: ${err}`))
        .finally(() => finalizeSubmission(true));
    }
  );

  const addButton = document.querySelector(".profile__add-button");

  addButton.addEventListener("click", function () {
    popup.formLoading(false);
    cardAddFormValidator.disableButton();
    popup.open();
  });

  return popup;
}

const cardAddPopup = createAddCardPopup();

const imagePopup = new PopupWithImage(
  ".image-full-screen",
  ".popup__exit-button",
  ".image-full-screen__image",
  ".image-full-screen__figcaption"
);

// Close popup if
// "X" icon is clicked
// OR click outside of popup
// OR click on ESC button
profileEditPopup.setEventListeners();
cardAddPopup.setEventListeners();
imagePopup.setEventListeners();
avatarPopup.setEventListeners();
confirmationPopup.setEventListeners();

// Validate forms
const profileEditFormValidator = new FormValidator(
  formSelectors,
  profileEditPopup.form
);
profileEditFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(
  formSelectors,
  cardAddPopup.form
);
cardAddFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(formSelectors, avatarPopup.form);
avatarFormValidator.enableValidation();
