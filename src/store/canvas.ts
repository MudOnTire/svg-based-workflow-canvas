import { Action, State } from './types';

function getInitialState() {
  return {
    pendingEdge: null
  }
}

const SET_PENDING_EDGE = `CANVAS_STORE_SET_PENDING_EDGE`;

const actions = {
  [SET_PENDING_EDGE]: SET_PENDING_EDGE,
}

function reducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PENDING_EDGE: {
      return { ...state, pendingEdge: payload }
    }
    default:
      return;
  }
}

export { getInitialState, actions, reducer };