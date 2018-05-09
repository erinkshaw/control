import openSocket from 'socket.io-client'
import store, { startGame, setIdInvalid } from '../redux/store'

// TODO: What does this need to be on deploy? The actual URL?

const socket = openSocket('http://localhost:3000')

const createGameRoom = gameId => {
  socket.emit('createGameRoom', gameId)
}

const joinGameRoom = gameId => {
  socket.emit('joinGameRoom', gameId)
}

socket.on('startGame', game => {
  console.log(game)
  store.dispatch(startGame(game))
})

socket.on('invalidGame', () => store.dispatch(setIdInvalid()))

export { createGameRoom, joinGameRoom }
