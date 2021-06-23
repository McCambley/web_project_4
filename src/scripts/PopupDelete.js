import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._popup.querySelector('.popup__save-button');
    this._formSubmitHandler = formSubmitHandler;
  }

  open(evt, cardId) {
    super.open();
    this._button.textContent = 'Save';
    this._cardId = cardId;
    this._card = evt.target.parentElement;
    console.log(this._cardId);
    console.log(this._card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._button.textContent = 'Saving...';
      this._formSubmitHandler(this._card, this._cardId);
      // this._card.remove();
    });
  }
}