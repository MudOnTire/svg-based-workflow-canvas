import styles from './styles.module.scss';

type NodeActionsProps = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function NodeActions(props: NodeActionsProps) {
  // props
  const { x, y, width, height } = props;
  return (
    <foreignObject x={x} y={y} width={width} height={height}>
      <div className={styles.actions}>
        delete
      </div>
    </foreignObject>
  )
}

NodeActions.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
}
