import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import styles from './SignUpForm.module.css'
import { signup } from '../../api/signup'
import { SignUpFailure, User } from '../../../shared/types'
import { Spinner } from '../../components/Spinner'
import { me } from '../../api/login'

type SignUpFormProps = {
  onSignUp: (user: User) => void
}
export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<SignUpFailure | null>(null)

  const onEmailChange = useCallback((event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.currentTarget.value)
  }, [])

  const onPasswordChange = useCallback((event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.currentTarget.value)
  }, [])

  const onConfirmPasswordChange = useCallback((event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConfirmPassword(event.currentTarget.value)
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
        const user = await signup({ email, password, confirmPassword, rememberMe })
        onSignUp(user)
      } catch (error) {
        setError(error as SignUpFailure)
      } finally {
        setSubmitting(false)
      }
    },
    [email, password, confirmPassword, rememberMe, onSignUp]
  )

  useEffect(() => {
    const getUserData = async () => {
      setSubmitting(true)
      try {
        const user = await me()
        setSubmitting(false)
        onSignUp(user)
      } catch {
        setSubmitting(false)
      }
    }

    getUserData()
  }, [onSignUp])

  return (
    <div className={styles.SignUpPage}>
      <div className={styles.SignUpFormWrapper}>
        {submitting && <Spinner />}
        <Form className={styles.Form} onSubmit={onSubmit}>
          <h2>Sign up</h2>
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

          <Form.Group className={clsx('mb-3', styles.AlignLeft)} controlId='confirm-password-field'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Confirm Password'
              onChange={onConfirmPasswordChange}
              value={confirmPassword}
            />
          </Form.Group>

          <Form.Group className={clsx('mb-3', styles.AlignLeft, styles.SpaceAround)} controlId='remember-me-field'>
            <Form.Check type='checkbox' label='Remember me' onChange={onRememberMeChange} checked={rememberMe} />
            <Link to={'/login'}>Already have an account?</Link>
          </Form.Group>
          {error != null && (
            <Alert className={styles.AlignLeft} variant='danger'>
              {error.message.split('\n').map((message, i) => (
                <span key={i}>{message}</span>
              ))}
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
