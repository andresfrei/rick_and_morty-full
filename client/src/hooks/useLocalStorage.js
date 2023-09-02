import useLanguage from './useLanguage'
import useSession from './useSession'

import { APP_KEY_LANGUAGE, APP_KEY_TOKEN, DEFAULT_LANGUAGE } from '../config/constants'
import useLoader from './useLoader'

export default function useLocalStorage () {
  const { setLanguage } = useLanguage()
  const { authToken } = useSession()
  const { setLoader } = useLoader()

  const loadLocalStorage = () => {
    const language = window.localStorage.getItem(APP_KEY_LANGUAGE) || DEFAULT_LANGUAGE
    setLanguage(language)
    const token = window.localStorage.getItem(APP_KEY_TOKEN)
    // Le paso como query el parametro para que me traiga la coleccion del ususario
    token && authToken(token)
    setLoader(false)
  }

  return { loadLocalStorage }
}
