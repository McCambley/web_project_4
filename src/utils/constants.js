// IMPORTS

import franklinSrc from '../images/franklin.jpeg'; // Georgia picture
import pisgahSrc from '../images/pisgah.jpeg'; // Pisgah National Forest picture
import dragonSrc from '../images/dragons-tooth.jpeg'; // Dragon's Tooth picture
import pennSrc from '../images/penn2.jpeg'; // Pennsylvania picture
import strattonSrc from '../images/stratton.jpeg'; // Stratton Pond picture
import franconiaSrc from '../images/franconia-ridge.jpeg'; // Franconia Ridge picture

// CONSTANTS

export const placesContainerSelector = '.elements';
export const editButton = document.querySelector('.profile__edit-button');
export const profileEditorForm = document.querySelector('.popup__form_role_edit');
export const avatarButton = document.querySelector('.profile__avatar-overlay');
export const avatarUpdateForm = document.querySelector('.popup__form_role_avatar');
export const placeDeleteForm = document.querySelector('.popup__form_role_delete');
export const addButton = document.querySelector('.profile__add-button');
export const imageAdderForm = document.querySelector('.popup__form_role_add');
export const profileName = document.querySelector('.profile__name');
export const profileTitle = document.querySelector('.profile__title');
export const popupName = document.querySelector('.popup__input_role_name');
export const popupTitle = document.querySelector('.popup__input_role_title');

export const avatarElement = document.getElementById('avatar');
export const logoImg = document.getElementById('logo');
export const element1 = document.getElementById('element1');
export const element2 = document.getElementById('element2');
export const element3 = document.getElementById('element3');
export const element4 = document.getElementById('element4');
export const element5 = document.getElementById('element5');
export const element6 = document.getElementById('element6');

export const initialCards = [
  {
    name: 'Georgia',
    link: franklinSrc,
  },
  {
    name: 'Pisgah National Forest',
    link: pisgahSrc,
  },
  {
    name: "Dragon's Tooth",
    link: dragonSrc,
  },
  {
    name: 'Pennsylvania',
    link: pennSrc,
  },
  {
    name: 'Stratton Pond',
    link: strattonSrc,
  },
  {
    name: 'Franconia Ridge',
    link: franconiaSrc,
  },
];

export const formItems = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active',
};

export const setImageSource = function (imageElement, source) {
  imageElement.src = source;
};
