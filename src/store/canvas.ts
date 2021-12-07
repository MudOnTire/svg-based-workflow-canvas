import { Action, State } from './types';

function getInitialState() {
  return {
    transform: {
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
      translateX: 0,
      translateY: 0
    },
    pendingEdge: null
  }
}

const SET_PENDING_EDGE = `CANVAS_STORE_SET_PENDING_EDGE`;
const SET_TRANSFORM = `CANVAS_STORE_SET_TRANSFORM`;

const actions = {
  [SET_PENDING_EDGE]: SET_PENDING_EDGE,
  [SET_TRANSFORM]: SET_TRANSFORM
}

function reducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PENDING_EDGE: {
      return { ...state, pendingEdge: payload }
    }
    case SET_TRANSFORM: {
      return { ...state, transform: payload }
    }
    default:
      return;
  }
}

export { getInitialState, actions, reducer };