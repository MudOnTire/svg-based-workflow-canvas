import { useCallback, useMemo, useState, useEffect } from 'react';
import Rect from 'src/components/shapes/Rect';
import Circle from 'src/components/shapes/Circle';
import useDrag from 'src/hooks/useDrag';

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
    return {
      x: 0,
      y: 0
    }
  }, [type, x, y, cx, cy, nodePosition]);

  const endCoordinate = useMemo(() => {
    return {
      x: startCoordinate.x + mouseDeltaPosition.x,
      y: startCoordinate.y + mouseDeltaPosition.y,
    }
  }, [startCoordinate, mouseDeltaPosition]);

  useEffect(() => {
    console.log('endCoordinate', endCoordinate);
  }, [endCoordinate]);

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
    </g>
  )
}
