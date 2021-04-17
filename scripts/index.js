// variables
let body = document.querySelector(".page");

let profileName = document.querySelector(".profile__name");

let profileTitle = document.querySelector(".profile__title");

// Profile editor identifiers

let editButton = document.querySelector(".profile__edit-button");

let closeProfileEditor = document.querySelector(".popup__close_role_edit");

let profileEditor = document.querySelector(".popup_role_edit");

let profileEditorForm = document.querySelector(".popup__form_role_edit");

let popupName = document.querySelector(".popup__input_role_name");

let popupTitle = document.querySelector(".popup__input_role_title");


// Image adder identifiers

let addButton = document.querySelector(".profile__add-button");

let closeImageAdder = document.querySelector(".popup__close_role_add");

let newPlaceAdder = document.querySelector(".popup_role_add");

let imageAdderForm = document.querySelector(".popup__form_role_add");

let popupImageTitle = document.querySelector(".popup__input_role_image-title");

let popupImageLink = document.querySelector(".popup__input_role_image-link");

// Retrieve profile object on page load
let profile = {};
updateProfile();

// functions
function updateProfile() {
  profile = {
    name: profileName.textContent,
    title: profileTitle.textContent,
  };
  // console.log("profile object updated")
}

function editProfile() {
  updateProfile();
  // console.log("Editing profile!");
  popupName.value = profile.name;
  popupTitle.value = profile.title;
  profileEditor.classList.add("popup_opened");

  body.addEventListener("keyup", function escOut(e) {
    if (e.key === "Escape") {
      closeEditor();
    }
  });
}

function addNewPlace() {
  newPlaceAdder.classList.add("popup_opened");
  console.log("it worked!")
}

function saveNewPlace() {
  closeEditor();
}

function saveProfile(e) {
  e.preventDefault();

  profileName.textContent = popupName.value;
  profileTitle.textContent = popupTitle.value;

  updateProfile();
  closeEditor();
}

function closeEditor() {
  // console.log("Closing Editor");
  profileEditor.classList.remove("popup_opened");
}

function closeAdder() {
  // console.log("Closing Editor");
  newPlaceAdder.classList.remove("popup_opened");
}

// event listeners
editButton.addEventListener("click", editProfile);
addButton.addEventListener('click', addNewPlace)
closeProfileEditor.addEventListener("click", closeEditor);
closeImageAdder.addEventListener("click", closeAdder);
profileEditorForm.addEventListener("submit", saveProfile);

// Variables for later iterations


// let saveButton = document.querySelector(".popup__save-button");

// let heart = document.querySelector(".element__heart");

// let allHearts = document.querySelectorAll(".element__heart");

// Functions for later iterations

// function addImage() {
//   // console.log("The people really want this feature");
//   alert("Currently working on this functionality! For now, enjoy these pretty pictures!");
// }

// function likeImage() {
//   console.log("Liked!");
//   document.querySelector(".element__heart").classList.toggle("element__heart_liked");
// }

// for (let i = 0; i < allHearts.length; i++) {
//   let currentHeart = allHearts[i];
//   currentHeart.addEventListener('click', () => {
//     currentHeart.classList.toggle("element__heart_liked");
//   });
// }

// Event listeners for later iterations

// heart.addEventListener('click', likeImage);
// addButton.addEventListener('click', addImage);
