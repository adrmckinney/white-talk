import axios from 'axios'
import * as emailjs from 'emailjs-com'

export const url = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_API_URL || 'https://white-talk-api.herokuapp.com/',
  // baseURL: 'https://white-talk-api.herokuapp.com/'
})
