import axios from 'axios'
import { API_URL_COLLECTION, APP_KEY_TOKEN } from '../config/constants'

const token = window.localStorage.getItem(APP_KEY_TOKEN)
const headers = { Authorization: `Bearer ${token}` }

export const searchCollection = async (id) => {
  const res = await axios.get(`${API_URL_COLLECTION}/${id}`, { headers })
  return res.data
}

export const updateColeccion = async (id, body) => {
  const res = await axios.patch(`${API_URL_COLLECTION}/${id}`, body, { headers })
  return res.data
}

export const deleteColeccion = async (id) => {
  const res = await axios.delete(`${API_URL_COLLECTION}/${id}`, { headers })
  return res.data
}
