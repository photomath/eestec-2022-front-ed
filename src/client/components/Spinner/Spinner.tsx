import { Spinner as SpinnerBase } from 'react-bootstrap'

import styles from './Spinner.module.css'

export const Spinner: React.FC<{}> = () => (
  <div className={styles.SpinnerWrapper} data-testid='spinner'>
    <SpinnerBase animation='border' />
  </div>
)
