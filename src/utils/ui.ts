import {
  RECT_NODE_SIZE,
  CIRCLE_NODE_SIZE,
  IN_ANCHOR_SIZE,
  OUT_ANCHOR_SIZE
} from 'src/utils/constants';

function getAnchorCoordinates(props: {
  nodeType: string | undefined,
  anchorType: string,
  nodeX: number,
  nodeY: number
}) {
  const { nodeType, anchorType, nodeX, nodeY } = props;
  if (nodeType === 'rect') {
    if (anchorType === 'in') {
      return {
        x: nodeX,
        y: nodeY + RECT_NODE_SIZE.height / 2
      }
    }
    if (anchorType === 'out') {
      return {
        x: nodeX + RECT_NODE_SIZE.width,
        y: nodeY + RECT_NODE_SIZE.height / 2
      }
    }
  }
  if (nodeType === 'circle') {
    if (anchorType === 'in') {
      return {
        x: nodeX - CIRCLE_NODE_SIZE.radius,
        y: nodeY
      }
    }
    if (anchorType === 'out') {
      return {
        x: nodeX + CIRCLE_NODE_SIZE.radius,
        y: nodeY
      }
    }
  }
  return { x: nodeX, y: nodeY }
}

export { getAnchorCoordinates }