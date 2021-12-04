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
  cx: '50%',
  cy: '50%',
  r: 45,
  fill: 'rgba(255,255,255,0.3)',
  stroke: '#000',
  strokeWidth: 1
}