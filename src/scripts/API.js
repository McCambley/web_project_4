export default class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    // ...
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "d45050bb-6054-461f-a7d7-f299e145a1f0",
    "Content-Type": "application/json",
  },
});
