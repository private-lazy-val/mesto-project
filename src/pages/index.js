import "./index.css";
import {
  openPopup,
  closePopup,
  addPopupEventListeners,
} from "../components/modals.js";
import { enableValidation, disableButton } from "../components/validate.js";
import { createCard } from "../components/card.js";
import { resetFormErrors } from "../components/utils.js";
import {
  getUser,
  getInitialCards,
  editProfile,
  addCard,
  changeAvatar,
  deleteCard,
} from "../components/api.js";

const cardsContainer = document.querySelector(".cards");
let userId;

function adaptCardToCardObj(card) {
  return {
    name: card.name,
    url: card.link,
    likes: card.likes,
    ownerId: card.owner._id,
    cardId: card._id,
  };
}

Promise.all([getUser(), getInitialCards()])
  .then(([userData, cards]) => {
    document.querySelector(".profile__occupation").textContent = userData.about;
    document.querySelector(".profile__name").textContent = userData.name;
    document.querySelector(".profile__avatar").src = userData.avatar;
    userId = userData._id;

    cards
      .map(adaptCardToCardObj)
      .map((cardObj) =>
        createCard(cardObj, imagePopup, confirmationPopup, userId)
      )
      .forEach((cardElement) => cardsContainer.append(cardElement));
  })
  .catch((err) => console.log(err));

const formObj = {
  formSelector: ".form",
  inputSelector: ".form__input-field",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input-field_type_error",
  activeErrorClass: "form__input-error_active",
};

// Reset form
function resetForm(form, formObj) {
  form.reset();
  resetFormErrors(form, formObj);
}

function createImagePopup() {
  const popup = document.querySelector(".image-full-screen");
  const exitButton = popup.querySelector(".popup__exit-button");
  const img = popup.querySelector(".image-full-screen__image");
  const figCaption = popup.querySelector(".image-full-screen__figcaption");

  function openImagePopup(imageSrc, imageName) {
    img.src = imageSrc;
    figCaption.textContent = imageName;
    img.alt = `Фотография места ${imageName}`;
    openPopup(popup);
  }

  return {
    popup: popup,
    exitButton: exitButton,
    img: img,
    figCaption: figCaption,
    open: openImagePopup,
  };
}

function handleEditProfile(updatedData) {
  return editProfile(updatedData).then((userData) => {
    document.querySelector(".profile__name").textContent = userData.name;
    document.querySelector(".profile__occupation").textContent = userData.about;
  });
}

function formLoading(isLoading, btn, defaultTxt, loadingTxt = "Сохранение...") {
  btn.textContent = isLoading ? loadingTxt : defaultTxt;
}

function createProfileEditPopup() {
  const popup = document.querySelector(".edit-profile");
  const openButton = document.querySelector(".profile__edit-button");
  const name = document.querySelector(".profile__name");
  const occupation = document.querySelector(".profile__occupation");
  const exitButton = popup.querySelector(".popup__exit-button");
  const form = popup.querySelector(".form");
  const formName = popup.querySelector(".form__input-field_el_name");
  const formOccupation = popup.querySelector(
    ".form__input-field_el_occupation"
  );
  const submitButton = popup.querySelector(".form__submit");
  const defaultSubmitButtonText = submitButton.textContent;

  openButton.addEventListener("click", function () {
    formLoading(false, submitButton, defaultSubmitButtonText);
    disableButton(submitButton, formObj);
    resetForm(form, formObj);
    openPopup(popup);
    formName.value = name.textContent;
    formOccupation.value = occupation.textContent;
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = profileEditPopup.formName.value;
    const about = profileEditPopup.formOccupation.value;
    handleEditProfile({
      name: name,
      about: about,
    })
      .then(() => closePopup(popup))
      .catch((err) => console.log(`Ошибка обновления профиля: ${err}`))
      .finally(() => formLoading(true, submitButton, defaultSubmitButtonText));
  });

  return {
    openButton: openButton,
    name: name,
    occupation: occupation,
    popup: popup,
    exitButton: exitButton,
    form: form,
    formName: formName,
    formOccupation: formOccupation,
    submitButton: submitButton,
  };
}

function handleAddCard(cardObj) {
  return addCard(cardObj).then((card) => {
    const cardElement = createCard(
      adaptCardToCardObj(card, userId),
      imagePopup,
      confirmationPopup,
      userId
    );
    cardsContainer.prepend(cardElement);
  });
}

function createAddCardPopup() {
  const addButton = document.querySelector(".profile__add-button");
  const popup = document.querySelector(".add-place");
  const exitButton = popup.querySelector(".popup__exit-button");
  const form = popup.querySelector(".form");
  const name = popup.querySelector(".form__input-field_el_title");
  const url = popup.querySelector(".form__input-field_el_url");
  const submitButton = popup.querySelector(".form__submit");

  const defaultSubmitButtonText = submitButton.textContent;

  addButton.addEventListener("click", function () {
    formLoading(false, submitButton, defaultSubmitButtonText);
    disableButton(submitButton, formObj);
    resetForm(form, formObj);
    openPopup(popup);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const cardObj = { name: name.value, link: url.value };
    handleAddCard(cardObj)
      .then(() => closePopup(popup))
      .catch((err) => console.log(`Ошибка добавление карточки: ${err}`))
      .finally(() => formLoading(true, submitButton, defaultSubmitButtonText));
  });

  return {
    addButton: addButton,
    popup: popup,
    exitButton: exitButton,
    form: form,
    name: name,
    url: url,
    submitButton: submitButton,
  };
}

function createAvatarPopup() {
  const container = document.querySelector(".profile__edit-avatar-container");
  const img = container.querySelector(".profile__avatar");
  const pencilButton = document.querySelector(".profile__pencil");
  const overlay = container.querySelector(".profile__overlay");
  const popup = document.querySelector(".edit-avatar");
  const form = popup.querySelector(".form");
  const url = popup.querySelector(".form__input-field_el_avatar");
  const exitButton = popup.querySelector(".popup__exit-button");
  const submitButton = popup.querySelector(".form__submit");

  const defaultSubmitButtonText = submitButton.textContent;

  pencilButton.addEventListener("click", function () {
    formLoading(false, submitButton, defaultSubmitButtonText);
    disableButton(submitButton, formObj);
    resetForm(form, formObj);
    url.value = img.src;
    openPopup(popup);
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

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    changeAvatar({ avatar: url.value })
      .then(() => {
        closePopup(popup);
        img.src = url.value;
      })
      .catch((err) => console.log(`Ошибка обновления аватара: ${err}`))
      .finally(() => formLoading(true, submitButton, defaultSubmitButtonText));
  });

  return {
    container: container,
    img: img,
    pencilButton: pencilButton,
    overlay: overlay,
    popup: popup,
    form: form,
    url: url,
    exitButton: exitButton,
    submitButton: submitButton,
  };
}

let currentSubmitHandler;

function createConfirmationPopup() {
  const confirmationPopup = document.querySelector(".confirmation-popup");
  const submitButton = confirmationPopup.querySelector(".form__submit");
  const exitButton = confirmationPopup.querySelector(".popup__exit-button");

  function deleteCardAndRemoveElement(cardId, cardElement, confirmationPopup) {
    deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        closePopup(confirmationPopup);
      })
      .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
  }

  function open(cardId, cardElement) {
    if (currentSubmitHandler) {
      submitButton.removeEventListener("click", currentSubmitHandler);
    }
    currentSubmitHandler = () =>
      deleteCardAndRemoveElement(cardId, cardElement, confirmationPopup);
    submitButton.addEventListener("click", currentSubmitHandler);
    openPopup(confirmationPopup);
  }

  return {
    popup: confirmationPopup,
    exitButton: exitButton,
    submitButton: submitButton,
    open: open,
  };
}

const avatarPopup = createAvatarPopup();
const profileEditPopup = createProfileEditPopup();
const imagePopup = createImagePopup();
const confirmationPopup = createConfirmationPopup();
const cardAddPopup = createAddCardPopup();

// Close popup if
// "X" icon is clicked
// OR click outside of popup
addPopupEventListeners(profileEditPopup);
addPopupEventListeners(cardAddPopup);
addPopupEventListeners(imagePopup);
addPopupEventListeners(avatarPopup);
addPopupEventListeners(confirmationPopup);

// Validate forms
enableValidation(formObj);
