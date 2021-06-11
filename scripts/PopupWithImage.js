import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    // modification of the parent class - add an image to the popup and the corresponding
    // image src attribute along with a caption for the image
    this._popup.querySelector(".popup__caption").textContent = name;
    this._popup.querySelector(".popup__image").src = link;
    super.open();
  }
}

// STOP HERE // BEGIN TOMORROW POPUPWITHIMAGE
