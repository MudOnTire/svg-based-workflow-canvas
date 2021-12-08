import Circle from 'src/components/shapes/Circle';
import { OUT_ANCHOR_SIZE, ANCHOR_FILL } from 'src/utils/constants';

type OutProps = {
  nodeId: string;
  cx?: number;
  cy?: number;
}

export default function Out(props: OutProps) {
  // props
  const { cx, cy } = props;

  return (
    <Circle
      cx={cx}
      cy={cy}
      r={OUT_ANCHOR_SIZE.radius}
      fill={ANCHOR_FILL}
      strokeWidth={10}
      stroke='transparent'
    />
  )
}
