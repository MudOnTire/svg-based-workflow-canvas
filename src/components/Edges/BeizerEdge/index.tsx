import Line from 'src/components/shapes/Line';
import { useEdgeNodes } from 'src/hooks';

import { BaseEdgeProps } from '../BaseEdge';

export default function BezierEdge(props: BaseEdgeProps) {
  // props
  const { from, to } = props;
  const { fromNode, toNode, startPoint, endPoint } = useEdgeNodes(from, to);

  if (!fromNode || !toNode) return null;

  return (
    <Line x1={startPoint.x} x2={endPoint.x} y1={startPoint.y} y2={endPoint.y} />
  )
}
