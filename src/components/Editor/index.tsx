import styles from './styles.module.scss';
import Canvas from 'src/components/Canvas';
import CanvasGrid from 'src/components/CanvasGrid';
import NodeGallery from 'src/components/NodeGallery';

export default function Editor() {
  return (
    <div className={styles.editor}>
      <Canvas />
      <CanvasGrid />
      <NodeGallery />
    </div>
  )
}
