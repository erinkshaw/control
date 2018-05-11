import React from 'react'
import styles from './Card.scss'

const toCamelCase = str => {
  const cmlCase = str.split(' ')
  cmlCase[0] = cmlCase[0][0].toLowerCase() + cmlCase[0].slice(1)
  if (cmlCase.length > 1) {
    for (let i = 1; i < cmlCase.length; i += 1) {
      cmlCase[i] = cmlCase[i][0].toUpperCase() + cmlCase[i].slice(1)
    }
  }
  return cmlCase.join('')
}

const Card = props => {
  const { card } = props
  return <img alt={`${card.name}`} src={`/img/${toCamelCase(card.name)}.png`} />
}
export default Card
