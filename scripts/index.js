import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./cards.js";
import settings from "./settings.js";

// Body identifiers

const body = document.querySelector(".page");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const placesContainer = document.querySelector(".elements");
let profile = {};

// Profile editor identifiers
const editButton = document.querySelector(".profile__edit-button");
const closeProfileEditor = document.querySelector(".popup__close_role_edit");
const profileEditor = document.querySelector(".popup_role_edit");
const profileEditorForm = document.querySelector(".popup__form_role_edit");
const popupName = document.querySelector(".popup__input_role_name");
const popupTitle = document.querySelector(".popup__input_role_title");
const profileSaveButton = document.querySelector(
  ".popup__save-button_role_edit"
);
// const profileInputList = createInputList(profileEditorForm, formItems);

// Image adder identifiers
const addButton = document.querySelector(".profile__add-button");
const closeImageAdder = document.querySelector(".popup__close_role_add");
const newPlaceAdder = document.querySelector(".popup_role_add");
const imageAdderForm = document.querySelector(".popup__form_role_add");
const popupImageTitle = document.querySelector(
  ".popup__input_role_image-title"
);
const popupImageLink = document.querySelector(".popup__input_role_image-link");
const adderSaveButton = document.querySelector(".popup__save-button_role_add");
// const adderInputList = createInputList(imageAdderForm, formItems);

// Image preview identifiers
const closePreviewButton = document.querySelector(".popup__close_role_image");

const addPlaceValidation = new FormValidator(settings, imageAdderForm);
console.log(addPlaceValidation);
const profileValidation = new FormValidator(settings, profileEditorForm);
console.log(profileValidation);
profileValidation.enableValidation();
addPlaceValidation.enableValidation();

// Retrieve profile object on page load
updateProfile();

// render initial cards object on page load
initialCards.forEach((place) => {
  addPlace(place);
});

// Creates an object containing content of profile
function updateProfile() {
  profile = {
    name: profileName.textContent,
    title: profileTitle.textContent,
  };
}

// Global popup opener
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEscape);
  document.addEventListener("click", closeOnOverlay);
}

// Universal popup closer for save, create, close, and escape buttons
function closePopup() {
  const openPopup = document.querySelector(".popup_opened");
  openPopup.classList.remove("popup_opened");
  // remove event listener on escape key and overlay click
  document.removeEventListener("keydown", closeWithEscape);
  document.removeEventListener("click", closeOnOverlay);
}

// Open profile editor
function editProfile() {
  updateProfile();
  // Populate inputs values with current profile object values
  popupName.value = profile.name;
  popupTitle.value = profile.title;
  // Open popup with updated values
  profileValidation.toggleButtonState();
  openPopup(profileEditor);
}

// Open new place popup
function openPlaceAdder() {
  addPlaceValidation.toggleButtonState();
  openPopup(newPlaceAdder);
  popupImageTitle.value = "";
  popupImageLink.value = "";
}

// Add new place to places container
function addPlace(data) {
  // Create new card from template
  const newPlace = new Card(data, "#place-template", openPopup);
  const cardElement = newPlace.createCard();
  // Prepend new place in the places container
  placesContainer.prepend(cardElement);
}

// Save custom place to page
function savePlace(e) {
  e.preventDefault();
  const newPlace = {
    name: popupImageTitle.value,
    link: popupImageLink.value,
  };
  // Add place using form input values
  addPlace(newPlace);
  closePopup();
  // reset form validation
  // addPlaceValidation.resetValidation();
  e.target.reset();
}

// Save updated profile form
function saveProfile(e) {
  e.preventDefault();
  // Update profile with form input values
  profileName.textContent = popupName.value;
  profileTitle.textContent = popupTitle.value;
  // Update profile object with newly updated profile content
  updateProfile();
  closePopup();
  // reset form validation
  // profileValidation.resetValidation();
  e.target.reset();
}

// close popup with escape button
function closeWithEscape(e) {
  if (e.key === "Escape") {
    closePopup();
  }
}

// close when click occurs on overlay
function closeOnOverlay(e) {
  if (e.target.classList.contains("popup_opened")) {
    closePopup();
  }
}

// event listeners
editButton.addEventListener("click", editProfile);
addButton.addEventListener("click", openPlaceAdder);
closeProfileEditor.addEventListener("click", closePopup);
closeImageAdder.addEventListener("click", closePopup);
closePreviewButton.addEventListener("click", closePopup);
profileEditorForm.addEventListener("submit", saveProfile);
imageAdderForm.addEventListener("submit", savePlace);
