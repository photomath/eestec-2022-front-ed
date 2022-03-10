import { Route, Routes } from 'react-router-dom'
import { MOCK_BALANCE_SHEET } from './api/mocks'

import './App.css'
import { TransactionFormModal } from './components/TransactionForm'
import { TransactionTable } from './components/TransactionTable'
import { LoginForm } from './pages/Login'
import { SignUpForm } from './pages/SignUp'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<div>TODO</div>} />
        <Route path='/login' element={<LoginForm onLogin={() => {}} />} />
        <Route path='/signup' element={<SignUpForm onSignUp={() => {}} />} />
        <Route path='/transaction' element={<TransactionFormModal show={true} onHide={() => {}} />} />
        <Route
          path='/transactions'
          element={
            <TransactionTable
              currentPage={0}
              pages={5}
              transactions={MOCK_BALANCE_SHEET}
              onPageClick={() => {}}
              onTransactionDelete={() => {}}
              onTransactionEdit={() => {}}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
