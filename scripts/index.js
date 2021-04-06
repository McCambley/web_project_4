// variables
let body = document.querySelector(".page");

let editButton = document.querySelector(".profile__edit-button");

let closeButton = document.querySelector(".popup__close");

let profileEditor = document.querySelector(".popup");

let profileEditorForm = document.querySelector(".popup__form");

let profileName = document.querySelector(".profile__name");

let profileTitle = document.querySelector(".profile__title");

let popupName = document.querySelector(".popup__input_role_name");

let popupTitle = document.querySelector(".popup__input_role_title");

// Retrieve profile object on page load
let profile = {};
updateProfile();

// functions
function updateProfile() {
  profile = {
    name: profileName.textContent,
    title: profileTitle.textContent
  }
  // console.log("profile object updated")
}

function editProfile() {
  updateProfile();
  // console.log("Editing profile!");
  popupName.value = profile.name;
  popupTitle.value = profile.title;
  profileEditor.classList.add("popup_opened");

  body.addEventListener('keyup', function escOut(e) {
    if (e.key === 'Escape') {
      closeEditor();
    }
  });
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

// event listeners
editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', closeEditor);
profileEditorForm.addEventListener('submit', saveProfile);





// Variables for later iterations

// let addButton = document.querySelector(".profile__add-button");

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
