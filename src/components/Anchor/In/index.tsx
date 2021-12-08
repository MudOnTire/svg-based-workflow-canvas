import Rect from 'src/components/shapes/Rect';
import { IN_ANCHOR_SIZE, ANCHOR_FILL } from 'src/utils/constants';

type InProps = {
  nodeId: string;
  x?: number;
  y?: number;
}

export default function In(props: InProps) {
  // props
  const { x, y } = props;

  return (
    <Rect
      x={x}
      y={y}
      width={IN_ANCHOR_SIZE.width}
      height={IN_ANCHOR_SIZE.height}
      rx={0}
      ry={0}
      fill={ANCHOR_FILL}
      strokeWidth={10}
      stroke='transparent'
    />
  )
}
