import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setGameId, setIdInvalid } from '../../redux/store'
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

  // TODO: this doesn't work
  componentDidMount() {
    const { invalidId, resetInvalidId } = this.props
    if (invalidId) {
      alert('Game Id is invalid!')
      resetInvalidId()
    }
  }

  render() {
    const { showForm } = this.state
    const { gameId, joinGame } = this.props
    if (gameId) {
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

const mapStateToProps = state => ({ gameId: state.gameId, invalidId: state.invalidId })

const mapDispatchToProps = dispatch => ({
  joinGame(e, gameId = null) {
    e.preventDefault()
    dispatch(setGameId(gameId))
  },
  resetInvalidId() {
    dispatch(setIdInvalid())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Start)
