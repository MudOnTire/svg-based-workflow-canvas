import { ReactNode } from 'react';
import RectNode from 'src/components/nodes/RectNode';
import CircleNode from 'src/components/nodes/CircleNode';

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
        <RectNode />
        <CircleNode />
      </svg>
    </div>
  )
}

Canvas.defaultProps = {
  children: null
}