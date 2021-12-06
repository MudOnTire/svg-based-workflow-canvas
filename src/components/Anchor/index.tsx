import Rect from 'src/components/shapes/Rect';

type AnchorProps = {
  type: 'in' | 'out',
  x?: number,
  y?: number,
}

export default function Anchor(props: AnchorProps) {
  // props
  const { type, x, y } = props;

  return (
    <>
      {
        type === 'in' &&
        <Rect
          x={x}
          y={y}
          width={8}
          height={20}
          rx={0}
          ry={0}
          fill='rgb(125, 131, 143)'
        />
      }

    </>
  )
}
