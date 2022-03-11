import { Schema, ObjectId, model } from 'mongoose';
import { Transaction as TransactionVM, TransactionType } from '../../shared/types';

type Transaction = TransactionVM & {
  userId: ObjectId
}

const schema = new Schema<Transaction>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: [TransactionType.Expense, TransactionType.Payment], required: true },
  date: { type: Date, required: true },
  amount: { type: String, required: true },
  description: { type: String, required: true },
});

export const TransactionModel = model<Transaction>('Transaction', schema);
