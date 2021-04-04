// variables
let body = document.querySelector(".page");

let editButton = document.querySelector(".profile__edit-button");

let closeButton = document.querySelector(".popup__close");

let profileEditor = document.querySelector(".popup");

let profileEditorForm = document.querySelector(".popup__container");

let allHearts = document.querySelectorAll(".element__heart");

// Retrieve profile object on page load
let profile = {};
updateProfile();

// No functional use beyond bug testing
// let heart = document.querySelector(".element__heart");

// Selects all profile text, including edit icon
// let profileText = document.querySelector(".profile__text");

// functions

for (let i = 0; i < allHearts.length; i++) {
  let currentHeart = allHearts[i];
  currentHeart.addEventListener('click', () => {
    currentHeart.classList.toggle("element__heart_liked");
  });
}

function updateProfile() {
  profile = {
    name: document.querySelector(".profile__name").textContent,
    title: document.querySelector(".profile__title").textContent
  }
  // console.log("profile object updated")
}

function editProfile() {
  updateProfile();
  // console.log("Editing profile!");
  document.querySelector(".popup__name").value = profile.name;
  document.querySelector(".popup__title").value = profile.title;
  profileEditor.classList.add("popup_opened");

  body.addEventListener('keyup', quickSave);
}

function saveProfile(e) {
  e.preventDefault();

  let newName = document.querySelector(".popup__name").value;
  let newTitle = document.querySelector(".popup__title").value;

  document.querySelector(".profile__name").textContent = newName;
  document.querySelector(".profile__title").textContent = newTitle;

  updateProfile();
  closeEditor();
}

function closeEditor() {
  // console.log("Closing Editor");
  profileEditor.classList.remove("popup_opened");

  body.removeEventListener('keyup', quickSave);

}

function quickSave(e) {
  if (e.key === 'Enter') {
    saveProfile(e);
  } else if (e.key === 'Escape') {
    closeEditor();
  }
}

// event listeners

editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', closeEditor);
profileEditorForm.addEventListener('submit', saveProfile);



// Variables for later iterations

// let addButton = document.querySelector(".profile__add-button");

// let saveButton = document.querySelector(".popup__save-button");



// Functions for later iterations

// function addImage() {
//   // console.log("The people really want this feature");
//   alert("Currently working on this functionality! For now, enjoy these pretty pictures!");
// }

// function likeImage() {
//   console.log("Liked!");
//   document.querySelector(".element__heart").classList.toggle("element__heart_liked");
// }



// Even listeners for later iterations

// heart.addEventListener('click', likeImage);
// addButton.addEventListener('click', addImage);
