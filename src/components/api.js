export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this.onResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this.onResponse);
  }

  editProfile = (body) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(this.onResponse);
  };

  addCard(body) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(this.onResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.onResponse);
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    }).then(this.onResponse);
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.onResponse);
  }

  changeAvatar(body) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(this.onResponse);
  }
}
