const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "fbf2685b-0a91-4bb8-81bb-36697ce1b928",
    "Content-Type": "application/json",
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(onResponse)
    .catch((err) => console.log(err));
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(onResponse)
    .catch((err) => console.log(err));
};

export const editProfile = (body) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(body),
  })
    .then(onResponse)
    .catch((err) => console.log(err));
};

export const addCard = (body) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(body),
  })
    .then(onResponse)
    .catch((err) => console.log(err));
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(onResponse)
    .catch((err) => console.log(err));
};

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(onResponse)
    .catch((err) => console.log(err));
};

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(onResponse)
    .catch((err) => console.log(err));
};

export const changeAvatar = (body) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(body),
  })
    .then(onResponse)
    .catch((err) => console.log(err));
};



