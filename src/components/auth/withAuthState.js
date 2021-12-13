import { createContext, useContext, useState } from 'react'
import createPersistedState from 'use-persisted-state'

const TokenStateContext = createContext()
const TokenDispatchContext = createContext()
const UserStateContext = createContext()
const UserDispatchContext = createContext()
const LoginStateContext = createContext()

export const useAuthState = () => {
  const token = useContext(TokenStateContext)
  const setToken = useContext(TokenDispatchContext)
  const username = useContext(UserStateContext)
  const setUsername = useContext(UserDispatchContext)
  const isLoggedIn = useContext(LoginStateContext)

  return { token, setToken, username, setUsername, isLoggedIn }
}

export const withAuthState =
  Component =>
  ({ ...rest }) => {
    const useUsername = createPersistedState('username')
    const useToken = createPersistedState('token')

    const [username, setUsername] = useUsername(null)
    const [token, setToken] = useToken(null)
    // const [token, setToken] = useState(null)
    // const [username, setUsername] = useState('')
    const isLoggedIn = token && username
    console.log('token', token)
    console.log('username', username)
    console.log('isLoggedIn', isLoggedIn)
    return (
      <TokenStateContext.Provider value={token}>
        <UserStateContext.Provider value={username}>
          <LoginStateContext.Provider value={isLoggedIn}>
            <TokenDispatchContext.Provider value={setToken}>
              <UserDispatchContext.Provider value={setUsername}>
                <Component {...rest} />
              </UserDispatchContext.Provider>
            </TokenDispatchContext.Provider>
          </LoginStateContext.Provider>
        </UserStateContext.Provider>
      </TokenStateContext.Provider>
    )
  }
