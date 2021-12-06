import { useState, useCallback, useMemo, useEffect, ReactNode, createRef, useRef } from 'react'

import styles from './styles.module.scss';

type NodeWrapperProps = {
  children: ReactNode
}

export default function NodeWrapper(props: NodeWrapperProps) {
  // pros
  const { children } = props;
  // refs
  const node = useRef(null);

  // states
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseStartPosition, setMouseStartPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nodeLastPosition, setNodeLastPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // cached states
  const mouseDeltaPosition = useMemo(() => {
    const result = {
      x: mousePosition.x - mouseStartPosition.x,
      y: mousePosition.y - mouseStartPosition.y,
    }
    return result;
  }, [mouseStartPosition, mousePosition]);

  const nodePosition = useMemo(() => {
    return {
      x: nodeLastPosition.x + mouseDeltaPosition.x,
      y: nodeLastPosition.y + mouseDeltaPosition.y
    }
  }, [nodeLastPosition, mouseDeltaPosition]);


  // mouse actions
  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();
    setMouseDown(true);
    const { clientX, clientY } = e;
    setMouseStartPosition({
      x: clientX,
      y: clientY
    });
    setMousePosition({
      x: clientX,
      y: clientY
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!mouseDown) return;
    const { clientX, clientY } = e;
    setMousePosition({
      x: clientX,
      y: clientY
    });
  }, [mouseDown]);

  const handleMouseUp = useCallback(() => {
    if (!node.current) return;
    // lastest nodePosition states won't be fetched, use data-x instead
    const nodeEl = node.current as HTMLElement;
    const lastNodeX = nodeEl.dataset.x ? parseInt(nodeEl.dataset.x) : 0;
    const lastNodeY = nodeEl.dataset.y ? parseInt(nodeEl.dataset.y) : 0;
    setMouseDown(false);
    setNodeLastPosition({ x: lastNodeX, y: lastNodeY });
    setMouseStartPosition({ x: 0, y: 0 });
    setMousePosition({ x: 0, y: 0 });
  }, [nodePosition]);

  // effects
  useEffect(() => {
    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
    }
  }, [mouseDown]);

  return (
    <g
      x='50%'
      y='50%'
      ref={node}
      data-x={nodePosition.x}
      data-y={nodePosition.y}
      className={styles.nodeWrapper}
      onMouseDown={handleMouseDown}
      style={{
        transform: `translate(${nodePosition.x}px, ${nodePosition.y}px)`
      }}
    >
      {children}
    </g>
  )
}
