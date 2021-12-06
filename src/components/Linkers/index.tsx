import { useContext, useEffect } from 'react';
import { context, actions } from "src/store";
import { ContextValue } from 'src/store/types'

export default function Linkers() {
  // store
  const { state, dispatch } = useContext(context) as ContextValue;

  return (
    <div>

    </div>
  )
}
