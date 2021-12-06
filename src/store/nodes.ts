import { Action } from './types';

function getInitialState() {
  return {
    nodes: [
      {
        id: '0',
        type: 'circle',
        x: 220,
        y: 340
      },
      {
        id: '1',
        type: 'rect',
        x: 400,
        y: 300
      }
    ]
  }
}

function actionName(name: string) {
  return `NODES_STORE_${name}`;
}

const SET_NODES = actionName('SET_NODES')

const actions = {
  SET_NODES
}

function reducer(state: Object, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_NODES: {
      return { ...state, transform: payload }
    }
    default:
      return;
  }
}

export { getInitialState, actions, reducer };