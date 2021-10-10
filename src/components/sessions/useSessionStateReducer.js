import { useReducer } from 'react'
import { listSessions } from '../../api'

const SessionStateReducer = (state, action) => {
  switch (action.type) {
    case 'list-sessions':
      return listSessions().then(sessions => sessions)
    default:
      return { ...state }
  }
}

const useSessionStateReducer = initialState => {
  return useReducer(SessionStateReducer, initialState)
}

export default useSessionStateReducer
