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
  const { dispatch, nodes, edges } = state;
  // refs
  const svgRef = useRef(null);
  // custom hooks
  const {
    mouseDown,
    setMouseDown,
    mouseDeltaPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  } = useDrag();

  // states
  const [lastTranslate, setLastTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  // cahce states
  const scrollOffsetTranslate = useMemo(() => {
    return {
      x: window.innerWidth / 2 * (1 - scale),
      y: window.innerHeight / 2 * (1 - scale)
    }
  }, [scale]);

  const translate = useMemo(() => {
    return {
      x: lastTranslate.x + mouseDeltaPosition.x + scrollOffsetTranslate.x,
      y: lastTranslate.y + mouseDeltaPosition.y + scrollOffsetTranslate.y
    }
  }, [lastTranslate, mouseDeltaPosition, scrollOffsetTranslate]);


  const transform = useMemo<TransformValues>(() => {
    const { x, y } = translate;
    return {
      scaleX: scale,
      scaleY: scale,
      skewX: 0,
      skewY: 0,
      translateX: x,
      translateY: y
    }
  }, [translate, scale]);

  // effects
  useEffect(() => {
    if (!mouseDown) {
      setLastTranslate({ x: translate.x - scrollOffsetTranslate.x, y: translate.y - scrollOffsetTranslate.y });
    }
  }, [mouseDown]);

  useEffect(() => {
    dispatch({
      type: actions.CANVAS_STORE_SET_TRANSFORM,
      payload: transform
    })
  }, [transform]);

  // actions
  const handleDrop = useCallback((e) => {
    const { clientX, clientY } = e;
    const data = e.dataTransfer.getData('text');
    try {
      const { nodeType } = JSON.parse(data);
      if (!nodeType) return;
      const position = roundGridPosition((clientX - translate.x) / scale, (clientY - translate.y) / scale);
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
  }, [translate, scale]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleWheel = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    const { deltaY } = e;
    setScale(old => {
      const newScale = old + (deltaY < 0 ? 0.1 : -0.1);
      if (newScale < 0.1) return old;
      return Number(newScale.toFixed(2));
    });
  }, []);

  return (
    <div
      className={`${styles.canvas} ${mouseDown ? styles.mouseDown : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={(e) => { setMouseDown(false) }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onWheel={handleWheel}
      onDoubleClick={() => {
        const config = { nodes, edges };
        console.log(JSON.stringify(config));
      }}
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