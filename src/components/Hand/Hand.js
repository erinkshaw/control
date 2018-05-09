import React from 'react'

const Hand = props => {
  const { playerHand } = props
  return (
    <div>
      {playerHand.map(card =>
        <div>
          {card.name}
        </div>
      )}
    </div>
  )
}
export default Hand
