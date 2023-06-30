export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getUser() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      headers: this.headers,
    });
  }

  editProfile = (body) => {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  };

  addCard(body) {
    return this._request(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  addLike(cardId) {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  removeLike(cardId) {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  changeAvatar(body) {
    let url = `${this.baseUrl}/users/me/avatar`;
    let options = {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    };
    return this._request(url, options);
  }

  _request(url, options) {
    return fetch(url, options).then(this.onResponse);
  }
}
