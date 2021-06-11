import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    // collects data from all input fields
    // STOP HERE, ON RETURN USE INPUT IDENTIFIERS AS KEYS
    const inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    // modification of parent class - has to add the click event listener to the close icon
    // and the subnmit event handler to teh submit button

    // const closeButton = this._popup.querySelector(".popup__close");
    // closeButton.addEventListener("click", () => {
    //   this.close();
    // });

    const submitButton = this._popup.querySelector(".popup__save-button");

    submitButton.addEventListener("click", () => {
      this._formSubmitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    // modification of parent class - reset the form once the popup is closed
    const form = this._popup.querySelector(".popup__form");
    form.reset();
  }
}
