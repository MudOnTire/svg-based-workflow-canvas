import { Action, State } from './types';

function getInitialState() {
  return {
    nodes: [
      // {
      //   id: '0',
      //   type: 'circle',
      //   x: 220,
      //   y: 340
      // },
      // {
      //   id: '1',
      //   type: 'rect',
      //   x: 400,
      //   y: 300
      // },
      // {
      //   id: '2',
      //   type: 'circle',
      //   x: 680,
      //   y: 220
      // },
      // {
      //   id: '3',
      //   type: 'circle',
      //   x: 680,
      //   y: 460
      // },
    ],
    edges: [
      {
        from: '0',
        to: '1'
      },
      {
        from: '1',
        to: '2'
      },
      {
        from: '1',
        to: '3'
      },
    ]
  }
}

const SET_NODES = `NODES_STORE_SET_NODES`;
const UPDATE_NODE = `NODES_STORE_UPDATE_NODE`;
const ADD_NODE = `NODES_STORE_ADD_NODE`;

const actions = {
  [SET_NODES]: SET_NODES,
  [UPDATE_NODE]: UPDATE_NODE,
  [ADD_NODE]: ADD_NODE
}

function reducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case SET_NODES: {
      return { ...state, nodes: payload }
    }
    case UPDATE_NODE: {
      const { id } = payload;
      let index = state.nodes.findIndex(n => n.id === id);
      if (index < 0) return state;
      let node = state.nodes[index];
      node = { ...node, ...payload };
      const updatedNodes = [...state.nodes];
      updatedNodes.splice(index, 1, node);
      return {
        ...state,
        nodes: updatedNodes
      }
    }
    case ADD_NODE: {
      const { type, x, y } = payload;
      const newNode = {
        id: state.nodes.length + 1,
        x,
        y,
        type
      }
      const updatedNodes = [...state.nodes, newNode];
      return {
        ...state,
        nodes: updatedNodes
      }
    }
    default:
      return;
  }
}

export { getInitialState, actions, reducer };