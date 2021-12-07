import { useContext } from 'react';
import { context } from "src/store";
import BezierEdge from './BezierEdge';

type Edge = {
  from: string;
  to: string;
}

export default function Linkers() {
  // store
  const state = useContext(context);

  return (
    <>
      {
        Array.isArray(state?.edges) && state.edges.map((edge: Edge) => {
          const { from, to } = edge;
          return <BezierEdge key={`${from}_${to}`} from={from} to={to} />
        })
      }
    </>
  )
}
