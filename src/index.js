// import primary stylesheet
import "./pages/index.css";

// import modules
import Section from "./scripts/Section.js";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import initialCards from "./scripts/cards.js";
import settings from "./scripts/settings.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import UserInfo from "./scripts/UserInfo.js";

// load images for webpack
import shaggySrc from "./images/shaggy.jpeg"; // Profile picture
const shaggyImg = document.getElementById("shaggy");
shaggyImg.src = shaggySrc;

const placesContainerSelector = ".elements";
const editButton = document.querySelector(".profile__edit-button");
const profileEditorForm = document.querySelector(".popup__form_role_edit");
const addButton = document.querySelector(".profile__add-button");
const imageAdderForm = document.querySelector(".popup__form_role_add");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const popupName = document.querySelector(".popup__input_role_name");
const popupTitle = document.querySelector(".popup__input_role_title");

// initialize form validation
const addPlaceValidation = new FormValidator(settings, imageAdderForm);
const profileValidation = new FormValidator(settings, profileEditorForm);
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
