import React, { Component } from 'react'
import styles from './Card.scss'
import Modal from '../Modal/Modal'

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

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { card } = this.props
    return (
      <div>
        <img
          alt={`${card.name}`}
          src={`/img/${toCamelCase(card.name)}.png`}
          onClick={this.toggleModal}
        />
        <Modal
          show={this.state.isOpen}
          onClose={this.toggleModal}
          type={'card'}
          canBurn={card.type === 'Bronze' && card.name !== 'Nova'}
        >
          Some content for the modal
        </Modal>
      </div>
    )
  }
}

export default Card
