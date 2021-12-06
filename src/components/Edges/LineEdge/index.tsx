import { useContext, useMemo } from 'react';
import { context } from "src/store";
import Line from 'src/components/shapes/Line';

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

  if (!fromNode || !toNode) return null;

  return (
    <Line x1={fromNode.x} x2={toNode.x} y1={fromNode.y} y2={toNode.y} />
  )
}
