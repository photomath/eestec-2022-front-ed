import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  LoadTransactionsResponse,
  Transaction,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
} from "../../shared/types";
import { buildApiUrl } from "./utils";

export const createTransaction = async (createTransaction: CreateTransactionRequest): Promise<CreateTransactionResponse> => {
  const response = await fetch(
    buildApiUrl('transaction'),
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createTransaction),
      credentials: 'include',
    },
  )

  const json = await response.json()

  if (response.status !== 200) {
    throw new Error(json.message)
  } else {
    return {
      ...json,
      date: new Date(json.date),
    } as CreateTransactionResponse
  }
}

export const updateTransaction = async (updateTransaction: UpdateTransactionRequest): Promise<CreateTransactionResponse> => {
  const response = await fetch(
    buildApiUrl(`transaction/${updateTransaction.id}`),
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTransaction),
      credentials: 'include',
    },
  )

  const json = await response.json()

  if (response.status !== 200) {
    throw new Error(json.message)
  } else {
    return {
      ...json,
      date: new Date(json.date),
    } as UpdateTransactionResponse
  }
}

export const deleteTransaction = async (deleteTransaction: Transaction): Promise<void> => {
  const response = await fetch(
    buildApiUrl(`transaction/${deleteTransaction.id}`),
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    },
  )

  const json = await response.json()

  if (response.status !== 200) {
    throw new Error(json.message)
  }
}

export const ITEMS_PER_PAGE = 10

export const loadTransactions = async (page: number): Promise<LoadTransactionsResponse> => {
  const limit = ITEMS_PER_PAGE
  const offset = page * limit
  const response = await fetch(
    buildApiUrl(`transactions?limit=${limit}&offset=${offset}`),
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    },
  )

  const json = await response.json()

  if (response.status !== 200) {
    throw new Error(json.message)
  } else {
    return {
      ...json,
      transactions: json.transactions.map((t: Transaction) => ({ ...t, date: new Date(t.date) }))
    } as LoadTransactionsResponse
  }
}
