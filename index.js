import initialCards from "./cards.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const profileEditPopup = document.querySelector(".edit-profile");
const profileEditExit = profileEditPopup.querySelector(".popup__exit-button");
const profileEditForm = profileEditPopup.querySelector(".form");
const profileEditName = profileEditPopup.querySelector(
  ".form__input-field_el_name"
);
const profileEditOccupation = profileEditPopup.querySelector(
  ".form__input-field_el_occupation"
);
const newPlaceAddButton = document.querySelector(".profile__add-button");
const newPlacePopup = document.querySelector(".add-place");
const newPlaceExit = newPlacePopup.querySelector(".popup__exit-button");
const newPlaceForm = newPlacePopup.querySelector(".form");
const newPlaceName = newPlacePopup.querySelector(".form__input-field_el_title");
const newPlaceUrl = newPlacePopup.querySelector(".form__input-field_el_url");
const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".card");
const cards = document.querySelector(".cards");
const imagePopup = document.querySelector(".image-full-screen");
const imagePopupExit = imagePopup.querySelector(".popup__exit-button");
const fullScreenImage = imagePopup.querySelector(".image-full-screen__image");
const figCaption = imagePopup.querySelector(".image-full-screen__figcaption");
const avatarContainer = document.querySelector(
  ".profile__edit-avatar-container"
);
const avatarImage = avatarContainer.querySelector(".profile__avatar");
const pencilButton = document.querySelector(".profile__pencil");
const avatarOverlay = avatarContainer.querySelector(".profile__overlay");
const avatarEditPopup = document.querySelector(".edit-avatar");
const avatarEditForm = avatarEditPopup.querySelector(".form");
const avatarEditUrl = avatarEditPopup.querySelector(
  ".form__input-field_el_avatar"
);
const avatarPopupExit = avatarEditPopup.querySelector(".popup__exit-button");

// || OPEN AND CLOSE POPUP START
// Open popup
function openPopup(popup) {
  const submitButton = popup.querySelector(".form__submit");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add("form__submit_inactive");
  }
  popup.classList.add("popup_opened");
}

// Close popup
function closePopup(popup, formElement) {
  popup.classList.remove("popup_opened");
  if (popup === newPlacePopup) {
    newPlaceForm.reset();
  }
  resetFormErrors(formElement);
}

// || CLOSE POPUPS START
// Close popup if predicate is satisfied
function returnClosePopup(popup, predicate, formElement) {
  return (evt) => {
    if (predicate(evt)) {
      closePopup(popup, formElement);
    }
  };
}

// Close popup without saving by clicking on "X" button
let predicateAlwaysTrue = (evt) => true;
// Close popup without saving by clicking outside of popup
let predicateTargetContainsPopupOpened = (evt) =>
  evt.target.classList.contains("popup_opened");

// Function that adds event listeners to popup and closes them
function addPopupEventListeners(popup, exitButton, formElement) {
  exitButton.addEventListener(
    "click",
    returnClosePopup(popup, predicateAlwaysTrue, formElement)
  );
  popup.addEventListener(
    "click",
    returnClosePopup(popup, predicateTargetContainsPopupOpened, formElement)
  );
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape" && popup.classList.contains("popup_opened")) {
      closePopup(popup, formElement);
    }
  });
}

// Call the function for each popup
addPopupEventListeners(profileEditPopup, profileEditExit, profileEditForm);
addPopupEventListeners(newPlacePopup, newPlaceExit, newPlaceForm);
addPopupEventListeners(imagePopup, imagePopupExit, null);
addPopupEventListeners(avatarEditPopup, avatarPopupExit, avatarEditForm);
// || OPEN AND CLOSE POPUPS END


// || FORMS
// Add error to input field
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input-field_type_error");
  errorElement.classList.add("form__input-error_active");
  errorElement.textContent = errorMessage;
};

// Remove error from input field
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input-field_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

// Reset errors for a form
function resetFormErrors(formElement) {
  if (formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(".form__input-field")
    );
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
    });
  }
}

// Сheck whether an array has invalid inputs
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Toggle submit button
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("form__submit_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
  }
};

// Check validity of the input field
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Set listeners for input fields
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".form__input-field")
  );
  const buttonElement = formElement.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Validate form
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
       // Save changes without reloading the entire page
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
// || FORMS END


// || EDIT PROFILE START
// Initialize Edit Profile button
function initProfileEditButton() {
  profileEditButton.addEventListener("click", function () {
    openPopup(profileEditPopup);
    profileEditName.value = profileName.textContent;
    profileEditOccupation.value = profileOccupation.textContent;
  });
}

initProfileEditButton();

// Add listener to submit event in Profile Edit form
function initProfileEditForm() {
  profileEditForm.addEventListener("submit", function (evt) {
    closePopup(profileEditPopup, profileEditForm);
    profileName.textContent = profileEditName.value;
    profileOccupation.textContent = profileEditOccupation.value;
  });
}

initProfileEditForm();
// || EDIT PROFILE END


// || AVATAR START
// Initialize Edit Avatar button
function initAvatarEditButton() {
  pencilButton.addEventListener("click", function () {
    openPopup(avatarEditPopup);
    avatarEditUrl.value = avatarImage.src;
  });
}

initAvatarEditButton();

// Change background and show overlay on hover over avatar
avatarContainer.addEventListener("mouseover", function () {
  pencilButton.style.opacity = "1";
  avatarOverlay.style.backgroundColor = "rgba(0, 0, 0, .8)";
});

avatarContainer.addEventListener("mouseout", function () {
  pencilButton.style.opacity = "0";
  avatarOverlay.style.backgroundColor = "initial";
});

// Add listener to submit event in Avatar Edit form
function initAvatarEditForm() {
  avatarEditForm.addEventListener("submit", function (evt) {
    closePopup(avatarEditPopup, avatarEditForm);
    avatarImage.src = avatarEditUrl.value;
  });
}

initAvatarEditForm();
// || AVATAR END


// || IMAGE POPUP
// Open image popup
function openImagePopup(imageSrc, imageName) {
  fullScreenImage.src = imageSrc;
  figCaption.textContent = imageName;
  fullScreenImage.alt = `Фотография места ${imageName}`;
  openPopup(imagePopup);
}


// || CARDS START
// Initialize Add New Place button
function initNewPlaceButton() {
  newPlaceAddButton.addEventListener("click", function () {
    openPopup(newPlacePopup);
  });
}

initNewPlaceButton();

// Add listener to submit event in Add New Place form
function initNewPlaceForm() {
  newPlaceForm.addEventListener("submit", function (evt) {
    const name = newPlaceName.value;
    const rawLink = newPlaceUrl.value;
    const cardObj = { name: name, link: rawLink };
    const cardElement = createCard(cardObj);
    closePopup(newPlacePopup, newPlaceForm);
    newPlaceForm.reset();
    cards.prepend(cardElement);
  });
}

initNewPlaceForm();

// Create and return new card
function createCard(cardObj) {
  const name = cardObj.name;
  const rawLink = cardObj.link;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = rawLink;
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
    openImagePopup(rawLink, name);
  });
  return cardElement;
}

// Add a set of cards after page loading
initialCards.forEach((cardObj) => {
  const cardElement = createCard(cardObj);
  cards.append(cardElement);
});
// || CARDS END

