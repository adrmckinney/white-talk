import { useAuthState } from './withAuthState'

export const useHandleAuth = () => {
  const { setToken, setUsername } = useAuthState

  const setAuth = (username, token) => {
    console.log('username', username)
    setUsername(username)
    setToken(token)
  }

  return { setAuth }
}
