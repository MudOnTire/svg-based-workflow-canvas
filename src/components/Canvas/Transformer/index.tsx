import { ReactNode } from 'react';
import { TransformValues } from 'src/store/types';

import styles from './styles.module.scss';

type TransformerProps = {
  children: ReactNode,
  transform: TransformValues
}

export default function Transformer(props: TransformerProps) {
  // props
  const { children, transform } = props;
  return (
    <g className={styles.transformer}>
      {children}
    </g>
  )
}

Transformer.defaultProps = {
  children: null,
  transform: {
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0
  }
}