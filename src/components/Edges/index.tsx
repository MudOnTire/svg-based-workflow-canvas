import { useContext, useEffect } from 'react';
import { context, actions } from "src/store";
import { ContextValue } from 'src/store/types';
import LineEdge from './LineEdge';

type Edge = {
  from: string;
  to: string;
}

export default function Linkers() {
  // store
  const { state, dispatch } = useContext(context) as ContextValue;

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
