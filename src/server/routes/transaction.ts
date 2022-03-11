import { CreateTransactionResponse, LoadTransactionsResponse, Transaction, TransactionType } from '../../shared/types'
import { logger } from '../logger'
import { TransactionModel } from '../models/Transaction'
import { RegisterRoute } from '../types'
import { protect } from '../util'


const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce((total, { type, amount }) => {
    return type === TransactionType.Expense
      ? total - parseFloat(amount)
      : total + parseFloat(amount)
  }, 0).toFixed(2)

}

export const registerTransactionRoutes: RegisterRoute = (app) => {
  app.get('/api/transactions', protect, async (req, res) => {
    const limit = Number.parseInt(req.query.limit as string ?? '10', 10)
    const offset = Number.parseInt(req.query.offset as string ?? '0', 10)
    try {
      const allTransactionsByMe = (await TransactionModel.find({ userId: req.session.userId }))
        .map((record): Transaction => ({
          id: record.id,
          type: record.type,
          date: record.date,
          amount: record.amount,
          description: record.description,
        }))
      const transactionsByMe = allTransactionsByMe.slice(offset, offset + limit)
        .map((record): Transaction => ({
          id: record.id,
          type: record.type,
          date: record.date,
          amount: record.amount,
          description: record.description,
        }))

      res.json({
        transactions: transactionsByMe,
        balance: {
          amount: calculateBalance(allTransactionsByMe)
        },
        numberOfTransactions: allTransactionsByMe.length,
      } as LoadTransactionsResponse)
    } catch (error) {
      res.status(500).send()
      logger.error(`[500] ${error}`)
    }
  })

  app.post('/api/transaction', protect, async (req, res) => {
    try {
      const { type, date, amount, description } = req.body

      const newTransaction = new TransactionModel({
        userId: req.session.userId,
        type,
        date,
        amount,
        description,
      })

      const savedTransaction = await newTransaction.save()

      res.json({
        id: savedTransaction.id,
        userId: req.session.userId,
        type: savedTransaction.type,
        date: savedTransaction.date,
        amount: savedTransaction.amount,
        description: savedTransaction.description,
      } as CreateTransactionResponse)
    } catch (error) {
      res.status(500).send()
      logger.error(`[500] ${error}`)
    }
  })

  app.put('/api/transaction/:id', protect, async (req, res) => {
    try {
      const id = req.params.id
      const { type, date, amount, description } = req.body

      const oldTransaction = await TransactionModel.findById(id)

      if (oldTransaction == null || String(oldTransaction.userId) !== req.session.userId!) {
        res.status(400).send()
        logger.error(`[400] Transaction not found`)
        return
      }

      oldTransaction.type = type
      oldTransaction.date = date
      oldTransaction.amount = amount
      oldTransaction.description = description

      const savedTransaction = await oldTransaction.save()

      res.json({
        id: savedTransaction.id,
        type: savedTransaction.type,
        date: savedTransaction.date,
        amount: savedTransaction.amount,
        description: savedTransaction.description,
      } as CreateTransactionResponse)
    } catch (error) {
      res.status(500).send()
      logger.error(`[500] ${error}`)
    }
  })

  app.delete('/api/transaction/:id', protect, async (req, res) => {
    try {
      const id = req.params.id

      const oldTransaction = await TransactionModel.findById(id)

      if (oldTransaction == null || String(oldTransaction.userId) !== req.session.userId!) {
        res.status(400).send()
        logger.error(`[400] Transaction not found`)
        return
      }

      await oldTransaction.delete()

      res.status(200).json({ id })
    } catch (error) {
      res.status(500).send()
      logger.error(`[500] ${error}`)
    }
  })
}
