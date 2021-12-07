import { useState, useCallback, useMemo, useEffect, ReactNode, useRef, useContext } from 'react'
import { useDrag } from 'src/hooks';
import { context, actions } from "src/store";
import { roundGridPosition } from 'src/utils/ui';

import styles from './styles.module.scss';

type NodeWrapperProps = {
  children: ReactNode;
  id: string;
  x?: number;
  y?: number;
}

function NodeWrapper(props: NodeWrapperProps) {
  // pros
  const { children, id, x, y } = props;
  // store
  const state = useContext(context);
  const { dispatch, transform } = state;
  // ref
  const node = useRef(null);
  // custom hooks
  const {
    mouseDown,
    mouseDeltaPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  } = useDrag();

  // states
  const [nodeLastPosition, setNodeLastPosition] = useState({ x, y });

  // cached states
  const scale = useMemo(() => {
    return transform.scaleX;
  }, [transform]);

  const nodePosition = useMemo(() => {
    return {
      x: (nodeLastPosition?.x || 0) + mouseDeltaPosition.x / scale,
      y: (nodeLastPosition?.y || 0) + mouseDeltaPosition.y / scale
    }
  }, [nodeLastPosition, mouseDeltaPosition]);

  // mouse actions
  const selfHandleMouseUp = useCallback((e) => {
    handleMouseUp(e);
    if (!node?.current) return;
    // lastest nodePosition states won't be fetched, use data-x instead
    const nodeEl = node.current as HTMLElement;
    const lastNodeX = nodeEl.dataset.x ? parseInt(nodeEl.dataset.x) : 0;
    const lastNodeY = nodeEl.dataset.y ? parseInt(nodeEl.dataset.y) : 0;
    const { x, y } = roundGridPosition(lastNodeX, lastNodeY);
    setNodeLastPosition({ x, y });
  }, [nodePosition]);

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
    const { x, y } = nodePosition;
    dispatch({
      type: actions.NODES_STORE_UPDATE_NODE,
      payload: {
        id,
        x,
        y
      }
    });
  }, [nodePosition.x, nodePosition.y]);

  return (
    <g
      ref={node}
      data-x={nodePosition.x}
      data-y={nodePosition.y}
      className={`${styles.nodeWrapper} ${mouseDown ? styles.mouseDown : ''}`}
      onMouseDown={handleMouseDown}
      style={{
        transform: `translate(${nodePosition.x}px, ${nodePosition.y}px)`
      }}
    >
      {children}
    </g>
  )
}

NodeWrapper.defaultProps = {
  children: null,
  x: 0,
  y: 0,
  onNodeMove: () => { }
}

export default NodeWrapper;