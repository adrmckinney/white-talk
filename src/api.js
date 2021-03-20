import axios from 'axios'

const url = axios.create({
  baseURL: 'https://white-talk-api.herokuapp.com/'
})

export const register = (username, password) => {
  return url
    .post('api/auth/users/', {
      username,
      password
    })
    .then(res => {
      return login(username, password)
    })
}

export const login = (username, password) => {
  return url
    .post('api/auth/token/login/', {
      username,
      password
    })
    .then(res => res.data)
}
