import { useMemo, ReactNode } from 'react';
import { CANVAS_GRID_PATTERN_ID } from 'src/utils/constants';
import styles from './styles.module.scss';

export type CanvasGridOptions = {
  size?: number;
  thickness?: number;
  visible?: boolean;
  color?: string;
  // type?: 'dot' | 'mesh';
  type?: 'dot'
}

export default function CanvasGrid(props: CanvasGridOptions) {
  const { size, thickness, visible, color, type } = props;

  const content: ReactNode = useMemo(() => {
    if (!visible) return null;
    if (typeof size !== 'number' || size <= 0) return null;
    if (typeof thickness !== 'number' || thickness <= 0) return null;
    if (type === 'dot') {
      const length = Math.min(Math.max(2, thickness), size / 2);
      return (
        <rect
          // x={size / 2}
          // y={size / 2}
          width={length}
          height={length}
          rx={length / 2}
          ry={length / 2}
          fill={color}
        />
      );
    }
    return null;
  }, [props]);

  return (
    <div className={styles.canvasGrid}>
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id={CANVAS_GRID_PATTERN_ID}
            patternUnits="userSpaceOnUse"
            // patternTransform={transform}
            x="0"
            y="0"
            width={size}
            height={size}
            style={{ transition: 'all 0.1s' }}
          >
            {content}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${CANVAS_GRID_PATTERN_ID})`} />
      </svg>
    </div>
  )
}

CanvasGrid.defaultProps = {
  size: 20,
  thickness: 2,
  visible: true,
  type: 'dot',
  color: '#ababab'
}