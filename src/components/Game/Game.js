import React from 'react'
import { connect } from 'react-redux'
import styles from './Game.scss'

const Game = props => {
  const { gameId, gameStarted } = props
  if (gameStarted) {
    return <div>yo wassup</div>
  }
  return (
    <div>
      <p>Waiting for player two to join...</p>
      <h1>
        {gameId}
      </h1>
    </div>
  )
}

const mapStateToProps = state => ({ gameId: state.gameId, gameStarted: state.gameStarted })

export default connect(mapStateToProps)(Game)
