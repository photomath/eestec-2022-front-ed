import { formatMoney } from '../../../shared/formatters'
import { Balance, User } from '../../../shared/types'

import styles from './UserBalance.module.css'

type UserBalanceProps = {
  user: User
  balance: Balance
}

export const UserBalance: React.FC<UserBalanceProps> = ({ user, balance }) => {
  return (
    <div className={styles.UserBalanceWrapper}>
      <div className={styles.UserBalance}>
        <div>
          <h2>{user.email}</h2>
        </div>
        <div className={styles.BalanceAmount}>
          <h4>Balance: {formatMoney(balance.amount)}</h4>
        </div>
      </div>
    </div>
  )
}
