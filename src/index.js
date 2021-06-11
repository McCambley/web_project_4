import Section from "./scripts/Section.js";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import initialCards from "./scripts/cards.js";
import settings from "./scripts/settings.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import UserInfo from "./scripts/UserInfo.js";

const placesContainer = document.querySelector(".elements");
const placesContainerSelector = ".elements";
const editButton = document.querySelector(".profile__edit-button");
const profileEditorForm = document.querySelector(".popup__form_role_edit");
const addButton = document.querySelector(".profile__add-button");
const imageAdderForm = document.querySelector(".popup__form_role_add");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const popupName = document.querySelector(".popup__input_role_name");
const popupTitle = document.querySelector(".popup__input_role_title");

const addPlaceValidation = new FormValidator(settings, imageAdderForm);
const profileValidation = new FormValidator(settings, profileEditorForm);
profileValidation.enableValidation();
addPlaceValidation.enableValidation();

const userInfo = new UserInfo(
  profileName.textContent,
  profileTitle.textContent
);

console.log(userInfo);

const imagePreviewPopup = new PopupWithImage(".popup_role_image");
imagePreviewPopup.setEventListeners();
// Refactor with UserInfo Class
const profileEditor = new PopupWithForm(
  ".popup_role_edit",
  ({ name, title }) => {
    console.log(name, title);
    // profileName.textContent = name;
    // profileTitle.textContent = title;
    userInfo.setUserInfo(name, title);
    profileEditor.close();
  }
);
profileEditor.setEventListeners();
const imageAdderPopup = new PopupWithForm(
  ".popup_role_add",
  ({ name, link }) => {
    initialCards.unshift({ name, link });
    placeCards.renderItems();
    imageAdderPopup.close();
  }
);
imageAdderPopup.setEventListeners();

editButton.addEventListener("click", () => {
  // update input values with UserInfo
  const data = userInfo.getUserInfo();
  popupName.value = data.name;
  popupTitle.value = data.title;
  profileValidation.toggleButtonState();
  profileEditor.open();
});
addButton.addEventListener("click", () => {
  imageAdderPopup.open();
});

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

function addPlace(data) {
  placesContainer.prepend(createCard(data));
}
// Body identifiers

// Profile editor identifiers
// const closeProfileEditor = document.querySelector(".popup__close_role_edit");
//const profileEditor = document.querySelector(".popup_role_edit");

// Image adder identifiers
// const closeImageAdder = document.querySelector(".popup__close_role_add");
// const newPlaceAdder = document.querySelector(".popup_role_add");
// const popupImageTitle = document.querySelector(
//   ".popup__input_role_image-title"
// );
// const popupImageLink = document.querySelector(".popup__input_role_image-link");

// Image preview identifiers
// const closePreviewButton = document.querySelector(".popup__close_role_image");

// Retrieve profile object on page load
// let profile = {};
//updateProfile();

// render initial cards object on page load
// initialCards.forEach((place) => {
//   addPlace(place);
// });

// closeProfileEditor.addEventListener("click", closePopup);
// closeImageAdder.addEventListener("click", closePopup);
// closePreviewButton.addEventListener("click", closePopup);
// profileEditorForm.addEventListener("submit", saveProfile);
// imageAdderForm.addEventListener("submit", savePlace);

// function updateProfile() {
//   profile = {
//     name: profileName.textContent,
//     title: profileTitle.textContent,
//   };
// }

// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closeWithEscape);
//   document.addEventListener("click", closeOnOverlay);
// }

// function closePopup() {
//   const openPopup = document.querySelector(".popup_opened");
//   openPopup.classList.remove("popup_opened");

//   document.removeEventListener("keydown", closeWithEscape);
//   document.removeEventListener("click", closeOnOverlay);
// }

// function editProfile() {
//   updateProfile();
//   // Populate inputs values with current profile object values
//   popupName.value = profile.name;
//   popupTitle.value = profile.title;
//   // Set button state on page load
//   profileValidation.toggleButtonState();
//   // Open popup with updated values
//   openPopup(profileEditor);
// }

// function openPlaceAdder() {
//   addPlaceValidation.toggleButtonState();
//   openPopup(newPlaceAdder);
//   // Code below would reset input values when popup is reopened
//   // popupImageTitle.value = "";
//   // popupImageLink.value = "";
// }

// function closeWithEscape(e) {
//   if (e.key === "Escape") {
//     closePopup();
//   }
// }

// function closeOnOverlay(e) {
//   if (e.target.classList.contains("popup_opened")) {
//     closePopup();
//   }
// }
