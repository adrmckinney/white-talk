import axios from 'axios'
import * as emailjs from 'emailjs-com'

const url = axios.create({
  // baseURL: process.env.REACT_APP_DEPLOYED_API_URL
  baseURL: process.env.REACT_APP_LOCAL_API_URL
})

export const register = (filterAdminRegister) => {
  return url
    .post('api/auth/users/', filterAdminRegister)
    .then(res => {
      return login(filterAdminRegister.username, filterAdminRegister.password)
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
  return url
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

export const logout = (token) => {
  return url
    .post('api/auth/token/logout/', token,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    .then(res => res.data)
}

export const updateAdmin = (token, filterAdminRegister, pk) => {
  console.log('filterAdminRegister', filterAdminRegister)
  return url
    .put(`api/auth/users/${pk}/`, filterAdminRegister,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    .then(res => {
      console.log('res', res)
      return res.data
    })
}

export const requestChangePassword = (email) => {
  return url
    .post('api/auth/users/reset_password/',
      {
        email: email
      }
    )
    .then(res => res.data)
}

export const confirmChangePassword = (uid, urlToken, password, confirmPassword) => {
  return url
    .post('api/auth/users/reset_password_confirm/',
      {
        new_password: password,
        re_new_password: confirmPassword,
        uid,
        token: urlToken
      }
    )
    .then(res => res.data)
    // .catch(error => {
    //   let errors = []
    //   if (error.response) {
    //     const data = error.response.data
    //     if (data.password) {
    //       errors = errors.concat(data.password)
    //     }
    //   }

  //   if (errors.length === 0) {
  //     errors.push('There was a problem registering.')
  //   }
  //   const err = new Error(errors[0])
  //   throw err
  // })
}

export const requestChangeUsername = (email) => {
  return url
    .post('api/auth/users/reset_username/',
      {
        email: email
      }
    )
    .then(res => res.data)
}

export const confirmChangeUsername = (uid, urlToken, newUsername, confirmUsername) => {
  return url
    .post('api/auth/users/reset_username_confirm/',
      {
        uid,
        token: urlToken,
        new_username: newUsername,
        re_new_username: confirmUsername
      }
    )
    .then(res => res.data)
}

// ***************************
// *** All things SESSIONS ***
// ***************************

export const getUser = (token) => {
  return url
    .get('api/users/me/',
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    .then(res => res.data)
}

export const sessionRegister = (regData) => {
  return url
    .post('api/session-register/', regData)
    .then(res => res.data)
    .catch(error => {
      console.log(error.response.data)
      if (error.response) {
        if (error.response.data.non_field_errors) {
          throw new Error(error.response.data.non_field_errors.join(' '))
        }
      }
      throw new Error('Something went wrong.')
    })
}

export const listSessions = () => {
  return url
    .get('api/sessions/')
    .then(res => res.data)
}

export const createSession = (token, sessionData) => {
  console.log('create api ran')
  return url
    .post('api/create-session/', sessionData,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    .then(res => res.data)
}

export const deleteSession = (token, pk) => {
  return url
    .delete(`api/delete-session/${pk}/`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    .then(res => res.data)
}

export const updateSession = (token, pk, input) => {
  // console.log('update api ran')
  return url
    .put(`api/update-session/${pk}/`, input,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    .then(res => res.data)
}

export const deleteRegistrant = (token, pk) => {
  return url
    .delete(`api/delete-registrant/${pk}/`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    .then(res => res.data)
}

export const updateRegistrant = (token, pk, input) => {
  return url
    .put(`api/update-registrant/${pk}/`, input,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    .then(res => res.data)
}

export const sendEmail = (params) => {
  return emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, params, process.env.REACT_APP_USER_ID)
    .then(res => res)
}
