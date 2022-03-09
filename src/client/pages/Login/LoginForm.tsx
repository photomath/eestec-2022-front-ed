import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import styles from './LoginForm.module.css'
import { login, me } from '../../api/login'
import { LoginFailure, User } from '../../../shared/types'
import { Spinner } from '../../components/Spinner'

type LoginFormProps = {
  onLogin: (user: User) => void
}
export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<LoginFailure | null>(null)

  const onEmailChange = useCallback((event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.currentTarget.value)
  }, [])

  const onPasswordChange = useCallback((event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.currentTarget.value)
  }, [])

  const onRememberMeChange = useCallback(
    (_event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRememberMe(!rememberMe)
    },
    [rememberMe]
  )

  const onSubmit = useCallback(
    async (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()

      setSubmitting(true)
      setError(null)

      try {
        const user = await login({ email, password, rememberMe })
        onLogin(user)
      } catch (error) {
        setError(error as LoginFailure)
      } finally {
        setSubmitting(false)
      }
    },
    [email, password, rememberMe, onLogin]
  )

  useEffect(() => {
    const getUserData = async () => {
      setSubmitting(true)
      try {
        const user = await me()
        setSubmitting(false)
        onLogin(user)
      } catch {
        setSubmitting(false)
      }
    }

    getUserData()
  }, [onLogin])

  return (
    <div className={styles.LoginPage}>
      <div className={styles.LoginFormWrapper}>
        {submitting && <Spinner />}
        <Form className={styles.Form} onSubmit={onSubmit}>
          <h2>Login</h2>
          <Form.Group className={clsx('mb-3', styles.AlignLeft)} controlId='email-field'>
            <Form.Label>Email address</Form.Label>
            <Form.Control required type='email' placeholder='Enter email' onChange={onEmailChange} value={email} />
          </Form.Group>

          <Form.Group className={clsx('mb-3', styles.AlignLeft)} controlId='password-field'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Password'
              onChange={onPasswordChange}
              value={password}
            />
          </Form.Group>

          <Form.Group className={clsx('mb-3', styles.AlignLeft, styles.SpaceAround)} controlId='remember-me-field'>
            <Form.Check type='checkbox' label='Remember me' onChange={onRememberMeChange} checked={rememberMe} />
            <Link to={'/signup'}>Need an account?</Link>
          </Form.Group>
          {error && (
            <Alert className={styles.AlignLeft} variant='danger'>
              {error.message}
            </Alert>
          )}
          <Button variant='primary' type='submit' disabled={submitting}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
