import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { createGameRoom } from '../../client/socket'

import styles from './Start.scss'

class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameId: '',
    }
    this.initiateGame = this.initiateGame.bind(this)
  }

  render() {
    const { gameId } = this.state
    if (gameId) {
      return (
        <div>{gameId}</div>
      )
    }
    return (
      <div>
        <button onClick={this.initiateGame}>Start Game</button>
        <button>Join Game</button>
      </div>
    )
  }

  initiateGame() {
    const gameId = uniqid()
    createGameRoom(gameId)
    this.setState({ gameId })
  }
}

export default Start
