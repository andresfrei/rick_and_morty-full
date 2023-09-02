export const DEFAULT_LANGUAGE = 'es'

// Local storage keys
export const APP_KEY_LANGUAGE = 'APP_KEY_LANGUAGE'
export const APP_KEY_TOKEN = 'APP_KEY_TOKEN'

// Config API_URLS
//! VER .env
//! const API_URL_BASE = process.env.BASE_URL

const API_URL_BASE = 'http://localhost:3001/api'
// const API_URL_BASE = 'https://afrei-rick-and-morty-dev.fl0.io/api'

export const API_URL_LOGIN = API_URL_BASE + '/auth/login'
export const API_URL_REGISTER = API_URL_BASE + '/auth/register'
export const API_URL_AUTH = API_URL_BASE + '/auth'
export const API_URL_VALIDATE = API_URL_BASE + '/auth/validate'
export const API_URL_COLLECTION = API_URL_BASE + '/collection'

export const APP_URL_LOGIN = '/login'
export const APP_URL_REGISTER = '/register'
export const APP_URL_VALIDATE = '/validate'
export const APP_URL_HOME = '/home'
export const APP_URL_ACCOUNT = '/home/account'
