import React, { useState } from 'react'
import data from './data'
import shuffle from 'lodash.shuffle'
import {
  Page,
  Main,
  Header,
  HeaderText,
  CardText,
  ButtonWrapper,
  TranslateButton,
  NextCardButton,
} from './Styles'

const coinFlip = () => {
  return Math.floor(Math.random() * 2) === 0 // bool, 50:50
}

export default () => {
  const [showTranslation, setShowTranslation] = useState(false)
  const [weekNumber, setWeekNumber] = useState(0)
  const [cardNumber, setCardNumber] = useState(0)
  const [cards, setCards] = useState(shuffle(data[weekNumber].cards))
  const [coinFlipResult, setCoinFlipResult] = useState(coinFlip())

  const handleShowTranslation = () => {
    setShowTranslation(true)
  }

  const handleWeekChange = (event) => {
    setShowTranslation(false)
    const newWeekNumber = parseInt(event.target.value)
    setWeekNumber(newWeekNumber)
    setCards(shuffle(data[newWeekNumber].cards))
    setCardNumber(0)
  }

  const handleShowNextCard = () => {
    setShowTranslation(false)
    setCoinFlipResult(coinFlip())
    if (cardNumber === cards.length - 1) {
      setCards(shuffle(data[weekNumber].cards))
      setCardNumber(0)
    } else {
      setCardNumber((cardNumber) => cardNumber + 1)
    }
  }

  const Content1 = () => (
    <>
      {cards[cardNumber][coinFlipResult ? 'en' : 'es']}
      {!coinFlipResult && '(es)'}
    </>
  )

  const Content2 = () => (
    <>
      {cards[cardNumber][coinFlipResult ? 'es' : 'en']}
      {coinFlipResult && '(es)'}
    </>
  )

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
        <CardText>
          <Content1 />
        </CardText>
        <CardText>
          {!showTranslation && '...'}
          {showTranslation && <Content2 />}
        </CardText>
      </Main>
      <ButtonWrapper>
        {showTranslation ? (
          <NextCardButton onClick={() => handleShowNextCard()} />
        ) : (
          <TranslateButton onClick={() => handleShowTranslation()} />
        )}
      </ButtonWrapper>
    </Page>
  )
}
