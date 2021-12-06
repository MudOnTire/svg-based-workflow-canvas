import { ReactNode, useMemo } from 'react';
import { TransformValues } from 'src/store/types';

import styles from './styles.module.scss';

type TransformerProps = {
  children: ReactNode,
  transform: TransformValues
}

export default function Transformer(props: TransformerProps) {
  // props
  const { children, transform } = props;
  // cached states
  const transformStr = useMemo(() => {
    const { scaleX, scaleY, skewX, skewY, translateX, translateY } = transform;
    const matrix = [scaleX, skewY, skewX, scaleY, translateX, translateY].join(',');
    return `matrix(${matrix})`;
  }, [transform]);

  return (
    <g className={styles.transformer} transform={transformStr}>
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