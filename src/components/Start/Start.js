import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { createGameRoom, joinGameRoom } from '../../client/socket'

import styles from './Start.scss'

class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameId: '',
      showForm: false,
      formValue: '',
    }
    this.initiateGame = this.initiateGame.bind(this)
    this.showForm = this.showForm.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.changeText = this.changeText.bind(this)
  }

  render() {
    const { gameId, showForm } = this.state
    if (gameId) {
      return (
        <div>{gameId}</div>
      )
    }
    if (showForm) {
      return (
        <form onSubmit={this.joinGame}>
          <input type="text" onChange={this.changeText} />
          <input type="submit" value="Submit" />
        </form>
      )
    }
    return (
      <div>
        <button onClick={this.initiateGame}>Start Game</button>
        <button onClick={this.showForm}>Join Game</button>
      </div>
    )
  }

  initiateGame() {
    const gameId = uniqid()
    createGameRoom(gameId)
    this.setState({ gameId })
  }
  showForm() {
    this.setState({ showForm: true })
  }
  joinGame(e) {
    e.preventDefault()
    joinGameRoom(this.state.formValue)
  }
  changeText(event) {
    this.setState({ formValue: event.target.value })
  }
}

export default Start
