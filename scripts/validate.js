const formItems = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error_active",
};

// private function
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(
    `.popup__input-error_${inputElement.id}`
  );
  inputElement.classList.add(formItems.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formItems.errorClass);
}

//private function
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    `.popup__input-error_${inputElement.id}`
  );
  inputElement.classList.remove(formItems.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(formItems.errorClass);
}

//private function
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// private function
function createInputList(formElement, settings) {
  return Array.from(formElement.querySelectorAll(settings.inputSelector));
}
//private function
function setEventListeners(formElement) {
  const inputList = createInputList(formElement, formItems);
  const buttonElement = formElement.querySelector(
    formItems.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// function
function enableValidation(settingsObject) {
  const formList = Array.from(
    document.querySelectorAll(settingsObject.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

// unused?
function resetValidation(form) {
  form.reset();
}

// private function
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

// private function
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formItems.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formItems.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

enableValidation(formItems);
