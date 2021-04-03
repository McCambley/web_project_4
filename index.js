// variables
let body = document.querySelector(".page");

let editButton = document.querySelector(".profile__edit-button");

let closeButton = document.querySelector(".popup__close");

let addButton = document.querySelector(".profile__add-button");

let saveButton = document.querySelector(".popup__save-button");

let profileEditor = document.querySelector(".popup");

let allHearts = document.querySelectorAll(".element__heart");

// No functional use beyond bug testing
let heart = document.querySelector(".element__heart");

let profileText = document.querySelector(".profile__text");

let profile = {
  name: document.querySelector(".profile__name").textContent,
  title: document.querySelector(".profile__title").textContent
}

// functions

for (let i = 0; i < allHearts.length; i++) {
  let currentHeart = allHearts[i];
  currentHeart.addEventListener('click', () => {
    currentHeart.classList.toggle("element__heart_liked");
  });
}

function likeImage() {
  console.log("Liked!");
  document.querySelector(".element__heart").classList.toggle("element__heart_liked");
}

function updateProfile() {
  profile = {
    name: document.querySelector(".profile__name").textContent,
    title: document.querySelector(".profile__title").textContent
  }
  console.log("profile updated")
}

function editProfile() {
  updateProfile();
  console.log("Editing profile!");
  document.querySelector(".popup__name").value = profile.name;
  document.querySelector(".popup__title").value = profile.title;
  profileEditor.classList.add("popup_opened");

  // test
  body.addEventListener('keyup', quickSave);
}

function saveProfile() {
  let newName = document.querySelector(".popup__name").value;
  let newTitle = document.querySelector(".popup__title").value;

  document.querySelector(".profile__name").textContent = newName;
  document.querySelector(".profile__title").textContent = newTitle;

  closeEditor();
}

function closeEditor() {
  console.log("Closing Editor");
  profileEditor.classList.remove("popup_opened");

  // test
  body.removeEventListener('keyup', quickSave);

}

function quickSave(e) {
  if (e.key === 'Enter') {
    saveProfile();
  } else if (e.key === 'Escape') {
    closeEditor();
  }
}

function addImage() {
  console.log("The people really want this feature");
  alert("Currently working on this functionality! For now, enjoy these pretty pictures!");
}

// event listeners

editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', closeEditor);
addButton.addEventListener('click', addImage);
saveButton.addEventListener('click', saveProfile);
// heart.addEventListener('click', likeImage);
