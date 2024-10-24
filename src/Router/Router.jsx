import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../../Home/Home'
import Postat from '../Pages/Postat/Postat.jsx'



const Router = () => {
  return (
  <BrowserRouter>
  <Routes>

    <Route path='/' element={<Home/>} />
    <Route path='/post' element={<Postat/>} />
   
  </Routes>
  </BrowserRouter>
  )
}

export default Router