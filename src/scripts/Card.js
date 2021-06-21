export default class Card {
  constructor({ card, handleCardClick, handleDeleteClick, userId }, templateSelector) {
    this._name = card.name;
    this._link = card.link;
    this._id = card._id;
    this._creatorId = card.owner._id;
    this._user = userId;
    this._openPopup = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;
  }

  getCardId() {
    return this._id;
  }

  // _deletePlace(e) {
  //   e.target.parentElement.remove();
  //   // for debugging
  //   console.log(e.target.parentElement.querySelector('.element__image').src);
  // }

  _toggleLike(e) {
    e.target.classList.toggle('element__heart_liked');
  }

  _setEventListeners() {
    this._deleteButton = this._newPlace.querySelector('.element__delete');
    if (!(this._creatorId === this._user)) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener('click', evt => {
        this._handleDeleteClick(evt);
      });
    }

    this._likeButton = this._newPlace.querySelector('.element__heart');
    this._likeButton.addEventListener('click', evt => {
      this._toggleLike(evt);
    });

    this._placeImage = this._newPlace.querySelector('.element__image');
    this._placeImage.addEventListener('click', () => {
      this._openPopup(this._name, this._link);
    });
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._newPlace = this._getTemplate();
    this._setEventListeners();

    this._newPlace.querySelector('.element__name').textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = `${this._name}`;
    return this._newPlace;
  }
}
