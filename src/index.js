// import primary stylesheet
import "./pages/index.css";

// import modules
import Section from "./scripts/Section.js";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import UserInfo from "./scripts/UserInfo.js";
import Api from "./scripts/Api.js";
import logoSrc from "./images/logo.svg"; // Logo
import shaggySrc from "./images/shaggy.jpeg"; // Profile picture
import {
  placesContainerSelector,
  editButton,
  profileEditorForm,
  avatarUpdateForm,
  placeDeleteForm,
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

// connect with API
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/group-12",
  authorization: "d45050bb-6054-461f-a7d7-f299e145a1f0",
});

// initialize form validation
const addPlaceValidation = new FormValidator(formItems, imageAdderForm);
const profileValidation = new FormValidator(formItems, profileEditorForm);
const avatarValidation = new FormValidator(formItems, avatarUpdateForm);
const deleteValidation = new FormValidator(formItems, placeDeleteForm);
profileValidation.enableValidation();
addPlaceValidation.enableValidation();
avatarValidation.enableValidation();
deleteValidation.enableValidation();

// initialize user information
const userInfo = new UserInfo(
  profileName.textContent,
  profileTitle.textContent
);

// get user information
api.getUserInfo().then((userData) => {
  profileName.textContent = "Loading...";
  profileTitle.textContent = "";
  userInfo.setUserInfo(userData);
});

// initialize and populate places container
api.getGroupCards().then((fetchedCards) => {
  const placeCards = new Section(
    {
      items: fetchedCards,
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
});

// initialize image preview popup
const imagePreviewPopup = new PopupWithImage(".popup_role_image");

imagePreviewPopup.setEventListeners();

// initialize profile editor popup
const profileEditor = new PopupWithForm(".popup_role_edit", (data) => {
  userInfo.setUserInfo(data);
  profileEditor.close();
  api.updateProfile(data);
});

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

// initialize place deleter form
const placeDeletePopup = new PopupWithForm(
  ".popup_role_delete",
  ({ thing }) => {
    console.log(thing);
  }
);

placeDeletePopup.setEventListeners();

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
  const { name, about } = userInfo.getUserInfo();
  popupName.value = name;
  popupTitle.value = about;
  profileValidation.toggleButtonState();
  profileEditor.open();
});

addButton.addEventListener("click", () => {
  imageAdderPopup.open();
});

avatarButton.addEventListener("click", () => {
  avatarUpdatePopup.open();
});
