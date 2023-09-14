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
  
  useEffect(() => {
    let storageToken = localStorage.getItem('token')
    let decodedToken  = jwt_decode(storageToken)
    let currentDate = new Date()
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      setToken(null)
      setLogin(false)
    } else {
    setToken(storageToken)
    setLogin(true)
    }
    console.log(login)
  }, [] )
  
  return (
    <LoginContext.Provider value={{ login, token}}>
    <Routes>
      <Route path='/' exact element={<Home/>}></Route>
      <Route path="/posts/:id" element={<Create/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path="/create" element={ <Create/>}></Route>
      <Route path="*" element= { <ErrorPage/> }></Route>
    </Routes>
    </LoginContext.Provider>
  )
}

export default App
