// =========
// = Login =
// =========

export type LoginRequest = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponse = {
  user: User
}

export type LoginFailure = {
  message: string
}

// ===========
// = Sign Up =
// ===========

export type SignupRequest = {
  email: string
  password: string
  confirmPassword: string
  rememberMe: boolean
}

export type SignUpResponse = LoginResponse

export type SignUpFailure = {
  message: string
}

// ===============
// = Transaction =
// ===============

export type CreateTransactionRequest = Omit<Transaction, 'id'>
export type UpdateTransactionRequest = Transaction
export type LoadTransactionsRequest = {
  limit: number,
  offset: number,
}

export type CreateTransactionResponse = Transaction
export type UpdateTransactionResponse = Transaction
export type CreateTransactionFailure = {
  message: string
}

export type LoadTransactionsResponse = {
  transactions: Transaction[]
  balance: Balance
  numberOfTransactions: number
}

// ==========
// = Models =
// ==========

export type User = {
  id: string
  email: string
}

export type Balance = {
  amount: string
}

export enum TransactionType {
  Payment = 'Payment',
  Expense = 'Expense',
}

export type Transaction = {
  id: string
  type: TransactionType
  date: Date
  amount: string
  description: string
}
