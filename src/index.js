// ---
// IMPORT UTILITIES
// ---

// import primary stylesheet
import './pages/index.css';

// import modules
import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupDelete from './scripts/PopupDelete.js';
import UserInfo from './scripts/UserInfo.js';
import Api from './scripts/Api.js';
import logoSrc from './images/logo.svg'; // Logo
import { placesContainerSelector, editButton, profileEditorForm, avatarUpdateForm, placeDeleteForm, avatarButton, addButton, imageAdderForm, popupName, popupTitle, setImageSource, logoImg, formItems, profileNameElement, profileAboutElement, profileAvatarElement } from './utils/constants.js';

setImageSource(logoImg, logoSrc);

// ---
// INITIALIZE CLASS OBJECTS
// ---

// connect via Api
const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  authorization: 'd45050bb-6054-461f-a7d7-f299e145a1f0',
});

// initialize form validation
const addPlaceValidation = new FormValidator(formItems, imageAdderForm);
const profileValidation = new FormValidator(formItems, profileEditorForm);
const avatarValidation = new FormValidator(formItems, avatarUpdateForm);
profileValidation.enableValidation();
addPlaceValidation.enableValidation();
avatarValidation.enableValidation();

// initialize userInfo
const userInfo = new UserInfo({
  nameElement: profileNameElement,
  aboutElement: profileAboutElement,
  avatarElement: profileAvatarElement,
});

// initialize place delete form
const confirmDeletePopup = new PopupDelete({
  popupSelector: '.popup_role_delete',
  formSubmitHandler: (cardElement, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmDeletePopup.close();
      })
      .catch(err => console.error(`Problem deleting card: ${err}`));
  },
});

// initialize and populate places container
const placeCards = new Section({
  renderer: item => {
    const newCard = new Card({
      card: item,
      handleCardClick: (name, link) => {
        imagePreviewPopup.open(name, link);
      },
      handleDeleteClick: evt => {
        confirmDeletePopup.open(evt, newCard._id);
      },
      userData: userInfo.getUserInfo(),
      handleLikeCard: status => {
        return status ? api.likeCard(newCard._id) : api.removeLike(newCard._id);
      },
      templateSelector: '#place-template',
    });
    placeCards.setItems(newCard.createCard());
  },
  containerSelector: placesContainerSelector,
});

// initialize image preview popup
const imagePreviewPopup = new PopupWithImage('.popup_role_image');

// initialize profile editor popup
const profileEditor = new PopupWithForm({
  popupSelector: '.popup_role_edit',
  formSubmitHandler: data => {
    userInfo.updateUserInfo(data);
    api
      .updateProfile(data)
      .then(() => {
        userInfo.renderUserInfo();
        profileEditor.close();
      })
      .catch(err => console.error(`Problem updating profile: ${err}`));
  },
});

// initialize image adder editor popup
const imageAdderPopup = new PopupWithForm({
  popupSelector: '.popup_role_add',
  formSubmitHandler: data => {
    api
      .addCard(data)
      .then(cardData => {
        const newCard = new Card({
          card: cardData,
          handleCardClick: (name, link) => {
            imagePreviewPopup.open(name, link);
          },
          handleDeleteClick: evt => {
            confirmDeletePopup.open(evt, newCard._id);
          },
          userData: userInfo.getUserInfo(),
          handleLikeCard: status => {
            return status ? api.likeCard(newCard._id) : api.removeLike(newCard._id);
          },
          templateSelector: '#place-template',
        });
        placeCards.setItems(newCard.createCard());
      })
      .then(() => imageAdderPopup.close())
      .catch(err => console.error(`Problem adding card: ${err}`));
  },
});

// initialize  avatar update popup
const avatarUpdatePopup = new PopupWithForm({
  popupSelector: '.popup_role_avatar',
  formSubmitHandler: data => {
    userInfo.updateUserInfo(data);
    userInfo.removeAvatar();
    api
      .updateAvatar(data)
      .then(() => {
        userInfo.renderUserInfo();
        avatarUpdatePopup.close();
      })
      .catch(err => console.error(`Problem updating avatar: ${err}`));
  },
});

// ---
// "TURN ON" PAGE - BEGIN LISTENING FOR USER EVENTS
// ---

// set event listeners on  class objects
confirmDeletePopup.setEventListeners();
imagePreviewPopup.setEventListeners();
profileEditor.setEventListeners();
imageAdderPopup.setEventListeners();
avatarUpdatePopup.setEventListeners();

// set event listeners to page buttons
editButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  popupName.value = name;
  popupTitle.value = about;
  profileValidation.toggleButtonState();
  profileEditor.open();
});

addButton.addEventListener('click', () => {
  imageAdderPopup.open();
  imageAdderPopup.toggleButtonState();
});

avatarButton.addEventListener('click', () => {
  avatarUpdatePopup.open();
  avatarUpdatePopup.toggleButtonState();
});

// ---
// FETCH AND DISPLAY INITIAL CONTENT
// ---

api
  // fetch and store user data
  .getUserInfo()
  .then(userData => {
    userInfo.updateUserInfo(userData);
  })
  // fetch and render group cards
  .then(() => {
    api.getGroupCards().then(fetchedCards => {
      placeCards.renderItems(fetchedCards.reverse());
    });
  })
  // render stored user info
  .then(() => {
    userInfo.renderUserInfo(); // Successfully updates the profile
    userInfo.removeLoadingStyles(); // Removes shimmer effect
  })
  .catch(err => console.error(`Problem rendering content: ${err}`));

//testing
api.getUserInfo().then(res => {
  console.log(res);
});
