import { useCallback, useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import { formatLocaleDate, formatMoney } from '../../../shared/formatters'

import { Transaction } from '../../../shared/types'
import { deleteTransaction } from '../../api/transaction'
import { Spinner } from '../Spinner'
import styles from './TransactionForm.module.css'

type DeleteTransactionDialogProps = {
  show: boolean
  onHide: (shouldLoadData?: boolean) => void
  transaction: Transaction
}
export const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = ({ show, onHide, transaction }) => {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<Error>()

  const internalDeleteTransaction = useCallback(async () => {
    setDeleting(true)
    try {
      await deleteTransaction(transaction)
      onHide(true)
    } catch (error) {
      setError(error as Error)
    } finally {
      setDeleting(false)
    }
  }, [transaction, onHide])

  const internalOnHide = useCallback(() => {
    onHide()
  }, [onHide])

  return (
    <Modal show={show} onHide={onHide}>
      {deleting && <Spinner />}
      <Modal.Header closeButton>
        <Modal.Title>Delete transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the following transaction?
        {transaction && (
          <div className={styles.TransactionDetail}>
            <div>#</div>
            <div className={styles.JustifySelfEnd}>{transaction.id}</div>
            <div>Type:</div>
            <div className={styles.JustifySelfEnd}>{transaction.type}</div>
            <div>Date:</div>
            <div className={styles.JustifySelfEnd}>{formatLocaleDate(transaction.date)}</div>
            <div>Amount:</div>
            <div className={styles.JustifySelfEnd}>{formatMoney(transaction.amount)}</div>
            <div>Description:</div>
            <div className={styles.JustifySelfEnd}>{transaction.description}</div>
          </div>
        )}
        {error && (
          <Alert className={styles.AlignLeft} variant='danger'>
            {error.message}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={internalDeleteTransaction}>
          Confirm
        </Button>
        <Button variant='secondary' onClick={internalOnHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
