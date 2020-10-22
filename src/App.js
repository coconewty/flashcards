import React, { useState, useRef } from 'react'
import data from './data'
import shuffle from 'lodash.shuffle'
import remove from 'lodash.remove'
import { nanoid } from 'nanoid'
import {
  Page,
  Main,
  Header,
  CardText,
  ButtonWrapper,
  TranslateButton,
  NextCardButton,
  ListenButton,
  StarButton,
  RoundCounter,
} from './Theme'

const coinFlip = () => {
  return Math.floor(Math.random() * 2) === 0 // bool, 50:50
}

const speechToText = (contentToSpeak) => {
  const baseUrl = 'http://api.voicerss.org/?'
  const key = 'key=e0cf723102de490f8c85edbd19d6b6b7'
  const lang = '&hl=es-mx'
  const voice = '&v=Juana'
  const src = `&src=${contentToSpeak}`
  return `${baseUrl}${key}${lang}${voice}${src}`
}

const addIdsToCards = (cards) => cards.map(card => ({...card, id: nanoid()}))

export default () => {
  const [showTranslation, setShowTranslation] = useState(false)
  const [weekNumber, setWeekNumber] = useState(0)
  const [cardNumber, setCardNumber] = useState(0)
  const [cards, setCards] = useState(addIdsToCards(shuffle(data[weekNumber].cards)))
  const [coinFlipResult, setCoinFlipResult] = useState(coinFlip())
  const [cardRoundCount, setCardRoundCount] = useState(1)
  const [starList, setStarList] = useState([])

  const audioTag = useRef()

  const handleShowTranslation = () => {
    setShowTranslation(true)
  }

  const handleWeekChange = (event) => {
    setShowTranslation(false)
    const newWeekNumber = parseInt(event.target.value)
    setWeekNumber(newWeekNumber)
    setCards(addIdsToCards(shuffle(data[newWeekNumber].cards)))
    setCardNumber(0)
    setCardRoundCount(1)
  }

  const handleShowNextCard = () => {
    setShowTranslation(false)
    setCoinFlipResult(coinFlip())
    if (cardNumber === cards.length - 1) {
      setCards(cards => shuffle(cards))
      setCardNumber(0)
      setCardRoundCount((cardRoundCount) => cardRoundCount + 1)
    } else {
      setCardNumber((cardNumber) => cardNumber + 1)
    }
  }

  const handleListenToWord = (contentToSpeak) => {
    audioTag.current.src = speechToText(contentToSpeak)
  }

  const handleStarClick = () => {
    if(!starList.includes(cards[cardNumber].id)){
      setStarList(starList => [...starList, cards[cardNumber].id])
    } else {
      const newArray = remove(starList, (id) => {
        return id !== cards[cardNumber].id
      })
      setStarList(newArray)
    }
  }

  const Content1 = () => (
    <>
      {cards[cardNumber][coinFlipResult ? 'en' : 'es']}
      {!coinFlipResult && (
        <ListenButton
          onClick={() => handleListenToWord(cards[cardNumber].es)}
        />
      )}
    </>
  )

  const Content2 = () => (
    <>
      {cards[cardNumber][coinFlipResult ? 'es' : 'en']}
      {coinFlipResult && (
        <ListenButton
          onClick={() => handleListenToWord(cards[cardNumber].es)}
        />
      )}
    </>
  )

  return (
    <>
      <Page>
        <Header>
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
          <StarButton onClick={() => handleStarClick()} active={starList.includes(cards[cardNumber].id)} />
          {showTranslation ? (
            <NextCardButton onClick={() => handleShowNextCard()} />
          ) : (
            <TranslateButton onClick={() => handleShowTranslation()} />
          )}
        </ButtonWrapper>
        <RoundCounter>
          {cardNumber + 1}/{cards.length} - round {cardRoundCount}
        </RoundCounter>
      </Page>
      <audio className="sr-only" src="" ref={audioTag} autoPlay></audio>
    </>
  )
}
