import { useMemo } from 'react';
import Path from 'src/components/shapes/Path';
import { useEdgeNodes } from 'src/hooks';

import { BaseEdgeProps } from '../BaseEdge';

export default function BezierEdge(props: BaseEdgeProps) {
  // props
  const { from, to } = props;
  const { fromNode, toNode, startPoint, endPoint } = useEdgeNodes(from, to);
  const path = useMemo(() => {
    const dx = endPoint.x - startPoint.x;
    const stepX = Math.round(dx / 4);
    return `M ${startPoint.x} ${startPoint.y} C ${endPoint.x - stepX} ${startPoint.y}, ${startPoint.x + stepX} ${endPoint.y}, ${endPoint.x} ${endPoint.y}`;
  }, [startPoint, endPoint]);

  if (!fromNode || !toNode) return null;

  return (
    <Path d={path} />
  )
}
