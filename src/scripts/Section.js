export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedItems = items; An array of data - removed for refactoring in project nine
    this._renderer = renderer; // Will retrieve the callback in index.js
    this._container = document.querySelector(containerSelector); // The container to which items are appended
  }

  setItems(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = ""; // Clear content of container
  }

  renderItems(items) {
    this.clear();

    // formerly this._renderedItems.forEach...
    items.forEach((item) => {
      this._renderer(item); // Iterate over array of data and append to the container
    });
  }
}
