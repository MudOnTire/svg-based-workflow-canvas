import { useReducer, createContext } from "react";
import { StoreProviderProps, Action, State } from './types';
import { actions as nodesActions, getInitialState as getNodesInitialState, reducer as nodesReducer } from './nodes';
import { actions as canvasActions, getInitialState as getCanvasInitialState, reducer as canvasReducer } from './canvas';

const actions = {
  ...nodesActions,
  ...canvasActions
}

const initialState: State = {
  dispatch: () => { },
  ...getNodesInitialState(),
  ...getCanvasInitialState()
}

function reducer(state: State, action: Action): State {
  let result;
  result = nodesReducer(state, action);
  if (result) return result;
  result = canvasReducer(state, action);
  if (result) return result;
  return state;
}

const context = createContext(initialState);

function StoreProvider(props: StoreProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  state.dispatch = dispatch;
  return (
    <context.Provider value={state}>
      {children}
    </context.Provider>
  );
}

export { context, StoreProvider, actions };