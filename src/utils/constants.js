export const formSelectors = {
  formSelector: ".form",
  inputSelector: ".form__input-field",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input-field_type_error",
  activeErrorClass: "form__input-error_active",
};

export const userInfoSelectors = { nameSelector: ".profile__name", jobSelector: ".profile__occupation", avatarSelector: ".profile__avatar"};

const avatarContainer = document.querySelector(".profile__edit-avatar-container");
const avatarPopup = document.querySelector(".edit-avatar");

export const avatarObj = {
  popup: avatarPopup,
  container: avatarContainer,
  img: avatarContainer.querySelector(userInfoSelectors.avatarSelector),
  pencilButton: document.querySelector(".profile__pencil"),
  overlay: avatarContainer.querySelector(".profile__overlay"),
  urlInput: avatarPopup.querySelector(".form__input-field_el_avatar")
};


const popupElement = document.querySelector(".edit-profile");
export const profileObj = {
  popup: popupElement,
  openButton: document.querySelector(".profile__edit-button"),
  name: document.querySelector(userInfoSelectors.nameSelector),
  occupation: document.querySelector(userInfoSelectors.jobSelector),
  nameInput: popupElement.querySelector(".form__input-field_el_name"),
  occupationInput: popupElement.querySelector(
    ".form__input-field_el_occupation"
  ),
};

export const confirmationObj = {
  popup: document.querySelector(
    ".confirmation-popup"
  )
}

export const addCardObj = {
  popup: document.querySelector(".add-place"),
  addButton: document.querySelector(".profile__add-button")
}

export const imgObj = {
  popup: document.querySelector(".image-full-screen")
}
