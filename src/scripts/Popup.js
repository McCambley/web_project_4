export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(e) {
    if (e.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClose);
  }

  close() {
    const openPopup = document.querySelector(".popup_opened");
    openPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClose);
  }
}
