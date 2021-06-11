import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    const submitButton = this._popup.querySelector(".popup__save-button");
    submitButton.addEventListener("click", () => {
      const values = this._getInputValues();
      this._formSubmitHandler(values);
    });
  }

  close() {
    super.close();
    const form = this._popup.querySelector(".popup__form");
    form.reset();
  }
}
