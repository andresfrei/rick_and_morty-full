import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import { AiFillHeart } from 'react-icons/ai'
import { OutlineButton } from '../_theme/Buttons'

import useLanguage from '../../hooks/useLanguage'

import Property from './Property'
import styles from './card.module.css'
import useCharacter from '../../hooks/useCharacter'
// import { colors } from '../../config/theme'

export default function Card ({ character }) {
  const { id, name, image, status, species, origin, gender, favorite } = character

  const { handleLike, handleDelete } = useCharacter(id)

  const navigate = useNavigate()

  const [isFlipped, setIsFlipped] = useState(false)

  const { dictionaryWord } = useLanguage()

  const frontClass = `${styles.face} ${styles.front} ${!isFlipped ? styles.noFlipped : styles.flipped}`
  const backClass = `${styles.face} ${styles.back} ${isFlipped ? styles.noFlipped : styles.flipped}`
  const btnLikeClass = `${styles.btnLike} ${favorite ? styles.like : ''}`

  const handleCardClick = () => setIsFlipped(!isFlipped)

  const handleDetail = (event) => {
    event.stopPropagation()
    navigate('/detail/' + id)
  }

  const onDelete = (e) => {
    e.stopPropagation()
    handleDelete()
  }

  const onLike = (e) => {
    e.stopPropagation()
    handleLike()
  }

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={frontClass}>
        <AiFillHeart className={btnLikeClass} onClick={onLike} />
        { !favorite && <ImCross className={styles.btnClose} onClick={onDelete} />}
        <img src={image} alt={name} className={styles.image} />
        <h3
          className={styles.name}
          onClick={handleDetail}
        >
          {name}
        </h3>
      </div>
      <div className={backClass}>
        <h3>{name}</h3>
        <div className={styles.body}>
          <Property label = {dictionaryWord('card.status')} value = { status } />
          <Property label = {dictionaryWord('card.species')} value = { species } />
          <Property label = {dictionaryWord('card.origin')} value = { origin } />
          <Property label = {dictionaryWord('card.gender')} value = { gender } />
        </div>
        <div className={styles.footer}>
          <OutlineButton onClick={handleDetail} height='30px' >
            {dictionaryWord('card.seeMore')}
          </OutlineButton>
        </div>
      </div>
    </div>
  )
}
