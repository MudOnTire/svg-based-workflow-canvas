import { useContext, useMemo } from 'react';
import { context } from "src/store";
import Line from 'src/components/shapes/Line';
import { getAnchorCoordinates } from 'src/utils/ui';

import { BaseEdgeProps } from '../BaseEdge';

export default function LineEdge(props: BaseEdgeProps) {
  // props
  const { from, to } = props;
  // store
  const state = useContext(context);
  const { nodes } = state;

  const fromNode = useMemo(() => {
    return nodes.find(n => n.id === from);
  }, [from, nodes]);

  const toNode = useMemo(() => {
    return nodes.find(n => n.id === to);
  }, [to, nodes]);

  const startPoint = useMemo(() => {
    return getAnchorCoordinates({
      nodeType: fromNode?.type,
      anchorType: 'out',
      nodeX: fromNode?.x || 0,
      nodeY: fromNode?.y || 0,
    })
  }, [fromNode]);

  const endPoint = useMemo(() => {
    return getAnchorCoordinates({
      nodeType: toNode?.type,
      anchorType: 'in',
      nodeX: toNode?.x || 0,
      nodeY: toNode?.y || 0,
    })
  }, [toNode]);

  if (!fromNode || !toNode) return null;

  return (
    <Line x1={startPoint.x} x2={endPoint.x} y1={startPoint.y} y2={endPoint.y} />
  )
}
