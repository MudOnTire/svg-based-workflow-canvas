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

export { StoreProviderProps, Action, TransformValues }