import React from 'react'
import styled from 'styled-components'
import { generateMedia } from 'styled-media-query'
import Button from 'react-bootstrap/Button'
import { FaVolumeUp, FaStar, FaRegStar } from 'react-icons/fa'

const containerMaxWidth = 1440

const breakpoints = {
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1280,
}

// used for styled-components easy media queries
export const media = generateMedia({
  xs: `${breakpoints.xs}px`,
  sm: `${breakpoints.sm}px`,
  md: `${breakpoints.md}px`,
  lg: `${breakpoints.lg}px`,
  xl: `${breakpoints.xl}px`,
})

const PageOuter = styled.div`
  display: flex;
  flex-direction: column;
`

const PageInner = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`

export const Page = ({ children }) => (
  <PageOuter>
    <PageInner>{children}</PageInner>
  </PageOuter>
)

export const Main = styled.main`
  max-width: ${containerMaxWidth}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  padding: 0 30px;
`

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`

export const CardText = styled.h1`
  font-size: 40px;
  ${media.greaterThan('md')`
    font-size: 50px;
  `}
  ${media.greaterThan('lg')`
    font-size: 100px;
  `}
`

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const TranslateButton = (props) => (
  <Button variant="dark" size="lg" {...props}>
    Show translation
  </Button>
)

export const NextCardButton = (props) => (
  <Button variant="dark" size="lg" {...props}>
    Next card
  </Button>
)

const ListenButtonWrapper = styled.button`
  display: inline-block;
  font-size: 0.4em;
  border: none;
  background: none;
  padding: 20px;
  position: relative;
  top: -8px;
  ${media.greaterThan('md')`
    top: -10px;
  `}
  ${media.greaterThan('lg')`
    top: -15px;
  `}
`

export const ListenButton = (props) => (
  <ListenButtonWrapper {...props}>
    <FaVolumeUp />
  </ListenButtonWrapper>
)

const StarButtonWrapper = styled.button`
  margin-bottom: 5px;
  background: none;
  padding: 0 5px 3px;
  border: none;
`

export const StarButton = ({...props}) => (
  <StarButtonWrapper {...props}>
    {props.active === true ? <FaStar /> : <FaRegStar />}
  </StarButtonWrapper>
)

export const RoundCounter = styled.p`
  position: fixed;
  bottom: 0;
  right: 20px;
`
