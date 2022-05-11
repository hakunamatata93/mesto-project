export default class Api {
  constructor(options) {
    this._options = options
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res)
  }
  _getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
    .then(this._checkResponse)
  }

  _getInitialProfile(){
      return fetch(`${this._options.baseUrl}/users/me`, {
        headers: this._options.headers
      })
      .then(this._checkResponse)
  }

  getAppInfo(){
    return Promise.all([this._getInitialProfile(), this._getInitialCards()])
  }

  postNewCard(data){
  return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
  })
      .then(this._checkResponse)
}

  deleteCard(id){
  return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers
  })
      .then(this._checkResponse)
  }

  deleteLike(id){
    return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._options.headers
  })
      .then(this._checkResponse)
  }

  putLike(id){
    return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._options.headers
  })
      .then(this._checkResponse)
  }

  patchAvatar(url){
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({ avatar: url })
    })
    .then(this._checkResponse)
  }
    patchProfile (name, about){
    return fetch(`${this._options.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
    })
        .then(this._checkResponse)
  }
}

// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
//   headers: {
//     authorization: '69751e77-dec2-4cdf-a14f-2ae5794686d7',
//     'Content-Type': 'application/json'
//   }
// }

// const onResponse = (res) => {
//   return res.ok ? res.json() : Promise.reject(res)
// }

// export const getMyId = () => {
//   //console.log(config.headers.authorization.replace('-', ''));
//   return config.headers.authorization.replace(/-/g, '');
// }
// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {

//       headers: config.headers
//   })
//       .then(onResponse)
// }

// export const getProfile = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//       headers: config.headers
//   })
//       .then(onResponse)
// }

// export const patchProfile = (data) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//       method: 'PATCH',
//       headers: config.headers,
//       body: JSON.stringify(data)
//   })
//       .then(onResponse)
// }

// export const postNewCard = (data) => {
//   return fetch(`${config.baseUrl}/cards`, {
//       method: 'POST',
//       headers: config.headers,
//       body: JSON.stringify(data)
//   })
//       .then(onResponse)

// }
// export const deleteCard = (id) => {
//   return fetch(`${config.baseUrl}/cards/${id}`, {
//       method: 'DELETE',
//       headers: config.headers
//   })
//       .then(onResponse)

// }

// export const deleteLike = (id) => {
//   return fetch(`${config.baseUrl}/cards/likes/${id}`, {
//       method: 'DELETE',
//       headers: config.headers
//   })
//       .then(onResponse)

// }


// export const putLike = (id) => {
//   return fetch(`${config.baseUrl}/cards/likes/${id}`, {
//       method: 'PUT',
//       headers: config.headers
//   })
//       .then(onResponse)

// }

// export const patchAvatar = (url) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: config.headers,
//       body: JSON.stringify({ avatar: url })

//   })
//       .then(onResponse)

// }




