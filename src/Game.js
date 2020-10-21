import React, { useState } from 'react'
import data from './data'
import shuffle from 'lodash.shuffle'
import Button from 'react-bootstrap/Button'
import {
  Page,
  Main,
  Header,
  HeaderText,
  CardText,
  ButtonWrapper,
} from './Styles'

let weekNumber = 0
let cardNumber = 0
const cards = data[weekNumber].cards
const cardsLength = cards.length
let shuffledCards = shuffle(cards)

export default () => {
  const [currentCard, setCurrentCard] = useState(shuffledCards[cardNumber])
  const [currentWeek, setCurrentWeek] = useState(weekNumber)

  const [showTranslation, setShowTranslation] = useState(false)

  const nextCard = () => {
    if (cardNumber === cardsLength - 1) {
      shuffledCards = shuffle(data[weekNumber].cards)
      cardNumber = 0
    } else {
      cardNumber++
    }
    setCurrentCard(shuffledCards[cardNumber])
  }

  const setWeekNumber = (event) => {
    weekNumber = event.target.value
    setCurrentWeek(weekNumber)
    shuffledCards = shuffle(data[weekNumber].cards)
    cardNumber = 0
    setCurrentCard(shuffledCards[cardNumber])
  }

  return (
    <Page>
      <Header>
        <HeaderText>Week number</HeaderText>
        <select value={currentWeek} onChange={setWeekNumber}>
          {data.map((val, i) => (
            <option value={i}>
              {val.week} - {val.title}
            </option>
          ))}
        </select>
      </Header>
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
