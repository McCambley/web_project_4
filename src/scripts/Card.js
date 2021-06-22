export default class Card {
  constructor({ card, handleCardClick, handleDeleteClick, userId, handleLikeCard }, templateSelector) {
    this._name = card.name;
    this._link = card.link;
    this._likedData = card.likes;
    this._timesLiked = card.likes.length;
    this._id = card._id;
    this._creatorId = card.owner._id;
    this._user = userId;
    this._openPopup = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;
    this._handleLikeCard = handleLikeCard;
  }

  getCardId() {
    return this._id;
  }

  // _deletePlace(e) {
  //   e.target.parentElement.remove();
  //   // for debugging
  //   console.log(e.target.parentElement.querySelector('.element__image').src);
  // }

  _toggleHeart(e) {
    e.target.classList.toggle('element__heart_liked');
  }

  // getThenDisplayLikes

  _updateDisplayedLikes(e) {
    const displayedLikesElement = this._newPlace.querySelector('.element__likes');
    let displayedLikes = parseInt(displayedLikesElement.textContent);
    displayedLikesElement.textContent = e.target.classList.contains('element__heart_liked') ? ++displayedLikes : --displayedLikes;
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
      this._toggleHeart(evt);
      this._updateDisplayedLikes(evt);
      // update with a patch _handleLikeCard()
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

    this._newPlace.querySelector('.element__likes').textContent = this._timesLiked;
    // if ()

    return this._newPlace;
  }
}
