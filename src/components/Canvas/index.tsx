import { ReactNode } from 'react';
import Rect from 'src/components/shapes/Rect';

import styles from './styles.module.scss';

export type CanvasOptions = {
  children: ReactNode
}

export default function Canvas(props: CanvasOptions) {
  const { children } = props

  return (
    <div className={styles.canvas}>
      <svg width="100%" height="100%">
        {children}
        <Rect />
      </svg>
    </div>
  )
}

Canvas.defaultProps = {
  children: null
}