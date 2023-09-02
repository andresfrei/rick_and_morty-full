// export const API_URL_BASE = 'https://rickandmortyapi.com/api'
export const API_URL_BASE = 'http://localhost:3001/api'

export const API_URL_AUTH = {
  LOGIN: API_URL_BASE + '/auth/login',
  REGISTER: API_URL_BASE + '/auth/register',
  VALIDATE: API_URL_BASE + '/auth/validate',
  RESEND: API_URL_BASE + '/auth/resend',
  SESSION: API_URL_BASE + '/auth/session'
}

export const API_URL_CHARACTER = API_URL_BASE + '/character'

export const API_MIN_ID = 1
export const API_MAX_ID = 827
