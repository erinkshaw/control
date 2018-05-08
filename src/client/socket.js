import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:3000')

const createGameRoom = gameId => {
  socket.emit('createGameRoom', gameId)
}

const joinGameRoom = gameId => {
  socket.emit('joinGameRoom', gameId)
}

socket.on('startGame', gameId => console.log(gameId))

export { createGameRoom, joinGameRoom }
