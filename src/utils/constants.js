// IMPORTS

import franklinSrc from "../images/franklin.jpeg"; // Georgia picture
import pisgahSrc from "../images/pisgah.jpeg"; // Pisgah National Forest picture
import dragonSrc from "../images/dragons-tooth.jpeg"; // Dragon's Tooth picture
import pennSrc from "../images/penn2.jpeg"; // Pennsylvania picture
import strattonSrc from "../images/stratton.jpeg"; // Stratton Pond picture
import franconiaSrc from "../images/franconia-ridge.jpeg"; // Franconia Ridge picture

// CONSTANTS

export const placesContainerSelector = ".elements";
export const editButton = document.querySelector(".profile__edit-button");
export const profileEditorForm = document.querySelector(
  ".popup__form_role_edit"
);
export const avatarButton = document.querySelector(".profile__avatar-overlay");
export const avatarUpdateForm = document.querySelector(
  ".popup__form_role_avatar"
);
export const placeDeleteForm = document.querySelector(
  ".popup__form_role_delete"
);
export const addButton = document.querySelector(".profile__add-button");
export const imageAdderForm = document.querySelector(".popup__form_role_add");
export const profileName = document.querySelector(".profile__name");
export const profileTitle = document.querySelector(".profile__title");
export const popupName = document.querySelector(".popup__input_role_name");
export const popupTitle = document.querySelector(".popup__input_role_title");

export const shaggyImg = document.getElementById("shaggy");
export const logoImg = document.getElementById("logo");

export const initialCards = [
  {
    name: "Georgia",
    link: franklinSrc,
  },
  {
    name: "Pisgah National Forest",
    link: pisgahSrc,
  },
  {
    name: "Dragon's Tooth",
    link: dragonSrc,
  },
  {
    name: "Pennsylvania",
    link: pennSrc,
  },
  {
    name: "Stratton Pond",
    link: strattonSrc,
  },
  {
    name: "Franconia Ridge",
    link: franconiaSrc,
  },
];

export const formItems = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error_active",
};

export const setImageSource = function (imageElement, source) {
  imageElement.src = source;
};
