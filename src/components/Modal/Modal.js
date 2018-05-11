import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { drawCard } from '../../redux/store'

class Modal extends React.Component {
  render() {
    const { type, show, onClose, drawFromDeck } = this.props
    // Render nothing if the "show" prop is false
    if (!show) {
      return null
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
    }

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
    }

    if (type === 'card') {
      return (
        <div className="backdrop" style={backdropStyle}>
          <div className="modal" style={modalStyle}>
            <div className="footer">
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      )
    }
    if (type === 'deck') {
      return (
        <div className="backdrop" style={backdropStyle}>
          <div className="modal" style={modalStyle}>
            <button onClick={drawFromDeck}>Draw Card</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )
    }
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
}

const mapDispatchToProps = dispatch => ({
  drawFromDeck() {
    dispatch(drawCard)
  },
})

export default connect(null, mapDispatchToProps)(Modal)

