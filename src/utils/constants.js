// CONSTANTS

export const placesContainerSelector = '.elements';
export const editButton = document.querySelector('.profile__edit-button');
export const profileEditorForm = document.querySelector('.popup__form_role_edit');
export const avatarButton = document.querySelector('.profile__avatar-overlay');
export const avatarUpdateForm = document.querySelector('.popup__form_role_avatar');
export const placeDeleteForm = document.querySelector('.popup__form_role_delete');
export const addButton = document.querySelector('.profile__add-button');
export const imageAdderForm = document.querySelector('.popup__form_role_add');
export const profileNameElement = document.querySelector('.profile__name');
export const profileAboutElement = document.querySelector('.profile__title');
export const profileAvatarElement = document.querySelector('.profile__avatar');
export const popupName = document.querySelector('.popup__input_role_name');
export const popupTitle = document.querySelector('.popup__input_role_title');

export const logoImg = document.getElementById('logo');

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
