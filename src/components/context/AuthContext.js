import { createContext, useMemo, useState } from 'react'
import createPersistedState from 'use-persisted-state'

const AuthContext = createContext()

const useUsername = createPersistedState('username')
const useToken = createPersistedState('token')

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useUsername(null)
  const [loggedInName, setLoggedInName] = useState('')
  const [token, setToken] = useToken(null)
  const isLoggedIn = username && token

  const setAuth = (username, token) => {
    setUsername(username)
    setToken(token)
  }

  const authControls = useMemo(
    () => ({
      username,
      setUsername,
      loggedInName,
      setLoggedInName,
      token,
      setToken,
      isLoggedIn,
      setAuth,
    }),
    [username, setUsername, loggedInName, token, setToken, isLoggedIn]
  )

  return <AuthContext.Provider value={authControls}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
