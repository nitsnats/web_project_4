class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl
      this._headers = options.headers
    }

    _checkResponse = (res) =>
    res.ok ? res.json() : Promise.reject(res.statusText);
  
    getUserInfo() {
        return fetch(this._baseUrl + "/users/me", {
          headers: this._headers
        })
        .then(this._checkResponse);
      }
    
    getCards() {
        return fetch(this._baseUrl + "/cards", {
          headers: this._headers
        })
        .then(this._checkResponse);
      }

    editProfile(name, about) {
        return fetch(this._baseUrl + "/users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
              })
        })
        .then(this._checkResponse);
      }

    editAvatar(avatar) {
        return fetch(this._baseUrl + "/users/me/avatar", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar
              })
        })
        .then(this._checkResponse);
      }  

    addCard(name, link) {
        return fetch(this._baseUrl + "/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
              })
        })
        .then(this._checkResponse);
      }

    addLike(id) {
        return fetch(this._baseUrl + "/cards/likes/" + id, {
            method: "PUT",
            headers: this._headers,
        })
        .then(this._checkResponse);
      }

    removeLike(id) {
        return fetch(this._baseUrl + "/cards/likes/" + id, {
            method: "DELETE",
            headers: this._headers,
        })
        .then(this._checkResponse);
      }

    removeLike(id) {
      return fetch(this._baseUrl + "/cards/likes/" + id, {
          method: "DELETE",
          headers: this._headers
      })
      .then(this._checkResponse);
    }

    deleteCard(id) {
      return fetch(this._baseUrl + "/cards/" + id, {
          method: "DELETE",
          headers: this._headers
      })
      .then(this._checkResponse);
      
    }

  }
  
    export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
    headers: {
      authorization: "4cdae314-7e8a-4bed-8ada-70ad33c12e13",
      "Content-Type": "application/json"
    }
  });