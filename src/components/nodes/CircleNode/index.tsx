import NodeWrapper from '../NodeWrapper';
import Circle from 'src/components/shapes/Circle';
import Anchor from 'src/components/Anchor';
import { BaseNodeProps } from '../BaseNode';
import { CIRCLE_NODE_SIZE, IN_ANCHOR_SIZE } from 'src/utils/constants';

export default function CircleNode(props: BaseNodeProps) {
  // props
  const { id, x, y } = props;

  return (
    <NodeWrapper x={x} y={y} id={id}>
      <Circle r={CIRCLE_NODE_SIZE.radius} />
      <Anchor
        type="in"
        x={-CIRCLE_NODE_SIZE.radius - IN_ANCHOR_SIZE.width / 2}
        y={-IN_ANCHOR_SIZE.height / 2} />
      <Anchor
        type="out"
        cx={CIRCLE_NODE_SIZE.radius}
        cy={0}
      />
    </NodeWrapper>
  )
}
