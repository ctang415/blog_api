import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Create from './components/create'
import Login from './components/login'
import ErrorPage from './components/errorpage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' exact element={<Home/>}></Route>
      <Route path="/posts/:id" element={<Create/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path="/create" element={ <Create/>}></Route>
      <Route path="*" element= { <ErrorPage/> }></Route>
    </Routes>
    </>
  )
}

export default App
