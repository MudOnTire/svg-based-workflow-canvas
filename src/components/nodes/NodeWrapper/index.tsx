import { useState, useCallback, useMemo, useEffect, ReactNode } from 'react'

import styles from './styles.module.scss';

type NodeWrapperProps = {
  children: ReactNode
}

export default function NodeWrapper(props: NodeWrapperProps) {
  // pros
  const { children } = props;

  // states
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseStartPosition, setMouseStartPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nodeLastPosition, setNodeLastPosition] = useState({ x: 0, y: 0 });

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

  const handleMouseUp = () => {
    setMouseDown(false);
    setNodeLastPosition({ x: nodePosition.x, y: nodePosition.y });
    setMouseStartPosition({ x: 0, y: 0 });
    setMousePosition({ x: 0, y: 0 });
  }

  const handleMouseMove = useCallback((e) => {
    if (!mouseDown) return;
    const { clientX, clientY } = e;
    setMousePosition({
      x: clientX,
      y: clientY
    });
  }, [mouseDown]);

  // effects
  useEffect(() => {
    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseDown]);

  return (
    <g
      className={styles.nodeWrapper}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        transform: `translate(${nodePosition.x}px, ${nodePosition.y}px)`
      }}
    >
      {children}
    </g>
  )
}
