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
  rx: 4,
  ry: 4,
  width: 80,
  height: 80,
  fill: 'rgba(255,255,255,0.3)',
  stroke: '#666',
  strokeWidth: 2
}