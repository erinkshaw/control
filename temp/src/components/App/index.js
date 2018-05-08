import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import styles from './styles.scss'

function App({ children }) {
  return (
    <div>
      <h1>Control</h1>
      <div>
        <button>New Game</button>
        <button>Join Game</button>
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
