import { CreateTransactionRequest, CreateTransactionResponse, LoadTransactionsResponse, Transaction, UpdateTransactionRequest } from "../../shared/types";
import { MOCK_CREATE_TRANSACTION_RESPONSE, MOCK_LOAD_TRANSACTIONS } from "./mocks";

export const createTransaction = async (_createTransaction: CreateTransactionRequest): Promise<CreateTransactionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CREATE_TRANSACTION_RESPONSE)
    }, 1000)
  })
}

export const updateTransaction = async (_updateTransaction: UpdateTransactionRequest): Promise<CreateTransactionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CREATE_TRANSACTION_RESPONSE)
    }, 1000)
  })
}

export const deleteTransaction = async (_transaction: Transaction): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export const loadTransactions = async (_page: number): Promise<LoadTransactionsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_LOAD_TRANSACTIONS)
    }, 1000)
  })
}
