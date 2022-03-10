import { useCallback, useMemo } from 'react'
import { Button, Pagination, Table } from 'react-bootstrap'
import { FaPen, FaTrash } from 'react-icons/fa'
import { formatLocaleDate, formatMoney } from '../../../shared/formatters'

import { Transaction } from '../../../shared/types'
import styles from './TransactionTable.module.css'

type TransactionRowProps = {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}
const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onEdit, onDelete }) => {
  const internalOnEdit = useCallback(() => {
    onEdit(transaction)
  }, [transaction, onEdit])

  const internalOnDelete = useCallback(() => {
    onDelete(transaction)
  }, [transaction, onDelete])

  const { id, type, date, amount, description } = transaction

  return (
    <tr>
      <td>{id}</td>
      <td>{type}</td>
      <td>{formatLocaleDate(date)}</td>
      <td>{formatMoney(amount)}</td>
      <td>{description}</td>
      <td>
        <Button variant='primary' className={styles.ActionButton} onClick={internalOnEdit}>
          <FaPen />
        </Button>{' '}
        <Button variant='danger' className={styles.ActionButton} onClick={internalOnDelete}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  )
}

type TransactionTableProps = {
  transactions: Transaction[]
  pages: number
  currentPage: number
  onPageClick: (page: number) => void
  onTransactionEdit: (transaction: Transaction) => void
  onTransactionDelete: (transaction: Transaction) => void
}
export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  pages,
  currentPage,
  onPageClick,
  onTransactionEdit,
  onTransactionDelete,
}) => {
  const paginationItems = useMemo(
    () =>
      new Array(pages).fill(null).map((_, i) => (
        <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageClick(i)}>
          {i + 1}
        </Pagination.Item>
      )),
    [currentPage, pages, onPageClick]
  )

  return (
    <div className={styles.TableWrapper}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={styles.IdColumn}>#</th>
            <th>Type</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onEdit={onTransactionEdit}
              onDelete={onTransactionDelete}
            />
          ))}
        </tbody>
      </Table>
      <div>
        <Pagination size='sm'>{paginationItems}</Pagination>
      </div>
    </div>
  )
}
