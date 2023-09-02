import useToggle from './useToggle'
import useLoader from './useLoader'
import useError from './useError'
import useCharacters from './useCharacters'

import { validateCharacterId } from '../validators/character.validate'
import { deleteColeccion, searchCollection, updateColeccion } from '../services/collections.service'
import { randomGenerete } from '../tools/helpers'

export default function useCharacter (idCharacter) {
  const { characters, handleAddCharacter, handleUpdateCharacter, handleDeleteCharacter } = useCharacters()

  const character = characters.find(character => character.id === Number(idCharacter))

  const { handleToggle } = useToggle()
  const { addErrors } = useError()
  const { setLoader } = useLoader()

  const handleRandom = () => {
    setLoader(true)
    let found = true
    let random = 0
    while (found) {
      random = randomGenerete(1, 827) // api range
      found = findCharacter(random)
    }
    newCharacter(random)
    setLoader(false)
  }
  const handleDelete = () => {
    // Borrar de la coleccion
    handleDeleteCharacter(idCharacter)

    // Borro la coleccion de la base de datos
    deleteColeccion(idCharacter)
  }

  const findCharacter = (id) => characters.find(character => character.id === Number(id))

  const newCharacter = async (id) => {
    const resul = validateCharacterId(id)
    if (!resul.validated) {
      addErrors(resul.errors)
      return false
    }

    if (findCharacter(id)) {
      addErrors(['dataExist'])
      return false
    }
    try {
      const newCharacter = await searchCollection(id)
      handleAddCharacter(newCharacter)
    } catch (error) {
      addErrors(['errApi'])
      return false
    }
    return true
  }

  const handleLike = () => {
    const favorite = !character.favorite
    handleUpdateCharacter(idCharacter, { favorite })
    updateColeccion(idCharacter, { favorite })
  }

  return { handleRandom, newCharacter, handleToggle, handleLike, handleDelete, character }
}
