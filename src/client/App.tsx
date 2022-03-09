import { Route, Routes } from 'react-router-dom'

import './App.css'
import { LoginForm } from './pages/Login'
import { SignUpForm } from './pages/SignUp'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<div>TODO</div>} />
        <Route path='/login' element={<LoginForm onLogin={() => {}} />} />
        <Route path='/signup' element={<SignUpForm onSignUp={() => {}} />} />
      </Routes>
    </div>
  )
}

export default App
