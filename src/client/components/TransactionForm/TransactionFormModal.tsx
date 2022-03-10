import React, { useCallback, useState } from 'react'
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap'
import clsx from 'clsx'

import styles from './TransactionForm.module.css'
import { createTransaction, updateTransaction } from '../../api/transaction'
import { CreateTransactionFailure, Transaction, TransactionType } from '../../../shared/types'
import { formatISODate } from '../../../shared/formatters'

type TransactionFormProps = {
  transaction?: Transaction
  onHide: (shouldLoadData?: boolean) => void
}
export const TransactionForm: React.FC<TransactionFormProps> = ({ transaction, onHide }) => {
  const [transactionType, setTransactionType] = useState(transaction?.type ?? TransactionType.Expense)
  const [transactionDate, setTransactionDate] = useState(transaction?.date ?? new Date())
  const [amount, setAmount] = useState(transaction?.amount ?? '')
  const [description, setDescription] = useState(transaction?.description ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<CreateTransactionFailure | null>(null)

  const onTransactionTypeChange = useCallback((event: React.SyntheticEvent<HTMLSelectElement>) => {
    setTransactionType(event.currentTarget.value as TransactionType)
  }, [])

  const onTransactionDateChange = useCallback((event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTransactionDate(new Date(event.currentTarget.value))
  }, [])

  const onAmountChange = useCallback((event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAmount(event.currentTarget.value)
  }, [])

  const onDescriptionChange = useCallback((event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(event.currentTarget.value)
  }, [])

  const onSubmit = useCallback(
    async (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()

      setSubmitting(true)
      setError(null)

      try {
        if (transaction == null) {
          await createTransaction({ type: transactionType, date: transactionDate, amount, description })
        } else {
          await updateTransaction({
            id: transaction.id,
            date: transactionDate,
            type: transactionType,
            amount,
            description,
          })
        }
        onHide(true)
      } catch (error) {
        setError(error as CreateTransactionFailure)
      } finally {
        setSubmitting(false)
      }
    },
    [amount, transactionDate, description, transactionType, transaction, onHide]
  )

  const internalOnHide = useCallback(() => {
    onHide()
  }, [onHide])

  return (
    <>
      {submitting && (
        <div className={styles.SpinnerWrapper}>
          <Spinner animation='border' />
        </div>
      )}
      <Form className={styles.Form} onSubmit={onSubmit}>
        <Form.Group className={clsx('mb-3', styles.AlignLeft)} controlId='transaction-type-field'>
          <Form.Label>Transaction type</Form.Label>
          <Form.Select required onChange={onTransactionTypeChange} value={transactionType}>
            {[TransactionType.Expense, TransactionType.Payment].map((transactionType) => (
              <option key={transactionType as string} value={transactionType as string}>
                {transactionType}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className={clsx('mb-3', styles.AlignLeft)} controlId='date-field'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            required
            type='date'
            placeholder='Date'
            onChange={onTransactionDateChange}
            value={formatISODate(transactionDate)}
          />
        </Form.Group>

        <Form.Group className={clsx('mb-3', styles.AlignLeft)} controlId='amount-field'>
          <Form.Label>Amount</Form.Label>
          <Form.Control required type='number' placeholder='$' onChange={onAmountChange} value={amount} />
        </Form.Group>

        <Form.Group className={clsx('mb-3', styles.AlignLeft)} controlId='description-field'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Description'
            onChange={onDescriptionChange}
            value={description}
          />
        </Form.Group>

        {error != null && (
          <Alert className={styles.AlignLeft} variant='danger'>
            {error.message}
          </Alert>
        )}

        <Form.Group className={clsx(styles.SpaceAround)}>
          <Button variant='primary' type='submit' disabled={submitting}>
            Save
          </Button>
          <Button variant='primary' type='button' disabled={submitting} onClick={internalOnHide}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

type TransactionFormModalProps = {
  show: boolean
  transaction?: Transaction
  onHide: (shouldLoadData?: boolean) => void
}
export const TransactionFormModal: React.FC<TransactionFormModalProps> = ({ show, transaction, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{transaction == null ? 'Create transaction' : 'Edit transaction'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{show && <TransactionForm transaction={transaction} onHide={onHide} />}</Modal.Body>
    </Modal>
  )
}
