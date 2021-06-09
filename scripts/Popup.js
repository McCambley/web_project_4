export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      closePopup();
    }
  }

  _handleOverlayClose(e) {
    if (e.target.classList.contains("popup_opened")) {
      closePopup();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", () => {
      this._handleEscClose;
    });
    document.addEventListener("click", () => {
      this._handleOverlayClose;
    });
  }

  open() {
    this._popup.classList.add("popup_opened");
    // this.setEventListeners ???
  }

  close() {
    const openPopup = document.querySelector(".popup_opened");
    openPopup.classList.remove("popup_opened");

    document.removeEventListener("keydown", closeWithEscape);
    document.removeEventListener("click", closeOnOverlay);
  }
}

// function closePopup() {
//
// }

// function openPopup(popup) {
//
// }

// function closeWithEscape(e) {
//
// }

// function closeOnOverlay(e) {
//
// }
