// import primary stylesheet
import "./pages/index.css";

// import modules
import Section from "./scripts/Section.js";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import UserInfo from "./scripts/UserInfo.js";
import Api from "./scripts/API.js";
import logoSrc from "./images/logo.svg"; // Logo
import shaggySrc from "./images/shaggy.jpeg"; // Profile picture
import {
  placesContainerSelector,
  editButton,
  profileEditorForm,
  avatarUpdateForm,
  avatarButton,
  addButton,
  imageAdderForm,
  profileName,
  profileTitle,
  popupName,
  popupTitle,
  shaggyImg,
  logoImg,
  initialCards,
  formItems,
  setImageSource,
} from "./utils/constants.js";

// set image sources for webpack
setImageSource(shaggyImg, shaggySrc);
setImageSource(logoImg, logoSrc);

// initialize form validation
const addPlaceValidation = new FormValidator(formItems, imageAdderForm);
const profileValidation = new FormValidator(formItems, profileEditorForm);
const avatarValidation = new FormValidator(formItems, avatarUpdateForm);
profileValidation.enableValidation();
addPlaceValidation.enableValidation();
avatarValidation.enableValidation();

// initialize and populate places container
const placeCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newPlace = new Card(
        {
          card: item,
          handleCardClick: (name, link) => {
            imagePreviewPopup.open(name, link);
          },
        },
        "#place-template"
      );
      const cardElement = newPlace.createCard();
      placeCards.setItems(cardElement);
    },
  },
  placesContainerSelector
);

placeCards.renderItems();

// initialize user information
const userInfo = new UserInfo(
  profileName.textContent,
  profileTitle.textContent
);

// initialize image preview popup
const imagePreviewPopup = new PopupWithImage(".popup_role_image");

imagePreviewPopup.setEventListeners();

// initialize profile editor popup
const profileEditor = new PopupWithForm(
  ".popup_role_edit",
  ({ name, title }) => {
    userInfo.setUserInfo(name, title);
    profileEditor.close();
    fetch("https://around.nomoreparties.co/group-12/users/me", {
      method: "PATCH",
      headers: {
        authorization: "d45050bb-6054-461f-a7d7-f299e145a1f0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: title,
      }),
    });
  }
);

profileEditor.setEventListeners();

// initialize image adder editor popup
const imageAdderPopup = new PopupWithForm(
  ".popup_role_add",
  ({ name, link }) => {
    initialCards.unshift({ name, link });
    placeCards.renderItems();
    imageAdderPopup.close();
  }
);

imageAdderPopup.setEventListeners();

// initialize  avatar update popup
const avatarUpdatePopup = new PopupWithForm(
  ".popup_role_avatar",
  ({ link }) => {
    // Avatar submission handler
    console.log(link);
    console.log("hello?");
  }
);

avatarUpdatePopup.setEventListeners();

// add functionality to page buttons
editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  popupName.value = data.name;
  popupTitle.value = data.title;
  profileValidation.toggleButtonState();
  profileEditor.open();
});

addButton.addEventListener("click", () => {
  imageAdderPopup.open();
});

avatarButton.addEventListener("click", () => {
  avatarUpdatePopup.open();
});

// TEST Token: d45050bb-6054-461f-a7d7-f299e145a1f0 Group ID: group-12

fetch("https://around.nomoreparties.co/group-12/users/me", {
  headers: {
    authorization: "d45050bb-6054-461f-a7d7-f299e145a1f0",
  },
})
  .then((res) => res.json())
  .then((res) => console.log(res));
