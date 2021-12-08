import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import ActionButton from './ActionButton';

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
    <foreignObject x={x} y={y} width={width} height={height} className='node-actions'>
      <div className={styles.actions}>
        <ActionButton>
          <FontAwesomeIcon icon={faTrashAlt} />
        </ActionButton>
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
