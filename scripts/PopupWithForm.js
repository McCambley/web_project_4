import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(formSubmitHandler, popupSelector) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    // collects data from all input fields
  }

  setEventListeners() {
    super.setEventListeners();
    // modification of parent class - has to add the click event listener to the close icon
    // and the subnmit event handler to teh submit button
  }

  close() {
    super.close();
    // modification of parent class - reset the form once the popup is closed
  }
}
