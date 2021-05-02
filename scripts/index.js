// Body identifiers
const body = document.querySelector(".page");
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
const imagePreview = document.querySelector(".popup_role_image");
const closePreviewButton = document.querySelector(".popup__close_role_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

// Retrieve profile object on page load
let profile = {};
updateProfile();

// Initial images object
const initialCards = [
  {
    name: "Georgia",
    link: "./images/franklin.jpeg",
  },
  {
    name: "Pisgah National Forest",
    link: "./images/pisgah.jpeg",
  },
  {
    name: "Dragon's Tooth",
    link: "./images/dragons-tooth.jpeg",
  },
  {
    name: "Pennsylvania",
    link: "./images/penn2.jpeg",
  },
  {
    name: "Stratton Pond",
    link: "./images/stratton.jpeg",
  },
  {
    name: "Franconia Ridge",
    link: "./images/franconia-ridge.jpeg",
  },
];

initialCards.forEach((place) => {
  // Populate page with initial places object
  addPlace(place.name, place.link);
});

// functions

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
  const popupForm = openPopup.querySelector(".popup__form");
  openPopup.classList.remove("popup_opened");
  // remove event listener on escape key and overlay click
  document.removeEventListener("keydown", closeWithEscape);
  document.removeEventListener("click", closeOnOverlay);
  // reset form if popup contains one
  resetValidation(openPopup);
}

// Open profile editor
function editProfile() {
  updateProfile();
  // Populate inputs values with current profile object values
  popupName.value = profile.name;
  popupTitle.value = profile.title;
  // Open popup with updated values
  openPopup(profileEditor);
}

// Open new place popup
function openPlaceAdder() {
  // newPlaceAdder.classList.add("popup_opened");
  openPopup(newPlaceAdder);
  // Refresh input values with blank strings
  popupImageTitle.value = "";
  popupImageLink.value = "";
}

// Create card before adding to DOM
function createCard(title, link) {
  // Target and clone template to newPlace variable
  const placeTemplate = document.querySelector("#place-template").content;
  const newPlace = placeTemplate.querySelector(".element").cloneNode(true);
  // Create event listener for cloned close button
  const deleteButton = newPlace.querySelector(".element__delete");
  deleteButton.addEventListener("click", (e) =>
    e.target.parentElement.remove()
  );
  // Create event listener for cloned like button
  const likeButton = newPlace.querySelector(".element__heart");
  likeButton.addEventListener("click", (e) =>
    e.target.classList.toggle("element__heart_liked")
  );
  // Create event listener on cloned image
  const placeImage = newPlace.querySelector(".element__image");
  placeImage.addEventListener("click", openPreview);
  // Update cloned content with argument values
  newPlace.querySelector(".element__name").textContent = title;
  placeImage.src = link;
  placeImage.alt = `${title}`;
  return newPlace;
}

// Add new place to places container
function addPlace(title, link) {
  // Create new card from template
  const newPlace = createCard(title, link);
  // Prepend new place in the places container
  placesContainer.prepend(newPlace);
}

// Save custom place to page
function savePlace(e) {
  e.preventDefault();
  // Add place using form input values
  addPlace(popupImageTitle.value, popupImageLink.value);
  closePopup();
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
}

// open image preview popup
function openPreview(e) {
  // update popup nodes with target src and alt values
  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt;
  // Update figure caption with alt text value
  popupImageCaption.textContent = e.target.alt;
  // Open updated popup
  openPopup(imagePreview);
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
