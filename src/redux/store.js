import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import uniqid from 'uniqid'
import { createGameRoom, joinGameRoom } from '../client/socket'

const defaultState = {
  gameId: '',
  gameStarted: false,
}

const SET_GAME_ID = 'SET_GAME_ID'

const START_GAME = 'START_GAME'

export const startGame = () => ({ type: START_GAME })

export const setGameId = uniqId => {
  const gameId = uniqId || uniqid()
  if (uniqId) joinGameRoom(gameId)
  else createGameRoom(gameId)
  return { type: SET_GAME_ID, gameId }
}

export const resetGameId = () => ({})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_GAME_ID: {
      return { ...state, gameId: action.gameId }
    }
    case START_GAME: {
      return { ...state, gameStarted: true }
    }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
)

export default store

// getDeck

// futureShift
// add card
// return card to deck

// antiMatter
// selectOneRemoval
// randomRemoval

// destroyAllSilver (anomaly)
// destroyAllBronze (singularity)

// drawCard

// stealSilver

// destroyNova

// discardOpponentCard (optional arg to specify card ) --> (rewind, )

// selectFromDiscard

// cancelBronzeCard

// installCard
