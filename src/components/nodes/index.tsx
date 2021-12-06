import { useContext } from 'react';
import { context } from "src/store";
import { Node } from 'src/store/types'
import RectNode from 'src/components/Nodes/RectNode';
import CircleNode from 'src/components/Nodes/CircleNode';

export default function Nodes() {
  // store
  const state = useContext(context);

  return (
    <>
      {
        Array.isArray(state?.nodes) && state.nodes.map((node: Node) => {
          const { id, type, x, y } = node;
          if (type === "circle") {
            return <CircleNode id={id} key={id} x={x} y={y} />
          }
          if (type === 'rect') {
            return <RectNode id={id} key={id} x={x} y={y} />
          }
        })
      }
    </>
  )
}
