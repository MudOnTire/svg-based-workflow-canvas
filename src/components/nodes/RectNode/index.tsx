import NodeWrapper from '../NodeWrapper';
import Rect from 'src/components/shapes/Rect';
import Anchor from 'src/components/Anchor';
import { BaseNodeProps } from '../BaseNode';
import { RECT_NODE_SIZE, IN_ANCHOR_SIZE, NODE_STROKE_WIDTH } from 'src/utils/constants';

export default function RectNode(props: BaseNodeProps) {
  // props
  const { id, x, y } = props;

  return (
    <NodeWrapper x={x} y={y} id={id}>
      <Rect
        width={RECT_NODE_SIZE.width}
        height={RECT_NODE_SIZE.height}
        strokeWidth={NODE_STROKE_WIDTH}
      />
      <Anchor
        type="in"
        x={-IN_ANCHOR_SIZE.width / 2}
        y={(RECT_NODE_SIZE.height - IN_ANCHOR_SIZE.height) / 2}
      />
      <Anchor
        type="out"
        cx={RECT_NODE_SIZE.width}
        cy={RECT_NODE_SIZE.height / 2}
      />
    </NodeWrapper>
  )
}
