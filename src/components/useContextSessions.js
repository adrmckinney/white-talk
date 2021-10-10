import { createContext } from 'react'

export const SessionsContext = createContext({
  sessions: [],
  setSessions: () => {},
  sessionToEdit: [],
  setSessionToEdit: () => {},
  sessionToDelete: [],
  setSessionToDelete: () => {},
})
