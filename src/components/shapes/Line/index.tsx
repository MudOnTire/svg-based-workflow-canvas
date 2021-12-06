type LineProps = {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  stroke?: string;
  strokeWidth?: number;
}

export default function Line(props: LineProps) {
  return <line {...props} />
}

Line.defaultProps = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  stroke: '#666',
  strokeWidth: 2
}