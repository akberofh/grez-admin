import React from 'react'
import { ToastContainer } from 'react-toastify'
import Router from '../src/Pages/Home/Home'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Router/>
    </div>
  )
}

export default App