import { useCallback, useMemo, useEffect } from 'react';
import Line from 'src/components/shapes/Line';
import { useDrag } from 'src/hooks';
import { IN_ANCHOR_SIZE } from 'src/utils/constants';
import In from './In';
import Out from './Out';

import styles from './styles.module.scss';

type AnchorProps = {
  type: 'in' | 'out';
  nodeId: string;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
}

export default function Anchor(props: AnchorProps) {
  // props
  const { type, x, y, cx, cy, nodeId } = props;
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
        x: typeof x === 'number' ? x + IN_ANCHOR_SIZE.width / 2 : 0,
        y: typeof y === 'number' ? y + IN_ANCHOR_SIZE.height / 2 : 0,
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
        type === 'in' && <In x={x} y={y} nodeId={nodeId} />
      }
      {
        type === 'out' && <Out cx={cx} cy={cy} nodeId={nodeId} />
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
