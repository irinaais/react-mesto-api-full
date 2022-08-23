export const BASE_URL = 'https://api.mesto.irinaosipova.nomoredomains.sbs';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
};

export const authorise = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      }
    })
};

//принимает на вход JWT. Он б. отправлен на сервер и, если токен действителен, вернет ответ с инф-й о пользов-ле
export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${token}`}
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};