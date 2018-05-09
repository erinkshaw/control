export default class Game {
  constructor(deck, p1Hand = [], p2Hand = [], p1Installed = [], p2Installed = [], p1Turn = true) {
    this.deck = deck
    this.p1Hand = p1Hand
    this.p2Hand = p2Hand
    this.p1Installed = p1Installed
    this.p2Installed = p2Installed
    this.p1Turn = p1Turn
  }
}
