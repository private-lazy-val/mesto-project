import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  formSelectors,
  avatarObj,
  profileObj,
  confirmationObj,
  addCardObj,
  imgObj,
  userInfoSelectors,
} from "../utils/constants";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "fbf2685b-0a91-4bb8-81bb-36697ce1b928",
    "Content-Type": "application/json",
  },
});

const formValidators = {};

// Universal validation method
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // get form name by `name` attribute
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formSelectors);

let section;

const userInfo = new UserInfo(userInfoSelectors);

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

  return card.generateCard(userInfo.getUserInfo()._id);
};

// Get user info and initial cards
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);

    section = new Section(
      {
        items: cardsData,
        renderer: cardRenderer,
      },
      ".cards"
    );
    section.render();
  })
  .catch((err) => console.log(`Ошибка запроса данных: ${err}`));

// Universal function, which accepts request function, popup class's instance and button text during loading
function handleSubmit(request, popup, loadingText = "Сохранение...") {
  popup.setFormLoading(true, loadingText);
  request()
    .then(() => {
      popup.close();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popup.setFormLoading(false, loadingText);
    });
}

// Profile edit popup
function createProfileEditPopup() {
  function submitFormHandler(inputValues, popup) {
    function makeRequest() {
      const name = inputValues["user-name"];
      const about = inputValues["user-occupation"];
      return api
        .editProfile({
          name: name,
          about: about,
        })
        .then((userData) => {
          userInfo.setUserInfo(userData);
        });
    }
    handleSubmit(makeRequest, popup);
  }

  const popup = new PopupWithForm(
    profileObj.popup,
    ".popup__exit-button",
    formSelectors,
    submitFormHandler
  );

  const profileEditFormValidator = formValidators[popup.getFormName()];

  profileObj.openButton.addEventListener("click", function () {
    profileEditFormValidator.resetFormErrors();
    profileEditFormValidator.disableButton();
    popup.open();
    popup.setInputValues({
      "user-name": profileObj.name.textContent,
      "user-occupation": profileObj.occupation.textContent,
    });
  });

  return popup;
}

const profileEditPopup = createProfileEditPopup();

// Avatar popup
function createAvatarPopup() {
  function submitFormHandler(inputValues, popup) {
    function makeRequest() {
      const url = inputValues["avatar-url"];
      return api.changeAvatar({ avatar: url })
      .then((userData) => {
        userInfo.setUserInfo(userData);
      });
    }
    handleSubmit(makeRequest, popup);
  }

  const popup = new PopupWithForm(
    avatarObj.popup,
    ".popup__exit-button",
    formSelectors,
    submitFormHandler
  );

  const avatarFormValidator = formValidators[popup.getFormName()];

  avatarObj.pencilButton.addEventListener("click", function () {
    avatarFormValidator.resetFormErrors();
    avatarFormValidator.disableButton();
    popup.open();
  });

  // Change background AND show overlay on hover over avatar
  avatarObj.container.addEventListener("mouseover", function () {
    avatarObj.pencilButton.style.opacity = "1";
    avatarObj.overlay.style.backgroundColor = "rgba(0, 0, 0, .8)";
  });

  avatarObj.container.addEventListener("mouseout", function () {
    avatarObj.pencilButton.style.opacity = "0";
    avatarObj.overlay.style.backgroundColor = "initial";
  });

  return popup;
}

const avatarPopup = createAvatarPopup();

// Delete confirmation popup
function createConfirmationPopup() {
  function submitFormHandler(inputValues, popup) {
    function makeRequest() {
      return api.deleteCard(inputValues["cardId"])
      .then(() => {
        inputValues["cardElement"].remove();
      });
    }
    handleSubmit(makeRequest, popup);
  }

    return new PopupWithForm(
      confirmationObj.popup,
      ".popup__exit-button",
      formSelectors,
      submitFormHandler
    );
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
    addCardObj.popup,
    ".popup__exit-button",
    formSelectors,
    (inputValues, popup) => {
      function makeRequest() {
        const name = inputValues["place-name"];
        const link = inputValues["place-url"];
        return handleAddCard({ name: name, link: link });
      }
      handleSubmit(makeRequest, popup);
    }
  );

  const cardAddFormValidator = formValidators[popup.getFormName()];

  addCardObj.addButton.addEventListener("click", function () {
    cardAddFormValidator.resetFormErrors();
    cardAddFormValidator.disableButton();
    popup.open();
  });

  return popup;
}

const cardAddPopup = createAddCardPopup();

const imagePopup = new PopupWithImage(
  imgObj.popup,
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
