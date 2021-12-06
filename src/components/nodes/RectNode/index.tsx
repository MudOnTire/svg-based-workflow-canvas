import { useState } from 'react';
import NodeWrapper from '../NodeWrapper';
import Rect from 'src/components/shapes/Rect';
import Anchor from 'src/components/Anchor';
import { BaseNodeProps } from '../BaseNode';

export default function RectNode(props: BaseNodeProps) {
  // state
  const [nodePosition, setNodePosition] = useState({ x: 0, y: 0 });

  // actions
  const handleNodeMove = (x: number, y: number) => {
    setNodePosition({ x, y });
  }

  return (
    <NodeWrapper onNodeMove={handleNodeMove}>
      <Rect />
      <Anchor type="in" x={-4} y={30} nodePosition={nodePosition} />
      <Anchor type="out" cx={80} cy={40} nodePosition={nodePosition} />
    </NodeWrapper>
  )
}
