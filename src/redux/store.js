import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const defaultState = {
  gameId: '',
}

const SET_GAME_ID = 'SET_GAME_ID'

export const setGameId = gameId => ({ type: SET_GAME_ID, gameId })

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_GAME_ID: {
      return { ...state, gameId: action.gameId }
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
