import { ReactNode, useCallback } from 'react'

import styles from './styles.module.scss';

type NodeProps = {
  children: ReactNode;
  type: string;
}

export default function Node(props: NodeProps) {
  // props
  const { children, type } = props;

  // actions
  const handleDragStart = useCallback((e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ nodeType: type }));
  }, [type]);

  return (
    <div
      className={styles.node}
      draggable={true}
      onDragStart={handleDragStart}
    >
      {children}
    </div>
  )
}
