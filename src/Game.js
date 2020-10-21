import React, { useState } from 'react'
import data from './data'
import shuffle from 'lodash.shuffle'

const weekNumber = 0
const cards = data[weekNumber].cards
const cardsLength = cards.length
let shuffledCards = shuffle(cards)
let currentCardNumber = 0

export default () => {
  const [currentCard, setCurrentCard] = useState(
    shuffledCards[currentCardNumber]
  )
  const [showTranslation, setShowTranslation] = useState(false)
  const nextCard = () => {
    if (currentCardNumber === cardsLength - 1) {
      shuffledCards = shuffle(cards)
      currentCardNumber = 0
    } else {
      currentCardNumber++
    }
    setCurrentCard(shuffledCards[currentCardNumber])
  }

  return (
    <div>
      <p>{currentCard.en}</p>
      {!showTranslation && (
        <button onClick={() => setShowTranslation(true)}>
          Show translation
        </button>
      )}
      {showTranslation && (
        <>
          <p>{currentCard.es}</p>
          <button
            onClick={() => {
              setShowTranslation(false)
              nextCard()
            }}
          >
            Next card
          </button>
        </>
      )}
    </div>
  )
}
