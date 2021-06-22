export default class Api {
  constructor({ baseUrl, authorization }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._auth = authorization;
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: this._auth,
      },
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`${res.status} error!`);
        }
        return res.json();
      })
      .catch(err => console.error(`There has been a problem fetching user info: ${err}`))
      .finally(() => console.log('Getting user info...'));
  }

  getGroupCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        authorization: this._auth,
      },
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`${res.status} error!`);
        }
        return res.json();
      })
      .catch(err => console.error(`There was a problem fetching cards: ${err}`))
      .finally(() => {
        console.log('Getting cards...');
      });
  }

  // get app info() {
  // Promise.all(???)
  // }

  updateProfile({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`${res.status} error!`);
        }
        return res.json();
      })
      .catch(err => console.error(`There has been a problem updating profile: ${err}`))
      .finally(() => console.log('Updating profile...'));
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`${res.status} error!`);
        }
        return res.json();
      })
      .catch(err => console.error(`There was a problem fetching cards: ${err}`))
      .finally(() => {
        console.log('Adding card...');
      });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`${res.status} error!`);
        }
        return res.json();
      })
      .catch(err => console.error(`There has been a problem liking this card: ${err}`))
      .finally(() => console.log('Liking card...'));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`${res.status} error!`);
        }
        return res.json();
      })
      .catch(err => console.error(`There has been a problem removing the like from this card: ${err}`))
      .finally(() => console.log('removing like from card...'));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`${res.status} error!`);
        }
        return res.json();
      })
      .catch(err => console.error(`There was a problem deleting cards: ${err}`))
      .finally(() => {
        console.log('Deleting card...');
      });
  }

  // Not sure if this is necessary
  getLikes() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        authorization: this._auth,
      },
    })
      .then(res => res.json())
      .catch(err => {
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
//   baseUrl: 'https://around.nomoreparties.co/group-12',
//   authorization: 'd45050bb-6054-461f-a7d7-f299e145a1f0',
// });

// const testApi2 = new Api({
//   baseUrl: 'https://around.nomoreparties.co/v1/group-12',
//   authorization: 'd45050bb-6054-461f-a7d7-f299e145a1f0',
// });

// testApi.getGroupCards().then(cards => console.log('testAPI', cards));
// testApi2.getGroupCards().then(cards => console.log('testApit2', cards));
// testApi.likeCard('60d06122ff53f802786ea1d0').then(res => {
//   console.log(res);
// });
// testApi2.likeCard('60d111236db34e028389470b').then(res => {
//   console.log(res);
// });

// testApi.getLikes().then(cardsdata => {
//   const [...likes] = cardsdata.map(x => [x.likes.length, x.owner.name]);
//   console.log(likes.reverse());
//   return likes.reverse();
// });

// testApi.likeCard('60d13a666db34e0283894722').then(cards => {
//   console.log(cards);
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
//   "http://www.picsum.photos/1000"
// );
