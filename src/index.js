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
// import shaggySrc from './images/shaggy.jpeg'; // Profile picture
import loadingSrc from './images/loading.gif'; // Profile picture
import {
  placesContainerSelector,
  editButton,
  profileEditorForm,
  avatarUpdateForm,
  placeDeleteForm,
  avatarButton,
  addButton,
  imageAdderForm,
  profileName,
  profileTitle,
  popupName,
  popupTitle,
  avatarElement,
  logoImg,
  // initialCards,
  formItems,
  setImageSource,
} from './utils/constants.js';

// set image sources for webpack
setImageSource(avatarElement, loadingSrc);
setImageSource(logoImg, logoSrc);

// connect with API
const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  authorization: 'd45050bb-6054-461f-a7d7-f299e145a1f0',
});

// const secondaryApi = new Api({
//   baseUrl: 'https://around.nomoreparties.co/group-12',
//   authorization: 'd45050bb-6054-461f-a7d7-f299e145a1f0',
// });

// initialize form validation
const addPlaceValidation = new FormValidator(formItems, imageAdderForm);
const profileValidation = new FormValidator(formItems, profileEditorForm);
const avatarValidation = new FormValidator(formItems, avatarUpdateForm);
const deleteValidation = new FormValidator(formItems, placeDeleteForm);
profileValidation.enableValidation();
addPlaceValidation.enableValidation();
avatarValidation.enableValidation();
deleteValidation.enableValidation();
// initialize user information

// console.log(1, userInfo);
// get user information
const userInfo = new UserInfo({});
console.log('Immediate userInfo: ', userInfo); // returns UserInfo {_name: undefined, _about: undefined, _id: undefined, _avatar: undefined...}

api
  .getUserInfo()
  .then(userData => {
    userInfo.updateUserInfo(userData);
    return userInfo;
  })
  .then(data => {
    userInfo.setUserInfo(); // Successfully updates the profile
  });

// api
//   .getUserInfo()
//   .then(userData => {
//     return userInfo = new UserInfo(userData);
//   })

// initialize place delete form
const confirmDeletePopup = new PopupDelete('.popup_role_delete', cardId => {
  api.deleteCard(cardId);
  confirmDeletePopup.close();
});

confirmDeletePopup.setEventListeners();

// initialize and populate places container
const placeCards = new Section(
  {
    renderer: item => {
      const newCard = new Card(
        {
          card: item,
          handleCardClick: (name, link) => {
            imagePreviewPopup.open(name, link);
          },
          handleDeleteClick: evt => {
            confirmDeletePopup.open(evt, newCard._id);
          },
          userData: userInfo.getUserInfo(),
          handleLikeCard: status => {
            status ? api.likeCard(newCard._id) : api.removeLike(newCard._id);
          },
        },
        '#place-template'
      );
      const cardElement = newCard.createCard();
      placeCards.setItems(cardElement);
    },
  },
  placesContainerSelector
);

api.getGroupCards().then(fetchedCards => {
  // render cards with most recent closer to top
  placeCards.renderItems(fetchedCards.reverse());
});

// initialize image preview popup
const imagePreviewPopup = new PopupWithImage('.popup_role_image');

imagePreviewPopup.setEventListeners();

// initialize profile editor popup
const profileEditor = new PopupWithForm('.popup_role_edit', data => {
  userInfo.updateUserInfo(data);
  userInfo.setUserInfo();
  profileEditor.close();
  api.updateProfile(data);
});

profileEditor.setEventListeners();

// initialize image adder editor popup
const imageAdderPopup = new PopupWithForm('.popup_role_add', data => {
  api.addCard(data).then(cardData => {
    const newCard = new Card(
      {
        card: cardData,
        handleCardClick: (name, link) => {
          imagePreviewPopup.open(name, link);
        },
        handleDeleteClick: evt => {
          confirmDeletePopup.open(evt, newCard._id);
        },
        userData: userInfo.getUserInfo(),
        handleLikeCard: status => {
          status ? api.likeCard(newCard._id) : api.removeLike(newCard._id);
        },
      },
      '#place-template'
    );
    const cardElement = newCard.createCard();
    placeCards.setItems(cardElement);
    imageAdderPopup.close();
  });
});

// OLD
// const imageAdderPopup = new PopupWithForm('.popup_role_add', data => {
//   api.addCard(data).then(cardData => {
//     const newCard = new Card(
//       {
//         card: cardData,
//         handleCardClick: (name, link) => {
//           imagePreviewPopup.open(name, link);
//         },
//         handleDeleteClick: () => {
//           const id = newCard.getCardId();
//           api.deleteCard(id);
//         },
//         // userId: userInfo.getUserId(),
//         userId: userInfo.getUserId(),
//       },
//       '#place-template'
//     );
//     const cardElement = newCard.createCard();
//     placeCards.setItems(cardElement);
//     imageAdderPopup.close();
//   });
// });

imageAdderPopup.setEventListeners();

// api.getGroupCards().then((res) => {
//   res.forEach((card) => {
//     if ((card.owner.name = "Nice")) {
//       api.deleteCard(card._id);
//       console.log(`Deleting card: ${card.name}`);
//     }
//   });
// });

// initialize  avatar update popup
const avatarUpdatePopup = new PopupWithForm('.popup_role_avatar', data => {
  userInfo.updateUserInfo(data);
  userInfo.setUserInfo();
  avatarUpdatePopup.close();
  api.updateAvatar(data);
});

avatarUpdatePopup.setEventListeners();

// add functionality to page buttons
editButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  popupName.value = name;
  popupTitle.value = about;
  profileValidation.toggleButtonState();
  profileEditor.open();
});

addButton.addEventListener('click', () => {
  imageAdderPopup.open();
});

avatarButton.addEventListener('click', () => {
  avatarUpdatePopup.open();
});
