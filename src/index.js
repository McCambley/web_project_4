// import primary stylesheet
import "./pages/index.css";

// import modules
import Section from "./scripts/Section.js";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import UserInfo from "./scripts/UserInfo.js";
import logoSrc from "./images/logo.svg"; // Logo
import shaggySrc from "./images/shaggy.jpeg"; // Profile picture
import {
  placesContainerSelector,
  editButton,
  profileEditorForm,
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
profileValidation.enableValidation();
addPlaceValidation.enableValidation();

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
