const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: '69751e77-dec2-4cdf-a14f-2ae5794686d7',
    'Content-Type': 'application/json'
  }
}

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res)
}

export const getMyId = () => {
  //console.log(config.headers.authorization.replace('-', ''));
  return config.headers.authorization.replace(/-/g, '');
}
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {

      headers: config.headers
  })
      .then(onResponse)
      .catch((err) => {
          console.log(err); // выводим ошибку в консоль
      });;
}

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
  })
      .then(onResponse)
}

export const patchProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
  })
      .then(onResponse)
}

export const postNewCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(data)
  })
      .then(onResponse)

}
export const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers
  })
      .then(onResponse)

}

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
  })
      .then(onResponse)

}


export const putLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers
  })
      .then(onResponse)

}

export const patchAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar: url })

  })
      .then(onResponse)

}




