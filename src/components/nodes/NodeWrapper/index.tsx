import { useState, useCallback, useMemo, useEffect, ReactNode, useRef } from 'react'
import useDrag from 'src/hooks/useDrag';

import styles from './styles.module.scss';

type NodeWrapperProps = {
  children: ReactNode;
  x?: number;
  y?: number;
  onNodeMove?: (x: number, y: number) => void;
}

function NodeWrapper(props: NodeWrapperProps) {
  // pros
  const { children, x, y, onNodeMove } = props;
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
  const nodePosition = useMemo(() => {
    return {
      x: (nodeLastPosition?.x || 0) + mouseDeltaPosition.x,
      y: (nodeLastPosition?.y || 0) + mouseDeltaPosition.y
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
    setNodeLastPosition({ x: lastNodeX, y: lastNodeY });
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
    if (typeof onNodeMove === 'function') {
      onNodeMove(x, y);
    }
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