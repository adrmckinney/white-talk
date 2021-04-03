import axios from 'axios'

const deployedUrl = axios.create({
  baseURL: 'https://white-talk-api.herokuapp.com/'
})

const localUrl = axios.create({
  baseURL: 'http://127.0.0.1:8000/'
})

export const register = (username, password) => {
  return deployedUrl
    .post('api/auth/users/', {
      username,
      password
    })
    .then(res => {
      return login(username, password)
    })
    .catch(error => {
      let errors = []
      if (error.response) {
        const data = error.response.data
        if (data.username) {
          errors = errors.concat(data.username)
        }
        if (data.password) {
          errors = errors.concat(data.password)
        }
      }

      if (errors.length === 0) {
        errors.push('There was a problem registering.')
      }
      const err = new Error(errors[0])
      throw err
    })
}

export const login = (username, password) => {
  return deployedUrl
    .post('api/auth/token/login/', {
      username,
      password
    })
    .then(res => res.data)
    .catch(error => {
      console.log({ error })
      if (error.response) {
        if (error.response.data.non_field_errors) {
          throw new Error(error.response.data.non_field_errors.join(' '))
        }
      }
      throw new Error('Something went wrong.')
    })
}

export const sessionRegister = (regData) => {
  return localUrl
    .post('api/sessions/', regData)
    .then(res => res.data)
}
