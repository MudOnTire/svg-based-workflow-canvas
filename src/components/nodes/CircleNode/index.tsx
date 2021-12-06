import NodeWrapper from '../NodeWrapper';
import Circle from 'src/components/shapes/Circle';
import Anchor from 'src/components/Anchor';
import { BaseNodeProps } from '../BaseNode';

export default function CircleNode(props: BaseNodeProps) {
  // props
  const { id, x, y } = props;

  return (
    <NodeWrapper x={x} y={y} id={id}>
      <Circle />
      <Anchor type="in" x={-49} y={-10} />
      <Anchor type="out" cx={45} cy={0} />
    </NodeWrapper>
  )
}
