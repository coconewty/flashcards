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

const TranslateButton = (props) => (
  <Button variant="dark" size="lg" {...props}>
    Show translation
  </Button>
)

const NextCardButton = (props) => (
  <Button variant="dark" size="lg" {...props}>
    Next card
  </Button>
)

const randomiseOrder = (cardObj) => {
  if (Math.floor(Math.random() * 2) === 0) {
    return [cardObj.en, cardObj.es]
  } else {
    return [cardObj.es, cardObj.en]
  }
}

export default () => {
  const [weekNumber, setWeekNumber] = useState(0)
  const [cards, setCards] = useState(shuffle(data[weekNumber].cards))
  const [cardNumber, setCardNumber] = useState(0)
  const [cardText, setCardText] = useState(randomiseOrder(cards[cardNumber]))
  const [showTranslation, setShowTranslation] = useState(false)

  const handleWeekChange = (event) => {
    const newWeekNumber = event.target.value
    setWeekNumber(newWeekNumber)
    setCards(data[newWeekNumber].cards)
    setCardNumber(0)
    setShowTranslation(false)
  }

  const handleShowTranslation = () => {
    setShowTranslation(true)
  }

  const handleShowNextCard = () => {
    setShowTranslation(false)
    if (cardNumber === cards.length - 1) {
      setCards(shuffle(data[weekNumber].cards))
      setCardNumber(0)
      setCardText(randomiseOrder(cards[cardNumber]))
    } else {
      setCardNumber(cardNumber + 1)
      setCardText(randomiseOrder(cards[cardNumber]))
    }
  }

  return (
    <Page>
      <Header>
        <HeaderText>Week number</HeaderText>
        <select value={weekNumber} onChange={handleWeekChange}>
          {data.map((val, i) => (
            <option value={i} key={i}>
              {val.week} - {val.title}
            </option>
          ))}
        </select>
      </Header>
      <Main>
        <CardText>{cardText[0]}</CardText>
        <CardText>{showTranslation ? cardText[1] : '...'}</CardText>
      </Main>
      <ButtonWrapper>
        {!showTranslation && (
          <TranslateButton onClick={() => handleShowTranslation()} />
        )}
        {showTranslation && (
          <NextCardButton onClick={() => handleShowNextCard()} />
        )}
      </ButtonWrapper>
    </Page>
  )
}
