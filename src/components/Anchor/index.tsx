import Rect from 'src/components/shapes/Rect';
import Circle from 'src/components/shapes/Circle';

import styles from './styles.module.scss';

type AnchorProps = {
  type: 'in' | 'out',
  x?: number,
  y?: number,
  cx?: number,
  cy?: number,
}

const colors = {
  normal: 'rgb(125, 131, 143)'
}

export default function Anchor(props: AnchorProps) {
  // props
  const { type, x, y, cx, cy } = props;

  return (
    <g className={styles.anchor}>
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
        />
      }
      {
        type === 'out' &&
        <Circle
          cx={cx}
          cy={cy}
          r={9}
          fill={colors.normal}
        />
      }
    </g>
  )
}
