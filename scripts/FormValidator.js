// const formItems = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__save-button",
//   inactiveButtonClass: "popup__save-button_disabled",
//   inputErrorClass: "popup__input_invalid",
//   errorClass: "popup__input-error_active",
// };

export default class FormValidator {
  // constructor has two parameters
  // one is a settings object that stores selectors an form classes
  // second is a form element to be validated
  constructor(settings, formElement) {
    this._input = settings.inputSelector;
    this._submitButton = settings.submitButtonSelector;
    this._inactiveButton = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._input));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(
      `.popup__input-error_${inputElement.id}`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(
      `.popup__input-error_${inputElement.id}`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners(formElement) {
    const buttonElement = formElement.querySelector(this._submitButton);
    this.toggleButtonState(this._inputList, buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(this._inputList, buttonElement);
      });
    });
  }

  resetValidation() {
    this._form.reset();
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  toggleButtonState() {
    const button = this._form.querySelector(this._submitButton);
    if (this._hasInvalidInput(this._inputList)) {
      button.classList.add(this._inactiveButton);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButton);
      button.disabled = false;
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners(this._form);
  }
}
