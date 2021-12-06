import { useState } from 'react';
import NodeWrapper from '../NodeWrapper';
import Circle from 'src/components/shapes/Circle';
import Anchor from 'src/components/Anchor';
import { BaseNodeProps } from '../BaseNode';

export default function CircleNode(props: BaseNodeProps) {
  // props
  const { x, y } = props;
  // state
  const [nodePosition, setNodePosition] = useState({ x: 0, y: 0 });

  // actions
  const handleNodeMove = (x: number, y: number) => {
    setNodePosition({ x, y });
  }

  return (
    <NodeWrapper onNodeMove={handleNodeMove} x={x} y={y}>
      <Circle />
      <Anchor type="in" x={-49} y={-10} nodePosition={nodePosition} />
      <Anchor type="out" cx={45} cy={0} nodePosition={nodePosition} />
    </NodeWrapper>
  )
}
