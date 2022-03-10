import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Navbar } from 'react-bootstrap'
import { FaDollarSign, FaPlus, FaPowerOff } from 'react-icons/fa'

import { Balance, Transaction, User } from '../../../shared/types'
import { ITEMS_PER_PAGE, loadTransactions } from '../../api/transaction'
import { Spinner } from '../../components/Spinner'
import { DeleteTransactionDialog, TransactionFormModal } from '../../components/TransactionForm'
import { TransactionTable } from '../../components/TransactionTable'
import { UserBalance } from '../../components/UserBalance'
import { usePrevious } from './utils'
import styles from './Dashboard.module.css'

type DashboardProps = {
  user: User
  onLogout: () => void
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [balance, setBalance] = useState<Balance>({ amount: '/' })
  const [totalTransactions, setTotalTransactions] = useState<number>(0)
  const [transactions, setTransactions] = useState<Transaction[]>()
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()
  const [showCreateTransactionModal, setShowCreateTransactionModal] = useState(false)
  const [editTransaction, setEditTransaction] = useState<Transaction>()
  const [showDeleteTransactionModal, setShowDeleteTransactionModal] = useState(false)
  const [deleteTransaction, setDeleteTransaction] = useState<Transaction>()

  const prevPage = usePrevious(page)
  const pages = useMemo(() => Math.ceil(totalTransactions / ITEMS_PER_PAGE), [totalTransactions])

  const loadData = useCallback(async (page: number) => {
    setError(undefined)
    setLoading(true)

    try {
      const response = await loadTransactions(page)

      setBalance(response.balance)
      setTotalTransactions(response.numberOfTransactions)
      setTransactions(response.transactions)
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData(0)
  }, [loadData])

  useEffect(() => {
    if (page !== prevPage) {
      loadData(page)
    }
  }, [page, prevPage, loadData])

  const showCreate = useCallback(() => {
    setShowCreateTransactionModal(true)
  }, [])

  const showEdit = useCallback((transaction: Transaction) => {
    setEditTransaction(transaction)
    setShowCreateTransactionModal(true)
  }, [])

  const hideModal = useCallback(
    (shouldLoadData: boolean = false) => {
      setEditTransaction(undefined)
      setShowCreateTransactionModal(false)
      if (shouldLoadData) {
        loadData(page)
      }
    },
    [loadData, page]
  )

  const showDelete = useCallback((transaction: Transaction) => {
    setDeleteTransaction(transaction)
    setShowDeleteTransactionModal(true)
  }, [])

  const hideDelete = useCallback(
    (shouldLoadData: boolean = false) => {
      setDeleteTransaction(undefined)
      setShowDeleteTransactionModal(false)
      if (shouldLoadData) {
        loadData(page)
      }
    },
    [loadData, page]
  )

  const logout = useCallback(() => {
    setLoading(true)
    onLogout()
  }, [onLogout])

  return (
    <div className={styles.Dashboard}>
      {loading && <Spinner />}
      <Navbar className={styles.Navbar}>
        <h3>
          <FaDollarSign />
          {'\u00A0'}
          <Navbar.Brand href='/'>Personal balance sheet</Navbar.Brand>
        </h3>
        <Button onClick={logout}>
          <FaPowerOff /> Logout
        </Button>
      </Navbar>
      <UserBalance user={user} balance={balance} />
      <div>
        <Button onClick={showCreate}>
          <FaPlus /> Add transaction
        </Button>
      </div>
      {error && (
        <Alert className={styles.Alert} variant='danger'>
          {error.message}
        </Alert>
      )}
      <TransactionTable
        currentPage={page}
        pages={pages}
        transactions={transactions ?? []}
        onPageClick={setPage}
        onTransactionEdit={showEdit}
        onTransactionDelete={showDelete}
      />

      <TransactionFormModal show={showCreateTransactionModal} transaction={editTransaction} onHide={hideModal} />

      <DeleteTransactionDialog
        show={showDeleteTransactionModal && deleteTransaction != null}
        transaction={deleteTransaction!}
        onHide={hideDelete}
      />
    </div>
  )
}
