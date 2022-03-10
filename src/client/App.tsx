import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import { TransactionForm } from './components/TransactionForm'
import { LoginForm } from './pages/Login'
import { SignUpForm } from './pages/SignUp'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div>TODO</div>} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/transaction' element={<TransactionForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
