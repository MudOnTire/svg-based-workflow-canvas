type CricleProps = {
  cx?: number;
  cy?: number;
  r?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export default function Circle(props: CricleProps) {
  return <circle {...props} />
}

Circle.defaultProps = {
  r: 45,
  fill: 'rgba(255,255,255,0.3)',
  stroke: '#666',
  strokeWidth: 2
}