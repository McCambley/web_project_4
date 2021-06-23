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
      .catch(err => console.error(`There has been a problem fetching user info: ${err}`));
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
      .catch(err => console.error(`There was a problem fetching cards: ${err}`));
  }

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
      .catch(err => console.error(`There has been a problem updating profile: ${err}`));
  }

  updateAvatar({ avatar }) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar: avatar }),
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`${res.status} error!`);
        }
        return res.json();
      })
      .catch(err => console.error(`There has been a problem updating avatar: ${err}`));
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
      .catch(err => console.error(`There was a problem adding card: ${err}`));
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
      .catch(err => console.error(`There has been a problem liking this card: ${err}`));
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
      .catch(err => console.error(`There has been a problem removing the like from this card: ${err}`));
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
      .catch(err => console.error(`There was a problem deleting card: ${err}`));
  }
}
