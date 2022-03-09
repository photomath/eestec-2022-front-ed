import { Balance, CreateTransactionResponse, LoadTransactionsResponse, Transaction, TransactionType, User } from "../../shared/types";

export const MOCK_USER: User = {
  id: '1',
  email: 'mock.user@mockmail.com',
}

export const MOCK_BALANCE: Balance = {
  amount: "183.00",
}

export const MOCK_BALANCE_SHEET: Transaction[] = [
  { id: '1', type: TransactionType.Payment, date: new Date('2022-03-11'), amount: "200.00", description: "Allowance" },
  { id: '2', type: TransactionType.Expense, date: new Date('2022-03-11'), amount: "5.00", description: "Breakfast" },
  { id: '3', type: TransactionType.Expense, date: new Date('2022-03-11'), amount: "12.00", description: "Taxi" },
]

export const MOCK_CREATE_TRANSACTION_RESPONSE: CreateTransactionResponse = {
  id: '4', date: new Date('2022-03-11'), type: TransactionType.Expense, amount: "8.00", description: "Lunch"
}

export const MOCK_LOAD_TRANSACTIONS: LoadTransactionsResponse = {
  transactions: MOCK_BALANCE_SHEET,
  balance: MOCK_BALANCE,
  numberOfTransactions: 50,
}
