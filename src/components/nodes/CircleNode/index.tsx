import NodeWrapper from '../NodeWrapper';
import Circle from 'src/components/shapes/Circle';
import Anchor from 'src/components/Anchor';

export default function CircleNode() {
  return (
    <NodeWrapper>
      <Circle />
      <Anchor type="in" x={-49} y={-10} />
      <Anchor type="out" cx={45} cy={0} />
    </NodeWrapper>
  )
}
