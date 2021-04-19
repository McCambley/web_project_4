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

// Image preview identifier
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
  addPlace(place.name, place.link);
});

// functions
function updateProfile() {
  profile = {
    name: profileName.textContent,
    title: profileTitle.textContent,
  };
}

function editProfile() {
  updateProfile();
  popupName.value = profile.name;
  popupTitle.value = profile.title;
  profileEditor.classList.add("popup_opened");

  body.addEventListener("keyup", function escOut(e) {
    if (e.key === "Escape") {
      closeEditor();
    }
  });
}

function openPlaceAdder() {
  newPlaceAdder.classList.add("popup_opened");
  popupImageTitle.value = "";
  popupImageLink.value = "";

  body.addEventListener("keyup", function escOut(e) {
    if (e.key === "Escape") {
      closeAdder();
    }
  });
}

function addPlace(title, link) {
  const placeTemplate = document.querySelector("#place-template").content;
  const newPlace = placeTemplate.querySelector(".element").cloneNode(true);

  const deleteButton = newPlace.querySelector(".element__delete");
  deleteButton.addEventListener("click", (e) =>
    e.target.parentElement.remove()
  );

  const likeButton = newPlace.querySelector(".element__heart");
  likeButton.addEventListener("click", (e) =>
    e.target.classList.toggle("element__heart_liked")
  );

  const placeImage = newPlace.querySelector(".element__image");
  placeImage.addEventListener("click", openPreview);

  newPlace.querySelector(".element__name").textContent = title;
  newPlace.querySelector(".element__image").src = link;
  newPlace.querySelector(".element__image").alt = `${title}`;

  placesContainer.prepend(newPlace);
}

function savePlace(e) {
  e.preventDefault();

  addPlace(popupImageTitle.value, popupImageLink.value);
  closeAdder();
}

function saveProfile(e) {
  e.preventDefault();

  profileName.textContent = popupName.value;
  profileTitle.textContent = popupTitle.value;

  updateProfile();
  closeEditor();
}

function closeEditor() {
  profileEditor.classList.remove("popup_opened");
}

function closeAdder() {
  newPlaceAdder.classList.remove("popup_opened");
}

function closePreview() {
  imagePreview.classList.remove("popup_opened");
}

function openPreview(e) {
  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt;
  popupImageCaption.textContent = e.target.alt;
  imagePreview.classList.toggle("popup_opened");
}

// event listeners
editButton.addEventListener("click", editProfile);
addButton.addEventListener("click", openPlaceAdder);
closeProfileEditor.addEventListener("click", closeEditor);
closeImageAdder.addEventListener("click", closeAdder);
closePreviewButton.addEventListener("click", closePreview);
profileEditorForm.addEventListener("submit", saveProfile);
imageAdderForm.addEventListener("submit", savePlace);
