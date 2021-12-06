import { Action, State } from './types';

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
    ],
    edges: [
      {
        from: '0',
        to: '1'
      }
    ]
  }
}

function actionName(name: string) {
  return `NODES_STORE_${name}`;
}

const SET_NODES = actionName('SET_NODES');
const UPDATE_NODE = actionName('UPDATE_NODE');

const actions = {
  SET_NODES,
  UPDATE_NODE
}

function reducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_NODES: {
      return { ...state, nodes: payload }
    }
    case actions.UPDATE_NODE: {
      const { id } = payload;
      // const node = state?.nodes?.find
    }
    default:
      return;
  }
}

export { getInitialState, actions, reducer };