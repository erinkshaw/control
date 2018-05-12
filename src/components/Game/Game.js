import React from 'react'
import { connect } from 'react-redux'
import styles from './Game.scss'
import InstalledCards from '../InstalledCards/InstalledCards'
import Hand from '../Hand/Hand'
import Deck from '../Deck/Deck'

const Game = props => {
  const {
    gameId,
    gameStarted,
    opponentInstalled,
    playerInstalled,
    opponentHandLength,
    playerHand,
  } = props
  console.log(opponentHandLength)
  if (gameStarted) {
    return (
      <div>
        <Hand opponentHandLength={opponentHandLength} type={'opponent'} />
        <InstalledCards opponentInstalled={opponentInstalled} />
        <Deck />
        <InstalledCards playerInstalled={playerInstalled} />
        <Hand playerHand={playerHand} />
      </div>
    )
  }
  // TODO: Create a waiting room?
  return (
    <div>
      <p>Waiting for player two to join...</p>
      <h1>{gameId}</h1>
    </div>
  )
}

const mapStateToProps = state => ({
  gameId: state.gameId,
  gameStarted: state.gameStarted,
  playerHand: state.playerHand,
  opponentInstalled: state.opponentInstalled,
  opponentHandLength: state.opponentHandLength,
  playerInstalled: state.playerInstalled,
})

export default connect(mapStateToProps)(Game)
