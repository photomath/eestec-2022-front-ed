import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../shared/types'

type ProtectedProps = {
  user?: User
}
export const Protected: React.FC<ProtectedProps> = ({ user, children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user == null) {
      navigate('/login')
    }
  }, [user, navigate])

  return <>{user == null ? null : children}</>
}
