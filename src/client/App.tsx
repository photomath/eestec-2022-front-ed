import { useCallback, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { User } from '../shared/types'
import { logout } from './api/login'

import './App.css'
import { Protected } from './components/Protected'
import { Dashboard } from './pages/Dashboard'
import { LoginForm } from './pages/Login'
import { SignUpForm } from './pages/SignUp'

function App() {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()

  const onLogin = useCallback(
    (user: User) => {
      setUser(user)
      navigate('/')
    },
    [navigate]
  )

  const onLogout = useCallback(async () => {
    await logout()
    setUser(undefined)
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <Protected user={user}>
              <Dashboard user={user!} onLogout={onLogout} />
            </Protected>
          }
        />
        <Route path='/login' element={<LoginForm onLogin={onLogin} />} />
        <Route path='/signup' element={<SignUpForm onSignUp={onLogin} />} />
      </Routes>
    </div>
  )
}

export default App
