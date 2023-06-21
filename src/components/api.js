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


// const config = {
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
//   headers: {
//     authorization: "fbf2685b-0a91-4bb8-81bb-36697ce1b928",
//     "Content-Type": "application/json",
//   },
// };

// const onResponse = (res) => {
//   return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
// };

// export const getUser = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers,
//   }).then(onResponse);
// };

// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers,
//   }).then(onResponse);
// };

// export const editProfile = (body) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify(body),
//   }).then(onResponse);
// };

// export const addCard = (body) => {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: "POST",
//     headers: config.headers,
//     body: JSON.stringify(body),
//   }).then(onResponse);
// };

// export const deleteCard = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/${cardId}`, {
//     method: "DELETE",
//     headers: config.headers,
//   }).then(onResponse);
// };

// export const addLike = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: config.headers,
//   }).then(onResponse);
// };

// export const removeLike = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: config.headers,
//   }).then(onResponse);
// };

// export const changeAvatar = (body) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify(body),
//   }).then(onResponse);
// };
