type PathProps = {
  d: string,
  fill: string,
  stroke?: string;
  strokeWidth?: number;
}

export default function Path(props: PathProps) {
  return <path {...props} />
}

Path.defaultProps = {
  d: '',
  fill: 'transparent',
  stroke: '#666',
  strokeWidth: 2
}