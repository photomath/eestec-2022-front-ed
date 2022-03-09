import { Route, Routes } from 'react-router-dom'

import './App.css'
import { LoginForm } from './pages/Login'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<div>TODO</div>} />
        <Route path='/login' element={<LoginForm onLogin={() => {}} />} />
      </Routes>
    </div>
  )
}

export default App
