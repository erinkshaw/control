import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const defaultState = {
  playerOneHand: [],
  playerTwoHand: [],
}

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

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_DECK: {
      return { ...state, deck: action.deck }
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
