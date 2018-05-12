export class Game {
  constructor(
    deck,
    p1Hand = [],
    p2Hand = [],
    p1Installed = [],
    p2Installed = [],
    discardPile = [],
    p1Turn = true
  ) {
    this.deck = deck
    this.p1Hand = p1Hand
    this.p2Hand = p2Hand
    this.p1Installed = p1Installed
    this.p2Installed = p2Installed
    this.discardPile = discardPile
    this.p1Turn = p1Turn
  }
}

export class GameState {
  constructor(
    playerHand,
    playerInstalled,
    opponentInstalled,
    opponentHandLength,
    playersTurn,
    topDiscard
  ) {
    this.playerHand = playerHand
    this.playerInstalled = playerInstalled
    this.opponentInstalled = opponentInstalled
    this.opponentHandLength = opponentHandLength
    this.playersTurn = playersTurn
    this.topDiscard = topDiscard
  }
}

export const returnNewGameState = game => {
  const playerOne = new GameState(
    game.p1Hand,
    game.p1Installed,
    game.p2Installed,
    game.p2Hand.length,
    game.p1Turn,
    game.discardPile.slice(-1)[0]
  )
  const playerTwo = new GameState(
    game.p2Hand,
    game.p2Installed,
    game.p1Installed,
    game.p1Hand.length,
    !game.p1Turn,
    game.discardPile.slice(-1)[0]
  )
  return { playerOne, playerTwo }
}
