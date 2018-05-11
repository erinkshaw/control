import React, { Component } from 'react'
import styles from './Deck.scss'
import Modal from '../Modal/Modal'

class Deck extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div>
        <div>deck card(img) or null [] </div>
        <img src="/img/cardBack.png" alt="card back" onClick={this.toggleModal} />
        <Modal show={this.state.isOpen} onClose={this.toggleModal} type="deck">
          Some content for the modal
        </Modal>
      </div>
    )
  }
}

export default Deck
