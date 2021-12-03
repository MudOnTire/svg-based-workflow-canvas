import { useReducer, createContext } from "react";
import { StoreProviderProps, Action } from './types';

const actions = {

}

const initialState = {

}

function reducer(state: Object, action: Action): Object {
  return {}
}

const context = createContext(initialState);

function StoreProvider(props: StoreProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <context.Provider value={{ state, dispatch }}>
      {children}
    </context.Provider>
  );
}

export { context, StoreProvider, actions };