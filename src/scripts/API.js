export default class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
    this._contentType = this._headers["Content-Type"];
  }

  getUserInfo() {
    console.log(this);
  }

  // getInitialCards() {
  //   // ...
  // }

  getInitialCards() {
    const thing = fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "d45050bb-6054-461f-a7d7-f299e145a1f0",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(thing);
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

api.getInitialCards();

fetch("https://around.nomoreparties.co/group-12/users/me", {
  headers: {
    authorization: "d45050bb-6054-461f-a7d7-f299e145a1f0",
  },
})
  .then((res) => res.json())
  .then((res) => console.log(res));
