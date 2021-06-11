// Image preview identifiers
const imagePreview = document.querySelector(".popup_role_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

export default class Card {
  // takes card data - text and a link to the image - and a template element selector as parameters into the constructor
  constructor({ card, handleCardClick }, templateSelector) {
    this._name = card.name;
    this._link = card.link;
    this._openPopup = handleCardClick;
    this._templateSelector = templateSelector;
  }

  // _openPreview(e) {
  //   popupImage.src = this._link;
  //   popupImage.alt = this._name;
  //   popupImageCaption.textContent = this._name;
  //   this._openPopup(imagePreview);
  // }

  _deletePlace(e) {
    e.target.parentElement.remove();
  }

  _toggleLike(e) {
    e.target.classList.toggle("element__heart_liked");
  }

  _setEventListeners() {
    // Create event listener for cloned close button
    this._deleteButton = this._newPlace.querySelector(".element__delete");
    this._deleteButton.addEventListener("click", (e) => {
      this._deletePlace(e);
    });

    // Create event listener for cloned like button
    this._likeButton = this._newPlace.querySelector(".element__heart");
    this._likeButton.addEventListener("click", (e) => {
      this._toggleLike(e);
    });

    // Create event listener on cloned image
    this._placeImage = this._newPlace.querySelector(".element__image");
    this._placeImage.addEventListener("click", () => {
      this._openPopup(this._name, this._link);
    });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._newPlace = this._getTemplate();
    this._setEventListeners();

    this._newPlace.querySelector(".element__name").textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = `${this._name}`;
    return this._newPlace;
  }
}

// sample
// const imageModal = new PopupWithimate(...)

// const cardElement = new Card(
//   {
//     data: {..},
//     handleCardClick: (name, link) => {
//       imageModal.open(name, link);
//   },
//   'card-template-class'
// })
