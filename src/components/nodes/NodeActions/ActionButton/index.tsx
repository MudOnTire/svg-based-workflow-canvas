import { ReactEventHandler, ReactNode } from 'react';

import styles from './styles.module.scss';

type ActionButtonProps = {
  children: ReactNode
  onClick: ReactEventHandler
}

export default function ActionButton(props: ActionButtonProps) {
  // props
  const { children, onClick } = props;

  return (
    <div className={styles.actionButton} onClick={onClick}>
      {children}
    </div>
  )
}

ActionButton.defaultProps = {
  children: null,
  onClick: () => { }
}
