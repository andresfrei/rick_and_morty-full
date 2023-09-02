import { useDispatch, useSelector } from 'react-redux'
import { setSession as setSessionSlice } from '../reducers/sessionSlice'
import { APP_KEY_TOKEN } from '../config/constants'
import { loginService, validateAuthService, validateUserService } from '../services/auth.service'
import useCharacters from './useCharacters'

export default function useSession () {
  const session = useSelector(state => state.session)
  const { loadCharacters } = useCharacters()

  const dispatch = useDispatch()

  const setSession = (session) => {
    dispatch(setSessionSlice(session || null))
  }

  const authToken = async (token) => {
    const data = await validateAuthService(token)
    const { session, collection } = data
    session && setSession(session)
    collection && loadCharacters(collection)
  }

  const validateUser = async (token) => {
    const session = await validateUserService(token)
    if (!session) return
    setSession(session)
  }

  const login = async (passport) => {
    const data = await loginService(passport)
    const { session, collection, token } = data
    session && setSession(session)
    collection && loadCharacters(collection)
    saveToken(token)
    return session
  }

  const saveToken = (token) => {
    token
      ? window.localStorage.setItem(APP_KEY_TOKEN, token)
      : window.localStorage.removeItem(APP_KEY_TOKEN)
  }
  const logout = () => {
    setSession(null)
    loadCharacters([])
    window.localStorage.removeItem(APP_KEY_TOKEN)
  }

  return { session, login, logout, authToken, validateUser }
}
