import { ReactNode, useCallback, useMemo, useState, useEffect } from 'react';
import RectNode from 'src/components/nodes/RectNode';
import CircleNode from 'src/components/nodes/CircleNode';
import Transformer from './Transformer';
import { TransformValues } from 'src/store/types';

import styles from './styles.module.scss';

export type CanvasOptions = {
  children: ReactNode
}

export default function Canvas(props: CanvasOptions) {
  // props
  const { children } = props
  // states
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseStartPosition, setMouseStartPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lastTranslate, setLastTranslate] = useState({ x: 0, y: 0 })
  // cahce states
  const mouseDeltaPosition = useMemo(() => {
    return {
      x: mousePosition.x - mouseStartPosition.x,
      y: mousePosition.y - mouseStartPosition.y
    }
  }, [mouseStartPosition, mousePosition]);

  const translate = useMemo(() => {
    return {
      x: lastTranslate.x + mouseDeltaPosition.x,
      y: lastTranslate.y + mouseDeltaPosition.y
    }
  }, [lastTranslate, mouseDeltaPosition]);

  const transform = useMemo<TransformValues>(() => {
    const { x, y } = translate;
    return {
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
      translateX: x,
      translateY: y
    }
  }, [translate]);

  // actions
  const handleMouseDown = useCallback((e) => {
    const { clientX, clientY } = e;
    setMouseDown(true);
    setMouseStartPosition({ x: clientX, y: clientY });
    setMousePosition({ x: clientX, y: clientY });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!mouseDown) return;
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  }, [mouseDown]);

  const handleMouseUp = useCallback((e) => {
    setMouseDown(false);
  }, []);

  // effects
  useEffect(() => {
    if (!mouseDown) {
      setLastTranslate({ x: translate.x, y: translate.y });
      setMouseStartPosition({ x: 0, y: 0 });
      setMousePosition({ x: 0, y: 0 });
    }
  }, [mouseDown]);

  return (
    <div
      className={styles.canvas}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <svg width="100%" height="100%">
        <Transformer transform={transform}>
          {children}
          <RectNode />
          <CircleNode />
        </Transformer>
      </svg>
    </div>
  )
}

Canvas.defaultProps = {
  children: null
}