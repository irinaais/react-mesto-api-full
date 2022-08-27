class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getAuthHeader() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}`, ...this._headers };
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._getAuthHeader()
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._getAuthHeader()
    })
      .then(this._checkResponse);
  }

  saveUserInfo(userData) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._getAuthHeader(),
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(this._checkResponse);
  }

  addCard(data) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._getAuthHeader(),
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getAuthHeader()
    })
      .then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._getAuthHeader()
    })
      .then(this._checkResponse);
  }

  deleteLikeCard(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._getAuthHeader()
    })
      .then(this._checkResponse);
  }

  editAvatar(userData) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._getAuthHeader(),
      body: JSON.stringify({
        avatar: userData.avatar
      })
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.deleteLikeCard(cardId);
    }
  }

  getUserInfoAndInitialCards() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }
}

const api = new Api({
  // url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  url: 'https://api.mesto.irinaosipova.nomoredomains.sbs', // удаленный бэкенд
  // url: 'http://localhost:3000', // локальный бэкенд
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;