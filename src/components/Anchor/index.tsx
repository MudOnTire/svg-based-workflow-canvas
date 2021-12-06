import { useCallback, useMemo, MutableRefObject, useEffect } from 'react';
import Rect from 'src/components/shapes/Rect';
import Circle from 'src/components/shapes/Circle';

import styles from './styles.module.scss';

type AnchorProps = {
  type: 'in' | 'out',
  x?: number,
  y?: number,
  cx?: number,
  cy?: number,
  nodePosition?: { x: number, y: number },
}

const colors = {
  normal: 'rgb(125, 131, 143)'
}

export default function Anchor(props: AnchorProps) {
  // props
  const { type, x, y, cx, cy, nodePosition } = props;

  // cached states
  const coordinates = useMemo(() => {
    const translateX = nodePosition?.x || 0;
    const translateY = nodePosition?.y || 0;
    if (type === 'in') {
      return {
        x: translateX + (x || 0),
        y: translateY + (y || 0)
      }
    }
    if (type === 'out') {
      return {
        x: translateX + (cx || 0),
        y: translateY + (cy || 0)
      }
    }
  }, [type, x, y, cx, cy, nodePosition]);

  useEffect(() => {
    console.log("coordinates", coordinates);
  }, [coordinates]);

  // actions
  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <g className={styles.anchor} onMouseDown={handleMouseDown}>
      {
        type === 'in' &&
        <Rect
          x={x}
          y={y}
          width={8}
          height={20}
          rx={0}
          ry={0}
          fill={colors.normal}
          strokeWidth={0}
        />
      }
      {
        type === 'out' &&
        <Circle
          cx={cx}
          cy={cy}
          r={9}
          fill={colors.normal}
          strokeWidth={0}
        />
      }
    </g>
  )
}
