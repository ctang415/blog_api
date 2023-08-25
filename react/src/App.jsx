import { useState } from 'react'
import React from 'react'
import './App.css'
import Nav from './components/navbar'
import Footer from './components/footer'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  margin: 15% auto;
  max-width: 100vw;
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`

function App() {

  return (
    <StyledDiv>
      <Nav/>
        <Wrapper>
          <Outlet/>
        </Wrapper>
      <Footer/>
    </StyledDiv>
  )
}

export default App
