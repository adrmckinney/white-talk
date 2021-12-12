import axios from 'axios'
import * as emailjs from 'emailjs-com'

const url = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_API_URL || 'https://white-talk-api.herokuapp.com/',
  // baseURL: 'https://white-talk-api.herokuapp.com/'
})

export const register = filterAdminRegister => {
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
      password,
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

export const logout = token => {
  return url
    .post('api/auth/token/logout/', token, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

export const updateAdmin = (token, filterAdminRegister, pk) => {
  console.log('filterAdminRegister', filterAdminRegister)
  return url
    .put(`api/auth/users/${pk}/`, filterAdminRegister, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => {
      console.log('res', res)
      return res.data
    })
}

export const requestChangePassword = email => {
  return url
    .post('api/auth/users/reset_password/', {
      email: email,
    })
    .then(res => res.data)
}

export const confirmChangePassword = (uid, urlToken, password, confirmPassword) => {
  return url
    .post('api/auth/users/reset_password_confirm/', {
      new_password: password,
      re_new_password: confirmPassword,
      uid,
      token: urlToken,
    })
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

export const requestChangeUsername = email => {
  return url
    .post('api/auth/users/reset_username/', {
      email: email,
    })
    .then(res => res.data)
}

export const confirmChangeUsername = (uid, urlToken, newUsername, confirmUsername) => {
  return url
    .post('api/auth/users/reset_username_confirm/', {
      uid,
      token: urlToken,
      new_username: newUsername,
      re_new_username: confirmUsername,
    })
    .then(res => res.data)
}

// ***************************
// *** All things SESSIONS ***
// ***************************

export const getUser = token => {
  return url
    .get('api/users/me/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

export const sessionRegister = regData => {
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
  return url.get('api/sessions/').then(res => res.data)
}

export const createSession = (token, sessionData) => {
  return url
    .post('api/create-session/', sessionData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

export const deleteSession = (token, pk) => {
  return url
    .delete(`api/delete-session/${pk}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

export const updateSession = (token, pk, input) => {
  return url
    .put(`api/update-session/${pk}/`, input, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

// ###############################
// ######### REGISTRANTS #########
// ###############################

export const listRegistrants = token => {
  return url
    .get('api/list-registrants/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

export const deleteRegistrant = (token, pk) => {
  return url
    .delete(`api/delete-registrant/${pk}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

export const updateRegistrant = (token, pk, input) => {
  return url
    .put(`api/update-registrant/${pk}/`, input, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

export const listCreateAnnouncement = (token, announcementData) => {
  return url
    .post('api/create-announcement/', announcementData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

// This is a secure call to get all Announcements.
// Only auth user can do this b/c it is on the edit page.
// The view on the other side of this endpoint is a
// ListCreateView. It is poorly named here.
export const authListAnnouncement = token => {
  return url
    .get('api/create-announcement/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

export const listAnnouncements = () => {
  return url.get('api/list-announcement/').then(res => res.data)
}

export const updateAnnouncement = (token, pk, announcementData) => {
  return url
    .put(`api/retrieve-update-delete-announcement/${pk}/`, announcementData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

export const deleteAnnouncement = (token, pk) => {
  return url
    .delete(`api/retrieve-update-delete-announcement/${pk}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}

// EMAILJS CALLS
export const sendEmail = (params, templateId) => {
  return emailjs
    .send(
      process.env.REACT_APP_LOCAL_SERIVCE_ID || process.env.REACT_APP_SERVICE_ID,
      templateId,
      params,
      process.env.REACT_APP_LOCAL_USER_ID || process.env.REACT_APP_USER_ID
    )
    .then(res => res)
}

// export const sendRegistrationEmail = (params, templateId) => {
//   return emailjs.send(process.env.REACT_APP_LOCAL_SERIVCE_ID || process.env.REACT_APP_SERVICE_ID, templateId, params, process.env.REACT_APP_LOCAL_USER_ID || process.env.REACT_APP_USER_ID)
//     .then(res => res)
// }
