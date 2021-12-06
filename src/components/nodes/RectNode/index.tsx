import NodeWrapper from '../NodeWrapper';
import Rect from 'src/components/shapes/Rect';
import Anchor from 'src/components/Anchor';

export default function RectNode() {
  return (
    <NodeWrapper>
      <Rect />
      <Anchor type="in" x={-4} y={30} />
      <Anchor type="out" cx={80} cy={40} />
    </NodeWrapper>
  )
}
