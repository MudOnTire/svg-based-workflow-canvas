import { useCallback, useMemo, useEffect } from 'react';
import Rect from 'src/components/shapes/Rect';
import Circle from 'src/components/shapes/Circle';
import Line from 'src/components/shapes/Line';
import useDrag from 'src/hooks/useDrag';

import styles from './styles.module.scss';

type AnchorProps = {
  type: 'in' | 'out';
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
}

const colors = {
  normal: 'rgb(125, 131, 143)'
}

export default function Anchor(props: AnchorProps) {
  // props
  const { type, x, y, cx, cy } = props;
  // custom hook
  const {
    mouseDown,
    mouseDeltaPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  } = useDrag();
  // cached states
  const startCoordinate = useMemo(() => {
    if (type === 'in') {
      return {
        x: typeof x === 'number' ? x + 4 : 0,
        y: typeof y === 'number' ? y + 10 : 0,
      }
    }
    if (type === 'out') {
      return {
        x: cx || 0,
        y: cy || 0
      }
    }
    return {
      x: 0,
      y: 0
    }
  }, [type, x, y, cx, cy]);

  const endCoordinate = useMemo(() => {
    return {
      x: startCoordinate.x + mouseDeltaPosition.x,
      y: startCoordinate.y + mouseDeltaPosition.y,
    }
  }, [startCoordinate, mouseDeltaPosition]);

  const showLinkLine = useMemo(() => {
    const x = endCoordinate.x - startCoordinate.x;
    const y = endCoordinate.y - startCoordinate.y;
    return Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2) > 100;
  }, [startCoordinate, endCoordinate]);

  // mouse actions
  const selfHandleMouseUp = useCallback((e) => {
    handleMouseUp(e);
  }, []);

  // effects
  useEffect(() => {
    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', selfHandleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', selfHandleMouseUp);
      }
    }
  }, [mouseDown]);

  return (
    <g
      className={styles.anchor}
      onMouseDown={handleMouseDown}
    >
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
      {
        showLinkLine &&
        <Line
          x1={startCoordinate.x}
          y1={startCoordinate.y}
          x2={endCoordinate.x}
          y2={endCoordinate.y}
        />
      }
    </g>
  )
}
