import { useCallback, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import ActionButton from './ActionButton';
import { context, actions } from "src/store";

import styles from './styles.module.scss';

type NodeActionsProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  nodeId: string;
}

export default function NodeActions(props: NodeActionsProps) {
  // props
  const { x, y, width, height, nodeId } = props;
  // store
  const state = useContext(context);
  const { dispatch } = state;
  // actions
  const deleteNode = useCallback((e) => {
    dispatch({
      type: actions.NODES_STORE_DELETE_NODE,
      payload: { id: nodeId },
    })
  }, []);

  return (
    <foreignObject x={x} y={y} width={width} height={height} className='node-actions'>
      <div className={styles.actions}>
        <ActionButton onClick={deleteNode}>
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
