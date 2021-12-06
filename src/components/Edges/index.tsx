import { useContext } from 'react';
import { context } from "src/store";
import LineEdge from './LineEdge';

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
          return <LineEdge from={from} to={to} />
        })
      }
    </>
  )
}
