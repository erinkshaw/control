import { Game } from './game'

class Card {
  constructor(name, fuelCells, type, actions = []) {
    this.name = name
    this.fuelCells = fuelCells
    this.type = type
    this.actions = actions
  }
}

const cardTypes = [
  {
    name: 'Rift',
    fuelCells: 1,
    type: 'Silver',
  },
  {
    name: 'Exotic Matter',
    fuelCells: 2,
    type: 'Silver',
  },
  {
    name: 'Deflector',
    fuelCells: 3,
    type: 'Silver',
  },
  {
    name: 'Wormhole',
    fuelCells: 4,
    type: 'Bronze',
  },
  {
    name: 'Anomaly',
    fuelCells: 4,
    type: 'Bronze',
  },
  {
    name: 'Rewind',
    fuelCells: 5,
    type: 'Bronze',
  },
  {
    name: 'Reactor',
    fuelCells: 5,
    type: 'Silver',
  },
  {
    name: 'Dark Energy',
    fuelCells: 6,
    type: 'Bronze',
  },
  {
    name: 'Future Shift',
    fuelCells: 6,
    type: 'Bronze',
  },
  {
    name: 'Singularity',
    fuelCells: 7,
    type: 'Bronze',
  },
  {
    name: 'Antimatter',
    fuelCells: 8,
    type: 'Bronze',
  },
  {
    name: 'Time Stop',
    fuelCells: 9,
    type: 'Bronze',
  },
  {
    name: 'Nova',
    fuelCells: 10,
    type: 'Bronze',
  },
]

const shuffleDeck = () => 0.5 - Math.random()

const makeDeck = () => {
  const deck = []
  cardTypes.forEach(cardType => {
    for (let i = 0; i < 4; i += 1) {
      const { name, fuelCells, type } = cardType
      const card = new Card(name, fuelCells, type)
      deck.push(card)
    }
  })
  return deck.sort(shuffleDeck)
}

const makeGame = () => {
  const deck = makeDeck()
  const p1Hand = []
  const p2Hand = []

  deck.splice(-10, 10).forEach((card, i) => {
    if (i % 2 === 0) p1Hand.push(card)
    else p2Hand.push(card)
  })

  return new Game(deck, p1Hand, p2Hand)
}

export default makeGame
