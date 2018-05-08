import openSocket from 'socket.io-client'
import store, { startGame } from '../redux/store'

const socket = openSocket('http://localhost:3000')

const createGameRoom = gameId => {
  socket.emit('createGameRoom', gameId)
}

const joinGameRoom = gameId => {
  socket.emit('joinGameRoom', gameId)
}

socket.on('startGame', () => {
  store.dispatch(startGame())
})

socket.on('invalidGame', () => console.log('haay invalid'))

export { createGameRoom, joinGameRoom }
