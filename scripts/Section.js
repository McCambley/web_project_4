export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items; // An array of data
    this._renderer = renderer; // Will retrieve the callback in index.js
    this._container = document.querySelector(containerSelector); // The container to which items are appended
  }

  setItems(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = ""; // Clear content of container
  }

  renderItems() {
    this._container.clear();

    this._renderedItems.forEach((item) => {
      this._renderer(item); // Iterate over array of data and append to the container
    });
  }
}
