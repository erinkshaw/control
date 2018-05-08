import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:3000')

const createGameRoom = gameId => {
  socket.emit('createGameRoom', gameId)
}

export { createGameRoom }
