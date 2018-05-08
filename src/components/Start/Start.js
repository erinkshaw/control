import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setGameId } from '../../redux/store'
import Game from '../Game/Game'
import styles from './Start.scss'

class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      formValue: '',
    }
    this.showForm = this.showForm.bind(this)
    this.changeText = this.changeText.bind(this)
  }

  render() {
    const { showForm } = this.state
    const { gameId, joinGame } = this.props
    if (gameId) {
      // make a new component for the 'waiting room'
      return <Game />
    }
    if (showForm) {
      return (
        <form onSubmit={e => joinGame(e, this.state.formValue)}>
          <input type="text" onChange={this.changeText} />
          <input type="submit" value="Submit" />
        </form>
      )
    }
    return (
      <div>
        <button onClick={joinGame}>Start Game</button>
        <button onClick={this.showForm}>Join Game</button>
      </div>
    )
  }

  showForm() {
    this.setState({ showForm: true })
  }

  changeText(event) {
    this.setState({ formValue: event.target.value })
  }
}

const mapStateToProps = state => ({ gameId: state.gameId })

const mapDispatchToProps = dispatch => ({
  joinGame(e, gameId = null) {
    e.preventDefault()
    dispatch(setGameId(gameId))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Start)
