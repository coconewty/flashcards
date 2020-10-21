import React, { useState } from 'react'
import data from './data'
import shuffle from 'lodash.shuffle'
import Button from 'react-bootstrap/Button'
import { Page, Main, CardText, ButtonWrapper } from './Styles'

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
    <Page>
      <Main>
        <CardText>{currentCard.en}</CardText>
        <CardText>{showTranslation ? currentCard.es : '...'}</CardText>
      </Main>
      <ButtonWrapper>
        {!showTranslation && (
          <Button
            variant="dark"
            size="lg"
            onClick={() => setShowTranslation(true)}
          >
            Show translation
          </Button>
        )}
        {showTranslation && (
          <Button
            variant="dark"
            size="lg"
            onClick={() => {
              setShowTranslation(false)
              nextCard()
            }}
          >
            Next card
          </Button>
        )}
      </ButtonWrapper>
    </Page>
  )
}
