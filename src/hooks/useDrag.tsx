import { useState, useCallback, useMemo, useEffect } from 'react'

function useDrag() {
  // states
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseStartPosition, setMouseStartPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // cached states
  const mouseDeltaPosition = useMemo(() => {
    const result = {
      x: mousePosition.x - mouseStartPosition.x,
      y: mousePosition.y - mouseStartPosition.y,
    }
    return result;
  }, [mouseStartPosition, mousePosition]);

  // actions
  /**
   * mouse down
   */
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

  /**
   * mouse move
   */
  const handleMouseMove = useCallback((e) => {
    if (!mouseDown) return;
    const { clientX, clientY } = e;
    setMousePosition({
      x: clientX,
      y: clientY
    });
  }, [mouseDown]);

  /**
   * mouse up
   */
  const handleMouseUp = useCallback((e) => {
    setMouseDown(false);
  }, []);

  // effects
  useEffect(() => {
    if (!mouseDown) {
      setMouseStartPosition({ x: 0, y: 0 });
      setMousePosition({ x: 0, y: 0 });
    }
  }, [mouseDown]);

  return {
    mouseDown,
    setMouseDown,
    mouseDeltaPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }
}

export default useDrag;