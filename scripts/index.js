import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./cards.js";
import settings from "./settings.js";

// Body identifiers
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const placesContainer = document.querySelector(".elements");

// Profile editor identifiers
const editButton = document.querySelector(".profile__edit-button");
const closeProfileEditor = document.querySelector(".popup__close_role_edit");
const profileEditor = document.querySelector(".popup_role_edit");
const profileEditorForm = document.querySelector(".popup__form_role_edit");
const popupName = document.querySelector(".popup__input_role_name");
const popupTitle = document.querySelector(".popup__input_role_title");

// Image adder identifiers
const addButton = document.querySelector(".profile__add-button");
const closeImageAdder = document.querySelector(".popup__close_role_add");
const newPlaceAdder = document.querySelector(".popup_role_add");
const imageAdderForm = document.querySelector(".popup__form_role_add");
const popupImageTitle = document.querySelector(
  ".popup__input_role_image-title"
);
const popupImageLink = document.querySelector(".popup__input_role_image-link");

// Image preview identifiers
const closePreviewButton = document.querySelector(".popup__close_role_image");

const addPlaceValidation = new FormValidator(settings, imageAdderForm);
const profileValidation = new FormValidator(settings, profileEditorForm);
profileValidation.enableValidation();
addPlaceValidation.enableValidation();

// Retrieve profile object on page load
let profile = {};
updateProfile();

// render initial cards object on page load
initialCards.forEach((place) => {
  addPlace(place);
});

editButton.addEventListener("click", editProfile);
addButton.addEventListener("click", openPlaceAdder);
closeProfileEditor.addEventListener("click", closePopup);
closeImageAdder.addEventListener("click", closePopup);
closePreviewButton.addEventListener("click", closePopup);
profileEditorForm.addEventListener("submit", saveProfile);
imageAdderForm.addEventListener("submit", savePlace);

function updateProfile() {
  profile = {
    name: profileName.textContent,
    title: profileTitle.textContent,
  };
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEscape);
  document.addEventListener("click", closeOnOverlay);
}

function closePopup() {
  const openPopup = document.querySelector(".popup_opened");
  openPopup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closeWithEscape);
  document.removeEventListener("click", closeOnOverlay);
}

function editProfile() {
  updateProfile();
  // Populate inputs values with current profile object values
  popupName.value = profile.name;
  popupTitle.value = profile.title;
  // Set button state on page load
  profileValidation.toggleButtonState();
  // Open popup with updated values
  openPopup(profileEditor);
}

function openPlaceAdder() {
  addPlaceValidation.toggleButtonState();
  openPopup(newPlaceAdder);
  // Code below would reset input values when popup is reopened
  // popupImageTitle.value = "";
  // popupImageLink.value = "";
}

function createCard(data) {
  const newPlace = new Card(data, "#place-template", openPopup);
  return newPlace.createCard();
}

function addPlace(data) {
  placesContainer.prepend(createCard(data));
}

function savePlace(e) {
  e.preventDefault();
  const newPlace = {
    name: popupImageTitle.value,
    link: popupImageLink.value,
  };
  addPlace(newPlace);
  closePopup();
  e.target.reset();
}

function saveProfile(e) {
  e.preventDefault();

  profileName.textContent = popupName.value;
  profileTitle.textContent = popupTitle.value;

  updateProfile();
  closePopup();
  e.target.reset();
}

function closeWithEscape(e) {
  if (e.key === "Escape") {
    closePopup();
  }
}

function closeOnOverlay(e) {
  if (e.target.classList.contains("popup_opened")) {
    closePopup();
  }
}
