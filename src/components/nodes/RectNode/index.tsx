import NodeWrapper from '../NodeWrapper';
import Rect from 'src/components/shapes/Rect';
import Anchor from 'src/components/Anchor';
import { BaseNodeProps } from '../BaseNode';

export default function RectNode(props: BaseNodeProps) {
  // props
  const { id, x, y } = props;

  return (
    <NodeWrapper x={x} y={y} id={id}>
      <Rect />
      <Anchor type="in" x={-4} y={30} />
      <Anchor type="out" cx={80} cy={40} />
    </NodeWrapper>
  )
}
