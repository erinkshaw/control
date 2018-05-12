import openSocket from 'socket.io-client'
import store, { startGame, setIdInvalid, setNewGameState } from '../redux/store'

// TODO: What does this need to be on deploy? The actual URL?

// TODO: WHAT IF SUDDEN DEATH?

const socket = openSocket('http://localhost:3000')

const createGameRoom = gameId => {
  socket.emit('createGameRoom', gameId)
}

const joinGameRoom = gameId => {
  socket.emit('joinGameRoom', gameId)
}

const drawingCard = gameId => {
  socket.emit('drawCard', gameId)
}

socket.on('startGame', gameState => {
  store.dispatch(startGame(gameState))
})

socket.on('invalidGame', () => store.dispatch(setIdInvalid()))

socket.on('nextTurn', gameState => store.dispatch(setNewGameState(gameState)))

export { createGameRoom, joinGameRoom, drawingCard }
