import { useContext, useMemo } from 'react';
import { context } from "src/store";
import { getAnchorCoordinates } from 'src/utils/ui';

/**
 * Get from/to nodes of an edge, and it's start and end points coordinates.
 */
function useEdgeNodes(fromNodeId: string, toNodeId: string) {
  // store
  const state = useContext(context);
  const { nodes } = state;

  const fromNode = useMemo(() => {
    return nodes.find(n => n.id === fromNodeId);
  }, [fromNodeId, nodes]);

  const toNode = useMemo(() => {
    return nodes.find(n => n.id === toNodeId);
  }, [toNodeId, nodes]);

  const startPoint = useMemo(() => {
    return getAnchorCoordinates({
      nodeType: fromNode?.type,
      anchorType: 'out',
      nodeX: fromNode?.x || 0,
      nodeY: fromNode?.y || 0,
    })
  }, [fromNode]);

  const endPoint = useMemo(() => {
    return getAnchorCoordinates({
      nodeType: toNode?.type,
      anchorType: 'in',
      nodeX: toNode?.x || 0,
      nodeY: toNode?.y || 0,
    })
  }, [toNode]);

  return {
    fromNode,
    toNode,
    startPoint,
    endPoint
  }
}

export default useEdgeNodes;