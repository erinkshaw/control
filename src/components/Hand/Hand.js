import React from 'react'
import Card from '../Card/Card'

const Hand = props => {
  const { playerHand, opponentHandLength, type } = props
  if (type === 'opponent') {
    return <div>{opponentHandLength}</div>
  }
  return <div>{playerHand.map((card, i) => <Card card={card} key={i} />)}</div>
}
export default Hand
