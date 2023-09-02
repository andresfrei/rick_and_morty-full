const API_URL_BASE = 'https://rickandmortyapi.com/api/character'

const findCharacterApi = async (id) => {
  try {
    const data = await getData(`${API_URL_BASE}/${id}`)
    console.log(data)
    const character = {
      id: data.id,
      name: data.name,
      status: data.status,
      species: data.species,
      gender: data.gender,
      origin: data.origin.name,
      image: data.image
    }
    return character
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const getData = async (url, options) => {
  try {
    const init = {
      method: 'GET',
      ...options
    }
    const res = await fetch(url, init)
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error('Fetch api error')
  }
}

module.exports = { findCharacterApi }
