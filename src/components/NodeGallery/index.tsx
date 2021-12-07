import Rect from 'src/components/shapes/Rect';
import Circle from 'src/components/shapes/Circle';
import { RECT_NODE_SIZE, CIRCLE_NODE_SIZE, NODE_STROKE_WIDTH } from 'src/utils/constants'

import styles from './styles.module.scss';

export default function NodeGallery() {
  return (
    <div className={styles.nodeGallery}>
      <div className={styles.node}>
        <svg
          width={RECT_NODE_SIZE.width + NODE_STROKE_WIDTH * 2}
          height={RECT_NODE_SIZE.height + NODE_STROKE_WIDTH * 2}
        >
          <Rect
            width={RECT_NODE_SIZE.width}
            height={RECT_NODE_SIZE.height}
            strokeWidth={NODE_STROKE_WIDTH}
          />
        </svg>
        <div>
          Rect node
        </div>
      </div>
      <div className={styles.node}>
        <svg
          width={CIRCLE_NODE_SIZE.radius * 2 + NODE_STROKE_WIDTH * 2}
          height={CIRCLE_NODE_SIZE.radius * 2 + NODE_STROKE_WIDTH * 2}
        >
          <Circle
            cx='50%'
            cy='50%'
            r={CIRCLE_NODE_SIZE.radius}
            strokeWidth={NODE_STROKE_WIDTH}
          />
        </svg>
        <div>
          Circle node
        </div>
      </div>
    </div>
  )
}
