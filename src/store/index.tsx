import { useReducer, createContext } from "react";
import { StoreProviderProps, Action, ContextValue } from './types';
import { actions as nodesActions, getInitialState as getNodesInitialState, reducer as nodesReducer } from './nodes';

const actions = {
  ...nodesActions
}

const initialState: Object = {
  ...getNodesInitialState()
}

function reducer(state: Object, action: Action): Object {
  let result;
  result = nodesReducer(state, action);
  if (result) return result;
  return state;
}

const context = createContext(initialState);

function StoreProvider(props: StoreProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const value: ContextValue = { state, dispatch };
  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
}

export { context, StoreProvider, actions };