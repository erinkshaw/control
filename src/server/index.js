import express from 'express'
import compression from 'compression'
import path from 'path'
import React from 'react'
import socketio from 'socket.io'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import template from './template'
import makeGame from '../scripts/cards'
import { returnNewGameState } from '../scripts/game'

const clientAssets = require(KYT.ASSETS_MANIFEST) // eslint-disable-line import/no-dynamic-require
const port = parseInt(KYT.SERVER_PORT, 10)
const app = express()

const server = app.listen(port, () => {
  console.log(`server started on port: ${port}`) // eslint-disable-line no-console
})

const io = socketio(server)

const games = {}

// TODO: maybe set up some logic that the game state is saved so it can be rejoined?
io.on('connection', socket => {
  console.log(`${socket.id} connected`)

  // create game instance here
  socket.on('createGameRoom', uniqId => {
    console.log(`${socket.id} is initializing game with id ${uniqId} `)
    games[uniqId] = { players: [socket.id] }
    socket.join(uniqId)
  })

  // add p2 to game instance here
  socket.on('joinGameRoom', uniqId => {
    const currentGame = games[uniqId]
    if (currentGame.players && currentGame.players.length === 1) {
      currentGame.game = makeGame()

      const { playerOne, playerTwo } = returnNewGameState(currentGame.game)

      console.log(`${socket.id} is joining game with id ${uniqId} `)

      currentGame.players.push(socket.id)

      // this creates game room
      socket.join(uniqId)

      // io.in(uniqId).emit('startGame', game)

      // this emits to _not_ player 2
      socket.to(uniqId).emit('startGame', playerOne)

      // this emits to p2
      socket.emit('startGame', playerTwo)
    } else {
      socket.emit('invalidGame', uniqId)
    }
  })

  // TODO: card hand seems to be flip flopping (actually this is because of the logic that flips the turn each time)
  socket.on('drawCard', uniqId => {
    const currentGame = games[uniqId]
    const newCard = currentGame.game.deck.pop()
    const playerHand = currentGame.players[0] === socket.id ? 'p1Hand' : 'p2Hand'
    currentGame.game[playerHand].push(newCard)
    currentGame.game.p1Turn = !currentGame.game.p1Turn
    const { playerOne, playerTwo } = returnNewGameState(currentGame.game)
    const nextTurn = currentGame.game.p1Turn ? playerOne : playerTwo
    const prevTurn = !currentGame.game.p1Turn ? playerOne : playerTwo

    //emits to player who just finished turn
    socket.to(uniqId).emit('nextTurn', prevTurn)

    // emits to player whose turn it is
    socket.emit('nextTurn', nextTurn)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected :(`)
  })
})

// Remove annoying Express header addition.
app.disable('x-powered-by')

// Compress (gzip) assets in production.
app.use(compression())

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)))

app.get('*', (request, response) => {
  response.send(
    template({
      html: renderToString(<App />),
      manifestJSBundle: clientAssets['manifest.js'],
      mainJSBundle: clientAssets['main.js'],
      vendorJSBundle: clientAssets['vendor.js'],
      mainCSSBundle: clientAssets['main.css'],
    })
  )
})
