import { useSelector, useDispatch } from 'react-redux'
import { addCharacter, updateCharacter, deleteCharacter, setSearch, setCharacters } from '../reducers/collectionSlice'

export default function useCharacters () {
  const { characters, search } = useSelector(state => state.collection)
  const dispatch = useDispatch()

  const hasCharacters = !!characters

  const handleAddCharacter = (character) => {
    dispatch(addCharacter(character))
  }

  const handleDeleteCharacter = (id) => {
    dispatch(deleteCharacter(id))
  }

  const handleUpdateCharacter = (id, newData) => {
    console.log(id, newData)
    dispatch(updateCharacter({ id, newData }))
  }

  const handleSearch = (value) => {
    value = value?.length > 2 ? value.toLowerCase() : null
    dispatch(setSearch(value))
  }

  const handleFilter = () => !search
    ? characters
    : characters.filter(character =>
      character.name.toLowerCase().includes(search) ||
      character.gender.toLowerCase().includes(search) ||
      character.origin.toLowerCase().includes(search) ||
      character.species.toLowerCase().includes(search) ||
      character.status.toLowerCase().includes(search)
    )

  const loadCharacters = (characters) => dispatch(setCharacters(characters))

  const showCharacters = handleFilter()

  return {
    characters,
    hasCharacters,
    handleAddCharacter,
    handleDeleteCharacter,
    handleUpdateCharacter,
    showCharacters,
    loadCharacters,
    handleSearch,
    search
  }
}
