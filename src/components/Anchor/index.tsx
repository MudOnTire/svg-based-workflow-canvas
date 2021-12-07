import { useCallback, useMemo, useEffect, useContext } from 'react';
import Line from 'src/components/shapes/Line';
import { useDrag } from 'src/hooks';
import { IN_ANCHOR_SIZE } from 'src/utils/constants';
import In from './In';
import Out from './Out';
import { context, actions } from "src/store";

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
  // store
  const state = useContext(context);
  const { dispatch, pendingEdge, transform } = state;
  // custom hook
  const {
    mouseDown,
    mouseDeltaPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  } = useDrag();
  // cached states
  const scale = useMemo(() => {
    return transform.scaleX;
  }, [transform]);

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
      x: startCoordinate.x + (mouseDeltaPosition.x / scale),
      y: startCoordinate.y + (mouseDeltaPosition.y / scale),
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

  const handleAnchorMouseUp = useCallback((e) => {
    if (type === 'in' && pendingEdge?.from && pendingEdge?.from !== nodeId) {
      dispatch({
        type: actions.NODES_STORE_ADD_EDGE,
        payload: {
          from: pendingEdge.from,
          to: nodeId
        }
      });
    }
    if (type === 'out' && pendingEdge?.to && pendingEdge.to !== nodeId) {
      dispatch({
        type: actions.NODES_STORE_ADD_EDGE,
        payload: {
          from: nodeId,
          to: pendingEdge.to
        }
      });
    }
    dispatch({
      type: actions.CANVAS_STORE_SET_PENDING_EDGE,
      payload: null
    });

  }, [type, pendingEdge]);

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

  useEffect(() => {
    const payload = showLinkLine ?
      {
        from: type === 'out' ? nodeId : null,
        to: type === 'in' ? nodeId : null,
      }
      :
      null;
    dispatch({
      type: actions.CANVAS_STORE_SET_PENDING_EDGE,
      payload
    });
  }, [showLinkLine]);

  return (
    <g
      className={styles.anchor}
      onMouseDown={handleMouseDown}
      onMouseUp={handleAnchorMouseUp}
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
