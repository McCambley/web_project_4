export default class Api {
  constructor({ baseUrl, authorization }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._auth = authorization;
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        authorization: this._auth,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`${res.status} error!`);
          // alternative method of throwing errors if server response is bad
          // throw new Error(
          //   `there was a problem getting the cards from the server (${res.status} error)`
          // );
        }
        return res.json();
      })
      .catch((err) =>
        console.error(
          `There has been a problem fetching user info: ${err}`
          // `${err}`
        )
      )
      .finally(() => console.log("Getting user info..."));
  }

  getGroupCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        authorization: this._auth,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`${res.status} error!`);
        }
        return res.json();
      })
      .catch((err) =>
        console.error(`There was a problem fetching cards: ${err}`)
      )
      .finally(() => {
        console.log("Getting cards...");
      });
  }

  updateProfile({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  storeUserCard(name, link) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  // Not sure if this is necessary
  getLikes() {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        authorization: this._auth,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }
  // other methods for working with the API
}

// TEST Token: d45050bb-6054-461f-a7d7-f299e145a1f0 Group ID: group-12

// const cards = api.getGroupCards().then((res) => {
//   res.array.forEach((element) => {});
// });

// fetch("https://around.nomoreparties.co/v1/group-12", {
//   headers: {
//     authorization: "d45050bb-6054-461f-a7d7-f299e145a1f0",
//   },
// })
//   .then((res) => res.json())
//   .then((res) => console.log(res));

// const testApi = new Api({
//   baseUrl: "https://around.nomoreparties.co/group-12",
//   authorization: "d45050bb-6054-461f-a7d7-f299e145a1f0",
// });

// const name = document.querySelector(".profile__name");
// testApi.getUserInfo().then((res) => {
//   console.log(res);
// });
// testApi.getGroupCards().then((res) => {
//   console.log(res);
// });

// testApi.getLikes().then((cards) => {
//   cards.forEach((card) => {
//     console.log(card.name, "has ", card.likes.length, "likes!");
//   });
// });

// testApi.storeUserCard(
//   "Test Card",
//   "https://mccambley.github.io/web_project_4/images/franklin.jpeg"
// );
