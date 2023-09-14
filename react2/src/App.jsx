import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Create from './components/create'
import Login from './components/login'
import ErrorPage from './components/errorpage'
import { useEffect, useState} from 'react'
import { LoginContext } from './components/logincontext'
import jwt_decode from 'jwt-decode'

function App() {
  const [token, setToken] = useState(null)
  const [login, setLogin] = useState(false)
  let ignore = false;
  
  const logOut = async () => {
    try {
    let response = await fetch ('http://localhost:3000/logout', {
      method: 'POST' })
      await response.json()
      if (response.status === 200) {
        localStorage.clear()
        setToken(null)
        setLogin(false)  
        alert('Successfully logged out!')
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    if (localStorage.length !== 0) {
    let storageToken = localStorage.getItem('token')
    let decodedToken  = jwt_decode(storageToken)
    let currentDate = new Date()
    if (decodedToken.exp * 1000 < currentDate.getTime() || storageToken === null) {
      setToken(null)
      setLogin(false)
      localStorage.clear()
    } else {
    setToken(storageToken)
    setLogin(true)
    }
  }
  }, [] )
  
  return (
    <LoginContext.Provider value={{ login, token, logOut}}>
    <Routes>
      <Route path='/' exact element={<Home/>}></Route>
      <Route path="/posts/:id" element={<Create/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/logout' element={<Login/>}></Route>
      <Route path="/create" element={ <Create/>}></Route>
      <Route path="*" element= { <ErrorPage/> }></Route>
    </Routes>
    </LoginContext.Provider>
  )
}

export default App
