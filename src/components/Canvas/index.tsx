import { ReactNode, useMemo, useState, useEffect, useRef, useCallback, useContext } from 'react';
import Transformer from 'src/components/Transformer';
import { TransformValues } from 'src/store/types';
import { useDrag } from 'src/hooks';
import Nodes from 'src/components/Nodes';
import Edges from 'src/components/Edges';
import { context, actions } from "src/store";
import { roundGridPosition } from 'src/utils/ui';

import styles from './styles.module.scss';

export type CanvasOptions = {
  children: ReactNode
}

export default function Canvas(props: CanvasOptions) {
  // props
  const { children } = props;
  // store
  const state = useContext(context);
  const { dispatch } = state;
  // refs
  const svgRef = useRef(null);
  // custom hooks
  const {
    mouseDown,
    mouseDeltaPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  } = useDrag();

  // states
  const [lastTranslate, setLastTranslate] = useState({ x: 0, y: 0 })
  // cahce states
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

  // effects
  useEffect(() => {
    if (!mouseDown) {
      setLastTranslate({ x: translate.x, y: translate.y });
    }
  }, [mouseDown]);

  // actions
  const handleDrop = useCallback((e) => {
    const { clientX, clientY } = e;
    const data = e.dataTransfer.getData('text');
    try {
      const { nodeType } = JSON.parse(data);
      if (!nodeType) return;
      const position = roundGridPosition(clientX - translate.x, clientY - translate.y);
      dispatch({
        type: actions.NODES_STORE_ADD_NODE,
        payload: {
          type: nodeType,
          x: position.x,
          y: position.y
        }
      })
    } catch (err) {
      console.log(err);
    }
  }, [translate]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div
      className={`${styles.canvas} ${mouseDown ? styles.mouseDown : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <svg width="100%" height="100%" ref={svgRef}>
        <Transformer transform={transform}>
          {children}
          <Nodes />
          <Edges />
        </Transformer>
      </svg>
    </div>
  )
}

Canvas.defaultProps = {
  children: null
}