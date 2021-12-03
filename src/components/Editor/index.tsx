import styles from './styles.module.scss';
import CanvasGrid from 'src/components/CanvasGrid';

export default function Editor() {
  return (
    <div className={styles.editor}>
      <CanvasGrid />
    </div>
  )
}
