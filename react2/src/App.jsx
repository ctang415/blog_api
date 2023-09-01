import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Create from './components/create'
import Login from './components/login'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/:id" element={<Create/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path="/create" element={ <Create/>}></Route>
    </Routes>
    </>
  )
}

export default App
