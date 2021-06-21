export default class Card {
  constructor({ card, handleCardClick }, templateSelector) {
    this._name = card.name;
    this._link = card.link;
    this._openPopup = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _deletePlace(e) {
    const deleteImage = new Promise(function (resolve, reject) {});
    e.target.parentElement.remove();
    console.log(e.target.parentElement.querySelector(".element__image").src);
  }

  _toggleLike(e) {
    e.target.classList.toggle("element__heart_liked");
  }

  _setEventListeners() {
    this._deleteButton = this._newPlace.querySelector(".element__delete");
    this._deleteButton.addEventListener("click", (e) => {
      // newPromise here?
      this._deletePlace(e);
    });

    this._likeButton = this._newPlace.querySelector(".element__heart");
    this._likeButton.addEventListener("click", (e) => {
      this._toggleLike(e);
    });

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
