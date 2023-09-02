// import { useLoaderData, useParams } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Detail from '../components/Detail/Detail'
// import { searchCharacter } from '../services/characters.service'
import useLanguage from '../hooks/useLanguage'
import useCharacters from '../hooks/useCharacters'

export default function DetailPage () {
  // const { character } = useLoaderData()
  const { id } = useParams()
  const { characters } = useCharacters()

  const character = characters.find(character => character.id === Number(id))

  const { dictionaryWord } = useLanguage()
  return (
    <sedivction className='flex-grow'>
      <h1 className='my-1'>{dictionaryWord('card.detail')}</h1>
      <Detail character={character}/>
    </sedivction>
  )
}

/* export async function loaderCharacter ({ params }) {
  const character = await searchCharacter(params.id)
  console.log(character)
  return { character }
} */
