import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    // modification of the parent class - add an image to the popup and the corresponding
    // image src attribute along with a caption for the image
  }
}
