class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    if (!res.ok) {
      return Promise.reject(`Error ${res.status}`);
    } else {
      return res.json();
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials:'include',
    }).then((res) => this._checkResult(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials:'include',
    }).then((res) => this._checkResult(res))
  }

  patchUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
      credentials:'include',
    }).then((res) => this._checkResult(res));
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
      credentials:'include',
    }).then((res) => this._checkResult(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
          credentials:'include',
        }).then((res) => this._checkResult(res))
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials:'include',
    }).then((res) => this._checkResult(res));
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials:'include',
    }).then((res) => this._checkResult(res));
  }

  editAvatar({ avatar }) {
    console.log(avatar);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials:'include',
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResult(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.dislikeCard(cardId);
  }
}

const api = new Api({
  baseUrl: "http://localhost:4000",
  headers: {
    authorization: "64e76916-bb9d-45f2-aa0a-555c04a49e1a",
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default api;
