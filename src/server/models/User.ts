import { Schema, model } from 'mongoose';
import { User as UserVM } from '../../shared/types';

type User = UserVM & {
  password: string
}

const schema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>('User', schema);
