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

type ContextValue = {
  state: any;
  dispatch: Function;
}

type Node = {
  id: string;
  type: string;
  linkFrom: string;
  linkTo: string;
  x?: number;
  y?: number;
}

export { StoreProviderProps, Action, TransformValues, ContextValue, Node }