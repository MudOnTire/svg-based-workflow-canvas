import { ReactNode } from "react";

type StoreProviderProps = {
  children: ReactNode
}

type Action = {
  type: string;
  payload: any
}

type TransformValues = {
  scaleX: number;
  scaleY: number;
  skewX: number;
  skewY: number;
  translateX: number;
  translateY: number;
}

interface NodesState {
  nodes: Node[];
  edges: Edge[];
}

interface State extends NodesState {
  dispatch: Function
}

type ContextValue = {
  state: State;
  dispatch: Function;
}

type Node = {
  id: string;
  type: string;
  x?: number;
  y?: number;
}

type Edge = {
  from: string;
  to: string;
}

export { StoreProviderProps, Action, TransformValues, NodesState, State, ContextValue, Node, Edge }