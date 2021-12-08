import NodeWrapper from '../NodeWrapper';
import Circle from 'src/components/shapes/Circle';
import Anchor from 'src/components/Anchor';
import { BaseNodeProps } from '../BaseNode';
import { CIRCLE_NODE_SIZE, IN_ANCHOR_SIZE, NODE_STROKE_WIDTH } from 'src/utils/constants';
import NodeActions from 'src/components/Nodes/NodeActions';

export default function CircleNode(props: BaseNodeProps) {
  // props
  const { id, x, y } = props;

  return (
    <NodeWrapper x={x} y={y} id={id}>
      <NodeActions
        x={-CIRCLE_NODE_SIZE.radius}
        y={-30 - CIRCLE_NODE_SIZE.radius}
        width={CIRCLE_NODE_SIZE.radius * 2}
        height={30}
        nodeId={id}
      />
      <Circle r={CIRCLE_NODE_SIZE.radius} strokeWidth={NODE_STROKE_WIDTH} />
      <Anchor
        type="in"
        nodeId={id}
        x={-CIRCLE_NODE_SIZE.radius - IN_ANCHOR_SIZE.width / 2}
        y={-IN_ANCHOR_SIZE.height / 2} />
      <Anchor
        type="out"
        nodeId={id}
        cx={CIRCLE_NODE_SIZE.radius}
        cy={0}
      />
    </NodeWrapper>
  )
}
