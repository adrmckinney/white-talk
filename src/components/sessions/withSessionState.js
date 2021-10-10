import { createContext, useContext, useState } from 'react'
import { listSessions } from '../../api'
import useSessionStateReducer from './useSessionStateReducer'

const SessionStateContext = createContext()
const SessionDispatchContext = createContext()

export const useSessionState = () => {
  const sessionState = useContext(SessionStateContext)
  const dispatch = useContext(SessionDispatchContext)
  const [sessions, setSessions] = useState([])

  return {
    sessionState,
    dispatch,
    welcome: 'hello',
  }
}

const getInitialState = () => {
  listSessions().then(sessions => sessions)
}

export const withSessionState = Component => () => {
  const [state, dispatch] = useSessionStateReducer(getInitialState(), 'list-sessions')
  const sessions = listSessions().then(sessions => sessions)

  return (
    <SessionStateContext.Provider value={sessions}>
      <SessionDispatchContext.Provider value={dispatch}>
        <Component />
      </SessionDispatchContext.Provider>
    </SessionStateContext.Provider>
  )
}
