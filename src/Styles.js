import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
`

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`

export const HeaderText = styled.span`
  display: inline-block;
  margin-right: 10px;
`

export const CardText = styled.h1`
  font-size: 100px;
`

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
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
