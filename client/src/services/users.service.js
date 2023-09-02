import { API_URL_AUTH, API_URL_CHARACTER } from '../config/api'
import FechingData from '../tools/calssFechinData'

export const validateLogin = async (passpord) => {
  const login = new FechingData()
  login.url(API_URL_AUTH.LOGIN)
  login.body(passpord)
  const user = await login.fetch()
  console.log(user)
  if (!user) return null
  return user
}

export const searchCharacter = async (id, additionalsFieds = []) => {
  try {
    const res = await fetch(`${API_URL_CHARACTER}/${id}`)
    const data = await res.json()

    const mappedCharacter = {
      id: data.id,
      name: data.name,
      status: data.status,
      species: data.species,
      gender: data.gender,
      origin: data.origin.name,
      location: data.location.name,
      image: data.image,
      like: false
    }

    // eslint-disable-next-line no-return-assign
    additionalsFieds.forEach(field => mappedCharacter[field] = data[field])

    return mappedCharacter
  } catch (error) {
    throw new Error('getCharacter error')
  }
}
