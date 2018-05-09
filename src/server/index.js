import express from 'express'
import compression from 'compression'
import path from 'path'
import React from 'react'
import socketio from 'socket.io'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import template from './template'
import makeGame from '../scripts/cards'

const clientAssets = require(KYT.ASSETS_MANIFEST) // eslint-disable-line import/no-dynamic-require
const port = parseInt(KYT.SERVER_PORT, 10)
const app = express()

const server = app.listen(port, () => {
  console.log(`server started on port: ${port}`) // eslint-disable-line no-console
})

const io = socketio(server)

const uIds = {}
const game = makeGame()

// TODO: maybe set up some logic that the game state is saved so it can be rejoined?
io.on('connection', socket => {
  console.log(`${socket.id} connected`)

  // create game instance here
  socket.on('createGameRoom', uniqId => {
    console.log(`${socket.id} is initializing game with id ${uniqId} `)
    uIds[uniqId] = [socket.id]
    console.log('this thar b the game', game)
  })

  // add p2 to game instance here
  socket.on('joinGameRoom', uniqId => {
    if (uIds[uniqId] && uIds[uniqId].length === 1) {
      console.log(`${socket.id} is joining game with id ${uniqId} `)
      uIds[uniqId].push(socket.id)
      io.sockets.emit('startGame', game)
      console.log(uIds)
    } else {
      socket.emit('invalidGame', uniqId)
    }
    console.log(uIds)
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
