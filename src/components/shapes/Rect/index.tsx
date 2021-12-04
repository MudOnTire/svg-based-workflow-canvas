type RectProps = {
  x?: number;
  y?: number;
  rx?: number;
  ry?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export default function Rect(props: RectProps) {
  return <rect {...props} />
}

Rect.defaultProps = {
  x: '50%',
  y: '50%',
  rx: 0,
  ry: 0,
  width: 80,
  height: 80,
  fill: 'rgba(255,255,255,0.3)',
  stroke: '#000',
  strokeWidth: 1
}